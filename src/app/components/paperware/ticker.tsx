import React from "react";
import { motion } from "motion/react";
import { Database, Globe, Cpu, ShieldCheck, Leaf, Layers, PenTool, Clock, Microscope, Factory, Truck, Plane, Zap, Recycle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

export const Ticker = React.memo(() => {
  const { t } = useLanguage();
  
  return (
    <div className="fixed top-0 w-full z-[1002] bg-[#fabf37] h-8 flex items-center overflow-hidden border-b border-black/5 shadow-sm">
      <motion.div 
        animate={{ x: ["0%", "-20%"] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap items-center gap-12 md:gap-24"
      >
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex items-center gap-12 md:gap-24">
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Layers className="size-4" /> {t('ticker_1')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Database className="size-4" /> {t('ticker_2')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Globe className="size-4" /> {t('ticker_3')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Leaf className="size-4" /> {t('ticker_6')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Layers className="size-4" /> {t('ticker_7')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <PenTool className="size-4" /> {t('ticker_8')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Clock className="size-4" /> {t('ticker_9')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Microscope className="size-4" /> {t('ticker_10')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Truck className="size-4" /> {t('ticker_12')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Plane className="size-4" /> {t('ticker_13')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Zap className="size-4" /> {t('ticker_14')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              <Recycle className="size-4" /> {t('ticker_15')}
            </div>
            <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black">
              MADE IN BANGLADESH
              <motion.img 
                src="https://flagcdn.com/bd.svg" 
                alt="Bangladesh Flag" 
                className="h-3 w-auto rounded-sm shadow-sm origin-left" 
                animate={{ 
                  skewY: [0, 10, 0, -10, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              /> 
            </div>
            <div className="size-1.5 rounded-full bg-black/20" />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

Ticker.displayName = "Ticker";