import React from "react";
import { motion } from "framer-motion";
import { Globe, Anchor, Ship, Truck, Activity, Box, MapPin, Search, ChevronRight } from "lucide-react";

export function LogisticsCommand() {
  const shipments = [
    { id: "PW-9901", origin: "Chittagong, BD", dest: "London, UK", status: "In Transit", vessel: "Ever Ace", progress: 65, type: "Sea" },
    { id: "PW-9904", origin: "Dhaka, BD", dest: "Dubai, UAE", status: "Port Loading", vessel: "CMA CGM", progress: 12, type: "Sea" },
    { id: "PW-9912", origin: "Dhaka, BD", dest: "Singapore", status: "In Flight", vessel: "EK-202", progress: 88, type: "Air" },
  ];

  return (
    <section className="py-24 bg-white/10 text-black overflow-hidden relative border-y border-black/5 backdrop-blur-sm">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37]/50 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(250,191,55,0.05)_0%,_transparent_70%)]" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left: Interactive Map / Radar UI */}
          <div className="w-full lg:w-2/3 space-y-8">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Global Command Active</span>
                   </div>
                   <h2 className="text-[32px] md:text-[52px] font-black uppercase tracking-tighter leading-none">
                     Logistics <br /> <span className="text-zinc-700 italic">Neural Network</span>
                   </h2>
                </div>
                <div className="bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex gap-8 w-full sm:w-auto justify-around">
                   <div className="text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Active Vessels</p>
                      <p className="text-xl font-black text-[#fabf37]">42</p>
                   </div>
                   <div className="w-px h-full bg-white/5" />
                   <div className="text-center">
                      <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">Ports Connected</p>
                      <p className="text-xl font-black text-[#fabf37]">118</p>
                   </div>
                </div>
             </div>

             <div className="relative aspect-[4/3] sm:aspect-video bg-zinc-900/40 backdrop-blur-3xl rounded-[40px] sm:rounded-[48px] border border-white/10 overflow-hidden group shadow-2xl">
                {/* Simulated Radar / Map Background */}
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, #fabf37 1px, transparent 0)', backgroundSize: '60px 60px' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                   <div className="size-96 border border-[#fabf37]/10 rounded-full animate-ping" />
                   <div className="absolute size-64 border border-[#fabf37]/20 rounded-full animate-pulse" />
                </div>
                
                {/* Ship Indicators */}
                {[
                  { t: '20%', l: '30%', label: 'PW-9901' },
                  { t: '50%', l: '70%', label: 'PW-9904' },
                  { t: '80%', l: '40%', label: 'PW-9912' },
                ].map((pos, i) => (
                  <motion.div 
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute group/ship cursor-pointer"
                    style={{ top: pos.t, left: pos.l }}
                  >
                    <div className="size-4 bg-[#fabf37] rounded-full shadow-[0_0_20px_#fabf37] relative">
                       <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-50" />
                    </div>
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/80 backdrop-blur-xl border border-black/10 rounded-lg px-3 py-1 text-[8px] font-black uppercase tracking-widest opacity-0 group-hover/ship:opacity-100 transition-opacity text-black">
                       {pos.label} - Track Now
                    </div>
                  </motion.div>
                ))}

                <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-white/60 backdrop-blur-xl border border-black/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                   <div className="flex items-center gap-4 w-full">
                      <div className="size-10 sm:size-12 rounded-xl sm:rounded-2xl bg-[#fabf37] flex items-center justify-center text-black shrink-0">
                         <Search className="size-5 sm:size-6" />
                      </div>
                      <input 
                        placeholder="Enter Tracking No."
                        className="bg-transparent border-none outline-none text-xs sm:text-sm font-bold flex-1 placeholder:text-zinc-400 text-black"
                      />
                   </div>
                   <button className="w-full md:w-auto bg-black text-white px-6 sm:px-8 py-3 rounded-full font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-[#fabf37] hover:text-black transition-all">
                      Scan Neural Link
                   </button>
                </div>
             </div>
          </div>

          {/* Right: Live Feed / Terminal */}
          <div className="w-full lg:w-1/3 h-full">
             <div className="bg-white/40 backdrop-blur-3xl border border-black/10 rounded-[40px] sm:rounded-[48px] p-6 sm:p-8 space-y-8 h-full shadow-2xl">
                <div className="flex items-center justify-between">
                   <h3 className="text-xl font-black uppercase tracking-tight text-black">Active Terminal</h3>
                   <div className="flex gap-1">
                      <div className="size-1 bg-[#fabf37] animate-bounce" />
                      <div className="size-1 bg-[#fabf37] animate-bounce [animation-delay:0.2s]" />
                      <div className="size-1 bg-[#fabf37] animate-bounce [animation-delay:0.4s]" />
                   </div>
                </div>

                <div className="space-y-4">
                   {shipments.map((ship, i) => (
                     <div key={i} className="p-6 bg-black/5 backdrop-blur-md border border-black/5 rounded-3xl space-y-4 group hover:border-[#fabf37]/50 hover:bg-black/10 transition-all">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{ship.id}</p>
                              <p className="text-lg font-black text-black">{ship.origin} → {ship.dest}</p>
                           </div>
                           <div className={`p-2 rounded-lg ${ship.type === 'Sea' ? 'bg-blue-500/10 text-blue-600' : 'bg-orange-500/10 text-orange-600'}`}>
                              {ship.type === 'Sea' ? <Ship className="size-4" /> : <Truck className="size-4" />}
                           </div>
                        </div>
                        
                        <div className="space-y-2">
                           <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-zinc-500">
                              <span>Voyage: {ship.vessel}</span>
                              <span>{ship.progress}% Complete</span>
                           </div>
                           <div className="h-1.5 bg-zinc-200 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${ship.progress}%` }}
                                className={`h-full ${ship.status === 'In Transit' ? 'bg-emerald-500' : 'bg-[#fabf37]'}`}
                              />
                           </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                           <div className="flex items-center gap-2">
                              <Activity className="size-3 text-zinc-500" />
                              <span className="text-[10px] font-bold text-zinc-600">{ship.status}</span>
                           </div>
                           <button className="text-[8px] font-black uppercase tracking-widest flex items-center gap-2 group-hover:text-[#fabf37] transition-colors text-black">
                              Full Report <ChevronRight className="size-3" />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="bg-[#fabf37] p-6 sm:p-8 rounded-[32px] text-black space-y-4">
                   <div className="flex items-center gap-2">
                      <Globe className="size-5" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Network Health</span>
                   </div>
                   <p className="text-lg sm:text-xl font-black italic leading-tight">100% On-time Delivery target maintained for Q4.</p>
                   <button className="w-full py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:translate-y-[-2px] transition-transform">
                      Global Port Status Dashboard
                   </button>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}