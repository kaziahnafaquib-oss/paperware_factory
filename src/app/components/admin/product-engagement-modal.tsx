import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Sparkles, TrendingUp, Users, Clock, ArrowUpRight, BarChart3, PieChart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

interface ProductEngagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const engagementData = [
  { time: "00:00", desktop: 30, mobile: 20 },
  { time: "04:00", desktop: 25, mobile: 15 },
  { time: "08:00", desktop: 65, mobile: 45 },
  { time: "12:00", desktop: 85, mobile: 60 },
  { time: "16:00", desktop: 75, mobile: 55 },
  { time: "20:00", desktop: 55, mobile: 40 },
  { time: "24:00", desktop: 40, mobile: 30 },
];

const sourceData = [
  { name: "Direct", value: 45, color: "#fabf37" },
  { name: "Search", value: 30, color: "#ffffff" },
  { name: "Social", value: 15, color: "#52525b" },
  { name: "Referral", value: 10, color: "#27272a" },
];

export function ProductEngagementModal({ isOpen, onClose }: ProductEngagementModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed top-[130px] inset-x-0 bottom-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-4xl max-h-[85vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-zinc-900/50 p-8 border-b border-white/5 flex justify-between items-center">
              <div>
                 <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                    <Sparkles className="size-6 text-[#fabf37]" /> Product Engagement Intelligence
                 </h3>
                 <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Deep Dive into User Behavior & Interaction</p>
              </div>
              <button 
                onClick={onClose}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-8 custom-scrollbar space-y-8">
               
               {/* Top Stats Row */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-black border border-white/10 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-[#fabf37]/10 rounded-lg text-[#fabf37]">
                           <Users className="size-5" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Interactions</span>
                     </div>
                     <p className="text-4xl font-black text-white mb-2">12,405</p>
                     <div className="flex items-center gap-2">
                        <TrendingUp className="size-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">+8.4% vs last week</span>
                     </div>
                  </div>

                  <div className="bg-black border border-white/10 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                           <Clock className="size-5" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Avg. Dwell Time</span>
                     </div>
                     <p className="text-4xl font-black text-white mb-2">4m 12s</p>
                     <div className="flex items-center gap-2">
                        <TrendingUp className="size-3 text-emerald-500" />
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">+12s improvement</span>
                     </div>
                  </div>

                  <div className="bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Sparkles className="size-24 text-white" />
                     </div>
                     <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                           <BarChart3 className="size-5" />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Conversion Rate</span>
                     </div>
                     <p className="text-4xl font-black text-white mb-2">3.8%</p>
                     <div className="flex items-center gap-2">
                        <ArrowUpRight className="size-3 text-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Steady Performance</span>
                     </div>
                  </div>
               </div>

               {/* Main Chart Section */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                     <div className="flex items-center justify-between mb-8">
                        <h4 className="text-lg font-black text-white uppercase tracking-tight">Engagement Over Time</h4>
                        <div className="flex items-center gap-4">
                           <div className="flex items-center gap-2">
                              <div className="size-2 rounded-full bg-[#fabf37]" />
                              <span className="text-[10px] font-bold text-zinc-500 uppercase">Desktop</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <div className="size-2 rounded-full bg-zinc-600" />
                              <span className="text-[10px] font-bold text-zinc-500 uppercase">Mobile</span>
                           </div>
                        </div>
                     </div>
                     
                     <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                           <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                              <defs>
                                 <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#fabf37" stopOpacity={0}/>
                                 </linearGradient>
                                 <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#52525b" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#52525b" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                              <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                              <Tooltip 
                                 contentStyle={{ backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "12px" }}
                                 itemStyle={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}
                              />
                              <Area type="monotone" dataKey="desktop" stroke="#fabf37" strokeWidth={3} fillOpacity={1} fill="url(#colorDesktop)" />
                              <Area type="monotone" dataKey="mobile" stroke="#52525b" strokeWidth={3} fillOpacity={1} fill="url(#colorMobile)" />
                           </AreaChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 flex flex-col">
                     <h4 className="text-lg font-black text-white uppercase tracking-tight mb-8">Traffic Sources</h4>
                     <div className="flex-1 flex items-center justify-center min-h-[250px]">
                        <ResponsiveContainer width="100%" height={200}>
                           <BarChart data={sourceData} layout="vertical" barSize={24}>
                              <XAxis type="number" hide />
                              <YAxis type="category" dataKey="name" stroke="#52525b" fontSize={10} width={60} tickLine={false} axisLine={false} />
                              <Tooltip 
                                 cursor={{fill: 'transparent'}}
                                 contentStyle={{ backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "8px" }}
                              />
                              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                 {sourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                 ))}
                              </Bar>
                           </BarChart>
                        </ResponsiveContainer>
                     </div>
                     <div className="mt-6 pt-6 border-t border-white/5">
                        <p className="text-[10px] font-medium text-zinc-500 leading-relaxed">
                           <span className="text-white font-bold">Direct traffic</span> is performing best with highest conversion rate (4.2%). Search traffic follows closely.
                        </p>
                     </div>
                  </div>
               </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}