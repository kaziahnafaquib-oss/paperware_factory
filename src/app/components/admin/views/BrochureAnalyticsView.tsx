import { ChangeEvent, useEffect, useRef, useState } from 'react';
import {
  Download,
  Map,
  MousePointer,
  Share2,
  Calendar,
  Filter,
  RefreshCcw,
  Globe,
  Search,
  Smartphone,
  Monitor,
  ArrowDownToLine,
  FileText,
  Clock,
  Loader2,
  Upload,
  MapPin,
  X,
  BarChart3,
  ExternalLink,
  Trash2
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { motion } from "framer-motion";
import { projectId, publicAnonKey } from "../../../../../utils/supabase/info";
import { supabase } from "../../../../../utils/supabase/client";
import { toast } from "sonner";
import { ViewContainer } from "../ViewContainer";

interface DownloadLog {
  id: string;
  timestamp: string;
  location: string;
  device: string;
  ip: string;
  source: string;
}

export const BrochureAnalyticsView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [logs, setLogs] = useState<DownloadLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/brochure/stats`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });
        const data = await response.json();
        if (data.logs) {
          setLogs(data.logs);
        }
      } catch (error) {
        console.error("Failed to fetch logs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading("Uploading brochure...");

    try {

      // Upload to Supabase Storage
      const fileName = `brochure-${Date.now()}.pdf`;
      const { data, error } = await supabase.storage
        .from('brochures')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        // If bucket doesn't exist, try to create it? No, can't create from anon key usually.
        // But maybe the user has set policies.
        throw error;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('brochures')
        .getPublicUrl(fileName);

      // Update KV store via server
      const updateRes = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/brochure/update-url`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ url: publicUrl })
      });

      if (!updateRes.ok) throw new Error('Failed to update URL reference');

      toast.success("Brochure updated successfully!", { id: toastId });
    } catch (error: any) {
      console.error("Upload failed:", error);
      toast.error("Upload failed: " + (error.message || "Unknown error"), { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Calculate stats
  const totalDownloads = logs.length;
  const uniqueLocations = new Set(logs.map(l => l.location)).size;
  const topLocation = logs.length > 0
    ? Object.entries(logs.reduce((acc, curr) => {
      acc[curr.location] = (acc[curr.location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)).sort((a, b) => b[1] - a[1])[0]?.[0]
    : "N/A";

  // Chart data: Downloads by Day
  // Group logs by day
  const logsByDay = logs.reduce((acc, log) => {
    const day = new Date(log.timestamp).toLocaleDateString('en-US', { weekday: 'short' });
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
    name: day,
    downloads: logsByDay[day] || 0
  }));

  const filteredLogs = logs.filter(log =>
    log.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ip.includes(searchTerm)
  );

  return (
    <ViewContainer
      title="Brochure Analytics"
      subtitle="Track E-Catalog Performance & Distribution"
      actions={
        <div className="flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="application/pdf"
            onChange={handleUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 bg-[#fabf37] text-black rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-[#fabf37]/90 flex items-center gap-2 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(250,191,55,0.2)]"
          >
            {isUploading ? <Loader2 className="size-3 animate-spin" /> : <Upload className="size-3" />}
            {isUploading ? "Uploading..." : "Upload New Version"}
          </button>
          <button className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-700 transition-all">
            Export CSV
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#fabf37]/10 rounded-xl text-[#fabf37]">
                <Download className="size-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Downloads</p>
                <h3 className="text-3xl font-black text-white">{totalDownloads}</h3>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                <MapPin className="size-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Unique Locations</p>
                <h3 className="text-3xl font-black text-white">{uniqueLocations}</h3>
              </div>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-6 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-500">
                <Globe className="size-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Top Region</p>
                <h3 className="text-xl font-black text-white truncate max-w-[150px]">{topLocation}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity List */}
          <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Download History</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black border border-white/10 rounded-full py-2 pl-8 pr-4 text-xs text-white focus:border-[#fabf37] outline-none w-48 transition-colors"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="text-left py-3 px-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Time</th>
                    <th className="text-left py-3 px-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Location</th>
                    <th className="text-left py-3 px-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Device</th>
                    <th className="text-left py-3 px-4 text-[9px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={4} className="py-8 text-center text-zinc-500 text-xs">Loading data...</td></tr>
                  ) : filteredLogs.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-zinc-500 text-xs">No downloads recorded yet</td>
                    </tr>
                  ) : (
                    filteredLogs.map((log) => (
                      <motion.tr
                        key={log.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="hover:bg-white/5 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Clock className="size-3 text-zinc-500" />
                            <span className="text-xs font-medium text-zinc-300">
                              {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                          <span className="text-[9px] text-zinc-600 pl-5">{new Date(log.timestamp).toLocaleDateString()}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <MapPin className="size-3 text-[#fabf37]" />
                            <span className="text-xs font-bold text-white">{log.location}</span>
                          </div>
                          <span className="text-[9px] text-zinc-600 pl-5 font-mono">{log.ip}</span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            {log.device.toLowerCase().includes('mobile') ? (
                              <Smartphone className="size-3 text-zinc-400" />
                            ) : (
                              <Monitor className="size-3 text-zinc-400" />
                            )}
                            <span className="text-xs text-zinc-400 truncate max-w-[100px]">{log.device}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-bold text-emerald-500 uppercase">
                            <ArrowDownToLine className="size-3" /> Completed
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Activity Chart */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col">
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Activity Trend</h3>
            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-6">Last 7 Days</p>

            <div className="flex-1 min-h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px', color: '#fff' }}
                  />
                  <Bar dataKey="downloads" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === chartData.length - 1 ? '#fabf37' : '#3f3f46'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 p-4 bg-black/40 rounded-xl">
              <div className="flex items-start gap-3">
                <FileText className="size-4 text-zinc-400 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-white mb-1">Top File</p>
                  <p className="text-[10px] text-zinc-500">Paperware_Corporate_Profile_2025.pdf</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
};

export default BrochureAnalyticsView;