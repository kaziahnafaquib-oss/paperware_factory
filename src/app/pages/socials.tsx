import image_8788d2f066ca9921baf05e502ac560c2c717da5a from 'figma:asset/8788d2f066ca9921baf05e502ac560c2c717da5a.webp';
import React from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Facebook, Instagram, Linkedin, Globe, ArrowRight, Music2, Share2, Smartphone, QrCode, Factory, Zap, TrendingUp, Users, Sparkles, Map, Activity, MessageSquareQuote, Radio } from "lucide-react";
import mainLogo from "figma:asset/195a383e60328bb286c8bb694dbc23dfe8f65ab6.webp";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Optimized sub-component to reduce re-renders
const SocialCard = React.memo(({ post, i }: { post: any, i: number }) => {
  const { t } = useLanguage();
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="inline-block w-[280px] sm:w-[360px] md:w-[420px] shrink-0 bg-white border border-black/5 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-sm group hover:border-[#fabf37] hover:shadow-2xl hover:shadow-black/5 transition-all duration-500 cursor-pointer will-change-transform"
    >
      <div className="h-48 sm:h-64 md:h-72 relative overflow-hidden bg-zinc-100">
        <ImageWithFallback 
          src={`${post.image}&auto=format&fit=crop&w=600&q=75`} 
          alt={post.platform} 
          className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute top-4 left-4 md:top-6 md:left-6 p-2 bg-black/80 backdrop-blur-md rounded-xl border border-white/10">
          <post.icon className="size-3.5 md:size-4 text-[#fabf37]" />
        </div>
      </div>
      <div className="p-6 md:p-10 space-y-4 md:space-y-6 whitespace-normal">
        <div className="flex items-center justify-between">
          <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-[#fabf37]">{post.platform}</p>
          <p className="text-[8px] md:text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{post.date}</p>
        </div>
        <p className="text-sm sm:text-lg md:text-xl font-bold text-zinc-800 leading-tight min-h-[40px] md:min-h-[56px]">
          {post.caption}
        </p>
        <div className="flex items-center gap-2 md:gap-3 pt-1 md:pt-2">
          <div className="size-1.5 md:size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400">{t('view_on_platform')}</span>
        </div>
      </div>
    </motion.div>
  );
});

SocialCard.displayName = "SocialCard";

export function SocialsPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { t } = useLanguage();
  const [activeTone, setActiveTone] = React.useState<'professional' | 'industrial' | 'creative'>('professional');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scrollVelocity = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Re-optimized Header Animation - Fades out completely BEFORE phone appears
  const headerScale = useTransform(scrollYProgress, [0, 0.12], [1.1, 1]); 
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0]); // GONE BY 0.14
  const headerY = useTransform(scrollYProgress, [0, 0.14], [0, -50]);
  
  // Phone Section Transforms - Optimized for "Full Visibility" as it enters
  const phoneScale = useTransform(scrollYProgress, [0.14, 0.28], [0.98, 1]); // Very slight scale for stability
  const phoneOpacity = useTransform(scrollYProgress, [0.14, 0.22], [0, 1]); 
  const phoneY = useTransform(scrollYProgress, [0.14, 0.3], [100, 0]);

  // Background Parallax
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  // 3D Phone Transforms based on scroll
  const phoneRotateX = useTransform(scrollYProgress, [0.4, 1], [15, -15]);
  const phoneRotateY = useTransform(scrollYProgress, [0.4, 1], [-10, 10]);

  const toneContent = {
    professional: {
      title: t('global_connectivity') || "Global Connectivity",
      subtitle: t('corp_updates_desc') || "Our official digital presence for corporate updates."
    },
    industrial: {
      title: t('stay_connected') || "Stay Connected",
      subtitle: t('factory_updates_desc') || "Get the latest from our high-tech paper factory floors."
    },
    creative: {
      title: t('design_vibes') || "Design & Vibes",
      subtitle: t('explore_art_desc') || "Explore the art of sustainable packaging with us."
    }
  };

  const socialLinks = [
    {
      name: "Paperware Factory",
      handle: "facebook.com/paperwarefactory",
      url: "https://www.facebook.com/paperwarefactory",
      icon: Facebook,
      color: "hover:bg-[#1877F2]/10"
    },
    {
      name: "Paperware Factory",
      handle: "instagram.com/paperware_factory",
      url: "https://www.instagram.com/paperware_factory/",
      icon: Instagram,
      color: "hover:bg-[#E4405F]/10"
    },
    {
      name: "Paperware Factory",
      handle: "linkedin.com/company/paperwarefactory",
      url: "https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true",
      icon: Linkedin,
      color: "hover:bg-[#0A66C2]/10"
    },
    {
      name: "Paperware Factory",
      handle: "tiktok.com/@paperwarefactory",
      url: "http://tiktok.com/paperwarefactory",
      icon: Music2,
      color: "hover:bg-black/5"
    },
    {
      name: "Paperware Factory",
      handle: "www.paperwarefactory.com",
      url: "https://www.paperwarefactory.com",
      icon: Globe,
      color: "hover:bg-[#fabf37]/10"
    }
  ];

  const locations = [
    { city: "Dhaka", count: "12k" },
    { city: "Berlin", count: "8k" },
    { city: "Dubai", count: "15k" },
    { city: "Tokyo", count: "5k" }
  ];

  const recentPosts = [
    {
      platform: "Instagram",
      icon: Instagram,
      image: "https://images.unsplash.com/photo-1721745250213-c3e1a2f4eeeb?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600",
      caption: "Our new automated paper rolling system is live! Efficiency increased by 40%.",
      date: "2 HOURS AGO"
    },
    {
      platform: "Facebook",
      icon: Facebook,
      image: "https://images.unsplash.com/photo-1761034278174-bf8d69530182?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600",
      caption: "Sunrise at the Trimohoni plant. Sustainable packaging starts with a vision.",
      date: "5 HOURS AGO"
    },
    {
      platform: "LinkedIn",
      icon: Linkedin,
      image: "https://images.unsplash.com/photo-1753758541974-e9e1d66cfbd9?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600",
      caption: "Honored to be recognized for our eco-friendly packaging designs 2024.",
      date: "1 DAY AGO"
    },
    {
      platform: "TikTok",
      icon: Music2,
      image: "https://images.unsplash.com/photo-1721937127582-ed331de95a04?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600",
      caption: "Unboxing our new premium matte finish boxes. The texture is everything! ✨",
      date: "3 HOURS AGO"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-zinc-50 min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden pt-32 md:pt-40">
      
      {/* Background Decor */}
      <motion.div 
        style={{ y: bgY, scale: bgScale }}
        className="fixed inset-0 pointer-events-none opacity-[0.04] grayscale -z-20"
      >
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1758440519640-7234ba375d2e?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=1600"
          alt="texture"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* NEW HERO SECTION: High Visibility Stay Connected */}
      <div className="relative w-full overflow-x-hidden">
        {/* Initial Hero - Visible on load */}
        <div className="h-screen w-full flex items-center justify-center overflow-hidden bg-[#f8f9fa] relative z-50">
          <motion.div 
            style={{ 
              scale: headerScale,
              opacity: headerOpacity,
              y: headerY,
              position: "fixed",
              top: "45%",
              left: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
              translateY: "-50%"
            }}
            className="text-center px-4 w-full"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTone}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: "circOut" }}
              >
                <h1 className="text-6xl sm:text-8xl md:text-[140px] font-[1000] uppercase tracking-tighter leading-[0.8] text-black">
                  {toneContent[activeTone].title.split(' ').map((word, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className={`block ${i === 1 ? 'text-[#fabf37]' : ''}`}
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait">
              <motion.p 
                key={activeTone}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-zinc-400 font-bold text-[10px] sm:text-lg md:text-xl uppercase tracking-[0.3em] sm:tracking-[0.5em] mt-8 sm:mt-12 max-w-[300px] sm:max-w-3xl mx-auto leading-relaxed"
              >
                {toneContent[activeTone].subtitle}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] -z-10" />
          
          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t('scroll_to_connect') || "Scroll to Connect"}</span>
            <div className="w-px h-12 bg-zinc-200 overflow-hidden">
              <motion.div 
                animate={{ y: [0, 48] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-full h-1/2 bg-[#fabf37]"
              />
            </div>
          </motion.div>
        </div>

        {/* Content Section that reveals as we scroll */}
        <div className="relative z-10 container mx-auto px-4 max-w-7xl pt-10 sm:pt-32">
          <div className="flex flex-col items-center justify-center min-h-screen">
            
            {/* Tone Switcher - Floating on top of the phone section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-center mx-auto mb-8 sm:mb-12 p-1.5 bg-white/60 backdrop-blur-xl rounded-2xl border border-black/5 z-40 w-full max-w-[340px] sm:max-w-none shadow-2xl shadow-black/5"
            >
              <div className="flex gap-1 w-full overflow-x-auto no-scrollbar">
                {[
                  { id: 'professional', label: t('professional') || "Professional", icon: Activity },
                  { id: 'industrial', label: t('industrial') || "Industrial", icon: Factory },
                  { id: 'creative', label: t('creative') || "Creative", icon: Sparkles }
                ].map((tone) => (
                  <motion.button
                    key={tone.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTone(tone.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 px-3 sm:px-8 py-2.5 sm:py-3 rounded-xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                      activeTone === tone.id 
                      ? 'bg-black text-[#fabf37] shadow-xl ring-4 ring-black/5' 
                      : 'text-zinc-500 hover:text-black hover:bg-black/5'
                    }`}
                  >
                    <motion.div
                      animate={activeTone === tone.id ? { rotate: [0, 15, -15, 0] } : {}}
                      transition={{ duration: 0.5, repeat: activeTone === tone.id ? Infinity : 0, repeatDelay: 2 }}
                    >
                      <tone.icon className={`size-3 sm:size-4 transition-colors ${activeTone === tone.id ? 'text-[#fabf37]' : 'text-zinc-400'}`} />
                    </motion.div>
                    {tone.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Main Layout: Phone + Side Cards */}
            <motion.div 
              style={{ 
                scale: phoneScale,
                opacity: phoneOpacity,
                y: phoneY
              }}
              className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-12 lg:gap-20 mb-20 sm:mb-32"
            >
              
              {/* Left Column (Visible on Tablet+) */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="hidden sm:flex lg:flex flex-col gap-6 w-full max-w-xs lg:w-80"
              >
                <div className="bg-white p-8 md:p-10 rounded-[40px] md:rounded-[48px] border border-black/5 shadow-2xl space-y-6 md:space-y-8 relative overflow-hidden group">
                  <div className="absolute -top-6 -right-6 p-4 opacity-5 group-hover:rotate-45 transition-transform duration-1000">
                    <QrCode className="size-32" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="size-3 text-[#fabf37]" />
                      <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">{t('smart_connect') || "Smart Connect"}</h4>
                    </div>
                    <p className="font-black text-2xl leading-[0.9]">{t('scan_to_explore') || "SCAN TO EXPLORE"}</p>
                  </div>
                  <div className="aspect-square bg-zinc-50 rounded-[28px] md:rounded-[32px] flex items-center justify-center p-6 border border-dashed border-zinc-200 group-hover:border-[#fabf37] transition-colors">
                    <ImageWithFallback 
                      src="https://images.unsplash.com/photo-1664727303928-8182653d4e6d?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=400" 
                      alt="QR Code"
                      className="size-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="bg-black p-8 md:p-10 rounded-[40px] md:rounded-[48px] text-white flex items-center justify-between lg:flex-col lg:items-start lg:justify-start lg:space-y-6 relative overflow-hidden">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-0 right-0 w-32 h-32 bg-[#fabf37]/20 blur-3xl rounded-full" 
                  />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    <Activity className="size-8 text-[#fabf37]" />
                  </motion.div>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-4xl md:text-5xl font-black italic leading-none tracking-tighter"
                      >
                        50K+
                      </motion.p>
                      <motion.span 
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] text-emerald-500 font-black"
                      >
                        +12%
                      </motion.span>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mt-2">{t('connections') || "Connections"}</p>
                  </div>
                </div>
              </motion.div>

              {/* Phone Mockup (Center) - Fixed shake by nesting animations */}
              <div className="perspective-2000 py-10 sm:py-20 relative w-full max-w-[340px] mx-auto">
                {/* Scroll Rotator: Handles 3D rotation based on scroll */}
                <motion.div 
                  style={{ 
                    rotateX: phoneRotateX,
                    rotateY: phoneRotateY,
                    transformStyle: "preserve-3d"
                  }}
                  className="relative w-full"
                >
                  {/* Floating Animator: Handles continuous gentle motion */}
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotateZ: [0, 1, 0, -1, 0]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* iPhone Mockup Frame - Restored to Black Outline */}
                    <div className="relative aspect-[340/680] w-full bg-white rounded-[50px] sm:rounded-[65px] border-[10px] sm:border-[14px] border-black shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden">
                      {/* Dynamic Island */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90px] h-[32px] bg-black rounded-b-3xl z-20" />
                      
                      {/* Content Inside Phone */}
                      <div className="h-full w-full bg-white flex flex-col pt-16 sm:pt-20 pb-8 px-6 space-y-8 relative overflow-y-auto no-scrollbar">
                        <div className="text-center space-y-3 relative z-10">
                          <motion.div 
                            whileHover={{ scale: 1.05 }}
                            className="size-20 rounded-3xl bg-[#fdf2d7] mx-auto flex items-center justify-center border border-[#fabf37]/20 shadow-sm"
                          >
                            <img loading="lazy" decoding="async" src={image_8788d2f066ca9921baf05e502ac560c2c717da5a} alt="Small Logo" className="size-14 object-contain" />
                          </motion.div>
                          <h3 className="font-black text-2xl tracking-tight text-zinc-900">Paperware</h3>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">{t('verified_hub') || "Verified Hub"}</p>
                          </div>
                        </div>

                        <div className="space-y-4 relative z-10 text-[rgb(0,0,0)]">
                          {socialLinks.map((link, idx) => (
                            <motion.a
                              key={idx}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + idx * 0.1 }}
                              whileHover={{ y: -4, scale: 1.02, backgroundColor: "#fdf2d7" }}
                              className="flex items-center gap-4 p-5 bg-white border border-zinc-100 rounded-[24px] shadow-sm hover:shadow-md hover:border-[#fabf37]/30 transition-all group"
                            >
                              <div className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-[#fabf37] group-hover:text-black transition-colors">
                                <link.icon className="size-6" />
                              </div>
                              <div className="flex-1 text-left">
                                <p className="text-[11px] font-black uppercase tracking-tight text-zinc-800 leading-none mb-1">{link.name}</p>
                                <p className="text-[9px] font-bold text-zinc-400 truncate">{link.handle}</p>
                              </div>
                              <ArrowRight className="size-4 text-zinc-200 group-hover:text-black transition-colors" />
                            </motion.a>
                          ))}
                        </div>

                        <div className="mt-auto text-center pt-8 border-t border-zinc-50">
                          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">www.paperwarefactory.com</p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Glow behind phone for visibility */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#fabf37]/5 blur-[120px] -z-10" />
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Column (Visible on Tablet+) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="hidden sm:flex lg:flex flex-col gap-6 w-full max-w-xs lg:w-80"
              >
                <div className="bg-[#fabf37] p-8 md:p-10 rounded-[40px] md:rounded-[48px] border-2 border-black shadow-2xl space-y-6 md:space-y-8 flex flex-col justify-between h-[300px] md:h-[360px] group relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-150 transition-transform duration-1000">
                    <Zap className="size-48 text-black fill-current" />
                  </div>
                  <div className="flex justify-between items-start">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Zap className="size-10 md:size-12 text-black fill-current" />
                    </motion.div>
                    <div className="px-3 py-1 bg-black text-[#fabf37] text-[8px] font-black rounded-full uppercase">Update</div>
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-black text-2xl md:text-3xl uppercase tracking-tighter leading-none mb-4">The <br /> Future <br /> Now</h4>
                    <div className="flex items-center gap-3 group/btn cursor-pointer">
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest border-b-2 border-black">Reels</span>
                      <ArrowRight className="size-4 group-hover/btn:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-10 rounded-[40px] md:rounded-[48px] border border-black/5 shadow-2xl space-y-6">
                  <div className="flex items-center justify-between">
                    <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Network</h5>
                    <Map className="size-4 text-zinc-300" />
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    {locations.map((loc, i) => (
                      <div key={i} className="flex items-center justify-between group cursor-default">
                        <p className="text-[10px] md:text-[11px] font-black text-black group-hover:text-[#fabf37] transition-colors">{loc.city}</p>
                        <div className="flex-1 border-b border-zinc-100 mx-2 md:mx-4 border-dotted" />
                        <p className="text-[9px] md:text-[10px] font-bold text-zinc-400">{loc.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* New Feature: Infinite Social Posts Ticker */}
            <div className="w-full relative overflow-hidden py-16 md:py-24 bg-[#fcfcfc] border-y border-black/5">
              <div className="flex flex-col gap-8 md:gap-12">
                
                {/* Industrial Scrolling Ticker Moved Here */}
                <div className="w-full bg-black py-3 border-y border-[#fabf37]/30 overflow-hidden whitespace-nowrap mb-8">
                  <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="flex gap-12 items-center"
                  >
                    {[...Array(8)].map((_, i) => (
                      <div key={i} className="flex gap-8 items-center text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">
                        <span className="flex items-center gap-2"><Factory className="size-3" /> {t('production_live') || "Production Live"}</span>
                        <span className="flex items-center gap-2"><Users className="size-3" /> {t('social_community') || "50K+ Community"}</span>
                        <span className="flex items-center gap-2"><Zap className="size-3" /> {t('new_reel') || "New Sustainability Reel"}</span>
                        <span className="text-zinc-700">•</span>
                      </div>
                    ))}
                  </motion.div>
                </div>

                <div className="container mx-auto px-4">
                  <div className="flex flex-col items-center md:items-end text-center md:text-right pr-0 md:pr-12">
                    <div className="size-10 md:size-12 rounded-full bg-black flex items-center justify-center mb-4 md:mb-6 shadow-xl">
                      <Radio className="size-5 md:size-6 text-[#fabf37] animate-pulse" />
                    </div>
                    
                    <h3 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                      Live <span className="text-[#fabf37]">Social</span>
                    </h3>
                    
                    <p className="text-[9px] md:text-xs font-black uppercase tracking-[0.3em] text-zinc-400 mt-3 md:mt-4">
                      {t('real_time_factory_updates') || "Real-time updates from our factory hub"}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-6 md:mt-8 w-full justify-center md:justify-end">
                      <div className="h-px flex-1 bg-zinc-100 max-w-[100px] md:max-w-md" />
                      <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Global Feed v2.0</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex overflow-hidden relative">
                  <motion.div 
                    animate={{ x: [0, -2000] }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="flex gap-6 md:gap-10 px-4 md:px-10"
                    whileHover={{ animationPlayState: "paused" }}
                  >
                    {[...recentPosts, ...recentPosts, ...recentPosts, ...recentPosts].map((post, i) => (
                      <SocialCard key={i} post={post} i={i} />
                    ))}
                  </motion.div>
                </div>
              </div>
            </div>

            {/* New Feature: AI Community Voices - Responsive Grid */}
            <div className="w-full bg-black rounded-[40px] md:rounded-[60px] p-8 md:p-16 relative overflow-hidden">
              <div className="absolute inset-0 opacity-20">
                <ImageWithFallback 
                  src="https://images.unsplash.com/photo-1554249906-53d1582266b4?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=1600"
                  alt="map"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative z-10 flex flex-col items-center text-center space-y-12">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-4"
                >
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">Global <span className="text-[#fabf37]">Feedback</span> Hub</h2>
                  <p className="text-zinc-500 font-bold max-w-xl mx-auto italic">"What our global B2B community says about Paperware factory's digital journey."</p>
                </motion.div>

                <motion.div 
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.15 }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
                >
                  {[
                    { name: "Ahmed R.", role: "CEO, EcoPack", text: "The transparency through their socials is unmatched." },
                    { name: "S. Tanaka", role: "Supply Head", text: "Industrial yellow never looked this professional." },
                    { name: "Elena V.", role: "Creative Dir.", text: "Their 3D previews on Instagram are a game changer." },
                    { name: "Marcus K.", role: "Sustainability Expert", text: "True leaders in paper packaging innovation." }
                  ].map((testimonial, i) => (
                    <motion.div 
                      key={i}
                      variants={{
                        hidden: { opacity: 0, y: 40, scale: 0.95 },
                        show: { opacity: 1, y: 0, scale: 1 }
                      }}
                      whileHover={{ scale: 1.05, y: -5, transition: { duration: 0.2 } }}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[32px] text-left space-y-4 group transition-colors hover:border-[#fabf37]/30"
                    >
                      <MessageSquareQuote className="size-6 text-[#fabf37] group-hover:scale-110 transition-transform" />
                      <p className="text-[12px] text-zinc-300 font-medium leading-relaxed">"{testimonial.text}"</p>
                      <div className="pt-4">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">{testimonial.name}</p>
                        <p className="text-[8px] font-bold text-zinc-500 uppercase">{testimonial.role}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Bottom Feature: Latest Updates Grid */}
            <div className="w-full space-y-12">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="size-3 rounded-full bg-[#fabf37] animate-ping" />
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Latest from <span className="text-[#fabf37]">Factory</span></h2>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hidden md:block">Scroll for more content</p>
              </motion.div>

              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {[
                  { img: "https://images.unsplash.com/photo-1748944078144-ab9efab63c92?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600", tag: "Process", title: "Sustainable Packaging 101" },
                  { img: "https://images.unsplash.com/photo-1694109016554-9a52bff4e9f1?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600", tag: "Design", title: "Minimalist Coffee Cups" },
                  { img: "https://images.unsplash.com/photo-1664727303928-8182653d4e6d?auto=format&crop=entropy&cs=tinysrgb&fit=max&q=80&w=600", tag: "Community", title: "Behind the Scenes at Trimohoni" }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    variants={{
                      hidden: { opacity: 0, y: 50 },
                      show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
                    }}
                    whileHover={{ y: -15, transition: { duration: 0.3 } }}
                    className="bg-white rounded-[40px] overflow-hidden border border-black/5 shadow-lg group cursor-pointer"
                  >
                    <div className="h-64 overflow-hidden relative">
                      <ImageWithFallback src={item.img} alt={item.title} className="size-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-6 left-6 px-4 py-2 bg-black/80 backdrop-blur-md rounded-full">
                        <p className="text-[8px] font-black uppercase tracking-widest text-[#fabf37]">{item.tag}</p>
                      </div>
                    </div>
                    <div className="p-8 space-y-4">
                      <h3 className="font-black text-xl uppercase tracking-tight leading-none text-black">{item.title}</h3>
                      <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                        <div className="flex -space-x-2">
                          {[1,2,3].map(i => <div key={i} className="size-6 rounded-full border-2 border-white bg-zinc-200" />)}
                          <span className="text-[8px] font-bold text-zinc-400 ml-4">+2.4k Likes</span>
                        </div>
                        <Instagram className="size-4 text-zinc-300" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}