import React from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValue, animate } from "motion/react";
import { 
  Briefcase, MapPin, ArrowRight, Zap, Star, Users, Award, 
  Search, Filter, CircleCheck, MessageSquare, Rocket, Globe, 
  Cpu, Lightbulb, ShieldCheck, UserCheck,
  Target, Heart, Leaf, Shield, Quote, ChevronDown, Plus, Minus,
  Factory, Cog, Recycle, Truck, Settings, GraduationCap, Clock,
  Activity, ChartBar, Binary, Wrench
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

import pkgShowcase from "figma:asset/f941795c19ecf31f77a6d084830e22f2ef6ea6c7.webp";

const jobs = [
  { title: "Factory Supervisor", location: "Dhaka, BD", type: "Full-time" },
  { title: "Graphic Designer", location: "Remote / Dhaka", type: "Full-time" },
  { title: "Production Operator", location: "Dhaka, BD", type: "Shift-based" },
];

const values = [
  { 
    title: "Innovation", 
    desc: "We push the boundaries of paper manufacturing with AI & IoT.", 
    icon: Lightbulb,
    color: "bg-blue-500/10 text-blue-500"
  },
  { 
    title: "Sustainability", 
    desc: "Biodegradable solutions for a greener tomorrow.", 
    icon: Leaf,
    color: "bg-green-500/10 text-green-500"
  },
  { 
    title: "Integrity", 
    desc: "Transparency and ethical production in every layer.", 
    icon: Shield,
    color: "bg-purple-500/10 text-purple-500"
  },
  { 
    title: "Excellence", 
    desc: "Premium quality that sets industrial benchmarks.", 
    icon: Target,
    color: "bg-[#fabf37]/10 text-[#fabf37]"
  },
];

const benefits = [
  { title: "Health & Wellness", desc: "Comprehensive insurance and wellness programs for all family members.", icon: Heart },
  { title: "Skill Up", desc: "Access to global certifications and industrial training workshops.", icon: GraduationCap },
  { title: "Eco-Bonus", desc: "Special rewards for contributing to our zero-waste factory goals.", icon: Recycle },
  { title: "Modern Tools", desc: "Work with the latest ERP, AI, and automated industrial machinery.", icon: Cpu },
  { title: "Flexible Shifts", desc: "Optimized shift timing for better work-life balance.", icon: Clock },
  { title: "Free Commute", desc: "Complimentary shuttle service from key points in Dhaka.", icon: Truck },
];

const stats = [
  { label: "Innovators", value: "250+", icon: Users },
  { label: "Tech Stack", value: "Modern", icon: Cpu },
  { label: "Growth", value: "40%", icon: Zap },
  { label: "Global Reach", value: "12+", icon: Globe },
];

const steps = [
  { title: "Application", desc: "Submit your profile through our portal", icon: MessageSquare },
  { title: "Review", desc: "Our team evaluates your technical skills", icon: Search },
  { title: "Interview", desc: "Engage with our industrial experts", icon: UserCheck },
  { title: "Onboarding", desc: "Join the paperware ecosystem", icon: Rocket },
];

const lifeImages = [
  "https://images.unsplash.com/photo-1602318492327-0383f002fa0a?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdXN0YWluYWJsZSUyMGZhY3RvcnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjY1NDUyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1646579886741-12b59840c63f?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwZW5naW5lZXJpbmclMjB0ZWFtJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY2NTQ1MjM1fDA&q=75&w=1600",
  "https://images.unsplash.com/photo-1672552226669-f6c3041972ea?auto=format&crop=entropy&cs=tinysrgb&fit=max&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0ZWQlMjB3YXJlaG91c2UlMjBsb2dpc3RpY3MlMjBwYWNrYWdpbmd8ZW58MXx8fHwxNzY2NTQ1MjM3fDA&q=75&w=1600"
];

const testimonials = [
  {
    name: "Ayesha Rahman",
    role: "Production Lead",
    quote: "Working at Paperware isn't just a job; it's a mission to redefine how Bangladesh exports sustainable goods.",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    name: "Tanvir Ahmed",
    role: "Senior Engineer",
    quote: "The level of automation here is world-class. It's a playground for engineers who love industrial tech.",
    img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  }
];

const faqs = [
  { q: "What is the typical interview process?", a: "It usually involves a screening call, a technical task, and a final interview with the leadership team." },
  { q: "Do you offer remote work options?", a: "While production roles are on-site, many of our creative and administrative roles support a hybrid model." },
  { q: "Are there growth opportunities?", a: "Yes, we have a clear internal promotion path and sponsored certifications for all departments." }
];

const departments = ["All", "Engineering", "Production", "Design", "Logistics", "Management"];

const technologies = [
  "Industry 4.0", "AI Integration", "Smart Logistics", 
  "Robotic Automation", "Eco-Engineering", "Data Analytics", 
  "Sustainable Materials", "Cloud ERP", "IoT Sensors"
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

function Thick3DCard({ children, className = "", depth = 40 }: { children: React.ReactNode, className?: string, depth?: number }) {
  return (
    <motion.div
      whileHover={{ 
        rotateX: -15, 
        rotateY: 15,
        translateZ: depth,
        scale: 1.02
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      className={`relative group ${className}`}
    >
      {/* Front Face */}
      <div className="relative z-20 h-full w-full" style={{ transform: "translateZ(30px)" }}>
        {children}
      </div>
      {/* Side Faces (Fake 3D Depth) */}
      <div className="absolute inset-0 bg-zinc-200 rounded-[inherit] z-10 origin-right" style={{ transform: "rotateY(-90deg) translateZ(-1px) scaleX(0.15)" }} />
      <div className="absolute inset-0 bg-zinc-300 rounded-[inherit] z-10 origin-bottom" style={{ transform: "rotateX(90deg) translateZ(-1px) scaleY(0.15)" }} />
      {/* Shadow */}
      <div className="absolute inset-0 bg-black/10 rounded-[inherit] -z-10 blur-2xl group-hover:bg-black/20 transition-colors" style={{ transform: "translateZ(-40px) scale(0.95)" }} />
    </motion.div>
  );
}

function PerspectiveJobCard({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);
  const translateZ = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <motion.div
      style={{
        rotateX,
        translateZ,
        transformStyle: "preserve-3d",
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}

function FloatingGallery({ images }: { images: string[] }) {
  return (
    <div className="relative h-[600px] w-full flex items-center justify-center perspective-2000 py-20">
      {images.map((img, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, rotateY: 45, x: i * 100 }}
          whileInView={{ opacity: 1, rotateY: -25, x: (i - 1) * 250 }}
          whileHover={{ 
            rotateY: 0, 
            z: 200, 
            scale: 1.1,
            zIndex: 50,
            boxShadow: "0 50px 100px rgba(0,0,0,0.3)" 
          }}
          transition={{ type: "spring", stiffness: 100 }}
          className="absolute w-[300px] h-[450px] rounded-[40px] overflow-hidden border-8 border-white shadow-2xl cursor-pointer"
          style={{ transformStyle: "preserve-3d" }}
        >
          <ImageWithFallback src={img} alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-8">
            <span className="text-white font-black uppercase text-xs tracking-widest">Workspace View 0{i+1}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <div className="relative inline-block group">
      <span className="relative z-10">{text}</span>
      <motion.span
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5, x: -2, y: 2 }}
        className="absolute inset-0 text-[#fabf37] z-0 translate-x-[2px] -translate-y-[2px] select-none pointer-events-none"
      >
        {text}
      </motion.span>
      <motion.span
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.5, x: 2, y: -2 }}
        className="absolute inset-0 text-cyan-400 z-0 -translate-x-[2px] translate-y-[2px] select-none pointer-events-none"
      >
        {text}
      </motion.span>
    </div>
  );
}

function Counter({ value, duration = 2 }: { value: string, duration?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayValue = useTransform(rounded, (latest) => {
    const isPlus = value.includes("+");
    const isPercent = value.includes("%");
    const num = value.replace(/[^0-9]/g, "");
    return `${latest}${isPercent ? "%" : ""}${isPlus ? "+" : ""}`;
  });

  const numericValue = parseInt(value.replace(/[^0-9]/g, ""));

  React.useEffect(() => {
    if (Number.isNaN(numericValue)) return;
    const animation = animate(count, numericValue, { duration, ease: "easeOut" });
    return animation.stop;
  }, [numericValue]);

  // Non-numeric values (e.g. "Modern") were rendered as "NaN"; show them as plain text.
  if (Number.isNaN(numericValue)) return <span>{value}</span>;
  return <motion.span>{displayValue}</motion.span>;
}

const ParticleBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0,
            scale: 0
          }}
          animate={{ 
            y: [null, "-120%"],
            opacity: [0, 0.3, 0],
            scale: [0, 1, 0.5],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 5
          }}
          className="absolute [will-change:transform,opacity]"
        >
          {i % 3 === 0 ? (
            <Binary className="size-4 text-[#fabf37]" />
          ) : i % 3 === 1 ? (
            <Settings className="size-3 text-black/20" />
          ) : (
            <div className="size-1 bg-[#fabf37] rounded-full" />
          )}
        </motion.div>
      ))}
    </div>
  );
});

const LiveProductionGraph = React.memo(() => {
  return (
    <div className="bg-black/90 p-6 rounded-3xl border border-[#fabf37]/20 space-y-4 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="size-4 text-[#fabf37] animate-pulse" />
          <span className="text-[#fabf37] font-black uppercase text-[10px] tracking-widest">Efficiency Metrics</span>
        </div>
        <span className="text-zinc-500 font-mono text-[10px]">REAL-TIME</span>
      </div>
      <div className="flex items-end gap-1 h-12">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ height: "20%" }}
            animate={{ height: [`${Math.random() * 50 + 20}%`, `${Math.random() * 80 + 20}%`, `${Math.random() * 30 + 20}%`] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className="flex-1 bg-gradient-to-t from-[#fabf37]/10 to-[#fabf37] rounded-full"
          />
        ))}
      </div>
    </div>
  );
});

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  React.useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 size-8 border-2 border-[#fabf37] rounded-full pointer-events-none z-[9999] flex items-center justify-center mix-blend-difference hidden md:flex"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div className="size-1.5 bg-[#fabf37] rounded-full" />
    </motion.div>
  );
}

function LiveFactoryFeed() {
  const events = [
    "Batch #829: Sustainable Kraft Paper processing...",
    "Automation System: Efficiency at 98.4%",
    "Logistics: Dispatching to Port of Chittagong",
    "Energy: Solar Grid contributing 35% load",
    "Eco-Filter: Carbon captured - 12.4kg"
  ];
  
  return (
    <div className="fixed bottom-8 left-8 z-[100] hidden lg:block">
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="bg-black/90 backdrop-blur-xl border border-[#fabf37]/20 p-4 rounded-2xl w-72 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="size-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[#fabf37] font-black uppercase text-[10px] tracking-widest">Live Automation Feed</span>
        </div>
        <div className="space-y-2 h-20 overflow-hidden relative">
          <motion.div
            animate={{ y: [0, -120] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="space-y-3"
          >
            {[...events, ...events].map((e, i) => (
              <p key={i} className="text-zinc-500 font-mono text-[9px] leading-tight">
                {`> ${e}`}
              </p>
            ))}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-transparent to-black pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}

function Marquee({ items }: { items: string[] }) {
  return (
    <div className="relative flex overflow-x-hidden border-y border-black/5 bg-white/50 backdrop-blur-sm py-8 mb-32">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-16 items-center pr-16"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-6" aria-hidden={i >= items.length ? true : undefined}>
            <span className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-black/50 hover:text-[#fabf37] transition-colors cursor-default">
              {item}
            </span>
            <div className="size-2 bg-[#fabf37] rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function SmoothTiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative transition-colors duration-500 ${className}`}
    >
      <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
      {/* 3D Depth Layer */}
      <div 
        className="absolute inset-0 bg-black/5 rounded-[inherit] -z-10" 
        style={{ transform: "translateZ(-20px)" }} 
      />
    </motion.div>
  );
}

function ThreeDCard({ children, className = "", depth = 60 }: { children: React.ReactNode, className?: string, depth?: number }) {
  return (
    <motion.div
      whileHover={{ 
        rotateX: -15, 
        rotateY: 15,
        z: depth,
        scale: 1.05,
        boxShadow: "30px 30px 60px rgba(0,0,0,0.15), -10px -10px 40px rgba(255,255,255,0.5)"
      }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
      className={`relative ${className}`}
    >
      <div className="relative h-full w-full" style={{ transform: `translateZ(${depth}px)` }}>
        {children}
      </div>
      {/* 3D Glass Layer Background */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] rounded-[inherit] -z-10" style={{ transform: "translateZ(-20px)" }} />
    </motion.div>
  );
}

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = clientX - centerX;
    const y = clientY - centerY;
    setPosition({ x: x * 0.4, y: y * 0.4 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

function TextReveal({ text, className = "" }: { text: string, className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-[0.1em]">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.1, 
              ease: [0.16, 1, 0.3, 1] 
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function FloatingIndustrial3D() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-2000">
      <motion.div 
        animate={{ 
          y: [0, -60, 0],
          rotateZ: [0, 360],
          rotateX: [20, -20, 20],
          rotateY: [10, -10, 10],
          z: [0, 50, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-[10%] left-[5%] opacity-[0.1] [will-change:transform]"
      >
        <Cog className="size-64 text-black drop-shadow-[20px_20px_20px_rgba(0,0,0,0.2)]" />
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 80, 0],
          rotateY: [0, 360, 0],
          rotateX: [0, 60, 0],
          z: [-50, 150, -50],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[40%] right-[-5%] opacity-[0.1] [will-change:transform]"
      >
        <Factory className="size-80 text-[#fabf37] drop-shadow-[20px_20px_20px_rgba(0,0,0,0.2)]" />
      </motion.div>

      <motion.div 
        animate={{ 
          scale: [0.7, 1.3, 0.7],
          rotateX: [-30, 30, -30],
          rotateY: [-20, 20, -20],
          y: [0, -50, 0],
          z: [100, -100, 100]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[5%] left-[10%] opacity-[0.08] [will-change:transform]"
      >
        <Recycle className="size-72 text-black drop-shadow-[20px_20px_20px_rgba(0,0,0,0.2)]" />
      </motion.div>

      <motion.div 
        animate={{ 
          rotateX: [0, 360],
          z: [-100, 100, -100]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute top-[70%] right-[15%] opacity-[0.05] [will-change:transform]"
      >
        <Settings className="size-40 text-[#fabf37]" />
      </motion.div>
    </div>
  );
}

function DepartmentExplorer() {
  const [hovered, setHovered] = React.useState<number | null>(null);
  const depts = [
    { name: "Automation", icon: Settings, count: 4, desc: "Building the brains of our factory." },
    { name: "Eco-Design", icon: Leaf, count: 2, desc: "Designing low-waste products." },
    { name: "Logistics", icon: Truck, count: 6, desc: "Smart routing and global delivery." },
    { name: "Operations", icon: Binary, count: 3, desc: "Maintenance and production data." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-32">
      {depts.map((d, i) => (
        <motion.div
          key={i}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          className="relative h-[300px] rounded-[40px] overflow-hidden bg-black group cursor-pointer"
        >
          <motion.div 
            animate={{ 
              scale: hovered === i ? 1.1 : 1,
              opacity: hovered === i ? 0.3 : 0.1
            }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <d.icon className="size-48 text-white" />
          </motion.div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end gap-2">
            <span className="text-[#fabf37] font-black text-xs uppercase tracking-[0.3em]">{d.count} Openings</span>
            <h3 className="text-white text-2xl font-black uppercase tracking-tight">{d.name}</h3>
            <motion.p 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: hovered === i ? 'auto' : 0, opacity: hovered === i ? 1 : 0 }}
              className="text-zinc-400 text-xs font-medium leading-relaxed"
            >
              {d.desc}
            </motion.p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function ReferralSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className="bg-zinc-900 rounded-[60px] p-12 md:p-20 mb-32 border border-white/5 relative overflow-hidden group"
    >
      <div className="absolute -right-20 -top-20 size-80 bg-[#fabf37]/10 blur-[100px] rounded-full group-hover:bg-[#fabf37]/20 transition-colors" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
        <div className="space-y-6 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 text-[#fabf37] text-[10px] font-black uppercase tracking-widest border border-white/10">
            <Star className="size-3 fill-current" />
            Elite Referral Program
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white">
            BRING A FELLOW <br /> <span className="text-[#fabf37]">INNOVATOR</span>
          </h2>
          <p className="text-zinc-500 max-w-md font-medium">
            Know someone who fits our industrial excellence? Refer them and get exclusive benefits plus a signing bonus.
          </p>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-auto">
          <Magnetic>
            <button className="bg-[#fabf37] text-black px-12 py-6 rounded-[24px] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all w-full shadow-[0_20px_40px_rgba(250,191,55,0.2)]">
              Refer Now
            </button>
          </Magnetic>
          <p className="text-zinc-600 text-[10px] uppercase font-black tracking-[0.2em] text-center">T&C Apply • Verified Professionals Only</p>
        </div>
      </div>
    </motion.div>
  );
}

export function CareerPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [activeDept, setActiveDept] = React.useState("All");
  const [openFaq, setOpenFaq] = React.useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const imageScale = useTransform(scrollYProgress, [0.6, 0.9], [1, 1.2]);

  return (
    <div ref={containerRef} className="relative bg-zinc-50 min-h-screen text-zinc-900 font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden pt-32 md:pt-40">
      <CustomCursor />
      
      <ParticleBackground />
      
      {/* Scroll Progress Bar */}
      <motion.div 
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1.5 bg-[#fabf37] origin-left z-[100] shadow-[0_0_15px_rgba(250,191,55,0.5)]"
      />

      <FloatingIndustrial3D />
      
      {/* Dynamic Background Grid & Noise */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px" 
        }} 
      />
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Hero Section */}
        <div className="mb-24 space-y-12">
          <div className="overflow-hidden py-6 border-y border-zinc-200 bg-white/30 backdrop-blur-sm">
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: "-100%" }}
              transition={{ 
                x: { duration: 30, repeat: Infinity, ease: "linear" }
              }}
              className="flex whitespace-nowrap gap-8 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-black/50"
            >
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex gap-8 items-center" aria-hidden={i > 1 ? true : undefined}>
                  <span>Future of Manufacturing</span>
                  <div className="size-1 bg-[#fabf37] rounded-full" />
                  <span>Sustainable Packaging Leaders</span>
                  <div className="size-1 bg-[#fabf37] rounded-full" />
                  <span>Dhaka Industrial Excellence</span>
                  <div className="size-1 bg-[#fabf37] rounded-full" />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="text-center space-y-10 px-4">
            <Magnetic>
              <motion.div
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
                className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black text-[#fabf37] text-[10px] md:text-xs font-black uppercase tracking-widest shadow-2xl"
              >
                <div className="size-2 rounded-full bg-[#fabf37] animate-ping" />
                Now Hiring
              </motion.div>
            </Magnetic>
            
            <h1 className="text-[36px] sm:text-[48px] md:text-[86px] lg:text-[100px] font-black uppercase tracking-tighter leading-[0.85] text-black perspective-2000 break-words"><span className="sr-only">Build your career in manufacturing</span><span aria-hidden="true">
              <TextReveal text="Build Your" /> <br />
              <motion.span 
                initial={{ x: -100, opacity: 0, rotateY: -90, translateZ: 100 }}
                animate={{ x: 0, opacity: 1, rotateY: 0, translateZ: 0 }}
                transition={{ delay: 0.8, duration: 1, type: "spring" }}
                className="bg-[#fabf37] px-4 sm:px-6 md:px-10 inline-block -skew-x-6 shadow-[8px_8px_0_rgba(0,0,0,1)] my-4 relative z-20 cursor-wait group"
              >
                <GlitchText text="Career" />
              </motion.span> <br />
              <TextReveal text="In Manufacturing" />
            </span></h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="max-w-2xl mx-auto text-zinc-600 font-bold text-sm sm:text-base md:text-xl leading-relaxed"
            >
              Paperware is redefining the industrial landscape of Bangladesh. 
              Be part of a zero-waste future powered by premium automation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <Magnetic>
                <button className="bg-black text-white px-10 py-5 rounded-[20px] font-black uppercase tracking-[0.2em] text-sm hover:bg-[#fabf37] hover:text-black transition-all shadow-2xl border-b-4 border-zinc-800 active:border-b-0 active:translate-y-1">
                  Explore Positions
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>


        {/* Department Explorer */}
        <div className="mb-12 relative">
          {/* Updated Department Image with Offset and Centered Subject */}
          <motion.div 
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            className="w-[calc(100%+2rem)] md:w-[calc(100%+8rem)] -ml-4 md:-ml-16 -mt-16 md:-mt-32 h-[300px] md:h-[550px] rounded-[40px] md:rounded-[60px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.2)] relative group z-20 mb-12 md:mb-20"
          >
            <ImageWithFallback 
              src={pkgShowcase} 
              alt="Industrial Showcase" 
              className="w-full h-full object-cover object-top md:object-[center_35%] group-hover:scale-110 transition-transform duration-[2s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-10 left-10 md:left-16">
              <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px] md:text-xs block mb-2">Manufacturing Excellence</span>
              <h3 className="text-white text-2xl md:text-4xl font-black uppercase tracking-tighter">Premium Production Hub</h3>
            </div>
          </motion.div>

          <div className="text-center mb-16 space-y-4">
            <span className="text-[#fabf37] font-black uppercase tracking-widest text-xs">Explore Sectors</span>
            <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter">Our Core Departments</h2>
          </div>
          <DepartmentExplorer />
        </div>

        {/* Values Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#fabf37] font-black uppercase tracking-widest text-xs">Our Core Values</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <Thick3DCard key={i} className="bg-white p-10 rounded-[48px] border border-zinc-100 cursor-pointer shadow-lg">
                <div className={`size-16 rounded-2xl ${v.color} flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform shadow-inner`}>
                  <v.icon className="size-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black">{v.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{v.desc}</p>
              </Thick3DCard>
            ))}
          </div>
        </motion.div>

        {/* Life at Paperware Gallery */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
            <div className="space-y-4 text-center md:text-left">
              <span className="text-[#fabf37] font-black uppercase tracking-widest text-xs">Culture & Space</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">Life at Paperware</h2>
            </div>
          </div>
          
          <FloatingGallery images={lifeImages} />
        </motion.div>

        {/* Referral Section */}
        <ReferralSection />

        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
            <div className="text-center md:text-left space-y-4">
              <span className="text-[#fabf37] font-black uppercase tracking-widest text-xs">Why Join Us</span>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter text-black leading-none">Employee <br /> Benefits</h2>
            </div>
            <div className="bg-black text-[#fabf37] p-10 rounded-[40px] font-black uppercase tracking-widest text-sm rotate-3 shadow-2xl border-b-8 border-r-8 border-[#fabf37]">
              Premium Work Life
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b, i) => (
              <ThreeDCard
                key={i}
                className="bg-white p-10 rounded-[50px] border border-zinc-100 hover:bg-[#fabf37]/5 transition-all group relative overflow-hidden shadow-xl"
              >
                <div className="absolute -right-8 -bottom-8 opacity-[0.03] group-hover:opacity-[0.1] transition-opacity group-hover:scale-150 duration-700">
                  <b.icon className="size-48" />
                </div>
                <div className="size-16 rounded-3xl bg-black text-[#fabf37] flex items-center justify-center mb-8 group-hover:shadow-[0_0_30px_rgba(250,191,55,0.3)] transition-all">
                  <b.icon className="size-8" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">{b.title}</h3>
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">{b.desc}</p>
              </ThreeDCard>
            ))}
          </div>
        </motion.div>


        {/* Hiring Process */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-40 relative px-4"
        >
          {/* Background Tech Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0"
            >
              <Binary className="size-96" />
            </motion.div>
          </div>
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter">Our Hiring Process</h2>
            <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-xs">A precise journey to excellence</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {/* Animated Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-zinc-100 hidden md:block -translate-y-12 overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                whileInView={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-black via-[#fabf37] to-black"
              />
            </div>

            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 space-y-8 text-center group"
              >
                <div className="relative">
                  <motion.div 
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    className="size-24 rounded-[30px] bg-white border-2 border-zinc-100 flex items-center justify-center mx-auto shadow-xl group-hover:border-[#fabf37] group-hover:shadow-[0_0_40px_rgba(250,191,55,0.2)] transition-all cursor-pointer"
                  >
                    <step.icon className="size-10 text-black group-hover:text-[#fabf37] transition-colors" />
                  </motion.div>
                  <div className="absolute -top-4 -right-4 size-10 rounded-full bg-black text-[#fabf37] flex items-center justify-center font-black text-xs border-4 border-[#fdfaf3]">
                    0{i + 1}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black uppercase tracking-tight group-hover:text-[#fabf37] transition-colors">{step.title}</h3>
                  <p className="text-zinc-500 text-sm font-bold leading-relaxed px-4">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industrial Marquee */}
        <Marquee items={technologies} />

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32 max-w-3xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-black/5 rounded-3xl overflow-hidden">
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-zinc-50 transition-colors"
                >
                  <span className="font-black uppercase tracking-tight text-sm md:text-base text-black">{faq.q}</span>
                  <div className={`transition-transform duration-300 ${openFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronDown className="size-5" />
                  </div>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-6 text-zinc-500 font-medium leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-12"
        >
          {/* New Department Image Section with Balanced Placement */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full h-[250px] md:h-[450px] rounded-[40px] overflow-hidden shadow-2xl relative group"
          >
            <motion.div style={{ scale: imageScale }} className="w-full h-full">
              <ImageWithFallback 
                src={pkgShowcase} 
                alt="Select Departments" 
                className="w-full h-full object-cover object-top md:object-[center_30%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          <motion.div 
            whileHover={{ rotateX: 8, z: 30 }}
            style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
            className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 sm:px-10 py-8 sm:py-12 bg-white rounded-[40px] border border-zinc-100 shadow-2xl"
          >
            <div className="space-y-6 text-center md:text-left w-full" style={{ transform: "translateZ(40px)" }}>
              <h2 className="text-black font-black uppercase tracking-widest text-lg sm:text-2xl">Find Your Role</h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4">
                {departments.map(dept => (
                  <button
                    key={dept}
                    onClick={() => setActiveDept(dept)}
                    className={`px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
                      activeDept === dept 
                        ? 'bg-[#fabf37] text-black shadow-[0_10px_20px_rgba(250,191,55,0.3)] scale-110' 
                        : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200'
                    }`}
                  >
                    {dept}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto" style={{ transform: "translateZ(40px)" }}>
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 size-5 text-zinc-400" />
                <input 
                  placeholder="Search jobs..." 
                  className="w-full bg-zinc-100 border-none rounded-[24px] py-5 pl-16 pr-6 text-sm font-bold outline-none focus:ring-2 focus:ring-[#fabf37] transition-all"
                />
              </div>
              <button type="button" tabIndex={-1} aria-hidden="true" className="bg-black text-white p-5 rounded-[24px] hover:bg-[#fabf37] hover:text-black transition-all shadow-lg">
                <Filter className="size-6" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid gap-3"
          >
            {/* Removed the previous redundant image from job listings */}
            {jobs.map((job, i) => (
              <PerspectiveJobCard key={i}>
                <motion.div
                  variants={itemVariants}
                  initial={{ borderColor: "rgba(244, 244, 245, 1)" }} // zinc-100 as RGBA
                  whileHover={{ 
                    rotateX: -5, 
                    rotateY: 3,
                    z: 50,
                    scale: 1.01,
                    borderColor: "#fabf37"
                  }}
                  style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
                  className="bg-white p-2.5 sm:p-4 rounded-[16px] sm:rounded-[24px] border flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 group cursor-pointer shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex flex-col md:flex-row gap-3 sm:gap-6 items-center w-full md:w-auto overflow-hidden" style={{ transform: "translateZ(40px)" }}>
                    <Magnetic>
                      <div className="size-10 sm:size-12 rounded-[12px] sm:rounded-[16px] bg-black text-[#fabf37] flex items-center justify-center group-hover:rotate-[360deg] transition-all duration-1000 shadow-lg flex-shrink-0">
                        <Briefcase className="size-5 sm:size-6" />
                      </div>
                    </Magnetic>
                    <div className="text-center md:text-left space-y-1 w-full min-w-0">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black uppercase tracking-tighter text-black group-hover:text-[#fabf37] transition-colors leading-[0.9] break-words">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap justify-center md:justify-start gap-2 sm:gap-4 text-zinc-400 font-black text-[7px] sm:text-[9px] uppercase tracking-[0.2em] overflow-hidden">
                        <span className="flex items-center gap-1.5 whitespace-nowrap"><MapPin className="size-3 text-[#fabf37]" /> {job.location}</span>
                        <span className="bg-[#fabf37]/10 text-[#fabf37] px-3 py-1 rounded-full border border-[#fabf37]/10 whitespace-nowrap">{job.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-auto flex justify-center" style={{ transform: "translateZ(30px)" }}>
                    <Magnetic>
                      <motion.div 
                        whileHover={{ scale: 1.1, rotateZ: 45 }}
                        className="size-10 sm:size-12 rounded-full bg-zinc-900 border border-black/5 flex items-center justify-center text-[#fabf37] group-hover:bg-[#fabf37] group-hover:text-black transition-all shadow-lg"
                      >
                        <ArrowRight className="size-5 sm:size-6" />
                      </motion.div>
                    </Magnetic>
                  </div>
                </motion.div>
              </PerspectiveJobCard>
            ))}
          </motion.div>
        </motion.div>

        {/* Final CTA - Removed as per user request */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 60, rotateX: 20 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          className="mt-40 bg-[#fabf37] p-12 md:p-24 rounded-[60px] text-center space-y-10 shadow-[0_50px_100px_rgba(250,191,55,0.3)] relative overflow-hidden group"
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-20 -top-20 opacity-[0.05]"
          >
            <Cog className="size-80 text-black" />
          </motion.div>
          
          <div className="relative z-10 space-y-8">
            <Magnetic>
              <div className="size-24 bg-black rounded-[30px] flex items-center justify-center mx-auto mb-6 rotate-12 shadow-2xl group-hover:rotate-0 transition-transform duration-500">
                <Rocket className="size-12 text-[#fabf37]" />
              </div>
            </Magnetic>
            <h2 className="text-5xl md:text-9xl font-black uppercase tracking-tighter text-black leading-[0.8] mb-6">
              READY TO <br /> SHAPE <br /> THE FUTURE?
            </h2>
            <p className="max-w-xl mx-auto text-black font-black text-xl uppercase tracking-widest opacity-70">
              Join the elite industrial workforce of Paperware.
            </p>
            <Magnetic>
              <button className="bg-black text-[#fabf37] px-16 py-7 rounded-[25px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all text-sm md:text-lg shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-b-8 border-zinc-900 active:border-b-0">
                Join Talent Pool
              </button>
            </Magnetic>
          </div>
        </motion.div> */}
      </div>

      {/* Footer Decoration */}
      <div className="mt-32 border-t border-black/5 pt-12 text-center px-4">
        <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px]">
          Paperware Engineering & Sustainability
        </p>
      </div>
    </div>
  );
}