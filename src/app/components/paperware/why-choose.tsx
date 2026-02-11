import React from "react";
import { motion } from "framer-motion";
import imgBackground from "figma:asset/deb0797add19956888ddfd67b88ff75ecb592792.png";
import imgBackground1 from "figma:asset/047a125a2726498b23eb2e792cd9129a5e35bd9f.png";
import imgBackground2 from "figma:asset/ecae8d654e0ece711f117e96df44a7742af71120.png";
import { useLanguage } from "../../context/LanguageContext";

export function WhyChoose() {
  const { t } = useLanguage();

  const reasons = [
    {
      title: t('eco_friendly_title'),
      desc: t('eco_friendly_desc'),
      image: imgBackground,
    },
    {
      title: t('custom_branding_title'),
      desc: t('custom_branding_desc'),
      image: imgBackground1,
    },
    {
      title: t('global_focus_title'),
      desc: t('global_focus_desc'),
      image: imgBackground2,
    },
  ];

  return (
    <section className="py-48 bg-white relative overflow-hidden">
      {/* Decorative side text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -rotate-90 origin-left text-zinc-50 font-black text-[150px] whitespace-nowrap leading-none select-none pointer-events-none">
        PAPERWARE FACTORY
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="text-center mb-32 space-y-4">
          <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Excellence</span>
          <h2 className="text-[48px] font-black text-black uppercase tracking-tight leading-none">
            {t('why_choose').split(' ').map((word, i) => i === 2 ? <br key={i} className="md:hidden" /> : null)}
            {t('why_choose')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[650px] rounded-t-[240px] rounded-b-[40px] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-zinc-100"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-700" />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end text-center">
                <div className="space-y-6 pb-6 relative translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="size-16 rounded-full border border-[#fabf37]/40 flex items-center justify-center mx-auto mb-4 bg-black/20 backdrop-blur-sm">
                     <span className="text-[10px] font-black italic tracking-tighter uppercase text-[#fabf37]">Paperware</span>
                  </div>
                  <h3 className="text-[26px] font-black text-white uppercase leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-bold text-[15px] leading-relaxed max-w-[280px] mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.desc}
                  </p>
                  
                  {/* Accent bar */}
                  <div className="h-1 w-12 bg-[#fabf37] mx-auto rounded-full group-hover:w-24 transition-all duration-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}