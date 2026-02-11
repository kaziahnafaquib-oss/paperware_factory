import React from "react";
import { motion } from "framer-motion";
import imgCups from "figma:asset/6b92055ba5bbffc98cadd5ecc5acc306f29875e4.png";
import { useLanguage } from "../../context/LanguageContext";

export function AboutUs() {
  const { t } = useLanguage();

  return (
    <section className="py-40 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background elements - Softer gradients and less harsh contrast */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/10 to-transparent opacity-30" />
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
        style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "32px 32px" }} 
      />
      
      {/* Subtle Glow to soften the black */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] bg-[#fabf37]/5 blur-[120px] rounded-full" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-white/5 blur-[120px] rounded-full" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-12"
          >
            <div className="space-y-4">
              <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">{t('our_legacy')}</span>
              <h2 className="text-[32px] md:text-[52px] font-black uppercase tracking-tight leading-[1.1]">
                {t('who_we_really_are').split(' ').map((word, i) => i >= 2 ? <br key={i} className="hidden md:block" /> : null)}
                {t('who_we_really_are')}
              </h2>
            </div>
            
            <div className="space-y-8 text-white/70 font-medium leading-[1.8] text-base md:text-[18px]">
              <p className="border-l-4 border-[#fabf37] pl-6 md:pl-8 italic text-white/90 text-sm md:text-lg">
                {t('about_text_1')}
              </p>
              <p>
                {t('about_text_2')}
              </p>
            </div>

            <motion.button 
              whileHover={{ x: 10 }}
              className="inline-flex items-center gap-4 text-[#fabf37] font-black uppercase text-sm tracking-widest group"
            >
              {t('full_story')} 
              <div className="h-px w-12 bg-[#fabf37] group-hover:w-20 transition-all" />
            </motion.button>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:w-1/2 relative w-full px-4 md:px-0"
          >
            <div className="relative z-10">
              <div className="absolute -inset-4 border-2 border-[#fabf37]/20 rounded-[30px] rotate-6 -z-10" />
              <div className="absolute -inset-4 border-2 border-white/10 rounded-[30px] -rotate-3 -z-10" />
              
              <div className="rounded-[24px] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] bg-zinc-900 p-4 border border-white/5">
                <img 
                  src={imgCups} 
                  alt="Paper Cups Collection" 
                  className="w-full h-auto object-cover rounded-[16px] grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>

              {/* Stats Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-[#fabf37] text-black p-6 md:p-8 rounded-2xl shadow-2xl space-y-1"
              >
                <div className="text-2xl md:text-4xl font-black leading-none">10+</div>
                <div className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-60">{t('years_quality')}</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}