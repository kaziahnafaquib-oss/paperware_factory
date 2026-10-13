import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Zap, Droplets, Leaf, 
  ChartBar, Cpu, Recycle,
  ArrowUpRight, TrendingUp,
  ArrowRight, Sparkles
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useLanguage } from "../../context/LanguageContext";

export function ImpactMetrics() {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mode, setMode] = React.useState<'live' | 'calculator'>('calculator');

  // Phase A0: removed simulated "live" production counter (random increments every 800 ms; not real data).

  const QUANTITY_OPTIONS = [
    { label: "1 Million", value: 1_000_000 },
    { label: "10 Million", value: 10_000_000 },
    { label: "50 Million", value: 50_000_000 },
    { label: "100 Million", value: 100_000_000 },
    { label: "1 Billion", value: 1_000_000_000 },
    { label: "10 Billion", value: 10_000_000_000 },
  ];

  // Calculation Logic (Per 1 Million Cups -> 3500kg Lid + 825kg Coating)
  const calculatePlasticSaved = (quantity: number) => {
    const factor = quantity / 1_000_000;
    const lidKg = 3500 * factor;
    const coatingKg = 825 * factor;
    return { lidKg, coatingKg, total: lidKg + coatingKg };
  };

  const currentStats = React.useMemo(() => {
    return calculatePlasticSaved(QUANTITY_OPTIONS[selectedIndex].value);
  }, [selectedIndex]);

  const formatNumber = (num: number) => new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(num);

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden font-['Poppins',sans-serif]">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, rgba(250,191,55,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, rgba(250,191,55,0.08) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, rgba(250,191,55,0.08) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Dots Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(250,191,55,0.4)_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-3 px-4 py-2 bg-zinc-100 rounded-full mb-8"
          >
             <div className="size-2 bg-[#FFC924] rounded-full animate-pulse" />
             <span className="text-zinc-600 font-mono uppercase tracking-widest text-[10px]">
                Impact Calculator Engine
             </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-zinc-900 leading-[0.85] mb-8">
            PLASTIC VS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC924] to-[#ffb300]">PAPERWARE</span>
          </h2>
          
          <p className="text-zinc-500 font-medium text-lg leading-relaxed max-w-2xl mx-auto">
             See the difference. Calculate your potential impact by switching to Paperware's sustainable solutions.
          </p>
        </div>

        {/* Calculator Control Bar */}
        <div className="max-w-4xl mx-auto mb-20">
           <div className="bg-white rounded-full p-2 shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-zinc-100 relative">
              <div className="relative h-16 bg-zinc-50 rounded-full flex items-center px-8 overflow-hidden">
                 {/* Progress Bar */}
                 <motion.div 
                    className="absolute top-0 left-0 h-full bg-[#FFC924]/10"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(selectedIndex / (QUANTITY_OPTIONS.length - 1)) * 100}%` }}
                 />
                 
                 {/* Steps */}
                 <div className="w-full flex justify-between items-center relative z-10">
                    {QUANTITY_OPTIONS.map((opt, i) => (
                       <button 
                          key={i} 
                          onClick={() => {
                             setSelectedIndex(i);
                             setMode('calculator');
                          }}
                          className={`group relative flex flex-col items-center justify-center outline-none transition-all duration-300 ${i === selectedIndex ? 'scale-110' : 'opacity-40 hover:opacity-70'}`}
                       >
                          <div className={`size-3 rounded-full mb-3 transition-colors ${i <= selectedIndex ? 'bg-[#FFC924]' : 'bg-zinc-300'}`} />
                          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 hidden md:block">
                             {opt.label}
                          </span>
                       </button>
                    ))}
                 </div>
              </div>

              {/* Floating Value Badge */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-6 py-2 rounded-full shadow-xl">
                 <span className="font-black text-xl tracking-tight">
                    {formatNumber(QUANTITY_OPTIONS[selectedIndex].value)} Cups
                 </span>
                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-3 bg-zinc-900 rotate-45" />
              </div>
           </div>
        </div>

        {/* Visual Comparison Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 items-center max-w-6xl mx-auto">
           
           {/* Left: The Problem (Plastic) */}
           <div className="relative group">
              <div className="aspect-[4/5] relative flex items-center justify-center bg-zinc-50 rounded-[3rem] overflow-hidden">
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
                 
                 <div className="relative z-10 text-center">
                    <motion.div 
                       animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, -2, 0]
                       }}
                       transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                       className="w-48 md:w-64 relative mb-8 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    >
                       <ImageWithFallback
                          src="https://images.unsplash.com/photo-1608764796781-35e7ce805822?auto=format&fit=crop&w=600&q=80"
                          alt="Plastic Waste"
                          className="w-full object-cover drop-shadow-2xl rotate-[-5deg]"
                       />
                       <div className="absolute -top-6 -right-6 bg-red-500 text-white size-16 rounded-full flex items-center justify-center font-black text-2xl shadow-xl animate-bounce">
                          ×
                       </div>
                    </motion.div>
                    
                    <h3 className="text-3xl font-black text-zinc-500 uppercase tracking-tighter mb-2 group-hover:text-red-500 transition-colors">The Waste</h3>
                    <div className="inline-block bg-zinc-200 rounded-full px-4 py-1">
                       <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Non-Recyclable</span>
                    </div>
                 </div>

                 {/* Waste Stats */}
                 <div className="absolute bottom-12 left-0 w-full px-8">
                    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-red-100 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-black uppercase text-zinc-400">Plastic Created</span>
                          <TrendingUp className="size-4 text-red-500" />
                       </div>
                       <div className="text-4xl font-black text-zinc-900 tracking-tighter">
                          {formatNumber(currentStats.total)} <span className="text-lg text-zinc-400">KG</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Right: The Solution (Paperware) */}
           <div className="relative group">
              <div className="aspect-[4/5] relative flex items-center justify-center bg-white rounded-[3rem] overflow-hidden shadow-2xl border-4 border-zinc-50">
                 <div className="absolute inset-0 bg-[#FFC924]/5" />
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,rgba(255,201,36,0.2)_0%,transparent_70%)]" />
                 
                 <div className="relative z-10 text-center">
                    <motion.div 
                       animate={{ 
                          y: [0, -15, 0],
                          scale: [1, 1.02, 1]
                       }}
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       className="w-56 md:w-72 relative mb-8"
                    >
                       <ImageWithFallback
                          src="https://images.unsplash.com/photo-1588015314375-150c5c0e8681?auto=format&fit=crop&w=600&q=80"
                          alt="Paperware Solution"
                          className="w-full object-cover drop-shadow-2xl"
                       />
                       {/* Floating Elements */}
                       <div className="absolute -top-4 -right-8 bg-white text-zinc-900 px-4 py-2 rounded-full shadow-xl flex items-center gap-2">
                          <Leaf className="size-4 text-[#FFC924] fill-current" />
                          <span className="text-[10px] font-black uppercase tracking-widest">100% Eco</span>
                       </div>
                       
                       {/* Branding */}
                       <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-900/10 font-black text-6xl leading-none tracking-tighter pointer-events-none">
                          PAPER<br/>WARE
                       </div>
                    </motion.div>
                    
                    <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter mb-2">The Solution</h3>
                    <div className="inline-block bg-[#FFC924] rounded-full px-4 py-1 shadow-lg shadow-[#FFC924]/30">
                       <span className="text-xs font-bold text-zinc-900 uppercase tracking-widest">Plastic Free</span>
                    </div>
                 </div>

                 {/* Savings Stats */}
                 <div className="absolute bottom-12 left-0 w-full px-8">
                    <div className="bg-zinc-900 text-white p-6 rounded-2xl shadow-xl transform translate-y-0 transition-all duration-500">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-black uppercase text-[#FFC924]">Total Impact Saved</span>
                          <Sparkles className="size-4 text-[#FFC924]" />
                       </div>
                       <div className="text-4xl font-black tracking-tighter">
                          {formatNumber(currentStats.total)} <span className="text-lg text-zinc-500">KG</span>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

        </div>

      </div>

      {/* Industrial Footer Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
    </section>
  );
}