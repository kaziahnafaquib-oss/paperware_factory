import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Rotate3d, Maximize2, MousePointer2, ChevronLeft, ChevronRight, Share2, Info, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../../context/LanguageContext";

export function ProductViewer3D() {
  const { t } = useLanguage();
  const [activeView, setActiveView] = useState("exterior");
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-30deg", "30deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const views = [
    { id: "exterior", name: "Exterior Design", img: "https://images.unsplash.com/photo-1595079676339-1534801ad6cf?auto=format&q=80&w=1080" },
    { id: "interior", name: "Internal Coating", img: "https://images.unsplash.com/photo-1714013709645-267311b9b045?auto=format&q=80&w=1080" },
    { id: "base", name: "Base Seal", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&q=80&w=1080" }
  ];

  return (
    <section className="py-24 bg-white/5 text-black overflow-hidden relative backdrop-blur-sm border-y border-black/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Viewer Side */}
          <div className="relative group">
            <div className="absolute -inset-10 bg-[#fabf37]/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <motion.div 
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative aspect-square bg-zinc-50 rounded-[60px] border border-black/5 flex items-center justify-center p-12 md:p-24 overflow-hidden cursor-grab active:cursor-grabbing shadow-xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,191,55,0.1),transparent_70%)]" />
              
              <motion.div 
                style={{ translateZ: 100 }}
                className="relative z-10 w-full h-full flex items-center justify-center"
              >
                <ImageWithFallback 
                  src={views.find(v => v.id === activeView)?.img || ""} 
                  alt="3D Cup Preview" 
                  className="max-h-full max-w-full object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)] transition-all duration-500"
                />
              </motion.div>

              {/* UI Overlays */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                <div className="px-4 py-2 bg-white/80 backdrop-blur-xl border border-black/10 rounded-full flex items-center gap-2">
                  <Rotate3d className="size-4 text-[#fabf37]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-black">360° Interactive</span>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 flex gap-2">
                <button className="size-12 bg-white/80 backdrop-blur-xl border border-black/10 rounded-full flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all">
                  <Maximize2 className="size-5" />
                </button>
              </div>

              <div className="absolute bottom-8 left-8 flex items-center gap-4 text-black/40">
                <MousePointer2 className="size-4 animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('drag_to_inspect')}</span>
              </div>
            </motion.div>

            {/* View Selector */}
            <div className="mt-8 flex justify-center gap-4">
              {views.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveView(v.id)}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeView === v.id 
                      ? "bg-[#fabf37] text-black" 
                      : "bg-black/5 text-zinc-500 hover:bg-black/10"
                  }`}
                >
                  {v.name}
                </button>
              ))}
            </div>
          </div>

          {/* Details Side */}
          <div className="space-y-12">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px]"
              >
                <div className="h-[1px] w-12 bg-[#fabf37]" />
                {t('studio_interactive')}
              </motion.div>
              <h2 className="text-4xl md:text-[80px] font-black uppercase tracking-tighter leading-none text-black">
                360° <br /> {t('precision')} <br /> <span className="text-zinc-400 italic">{t('stable_render')}.</span>
              </h2>
              <p className="text-zinc-500 font-bold text-lg leading-relaxed max-w-xl uppercase italic">
                Experience our packaging solutions in full volumetric detail before the first sheet is printed.
              </p>
            </div>

            <div className="space-y-8">
              {[
                { title: "Material Thickness", val: "280 GSM + 18 PE", icon: Info },
                { title: "Print Resolution", val: "2400 DPI High-Def", icon: Share2 },
                { title: "Edge Integrity", val: "Zero-Leak Bonded", icon: ChevronRight }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="size-12 rounded-2xl bg-black/5 border border-black/5 flex items-center justify-center text-[#fabf37] group-hover:bg-black group-hover:text-[#fabf37] transition-all">
                    <item.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.title}</p>
                    <p className="text-xl font-bold text-black">{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-widest text-xs hover:bg-[#fabf37] hover:text-black transition-all flex items-center gap-4 shadow-2xl">
              Request 3D Custom Sample <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}