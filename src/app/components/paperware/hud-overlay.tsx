import { memo } from "react";
import { motion } from "framer-motion";

export const HUDOverlay = memo(() => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-30 select-none">
      {/* Scanning Line */}
      <motion.div
        animate={{ top: ["-5%", "105%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fabf37]/50 to-transparent"
      />

      {/* HUD Corners */}
      <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#fabf37]/30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-[#fabf37]/30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#fabf37]/30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#fabf37]/30" />

      {/* Vertical Data Strips */}
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden md:flex flex-col gap-8 opacity-20">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="text-[10px] tracking-widest font-mono rotate-90 origin-left whitespace-nowrap text-[#fabf37]">
            SEC_SYS_0{i + 1} // STATUS_ACTIVE // {Math.random().toString(16).slice(2, 8).toUpperCase()}
          </div>
        ))}
      </div>

      {/* Grid Dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#d6c8a9_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />

      {/* Corner Stats */}
      <motion.div
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-24 left-8 text-[8px] font-mono text-[#fabf37]/40 hidden lg:block"
      >
        LATENCY: 0.002ms<br />
        LOAD_TIER: HIGH_AVAILABILITY
      </motion.div>
    </div>
  );
});
