import { memo, useEffect, useMemo, useState } from 'react';
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

interface HeroProps {
  onExplore: () => void;
  videoUrl?: string;
  mobileVideoUrl?: string;
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
}

export const Hero = memo(function Hero({
  onExplore,
  videoUrl,
  mobileVideoUrl,
  title,
  subtitle1,
  subtitle2,
}: HeroProps) {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();

    // Use requestIdleCallback for non-urgent resize check
    let timeoutId: any;
    const handleResize = () => {
      if (timeoutId) cancelAnimationFrame(timeoutId);
      timeoutId = requestAnimationFrame(checkMobile);
    };

    window.addEventListener("resize", handleResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize);
      if (timeoutId) cancelAnimationFrame(timeoutId);
    };
  }, []);

  const activeVideo = useMemo(() =>
    (isMobile && mobileVideoUrl) ? mobileVideoUrl : videoUrl
    , [isMobile, mobileVideoUrl, videoUrl]);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center pt-20 md:pt-24 pb-16 md:pb-24 overflow-hidden bg-[#fabf37]">
      {/* Primary Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {(() => {
          if (!activeVideo) {
            return null;
          }

          return (
            <video
              key={activeVideo}
              src={activeVideo}
              muted
              loop
              playsInline
              preload="metadata"
              poster="/Users/kazi.ahnaf.aquib/.gemini/antigravity/brain/af3e4491-f1f4-4d4e-bc14-f7809e749edc/hero_video_poster_1769602402026.png"
              onLoadedData={() => setVideoLoaded(true)}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
              suppressHydrationWarning
              ref={(el) => {
                if (!el) return;
                // Auto-play when ready if visible
                const handlePlay = () => {
                  if (el.paused) {
                    el.play().catch(() => { });
                  }
                };

                if (window.scrollY < 100) {
                  handlePlay();
                } else {
                  const startVideo = () => {
                    if (window.scrollY < 500) {
                      handlePlay();
                      window.removeEventListener('scroll', startVideo);
                    }
                  };
                  window.addEventListener('scroll', startVideo, { passive: true });
                }
              }}
              className={`w-full h-full object-cover opacity-50 mix-blend-multiply grayscale transition-opacity duration-1000 ${videoLoaded ? 'opacity-50' : 'opacity-0'}`}
            />
          );
        })()}
        {/* Updated Gradient Overlay to black */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#fabf37]/80 via-[#fabf37]/40 to-zinc-950 pointer-events-none" />
      </div>

      {/* Background Polish */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-[1100px] mx-auto space-y-6 md:space-y-8 relative z-10"
        >
          {/* Removed the redundant internal video */}

          <div className="space-y-2 md:space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-black font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-[10px] md:text-xs bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm"
            >
              {t("premium_manufacturing")}
            </motion.span>
            <h1 className="text-[32px] sm:text-[45px] md:text-[96px] font-black text-white leading-[0.95] uppercase tracking-tighter drop-shadow-2xl">
              {t("hero_title")}
            </h1>
          </div>

          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[30px] md:text-[86px] font-black text-black/10 leading-none select-none origin-top"
          >
            ↓
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="max-w-4xl mx-auto space-y-4 px-4"
          >
            <p className="text-[14px] md:text-[26px] font-black text-black leading-tight uppercase tracking-tighter">
              {t("hero_subtitle_1")}
            </p>
            <p className="text-[12px] md:text-[18px] font-bold text-white/90 leading-relaxed tracking-widest uppercase">
              {t("hero_subtitle_2")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="pt-6 md:pt-12 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6"
          >
            <motion.a
              href="https://paperwarefactory.com/wp-content/uploads/2025/10/PAPERWARE-brochure-comp-2024.compressed-compressed-2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                // Predictive pre-fetching logic
                const link = document.createElement('link');
                link.rel = 'prefetch';
                link.href = 'https://paperwarefactory.com/wp-content/uploads/2025/10/PAPERWARE-brochure-comp-2024.compressed-compressed-2.pdf';
                document.head.appendChild(link);
              }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "#111",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto mt-32 md:mt-0 inline-flex items-center justify-center gap-3 md:gap-4 bg-black text-white px-8 md:px-12 py-4 md:py-6 rounded-full font-black text-xs md:text-xl uppercase tracking-wider shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:shadow-none transition-all group"
            >
              <Download
                className="size-4 md:size-6 text-[#fabf37]"
                strokeWidth={3}
              />
              <span>{t("e_brochure")}</span>

              {/* HUD Decor within button */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#fabf37] opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>

            <button
              onClick={onExplore}
              className="text-black font-black uppercase tracking-widest text-[11px] md:text-sm flex items-center gap-2 hover:gap-4 transition-all py-2"
            >
              {t("explore_products")}{" "}
              <ArrowRight className="size-4 md:size-5" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});