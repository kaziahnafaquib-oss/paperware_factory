import { useCallback, useMemo, useState, lazy, Suspense } from 'react';
import { ViewContainer } from "../ViewContainer";
import { Users, Globe, ArrowUpRight, Activity, Clock, Smartphone, Laptop, Tablet, Share2, Search, ExternalLink, X, AlertTriangle, Monitor, Check, Sparkles, TrendingUp, Lightbulb, Zap, PieChart, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart as RechartsPieChart, Pie, AreaChart, Area } from "recharts";
import { AddLeadModal } from "../add-lead-modal";
import { VisitorDetailsModal } from "../visitor-details-modal";
import { ShareStatsModal } from "../share-stats-modal";
import { ProductEngagementModal } from "../product-engagement-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../../ui/dropdown-menu";

const TrafficMap = lazy(() => import("../traffic-map").then(module => ({ default: module.TrafficMap })));

const visitorsData = [
  { name: "United States", code: "USA", value: 12450, coordinates: [-95.7129, 37.0902] },
  { name: "China", code: "CHN", value: 8320, coordinates: [104.1954, 35.8617] },
  { name: "India", code: "IND", value: 7100, coordinates: [78.9629, 20.5937] },
  { name: "United Kingdom", code: "GBR", value: 5200, coordinates: [-3.4359, 55.3781] },
  { name: "Germany", code: "DEU", value: 4800, coordinates: [10.4515, 51.1657] },
  { name: "Brazil", code: "BRA", value: 3900, coordinates: [-51.9253, -14.2350] },
  { name: "Canada", code: "CAN", value: 3100, coordinates: [-106.3468, 56.1304] },
  { name: "France", code: "FRA", value: 2900, coordinates: [2.2137, 46.2276] },
  { name: "Australia", code: "AUS", value: 2400, coordinates: [133.7751, -25.2744] },
  { name: "Japan", code: "JPN", value: 2100, coordinates: [138.2529, 36.2048] },
];

const trafficSources = [
  { name: "Direct", value: 45, color: "#fabf37", icon: <ExternalLink className="size-3" /> },
  { name: "Search", value: 32, color: "#ffffff", icon: <Search className="size-3" /> },
  { name: "Social", value: 15, color: "#52525b", icon: <Share2 className="size-3" /> },
  { name: "Referral", value: 8, color: "#27272a", icon: <Globe className="size-3" /> },
];

const deviceStats = [
  { name: "Mobile", value: 58, color: "#fabf37", icon: <Smartphone className="size-4" /> },
  { name: "Desktop", value: 35, color: "#ffffff", icon: <Laptop className="size-4" /> },
  { name: "Tablet", value: 7, color: "#52525b", icon: <Tablet className="size-4" /> },
];

const engagementTrend = [
  { time: "00:00", value: 30 },
  { time: "04:00", value: 25 },
  { time: "08:00", value: 65 },
  { time: "12:00", value: 85 },
  { time: "16:00", value: 75 },
  { time: "20:00", value: 55 },
  { time: "24:00", value: 40 },
];

export function TrafficView() {
  const [showSpamAlert, setShowSpamAlert] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showAddLeadModal, setShowAddLeadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEngagementModal, setShowEngagementModal] = useState(false);
  const [selectedVisitor, setSelectedVisitor] = useState<any>(null);

  // Filter state
  const [deviceFilter, setDeviceFilter] = useState<"All" | "Mobile" | "Desktop">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Active" | "Offline">("All");
  const [timeFilter, setTimeFilter] = useState<"24h" | "7d" | "30d" | "90d">("24h");
  const [isLive, setIsLive] = useState(false);

  // Mock data for full report
  const fullVisitorReport = useMemo(() => Array.from({ length: 15 }).map((_, i) => ({
    id: `VIS-${1000 + i}`,
    name: ["Alex Morgan", "Sarah Chen", "Mike Ross", "Emma Watson", "John Doe", "Lisa Park", "David Kim", "Rachel Green", "Tom Riddle", "Harry Potter"][i % 10],
    email: `user${1000 + i}@example.com`,
    whatsapp: `+1 (555) 010-${1000 + i}`,
    mobile: `+1 (555) 999-${2000 + i}`,
    dob: "1995-08-15",
    country: ["USA", "China", "India", "UK", "Germany"][i % 5],
    flag: ["🇺🇸", "🇨🇳", "🇮🇳", "🇬🇧", "🇩🇪"][i % 5],
    status: i % 3 === 0 ? "Active" : "Offline",
    device: i % 2 === 0 ? "Mobile" : "Desktop",
    ip: `192.168.1.${10 + i}`,
    lastVisit: "Just now",
    topPage: ["/dashboard", "/pricing", "/products/iphone-15", "/cart", "/checkout"][i % 5],
    basket: i % 3 === 0 ? ["iPhone 15 Pro", "MagSafe Case"] : [],
    quotation: i % 4 === 0 ? "Web Design Service" : null,
    visitTimeIn: "10:23 AM",
    visitTimeOut: i % 3 === 0 ? "Active" : "10:45 AM"
  })), []);

  const filteredVisitors = useMemo(() => {
    return fullVisitorReport.filter(visitor => {
      const matchesDevice = deviceFilter === "All" || visitor.device === deviceFilter;
      const matchesStatus = statusFilter === "All" || visitor.status === statusFilter;
      return matchesDevice && matchesStatus;
    });
  }, [fullVisitorReport, deviceFilter, statusFilter]);

  const handleBlockIP = useCallback(() => {
    toast.error("IP Address has been blocked");
  }, []);

  const handleSync = useCallback(() => {
    toast.info("Syncing with ERPNext...");
    setTimeout(() => toast.success("Successfully synced with ERPNext"), 1500);
  }, []);

  const handleAddLead = useCallback(() => {
    setShowAddLeadModal(true);
    setSelectedVisitor(null);
  }, []);

  return (
    <ViewContainer
      title="Global Traffic"
      subtitle="Real-time Visitor Analytics & Geography"
      actions={
        <div className="flex gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="px-4 py-2 bg-zinc-800 border border-white/10 text-zinc-300 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 hover:text-white transition-colors flex items-center gap-2 group"
          >
            <Share2 className="size-3 group-hover:text-[#fabf37] transition-colors" /> Share Stats
          </button>

          <button
            onClick={() => setShowEngagementModal(true)}
            className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-purple-500/20 hover:text-purple-300 transition-colors flex items-center gap-2 group"
          >
            <PieChart className="size-3" /> Engagement AI
          </button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 bg-zinc-900 border border-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors flex items-center gap-2">
                <Clock className="size-3" />
                {timeFilter === "24h" ? "Last 24 Hours" :
                  timeFilter === "7d" ? "Last 7 Days" :
                    timeFilter === "30d" ? "Last 30 Days" : "Last 90 Days"}
                <ChevronDown className="size-3 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border border-white/10 text-white">
              <DropdownMenuItem onClick={() => setTimeFilter("24h")} className="text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:bg-white/5 focus:bg-white/5">
                Last 24 Hours {timeFilter === "24h" && <Check className="size-3 ml-2 text-[#fabf37]" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("7d")} className="text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:bg-white/5 focus:bg-white/5">
                Last 7 Days {timeFilter === "7d" && <Check className="size-3 ml-2 text-[#fabf37]" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("30d")} className="text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:bg-white/5 focus:bg-white/5">
                Last 30 Days {timeFilter === "30d" && <Check className="size-3 ml-2 text-[#fabf37]" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeFilter("90d")} className="text-[10px] font-bold uppercase tracking-wide cursor-pointer hover:bg-white/5 focus:bg-white/5">
                Last 90 Days {timeFilter === "90d" && <Check className="size-3 ml-2 text-[#fabf37]" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={() => setIsLive(!isLive)}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2 ${isLive ? "bg-[#fabf37] text-black shadow-[0_0_20px_rgba(250,191,55,0.4)]" : "bg-zinc-800 text-zinc-400 border border-white/5"}`}
          >
            <Activity className={`size-3 ${isLive ? "animate-pulse" : ""}`} />
            {isLive ? "Live View Active" : "Go Live"}
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Spam Alert Banner */}
        <AnimatePresence>
          {showSpamAlert && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 flex items-center justify-between overflow-hidden"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-red-500/20 rounded-full text-red-500 animate-pulse">
                  <AlertTriangle className="size-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm uppercase tracking-wide">Security Alert: Suspicious Traffic Detected</h4>
                  <p className="text-zinc-400 text-xs mt-1">
                    428 requests from known spam IP ranges blocked in the last hour.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowSpamAlert(false)}
                className="p-2 hover:bg-white/5 rounded-lg text-zinc-500 hover:text-white transition-colors"
              >
                <X className="size-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          {/* Map Section */}
          <div className="lg:col-span-2 bg-black border border-white/10 rounded-[40px] p-6 relative overflow-hidden h-[600px] flex flex-col">
            <div className="flex justify-between items-start mb-4 z-10 relative">
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Live Map</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Active Sessions by Region</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
                  <div className="size-2 rounded-full bg-[#fabf37]" />
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">High Traffic</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full border border-white/5">
                  <div className="size-2 rounded-full bg-zinc-700" />
                  <span className="text-[9px] font-bold text-zinc-400 uppercase">Low Traffic</span>
                </div>
              </div>
            </div>

            <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fabf37]" /></div>}>
              <TrafficMap visitorsData={visitorsData} />
            </Suspense>
          </div>

          {/* Stats Column */}
          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowReportModal(true)}
              className="bg-[#fabf37] rounded-[32px] p-8 text-black cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-black/10 p-2 rounded-full">
                  <ArrowUpRight className="size-4" />
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-black/10 rounded-xl">
                  <Users className="size-6 text-black" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Visitors</p>
              </div>
              <h2 className="text-5xl font-black tracking-tighter mb-2">84,291</h2>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 px-2 py-1 bg-black/10 rounded-lg text-[10px] font-bold">
                  <ArrowUpRight className="size-3" /> +12.5%
                </span>
                <span className="text-[10px] font-bold opacity-60 uppercase">Click for details</span>
              </div>
            </motion.div>

            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Top Regions</h3>
              <div className="space-y-4">
                {visitorsData.slice(0, 5).map((country, idx) => (
                  <div key={country.code} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black text-zinc-600 w-4">{idx + 1}</span>
                      <div>
                        <p className="text-[11px] font-black text-white uppercase group-hover:text-[#fabf37] transition-colors">{country.name}</p>
                        <div className="w-24 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${(country.value / 15000) * 100}%` }}
                            className="h-full bg-[#fabf37]"
                          />
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-400 tabular-nums">{country.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowReportModal(true)}
                className="w-full mt-6 py-3 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-white/5 hover:text-white transition-all"
              >
                View Full Report
              </button>
            </div>

            <div className="bg-black border border-white/5 rounded-[32px] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-20">
                <Globe className="size-24 text-[#fabf37]" />
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Real-Time Insight</h3>
              <p className="text-[10px] font-bold text-zinc-500 mb-6 leading-relaxed">
                Traffic from <span className="text-white">North America</span> is peaking. Server load is at 42%. Optimizing CDN routes...
              </p>
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">System Optimal</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-6">Device Analytics</h3>
            <div className="flex items-center justify-center h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={deviceStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {deviceStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                    itemStyle={{ color: "#fff", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {deviceStats.map((stat) => (
                <div key={stat.name} className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-full bg-white/5 text-white">
                    {stat.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider">{stat.name}</p>
                    <p className="text-lg font-black text-white">{stat.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Engagement Intelligence Section */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            onClick={() => setShowEngagementModal(true)}
            className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden cursor-pointer group"
          >
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight className="size-4 text-[#fabf37]" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-2">
                  <Sparkles className="size-4 text-[#fabf37]" /> Engagement AI
                </h3>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Predictive User Behavior</p>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Score: 85/100</span>
              </div>
            </div>

            <div className="h-[120px] w-full -ml-4 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementTrend}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Tooltip
                    contentStyle={{ backgroundColor: "#000", border: "none", borderRadius: "8px", fontSize: "12px" }}
                    itemStyle={{ color: "#fabf37" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#fabf37" fillOpacity={1} fill="url(#colorValue)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                <Zap className="size-4 text-[#fabf37] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-wide">Traffic Spike Predicted</p>
                  <p className="text-[10px] text-zinc-500 leading-snug">AI forecasts a 24% increase in traffic around 18:00 EST based on historical patterns.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-black/40 rounded-xl border border-white/5">
                <Lightbulb className="size-4 text-white mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-bold text-white uppercase tracking-wide">Optimization Tip</p>
                  <p className="text-[10px] text-zinc-500 leading-snug">Mobile bounce rate is 5% higher than average. Consider simplifying the mobile checkout flow.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex flex-col">
            <h3 className="text-lg font-black text-white uppercase tracking-tight mb-8">Traffic Sources</h3>

            <div className="h-[200px] w-full mb-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficSources} layout="vertical" barSize={32} margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.05)', radius: 8 }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-black p-4 rounded-xl border border-white/10 shadow-2xl">
                            <p className="text-white text-lg font-medium mb-1">{data.name}</p>
                            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                              VALUE : <span className="text-white">{data.value}</span>
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 4, 4]} background={{ fill: 'rgba(255,255,255,0.02)', radius: 4 }}>
                    {trafficSources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto">
              {trafficSources.map((source) => (
                <div key={source.name} className="flex items-center gap-4 p-5 rounded-[24px] bg-black border border-white/5 group hover:border-white/10 transition-colors">
                  <div className={`p-3 rounded-full flex items-center justify-center`} style={{ backgroundColor: `${source.color}15`, color: source.color === '#ffffff' ? '#999' : source.color }}>
                    {source.icon}
                  </div>
                  <div className="flex flex-col text-[14px]">
                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">{source.name}</span>
                    <span className="text-2xl font-black text-white text-[16px]">{source.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Report Modal */}
      <AnimatePresence>
        {showReportModal && (
          <div className="fixed top-[130px] inset-x-0 bottom-0 z-50 flex items-start justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-6xl max-h-[90vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-zinc-900/50">
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Detailed Visitor Report</h3>
                  <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest mt-1">Real-time Traffic Analysis & User Data</p>
                </div>
                <div className="flex gap-3">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors flex items-center gap-2">
                        <Search className="size-3" /> Filter
                        {(deviceFilter !== "All" || statusFilter !== "All") && (
                          <span className="size-2 bg-[#fabf37] rounded-full" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black border border-white/10 text-white min-w-[200px]">
                      <DropdownMenuLabel className="text-xs text-zinc-500 uppercase font-bold tracking-widest">Device Type</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setDeviceFilter("All")} className="flex justify-between cursor-pointer">
                        All Devices {deviceFilter === "All" && <Check className="size-3 text-[#fabf37]" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeviceFilter("Mobile")} className="flex justify-between cursor-pointer">
                        Mobile {deviceFilter === "Mobile" && <Check className="size-3 text-[#fabf37]" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setDeviceFilter("Desktop")} className="flex justify-between cursor-pointer">
                        Desktop {deviceFilter === "Desktop" && <Check className="size-3 text-[#fabf37]" />}
                      </DropdownMenuItem>

                      <DropdownMenuSeparator className="bg-white/10" />

                      <DropdownMenuLabel className="text-xs text-zinc-500 uppercase font-bold tracking-widest">User Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => setStatusFilter("All")} className="flex justify-between cursor-pointer">
                        All Status {statusFilter === "All" && <Check className="size-3 text-[#fabf37]" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Active")} className="flex justify-between cursor-pointer">
                        Active Only {statusFilter === "Active" && <Check className="size-3 text-[#fabf37]" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setStatusFilter("Offline")} className="flex justify-between cursor-pointer">
                        Offline {statusFilter === "Offline" && <Check className="size-3 text-[#fabf37]" />}
                      </DropdownMenuItem>

                      {(deviceFilter !== "All" || statusFilter !== "All") && (
                        <>
                          <DropdownMenuSeparator className="bg-white/10" />
                          <DropdownMenuItem
                            onClick={() => {
                              setDeviceFilter("All");
                              setStatusFilter("All");
                            }}
                            className="text-red-500 font-bold justify-center cursor-pointer hover:text-red-400 hover:bg-red-500/10"
                          >
                            Clear Filters
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <button
                    onClick={() => setShowReportModal(false)}
                    className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors text-white"
                  >
                    <X className="size-5" />
                  </button>
                </div>
              </div>

              {/* Table Content */}
              <div className="flex-1 overflow-auto p-8 custom-scrollbar">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left py-4 px-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Visitor ID</th>
                      <th className="text-left py-4 px-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">User Profile</th>
                      <th className="text-left py-4 px-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Region</th>
                      <th className="text-left py-4 px-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Status</th>
                      <th className="text-left py-4 px-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Device</th>
                      <th className="text-right py-4 px-4 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVisitors.length > 0 ? (
                      filteredVisitors.map((visitor) => (
                        <tr key={visitor.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                          <td className="py-4 px-4 text-xs font-mono text-zinc-400">{visitor.id}</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="size-8 rounded-full bg-[#fabf37] flex items-center justify-center text-black font-bold text-xs">
                                {visitor.name.charAt(0)}
                              </div>
                              <div>
                                <p className="text-sm font-bold text-white">{visitor.name}</p>
                                <p className="text-[10px] text-zinc-500">{visitor.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-sm text-zinc-300 font-medium">
                            <div className="flex items-center gap-2">
                              <span className="text-xl animate-pulse cursor-default" title={visitor.country}>{visitor.flag}</span>
                              <span>{visitor.country}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${visitor.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-800 text-zinc-500'}`}>
                              {visitor.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2 text-zinc-400">
                              {visitor.device === 'Mobile' ? <Smartphone className="size-3" /> : <Laptop className="size-3" />}
                              <span className="text-xs">{visitor.device}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-right">
                            <button
                              onClick={() => setSelectedVisitor(visitor)}
                              className="px-3 py-1.5 border border-white/10 rounded-lg text-[10px] font-bold text-white hover:bg-white/10 transition-colors"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-zinc-500 text-sm">
                          No visitors match your selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <VisitorDetailsModal
        visitor={selectedVisitor}
        onClose={() => setSelectedVisitor(null)}
        onAddLead={handleAddLead}
        onSync={handleSync}
        onBlock={handleBlockIP}
      />

      <AddLeadModal
        isOpen={showAddLeadModal}
        onClose={() => setShowAddLeadModal(false)}
        initialData={selectedVisitor}
      />

      <ShareStatsModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        stats={{
          visitors: 84291,
          growth: "+12.5%",
          topRegion: "North America",
          engagementRate: "85/100"
        }}
      />

      <ProductEngagementModal
        isOpen={showEngagementModal}
        onClose={() => setShowEngagementModal(false)}
      />
    </ViewContainer>
  );
}