import React from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  ArrowRight, Sparkles, ShieldCheck, Thermometer, Leaf, Zap, 
  Settings, Box, Truck, CheckCircle2, Recycle, Globe, MapPin,
  CircleCheck, Maximize2, MousePointer2, Coffee, CupSoda
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { FullScreenVideoSection } from "../components/paperware/full-screen-video";
import { TopSellingProducts } from "../components/TopSellingProducts";
import imgSingleWall from "figma:asset/508ac66920d6bf79d8403965309bcc52fac5e5e7.webp";
import imgRippleWall from "figma:asset/bfe95f6268f355771c65cb6e1751781aaebe3d05.webp";
import imgDoubleWall from "figma:asset/b41403eedb4af19ba356d74c80558118d542f4cd.webp";
import imgErasebg from "figma:asset/49b7c1ac36cc61c1c728abd7230eab96c50bea6c.webp";

const variants = [
  {
    name: "Single Wall",
    image: imgSingleWall,
    sizes: "250 ML | 350 ML | 08 OZ | 12 OZ",
    price: "4.50",
    description: "Explore our handpicked selection of standout products, each thoughtfully chosen to bring you the perfect balance of quality and functionality."
  },
  {
    name: "Ripple Wall",
    image: imgRippleWall,
    sizes: "250 ML | 350 ML | 08 OZ | 12 OZ",
    price: "6.80",
    description: "Our most loved and talked-about products—ready to impress and delivered straight to your door with unmatched style."
  },
  {
    name: "Double Wall",
    image: imgDoubleWall,
    sizes: "250 ML | 350 ML | 08 OZ | 12 OZ",
    price: "7.20",
    description: "Designed to elevate your lifestyle and meet your everyday needs with ease, style, and superior insulation."
  }
];

const timeline = [
  { year: "2030 - OUR VISION", production: "50M Paper Cups", saving: "250,000 Kg CO2", color: "#fabf37" },
  { year: "2027", production: "2M Paper Cups", saving: "10,000 Kg CO2", color: "#fabf37" },
  { year: "2025", production: "8M Paper Cups", saving: "40,000 Kg CO2", color: "#fabf37" },
  { year: "2023", production: "2M Paper Cups", saving: "10,000 Kg CO2", color: "#fabf37" }
];

const features = [
  { icon: <ShieldCheck className="size-6" />, title: "Leak-Proof", desc: "Advanced ultrasonic sealing technology." },
  { icon: <Thermometer className="size-6" />, title: "Heat Shield", desc: "Triple-layer insulation for 95°C hold." },
  { icon: <Leaf className="size-6" />, title: "Eco-Liner", desc: "100% compostable plant-based coating." },
  { icon: <Zap className="size-6" />, title: "High Speed", desc: "Produced on German high-precision lines." },
];

const blueprintData = [
  { label: "Top Rim Diameter", value: "80.0 mm", tolerance: "±0.2" },
  { label: "Bottom Diameter", value: "52.5 mm", tolerance: "±0.1" },
  { label: "Vertical Height", value: "92.0 mm", tolerance: "±0.5" },
  { label: "Wall Thickness", value: "0.45 mm", tolerance: "±0.02" },
];

const comparisonSpecs = [
  { feature: "Liquid Temp Hold", single: "75°C", ripple: "90°C", double: "95°C" },
  { feature: "Outer Wall Temp", single: "60°C", ripple: "45°C", double: "40°C" },
  { feature: "Best Use Case", single: "Cold/Warm", ripple: "Hot Beverages", double: "Boiling Liquids" },
  { feature: "Print Clarity", single: "Excellent", ripple: "Textured", double: "Excellent" },
];

const productionSteps = [
  { icon: <Settings className="size-6" />, title: "Sourcing", desc: "Premium kraft paperboard." },
  { icon: <Box className="size-6" />, title: "Forming", desc: "High-precision automated molding." },
  { icon: <ShieldCheck className="size-6" />, title: "Testing", desc: "Batch-wise leakage & thermal stress test." },
  { icon: <Truck className="size-6" />, title: "Global Logistics", desc: "Climate-neutral delivery network." },
];


const bulkBenefits = [
  { title: "Volume Pricing", desc: "Tiered pricing for bulk orders." },
  { title: "Priority Support", desc: "Dedicated account manager for enterprise clients." },
  { title: "Custom Tooling", desc: "Exclusive molds and shapes for your brand." },
  { title: "Warehousing", desc: "Free storage for scheduled release deliveries." },
];

const faqs = [
  { q: "What is the Minimum Order Quantity (MOQ)?", a: "For standard variants, the MOQ is 10,000 units. For fully customized branding, it starts from 25,000 units." },
  { q: "How long does shipping take?", a: "Local delivery within 3-5 business days. International shipping varies by region, typically 15-30 days." },
  { q: "Are the cups fully compostable?", a: "Yes, our 'Green Line' features a plant-based PLA lining that is 100% industrially compostable." },
  { q: "Can you provide custom sizes?", a: "Absolutely. Beyond our standard 8oz, 12oz, and 16oz, we can develop custom molds for enterprise-scale orders." },
];

export function PaperCupsPage({ 
  onProductClick, 
  onPageChange,
  videoUrl,
  videoUrls
}: { 
  onProductClick: (p: any) => void;
  onPageChange: (page: string) => void;
  videoUrl?: string;
  videoUrls?: any[];
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [cupCount, setCupCount] = React.useState(50000);
  const [activeStudioColor, setActiveStudioColor] = React.useState("#ffffff");
  const [logoUrl, setLogoUrl] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState({ x: 0, y: 0 });
  const [heroRotation, setHeroRotation] = React.useState({ x: 0, y: 0 });
  const { t } = useLanguage();

  const handleGetCertificate = () => {
    const plasticSaved = (cupCount * 0.015).toFixed(0);
    const co2Reduction = (cupCount * 0.005).toFixed(0);
    
    toast.success("Certificate Generated!", {
      description: `Impact: ${plasticSaved}kg Plastic & ${co2Reduction}kg CO2 offset for ${cupCount.toLocaleString()} cups.`,
      duration: 5000,
    });
  };

  // Scroll logic for Hero Cup (Exiting)
  const heroRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scroll logic for Blueprint Section (Landing)
  const blueprintRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: blueprintScroll } = useScroll({
    target: blueprintRef,
    offset: ["start end", "center center"]
  });

  // Balanced spring settings for smooth yet responsive movement
  const smoothHero = useSpring(heroScroll, { stiffness: 80, damping: 25, restDelta: 0.001 });
  const smoothBlueprint = useSpring(blueprintScroll, { stiffness: 80, damping: 25, restDelta: 0.001 });

  // Synchronized Y transforms for a continuous UPWARD journey
  // Hero cup starts at center and floats UPWARDS out of view
  const heroCupY = useTransform(smoothHero, [0, 1], [0, -1200]); 
  const heroCupScale = useTransform(smoothHero, [0, 1], [1, 0.9]);
  
  // ULTRA-STRICT HAND-OFF: Use raw scroll for opacity to avoid spring lag/overlap
  // Hero cup vanishes exactly when the blueprint section begins its core animation
  const heroCupOpacity = useTransform(blueprintScroll, [0, 0.005], [1, 0]); 

  // One continuous cup, locked 1:1 to the page scroll (no spring, so no lag):
  //   A) starts in the "Purely Engineered" hero circle and comes down with the scroll,
  //      drifting across into the Blueprint card;
  //   B) ends in the Blueprint card and stays there.
  // The hero keeps an invisible cup purely as the measured start point. All positions
  // are measured on screen, so desktop and mobile layouts both work.
  const heroSlotRef = React.useRef<HTMLDivElement>(null);
  const heroCircleRef = React.useRef<HTMLDivElement>(null);
  const cupSlotRef = React.useRef<HTMLDivElement>(null);
  const { scrollY: rawScrollY } = useScroll();
  // light smoothing so wheel steps glide, without noticeable lag
  const pageScrollY = useSpring(rawScrollY, { stiffness: 400, damping: 50, mass: 0.4 });
  type Path = { A: number; dx: number; dy0: number; s0: number };
  const pathRef = React.useRef<Path>({ A: 0, dx: 0, dy0: 0, s0: 1.12 });
  const pathVersion = useMotionValue(0); // bumped after each measure to recompute
  const cupOffset = useTransform([pageScrollY, pathVersion], ([sy]: number[]) => {
    const { A, dx, dy0, s0 } = pathRef.current;
    if (A > 0 && sy < A) {
      const k = sy / A;                       // A: hero -> card, cup comes straight down,
      const u = Math.min(1, Math.max(0, (k - 0.45) / 0.55)); // then eases sideways into the card
      const e = u * u * (3 - 2 * u);
      // gentle sway on the way down that fades out, so it lands upright with no extra turn
      const sway = 14 * Math.sin(2 * Math.PI * k) * (1 - k);
      return { x: dx * (1 - e), y: dy0 + sy, scale: s0 + (1 - s0) * e, rotate: sway };
    }
    return { x: 0, y: 0, scale: 1, rotate: 0 }; // B: ends in the Blueprint card and stays there
  });
  // "Rim compression" label fades in only as the cup settles into the Blueprint card
  const rimLabelOpacity = useTransform([pageScrollY, pathVersion], ([sy]: number[]) => {
    const { A } = pathRef.current;
    if (A <= 1) return 0;
    return Math.min(1, Math.max(0, (sy - 0.9 * A) / (0.1 * A)));
  });
  const rimLabelX = useTransform(rimLabelOpacity, (v) => 20 * (1 - v));
  const blueprintCupX = useTransform(cupOffset, (o) => o.x);
  const blueprintCupY = useTransform(cupOffset, (o) => o.y);
  const blueprintCupScale = useTransform(cupOffset, (o) => o.scale);
  const blueprintCupRotate = useTransform(cupOffset, (o) => o.rotate);

  React.useLayoutEffect(() => {
    const measure = () => {
      const hero = heroSlotRef.current, circle = heroCircleRef.current, cup = cupSlotRef.current;
      if (!hero || !circle || !cup) return;
      const sy = window.scrollY;
      const h = hero.getBoundingClientRect();
      const c = cup.getBoundingClientRect();
      // untransformed centres in document coordinates (scale/rotate keep the centre)
      // start: the cup's visible body centred in the hero circle
      // (the artwork's body sits ~3.5% right / 2.9% above the image centre)
      const o = circle.getBoundingClientRect();
      const heroImgEl = hero.querySelector("img");
      const hw = heroImgEl?.clientWidth ?? h.width, hh = heroImgEl?.clientHeight ?? h.height;
      const hx = o.left + o.width / 2 + 0.015 * hw, /* nudged slightly right of centre */ hy = o.top + o.height / 2 + sy + 0.029 * hh;
      const cx = c.left + c.width / 2 - blueprintCupX.get(), cy = c.top + c.height / 2 + sy - blueprintCupY.get();
      const A = Math.max(1, cy - hy);         // scroll distance from hero to card
      const heroImg = hero.querySelector("img"), cardImg = cup.querySelector("img");
      const s0 = heroImg && cardImg && cardImg.clientWidth ? heroImg.clientWidth / cardImg.clientWidth : 1;
      pathRef.current = { A, dx: hx - cx, dy0: hy - cy, s0 };
      pathVersion.set(pathVersion.get() + 1);
    };
    measure();
    // re-measure whenever layout settles or shifts (fonts, lazy images, resize)
    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(measure); };
    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    document.fonts?.ready.then(schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(document.body);
    [heroSlotRef.current, heroCircleRef.current, cupSlotRef.current].forEach((el) => el && ro.observe(el));
    const imgs = [heroSlotRef.current, cupSlotRef.current].flatMap((el) => (el ? [...el.querySelectorAll("img")] : []));
    imgs.forEach((img) => img.addEventListener("load", schedule));
    const t = setTimeout(schedule, 800);
    return () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      imgs.forEach((img) => img.removeEventListener("load", schedule));
      ro.disconnect(); cancelAnimationFrame(raf); clearTimeout(t);
    };
  }, []);
  const blueprintCupOpacity = 1;

  const boxShadowOpacity = useTransform(smoothBlueprint, [0.8, 1], [0, 0.6]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Increased range for a more dynamic 360-degree interactive feel
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 160; 
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -80;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const handleHeroMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = ((clientX - left) / width - 0.5) * 40;
    const y = ((clientY - top) / height - 0.5) * -40;
    setHeroRotation({ x, y });
  };

  const handleHeroMouseLeave = () => {
    setHeroRotation({ x: 0, y: 0 });
  };

  return (
    <div ref={containerRef} className="relative bg-[#e3d1ae] min-h-screen overflow-x-hidden selection:bg-black selection:text-[#fabf37]">
      {/* 3D Immersive Hero Section */}
      <section ref={heroRef} className="relative min-h-[95vh] flex flex-col items-center justify-center overflow-hidden px-4 pt-32" onMouseMove={handleHeroMouseMove} onMouseLeave={handleHeroMouseLeave}>
        <motion.div animate={{ y: [0, -40, 0], rotate: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="absolute top-20 left-[10%] opacity-20 hidden lg:block"><img loading="lazy" decoding="async" src={imgErasebg} className="w-40 h-auto blur-sm" alt="" /></motion.div>
        <motion.div animate={{ y: [0, 40, 0], rotate: [0, -15, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} className="absolute bottom-20 right-[15%] opacity-20 hidden lg:block"><img loading="lazy" decoding="async" src={imgErasebg} className="w-60 h-auto blur-[2px]" alt="" /></motion.div>

        <div className="container mx-auto relative z-10 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="mb-8 inline-flex items-center gap-2 bg-black text-[#fabf37] px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-xl">
            <Sparkles className="size-4" /> {t('premium_manufacturing')}
          </motion.div>
          <h1 className="text-[40px] md:text-[70px] lg:text-[100px] font-black uppercase tracking-tighter leading-[0.85] mb-12 relative">
            <motion.span initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="block">{t('purely_engineered').split(' ')[0]}</motion.span>
            <motion.span initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="block text-[#fabf37]" style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>{t('purely_engineered').split(' ')[1]}</motion.span>
          </h1>
          <div className="relative max-w-4xl mx-auto">
             {/* Invisible start marker for the travelling cup (see cup journey above) */}
             <div ref={heroSlotRef} aria-hidden="true" style={{ opacity: 0 }} className="relative z-20">
               {/* Floating effect handled by animate if needed, but keeping it simple for scroll sync */}
               <img decoding="async" src={imgErasebg} className="w-full max-w-md mx-auto drop-shadow-[0_60px_100px_rgba(0,0,0,0.4)] -mt-8 md:-mt-16" alt="Featured Cup" />
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[400px] md:size-[600px] border border-black/5 rounded-full -z-10 animate-[spin_20s_linear_infinite]" />
             <div ref={heroCircleRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[300px] md:size-[450px] border-2 border-black/10 rounded-full -z-10" />
          </div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-4 md:mt-8 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => onPageChange("quote")}
              className="bg-black text-[#fabf37] px-6 py-2.5 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl flex items-center gap-3 group active:scale-95 text-[10px]"
            >
              {t('start_project')} <ArrowRight className="size-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onPageChange("products")}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
              className="backdrop-blur-md border border-black/10 px-6 py-2.5 rounded-full font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all active:scale-95 text-[10px]"
            >
              {t('view_specs')}
            </button>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-[#fabf37]"></path>
          </svg>
        </div>
      </section>

      {/* Announcement Ticker Bar - After Hero Section */}
      <div className="bg-black text-[#fabf37] py-3 overflow-hidden relative -mt-16">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-12 whitespace-nowrap"
        >
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex items-center gap-12 text-xs font-black uppercase tracking-[0.3em]">
              <div className="flex items-center gap-3">
                <div className="size-2 bg-[#fabf37] rounded-full" />
                <span>ECO-FRIENDLY MATERIALS</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 bg-[#fabf37] rounded-full" />
                <span>HIGH-VOLUME CAPACITY</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 bg-[#fabf37] rounded-full" />
                <span>CUSTOM BRANDING SOLUTIONS</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-2 bg-[#fabf37] rounded-full" />
                <span>CUSTOM PRINTED CUPS</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Technical Blueprint Section */}
      <section ref={blueprintRef} className="py-40 bg-[#1a1a1a] text-white relative z-20 overflow-visible [content-visibility:visible]">
        <div className="absolute inset-0" style={{ opacity: 0.05, backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-24">
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-4">
                <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">Technical Schematic</span>
                <h2 className="text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-[0.85]">The Digital <br /> <span className="text-[#fabf37]">Blueprint</span></h2>
                <p className="text-zinc-500 font-bold text-lg leading-relaxed max-w-lg">{t('blueprint_desc')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {blueprintData.map((data, i) => (
                  <div key={i} className="p-8 border border-white/10 rounded-3xl hover:border-[#fabf37] transition-all" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-1">{data.label}</p>
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-black text-[#fabf37]">{data.value}</span>
                      <span className="text-zinc-600 text-[10px] font-bold mb-1">Tol: {data.tolerance}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 relative group">
              {/* Box container - Overflow visible to allow the cup to "enter" from the top curve */}
              <div className="relative border border-[#fabf37]/10 rounded-[60px] p-12 bg-[#0c0c0c] min-h-[550px] flex items-center justify-center overflow-visible shadow-2xl z-10">
                 {/* Grid Overlay */}
                 <div className="absolute inset-0 opacity-20 pointer-events-none rounded-[60px] overflow-hidden" style={{ backgroundImage: 'radial-gradient(#fabf37 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />
                 
                 {/* CPU/Processor Icon from Screenshot - Aligned Top Left */}
                 <div className="absolute top-10 left-10 p-4 border border-[#fabf37]/20 rounded-2xl" style={{ backgroundColor: 'rgba(250, 191, 55, 0.05)', opacity: 0.4 }}>
                    <Zap className="size-16 text-[#fabf37]" />
                 </div>
                 
                 {/* Target Landing Glow */}
                 <motion.div 
                   style={{ opacity: boxShadowOpacity, backgroundColor: 'rgba(250, 191, 55, 0.1)' }}
                   className="absolute size-80 blur-[120px] rounded-full -z-10" 
                 />

                 {/* Blueprint Cup Landing Animation - Sync'd with Scroll View */}
                 <motion.div 
                   ref={cupSlotRef}
                   style={{ 
                     opacity: blueprintCupOpacity,
                     x: blueprintCupX,
                     y: blueprintCupY,
                     scale: blueprintCupScale,
                     rotate: blueprintCupRotate,
                     perspective: 1000
                   }}
                   className="relative z-20 w-full flex items-center justify-center will-change-transform"
                 >
                   <img decoding="async" 
                     src={imgErasebg} 
                     className="w-full max-w-[400px] h-auto drop-shadow-[0_60px_100px_rgba(0,0,0,0.9)] brightness-110 contrast-110" 
                     alt="Blueprint Cup" 
                   />
                   
                   {/* Blueprint Labels - Rim Compression exactly as per screenshot */}
                   <motion.div 
                     style={{ opacity: rimLabelOpacity, x: rimLabelX }}
                     className="absolute top-[5%] right-[10%] flex flex-col items-start gap-0"
                   >
                      <div className="px-3 py-1 bg-[#fabf37] text-black text-[9px] font-black rounded-sm whitespace-nowrap shadow-lg rotate-[-5deg]">RIM COMPRESSION</div>
                      <div className="w-[1px] h-16 bg-[#fabf37] ml-4 origin-top rotate-[15deg]" />
                   </motion.div>
                 </motion.div>

                 {/* Corners decorations */}
                 <div className="absolute top-6 left-6 size-12 border-t border-l border-[#fabf37]/20 rounded-tl-3xl" />
                 <div className="absolute bottom-6 right-6 size-12 border-b border-r border-[#fabf37]/20 rounded-br-3xl" />
              </div>

              {/* Origin badge */}
              <motion.div 
                style={{ y: useTransform(smoothBlueprint, [0.3, 0.6], [30, 0]), opacity: useTransform(smoothBlueprint, [0.3, 0.6], [0, 1]) }}
                className="absolute bottom-[-5%] right-[-5%] bg-[#fabf37] text-black px-10 py-8 rounded-[50px] shadow-[0_40px_100px_rgba(250,191,55,0.4)] flex items-center gap-6 z-20"
              >
                 <div className="size-14 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                    <CircleCheck className="size-8" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 leading-none mb-2">Made in Dhaka</span>
                    <span className="text-3xl font-black tracking-tighter leading-none">Custom printed</span>
                 </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Tiers / Variants */}
      <section className="container mx-auto px-4 py-32 relative">
        <div className="flex justify-between items-end mb-16">
          <div className="max-w-2xl">
            <span className="text-[#fabf37] bg-black px-4 py-1 rounded-full font-black uppercase tracking-[0.3em] text-[10px] mb-4 inline-block">The Portfolio</span>
            <h2 className="text-[50px] md:text-[80px] font-black uppercase tracking-tighter leading-none text-black">{t('product_tiers')}</h2>
          </div>
          <div className="hidden md:flex gap-4">
             <div className="size-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"><ArrowRight className="size-6 rotate-180" /></div>
             <div className="size-14 rounded-full border border-black/10 flex items-center justify-center hover:bg-black hover:text-white transition-all cursor-pointer"><ArrowRight className="size-6" /></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {variants.map((v, i) => (
            <motion.div 
              key={v.name} 
              initial={{ opacity: 0, y: 50 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              onClick={() => onProductClick(v)}
              style={{ borderColor: 'rgba(0, 0, 0, 0.05)' }}
              className="relative group h-[600px] bg-[#f4e6cc] rounded-[60px] p-12 overflow-hidden border flex flex-col justify-end shadow-2xl cursor-pointer"
            >
              <div className="absolute inset-0 bg-[#fabf37] translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full px-8 text-center z-10">
                 <motion.div whileHover={{ y: -30, scale: 1.1 }} className="transition-all duration-500 cursor-pointer"><img loading="lazy" decoding="async" src={v.image} className="w-full max-w-[240px] mx-auto drop-shadow-2xl" alt="" /></motion.div>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-black">{v.name}</h3>
                <p className="font-bold text-sm mb-6 transition-colors" style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{v.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>{v.sizes}</span>
                  <div className="size-12 rounded-full bg-black text-[#fabf37] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all"><ArrowRight className="size-6" /></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />

      {/* Industrial Video Section - Positioned after Product Tiers */}
      <FullScreenVideoSection videoData={videoUrls || []} />

      {/* Material Comparison Matrix */}
      <section className="py-40 bg-black text-white relative overflow-hidden">
        {/* Decorative Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mb-24">
            <span className="text-black bg-[#fabf37] px-4 py-1 rounded-full font-black uppercase tracking-[0.3em] text-[10px] mb-6 inline-block">Engineering Standards</span>
            {/* Removed the small video from here */}
            <h2 className="text-[50px] md:text-[80px] font-black uppercase tracking-tighter leading-none">{t('perf_matrix')}</h2>
            <p className="mt-8 text-zinc-500 font-bold text-lg max-w-xl">Deep-dive into the thermal and physical properties of our premium packaging variants.</p>
          </div>

          <div className="space-y-8">
            {comparisonSpecs.map((row, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ 
                  backgroundColor: 'rgba(24, 24, 27, 0.2)', 
                  borderColor: 'rgba(255, 255, 255, 0.05)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(250, 191, 55, 0.2)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 lg:p-12 backdrop-blur-3xl border rounded-[60px] transition-all group"
              >
                {/* Parameter Label */}
                <div className="lg:col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="size-3 rounded-full bg-[#fabf37] group-hover:scale-150 transition-transform shadow-[0_0_15px_#fabf37]" />
                    <p className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white group-hover:text-[#fabf37] transition-colors">{row.feature}</p>
                  </div>
                </div>

                {/* Values Grid - Matches your screenshot style */}
                <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-8 items-center">
                  {/* Single Wall */}
                  <div className="space-y-2 px-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Single Wall</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{row.single}</p>
                  </div>
                  
                  {/* Ripple Wall - The Highlighted Box from Screenshot */}
                  <div className="p-10 rounded-[45px] bg-[#0c0c0c] border space-y-4 relative overflow-hidden" style={{ borderColor: 'rgba(250, 191, 55, 0.2)', boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)' }}>
                    <div className="absolute top-0 right-0 p-6" style={{ opacity: 0.05 }}>
                       <Zap className="size-12 text-[#fabf37]" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37]">Ripple Wall</p>
                    <p className="text-4xl lg:text-5xl font-black text-[#fabf37] leading-none tracking-tighter drop-shadow-sm">{row.ripple}</p>
                  </div>

                  {/* Double Wall */}
                  <div className="space-y-2 px-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Double Wall</p>
                    <p className="text-3xl font-black text-white tracking-tighter">{row.double}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* New Contact Sales Buttons */}
          <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPageChange("contact");
              }}
              className="w-full md:w-auto bg-[#fabf37] text-black px-12 py-8 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(250,191,55,0.2)]"
            >
              <MapPin className="size-6" /> Contact Domestic Sales
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onPageChange("contact");
              }}
              style={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}
              className="w-full md:w-auto border-2 hover:border-[#fabf37] hover:bg-[#fabf37] hover:text-black text-white px-12 py-8 rounded-full font-black uppercase tracking-widest flex items-center justify-center gap-4 transition-all"
            >
              <Globe className="size-6" /> Contact International Sales
            </motion.button>
          </div>
        </div>
      </section>

      {/* Interactive Studio Experience */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="text-[#fabf37] bg-black px-4 py-1 rounded-full font-black uppercase tracking-[0.3em] text-[10px] inline-block">Preview</span>
                <h2 className="text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-none text-zinc-900">{t('studio_interactive')}</h2>
                <p className="text-zinc-600 font-bold text-lg max-w-md">{t('studio_desc')}</p>
              </div>
              <div className="space-y-8">
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest text-zinc-900">Select Base Material</p>
                  <div className="flex gap-4">
                    {["#ffffff", "#e3d1ae", "#fabf37", "#1a1a1a"].map((color) => (
                      <button 
                        key={color} 
                        onClick={() => setActiveStudioColor(color)} 
                        aria-label={`Base material colour ${({ "#ffffff": "white", "#e3d1ae": "kraft", "#fabf37": "yellow", "#1a1a1a": "black" } as Record<string, string>)[color]}`}
                        aria-pressed={activeStudioColor === color}
                        className={`size-14 rounded-full border-4 transition-all ${activeStudioColor === color ? 'border-black scale-110 shadow-xl' : ''}`} 
                        style={{ 
                          backgroundColor: color,
                          borderColor: activeStudioColor === color ? '#000' : 'rgba(0, 0, 0, 0.05)'
                        }}
                        onMouseEnter={(e) => {
                          if (activeStudioColor !== color) {
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.2)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (activeStudioColor !== color) {
                            e.currentTarget.style.borderColor = 'rgba(0, 0, 0, 0.05)';
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>
                <label className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl w-fit cursor-pointer inline-block text-center">
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setLogoUrl(url);
                      }
                    }}
                  />
                  <div className="flex flex-col gap-1">
                    <span>{t('upload_logo')}</span>
                    <span className="text-[9px] font-bold normal-case tracking-normal opacity-60">Upload only PNG file</span>
                  </div>
                </label>
              </div>
            </div>
            <div 
              className="relative group [perspective:2000px] cursor-grab active:cursor-grabbing w-full flex items-center justify-center py-20"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div 
                animate={{ 
                  rotateY: rotation.x,
                  rotateX: rotation.y,
                }} 
                transition={{ type: "spring", stiffness: 120, damping: 25, mass: 1 }}
                style={{ 
                  transformStyle: "preserve-3d",
                  backgroundColor: activeStudioColor === "#ffffff" ? "#f4e6cc" : activeStudioColor,
                  borderColor: 'rgba(0, 0, 0, 0.05)'
                }}
                className="relative rounded-[100px] p-20 lg:p-32 border shadow-[0_100px_150px_rgba(0,0,0,0.15)] flex items-center justify-center min-h-[700px] w-full max-w-4xl" 
              >
                <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to top right, rgba(255, 255, 255, 0.3), transparent, rgba(0, 0, 0, 0.1))' }} />
                
                <motion.div 
                  key={activeStudioColor} 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  className="relative z-10 w-full max-w-[450px] flex items-center justify-center"
                  style={{ transform: "translateZ(100px)" }}
                >
                   {/* Main Cup Image - Aligned for the preview */}
                   <div className="relative w-full h-full flex items-center justify-center">
                      <img loading="lazy" decoding="async" 
                        src={imgErasebg} 
                        className="w-full h-auto drop-shadow-[0_60px_120px_rgba(0,0,0,0.3)] brightness-105 transform -rotate-[12deg] scale-[1.25]" 
                        alt="Custom Cup" 
                      />
                      
                      {/* Logo Preview Overlay - Precisely Aligned to the Cup's Center */}
                      <div 
                        className="absolute top-[47%] left-[49%] w-[32%] pointer-events-none flex items-center justify-center"
                        style={{ transform: "translate(-50%, -50%) translateZ(130px) rotate(5deg)" }}
                      >
                        <AnimatePresence mode="wait">
                          {logoUrl ? (
                            <motion.div
                              key="uploaded-logo"
                              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                              animate={{ opacity: 0.9, scale: 1, filter: "blur(0px)" }}
                              exit={{ opacity: 0 }}
                              className="w-full"
                            >
                              <img loading="lazy" decoding="async" 
                                src={logoUrl} 
                                className="w-full h-auto object-contain mix-blend-multiply contrast-125 saturate-150 drop-shadow-sm" 
                                alt="Uploaded Logo" 
                              />
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="default-logo"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', borderColor: 'rgba(250, 191, 55, 0.5)' }}
                              className="backdrop-blur-3xl px-8 py-4 rounded-full border shadow-2xl flex flex-col items-center gap-2 whitespace-nowrap"
                            >
                               <div className="flex items-center gap-2">
                                  <div className="size-2.5 bg-[#fabf37] rounded-full animate-pulse shadow-[0_0_15px_#fabf37]" />
                                  <span className="text-[#fabf37] font-black uppercase tracking-[0.3em] text-[10px]">Project Paperware</span>
                               </div>
                               <span className="text-[8px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255, 255, 255, 0.4)' }}>3D Preview</span>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                   </div>
                </motion.div>

                {/* Status HUD Overlays */}
                <div className="absolute top-16 left-16 flex flex-col gap-6">
                   <div className="bg-white/60 backdrop-blur-2xl px-6 py-4 rounded-[32px] border border-white/40 shadow-xl flex items-center gap-4">
                     <div className="size-10 rounded-2xl bg-black flex items-center justify-center text-[#fabf37]">
                        <Maximize2 className="size-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Viewport</p>
                        <p className="text-sm font-black text-black">Interactive 360°</p>
                     </div>
                   </div>
                </div>

                <div className="absolute bottom-16 right-16">
                   <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                    className="backdrop-blur-xl px-8 py-4 rounded-full border shadow-2xl flex items-center gap-4"
                   >
                      <MousePointer2 className="size-5 text-[#fabf37]" />
                      <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Drag to Explore</span>
                   </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Order Benefits */}
      <section className="py-32 bg-[#e3d1ae]">
        <div className="container mx-auto px-4">
          <div className="bg-black rounded-[80px] p-12 lg:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Box className="size-80 text-[#fabf37]" /></div>
            <div className="relative z-10">
              <div className="max-w-3xl mb-16">
                <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs mb-4 inline-block">Enterprise Solutions</span>
                <h2 className="text-[42px] lg:text-[72px] font-black uppercase tracking-tighter leading-none text-white mb-8">Scale Your <br /> Impact With Us</h2>
                <p className="text-zinc-400 font-bold text-lg leading-relaxed">We specialize in high-volume production for global coffee chains and fast-food giants. Our infrastructure is built to handle millions of units per month with consistent quality.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {bulkBenefits.map((benefit, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-8 rounded-[40px] bg-zinc-900 border hover:border-[#fabf37] transition-all group" style={{ borderColor: 'rgba(255, 255, 255, 0.05)' }}>
                    <div className="size-12 rounded-2xl bg-[#fabf37] text-black flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform"><CheckCircle2 className="size-6" /></div>
                    <h4 className="text-xl font-black uppercase tracking-tight text-white mb-2">{benefit.title}</h4>
                    <p className="text-zinc-500 font-bold text-xs">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="mt-16 flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={() => {
                    onPageChange("contact");
                  }}
                  className="bg-[#fabf37] text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(250,191,55,0.3)] active:scale-95"
                >
                  Contact Sales
                </button>
                <button 
                  onClick={() => {
                    toast.info("Opening Sample Request Form...", {
                      description: "Please fill in your shipping details in the next step.",
                    });
                    onPageChange("quote");
                  }}
                  className="border-2 border-white/20 text-white px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all active:scale-95"
                >
                  Request Samples
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability Calculator */}
      <section className="py-40 bg-black text-[#fabf37] relative overflow-hidden">
        <div className="absolute top-0 left-0 size-[600px] bg-[#fabf37]/10 blur-[150px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 size-[600px] bg-[#fabf37]/10 blur-[150px] translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-6">
                 <h2 className="text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-none text-white italic">Eco <br /> Dynamics</h2>
                 <p className="text-zinc-400 font-bold text-xl leading-relaxed max-lg">Every decision matters. Calculate the ecological weight of your brand and discover the impact of switching to Paperware sustainable fibers.</p>
               </div>
            </div>
            <div className="backdrop-blur-3xl p-12 lg:p-20 rounded-[80px] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
               <div className="space-y-12">
                 <div className="space-y-8">
                   <div className="flex justify-between items-end"><p className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Order Volume</p><p className="text-4xl font-black text-white">{cupCount.toLocaleString()} <span className="text-xs text-[#fabf37]">PCS</span></p></div>
                   <div className="relative h-4 rounded-full overflow-hidden border border-white/10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(cupCount / 1000000) * 100}%` }} className="absolute h-full bg-[#fabf37] shadow-[0_0_20px_rgba(250,191,55,0.5)]" />
                      <input type="range" aria-label="Order volume (cups)" min="10000" max="1000000" step="10000" value={cupCount} onChange={(e) => setCupCount(parseInt(e.target.value))} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                   </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="p-8 rounded-[40px] border border-white/10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}><p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Plastic Saved</p><p className="text-3xl font-black text-white">{(cupCount * 0.015).toFixed(0)} <span className="text-xs">KG</span></p></div>
                    <div className="p-8 rounded-[40px] border border-white/10" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}><p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">CO2 Reduction</p><p className="text-3xl font-black text-white">{(cupCount * 0.005).toFixed(0)} <span className="text-xs">KG</span></p></div>
                 </div>
                 {/* ... button removed ... */}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anatomy of Engineering */}
      <section className="py-40 bg-[#e3d1ae] relative">
         <div className="container mx-auto px-4">
           <div className="grid lg:grid-cols-2 gap-24 items-center">
             <div className="relative order-2 lg:order-1">
                <div className="relative z-10 bg-[#f4e6cc] rounded-[80px] p-20 border border-black/5 shadow-2xl">
                   <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="relative">
                     <img loading="lazy" decoding="async" src={imgErasebg} className="w-full h-auto drop-shadow-2xl opacity-60 mix-blend-multiply" alt="Anatomy" />
                     <div className="absolute top-[10%] -right-10 bg-black text-[#fabf37] px-6 py-3 rounded-2xl shadow-2xl"><span className="text-[10px] font-black uppercase tracking-widest">Reinforced Lip</span></div>
                     <div className="absolute top-[40%] -left-10 bg-white text-black px-6 py-3 rounded-2xl shadow-2xl"><span className="text-[10px] font-black uppercase tracking-widest">PLA Lining</span></div>
                     <div className="absolute bottom-[20%] -right-5 bg-[#fabf37] text-black px-6 py-3 rounded-2xl shadow-2xl"><span className="text-[10px] font-black uppercase tracking-widest">Air Pocket</span></div>
                   </motion.div>
                </div>
                <div className="absolute -top-10 -right-10 size-40 bg-black rounded-full mix-blend-overlay blur-3xl" />
                <div className="absolute -bottom-10 -left-10 size-40 bg-[#fabf37] rounded-full mix-blend-overlay blur-3xl" />
             </div>
             <div className="space-y-12 order-1 lg:order-2">
               <div className="space-y-6">
                 <h2 className="text-[50px] lg:text-[80px] font-black uppercase tracking-tighter leading-[0.85]">Structural <br /> Integrity</h2>
                 <p className="text-black/60 font-bold text-xl leading-relaxed">Beyond the aesthetic, our cups are built for high-performance thermal retention and physical resilience. Each layer serves a critical engineering purpose.</p>
               </div>
               <div className="grid grid-cols-1 gap-6">
                 {[
                   { title: "Triple Seal", desc: "Zero leakage guaranteed through ultrasonic bonding." },
                   { title: "Weight Balance", desc: "Optimized center of gravity for industrial vending." },
                   { title: "Odor Neutral", desc: "Soy-based inks ensure zero taste interference." }
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-6 p-8 bg-white/30 backdrop-blur-md rounded-[40px] border border-black/5 group hover:bg-black transition-all duration-500">
                     <div className="size-4 bg-[#fabf37] rounded-full group-hover:scale-150 transition-transform" />
                     <div>
                       <h4 className="font-black uppercase tracking-tight group-hover:text-white transition-colors">{item.title}</h4>
                       <p className="text-xs font-bold text-black/50 group-hover:text-white/40 transition-colors">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           </div>
         </div>
      </section>

      {/* Say No To Plastic Section */}
      <section className="bg-black py-48 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fabf37 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="container mx-auto px-4 relative z-10">
           <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="space-y-16 relative pt-32">
             {/* Video Background */}
             <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-70 pointer-events-none z-0">
               {/* Rotating Circle */}
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 flex items-center justify-center"
               >
                 <div className="w-[2400px] h-[2400px] rounded-full border-4 border-[#fabf37]/20" />
               </motion.div>
               
               {/* Static Cup Video */}
               <video 
                 width="2200" 
                 height="2200" 
                 autoPlay 
                 loop 
                 muted 
                 playsInline 
                 className="rounded-3xl brightness-150 contrast-110"
                 onError={(e) => {
                   e.currentTarget.style.display = 'none';
                 }}
                 suppressHydrationWarning
               >
                 <source src="https://paperware.definedsolution.com/wp-content/uploads/2025/06/plastic2.webm" type="video/webm" />
               </video>
             </div>
             
             <h2 className="md:text-[60px] lg:text-[80px] font-black tracking-tighter uppercase leading-[0.75] italic text-[#fabf37] text-[160px] relative z-10">SAY NO<br />TO PLASTIC</h2>
             <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-4xl mx-auto relative z-10">
                <p className="text-zinc-500 font-bold leading-relaxed italic text-left flex-1 border-l-4 border-[#fabf37] pl-8 text-[15px]">"We aren't just selling paperware. We are re-engineering the relationship between enterprise production and planetary health."</p>
                <div className="flex-1 flex justify-center">
                   <motion.div 
                     animate={{ rotate: 360 }}
                     transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                     className="size-40 rounded-full border border-zinc-800 flex items-center justify-center relative group cursor-pointer"
                   >
                     <div className="absolute inset-0 bg-[#fabf37] rounded-full scale-0 group-hover:scale-100 transition-transform duration-500" />
                     <Recycle className="size-16 text-[#fabf37] group-hover:text-black relative z-10 transition-colors" />
                   </motion.div>
                </div>
             </div>
           </motion.div>
        </div>
      </section>

      {/* WEBM Video Test Section */}
      <section className="py-32 bg-[#ffbd32] text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex justify-center">
              <video 
                width="512" 
                height="512" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="block"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                suppressHydrationWarning
              >
                <source 
                  src="https://paperware.definedsolution.com/wp-content/uploads/2025/05/hero512_slow.webm" 
                  type="video/webm" 
                />
                Your browser does not support the video tag or the .webm format.
              </video>
            </div>

            <div className="flex flex-col items-center gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange("quote")}
                className="bg-black text-[#fabf37] px-8 py-3.5 rounded-full flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] group"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em]">Start Project</span>
                <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
              </motion.button>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange("products")}
                className="bg-[#f7e4c2] text-black px-8 py-3 rounded-full shadow-lg"
              >
                <span className="text-xs font-black uppercase tracking-[0.2em]">View Specs</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="pt-32 pb-8 bg-[#e3d1ae] relative overflow-hidden flex flex-col items-center justify-center">
        {/* Wavy Background from screenshot */}
        
      </section>

    </div>
  );
}