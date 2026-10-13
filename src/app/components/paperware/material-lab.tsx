import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Beaker, Droplets, Wind, ShieldCheck, Box, Fingerprint, Layers, Cpu } from "lucide-react";

export const MaterialLab = React.memo(function MaterialLab() {
  const [activeMaterial, setActiveMaterial] = useState(0);

  const materials = [
    {
      id: 0,
      name: "Coated Kraft V1",
      texture: "Smooth / Matte",
      grade: "Premium 300GSM",
      properties: {
        liquidResistant: 95,
        stiffness: 88,
        printClarity: 100,
        ecoRating: 92
      },
      description: "Optimized for high-end retail packaging with a specialized clay coating for vibrant color reproduction.",
      image: "https://images.unsplash.com/photo-1760804876161-ba0337e998fe?auto=format&q=80&w=1000"
    },
    {
      id: 1,
      name: "Bio-Shield Barrier",
      texture: "Satin / Protective",
      grade: "Industrial 240GSM",
      properties: {
        liquidResistant: 100,
        stiffness: 72,
        printClarity: 85,
        ecoRating: 100
      },
      description: "100% plastic-free aqueous barrier coating that provides superior moisture protection without compromising recyclability.",
      image: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&q=80&w=1000"
    },
    {
      id: 2,
      name: "Unbleached Nordic",
      texture: "Rough / Natural",
      grade: "Eco-Grade 280GSM",
      properties: {
        liquidResistant: 60,
        stiffness: 94,
        printClarity: 70,
        ecoRating: 100
      },
      description: "Raw, unbleached long-fiber pulp from sustainable Nordic forests. Extreme structural integrity for heavy industrial use.",
      image: "https://images.unsplash.com/photo-1735050871569-4cb29aae3a30?auto=format&q=80&w=1000"
    }
  ];

  return (
    <section className="py-24 bg-[#0a0a0a] text-white overflow-hidden border-y border-white/5 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(250,191,55,0.05)_0%,_transparent_50%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          
          {/* Left: Material Visualization */}
          <div className="w-full lg:w-1/2 relative group">
             <div className="absolute -inset-10 bg-[#fabf37]/20 blur-[120px] rounded-full opacity-60" />
             
             <div className="relative aspect-square md:aspect-video rounded-[40px] md:rounded-[60px] overflow-hidden border border-white/10 bg-zinc-900/80 shadow-2xl backdrop-blur-3xl">
                <AnimatePresence mode="wait">
                  <motion.img loading="lazy" decoding="async" 
                    key={activeMaterial}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    src={materials[activeMaterial].image}
                    alt={materials[activeMaterial].name}
                    className="size-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700"
                  />
                </AnimatePresence>

                {/* HUD Elements */}
                <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-between overflow-hidden">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Microscopic Scan v4.2</p>
                         <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight italic">{materials[activeMaterial].name}</h3>
                      </div>
                      <div className="size-10 md:size-12 rounded-xl bg-[#fabf37] flex items-center justify-center text-black">
                         <Fingerprint className="size-5 md:size-6" />
                      </div>
                   </div>

                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                      {Object.entries(materials[activeMaterial].properties).map(([key, val], idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-3 md:p-4 space-y-1 md:space-y-2">
                           <p className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-zinc-300 line-clamp-1">{key.replace(/([A-Z])/g, ' $1')}</p>
                           <p className="text-sm md:text-lg font-black text-[#fabf37]">{val}%</p>
                           <div className="h-0.5 md:h-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${val}%` }}
                                className="h-full bg-[#fabf37]"
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Material Selection Tabs */}
             <div className="mt-8 flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                {materials.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMaterial(i)}
                    className={`shrink-0 px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] border-2 transition-all ${
                      activeMaterial === i 
                        ? "bg-[#fabf37] border-[#fabf37] text-black" 
                        : "bg-transparent border-white/10 text-white hover:border-white/30"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
             </div>
          </div>

          {/* Right: Technical Specs */}
          <div className="w-full lg:w-1/2 space-y-12">
             <div className="space-y-6">
                <div className="flex items-center gap-4 text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px]">
                  <div className="h-[1px] w-12 bg-[#fabf37]" />
                  Material Intelligence
                </div>
                <h2 className="text-[32px] md:text-[64px] font-black uppercase tracking-tighter leading-none">
                  Engineered <br /> <span className="text-zinc-600 italic">For B2B</span> <br /> Scale.
                </h2>
                <p className="text-zinc-500 font-bold text-lg leading-relaxed max-w-xl">
                  {materials[activeMaterial].description}
                </p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex gap-6 p-8 bg-zinc-900/80 backdrop-blur-xl rounded-[32px] border border-white/10 hover:border-[#fabf37]/30 transition-all group">
                   <div className="size-14 rounded-2xl bg-black flex items-center justify-center text-[#fabf37] group-hover:scale-110 transition-transform">
                      <Layers className="size-8" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">GSM Grade</p>
                      <p className="text-xl font-black uppercase">{materials[activeMaterial].grade}</p>
                   </div>
                </div>
                <div className="flex gap-6 p-8 bg-zinc-900/80 backdrop-blur-xl rounded-[32px] border border-white/10 hover:border-[#fabf37]/30 transition-all group">
                   <div className="size-14 rounded-2xl bg-black flex items-center justify-center text-[#fabf37] group-hover:scale-110 transition-transform">
                      <Beaker className="size-8" />
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Texture Profile</p>
                      <p className="text-xl font-black uppercase">{materials[activeMaterial].texture}</p>
                   </div>
                </div>
             </div>

             <div className="bg-[#fabf37] p-8 md:p-12 rounded-[40px] md:rounded-[50px] text-black relative overflow-hidden group">
                <div className="relative z-10 space-y-6">
                   <div className="flex items-center gap-3">
                      <Cpu className="size-6 animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Sustainability Audit</span>
                   </div>
                   <h3 className="text-2xl font-black uppercase tracking-tight leading-none italic">
                     This material reduces carbon footprint by {(activeMaterial + 1) * 14}% compared to traditional plastic-lined boards.
                   </h3>
                   <button className="bg-black text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:translate-x-2 transition-transform">
                      Request Material Swatch Kit
                   </button>
                </div>
                {/* Abstract Pattern */}
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-1000">
                   <Box className="size-64" />
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
});