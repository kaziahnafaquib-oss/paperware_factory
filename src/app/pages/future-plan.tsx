import React from "react";
import { motion } from "motion/react";
import { 
  TrendingUp, Zap, Target, Globe, 
  ArrowRight, Download, Cpu, Leaf, 
  ZapOff, Factory, Sparkles, ChartBar,
  Calendar, Layers, ShieldCheck
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function FuturePlanPage({ onPageChange }: { onPageChange?: (page: string) => void }) {
  const { t } = useLanguage();

  const roadmap = [
    { year: "2025", title: "Smart Factory 1.0", desc: "Full ERPNext integration across all production lines." },
    { year: "2026", title: "Carbon Neutrality Phase 1", desc: "Solar power for the Dhaka factory site." },
    { year: "2027", title: "Predictive Maintenance", desc: "Sensor-based maintenance to reduce downtime." },
    { year: "2028", title: "Global Fulfillment Hubs", desc: "Localized distribution centers in Europe and GCC." },
    { year: "2030", title: "Zero-Waste Manufacturing", desc: "Circular economy model for all paper-based products." },
  ];

  const strategies = [
    { 
      icon: <Factory className="size-8" />, 
      title: "Capacity Expansion", 
      desc: "Expanding production capacity.",
      stat: "Growth"
    },
    { 
      icon: <Leaf className="size-8" />, 
      title: "Sustainability", 
      desc: "Moving toward solar power and plastic-free packaging.",
      stat: "Net Zero Ready"
    },
    { 
      icon: <Cpu className="size-8" />, 
      title: "Automation", 
      desc: "Automated die-cutting and quality sorting.",
      stat: "Automation"
    },
    { 
      icon: <Globe className="size-8" />, 
      title: "Global Footprint", 
      desc: "Expanding export operations.",
      stat: "Worldwide"
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-20 font-['Poppins',sans-serif]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-black rounded-[60px] p-12 md:p-24 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#fabf37] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-zinc-800 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative z-10 max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 rounded-full border border-zinc-800">
              <Sparkles className="size-4 text-[#fabf37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fabf37]">Our Roadmap</span>
            </div>
            <h1 className="text-[40px] md:text-[80px] font-black uppercase tracking-tighter leading-[0.9]">
              The Future of <br /><span className="text-[#fabf37]">Packaging</span>
            </h1>
            <p className="text-zinc-400 font-bold text-lg md:text-2xl max-w-2xl leading-relaxed">
              Where Paperware is heading: more capacity, cleaner energy and less plastic.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#fabf37] text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl flex items-center gap-3">
                <Download className="size-5" /> Download Vision PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="container mx-auto px-4 mb-40">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">Strategic Timeline</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">Evolutionary <br />Roadmap</h3>
          </div>
          <p className="text-zinc-500 font-bold max-w-md text-right">Our production milestones and where we are investing next.</p>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {roadmap.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 bg-zinc-50 rounded-[40px] border border-black/5 group hover:bg-black hover:text-white transition-all duration-500"
            >
              <div className="text-[#fabf37] font-black text-3xl mb-8">{item.year}</div>
              <h4 className="text-lg font-black uppercase tracking-tight mb-4 group-hover:text-[#fabf37] transition-colors text-[rgb(0,0,0)]">{item.title}</h4>
              <p className="text-zinc-500 font-bold text-sm leading-relaxed group-hover:text-zinc-400 transition-colors">{item.desc}</p>
              <div className="mt-8 pt-8 border-t border-black/5 group-hover:border-white/10">
                <Calendar className="size-5 text-zinc-300 group-hover:text-zinc-600" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Strategy Cards */}
      <section className="container mx-auto px-4 mb-40">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {strategies.map((s, i) => (
            <div key={i} className="bg-white p-10 rounded-[50px] border-2 border-zinc-100 space-y-8 hover:border-[#fabf37] transition-all">
              <div className="size-16 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                {s.icon}
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-black uppercase tracking-tight text-[rgb(0,0,0)]">{s.title}</h4>
                <p className="text-zinc-500 font-bold text-sm leading-relaxed">{s.desc}</p>
              </div>
              <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Target Metric</span>
                <span className="font-black text-emerald-600 italic">{s.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}