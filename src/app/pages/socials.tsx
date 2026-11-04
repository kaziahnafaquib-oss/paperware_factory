import image_8788d2f066ca9921baf05e502ac560c2c717da5a from 'figma:asset/8788d2f066ca9921baf05e502ac560c2c717da5a.webp';
import React from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { Globe, ArrowRight, Share2, Smartphone, QrCode, Factory, Zap, TrendingUp, Users, Sparkles, Map, Activity, MessageSquareQuote, Radio } from "lucide-react";
import mainLogo from "figma:asset/195a383e60328bb286c8bb694dbc23dfe8f65ab6.webp";
import brandLogo from "figma:asset/2cf02ce26ccdbb62dfe9c412f2f673ebd0977bb2.webp";
import { useLanguage } from "../context/LanguageContext";
import { LiveSocialFeeds } from "../components/paperware/live-social-feeds";
import { SocialStrip } from "../components/paperware/social-strip";
import { BrandBadge, type BrandKey } from "../components/paperware/brand-icons";
import imgCover from "@/assets/social/paperware-cover.jpg";

// Owner (4 Nov 2026): one profile banner — the page cover, the brand logo and the name — with the five
// platforms as a row of buttons under it. Links go to the real profiles only; no posts are shown here.
type SocialLink = { url: string; handle: string; brand?: BrandKey; label?: string; name: string };
const ProfileBanner = React.memo(({ links, tagline }: { links: SocialLink[]; tagline: string }) => (
  <section aria-label="Paperware Factory profiles" className="overflow-hidden rounded-[40px] border border-black/5 bg-white shadow-sm">
    <div className="relative aspect-[21/8] bg-[#c98f1a] md:aspect-[21/6]">
      <img src={imgCover} alt="" className="size-full object-cover" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" aria-hidden="true" />
    </div>
    <div className="relative px-6 pb-8 md:px-10 md:pb-10">
      <div className="-mt-14 flex flex-col gap-5 md:-mt-16 md:flex-row md:items-end md:gap-8">
        <span className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-white shadow-xl md:size-32">
          <img src={brandLogo} alt="" className="size-full scale-[1.9] object-contain" />
        </span>
        <div className="min-w-0 pb-1">
          <h3 className="text-3xl font-black uppercase tracking-tight text-black md:text-4xl">Paperware Factory</h3>
          <p className="mt-1 text-sm font-bold text-zinc-500">{tagline}</p>
        </div>
      </div>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {links.map((l) => (
          <li key={l.label}>
            <motion.a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${l.label} - ${l.handle}`}
              whileHover={{ y: -4 }}
              className="group flex items-center gap-3 rounded-2xl border border-black/5 bg-zinc-50 p-3 transition-colors hover:bg-[#fabf37]"
            >
              <BrandBadge brand={l.brand!} className="size-11 rounded-xl" iconClass="size-5" />
              <span className="min-w-0 flex-1">
                <span className="block text-[11px] font-black uppercase tracking-widest text-black">{l.label}</span>
                <span className="block truncate text-[11px] font-semibold text-zinc-500 group-hover:text-black/70">{l.handle}</span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-black transition-transform group-hover:translate-x-1" />
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  </section>
));
ProfileBanner.displayName = "ProfileBanner";

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
      brand: "facebook" as BrandKey,
      label: "Facebook",
      color: "hover:bg-[#1877F2]/10"
    },
    {
      name: "Paperware Factory",
      handle: "instagram.com/paperware_factory",
      url: "https://www.instagram.com/paperware_factory/",
      brand: "instagram" as BrandKey,
      label: "Instagram",
      color: "hover:bg-[#E4405F]/10"
    },
    {
      name: "Paperware Factory",
      handle: "linkedin.com/company/paperwarefactory",
      url: "https://www.linkedin.com/company/paperwarefactory/",
      brand: "linkedin" as BrandKey,
      label: "LinkedIn",
      color: "hover:bg-[#0A66C2]/10"
    },
    {
      name: "Paperware Factory",
      handle: "tiktok.com/@paperwarefactory",
      url: "https://www.tiktok.com/@paperwarefactory",
      brand: "tiktok" as BrandKey,
      label: "TikTok",
      color: "hover:bg-black/5"
    },
    {
      name: "Paperware Factory",
      handle: "youtube.com/@PaperwareFactory",
      url: "https://www.youtube.com/@PaperwareFactory",
      brand: "youtube" as BrandKey,
      label: "YouTube",
      color: "hover:bg-[#FF0000]/10"
    },
    {
      name: "Paperware Factory",
      handle: "www.paperwarefactory.com",
      url: "https://www.paperwarefactory.com",
      brand: undefined as BrandKey | undefined,
      label: "Website",
      color: "hover:bg-[#fabf37]/10"
    }
  ];

  return (
    <div ref={containerRef} className="relative bg-zinc-50 min-h-screen font-['Poppins',sans-serif] selection:bg-[#fabf37] selection:text-black overflow-x-hidden pt-32 md:pt-40">
      
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
                      {t(word)}
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
                {t(toneContent[activeTone].subtitle)}
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
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t(t('scroll_to_connect') || "Scroll to Connect")}</span>
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
                    {t(tone.label)}
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
                            <img loading="lazy" decoding="async" src={image_8788d2f066ca9921baf05e502ac560c2c717da5a} alt={t("socials_small_logo")} className="size-14 object-contain" />
                          </motion.div>
                          <h3 className="font-black text-2xl tracking-tight text-zinc-900">Paperware</h3>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                            <div className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                            <p className="text-[9px] font-black text-emerald-700 uppercase tracking-widest">{t(t('verified_hub') || "Verified Hub")}</p>
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
                              <div className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 shrink-0">
                                {link.brand ? <BrandBadge brand={link.brand} className="size-12 rounded-2xl" /> : <Globe className="size-6" aria-hidden="true" />}
                              </div>
                              <div className="flex-1 text-left">
                                <p className="text-[11px] font-black uppercase tracking-tight text-zinc-800 leading-none mb-1">{t(link.label)}</p>
                                <p className="text-[9px] font-bold text-zinc-400 truncate">{t(link.handle)}</p>
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

            </motion.div>

            <div className="w-full mb-24">
              <ProfileBanner links={socialLinks.filter((l) => l.brand)} tagline={t("socials_profile_tagline")} />
            </div>

            <LiveSocialFeeds />
            <div className="w-screen relative left-1/2 -translate-x-1/2"><SocialStrip postsOnly /></div>

          </div>
        </div>
      </div>
    </div>
  );
}