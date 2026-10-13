import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { 
  ShieldCheck, Award, FileCheck, Globe, TrendingUp, Zap, Box, 
  Droplets, Leaf, Truck, Calendar, ArrowRight, Download, Users,
  CircleCheck as CheckCircle2, Lock, Scale, Target
} from "lucide-react";

const certs = [
  { 
    title: "Factory License", 
    desc: "Government of Bangladesh approved manufacturing operations license.", 
    status: "ACTIVE",
    year: "2024",
    icon: ShieldCheck,
    highlight: true,
    source: "Direct"
  },
  { 
    title: "Fire Safety License", 
    desc: "Comprehensive industrial fire safety and evacuation compliance certification.", 
    status: "ACTIVE",
    year: "2024",
    icon: FileCheck,
    highlight: true,
    source: "Direct"
  },
  { 
    title: "ISO 9001:2015", 
    desc: "Our strategic raw material suppliers maintain strict international quality management standards.", 
    status: "SUPPLIER COMPLIANT",
    year: "Active Chain",
    icon: Award,
    highlight: false,
    source: "Supply Chain"
  },
  { 
    title: "FSC Certified", 
    desc: "100% of our paper and pulp are sourced from FSC certified responsible managed forests.", 
    status: "CERTIFIED SOURCING",
    year: "Active Chain",
    icon: Globe,
    highlight: false,
    source: "Supply Chain"
  },
  { 
    title: "Carbon Neutral", 
    desc: "Partnering with net-zero suppliers to ensure eco-friendly material production.", 
    status: "ECO-PARTNERED",
    year: "Target 2030",
    icon: TrendingUp,
    highlight: false,
    source: "Vision"
  },
  { 
    title: "Eco-Ink Standard", 
    desc: "Use of soy-based and non-toxic industrial inks for food-grade packaging safety.", 
    status: "ACTIVE",
    year: "2024",
    icon: Droplets,
    highlight: false,
    source: "Material"
  },
  { 
    title: "Recyclability", 
    desc: "100% repulpable and biodegradable material verification for all paperware.", 
    status: "CERTIFIED",
    year: "2024",
    icon: Box,
    highlight: false,
    source: "Product"
  },
  { 
    title: "Global Export Hub", 
    desc: "Integrating international logistics standards within our supply chain for global export.", 
    status: "HUB VISION",
    year: "Target 2030",
    icon: Zap,
    highlight: false,
    source: "Strategic"
  }
];

const roadmap = [
  { year: "2024", task: "Direct Factory & Fire Safety Licensing", status: "Completed" },
  { year: "2025", task: "ISO 14001: Environmental Management Systems", status: "Planned" },
  { year: "2027", task: "Full BRCGS Global Standard for Packaging Materials", status: "Strategic" },
  { year: "2030", task: "Carbon Neutral Net-Zero Manufacturing Facility", status: "Vision" },
];

const stats = [
  { label: "Plastic Replaced", value: "500+", unit: "Tons", icon: Leaf },
  { label: "Sourced Sustainably", value: "100", unit: "%", icon: Globe },
  { label: "Safety Audits", value: "24/7", unit: "Monitoring", icon: ShieldCheck },
  { label: "Happy Partners", value: "150+", unit: "Global", icon: Users },
];

function TiltCard({ cert, i }: { cert: any, i: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 20 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: i * 0.1, duration: 0.8 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ z: 100, scale: 1.02 }}
      className={`relative overflow-hidden p-8 md:p-12 rounded-[40px] md:rounded-[50px] border-2 transition-all group perspective-1000 ${
        cert.highlight 
        ? "bg-black border-black shadow-[0_50px_100px_rgba(0,0,0,0.3)]" 
        : "bg-white border-zinc-100 shadow-xl"
      }`}
    >
      {/* 3D Depth Elements */}
      <div style={{ transform: "translateZ(100px)" }} className="relative z-10 space-y-8">
        {/* Background Glow for Active Items */}
        {cert.highlight && (
          <div className="absolute -top-24 -right-24 size-64 bg-[#fabf37]/10 rounded-full blur-3xl group-hover:bg-[#fabf37]/20 transition-all" />
        )}

        <div className="flex items-start justify-between">
          <div className={`size-16 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${
            cert.highlight ? "bg-[#fabf37] text-black" : "bg-zinc-100 text-zinc-400"
          }`}>
            <cert.icon className="size-8" />
          </div>
          <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${
            cert.highlight ? "bg-white/10 text-[#fabf37]" : "bg-zinc-100 text-zinc-400"
          }`}>
            {cert.status}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight leading-none ${
            cert.highlight ? "text-white" : "text-black"
          }`}>
            {cert.title}
          </h3>
          <p className={`font-bold text-sm leading-relaxed ${
            cert.highlight ? "text-zinc-400" : "text-zinc-500"
          }`}>
            {cert.desc}
          </p>
        </div>

        <div className={`pt-6 border-t flex items-center justify-between ${
          cert.highlight ? "border-white/10" : "border-zinc-100"
        }`}>
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${
            cert.highlight ? "text-[#fabf37]" : "text-zinc-500"
          }`}>{cert.source}</span>
          <span className={`text-xs font-black ${
            cert.highlight ? "text-white" : "text-zinc-400"
          }`}>{cert.year}</span>
        </div>
      </div>
      
      {/* Hover Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}

export function CompliancePage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Scroll-based Parallax for background elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const zScroll = useTransform(scrollYProgress, [0, 1], [0, 500]); // Move elements forward as we scroll
  
  const opacityHeader = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scaleHeader = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  // Mouse tracking for global 3D parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const bgX = useTransform(mouseX, [-0.5, 0.5], ["-60px", "60px"]);
  const bgY = useTransform(mouseY, [-0.5, 0.5], ["-60px", "60px"]);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  // Floating Particles Data
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    z: Math.random() * 400 - 200,
    duration: Math.random() * 10 + 10
  }));

  return (
    <div ref={containerRef} className="relative bg-white min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden pt-32 md:pt-40">
      {/* Scroll Progress */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[#fabf37] origin-left z-[1001]" />

      {/* Extreme 3D Floating Particles Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            style={{ 
              top: p.top, 
              left: p.left, 
              translateZ: p.z,
              x: useTransform(mouseX, [-0.5, 0.5], [p.z / 2, -p.z / 2]),
              y: useTransform(mouseY, [-0.5, 0.5], [p.z / 2, -p.z / 2]),
            }}
            animate={{ 
              rotateX: 360, 
              rotateY: 360,
              y: [0, -20, 0]
            }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "linear" }}
            className="absolute size-4 bg-black/5 border border-black/10 rounded-sm"
          />
        ))}
      </div>

      {/* Extreme 3D Floating & Scroll Parallax Industrial Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        <motion.div 
          style={{ x: bgX, y: y1, rotateX, rotateY, translateZ: 500 }}
          className="absolute top-[5%] left-[10%] opacity-[0.12]"
        >
          <Award className="size-[500px] text-black drop-shadow-[40px_80px_100px_rgba(0,0,0,0.2)]" />
        </motion.div>
        <motion.div 
          style={{ 
            x: useTransform(mouseX, [-0.5, 0.5], ["150px", "-150px"]), 
            y: y2, 
            translateZ: -300,
            rotateZ: 25
          }}
          className="absolute bottom-[10%] right-[5%] opacity-[0.08]"
        >
          <ShieldCheck className="size-[900px] text-black drop-shadow-2xl" />
        </motion.div>
        <motion.div 
          style={{ 
            x: useTransform(mouseX, [-0.5, 0.5], ["-120px", "120px"]), 
            y: y3, 
            translateZ: 400,
            rotate: -45 
          }}
          className="absolute top-[40%] left-[-5%] opacity-[0.06]"
        >
          <Zap className="size-[400px] text-[#fabf37]" />
        </motion.div>
        
        {/* 3D Deep Grid Overlay */}
        <motion.div 
          style={{ 
            rotateX, 
            rotateY, 
            translateZ: -500, 
            y: useTransform(scrollYProgress, [0, 1], [0, -300]),
            scale: 2
          }}
          className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_2px,transparent_2px),linear-gradient(to_bottom,#000_2px,transparent_2px)] bg-[size:150px_150px]" 
        />
      </div>

      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          translateZ: zScroll,
          transformStyle: "preserve-3d" 
        }}
        className="container mx-auto px-4 max-w-7xl relative z-10"
      >
        {/* Extreme 3D Header with Multi-Layer Shadow */}
        <motion.div 
          style={{ 
            opacity: opacityHeader, 
            scale: scaleHeader, 
            transform: "translateZ(250px)",
            transformStyle: "preserve-3d"
          }}
          className="text-center mb-48 space-y-16"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ transform: "translateZ(50px)" }}
            className="inline-flex items-center gap-2 bg-[#fabf37] text-black px-8 py-3 rounded-full text-[12px] font-black uppercase tracking-[0.3em] mb-4 shadow-[0_25px_50px_-12px_rgba(250,191,55,0.5)]"
          >
            <ShieldCheck className="size-4" /> Industrial Integrity
          </motion.div>
          
          <div className="space-y-4">
            <h1 className="text-[52px] md:text-[96px] font-black uppercase tracking-tighter leading-[0.85] text-black">
              <motion.span 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="block"
              >
                Global <span className="text-zinc-300 italic">Standards</span>
              </motion.span>
              <motion.span 
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="text-[#fabf37] block"
              >
                Zero Compromise
              </motion.span>
            </h1>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "120px" }}
              className="h-1 bg-black mx-auto mt-8 rounded-full" 
            />
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-zinc-500 font-bold max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Integrating international quality frameworks, ethical sourcing, and environmental sustainability into every fiber of our manufacturing process.
          </motion.p>
        </motion.div>

        {/* Dynamic Stats Grid with Extreme Floating & Depth */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32" style={{ transformStyle: "preserve-3d" }}>
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 100, translateZ: -100 }}
              whileInView={{ opacity: 1, y: 0, translateZ: 0 }}
              transition={{ delay: i * 0.1, duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -20, 
                scale: 1.05,
                rotateX: 8,
                rotateY: 8,
              }}
              className="bg-white p-10 rounded-[48px] border border-zinc-100 flex flex-col items-center text-center space-y-8 group transition-all duration-700 shadow-2xl relative overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] hover:bg-zinc-50"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div 
                style={{ transform: "translateZ(40px)" }}
                className="size-20 rounded-[32px] bg-zinc-50 flex items-center justify-center text-black group-hover:bg-[#fabf37] group-hover:rotate-12 transition-all duration-700 shadow-xl"
              >
                <stat.icon className="size-7" />
              </div>
              <div className="space-y-3" style={{ transform: "translateZ(20px)" }}>
                <div className="text-xl md:text-2xl font-black text-black group-hover:text-[#fabf37] transition-colors leading-none tracking-tighter">
                  {stat.value}<span className="text-[#fabf37] group-hover:text-black">{stat.unit}</span>
                </div>
                <div className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-500 group-hover:text-zinc-700 transition-colors">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificate Grid with Enhanced Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-40">
          {certs.map((cert, i) => (
            <TiltCard key={i} cert={cert} i={i} />
          ))}
        </div>

        {/* Visual Pillars Section with Extreme 3D Flip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-56" style={{ transformStyle: "preserve-3d" }}>
          {[
            { title: "Ethical Sourcing", icon: Leaf, desc: "Materials verified for sustainable forestry and zero child-labor policy.", color: "bg-emerald-50 text-emerald-600" },
            { title: "Quality Control", icon: Scale, desc: "12-point inspection rig for every batch produced in our facility.", color: "bg-blue-50 text-blue-600" },
            { title: "Legal Safety", icon: Lock, desc: "Full compliance with BRCGS and ISO international safety protocols.", color: "bg-zinc-900 text-[#fabf37]" }
          ].map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 200, rotateX: 90 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ z: 80, rotateY: 5 }}
              className={`p-16 rounded-[70px] space-y-8 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] ${pillar.color}`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                whileInView={{ scale: [0.8, 1.4, 1], rotate: [0, 20, 0], translateZ: 50 }}
                transition={{ duration: 1, delay: 0.6 + (i * 0.1) }}
              >
                <pillar.icon className="size-16" />
              </motion.div>
              <div className="space-y-6" style={{ transform: "translateZ(60px)" }}>
                <h4 className="text-3xl font-black uppercase tracking-tight">{pillar.title}</h4>
                <p className="font-bold text-base leading-relaxed opacity-80">{pillar.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Roadmap with Multi-Layer 3D and Scroll Sync */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotateX: 4, rotateY: -4, z: 20 }}
          className="bg-black rounded-[80px] p-10 md:p-32 overflow-hidden relative group/roadmap shadow-[0_60px_120px_-30px_rgba(0,0,0,0.6)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#fabf3715,transparent)]" />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
              rotate: [0, 90, 0]
            }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute -bottom-60 -left-60 size-[800px] bg-[#fabf37]/10 rounded-full blur-[150px]" 
          />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12" style={{ transform: "translateZ(120px)" }}>
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 text-[#fabf37] text-[10px] font-black uppercase tracking-[0.4em]"
              >
                <Target className="size-5" /> Strategic Objectives
              </motion.div>
              <h2 className="text-6xl md:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter">
                Future <br /> <span className="text-[#fabf37] italic">Ready</span> <br /> Facility
              </h2>
              <p className="text-zinc-400 font-bold text-lg md:text-xl max-w-md leading-relaxed">
                By 2030, Paperware aims to set the global benchmark for zero-waste industrial manufacturing in the South Asian region.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-black px-10 py-6 rounded-full font-black uppercase tracking-widest flex items-center gap-3 group/btn"
              >
                Download Sustainability Report 2024
                <Download className="size-5 group-hover/btn:translate-y-1 transition-transform" />
              </motion.button>
            </div>

            <div className="space-y-6 relative">
              {/* Vertical Connector Line */}
              <div className="absolute left-12 top-10 bottom-10 w-px bg-white/10 hidden md:block" />
              
              {roadmap.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-8 p-8 rounded-[40px] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#fabf37]/30 transition-all cursor-default"
                >
                  <div className="relative z-10 size-10 md:size-24 rounded-full bg-black border border-white/20 flex items-center justify-center text-[#fabf37] font-black text-2xl group-hover:border-[#fabf37] transition-colors shrink-0">
                    {item.year.slice(2)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="text-white font-black text-xl md:text-2xl leading-none group-hover:text-[#fabf37] transition-colors uppercase tracking-tight">
                      {item.task}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[#fabf37]" />
                      <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                        Status: {item.status}
                      </div>
                    </div>
                  </div>
                  <div className="size-12 rounded-2xl border border-white/10 flex items-center justify-center text-white/30 group-hover:text-[#fabf37] group-hover:scale-110 transition-all">
                    <CheckCircle2 className="size-6" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}