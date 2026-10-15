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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Factory Floor</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Factory <span className="text-zinc-500">Ops</span> <br /> <span className="text-[#fabf37]">Real-Time</span>
            </h1>
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Live Feed Section */}
          <div className="lg:col-span-12 space-y-6">
            <div className="relative aspect-video bg-black rounded-[48px] overflow-hidden border border-white/10 shadow-2xl group">
              {/* Camera Metadata Overlay */}
              <div className="absolute top-8 left-8 z-20 flex items-center gap-4">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-red-600 animate-ping" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{cams[activeCam].id}</span>
                </div>
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{cams[activeCam].location}</span>
                </div>
              </div>

              <div className="absolute top-8 right-8 z-20">
                <button 
                  onClick={() => setIsLive(!isLive)}
                  aria-label={isLive ? "Pause live feed" : "Play live feed"}
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
                      aria-label={`Camera ${i + 1}`}
                      aria-pressed={activeCam === i}
                      className={`size-3 rounded-full transition-all ${activeCam === i ? 'bg-[#fabf37] w-12' : 'bg-white/20'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>


        </div>
      </div>
    </div>
  );
}