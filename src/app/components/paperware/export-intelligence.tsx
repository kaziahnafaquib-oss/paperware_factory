import { toast } from "sonner";
import React, { useRef, useEffect } from "react";
import { openWhatsAppInquiry, INQUIRY_HANDOFF_TITLE, INQUIRY_HANDOFF_BODY } from "../../lib/inquiry";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "motion/react";
import { 
  Globe, Ship, Handshake, ArrowRight, Mail, ShieldCheck, TrendingUp,
  Leaf, Search, Check, Box, Plane, Truck
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import bangladeshFlagImage from 'figma:asset/ce6bea61e31dd50e8cbf06060db17726c1c41f3a.webp';
import paperwareShippingImage from 'figma:asset/19e5679ad58f7a50390ebe911dd3186e6a891ce7.webp';

// --- 3D Tilt Component with Glare - REDUCED ROTATION FOR SMOOTH EXPERIENCE ---
const TiltCard = ({ children, className = "", glare = true }: { children: React.ReactNode; className?: string, glare?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 150, damping: 25 }); 
  const mouseY = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  // Glare effect values
  const glareX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseX, [-0.5, 0.5], [0, 0.2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="h-full w-full relative z-10">
         {children}
      </div>
      
      {/* Dynamic Glare Overlay */}
      {glare && (
        <motion.div 
            className="absolute inset-0 z-20 pointer-events-none rounded-[inherit] mix-blend-overlay"
            style={{
                background: useTransform(
                    [glareX, glareY],
                    ([gx, gy]) => `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.6) 0%, transparent 50%)`
                ),
                opacity: glareOpacity
            }}
        />
      )}
    </motion.div>
  );
};

export function ExportIntelligence() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Scroll Effects
  const headerY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const headerRotateX = useTransform(scrollYProgress, [0, 0.4], [0, 45]); // 3D Tilt back on scroll
  const headerOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  
  const { scrollY } = useScroll();
  const rotateGlobal = useTransform(scrollYProgress, [0, 1], [0, 720]);
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -720]);
  
  // Enhanced Parallax for floating shapes
  const shapeY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const shapeY2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const shapeZ = useTransform(scrollYProgress, [0, 0.5, 1], [0, 100, 0]);

  // Text Parallax Depth
  const textShadowY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  const flagY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const stampRotate = useTransform(scrollYProgress, [0, 0.3], [-12, -25]);

  // REMOVED: Mouse position for global tilt - was causing glitch
  // Now only scroll-based animations for smooth experience

  return (
    <section ref={containerRef} className="bg-white min-h-screen pt-32 pb-24 overflow-hidden relative">
      
      {/* REMOVED: Global scene rotation wrapper - was conflicting with TiltCard */}
      <div className="w-full h-full">{/* Background Scroll Decorative Elements - Enhanced 3D */}
      <motion.div 
        style={{ rotateX: rotateGlobal, rotateY: rotateGlobal, y: shapeY1, x: -100, z: shapeZ }} 
        className="absolute top-20 left-0 text-zinc-100 pointer-events-none z-0 transform-gpu"
      >
         <Box className="size-[400px] opacity-40" strokeWidth={0.5} />
      </motion.div>
      <motion.div 
        style={{ rotateX: rotateReverse, rotateY: rotateGlobal, y: shapeY2, x: 100 }} 
        className="absolute bottom-1/3 right-0 text-zinc-100 pointer-events-none z-0 transform-gpu"
      >
         <Box className="size-[300px] opacity-40" strokeWidth={0.5} />
      </motion.div>
      <motion.div 
        style={{ rotateZ: rotateGlobal, rotateX: 45, y: shapeY1, z: -100 }} 
        className="absolute top-1/2 left-1/4 text-zinc-50 pointer-events-none z-0 transform-gpu"
      >
         <Globe className="size-[600px] opacity-30" strokeWidth={0.2} />
      </motion.div>
      
      {/* Floating Particles in 3D Space */}
      <motion.div 
          style={{ 
              x: useTransform(scrollYProgress, [0, 1], [0, -200]), 
              y: useTransform(scrollYProgress, [0, 1], [0, 50]),
          }} 
          className="absolute top-32 right-[-5%] md:right-10 w-64 md:w-96 pointer-events-none z-10 opacity-80"
       >
          <img loading="lazy" decoding="async" 
            src="https://images.unsplash.com/photo-1766945206843-eac0b1aa0343?q=80&w=1080&auto=format&fit=crop" 
            alt="Cargo Ship Logistics" 
            className="w-full h-auto object-contain drop-shadow-2xl mix-blend-multiply"
          />
       </motion.div>

      {[...Array(5)].map((_, i) => (
        <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply pointer-events-none z-0"
            style={{
                background: i % 2 === 0 ? "#fabf37" : "#006a4e",
                width: 10 + i * 5,
                height: 10 + i * 5,
                left: `${10 + i * 20}%`,
                top: `${20 + i * 15}%`,
                opacity: 0.1,
                z: useTransform(scrollYProgress, [0, 1], [0, 200 * (i % 2 === 0 ? 1 : -1)])
            }}
            animate={{
                y: [0, -30, 0],
                rotateX: [0, 180, 360],
                rotateY: [0, 180, 360],
            }}
            transition={{
                duration: 5 + i,
                repeat: Infinity,
                ease: "linear"
            }}
        />
      ))}

      {/* 3D Floor Grid - Infinite Scrolling */}
      <motion.div 
          className="absolute bottom-0 left-[-50%] right-[-50%] h-[100vh] origin-bottom z-0 pointer-events-none opacity-20"
          style={{ 
              rotateX: 60, 
              background: "linear-gradient(transparent 0%, white 40%, transparent 100%), linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(0deg, transparent 0%, rgba(0,0,0,0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 60px 60px, 60px 60px",
              y: useTransform(scrollYProgress, [0, 1], [0, 200])
          }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section with Parallax Fade & 3D Tilt */}
        <motion.div 
            style={{ y: headerY, opacity: headerOpacity, rotateX: headerRotateX }}
            className="max-w-4xl mx-auto text-center space-y-8 mb-24 relative z-10 origin-top"
        >
          <motion.div 
            initial={{ opacity: 0, y: -30, rotateX: 90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-[#fabf37] rounded-full text-[10px] font-black uppercase tracking-widest relative overflow-hidden group shadow-2xl"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fabf37]/50 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
            <Globe className="size-3 relative z-10 animate-spin-slow" />
            <span className="relative z-10">Global Trade Ready</span>
          </motion.div>
          
          <div className="perspective-[1000px]">
            <div className="relative perspective-[600px] group">
              {/* Intro Text */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl md:text-4xl font-bold text-zinc-400 tracking-[0.2em] uppercase mb-2 md:mb-6"
              >
                Source Premium Packaging
              </motion.h2>

              {/* Main Composition */}
              <div className="relative inline-block mt-4 md:mt-8 md:-ml-24">
                
                {/* 'FROM' Stamp - Styled like a cargo stamp */}
                <motion.div 
                  initial={{ scale: 2, opacity: 0, rotate: -45, z: 100 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12, z: 0 }}
                  style={{ rotate: stampRotate }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.3 }}
                  className="absolute -top-6 -left-4 md:-top-12 md:-left-12 bg-[#fabf37] text-black font-black text-xl md:text-4xl px-4 py-1 md:px-6 md:py-2 border-4 border-black shadow-[8px_8px_0px_rgba(0,0,0,1)] z-30 transform-gpu"
                >
                  FROM
                </motion.div>

                {/* Massive BANGLADESH Text - TRUE 3D STACK */}
                <div aria-hidden="true" className="relative z-10 perspective-[500px] preserve-3d group hover:scale-105 transition-transform duration-700">
                   {/* Stacked layers for 3D depth */}
                   {[...Array(8)].map((_, i) => (
                     <motion.p 
                        key={i}
                        initial={{ opacity: 0, z: -100 }}
                        animate={{ opacity: 1, z: -i * 4 }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.8, type: "spring" }}
                        className="absolute top-0 left-0 text-[10vw] md:text-[120px] leading-[0.8] font-black tracking-tighter select-none pointer-events-none"
                        style={{ 
                            color: `hsl(0, 0%, ${Math.max(10, 20 - i * 2)}%)`, // Gradient darkness
                            textShadow: 'none',
                            zIndex: -i
                        }}
                     >
                       BANGLADESH
                     </motion.p>
                   ))}
                   
                   <motion.p 
                     initial={{ opacity: 0, scale: 1.5, z: 100 }}
                     animate={{ opacity: 1, scale: 1, z: 10 }}
                     transition={{ delay: 0.2, duration: 1, type: "spring", bounce: 0.4 }}
                     className="text-[10vw] md:text-[120px] leading-[0.8] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#006a4e] via-[#004e39] to-black drop-shadow-2xl select-none relative z-10"
                     style={{ transformStyle: "preserve-3d", WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}
                   >
                     BANGLADESH
                   </motion.p>
                   
                   {/* Depth Shadow Layer - Moves differently on scroll */}
                   <motion.p 
                     style={{ y: textShadowY, x: textShadowY, opacity: useTransform(scrollYProgress, [0, 0.5], [0.5, 0]) }}
                     className="absolute top-0 left-0 text-[10vw] md:text-[120px] leading-[0.8] font-black tracking-tighter text-zinc-200/50 -z-20 blur-sm translate-x-2 translate-y-2 md:translate-x-4 md:translate-y-4"
                   >
                     BANGLADESH
                   </motion.p>
                </div>

                {/* Floating 3D Paper Sheets */}
                <motion.div 
                    className="absolute -top-20 right-0 w-24 h-32 bg-white shadow-xl rotate-12 z-0 opacity-80"
                    style={{ 
                        rotateX: useTransform(scrollYProgress, [0, 1], [0, 180]),
                        y: useTransform(scrollYProgress, [0, 1], [0, -100]),
                        z: -50
                    }}
                />


                {/* Animated Flag Bearer - Positioned securely within view */}
                <motion.div
                  initial={{ opacity: 0, x: 50, scale: 0.8 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  style={{ y: flagY }}
                  transition={{ 
                    delay: 0.6, 
                    type: "spring", 
                    stiffness: 200,
                    damping: 15
                  }}
                  className="absolute -right-8 md:-right-24 bottom-0 z-40 h-[100%] md:h-[130%] w-auto flex items-end pointer-events-none perspective-[1000px]"
                >
                   <motion.img loading="lazy" decoding="async" 
                      src={bangladeshFlagImage} 
                      alt="Bangladesh Flag Bearer"
                      animate={{ 
                          y: [0, -15, 0],
                          rotateZ: [0, 2, 0],
                          rotateX: [0, 5, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                      className="h-full w-auto object-contain drop-shadow-2xl origin-bottom transform-gpu"
                   />
                </motion.div>

                {/* Floating Particles for atmosphere */}
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute top-0 right-[20%] w-3 h-3 md:w-6 md:h-6 bg-[#006a4e] rounded-full blur-md z-20"
                />
                 <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                  className="absolute bottom-4 left-[30%] w-2 h-2 md:w-4 md:h-4 bg-[#f42a41] rounded-full blur-sm z-20"
                />
              </div>
            </div>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, z: -50 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-xl font-medium text-zinc-500 max-w-2xl mx-auto leading-relaxed"
          >
            We are equipped and ready to export high-quality, sustainable paper solutions to international markets.
          </motion.p>
        </motion.div>

        {/* Hero Visual Section - 3D Layout with Parallax Image */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-32">
            
            {/* 3D Parallax Image - Isolated without TiltCard */}
            <div className="relative isolate">
                <HeroImageParallax />
            </div>

            {/* Why Import From Us - Staggered Scroll Cards */}
            <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Leaf, title: "Sustainable", desc: "Responsibly sourced" },
                  { icon: Search, title: "Quality", desc: "A+ Grade Index" },
                  { icon: ShieldCheck, title: "Eco-First", desc: "Zero Waste Vision" },
                  { icon: Check, title: "Precision", desc: "Automated Lines" }
                ].map((item, i) => (
                   <ScrollRevealCard key={i} index={i} item={item} />
                ))}
            </div>
        </div>

        {/* Infinite Scrolling Transport Banner - Ship, Plane, Truck */}
        <div className="mb-20 overflow-hidden">
            <div className="relative bg-gradient-to-r from-black via-zinc-900 to-black py-8 -mx-4 md:-mx-12">
                {/* Top Yellow Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#fabf37]" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#fabf37]" />
                
                <motion.div
                    animate={{ x: [0, -1920] }}
                    transition={{ 
                        duration: 30, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="flex items-center gap-16 whitespace-nowrap"
                >
                    {/* Repeat items 4 times for seamless loop */}
                    {[...Array(4)].map((_, groupIndex) => (
                        <div key={groupIndex} className="contents">
                            {/* Ship */}
                            <div className="flex items-center gap-6">
                                <Ship className="size-12 text-[#fabf37]" strokeWidth={1.5} />
                                <span className="text-white font-black uppercase tracking-[0.3em] text-sm">Sea Freight</span>
                            </div>
                            
                            {/* Separator Dot */}
                            <div className="size-2 rounded-full bg-[#fabf37]/50" />
                            
                            {/* Plane */}
                            <div className="flex items-center gap-6">
                                <Plane className="size-12 text-[#fabf37]" strokeWidth={1.5} />
                                <span className="text-white font-black uppercase tracking-[0.3em] text-sm">Air Cargo</span>
                            </div>
                            
                            {/* Separator Dot */}
                            <div className="size-2 rounded-full bg-[#fabf37]/50" />
                            
                            {/* Truck */}
                            <div className="flex items-center gap-6">
                                <Truck className="size-12 text-[#fabf37]" strokeWidth={1.5} />
                                <span className="text-white font-black uppercase tracking-[0.3em] text-sm">Land Transport</span>
                            </div>
                            
                            {/* Separator Dot */}
                            <div className="size-2 rounded-full bg-[#fabf37]/50" />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>


        {/* Contact / CTA Section - Floating 3D */}
        <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            viewport={{ once: true }}
            className="relative"
        >
             {/* 3D Floating Elements behind CTA */}
             <motion.div style={{ rotate: rotateGlobal }} className="absolute -top-12 -left-12 text-[#fabf37] opacity-50 z-0">
                <Box className="size-24" strokeWidth={1} />
             </motion.div>
             <motion.div style={{ rotate: rotateReverse }} className="absolute -bottom-8 -right-8 text-black opacity-10 z-0">
                <Globe className="size-32" strokeWidth={1} />
             </motion.div>

            <div className="bg-zinc-50/80 backdrop-blur-3xl rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden border border-white/50 shadow-[0_40px_80px_rgba(0,0,0,0.1)] z-10">
                <div className="relative z-10 max-w-3xl mx-auto space-y-10">
                    <motion.div 
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", bounce: 0.5, delay: 0.1, duration: 0.4 }}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        className="size-24 bg-black rounded-[30px] flex items-center justify-center text-[#fabf37] mx-auto shadow-2xl cursor-pointer transition-colors duration-300 hover:bg-[#fabf37] hover:text-black"
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                        >
                            <Handshake className="size-12" />
                        </motion.div>
                    </motion.div>
                    
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-black">
                            Let's Build a <span className="inline-block relative">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-black to-zinc-500 relative z-10">Partnership</span>
                                <motion.span 
                                    className="absolute -bottom-2 left-0 right-0 h-4 bg-[#fabf37]/30 -skew-x-12 -z-10"
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                />
                            </span>
                        </h2>
                        <motion.p 
                            className="text-zinc-500 text-lg font-bold max-w-lg mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            Interested in importing our products? We are ready to discuss catalog, pricing, and shipping logistics.
                        </motion.p>
                    </div>

                    <form className="bg-white p-3 rounded-[40px] border border-zinc-100 flex flex-col md:flex-row gap-3 max-w-xl mx-auto shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 group">
                        <input 
                            type="email" 
                            placeholder="Enter your business email..." 
                            className="flex-1 bg-transparent border-none text-black placeholder:text-zinc-400 px-8 py-4 focus:outline-none font-bold text-lg"
                        />
                        <motion.button 
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                // Phase A0: hand the email to WhatsApp instead of a fake "we'll contact you" alert.
                                const form = e.currentTarget.closest("form");
                                const email = (form?.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? "";
                                openWhatsAppInquiry("Export team contact request", { "Business email": email });
                                toast.info(INQUIRY_HANDOFF_TITLE, { description: INQUIRY_HANDOFF_BODY, duration: 12000 });
                            }}
                            className="px-10 py-5 bg-black text-[#fabf37] rounded-[32px] font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-colors flex items-center justify-center gap-3 shadow-lg relative overflow-hidden"
                        >
                            <motion.div
                                className="absolute inset-0 bg-white/20"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.5 }}
                            />
                            <span className="relative z-10">Knock Us</span>
                            <ArrowRight className="size-5 relative z-10" />
                        </motion.button>
                    </form>

                    <div className="flex items-center justify-center gap-8 pt-8 opacity-60 text-black">
                        <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-2 cursor-pointer transition-colors hover:text-[#fabf37]"
                        >
                            <Mail className="size-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">paperwarefactory@gmail.com</span>
                        </motion.div>
                        <div className="h-4 w-px bg-black/20" />
                        <div className="flex items-center gap-2">
                            <Ship className="size-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">MOQ: 10,000 Units</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>

      </div>
      </div>
    </section>
  );
}

// Sub-component for Hero Image Parallax to keep main component clean
function HeroImageParallax() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Enhanced 3D Scroll Effects
    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);
    const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]); // Seesaw effect

    return (
        <motion.div 
            ref={ref}
            initial={{ opacity: 0, rotateY: -30, x: -50 }}
            whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", stiffness: 60 }}
            style={{ rotateX, transformStyle: "preserve-3d" }}
            className="relative rounded-[60px] overflow-hidden aspect-square lg:aspect-[4/3] shadow-[0_30px_60px_rgba(0,0,0,0.2)] bg-white h-full"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent z-10 pointer-events-none" />
            
            <motion.div style={{ y, scale }} className="w-full h-full">
                <img loading="lazy" decoding="async" 
                    src={paperwareShippingImage} 
                    alt="Paperware Export Ready - Shipping Container Port" 
                    className="w-full h-full object-cover"
                />
            </motion.div>
            
            {/* Floating 3D Badge */}
            <motion.div 
                style={{ transform: "translateZ(80px)" }}
                className="absolute bottom-12 left-12 z-30 bg-white/90 backdrop-blur-xl px-8 py-6 rounded-3xl shadow-2xl border border-white/50"
            >
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">Export Status</p>
                <div className="flex items-center gap-3">
                    <span className="relative flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                    </span>
                    <span className="font-black text-black text-lg">Open for Partnership</span>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Sub-component for Scroll Reveal Cards - Smooth scroll animation only
function ScrollRevealCard({ index, item }: { index: number, item: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"]
    });

    // Reduced rotation for smooth experience
    const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
    const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -3 : 3, 0]);

    return (
        <motion.div 
            ref={ref}
            style={{ y, rotateX: rotate, opacity: scrollYProgress, transformStyle: "preserve-3d" }}
            initial="rest"
            whileHover="hover"
            animate="rest"
            className="aspect-square bg-white rounded-[40px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-zinc-100 p-8 flex flex-col items-center justify-center text-center gap-4 group h-full hover:shadow-2xl transition-shadow relative"
        >
            {/* Floating Icon - Explodes on Hover */}
            <motion.div 
                variants={{
                    rest: { scale: 1, rotateZ: 0 },
                    hover: { scale: 1.1, rotateZ: -5 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="size-16 rounded-2xl bg-zinc-50 border-2 border-[#fabf37] flex items-center justify-center text-[#fabf37] group-hover:bg-[#fabf37] group-hover:text-black transition-colors duration-300 shadow-lg"
            >
                <item.icon className="size-8" strokeWidth={2} />
            </motion.div>
            
            {/* Floating Text - Moves independently */}
            <motion.div 
                variants={{
                    rest: { y: 0 },
                    hover: { y: -5 }
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
            >
                <h4 className="text-xl font-black text-black uppercase tracking-tight leading-tight mb-1">
                {item.title}
                </h4>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                {item.desc}
                </p>
            </motion.div>

            {/* Hidden depth layer */}
            <motion.div 
                className="absolute inset-0 border-2 border-[#fabf37]/0 rounded-[40px] pointer-events-none"
                variants={{
                    rest: { borderColor: "rgba(250, 191, 55, 0)" },
                    hover: { borderColor: "rgba(250, 191, 55, 0.5)" }
                }}
            />
        </motion.div>
    );
}