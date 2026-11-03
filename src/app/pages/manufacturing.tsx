import React from "react";
import { motion } from "motion/react";
import { Factory, Zap, ShieldCheck, Activity, Cpu, Wind, Gauge, ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, clamp01, easeOut3 } from "../lib/useScrollScrub";
import imgFloorWide from "../../assets/factory/floor-wide.webp";
import { useGo } from "../lib/useGo";
import { FactoryClip, mediaUrl } from "../components/paperware/factory-clip";
import posterPress from "../../assets/video-posters/manufacturing-press.webp";
import posterFloor from "../../assets/video-posters/factory-floor-wide.jpg";
import posterForming from "../../assets/video-posters/cup-forming-closeups.jpg";
import { useLanguage } from "../context/LanguageContext";

const PRESS_VIDEO = mediaUrl("manufacturing-press.mp4");

export function ManufacturingPage() {
  const { t } = useLanguage();
  const go = useGo();
  const metrics = [
    { label: "Production Capacity", value: "2M+", unit: "PCS/DAY", icon: <Factory className="size-5" /> },
    { label: "Automation Level", value: "94%", unit: "INTEGRATED", icon: <Cpu className="size-5" /> },
    { label: "Energy Efficiency", value: "A++", unit: "CERTIFIED", icon: <Zap className="size-5" /> },
    { label: "Compliance Rate", value: "100%", unit: "EU/GLOBAL", icon: <ShieldCheck className="size-5" /> },
  ];

  const processes = [
    {
      title: "Material Sourcing",
      desc: "Responsibly sourced paper fibres.",
      icon: <Wind className="size-8" />,
    },
    {
      title: "Precision Forming",
      desc: "High-speed German forming technology with ultrasonic sealing for leak-proof durability.",
      icon: <Gauge className="size-8" />,
    },
    {
      title: "Smart Monitoring",
      desc: "Quality checks for structural integrity.",
      icon: <Activity className="size-8" />,
    }
  ];

  const heroRef = React.useRef<HTMLElement>(null);
  const heroBgRef = React.useRef<HTMLDivElement>(null);
  const heroTextRef = React.useRef<HTMLDivElement>(null);
  const flowRef = React.useRef<HTMLDivElement>(null);
  const flowImgRef = React.useRef<HTMLDivElement>(null);

  // Scroll-scrubbed motion: hero zoom-out/fade, process rows rise in, machine photo parallax.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;
    const hero = heroRef.current;
    if (hero) {
      const r = hero.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, r.height * 0.85));
      const bg = heroBgRef.current;
      if (bg) {
        bg.style.transform = `scale(${(1.1 - 0.1 * easeOut3(p)).toFixed(4)}) translate3d(0,${(p * 60).toFixed(1)}px,0)`;
        bg.style.opacity = (0.6 - 0.45 * p).toFixed(3);
      }
      const txt = heroTextRef.current;
      if (txt) {
        txt.style.transform = `translate3d(0,${(p * 120).toFixed(1)}px,0)`;
        txt.style.opacity = (1 - clamp01(p / 0.7)).toFixed(3);
      }
    }
    const flow = flowRef.current;
    if (flow) {
      const r = flow.getBoundingClientRect();
      const tp = clamp01((h - r.top) / (h * 0.7));
      flow.querySelectorAll<HTMLElement>("[data-process-row]").forEach((el, i) => {
        const u = easeOut3((tp - i * 0.14) / 0.6);
        el.style.transform = `translate3d(${((1 - u) * -40).toFixed(1)}px,0,0)`;
        el.style.opacity = (0.1 + 0.9 * u).toFixed(3);
      });
    }
    const img = flowImgRef.current;
    if (img) {
      const r = img.getBoundingClientRect();
      const rel = (r.top + r.height / 2 - h / 2) / h; // -0.5..0.5 while in view
      img.style.transform = `translate3d(0,${(rel * 70).toFixed(1)}px,0) scale(1.1)`;
    }
  });

  return (
    <div className="relative bg-white min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[80vh] flex items-center overflow-hidden bg-black text-white [content-visibility:visible]">
        <div className="absolute inset-0 z-0">
          <div ref={heroBgRef} className="w-full h-full will-change-transform" style={{ opacity: 0.6, transform: "scale(1.1)" }}>
            <ImageWithFallback
              src={imgFloorWide}
              alt={t("about_us_paperware_production_floor")}
              loading="eager"
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div ref={heroTextRef} className="will-change-transform">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl space-y-8"
          >
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 bg-[#fabf37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">{t("manufacturing_our_factory")}</span>
            </div>

            <h1 className="text-6xl md:text-[120px] font-black text-white leading-[0.9] tracking-tighter uppercase">
              {t("manufacturing_industrial")} <br />
              <span className="text-[#fabf37]">{t("manufacturing_excellence")}</span>
            </h1>

            <p className="max-w-2xl text-zinc-400 font-bold uppercase tracking-widest text-xs leading-relaxed">
              {t("manufacturing_merging_sustainable_paper_technology_wit")}
            </p>

            <div className="flex flex-wrap gap-4 pt-8">
              <button onClick={() => go("factory-live")} className="bg-[#fabf37] text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-white transition-colors group">
                {t("manufacturing_factory_tour")} <ArrowUpRight className="size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
              <button onClick={() => go("compliance")} className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-white/10 transition-colors">
                {t("manufacturing_compliance_data")}
              </button>
            </div>
          </motion.div>
          </div>
        </div>

      </section>


      {/* Industrial Flow */}
      <section className="py-32 bg-zinc-50 text-zinc-900 relative overflow-hidden">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#fabf37] bg-black px-4 py-2 rounded-lg">{t("manufacturing_workflow_engine")}</span>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  {t("manufacturing_the_art_of")} <br />
                  <span className="text-zinc-500">{t("manufacturing_scalable")}</span> <br />
                  {t("manufacturing_production")}
                </h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[11px] leading-relaxed max-w-xl">
                  {t("manufacturing_our_manufacturing_process_is_designed")}
                </p>
              </div>

              <div ref={flowRef} className="space-y-8">
                {processes.map((p, i) => (
                  <motion.div
                    key={i}
                    data-process-row
                    whileHover={{ x: 10 }}
                    className="flex gap-8 group cursor-pointer will-change-transform"
                  >
                    <div className="size-16 rounded-3xl bg-white border border-black/5 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#fabf37] transition-all duration-500 shadow-sm">
                      {p.icon}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-lg font-black uppercase tracking-tight">{t(p.title)}</h4>
                      <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed max-w-sm">
                        {t(p.desc)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border-[12px] border-white shadow-2xl relative">
                <div ref={flowImgRef} className="w-full h-full will-change-transform" style={{ transform: "scale(1.1)" }}>
                  {/* Real footage from the printing unit (public/media/SOURCES.txt). */}
                  <FactoryClip
                    src={PRESS_VIDEO}
                    poster={posterPress}
                    label={t("manufacturing_printing_unit")}
                    className="w-full h-full"
                    controlPosition="bottom-right"
                  >
                    <div className="absolute bottom-4 left-4 z-10 bg-black/80 text-white rounded-2xl px-4 py-2">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/60">{t("manufacturing_printing_unit_2")}</span>
                      <p className="text-xs font-black uppercase tracking-tight">{t("manufacturing_offset_press_paperware_factory")}</p>
                    </div>
                  </FactoryClip>
                </div>

              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-12 -left-12 size-48 bg-[#fabf37] rounded-[40px] -z-10 opacity-20 blur-2xl" />
              <div className="absolute -bottom-24 -right-12 size-64 bg-black rounded-[40px] -z-10 opacity-5" />
            </div>
          </div>
        </div>
      </section>

      {/* Real footage from the Dhaka factory (public/media/SOURCES.txt). */}
      <section className="py-24 bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 grid gap-6 md:grid-cols-2">
          <FactoryClip src={mediaUrl("factory-floor-wide.mp4")} poster={posterFloor} graded label={t("manufacturing_floor_video")} className="aspect-video rounded-3xl" />
          <FactoryClip src={mediaUrl("cup-forming-closeups.mp4")} poster={posterForming} graded label={t("manufacturing_forming_video")} className="aspect-video rounded-3xl" />
        </div>
      </section>

    </div>
  );
}
