import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ShoppingBag, Filter, ArrowRight, Zap, Info, ChevronRight, Scale, X, Plus, Building2, CupSoda, Pizza, Megaphone, Hospital, Package as PackageIcon, Bot, Send, User, Sparkles, Activity, Box, Rotate3d, Maximize2, Move3d, MousePointer2, Tag, Pill, Shirt, Facebook, Instagram, Linkedin, ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Hero3DBox } from "../components/Hero3DBox";

const SocialMediaFeed = React.lazy(() => import("../components/SocialMediaFeed").then(module => ({ default: module.SocialMediaFeed })));
const TopSellingProducts = React.lazy(() => import("../components/TopSellingProducts").then(module => ({ default: module.TopSellingProducts })));
// Remove Canvas and Fiber imports as they are causing environment crashes

const categoryDetails = (t: any) => [
  { 
    id: "office-stationary", 
    title: t('office_stationary_title'), 
    subtitle: t('supplies_subtitle'), 
    icon: <Building2 strokeWidth={1.5} className="size-12" />,
    color: "#e5e7eb"
  },
  { 
    id: "papercups", 
    title: t('papercups_title'), 
    subtitle: t('supplies_subtitle'), 
    icon: <CupSoda strokeWidth={1.5} className="size-12" />,
    color: "#fabf37"
  },
  { 
    id: "restaurant-supplies", 
    title: t('restaurant_supplies_title'), 
    subtitle: t('supplies_subtitle'), 
    icon: <Pizza strokeWidth={1.5} className="size-12" />,
    color: "#fca5a5"
  },
  { 
    id: "marketing-materials", 
    title: t('marketing_materials_title'), 
    subtitle: t('supplies_subtitle'), 
    icon: <Megaphone strokeWidth={1.5} className="size-12" />,
    color: "#93c5fd"
  },
  { 
    id: "pharma-supplies", 
    title: t('pharma_supplies_title'), 
    subtitle: t('supplies_subtitle'), 
    icon: <Hospital strokeWidth={1.5} className="size-12" />,
    color: "#6ee7b7"
  },
  { 
    id: "fmcg-supplies", 
    title: "FMCG", 
    subtitle: t('supplies_subtitle'), 
    icon: <PackageIcon strokeWidth={1.5} className="size-12" />,
    color: "#f9a8d4"
  },
  { 
    id: "garments", 
    title: "Garments", 
    subtitle: t('supplies_subtitle'), 
    icon: <Shirt strokeWidth={1.5} className="size-12" />,
    color: "#c084fc"
  }
];

const products = (t: any) => [
  { id: 1, name: t('papercups_title') + " (SW)", category: t('papercups_title'), image: "https://images.unsplash.com/photo-1648587456176-4969b0124b12?auto=format&q=75&w=1600", desc: "Classic hot/cold beverage solution.", specs: [{ label: "Capacity", value: "8oz, 12oz, 16oz" }] },
  { id: 2, name: t('restaurant_supplies_title') + " Box", category: t('restaurant_supplies_title'), image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&q=75&w=1600", desc: "Grease-proof ventilated design.", specs: [{ label: "Material", value: "Eco-Kraft" }] },
  { id: 3, name: t('paper_bag'), category: t('paper_bag'), image: "https://images.unsplash.com/photo-1668012509229-782623ba3306?auto=format&q=75&w=1600", desc: "Premium textured carry bag.", specs: [{ label: "Finish", value: "Matte UV" }] },
  { id: 4, name: "Brochure", category: t('marketing_materials_title'), image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&q=75&w=1600", desc: "High-finish brand literature.", specs: [{ label: "Paper", value: "170 GSM Art" }] },
  { id: 5, name: "Medicine Box", category: t('pharma_supplies_title'), image: "https://images.unsplash.com/photo-1550572017-738a8a40f286?auto=format&q=75&w=1600", desc: "Sterile grade drug packaging.", specs: [{ label: "Safety", value: "SGS Verified" }] },
  { id: 6, name: "Snack Packaging", category: t('fmcg_supplies_title'), image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&q=75&w=1600", desc: "Moisture-locked retail box.", specs: [{ label: "Lock", value: "Neural Seal" }] },
];

const tickerItems = (t: any) => [
  t('precision'),
  t('high_speed'),
  t('neural_core'),
  t('eco_friendly_title'),
  t('quality_index'),
  t('global_logistics'),
  t('custom_branding_title'),
  t('production_inventory')
];

const DEFAULT_CLIENT_PROJECTS = [
  {
    company: "TechFlow Systems",
    project: "Neural Hardware Packaging",
    desc: "Anti-static, high-density foam inserts for next-gen processors.",
    image: "https://images.unsplash.com/photo-1631010231931-d2c396b444ec?auto=format&q=80&w=1000"
  },
  {
    company: "GreenLeaf Organics",
    project: "Biodegradable Food Containers",
    desc: "100% plant-based fiber composition with zero-plastic coating.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&q=80&w=1000"
  },
  {
    company: "Urban Brew Co.",
    project: "Thermal Insulation Cups",
    desc: "Double-wall patented construction maintaining heat for 4+ hours.",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&q=80&w=1000"
  },
  {
    company: "MediSafe Pharma",
    project: "Secure Sterility Boxes",
    desc: "ISO certified medical grade cardstock with tamper-evident seals.",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&q=80&w=1000"
  },
  {
    company: "Velocity Logistics",
    project: "Heavy-Duty Corrugated Units",
    desc: "Reinforced structural integrity for international freight.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&q=80&w=1000"
  }
];

export function AllProductsPage({ 
  onProductClick, 
  onAddToQuote, 
  onPageChange,
  products: dynamicProducts,
  clientProjects = DEFAULT_CLIENT_PROJECTS
}: { 
  onProductClick: (p: any) => void, 
  onAddToQuote: (p: any) => void, 
  onPageChange: (id: string) => void,
  products?: any[],
  clientProjects?: any[]
}) {
  const { t } = useLanguage();
  const [aiInput, setAiInput] = React.useState("");
  const [hoveredCat, setHoveredCat] = React.useState<string | null>(null);

  const categories = React.useMemo(() => categoryDetails(t), [t]);
  const defaultProducts = React.useMemo(() => products(t), [t]);
  const tickerData = React.useMemo(() => tickerItems(t), [t]);

  return (
    <div className="bg-white min-h-screen relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px]">
      <h1 className="sr-only">All products</h1>
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            y: [0, -100, 0],
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -right-20 size-[600px] bg-[#fabf37]/5 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 100, 0],
            rotate: [0, -5, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -left-20 size-[800px] bg-zinc-100 rounded-full blur-[150px]" 
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 pt-32 md:pt-40 mb-16 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-zinc-900 text-[#fabf37] rounded-full border border-white/10 shadow-2xl z-20"
          >
            <Rotate3d className="size-3 animate-spin-slow" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em]">{t('live_engine_active')}</span>
          </motion.div>

          <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-[8px] md:text-[10px]">
            {t('production_inventory')}
          </span>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-[90px] font-black uppercase tracking-tighter leading-none flex flex-wrap justify-center relative"
          >
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-black"
            >
              {t('select_department')}
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="text-zinc-200 ml-2 md:ml-6"
            >
              {t('department_suffix')}
            </motion.span>
            
            {/* High-Fidelity Pseudo-3D Animated Box */}
            <Hero3DBox />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 border border-zinc-100 mb-20 md:mb-32 bg-white rounded-[32px] md:rounded-[48px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]"
        >
          {categories.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.5 }}
              onClick={() => onPageChange(cat.id)}
              onMouseEnter={() => setHoveredCat(cat.id)}
              onMouseLeave={() => setHoveredCat(null)}
              className={`group relative p-10 md:p-12 flex flex-col items-center justify-center text-center gap-6 md:gap-8 transition-all hover:bg-zinc-50/80 perspective-[1000px] ${
                idx !== categories.length - 1 ? 'xl:border-r border-zinc-100' : ''
              } border-b xl:border-b-0`}
            >
              <div className="relative size-16 md:size-24 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: hoveredCat === cat.id ? 1.3 : 1,
                    opacity: hoveredCat === cat.id ? 0.3 : 0.1
                  }}
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{ backgroundColor: cat.color }}
                />
                <motion.div
                  animate={{ 
                    y: hoveredCat === cat.id ? -10 : 0,
                    scale: hoveredCat === cat.id ? 1.1 : 1
                  }}
                  className="relative z-10 text-zinc-300 group-hover:text-black transition-all duration-500"
                >
                  {React.cloneElement(cat.icon as React.ReactElement, { className: "size-8 md:size-12" })}
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-1 md:gap-2 relative z-10">
                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] leading-tight text-black max-w-[130px] group-hover:text-[#fabf37] transition-colors">
                  {cat.title}
                </span>
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.15em] text-zinc-500 group-hover:text-zinc-700">
                  {cat.subtitle}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-[#fabf37] scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-500" />
            </motion.button>
          ))}
        </motion.div>

        </div>
        
        <React.Suspense fallback={<div className="h-96 flex items-center justify-center">Loading...</div>}>
          <TopSellingProducts onProductClick={onProductClick} products={dynamicProducts} />
        </React.Suspense>
        
        <React.Suspense fallback={<div className="h-64 flex items-center justify-center">Loading...</div>}>
          <SocialMediaFeed />
        </React.Suspense>

        <div className="max-w-5xl mx-auto mb-32 relative px-4">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full h-[400px] bg-gradient-to-b from-[#fabf37]/5 via-transparent to-transparent blur-[100px] pointer-events-none" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 via-[#fabf37]/20 to-zinc-200 rounded-[40px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white border-2 border-black rounded-[36px] p-3 flex items-center gap-6 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.03)] group-hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,0.05)] transition-all duration-500">
              <div className="relative size-16 shrink-0">
                <div className="absolute inset-0 bg-black rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#fabf37] rounded-2xl -rotate-3 group-hover:rotate-0 flex items-center justify-center text-black transition-transform duration-500">
                  <Bot className="size-8" />
                </div>
              </div>
              <div className="flex-1 flex flex-col pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30">{t('neural_core')}</span>
                  <div className="h-[1px] flex-1 bg-black/5" />
                  <div className="flex gap-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="size-1 rounded-full bg-[#fabf37] animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    ))}
                  </div>
                </div>
                <input 
                  type="text"
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder={t('search_placeholder')}
                  className="w-full bg-transparent border-none outline-none font-black placeholder:text-black/10 text-black tracking-tight text-[12px] font-bold"
                />
              </div>
              <button className="relative group/btn overflow-hidden h-16 px-8 rounded-2xl bg-black text-[#fabf37] flex items-center justify-center gap-3 transition-all active:scale-95">
                <div className="absolute inset-0 bg-[#fabf37] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 font-black uppercase tracking-widest text-[11px] group-hover/btn:text-black transition-colors">{t('analyze')}</span>
                <Send className="relative z-10 size-5 group-hover/btn:text-black transition-colors" />
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-2"
          >
            <div className="px-4 py-1.5 rounded-full border border-black/5 bg-zinc-50 flex items-center gap-3">
              <div className="relative flex items-center justify-center">
                <div className="absolute size-2 bg-[#fabf37] rounded-full animate-ping" />
                <div className="relative size-2 bg-[#fabf37] rounded-full" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">{t('ai_status')}</span>
              <div className="w-[1px] h-3 bg-black/10" />
              <span className="text-[9px] font-bold text-black/30 uppercase tracking-widest">{t('system_online')}</span>
            </div>
          </motion.div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
             {[
               { label: "Eco-friendly Materials", icon: <Sparkles className="size-3" /> },
               { label: "Custom Specs Guide", icon: <Info className="size-3" /> },
               { label: "Global Shipping Estimator", icon: <Scale className="size-3" /> },
               { label: "Request 3D Prototype", icon: <Zap className="size-3" /> }
             ].map((chip, idx) => (
               <motion.button 
                 key={chip.label}
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.4 + (idx * 0.1) }}
                 onClick={() => setAiInput(chip.label)}
                 className="group flex items-center gap-3 px-6 py-3 bg-white border border-black/5 rounded-full hover:border-black hover:bg-black transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
               >
                 <span className="text-black/30 group-hover:text-[#fabf37] transition-colors">{chip.icon}</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-black group-hover:text-white transition-colors">{chip.label}</span>
               </motion.button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.2, ease: "circOut" }}
             className="relative h-[450px] rounded-[48px] overflow-hidden group bg-black"
           >
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100" alt="Manufacturing" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-8 bg-[#fabf37]" />
                  <p className="text-[#fabf37] text-[10px] font-black uppercase tracking-widest">Manufacturing Specialization</p>
                </div>
                <h4 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                  Precision <br /> Manufacturing.
                </h4>
                <p className="text-white/50 text-sm max-w-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                  Utilizing state-of-the-art neural-guided machinery to achieve micron-level cutting precision and foaming excellence.
                </p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.2, delay: 0.1, ease: "circOut" }}
             className="relative h-[450px] rounded-[48px] overflow-hidden group bg-black"
           >
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1744126175546-d7c5366e94f9?auto=format&q=80&w=1000" className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100" alt="Offset Printing Machine" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-8 bg-[#fabf37]" />
                  <p className="text-[#fabf37] text-[10px] font-black uppercase tracking-widest">Premium Print Finish</p>
                </div>
                <h4 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-6">
                  Offset <br /> Printing.
                </h4>
                <p className="text-white/50 text-sm max-w-sm font-medium leading-relaxed group-hover:text-white transition-colors">
                  High-fidelity color reproduction and sustainable ink technologies for industry-leading packaging aesthetics.
                </p>
              </div>
           </motion.div>
           <motion.div 
             initial={{ opacity: 0, y: 50 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.2, ease: "circOut" }}
             className="relative h-[450px] rounded-[48px] overflow-hidden group bg-black md:col-span-2"
           >
              <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&q=80&w=1500" className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 scale-105 group-hover:scale-100" alt="Design Team" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] w-8 bg-[#fabf37]" />
                  <p className="text-[#fabf37] text-[10px] font-black uppercase tracking-widest">Consultancy Services</p>
                </div>
                <h4 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                  Expert <br /> Design Team.
                </h4>
                <p className="text-white/60 text-lg max-w-md font-medium leading-relaxed group-hover:text-white transition-colors">
                  Work with our award-winning designers to create sustainable packaging that defines your brand's future.
                </p>
                <button className="mt-8 self-start px-10 py-4 bg-[#fabf37] text-black font-black uppercase tracking-widest text-xs rounded-full hover:scale-105 transition-transform">
                  Book A Session
                </button>
              </div>
           </motion.div>
        </div>

        <div className="w-full overflow-hidden bg-black py-6 border-y border-white/10 mb-32 relative z-10 rounded-3xl">
           <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
           <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
           
           <motion.div
             className="flex gap-16 w-max"
             animate={{ x: ["0%", "-50%"] }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
           >
             {[...tickerData, ...tickerData, ...tickerData, ...tickerData].map((item, i) => (
               <div key={`ticker-${i}`} className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-opacity cursor-default">
                  <div className="flex items-center gap-2">
                    <div className="size-1.5 bg-[#fabf37] rounded-full animate-pulse" />
                    <span className="text-[#fabf37] text-[10px] font-black uppercase tracking-[0.3em]">
                      LIVE
                    </span>
                  </div>
                  <span className="text-white text-sm font-black uppercase tracking-tighter">
                    {item}
                  </span>
                  <Activity className="size-4 text-zinc-800" />
               </div>
             ))}
           </motion.div>
        </div>

        <div className="pb-0">
           <div className="flex items-center gap-3 mb-12 justify-center">
             <div className="h-[2px] w-12 bg-[#fabf37]" />
             <span className="text-black text-xs font-black uppercase tracking-[0.3em]">{t('recent_deployments') || 'RECENT DEPLOYMENTS'}</span>
             <div className="h-[2px] w-12 bg-[#fabf37]" />
           </div>
           
           <div className="relative w-full overflow-hidden">
             <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
             <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
             
             <motion.div 
               className="flex gap-8"
               animate={{ x: ["0%", "-50%"] }}
               transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
               style={{ width: "fit-content" }}
             >
                {[...clientProjects, ...clientProjects, ...clientProjects].map((project, idx) => (
                  <div key={`${project.company}-${idx}`} className="w-[280px] md:w-[350px] shrink-0 group relative h-[400px] md:h-[500px] rounded-[32px] overflow-hidden border border-zinc-200 hover:border-[#fabf37] transition-all duration-500 hover:shadow-2xl">
                    <img loading="lazy" decoding="async" src={project.image} alt={project.project} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/20 transition-all duration-500" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-end">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="size-2 bg-[#fabf37] rounded-full" />
                        <span className="text-[#fabf37] text-[9px] font-black uppercase tracking-widest">{project.company}</span>
                      </div>
                      <h3 className="text-white text-xl font-black uppercase tracking-tighter mb-2 leading-none">{project.project}</h3>
                      <p className="text-white/60 text-[10px] font-bold leading-relaxed max-w-[280px] group-hover:text-white transition-colors line-clamp-2">
                        {project.desc}
                      </p>
                    </div>
                  </div>
                ))}
             </motion.div>
           </div>
        </div>
      </div>
  );
}