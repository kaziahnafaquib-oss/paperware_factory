import { ReactNode } from 'react';
import { motion } from "framer-motion";
import * as Switch from "@radix-ui/react-switch";
import * as Slider from "@radix-ui/react-slider";
import { 
  Cpu, 
  Settings2, 
  Sparkles, 
  Zap, 
  Target, 
  Globe, 
  MessageSquare,
  ShieldCheck,
  Languages
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { Tone } from "../../lib/translations";

export function AIGlobalConfig() {
  const { tone, setTone, language, setLanguage, t } = useLanguage();

  const tones: { id: Tone; label: string; icon: ReactNode; desc: string }[] = [
    { id: "corporate", label: t("corporate") || "Corporate", icon: <ShieldCheck className="size-4" />, desc: "Formal, precise, and professional communication." },
    { id: "futuristic", label: t("futuristic") || "Futuristic", icon: <Cpu className="size-4" />, desc: "High-tech, HUD-style, and technical terminology." },
    { id: "playful", label: t("playful") || "Playful", icon: <Sparkles className="size-4" />, desc: "Friendly, engaging, and conversational tone." },
    { id: "minimal", label: t("minimal") || "Minimal", icon: <Target className="size-4" />, desc: "Concise, direct, and distraction-free text." }
  ];

  const languages = [
    { code: "EN", label: "English" },
    { code: "BN", label: "বাংলা" },
    { code: "AR", label: "العربية" },
    { code: "ZH", label: "中文" },
    { code: "HI", label: "हिन्दी" }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* HUD Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#fabf37] blur-[150px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#d6c8a9] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left Side: Info & HUD Visual */}
          <div className="flex-1 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fabf37]/10 border border-[#fabf37]/20">
                <Cpu className="size-3 text-[#fabf37]" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">Neural Protocol v4.0</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-tight">
                {t("ai_global_config") || "AI Global Configurator"}
              </h2>
              <p className="text-zinc-400 font-medium leading-relaxed max-w-xl">
                Control the neural core of Paperware. Adjust the application's linguistic tone, 
                visual density, and cross-platform behavior through our central AI command unit.
              </p>
            </div>

            {/* HUD Visual Element */}
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 border border-zinc-800 rounded-full p-8 group">
              <div className="absolute inset-0 border-t border-zinc-700 rounded-full animate-spin-slow" />
              <div className="absolute inset-4 border-b border-[#fabf37]/30 rounded-full animate-reverse-spin" />
              
              <div className="w-full h-full rounded-full bg-zinc-900/50 backdrop-blur-3xl flex items-center justify-center relative overflow-hidden">
                 <div className="text-center space-y-2">
                    <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">Core Status</div>
                    <div className="text-3xl font-black">OPTIMAL</div>
                    <div className="text-[8px] font-mono text-zinc-500">LATENCY: 14MS</div>
                 </div>
                 
                 {/* Floating Nodes */}
                 {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.6, 0.3]
                      }}
                      transition={{
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute size-1 bg-[#fabf37] rounded-full shadow-[0_0_10px_#fabf37]"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`
                      }}
                    />
                 ))}
              </div>
            </div>
          </div>

          {/* Right Side: Configuration Controls */}
          <div className="flex-1">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-[48px] p-8 md:p-12 backdrop-blur-xl">
              <div className="space-y-12">
                
                {/* Tone Selection */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="size-5 text-[#fabf37]" />
                    <h3 className="text-sm font-black uppercase tracking-widest">{t("linguistic_tone") || "Linguistic Tone"}</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tones.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setTone(t.id)}
                        className={`p-6 rounded-3xl border text-left transition-all ${
                          tone === t.id 
                            ? "bg-[#fabf37] border-[#fabf37] text-black" 
                            : "bg-black/40 border-zinc-800 text-white hover:border-zinc-600"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-2 rounded-xl ${tone === t.id ? "bg-black/10" : "bg-zinc-800"}`}>
                            {t.icon}
                          </div>
                          {tone === t.id && <div className="size-2 bg-black rounded-full animate-pulse" />}
                        </div>
                        <div className="text-xs font-black uppercase mb-1">{t.label}</div>
                        <div className={`text-[9px] leading-relaxed ${tone === t.id ? "text-black/60" : "text-zinc-500"}`}>
                          {t.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Performance & UX */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3">
                    <Settings2 className="size-5 text-[#fabf37]" />
                    <h3 className="text-sm font-black uppercase tracking-widest">{t("system_dynamics") || "System Dynamics"}</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-tight">{t("neural_animations") || "Neural Animations"}</div>
                        <div className="text-[9px] text-zinc-500 uppercase">Enable advanced motion effects</div>
                      </div>
                      <Switch.Root className="w-11 h-6 bg-zinc-800 rounded-full relative data-[state=checked]:bg-[#fabf37] outline-none cursor-pointer">
                        <Switch.Thumb className="block size-4 bg-white rounded-full transition-transform duration-100 translate-x-1 will-change-transform data-[state=checked]:translate-x-6" />
                      </Switch.Root>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-tight">{t("glass_morphism_density") || "Glass-morphism Density"}</div>
                        <div className="text-[9px] text-zinc-500 uppercase">Adjust UI transparency level</div>
                      </div>
                      <div className="w-32">
                        <Slider.Root className="relative flex items-center select-none touch-none w-full h-5" defaultValue={[50]} max={100} step={1}>
                          <Slider.Track className="bg-zinc-800 relative grow h-1 rounded-full">
                            <Slider.Range className="absolute bg-[#fabf37] h-full rounded-full" />
                          </Slider.Track>
                          <Slider.Thumb className="block size-3 bg-white rounded-full focus:outline-none" />
                        </Slider.Root>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Language Protocol */}
                <div className="pt-8 border-t border-zinc-800 space-y-6">
                   <div className="flex items-center gap-3">
                    <Languages className="size-5 text-[#fabf37]" />
                    <h3 className="text-sm font-black uppercase tracking-widest">{t("language_protocol") || "Language Protocol"}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => setLanguage(l.code as any)}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                          language === l.code 
                            ? "bg-[#fabf37] text-black" 
                            : "bg-zinc-800 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-dashed border-zinc-800">
                  <div className="flex items-center gap-3">
                    <Zap className="size-4 text-[#fabf37]" />
                    <span className="text-[8px] font-black text-zinc-500 uppercase tracking-[0.2em]">Real-time synchronization active</span>
                  </div>
                  <button className="text-[8px] font-black text-[#fabf37] uppercase tracking-widest hover:underline">
                    {t("reset_to_default") || "Reset To Default"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}