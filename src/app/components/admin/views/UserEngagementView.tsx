import { useState, useEffect, useMemo } from 'react';
import { ViewContainer } from "../ViewContainer";
import { Sparkles, TrendingUp, Users, Clock, ArrowUpRight, BarChart3, Zap, Lightbulb, PieChart, MousePointer2, Play, Monitor, Smartphone, Calendar, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";
import { TrafficEngagementModal } from "../traffic-engagement-modal";
import { projectId, publicAnonKey } from "../../../../../utils/supabase/info";
import { SessionPlayer } from "../SessionPlayer";

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

const heatMapData = [
   { page: "Home", clicks: 12450, color: "#fabf37" },
   { page: "Products", clicks: 8320, color: "#ffffff" },
   { page: "Pricing", clicks: 5200, color: "#e4e4e7" },
   { page: "Contact", clicks: 3100, color: "#a1a1aa" },
   { page: "Blog", clicks: 1800, color: "#52525b" },
];

function UserEngagementView() {
   const [showModal, setShowModal] = useState(false);
   const [sessions, setSessions] = useState<any[]>([]);
   const [isLoadingSessions, setIsLoadingSessions] = useState(false);
   const [selectedSessionEvents, setSelectedSessionEvents] = useState<any[] | null>(null);
   const [selectedSessionMetadata, setSelectedSessionMetadata] = useState<any>(null);
   const [searchTerm, setSearchTerm] = useState("");
   const [deviceFilter, setDeviceFilter] = useState<"All" | "Mobile" | "Desktop">("All");
   const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

   useEffect(() => {
      fetchSessions();
   }, []);

   const fetchSessions = async () => {
      setIsLoadingSessions(true);
      try {
         const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/engagement/sessions`, {
            headers: { Authorization: `Bearer ${publicAnonKey}` }
         });
         const data = await response.json();
         if (data.success) {
            setSessions(data.sessions);
         }
      } catch (error) {
         console.warn("Failed to fetch sessions:", error);
      } finally {
         setIsLoadingSessions(false);
      }
   };

   const playSession = async (session: any) => {
      try {
         const response = await fetch(session.url);
         const data = await response.json();
         setSelectedSessionEvents(data.sessionData || data.events);
         setSelectedSessionMetadata(session.metadata || data.metadata);
      } catch (error) {
         console.error("Failed to load session events:", error);
      }
   };

   const filteredSessions = useMemo(() => {
      let filtered = [...(sessions || [])];

      if (searchTerm) {
         filtered = filtered.filter(s =>
            s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.name && s.name.toLowerCase().includes(searchTerm.toLowerCase()))
         );
      }

      if (deviceFilter !== "All") {
         filtered = filtered.filter(s => {
            const isMobile = s.metadata?.userAgent?.includes('Mobile') || s.name?.includes('mobile');
            return deviceFilter === "Mobile" ? isMobile : !isMobile;
         });
      }

      filtered.sort((a, b) => {
         const dateA = new Date(a.createdAt).getTime();
         const dateB = new Date(b.createdAt).getTime();
         return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
      });

      return filtered;
   }, [sessions, searchTerm, deviceFilter, sortOrder]);

   const stats = useMemo(() => {
      const currentSessions = sessions || [];
      if (currentSessions.length === 0) return { total: 0, uniqueUsers: 0, avgDuration: 0 };
      const uniqueUsers = new Set(currentSessions.map(s => s.metadata?.userId || s.name)).size;
      const totalDuration = currentSessions.reduce((acc, s) => acc + (s.metadata?.duration || 0), 0);
      return {
         total: currentSessions.length,
         uniqueUsers,
         avgDuration: Math.round(totalDuration / currentSessions.length)
      };
   }, [sessions]);

   return (
      <ViewContainer title="Engagement Intelligence" subtitle="Deep Dive into User Behavior & Interaction">
         <div className="space-y-8">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
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

               <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
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

               <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
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

               <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                     <Sparkles className="size-24 text-white" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                     <div className="p-2 bg-red-500/10 rounded-lg text-red-500">
                        <MousePointer2 className="size-5" />
                     </div>
                     <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Click Depth</span>
                  </div>
                  <p className="text-4xl font-black text-white mb-2">4.2</p>
                  <div className="flex items-center gap-2">
                     <ArrowUpRight className="size-3 text-emerald-500" />
                     <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-wide">High Engagement</span>
                  </div>
               </div>
            </div>

            {/* 🎥 Session Replays Section */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                  <div>
                     <h4 className="text-lg font-black text-white uppercase tracking-tight flex items-center gap-3">
                        <Play className="size-5 text-[#fabf37]" /> Visual Engagement Logs
                     </h4>
                     <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Replay user journeys in video format</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3 text-zinc-500" />
                        <input
                           type="text"
                           placeholder="Search sessions..."
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           className="pl-9 pr-4 py-2 bg-black border border-white/10 rounded-xl text-[10px] text-white focus:border-[#fabf37]/50 outline-none transition-all w-48"
                        />
                     </div>

                     <select
                        value={deviceFilter}
                        onChange={(e) => setDeviceFilter(e.target.value as any)}
                        className="px-4 py-2 bg-black border border-white/10 rounded-xl text-[10px] font-bold text-white uppercase tracking-wider outline-none cursor-pointer"
                     >
                        <option value="All">All Devices</option>
                        <option value="Desktop">Desktop</option>
                        <option value="Mobile">Mobile</option>
                     </select>

                     <button
                        onClick={() => setSortOrder(prev => prev === "newest" ? "oldest" : "newest")}
                        className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                     >
                        {sortOrder === "newest" ? "Latest First" : "Oldest First"}
                     </button>

                     <button
                        onClick={fetchSessions}
                        disabled={isLoadingSessions}
                        className="p-2.5 bg-[#fabf37] text-black rounded-xl hover:scale-105 active:scale-95 transition-all text-[10px] font-black uppercase"
                        title="Refresh Feed"
                     >
                        <Zap className={`size-4 ${isLoadingSessions ? 'animate-pulse' : ''}`} />
                     </button>
                  </div>
               </div>

               {/* Session Quick Stats Banner */}
               <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                     <div className="p-2 bg-[#fabf37]/10 rounded-lg text-[#fabf37]">
                        <Monitor className="size-4" />
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Total Logs</p>
                        <p className="text-sm font-black text-white">{stats.total}</p>
                     </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                     <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                        <Users className="size-4" />
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Unique Users</p>
                        <p className="text-sm font-black text-white">{stats.uniqueUsers}</p>
                     </div>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                     <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                        <Clock className="size-4" />
                     </div>
                     <div>
                        <p className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Avg Duration</p>
                        <p className="text-sm font-black text-white">{stats.avgDuration}s</p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoadingSessions ? (
                     [...Array(3)].map((_, i) => (
                        <div key={i} className="h-48 rounded-2xl bg-white/5 animate-pulse" />
                     ))
                  ) : filteredSessions.length > 0 ? (
                     filteredSessions.map((session: any) => {
                        const isMobile = session.metadata?.userAgent?.includes('Mobile') || session.name?.includes('mobile');
                        const duration = session.metadata?.duration || 0;
                        const date = new Date(session.createdAt);
                        const userId = session.metadata?.userId || session.name?.split('_')[0] || "Unknown";

                        return (
                           <motion.div
                              key={session.id}
                              whileHover={{ y: -5 }}
                              className="group bg-black border border-white/5 rounded-2xl overflow-hidden hover:border-[#fabf37]/50 transition-all shadow-xl flex flex-col"
                           >
                              <div className="aspect-video bg-zinc-900/50 flex flex-col items-center justify-center relative overflow-hidden">
                                 <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                                 <Play className="size-10 text-[#fabf37] opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all relative z-10" />

                                 {/* Badges */}
                                 <div className="absolute top-4 left-4 z-20 flex gap-2">
                                    <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex items-center gap-1.5">
                                       {isMobile ? <Smartphone className="size-2.5 text-zinc-400" /> : <Monitor className="size-2.5 text-zinc-400" />}
                                       <span className="text-[8px] font-black text-white uppercase">{isMobile ? "Mobile" : "Desktop"}</span>
                                    </div>
                                    {duration > 120 && (
                                       <div className="px-2 py-1 bg-[#fabf37]/20 backdrop-blur-md rounded-lg border border-[#fabf37]/30 flex items-center gap-1.5">
                                          <Sparkles className="size-2.5 text-[#fabf37]" />
                                          <span className="text-[8px] font-black text-[#fabf37] uppercase">Deep Dive</span>
                                       </div>
                                    )}
                                 </div>

                                 {/* Time Badge */}
                                 <div className="absolute top-4 right-4 z-20">
                                    <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10">
                                       <span className="text-[8px] font-black text-zinc-400 uppercase">{duration}s</span>
                                    </div>
                                 </div>

                                 {/* Footer Overlay */}
                                 <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <div className="flex justify-between items-end">
                                       <div className="max-w-[150px]">
                                          <p className="text-[10px] font-black text-white uppercase tracking-tight truncate mb-0.5">
                                             {userId}
                                          </p>
                                          <div className="flex items-center gap-2">
                                             <Calendar className="size-2.5 text-zinc-500" />
                                             <span className="text-[8px] font-bold text-zinc-500">{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                          </div>
                                       </div>
                                       <button
                                          onClick={() => playSession(session)}
                                          className="px-5 py-2.5 bg-[#fabf37] text-black rounded-xl text-[9px] font-black uppercase shadow-lg group-hover:bg-[#fcd34d] hover:scale-105 active:scale-95 transition-all"
                                       >
                                          Watch Replay
                                       </button>
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                        );
                     })
                  ) : (
                     <div className="col-span-full py-20 text-center bg-black/20 rounded-3xl border border-dashed border-white/10 text-zinc-500">
                        <Monitor className="size-16 mx-auto mb-6 opacity-10" />
                        <h5 className="text-white font-black text-sm uppercase tracking-widest mb-2">No Matching Sessions</h5>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-600">Try adjusting your filters or search term</p>
                     </div>
                  )}
               </div>
            </div>

            <AnimatePresence>
               {selectedSessionEvents && (
                  <SessionPlayer
                     events={selectedSessionEvents}
                     metadata={selectedSessionMetadata}
                     onClose={() => setSelectedSessionEvents(null)}
                  />
               )}
            </AnimatePresence>

            {/* Engagement Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-2 bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
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

                  <div className="h-[300px] w-full min-w-0">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={engagementData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                           <defs>
                              <linearGradient id="colorDesktop" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3} />
                                 <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
                              </linearGradient>
                              <linearGradient id="colorMobile" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#52525b" stopOpacity={0.3} />
                                 <stop offset="95%" stopColor="#52525b" stopOpacity={0} />
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

               <div className="space-y-6">
                  <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col h-[300px]">
                     <h4 className="text-lg font-black text-white uppercase tracking-tight mb-4">Traffic Sources</h4>
                     <div className="flex-1 w-full min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                           <BarChart data={sourceData} layout="vertical" barSize={24}>
                              <XAxis type="number" hide />
                              <YAxis type="category" dataKey="name" stroke="#52525b" fontSize={10} width={60} tickLine={false} axisLine={false} />
                              <Tooltip
                                 cursor={{ fill: 'transparent' }}
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
                  </div>

                  <div className="bg-black border border-white/5 rounded-3xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                        <Zap className="size-4 text-[#fabf37]" />
                        <h5 className="text-sm font-black text-white uppercase tracking-tight">AI Observation</h5>
                     </div>
                     <p className="text-[10px] font-medium text-zinc-400 leading-relaxed">
                        <span className="text-white font-bold">Direct traffic</span> has the highest conversion rate (4.2%). Mobile users are showing increased dwell time in the evening hours.
                     </p>
                  </div>
               </div>
            </div>

            {/* Heatmap Section */}
            <div className="bg-zinc-900/50 border border-white/5 rounded-3xl p-8">
               <div className="flex items-center justify-between mb-8">
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">Interaction Heatmap</h4>
                  <button
                     onClick={() => setShowModal(true)}
                     className="text-[10px] font-bold text-[#fabf37] uppercase tracking-widest hover:underline"
                  >
                     View Full Map
                  </button>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {heatMapData.map((item, i) => (
                     <motion.button
                        key={item.page}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowModal(true)}
                        className="bg-black border border-white/5 rounded-xl p-4 flex flex-col justify-between h-[100px] group hover:border-[#fabf37] hover:bg-zinc-900 transition-all text-left w-full"
                     >
                        <div className="flex justify-between items-start w-full">
                           <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:text-[#fabf37] transition-colors">0{i + 1}</span>
                           <div className={`size-2 rounded-full`} style={{ backgroundColor: item.color }} />
                        </div>
                        <div>
                           <h5 className="text-sm font-black text-white uppercase tracking-tight group-hover:text-[#fabf37] transition-colors">{item.page}</h5>
                           <p className="text-[10px] font-bold text-zinc-500">{item.clicks.toLocaleString()} Clicks</p>
                        </div>
                     </motion.button>
                  ))}
               </div>
            </div>

            <TrafficEngagementModal isOpen={showModal} onClose={() => setShowModal(false)} />

         </div>
      </ViewContainer>
   );
}

export { UserEngagementView };
export default UserEngagementView;