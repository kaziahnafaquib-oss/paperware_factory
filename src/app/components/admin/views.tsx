import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "../ui/sheet";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronRight,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  CircleCheck,
  Clock,
  Eye,
  Pencil as Edit,
  Trash2,
  Download,
  Activity,
  Box,
  Monitor,
  Camera,
  Globe,
  Languages,
  Sparkles,
  Zap,
  ShieldCheck,
  RefreshCw,
  Link,
  Users,
  FileText,
  Layers,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Briefcase,
  Leaf,
  Shield,
  AlertCircle,
  Share2,
  Play,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  category: string;
  status: string;
}

interface LiveMachine {
  id: string;
  name: string;
  speed: string;
  temp: string;
  status: string;
}

// Mock Data for Table
const products: InventoryItem[] = [
  { id: "P001", name: "8oz Double Wall Cup", stock: 120000, category: "Paper Cups", status: "In Stock" },
  { id: "P002", name: "Eco-Liner Food Box", stock: 45000, category: "Restaurant", status: "Low Stock" },
  { id: "P003", name: "Premium Gift Bag", stock: 8000, category: "Marketing", status: "In Production" },
  { id: "P004", name: "Pharma Vial Box", stock: 0, category: "Pharmaceutical", status: "Out of Stock" },
];

const liveMachines: LiveMachine[] = [
  { id: "M-A1", name: "Cup Former #1", speed: "120 pcs/min", temp: "185°C", status: "Operational" },
  { id: "M-A2", name: "Cup Former #2", speed: "118 pcs/min", temp: "182°C", status: "Maintenance" },
  { id: "M-B1", name: "Offset Printer", speed: "8000 sht/hr", temp: "22°C", status: "Operational" },
];

export function ViewContainer({ title, subtitle, children, actions }: { title: string, subtitle: string, children: React.ReactNode, actions?: React.ReactNode }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">
              <Layers className="size-3" />
              <span>Dashboard</span>
              <ChevronRight className="size-3" />
              <span className="text-[#fabf37]">{title}</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{title}</h2>
            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest mt-2">{subtitle}</p>
          </div>
          
          {/* System Monitor HUD */}
          <div className="hidden xl:flex items-center gap-4 bg-zinc-900/50 border border-white/5 pl-4 pr-2 py-1.5 rounded-2xl backdrop-blur-sm">
             <div className="flex flex-col gap-0.5">
               <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">System Status</span>
               <div className="flex items-center gap-1.5">
                 <div className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                 <span className="text-[10px] font-bold text-green-500">Operational</span>
               </div>
             </div>
             <div className="h-6 w-px bg-white/5" />
             <div className="flex items-center gap-3 pr-2">
                <div className="flex flex-col items-start gap-0.5">
                   <span className="text-[7px] font-black text-zinc-600 uppercase">Latency</span>
                   <span className="text-[9px] font-bold text-zinc-300 font-mono">24ms</span>
                </div>
                <div className="h-4 w-px bg-white/5" />
                <div className="flex flex-col items-start gap-0.5">
                   <span className="text-[7px] font-black text-zinc-600 uppercase">Uptime</span>
                   <span className="text-[9px] font-bold text-zinc-300 font-mono">99.9%</span>
                </div>
             </div>
          </div>

          {/* AI Translation Progress & Neural Sync Engine */}
          {title.toLowerCase().includes("language") && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="flex items-center gap-4 bg-zinc-900/50 border border-[#fabf37]/20 px-5 py-2.5 rounded-[24px] backdrop-blur-2xl shadow-2xl relative overflow-hidden group/sync"
            >
              {/* Animated HUD Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#fabf37]/5 to-transparent opacity-0 group-hover/sync:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex flex-col min-w-[120px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[7px] font-black text-[#fabf37] uppercase tracking-[0.2em]">Global Scan Coverage</span>
                  <span className="text-[9px] font-black text-white tabular-nums">84.2%</span>
                </div>
                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "84.2%" }}
                    className="h-full bg-gradient-to-r from-[#fabf37] via-[#fabf37] to-white shadow-[0_0_10px_rgba(250,191,55,0.5)]"
                  />
                  {/* Progress Scanner Line */}
                  <motion.div 
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-4 skew-x-12 blur-sm"
                    style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  />
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 mx-1" />

              <button 
                onClick={() => {
                  toast.loading("Neural Engine Initiating Page-by-Page Scan...", { 
                    description: "Scanning App.tsx, MainContent.tsx, and 14 Module Files.",
                  });
                  setTimeout(() => {
                    toast.dismiss();
                    toast.success("AI Neural Sync Complete", {
                      description: "12,482 strings processed. Global coverage reached 92.5%.",
                      icon: <Sparkles className="size-4 text-[#fabf37]" />
                    });
                  }, 3500);
                }}
                className="group relative px-5 py-2.5 bg-[#fabf37] text-black text-[9px] font-black uppercase tracking-[0.15em] rounded-xl hover:shadow-[0_0_30px_rgba(250,191,55,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="size-3 group-hover:animate-pulse" />
                <span>Trigger Neural Sync</span>
                
                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                  <span className="size-1 bg-white rounded-full animate-ping" />
                </span>
              </button>
            </motion.div>
          )}
        </div>
        <div className="flex gap-4">
          {actions}
        </div>
      </div>
      {children}
    </motion.div>
  );
}

export function HostingView() {
  const [stats, setStats] = React.useState({
    cpu: 24,
    ram: 38,
    uptime: 99.99
  });

  const [deploys, setDeploys] = React.useState([
    { version: "v2.5.1", date: "2023-12-22", user: "JS Admin", status: "Success" },
    { version: "v2.5.0", date: "2023-12-20", user: "JS Admin", status: "Success" },
    { version: "v2.4.9", date: "2023-12-18", user: "Auto-Deploy", status: "Success" },
  ]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.min(100, Math.max(10, prev.cpu + (Math.random() * 4 - 2))),
        ram: Math.min(100, Math.max(10, prev.ram + (Math.random() * 2 - 1))),
        uptime: 99.99
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleDeploy = () => {
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Initiating Production Deployment...',
      success: () => {
        const newDeploy = {
          version: `v2.5.${deploys.length + 1}`,
          date: new Date().toISOString().split('T')[0],
          user: "JS Admin",
          status: "Success"
        };
        setDeploys(prev => [newDeploy, ...prev]);
        return 'Deployment Successful';
      },
      error: 'Deployment Failed'
    });
  };

  return (
    <ViewContainer 
      title="Hostinger Panel" 
      subtitle="Infrastructure & Domain Management" 
      actions={
        <div className="flex gap-4">
           <button 
            onClick={handleDeploy}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2 hover:bg-white/10"
          >
            <RefreshCw className="size-4" /> Trigger Deploy
          </button>
          <button 
            onClick={() => window.open('https://hpanel.hostinger.com', '_blank')}
            className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
          >
            <Globe className="size-4" /> Open hPanel
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <CircleCheck className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Server Status</p>
              <p className="text-lg font-black text-white uppercase">Operational</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span>Uptime</span>
              <span className="text-white">{stats.uptime}%</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: "0%" }}
                animate={{ width: `${stats.uptime}%` }}
                className="h-full bg-emerald-500" 
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-10 rounded-xl bg-[#fabf37]/10 text-[#fabf37] flex items-center justify-center">
              <Box className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">CPU Usage</p>
              <p className="text-lg font-black text-white uppercase">{stats.cpu.toFixed(1)}%</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              <span>System Load</span>
              <span className="text-white">Active</span>
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                animate={{ width: `${stats.cpu}%` }}
                className={`h-full transition-colors ${stats.cpu > 80 ? 'bg-red-500' : 'bg-[#fabf37]'}`} 
              />
            </div>
          </div>
        </div>

        <div className="bg-zinc-900/50 p-8 rounded-[32px] border border-white/5">
          <div className="flex items-center gap-4 mb-6">
            <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">SSL Certificate</p>
              <p className="text-lg font-black text-white uppercase">Active</p>
            </div>
          </div>
          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-2">Auto-renews in 42 days</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-[0.2em]">Secure Connection</span>
          </div>
        </div>
      </div>

      <div className="bg-black border border-white/5 rounded-[40px] p-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Deployment History</h3>
          <button 
            onClick={() => setDeploys(prev => prev.slice(0, 3))}
            className="text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white"
          >
            Refresh Logs
          </button>
        </div>
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {deploys.map((deploy, i) => (
              <motion.div 
                key={deploy.version}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between py-4 border-b border-white/5 last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className="size-8 rounded-lg bg-white/5 flex items-center justify-center text-zinc-500">
                    <RefreshCw className="size-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase">{deploy.version}</p>
                    <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">{deploy.date} • {deploy.user}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest">
                  {deploy.status}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ViewContainer>
  );
}

export function ERPNextView() {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [logs, setLogs] = React.useState([
    { type: "Inventory Update", msg: "Synced 42 SKUs from ERPNext", time: "12m ago", status: "success" },
    { type: "Customer Data", msg: "Imported 12 new B2B profiles", time: "1h ago", status: "success" },
    { type: "Order Export", msg: "Pushed RFQ-10294 to ERPNext", time: "3h ago", status: "success" },
    { type: "Price Matrix", msg: "Global price list updated", time: "5h ago", status: "error" },
  ]);

  const [mappings, setMappings] = React.useState([
    { name: "Sales & Distribution", mapped: true },
    { name: "Inventory Management", mapped: true },
    { name: "Customer CRM", mapped: true },
    { name: "Financial Accounting", mapped: false },
    { name: "Manufacturing Execution", mapped: false },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    toast.loading("Initiating ERPNext Sync...");
    
    setTimeout(() => {
      setIsSyncing(false);
      const newLog = {
        type: "Manual Sync",
        msg: "Full system sync completed successfully",
        time: "Just now",
        status: "success" as any
      };
      setLogs(prev => [newLog, ...prev.slice(0, 3)]);
      toast.dismiss();
      toast.success("ERPNext Sync Complete");
    }, 2000);
  };

  const copyEndpoint = () => {
    try {
      const textArea = document.createElement("textarea");
      textArea.value = "api.paperware.com/v1/erp";
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      toast.success("Endpoint copied to clipboard");
    } catch (err) {
      toast.error("Manual copy: api.paperware.com/v1/erp");
    }
  };

  const toggleMapping = (index: number) => {
    const updated = [...mappings];
    updated[index].mapped = !updated[index].mapped;
    setMappings(updated);
    toast.success(`${updated[index].name} mapping updated`);
  };

  return (
    <ViewContainer 
      title="ERPNext Integration" 
      subtitle="Business Logic & Data Synchronization"
      actions={
        <div className="flex gap-4">
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2 hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} /> {isSyncing ? "Syncing..." : "Sync Now"}
          </button>
          <button 
            onClick={() => toast.info("API Configuration is locked. Contact Lead Engineer.")}
            className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
          >
            <Link className="size-4" /> API Config
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10">
            <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8">Integration Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="p-6 bg-black rounded-3xl border border-white/5 cursor-pointer group hover:border-[#fabf37]/30 transition-all"
                onClick={copyEndpoint}
              >
                <div className="flex justify-between items-start mb-4">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">REST API Endpoint</p>
                  <span className="text-[8px] font-black text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity">Copy</span>
                </div>
                <div className="flex items-center justify-between">
                  <code className="text-[10px] text-[#fabf37]">api.paperware.com/v1/erp</code>
                  <CircleCheck className="size-4 text-emerald-500" />
                </div>
              </div>
              <div className="p-6 bg-black rounded-3xl border border-white/5">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Webhook Health</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-white uppercase">Active & Listening</p>
                  <Activity className="size-4 text-emerald-500 animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black border border-white/5 rounded-[40px] p-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Recent Sync Logs</h3>
              <button 
                onClick={() => setLogs([])}
                className="text-[9px] font-black text-zinc-600 uppercase tracking-widest hover:text-white transition-colors"
              >
                Clear All
              </button>
            </div>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {logs.map((log, i) => (
                  <motion.div 
                    key={`${log.type}-${log.time}-${i}`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-5 bg-zinc-900/30 rounded-2xl flex items-center justify-between border"
                    style={{ borderColor: 'rgba(255, 255, 255, 0.02)' }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`size-2 rounded-full ${log.status === 'success' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`} />
                      <div>
                        <p className="text-[11px] font-black text-white uppercase">{log.type}</p>
                        <p className="text-[10px] font-bold text-zinc-500 mt-1 uppercase tracking-widest">{log.msg}</p>
                      </div>
                    </div>
                    <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">{log.time}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              {logs.length === 0 && (
                <div className="py-12 text-center text-zinc-700 font-black text-[10px] uppercase tracking-[0.3em]">No Activity Found</div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-black border border-white/5 rounded-[40px] p-8">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">ERP Module Mapping</h4>
            <div className="space-y-4">
              {mappings.map((m, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 cursor-pointer group"
                  onClick={() => toggleMapping(i)}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${m.mapped ? 'text-zinc-400' : 'text-zinc-600 group-hover:text-zinc-400'}`}>{m.name}</span>
                  {m.mapped ? <CircleCheck className="size-3 text-emerald-500" /> : <Clock className="size-3 text-zinc-600 group-hover:text-[#fabf37]" />}
                </div>
              ))}
            </div>
            <button 
              onClick={() => toast.success("Mappings updated successfully")}
              className="w-full py-4 mt-8 bg-[#fabf37] text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:scale-[1.02] active:scale-95 transition-all"
            >
              Update Mappings
            </button>
          </div>

          <div className="bg-zinc-900/50 rounded-[40px] p-8 border border-white/5 relative overflow-hidden group">
             <div className="absolute inset-0 bg-[#fabf37]/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
             <div className="flex items-center gap-4 mb-6">
                <AlertTriangle className="size-6 text-[#fabf37]" />
                <h4 className="text-xs font-black text-white uppercase">Integration Alert</h4>
             </div>
             <p className="text-[10px] font-bold text-zinc-500 leading-relaxed uppercase tracking-widest">
               Your ERPNext API secret is scheduled for rotation in 3 days. Please update credentials to prevent sync interruption.
             </p>
             <button 
               onClick={() => toast.promise(new Promise(res => setTimeout(res, 1000)), {
                 loading: 'Rotating Secret...',
                 success: 'API Secret Rotated Successfully',
                 error: 'Rotation Failed'
               })}
               className="mt-6 text-[9px] font-black text-[#fabf37] uppercase tracking-widest hover:text-white transition-colors"
             >
               Rotate Now →
             </button>
          </div>
        </div>
      </div>
    </ViewContainer>
  );
}

interface CMSViewProps {
  heroVideoUrl?: string;
  heroVideoMobileUrl?: string;
  onUpdateHeroVideo?: (url: string) => void;
  onUpdateHeroVideoMobile?: (url: string) => void;
  clientsVideoUrl?: string;
  onUpdateClientsVideo?: (url: string) => void;
  heroContent?: {
    title: string;
    subtitle1: string;
    subtitle2: string;
  };
  onUpdateHeroContent?: (content: any) => void;
  products?: any[];
  onUpdateProducts?: (products: any[]) => void;
  testimonials?: any[];
  onUpdateTestimonials?: (testimonials: any[]) => void;
  impactStats?: any[];
  onUpdateImpactStats?: (stats: any[]) => void;
  productionStats?: any;
  onUpdateProductionStats?: (stats: any) => void;
  careers?: any[];
  onUpdateCareers?: (careers: any[]) => void;
  clientProjects?: any[];
  onUpdateClientProjects?: (projects: any[]) => void;
}

export function CMSView({ 
  heroVideoUrl, 
  heroVideoMobileUrl,
  onUpdateHeroVideo,
  onUpdateHeroVideoMobile,
  clientsVideoUrl,
  onUpdateClientsVideo,
  heroContent,
  onUpdateHeroContent,
  products = [],
  onUpdateProducts,
  testimonials = [],
  onUpdateTestimonials,
  impactStats = [],
  onUpdateImpactStats,
  productionStats,
  onUpdateProductionStats,
  careers = [],
  onUpdateCareers,
  clientProjects = [],
  onUpdateClientProjects
}: CMSViewProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [screenSize, setScreenSize] = React.useState({ w: 1920, h: 1080 });
  const [editingProduct, setEditingProduct] = React.useState<any>(null);
  const [isAddProductOpen, setIsAddProductOpen] = React.useState(false);
  const [editingProject, setEditingProject] = React.useState<any>(null);
  const [isAddProjectOpen, setIsAddProjectOpen] = React.useState(false);
  const [isVideoLive, setIsVideoLive] = React.useState(true);
  const [videoInput, setVideoInput] = React.useState(heroVideoUrl || "");
  const [videoMobileInput, setVideoMobileInput] = React.useState(heroVideoMobileUrl || "");
  const [heroTitle, setHeroTitle] = React.useState(heroContent?.title || "");
  const [heroSub1, setHeroSub1] = React.useState(heroContent?.subtitle1 || "");
  const [heroSub2, setHeroSub2] = React.useState(heroContent?.subtitle2 || "");
  const [loadError, setLoadError] = React.useState(false);
  const isInternalChange = React.useRef(false);
  const [pageVideoInput, setPageVideoInput] = React.useState(clientsVideoUrl || "");
  const prevVideoRef = React.useRef(clientsVideoUrl || "");
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setScreenSize({ w: window.innerWidth, h: window.innerHeight });
      const handleResize = () => setScreenSize({ w: window.innerWidth, h: window.innerHeight });
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Safe play effect
  React.useEffect(() => {
    let isMounted = true;
    const playVideo = async () => {
      // Only attempt play if it's a video element and not a youtube link
      const isYoutube = pageVideoInput?.includes('youtube.com') || pageVideoInput?.includes('youtu.be');
      if (videoRef.current && isMounted && !isYoutube) {
        try {
          videoRef.current.muted = true;
          if (videoRef.current.paused) {
            const playPromise = videoRef.current.play();
            if (playPromise !== undefined) {
              await playPromise;
            }
          }
        } catch (err) {
          // Silently handle autoplay prevention or interruption
        }
      }
    };
    
    if (isVideoLive) {
      const timeout = setTimeout(playVideo, 150);
      return () => {
        isMounted = false;
        clearTimeout(timeout);
      };
    }
  }, [pageVideoInput, isVideoLive]);

  // Auto-verify fallback logic
  React.useEffect(() => {
    if (pageVideoInput && pageVideoInput !== prevVideoRef.current) {
      setIsVideoLive(false); 
      prevVideoRef.current = pageVideoInput;
      const timer = setTimeout(() => {
        setIsVideoLive(true);
      }, 2000); 
      return () => clearTimeout(timer);
    }
  }, [pageVideoInput]);

  // Sync with props when category changes or initial load
  React.useEffect(() => {
    if (heroVideoUrl) setVideoInput(heroVideoUrl);
    if (heroVideoMobileUrl) setVideoMobileInput(heroVideoMobileUrl);
    if (clientsVideoUrl) setPageVideoInput(clientsVideoUrl);
    if (heroContent) {
      setHeroTitle(heroContent.title);
      setHeroSub1(heroContent.subtitle1);
      setHeroSub2(heroContent.subtitle2);
    }
  }, [heroVideoUrl, heroVideoMobileUrl, clientsVideoUrl, heroContent]);

  const handleSaveHero = () => {
    if (onUpdateHeroVideo) onUpdateHeroVideo(videoInput);
    if (onUpdateHeroVideoMobile) onUpdateHeroVideoMobile(videoMobileInput);
    if (onUpdateHeroContent) {
      onUpdateHeroContent({
        title: heroTitle,
        subtitle1: heroSub1,
        subtitle2: heroSub2
      });
    }
    toast.success("Hero Content Updated Successfully");
  };

  const handleReset = () => {
    setVideoInput("");
    setVideoMobileInput("");
    setHeroTitle("PREMIUM PAPER SOLUTIONS");
    setHeroSub1("Global Standard. Sustainable Impact. Industrial Precision.");
    setHeroSub2("YOUR PARTNER IN SUSTAINABLE MANUFACTURING EXCELLENCE.");
    setLoadError(false);
  };

  const handleSaveProject = () => {
    if (!onUpdateClientProjects) return;
    
    if (editingProject?.index !== undefined) {
      // Update existing
      const updated = [...clientProjects];
      const { index, ...rest } = editingProject;
      updated[index] = rest;
      onUpdateClientProjects(updated);
      toast.success("Project Updated");
    } else {
      // Add new
      onUpdateClientProjects([...clientProjects, editingProject]);
      toast.success("Project Added");
    }
    setEditingProject(null);
    setIsAddProjectOpen(false);
  };

  const handleDeleteProject = (index: number) => {
    if (!onUpdateClientProjects) return;
    const updated = [...clientProjects];
    updated.splice(index, 1);
    onUpdateClientProjects(updated);
    toast.success("Project Deleted");
  };

  if (selectedCategory === "Hero Banner") {
    return (
      <ViewContainer 
        title="Hero Section Configuration" 
        subtitle="Manage Main Banner Assets & Visuals"
        actions={
          <button 
            onClick={() => setSelectedCategory(null)}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
          >
            <ChevronRight className="size-4 rotate-180" /> Back to CMS
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                  <Monitor className="size-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight">Main Hero Video</h3>
                  <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Multi-Device Asset Optimization</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Desktop Video URL</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Monitor className="size-4 text-zinc-500" />
                    <input 
                      type="text" 
                      value={videoInput}
                      onChange={(e) => {
                        setVideoInput(e.target.value.trim());
                        isInternalChange.current = true;
                      }}
                      placeholder="YouTube URL or Direct MP4 URL..." 
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-[#fabf37]/60 ml-2 flex items-center gap-2">
                    <span className="inline-block size-1 rounded-full bg-[#fabf37]" />
                    Supports: YouTube links (youtu.be/xxx, youtube.com/watch?v=xxx) or direct MP4 URLs
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Mobile Video URL</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Camera className="size-4 text-zinc-500" />
                    <input 
                      type="text" 
                      value={videoMobileInput}
                      onChange={(e) => {
                        setVideoMobileInput(e.target.value.trim());
                        isInternalChange.current = true;
                      }}
                      placeholder="YouTube URL or Direct MP4 URL..." 
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                  <p className="text-[9px] font-bold text-[#fabf37]/60 ml-2 flex items-center gap-2">
                    <span className="inline-block size-1 rounded-full bg-[#fabf37]" />
                    Leave empty to use Desktop video on all devices
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Hero Main Title</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Sparkles className="size-4 text-zinc-500" />
                    <input 
                      type="text" 
                      value={heroTitle}
                      onChange={(e) => setHeroTitle(e.target.value)}
                      placeholder="Hero Title..." 
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Subtitle 01 (Top)</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Edit className="size-4 text-zinc-500" />
                    <input 
                      type="text" 
                      value={heroSub1}
                      onChange={(e) => setHeroSub1(e.target.value)}
                      placeholder="Subtitle 1..." 
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Subtitle 02 (Bottom)</label>
                  <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                    <Edit className="size-4 text-zinc-500" />
                    <input 
                      type="text" 
                      value={heroSub2}
                      onChange={(e) => setHeroSub2(e.target.value)}
                      placeholder="Subtitle 2..." 
                      className="w-full bg-transparent text-white text-sm outline-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleSaveHero}
                  className="w-full py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(250,191,55,0.2)]"
                >
                  <RefreshCw className="size-4" /> 
                  Sync Changes
                </button>
              </div>

              <div className="pt-6 border-t border-white/5">
                <div className="space-y-3">
                  <p className="text-[9px] font-bold text-zinc-500 leading-relaxed uppercase tracking-widest">
                    📹 Supported Formats:
                  </p>
                  <ul className="text-[9px] font-bold text-zinc-400 space-y-2 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-[#fabf37] mt-0.5">✓</span>
                      <span>YouTube URLs (e.g., https://youtu.be/VIDEO_ID or https://youtube.com/watch?v=VIDEO_ID)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#fabf37] mt-0.5">✓</span>
                      <span>Direct MP4 URLs (e.g., https://example.com/video.mp4)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">⚠</span>
                      <span>Note: Some YouTube videos may restrict embedding. If video doesn't play, use a different video or upload directly.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/20 rounded-[32px] p-8">
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Monitor className="size-5 text-blue-400" />
                </div>
                <div className="space-y-3">
                  <h4 className="text-sm font-black text-white uppercase tracking-tight">YouTube Embedding Guide</h4>
                  <div className="space-y-2 text-[9px] font-bold text-zinc-400">
                    <p className="uppercase tracking-wide">Example YouTube formats that work:</p>
                    <div className="bg-black/30 rounded-xl p-3 space-y-1 font-mono text-[8px] text-zinc-300">
                      <div>✓ https://youtu.be/dQw4w9WgXcQ</div>
                      <div>✓ https://www.youtube.com/watch?v=dQw4w9WgXcQ</div>
                      <div>✓ https://youtube.com/embed/dQw4w9WgXcQ</div>
                    </div>
                    <p className="text-[#fabf37]/80 flex items-start gap-2 pt-2">
                      <span className="text-xs">💡</span>
                      <span>If a video shows "Embedding Restricted" error, try a different video. Not all YouTube videos allow embedding.</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[32px] p-8 flex items-start gap-4">
              <CircleCheck className="size-6 text-emerald-500 shrink-0" />
              <div>
                <h4 className="text-sm font-black text-white uppercase tracking-tight">Responsive Engine: Active</h4>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
                  System will automatically toggle between assets based on screen resolution.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-10">
             <div className="space-y-4">
               <h3 className="text-xl font-black text-white uppercase tracking-tight ml-4 flex items-center gap-3">
                 <Monitor className="size-5" /> Desktop Preview
               </h3>
               <div className="bg-black border border-white/5 rounded-[48px] p-4 aspect-video relative overflow-hidden group">
                  {loadError && videoInput && !videoInput.includes('youtube.com') && !videoInput.includes('youtu.be') && (
                     <div className="absolute inset-0 z-20 bg-black/60 flex flex-col items-center justify-center p-8 text-center backdrop-blur-xl transition-all duration-500">
                        <div className="size-16 rounded-full bg-red-500/10 flex items-center justify-center mb-6 border border-red-500/20">
                          <AlertTriangle className="size-8 text-red-500 animate-pulse" />
                        </div>
                        <p className="text-[11px] font-black text-white uppercase tracking-[0.3em] mb-3">Synchronization Failed</p>
                        <p className="text-[9px] font-bold text-zinc-400 uppercase leading-loose max-w-[240px] tracking-widest mb-6">
                          Source node returned an error. <br/>
                          <span className="text-[#fabf37] mt-2 block italic">Please provide a direct .mp4 link.</span>
                        </p>
                     </div>
                  )}
                  {(() => {
                    const getYoutubeId = (url: string) => {
                      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                      const match = url.match(regExp);
                      return (match && match[2].length === 11) ? match[2] : null;
                    };
                    const youtubeId = getYoutubeId(videoInput || "");
                    
                    if (youtubeId) {
                      return (
                        <iframe
                          key={youtubeId}
                          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0`}
                          className="w-full h-full object-cover rounded-[36px]"
                          allow="autoplay; encrypted-media"
                        />
                      );
                    }
                    
                    return (
                      videoInput ? (
                        <video 
                          key={videoInput}
                          src={videoInput}
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          onLoadedData={() => setLoadError(false)}
                          onError={(e) => {
                            setLoadError(true);
                            e.currentTarget.style.display = 'none';
                          }}
                          suppressHydrationWarning
                          className="w-full h-full object-cover rounded-[36px]"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-900 rounded-[36px] flex items-center justify-center">
                          <div className="text-center text-zinc-600 space-y-2">
                            <div className="text-4xl">🎥</div>
                            <p className="text-sm font-bold">No Video Selected</p>
                          </div>
                        </div>
                      )
                    );
                  })()}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2 opacity-40">Paperware Global</h2>
                      <div className="h-0.5 w-12 bg-[#fabf37] mx-auto opacity-20" />
                    </div>
                  </div>
               </div>
             </div>

             <div className="space-y-4">
               <h3 className="text-xl font-black text-white uppercase tracking-tight ml-4 flex items-center gap-3">
                 <Camera className="size-5" /> Mobile Preview
               </h3>
               <div className="flex justify-center">
                 <div className="bg-black border-[12px] border-zinc-900 rounded-[60px] w-[280px] aspect-[9/19] relative overflow-hidden shadow-2xl">
                    {(() => {
                      const activeUrl = videoMobileInput || videoInput;
                      const getYoutubeId = (url: string) => {
                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                        const match = url.match(regExp);
                        return (match && match[2].length === 11) ? match[2] : null;
                      };
                      const youtubeId = getYoutubeId(activeUrl || "");
                      
                      if (youtubeId) {
                        return (
                          <iframe
                            key={youtubeId + "-mobile"}
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0`}
                            className="w-full h-full object-cover"
                            allow="autoplay; encrypted-media"
                          />
                        );
                      }
                      
                      if (!activeUrl) {
                        return (
                          <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                            <div className="text-center text-zinc-600 space-y-1">
                              <div className="text-2xl">🎥</div>
                              <p className="text-xs font-bold">No Video</p>
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <video 
                          key={activeUrl}
                          src={activeUrl}
                          autoPlay muted loop playsInline
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          suppressHydrationWarning
                        />
                      );
                    })()}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-zinc-900 rounded-full z-20" />
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    <div className="absolute bottom-12 left-0 w-full px-6 text-center">
                      <p className="text-[10px] font-black text-white uppercase tracking-tighter opacity-60">Responsive Mobile Feed</p>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Product Gallery") {
    const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newProduct = {
        id: Date.now(),
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        image: formData.get('image') as string || "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&q=80&w=1600",
        status: "Active"
      };
      if (onUpdateProducts) onUpdateProducts([...products, newProduct]);
      setIsAddProductOpen(false);
      toast.success("Product Added Successfully");
    };

    const handleUpdateProduct = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const updatedProducts = products.map(p => p.id === editingProduct.id ? {
        ...p,
        name: formData.get('name') as string,
        category: formData.get('category') as string,
        image: formData.get('image') as string,
      } : p);
      if (onUpdateProducts) onUpdateProducts(updatedProducts);
      setEditingProduct(null);
      toast.success("Product Updated Successfully");
    };

    const handleDeleteProduct = (id: any) => {
      if (confirm("Are you sure you want to delete this product?")) {
        if (onUpdateProducts) onUpdateProducts(products.filter(p => p.id !== id));
        toast.error("Product Removed");
      }
    };

    return (
      <ViewContainer 
        title="Product Gallery" 
        subtitle="Manage Industrial Catalog"
        actions={
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="size-4" /> Add Product
            </button>
            <button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">
              Back
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p: any) => (
            <div key={p.id} className="bg-zinc-900/50 border border-white/5 rounded-3xl overflow-hidden group">
              <div className="aspect-video relative">
                <img loading="lazy" decoding="async" src={p.image} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    onClick={() => setEditingProduct(p)}
                    className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"
                  >
                    <Edit className="size-3.5" />
                  </button>
                  <button 
                    onClick={() => handleDeleteProduct(p.id)}
                    className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-all"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <span className="text-[9px] font-black text-[#fabf37] uppercase tracking-widest">{p.category}</span>
                <h4 className="text-lg font-black text-white uppercase tracking-tight mt-1">{p.name}</h4>
                <div className="flex items-center gap-2 mt-4">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{p.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modals */}
        <AnimatePresence>
          {(isAddProductOpen || editingProduct) && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddProductOpen(false); setEditingProduct(null); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {isAddProductOpen ? "Initialize New Asset" : "Modify Asset Details"}
                </h3>
                <form onSubmit={isAddProductOpen ? handleAddProduct : handleUpdateProduct} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Product Name</label>
                    <input 
                      name="name"
                      required
                      defaultValue={editingProduct?.name || ""}
                      placeholder="Enter product title..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Industrial Category</label>
                    <input 
                      name="category"
                      required
                      defaultValue={editingProduct?.category || ""}
                      placeholder="e.g. Food Packaging, Beverage..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Image URL (Visual Data)</label>
                    <input 
                      name="image"
                      required
                      defaultValue={editingProduct?.image || ""}
                      placeholder="Paste Unsplash or direct image URL..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      type="button"
                      onClick={() => { setIsAddProductOpen(false); setEditingProduct(null); }}
                      className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(250,191,55,0.2)] hover:scale-105 transition-all"
                    >
                      {isAddProductOpen ? "Create Asset" : "Update Asset"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Client Testimonials") {
    const handleSavePageVideo = () => {
      if (onUpdateClientsVideo) {
        onUpdateClientsVideo(pageVideoInput);
        toast.success("Clients Page Featured Video Updated");
      }
    };

    const handleAddTestimonial = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const isFeatured = formData.get('isFeatured') === 'on';
      const isVideo = formData.get('isVideo') === 'on';
      
      const newTestimonial = {
        id: Date.now(),
        client: formData.get('client') as string,
        quote: formData.get('quote') as string,
        rating: 5,
        isFeatured,
        isVideo,
        videoUrl: formData.get('videoUrl') as string,
        image: formData.get('image') as string
      };
      if (onUpdateTestimonials) onUpdateTestimonials([...testimonials, newTestimonial]);
      setIsAddProductOpen(false);
      toast.success("Testimonial Added to Pipeline");
    };

    const handleDeleteTestimonial = (id: any) => {
      if (confirm("Delete this feedback?")) {
        if (onUpdateTestimonials) onUpdateTestimonials(testimonials.filter(t => t.id !== id));
        toast.error("Feedback Removed");
      }
    };

    return (
      <ViewContainer 
        title="Client Testimonials" 
        subtitle="Manage Social Proof & Feedback"
        actions={
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="size-4" /> Add Feedback
            </button>
            <button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">
              Back
            </button>
          </div>
        }
      >
        <div className="space-y-8">
          {/* Section: Clients Page Featured Video */}
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                <Monitor className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Clients Page Main Video</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Featured Story Background Video</p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                <Link className="size-4 text-zinc-500" />
                <input 
                  type="text" 
                  value={pageVideoInput}
                  onChange={(e) => {
                    setPageVideoInput(e.target.value.trim());
                  }}
                  placeholder="Paste Featured Video MP4 URL..." 
                  className="w-full bg-transparent text-white text-sm outline-none"
                />
              </div>
              <button 
                onClick={handleSavePageVideo}
                className="bg-[#fabf37] text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all"
              >
                Sync Video
              </button>
            </div>

            {/* Live Preview Window */}
            <div className="mt-8 flex justify-center">
              <div className="relative aspect-[4/5] w-full max-w-xs rounded-[48px] overflow-hidden border border-white/10 bg-black group shadow-2xl">
                {pageVideoInput ? (
                  <>
                    {(() => {
                      const getYoutubeId = (url: string) => {
                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                        const match = url.match(regExp);
                        return (match && match[2].length === 11) ? match[2] : null;
                      };
                      const youtubeId = getYoutubeId(pageVideoInput);

                      if (youtubeId) {
                        return (
                          <iframe
                            key={youtubeId}
                            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&autohide=1`}
                            className="w-full h-full object-cover opacity-80"
                            allow="autoplay; encrypted-media"
                            onLoad={() => setIsVideoLive(true)}
                          />
                        );
                      }

                      return (
                        <video 
                          ref={videoRef}
                          key={pageVideoInput}
                          src={pageVideoInput}
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          onCanPlay={() => setIsVideoLive(true)}
                          onLoadedData={() => setIsVideoLive(true)}
                          onPlaying={() => setIsVideoLive(true)}
                          onError={(e) => {
                            setIsVideoLive(false);
                            e.currentTarget.style.display = 'none';
                          }}
                          suppressHydrationWarning
                          className={`w-full h-full object-cover transition-all duration-700 ${isVideoLive ? 'opacity-100' : 'opacity-40'}`}
                        />
                      );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
                    
                    {/* READY TO PLAY Badge */}
                    <div className="absolute top-8 left-1/2 -translate-x-1/2">
                        <motion.div 
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          className="px-5 py-2 bg-[#fabf37] rounded-full flex items-center gap-2 shadow-lg shadow-[#fabf37]/20"
                        >
                            <div className="size-1.5 rounded-full bg-black animate-pulse" />
                            <span className="text-[9px] font-black text-black uppercase tracking-[0.2em]">Ready to Play</span>
                        </motion.div>
                    </div>

                    {/* HUD Elements */}
                    <div className="absolute top-8 left-8 flex items-center gap-3">
                      <div className={`size-2 rounded-full ${isVideoLive ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-red-500'}`} />
                      
                      {/* Visible Screen Size HUD */}
                      <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2">
                          <Monitor className="size-3 text-[#fabf37]" />
                          <span className="text-[7px] font-black text-[#fabf37] uppercase tracking-widest whitespace-nowrap">
                            {screenSize.w} x {screenSize.h}
                          </span>
                      </div>
                    </div>

                    {/* Central Play Button */}
                    <AnimatePresence>
                      {!isVideoLive && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          className="absolute inset-0 flex items-center justify-center z-20"
                        >
                            <motion.div 
                              onClick={() => setIsVideoLive(true)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="size-20 rounded-full bg-[#fabf37] flex items-center justify-center text-black shadow-[0_0_40px_rgba(250,191,55,0.4)] cursor-pointer"
                            >
                                <Play className="size-8 fill-current ml-1" />
                            </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    {/* Bottom Content Area */}
                    <div className="absolute bottom-10 left-6 right-6 p-6 rounded-[32px] bg-black/40 backdrop-blur-xl border border-white/10 text-center space-y-4">
                      <div className="flex justify-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="size-3 text-[#fabf37] fill-current" />
                        ))}
                      </div>
                      
                      <div className="group relative">
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#fabf37] text-black text-[7px] font-black px-2 py-0.5 rounded uppercase">Click to Edit</div>
                        <h4 
                          contentEditable 
                          suppressContentEditableWarning
                          className="text-xl font-black text-white uppercase tracking-tight mb-1 outline-none hover:text-[#fabf37] transition-colors cursor-text focus:ring-1 focus:ring-[#fabf37]/50 rounded px-1"
                        >
                          Verified Story
                        </h4>
                        <p 
                          contentEditable 
                          suppressContentEditableWarning
                          className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest leading-relaxed outline-none hover:text-white transition-colors cursor-text focus:ring-1 focus:ring-[#fabf37]/50 rounded px-1"
                        >
                          "Industrial excellence through sustainable manufacturing."
                        </p>
                      </div>

                      <div className="flex justify-center">
                        <div className="px-4 py-1.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                            <Zap className="size-3 text-[#fabf37]" />
                            <span className="text-[8px] font-black text-white uppercase tracking-widest">4K Pipeline Sync</span>
                        </div>
                      </div>
                    </div>

                    <AnimatePresence>
                      {!isVideoLive && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setIsVideoLive(true)}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xl z-[100] cursor-pointer"
                        >
                          <div className="flex flex-col items-center gap-4 text-center px-8">
                            <div className="relative">
                                <RefreshCw className="size-10 text-[#fabf37] animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="size-1.5 rounded-full bg-white animate-ping" />
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Neural Verification</p>
                                <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Establishing Secure Stream...</p>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsVideoLive(true);
                                }}
                                className="mt-4 px-5 py-2.5 bg-white/5 hover:bg-[#fabf37] hover:text-black rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border border-white/10 group/btn shadow-xl"
                            >
                                <span className="group-hover/btn:scale-105 inline-block">Force Sync Bypass</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center space-y-4 text-zinc-800 p-12 text-center">
                    <div className="size-20 rounded-full bg-white/5 border border-white/5 flex items-center justify-center mb-4">
                        <Monitor className="size-8 opacity-20" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Awaiting Video Input for Verified Story Card</p>
                  </div>
                )}
              </div>
            </div>
            
            <p className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-relaxed ml-2">
              Note: This video appears as the main background of the "Featured Video" card on the Clients page.
            </p>
          </div>

          <div className="space-y-4">
          {testimonials.map((t: any) => (
            <div key={t.id} className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex justify-between items-center group hover:border-[#fabf37]/50 transition-all">
              <div className="flex items-center gap-8">
                <div className="relative">
                  <div className="size-16 rounded-2xl bg-black flex items-center justify-center text-[#fabf37] font-black text-xl overflow-hidden border border-white/5">
                    {t.image ? (
                      <img loading="lazy" decoding="async" src={t.image} alt="" className="w-full h-full object-cover opacity-60" />
                    ) : (
                      <span>{t.client[0]}</span>
                    )}
                  </div>
                  {t.isVideo && (
                    <div className="absolute -top-1 -right-1 size-5 bg-[#fabf37] rounded-full flex items-center justify-center border-2 border-black">
                      <Play className="size-2 text-black fill-current" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h4 className="text-xl font-black text-white uppercase tracking-tight">{t.client}</h4>
                    {t.isFeatured && (
                      <span className="px-2 py-0.5 bg-[#fabf37]/10 text-[#fabf37] text-[8px] font-black uppercase tracking-widest rounded-md border border-[#fabf37]/20">Featured</span>
                    )}
                  </div>
                  <p className="text-sm font-bold text-zinc-500 mt-1">"{t.quote}"</p>
                  {t.isVideo && <p className="text-[10px] text-[#fabf37] mt-1 font-black uppercase tracking-widest">Neural Video Pipeline Active</p>}
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => handleDeleteTestimonial(t.id)}
                  className="size-10 rounded-xl bg-white/5 text-zinc-400 hover:text-red-500 flex items-center justify-center transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple Add Modal for Testimonials */}
      <AnimatePresence>
          {isAddProductOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsAddProductOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-xl bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Add Client Voice</h3>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                    <div className="size-1.5 rounded-full bg-[#fabf37] animate-pulse" />
                    <span className="text-[8px] font-black text-white uppercase tracking-widest">Admin Pipeline</span>
                  </div>
                </div>

                <form onSubmit={handleAddTestimonial} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Client Name / Business</label>
                    <input name="client" required className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Testimonial Content</label>
                    <textarea name="quote" required className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all h-24" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-black rounded-2xl border border-white/5">
                      <input type="checkbox" name="isFeatured" id="feat" className="size-4 accent-[#fabf37]" />
                      <label htmlFor="feat" className="text-[10px] font-black text-white uppercase tracking-widest cursor-pointer">Featured Card</label>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-black rounded-2xl border border-white/5">
                      <input type="checkbox" name="isVideo" id="vid" className="size-4 accent-[#fabf37]" />
                      <label htmlFor="vid" className="text-[10px] font-black text-white uppercase tracking-widest cursor-pointer">Video Story</label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Video MP4 URL</label>
                      <input name="videoUrl" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-[10px] outline-none focus:border-[#fabf37] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Thumbnail/Avatar URL</label>
                      <input name="image" placeholder="https://..." className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-[10px] outline-none focus:border-[#fabf37] transition-all" />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAddProductOpen(false)} className="flex-1 py-5 bg-white/5 text-zinc-500 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-white/10 hover:text-white transition-all">Cancel</button>
                    <button type="submit" className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#fabf37]/10">Push to Production</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Client Projects") {
    return (
      <ViewContainer 
        title="Recent Deployments" 
        subtitle="Manage Client Project Showcase"
        actions={
          <div className="flex gap-4">
             <button 
              onClick={() => setSelectedCategory(null)}
              className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
            >
              <ChevronRight className="size-4 rotate-180" /> Back to CMS
            </button>
            <button 
              onClick={() => {
                setEditingProject({});
                setIsAddProjectOpen(true);
              }}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#fabf37]/20"
            >
              <Plus className="size-4" /> Add Project
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientProjects.map((project: any, idx: number) => (
            <div key={idx} className="bg-zinc-900/50 border border-white/5 rounded-[32px] overflow-hidden group hover:border-[#fabf37]/50 transition-all">
               <div className="relative h-48">
                 <img loading="lazy" decoding="async" src={project.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
                 <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                      onClick={() => {
                        setEditingProject({ ...project, index: idx });
                        setIsAddProjectOpen(true);
                      }}
                      className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"
                    >
                      <Edit className="size-3.5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(idx)}
                      className="size-8 rounded-lg bg-black/50 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 transition-all"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                 </div>
                 <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-md text-[8px] font-black text-[#fabf37] uppercase tracking-widest border border-[#fabf37]/20">
                      {project.company}
                    </span>
                 </div>
               </div>
               <div className="p-6">
                 <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2 leading-none">{project.project}</h4>
                 <p className="text-[10px] font-bold text-zinc-500 leading-relaxed line-clamp-2">{project.desc}</p>
               </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {isAddProjectOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => { setIsAddProjectOpen(false); setEditingProject(null); }}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">
                  {editingProject?.index !== undefined ? "Update Project" : "New Deployment"}
                </h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Company Name</label>
                    <input 
                      value={editingProject?.company || ""}
                      onChange={(e) => setEditingProject({...editingProject, company: e.target.value})}
                      placeholder="e.g. TechFlow Systems"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Project Title</label>
                    <input 
                      value={editingProject?.project || ""}
                      onChange={(e) => setEditingProject({...editingProject, project: e.target.value})}
                      placeholder="e.g. Neural Hardware Packaging"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Description</label>
                    <textarea 
                      value={editingProject?.desc || ""}
                      onChange={(e) => setEditingProject({...editingProject, desc: e.target.value})}
                      placeholder="Project details..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all h-24"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Image URL</label>
                    <input 
                      value={editingProject?.image || ""}
                      onChange={(e) => setEditingProject({...editingProject, image: e.target.value})}
                      placeholder="https://..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all"
                    />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button 
                      onClick={() => { setIsAddProjectOpen(false); setEditingProject(null); }}
                      className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] border border-white/5 hover:bg-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleSaveProject}
                      className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(250,191,55,0.2)] hover:scale-105 transition-all"
                    >
                      {editingProject?.index !== undefined ? "Save Changes" : "Deploy Project"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Impact Dashboard") {
    return (
      <ViewContainer 
        title="Impact Dashboard" 
        subtitle="Sustainable Metrics Configuration"
        actions={<button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Back</button>}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {impactStats.map((s: any, i: number) => (
            <div key={i} className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 space-y-6">
              <div className="size-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Activity className="size-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{s.label}</p>
                <h4 className="text-3xl font-black text-white mt-1">{s.value}</h4>
              </div>
              <div className="pt-6 border-t border-white/5 flex gap-4">
                <button className="flex-1 py-3 rounded-xl bg-white/5 text-[10px] font-black uppercase text-white hover:bg-[#fabf37] hover:text-black transition-all">Edit Metric</button>
              </div>
            </div>
          ))}
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Career Postings") {
    const handleAddJob = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newJob = {
        id: Date.now(),
        title: formData.get('title') as string,
        dept: formData.get('dept') as string,
        location: formData.get('location') as string,
        type: formData.get('type') as string,
      };
      if (onUpdateCareers) onUpdateCareers([...careers, newJob]);
      setIsAddProductOpen(false);
      toast.success("New Job Opening Published");
    };

    const handleDeleteJob = (id: any) => {
      if (confirm("Remove this career opportunity?")) {
        if (onUpdateCareers) onUpdateCareers(careers.filter(c => c.id !== id));
        toast.error("Job Removed");
      }
    };

    return (
      <ViewContainer 
        title="Career Opportunities" 
        subtitle="Manage Job Openings & Hiring"
        actions={
          <div className="flex gap-4">
            <button 
              onClick={() => setIsAddProductOpen(true)}
              className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 transition-all"
            >
              <Plus className="size-4" /> Post New Job
            </button>
            <button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">
              Back
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 gap-4">
          {careers.map((c: any) => (
            <div key={c.id} className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8 flex justify-between items-center group hover:bg-black transition-all">
              <div className="flex items-center gap-8">
                <div className="size-14 rounded-2xl bg-[#fabf37]/10 text-[#fabf37] flex items-center justify-center">
                  <Users className="size-6" />
                </div>
                <div>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{c.title}</h4>
                  <div className="flex gap-4 mt-1">
                    <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{c.dept}</span>
                    <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{c.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="px-4 py-1.5 rounded-full bg-white/5 text-[9px] font-black text-white uppercase tracking-widest">{c.type}</span>
                <div className="flex gap-2">
                  <button className="size-10 rounded-xl bg-white/5 text-zinc-400 hover:text-white flex items-center justify-center"><Edit className="size-4" /></button>
                  <button 
                    onClick={() => handleDeleteJob(c.id)}
                    className="size-10 rounded-xl bg-white/5 text-zinc-400 hover:text-red-500 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Job Modal */}
        <AnimatePresence>
          {isAddProductOpen && (
            <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsAddProductOpen(false)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-lg bg-zinc-900 rounded-[40px] p-10 border border-white/10 shadow-2xl"
              >
                <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Post New Position</h3>
                <form onSubmit={handleAddJob} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Job Title</label>
                    <input name="title" required placeholder="e.g. Senior Machine Operator" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Department</label>
                      <input name="dept" required placeholder="e.g. Logistics" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Job Type</label>
                      <select name="type" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all appearance-none">
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-zinc-500 tracking-widest ml-2">Location</label>
                    <input name="location" required placeholder="e.g. Dhaka, BD" className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white text-sm outline-none focus:border-[#fabf37] transition-all" />
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setIsAddProductOpen(false)} className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-[11px]">Cancel</button>
                    <button type="submit" className="flex-1 py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px]">Publish Job</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Impact Dashboard") {
    const handleSaveStats = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const newStats = {
        totalCups: parseInt(formData.get('totalCups') as string),
        wonderfulBusinesses: parseInt(formData.get('wonderfulBusinesses') as string),
        lastSync: new Date().toISOString()
      };
      if (onUpdateProductionStats) onUpdateProductionStats(newStats);
      toast.success("Impact Metrics Synchronized with ERP");
    };

    return (
      <ViewContainer 
        title="Impact Dashboard Editor" 
        subtitle="Manage Global Sustainability & Production Stats"
        actions={
          <button 
            onClick={() => setSelectedCategory(null)}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10"
          >
            Back to CMS
          </button>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                <TrendingUp className="size-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Live Production Hub</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Connected to Cloud ERP Node</p>
              </div>
            </div>

            <form onSubmit={handleSaveStats} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Total Paper Cups Produced (Base)</label>
                <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                  <Box className="size-4 text-zinc-500" />
                  <input 
                    name="totalCups"
                    type="number" 
                    defaultValue={productionStats?.totalCups || 69550257}
                    className="w-full bg-transparent text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2">Wonderful Businesses Partnered</label>
                <div className="flex items-center gap-3 bg-black border border-white/10 rounded-2xl px-5 py-4 focus-within:border-[#fabf37] transition-all">
                  <Users className="size-4 text-zinc-500" />
                  <input 
                    name="wonderfulBusinesses"
                    type="number" 
                    defaultValue={productionStats?.wonderfulBusinesses || 5754}
                    className="w-full bg-transparent text-white text-sm outline-none"
                  />
                </div>
              </div>

              <div className="bg-black/40 border border-[#fabf37]/20 rounded-2xl p-6 flex items-start gap-4">
                <div className="size-2 rounded-full bg-emerald-500 animate-pulse mt-1" />
                <div>
                  <p className="text-[10px] font-black text-white uppercase tracking-tight">AI-Assisted ERP Sync: ON</p>
                  <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest mt-1 leading-relaxed">
                    Values will increment automatically on the live site to reflect real-time production flow. <br/>
                    <span className="text-[#fabf37]">Last ERP Handshake: {productionStats?.lastSync ? new Date(productionStats.lastSync).toLocaleTimeString() : 'N/A'}</span>
                  </p>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-[#fabf37] text-black rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-[0_20px_40px_rgba(250,191,55,0.2)] hover:scale-[1.02] active:scale-95 transition-all"
              >
                Sync with Global Node
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="bg-black border border-white/5 rounded-[40px] p-10">
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6">Sustainability Impact Metrics</h4>
              <div className="space-y-4">
                {impactStats.map((stat: any, i: number) => (
                  <div key={i} className="p-4 bg-zinc-900/30 rounded-2xl border border-white/5 flex justify-between items-center group">
                    <div>
                      <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-lg font-black text-white">{stat.value}</p>
                    </div>
                    <button className="text-[10px] font-black text-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">Edit</button>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => toast.info("Sustainability metrics are locked to Carbon Calculator API.")}
                className="w-full py-4 mt-8 bg-white/5 text-white text-[10px] font-black uppercase tracking-widest rounded-xl border border-white/5"
              >
                Configure Carbon API
              </button>
            </div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory === "Legal/Privacy") {
    return (
      <ViewContainer 
        title="Legal & Compliance" 
        subtitle="Manage Privacy Policy & Terms"
        actions={<button onClick={() => setSelectedCategory(null)} className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10">Back</button>}
      >
        <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-12 space-y-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-4">Privacy Policy Content</label>
            <textarea 
              className="w-full h-64 bg-black border border-white/10 rounded-3xl p-8 text-white text-sm outline-none focus:border-[#fabf37] transition-all resize-none custom-scrollbar"
              defaultValue="Paperware Manufacturing is committed to protecting your industrial data and privacy. Our protocols ensure that all B2B transactions remain encrypted and secure. We do not share client specifications with third parties without explicit authorization."
            />
          </div>
          <button className="bg-[#fabf37] text-black px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all">Update Legal Docs</button>
        </div>
      </ViewContainer>
    );
  }

  if (selectedCategory) {
    return (
      <ViewContainer 
        title={`Editing: ${selectedCategory}`} 
        subtitle="Live Content Synchronization Active"
        actions={
          <button 
            onClick={() => setSelectedCategory(null)}
            className="bg-white/5 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/10 flex items-center gap-2"
          >
            <ChevronRight className="size-4 rotate-180" /> Back to List
          </button>
        }
      >
        <div className="bg-zinc-900/30 border border-white/5 rounded-[40px] p-12 flex flex-col items-center justify-center text-center space-y-6 min-h-[400px]">
           <div className="size-20 rounded-full bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37]">
              <Edit className="size-8" />
           </div>
           <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Visual Editor Loading</h3>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">Fetching module schema from production branch...</p>
           </div>
           <div className="w-full max-w-md h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-[#fabf37] opacity-50" 
              />
           </div>
        </div>
      </ViewContainer>
    );
  }

  return (
    <ViewContainer title="Website Editor" subtitle="Content Management & Site Config" actions={
      <button 
        onClick={() => toast.success("All changes published to production node.")}
        className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all"
      >
        <CircleCheck className="size-4" /> Publish Changes
      </button>
    }>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { label: "Hero Banner", items: 4, last: "2h ago" },
          { label: "Product Gallery", items: 124, last: "1d ago" },
          { label: "Client Testimonials", items: 12, last: "3h ago" },
          { label: "Client Projects", items: clientProjects.length, last: "Now" },
          { label: "Impact Dashboard", items: 6, last: "5m ago" },
          { label: "Career Postings", items: 3, last: "1w ago" },
          { label: "Legal/Privacy", items: 2, last: "2m ago" },
        ].map((item, i) => (
          <div 
            key={i} 
            onClick={() => setSelectedCategory(item.label)}
            className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 hover:border-[#fabf37] transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <Edit className="size-4 text-[#fabf37]" />
            </div>
            <div className="flex justify-between items-start mb-6">
              <div className="size-12 rounded-2xl bg-black flex items-center justify-center text-[#fabf37]">
                <Box className="size-6" />
              </div>
              <span className="text-[9px] font-black text-zinc-500 uppercase">{item.last}</span>
            </div>
            <h4 className="text-xl font-black text-white uppercase tracking-tight mb-2">{item.label}</h4>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.items} Dynamic Modules</p>
            <button className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase text-[#fabf37] group-hover:gap-4 transition-all pointer-events-none">
              Manage Content <ChevronRight className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ViewContainer>
  );
}

// Social Hub Style Background Component
const SocialHubBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,191,55,0.05),transparent_70%)]" />
    <svg className="absolute w-full h-full opacity-20">
      <defs>
        <pattern id="hub-grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hub-grid)" />
    </svg>
    
    {/* Floating Data Nodes */}
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [Math.random() * 100, Math.random() * -100],
          x: [Math.random() * 100, Math.random() * -100],
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10 + Math.random() * 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute size-1 rounded-full bg-[#fabf37] blur-[1px]"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`
        }}
      />
    ))}
  </div>
);

export function AINeuralSyncView() {
  const [syncStatus, setSyncStatus] = React.useState('idle');
  const [progress, setProgress] = React.useState(0);
  const [neuralLinks, setNeuralLinks] = React.useState(12842);
  
  const triggerSync = () => {
    setSyncStatus('syncing');
    setProgress(0);
    toast.loading("Neural Engine: Initiating Core Synchronization...");
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSyncStatus('complete');
          setNeuralLinks(prevLinks => prevLinks + Math.floor(Math.random() * 500) + 100);
          toast.dismiss();
          toast.success("Neural Sync Successful", {
            description: "Distributed ledger updated across all manufacturing nodes.",
            icon: <Zap className="size-4 text-[#fabf37]" />
          });
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <ViewContainer 
      title="AI Neural Sync" 
      subtitle="Advanced Manufacturing Data Intelligence"
      actions={
        <button 
          onClick={triggerSync}
          disabled={syncStatus === 'syncing'}
          className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(250,191,55,0.3)]"
        >
          <Zap className={`size-4 ${syncStatus === 'syncing' ? 'animate-pulse' : ''}`} /> 
          {syncStatus === 'syncing' ? 'Neural Processing...' : 'Trigger Global Sync'}
        </button>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Visualizer */}
          <div className="bg-black border border-white/5 rounded-[48px] p-10 relative overflow-hidden h-[400px] flex flex-col justify-center items-center">
            {/* HUD Scanning Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none" />
            
            {/* Animated Neural Core */}
            <div className="relative">
              <motion.div 
                animate={{ 
                  scale: syncStatus === 'syncing' ? [1, 1.2, 1] : [1, 1.05, 1],
                  rotate: 360,
                  opacity: syncStatus === 'syncing' ? [0.5, 1, 0.5] : 0.8
                }}
                transition={{ duration: syncStatus === 'syncing' ? 2 : 10, repeat: Infinity, ease: "linear" }}
                className="size-48 md:size-64 rounded-full border border-[#fabf37]/20 flex items-center justify-center relative"
              >
                <div className="absolute inset-0 bg-[#fabf37]/5 blur-[60px] rounded-full" />
                <Sparkles className="size-20 text-[#fabf37]" />
              </motion.div>
              
              {/* Spinning Rings */}
              <motion.div 
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-20px] border-t-2 border-dashed border-[#fabf37]/10 rounded-full" 
              />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-40px] border-l-2 border-dotted border-white/5 rounded-full" 
              />
            </div>

            <div className="mt-12 text-center relative z-10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em]">Engine Status:</span>
                <span className={`text-[10px] font-black uppercase tracking-[0.4em] ${syncStatus === 'syncing' ? 'text-emerald-500 animate-pulse' : 'text-zinc-500'}`}>
                  {syncStatus === 'syncing' ? 'Active Processing' : 'Standby / Optimal'}
                </span>
              </div>
              <h4 className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                {progress}%
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-xl bg-[#fabf37]/10 text-[#fabf37] flex items-center justify-center">
                  <Activity className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Neural Connections</p>
                  <p className="text-lg font-black text-white uppercase tabular-nums">{neuralLinks.toLocaleString()}</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  animate={{ width: `${(neuralLinks / 20000) * 100}%` }}
                  className="h-full bg-[#fabf37] shadow-[0_0_10px_rgba(250,191,55,0.5)]" 
                />
              </div>
            </div>
            <div className="bg-zinc-900/50 border border-white/5 rounded-[32px] p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                  <Globe className="size-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Latency</p>
                  <p className="text-lg font-black text-white uppercase tabular-nums">14ms</p>
                </div>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "100%" }}
                  animate={{ width: "14%" }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black border border-white/5 rounded-[48px] p-8 space-y-8">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Sync Topology</h3>
          
          <div className="space-y-6">
            {[
              { name: "Node: Dhaka (Primary)", status: "connected", load: "24%" },
              { name: "Node: Istanbul (Edge)", status: "connected", load: "12%" },
              { name: "Node: Dubai (Relay)", status: "standby", load: "0%" },
              { name: "Node: London (Gateway)", status: "connected", load: "45%" },
              { name: "ERP Interface (Radix)", status: "connected", load: "88%" },
            ].map((node, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className={`size-2 rounded-full ${node.status === 'connected' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest group-hover:text-white transition-colors">{node.name}</span>
                </div>
                <span className="text-[9px] font-black text-zinc-600 tabular-nums">{node.load}</span>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/5">
            <div className="p-6 bg-zinc-900/30 rounded-3xl border border-white/[0.02] flex items-center gap-4">
              <ShieldCheck className="size-6 text-emerald-500" />
              <div>
                <p className="text-[9px] font-black text-white uppercase">Neural Encryption Active</p>
                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest mt-1">AES-4096 Multi-Layered</p>
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-white/5 text-zinc-400 hover:text-white border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
            Export Neural Logs
          </button>
        </div>
      </div>
    </ViewContainer>
  );
}

export function ProductionInventoryView() {
  const [activeSubTab, setActiveSubTab] = React.useState('inventory');

  return (
    <ViewContainer 
      title="Production Control" 
      subtitle="Real-time Manufacturing & Inventory Assets"
      actions={
        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
          <button 
            onClick={() => setActiveSubTab('inventory')}
            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'inventory' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            Inventory
          </button>
          <button 
            onClick={() => setActiveSubTab('live')}
            className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeSubTab === 'live' ? 'bg-[#fabf37] text-black' : 'text-zinc-500 hover:text-white'}`}
          >
            Live Floor
          </button>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        {activeSubTab === 'inventory' ? (
          <motion.div 
            key="inventory"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-black border border-white/5 rounded-[48px] overflow-hidden"
          >
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">ID</th>
                  <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Asset Name</th>
                  <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Stock Level</th>
                  <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest">Category</th>
                  <th className="px-10 py-8 text-[10px] font-black text-zinc-500 uppercase tracking-widest text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                    <td className="px-10 py-6 text-xs font-black text-[#fabf37] uppercase">{item.id}</td>
                    <td className="px-10 py-6 text-sm font-black text-white uppercase">{item.name}</td>
                    <td className="px-10 py-6 text-xs font-bold text-zinc-400 tabular-nums">{item.stock.toLocaleString()} UNITS</td>
                    <td className="px-10 py-6 text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.category}</td>
                    <td className="px-10 py-6 text-right">
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                        item.status === 'In Stock' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                        item.status === 'Low Stock' ? 'bg-[#fabf37]/10 text-[#fabf37] border-[#fabf37]/20' :
                        'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div 
            key="live"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {liveMachines.map((machine) => (
              <div key={machine.id} className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8 space-y-6 group hover:border-[#fabf37]/30 transition-all">
                <div className="flex justify-between items-start">
                  <div className="size-12 rounded-2xl bg-black border border-white/5 flex items-center justify-center text-[#fabf37]">
                    <Activity className={`size-6 ${machine.status === 'Operational' ? 'animate-pulse' : ''}`} />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                    machine.status === 'Operational' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-[#fabf37]/10 text-[#fabf37]'
                  }`}>
                    {machine.status}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{machine.id}</p>
                  <h4 className="text-xl font-black text-white uppercase tracking-tight mt-1">{machine.name}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Velocity</p>
                    <p className="text-sm font-black text-white uppercase mt-1">{machine.speed}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Thermal</p>
                    <p className="text-sm font-black text-white uppercase mt-1">{machine.temp}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </ViewContainer>
  );
}

export function RFQPipelineView() {
  const [rfqs, setRfqs] = React.useState([
    { id: "RFQ-10293", client: "Arabica Coffee Co.", product: "8oz Double Wall", quantity: "50,000 pcs", status: "pending", time: "2h ago", value: "$4,500" },
    { id: "RFQ-10294", client: "Green Leaf Cafe", product: "Eco-Friendly Tray", quantity: "10,000 pcs", status: "reviewing", time: "4h ago", value: "$1,200" },
    { id: "RFQ-10295", client: "Global Catering", product: "Single Wall (Custom)", quantity: "250,000 pcs", status: "quoted", time: "6h ago", value: "$18,500" },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setRfqs(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`RFQ ${id} moved to ${newStatus}`);
  };

  return (
    <ViewContainer title="RFQ Pipeline" subtitle="Manage Incoming Quotation Requests">
      <div className="space-y-4">
        {rfqs.map((rfq) => (
          <div key={rfq.id} className="bg-black border border-white/5 rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-[#fabf37]/50 transition-all">
            <div className="flex items-center gap-6">
              <div className="size-14 rounded-2xl bg-zinc-900 flex items-center justify-center text-[#fabf37]">
                <FileText className="size-6" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="text-xl font-black text-white uppercase tracking-tight">{rfq.client}</h4>
                  <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{rfq.id}</span>
                </div>
                <p className="text-sm font-bold text-zinc-400 mt-1">{rfq.product} • {rfq.quantity} • <span className="text-[#fabf37]">{rfq.value}</span></p>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <select 
                 value={rfq.status}
                 onChange={(e) => updateStatus(rfq.id, e.target.value)}
                 className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white outline-none focus:border-[#fabf37]"
               >
                 <option value="pending">Pending</option>
                 <option value="reviewing">Reviewing</option>
                 <option value="quoted">Quoted</option>
                 <option value="closed">Closed</option>
               </select>
               <button className="size-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 hover:text-white"><Eye className="size-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </ViewContainer>
  );
}

export function ActiveOrdersView() {
  return (
    <ViewContainer title="Active Orders" subtitle="Production & Logistics Tracking">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { id: "ORD-9901", product: "8oz Double Wall", progress: 65, status: "In Production", client: "Coffee World" },
            { id: "ORD-9902", product: "Eco-Liner Box", progress: 90, status: "Quality Check", client: "Burger Point" },
            { id: "ORD-9903", product: "Custom Gift Bag", progress: 25, status: "Material Sourcing", client: "Luxury Gifts" },
          ].map((ord) => (
            <div key={ord.id} className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-6">
               <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{ord.id}</p>
                    <h4 className="text-xl font-black text-white uppercase tracking-tight mt-1">{ord.product}</h4>
                  </div>
                  <span className="px-4 py-1.5 rounded-full bg-white/5 text-[9px] font-black text-zinc-400 uppercase tracking-widest">{ord.status}</span>
               </div>
               <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-black uppercase text-zinc-500">
                    <span>Production Progress</span>
                    <span className="text-white">{ord.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${ord.progress}%` }} className="h-full bg-[#fabf37]" />
                  </div>
               </div>
               <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-[#fabf37] transition-all">Open Production Node</button>
            </div>
          ))}
       </div>
    </ViewContainer>
  );
}

export function ClientCRMView() {
  return (
    <ViewContainer title="Client CRM" subtitle="B2B Relationship Management">
       <div className="bg-black border border-white/5 rounded-[40px] overflow-hidden">
          <table className="w-full text-left">
             <thead className="bg-zinc-900/50 border-b border-white/5">
                <tr>
                   <th className="p-6 text-[10px] font-black text-zinc-500 uppercase">Client Name</th>
                   <th className="p-6 text-[10px] font-black text-zinc-500 uppercase">Tier</th>
                   <th className="p-6 text-[10px] font-black text-zinc-500 uppercase">Total Revenue</th>
                   <th className="p-6 text-[10px] font-black text-zinc-500 uppercase text-right">Actions</th>
                </tr>
             </thead>
             <tbody>
                {[
                  { name: "Global Foods Ltd", tier: "Platinum", rev: "$240,500" },
                  { name: "Metro Cafe", tier: "Gold", rev: "$85,200" },
                  { name: "Eco Solutions", tier: "Silver", rev: "$12,400" },
                ].map((c, i) => (
                  <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-xl bg-zinc-800 flex items-center justify-center text-[#fabf37] font-black">{c.name[0]}</div>
                        <span className="text-sm font-bold text-white uppercase tracking-tight">{c.name}</span>
                      </div>
                    </td>
                    <td className="p-6"><span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{c.tier}</span></td>
                    <td className="p-6 text-sm font-black text-white">{c.rev}</td>
                    <td className="p-6 text-right">
                       <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest">Manage Account</button>
                    </td>
                  </tr>
                ))}
             </tbody>
          </table>
       </div>
    </ViewContainer>
  );
}

export function SustainabilityView() {
  return (
    <ViewContainer title="Sustainability Metrics" subtitle="ESG Tracking & Environmental Impact">
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10 space-y-8">
             <h3 className="text-xl font-black text-white uppercase tracking-tight">Carbon Footprint Analysis</h3>
             <div className="space-y-6">
                {[
                  { label: "Manufacturing Scope 1", val: 45, max: 100 },
                  { label: "Logistics Scope 2", val: 72, max: 100 },
                  { label: "Supply Chain Scope 3", val: 28, max: 100 },
                ].map((s, i) => (
                  <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black text-zinc-400 uppercase">
                        <span>{s.label}</span>
                        <span className="text-[#fabf37]">{s.val} tons</span>
                     </div>
                     <div className="w-full h-1 bg-black rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${s.val}%` }} className="h-full bg-emerald-500" />
                     </div>
                  </div>
                ))}
             </div>
          </div>
          <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[40px] p-10 flex flex-col items-center justify-center text-center space-y-6">
             <Leaf className="size-16 text-emerald-500" />
             <h4 className="text-2xl font-black text-white uppercase tracking-tight">Global Impact Score: 92/100</h4>
             <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">Your manufacturing facility is operating at 92% eco-efficiency. <br/> Keep up the green transition!</p>
             <button className="px-10 py-4 bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl">Download ESG Report</button>
          </div>
       </div>
    </ViewContainer>
  );
}

export function SecurityComplianceView() {
  return (
    <ViewContainer title="Security & Compliance" subtitle="Industrial Security Protocols & Legal">
       <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { label: "SSL Encryption", status: "Secure", icon: <ShieldCheck /> },
               { label: "API Integrity", status: "Operational", icon: <RefreshCw /> },
               { label: "Audit Logs", status: "Clean", icon: <FileText /> },
             ].map((item, i) => (
               <div key={i} className="bg-black border border-white/5 rounded-3xl p-8 flex items-center gap-6">
                  <div className="size-12 rounded-2xl bg-zinc-900 flex items-center justify-center text-[#fabf37]">{item.icon}</div>
                  <div>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{item.label}</p>
                    <p className="text-lg font-black text-white uppercase">{item.status}</p>
                  </div>
               </div>
             ))}
          </div>
          <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-10">
             <h3 className="text-xl font-black text-white uppercase tracking-tight mb-8">Access Control Matrix</h3>
             <div className="space-y-4">
                {[
                  { user: "JS Admin", role: "Superuser", access: "Full", last: "2m ago" },
                  { user: "Ops Team", role: "Manager", access: "Factory Only", last: "1h ago" },
                  { user: "Sales Rep", role: "Viewer", access: "CRM Only", last: "4h ago" },
                ].map((u, i) => (
                  <div key={i} className="flex items-center justify-between py-4 border-b border-white/5 last:border-0">
                     <div className="flex items-center gap-4">
                        <div className="size-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-black">{u.user[0]}</div>
                        <div>
                           <p className="text-sm font-bold text-white uppercase">{u.user}</p>
                           <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">{u.role}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] font-black text-[#fabf37] uppercase">{u.access} Access</p>
                        <p className="text-[8px] font-bold text-zinc-600 uppercase mt-1">{u.last}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
       </div>
    </ViewContainer>
  );
}

// Helper Component for Translation Management
function TranslationManager({ language, onClose }: { language: any, onClose: () => void }) {
  const [isTranslatingAll, setIsTranslatingAll] = React.useState(false);
  
  // Mock pages data generator based on language coverage
  const generatePages = () => {
    const pages = [
      { name: "Home / Landing", priority: "High", size: "1.2kb" },
      { name: "Product Gallery", priority: "High", size: "4.5kb" },
      { name: "Contact Us", priority: "Medium", size: "0.8kb" },
      { name: "About Company", priority: "Medium", size: "2.1kb" },
      { name: "Legal / Privacy", priority: "Low", size: "5.6kb" },
      { name: "Checkout Flow", priority: "Critical", size: "3.2kb" },
      { name: "User Dashboard", priority: "High", size: "4.1kb" },
      { name: "Admin Panel", priority: "Low", size: "12.4kb" },
    ];
    
    return pages.map(p => {
       // Simulate completion based on global coverage
       const isComplete = Math.random() * 100 < language.coverage;
       return {
         ...p,
         status: isComplete ? "Stable" : "Missing",
         progress: isComplete ? 100 : Math.floor(Math.random() * 80)
       };
    });
  };

  const [pages, setPages] = React.useState(generatePages());

  const handleTranslatePage = (index: number) => {
    const newPages = [...pages];
    newPages[index] = { ...newPages[index], status: "Processing...", progress: newPages[index].progress };
    setPages(newPages);

    setTimeout(() => {
      setPages(current => {
        const updated = [...current];
        updated[index] = { ...updated[index], status: "Stable", progress: 100 };
        return updated;
      });
      toast.success(`Translated ${pages[index].name} to ${language.name}`);
    }, 1500);
  };

  const handleTranslateAll = () => {
    setIsTranslatingAll(true);
    toast.loading("Initiating Neural Translation Matrix...");
    
    setTimeout(() => {
        setPages(current => current.map(p => ({ ...p, status: "Stable", progress: 100 })));
        setIsTranslatingAll(false);
        toast.dismiss();
        toast.success(`Full ${language.name} Translation Complete`, {
          description: "All modules are now 100% synced with English master."
        });
    }, 4000);
  };

  return (
    <div className="h-full flex flex-col font-['Poppins',sans-serif]">
       <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
             <span className="text-4xl">{(() => {
                const flags: any = { 'EN': '🇺🇸', 'BN': '🇧🇩', 'AR': '🇸🇦', 'TR': '🇹🇷', 'ES': '🇪🇸', 'FR': '🇫🇷', 'DE': '🇩🇪', 'JP': '🇯🇵', 'CN': '🇨🇳', 'IN': '🇮🇳', 'RU': '🇷🇺', 'PT': '🇵🇹', 'IT': '🇮🇹', 'NL': '🇳🇱', 'ID': '🇮🇩', 'VI': '🇻🇳', 'TH': '🇹🇭', 'MS': '🇲🇾', 'PL': '🇵🇱', 'SV': '🇸🇪', 'NO': '🇳🇴', 'FI': '🇫🇮', 'DA': '🇩🇰', 'EL': '🇬🇷', 'HE': '🇮🇱', 'CS': '🇨🇿', 'HU': '🇭🇺', 'RO': '🇷🇴', 'UK': '🇺🇦', 'SK': '🇸🇰', 'BG': '🇧🇬', 'HR': '🇭🇷', 'LT': '🇱🇹', 'LV': '🇱🇻', 'ET': '🇪🇪', 'SL': '🇸🇮', 'MT': '🇲🇹', 'IS': '🇮🇸', 'GA': '🇮🇪', 'SQ': '🇦🇱', 'MK': '🇲🇰', 'HY': '🇦🇲', 'KA': '🇬🇪' };
                return flags[language.code] || '🌐';
             })()}</span>
             <div>
               <h3 className="text-2xl font-black text-white uppercase tracking-tight">{language.name} ({language.code})</h3>
               <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Node ID: {language.code}-{Math.floor(Math.random() * 999)}</p>
             </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6">
             <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Total Strings</p>
                <p className="text-xl font-black text-white">4,281</p>
             </div>
             <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Missing</p>
                <p className="text-xl font-black text-[#fabf37]">{pages.filter(p => p.progress < 100).length} Pages</p>
             </div>
             <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Est. Time</p>
                <p className="text-xl font-black text-white">~2m</p>
             </div>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-3">
          {pages.map((page, i) => (
            <div key={i} className="bg-black border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:border-white/10 transition-colors">
               <div className="flex-1 mr-4">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-xs font-black text-white uppercase">{page.name}</span>
                     <span className={`text-[9px] font-bold uppercase tracking-widest ${page.progress === 100 ? 'text-emerald-500' : 'text-[#fabf37]'}`}>
                        {page.progress === 100 ? 'Stable' : `${page.progress}%`}
                     </span>
                  </div>
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }} 
                       animate={{ width: `${page.progress}%` }} 
                       className={`h-full ${page.progress === 100 ? 'bg-emerald-500' : 'bg-[#fabf37]'}`} 
                     />
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                     <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest bg-zinc-900 px-2 py-0.5 rounded-full">{page.priority}</span>
                     <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">{page.size}</span>
                  </div>
               </div>
               
               {page.progress < 100 ? (
                 <button 
                   onClick={() => handleTranslatePage(i)}
                   disabled={page.status === 'Processing...'}
                   className="size-8 rounded-lg bg-[#fabf37]/10 text-[#fabf37] hover:bg-[#fabf37] hover:text-black flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                 >
                    <Sparkles className={`size-4 ${page.status === 'Processing...' ? 'animate-spin' : ''}`} />
                 </button>
               ) : (
                 <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                    <CircleCheck className="size-4" />
                 </div>
               )}
            </div>
          ))}
       </div>

       <div className="mt-6 pt-6 border-t border-white/5">
          <button 
            onClick={handleTranslateAll}
            disabled={isTranslatingAll || pages.every(p => p.progress === 100)}
            className="w-full py-4 bg-[#fabf37] text-black rounded-xl font-black uppercase tracking-widest text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_30px_rgba(250,191,55,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
             {isTranslatingAll ? (
               <>
                 <RefreshCw className="size-4 animate-spin" />
                 Processing Global Matrix...
               </>
             ) : (
               <>
                 <Sparkles className="size-4" />
                 Translate All Missing ({pages.filter(p => p.progress < 100).length})
               </>
             )}
          </button>
       </div>
    </div>
  );
}

export function LanguageView() {
  const [isSyncing, setIsSyncing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [sortConfig, setSortConfig] = React.useState({ key: 'coverage', direction: 'desc' });
  const [selectedLanguage, setSelectedLanguage] = React.useState<any>(null);
  
  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 2000);
  };

  const handleSort = (key: any) => {
    setSortConfig(current => ({
        key,
        direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
    }));
  };

  const languages = [
    { code: "EN", name: "English", coverage: 100, status: "stable", ai_health: 100, users: "12.4k" },
    { code: "BN", name: "Bengali", coverage: 100, status: "stable", ai_health: 100, users: "8.2k" },
    { code: "AR", name: "Arabic", coverage: 100, status: "stable", ai_health: 100, users: "4.1k" },
    { code: "TR", name: "Turkish", coverage: 100, status: "stable", ai_health: 100, users: "3.5k" },
    { code: "DE", name: "German", coverage: 100, status: "stable", ai_health: 100, users: "2.8k" },
    { code: "FR", name: "French", coverage: 100, status: "stable", ai_health: 100, users: "3.2k" },
    { code: "ES", name: "Spanish", coverage: 100, status: "stable", ai_health: 100, users: "4.5k" },
    { code: "ZH", name: "Chinese", coverage: 100, status: "stable", ai_health: 100, users: "6.7k" },
    { code: "JA", name: "Japanese", coverage: 100, status: "stable", ai_health: 100, users: "2.1k" },
    { code: "KO", name: "Korean", coverage: 100, status: "stable", ai_health: 100, users: "1.8k" },
    { code: "HI", name: "Hindi", coverage: 100, status: "stable", ai_health: 100, users: "9.3k" },
    { code: "UR", name: "Urdu", coverage: 100, status: "stable", ai_health: 100, users: "3.2k" },
    { code: "RU", name: "Russian", coverage: 100, status: "stable", ai_health: 100, users: "5.1k" },
    { code: "PT", name: "Portuguese", coverage: 100, status: "stable", ai_health: 100, users: "3.9k" },
    { code: "IT", name: "Italian", coverage: 100, status: "stable", ai_health: 100, users: "2.4k" },
    { code: "NL", name: "Dutch", coverage: 100, status: "stable", ai_health: 100, users: "1.9k" },
    { code: "ID", name: "Indonesian", coverage: 100, status: "stable", ai_health: 100, users: "6.2k" },
    { code: "VI", name: "Vietnamese", coverage: 100, status: "stable", ai_health: 100, users: "4.8k" },
    { code: "TH", name: "Thai", coverage: 100, status: "stable", ai_health: 100, users: "2.9k" },
    { code: "MS", name: "Malay", coverage: 100, status: "stable", ai_health: 100, users: "3.1k" },
    { code: "FA", name: "Persian", coverage: 100, status: "stable", ai_health: 100, users: "2.5k" },
    { code: "PL", name: "Polish", coverage: 100, status: "stable", ai_health: 100, users: "1.7k" },
    { code: "SV", name: "Swedish", coverage: 100, status: "stable", ai_health: 100, users: "1.2k" },
    { code: "NO", name: "Norwegian", coverage: 100, status: "stable", ai_health: 100, users: "0.9k" },
    { code: "FI", name: "Finnish", coverage: 100, status: "stable", ai_health: 100, users: "0.8k" },
    { code: "DA", name: "Danish", coverage: 100, status: "stable", ai_health: 100, users: "1.1k" },
    { code: "EL", name: "Greek", coverage: 100, status: "stable", ai_health: 100, users: "1.4k" },
    { code: "HE", name: "Hebrew", coverage: 100, status: "stable", ai_health: 100, users: "1.6k" },
    { code: "CS", name: "Czech", coverage: 100, status: "stable", ai_health: 100, users: "1.3k" },
    { code: "HU", name: "Hungarian", coverage: 100, status: "stable", ai_health: 100, users: "1.1k" },
    { code: "RO", name: "Romanian", coverage: 100, status: "stable", ai_health: 100, users: "1.8k" },
    { code: "UK", name: "Ukrainian", coverage: 100, status: "stable", ai_health: 100, users: "2.2k" },
    { code: "SK", name: "Slovak", coverage: 100, status: "stable", ai_health: 100, users: "0.9k" },
    { code: "BG", name: "Bulgarian", coverage: 100, status: "stable", ai_health: 100, users: "0.8k" },
    { code: "HR", name: "Croatian", coverage: 100, status: "stable", ai_health: 100, users: "0.7k" },
    { code: "LT", name: "Lithuanian", coverage: 100, status: "stable", ai_health: 100, users: "0.5k" },
    { code: "LV", name: "Latvian", coverage: 100, status: "stable", ai_health: 100, users: "0.4k" },
    { code: "ET", name: "Estonian", coverage: 100, status: "stable", ai_health: 100, users: "0.3k" },
    { code: "SL", name: "Slovenian", coverage: 100, status: "stable", ai_health: 100, users: "0.4k" },
    { code: "MT", name: "Maltese", coverage: 100, status: "stable", ai_health: 100, users: "0.1k" },
    { code: "IS", name: "Icelandic", coverage: 100, status: "stable", ai_health: 100, users: "0.2k" },
    { code: "GA", name: "Irish", coverage: 100, status: "stable", ai_health: 100, users: "0.3k" },
    { code: "SQ", name: "Albanian", coverage: 100, status: "stable", ai_health: 100, users: "0.6k" },
    { code: "MK", name: "Macedonian", coverage: 100, status: "stable", ai_health: 100, users: "0.5k" },
    { code: "HY", name: "Armenian", coverage: 100, status: "stable", ai_health: 100, users: "0.7k" },
    { code: "KA", name: "Georgian", coverage: 100, status: "stable", ai_health: 100, users: "0.8k" }
  ];

  const filteredLanguages = languages
    .filter(lang => 
      (statusFilter === 'all' || lang.status === statusFilter) &&
      (lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       lang.code.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  return (
    <ViewContainer 
      title="Language Ecosystem" 
      subtitle="46-Language Integration Matrix"
      actions={
        <button 
          onClick={handleSync}
          disabled={isSyncing}
          className="bg-[#fabf37] text-black px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <RefreshCw className={`size-4 ${isSyncing ? 'animate-spin' : ''}`} /> 
          {isSyncing ? 'Syncing...' : 'Sync Translations'}
        </button>
      }
    >
      <Sheet open={!!selectedLanguage} onOpenChange={(open) => !open && setSelectedLanguage(null)}>
        <SheetContent side="right" className="bg-zinc-950 border-l border-white/10 w-full sm:max-w-xl p-0 z-[10000]">
           <SheetHeader className="sr-only">
              <SheetTitle>Translation Details: {selectedLanguage?.name}</SheetTitle>
              <SheetDescription>Manage page-level translation progress for {selectedLanguage?.name}</SheetDescription>
           </SheetHeader>
           {selectedLanguage && (
              <div className="h-full p-8">
                 <TranslationManager language={selectedLanguage} onClose={() => setSelectedLanguage(null)} />
              </div>
           )}
        </SheetContent>
      </Sheet>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Languages</p>
            <div className="flex items-end gap-2">
               <p className="text-3xl font-black text-white">46</p>
               <p className="text-[10px] font-bold text-emerald-500 mb-1">+4 WIP</p>
            </div>
         </div>
         <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Global Coverage</p>
            <p className="text-3xl font-black text-[#fabf37]">100%</p>
         </div>
         <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">AI Translation Health</p>
            <p className="text-3xl font-black text-white">92.8%</p>
         </div>
         <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 space-y-2">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Total Strings</p>
            <p className="text-3xl font-black text-white">12,482</p>
         </div>
      </div>

      <div className="bg-black border border-white/5 rounded-[32px] overflow-hidden">
        <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center gap-4">
              <div className="size-10 rounded-xl bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37]">
                 <Languages className="size-5" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">Integration Pipeline</h3>
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Showing {filteredLanguages.length} of 46 Languages</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                <input 
                  type="text"
                  placeholder="Search Language..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl py-2 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#fabf37] transition-colors w-64"
                />
              </div>
              <div className="flex gap-2">
                 {['all', 'stable', 'beta', 'dev'].map(status => (
                   <button 
                     key={status}
                     onClick={() => setStatusFilter(status)}
                     className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-colors ${
                       statusFilter === status 
                         ? 'bg-[#fabf37] text-black' 
                         : 'bg-white/5 text-zinc-400 hover:text-white'
                     }`}
                   >
                     {status === 'all' ? 'All' : status}
                   </button>
                 ))}
              </div>
           </div>
        </div>
        
        <div className="overflow-x-auto max-h-[600px]">
          <table className="w-full text-left">
            <thead className="bg-zinc-900/20 border-b border-white/5 sticky top-0 z-20 backdrop-blur-md">
              <tr>
                <th onClick={() => handleSort('name')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                   <div className="flex items-center gap-2">
                      Language Locale
                      <span className={`transition-opacity ${sortConfig.key === 'name' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                        {sortConfig.key === 'name' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      </span>
                   </div>
                </th>
                <th onClick={() => handleSort('coverage')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                   <div className="flex items-center gap-2">
                      Coverage
                      <span className={`transition-opacity ${sortConfig.key === 'coverage' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                        {sortConfig.key === 'coverage' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      </span>
                   </div>
                </th>
                <th onClick={() => handleSort('ai_health')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                   <div className="flex items-center gap-2">
                      AI Translation Health
                      <span className={`transition-opacity ${sortConfig.key === 'ai_health' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                        {sortConfig.key === 'ai_health' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      </span>
                   </div>
                </th>
                <th onClick={() => handleSort('users')} className="p-6 text-[10px] font-black text-zinc-500 uppercase cursor-pointer hover:text-white transition-colors select-none group">
                   <div className="flex items-center gap-2">
                      Daily Users
                      <span className={`transition-opacity ${sortConfig.key === 'users' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                        {sortConfig.key === 'users' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      </span>
                   </div>
                </th>
                <th onClick={() => handleSort('status')} className="p-6 text-[10px] font-black text-zinc-500 uppercase text-right cursor-pointer hover:text-white transition-colors select-none group">
                   <div className="flex items-center justify-end gap-2">
                      Deployment
                      <span className={`transition-opacity ${sortConfig.key === 'status' ? 'opacity-100 text-[#fabf37]' : 'opacity-0 group-hover:opacity-50'}`}>
                        {sortConfig.key === 'status' && sortConfig.direction === 'asc' ? <ArrowUp className="size-3" /> : <ArrowDown className="size-3" />}
                      </span>
                   </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredLanguages.map((lang) => (
                <tr 
                  key={lang.code} 
                  onClick={() => setSelectedLanguage(lang)}
                  className="border-b border-white/5 hover:bg-white/[0.05] transition-colors group cursor-pointer"
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                       <div className="size-10 rounded-lg bg-zinc-800 flex items-center justify-center text-white font-black text-xs group-hover:bg-[#fabf37] group-hover:text-black transition-all">
                          {lang.code}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-white">{lang.name}</p>
                          <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-0.5">ISO-639-1: {lang.code}</p>
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-2">
                       <div className="flex justify-between items-center text-[10px] font-black text-white mb-1">
                          <span>{lang.coverage}%</span>
                       </div>
                       <div className="w-32 h-1 bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${lang.coverage}%` }}
                            className={`h-full ${lang.coverage > 90 ? 'bg-emerald-500' : lang.coverage > 80 ? 'bg-[#fabf37]' : 'bg-orange-500'}`} 
                          />
                       </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                       <Sparkles className="size-3 text-[#fabf37]" />
                       <span className="text-sm font-black text-white">{lang.ai_health}%</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-black text-zinc-400">{lang.users}</td>
                  <td className="p-6 text-right">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      lang.status === 'stable' ? 'bg-emerald-500/10 text-emerald-500' :
                      lang.status === 'beta' ? 'bg-[#fabf37]/10 text-[#fabf37]' : 'bg-orange-500/10 text-orange-500'
                    }`}>
                      {lang.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ViewContainer>
  );
}

export function AttributesView() {
  const [attributes, setAttributes] = React.useState([
    { id: 1, name: "Size", type: "Select", values: ["Small", "Medium", "Large"], linked: 14 },
    { id: 2, name: "Color", type: "Color Swatch", values: ["White", "Kraft", "Black"], linked: 22 },
    { id: 3, name: "Material", type: "Text", values: ["Bamboo", "Recycled Paper"], linked: 8 },
  ]);
  const [rowCount, setRowCount] = React.useState(5);

  const handleFileUpload = () => {
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Parsing Attribute Data...',
      success: 'Imported 15 new attributes',
      error: 'Upload Failed'
    });
  };

  return (
    <ViewContainer title="Digital Attributes" subtitle="Manage Product Specifications & Metadata">
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-1 space-y-8">
             <div className="bg-zinc-900/50 border border-white/5 rounded-[40px] p-8 text-center">
                <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-10 hover:border-[#fabf37] transition-colors cursor-pointer group" onClick={handleFileUpload}>
                   <div className="relative size-16 rounded-full bg-zinc-800 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Download className="size-6 text-zinc-400 group-hover:text-[#fabf37]" />
                      <input 
                          type="file" 
                          accept=".csv,.json,.xml"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onClick={(e) => e.stopPropagation()} 
                          onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                  toast.promise(new Promise(r => setTimeout(r, 2000)), {
                                      loading: `Parsing ${file.name}...`,
                                      success: `Imported attributes from ${file.name}`,
                                      error: 'Upload Failed'
                                  });
                              }
                          }}
                      />
                   </div>
                   <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">Bulk Upload</h4>
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                      Drag CSV or JSON file here <br/> to import attributes
                   </p>
                </div>
                <div className="mt-6 flex justify-between items-center px-4">
                   <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Supported: .csv, .json, .xml</span>
                   <button className="text-[9px] font-black text-[#fabf37] uppercase tracking-widest hover:underline">Download Template</button>
                </div>
             </div>

             <div className="bg-[#fabf37] rounded-[40px] p-8 text-black">
                <h4 className="text-xl font-black uppercase tracking-tight mb-2">Auto-Link Engine</h4>
                <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest leading-relaxed mb-6">
                   Automatically associate imported attributes with products based on SKU naming conventions.
                </p>
                <div className="flex items-center justify-between bg-black/10 rounded-xl p-4">
                   <span className="text-[10px] font-black uppercase tracking-widest">Status</span>
                   <div className="flex items-center gap-2">
                      <div className="size-2 rounded-full bg-black animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                   </div>
                </div>
             </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-2">
             <div className="bg-black border border-white/5 rounded-[40px] p-10">
                <div className="flex items-center justify-between mb-8">
                   <h3 className="text-xl font-black text-white uppercase tracking-tight">Active Attribute Sets</h3>
                   
                  {/* Redesigned Create New Dropdown (Table Layout) */}
                  <details className="relative group">
                     <summary className="list-none bg-[#fabf37] text-black px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-[0_4px_10px_rgba(250,191,55,0.2)] cursor-pointer">
                         <Plus className="size-3" /> Create New
                     </summary>
                     
                     <div className="absolute right-0 top-full mt-4 w-[650px] bg-[#1a1a1a] border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden ring-1 ring-white/5">
                         {/* Header */}
                         <div className="flex items-center justify-between p-4 border-b border-white/5 bg-zinc-900/80 backdrop-blur-sm">
                             <div className="flex items-center gap-3">
                                 <div className="text-zinc-400"><Layers className="size-4" /></div>
                                 <h4 className="text-white text-sm font-bold tracking-tight">New Item Attribute</h4>
                                 <span className="bg-orange-500/20 text-orange-500 border border-orange-500/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">Not Saved</span>
                             </div>
                             <button type="submit" form="attr-form" className="bg-white text-black px-5 py-1.5 rounded-md text-xs font-bold hover:bg-zinc-200 transition-colors">Save</button>
                         </div>

                         <form 
                             id="attr-form" 
                             className="p-6 space-y-6"
                             onSubmit={(e) => {
                                 e.preventDefault();
                                 const formData = new FormData(e.currentTarget);
                                 
                                 // Collect values from the dynamic rows
                                 const collectedValues: string[] = [];
                                 for(let i=1; i<=rowCount; i++) {
                                     const val = formData.get(`val_${i}`) as string;
                                     if(val && val.trim()) {
                                         collectedValues.push(val.trim());
                                     }
                                 }

                                 if(!formData.get('name')) {
                                     toast.error("Attribute Name is required");
                                     return;
                                 }
                                 if(collectedValues.length === 0) {
                                     toast.error("At least one value is required");
                                     return;
                                 }

                                 setAttributes(prev => [...prev, {
                                     id: Date.now(),
                                     name: formData.get('name') as string,
                                     type: formData.get('numeric') ? 'Numeric' : 'Text',
                                     values: collectedValues,
                                     linked: 0
                                 }]);
                                 
                                 e.currentTarget.reset();
                                 setRowCount(5);
                                 e.currentTarget.closest('details')?.removeAttribute('open');
                                 toast.success("Attribute Schema Saved");
                             }}
                         >
                             {/* Top Controls */}
                             <div className="flex items-start justify-between gap-8">
                                 <div className="flex-1 space-y-3">
                                     <label className="text-[11px] text-zinc-400 font-bold block">Attribute Name <span className="text-red-500">*</span></label>
                                     <input name="name" className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-2.5 text-xs text-white focus:border-[#fabf37] outline-none transition-colors placeholder:text-zinc-600" placeholder="e.g. Material Composition" />
                                     <label className="flex items-center gap-2 mt-3 cursor-pointer group/check">
                                         <input type="checkbox" name="numeric" className="rounded bg-zinc-800 border-zinc-700 text-[#fabf37] focus:ring-0 cursor-pointer" />
                                         <span className="text-[11px] text-white font-bold group-hover/check:text-[#fabf37] transition-colors">Numeric Values</span>
                                     </label>
                                 </div>
                                 <div className="pt-8">
                                     <label className="flex items-center gap-2 cursor-pointer group/check">
                                         <input type="checkbox" name="disabled" className="rounded bg-zinc-800 border-zinc-700 text-[#fabf37] focus:ring-0 cursor-pointer" />
                                         <span className="text-[11px] text-white font-bold group-hover/check:text-[#fabf37] transition-colors">Disabled</span>
                                     </label>
                                 </div>
                             </div>

                             {/* Table Section */}
                             <div className="border border-zinc-800 rounded-lg overflow-hidden bg-zinc-900/30">
                                 <div className="flex items-center justify-between p-2 px-3 bg-zinc-900/80 border-b border-zinc-800">
                                     <span className="text-[11px] text-zinc-400 font-bold">Item Attribute Values</span>
                                     <div className="flex gap-2">
                                         <span className="size-2 rounded-full bg-zinc-700"></span>
                                         <span className="size-2 rounded-full bg-zinc-700"></span>
                                     </div>
                                 </div>
                                 
                                 {/* Table Header */}
                                 <div className="grid grid-cols-12 gap-0 border-b border-zinc-800 bg-black/40 text-[10px] font-bold text-zinc-500 p-2.5 uppercase tracking-wider">
                                     <div className="col-span-1 text-center"></div>
                                     <div className="col-span-1 text-center">No.</div>
                                     <div className="col-span-6 px-2">Attribute Value <span className="text-red-500">*</span></div>
                                     <div className="col-span-3 px-2">Abbreviation</div>
                                     <div className="col-span-1 text-center"><MoreVertical className="size-3 mx-auto opacity-50"/></div>
                                 </div>

                                 {/* Dynamic Rows */}
                                 {Array.from({length: rowCount}).map((_, idx) => {
                                     const i = idx + 1;
                                     return (
                                     <div key={i} className="grid grid-cols-12 gap-0 border-b border-zinc-800 last:border-0 items-center p-0 group/row hover:bg-white/[0.02] transition-colors">
                                         <div className="col-span-1 text-center flex justify-center py-3">
                                             <div className="size-3 rounded border border-zinc-700 group-hover/row:border-zinc-500"></div>
                                         </div>
                                         <div className="col-span-1 text-center text-zinc-600 font-mono text-[10px] py-3">{i}</div>
                                         <div className="col-span-6 px-2 py-2 border-l border-zinc-800/50">
                                             <input name={`val_${i}`} className="w-full bg-transparent border-none text-white focus:ring-0 p-1 text-xs placeholder-zinc-800 font-medium" placeholder="Value..." />
                                         </div>
                                         <div className="col-span-3 px-2 py-2 border-l border-zinc-800/50">
                                             <input name={`abbr_${i}`} className="w-full bg-transparent border-none text-zinc-400 focus:ring-0 p-1 text-xs px-2 placeholder-zinc-800" placeholder="Abbr" />
                                         </div>
                                         <div className="col-span-1 text-center text-zinc-700 cursor-pointer hover:text-white py-3 flex justify-center">
                                             <Edit className="size-3 opacity-0 group-hover/row:opacity-100 transition-opacity" />
                                         </div>
                                     </div>
                                     );
                                 })}
                             </div>
                             
                             <button type="button" onClick={() => setRowCount(p => p + 1)} className="bg-zinc-800 text-white px-4 py-2 rounded-md text-[10px] font-bold hover:bg-zinc-700 transition-colors flex items-center gap-2">
                                 <Plus className="size-3" /> Add Row
                             </button>
                         </form>
                     </div>
                  </details>
                </div>
                
                <div className="space-y-4">
                   {attributes.map((attr) => (
                      <div key={attr.id} className="p-6 bg-zinc-900/30 rounded-3xl border border-white/5 flex flex-col gap-4 group hover:border-[#fabf37]/50 transition-all">
                         <div className="flex items-center justify-between">
                             <div className="flex items-center gap-6 flex-1">
                                <div className="size-12 rounded-2xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-[#fabf37] transition-colors shrink-0">
                                   <Layers className="size-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                   {/* Editable Name Field */}
                                   <input 
                                      value={attr.name}
                                      onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, name: e.target.value } : a))}
                                      className="w-full bg-transparent text-lg font-black text-white uppercase tracking-tight outline-none border-b border-transparent focus:border-[#fabf37]/50 transition-all placeholder-zinc-700 hover:border-white/10"
                                   />
                                   <div className="flex items-center gap-3">
                                      {/* Editable Type Selector */}
                                      <select 
                                          value={attr.type}
                                          onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, type: e.target.value } : a))}
                                          className="bg-white/5 text-[8px] font-black text-zinc-500 uppercase tracking-widest rounded px-2 py-0.5 outline-none focus:text-[#fabf37] hover:bg-white/10 cursor-pointer"
                                      >
                                          <option value="Select">Select</option>
                                          <option value="Color Swatch">Color</option>
                                          <option value="Text">Text</option>
                                      </select>
                                      
                                      {/* Editable Values Field */}
                                      <input 
                                          value={attr.values.join(", ")}
                                          onChange={(e) => setAttributes(attributes.map(a => a.id === attr.id ? { ...a, values: e.target.value.split(',').map(s=>s.trim()) } : a))}
                                          className="flex-1 bg-transparent text-[9px] font-bold text-zinc-600 uppercase tracking-widest outline-none border-b border-transparent focus:border-[#fabf37]/50 focus:text-white transition-all hover:border-white/10 truncate"
                                      />
                                   </div>
                                </div>
                             </div>
                             <div className="text-right pl-4 border-l border-white/5">
                                <p className="text-[20px] font-black text-white">{attr.linked}</p>
                                <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Linked</p>
                             </div>
                         </div>
                         {/* Delete Action Bar */}
                         <div className="flex justify-end pt-2 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                                onClick={() => {
                                     if(confirm('Delete attribute set?')) {
                                         setAttributes(attributes.filter(a => a.id !== attr.id));
                                         toast.error("Attribute Deleted");
                                     }
                                }}
                                className="text-[8px] font-bold text-red-500 uppercase tracking-widest hover:text-red-400 flex items-center gap-1"
                            >
                                <Trash2 className="size-3" /> Remove Schema
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>
       </div>
    </ViewContainer>
  );
}