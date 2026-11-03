import React from "react";
import imgCalendars from "@/assets/industries/desk-calendars.webp";
import { motion } from "motion/react";
import { 
  Notebook, Mail, FolderOpen, FileText, Contact, 
  ArrowRight, ShieldCheck, Zap, Layers, Cpu, Box, 
  CircleCheck, Truck, ShoppingBag, Clock, Heart, Sparkles, Filter, Activity
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, easeOut3, clamp01 } from "../lib/useScrollScrub";
import { TopSellingProducts } from "../components/TopSellingProducts";
import yStationery from "figma:asset/996fde50aac464284d2652c5f215d915bf7e1897.webp";
import yBrochures from "figma:asset/aebcf13cb4e5ea06fcb9980128694f52cc69049a.webp";
import { useGo } from "../lib/useGo";

const products = [
  { name: "Business Card", desc: "Premium textured cardstock with UV spot finish.", category: "Print", image: yStationery, icon: Contact },
  { name: "Envelope", desc: "Custom sized professional mailing solutions.", category: "Mailing", icon: Mail },
  { name: "Invoice Pad", desc: "Duplicate/Triplicate carbonless NCR pads.", category: "Finance", icon: FileText },
  { name: "Letterhead Pad", desc: "Executive 100GSM watermarked paper.", category: "Branding", image: yBrochures, icon: FileText },
  { name: "Money Receipt", desc: "Secure serialized financial documentation.", category: "Finance", icon: FileText },
  { name: "Delivery Note", desc: "Industrial strength logbooks for logistics.", category: "Logistics", icon: Truck },
  { name: "Note Book", desc: "Custom branded corporate notebooks.", category: "Office", icon: Notebook },
  { name: "Diary", desc: "Annual premium planners and organizers.", category: "Office", icon: Notebook },
  { name: "File Folder", desc: "Heavy-duty laminated organizational folders.", category: "Organization", icon: FolderOpen },
];

export function OfficeStationaryPage({ onProductClick }: { onProductClick: (p: any) => void }) {
  const go = useGo();
  const { t } = useLanguage();

  const heroRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  // Scroll-scrubbed (1:1 with scroll position; runs under reduced motion because the user drives it):
  // the hero copy eases back and fades as it leaves, the product tiles rise in with a per-column stagger.
  useScrollScrub(() => {
    const vh = window.innerHeight || 1;
    const hero = heroRef.current;
    if (hero) {
      const r = hero.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(r.height, 1));
      hero.style.transform = `translateY(${(p * 40).toFixed(1)}px) scale(${(1 - p * 0.06).toFixed(4)})`;
      hero.style.opacity = (1 - p * 0.7).toFixed(3);
    }
    const grid = gridRef.current;
    if (grid) {
      const cols = getComputedStyle(grid).gridTemplateColumns.split(" ").length || 1;
      Array.from(grid.children).forEach((c, i) => {
        const el = c as HTMLElement;
        const r = el.getBoundingClientRect();
        const t = easeOut3((vh - r.top) / (vh * 0.5) - (i % cols) * 0.12);
        el.style.transform = `translateY(${((1 - t) * 48).toFixed(1)}px)`;
        el.style.opacity = t.toFixed(3);
      });
    }
  });

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-24 font-['Poppins',sans-serif]">
      {/* Hero */}
      <section className="container mx-auto px-4 mb-24">
        <div ref={heroRef} className="max-w-4xl origin-top-left">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="size-2 rounded-full bg-[#fabf37]" />
            <span className="text-[#fabf37] font-black uppercase tracking-[0.4em] text-xs">{t("office_stationary_premium_corporate_assets")}</span>
          </motion.div>
          <h1 className="text-[56px] md:text-[90px] font-black uppercase tracking-tighter leading-[0.85] mb-8 text-black">
            {t("office_stationary_office")} <br /> <span className="text-zinc-500">{t("office_stationary_stationary")}</span>
          </h1>
          <p className="text-zinc-500 font-bold text-lg max-w-2xl leading-relaxed">
            {t("office_stationary_elevate_your_corporate_identity_with")}
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 mb-24">
        <div className="aspect-[4/3] md:aspect-[21/9] rounded-[40px] overflow-hidden border border-black/5">
          <img src={imgCalendars} alt={t("office_stationary_printed_desk_calendars")} loading="lazy" decoding="async" className="size-full object-cover" />
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { label: "Paper Weight", value: "80-350 GSM" },
            { label: "Print Tech", value: "Offset / Digital" },
            { label: "Finishing", value: "Matte / Gloss / Spot UV" },
          ].map((stat, i) => (
            <div key={i} className="p-8 bg-white border border-black/5 rounded-[32px] shadow-sm">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2">{t(stat.label)}</p>
              <p className="text-2xl font-black text-black">{t(stat.value)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="container mx-auto px-4 mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" ref={gridRef}>
          {products.map((p, i) => (
            <div
              key={p.name}
              onClick={() => onProductClick(p)}
              className="group bg-white rounded-[48px] border border-black/5 hover:border-[#fabf37] hover:shadow-2xl transition-[border-color,box-shadow] overflow-hidden cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {p.image ? (
                  <ImageWithFallback 
                    src={p.image} 
                    alt={t(p.name)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#fabf37] flex items-center justify-center text-black/80 group-hover:scale-110 transition-transform duration-700">
                    <p.icon className="size-24" strokeWidth={1} />
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full">
                  <span className="text-[10px] font-black text-[#fabf37] uppercase tracking-widest">{t("featured_products_magazine_in_stock")}</span>
                </div>
              </div>
              <div className="p-10">
                <div className="flex justify-between items-start mb-6">
                  <div className="size-12 rounded-xl bg-zinc-50 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all">
                    <p.icon className="size-5" />
                  </div>
                  <span className="text-[8px] font-black uppercase tracking-widest px-3 py-1 bg-zinc-100 rounded-full text-[rgb(0,0,0)]">{t(p.category)}</span>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-4 text-black">{t(p.name)}</h3>
                <p className="text-zinc-500 font-bold text-sm mb-8 leading-relaxed">{t(p.desc)}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                    {t("office_stationary_request_specs")} <ArrowRight className="size-4" />
                  </button>
                  <div className="flex items-center gap-2">
                    <Zap className="size-4 text-[#fabf37]" />
                    <span className="text-[9px] font-black uppercase text-zinc-400">{t("office_stationary_ships_in_24h")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <TopSellingProducts onProductClick={onProductClick} />

      {/* Fast Delivery Banner */}
      <section className="container mx-auto px-4 mb-32">
        <div className="bg-[#fabf37] rounded-[60px] p-12 lg:p-20 flex flex-col lg:flex-row items-center gap-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <Truck className="size-64 text-black" />
          </div>
          <div className="lg:w-1/2 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 bg-black text-[#fabf37] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Zap className="size-3" /> {t("office_stationary_turbo_logistics")}
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black">
              {t("office_stationary_same_day")} <br /> {t("office_stationary_production")}
            </h2>
            <p className="text-black/60 font-bold text-lg leading-relaxed max-w-md">
              {t("office_stationary_we_understand_the_pace_of")}
            </p>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end relative z-10">
          </div>
        </div>
      </section>

      {/* Tech Section */}
      <section className="bg-black py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fabf37 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="container mx-auto px-4 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white italic">
              {t("industrial")} <span className="text-[#fabf37]">{t("precision")}</span> {t("office_stationary_printing")}
            </h2>
            <p className="text-zinc-500 font-bold leading-relaxed max-w-lg">
              {t("office_stationary_our_heidelberg_offset_presses_and")}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-white/70 font-bold text-sm">
                <CircleCheck className="size-5 text-[#fabf37]" /> {t("office_stationary_cmyk_accurate")}
              </div>
              <div className="flex items-center gap-3 text-white/70 font-bold text-sm">
                <CircleCheck className="size-5 text-[#fabf37]" /> {t("office_stationary_bulk_serialization")}
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 grid grid-cols-2 gap-6">
            <div className="aspect-square bg-zinc-900 rounded-[40px] border border-white/5 flex flex-col items-center justify-center p-8 text-center space-y-4">
              <ShieldCheck className="size-12 text-[#fabf37]" />
              <p className="text-white font-black uppercase tracking-widest text-[10px]">{t("office_stationary_quality_control")}</p>
            </div>
            <div className="aspect-square bg-[#fabf37] rounded-[40px] flex flex-col items-center justify-center p-8 text-center space-y-4">
              <Zap className="size-12 text-black" />
              <p className="text-black font-black uppercase tracking-widest text-[10px]">{t("office_stationary_rapid_turnaround")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-32 text-center">
        <div className="max-w-2xl mx-auto space-y-12">
          <h2 className="text-[40px] md:text-[60px] font-black uppercase tracking-tighter text-black">{t("office_stationary_ready_to")} <span className="text-[#fabf37]">{t("office_stationary_modernize")}</span>?</h2>
          <button onClick={() => go("contact")} className="bg-black text-[#fabf37] px-12 py-6 rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
            {t("office_stationary_request_catalog")}
          </button>
        </div>
      </section>
    </div>
  );
}