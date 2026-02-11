import React from "react";
import { motion } from "framer-motion";
import imgMap from "figma:asset/7707e2384f799b3aeb1bc03a9a49cb7ef91b6772.png";
import { useLanguage } from "../../context/LanguageContext";

export function CoverageArea() {
  const { t } = useLanguage();

  return (
    <section className="py-48 bg-zinc-950 relative overflow-hidden">
      {/* Background flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] bg-[#fabf37]/5 blur-[120px] rounded-full" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20 max-w-7xl mx-auto">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Distribution</span>
              <h2 className="text-[52px] font-black text-white uppercase tracking-tight leading-none">
                {t('nationwide_reach')}
              </h2>
            </div>
            <p className="text-zinc-400 font-bold text-lg leading-relaxed">
              {t('distribution_desc')}
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
              <div className="space-y-1">
                <div className="text-3xl font-black text-white">64+</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{t('districts_covered')}</div>
              </div>
              <div className="w-px h-12 bg-zinc-800 hidden sm:block" />
              <div className="space-y-1">
                <div className="text-3xl font-black text-white">24/7</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{t('factory_uptime')}</div>
              </div>
            </div>
          </motion.div>

          {/* Right Map Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: 30 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 perspective-1000"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-[#fabf37]/10 blur-[60px] rounded-full group-hover:bg-[#fabf37]/20 transition-colors" />
              <img 
                src={imgMap} 
                alt="Bangladesh Coverage Map" 
                className="relative z-10 w-full max-w-3xl h-auto drop-shadow-[0_40px_100px_rgba(250,191,55,0.1)] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}