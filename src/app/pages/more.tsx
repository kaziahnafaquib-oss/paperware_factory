import { ReactElement, cloneElement, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  Code, 
  MessageSquare, 
  Settings, 
  Globe, 
  ShoppingBag, 
  Truck, 
  Palette, 
  Factory, 
  Image as ImageIcon, 
  HelpCircle, 
  Briefcase, 
  ShieldCheck, 
  Share2,
  ArrowUpRight,
  Zap,
  Activity,
  Box,
  Cpu,
  TrendingUp,
  Clock,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Store,
  DollarSign,
  Handshake
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function MorePage({ onPageChange }: { onPageChange: (id: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200, // Increased for faster response
    damping: 40,
    restDelta: 0.001
  });

  const heroScale = useTransform(smoothProgress, [0, 0.15], [1, 0.85]); // Sharper transition
  const heroOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
  const heroRotateX = useTransform(smoothProgress, [0, 0.2], [0, -20]);
  
  const gridY = useTransform(smoothProgress, [0.1, 0.4], [400, 0]);
  const gridOpacity = useTransform(smoothProgress, [0.1, 0.3], [0, 1]);
  const gridRotateX = useTransform(smoothProgress, [0.1, 0.5], [25, 0]);
  const gridScale = useTransform(smoothProgress, [0.1, 0.4], [0.9, 1]);

  const footerY = useTransform(smoothProgress, [0.7, 1], [100, 0]);
  const footerOpacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);

  const socialFeed = [
    { 
      img: "https://images.unsplash.com/photo-1759157403273-2423c0f5718b?auto=format&fit=crop&q=80&w=800",
      cap: "Precision manufacturing at our Dhaka Core Site. Tier-1 sustainability standards in action.",
      date: "2 HOURS AGO"
    },
    { 
      img: "https://images.unsplash.com/photo-1705592579405-0d59931c8e00?auto=format&fit=crop&q=80&w=800",
      cap: "New luxury paper bag prototypes for our Nordic partners. Minimalist. Sustainable. Impactful.",
      date: "1 DAY AGO"
    },
    { 
      img: "https://images.unsplash.com/photo-1549382534-f304b390c268?auto=format&fit=crop&q=80&w=800",
      cap: "Raw material audit. Only the finest High-Density Nordic fiber makes it to our production line.",
      date: "3 DAYS AGO"
    },
    { 
      img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
      cap: "Engineering the future of packaging. Smart compliance is integrated into every step.",
      date: "5 DAYS AGO"
    }
  ];

  const menuItems = [
    { name: "Franchise Opportunities", id: "franchise", icon: <Store className="size-6" />, desc: "Join our global franchise network and build your empire." },
    { name: "Investor Relations", id: "investor", icon: <DollarSign className="size-6" />, desc: "Investment opportunities and financial information." },
    { name: "Partner Program", id: "partners", icon: <Handshake className="size-6" />, desc: "Strategic partnerships with suppliers and service providers." },
    { name: "Technical Manifesto", id: "technical-manifesto", icon: <Code className="size-6" />, desc: "The engineering philosophy and technical standards of Paperware." },
    { name: "Future Plan", id: "future-plan", icon: <Zap className="size-6" />, desc: "Our roadmap for sustainable packaging innovation." },
    { name: "Product Feedback", id: "product-feedback", icon: <MessageSquare className="size-6" />, desc: "Share your experience and help us improve." },
    { name: "ERP Smart Factory", id: "erp", icon: <Settings className="size-6" />, desc: "Digital twin and real-time factory management." },
    { name: "Export Intelligence", id: "export", icon: <Globe className="size-6" />, desc: "Global trade compliance and logistics data." },
    { name: "Bulk Orders Quotes", id: "bulk-quotes", icon: <ShoppingBag className="size-6" />, desc: "Special pricing for high-volume enterprise orders." },
    { name: "Track Order", id: "tracking", icon: <Truck className="size-6" />, desc: "Real-time visibility into your delivery pipeline." },
    { name: "Brand Visualizer", id: "studio", icon: <Palette className="size-6" />, desc: "Visualize your brand on our premium products." },
    { name: "Manufacturing", id: "manufacturing", icon: <Factory className="size-6" />, desc: "Inside our state-of-the-art production facility." },
    { name: "Product Gallery", id: "gallery", icon: <ImageIcon className="size-6" />, desc: "Curated collection of our finest packaging solutions." },
    { name: "FAQ", id: "faq", icon: <HelpCircle className="size-6" />, desc: "Frequently asked questions and support guides." },
    { name: "Career", id: "career", icon: <Briefcase className="size-6" />, desc: "Join our team of packaging experts and innovators." },
    { name: "Compliance", id: "compliance", icon: <ShieldCheck className="size-6" />, desc: "Certifications and international standard adherence." },
    { name: "Social Hub", id: "socials", icon: <Share2 className="size-6" />, desc: "Connect with us across global digital platforms." },
  ];

  return (
    <div ref={containerRef} className="relative bg-[#ffffff] min-h-screen pt-32 md:pt-40 font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden">
      {/* Industrial Grid Background */}
      <div className="fixed inset-0 z-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* 1. FULL SCREEN HERO SECTION */}
      <section className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden z-20 pointer-events-none pb-20">
        <motion.div 
          style={{ 
            scale: heroScale, 
            opacity: heroOpacity,
            rotateX: heroRotateX,
            transformStyle: "preserve-3d"
          }}
          className="w-full max-w-[100vw] px-4 flex flex-col items-center text-center -mt-32 md:-mt-40"
        >
          {/* Top Label with Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6 md:gap-10 mb-8 md:mb-12"
          >
            <div className="h-[2px] w-12 md:w-20 bg-[#fabf37]" />
            <span className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 whitespace-nowrap">System Directory</span>
            <div className="h-[2px] w-12 md:w-20 bg-[#fabf37]" />
          </motion.div>
          
          {/* Main Title with Yellow Blocks */}
          <div className="relative flex flex-col items-center mb-20 md:mb-28" style={{ transformStyle: "preserve-3d", perspective: "1000px" }}>
            {/* "THE" block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: 20, z: -100 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-[#fabf37] px-6 py-2 md:px-10 md:py-4 mb-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-[120px] font-black uppercase tracking-tighter leading-none text-black" style={{ transform: "translateZ(30px)" }}>
                THE
              </h1>
            </motion.div>

            {/* "ECOSYSTEM" block */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateX: -20, z: -100 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, z: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
              className="bg-[#fabf37] px-6 py-4 md:px-12 md:py-8 relative shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-[140px] font-black uppercase tracking-tighter leading-none text-black" style={{ transform: "translateZ(50px)" }}>
                ECOSYSTEM.
              </h1>
              
              {/* Scroll to Explore overlay - Adjusted position to prevent overlap */}
              <div className="absolute -bottom-14 md:-bottom-16 left-0 w-full flex justify-center">
                <span className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.5em] text-zinc-400/60 animate-pulse whitespace-nowrap">
                  SCROLL TO EXPLORE
                </span>
              </div>
            </motion.div>
          </div>
          
          {/* Description below */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="max-w-[300px] sm:max-w-md md:max-w-3xl text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-[13px] leading-relaxed px-4 relative z-10"
          >
            Access our specialized tools, manufacturing insights, and global support network from a single industrial command center.
          </motion.p>
          
          {/* Animated line (repositioned) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-12 flex flex-col items-center"
          >
            <div className="w-[1px] h-16 md:h-24 bg-zinc-100 overflow-hidden">
              <motion.div 
                animate={{ y: [0, 96, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-full h-1/2 bg-[#fabf37]"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. DYNAMIC GRID SECTION */}
      <div className="container mx-auto px-6 md:px-4 relative z-10 pb-20 md:pb-32">
        <motion.div 
          style={{ 
            y: gridY,
            opacity: gridOpacity,
            rotateX: gridRotateX,
            scale: gridScale,
            transformStyle: "preserve-3d",
            perspective: "2500px"
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 will-change-transform" // Added hardware acceleration hint
        >
          {menuItems.map((item, idx) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 50, rotateY: 30, z: -200 }} // Stronger entry 3D
              whileInView={{ opacity: 1, y: 0, rotateY: 0, z: 0 }}
              transition={{ 
                delay: idx * 0.04,
                duration: 0.6,
                ease: [0.23, 1, 0.32, 1]
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ 
                scale: 1.05, 
                rotateX: -10, // Stronger tilt
                rotateY: 10,
                translateZ: 80, // Significant pop-out
                boxShadow: "20px 40px 80px -20px rgba(0,0,0,0.3)" // 3D Shadow
              }}
              onClick={() => onPageChange(item.id)}
              className="group relative bg-white border border-black/5 rounded-[40px] p-8 md:p-12 text-left hover:bg-black transition-all duration-500 overflow-visible shadow-sm will-change-transform" // Hardware acceleration hint
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Layered 3D background elements */}
              <div className="absolute inset-0 bg-zinc-50 rounded-[40px] translate-z-[-20px] group-hover:bg-zinc-900 transition-colors" />
              
              {/* Hover Glow Effect */}
              <div className="absolute -top-24 -right-24 size-64 bg-[#fabf37]/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" style={{ transform: "translateZ(20px)" }} />
              
              <div className="relative z-10 flex flex-col h-full justify-between gap-12 md:gap-20" style={{ transform: "translateZ(100px)" }}> {/* Deep inner layer */}
                <div className="flex items-start justify-between">
                  <motion.div 
                    whileHover={{ rotate: [0, -15, 15, 0], scale: 1.1 }}
                    className="size-14 md:size-20 rounded-[22px] md:rounded-[30px] bg-white border border-black/5 flex items-center justify-center text-black group-hover:bg-[#fabf37] transition-all duration-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {cloneElement(item.icon as ReactElement, { className: "size-8 md:size-10" })}
                  </motion.div>
                  <div className="size-10 md:size-12 rounded-full border border-black/5 flex items-center justify-center group-hover:border-[#fabf37]/30 transition-colors shadow-sm" style={{ transform: "translateZ(30px)" }}>
                    <ArrowUpRight className="size-5 md:size-6 text-zinc-300 group-hover:text-[#fabf37] transition-colors" />
                  </div>
                </div>
                
                <div className="space-y-4 md:space-y-6" style={{ transform: "translateZ(50px)" }}>
                  <h3 className="text-xl md:text-3xl font-black uppercase tracking-tight text-black group-hover:text-white transition-colors leading-none">
                    {item.name}
                  </h3>
                  <div className="h-[3px] w-12 bg-[#fabf37] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
                  <p className="text-[11px] md:text-[13px] font-bold text-zinc-400 group-hover:text-zinc-300 uppercase tracking-widest leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
              
              {/* Bottom 3D ledge effect */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-2 bg-black/5 rounded-full blur-md group-hover:bg-[#fabf37]/20 transition-all translate-y-8" />
            </motion.button>
          ))}
        </motion.div>

        {/* 3. LIVE PRODUCTION STATISTICS (New Suggestion) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-zinc-50 border border-black/5 rounded-[40px] p-10 flex flex-col justify-between group hover:bg-black transition-colors duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                <Cpu className="size-6" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-zinc-400 group-hover:text-zinc-500">Real-time Efficiency</h4>
            </div>
            <div className="space-y-2">
              <span className="text-6xl font-black text-black group-hover:text-white tracking-tighter">98.4%</span>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Global Manufacturing Throughput</p>
            </div>
          </div>

          <div className="bg-[#fabf37] rounded-[40px] p-10 flex flex-col justify-between group hover:shadow-2xl transition-all duration-500">
            <div className="flex items-center gap-4 mb-8">
              <div className="size-12 rounded-2xl bg-black flex items-center justify-center text-[#fabf37]">
                <TrendingUp className="size-6" />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-black/40">Market Growth</h4>
            </div>
            <div className="space-y-2">
              <span className="text-6xl font-black text-black tracking-tighter">+245%</span>
              <p className="text-xs font-bold text-black/60 uppercase tracking-widest">Year-over-Year Enterprise Scale</p>
            </div>
          </div>
        </motion.div>

        {/* System Status Footer (Platform Status) */}
        <motion.div 
          style={{ 
            y: footerY,
            opacity: footerOpacity,
            transformStyle: "preserve-3d"
          }}
          className="mt-20 md:mt-40 bg-zinc-900 rounded-[32px] md:rounded-[48px] p-8 md:p-12 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#fabf3720,transparent)]" />
           
           <div className="flex items-center gap-6 relative z-10">
             <div className="size-14 rounded-2xl bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37] border border-[#fabf37]/20">
               <Activity className="size-7" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Platform Status</p>
               <p className="text-sm font-black uppercase text-emerald-400 flex items-center gap-2">
                 <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                 Fully Operational
               </p>
             </div>
           </div>

           <div className="flex items-center gap-6 relative z-10">
             <div className="size-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
               <Globe className="size-7" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Global Reach</p>
               <p className="text-sm font-black uppercase text-white">46 Languages Integrated</p>
             </div>
           </div>

           <div className="flex items-center gap-6 relative z-10">
             <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10">
               <Box className="size-7" />
             </div>
             <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Neural Engine</p>
               <p className="text-sm font-black uppercase text-white">v2.0 Factory Core</p>
             </div>
           </div>
        </motion.div>

        {/* 4. DIGITAL FOOTPRINT LIVE FEED (Added after Platform Status) */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-[#fabf37] font-black uppercase tracking-[0.4em] text-[10px]">
                <div className="h-[1px] w-12 bg-[#fabf37]" />
                Digital Footprint
              </div>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-black">
                Live <span className="text-zinc-300 italic">Transmission</span>
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              <Instagram className="size-5 text-zinc-300" />
              <Facebook className="size-5 text-zinc-300" />
              <Linkedin className="size-5 text-zinc-300" />
            </div>
          </div>

          <div className="relative">
            <motion.div 
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 30, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-6 whitespace-nowrap"
            >
              {[...socialFeed, ...socialFeed, ...socialFeed].map((post, i) => (
                <div key={i} className="w-[300px] shrink-0 bg-zinc-50 rounded-[32px] overflow-hidden border border-black/5 group">
                  <div className="h-48 overflow-hidden">
                    <img src={post.img} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-[10px] font-black text-zinc-300 uppercase tracking-widest">{post.date}</p>
                    <p className="text-xs font-bold text-zinc-500 whitespace-normal line-clamp-2 leading-relaxed">
                      {post.cap}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Spacer for bottom */}
      <div className="h-32" />
    </div>
  );
}