import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useAnimationFrame, useMotionValue } from "motion/react";
import { Gauge, Activity, Cpu, Zap, Box, ArrowRight, RotateCcw } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const RealtimeOps = React.memo(() => {
  const { t, isRTL } = useLanguage();
  const rotation = useMotionValue(0);
  const [rotationDisplay, setRotationDisplay] = useState(0);
  const [activeBatch, setActiveBatch] = useState("B-99284");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const frameCountRef = useRef(0);

  // Intersection observer to only animate when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsInView(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Update display value less frequently to save on re-renders
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setRotationDisplay(Math.round(rotation.get() % 360));
    }, 150); // Reduced frequency from 100ms to 150ms
    return () => clearInterval(interval);
  }, [rotation, isInView]);

  useAnimationFrame((time) => {
    // Only animate when in view
    if (!isInView) return;
    
    // Skip frames for better performance (render every 2nd frame)
    frameCountRef.current++;
    if (frameCountRef.current % 2 !== 0) return;
    
    rotation.set((rotation.get() + 0.5) % 360);
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 100;
    
    ctx.strokeStyle = "#fabf37";
    ctx.lineWidth = 2;
    
    const currentRotation = rotation.get();
    
    // Draw a rotating cylinder-like shape (wireframe)
    // Reduced segments from 12 to 8 for better performance
    const segments = 8;
    const angleStep = (Math.PI * 2) / segments;
    
    // Top circle
    ctx.beginPath();
    for(let i = 0; i <= segments; i++) {
      const angle = i * angleStep + (currentRotation * Math.PI / 180);
      const x = centerX + radius * Math.cos(angle);
      const y = centerY - 100 + (radius/3) * Math.sin(angle);
      if(i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Bottom circle
    ctx.beginPath();
    for(let i = 0; i <= segments; i++) {
      const angle = i * angleStep + (currentRotation * Math.PI / 180);
      const x = centerX + radius * 0.7 * Math.cos(angle);
      const y = centerY + 100 + (radius/4) * Math.sin(angle);
      if(i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Connecting lines
    for(let i = 0; i < segments; i++) {
      const angle = i * angleStep + (currentRotation * Math.PI / 180);
      const tx = centerX + radius * Math.cos(angle);
      const ty = centerY - 100 + (radius/3) * Math.sin(angle);
      const bx = centerX + radius * 0.7 * Math.cos(angle);
      const by = centerY + 100 + (radius/4) * Math.sin(angle);
      
      const opacity = (Math.sin(angle) + 1) / 2;
      ctx.strokeStyle = `rgba(250, 191, 55, ${0.1 + opacity * 0.9})`;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(bx, by);
      ctx.stroke();
    }
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-white/10 overflow-hidden relative border-y border-black/5 backdrop-blur-sm">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#fabf37]/5 blur-[150px] rounded-full" />
      
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          <div className="space-y-8 md:space-y-12">
            <div className="space-y-3 md:space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs"
              >
                <div className="h-[1px] w-8 md:w-12 bg-[#fabf37]" />
                {t('live_diagnostics')}
              </motion.div>
              <h2 className="text-[32px] md:text-[42px] lg:text-[64px] font-black text-black uppercase tracking-tighter leading-none">
                360° <br /> <span className="text-[#fabf37]">Visual</span> <br /> QC Engine
              </h2>
              <p className="text-zinc-500 font-bold text-base md:text-lg max-w-lg leading-relaxed">
                Every unit is scanned across 4600 spectral points in real-time. Our AI detects structural deviations within 0.001mm tolerance.
              </p>
            </div>

            {/* Real-time Ticker */}
            <div className="bg-black/5 border border-black/10 rounded-[32px] md:rounded-[40px] p-6 md:p-8 space-y-6 md:space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#fabf37] to-transparent animate-shimmer" />
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 md:gap-3">
                  <Activity className="size-4 md:size-5 text-[#fabf37] animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">Live Production Stream</span>
                </div>
                <span className="text-[8px] md:text-[10px] font-black text-[#a16207] bg-[#fabf37]/10 px-2 md:px-3 py-1 rounded-full uppercase truncate max-w-[120px] md:max-w-none">Batch: {activeBatch}</span>
              </div>

              <div className="space-y-3 md:space-y-4">
                {[
                  { label: "Throughput", val: "1,420 units/min", icon: <Zap size={14} /> },
                  { label: "Sterilization", val: "Pass (UV-C)", icon: <Cpu size={14} /> },
                  { label: "Structural Integrity", val: "Optimal", icon: <Box size={14} /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-black/5 pb-3 md:pb-4 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 md:gap-3 text-zinc-500 font-bold text-[10px] md:text-xs">
                      {item.icon}
                      {item.label}
                    </div>
                    <div className="text-black font-black text-[10px] md:text-xs uppercase">{item.val}</div>
                  </div>
                ))}
              </div>

              <button className="w-full py-3 md:py-4 bg-black text-[#fabf37] hover:bg-zinc-800 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                View Full Telemetry <ArrowRight size={10} />
              </button>
            </div>
          </div>

          <div className="relative">
            {/* 3D Preview Canvas */}
            <div className="relative aspect-square max-w-[300px] md:max-w-lg mx-auto bg-zinc-100 rounded-[40px] md:rounded-[80px] border border-black/5 flex items-center justify-center group overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(250,191,55,0.1)_0%,transparent_70%)]" />
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={500} 
                className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing"
                onMouseMove={(e) => {
                  if(e.buttons === 1) rotation.set(rotation.get() + e.movementX);
                }}
              />
              
              {/* Interaction Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/80 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <RotateCcw size={12} className="text-[#fabf37]" /> Drag to Inspect
                </div>
              </div>

              {/* HUD Elements */}
              <div className="absolute top-10 right-10 text-right space-y-1">
                <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Rotation Axis</p>
                <p className="text-[14px] font-black text-[#a16207] tabular-nums">{rotationDisplay}°</p>
              </div>
              
              <div className="absolute top-10 left-10 space-y-1">
                <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Model Index</p>
                <p className="text-[14px] font-black text-black">CUP-ECO-V2</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default RealtimeOps;