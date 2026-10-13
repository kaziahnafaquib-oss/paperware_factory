import React from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "motion/react";
import { 
  Filter, Star, Globe, TrendingUp, Users, Quote, ArrowRight, 
  MessageSquare, Zap, Cpu, ShieldCheck, Facebook, Instagram, 
  Linkedin, Youtube, Coffee, Package, ShoppingBag, Layers2,
  Twitter, Send, Heart, Music2, LayoutGrid, Building2,
  Activity, Database, Lock, Terminal, Share2, Layers,
  Play, Pause, Volume2, VolumeX, HardDrive, Wind, Thermometer, Compass,
  ChevronRight, Radio, Box, Monitor, Server, Workflow, Key
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

// Client Logos
import imgSwish from "figma:asset/d07c4da6a8a6d0044e29458d685d2f999a52427b.png";
import imgIntercontinental from "figma:asset/e5cd2ece8d72457632c8666eea18c92ebb1e78a3.png";
import imgHolidayInn from "figma:asset/f6b9e36dbf11e2d246417fbb2d258155f7f9a479.png";
import imgEagleAgency from "figma:asset/a6b5ca68042a20a6c62623c3448766c4fc7beb4e.png";
import imgDhakaBoatClub from "figma:asset/484cddbb0a4719fc316882618a25f084e2b1abc9.png";
import imgCafeBir from "figma:asset/4b036cd41a84569f614c98aef871a7ce4d2d0c80.png";
import imgAci from "figma:asset/f16a78ba0dd54cbdf4aa6d7054825e515e96f035.png";
import imgGauravJewellers from "figma:asset/c82ff60537a7a75c52b852cde7d1fc285e19a6c1.png";
import imgDiamondWorld from "figma:asset/e82f545f1fdff4d8d7c1a2a00edf14bc22e11bf5.png";
import imgSquareHospitals from "figma:asset/944389e54537c0eb55260dcebf9f7900b792dd7f.png";
import imgRenata from "figma:asset/61b07ca520a337d43cd3ab040af7a1f5a28a9d9d.png";
import imgRadiant from "figma:asset/9069057e3e51904ef3041bc4c5eb56fed98e0164.png";
import imgPmchl from "figma:asset/e64cd2ee50c742639b1135197a7c8220e104d1cc.png";
import imgNovatek from "figma:asset/acfbf69c5be13b6af2d163459f1ceb3477eebd2a.png";
import imgLovenTaste from "figma:asset/67a4f8b2c9653ea62d2c8349b427d6fe380b99a9.png";
import imgKonaCafe from "figma:asset/d90e47ede71caca60446757a1cace25c72162637.png";
import imgKhanas from "figma:asset/b7ddc1b83ba4ac963d95acc6932cc7c077231065.png";
import imgKaziKaziTea from "figma:asset/b48146b672186270c6b579b89a93120549b72b77.png";
import imgIspahani from "figma:asset/e192b13abd540f9f302f8a638db3c8bdde925335.png";
import imgIccbHeritage from "figma:asset/258cc4f6b52d788b372a16376b04f2d5d5dcf3b4.png";
import imgHerfy from "figma:asset/4b9569cdcf589af5e6886c82fd2b3d0f05e39eef.png";
import imgCoffeelime from "figma:asset/b7b18e09947e3be75f397ac05fbd8f17d645fe76.png";
import imgCoffeelicious from "figma:asset/2aa86228832bdc318b2b0d093ace834c92c7996b.png";
import imgCoffeeBuzz from "figma:asset/289023b85676588401219cb6a006f1a3401d1a36.png";
import imgCoffeeAvenue from "figma:asset/e1b52edc4bd49baf663705f27f615b1ffa798c3a.png";
import imgCocacola from "figma:asset/e2067cd206580d5e1214472e4e8e9f6af3a8c607.png";
import imgClubGelato from "figma:asset/3003225026d617c618b47dd6eb290f69ae46f136.png";
import imgChaChill from "figma:asset/009e5f3c631e1858a665531672d0ffcc69d21dcc.png";
import imgTranscom from "figma:asset/fa6c46cdcb30bd3f437a9a5827e6450447989634.png";
import imgTheWaffleHouse from "figma:asset/647a60ec209ee728f98c8f2028802218f584350d.png";
import imgTheLocalCoffee from "figma:asset/058c912908a675dd8f29e166420432fcc4643d90.png";
import imgTerraBistro from "figma:asset/cebce585c69603a15f21e8c16a2274c0439654c4.png";
import imgTeaLounge from "figma:asset/d3505f2cc7c33731db33889792afb434adfda40f.png";
import imgTeaFirin from "figma:asset/0dd1f563ffeac48fcd397177d2282cf47d8042d4.png";
import imgTawaz from "figma:asset/1d8bbb76a453d602341aa98feb4226a2e93ebd18.png";

import { useLanguage } from "../context/LanguageContext";
import { toast } from "sonner";

// --- YOU CAN CHANGE THE VIDEO LINK HERE ---
// Using a high-performance global CDN link (Pexels) for maximum stability
const FEATURED_VIDEO_URL = "https://player.vimeo.com/external/370338531.sd.mp4?s=70d1d511efd500148283471491bb0ad8&profile_id=164&oauth2_token_id=57447761"; 
// ------------------------------------------

// Removed unused 3D components for better performance

const clientsData = [
  { img: imgSwish, category: "Hospitality" },
  { img: imgIntercontinental, category: "Hospitality" },
  { img: imgHolidayInn, category: "Hospitality" },
  { img: imgEagleAgency, category: "Others" },
  { img: imgDhakaBoatClub, category: "Others" },
  { img: imgCafeBir, category: "Beverage" },
  { img: imgAci, category: "Healthcare" },
  { img: imgGauravJewellers, category: "Retail" },
  { img: imgDiamondWorld, category: "Retail" },
  { img: imgSquareHospitals, category: "Healthcare" },
  { img: imgRenata, category: "Healthcare" },
  { img: imgRadiant, category: "Healthcare" },
  { img: imgPmchl, category: "Healthcare" },
  { img: imgNovatek, category: "Healthcare" },
  { img: imgLovenTaste, category: "Beverage" },
  { img: imgKonaCafe, category: "Beverage" },
  { img: imgKhanas, category: "Beverage" },
  { img: imgKaziKaziTea, category: "Beverage" },
  { img: imgIspahani, category: "Beverage" },
  { img: imgIccbHeritage, category: "Hospitality" },
  { img: imgHerfy, category: "Beverage" },
  { img: imgCoffeelime, category: "Beverage" },
  { img: imgCoffeelicious, category: "Beverage" },
  { img: imgCoffeeBuzz, category: "Beverage" },
  { img: imgCoffeeAvenue, category: "Beverage" },
  { img: imgCocacola, category: "Beverage" },
  { img: imgClubGelato, category: "Beverage" },
  { img: imgChaChill, category: "Beverage" },
  { img: imgTranscom, category: "Others" },
  { img: imgTheWaffleHouse, category: "Beverage" },
  { img: imgTheLocalCoffee, category: "Beverage" },
  { img: imgTerraBistro, category: "Beverage" },
  { img: imgTeaLounge, category: "Beverage" },
  { img: imgTeaFirin, category: "Beverage" },
  { img: imgTawaz, category: "Beverage" }
];

const categories = ["ALL", "BEVERAGE", "HOSPITALITY", "HEALTHCARE", "RETAIL", "OTHERS"];

const testimonialsData = [
  {
    stars: 5,
    text: "You often live customer service and 'wow... high-quality paper cup, I highly recommend it.'",
    author: "ALICIA SANFORD"
  },
  {
    stars: 5,
    text: "Everything was perfect! From the order process, made easier with 30-day payment, to the delivery. Thank you so much.",
    author: "EVAN GAULTIER"
  },
  {
    stars: 5,
    text: "Fast results, and great quality! I recommend! <3",
    author: "JOCELYN MAUSET"
  },
  {
    isFeatured: true,
    isVideo: true,
    videoUrl: FEATURED_VIDEO_URL,
    stars: 5,
    text: "We've been working with Paperware for a few years now. We're consistently satisfied. The quality of the cups is great, service is fast, prices are fair, and our customers are very happy.",
    author: "CERTIFIED COFFEE",
    image: "https://images.unsplash.com/photo-1556740758-90eb39f3203c?auto=format&fit=crop&q=80&w=1000"
  },
  {
    stars: 5,
    text: "I highly recommend Paperware! The print quality is excellent, and the team is attentive and responsive! In short, I'm very happy with my first cups :)",
    author: "JUSTINE BOUDARD"
  },
  {
    stars: 5,
    text: "I have had the chance to print several products with them and the quality has always been consistent. Special mention to the team and responsive team, especially Elsa. It is a pleasure working with them.",
    author: "AURÉLIEN TERRADE"
  },
  {
    stars: 5,
    text: "Great support and high quality products! It met our expectations. Thank you Paperware :)",
    author: "MARIE & MEESHA (ON MY DESK)"
  },
  {
    stars: 5,
    text: "Great communication and clarity at every stage: from ordering, designing, and delivery!",
    author: "RENEE DEEB"
  },
  {
    stars: 5,
    text: "A team that listens to our brand needs and gives good advice. Responsive and delivers quality products. I absolutely recommend working with them!",
    author: "N-D-VALLON"
  }
];

// Removed TechnicalProtocolsSection function definition


function OperationalNodesSection() {
  const [activeNode, setActiveNode] = React.useState(0);
  
  // Auto-cycle through nodes for the "telemetry" effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { 
      label: "SYSTEM THROUGHPUT", 
      value: "4.2M", 
      unit: "Units/Day", 
      icon: Box, 
      progress: 90 
    },
    { 
      label: "ECO EFFICIENCY", 
      value: "94.8", 
      unit: "%Rating", 
      icon: Wind, 
      progress: 95 
    },
    { 
      label: "THERMAL LOAD", 
      value: "32", 
      unit: "°CAvg", 
      icon: Thermometer, 
      progress: 35 
    }
  ];

  return null;
}

export function ClientsPage({ 
  videoUrl, 
  productionStats: initialProductionStats, 
  onPageChange,
  partnersData = []
}: {  
  videoUrl?: string, 
  productionStats?: any, 
  onPageChange?: (page: string) => void,
  partnersData?: any[]
}) {
  // Use partnersData from props if available, otherwise fallback to static clientsData
  // We explicitly prioritize admin data, but keep static as a robust fallback
  const hasExternalData = partnersData && partnersData.length > 0;
  
  const displayClients = React.useMemo(() => {
    if (hasExternalData) {
      return partnersData.map(p => ({
        img: p.logo || p.img, // Handle both 'logo' (admin) and 'img' (legacy) keys
        category: p.category || "Others",
        name: p.name // Preserve name if available
      }));
    }
    return clientsData;
  }, [partnersData, hasExternalData]);

  // Dynamically generate categories from data, ensuring ALL is first
  const dynamicCategories = React.useMemo(() => {
    const uniqueCats = Array.from(new Set(displayClients.map(c => c.category.toUpperCase())));
    // predefined order for standard categories if they exist
    const standardOrder = ["BEVERAGE", "HOSPITALITY", "HEALTHCARE", "RETAIL", "OTHERS"];
    
    uniqueCats.sort((a, b) => {
      const idxA = standardOrder.indexOf(a);
      const idxB = standardOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return ["ALL", ...uniqueCats];
  }, [displayClients]);

  const [activeTab, setActiveTab] = React.useState("ALL");
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);
  const { t } = useLanguage();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroShrinkProgress, scrollY: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Simplified scroll animations
  const heroScale = useTransform(heroShrinkProgress, [0, 1], [1, 0.5]);
  const heroBorderRadius = useTransform(heroShrinkProgress, [0, 1], ["0px", "80px"]);
  const heroOpacity = useTransform(heroShrinkProgress, [0, 0.8, 1], [1, 1, 0]);
  const smoothHeroScale = useSpring(heroScale, { stiffness: 80, damping: 25 });

  // 3D Tilt Logic for Hero Cards
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springTiltX = useSpring(useTransform(y, [-300, 300], [15, -15]), { stiffness: 100, damping: 30 });
  const springTiltY = useSpring(useTransform(x, [-300, 300], [-15, 15]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Live Counter Logic
  const [liveCups, setLiveCups] = React.useState(initialProductionStats?.totalCups || 69550257);
  const [liveBusinesses, setLiveBusinesses] = React.useState(initialProductionStats?.wonderfulBusinesses || 5754);


  const FEATURED_VIDEO_SOURCE = videoUrl || FEATURED_VIDEO_URL;

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reset error state
    setVideoError(false);
    
    // Crucial for browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;

    let playPromise: Promise<void> | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Attempt to play and store the promise
            playPromise = video.play();
            
            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  playPromise = null;
                  setIsPlaying(true);
                })
                .catch(err => {
                  playPromise = null;
                  if (err.name !== "AbortError") {
                    console.log("Autoplay prevented, retrying...", err);
                    video.muted = true;
                    video.play().then(() => setIsPlaying(true)).catch(() => {});
                  }
                });
            }
          } else {
            // Only pause if a play promise is not pending to avoid AbortError
            if (playPromise !== null) {
              playPromise.then(() => {
                video.pause();
                setIsPlaying(false);
              }).catch(() => {});
            } else {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
      // Clean up play promise state
      if (video) {
        video.pause();
      }
    };
  }, [FEATURED_VIDEO_SOURCE]);

  const filteredClients = activeTab === "ALL" 
    ? displayClients 
    : displayClients.filter(c => c.category.toUpperCase() === activeTab);

  return (
    <div className="relative pb-24 bg-white min-h-screen overflow-x-hidden selection:bg-[#fabf37] selection:text-black">
      {/* Minimal Background - Desktop Only */}
      <div className="hidden lg:block fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fafafa]">
        {/* Simple Static Gradient */}
        <div className="absolute -top-[20%] -right-[10%] size-[500px] bg-gradient-to-br from-[#fabf37]/5 via-white to-transparent rounded-full blur-[40px] opacity-25" />
      </div>

      <div className="container mx-auto px-4 pt-0 relative z-20">
        {/* Simplified Hero Section */}
        <div ref={heroRef} className="h-[120vh] md:h-[150vh] relative -mx-4">
          <motion.div 
            style={{ 
              scale: smoothHeroScale,
              borderRadius: heroBorderRadius,
              opacity: heroOpacity
            }}
            className="sticky top-0 h-screen w-full bg-[#fabf37] overflow-hidden flex flex-col items-center justify-center shadow-[0_30px_60px_-20px_rgba(250,191,55,0.2)] border-2 border-white/20"
          >
            {/* Simplified HUD - Desktop Only */}
            <div className="hidden lg:block absolute size-[600px] border-[0.5px] border-black/5 rounded-full opacity-20">
              <div className="absolute inset-10 border-[0.5px] border-black/8 rounded-full">
                <div className="absolute inset-10 border-t-2 border-black/15 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
              </div>
            </div>

            <div className="relative z-10 text-center px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-3 bg-black text-white px-5 py-2.5 rounded-xl mb-10 shadow-lg border border-white/10 mx-auto"
              >
                <Cpu className="size-3.5 text-[#fabf37] animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em]">CORE_v4.2.0</span>
              </motion.div>
              
              <h1 className="text-[60px] md:text-[120px] lg:text-[160px] font-black uppercase tracking-tighter leading-[0.8] text-black">
                {t('building_legacies').split(" ").map((word, wi) => (
                  <span key={wi} className="inline-block mr-4 last:mr-0">
                    {word}
                  </span>
                ))}
              </h1>

              <div className="mt-12 flex flex-col items-center gap-6">
                <p className="text-black/60 font-black uppercase tracking-[0.4em] text-[10px] md:text-xs">
                  Next Generation Manufacturing Ecosystem
                </p>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="size-10 rounded-full border border-black/10 flex items-center justify-center"
                >
                  <ArrowRight className="size-4 rotate-90" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filter Bar - Simplified */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 md:gap-5 mb-20 md:mb-32 p-3 bg-zinc-100 rounded-[32px] border border-zinc-200 max-w-4xl mx-auto shadow-sm"
        >
          {dynamicCategories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-8 md:px-12 py-4 rounded-2xl font-black tracking-[0.2em] text-[10px] md:text-[12px] transition-all duration-300 ${
                activeTab === cat 
                  ? "bg-black text-[#fabf37] shadow-lg" 
                  : "text-zinc-500 hover:text-black hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Infinite Marquee Logo Reel - Multi-row 5 Lines scrolling slowly */}
        <div className="mb-24 relative bg-zinc-50/50 py-20 -mx-4 px-4 border-y border-zinc-100 shadow-inner overflow-hidden">
          <div className="flex flex-col gap-6 md:gap-10 max-w-[1800px] mx-auto">
            {/* Connected to Admin Data if available */}
            {[0, 1, 2, 3, 4].map((rowIndex) => {
              // Create unique sets of data for each row to look varied
              const rowData = [...displayClients, ...displayClients, ...displayClients];
              const direction = rowIndex % 2 === 0 ? 1 : -1;
              const duration = 80 + (rowIndex * 15); // Varied slow speeds

              return (
                <div key={rowIndex} className="relative overflow-visible">
                  <motion.div 
                    animate={{ x: direction > 0 ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
                    transition={{ 
                        duration: duration, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                    className="flex items-center gap-6 md:gap-10 whitespace-nowrap w-max"
                  >
                    {rowData.map((client, i) => (
                      <div 
                        key={`${rowIndex}-${i}`} 
                        className="bg-white size-24 md:size-32 rounded-full p-5 md:p-7 flex items-center justify-center shadow-[0_8px_20px_-8px_rgba(0,0,0,0.08)] border border-zinc-100 shrink-0 hover:border-[#fabf37]/50 transition-colors cursor-pointer"
                      >
                        <ImageWithFallback 
                          src={client.img} 
                          alt="Client" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
          
          {/* Edge gradients for smooth transition */}
          <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-[#f4f4f5] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-[#f4f4f5] to-transparent z-10 pointer-events-none" />
        </div>

        {/* Client Growth Report Section - Compact White Tone */}
        <div className="mb-16 py-12 bg-white relative overflow-hidden border-y border-zinc-100">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            {/* Compact Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#fabf37] rounded-lg">
                  <TrendingUp className="size-4 text-black" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight">
                  Growth Timeline
                </h3>
              </div>
              
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-zinc-400">+900% <span className="text-[#fabf37]">Total</span></span>
                <span className="text-zinc-400">96.2% <span className="text-black">Retention</span></span>
              </div>
            </div>

            {/* Horizontal Scrolling Compact Cards */}
            <div className="relative overflow-hidden -mx-4 px-4">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 35, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex items-center gap-4 w-max"
              >
                {[
                  { year: "2020", clients: "15", growth: "Start" },
                  { year: "2021", clients: "35", growth: "+133%" },
                  { year: "2022", clients: "62", growth: "+77%" },
                  { year: "2023", clients: "89", growth: "+44%" },
                  { year: "2024", clients: "115", growth: "+29%" },
                  { year: "2025", clients: "132", growth: "+15%" },
                  { year: "2026", clients: "150", growth: "+14%" },
                  { year: "2020", clients: "15", growth: "Start" },
                  { year: "2021", clients: "35", growth: "+133%" },
                  { year: "2022", clients: "62", growth: "+77%" },
                  { year: "2023", clients: "89", growth: "+44%" },
                  { year: "2024", clients: "115", growth: "+29%" },
                  { year: "2025", clients: "132", growth: "+15%" },
                  { year: "2026", clients: "150", growth: "+14%" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.03, y: -4 }}
                    className="bg-zinc-50 border border-zinc-200 rounded-2xl p-5 min-w-[180px] shrink-0 hover:border-[#fabf37] hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Year */}
                    <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">
                      {item.year}
                    </div>

                    {/* Client Count */}
                    <div className="text-4xl font-black text-black leading-none mb-1">
                      {item.clients}
                    </div>
                    <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wide mb-3">
                      Clients
                    </div>

                    {/* Growth Badge */}
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#fabf37]/10 rounded-full">
                      <ChevronRight className="size-3 text-[#fabf37]" />
                      <span className="text-[10px] font-black text-[#fabf37]">{item.growth}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Edge gradients */}
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            </div>

          </div>
        </div>

        {/* CTA Banners Grid */}
        <div className="mb-20 container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* All Products Banner */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onPageChange?.('products')}
              className="bg-gradient-to-br from-[#fabf37] to-[#f59e0b] rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Package className="size-6 text-white" />
                  </div>
                  <ArrowRight className="size-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  All Products
                </h3>
                <p className="text-sm text-white/80 font-medium">
                  Explore our complete range of eco-friendly paper solutions
                </p>
              </div>
            </motion.div>

            {/* Solutions Banner */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onPageChange?.('solutions')}
              className="bg-gradient-to-br from-black to-zinc-800 rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-xl">
                    <Layers className="size-6 text-[#fabf37]" />
                  </div>
                  <ArrowRight className="size-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  Solutions
                </h3>
                <p className="text-sm text-zinc-400 font-medium">
                  Custom packaging solutions tailored to your business needs
                </p>
              </div>
            </motion.div>

            {/* Export Banner */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onPageChange?.('export')}
              className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Globe className="size-6 text-white" />
                  </div>
                  <ArrowRight className="size-5 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mb-2">
                  Export
                </h3>
                <p className="text-sm text-white/80 font-medium">
                  Interested in international expansion & export markets
                </p>
              </div>
            </motion.div>

            {/* Contact Our Partners Banner */}
            <motion.div
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => onPageChange?.('contact')}
              className="bg-gradient-to-br from-zinc-50 to-zinc-100 border-2 border-zinc-200 rounded-3xl p-8 cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:40px_40px]" />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[#fabf37] rounded-xl">
                    <Users className="size-6 text-black" />
                  </div>
                  <ArrowRight className="size-5 text-zinc-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-2">
                  Contact Paperware
                </h3>
                <p className="text-sm text-zinc-600 font-medium">
                  Get in touch with our team for inquiries and partnerships
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Filtered Grid - Enhanced Visibility & Contrast */}
        <div className="mb-12 md:mb-20 relative bg-zinc-50/50 py-16 md:py-24 -mx-4 px-4 border-y border-zinc-100 shadow-inner">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, z: -500 }}
              animate={{ opacity: 1, z: 0 }}
              exit={{ opacity: 0, z: 500 }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="relative h-[450px] md:h-[550px] overflow-hidden px-4"
              style={{ transformStyle: "preserve-3d", perspective: "2000px" }}
            >
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8 h-full max-w-6xl mx-auto">
                {[0, 1, 2, 3, 4].map((colIndex) => {
                  // Items per column calculation for seamless loop
                  // Column items * (item height + gap)
                  const itemsPerColumn = Math.ceil(filteredClients.length / 5);
                  const cycleDistance = itemsPerColumn * (144 + 32); // size-36 (144px) + gap-8 (32px)
                  
                  return (
                    <motion.div 
                      key={colIndex} 
                      className="relative h-full"
                      style={{ 
                          transformStyle: "preserve-3d"
                      }}
                    >
                      <motion.div
                        animate={{ 
                          y: colIndex % 2 === 0 ? [0, -cycleDistance] : [-cycleDistance, 0] 
                        }}
                        transition={{ 
                          duration: 30 + (colIndex * 5), 
                          repeat: Infinity, 
                          ease: "linear" 
                        }}
                        className="flex flex-col gap-8"
                      >
                        {[...filteredClients, ...filteredClients, ...filteredClients]
                          .filter((_, idx) => idx % 5 === colIndex)
                          .map((client, i) => (
                            <motion.div
                              key={`${client.img}-${i}`}
                              initial={{ z: 0 }}
                              whileHover={{ 
                                  scale: 1.1, 
                                  z: 100,
                                  boxShadow: "0 30px 60px -15px rgba(0,0,0,0.15)"
                              }}
                              className="bg-white size-28 md:size-36 rounded-full p-6 md:p-8 flex items-center justify-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] border border-zinc-100 shrink-0 group hover:border-[#fabf37] transition-all duration-500 relative mx-auto"
                              style={{ transformStyle: "preserve-3d" }}
                            >
                              <ImageWithFallback 
                                src={client.img} 
                                alt="Client" 
                                className="w-full h-full object-contain filter grayscale-[0.8] group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100"
                              />
                            </motion.div>
                          ))}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-10" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Phase A0: removed testimonials that appear copied from another company, and a simulated "ERP live" production counter. Add real, permission-checked testimonials later. */}

        {/* Feature: Compact Case Study */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-12 md:mb-20" style={{ transformStyle: "preserve-3d" }}>
          <motion.div 
            style={{ rotateY: useTransform(x, [-500, 500], [-5, 5]) }}
            className="bg-black text-white p-8 md:p-12 rounded-[32px] md:rounded-[48px] flex flex-col justify-between shadow-[0_40px_80px_-20px_rgba(0,0,0,0.4)] relative overflow-hidden"
          >
            <div className="space-y-6 relative z-10" style={{ transform: "translateZ(60px)" }}>
              <div className="size-12 rounded-xl bg-zinc-900 flex items-center justify-center text-[#fabf37] border border-white/5 shadow-inner">
                <MessageSquare className="size-6" />
              </div>
              <div className="space-y-3">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">Feedback</span>
                <h3 className="text-[24px] md:text-[32px] font-black uppercase tracking-tight leading-[0.95]">
                  {t('procurement_quote')}
                </h3>
              </div>
              <p className="text-zinc-400 font-bold text-sm leading-relaxed max-w-md">
                {t('procurement_desc')}
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="font-black uppercase tracking-widest text-[#fabf37] text-[10px]">{t('exec_support')}</p>
              <p className="text-[8px] font-bold text-zinc-500 mt-0.5 uppercase tracking-widest">Global Giant / APAC</p>
            </div>
          </motion.div>

          <div className="glass-premium p-8 md:p-12 rounded-[32px] md:rounded-[48px] flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-700 hover:scale-[1.01] border border-white/40 shadow-xl"
               onMouseMove={handleMouseMove}
               onMouseLeave={handleMouseLeave}
          >
            {/* 3D Interactive Layer */}
            <motion.div 
              className="absolute inset-0 pointer-events-none"
              style={{ rotateX: springTiltX, rotateY: springTiltY }}
            />

            {/* Background HUD Element */}
            <div className="absolute -top-16 -right-16 size-72 bg-[#fabf37]/5 rounded-full blur-[80px] group-hover:bg-[#fabf37]/10 transition-colors duration-700" />
            
            <div className="space-y-8 relative z-10">
              <div className="flex items-start justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-black text-[#fabf37] rounded-full">
                    <Zap className="size-2.5 fill-[#fabf37]" />
                    <span className="text-[7px] font-black uppercase tracking-[0.15em]">Node: active</span>
                  </div>
                  <h3 className="text-[32px] md:text-[42px] lg:text-[54px] font-black uppercase tracking-tighter leading-[0.85] text-black">
                    Quantum <br /> Factory <br /> <span className="text-zinc-400">Direct.</span>
                  </h3>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-y border-black/5 py-6">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Uptime</p>
                  <p className="text-xl font-black text-black">99.98%</p>
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-widest text-zinc-400 mb-0.5">Precision</p>
                  <p className="text-xl font-black text-black">0.002mm</p>
                </div>
              </div>

              <p className="text-zinc-500 font-bold text-xs md:text-sm leading-relaxed max-w-sm">
                Bypass traditional supply chains. Connect your ERP directly to our robotic manufacturing floor.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-3 font-black uppercase tracking-[0.2em] text-[9px] text-black/40 bg-white/50 px-5 py-3 rounded-full border border-black/5 cursor-not-allowed">
                  Access <ArrowRight className="size-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>



        {/* Technical Protocols Section - Removed as per request */}
        
        {/* Futuristic Product Showcase Scroll - In new container */}
        <div className="bg-white rounded-[32px] md:rounded-[48px] border border-black/5 p-8 md:p-12 shadow-xl relative overflow-hidden mt-12 md:mt-20">
          <div className="space-y-12 relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-[#fabf37] rounded-full border border-[#fabf37]/20">
                  <Package className="size-3.5" />
                  <span className="text-[8px] font-black uppercase tracking-[0.3em]">Hardware_Showcase_v2</span>
                </div>
                <h2 className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter leading-tight text-black">
                  Premium <span className="text-[#fabf37]">Product</span> <br /> Lineup
                </h2>
              </div>
              <p className="text-zinc-500 font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] max-w-xs text-right hidden md:block">
                Precision-engineered sustainable solutions for the modern enterprise ecosystem.
              </p>
            </div>

            <div className="relative -mx-4 overflow-hidden group/scroll">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex items-center gap-8 px-4 w-max"
              >
                {[...productsData, ...productsData].map((product, i) => (
                  <ProductCard key={`prod-${i}`} product={product} />
                ))}
              </motion.div>
              
              {/* Fade Gradients for the scroll */}
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
            </div>
          </div>

          {/* All Products Banner - Removed as per user request */}
          {/* <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-20 relative rounded-[32px] bg-black overflow-hidden group"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent" />
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent" />
              <div className="absolute top-0 left-10 w-px h-full bg-gradient-to-b from-transparent via-[#fabf37] to-transparent" />
              <div className="absolute top-0 right-10 w-px h-full bg-gradient-to-b from-transparent via-[#fabf37] to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-6 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fabf37]/10 rounded-full border border-[#fabf37]/20">
                  <Package className="size-4 text-[#fabf37]" />
                  <span className="text-[#fabf37] text-[10px] font-black uppercase tracking-[0.2em]">Sustainable Solutions</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none">
                    Browse Our <span className="text-[#fabf37]">Full</span> <br className="hidden md:block" /> Product Portfolio
                  </h3>
                  <p className="text-zinc-500 font-bold text-xs uppercase tracking-widest max-w-md mx-auto md:mx-0">
                    Precision-engineered paperware solutions designed for a premium brand experience and greener tomorrow.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onPageChange?.('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="relative px-10 py-5 bg-[#fabf37] rounded-2xl flex items-center gap-4 group/btn overflow-hidden transition-all shadow-[0_0_30px_rgba(250,191,55,0.2)] hover:shadow-[0_0_50px_rgba(250,191,55,0.4)]"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700 ease-in-out" />
                <ShoppingBag className="size-5 text-black" />
                <span className="text-black font-black uppercase tracking-[0.2em] text-xs">View All Products</span>
                <ArrowRight className="size-5 text-black group-hover/btn:translate-x-1 transition-transform" />
              </motion.button>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
          </motion.div> */}
        </div>

        {/* Futuristic Global Social Feed - Integrated Command Hub */}
        <div className="mt-24 mb-16 relative">
          <div className="flex flex-col md:flex-row items-end justify-between mb-10 px-4 gap-4">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#fabf37] rounded-full border border-white/10">
                <div className="size-1.5 rounded-full bg-[#fabf37] animate-ping" />
                <span className="text-[8px] font-black uppercase tracking-[0.2em]">Live Data Stream</span>
              </div>
              <h2 
                onClick={() => onPageChange?.('socials')}
                className="text-[32px] md:text-[48px] font-black uppercase tracking-tighter leading-none text-black cursor-pointer hover:text-[#fabf37] transition-colors group"
              >
                Social <span className="text-[#fabf37] group-hover:text-black transition-colors">Grid</span>
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 p-1.5 bg-zinc-100 rounded-2xl border border-zinc-200">
                {[
                  { icon: Instagram, color: '#E4405F', label: 'IG', url: 'https://www.instagram.com/paperware_factory/' },
                  { icon: Linkedin, color: '#0A66C2', label: 'IN', url: 'https://www.linkedin.com/company/paperwarefactory/?viewAsMember=true' },
                  { icon: Music2, color: '#000000', label: 'TK', url: 'http://tiktok.com/paperwarefactory' },
                  { icon: Facebook, color: '#1877F2', label: 'FB', url: 'https://www.facebook.com/paperwarefactory' },
                  { icon: Globe, color: '#000000', label: 'WEB', url: 'https://www.paperwarefactory.com' }
                ].map((soc, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => window.open(soc.url, '_blank')}
                    className="size-10 rounded-xl flex items-center justify-center text-white shadow-sm transition-all cursor-pointer"
                    style={{ backgroundColor: soc.color }}
                  >
                    <soc.icon className="size-4" />
                  </motion.button>
                ))}
              </div>

              <div className="h-10 w-px bg-zinc-200 hidden lg:block mx-2" />

              <div className="flex items-center gap-6 font-mono text-[10px] text-zinc-400">
                <span className="hidden xl:block">AGGREGATOR_v2.4</span>
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  SYSTEMS_NOMINAL
                </span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden py-10 -mx-4">
            {/* Social Marquee - Row 1 */}
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-6 whitespace-nowrap w-max px-4"
            >
              {[...socialFeeds, ...socialFeeds].map((feed, i) => (
                <SocialFeedCard key={`feed-top-${i}`} feed={feed} />
              ))}
            </motion.div>

            {/* Social Marquee - Row 2 (Reverse) */}
            <motion.div 
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 65, repeat: Infinity, ease: "linear" }}
              className="flex items-center gap-6 whitespace-nowrap w-max mt-6 px-4"
            >
              {[...socialFeeds, ...socialFeeds].reverse().map((feed, i) => (
                <SocialFeedCard key={`feed-bottom-${i}`} feed={feed} />
              ))}
            </motion.div>

            {/* Fade Gradients */}
            <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

const socialFeeds = [
  { 
    platform: 'Instagram', 
    handle: '@paperware_intl', 
    time: '2m ago', 
    content: 'Unveiling the new Eco-Series 2025. Sustainable engineering meets premium design.', 
    icon: Instagram, 
    color: '#E4405F',
    image: 'https://images.unsplash.com/photo-1612456914681-6f6111a7c973?auto=format&fit=crop&q=80&w=400'
  },
  { 
    platform: 'Linkedin', 
    handle: 'Paperware Manufacturing', 
    time: '15m ago', 
    content: 'Proud to announce our expansion into the European market with 3 new distribution nodes.', 
    icon: Linkedin, 
    color: '#0A66C2',
    image: 'https://images.unsplash.com/photo-1739204618173-3e89def7140f?auto=format&fit=crop&q=80&w=400'
  },
  { 
    platform: 'Youtube', 
    handle: 'Paperware Factory Live', 
    time: '1h ago', 
    content: 'Watch: Inside the Quantum Factory - How we achieve 0.002mm precision.', 
    icon: Youtube, 
    color: '#FF0000',
    image: 'https://images.unsplash.com/photo-1606733788345-094932d6dc8c?auto=format&fit=crop&q=80&w=400'
  },
  { 
    platform: 'Facebook', 
    handle: 'Paperware Official', 
    time: '3h ago', 
    content: 'Our 24/7 client support system just got a major upgrade. Experience the difference.', 
    icon: Facebook, 
    color: '#1877F2',
    image: 'https://images.unsplash.com/photo-1646579886741-12b59840c63f?auto=format&fit=crop&q=80&w=400'
  },
  { 
    platform: 'Instagram', 
    handle: '@paperware_intl', 
    time: '5h ago', 
    content: 'Morning vibes at the production floor. Excellence in every cup. #Manufacturing', 
    icon: Instagram, 
    color: '#E4405F',
    image: 'https://images.unsplash.com/photo-1756737335084-d150708d249d?auto=format&fit=crop&q=80&w=400'
  },
  { 
    platform: 'Linkedin', 
    handle: 'Paperware HR', 
    time: '8h ago', 
    content: 'We are hiring! Join the team building the future of industrial packaging.', 
    icon: Linkedin, 
    color: '#0A66C2',
    image: 'https://images.unsplash.com/photo-1556740758-90eb39f3203c?auto=format&fit=crop&q=80&w=400'
  },
];

function SocialFeedCard({ feed }: { feed: any }) {
  const Icon = feed.icon;
  
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("Added to favorites", {
      description: `You liked ${feed.handle}'s post`,
      icon: <Heart className="size-4 text-red-500 fill-red-500" />
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`https://paperwarefactory.com/feed/${feed.handle}`);
    toast.success("Link copied", {
      description: "Post URL has been copied to your clipboard",
      icon: <Share2 className="size-4 text-[#fabf37]" />
    });
  };

  return (
    <motion.div 
      initial={{ borderColor: "#f4f4f5" }}
      whileHover={{ y: -5, scale: 1.02, borderColor: "#fabf37" }}
      onClick={() => window.open(`https://${feed.platform.toLowerCase()}.com/${feed.handle.replace('@', '')}`, '_blank')}
      className="w-[300px] md:w-[380px] bg-white border p-5 rounded-[24px] shadow-sm flex flex-col gap-4 group cursor-pointer transition-all duration-500"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="size-10 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: feed.color }}
          >
            <Icon className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-tight text-black">{feed.platform}</span>
            <span className="text-[8px] font-bold text-zinc-400 font-mono">{feed.handle}</span>
          </div>
        </div>
        <span className="text-[8px] font-black text-zinc-300 font-mono uppercase tracking-widest bg-zinc-50 px-2 py-1 rounded-md">{feed.time}</span>
      </div>
      
      {feed.image && (
        <div className="relative h-40 w-full overflow-hidden rounded-xl border border-zinc-100">
          <ImageWithFallback 
            src={feed.image} 
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
            <div className="flex gap-2">
               <motion.button 
                 whileHover={{ scale: 1.2 }} 
                 onClick={handleLike}
                 className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
               >
                 <Heart className="size-4" />
               </motion.button>
               <motion.button 
                 whileHover={{ scale: 1.2 }} 
                 onClick={handleShare}
                 className="size-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30"
               >
                 <Send className="size-4" />
               </motion.button>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs font-bold text-zinc-600 leading-relaxed line-clamp-2 italic px-1">
        "{feed.content}"
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-zinc-50 px-1">
        <div className="flex gap-4">
          <div 
            className="flex items-center gap-1.5 text-zinc-300 hover:text-black transition-colors"
            onClick={(e) => { e.stopPropagation(); toast("Comments coming soon..."); }}
          >
            <MessageSquare className="size-3" />
            <span className="text-[8px] font-black uppercase">Comment</span>
          </div>
          <div 
            className="flex items-center gap-1.5 text-zinc-300 hover:text-black transition-colors"
            onClick={handleShare}
          >
            <Share2 className="size-3" />
            <span className="text-[8px] font-black uppercase">Share</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-1" onClick={handleLike}>
               <Heart className="size-3 text-zinc-300 group-hover:text-red-500 transition-colors" />
               <span className="text-[8px] font-black text-zinc-300 group-hover:text-zinc-500">2.4k</span>
            </div>
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      </div>
    </motion.div>
  );
}

const productsData = [
  { name: 'Quantum Cups', category: 'PREMIUM_BEVERAGE', image: 'https://images.unsplash.com/photo-1632675976092-f3cf95061178?auto=format&fit=crop&q=80&w=600', recyclability: '100%', status: 'IN_STOCK' },
  { name: 'Nebula Bowls', category: 'ECO_FOODWARE', image: 'https://images.unsplash.com/photo-1704029699879-fd71a52dc358?auto=format&fit=crop&q=80&w=600', recyclability: '98%', status: 'LIMITED' },
  { name: 'Horizon Plates', category: 'BIODEGRADABLE', image: 'https://images.unsplash.com/photo-1714013709645-267311b9b045?auto=format&fit=crop&q=80&w=600', recyclability: '100%', status: 'IN_STOCK' },
  { name: 'Matrix Bags', category: 'LUXURY_PACKAGING', image: 'https://images.unsplash.com/photo-1602414975697-62e63811999a?auto=format&fit=crop&q=80&w=600', recyclability: '95%', status: 'PRE_ORDER' },
  { name: 'Zenith Straws', category: 'SUSTAINABLE', image: 'https://images.unsplash.com/photo-1705592579405-0d59931c8e00?auto=format&fit=crop&q=80&w=600', recyclability: '100%', status: 'IN_STOCK' },
];

function ProductCard({ product }: { product: any }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-150, 150], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-150, 150], [-10, 10]), { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -10, scale: 1.02 }}
      className="w-[280px] md:w-[320px] bg-white border border-zinc-100 p-4 rounded-[32px] shadow-xl group cursor-pointer overflow-hidden relative"
    >
      <div 
        className="relative h-60 w-full rounded-[24px] overflow-hidden mb-6 border border-zinc-50"
        style={{ transform: "translateZ(50px)" }}
      >
        <ImageWithFallback 
          src={product.image} 
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-1000" 
        />
        <div 
          className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md text-[#fabf37] text-[8px] font-black rounded-full border border-white/10 uppercase tracking-widest"
          style={{ transform: "translateZ(20px)" }}
        >
          {product.status}
        </div>
      </div>
      
      <div className="space-y-4 px-2" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[8px] font-black text-[#fabf37] uppercase tracking-[0.2em]">{product.category}</span>
            <h4 className="text-xl font-black text-black tracking-tight">{product.name}</h4>
          </div>
          <div className="size-10 rounded-full bg-zinc-50 flex items-center justify-center text-zinc-300 group-hover:bg-[#fabf37] group-hover:text-black transition-all">
            <ArrowRight className="size-5" />
          </div>
        </div>

        <div 
          className="flex items-center justify-between pt-4 border-t border-zinc-50"
          style={{ transform: "translateZ(10px)" }}
        >
          <div className="flex items-center gap-2">
            <Layers2 className="size-3.5 text-zinc-300" />
            <span className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Recyclability</span>
          </div>
          <span className="text-sm font-black text-black">{product.recyclability}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#fabf37] group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

// Removed unused MagneticButton for better performance

function TestimonialCard({ item, index, highlighted = false }: { item: any, index: number, highlighted?: boolean }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        show: { opacity: 1, y: 0, scale: 1 }
      }}
      whileHover={{ y: -5, scale: 1.01 }}
      className="bg-white p-4 md:p-5 rounded-[24px] border border-zinc-100 shadow-sm space-y-3 hover:border-[#fabf37]/40 transition-all duration-700 relative overflow-hidden group/card h-full flex flex-col"
    >
      <div className="flex gap-0.5">
        {[...Array(item.stars)].map((_, i) => (
          <Star key={i} className="size-2.5 fill-[#fabf37] text-[#fabf37]" />
        ))}
      </div>
      <p className="text-zinc-800 font-bold text-xs leading-snug tracking-tight italic flex-grow">
        "{item.text}"
      </p>
      <div className="flex items-center justify-between pt-3 border-t border-zinc-50">
        <div className="space-y-0">
          <p className="text-black font-black uppercase tracking-[0.15em] text-[8px]">
            {item.author}
          </p>
          <p className="text-zinc-400 text-[6px] font-bold uppercase">Partner</p>
        </div>
        <Quote className="size-3 text-zinc-200 group-hover/card:text-[#fabf37] transition-colors" />
      </div>
    </motion.div>
  );
}