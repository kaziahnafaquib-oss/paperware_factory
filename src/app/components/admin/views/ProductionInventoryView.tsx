import React from "react";
import { 
  Activity, 
  Box, 
  RefreshCw, 
  MessageSquare,
  Settings,
  ChevronDown,
  Globe,
  Search,
  HelpCircle,
  Download,
  Upload,
  Bell,
  Filter,
  FileSpreadsheet,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

// Mock Data
const stats = [
  { label: "Total SKU", value: "1,248", change: "+12%", status: "neutral" },
  { label: "Low Stock", value: "3", change: "Urgent Action", status: "warning" },
  { label: "Pending Sync", value: "0", change: "All Good", status: "success" },
  { label: "ERP Status", value: "ONLINE", change: "14ms", status: "online" }
];

const products = [
  {
    id: 1,
    name: "RECYCLED KRAFT BAGS",
    tech: "PUREFIBER TECH",
    time: "19M AGO",
    status: "LIVE",
    image: "https://images.unsplash.com/photo-1705592579405-0d59931c8e00?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlZCUyMGtyYWZ0JTIwcGFwZXIlMjBiYWclMjBwYWNrYWdpbmd8ZW58MXx8fHwxNzY3MjcwOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "PRODUCTION",
    badgeColor: "bg-blue-600",
    stock: 4500
  },
  {
    id: 2,
    name: "RECYCLED KRAFT BAGS (S)",
    tech: "PUREFIBER TECH",
    time: "19M AGO",
    status: "LIVE",
    image: "https://images.unsplash.com/photo-1604138290658-2bc80c707bbf?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXJkYm9hcmQlMjBib3glMjBwYWNrYWdpbmd8ZW58MXx8fHwxNzY3MjcwOTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "PRODUCTION",
    badgeColor: "bg-blue-600",
    stock: 12000
  },
  {
    id: 3,
    name: "THERMAL INSULATION CUPS",
    tech: "NATUREFIRST PACKAGING",
    time: "23M AGO",
    status: "LIVE",
    image: "https://images.unsplash.com/photo-1585192794786-54c2a1dbc4d2?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVybWFsJTIwaW5zdWxhdGlvbiUyMHBhcGVyJTIwY3VwcyUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjcyNzA5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "PRODUCTION",
    badgeColor: "bg-blue-600",
    stock: 850
  },
  {
    id: 4,
    name: "BAMBOO FIBER PLATES",
    tech: "NATUREFIRST PACKAGING",
    time: "36M AGO",
    status: "LOW STOCK",
    image: "https://images.unsplash.com/photo-1643185720431-9c050eebbc9a?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmaWJlciUyMHBsYXRlcyUyMHBhY2thZ2luZ3xlbnwxfHx8fDE3NjcyNzA5MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "QC CHECK",
    badgeColor: "bg-[#fabf37] text-black",
    stock: 120
  }
];

export default function ProductionInventoryView() {
  const [searchTerm, setSearchTerm] = React.useState("");
  
  const handleExport = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Generating Inventory Report...',
        success: 'Inventory Report Downloaded (CSV)',
        error: 'Export failed'
      }
    );
  };

  const handleImport = () => {
    toast.info("Opening Bulk Import Wizard...");
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-4">
          {/* Export Report */}
          <button 
             onClick={handleExport}
             className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-black/40 backdrop-blur-md hover:border-[#fabf37] hover:bg-black/60 transition-all group"
          >
            <Download className="size-3 text-zinc-400 group-hover:text-[#fabf37]" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">EXPORT DATA</span>
          </button>

          {/* Bulk Import */}
          <button 
             onClick={handleImport}
             className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/40 hover:bg-black/60 transition-colors group"
          >
             <Upload className="size-3 text-zinc-400 group-hover:text-white" />
             <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest">BULK IMPORT</span>
          </button>

          {/* Inventory Alerts */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/5">
            <Bell className="size-3 text-red-500 animate-pulse" />
            <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">3 ALERTS</span>
          </div>

          {/* Live Terminal Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#fabf37]/20 bg-[#fabf37]/5">
            <div className="size-2 rounded-full bg-[#fabf37]" />
            <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">LIVE TERMINAL</span>
          </div>

          {/* Latency Pill */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5">
            <Activity className="size-3 text-blue-500" />
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">LATENCY: 12MS</span>
          </div>
        </div>

        {/* Neural Engine Dropdown */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-full border border-white/10 bg-black/40">
           <Globe className="size-4 text-zinc-500" />
           <span className="text-[10px] font-black text-white uppercase tracking-widest">NEURAL ENGINE</span>
           <div className="w-px h-4 bg-white/10 mx-2" />
           <div className="flex items-center gap-2">
              <span className="size-4 rounded-sm bg-blue-900/50 flex items-center justify-center text-[10px]">🇺🇸</span>
              <span className="text-[10px] font-black text-zinc-300 uppercase">EN</span>
              <ChevronDown className="size-3 text-zinc-500" />
           </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row items-end justify-between gap-6 mb-12">
        <div>
           <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-2">PRODUCT COMMAND CENTER</h1>
           <div className="flex items-center gap-2">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">CONNECTED TO ERPNEXT V14.0 • PRODUCTION DB</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <button className="px-6 py-3 rounded-xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-800 text-white flex items-center gap-2 transition-all group">
              <FileSpreadsheet className="size-4 text-zinc-500 group-hover:text-[#fabf37] transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-widest">GENERATE REPORT</span>
           </button>
           <button className="px-6 py-3 rounded-xl bg-[#fabf37] hover:bg-[#fabf37]/90 text-black flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(250,191,55,0.2)] hover:scale-105 active:scale-95">
              <Box className="size-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">ADD NEW SKU</span>
           </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-zinc-900/30 border border-white/5 rounded-[24px] p-6 flex flex-col justify-between h-[120px] group hover:border-white/10 transition-colors">
             <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">{stat.label}</p>
             <div className="flex items-end justify-between">
                <h3 className={`text-4xl font-black tracking-tighter ${stat.status === 'online' ? 'text-[#fabf37]' : stat.status === 'warning' ? 'text-red-500' : 'text-white'}`}>
                   {stat.value}
                </h3>
                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                   stat.status === 'online' ? 'bg-zinc-800 text-zinc-500' : 
                   stat.status === 'warning' ? 'bg-red-500/10 text-red-500' : 
                   stat.status === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                   'bg-zinc-800 text-zinc-500'
                }`}>
                   {stat.change}
                </span>
             </div>
          </div>
        ))}
      </div>

      {/* Recent Deployments Divider */}
      <div className="flex items-center justify-center my-12 relative">
         <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#fabf37]/50 to-transparent" />
         </div>
         <div className="relative z-10 px-6 py-2 bg-[#fabf37] rounded-full">
            <span className="text-[10px] font-black text-black uppercase tracking-widest">ACTIVE_INVENTORY</span>
         </div>
      </div>

      {/* Control Bar & Search */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
         <div className="flex items-center gap-4 w-full md:w-auto">
             <div className="relative flex-1 md:flex-none">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-zinc-500" />
                 <input 
                    type="text" 
                    placeholder="Search SKU, ID or Name..." 
                    className="w-full md:w-64 bg-black border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#fabf37] placeholder:text-zinc-600 uppercase tracking-wide"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                 />
             </div>
             <button className="p-2 border border-white/10 rounded-xl hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                 <Filter className="size-4" />
             </button>
         </div>
         
         <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5">
               <CheckCircle2 className="size-3 text-emerald-500" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">AUTO-REORDER: ON</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-zinc-900/50">
               <RefreshCw className="size-3 text-zinc-500" />
               <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Synced: Just now</span>
            </div>
         </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {products.map((product) => (
            <motion.div 
               key={product.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               whileHover={{ scale: 1.02 }}
               className="group relative aspect-[3/4] rounded-[32px] overflow-hidden bg-black border border-white/10 cursor-pointer"
            >
               {/* Background Image */}
               <div className="absolute inset-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
                  <img loading="lazy" decoding="async" src={product.image} alt={product.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
               </div>

               {/* Status Tag */}
               <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                   {product.status === 'LOW STOCK' ? (
                       <div className="px-3 py-1 bg-red-600 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                          <div className="flex items-center gap-2">
                             <AlertTriangle className="size-3 text-white" />
                             <span className="text-[8px] font-black text-white uppercase tracking-widest">LOW STOCK</span>
                          </div>
                       </div>
                   ) : (
                       <div className="px-3 py-1 bg-emerald-600/20 border border-emerald-500/50 rounded-full backdrop-blur-md">
                          <div className="flex items-center gap-2">
                             <div className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                             <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">IN STOCK</span>
                          </div>
                       </div>
                   )}
               </div>

               {/* Stock Count */}
               <div className="absolute top-6 right-6 z-20">
                   <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-2 rounded-xl text-center">
                       <p className="text-[8px] font-bold text-zinc-400 uppercase tracking-widest mb-0.5">QTY</p>
                       <p className="text-sm font-black text-white">{product.stock.toLocaleString()}</p>
                   </div>
               </div>

               {/* Content */}
               <div className="absolute inset-x-0 bottom-0 p-6 z-20">
                  <div className="flex items-center justify-between mb-2">
                     <span className="text-[8px] font-black text-[#fabf37] uppercase tracking-widest">● {product.tech}</span>
                     <span className="px-2 py-1 bg-zinc-800/80 backdrop-blur-md rounded-md text-[8px] font-bold text-zinc-400 uppercase tracking-wide">{product.time}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase leading-none mb-4">{product.name}</h3>
                  <div className="flex items-center justify-between gap-3">
                     <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black text-white uppercase tracking-widest ${product.badgeColor}`}>
                        {product.badge}
                     </span>
                     <button className="p-2 bg-white text-black rounded-lg hover:bg-[#fabf37] transition-colors">
                        <Settings className="size-4" />
                     </button>
                  </div>
               </div>
            </motion.div>
         ))}
      </div>

      {/* Chat FAB */}
      <motion.button 
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.9 }}
         className="fixed bottom-8 right-8 size-14 bg-[#fabf37] rounded-full shadow-[0_0_30px_rgba(250,191,55,0.3)] flex items-center justify-center z-50"
      >
         <MessageSquare className="size-6 text-black fill-black" />
         <div className="absolute top-0 right-0 size-4 bg-emerald-500 rounded-full border-2 border-black" />
      </motion.button>
      
      <button className="fixed bottom-8 right-24 size-10 bg-zinc-900 rounded-full flex items-center justify-center z-50 border border-white/10 hover:bg-zinc-800 text-zinc-500 hover:text-white transition-colors">
         <HelpCircle className="size-4" />
      </button>

    </div>
  );
}