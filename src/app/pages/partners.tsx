import { useState, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import {
  Factory,
  Cpu,
  Leaf,
  Truck,
  Wifi,
  Code,
  Database,
  Palette,
  ArrowUpRight,
  Globe,
  Search,
  CheckCircle2,
  MapPin,
  TrendingUp,
  Quote,
  FileCheck,
  Handshake,
  Zap,
  Users,
  ShieldCheck
} from "lucide-react";

// --- Types ---

export interface Partner {
  id: string;
  name: string;
  category: string;
  logo: string;
  description: string;
  location?: string;
  since?: string;
  certifications?: string[];
  website?: string;
  isFeatured?: boolean;
}

interface PartnersPageProps {
  partners?: Partner[];
  signingImage?: string;
  onApplyNow?: () => void;
  onReadGuidelines?: () => void;
}

// --- Data ---

const PARTNER_CATEGORIES = [
  {
    id: "raw-material",
    title: "Raw Material",
    icon: Leaf,
    color: "#059669", // Emerald 600
    bg: "bg-emerald-50",
    description: "Sustainable pulp & fiber",
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    id: "machinery",
    title: "Machinery",
    icon: Factory,
    color: "#ea580c", // Orange 600
    bg: "bg-orange-50",
    description: "Industrial automation",
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    id: "digital",
    title: "Digital Core",
    icon: Code,
    color: "#7c3aed", // Violet 600
    bg: "bg-violet-50",
    description: "Tech infrastructure",
    colSpan: "col-span-1 md:col-span-1",
  },
  {
    id: "logistics",
    title: "Global Logistics",
    icon: Truck,
    color: "#dc2626", // Red 600
    bg: "bg-red-50",
    description: "Supply chain network",
    colSpan: "col-span-1 md:col-span-2",
  },
  {
    id: "erp",
    title: "ERP Systems",
    icon: Database,
    color: "#2563eb", // Blue 600
    bg: "bg-blue-50",
    description: "Resource planning",
    colSpan: "col-span-1",
  },
  {
    id: "technology",
    title: "Cloud Tech",
    icon: Cpu,
    color: "#4f46e5", // Indigo 600
    bg: "bg-indigo-50",
    description: "Scalable solutions",
    colSpan: "col-span-1",
  },
  {
    id: "design",
    title: "Creative",
    icon: Palette,
    color: "#db2777", // Pink 600
    bg: "bg-pink-50",
    description: "Brand & Design",
    colSpan: "col-span-1",
  },
  {
    id: "connectivity",
    title: "Network",
    icon: Wifi,
    color: "#0891b2", // Cyan 600
    bg: "bg-cyan-50",
    description: "High-speed comms",
    colSpan: "col-span-1",
  }
];

const DEFAULT_SIGNING_IMAGE = "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop";

const DEFAULT_PARTNERS: Partner[] = [
  // Raw Material Partners
  {
    id: "1",
    name: "EcoPulp Industries",
    category: "raw-material",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop",
    description: "Premium FSC-certified sustainable paper pulp from responsibly managed forests.",
    location: "Finland",
    since: "2020",
    certifications: ["FSC", "ISO 14001"],
    website: "https://example.com"
  },
  {
    id: "2",
    name: "Nordic Fiber Co.",
    category: "raw-material",
    logo: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300&h=300&fit=crop",
    description: "High-quality virgin and recycled fiber solutions.",
    location: "Sweden",
    since: "2019"
  },

  // ERP Partners
  {
    id: "4",
    name: "ERPNext",
    category: "erp",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop",
    description: "Open-source ERP for complete business management and automation.",
    location: "Global",
    since: "2018",
    certifications: ["ISO 27001"]
  },
  {
    id: "5",
    name: "SAP Business One",
    category: "erp",
    logo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop",
    description: "Enterprise resource planning for manufacturing excellence.",
    location: "Germany",
    since: "2019"
  },

  // Digital Partners
  {
    id: "6",
    name: "DigitalCore Solutions",
    category: "digital",
    logo: "https://images.unsplash.com/photo-1572044162444-ad6021194360?w=300&h=300&fit=crop",
    description: "End-to-end digital transformation and cloud solutions.",
    location: "USA",
    since: "2020"
  },

  // Machinery Partners
  {
    id: "8",
    name: "Heidelberg Machinery",
    category: "machinery",
    logo: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=300&fit=crop",
    description: "German precision engineering for paper manufacturing.",
    location: "Germany",
    since: "2017",
    certifications: ["CE", "ISO 9001"]
  },
  {
    id: "9",
    name: "AutoPack Systems",
    category: "machinery",
    logo: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=300&h=300&fit=crop",
    description: "Automated packaging and quality control systems.",
    location: "Japan",
    since: "2019"
  },

  // Logistics Partners
  {
    id: "10",
    name: "FastTrack Logistics",
    category: "logistics",
    logo: "https://images.unsplash.com/photo-1626863905121-3b0c0ed5b92c?w=300&h=300&fit=crop",
    description: "Nationwide secure distribution and cold-chain network.",
    location: "Bangladesh",
    since: "2020"
  },
  {
    id: "11",
    name: "DHL Supply Chain",
    category: "logistics",
    logo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=300&h=300&fit=crop",
    description: "Global logistics and international shipping solutions.",
    location: "Global",
    since: "2021"
  },

  // Technology Partners
  {
    id: "12",
    name: "AWS Cloud Services",
    category: "technology",
    logo: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=300&h=300&fit=crop",
    description: "Scalable cloud infrastructure and data analytics.",
    location: "Global",
    since: "2020"
  },

  // Design Partners
  {
    id: "14",
    name: "BrandForge Studio",
    category: "design",
    logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=300&fit=crop",
    description: "Premium branding and packaging design services.",
    location: "UK",
    since: "2021"
  },

  // Connectivity Partners
  {
    id: "15",
    name: "ConnectTel",
    category: "connectivity",
    logo: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&h=300&fit=crop",
    description: "Enterprise-grade telecommunications infrastructure.",
    location: "Bangladesh",
    since: "2019"
  }
];

// --- Components ---

export function PartnersPage({
  partners = DEFAULT_PARTNERS,
  signingImage = DEFAULT_SIGNING_IMAGE,
  onApplyNow,
  onReadGuidelines
}: PartnersPageProps) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const displayPartners = partners && partners.length > 0 ? partners : DEFAULT_PARTNERS;
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const filteredPartners = displayPartners.filter(p => {
    const matchesCategory = selectedCategory ? p.category === selectedCategory : true;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-zinc-50 text-zinc-900 selection:bg-[#fabf37] selection:text-black font-sans">

      {/* Background Texture */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.4] mix-blend-soft-light" />
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-br from-blue-100 to-emerald-50 opacity-60 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-orange-50 to-[#fabf37]/20 opacity-60 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden z-10 bg-white">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={signingImage || DEFAULT_SIGNING_IMAGE}
            className="w-full h-full object-cover opacity-10 saturate-0 scale-105"
            alt="Strategic Partnership"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white" />
        </div>

        <div className="container mx-auto px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#fabf37]/10 backdrop-blur-sm rounded-full border border-[#fabf37]/20 mb-8">
              <Zap className="h-4 w-4 text-[#fabf37]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#fabf37]">{t("partners_hero_tag")}</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-zinc-900 mb-8">
              {t("partners_hero_title_1")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-400 to-zinc-900 italic">
                {t("partners_hero_title_2")}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-zinc-500 font-medium max-w-xl mb-12">
              {t("partners_hero_subtitle")}
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ y }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 mix-blend-multiply"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black">{t("scroll")}</span>
          <div className="w-[2px] h-12 bg-zinc-300 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-black animate-slide-down" />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <div className="bg-white border-y border-zinc-100 z-20 relative">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-zinc-100">
            {[
              { label: t("partners_stat_active"), value: t("partners_stat_active_val") },
              { label: t("partners_stat_industries"), value: t("partners_stat_industries_val") },
              { label: t("partners_stat_team"), value: t("partners_stat_team_val") },
              { label: t("partners_stat_since"), value: t("partners_stat_since_val") },
            ].map((stat, i) => (
              <div key={i} className="text-center group cursor-default">
                <div className="text-3xl md:text-4xl font-black text-zinc-900 mb-1 group-hover:scale-110 transition-transform duration-300 ease-out">{stat.value}</div>
                <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest group-hover:text-[#fabf37] transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Global Network Map Section */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 mb-4">{t("partners_footprint_title")}</h2>
            <p className="text-zinc-500 font-medium max-w-2xl mx-auto">{t("partners_footprint_subtitle")}</p>
          </div>

          <div className="relative w-full aspect-[2/1] bg-white rounded-[3rem] shadow-xl border border-zinc-100 overflow-hidden">
            {/* Abstract Map Art */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')] bg-cover bg-center bg-no-repeat grayscale" />

            {/* Pulse Points */}
            {[
              { top: '39%', left: '72%', name: t("partners_map_hq"), color: '#006a4e', type: 'flag' },
              { top: '43%', left: '66%', name: t("partners_map_india"), color: '#f59e0b' },
              { top: '33%', left: '75%', name: t("partners_map_china_inland"), color: '#10b981' },
              { top: '39%', left: '78%', name: t("partners_map_guangzhou"), color: '#10b981' },
              { top: '34%', left: '81%', name: t("partners_map_ningbo"), color: '#3b82f6' },
            ].map((pin, i) => (
              <div key={i} className="absolute" style={{ top: pin.top, left: pin.left }}>
                <div className="relative flex items-center justify-center group cursor-pointer">
                  {pin.type === 'flag' ? (
                    <>
                      <span className="absolute inline-flex h-8 w-8 animate-ping rounded-full opacity-75 bg-red-500"></span>
                      <div className="relative h-5 w-5 rounded-full bg-[#006a4e] border-2 border-white shadow-sm flex items-center justify-center overflow-hidden hover:scale-125 transition-transform">
                        <div className="h-2.5 w-2.5 bg-red-600 rounded-full translate-x-[1px]" />
                      </div>
                    </>
                  ) : (
                    <>
                      <span className="absolute inline-flex h-6 w-6 animate-ping rounded-full opacity-75" style={{ backgroundColor: pin.color }}></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: pin.color }}></span>
                    </>
                  )}

                  {/* Tooltip */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap shadow-xl pointer-events-none scale-90 group-hover:scale-100 transform duration-200 z-50">
                    {pin.name}
                  </div>
                </div>
              </div>
            ))}

            {/* Live Data Overlay */}
            <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-zinc-100 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">{t("partners_live_status")}: <span className="text-emerald-600">{t("active")}</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-24 z-10 relative">

        {/* Bento Grid Categories */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-zinc-900 mb-2 uppercase tracking-tight">{t("partners_browse_categories")}</h2>
              <p className="text-zinc-500 font-medium">{t("partners_categories_desc")}</p>
            </div>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-sm font-bold text-zinc-900 bg-zinc-100 px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
              >
                {t("partners_clear_filter")}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[12rem]">
            {PARTNER_CATEGORIES.map((cat, i) => (
              <CategoryTile
                key={cat.id}
                category={cat}
                isActive={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                index={i}
              />
            ))}
          </div>
        </motion.div>

        {/* Logo Marquee Section */}
        <div className="mb-24 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10" />

          <div className="flex flex-col gap-10">
            {/* Show only featured logos if any are selected, otherwise show all as fallback */}
            {(() => {
              const featuredLogos = displayPartners.filter(p => p.isFeatured).map(p => p.logo);
              const marqueeLogos = featuredLogos.length > 0 ? featuredLogos : displayPartners.map(p => p.logo);
              return (
                <>
                  <MarqueeRow logos={marqueeLogos} direction="left" speed={60} />
                  <MarqueeRow logos={[...marqueeLogos].reverse()} direction="right" speed={50} />
                </>
              );
            })()}
          </div>
        </div>

        {/* Partners List Header */}
        <div className="sticky top-0 z-30 bg-zinc-50/90 backdrop-blur-xl py-6 border-b border-zinc-200 mb-12 flex flex-col md:flex-row gap-6 justify-between items-center transition-all">
          <div className="flex items-center gap-4">
            <div className="h-8 w-1.5 bg-[#fabf37]" />
            <h3 className="text-2xl font-black uppercase tracking-tight text-zinc-900">
              {selectedCategory
                ? t(`partner_cat_${selectedCategory.replace('-', '_')}` as any)
                : t("partners_all_partners")}
            </h3>
          </div>

          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-zinc-400 group-focus-within:text-black transition-colors" />
            <input
              type="text"
              placeholder={t("partners_search_placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-900 shadow-sm focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100 transition-all placeholder:text-zinc-400 font-medium"
            />
          </div>
        </div>

        {/* Partners Grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-32"
          >
            {filteredPartners.map((partner) => (
              <Card key={partner.id} partner={partner} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPartners.length === 0 && (
          <div className="py-24 text-center bg-white rounded-3xl border border-zinc-100 shadow-sm mb-32">
            <div className="inline-flex size-16 rounded-full bg-zinc-50 items-center justify-center mb-6">
              <Search className="size-6 text-zinc-400" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 mb-1">{t("partners_no_found")}</h3>
            <p className="text-zinc-500">{t("partners_no_found_desc")}</p>
          </div>
        )}

        {/* 3. Impact Stories Section */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-10 w-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Leaf className="size-6" />
            </div>
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-zinc-900">{t("partners_impact_title")}</h2>
              <p className="text-zinc-500 font-medium">{t("partners_impact_subtitle")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: t("partners_impact_story_1_title"),
                partner: t("partner_name_1"),
                stat: t("partners_impact_stat_1"),
                desc: t("partners_impact_story_1_desc"),
                color: "bg-emerald-500"
              },
              {
                title: t("partners_impact_story_2_title"),
                partner: t("partner_name_10"),
                stat: t("partners_impact_stat_2"),
                desc: t("partners_impact_story_2_desc"),
                color: "bg-blue-500"
              },
              {
                title: t("partners_impact_story_3_title"),
                partner: t("partner_name_3"),
                stat: t("partners_impact_stat_3"),
                desc: t("partners_impact_story_3_desc"),
                color: "bg-orange-500"
              }
            ].map((story, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl bg-white p-8 border border-zinc-100 hover:shadow-xl transition-all duration-300">
                <div className={`absolute top-0 right-0 w-24 h-24 ${story.color} opacity-10 rounded-bl-full group-hover:scale-150 transition-transform duration-500`} />

                <div className="relative z-10">
                  <span className="inline-block px-3 py-1 rounded-full bg-zinc-50 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-4">
                    {story.partner}
                  </span>
                  <h3 className="text-2xl font-black text-zinc-900 mb-2">{story.title}</h3>
                  <div className={`text-xl font-bold ${story.color.replace('bg-', 'text-')} mb-4`}>{story.stat}</div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{story.desc}</p>

                  <div className="pt-6 border-t border-zinc-50 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-900 cursor-pointer group-hover:gap-4 transition-all">
                    {t("partners_read_case")} <ArrowUpRight className="size-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Partner Testimonials Section */}
        <div className="mb-32 bg-zinc-900 rounded-[2.5rem] p-10 md:p-14 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <Quote className="size-10 text-[#fabf37] mx-auto mb-6 opacity-50" />
            <h3 className="text-xl md:text-2xl font-black leading-snug">
              "{t("partners_testimonial")}"
            </h3>
          </div>
        </div>

        {/* 5. Onboarding Process Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tight text-zinc-900 mb-4">{t("partners_join_title")}</h2>
            <p className="text-zinc-500 font-medium">{t("partners_join_subtitle")}</p>
          </div>

          <div className="relative">
            {/* Connector Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-100 -translate-y-1/2 hidden md:block" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: t("partners_step_1_title"), desc: t("partners_step_1_desc"), icon: FileCheck },
                { step: "02", title: t("partners_step_2_title"), desc: t("partners_step_2_desc"), icon: ShieldCheck },
                { step: "03", title: t("partners_step_3_title"), desc: t("partners_step_3_desc"), icon: Handshake },
                { step: "04", title: t("partners_step_4_title"), desc: t("partners_step_4_desc"), icon: Users },
              ].map((item, i) => (
                <div key={i} className="relative bg-white p-8 rounded-3xl border border-zinc-100 text-center hover:border-black transition-colors group">
                  <div className="size-12 rounded-xl bg-zinc-50 flex items-center justify-center mx-auto mb-6 text-zinc-900 group-hover:bg-[#fabf37] transition-colors shadow-sm">
                    <item.icon className="size-6" />
                  </div>
                  <div className="text-4xl font-black text-zinc-100 absolute top-4 right-6 pointer-events-none group-hover:text-zinc-900/5 transition-colors">{item.step}</div>
                  <h3 className="text-lg font-black uppercase tracking-tight mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CTA Section */}
      <section className="relative py-32 bg-white overflow-hidden border-t border-zinc-100">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-zinc-100 text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{t("partners_growth_tag")}</div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8 text-black">
            {t("partners_cta_title_1")} <span className="text-[#fabf37]">{t("partners_cta_title_2")}</span>
          </h2>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-12 text-xl font-medium">
            {t("partners_cta_desc")}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={onApplyNow}
              className="px-10 py-5 bg-black text-white font-black uppercase tracking-widest hover:bg-[#fabf37] hover:text-black hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-xl shadow-lg shadow-zinc-200"
            >
              {t("partners_apply_now")}
            </button>
            <button
              onClick={onReadGuidelines}
              className="px-10 py-5 bg-white border-2 border-zinc-100 text-black font-bold uppercase tracking-widest hover:border-black hover:bg-zinc-50 transition-all duration-300 rounded-xl"
            >
              {t("partners_read_guidelines")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// --- Sub Components ---

const MarqueeRow = ({ logos, direction = "left", speed = 40 }: { logos: string[]; direction?: "left" | "right"; speed?: number }) => {
  // Triple the logos to handle screen widths and smooth loops
  const items = [...logos, ...logos, ...logos, ...logos];

  return (
    <div className="flex whitespace-nowrap overflow-hidden py-2 select-none group">
      <motion.div
        animate={{
          x: direction === "left" ? [0, "-50%"] : ["-50%", 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-16 pr-16 items-center"
      >
        {items.map((logo, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-24 md:w-32 h-12 md:h-16 relative grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-300 cursor-default"
          >
            <ImageWithFallback
              src={logo}
              alt="Partner Logo"
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function CategoryTile({ category, isActive, onClick, index }: { category: any, isActive: boolean, onClick: () => void, index: number }) {
  const { t } = useLanguage();
  const Icon = category.icon;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -4 }}
      className={`
        relative group cursor-pointer overflow-hidden rounded-3xl border transition-all duration-300 ${category.colSpan}
        ${isActive
          ? 'bg-black text-white border-black shadow-xl ring-4 ring-zinc-100'
          : 'bg-white text-zinc-900 border-zinc-100 hover:border-zinc-300 hover:shadow-lg'
        }
      `}
    >
      <div className={`absolute top-0 right-0 p-6 opacity-10 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12 ${isActive ? 'text-white' : 'text-black'}`}>
        <Icon className="size-24" />
      </div>

      <div className="h-full p-6 flex flex-col justify-between relative z-10">
        <div className={`
          size-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 shadow-sm
          ${isActive ? 'bg-[#fabf37] text-black' : category.bg + ' ' + 'text-black'}
        `}>
          <Icon className="size-6" />
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className={`text-xl font-black uppercase tracking-tight mb-1 ${isActive ? 'text-white' : 'text-zinc-900'}`}>
              {t(`partner_cat_${category.id.replace('-', '_')}` as any)}
            </h3>
            <ArrowUpRight className={`size-5 opacity-0 group-hover:opacity-100 transition-all duration-300 ${isActive ? 'text-[#fabf37]' : 'text-zinc-400'}`} />
          </div>
          <p className={`text-sm font-medium line-clamp-2 ${isActive ? 'text-zinc-400' : 'text-zinc-500'}`}>
            {t(`partner_cat_${category.id.replace('-', '_')}_desc` as any)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Card({ partner }: { partner: Partner }) {
  const { t } = useLanguage();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white border border-zinc-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-zinc-200/50 hover:border-zinc-200 transition-all duration-500 flex flex-col h-full"
    >
      <div className="p-8 pb-0 flex-1 flex flex-col items-center">
        <div className="size-24 bg-white rounded-2xl p-4 flex items-center justify-center mb-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-50 group-hover:scale-110 transition-transform duration-500">
          {partner.logo ? (
            <ImageWithFallback src={partner.logo} alt={partner.name} className="w-full h-full object-contain" />
          ) : (
            <div className="text-2xl font-black text-zinc-300">{partner.name.substring(0, 2)}</div>
          )}
        </div>

        <h4 className="text-lg font-black text-zinc-900 text-center mb-1 leading-tight group-hover:text-blue-600 transition-colors">
          {t(`partner_name_${partner.id}` as any)}
        </h4>

        <span className="inline-block px-3 py-1 rounded-full bg-zinc-50 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-4 border border-zinc-100">
          {t(`partner_cat_${partner.category.replace('-', '_')}` as any)}
        </span>

        <p className="text-sm text-zinc-500 font-medium leading-relaxed text-center line-clamp-3 mb-6">
          {t(`partner_desc_${partner.id}` as any)}
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto w-full">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {partner.certifications?.slice(0, 2).map((cert, i) => (
            <span key={i} className="flex items-center gap-1 text-[9px] font-bold px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 uppercase tracking-wide">
              <CheckCircle2 className="size-3" /> {cert}
            </span>
          ))}
          {partner.location && (
            <span className="flex items-center gap-1 text-[9px] font-bold px-2.5 py-1.5 rounded-lg bg-zinc-50 text-zinc-500 uppercase tracking-wide">
              <Globe className="size-3" /> {t(`loc_${partner.location.toLowerCase()}` as any)}
            </span>
          )}
        </div>

        <button className="w-full py-3.5 rounded-2xl bg-zinc-50 text-xs text-zinc-900 font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn">
          {t("view_details")} <ArrowUpRight className="size-3 text-zinc-400 group-hover/btn:text-[#fabf37] transition-colors" />
        </button>
      </div>
    </motion.div>
  );
}
