import React from "react";
import { motion, useScroll, useTransform, useMotionValue, animate } from "motion/react";
import { 
  ChartBar, ShieldCheck, Globe, Zap, Cpu, Layers, 
  Target, Rocket, Network, FileText, Database, 
  Settings, Briefcase, TrendingUp, Handshake, 
  LayoutGrid, Share2, Terminal, Monitor, 
  Lock, ArrowRight, CircleCheck, Factory, 
  Boxes, Truck, Building2
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, easeOut3, clamp01 } from "../lib/useScrollScrub";
import fFloorCupMachines from "figma:asset/factory/floor-cup-machines.webp";
import fQcCupInspection from "figma:asset/factory/qc-cup-inspection.webp";
import fFormingTurret from "figma:asset/factory/forming-turret.webp";
import iCafeCup from "figma:asset/industries/cafe-cup.webp";
import fFloorWide from "figma:asset/factory/floor-wide.webp";
import fTeam from "figma:asset/factory/team.webp";
import { useGo } from "../lib/useGo";

const HUDDecor = () => {
  const { t } = useLanguage();
  return (
  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent" />
    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent" />
    <div className="absolute top-1/2 left-0 w-full h-px bg-black/5" />
    <div className="absolute top-0 left-1/4 w-px h-full bg-black/5" />
    <div className="absolute top-0 right-1/4 w-px h-full bg-black/5" />
    
    <div className="absolute top-10 left-10 text-[8px] font-mono text-black/40">
      {t("business_system_id_pw_bx_2025")}<br />
      {t("business_lat_23_8103_n")}<br />
      {t("business_long_90_4125_e")}
    </div>
    <div className="absolute bottom-10 right-10 text-[8px] font-mono text-black/40 text-right">
      {t("business_encryption_aes_256")}<br />
      {t("business_sync_status_optimal")}<br />
      {t("business_nodes_46_active")}
    </div>
  </div>
  );
};

const BusinessMetric = ({ label, value, trend }: { label: string; value: string; trend: string }) => {
  const { t } = useLanguage();
  return (
  <div className="p-6 bg-white/40 backdrop-blur-xl border border-black/5 rounded-3xl relative group overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-[#fabf37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative z-10">
      <div className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">{t(label)}</div>
      <div className="text-3xl font-black text-black tracking-tighter mb-1">{value}</div>
      <div className="text-[10px] font-bold text-green-500 flex items-center gap-1 uppercase tracking-wider">
        <TrendingUp className="size-3" /> {t(trend)}
      </div>
    </div>
  </div>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, tags }: { icon: any; title: string; desc: string; tags: string[] }) => {
  const { t } = useLanguage();
  return (
  <motion.div 
    whileHover={{ y: -5 }}
    className="p-10 bg-white border border-black/5 rounded-[48px] shadow-sm hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
  >
    <div className="absolute -top-24 -right-24 size-48 bg-[#fabf37]/5 rounded-full blur-3xl group-hover:bg-[#fabf37]/10 transition-colors" />
    <div className="relative z-10 space-y-6">
      <div className="size-14 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:bg-black group-hover:text-[#fabf37] transition-all duration-500">
        <Icon className="size-7" />
      </div>
      <div className="space-y-3">
        <h3 className="text-2xl font-black text-black uppercase tracking-tighter leading-none">{t(title)}</h3>
        <p className="text-zinc-500 text-sm leading-relaxed">{t(desc)}</p>
      </div>
      <div className="flex flex-wrap gap-2 pt-4">
        {tags.map((tag, i) => (
          <span key={i} className="text-[9px] font-black text-zinc-400 uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-50 border border-black/5">
            {t(tag)}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
  );
};

export function BusinessPage() {
  const go = useGo();
  const { t } = useLanguage();
  const bannersRef = React.useRef<HTMLDivElement>(null);
  // Scroll-scrubbed: each ecosystem banner's photo parallaxes inside its frame as it crosses the viewport.
  useScrollScrub(() => {
    const root = bannersRef.current;
    if (!root) return;
    const vh = window.innerHeight || 1;
    root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((layer) => {
      const frame = layer.parentElement as HTMLElement;
      const r = frame.getBoundingClientRect();
      const p = clamp01((vh - r.top) / (vh + r.height));
      layer.style.transform = `translateY(${((p - 0.5) * 0.24 * r.height).toFixed(1)}px)`;
    });
  });

  return (
    <div className="bg-[#fcfcfc] min-h-screen font-['Poppins',sans-serif] overflow-hidden">
      {/* HUD Background Layer */}
      <HUDDecor />

      {/* Page Header Spacer */}
      <div className="h-28" />

      {/* 1. HERO SECTION - FACTORY ORIENTED */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-black/5 shadow-sm">
              <div className="size-2 bg-[#fabf37] rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-black/60 uppercase tracking-[0.4em]">Paperware Factory</span>
            </div>
            
            <h1 className="text-6xl md:text-9xl font-black text-black tracking-tighter uppercase leading-[0.85]">
              {t("business_factory")}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400 via-zinc-800 to-black">{t("business_powerhouse")}</span>
            </h1>
            
            <p className="text-zinc-500 max-w-2xl mx-auto font-medium text-lg leading-relaxed">
              {t("business_paperware_is_a_massive_manufacturing")}
            </p>

            <div className="flex flex-wrap justify-center gap-6 pt-8">
              <button onClick={() => go("contact")} className="px-12 py-6 bg-black text-white rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#fabf37] hover:text-black transition-all shadow-2xl">
                {t("business_technical_consultation")}
              </button>
              <button onClick={() => go("factory-live")} className="px-12 py-6 bg-white border border-black/10 text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-zinc-50 transition-all">
                {t("business_factory_tour_virtual")}
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. MANUFACTURING CAPABILITIES */}
      <section className="py-32 px-4 bg-zinc-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="space-y-4">
              <h2 className="text-5xl font-black text-black uppercase tracking-tighter leading-none">{t("manufacturing")}<br />{t("business_capabilities")}</h2>
              <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em]">{t("business_industrial_grade_precision_engineered")}</p>
            </div>
            <div className="text-[11px] font-bold text-zinc-500 max-w-sm leading-relaxed border-l-2 border-[#fabf37] pl-6">
              {t("business_our_factory_operates_with_high")}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
               <div className="absolute inset-0 rounded-[48px] overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <ImageWithFallback src={fFloorCupMachines} alt={t("business_mass_production")} className="size-full object-cover" />
               </div>
               <ServiceCard 
                 icon={Factory}
                 title={t("business_mass_production")}
                 desc="High-speed continuous lines for volume orders. Designed for maximum throughput and minimum lead times."
                 tags={["High-Speed", "Custom Print"]}
               />
            </div>
            <div className="relative group">
               <div className="absolute inset-0 rounded-[48px] overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <ImageWithFallback src={fQcCupInspection} alt={t("precision")} className="size-full object-cover" />
               </div>
               <ServiceCard 
                 icon={Settings}
                 title={t("business_precision_tooling")}
                 desc="Custom dies and molds developed in-house for unique packaging shapes and technical specifications."
                 tags={["Custom Molds", "CAD Integration", "Prototyping"]}
               />
            </div>
            <div className="relative group">
               <div className="absolute inset-0 rounded-[48px] overflow-hidden opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                  <ImageWithFallback src={fFormingTurret} alt={t("business_automation")} className="size-full object-cover" />
               </div>
               <ServiceCard 
                 icon={Cpu}
                 title={t("business_automated_quality")}
                 desc="Production is checked against structural and visual specs."
                 tags={["Quality Checks", "Low Waste"]}
               />
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS ECOSYSTEM BANNERS (Franchise, Investor, Partners) */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl space-y-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black uppercase tracking-tighter">{t("business_business_ecosystem")}</h2>
            <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mt-2">{t("business_scale_with_the_paperware_node")}</p>
          </div>

          <div ref={bannersRef} className="grid gap-8">
            {/* Franchise Banner */}
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className="relative h-[350px] rounded-[64px] overflow-hidden border border-black/5 group cursor-pointer"
            >
              <div data-parallax className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform"><ImageWithFallback src={iCafeCup} alt={t("business_franchise")} className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
              <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-xl text-white">
                <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em] mb-4">{t("business_expansion_protocol")}</div>
                <h3 className="text-5xl font-black uppercase tracking-tighter mb-4">{t("business_franchise")}<br />{t("business_opportunities")}</h3>
                <p className="text-white/60 mb-8 font-medium">{t("business_own_a_piece_of_the")}</p>
                <button onClick={() => go("franchise")} className="w-fit px-8 py-4 bg-[#fabf37] text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                  {t("business_launch_franchise_page")}
                </button>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
               {/* Investor Banner */}
               <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative h-[450px] rounded-[64px] overflow-hidden border border-black/5 group cursor-pointer"
              >
                <div data-parallax className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform"><ImageWithFallback src={fFloorWide} alt={t("business_investor")} className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em] mb-4">{t("business_capital_growth")}</div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">{t("business_investor")}<br />{t("business_relations")}</h3>
                  <p className="text-white/60 mb-8 font-medium text-sm">{t("business_join_us_in_financing_the")}</p>
                  <button onClick={() => go("investor")} className="w-fit px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                    {t("business_investor_portal")}
                  </button>
                </div>
              </motion.div>

              {/* Partner Banner */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="relative h-[450px] rounded-[64px] overflow-hidden border border-black/5 group cursor-pointer"
              >
                <div data-parallax className="absolute inset-x-0 -top-[12%] -bottom-[12%] will-change-transform"><ImageWithFallback src={fTeam} alt={t("business_partners")} className="size-full object-cover group-hover:scale-105 transition-transform duration-1000" /></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <div className="text-[10px] font-black text-[#fabf37] uppercase tracking-[0.4em] mb-4">{t("business_global_network")}</div>
                  <h3 className="text-4xl font-black uppercase tracking-tighter mb-4">{t("partnerprogram_partner")}<br />{t("business_program")}</h3>
                  <p className="text-white/60 mb-8 font-medium text-sm">{t("business_strategic_alliances_for_logistics_raw")}</p>
                  <button onClick={() => go("partners")} className="w-fit px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#fabf37] hover:text-black transition-all">
                    {t("business_partner_network")}
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* 5. MULTI-LANGUAGE HUB */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-5 pointer-events-none">
          <div className="flex flex-wrap gap-8 justify-center text-8xl font-black text-black">
            <span>ENG</span><span>SPA</span><span>FRA</span><span>ARA</span><span>BEN</span><span>ZHO</span><span>JPN</span><span>KOR</span><span>RUS</span>
          </div>
        </div>
        
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="space-y-10">
             <div className="size-20 bg-white rounded-3xl border border-black/5 shadow-xl mx-auto flex items-center justify-center">
                <Globe className="size-10 text-[#fabf37]" />
             </div>
             <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
                {t("business_localized_everywhere")}<br />
                <span className="text-zinc-500">{t("business_many_languages")}</span>
              </h2>
              <p className="text-zinc-500 font-medium leading-relaxed max-w-2xl mx-auto">
                {t("business_our_business_interface_adapts_instantly")}
              </p>
              <div className="pt-10 flex flex-wrap justify-center gap-4">
                 {["English", "Español", "Français", "العربية", "বাংলা", "中文", "日本語", "한국어"].map((lang, i) => (
                   <span key={i} className="px-6 py-2 rounded-full bg-white border border-black/5 text-[10px] font-black uppercase tracking-widest text-black/60 shadow-sm">
                      {t(lang)}
                   </span>
                 ))}
                 <span className="px-6 py-2 rounded-full bg-black text-white text-[10px] font-black uppercase tracking-widest shadow-xl">
                    {t("business_38_more")}
                 </span>
              </div>
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA - Removed as per user request */}
      {/* <section className="py-40 px-4">
        <div className="container mx-auto max-w-5xl relative">
          <div className="absolute inset-0 bg-[#fabf37] rounded-[80px] rotate-2 scale-105 opacity-10" />
          <div className="relative bg-white border border-black/5 rounded-[80px] p-24 text-center overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 size-64 bg-zinc-50 blur-[100px] rounded-full" />
            <div className="absolute bottom-0 right-0 size-64 bg-blue-500/5 blur-[100px] rounded-full" />
            
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="relative z-10 space-y-10">
              <h2 className="text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-none">
                Ready to<br />
                <span className="text-zinc-300">Deploy?</span>
              </h2>
              <p className="text-zinc-500 max-w-lg mx-auto font-medium">
                Book a technical consultation with our engineering team to discuss your manufacturing specifications and ERP integration.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button onClick={() => go("contact")} className="px-16 py-8 bg-black text-white rounded-full font-black text-[12px] uppercase tracking-[0.4em] hover:bg-[#fabf37] hover:text-black transition-all shadow-xl">
                  Contact Sales Node
                </button>
                <button onClick={() => go("quote")} className="px-16 py-8 bg-zinc-100 text-black rounded-full font-black text-[12px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all">
                  Request RFQ
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section> */}

      <div className="h-20" />
    </div>
  );
}