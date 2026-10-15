import React from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { 
  Cpu, Database, Zap, Activity, ShieldCheck, 
  Layers, Code, Network, Server, Gauge, 
  Terminal, Globe, Cpu as Chip, HardDrive,
  Workflow, Microscope, Binary, Atom,
  ChevronRight, Box, Hexagon, Radio
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

// New Component: Counting Stat for high-impact numbers
function CountingStat({ value, suffix = "", delay = 0 }: { value: string, suffix?: string, delay?: number }) {
  const numValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const count = useSpring(0, { stiffness: 50, damping: 20 });
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (isInView) {
      count.set(numValue);
    }
  }, [isInView, count, numValue]);

  const display = useTransform(count, (v) => v.toFixed(1));

  return (
    <div ref={ref} className="relative">
      <motion.span className="text-3xl font-black italic">
        {display}
      </motion.span>
      <span className="text-3xl font-black italic">{suffix}</span>
    </div>
  );
}

// New Component: Staggered Text Reveal
function StaggeredText({ text, className }: { text: string, className?: string }) {
  return (
    <div className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-2">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export function TechnicalManifestoPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const coreValues = [
    { title: "Efficiency", desc: "Lean production that keeps material waste low.", icon: <Cpu />, stats: "EFFICIENCY" },
    { title: "Traceability", desc: "Batch records for materials and production.", icon: <Database />, stats: "TRACEABLE" },
    { title: "Logistics", desc: "Road, sea and air delivery from Dhaka.", icon: <Zap />, stats: "LOGISTICS" },
    { title: "Quality Control", desc: "Quality checks on every production run.", icon: <Activity />, stats: "QUALITY" }
  ];

  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hero Animations - More aggressive expansion for specific lines
  const line1Scale = useTransform(smoothProgress, [0, 0.15], [0.8, 1.5]);
  const line1Opacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
  const line1Z = useTransform(smoothProgress, [0, 0.15], [-200, 100]);

  const line2Scale = useTransform(smoothProgress, [0.05, 0.2], [0.8, 1.5]);
  const line2Opacity = useTransform(smoothProgress, [0.05, 0.15], [0, 1]);
  const line2Z = useTransform(smoothProgress, [0.05, 0.2], [-200, 200]);

  const line3Scale = useTransform(smoothProgress, [0.1, 0.3], [0.5, 2.5]);
  const line3Opacity = useTransform(smoothProgress, [0.1, 0.25], [0, 1]);
  const line3Z = useTransform(smoothProgress, [0.1, 0.3], [-500, 400]);
  const line3RotateX = useTransform(smoothProgress, [0.1, 0.3], [45, 0]);

  const line4Scale = useTransform(smoothProgress, [0.15, 0.35], [0.5, 3]);
  const line4Opacity = useTransform(smoothProgress, [0.15, 0.3], [0, 1]);
  const line4Z = useTransform(smoothProgress, [0.15, 0.35], [-500, 600]);
  const line4RotateX = useTransform(smoothProgress, [0.15, 0.35], [45, 0]);

  return (
    <div ref={containerRef} className="relative bg-black min-h-screen text-white font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden pt-32 md:pt-40">
      {/* Cinematic 3D Background Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        {/* Animated Background SVG Circuitry */}
        <svg className="absolute inset-0 size-full opacity-10" viewBox="0 0 1000 1000">
          <motion.path
            d="M0 500 Q 250 250 500 500 T 1000 500"
            stroke="#fabf37"
            strokeWidth="0.5"
            fill="none"
            style={{ pathLength: useTransform(smoothProgress, [0, 1], [0, 1]) }}
          />
          <motion.path
            d="M200 0 V 1000"
            stroke="#fabf37"
            strokeWidth="0.2"
            fill="none"
            style={{ pathLength: useTransform(smoothProgress, [0, 1], [0.5, 1.5]) }}
          />
          <motion.path
            d="M800 0 V 1000"
            stroke="#fabf37"
            strokeWidth="0.2"
            fill="none"
            style={{ pathLength: useTransform(smoothProgress, [0, 1], [0, 1]) }}
          />
        </svg>
        
        {/* Floating 3D Geometric Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`node-${i}`}
            style={{
              x: `${(i % 3) * 40 - 20}%`,
              y: `${Math.floor(i / 3) * 60 - 20}%`,
              z: useTransform(smoothProgress, [0, 1], [i * -200, i * 200]),
              rotateY: useTransform(smoothProgress, [0, 1], [0, 360]),
              rotateX: useTransform(smoothProgress, [0, 1], [360, 0]),
            }}
            className="absolute size-64 border border-[#fabf37]/10 rounded-[60px] opacity-20 [will-change:transform]"
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:80px_80px]" />
        
        {/* Dynamic Scanning Line */}
        <motion.div 
          animate={{ top: ["-10%", "110%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#fabf37]/20 to-transparent z-0"
        />

        {/* Floating Code/Data Particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-10%", "110%"],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: Math.random() * 20 + 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
            className="absolute text-[8px] font-mono text-[#fabf37]/20 whitespace-nowrap [will-change:transform,opacity]"
          >
            {Math.random().toString(16).substring(2, 20)}
          </motion.div>
        ))}
      </div>

      {/* 1. HERO: THE CORE ARCHITECTURE */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center z-10 overflow-hidden">
        {/* Cinematic Grid Background that scales out */}
        <motion.div 
          style={{ 
            scale: useTransform(smoothProgress, [0, 0.3], [2, 0.8]), 
            opacity: useTransform(smoothProgress, [0, 0.3], [0.4, 0.05]),
            rotateX: useTransform(smoothProgress, [0, 0.3], [60, 0]),
            z: -100
          }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#fabf3720_1px,transparent_1px),linear-gradient(to_bottom,#fabf3720_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"
        />

        <div className="flex flex-col items-center gap-4 w-full px-4" style={{ transformStyle: "preserve-3d" }}>
          {/* LINE 1: PAPERWARE K-BASE */}
          <motion.div
            style={{ 
              scale: line1Scale, 
              opacity: line1Opacity, 
              z: line1Z,
              rotateY: mousePos.x * 0.2,
              transformStyle: "preserve-3d"
            }}
            className="flex items-center gap-6 mb-2"
          >
            <div className="h-[2px] w-20 bg-[#fabf37]/50" />
            <span className="text-xl md:text-3xl font-black uppercase tracking-[1em] text-[#fabf37] whitespace-nowrap">
              Paperware K-BASE
            </span>
            <div className="h-[2px] w-20 bg-[#fabf37]/50" />
          </motion.div>

          {/* LINE 2: SYSTEM ONLINE v2.0 */}
          <motion.div
            style={{ 
              scale: line2Scale, 
              opacity: line2Opacity, 
              z: line2Z,
              rotateY: mousePos.x * 0.3,
              transformStyle: "preserve-3d"
            }}
            className="mb-12 flex items-center gap-4"
          >
            <div className="size-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
            <span className="text-sm md:text-xl font-bold uppercase tracking-[0.5em] text-zinc-500">
              Paperware <span className="text-white">Factory</span>
            </span>
          </motion.div>

          {/* LINE 3: TECHNICAL */}
          <motion.div
            style={{ 
              scale: line3Scale,
              z: line3Z,
              rotateX: line3RotateX,
              rotateY: mousePos.x * 0.4,
              opacity: line3Opacity,
              transformStyle: "preserve-3d",
              boxShadow: "0 50px 100px rgba(0,0,0,0.5)"
            }}
            className="bg-[#fabf37] px-12 py-6 mb-6 relative group"
          >
             {/* Internal Scanning Glow */}
             <motion.div 
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
              />
            <h1 className="sr-only">Technical manifesto</h1>
            <p aria-hidden="true" className="text-6xl md:text-[180px] font-black uppercase tracking-tighter leading-none text-black relative z-10">
              TECHNICAL
            </p>
            {/* 3D Side Faces */}
            <div className="absolute top-0 right-full h-full w-4 bg-[#c4962b] origin-right skew-y-[10deg] rotate-y-[-90deg]" />
            <div className="absolute top-full left-0 w-full h-4 bg-[#8a6a1f] origin-top skew-x-[10deg] rotate-x-[-90deg]" />
          </motion.div>

          {/* LINE 4: MANIFESTO */}
          <motion.div
            style={{ 
              scale: line4Scale,
              z: line4Z,
              rotateX: line4RotateX,
              rotateY: mousePos.x * 0.6,
              opacity: line4Opacity,
              transformStyle: "preserve-3d",
              boxShadow: "0 80px 150px rgba(250,191,55,0.3)"
            }}
            className="bg-white px-16 py-8 relative group overflow-hidden"
          >
             {/* Internal Scanning Glow */}
             <motion.div 
                animate={{ x: ["100%", "-100%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12"
              />
            <p aria-hidden="true" className="text-6xl md:text-[200px] font-black uppercase tracking-tighter leading-none text-black italic relative z-10">
              MANIFESTO.
            </p>
            
            {/* 3D Side Faces for White Block */}
            <div className="absolute top-0 right-full h-full w-4 bg-zinc-300 origin-right skew-y-[10deg] rotate-y-[-90deg]" />
            <div className="absolute top-full left-0 w-full h-4 bg-zinc-400 origin-top skew-x-[10deg] rotate-x-[-90deg]" />

            <div className="absolute -top-10 -right-20 bg-black text-[#fabf37] border-2 border-[#fabf37] px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
              Dhaka
            </div>
          </motion.div>

          <StaggeredText 
            text="Access the engineering philosophy behind the world's most advanced paperware production ecosystem."
            className="max-w-2xl mx-auto text-zinc-400 font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs leading-relaxed px-4 pt-12 text-center"
          />
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#fabf37] to-transparent" />
          <span className="text-[8px] font-black uppercase tracking-[0.5em] text-zinc-600">INITIATE SEQUENCE</span>
        </motion.div>
      </section>

      {/* 2. THE STACK: HORIZONTAL PINNED SECTION */}
      <section className="relative h-[200vh]">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-24 items-center">
              <motion.div 
                style={{ rotateY: mousePos.x * 0.2, rotateX: -mousePos.y * 0.1, transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="space-y-12"
              >
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                    <StaggeredText text="THE" />
                    <span className="text-[#fabf37] block mt-2">
                       <StaggeredText text="TOPO-LOGY" />
                    </span>
                    <StaggeredText text="OF SCALE." className="mt-2" />
                  </h2>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 font-bold text-lg leading-relaxed max-w-xl"
                  >
                    Our production, quality and logistics teams work from one plan, from order to delivery.
                  </motion.p>
                </div>

              </motion.div>

              <div className="relative" style={{ transformStyle: "preserve-3d" }}>
                {/* 3D Visualizer Mockup with Mouse Parallax & Depth */}
                <motion.div 
                  style={{ 
                    rotateY: mousePos.x, 
                    rotateX: -mousePos.y,
                    transformStyle: "preserve-3d"
                  }}
                  className="bg-[#fabf37] aspect-square rounded-[80px] p-12 shadow-[0_50px_100px_-20px_rgba(250,191,55,0.3)] relative overflow-hidden group"
                >
                  {/* Floating Elements inside the 3D Cube */}
                  <motion.div 
                    style={{ translateZ: 100 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-40 border-4 border-black/20 rounded-full animate-ping"
                  />
                  
                  <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
                  
                  {/* Floating Circuits Effect */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" viewBox="0 0 100 100">
                      <path d="M0 20 H100 M0 40 H100 M0 60 H100 M0 80 H100" stroke="black" strokeWidth="0.1" fill="none" />
                      <path d="M20 0 V100 M40 0 V100 M60 0 V100 M80 0 V100" stroke="black" strokeWidth="0.1" fill="none" />
                    </svg>
                  </div>

                  <div className="relative z-10 flex flex-col justify-between h-full text-black">
                    <div className="flex justify-between items-start">
                      <Terminal className="size-10" />
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-40">System Node</p>
                        <p className="text-xl font-black">DAC-MAIN-01</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4" style={{ transform: "translateZ(50px)" }}>
                      <div className="h-[2px] w-full bg-black/10" />
                      <div className="flex items-center gap-4">
                        <Activity className="size-12 animate-pulse" />
                        <div className="space-y-1">
                          <p className="text-[10px] font-black uppercase opacity-40">Production</p>
                          <p className="text-4xl font-black italic">DHAKA</p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4" style={{ transform: "translateZ(30px)" }}>
                      {[1,2,3].map(i => (
                        <div key={i} className="h-24 bg-black/5 rounded-2xl border border-black/10 flex items-center justify-center">
                          <Cpu className="size-6 opacity-20" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Digital Aura */}
                  <div className="absolute -top-20 -right-20 size-80 bg-white/20 blur-[100px] rounded-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES: 3D CARDS */}
      <section className="py-40 container mx-auto px-4 relative z-10">
        <div className="text-center mb-32 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-9xl font-black uppercase tracking-tighter"
          >
            CORE <span className="text-zinc-500">PILLARS.</span>
          </motion.h2>
          <p className="text-[#fabf37] font-black uppercase tracking-[0.5em] text-[10px]">The DNA of Our Innovation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((val, i) => (
            <ManifestoCard key={i} {...val} index={i} />
          ))}
        </div>
      </section>


      {/* 5. CTA: JOIN THE ECOSYSTEM */}
      <section className="py-40 container mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <h2 className="text-6xl md:text-[120px] font-black uppercase tracking-tighter leading-none">
            ENGINEER <br />THE <span className="text-[#fabf37]">FUTURE.</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-lg md:text-xl leading-relaxed">
            Ready to integrate with a supply chain that thinks for itself? Join the Paperware ecosystem today.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 pt-8">
             <button className="bg-[#fabf37] text-black px-16 py-8 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-2xl">
                Partner Integration
             </button>
             <button className="bg-white/5 border border-white/10 text-white px-16 py-8 rounded-full font-black uppercase tracking-[0.2em] text-sm hover:bg-white/10 transition-all">
                Contact Technical Hub
             </button>
          </div>
        </motion.div>
      </section>

      {/* Footer Meta */}
      <footer className="py-20 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8 opacity-30">
           <div className="flex items-center gap-4">
              <Code className="size-5" />
              <p className="text-[10px] font-black uppercase tracking-widest">Paperware Technical Standard v5.0.0</p>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest">© 2025 Paperware OS. All Protocols Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function ManifestoCard({ title, icon, desc, stats, index }: any) {
  const cardRef = React.useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });
  const [cardMousePos, setCardMousePos] = React.useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleCardMouseMove}
      onMouseLeave={() => setCardMousePos({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 50, rotateY: 30, translateZ: -100 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0, translateZ: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        translateZ: 100,
        boxShadow: "0 50px 100px -20px rgba(250,191,55,0.2)"
      }}
      style={{ 
        transformStyle: "preserve-3d", 
        perspective: "1000px",
        rotateY: cardMousePos.x * 30,
        rotateX: -cardMousePos.y * 30
      }}
      className="bg-zinc-900 border border-white/5 rounded-[48px] p-10 space-y-12 group cursor-default relative overflow-hidden"
    >
      {/* Dynamic 3D Glow */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${50 + cardMousePos.x * 100}% ${50 + cardMousePos.y * 100}%, rgba(250,191,55,0.15), transparent 70%)`
        }}
      />

      <div 
        className="size-16 rounded-[24px] bg-white/5 border border-white/10 flex items-center justify-center text-[#fabf37] group-hover:bg-[#fabf37] group-hover:text-black transition-all duration-500"
        style={{ transform: "translateZ(40px)" }}
      >
        {React.cloneElement(icon as React.ReactElement, { className: "size-8" })}
      </div>
      
      <div className="space-y-4" style={{ transform: "translateZ(60px)" }}>
        <h4 className="text-2xl font-black uppercase tracking-tight">{title}</h4>
        <div className="h-1 w-12 bg-[#fabf37] group-hover:w-24 transition-all" />
        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/5" style={{ transform: "translateZ(30px)" }}>
        <p className="text-[10px] font-black uppercase text-[#fabf37]">{stats}</p>
        <div className="size-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-600 group-hover:text-white">
          <ArrowRight className="size-4" />
        </div>
      </div>
    </motion.div>
  );
}

function BrainCircuit() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.105 4 4 0 0 0 8 0 4 4 0 0 0 .52-8.105 4 4 0 0 0-2.517-5.77A3 3 0 0 0 12 5Z"/>
      <path d="M9 13v1"/>
      <path d="M12 13v1"/>
      <path d="M15 13v1"/>
      <path d="M12 11V7"/>
    </svg>
  );
}

function ArrowRight(props: any) {
  return (
    <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14m-7-7 7 7-7 7"/>
    </svg>
  );
}