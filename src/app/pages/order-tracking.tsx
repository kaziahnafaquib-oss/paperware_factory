import React from "react";
import { openWhatsAppInquiry, SALES_WHATSAPP_DISPLAY, SALES_PHONE_DISPLAY } from "../lib/inquiry";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Search, Truck, Package, MapPin, 
  CircleCheck, Clock, ArrowRight, ShieldCheck, 
  Activity, Info, ChevronRight, X, Layers,
  Phone, Globe, RefreshCw, Box,
  Instagram, Linkedin, Facebook, Database, ScanQrCode, Cpu, Thermometer, Droplets, Wind, Terminal,
  CheckCircle2, Radio, AlertTriangle, MessageCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface OrderTrackingPageProps {
  onViewJourney?: () => void;
  onFeedbackClick?: () => void;
}

export function OrderTrackingPage({ onViewJourney, onFeedbackClick }: OrderTrackingPageProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [orderId, setOrderId] = React.useState("");
  // Phase A0: there is no order database behind this page. Never show a fabricated shipment;
  // send an order-status request to the sales team instead ("requested"). The "found" view is unreachable until a real lookup exists.
  const [status, setStatus] = React.useState<"idle" | "searching" | "found" | "requested">("idle");
  
  const { scrollYProgress, scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Advanced 3D Scroll Transforms
  const backgroundY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const backgroundY2 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const rotateZ = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const sectionRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-5, 0, 5]);
  const sectionZ = useTransform(scrollYProgress, [0, 0.5, 1], [-100, 0, -100]);
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Header specific 3D
  const headerRotateX = useTransform(scrollYProgress, [0, 0.2], [0, 25]);
  const headerZ = useTransform(scrollYProgress, [0, 0.2], [0, -200]);

  const socialPosts: { platform: string; content: string; date: string; [k: string]: any }[] = []; // no demo posts

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    openWhatsAppInquiry("Order status request", { "Order / reference": orderId });
    setStatus("requested");
  };

  const steps = [
    { title: "Order Confirmed", date: "Dec 18, 2025", loc: "Paperware HQ, Dhaka", done: true },
    { title: "Design Approved", date: "Dec 19, 2025", loc: "Studio Hub", done: true },
    { title: "Manufacturing", date: "Dec 20, 2025", loc: "Factory Floor A2", done: true },
    { title: "Quality Audit", date: "In Progress", loc: "Testing Lab", done: false, current: true },
    { title: "Dispatch Hub", date: "Pending", loc: "Port of Chattogram", done: false },
    { title: "In Transit", date: "Pending", loc: "International Waters", done: false },
  ];

  const telemetryData = [
    { label: "Unit Production Speed", value: "850 units/hr", icon: Activity },
    { label: "Machine Load", value: "92%", icon: Cpu },
    { label: "Batch Quality Index", value: "99.8%", icon: ShieldCheck },
    { label: "System Uptime", value: "99.99%", icon: Database },
  ];

  const envTelemetry = [
    { label: "Ambient Temp", value: "22.4°C", icon: Thermometer, trend: "stable" },
    { label: "Relative Humidity", value: "48%", icon: Droplets, trend: "optimal" },
    { label: "Static Load Pressure", value: "1.2 PSI", icon: Box, trend: "safe" },
    { label: "Air Quality Index", value: "12 PM2.5", icon: Wind, trend: "pure" },
  ];

  const digitalFootprint = [
    { time: "08:22:10", action: "Node-04 Integrity Sync", status: "Verified", hash: "8x2...f9" },
    { time: "08:22:45", action: "AI Batch Optimization", status: "Optimal", hash: "4p9...a1" },
    { time: "08:23:12", action: "Smart Contract Execution", status: "Finalized", hash: "k2m...e8" },
    { time: "08:23:55", action: "Global Mesh Re-routing", status: "Active", hash: "r1o...z0" },
  ];

  return (
    <div ref={containerRef} className="relative bg-zinc-50 min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black pt-32 md:pt-40">
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-[#fabf37] origin-left z-[1001]" />

      {/* Extreme 3D Background Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ transformStyle: "preserve-3d" }}>
        <motion.div 
          style={{ y: backgroundY1, rotate: rotateZ, translateZ: -500 }}
          className="absolute -top-[5%] -left-[10%] opacity-[0.05]"
        >
          <Package className="size-[800px] text-black" />
        </motion.div>
        
        <motion.div 
          style={{ y: backgroundY2, rotate: -35, translateZ: -800 }}
          className="absolute top-[20%] -right-[20%] opacity-[0.04]"
        >
          <Truck className="size-[1000px] text-black" />
        </motion.div>

        <motion.div 
          style={{ y: floatingY, rotate: 25, translateZ: -300 }}
          className="absolute top-[70%] left-[10%] opacity-[0.03]"
        >
          <Box className="size-[500px] text-black" />
        </motion.div>

        {/* 3D Floating Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            z: [-200, 0, -200]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute top-[15%] right-[15%] size-[600px] rounded-full bg-[#fabf37]/10 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            z: [-400, -200, -400]
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-[10%] left-[5%] size-[400px] rounded-full bg-black/5 blur-[100px]"
        />
      </div>

      <motion.div 
        style={{ rotateX: headerRotateX, translateZ: headerZ }}
        className="container mx-auto px-4 max-w-6xl relative z-10"
      >
        
        {/* Modern Header with Enhanced Animation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-4 w-full"
            style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
          >
            <div className="flex items-center gap-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-px bg-[#fabf37]" 
              />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#fabf37]">Order Status</span>
            </div>
            
            <h1 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-black flex flex-col items-start gap-3 md:gap-2" style={{ transformStyle: "preserve-3d" }}>
              <motion.div 
                initial={{ opacity: 0, rotateX: 30, z: -200, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  rotateX: 0, 
                  z: 0, 
                  y: [0, -8, 0], 
                }}
                transition={{ 
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.8, delay: 0.2 },
                  rotateX: { duration: 0.8, delay: 0.2 },
                  z: { duration: 0.8, delay: 0.2 }
                }}
                whileHover={{ rotateY: 15, translateZ: 60, scale: 1.05 }}
                className="bg-black text-[#fabf37] px-5 py-2 md:px-10 md:py-4 shadow-[6px_6px_0px_0px_rgba(250,191,55,1)] md:shadow-[15px_15px_0px_0px_rgba(250,191,55,1)] relative group cursor-default inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10 block" style={{ transform: "translateZ(30px)" }}>Track</span>
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-[#fabf37]/30 z-20 pointer-events-none"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, rotateX: 30, z: -200, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  rotateX: 0, 
                  z: 0, 
                  y: [0, 8, 0], 
                }}
                transition={{ 
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                  opacity: { duration: 0.8, delay: 0.3 },
                  rotateX: { duration: 0.8, delay: 0.3 },
                  z: { duration: 0.8, delay: 0.3 }
                }}
                whileHover={{ rotateY: -15, translateZ: 70, scale: 1.05 }}
                className="bg-zinc-100 text-black px-5 py-2 md:px-10 md:py-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] relative group cursor-default inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10 block" style={{ transform: "translateZ(30px)" }}>Your</span>
                <motion.div 
                  animate={{ top: ["100%", "0%", "100%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-black/10 z-20 pointer-events-none"
                />
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, rotateX: 30, z: -200, y: 50 }}
                animate={{ 
                  opacity: 1, 
                  rotateX: 0, 
                  z: 0, 
                  y: [0, -12, 0], 
                }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 },
                  opacity: { duration: 0.8, delay: 0.4 },
                  rotateX: { duration: 0.8, delay: 0.4 },
                  z: { duration: 0.8, delay: 0.4 }
                }}
                whileHover={{ rotateY: 15, translateZ: 80, scale: 1.1 }}
                className="bg-[#fabf37] text-black px-6 py-2 md:px-12 md:py-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] md:shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] relative group cursor-default inline-block"
                style={{ transformStyle: "preserve-3d" }}
              >
                <span className="relative z-10 block" style={{ transform: "translateZ(40px)" }}>Shipment</span>
                <motion.div 
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[2px] bg-black/20 z-20 pointer-events-none"
                />
              </motion.div>
            </h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-xs text-right hidden md:block"
          >
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
              Ask us for the status of your order.
            </p>
          </motion.div>
        </div>

        {/* Search Bar Container with 3D Float */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ transformStyle: "preserve-3d" }}
          whileHover={{ translateZ: 50, rotateX: -2 }}
          className="bg-white p-6 md:p-10 rounded-[48px] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.1)] border border-black/5 mb-16 backdrop-blur-sm bg-white/90"
        >
          <div className="flex flex-col md:flex-row gap-6 mb-8">
             <div className="flex-1">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative group">
                    <div className="absolute inset-0 bg-black/5 rounded-3xl group-hover:bg-[#fabf37]/5 transition-colors pointer-events-none" />
                    <Package className="absolute left-8 top-1/2 -translate-y-1/2 text-zinc-400 size-6" />
                    <input 
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="ENTER SHIPMENT ID (e.g. PW-2025)"
                      className="w-full bg-transparent border-none rounded-3xl py-7 pl-20 pr-8 text-xl font-black uppercase tracking-tight focus:ring-0 outline-none placeholder:text-zinc-200"
                    />
                  </div>
                  <button className="bg-black text-[#fabf37] px-12 py-7 rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-2xl">
                    <Search className="size-5" /> Locate
                  </button>
                </form>
             </div>
             <button 
                onClick={onViewJourney}
                className="bg-zinc-50 border-2 border-dashed border-zinc-200 text-zinc-400 px-8 py-7 rounded-[32px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:border-[#fabf37] hover:text-black transition-all group"
             >
                <ScanQrCode className="size-6 group-hover:rotate-90 transition-transform" />
                Scan Product QR
             </button>
          </div>
          
          <div className="flex items-center gap-6 px-4">
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Common Enquiries:</span>
            {["Estimated ETA", "Bulk Logistics", "Port Status"].map(tag => (
              <button 
                key={tag} 
                onClick={() => { openWhatsAppInquiry("Order enquiry", { Topic: tag, "Order / reference": orderId }); setStatus("requested"); }}
                className="text-[9px] font-bold text-zinc-400 hover:text-black transition-colors underline decoration-[#fabf37]/30"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>

        {/* DIGITAL FOOTPRINT - WHITE GLASSMORPHISM SOCIAL FEED */}
        <section className="mb-24" style={{ perspective: "2000px" }}>
          <motion.div 
            initial={{ opacity: 0, y: 40, rotateX: 25, translateZ: -200 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              rotateX: sectionRotateX, 
              rotateY: sectionRotateY,
              translateZ: sectionZ,
              transformStyle: "preserve-3d" 
            }}
            className="bg-white/40 backdrop-blur-3xl p-10 md:p-14 rounded-[60px] text-black space-y-12 relative overflow-hidden group border border-black/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
          >
            {/* Subtle Futuristic Background Elements */}
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
               <Globe className="size-64 rotate-12" />
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="size-2 rounded-full bg-[#fabf37] animate-ping" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Global Connectivity Feed</p>
                 </div>
                 <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Social <br /> Digital Footprint</h2>
                 <p className="text-[10px] font-bold text-zinc-400 max-w-md uppercase tracking-widest leading-relaxed">
                    Direct stream from our enterprise social nodes. Experience the intersection 
                    of industrial precision and digital transparency across all platforms.
                 </p>
              </div>
              <div className="flex gap-4">
                 <div className="px-6 py-4 bg-black/5 rounded-[24px] border border-black/5 flex items-center gap-4">
                    <div className="flex -space-x-2">
                       <a 
                         href="https://www.instagram.com/paperware_factory/" 
                         aria-label="Paperware Factory on Instagram"
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm hover:scale-110 hover:z-10 transition-transform"
                       >
                          <Instagram className="size-4 text-pink-500" />
                       </a>
                       <a 
                         href="https://www.facebook.com/paperwarefactory" 
                         aria-label="Paperware Factory on Facebook"
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm hover:scale-110 hover:z-10 transition-transform"
                       >
                          <Facebook className="size-4 text-blue-600" />
                       </a>
                       <a 
                         href="https://www.linkedin.com/company/paperwarefactory/" 
                         aria-label="Paperware Factory on LinkedIn"
                         target="_blank" 
                         rel="noopener noreferrer" 
                         className="size-8 rounded-full bg-white border-2 border-zinc-100 flex items-center justify-center shadow-sm hover:scale-110 hover:z-10 transition-transform"
                       >
                          <Linkedin className="size-4 text-blue-700" />
                       </a>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">Follow us</span>
                 </div>
              </div>
            </div>

            {/* Social Feed Ticker */}
            <div className="relative overflow-hidden -mx-10 md:-mx-14">
               <motion.div 
                 animate={{ x: [0, -1000] }}
                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                 className="flex gap-8 px-10 md:px-14 whitespace-nowrap"
               >
                  {[...socialPosts, ...socialPosts, ...socialPosts].map((post, i) => (
                    <div 
                      key={i}
                      className="w-[340px] md:w-[420px] shrink-0 bg-white border border-black/[0.03] p-6 rounded-[40px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group/post"
                    >
                       <div className="relative h-56 md:h-64 rounded-[30px] overflow-hidden mb-5">
                          <ImageWithFallback 
                             src={post.img} 
                             alt={post.platform} 
                             className="w-full h-full object-cover group-hover/post:scale-105 transition-transform duration-1000" 
                          />
                          <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-black text-[9px] font-black tracking-widest flex items-center gap-3 border border-white/20">
                             <post.icon className={`size-3.5 ${post.color}`} />
                             {post.platform}
                          </div>
                       </div>
                       <div className="space-y-4 px-2">
                          <p className="text-xs font-bold text-zinc-600 leading-relaxed whitespace-normal line-clamp-2">
                             {post.caption}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-zinc-50">
                             <span className="text-[9px] font-black uppercase tracking-widest text-[#fabf37]">{post.date}</span>
                             <div className="flex items-center gap-2 text-zinc-400 group-hover/post:text-black transition-colors">
                                <span className="text-[9px] font-black uppercase tracking-widest">View Post</span>
                                <ArrowRight className="size-4 group-hover/post:translate-x-1 transition-transform" />
                             </div>
                          </div>
                       </div>
                    </div>
                  ))}
               </motion.div>
            </div>

            <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 relative z-10">
               <div className="flex items-center gap-6">
                  <p className="text-[8px] font-black uppercase tracking-[0.4em]">Paperware Media Hub</p>
                  <div className="flex items-center gap-2">
                     <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[8px] font-black uppercase tracking-[0.4em]">Network Optimized</p>
                  </div>
               </div>
            </div>
          </motion.div>
        </section>

        <AnimatePresence mode="wait">
          {status === "searching" && (
            <motion.div 
              key="searching"
              initial={{ opacity: 0, scale: 0.8, rotateX: 45, translateZ: -500 }}
              animate={{ opacity: 1, scale: 1, rotateX: 0, translateZ: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateX: -45, translateZ: 200 }}
              className="flex flex-col items-center gap-8 py-40"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="size-24 rounded-full border-b-4 border-t-4 border-[#fabf37]" 
                />
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <Database className="size-8 text-black" />
                </motion.div>
              </div>
              <div className="text-center space-y-3">
                <motion.p 
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-sm font-black uppercase tracking-[0.3em]"
                >
                  Synchronizing Ledger...
                </motion.p>
                <p className="text-[10px] font-bold text-zinc-400 max-w-xs uppercase tracking-widest">Verifying shipment signatures on the Paperware global network node-04...</p>
              </div>
            </motion.div>
          )}

          {status === "requested" && (
            <motion.div key="requested" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto py-24 text-center space-y-4" role="status" aria-live="polite">
              <p className="text-2xl md:text-3xl font-black uppercase tracking-tight">We'll check your order for you</p>
              <p className="text-base font-medium text-zinc-600 leading-relaxed">
                Online tracking isn't available yet. We opened WhatsApp with your order details so our team can reply with the current status. Press Send there. If WhatsApp didn't open, message us on {SALES_WHATSAPP_DISPLAY} or call {SALES_PHONE_DISPLAY}.
              </p>
            </motion.div>
          )}

          {status === "found" && (
            <motion.div 
              key="found"
              initial={{ opacity: 0, y: 100, rotateX: 20, translateZ: -300 }}
              animate={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformStyle: "preserve-3d" }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-12">
                <motion.div 
                  whileHover={{ translateZ: 40, rotateY: 5, rotateX: -2 }}
                  style={{ transformStyle: "preserve-3d" }}
                  className="bg-white p-10 md:p-14 rounded-[60px] border border-black/5 shadow-xl space-y-16 group"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">Current Status</p>
                      <h3 className="text-4xl font-black uppercase tracking-tight">Quality Audit</h3>
                      <div className="flex items-center gap-2 pt-2">
                        <MapPin className="size-3.5 text-zinc-400" />
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Sector B, Manufacturing Hub, Dhaka</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 items-end">
                      <div className="bg-zinc-50 p-6 rounded-[32px] border border-black/5 text-center min-w-[140px]">
                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-1">Est. Completion</p>
                        <p className="text-lg font-black italic">Dec 24, 2025</p>
                      </div>
                      <button 
                        onClick={onViewJourney}
                        className="text-[10px] font-black uppercase tracking-widest bg-black text-[#fabf37] px-6 py-3 rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-lg"
                      >
                        Full Journey Details <ArrowRight className="size-3" />
                      </button>
                    </div>
                  </div>

                  <div className="relative space-y-16 pl-4 md:pl-8">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "100%" }}
                      transition={{ duration: 2, delay: 1 }}
                      className="absolute left-[39px] md:left-[47px] top-6 bottom-6 w-1 bg-zinc-50 origin-top" 
                    />
                    {steps.map((step, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + (i * 0.1) }}
                        className="flex gap-8 md:gap-12 relative group/item"
                      >
                        <div className={`size-12 md:size-16 rounded-full border-4 border-white flex items-center justify-center z-10 transition-all duration-500 shadow-xl ${
                          step.done ? 'bg-black text-[#fabf37]' : 
                          step.current ? 'bg-[#fabf37] text-black animate-pulse' : 
                          'bg-zinc-100 text-zinc-300'
                        }`}>
                          {step.done ? <CheckCircle2 className="size-6 md:size-8" /> : <Clock className="size-6 md:size-8" />}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                            <h4 className={`text-xl md:text-2xl font-black uppercase tracking-tight transition-colors ${step.done || step.current ? 'text-black' : 'text-zinc-200'}`}>
                              {step.title}
                            </h4>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{step.date}</span>
                          </div>
                          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">{step.loc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white p-10 md:p-14 rounded-[60px] border border-black/5 shadow-sm space-y-10"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Live Production Feed</p>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tight">Factory Floor A2 Telemetry</h3>
                    </div>
                    <Activity className="size-8 text-zinc-100" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {telemetryData.map((data, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05, borderColor: "#fabf37" }}
                        className="space-y-3 p-6 bg-zinc-50 rounded-[32px] border border-black/5 transition-all cursor-default"
                      >
                        <data.icon className="size-5 text-zinc-400" />
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{data.label}</p>
                          <p className="text-xl font-black italic">{data.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-zinc-50 p-10 md:p-14 rounded-[60px] border border-black/5 space-y-10 group"
                >
                   <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">Cargo Environment Control</p>
                      <h3 className="text-3xl font-black uppercase tracking-tight text-black">Transit Telemetry</h3>
                    </div>
                    <Radio className="size-8 text-black animate-pulse" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-8">
                    {envTelemetry.map((item, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -5, backgroundColor: "#000", color: "#fabf37" }}
                        className="bg-white p-8 rounded-[40px] border border-black/5 shadow-sm transition-all flex flex-col justify-between h-44 group/card"
                      >
                        <div className="flex justify-between items-start">
                           <item.icon className="size-6 text-black group-hover/card:text-[#fabf37] transition-colors" />
                           <span className="text-[8px] font-black uppercase tracking-widest text-emerald-500">{item.trend}</span>
                        </div>
                        <div className="space-y-1">
                           <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 group-hover/card:text-[#fabf37]/50">{item.label}</p>
                           <p className="text-2xl font-black">{item.value}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-8">
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-black p-10 rounded-[60px] text-white space-y-8 relative overflow-hidden group/ai"
                >
                  <div className="space-y-6 relative z-10">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">AI Predictive Insights</p>
                      <h4 className="text-3xl font-black uppercase italic tracking-tighter">Delivery Probability</h4>
                    </div>
                    <div className="flex items-end gap-4">
                      <span className="text-7xl font-black text-[#fabf37]">94%</span>
                      <div className="pb-3">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">On-Time Accuracy</p>
                        <p className="text-[11px] font-bold text-emerald-400">Predicted Early (+2 Days)</p>
                      </div>
                    </div>
                    <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-start gap-4">
                       <AlertTriangle className="size-5 text-[#fabf37] shrink-0 mt-1" />
                       <p className="text-[11px] font-bold opacity-70 leading-relaxed">
                         Optimal weather patterns detected across the Bay of Bengal. Supply route congestion is minimal.
                       </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-zinc-900 p-10 rounded-[60px] border border-white/5 space-y-8"
                >
                   <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black uppercase tracking-tight text-white">Blockchain Ledger</h3>
                     <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-[0.2em] rounded-full">Verified</span>
                   </div>
                   <div className="space-y-4">
                     <div className="p-4 bg-black/40 rounded-2xl border border-white/5 font-mono text-[9px] text-zinc-500 break-all">
                       HASH: 8f2b3c91d0e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0
                     </div>
                   </div>
                </motion.div>

                <div className="bg-black p-10 rounded-[60px] text-white flex items-center justify-between group cursor-pointer overflow-hidden">
                  <div className="space-y-2 relative z-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fabf37]">Need Help?</p>
                    <h4 className="text-2xl font-black uppercase tracking-tighter italic">Logistics <br /> Support</h4>
                  </div>
                  <div className="size-16 rounded-full bg-[#fabf37] flex items-center justify-center text-black">
                    <MessageCircle className="size-8" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. PRODUCT FEEDBACK BAR - EXTREME 3D AT BOTTOM - Removed as per user request */}
        {/* <div style={{ perspective: "2000px" }}>
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 45, translateZ: -400 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, translateZ: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
              rotateX: sectionRotateX, 
              rotateY: sectionRotateY,
              translateZ: sectionZ,
              transformStyle: "preserve-3d" 
            }}
            onClick={onFeedbackClick}
            className="mt-16 bg-[#fabf37] p-10 md:p-14 rounded-[60px] shadow-[0_60px_120px_-20px_rgba(250,191,55,0.4)] flex flex-col md:flex-row items-center justify-between gap-10 group cursor-pointer overflow-hidden relative border-4 border-black/5"
          >
             <motion.div 
               animate={{ 
                 rotate: [0, 360],
                 scale: [1, 1.2, 1],
                 z: [0, 50, 0]
               }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="absolute top-[-20%] left-[-10%] opacity-10 pointer-events-none"
               style={{ transformStyle: "preserve-3d" }}
             >
                <MessageCircle className="size-64" />
             </motion.div>

             <motion.div 
               animate={{ 
                 y: [0, -30, 0],
                 rotateY: [0, 45, 0],
                 translateZ: [0, 100, 0]
               }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-[-10%] right-[5%] opacity-10 pointer-events-none"
               style={{ transformStyle: "preserve-3d" }}
             >
                <Star className="size-48" />
             </motion.div>
             
             <div className="space-y-4 relative z-10" style={{ transform: "translateZ(40px)" }}>
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Star className="size-6 text-black fill-black" />
                  </motion.div>
                  <h4 className="text-xs font-black uppercase tracking-[0.3em]">Customer Satisfaction</h4>
                </div>
                <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Your Feedback Fuels <br /> Our Innovation.</h3>
                <p className="text-[10px] font-bold text-black/60 uppercase tracking-widest max-w-sm">
                   Help us improve the Paperware experience. Share your thoughts on our products and services.
                </p>
             </div>

             <motion.div 
               whileHover={{ translateZ: 80, scale: 1.1, rotateY: -10 }}
               whileTap={{ scale: 0.95 }}
               className="relative z-10 bg-black text-[#fabf37] px-12 py-7 rounded-full flex items-center gap-6 font-black text-xs uppercase tracking-widest shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-2 border-[#fabf37]/20"
               style={{ transformStyle: "preserve-3d" }}
             >
                <span style={{ transform: "translateZ(20px)" }}>Launch Feedback Portal</span>
                <ArrowRight className="size-5 group-hover:translate-x-2 transition-transform" />
             </motion.div>
          </motion.div>
        </div> */}

        {/* Info Footer with 3D Pop-up items */}
        <div className="mt-24 pt-16 border-t border-black/5 grid grid-cols-1 md:grid-cols-3 gap-12" style={{ perspective: "1000px" }}>
          {[
            { icon: Info, title: "Lead Times", desc: "Production typically takes 12-14 business days after design approval." },
            { icon: Globe, title: "Global Reach", desc: "Delivery by air and sea freight." },
            { icon: ShieldCheck, title: "Quality Checked", desc: "Every batch is quality checked." }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              whileHover={{ translateZ: 30, y: -5 }}
              className="flex gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-[32px] border border-black/5 shadow-sm hover:shadow-md transition-all cursor-default"
              style={{ transformStyle: "preserve-3d" }}
            >
              <item.icon className="size-5 text-[#fabf37] shrink-0" style={{ transform: "translateZ(15px)" }} />
              <div className="space-y-1" style={{ transform: "translateZ(10px)" }}>
                <p className="text-[11px] font-black uppercase tracking-tight">{item.title}</p>
                <p className="text-[10px] font-bold text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}