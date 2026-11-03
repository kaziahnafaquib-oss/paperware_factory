import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import imgPaperBag from "figma:asset/26c3dd878dc6b8092048a743d91266cdd41f2a79.webp";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollScrub, easeOut3 } from "../../lib/useScrollScrub";

export function FeaturedProducts() {
  const { t } = useLanguage();
  const bagRef = React.useRef<HTMLImageElement>(null);
  // Scroll-scrubbed: the bag rises and settles to full size as the section enters.
  useScrollScrub(() => {
    const img = bagRef.current;
    if (!img) return;
    const vh = window.innerHeight || 1;
    const r = img.getBoundingClientRect();
    const t = easeOut3((vh - r.top) / (vh * 0.7));
    img.style.transform = `translateY(${((1 - t) * 60).toFixed(1)}px) scale(${(0.9 + 0.1 * t).toFixed(4)})`;
  });

  return (
    <section className="relative py-48 bg-[#fabf37] overflow-hidden">

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20 md:mb-32 space-y-4">
          <span className="text-black/30 font-black uppercase tracking-[0.4em] text-xs">{t("featured_products_innovation")}</span>
          <h2 className="text-[32px] md:text-[52px] font-black text-black uppercase tracking-tight leading-none">
            {t('featured_creations')}
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20 max-w-7xl mx-auto">
          {/* Left Detail */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-[350px] space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="size-12 md:size-16 bg-black rounded-2xl flex items-center justify-center text-[#fabf37] mx-auto lg:mx-0 shadow-xl">
              <ShoppingBag className="size-6 md:size-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase text-black">{t('mastering_craft')}</h3>
            <p className="text-black/70 font-bold text-sm md:text-[16px] leading-relaxed">
              {t('featured_desc_1')}
            </p>
          </motion.div>

          {/* Center Product Showcase */}
          <div className="flex-1 flex flex-col items-center relative py-8 md:py-12 order-1 lg:order-2">
            {/* Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-12 z-20">
              <motion.button 
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                className="size-10 md:size-14 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <ChevronLeft className="size-5 md:size-6" />
              </motion.button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-12 z-20">
              <motion.button 
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                className="size-10 md:size-14 rounded-full bg-white text-black shadow-2xl flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <ChevronRight className="size-5 md:size-6" />
              </motion.button>
            </div>

            <div className="relative group w-full flex flex-col items-center">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-white/20 blur-[60px] md:blur-[100px] rounded-full scale-110 md:scale-150 -z-10" />
              
              <img ref={bagRef} loading="lazy" decoding="async" 
                src={imgPaperBag} 
                alt={t("paper_bag")} 
                className="h-[300px] md:h-[450px] w-auto drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)] will-change-transform" 
              />
              
              <div className="text-center mt-12 md:mt-16 space-y-6 md:space-y-8">
                <div className="space-y-1">
                  <h3 className="text-[32px] md:text-[42px] font-black uppercase text-black tracking-tighter leading-none">{t('paper_bag')}</h3>
                  <div className="h-1.5 w-16 md:w-24 bg-black mx-auto rounded-full" />
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 md:px-12 py-3 md:py-4 rounded-full font-black uppercase text-xs md:text-sm tracking-[0.2em] shadow-2xl hover:bg-zinc-900 transition-all"
                >
                  {t('view_details')}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Right Detail */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:w-[350px] space-y-6 text-center lg:text-right order-3"
          >
            <div className="flex justify-center lg:justify-end gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 w-${i === 1 ? '12' : '4'} rounded-full bg-black/${i === 1 ? '100' : '20'}`} />
              ))}
            </div>
            <h3 className="text-xl md:text-2xl font-black uppercase text-black">{t('eco_vision')}</h3>
            <p className="text-black/70 font-bold text-sm md:text-[16px] leading-relaxed">
              {t('featured_desc_2')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}