import { ReactNode } from 'react';
import { Layers, ChevronRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export function ViewContainer({ title, subtitle, children, actions }: { title: string, subtitle: string, children: ReactNode, actions?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-600 mb-2">
              <Layers className="size-3" />
              <span>Dashboard</span>
              <ChevronRight className="size-3" />
              <span className="text-[#fabf37]">{title}</span>
            </div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter">{title}</h2>
            <p className="text-zinc-500 font-bold text-sm uppercase tracking-widest mt-2">{subtitle}</p>
          </div>

          {/* System Monitor HUD */}
          <div className="hidden xl:flex items-center gap-4 bg-zinc-900/50 border border-white/5 pl-4 pr-2 py-1.5 rounded-2xl backdrop-blur-sm">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">System Status</span>
              <div className="flex items-center gap-1.5">
                <div className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-[10px] font-bold text-green-500">Operational</span>
              </div>
            </div>
            <div className="h-6 w-px bg-white/5" />
            <div className="flex items-center gap-3 pr-2">
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[7px] font-black text-zinc-600 uppercase">Latency</span>
                <span className="text-[9px] font-bold text-zinc-300 font-mono">24ms</span>
              </div>
              <div className="h-4 w-px bg-white/5" />
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[7px] font-black text-zinc-600 uppercase">Uptime</span>
                <span className="text-[9px] font-bold text-zinc-300 font-mono">99.9%</span>
              </div>
            </div>
          </div>

          {/* AI Translation Progress & Neural Sync Engine */}
          {title.toLowerCase().includes("language") && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              className="flex items-center gap-4 bg-zinc-900/50 border border-[#fabf37]/20 px-5 py-2.5 rounded-[24px] backdrop-blur-2xl shadow-2xl relative overflow-hidden group/sync"
            >
              {/* Animated HUD Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[rgba(250,191,55,0.05)] to-transparent opacity-0 group-hover/sync:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex flex-col min-w-[120px]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[7px] font-black text-[#fabf37] uppercase tracking-[0.2em]">Global Scan Coverage</span>
                  <span className="text-[9px] font-black text-white tabular-nums">84.2%</span>
                </div>
                <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "84.2%" }}
                    className="h-full bg-gradient-to-r from-[#fabf37] via-[#fabf37] to-white shadow-[0_0_10px_rgba(250,191,55,0.5)]"
                  />
                  {/* Progress Scanner Line */}
                  <motion.div
                    animate={{ left: ["-10%", "110%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 bottom-0 w-4 skew-x-12 blur-sm"
                    style={{ background: 'rgba(255, 255, 255, 0.2)' }}
                  />
                </div>
              </div>

              <div className="h-8 w-px bg-white/10 mx-1" />

              <button
                onClick={() => {
                  toast.loading("Neural Engine Initiating Page-by-Page Scan...", {
                    description: "Scanning App.tsx, MainContent.tsx, and 14 Module Files.",
                  });
                  setTimeout(() => {
                    toast.dismiss();
                    toast.success("AI Neural Sync Complete", {
                      description: "12,482 strings processed. Global coverage reached 92.5%.",
                      icon: <Sparkles className="size-4 text-[#fabf37]" />
                    });
                  }, 3500);
                }}
                className="group relative px-5 py-2.5 bg-[#fabf37] text-black text-[9px] font-black uppercase tracking-[0.15em] rounded-xl hover:shadow-[0_0_30px_rgba(250,191,55,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="size-3 group-hover:animate-pulse" />
                <span>Trigger Neural Sync</span>

                {/* Notification Badge */}
                <span className="absolute -top-1 -right-1 size-3 bg-red-500 rounded-full border-2 border-black flex items-center justify-center">
                  <span className="size-1 bg-white rounded-full animate-ping" />
                </span>
              </button>
            </motion.div>
          )}
        </div>
        <div className="flex gap-4">
          {actions}
        </div>
      </div>
      {children}
    </motion.div>
  );
}