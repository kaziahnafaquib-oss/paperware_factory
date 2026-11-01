import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Printer, Scissors, Layers, Settings, ShieldCheck, ArrowRight, Activity, Gauge, Cpu } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useScrollScrub, clamp01, easeOut3 } from "../../lib/useScrollScrub";
// Real Paperware floor photos (src/assets/factory/SOURCES.txt). The die-cutting machines have no
// photo in the library, so those cards render a graphic panel instead of a stock image.
import imgOffsetPress from "../../../assets/factory/offset-press.webp";
import imgPressOperator from "../../../assets/factory/press-operator.webp";
import imgCupFormingMachines from "../../../assets/factory/cup-forming-machines.webp";
import imgFormingCloseup from "../../../assets/factory/forming-closeup.webp";
import imgQcTechnician from "../../../assets/factory/qc-technician.webp";

const imgHeidelberg = imgOffsetPress;
const imgOriginalHeidelberg = imgPressOperator;
const imgPYQ203C: string | null = null;
const imgPYQ401C: string | null = null;

const departments = [
  {
    id: "printing",
    name: "Printing Unit",
    title: "High-Speed Precision Printing",
    description: "Equipped with advanced multi-color offset and flexo printing technology, ensuring vibrant brand representation.",
    machines: [
      {
        name: "HEIDELBERG MO-V-P",
        desc: "4-Color Offset System with precision ink control.",
        image: imgHeidelberg,
        specs: ["4 Color", "48 x 65 cm", "19 x 25.5 (Inch)"]
      },
      {
        name: "ORIGINAL HEIDELBERG",
        desc: "Vintage precision engineering for heavy-duty processing.",
        image: imgOriginalHeidelberg,
        specs: ["Offset-Letterset", "64 x 91.5cm", "25.25 x 36 (Inch)"]
      }
    ],
    icon: Printer,
    stats: [
      { label: "Daily Output", value: "140K Pcs" },
      { label: "Color Accuracy", value: "99.9%" },
      { label: "Technology", value: "Hybrid Offset" }
    ],
    features: ["Soy-based inks", "AI color matching", "Substrate versatility"]
  },
  {
    id: "cutting",
    name: "Cutting Unit",
    title: "Laser-Precision Die Cutting",
    description: "Our automated die-cutting systems handle complex geometries with zero-waste efficiency, providing clean edges and consistent dimensions for every batch.",
    machines: [
      {
        name: "PYQ 203 C",
        desc: "M.003DCS - Creasing and Die Cutting Machine.",
        image: imgPYQ203C,
        specs: ["Creasing & Die Cutting", "930 X 670 MM", "Heavy Duty"]
      },
      {
        name: "PYQ-401C",
        desc: "M.004DCS - Precision Creasing and Die Cutting.",
        image: imgPYQ401C,
        specs: ["Creasing & Die Cutting", "750 X 520 MM", "Precision Core"]
      }
    ],
    icon: Scissors,
    stats: [
      { label: "Daily Output", value: "12K Pcs" },
      { label: "Precision", value: "±0.1mm" },
      { label: "Process", value: "Automated" }
    ],
    features: ["Micro-metric adjustment", "Rapid tooling", "Zero-waste stripping"]
  },
  {
    id: "lamination",
    name: "Lamination Unit",
    title: "Sustainable Barrier Coating",
    description: "Utilizing biodegradable PLA and water-based coatings to provide superior liquid resistance while maintaining 100% recyclability.",
    image: imgCupFormingMachines,
    icon: Layers,
    stats: [
      { label: "Daily Output", value: "25K Pcs" },
      { label: "Coating", value: "PE/PLA" },
      { label: "Material", value: "Paperboard" }
    ],
    features: ["Heat resistant", "Food-grade certified", "Aqueous coating"]
  },
  {
    id: "forming",
    name: "Forming Unit",
    title: "High-Speed Product Assembly",
    description: "State-of-the-art European forming machines that mold and seal packaging at incredible speeds with ultrasonic leak-proof technology.",
    image: imgFormingCloseup,
    icon: Settings,
    stats: [
      { label: "Daily Output", value: "350K Pcs" },
      { label: "Speed", value: "140 units/min" },
      { label: "System", value: "Ultrasonic" }
    ],
    features: ["Leak-proof sealing", "High-speed molding", "Auto-stacking"]
  },
  {
    id: "quality",
    name: "Quality Check Unit",
    title: "Multi-Stage Inspection Lab",
    description: "Rigorous testing protocols in a medical-grade environment, ensuring every product meets international safety and hygiene standards.",
    image: imgQcTechnician,
    icon: ShieldCheck,
    stats: [
      { label: "Defect Rate", value: "< 0.01%" },
      { label: "Tests/Batch", value: "24 Metrics" },
      { label: "Safety", value: "ISO Certified" }
    ],
    features: ["Bacterial testing", "Leak stress tests", "Color consistency"]
  }
];

export function DepartmentShowcase() {
  const [activeTab, setActiveTab] = useState(departments[0].id);
  const headRef = React.useRef<HTMLDivElement>(null);
  const frameRef = React.useRef<HTMLDivElement>(null);

  // Scroll-scrubbed: heading rises in; the black content frame rises and settles slightly after it.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;
    const head = headRef.current;
    if (head) {
      const r = head.getBoundingClientRect();
      const u = easeOut3(clamp01((h - r.top) / (h * 0.6)));
      head.style.transform = `translate3d(0,${((1 - u) * 48).toFixed(1)}px,0)`;
      head.style.opacity = (0.15 + 0.85 * u).toFixed(3);
    }
    const frame = frameRef.current;
    if (frame) {
      const r = frame.getBoundingClientRect();
      const u = easeOut3(clamp01((h - r.top) / (h * 0.7)));
      frame.style.transform = `translate3d(0,${((1 - u) * 80).toFixed(1)}px,0) scale(${(0.97 + 0.03 * u).toFixed(4)})`;
      frame.style.opacity = (0.2 + 0.8 * u).toFixed(3);
    }
  });

  return (
    <section className="py-24 bg-white overflow-x-clip">
      <div className="container mx-auto px-4">
        <div ref={headRef} className="flex flex-col mb-16 space-y-4 will-change-transform">
          <div
            className="flex items-center gap-4 text-black font-black uppercase tracking-[0.4em] text-[10px]"
          >
            <div className="h-[2px] w-12 bg-[#fabf37]" />
            Departmental Infrastructure
          </div>
          <h2 className="text-[32px] md:text-[64px] font-black uppercase tracking-tighter leading-none">
            Our <span className="text-zinc-300">Operational</span> <br />
            Units.
          </h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto scrollbar-hide gap-2 mb-12 pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <button
                key={dept.id}
                onClick={() => setActiveTab(dept.id)}
                className={`shrink-0 flex items-center gap-3 px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all ${
                  activeTab === dept.id 
                    ? "bg-black text-[#fabf37] shadow-xl" 
                    : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
                }`}
              >
                <Icon className="size-4" />
                {dept.name}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div ref={frameRef} className="relative min-h-[850px] bg-black overflow-hidden group will-change-transform">
          {/* Background Decorative Element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#fabf37]/5 skew-x-[-20deg] translate-x-1/2 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            {departments.map((dept) => (
              activeTab === dept.id && (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col lg:flex-row p-4 md:p-8 gap-8"
                >
                  {/* Image Side - SLICK STACKED CARDS */}
                  <div className="flex-[1.4] relative flex flex-col gap-6">
                    {dept.machines ? (
                      <div className="grid grid-rows-2 h-full gap-6">
                        {dept.machines.map((machine, mi) => (
                          <motion.div 
                            key={mi} 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: mi * 0.2 }}
                            className="relative group/machine overflow-hidden rounded-[32px] border border-white/10 bg-zinc-900"
                          >
                            {machine.image ? (
                            <ImageWithFallback
                              src={machine.image}
                              alt={machine.name}
                              className="size-full object-cover grayscale brightness-75 group-hover/machine:grayscale-0 group-hover/machine:brightness-100 group-hover/machine:scale-105 transition-all duration-1000"
                            />
                            ) : (
                              <div aria-hidden="true" className="absolute inset-0 bg-zinc-900 overflow-hidden">
                                <div className="absolute inset-y-0 right-0 w-1/2 bg-[#fabf37] skew-x-[-14deg] translate-x-1/4 opacity-90 group-hover/machine:translate-x-[18%] transition-transform duration-700" />
                                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
                              </div>
                            )}
                            
                            {/* Slick Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-center">
                              <div className="max-w-md space-y-4">
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="inline-flex items-center gap-2 bg-[#fabf37] text-black px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                                >
                                  <div className="size-1.5 bg-black rounded-full animate-pulse" />
                                  Active Unit
                                </motion.div>
                                <h4 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                                  {machine.name}
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                  {machine.specs.map((s, si) => (
                                    <span key={si} className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest border-b border-white/10 pb-1">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            {/* Decorative Corner */}
                            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/machine:opacity-100 transition-opacity">
                              <ArrowRight className="size-8 text-[#fabf37] -rotate-45" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div className="h-full relative rounded-[40px] overflow-hidden border border-white/10">
                        <ImageWithFallback
                          src={dept.image}
                          alt={dept.name}
                          className="size-full object-cover grayscale brightness-75 group-hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      </motion.div>
                    )}
                  </div>

                  {/* Info Side - CLEAN & MINIMALIST BOLD */}
                  <div className="flex-1 flex flex-col justify-between py-6">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <p className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px] flex items-center gap-3">
                          <span className="w-8 h-px bg-[#fabf37]" />
                          Industrial Core / 0{departments.indexOf(dept) + 1}
                        </p>
                        <h3 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] text-white italic">
                          {dept.title}
                        </h3>
                      </div>
                      
                      <p className="text-zinc-400 font-medium text-lg leading-relaxed max-w-lg">
                        {dept.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {dept.stats.map((stat, i) => (
                          <div key={i} className="p-6 rounded-[24px] bg-zinc-900/50 border border-white/5 group/stat hover:border-[#fabf37]/50 transition-colors">
                            <p className="text-3xl font-black text-white group-hover/stat:text-[#fabf37] transition-colors">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mt-1">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-8">
                      {dept.features.map((feature, i) => (
                        <span key={i} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Efficiency Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 bg-zinc-50 rounded-[32px] border border-black/5 space-y-4">
            <Activity className="size-6 text-[#fabf37]" />
            <h4 className="text-sm font-black uppercase tracking-widest">Real-time Telemetry</h4>
            <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed">Continuous performance monitoring across all 5 units.</p>
          </div>
          <div className="p-8 bg-zinc-50 rounded-[32px] border border-black/5 space-y-4">
            <Gauge className="size-6 text-[#fabf37]" />
            <h4 className="text-sm font-black uppercase tracking-widest">Synchronized Workflow</h4>
            <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed">Optimized production handovers reducing bottleneck delays by 22%.</p>
          </div>
          <div className="p-8 bg-zinc-50 rounded-[32px] border border-black/5 space-y-4">
            <Cpu className="size-6 text-[#fabf37]" />
            <h4 className="text-sm font-black uppercase tracking-widest">Central AI Core</h4>
            <p className="text-xs font-bold text-zinc-500 uppercase leading-relaxed">Predictive maintenance scheduling for zero unscheduled downtime.</p>
          </div>
        </div>
      </div>
    </section>
  );
}