import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Factory, Zap, Users, Thermometer, Box, TrendingUp, AlertCircle, Play, Pause, Camera, Radio, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const data = [
  { time: "08:00", output: 1200, energy: 450 },
  { time: "10:00", output: 1800, energy: 520 },
  { time: "12:00", output: 1600, energy: 480 },
  { time: "14:00", output: 2400, energy: 610 },
  { time: "16:00", output: 2100, energy: 580 },
  { time: "18:00", output: 2800, energy: 650 },
  { time: "20:00", output: 2600, energy: 630 },
];

export function FactoryLivePage() {
  const { t, isRTL } = useLanguage();
  const [activeCam, setActiveCam] = React.useState(0);
  const [isLive, setIsLive] = React.useState(true);

  const cams = [
    { id: "CAM-01", name: "Main Assembly Line", location: "Sector A", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=1200" },
    { id: "CAM-02", name: "Quality Control", location: "Sector B", img: "https://images.unsplash.com/photo-1565106430482-8f6e74349ca1?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=1200" },
    { id: "CAM-03", name: "Warehouse Logistics", location: "Loading Dock", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=1200" }
  ];

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Industrial Top Header */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Live Production Stream</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Factory <span className="text-zinc-800">Ops</span> <br /> <span className="text-[#fabf37]">Real-Time</span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-4">
            {[
              { label: "Efficiency", val: "98.2%", icon: Zap },
              { label: "Active Units", val: "42", icon: Factory },
              { label: "Workforce", val: "240", icon: Users }
            ].map((stat, i) => (
              <div key={i} className="px-8 py-6 bg-zinc-900 border border-white/5 rounded-[32px] min-w-[160px] space-y-2">
                <stat.icon className="size-4 text-[#fabf37]" />
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
                <p className="text-2xl font-black italic">{stat.val}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Live Feed Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative aspect-video bg-black rounded-[48px] overflow-hidden border border-white/10 shadow-2xl group">
              {/* Camera Metadata Overlay */}
              <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Live: {cams[activeCam].id}</span>
                </div>
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{cams[activeCam].location}</span>
                </div>
              </div>

              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => setIsLive(!isLive)}
                  className="size-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  {isLive ? <Pause className="size-5" /> : <Play className="size-5" />}
                </button>
              </div>

              {/* Static Grain Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay z-10 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]" />

              <ImageWithFallback 
                src={cams[activeCam].img} 
                alt="Factory Feed" 
                className={`size-full object-cover transition-transform duration-[10s] ease-linear ${isLive ? 'scale-110' : 'scale-100'}`} 
              />

              {/* Camera Switcher Bar */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex gap-2">
                  {cams.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setActiveCam(i)}
                      className={`size-3 rounded-full transition-all ${activeCam === i ? 'bg-[#fabf37] w-12' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Production Stats Graph */}
            <div className="bg-zinc-900/50 p-10 rounded-[48px] border border-white/5 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Hourly Output</h3>
                  <p className="text-2xl font-black uppercase tracking-tighter">Production Metrics</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-[#fabf37]" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Yield</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-emerald-500" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400">Energy</span>
                  </div>
                </div>
              </div>
              
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#fabf37" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="time" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                      itemStyle={{ color: '#fabf37', fontSize: '10px', fontWeight: 'bold' }}
                    />
                    <Area type="monotone" dataKey="output" stroke="#fabf37" strokeWidth={3} fillOpacity={1} fill="url(#colorOutput)" />
                    <Line type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={2} dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900 p-10 rounded-[48px] border border-white/5 space-y-8">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Operational Log</p>
                <Activity className="size-4 text-zinc-700" />
              </div>

              <div className="space-y-6">
                {[
                  { time: "14:24", msg: "Batch #492 quality check passed.", type: "success" },
                  { time: "14:18", msg: "System maintenance in Sector C.", type: "info" },
                  { time: "13:50", msg: "New raw material cargo arrived.", type: "success" },
                  { time: "13:12", msg: "Temperature spike in Unit 4.", type: "warning" },
                  { time: "12:45", msg: "Shift rotation complete.", type: "info" }
                ].map((log, i) => (
                  <div key={i} className="flex gap-4 group">
                    <p className="text-[9px] font-black text-zinc-700 w-10 shrink-0">{log.time}</p>
                    <div className="space-y-1">
                      <p className={`text-[11px] font-bold ${log.type === 'warning' ? 'text-[#fabf37]' : 'text-zinc-400'} group-hover:text-white transition-colors`}>
                        {log.msg}
                      </p>
                      <div className="h-px w-0 group-hover:w-full bg-[#fabf37]/30 transition-all duration-500" />
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full py-5 bg-white/5 hover:bg-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all">
                Download Shift Report
              </button>
            </div>

            <div className="bg-[#fabf37] p-10 rounded-[48px] border-2 border-black text-black space-y-6 relative overflow-hidden group">
              <div className="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 transition-transform duration-700">
                <Radio className="size-40" />
              </div>
              <h4 className="text-3xl font-black uppercase tracking-tighter leading-none italic">Talk to <br /> Supervisor</h4>
              <p className="text-xs font-bold leading-relaxed opacity-80">Connect directly with the factory floor for urgent inquiries.</p>
              <button className="px-8 py-3 bg-black text-[#fabf37] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                Connect Now <Globe className="size-3" />
              </button>
            </div>

            <div className="bg-zinc-900/50 p-10 rounded-[48px] border border-white/5 space-y-6">
              <div className="flex items-center gap-3">
                <Thermometer className="size-4 text-emerald-500" />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Core Temperature</p>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic">42°C</span>
                <span className="text-[10px] font-black text-emerald-500">OPTIMAL</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "65%" }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}