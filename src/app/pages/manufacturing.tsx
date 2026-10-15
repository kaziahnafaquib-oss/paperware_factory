import React from "react";
import { motion } from "motion/react";
import { Factory, Zap, ShieldCheck, Activity, Cpu, Wind, Droplets, Gauge, ArrowUpRight, CircleCheck, Cog, Server } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function ManufacturingPage() {
  const metrics = [
    { label: "Production Capacity", value: "2M+", unit: "PCS/DAY", icon: <Factory className="size-5" /> },
    { label: "Automation Level", value: "94%", unit: "INTEGRATED", icon: <Cpu className="size-5" /> },
    { label: "Energy Efficiency", value: "A++", unit: "CERTIFIED", icon: <Zap className="size-5" /> },
    { label: "Compliance Rate", value: "100%", unit: "EU/GLOBAL", icon: <ShieldCheck className="size-5" /> },
  ];

  const processes = [
    {
      title: "Material Sourcing",
      desc: "Responsibly sourced paper fibres.",
      icon: <Wind className="size-8" />,
      image: "https://images.unsplash.com/photo-1711885417467-6eac5cb81607?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=75&w=1600"
    },
    {
      title: "Precision Forming",
      desc: "High-speed German forming technology with ultrasonic sealing for leak-proof durability.",
      icon: <Gauge className="size-8" />,
      image: "https://images.unsplash.com/photo-1721745250213-c3e1a2f4eeeb?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=75&w=1600"
    },
    {
      title: "Smart Monitoring",
      desc: "Quality checks for structural integrity.",
      icon: <Activity className="size-8" />,
      image: "https://images.unsplash.com/photo-1717386255773-a456c611dc4e?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=75&w=1600"
    }
  ];

  return (
    <div className="relative bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1549030927-006822377380?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=75&w=1600"
            alt="Manufacturing Factory"
            className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#fabf37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">Our Factory</span>
            </div>
            
            <h1 className="text-6xl md:text-[120px] font-black text-white leading-[0.9] tracking-tighter uppercase">
              INDUSTRIAL <br />
              <span className="text-[#fabf37]">EXCELLENCE.</span>
            </h1>

            <p className="max-w-2xl text-zinc-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
              Merging sustainable paper technology with precision German engineering to deliver the world's most reliable packaging solutions at industrial scale.
            </p>

            <div className="flex flex-wrap gap-4 pt-8">
              <button className="bg-[#fabf37] text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-colors group">
                Factory Tour <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
                Compliance Data
              </button>
            </div>
          </motion.div>
        </div>

      </section>


      {/* Industrial Flow */}
      <section className="py-32 bg-zinc-50 text-zinc-900 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37] bg-black px-4 py-2 rounded-lg">Workflow Engine</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  THE ART OF <br />
                  <span className="text-zinc-500">SCALABLE</span> <br />
                  PRODUCTION.
                </h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed max-w-xl">
                  Our manufacturing process is designed for maximum efficiency and minimum environmental impact. From fiber sourcing to final delivery, every step is optimized via our Neural Factory Core.
                </p>
              </div>

              <div className="space-y-8">
                {processes.map((p, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="flex gap-8 group cursor-pointer"
                  >
                    <div className="size-16 rounded-3xl bg-white border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all duration-500 shadow-sm">
                      {p.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black uppercase tracking-tight">{p.title}</h4>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed max-w-sm">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-[12px] border-white shadow-2xl relative">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1721745250213-c3e1a2f4eeeb?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=75&w=1600"
                  alt="Machinery Detail"
                  className="w-full h-full object-cover"
                />
                
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -left-12 size-48 bg-[#fabf37] rounded-[40px] -z-10 opacity-20 blur-2xl" />
              <div className="absolute -bottom-24 -right-12 size-64 bg-black rounded-[40px] -z-10 opacity-5" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
