import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, TrendingUp, Users, Clock, ArrowUpRight, BarChart3, Globe, Zap, Lightbulb, UserCheck, ShieldCheck } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie } from "recharts";

interface TrafficEngagementModalProps {
   isOpen: boolean;
   onClose: () => void;
}

const engagementData = [
   { time: "00:00", active: 120, bounce: 40 },
   { time: "04:00", active: 80, bounce: 30 },
   { time: "08:00", active: 450, bounce: 25 },
   { time: "12:00", active: 890, bounce: 15 },
   { time: "16:00", active: 750, bounce: 20 },
   { time: "20:00", active: 520, bounce: 35 },
   { time: "24:00", active: 200, bounce: 45 },
];

const behaviorData = [
   { name: "Browsing", value: 65, color: "#fabf37" },
   { name: "Checkout", value: 15, color: "#ffffff" },
   { name: "Comparing", value: 12, color: "#52525b" },
   { name: "Idle", value: 8, color: "#27272a" },
];

export function TrafficEngagementModal({ isOpen, onClose }: TrafficEngagementModalProps) {
   const [aiInsight, setAiInsight] = useState("");
   const [isTyping, setIsTyping] = useState(false);

   useEffect(() => {
      if (isOpen) {
         setIsTyping(true);
         setAiInsight("");
         const text = "Traffic patterns indicate a 15% increase in high-intent visitors from the European region during evening hours. Checkout behavior is positively correlated with lower bounce rates on mobile devices. Suggestion: Optimize landing pages for mobile speed to capitalize on this trend.";
         let i = 0;
         const interval = setInterval(() => {
            setAiInsight(text.slice(0, i));
            i++;
            if (i > text.length) {
               clearInterval(interval);
               setIsTyping(false);
            }
         }, 20);
         return () => clearInterval(interval);
      }
   }, [isOpen]);

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
                  className="bg-[#09090b] border border-white/10 rounded-[32px] w-full max-w-5xl max-h-[85vh] overflow-hidden relative z-10 shadow-2xl flex flex-col"
               >
                  {/* Header */}
                  <div className="bg-zinc-900/50 p-8 border-b border-white/5 flex justify-between items-center">
                     <div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tight flex items-center gap-3">
                           <Globe className="size-6 text-[#fabf37]" /> Global Engagement Metrics
                        </h3>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">Real-time Behavioral Analysis & Traffic Quality</p>
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
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="bg-black border border-white/10 rounded-2xl p-6">
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Current Active</p>
                           <p className="text-4xl font-black text-white mb-2">3,492</p>
                           <div className="flex items-center gap-2 text-emerald-500">
                              <TrendingUp className="size-3" />
                              <span className="text-[10px] font-bold uppercase tracking-wide">High Load</span>
                           </div>
                        </div>

                        <div className="bg-black border border-white/10 rounded-2xl p-6">
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Avg. Session</p>
                           <p className="text-4xl font-black text-white mb-2">6m 12s</p>
                           <div className="flex items-center gap-2 text-emerald-500">
                              <Clock className="size-3" />
                              <span className="text-[10px] font-bold uppercase tracking-wide">Top 5%</span>
                           </div>
                        </div>

                        <div className="bg-black border border-white/10 rounded-2xl p-6">
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Bot Traffic</p>
                           <p className="text-4xl font-black text-white mb-2">1.2%</p>
                           <div className="flex items-center gap-2 text-[#fabf37]">
                              <ShieldCheck className="size-3" />
                              <span className="text-[10px] font-bold uppercase tracking-wide">Filtered</span>
                           </div>
                        </div>

                        <div className="bg-black border border-white/10 rounded-2xl p-6 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-6 opacity-10">
                              <UserCheck className="size-24 text-white" />
                           </div>
                           <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Retention</p>
                           <p className="text-4xl font-black text-white mb-2">42%</p>
                           <div className="flex items-center gap-2 text-emerald-500">
                              <ArrowUpRight className="size-3" />
                              <span className="text-[10px] font-bold uppercase tracking-wide">Returning</span>
                           </div>
                        </div>
                     </div>

                     {/* AI Insight Bar */}
                     <div className="bg-gradient-to-r from-zinc-900 to-black border border-white/10 rounded-2xl p-6 flex items-start gap-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-1 h-full bg-[#fabf37]" />
                        <div className="p-3 bg-[#fabf37]/10 rounded-xl text-[#fabf37]">
                           <Sparkles className="size-6 animate-pulse" />
                        </div>
                        <div className="flex-1">
                           <h4 className="text-sm font-black text-white uppercase tracking-wide mb-2 flex items-center gap-2">
                              Neural Traffic Analysis
                              {isTyping && <span className="size-1.5 bg-[#fabf37] rounded-full animate-ping" />}
                           </h4>
                           <p className="text-xs text-zinc-300 leading-relaxed font-medium font-mono">
                              {aiInsight}
                              {isTyping && <span className="inline-block w-2 h-4 bg-[#fabf37] ml-1 align-middle animate-pulse" />}
                           </p>
                        </div>
                     </div>

                     {/* Charts Grid */}
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 bg-zinc-900/30 border border-white/5 rounded-3xl p-8">
                           <div className="flex items-center justify-between mb-8">
                              <h4 className="text-lg font-black text-white uppercase tracking-tight">Active vs Bounce Rate</h4>
                              <div className="flex items-center gap-4">
                                 <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-[#fabf37]" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Active Users</span>
                                 </div>
                                 <div className="flex items-center gap-2">
                                    <div className="size-2 rounded-full bg-zinc-600" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase">Bounce Rate</span>
                                 </div>
                              </div>
                           </div>

                           <div className="h-[300px] w-full min-w-0">
                              <ResponsiveContainer width="100%" height="100%">
                                 <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                       <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                                          <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3} />
                                          <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
                                       </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip
                                       contentStyle={{ backgroundColor: "#000", border: "1px solid #27272a", borderRadius: "12px" }}
                                       itemStyle={{ fontSize: "10px", fontWeight: "900", textTransform: "uppercase" }}
                                    />
                                    <Area type="monotone" dataKey="active" stroke="#fabf37" strokeWidth={3} fillOpacity={1} fill="url(#colorActive)" />
                                    <Area type="monotone" dataKey="bounce" stroke="#52525b" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                                 </AreaChart>
                              </ResponsiveContainer>
                           </div>
                        </div>

                        <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-8 flex flex-col">
                           <h4 className="text-lg font-black text-white uppercase tracking-tight mb-8">User Intent</h4>
                           <div className="flex-1 w-full min-h-[280px] flex items-center justify-center relative">
                              <ResponsiveContainer width="100%" height={250}>
                                 <PieChart>
                                    <Pie
                                       data={behaviorData}
                                       cx="50%"
                                       cy="50%"
                                       innerRadius={60}
                                       outerRadius={80}
                                       paddingAngle={5}
                                       dataKey="value"
                                       stroke="none"
                                    >
                                       {behaviorData.map((entry, index) => (
                                          <Cell key={`cell-${index}`} fill={entry.color} />
                                       ))}
                                    </Pie>
                                    <Tooltip
                                       contentStyle={{ backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }}
                                       itemStyle={{ color: "#fff", fontSize: "10px", fontWeight: "bold", textTransform: "uppercase" }}
                                    />
                                 </PieChart>
                              </ResponsiveContainer>
                              {/* Center Text */}
                              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                 <span className="text-3xl font-black text-white">65%</span>
                                 <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">BROWSING</span>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-2 mt-4">
                              {behaviorData.map((item) => (
                                 <div key={item.name} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                                    <div className="size-2 rounded-full" style={{ backgroundColor: item.color }} />
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">{item.name}</span>
                                 </div>
                              ))}
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