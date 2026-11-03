import React from "react";
import { motion } from "motion/react";
import { 
  Package, CircleCheck, Factory, 
  Truck, Search, Activity, Cpu, 
  ShieldCheck, ArrowLeft, Download, 
  Layers, MapPin, Calendar, Clock,
  User, Shield, Leaf, ChartBar,
  Facebook, Instagram, Linkedin, Share2,
  Sparkles, Award, Globe, Zap,
  Settings, Database, FileText, Info,
  TrendingUp, MousePointer2, Youtube,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, clamp01, easeOut3 } from "../lib/useScrollScrub";
// Real Paperware floor photos (src/assets/factory/SOURCES.txt) replace former stock images.
import imgPressOperator from "../../assets/factory/press-operator.webp";
import imgCupsStacking from "../../assets/factory/cups-stacking.webp";
import imgQcLeakTest from "../../assets/factory/qc-leak-test.webp";
import imgQcTechnician from "../../assets/factory/qc-technician.webp";
import { toast } from "sonner";
import { FactoryClip, mediaUrl } from "../components/paperware/factory-clip";
import posterJourney from "../../assets/video-posters/journey-print-laminate.webp";
import { useGo } from "../lib/useGo";
import { useLanguage } from "../context/LanguageContext";

const JOURNEY_VIDEO = mediaUrl("journey-print-laminate.mp4");

export function ProductJourneyPage({ onBack }: { onBack?: () => void }) {
  const { t } = useLanguage();
  const go = useGo();
  const chartData = [
    { time: '00:00', consistency: 98.2 },
    { time: '04:00', consistency: 99.1 },
    { time: '08:00', consistency: 97.8 },
    { time: '12:00', consistency: 99.5 },
    { time: '16:00', consistency: 99.2 },
    { time: '20:00', consistency: 98.9 },
    { time: '24:00', consistency: 99.8 },
  ];

  const factoryPosts = [
    {
      id: 1,
      title: "New Heidelberg Unit 4 Installation Live!",
      date: "Dec 15, 2025",
      image: imgPressOperator,
      category: "Infrastructure",
      likes: "1.2k",
      platform: <Youtube className="size-4" />,
      platformName: "YouTube"
    },
    {
      id: 2,
      title: "Sustainability Milestone: 95% Waste Recycled",
      date: "Dec 10, 2025",
      image: imgCupsStacking,
      category: "Eco-News",
      likes: "2.4k",
      platform: <Instagram className="size-4" />,
      platformName: "Instagram"
    },
    {
      id: 3,
      title: "How we achieve zero-defect in Paperware",
      date: "Dec 05, 2025",
      image: imgQcLeakTest,
      category: "Innovation",
      likes: "890",
      platform: <Linkedin className="size-4" />,
      platformName: "LinkedIn"
    },
    {
      id: 4,
      title: "Meet our Quality Assurance Team #Paperware",
      date: "Nov 28, 2025",
      image: imgQcTechnician,
      category: "Culture",
      likes: "1.5k",
      platform: <Facebook className="size-4" />,
      platformName: "Facebook"
    }
  ];

  const journey = [
    { 
      status: "Raw Material Sourced", 
      time: "Oct 12, 09:24 AM", 
      location: "Stock Yard A", 
      desc: "Premium 300GSM Food Grade board sourced and verified.",
      icon: <Layers className="size-6" />,
      completed: true,
      verifiedBy: "Zakir H. (Quality Inspector)",
      unit: "Material Dept."
    },
    { 
      status: "Design & CTP", 
      time: "Oct 12, 02:15 PM", 
      location: "Pre-Press Unit", 
      desc: "Digital proof approved. Aluminum plates generated for printing.",
      icon: <Cpu className="size-6" />,
      completed: true,
      verifiedBy: "Rumana A. (Lead Designer)",
      unit: "Pre-Press Hub"
    },
    { 
      status: "Printing Phase", 
      time: "Oct 13, 10:00 AM", 
      location: "Heidelberg Unit 4", 
      desc: "4-Color process with aqueous coating applied.",
      icon: <Activity className="size-6" />,
      completed: true,
      verifiedBy: "Majedur R. (Master Printer)",
      unit: "Offset Unit"
    },
    { 
      status: "Die-Cutting & Finishing", 
      time: "Oct 14, 11:30 AM", 
      location: "Finishing Floor", 
      desc: "Precision die-cutting and automated folding completed.",
      icon: <Factory className="size-6" />,
      completed: true,
      verifiedBy: "Kamrul I. (Finishing Lead)",
      unit: "Post-Press Unit"
    },
    { 
      status: "AI Quality Control", 
      time: "Oct 14, 04:45 PM", 
      location: "QC Lab", 
      desc: "100% automated visual inspection. Zero defects detected.",
      icon: <ShieldCheck className="size-6" />,
      completed: true,
      verifiedBy: "AI Vision System v4.2",
      unit: "Lab-Alpha"
    },
    { 
      status: "Packaging & Labelling", 
      time: "Oct 15, 09:00 AM", 
      location: "Dispatch Hub", 
      desc: "Bulk packed in eco-friendly corrugated boxes.",
      icon: <Package className="size-6" />,
      completed: true,
      verifiedBy: "Saiful K. (Logistics Officer)",
      unit: "Dispatch"
    },
    { 
      status: "In Transit", 
      time: "Oct 15, 01:20 PM", 
      location: "En-Route", 
      desc: "Handed over to logistics partner for delivery.",
      icon: <Truck className="size-6" />,
      completed: false,
      verifiedBy: "System (Auto)",
      unit: "Third-Party"
    }
  ];

  const handleShare = (platform: string) => {
    const text = "Checking out the manufacturing journey of my Paperware products! #Traceability #EcoFriendly #Paperware";
    const url = window.location.href;
    
    switch(platform) {
      case 'fb': window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'noopener,noreferrer'); break;
      case 'li': window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer'); break;
      case 'insta': alert("Ready for Story! Capture and tag @PaperwareFactory"); break;
    }
  };

  const headRef = React.useRef<HTMLDivElement>(null);
  const timelineRef = React.useRef<HTMLDivElement>(null);

  // Scroll-scrubbed: header drifts up and fades; timeline cards slide in one after another.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;
    const head = headRef.current;
    if (head) {
      const p = clamp01(window.scrollY / (h * 0.6));
      head.style.transform = `translate3d(0,${(p * 60).toFixed(1)}px,0)`;
      head.style.opacity = (1 - 0.6 * p).toFixed(3);
    }
    const tl = timelineRef.current;
    if (tl) {
      tl.querySelectorAll<HTMLElement>("[data-journey]").forEach((el) => {
        const r = el.getBoundingClientRect();
        const u = easeOut3(clamp01((h - r.top) / (h * 0.5)));
        el.style.transform = `translate3d(${((1 - u) * 40).toFixed(1)}px,0,0)`;
        el.style.opacity = (0.15 + 0.85 * u).toFixed(3);
      });
    }
  });

  return (
    <div className="bg-[#fdfaf3] min-h-screen pt-32 pb-20 font-['Poppins',sans-serif] overflow-x-clip">
      <section className="container mx-auto px-4 [content-visibility:visible]">
        {/* Header Section */}
        <div ref={headRef} className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16 will-change-transform">
          <div className="space-y-6">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
            >
              <ArrowLeft className="size-4" /> {t("product_journey_back_to_tracking")}
            </button>
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 mb-2">
                <Shield className="size-3" />
                <span className="text-[9px] font-black uppercase tracking-widest">{t("product_journey_authenticated_batch")}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-[rgb(0,0,0)]">{t("catalog_3d_product")} <br /><span className="text-[#fabf37]">{t("product_journey_traceability")}</span></h1>
              <div className="flex flex-wrap items-center gap-4">
                <p className="text-zinc-500 font-bold text-lg">{t("product_journey_batch_id_pw_88291_exp")}</p>
                <div className="h-4 w-px bg-zinc-200 hidden md:block" />
                <p className="text-zinc-400 font-bold text-sm">{t("product_journey_manufacturing_unit_unit_4_dhaka")}</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2 bg-white p-2 rounded-full border border-black/5 shadow-sm">
              <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 ml-4 mr-2">{t("product_journey_share_journey")}</span>
              <button onClick={() => handleShare('fb')} className="size-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"><Facebook className="size-4" /></button>
              <button onClick={() => handleShare('insta')} className="size-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"><Instagram className="size-4" /></button>
              <button onClick={() => handleShare('li')} className="size-10 rounded-full bg-zinc-900 text-white flex items-center justify-center hover:bg-[#fabf37] hover:text-black transition-all"><Linkedin className="size-4" /></button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success('Link copied'); }} className="size-10 rounded-full bg-[#fabf37] text-black flex items-center justify-center hover:scale-110 transition-all"><Share2 className="size-4" /></button>
            </div>
            <button onClick={() => go("contact")} className="bg-black text-[#fabf37] px-8 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-xl">
              <Download className="size-4" /> {t("product_journey_request_report")}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          {/* Product Overview Card & Advanced Analytics */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-black rounded-[40px] p-10 text-white space-y-8 sticky top-32">
              <div className="size-20 bg-[#fabf37] rounded-3xl flex items-center justify-center text-black">
                <Package className="size-10" />
              </div>
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">{t("product_journey_premium_paper_cup")}</h2>
                <p className="text-zinc-500 font-bold italic">{t("product_journey_crafted_with_100_biodegradable_cellulose")}</p>
              </div>

              {/* Manufacturer Spotlight */}
              <div className="p-6 bg-zinc-900 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="size-12 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10">
                    <User className="size-6 text-[#fabf37]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{t("product_journey_master_printer")}</p>
                    <p className="font-black text-white">{t("product_journey_majedur_rahman")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-emerald-500">
                  <Award className="size-3" /> {t("product_journey_15_years_of_experience")}
                </div>
              </div>

              <div className="space-y-4 pt-8 border-t border-white/10">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 uppercase font-black tracking-widest">{t("product_journey_production_unit")}</span>
                  <span className="font-black">{t("product_journey_heidelberg_offset_hub")}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 uppercase font-black tracking-widest">{t("product_journey_qc_lead")}</span>
                  <span className="font-black">{t("product_journey_rumana_ahmed")}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-500 uppercase font-black tracking-widest">{t("product_journey_shift")}</span>
                  <span className="font-black">{t("product_journey_morning_06_00_14_00")}</span>
                </div>
              </div>

              {/* Sustainability Score Card */}
              <div className="bg-[#fabf37] p-8 rounded-[35px] text-black space-y-6">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60">{t("product_journey_sustainability_score")}</p>
                      <p className="font-black text-3xl">9.4/10</p>
                    </div>
                    <Leaf className="size-8" />
                 </div>
                 <div className="space-y-3">
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-widest">
                       <span>{t("product_journey_carbon_footprint")}</span>
                       <span>{t("product_journey_low_impact")}</span>
                    </div>
                    <div className="h-1.5 bg-black/10 rounded-full overflow-hidden">
                       <div className="h-full bg-black rounded-full w-[94%]" />
                    </div>
                 </div>
              </div>

              {/* Batch Certificate Placeholder */}
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-3xl flex items-center gap-4 text-emerald-500">
                <ShieldCheck className="size-8" />
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest">{t("product_journey_compliance_status")}</p>
                  <p className="font-black text-sm">{t("product_journey_iso_9001_2015_verified")}</p>
                </div>
              </div>

              {/* NEW: Machine Health Matrix */}
              <div className="p-8 bg-zinc-900 rounded-[35px] border border-white/5 space-y-6">
                 <div className="flex items-center gap-2">
                    <Settings className="size-4 text-[#fabf37] animate-spin-slow" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{t("product_journey_machine_health_matrix")}</p>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">{t("product_journey_temperature")}</p>
                       <p className="text-lg font-black text-white">42.5°C</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">{t("product_journey_speed_rpm")}</p>
                       <p className="text-lg font-black text-white">1,240</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">{t("product_journey_pressure")}</p>
                       <p className="text-lg font-black text-white">{t("product_journey_8_2_bar")}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                       <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-1">{t("product_journey_vibration")}</p>
                       <p className="text-lg font-black text-emerald-400">{t("product_journey_nominal")}</p>
                    </div>
                 </div>
              </div>

              {/* NEW: Batch Consistency Graph */}
              <div className="bg-black rounded-[40px] p-10 text-white space-y-8">
                 <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#fabf37]">{t("product_journey_quality_analytics")}</p>
                      <h3 className="text-xl font-black uppercase tracking-tight">{t("product_journey_batch_consistency")}</h3>
                    </div>
                    <TrendingUp className="size-6 text-emerald-500" />
                 </div>
                 <div className="h-48 w-full">
                    {/* Inline SVG area chart (no recharts: keeps this lazy chunk ~400 kB lighter). */}
                    <ConsistencySparkline data={chartData} />
                 </div>
                 <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 p-4 rounded-2xl">
                    <Info className="size-3" /> {t("product_journey_illustrative_trend_not_live_production")}
                 </div>
              </div>
            </div>

            {/* NEW: Materials Provenance Card */}
            <div className="bg-white rounded-[40px] p-10 border border-black/5 space-y-8">
               <div className="flex items-center gap-3">
                  <div className="size-12 rounded-2xl bg-zinc-50 flex items-center justify-center">
                    <Globe className="size-6 text-black" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tight">{t("product_journey_materials_provenance")}</h3>
               </div>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="size-2 bg-[#fabf37] rounded-full mt-2" />
                     <div className="flex-1 border-b border-zinc-50 pb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{t("product_journey_raw_pulp_source")}</p>
                        <p className="font-bold text-sm">{t("product_journey_fsc_certified_scandinavian_forests")}</p>
                        <p className="text-[10px] text-zinc-400 font-medium">{t("product_journey_batch_fs_2210_91")}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="size-2 bg-black rounded-full mt-2" />
                     <div className="flex-1 border-b border-zinc-50 pb-4">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{t("product_journey_eco_inks")}</p>
                        <p className="font-bold text-sm">{t("product_journey_soy_based_pigments_german_tech")}</p>
                        <p className="text-[10px] text-zinc-400 font-medium">{t("product_journey_non_toxic_food_grade")}</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-4">
                     <div className="size-2 bg-emerald-500 rounded-full mt-2" />
                     <div className="flex-1">
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{t("product_journey_adhesive")}</p>
                        <p className="font-bold text-sm">{t("product_journey_water_soluble_corn_starch")}</p>
                        <p className="text-[10px] text-zinc-400 font-medium">{t("product_journey_100_biodegradable")}</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Timeline & Worker Log */}
          <div className="lg:col-span-8 space-y-12">
            {/* Real footage: printing -> laminating -> drying (public/media/SOURCES.txt). */}
            <div className="bg-white p-4 md:p-6 rounded-[40px] border border-black/5 grid grid-cols-1 md:grid-cols-[minmax(0,260px)_1fr] gap-6 items-center">
              <FactoryClip
                src={JOURNEY_VIDEO}
                poster={posterJourney}
                label={t("product_journey_printing_and_laminating_line")}
                className="aspect-[9/16] md:aspect-auto md:h-[420px] rounded-[32px]"
                controlPosition="top-right"
              />
              <div className="space-y-4 px-2 md:px-4">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#fabf37]">{t("product_journey_from_the_line")}</p>
                <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight">{t("product_journey_printed_laminated_dried")}</h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                  {t("product_journey_sheets_leave_the_offset_press")}
                </p>
              </div>
            </div>
            {/* Stats Overview */}
            <div className="mb-12 bg-white p-8 rounded-[40px] border border-black/5 flex flex-wrap items-center gap-8 md:gap-16">
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("product_journey_production_time")}</p>
                  <p className="text-xl font-black">{t("product_journey_72_4_hours")}</p>
               </div>
               <div className="h-8 w-px bg-zinc-100 hidden md:block" />
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("product_journey_qc_pass_rate")}</p>
                  <p className="text-xl font-black text-emerald-600">99.98%</p>
               </div>
               <div className="h-8 w-px bg-zinc-100 hidden md:block" />
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("product_journey_factory_load")}</p>
                  <p className="text-xl font-black text-[#fabf37]">{t("product_journey_optimal")}</p>
               </div>
               <div className="h-8 w-px bg-zinc-100 hidden md:block" />
               <div className="space-y-1 text-center md:text-left">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t("product_journey_global_ranking")}</p>
                  <div className="flex items-center gap-2">
                    <ChartBar className="size-4" />
                    <p className="text-xl font-black">{t("product_journey_top_1")}</p>
                  </div>
               </div>
            </div>

            <div ref={timelineRef} className="space-y-12 pl-4 md:pl-12 border-l-2 border-zinc-100 relative">
              {journey.map((item, i) => (
                <div 
                  key={i}
                  data-journey
                  className="relative will-change-transform"
                >
                  {/* Timeline Dot */}
                  <div className={`absolute -left-[54px] md:-left-[70px] top-0 size-10 md:size-14 rounded-2xl flex items-center justify-center border-4 border-white shadow-lg transition-all ${item.completed ? 'bg-black text-[#fabf37]' : 'bg-zinc-100 text-zinc-400'}`}>
                    {item.icon}
                  </div>

                  <div className={`p-8 md:p-10 rounded-[40px] border transition-all ${item.completed ? 'bg-white border-black/5 hover:border-[#fabf37] hover:shadow-xl' : 'bg-white border-dashed border-zinc-200 opacity-60'}`}>
                    <div className="space-y-6">
                      {/* Title with Sparkle */}
                      <div className="flex items-center gap-2">
                        <h4 className={`text-2xl md:text-3xl font-black uppercase tracking-tight ${item.completed ? 'text-black' : 'text-zinc-400'}`}>
                          {t(item.status)}
                        </h4>
                        {item.completed && <Sparkles className="size-5 text-[#fabf37]" />}
                      </div>

                      {/* Time and Location */}
                      <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-zinc-400">
                        <span className="flex items-center gap-2"><Calendar className="size-4 text-zinc-300" /> {t(item.time)}</span>
                        <span className="flex items-center gap-2 text-black"><MapPin className="size-4" /> {t(item.location)}</span>
                      </div>

                      {/* Verified By */}
                      <div className="flex items-center gap-2 text-emerald-600 text-sm font-black uppercase">
                        <User className="size-4" /> {t(item.verifiedBy)}
                      </div>

                      {/* Unit Badge */}
                      {item.completed && (
                        <div className="inline-flex items-center gap-2 px-6 py-3 bg-black text-[#fabf37] rounded-full text-xs font-black uppercase tracking-widest">
                          <ShieldCheck className="size-4" /> {t(item.unit)}
                        </div>
                      )}

                      {/* Description */}
                      <p className="text-zinc-500 font-bold text-base leading-relaxed">
                        {t(item.desc)}
                      </p>

                      {/* Footer Actions */}
                      {item.completed && (
                        <div className="pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                            <Activity className="size-4" /> {t("product_journey_real_time_node_logs_verified")}
                          </div>
                          <button onClick={() => go("factory-live")} className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-black transition-colors flex items-center gap-2">
                            {t("product_journey_view_machine_data")} <ChevronRight className="size-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FACTORY PULSE - MOVED TO MIDDLE (FULL WIDTH SECTION) */}
        <div className="mt-32 pt-20 border-t border-zinc-100">
           <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
              <div className="space-y-4">
                <p className="text-[12px] font-black uppercase tracking-[0.2em] text-[#fabf37]">{t("product_journey_digital_factory_hub")}</p>
                <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">{t("business_factory")} <span className="text-zinc-300">{t("our_erp_pulse")}</span></h2>
              </div>
              <div className="flex gap-4">
                 <button onClick={() => document.getElementById('factory-pulse-scroller')?.scrollBy({ left: -520, behavior: 'smooth' })} className="size-16 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm group">
                    <ChevronLeft className="size-6 group-hover:scale-110 transition-transform" />
                 </button>
                 <button onClick={() => document.getElementById('factory-pulse-scroller')?.scrollBy({ left: 520, behavior: 'smooth' })} className="size-16 rounded-full bg-white border border-black/5 flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm group">
                    <ChevronRight className="size-6 group-hover:scale-110 transition-transform" />
                 </button>
              </div>
           </div>

           <div id="factory-pulse-scroller" className="flex gap-8 overflow-x-auto pb-12 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
              {factoryPosts.map((post) => (
                <motion.div 
                  key={post.id}
                  whileHover={{ y: -15 }}
                  className="min-w-[340px] md:min-w-[500px] bg-white rounded-[60px] border border-black/5 overflow-hidden snap-start group shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                   <div className="relative h-72 overflow-hidden">
                      <ImageWithFallback 
                        src={post.image} 
                        alt={t(post.title)}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-110"
                      />
                      <div className="absolute top-8 left-8 flex gap-3">
                        <div className="px-5 py-2.5 bg-black text-[#fabf37] rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                           {t(post.category)}
                        </div>
                        <div className="size-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-black">
                           {post.platform}
                        </div>
                      </div>
                   </div>
                   <div className="p-12 space-y-6">
                      <p className="text-[11px] font-black uppercase tracking-widest text-zinc-400">{t(post.date)} • {t(post.platformName)}</p>
                      <h3 className="text-3xl font-black uppercase tracking-tight leading-tight group-hover:text-black transition-colors">{t(post.title)}</h3>
                      <div className="flex items-center justify-between pt-6 border-t border-zinc-50">
                         <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                               {[1,2,3].map(i => (
                                  <div key={i} className="size-8 rounded-full bg-zinc-100 border-2 border-white flex items-center justify-center overflow-hidden">
                                     <User className="size-4 text-zinc-400" />
                                  </div>
                               ))}
                            </div>
                            <p className="text-[11px] font-black text-zinc-400">{t(post.likes)} {t("product_journey_engagements")}</p>
                         </div>
                         <button onClick={() => go("socials")} className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:gap-4 transition-all group/btn">
                            {t("product_journey_read_post")} <ChevronRight className="size-4 text-[#fabf37]" />
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* TRUST IN EVERY FIBER - MOVED TO MIDDLE & STYLED AS PER IMAGE - Removed as per user request */}
        {/* <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 md:p-32 bg-[#fabf37] rounded-[80px] text-black text-center space-y-10 relative overflow-hidden group"
        >
           <div className="absolute top-0 right-0 p-12 opacity-5 group-hover:rotate-12 transition-transform duration-1000">
              <Shield className="size-96" />
           </div>

           <div className="relative z-10 space-y-8">
             <h3 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85]">Trust in every <br />Fiber.</h3>
             <p className="text-lg md:text-xl font-bold opacity-70 max-w-2xl mx-auto leading-relaxed">
                This batch was manufactured following the highest global sustainability and ethical standards. 
                Every fiber tells a story of integrity and responsibility.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
               <button 
                 onClick={() => handleShare('li')}
                 className="w-full sm:w-auto bg-black text-[#fabf37] px-12 py-7 rounded-full font-black uppercase tracking-widest text-[12px] hover:scale-105 transition-all flex items-center justify-center gap-4 shadow-2xl"
               >
                 <Share2 className="size-5" /> Share This Integrity Report
               </button>
               <button onClick={() => go("compliance")} className="w-full sm:w-auto bg-white/20 backdrop-blur-md border border-black/5 text-black px-12 py-7 rounded-full font-black uppercase tracking-widest text-[12px] hover:bg-white transition-all flex items-center justify-center gap-4">
                 <Download className="size-5" /> Compliance Details
               </button>
             </div>
           </div>
        </motion.div> */}
      </section>
    </div>
  );
}
/** Lightweight area chart for the batch-consistency panel: polyline + gradient fill, x labels, no chart library. */
function ConsistencySparkline({ data }: { data: Array<{ time: string; consistency: number }> }) {
  const { t } = useLanguage();
  const W = 600, H = 192, padX = 8, padTop = 12, padBottom = 24;
  const ys = data.map((d) => d.consistency);
  const min = Math.min(...ys) - 0.5, max = Math.max(...ys) + 0.5;
  const px = (i: number) => padX + (i / Math.max(1, data.length - 1)) * (W - padX * 2);
  const py = (v: number) => padTop + (1 - (v - min) / (max - min)) * (H - padTop - padBottom);
  const pts = data.map((d, i) => `${px(i).toFixed(1)},${py(d.consistency).toFixed(1)}`);
  const line = pts.join(" ");
  const area = `${pts.join(" ")} ${px(data.length - 1).toFixed(1)},${H - padBottom} ${px(0).toFixed(1)},${H - padBottom}`;
  const title = `Batch consistency, ${data[0]?.time} to ${data[data.length - 1]?.time}: ${ys.map((y) => `${y}%`).join(", ")}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="size-full" role="img" aria-label={t(title)} preserveAspectRatio="none">
      <defs>
        <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#fabf37" stopOpacity={0.3} />
          <stop offset="95%" stopColor="#fabf37" stopOpacity={0} />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((f) => (
        <line key={f} x1={padX} x2={W - padX} y1={padTop + f * (H - padTop - padBottom)} y2={padTop + f * (H - padTop - padBottom)} stroke="#ffffff10" strokeDasharray="3 3" />
      ))}
      <polygon points={area} fill="url(#colorCons)" />
      <polyline points={line} fill="none" stroke="#fabf37" strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      {data.map((d, i) => (
        <text key={d.time} x={px(i)} y={H - 6} fill="#ffffff50" fontSize={10} textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}>{d.time}</text>
      ))}
    </svg>
  );
}
