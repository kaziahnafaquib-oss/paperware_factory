import React from "react";
import { motion } from "motion/react";
import { Factory, ShieldCheck, Truck, Anchor, Zap, Box, CircleCheck } from "lucide-react";

export function ProductionTimeline() {
  const steps = [
    {
      id: "01",
      title: "Sustainable Sourcing",
      desc: "Paperboard and pulp sourcing from our suppliers.",
      icon: <Zap className="size-6" />,
      status: "completed"
    },
    {
      id: "02",
      title: "Precision Die-Cutting",
      desc: "High-speed automation with 0.01mm tolerance threshold.",
      icon: <Factory className="size-6" />,
      status: "active"
    },
    {
      id: "03",
      title: "Multi-Layer Coating",
      desc: "Application of Bio-Shield aqueous barrier for moisture protection.",
      icon: <Box className="size-6" />,
      status: "upcoming"
    },
    {
      id: "04",
      title: "Automated QC Audit",
      desc: "Visual inspection for colour and structural integrity.",
      icon: <ShieldCheck className="size-6" />,
      status: "upcoming"
    },
    {
      id: "05",
      title: "Smart Palletizing",
      desc: "NFC-tagged packaging for end-to-end supply chain visibility.",
      icon: <Truck className="size-6" />,
      status: "upcoming"
    },
    {
      id: "06",
      title: "Global Dispatch",
      desc: "Optimized route planning for direct-to-port logistics.",
      icon: <Anchor className="size-6" />,
      status: "upcoming"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] overflow-hidden relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(250,191,55,0.03)_0%,_transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px]">
              <div className="h-[1px] w-12 bg-[#fabf37]" />
              Supply Chain Transparency
            </div>
            <h2 className="text-[32px] md:text-[52px] font-black uppercase tracking-tighter leading-none text-white">
              The Journey of <br /> <span className="text-zinc-600 italic">Precision</span>
            </h2>
          </div>
          <p className="text-zinc-500 font-bold text-sm max-w-md leading-relaxed">
            From raw fiber to global distribution, every Paperware product undergoes a rigorous 6-stage industrial cycle monitored by IoT sensors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-12 border-r border-b border-white/10 transition-all duration-500 hover:bg-zinc-900/40 backdrop-blur-sm ${
                step.status === 'active' ? 'bg-[#fabf37]/5' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-8">
                <span aria-hidden="true" className={`text-4xl font-black italic tracking-tighter transition-colors ${
                  step.status === 'active' || step.status === 'completed' ? 'text-[#fabf37]' : 'text-zinc-800 group-hover:text-zinc-600'
                }`}>
                  {step.id}
                </span>
                <div className={`p-4 rounded-2xl transition-all duration-500 ${
                  step.status === 'active' ? 'bg-[#fabf37] text-black scale-110' : 'bg-zinc-900 text-zinc-500 group-hover:bg-white group-hover:text-black'
                }`}>
                  {step.icon}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight text-white group-hover:text-[#fabf37] transition-colors flex items-center gap-3">
                  {step.title}
                  {step.status === 'completed' && <CircleCheck className="size-4 text-[#fabf37]" />}
                </h3>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {step.status === 'active' && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-[#fabf37] animate-pulse" />
              )}
              
              <div className="mt-8 pt-8 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[10px] font-black uppercase tracking-widest text-[#fabf37] flex items-center gap-2 hover:gap-4 transition-all">
                  View Protocol <div className="h-[1px] w-4 bg-[#fabf37]" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}