import React from "react";
import { motion } from "framer-motion";
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
    { year: "2026", title: "Carbon Neutrality Phase 1", desc: "100% solar-powered factory site in Dhaka." },
    { year: "2027", title: "AI Predictive Maintenance", desc: "Reducing downtime by 40% using machine learning sensors." },
    { year: "2028", title: "Global Fulfillment Hubs", desc: "Localized distribution centers in Europe and GCC." },
    { year: "2030", title: "Zero-Waste Manufacturing", desc: "Circular economy model for all paper-based products." },
  ];

  const strategies = [
    { 
      icon: <Factory className="size-8" />, 
      title: "Capacity Expansion", 
      desc: "Scaling to 500,000 units per hour output capacity.",
      stat: "+300% Growth"
    },
    { 
      icon: <Leaf className="size-8" />, 
      title: "Sustainability", 
      desc: "Transitioning to 100% solar and 0% plastic in all packaging.",
      stat: "Net Zero Ready"
    },
    { 
      icon: <Cpu className="size-8" />, 
      title: "Automation", 
      desc: "Robotic die-cutting and automated quality sorting via AI.",
      stat: "99.9% Accuracy"
    },
    { 
      icon: <Globe className="size-8" />, 
      title: "Global Footprint", 
      desc: "Expanding export operations to 40+ countries by 2030.",
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
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fabf37]">AI Strategy Report 2025–2030</span>
            </div>
            <h1 className="text-[40px] md:text-[80px] font-black uppercase tracking-tighter leading-[0.9]">
              The Future of <br /><span className="text-[#fabf37]">Packaging</span>
            </h1>
            <p className="text-zinc-400 font-bold text-lg md:text-2xl max-w-2xl leading-relaxed">
              Leveraging predictive AI and sustainable engineering to redefine the global manufacturing landscape.
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
            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Evolutionary <br />Roadmap</h3>
          </div>
          <p className="text-zinc-500 font-bold max-w-md text-right">Our production milestones are driven by real-time market data and scalability projections.</p>
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

      {/* AI Strategy Cards */}
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

      {/* AI Forecast Panel */}
      <section className="container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl font-black uppercase tracking-tighter leading-none">AI Demand <br /><span className="text-[#fabf37]">Forecasting</span></h2>
              <p className="text-zinc-500 font-bold text-lg">Our proprietary AI model analyzes global consumption patterns to optimize our production capacity.</p>
            </div>
            
            <div className="space-y-6">
              {[
                { label: "Production Scalability", value: 94 },
                { label: "Market Expansion Confidence", value: 88 },
                { label: "Waste Reduction Projection", value: 92 }
              ].map((p, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black uppercase tracking-widest">{p.label}</span>
                    <span className="font-black italic">{p.value}%</span>
                  </div>
                  <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.value}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-black rounded-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-zinc-900 rounded-[60px] p-12 text-white space-y-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5">
                <ChartBar className="size-64" />
              </div>
              
              <div className="grid grid-cols-2 gap-8 relative z-10">
                <div className="p-8 bg-zinc-800 rounded-[40px] border border-white/5 space-y-4">
                  <TrendingUp className="size-8 text-[#fabf37]" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Market Prediction</p>
                    <p className="text-2xl font-black">High Demand</p>
                    <p className="text-[10px] text-emerald-500 font-bold mt-2">Zone: GCC & Europe</p>
                  </div>
                </div>
                <div className="p-8 bg-zinc-800 rounded-[40px] border border-white/5 space-y-4">
                  <Layers className="size-8 text-[#fabf37]" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Material Efficiency</p>
                    <p className="text-2xl font-black">Optimized</p>
                    <p className="text-[10px] text-emerald-500 font-bold mt-2">Yield: 99.4%</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#fabf37] p-8 rounded-[40px] flex items-center justify-between text-black relative z-10">
                <div>
                   <h4 className="font-black uppercase tracking-tight text-xl">Ready for 2030?</h4>
                   <p className="text-sm font-bold opacity-70">Align your supply chain with our vision.</p>
                </div>
                <button 
                  onClick={() => {
                    if (onPageChange) {
                      onPageChange('contact');
                    }
                  }}
                  className="size-16 rounded-full bg-black text-[#fabf37] flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
                >
                  <ArrowRight className="size-8" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}