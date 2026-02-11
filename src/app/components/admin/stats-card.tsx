import { ReactNode } from 'react';
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
}

export function StatsCard({ label, value, change, isPositive, icon }: StatsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative p-8 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[40px] hover:border-[#fabf37]/30 transition-all group overflow-hidden"
    >
      {/* Background Data Stream Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(250,191,55,0.1)_50%,transparent_100%)] animate-scan-x" />
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="size-14 rounded-2xl bg-black/50 border border-white/5 flex items-center justify-center text-[#fabf37] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(250,191,55,0.2)] transition-all duration-500">
          {icon}
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
          isPositive ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
        }`}>
          {isPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
          {change}
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2 group-hover:text-zinc-400 transition-colors">{label}</p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black text-white uppercase tracking-tighter tabular-nums">
            {value}
          </h3>
          {label.includes("Sessions") && (
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="size-1.5 bg-emerald-500 rounded-full"
            />
          )}
        </div>
      </div>
      
      {/* Bottom Glow */}
      <div className="absolute -bottom-10 -left-10 size-40 bg-[#fabf37]/5 blur-[60px] rounded-full group-hover:bg-[#fabf37]/10 transition-colors duration-700" />
    </motion.div>
  );
}