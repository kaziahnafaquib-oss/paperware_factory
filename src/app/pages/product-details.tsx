import imgBoxGroup from 'figma:asset/370cc946765f24fecd2241c5798febf3f636cf5e.webp';
import imgBoxBeige from 'figma:asset/44417efdbf939eba86a583d08d358bb76989e3cd.webp';
import imgBoxRed from 'figma:asset/ee1e96d0bd347161979763a2b2031584e134c4d4.webp';
import pTakeawayFoodBox from "figma:asset/products/takeaway-food-box.webp";
import iCafeCup from "figma:asset/industries/cafe-cup.webp";
import pMedicineBoxes from "figma:asset/products/medicine-boxes.webp";
import pGiftBags from "figma:asset/products/gift-bags.webp";
import pCarryBagPink from "figma:asset/products/carry-bag-pink.webp";
import pChowmeinBoxes from "figma:asset/products/chowmein-boxes.webp";
import pStickers from "figma:asset/products/stickers.webp";
import pConfectioneryBoxes from "figma:asset/products/confectionery-boxes.webp";
import React from "react";
import { motion, AnimatePresence } from "motion/react"; 
import { 
  ArrowLeft, Zap, Package, ShoppingCart, 
  Truck, ShieldCheck, CircleCheck, ChevronRight,
  Maximize2, Box, Info, Share2, Heart,
  Leaf, Layers, Ruler, Recycle, History,
  TrendingUp, Clock, MapPin, Star, FileText,
  Settings2, ClipboardList, X, RefreshCw,
  Award, Globe, Cpu, HardHat, Droplets,
  ArrowDownToLine, MousePointer2, Thermometer,
  ArrowRight, Wind, Droplet, Sun,
  Facebook, Instagram, Linkedin, MessageCircle, PlayCircle
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, easeOut3, clamp01 } from "../lib/useScrollScrub";
import { useLanguage } from "../context/LanguageContext";
import { useGo } from "../lib/useGo";
import { CupSizeTables } from "../components/paperware/cup-size-tables";

// Paper cup pages pass "Single/Double/Ripple Wall" variants or "Paper Cup(s)" products.
const isPaperCupProduct = (p: { name: string; category?: string }) => {
  const text = `${p.category ?? ""} ${p.name}`;
  if (/holder|lid|sleeve/i.test(text)) return false;
  return /\bcups?\b/i.test(text) || /^\s*(single|double|ripple)[\s-]wall\b/i.test(p.name);
};

const FloatingDataBits = () => {
  const [bits, setBits] = React.useState<any[]>([]);

  React.useEffect(() => {
    setBits([...Array(12)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 500,
      duration: Math.random() * 10 + 10
    })));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
      {bits.map((bit) => (
        <motion.div
          key={bit.id}
          initial={{ 
            x: bit.x + "%", 
            y: bit.y + "%",
            z: bit.z,
            opacity: 0 
          }}
          animate={{ 
            y: [null, (bit.y + 20) % 100 + "%"],
            z: [null, (bit.z + 100) % 500],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: bit.duration, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute size-1 bg-[#fabf37] rounded-full"
        />
      ))}
    </div>
  );
};

interface ProductDetailsProps {
  product: {
    name: string;
    desc: string;
    image: string;
    price?: string;
    category?: string;
    specs?: { label: string; value: string }[];
  };
  onBack: () => void;
  onAddToQuote: (p: any) => void;
  onContactClick?: () => void;
}

export function ProductDetailsPage({ product, onBack, onAddToQuote, onContactClick }: ProductDetailsProps) {
  const go = useGo();
  const [quantity, setQuantity] = React.useState(1000); 
  const [activeTab, setActiveTab] = React.useState<string>("description");
  const [show360, setShow360] = React.useState(false);
  const [rotation, setRotation] = React.useState(0);
  const [selectedMaterial, setSelectedMaterial] = React.useState("Premium Swedish Pulp");
  const [selectedThickness, setSelectedThickness] = React.useState("280 GSM");
  const [selectedFinish, setSelectedFinish] = React.useState("Matte UV");
  const [activeImageIdx, setActiveImageIdx] = React.useState(0);
  const { t } = useLanguage();
  const suggestedRef = React.useRef<HTMLDivElement>(null);
  const clientsRef = React.useRef<HTMLDivElement>(null);
  // Scroll-scrubbed horizontal strips: each track slides left 1:1 with the page as its section crosses the viewport.
  useScrollScrub(() => {
    const vh = window.innerHeight || 1;
    [suggestedRef.current, clientsRef.current].forEach((track) => {
      if (!track) return;
      const wrap = track.parentElement as HTMLElement;
      const r = wrap.getBoundingClientRect();
      const p = clamp01((vh - r.top) / (vh + r.height));
      const travel = Math.max(track.scrollWidth - wrap.clientWidth, 0);
      track.style.transform = `translateX(${(-p * travel).toFixed(1)}px)`;
    });
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const productImages = [
    imgBoxGroup,
    imgBoxBeige,
    imgBoxRed,
    "",
    ""
  ];

  const clientVideos = [
    { client: "Global Foods Ltd", location: "Singapore", thumb: pTakeawayFoodBox },
    { client: "EcoBrews Co", location: "UK", thumb: iCafeCup },
    { client: "PharmaCore", location: "Germany", thumb: pMedicineBoxes },
    { client: "Urban Retail", location: "Dubai", thumb: pGiftBags }
  ];

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this industrial packaging solution: ${product.name}`;
    const links = {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      insta: `https://www.instagram.com/`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      wa: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    window.open(links[platform as keyof typeof links], '_blank', 'noopener,noreferrer');
  };

  const productionMetrics = [
    { label: "Daily Capacity", value: "250,000 Units", icon: <Zap className="size-4" /> },
    { label: "Current Load", value: "High (82%)", icon: <TrendingUp className="size-4" /> },
    { label: "Material Stock", value: "Verified", icon: <Box className="size-4" /> }
  ];

  const materialComparison = [
    { type: "Art Card", stiffness: "High", print: "Excellent", eco: "70%", recommended: "Packaging" },
    { type: "Kraft Paper", stiffness: "Medium", print: "Vintage", eco: "100%", recommended: "Bags" },
    { type: "Duplex Board", stiffness: "Ultra", print: "Standard", eco: "85%", recommended: "Boxes" }
  ];

  const sustainabilityMetrics = [
    { label: "Plastic Displaced", value: (quantity * 0.12).toFixed(1) + " kg", icon: <Wind className="size-4" />, color: "text-emerald-500" },
    { label: "Carbon Offset", value: (quantity * 0.05).toFixed(1) + " kg", icon: <Sun className="size-4" />, color: "text-[#fabf37]" },
    { label: "Water Saved", value: (quantity * 0.8).toFixed(0) + " L", icon: <Droplet className="size-4" />, color: "text-blue-500" }
  ];

  const qualityCerts = [
    { name: "ISO 9001", icon: <Award className="size-5" />, desc: "Quality Management" },
    { name: "FSC Certified", icon: <Leaf className="size-5" />, desc: "Eco-Friendly Paper" },
    { name: "SGS Verified", icon: <ShieldCheck className="size-5" />, desc: "Material Safety" },
    { name: "Industrial 4.0", icon: <Cpu className="size-5" />, desc: "Neural Production" }
  ];

  const manufacturingSteps = [
    { title: "Design Audit", time: "1-2 Days", icon: <Settings2 /> },
    { title: "Plate Setting", time: "1 Day", icon: <Layers /> },
    { title: "Offset Printing", time: "2-3 Days", icon: <Droplets /> },
    { title: "Finishing & QC", time: "1-2 Days", icon: <CircleCheck /> },
    { title: "Dispatch", time: "Instant", icon: <Truck /> }
  ];

  const attributes = [
    { name: "Material Grade", options: ["Premium Swedish Pulp", "Recycled Kraft", "Luxury Art Paper"] },
    { name: "Thickness / GSM", options: ["280 GSM", "300 GSM", "350 GSM", "400 GSM"] },
    { name: "Finish Type", options: ["Matte UV", "Gloss Laminated", "Soft Touch", "Metallic Foil"] }
  ];

  const specs = product.specs || [
    { label: "Durability", value: "Industrial Grade" },
    { label: "Eco-Rating", value: "FSC Certified" },
    { label: "Print Quality", value: "600 DPI Offset" },
    { label: "Dispatch", value: "24-48 Hours" }
  ];

  // Mock data for Additional Information
  const additionalInfo = [
    { label: "Size Option", value: "14in X 22in, 15in X 20in, 18in X 23in, Custom Size" },
    { label: "Page Count", value: "12 page, 6 page, 3 page" },
    { label: "Paper Option", value: "Art Card – 300gsm, Art Paper – 120gsm, Art Paper – 150gsm, Art Paper – 170gsm" },
    { label: "Binding Option", value: "Spiral Binding, Wire O Binding" },
    { label: "Color Option", value: "Four Color/Full Color, One Color, Three Color, Two Color" },
    { label: "Delivery Option", value: "Home Delivery Inside Dhaka, Home Delivery Outside Dhaka" },
  ];

  // Mock data for Tags
  const tags = ["academic wall calendar", "artistic wall calendar", "bengali wall calendar", "business wall calendar", "Calendar", "Calendar Design", "Calendar Printing", "custom wall calendar", "industrial wall calendar", "premium wall calendar", "Wall Calendar 2025"];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-white min-h-screen pt-32 md:pt-40 pb-20 font-['Poppins',sans-serif] relative overflow-hidden"
    >
      <FloatingDataBits />
      <div className="container mx-auto px-4 -mt-4 md:-mt-6">
        {/* Navigation & Actions */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12 gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 hover:text-black transition-colors"
          >
            <ArrowLeft className="size-4" /> {t("back_to_catalog")}
          </button>
          
          {/* Social Sharing Section */}
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <motion.div 
              animate={{ 
                opacity: [0.6, 1, 0.6],
                color: ["#000", "#fabf37", "#000"],
                textShadow: ["0 0 0px rgba(250,191,55,0)", "0 0 15px rgba(250,191,55,0.4)", "0 0 0px rgba(250,191,55,0)"]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.2em]"
            >
               {t("product_details_share")}
            </motion.div>
            <div className="flex items-center gap-2">
              <button onClick={() => handleShare('wa')} className="relative size-10 rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all overflow-hidden group/social">
                 <motion.div 
                   animate={{ x: ['-200%', '200%'] }}
                   transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-45 pointer-events-none" 
                 />
                 <MessageCircle className="size-4" />
              </button>
              <button onClick={() => handleShare('fb')} className="relative size-10 rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all overflow-hidden group/social">
                 <motion.div 
                   animate={{ x: ['-200%', '200%'] }}
                   transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-45 pointer-events-none" 
                 />
                 <Facebook className="size-4" />
              </button>
              <button onClick={() => handleShare('insta')} className="relative size-10 rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F] transition-all overflow-hidden group/social">
                 <motion.div 
                   animate={{ x: ['-200%', '200%'] }}
                   transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-45 pointer-events-none" 
                 />
                 <Instagram className="size-4" />
              </button>
              <button onClick={() => handleShare('linkedin')} className="relative size-10 rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all overflow-hidden group/social">
                 <motion.div 
                   animate={{ x: ['-200%', '200%'] }}
                   transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" }}
                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-45 pointer-events-none" 
                 />
                 <Linkedin className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Product Title Section - MOVED ABOVE IMAGE */}
        <div className="-mt-6 md:-mt-10 mb-12 space-y-4 md:space-y-6">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 rounded-full text-[9px] font-black uppercase tracking-widest text-zinc-500"
          >
            {t(product.category || "General")} {t("category")}
          </motion.div>
          <motion.h1 
            variants={itemVariants}
            className="text-[64px] md:text-[72px] font-black uppercase tracking-tighter leading-[0.9] text-black"
          >
            {t(product.name)}
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-zinc-500 font-bold md:text-lg leading-relaxed max-w-xl text-[14px]"
          >
            {t(product.desc)} {t("product_details_professional_grade_b2b_manufacturing_sol")}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Visual Showcase */}
          <motion.div variants={itemVariants} className="space-y-6 md:space-y-8">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
               {/* Gallery Thumbnails */}
               <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto md:overflow-visible no-scrollbar py-2 md:py-0">
                  {productImages.map((img, i) => (
                    <button 
                      key={i}
                      onClick={() => img && setActiveImageIdx(i)}
                      className={`size-16 md:size-20 rounded-xl md:rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${activeImageIdx === i ? 'border-[#fabf37] scale-105 shadow-lg' : 'border-black/5 opacity-50 hover:opacity-100'} ${!img ? 'bg-zinc-100 cursor-default' : ''}`}
                    >
                      {img && <img loading="lazy" decoding="async" src={img} className="w-full h-full object-cover" alt={`Gallery ${i}`} />}
                    </button>
                  ))}
               </div>

               {/* Main Display */}
               <motion.div 
                 key={activeImageIdx}
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 whileHover={{ 
                   rotateX: 5, 
                   rotateY: -5,
                   z: 50,
                   transition: { duration: 0.3 }
                 }}
                 style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                 className="flex-1 aspect-square bg-zinc-50 rounded-[40px] md:rounded-[60px] overflow-hidden border border-black/5 relative group cursor-crosshair order-1 md:order-2"
               >
                 <FloatingDataBits />
                 
                 {/* Blueprint Grid Overlay */}
                 <div className="absolute inset-0 z-10 opacity-20 pointer-events-none" 
                      style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                 
                 {/* Holographic Scanner Line */}
                 <motion.div 
                   animate={{ y: ["0%", "100%", "0%"] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#fabf37] to-transparent z-30 shadow-[0_0_15px_rgba(250,191,55,0.5)] opacity-0 group-hover:opacity-100"
                 />
                 <ImageWithFallback 
                   src={productImages[activeImageIdx]} 
                   alt={t(product.name)}
                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                 />

                 {/* Technical Dimension Lines */}
                 <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-1/2 left-10 right-10 h-px bg-[#fabf37]/50 flex justify-between items-center px-4">
                       <span className="bg-[#fabf37] text-black text-[8px] font-black px-1">{t("product_details_l_250mm")}</span>
                    </div>
                    <div className="absolute left-1/2 top-10 bottom-10 w-px bg-[#fabf37]/50 flex flex-col justify-between items-center py-4">
                       <span className="bg-[#fabf37] text-black text-[8px] font-black px-1 rotate-90">{t("product_details_h_350mm")}</span>
                    </div>
                 </div>
                 
                 {/* Feature Badges */}
                 <div className="absolute top-8 left-8 flex flex-col gap-3">
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                     className="bg-black text-[#fabf37] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
                   >
                     <Zap className="size-3" /> {t("product_details_live_production")}
                   </motion.div>
                   <motion.div 
                     animate={{ y: [0, -5, 0] }}
                     transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                     className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg"
                   >
                     <Leaf className="size-3" /> {t("navbar_100_eco_friendly")}
                   </motion.div>
                 </div>

                 {/* 360 View Overlay Placeholder */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                    <button 
                      onClick={() => setShow360(true)}
                      className="bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] shadow-2xl flex items-center gap-3 scale-90 group-hover:scale-100 transition-transform"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      >
                        <Maximize2 className="size-4" />
                      </motion.div>
                      {t("product_details_launch_360_preview")}
                    </button>
                 </div>

                 <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div className="bg-white/80 backdrop-blur-md p-4 rounded-3xl border border-white/20 shadow-xl">
                      <div className="flex items-center gap-1 mb-1">
                         {[1,2,3,4,5].map(i => <Star key={i} className="size-3 fill-[#fabf37] text-[#fabf37]" />)}
                      </div>
                      <p className="text-[9px] font-black uppercase text-black/40 tracking-widest">{t("product_details_4_9_5_240_reviews")}</p>
                   </div>
                   <div className="flex gap-2">
                      <div className="size-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center border border-white/20"><Layers className="size-5" /></div>
                      <div className="size-12 rounded-2xl bg-white/80 backdrop-blur-md flex items-center justify-center border border-white/20"><Ruler className="size-5" /></div>
                   </div>
                 </div>
               </motion.div>
            </div>

            {/* Quality Standards - NEW SECTION */}
            <motion.div 
              variants={itemVariants}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {qualityCerts.map((cert, i) => (
                <div key={i} className="bg-zinc-50 rounded-2xl md:rounded-3xl p-4 md:p-6 border border-black/5 flex items-start gap-4 hover:bg-white hover:shadow-xl transition-all group">
                   <div className="bg-white p-3 rounded-2xl text-black group-hover:bg-[#fabf37] transition-colors shadow-sm">
                      {cert.icon}
                   </div>
                   <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-black mb-1">{t(cert.name)}</p>
                      <p className="text-[9px] font-bold text-zinc-400">{t(cert.desc)}</p>
                   </div>
                </div>
              ))}
            </motion.div>

            {/* Production Pulse */}
            <motion.div 
              variants={itemVariants}
              whileInView="visible"
              initial="hidden"
              viewport={{ once: true }}
              className="bg-zinc-50 rounded-[30px] md:rounded-[40px] p-6 md:p-8 border border-black/5 space-y-6 md:space-y-8"
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="relative">
                        <div className="size-3 bg-emerald-500 rounded-full animate-ping absolute" />
                        <div className="size-3 bg-emerald-500 rounded-full relative" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("product_details_live_status")}</p>
                        <p className="text-sm font-black text-black">{t("product_details_line_04_producing_batch")}{Math.floor(Math.random() * 9000) + 1000}</p>
                     </div>
                  </div>
                  <History className="size-5 text-zinc-300" />
               </div>

               {/* Manufacturing Capacity Gauge - NEW */}
               <div className="grid grid-cols-3 gap-6 pt-4 border-t border-black/5">
                  {productionMetrics.map((m, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex items-center gap-2 text-[#fabf37]">
                          {m.icon}
                          <p className="text-[8px] font-black uppercase tracking-[0.15em] text-zinc-400">{t(m.label)}</p>
                       </div>
                       <p className="text-[11px] font-black text-black">{t(m.value)}</p>
                    </div>
                  ))}
               </div>
            </motion.div>
          </motion.div>

          {/* Product Data & Ordering */}
          <motion.div variants={itemVariants} className="space-y-8 md:space-y-12">
            {/* Industrial Tone Attributes Section */}
            <div className="space-y-8">
               <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                 <Settings2 className="size-4" /> {t("technical_specs")}
               </div>
               <div className="grid gap-6">
                  {attributes.map((attr, i) => {
                    const isSelected = (opt: string) => {
                      if (attr.name === "Material Grade") return selectedMaterial === opt;
                      if (attr.name === "Thickness / GSM") return selectedThickness === opt;
                      if (attr.name === "Finish Type") return selectedFinish === opt;
                      return false;
                    };
                    
                    const handleSelect = (opt: string) => {
                      if (attr.name === "Material Grade") setSelectedMaterial(opt);
                      if (attr.name === "Thickness / GSM") setSelectedThickness(opt);
                      if (attr.name === "Finish Type") setSelectedFinish(opt);
                    };

                    return (
                      <div key={i} className="space-y-3">
                         <p className="text-[10px] font-black uppercase tracking-widest">{t(attr.name)}</p>
                         <div className="flex flex-wrap gap-2">
                            {attr.options.map((opt, j) => (
                              <button 
                                key={j} 
                                onClick={() => handleSelect(opt)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-bold border transition-all active:scale-95 ${
                                  isSelected(opt)
                                  ? 'bg-black text-[#fabf37] border-black ring-2 ring-black/10' 
                                  : 'bg-white text-zinc-500 border-zinc-100 hover:border-black'
                                }`}
                              >
                                 {t(opt)}
                              </button>
                            ))}
                         </div>
                      </div>
                    );
                  })}
               </div>
            </div>

            {/* Interactive Prototypes & Samples */}
            <motion.div 
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 30 }}
              viewport={{ once: true }}
              className="bg-zinc-50 rounded-[40px] p-8 border border-black/5 space-y-6"
            >
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">{t("product_details_phase_1")}</p>
                     <p className="text-sm font-black uppercase text-[rgb(34,34,34)]">{t("physical_prototypes")}</p>
                  </div>
                  <button onClick={() => go("contact")} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#fabf37] hover:underline">
                     {t("product_details_sample_policy")} <ArrowRight className="size-3" />
                  </button>
               </div>
               <div className="flex gap-4">
                  <div className="flex-1 bg-white rounded-2xl p-4 border border-black/5 flex items-center gap-4">
                     <div className="size-10 rounded-xl bg-[#fabf37]/10 flex items-center justify-center text-[#fabf37]">
                        <Package className="size-5" />
                     </div>
                     <p className="text-[10px] font-black uppercase leading-tight text-[rgb(75,75,75)]">{t("export_request_form_request")} <br /> {t("product_details_dummy_unit")}</p>
                  </div>
               </div>
            </motion.div>

            {/* Sustainability Impact Calculator - NEW SECTION */}
            <motion.div 
              whileInView={{ scale: 1, opacity: 1 }}
              initial={{ scale: 0.9, opacity: 0 }}
              viewport={{ once: true }}
              className="bg-black rounded-[40px] p-8 space-y-6 border border-white/5 relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Recycle className="size-32 text-emerald-500" />
               </div>
               <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="size-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Leaf className="size-5" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">{t("eco_impact_estimate")}</p>
                        <p className="text-sm font-black text-white uppercase">{t("environmental_roi")}</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                     {sustainabilityMetrics.map((m, i) => (
                       <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5">
                          <div className={`mb-2 ${m.color}`}>{m.icon}</div>
                          <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter mb-1">{t(m.label)}</p>
                          <p className="text-xs font-black text-white">{t(m.value)}</p>
                       </div>
                     ))}
                  </div>
               </div>
            </motion.div>

            {/* Premium Industrial Black RFQ Box with Official Details */}
            <motion.div 
              whileInView={{ y: 0, opacity: 1 }}
              initial={{ y: 50, opacity: 0 }}
              whileHover={{ 
                rotateX: -2,
                transition: { duration: 0.5 }
              }}
              style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
              viewport={{ once: true }}
              className="p-6 md:p-10 bg-black rounded-[40px] md:rounded-[60px] text-white space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden border border-white/5"
            >
               <div className="absolute inset-0 opacity-20 pointer-events-none" 
                    style={{ backgroundImage: 'linear-gradient(45deg, #111 25%, transparent 25%, transparent 50%, #111 50%, #111 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }} />
               <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <FileText className="size-64 text-[#fabf37]" />
               </div>
               
               <div className="relative z-10 space-y-6 md:space-y-8">
                 <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 md:pb-8 gap-6">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{t("quotation_mode")}</p>
                       <p className="text-3xl md:text-4xl font-black">{t("request_pricing")}</p>
                    </div>
                    <div className="text-left sm:text-right">
                       <div className="flex items-center gap-2 sm:justify-end text-[#fabf37] mb-1">
                          <ClipboardList className="size-4" />
                          <span className="text-[10px] font-black uppercase tracking-widest">{t("response_time")}</span>
                       </div>
                       <p className="text-xl font-black italic uppercase">{t("product_details_4_hours")}</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-end gap-4">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("order_volume")}</p>
                       <div className="bg-zinc-800 px-4 py-2 rounded-xl text-lg md:text-xl font-black text-[#fabf37]">
                          {quantity.toLocaleString()} <span className="text-[10px] text-zinc-500 uppercase">{t("product_details_units")}</span>
                       </div>
                    </div>
                    <input 
                      type="range" 
                      min="500" 
                      max="100000" 
                      step="500"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="w-full h-3 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#fabf37]" 
                    />
                 </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                      onClick={() => onAddToQuote({ ...product, quantity })}
                      className="bg-[#fabf37] text-black px-6 md:px-8 py-5 md:py-6 rounded-full font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl flex items-center justify-center gap-4 group text-xs md:text-sm"
                    >
                       {t("add_to_basket")} <ChevronRight className="size-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="bg-white/5 rounded-[24px] md:rounded-[32px] p-5 md:p-6 border border-white/10 flex flex-col justify-center">
                       <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">{t("exec_support")}</p>
                       <p className="text-sm font-black text-white">+09638-011101</p>
                       <p className="text-[9px] font-bold text-[#fabf37]">{t("product_details_whatsapp_880_1901_459110")}</p>
                    </div>
                 </div>

                 <div className="pt-4 text-center border-t border-white/5">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                       {t("product_details_official_channel")} <span className="text-white ml-2">paperwarefactory@gmail.com</span>
                    </p>
                 </div>
               </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Dynamic Tabs Section */}
        <motion.div 
          whileInView={{ y: 0, opacity: 1 }}
          initial={{ y: 30, opacity: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-32 max-w-5xl mx-auto"
        >
           <div className="flex border-b border-black/10 mb-8 md:mb-12 overflow-x-auto no-scrollbar scroll-smooth">
              <button 
                onClick={() => setActiveTab("description")}
                className={`px-6 md:px-12 py-4 md:py-6 text-xs md:text-sm font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === "description" ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
              >
                 {t("description")}
                 {activeTab === "description" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#fabf37]" />}
              </button>
              <button 
                onClick={() => setActiveTab("additional")}
                className={`px-6 md:px-12 py-4 md:py-6 text-xs md:text-sm font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === "additional" ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
              >
                 {t("additional_info")}
                 {activeTab === "additional" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#fabf37]" />}
              </button>
              <button 
                onClick={() => setActiveTab("manufacturing")}
                className={`px-6 md:px-12 py-4 md:py-6 text-xs md:text-sm font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === "manufacturing" ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
              >
                 {t("manufacturing")}
                 {activeTab === "manufacturing" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#fabf37]" />}
              </button>
              <button 
                onClick={() => setActiveTab("materials")}
                className={`px-6 md:px-12 py-4 md:py-6 text-xs md:text-sm font-black uppercase tracking-widest transition-all relative shrink-0 ${activeTab === "materials" ? 'text-black' : 'text-zinc-400 hover:text-black'}`}
              >
                 {t("product_details_material_matrix")}
                 {activeTab === "materials" && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-1 bg-[#fabf37]" />}
              </button>
           </div>

           <AnimatePresence mode="wait">
              {activeTab === "description" ? (
                <motion.div 
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                   <h2 className="text-3xl font-black text-black leading-tight uppercase tracking-tighter">
                      {t(product.name)} {t("product_details_printing_service_in_dhaka_bangladesh")}
                   </h2>
                   <div className="text-zinc-500 font-medium leading-[1.8] space-y-6">
                      <p className="text-[15px]">
                         {t(product.name)} {t("product_details_is_one_of_your_most")} {t(product.name)} {t("product_details_printing_service_in_dhaka_bangladesh_2")}
                      </p>
                      <p>
                         {t("product_details_whether_you_re_running_a")} {t(product.name)} {t("product_details_is_the_perfect_publicity_material")}
                      </p>
                      <p>
                         {t("product_details_just_tell_us_your_expectation")} {t(product.name)} {t("product_details_will_be_on_their_way")}
                      </p>
                      <p className="border-l-4 border-[#fabf37] pl-8 py-4 italic bg-zinc-50 rounded-r-2xl">
                         {t("product_details_paperware_provides_the_best_service")}
                      </p>
                   </div>
                </motion.div>
              ) : activeTab === "additional" ? (
                <motion.div 
                  key="info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-zinc-50 rounded-[30px] md:rounded-[40px] overflow-hidden border border-black/5"
                >
                   {additionalInfo.map((info, i) => (
                     <div key={i} className={`flex flex-col md:flex-row border-b border-black/5 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-zinc-50'}`}>
                        <div className="md:w-1/3 px-6 md:px-10 py-4 md:py-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-[#fabf37] border-b md:border-b-0 md:border-r border-black/5">
                           {t(info.label)}
                        </div>
                        <div className="flex-1 px-6 md:px-10 py-4 md:py-6 text-xs md:text-sm text-zinc-600 font-medium italic">
                           {t(info.value)}
                        </div>
                     </div>
                   ))}
                </motion.div>
              ) : activeTab === "manufacturing" ? (
                <motion.div 
                  key="manufacturing"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="relative py-12"
                >
                   <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-zinc-100 -translate-y-1/2 hidden md:block" />
                   <div className="grid md:grid-cols-5 gap-8">
                      {manufacturingSteps.map((step, i) => (
                        <div key={i} className="relative z-10 flex flex-col items-center text-center space-y-6">
                           <div className="size-16 rounded-[24px] bg-white border-2 border-zinc-100 flex items-center justify-center text-black shadow-xl group-hover:border-[#fabf37] transition-all">
                              {React.cloneElement(step.icon as React.ReactElement, { className: "size-6" })}
                           </div>
                           <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-black">{t(step.title)}</p>
                              <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-tighter">{t(step.time)}</p>
                           </div>
                        </div>
                      ))}
                   </div>
                   <div className="mt-16 p-8 bg-black rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 border border-white/5">
                      <div className="flex items-center gap-6">
                         <div className="size-12 rounded-2xl bg-[#fabf37] flex items-center justify-center text-black">
                            <Clock className="size-6" />
                         </div>
                         <div>
                            <p className="text-white text-sm font-black uppercase">{t("product_details_standard_lead_time")}</p>
                            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">{t("product_details_calculated_from_final_artwork_approval")}</p>
                         </div>
                      </div>
                      <p className="text-4xl font-black text-white italic">{t("product_details_7_10_business_days")}</p>
                   </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="materials"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-zinc-900 rounded-[30px] md:rounded-[40px] p-6 md:p-10 overflow-x-auto border border-white/5 no-scrollbar"
                >
                   <table className="w-full text-left min-w-[600px]">
                      <thead>
                         <tr className="border-b border-white/10">
                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#fabf37]">{t("product_details_grade_type")}</th>
                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{t("product_details_stiffness")}</th>
                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{t("product_details_printability")}</th>
                            <th className="pb-6 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">{t("eco_score")}</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {materialComparison.map((m, i) => (
                           <tr key={i} className="group hover:bg-white/5 transition-colors">
                              <td className="py-6 text-sm font-black text-white">{t(m.type)}</td>
                              <td className="py-6 text-xs font-bold text-zinc-400">{t(m.stiffness)}</td>
                              <td className="py-6 text-xs font-bold text-zinc-400">{t(m.print)}</td>
                              <td className="py-6">
                                 <div className="flex items-center gap-3">
                                    <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                       <div className="h-full bg-[#fabf37]" style={{ width: m.eco }} />
                                    </div>
                                    <span className="text-[10px] font-black text-[#fabf37]">{t(m.eco)}</span>
                                 </div>
                              </td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </motion.div>
              )}
           </AnimatePresence>

           {/* Metadata Section from User Image */}
           <div className="mt-16 md:mt-24 pt-12 md:pt-16 border-t border-black/10 space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-bold">
                 <span className="text-zinc-400 uppercase tracking-widest text-xs">{t("product_details_sku")}</span>
                 <span className="text-black">{t("product_details_pp_cal_2025")}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm font-bold">
                 <span className="text-zinc-400 uppercase tracking-widest text-xs">{t("product_details_categories")}</span>
                 <span className="text-[#fabf37] hover:underline cursor-pointer">{t("product_details_gift_item_promotional_product")}</span>
              </div>
              <div className="space-y-4">
                 <span className="text-zinc-400 text-xs font-black uppercase tracking-[0.2em] block">{t("product_details_technical_tags")}</span>
                 <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="px-4 py-2 bg-zinc-50 border border-black/5 rounded-full text-[10px] font-bold text-zinc-500 hover:text-black hover:border-black transition-all cursor-pointer">
                         {t(tag)}
                      </span>
                    ))}
                 </div>
              </div>
           </div>
        </motion.div>

        {isPaperCupProduct(product) && <CupSizeTables />}

        {/* Suggested Products Marquee - NEW SECTION */}
        <div className="mt-32 md:mt-48 overflow-hidden">
           <div className="container mx-auto px-4 mb-12">
              <div className="flex items-center gap-4 mb-2">
                 <div className="size-2 bg-[#fabf37] rounded-full animate-pulse" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">{t("product_details_next_gen_inventory")}</p>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black">
                 {t("product_details_suggested_solutions")}
              </h2>
           </div>
           
           <div className="relative mb-20 md:mb-32">
              <div ref={suggestedRef} className="flex gap-6 md:gap-8 w-max px-4 will-change-transform">
                 {[...Array(1)].map((_, i) => (
                   <div key={i} className="flex gap-6 md:gap-8">
                      {[
                        { name: "Eco-Pack V2", cat: "Sustainable", img: pCarryBagPink },
                        { name: "Industrial Wrap", cat: "Heavy Duty", img: pChowmeinBoxes },
                        { name: "Digital Die-cut", cat: "Precision", img: pStickers },
                        { name: "Premium Board", cat: "Luxury", img: pConfectioneryBoxes }
                      ].map((item, idx) => (
                        <div 
                          key={idx} 
                          className="w-[240px] md:w-[320px] group cursor-pointer"
                          style={{ perspective: "1000px" }}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            // In a real app, you would set the active product here
                          }}
                        >
                           <motion.div 
                             whileHover={{ 
                               rotateY: 10,
                               z: 20,
                               scale: 1.05
                             }}
                             className="aspect-[4/3] rounded-[32px] overflow-hidden bg-zinc-100 border border-black/5 mb-6 relative"
                           >
                              <img loading="lazy" decoding="async" src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t(item.name)} />
                              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-black/5">
                                 {t(item.cat)}
                              </div>
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                 <div className="bg-[#fabf37] text-black px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest scale-90 group-hover:scale-100 transition-transform">
                                    {t("view_details")}
                                 </div>
                              </div>
                           </motion.div>
                           <p className="text-xs font-black uppercase tracking-tight text-black group-hover:text-[#fabf37] transition-colors">{t(item.name)}</p>
                           <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">{t("product_details_view_specifications")}</p>
                        </div>
                      ))}
                   </div>
                 ))}
              </div>
              <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />
           </div>

        </div>

        {/* Client Success Showcases - MOVED BELOW TECHNICAL TAGS */}
        <div className="mt-24 md:mt-40 space-y-8 md:space-y-12">
           <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-8 md:pb-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="h-[2px] w-12 bg-[#fabf37]" />
                    <p className="text-[#fabf37] text-[10px] font-black uppercase tracking-[0.4em]">{t("product_details_global_success")}</p>
                 </div>
                 <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter text-black">
                    {t("product_details_client_success")} <br /> {t("product_details_stories")}
                 </h2>
              </div>
              <p className="text-zinc-500 font-bold max-w-sm leading-relaxed">
                 {t("product_details_see_how_industry_leaders_are")}
              </p>
           </div>

           <div className="relative">
              <div className="overflow-hidden pb-8 md:pb-12 relative no-scrollbar">
                <div ref={clientsRef} className="flex gap-6 md:gap-8 w-max will-change-transform">
                   {clientVideos.map((video, idx) => (
                     <motion.div 
                       key={idx}
                       whileHover={{ y: -10 }}
                       className="min-w-[280px] sm:min-w-[320px] md:min-w-[450px] aspect-video bg-zinc-900 rounded-[32px] md:rounded-[48px] overflow-hidden relative group cursor-pointer shadow-xl"
                     >
                        <img loading="lazy" decoding="async" src={video.thumb} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700" alt={t(video.client)} />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                           <div className="size-16 md:size-20 rounded-full bg-[#fabf37]/20 border border-[#fabf37]/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                              <PlayCircle className="size-8 md:size-10 text-[#fabf37] fill-[#fabf37]/20" />
                           </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-black via-black/40 to-transparent">
                           <p className="text-[#fabf37] text-[9px] font-black uppercase tracking-[0.2em] mb-2">{t(video.location)}</p>
                           <p className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">{t(video.client)}</p>
                           <div className="mt-4 flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                              <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">{t("product_details_watch_case_study")}</span>
                              <div className="h-px flex-1 bg-white/10" />
                              <ArrowRight className="size-4 text-[#fabf37]" />
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </div>
              {/* Scroll Indicator Overlay */}
              <div className="absolute right-0 top-0 bottom-12 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
           </div>
        </div>
      </div>

      {/* 360 Viewer Modal */}
      <AnimatePresence>
        {show360 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10"
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-xl" onClick={() => setShow360(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl aspect-square md:aspect-video bg-zinc-900 rounded-[40px] md:rounded-[60px] border border-white/10 overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 md:p-10 border-b border-white/5 relative z-20">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">{t("product_details_interactive_view")}</p>
                  <h3 className="text-xl md:text-2xl font-black uppercase text-white">{t(product.name)}</h3>
                </div>
                <button 
                  onClick={() => setShow360(false)}
                  className="size-12 md:size-14 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#fabf37] hover:text-black transition-all"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Viewer Area */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing group">
                {/* 3D Model Control Overlay */}
                <div className="absolute bottom-10 left-10 flex items-center gap-6 z-20">
                  <div className="flex flex-col gap-2">
                    <p className="text-[8px] font-black uppercase tracking-widest text-white/40">{t("realtime_ops_rotation_axis")}</p>
                    <div className="flex gap-1">
                      <div className="h-1 w-8 bg-[#fabf37]" />
                      <div className="h-1 w-4 bg-white/20" />
                      <div className="h-1 w-4 bg-white/20" />
                    </div>
                  </div>
                  <div className="h-12 w-px bg-white/10" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="size-10 rounded-full border border-white/20 flex items-center justify-center"
                  >
                    <RefreshCw className="size-4 text-[#fabf37]" />
                  </motion.div>
                </div>

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,191,55,0.05),transparent_70%)]" />
                
                <motion.div 
                  animate={{ rotate: rotation }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                  onPan={(e, info) => setRotation(prev => prev + info.delta.x * 0.5)}
                  className="relative z-10 w-2/3 h-2/3"
                >
                  <ImageWithFallback 
                    src={product.image}
                    alt={t(product.name)}
                    className="w-full h-full object-contain drop-shadow-[0_50px_80px_rgba(0,0,0,0.8)]"
                  />
                </motion.div>

                {/* Instructions Overlay */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  <RefreshCw className="size-3 animate-spin-slow" /> {t("product_details_drag_to_rotate_scale_1")}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-10 border-t border-white/5 flex flex-wrap gap-4 items-center justify-between relative z-20">
                <div className="flex items-center gap-6">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{t("product_details_durability")}</p>
                    <p className="text-xs font-black text-[#fabf37]">{t("product_details_a_grade")}</p>
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <div className="space-y-1">
                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{t("product_details_weight")}</p>
                    <p className="text-xs font-black text-white">{t("product_details_350_gsm")}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setShow360(false);
                    onAddToQuote({ ...product, quantity });
                  }}
                  className="px-8 py-4 bg-[#fabf37] text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-transform"
                >
                  {t("product_details_add_to_quote_from_preview")}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}