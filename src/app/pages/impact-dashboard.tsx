import React from "react";
import { motion } from "framer-motion";
import { Leaf, Droplets, Wind, Zap, ChartBar, Globe, Award, Recycle, TreePine, ShieldCheck, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const pieData = [
  { name: 'Recycled Fiber', value: 75, color: '#fabf37' },
  { name: 'FSC Certified', value: 20, color: '#10b981' },
  { name: 'Managed Forests', value: 5, color: '#3b82f6' },
];

const barData = [
  { month: 'Jan', savings: 45 },
  { month: 'Feb', savings: 52 },
  { month: 'Mar', savings: 48 },
  { month: 'Apr', savings: 70 },
  { month: 'May', savings: 61 },
  { month: 'Jun', savings: 85 },
];

export function ImpactDashboardPage() {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-black text-white pt-32 pb-20 ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Leaf className="size-5 text-[#fabf37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">Sustainability Report v2.0</span>
            </div>
            <h1 className="text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">
              Net <span className="text-zinc-800">Zero</span> <br /> <span className="text-white">Positive</span> <br /> <span className="text-[#fabf37]">Impact</span>
            </h1>
          </div>
          
          <div className="p-10 bg-zinc-900 rounded-[48px] border border-white/5 space-y-4 max-w-sm">
            <Award className="size-8 text-[#fabf37]" />
            <p className="text-2xl font-black uppercase tracking-tight">EcoVadis Platinum 2024</p>
            <p className="text-xs font-bold text-zinc-500 leading-relaxed">We rank in the top 1% of manufacturers globally for sustainable performance.</p>
          </div>
        </div>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {[
            { label: "Trees Saved", val: "12,400", sub: "+12% this year", icon: TreePine, color: "text-[#fabf37]" },
            { label: "Carbon Neutral", val: "100%", sub: "Offset certified annually", icon: Droplets, color: "text-blue-400" },
            { label: "Recycled Content", val: "85%", sub: "Post-consumer fiber", icon: Wind, color: "text-emerald-400" },
            { label: "Plastic Replaced", val: "2.8M kg", sub: "Alternative to single-use", icon: Recycle, color: "text-purple-400" },
            { label: "Landfill Diverted", val: "96%", sub: "Zero waste initiative", icon: ShieldCheck, color: "text-cyan-400" },
            { label: "Renewable Energy", val: "68%", sub: "Biomass & grid mix", icon: Zap, color: "text-orange-400" }
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-900/50 p-10 rounded-[48px] border border-white/5 group hover:border-[#fabf37]/30 transition-all cursor-default"
            >
              <item.icon className={`size-8 mb-6 ${item.color}`} />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{item.label}</p>
                <p className="text-4xl font-black italic">{item.val}</p>
                <p className={`text-[9px] font-black uppercase ${item.color.replace('text', 'bg').replace('-400', '-500/10')} w-fit px-2 py-0.5 rounded-full mt-2`}>{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Fiber Composition Chart */}
          <div className="bg-zinc-900 p-12 rounded-[60px] border border-white/5 space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Material Integrity</p>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Fiber Composition</h3>
              </div>
              <Recycle className="size-6 text-[#fabf37]" />
            </div>

            <div className="h-[300px] flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-4xl font-black italic">100%</p>
                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">Traceable</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {pieData.map((item, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="h-1 rounded-full mx-auto w-12" style={{ backgroundColor: item.color }} />
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{item.name}</p>
                  <p className="text-sm font-black">{item.value}%</p>
                </div>
              ))}
            </div>
          </div>

          {/* Waste Reduction Over Time */}
          <div className="bg-zinc-900 p-12 rounded-[60px] border border-white/5 space-y-10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Operational Excellence</p>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Waste Reduction</h3>
              </div>
              <Globe className="size-6 text-[#fabf37]" />
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="month" stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#ffffff20" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '12px' }}
                  />
                  <Bar dataKey="savings" fill="#fabf37" radius={[10, 10, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="p-8 bg-black rounded-[32px] border border-white/5 flex items-center justify-between group cursor-pointer hover:border-[#fabf37] transition-all">
              <div className="flex items-center gap-6">
                <div className="size-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ChartBar className="size-6" />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest">Impact Assessment</p>
                  <p className="text-xs font-bold text-zinc-500">Download the full 2024 ESG audit</p>
                </div>
              </div>
              <ArrowUpRight className="size-5 text-zinc-700 group-hover:text-[#fabf37] transition-colors" />
            </div>
          </div>

        </div>

        {/* Global Certifications */}
        <div className="mt-20 py-16 border-t border-white/5 flex flex-wrap justify-center items-center gap-12 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all">
          {["ISO 14001", "FSC-C123456", "B-CORP PENDING", "GRS CERTIFIED", "OEKO-TEX"].map((cert, i) => (
            <span key={i} className="text-2xl font-black uppercase tracking-tighter italic">{cert}</span>
          ))}
        </div>

      </div>
    </div>
  );
}