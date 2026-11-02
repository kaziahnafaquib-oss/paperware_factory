import React from "react";
import { Play, Pause, ShieldCheck, Zap, Leaf, Globe, Factory, Cpu, ArrowRight, Box } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { MediaPlayer } from "../components/paperware/media-player";
import { mediaUrl } from "../components/paperware/factory-clip";
import { useReducedMotionPreference } from "../lib/reducedMotion";
import posterFloor from "@/assets/video-posters/about-floor.webp";
import { OurJourney } from "@/app/components/paperware/our-journey";
import { useScrollScrub, clamp01, smooth, easeOut3 } from "../lib/useScrollScrub";

// Real Paperware factory photos (approved brand-memory library, see src/assets/factory/SOURCES.txt).
import fFloorCupMachines from "../../assets/factory/floor-cup-machines.webp";
import fCupFormingMachines from "../../assets/factory/cup-forming-machines.webp";
import fQcTechnician from "../../assets/factory/qc-technician.webp";
import fQcWeighing from "../../assets/factory/qc-weighing.webp";
import fQcLeakTest from "../../assets/factory/qc-leak-test.webp";
import fQcCupInspection from "../../assets/factory/qc-cup-inspection.webp";
import fFormingCloseup from "../../assets/factory/forming-closeup.webp";
import fCupsStacking from "../../assets/factory/cups-stacking.webp";
import fPressOperator from "../../assets/factory/press-operator.webp";
import fOffsetPress from "../../assets/factory/offset-press.webp";
import fTeam from "../../assets/factory/team.webp";
import fOperatorInspecting from "../../assets/factory/operator-inspecting.webp";
import fOperatorsCupMachines from "../../assets/factory/operators-cup-machines.webp";
import fOperatorFormingLine from "../../assets/factory/operator-forming-line.webp";
import mDieCutting from "../../assets/machinery/die-cutting.webp"; // owner brochure, src/assets/machinery/SOURCES.txt
import { useGo } from "../lib/useGo";

const imgInnovation = fOperatorFormingLine;

const FACTORY_FLOOR = [
  { src: fFloorCupMachines, alt: "Production floor with cup machines" },
  { src: fCupFormingMachines, alt: "Cup forming machines" },
  { src: fPressOperator, alt: "Printing press operator" },
  { src: fOperatorInspecting, alt: "Operator inspecting a cup" },
  { src: fOperatorsCupMachines, alt: "Operators at the cup machines" },
  { src: fQcWeighing, alt: "Quality control weighing and inspection" },
  { src: fQcLeakTest, alt: "Quality control hot-water leak test" },
  { src: fTeam, alt: "Paperware factory team" },
];

const MANDATE = [
  { icon: ShieldCheck, title: "Uncompromising Hygiene", desc: "Every cup is produced in a sanitized, medical-grade environment.", photo: fQcTechnician, photoAlt: "Quality control technician testing cups" },
  { icon: Zap, title: "Precision", desc: "Automated quality checks on every production run.", photo: fQcCupInspection, photoAlt: "Quality control cup inspection" },
  { icon: Leaf, title: "Biodegradable", desc: "Paper-based packaging and eco-friendly inks.", photo: fCupsStacking, photoAlt: "Formed paper cups stacking" },
  { icon: Globe, title: "Global Logistics", desc: "From Dhaka to the world.", photo: fTeam, photoAlt: "Paperware factory team" }
];

interface AboutPageProps {
  aboutUsVideos?: {
    heroBackground?: string;
    heroBackgroundType?: 'image' | 'video' | 'youtube';
    smartManufacturing?: string;
    smartManufacturingType?: 'image' | 'video' | 'youtube';
    galleryVideos?: Array<{
      url: string;
      type: 'image' | 'video' | 'youtube';
      alt: string;
    }>;
  };
}

/** "140K" -> { num: 140, suffix: "K" } so the number can count up while the suffix stays put. */
function splitStat(val: string): { num: number; suffix: string } {
  const m = /^([\d.]+)(.*)$/.exec(val);
  return m ? { num: parseFloat(m[1]), suffix: m[2] } : { num: 0, suffix: val };
}

export function AboutPage({ aboutUsVideos = {} }: AboutPageProps) {
  const go = useGo();
  const { t } = useLanguage();

  const heroRef = React.useRef<HTMLElement>(null);
  const heroBgRef = React.useRef<HTMLDivElement>(null);
  const heroVideoRef = React.useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotionPreference();
  // Hero background clip: paused under reduced motion, otherwise an ambient loop with its own Pause control (WCAG 2.2.2).
  // Autoplays muted for everyone (also under reduced motion): the owner wants the floor footage live.
  const [heroPaused, setHeroPaused] = React.useState(false);
  const toggleHeroVideo = () => {
    const v = heroVideoRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); setHeroPaused(false); } else { v.pause(); setHeroPaused(true); }
  };
  const heroHeadRef = React.useRef<HTMLHeadingElement>(null);
  const mandateGridRef = React.useRef<HTMLDivElement>(null);
  const statsGridRef = React.useRef<HTMLDivElement>(null);
  const floorRef = React.useRef<HTMLElement>(null);
  const floorTrackRef = React.useRef<HTMLDivElement>(null);
  const smartImgRef = React.useRef<HTMLDivElement>(null);
  const smartTextRef = React.useRef<HTMLParagraphElement>(null);

  const stats = React.useMemo(
    () => [
      {
        val: "140K",
        unit: "PCS/DAY",
        label: "PRINTING UNIT",
        icon: Factory,
        photo: fOffsetPress,
        photoAlt: "Offset printing press",
        /* Owner (2 Nov 2026): real press footage (public/media/SOURCES.txt). */
        video: mediaUrl("manufacturing-press.mp4"),
        machineName: "HEIDELBERG MO-V-P",
        detail: "HIGH-PRECISION 4-COLOR OFFSET PRINTING FOR PREMIUM BRANDING.",
        specs: [
          "HEIDELBERG MO-V-P (19x25.5\")",
          "ORIGINAL HEIDELBERG (25.25x36\")",
          "DOUBLE DEMY PLATE TECHNOLOGY"
        ]
      },
      {
        val: "350K",
        unit: "PCS/DAY",
        label: "FORMING UNIT",
        icon: Box,
        photo: fFormingCloseup,
        photoAlt: "Cup forming machine close-up",
        machineName: "ULTRASONIC FORMER",
        detail: "AUTOMATED ULTRASONIC FORMING ENSURING LEAK-PROOF PRECISION.",
        specs: ["MEDICAL GRADE HYGIENE", "AUTOMATED QUALITY CONTROL", "HIGH-SPEED PRODUCTION"]
      },
      {
        val: "12K",
        unit: "PCS/DAY",
        label: "CUTTING UNIT",
        icon: Cpu,
        photo: mDieCutting,
        photoAlt: "Die cutting machine",
        machineName: "DIE-CUT PRECISION",
        detail: "PRECISION DIE-CUTTING WITH MINIMAL WASTE & LASER ACCURACY.",
        specs: ["LASER GUIDED CALIBRATION", "ZERO-WASTE TRIMMING", "CUSTOM SHAPE SUPPORT"]
      },
      {
        val: "25K",
        unit: "PCS/DAY",
        label: "LAMINATION UNIT",
        icon: Zap,
        photo: fCupFormingMachines,
        photoAlt: "Lamination line",
        /* Owner (2 Nov 2026): real lamination-line footage (public/media/SOURCES.txt). */
        video: mediaUrl("lamination.mp4"),
        machineName: "THERMAL LAMINATOR",
        detail: "PE/PLA LAMINATION FOR SUPERIOR LIQUID & HEAT RESISTANCE.",
        specs: ["ECO-FRIENDLY PLA SUPPORT", "HEAT-SEAL OPTIMIZATION", "GLOSS & MATTE FINISH"]
      }
    ],
    []
  );

  const smartText = `${t('about_text_2')} At Paperware, we believe growth thrives on responsibility. Delivering safe, hygienic, and eco-friendly packaging you can trust.`;
  const smartSentences = React.useMemo(
    () => smartText.split(/(?<=[.!?।])\s+/).filter(Boolean),
    [smartText]
  );

  // All scroll-driven motion on this page. Every value is a pure function of the scroll
  // position (read via getBoundingClientRect), written straight to transform/opacity.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;

    // 1. Hero: lines drift up at different rates and fade; background settles 1.08 -> 1 and dims (0.35 -> 0.1).
    const hero = heroRef.current;
    if (hero) {
      const r = hero.getBoundingClientRect();
      const p = clamp01(-r.top / Math.max(1, r.height * 0.8));
      const bg = heroBgRef.current;
      if (bg) {
        const s = 1.08 - 0.08 * easeOut3(p);
        bg.style.transform = `scale(${s.toFixed(4)})`;
        // Owner (2 Nov 2026): footage stays at full strength; only fade once the hero scrolls away.
        bg.style.opacity = (1 - 0.6 * p).toFixed(3);
      }
      const lines = heroHeadRef.current?.querySelectorAll<HTMLElement>("[data-hero-line]");
      lines?.forEach((el, i) => {
        const y = -p * (90 + i * 70);
        const o = 1 - smooth((p - i * 0.06) / 0.6);
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0)`;
        el.style.opacity = o.toFixed(3);
      });
    }

    // 2. Core Mandate: cards rise and settle, staggered left to right.
    const mandate = mandateGridRef.current;
    if (mandate) {
      const r = mandate.getBoundingClientRect();
      const tp = clamp01((h - r.top) / (h * 0.75));
      const cards = mandate.querySelectorAll<HTMLElement>("[data-mandate-card]");
      const n = cards.length || 1;
      cards.forEach((el, i) => {
        const start = (i / n) * 0.45;
        const u = easeOut3((tp - start) / 0.55);
        el.style.transform = `translate3d(0,${((1 - u) * 96).toFixed(1)}px,0)`;
        el.style.opacity = (0.15 + 0.85 * u).toFixed(3);
      });
    }

    // 3. Scaling Excellence: numbers count up with scroll; cards fan in from slight offsets.
    const statsGrid = statsGridRef.current;
    if (statsGrid) {
      const r = statsGrid.getBoundingClientRect();
      const sp = clamp01((h - r.top) / (h * 0.8));
      const cards = statsGrid.querySelectorAll<HTMLElement>("[data-stat-card]");
      const n = cards.length || 1;
      cards.forEach((el, i) => {
        const u = easeOut3((sp - i * 0.08) / 0.7);
        const fan = (i - (n - 1) / 2) * 28 * (1 - u);
        el.style.transform = `translate3d(${fan.toFixed(1)}px,${((1 - u) * 56).toFixed(1)}px,0)`;
        el.style.opacity = (0.15 + 0.85 * u).toFixed(3);
        const num = el.querySelector<HTMLElement>("[data-count]");
        if (num) {
          const target = parseFloat(num.dataset.count || "0");
          const suffix = num.dataset.suffix || "";
          const shown = Math.round(target * easeOut3(sp / 0.9));
          const text = `${shown}${suffix}`;
          if (num.textContent !== text) num.textContent = text;
        }
      });
    }

    // 4. Factory Floor: horizontal strip scrubbed by scroll (0 as the section enters, 1 as it leaves).
    const floor = floorRef.current;
    const track = floorTrackRef.current;
    if (floor && track) {
      const r = floor.getBoundingClientRect();
      const p = clamp01((h - r.top) / (h + r.height));
      const max = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = `translate3d(${(-smooth(p) * max).toFixed(1)}px,0,0)`;
    }

    // 5. Smart Manufacturing: image parallax (+-30px), paragraph reveals sentence by sentence.
    const smartImg = smartImgRef.current;
    if (smartImg) {
      const r = smartImg.getBoundingClientRect();
      const rel = clamp01((r.top + r.height / 2) / h) - 0.5; // -0.5..0.5
      smartImg.style.transform = `translate3d(0,${(rel * 60).toFixed(1)}px,0) scale(1.08)`;
    }
    const smartTextEl = smartTextRef.current;
    if (smartTextEl) {
      const r = smartTextEl.getBoundingClientRect();
      const sp = clamp01((h * 0.9 - r.top) / (h * 0.55));
      const spans = smartTextEl.querySelectorAll<HTMLElement>("[data-sentence]");
      const n = spans.length || 1;
      spans.forEach((el, i) => {
        const start = (i / n) * 0.6;
        const u = smooth((sp - start) / 0.4);
        el.style.opacity = (0.25 + 0.75 * u).toFixed(3);
      });
    }
  });

  return (
    <div className="relative bg-white selection:bg-[#fabf37] selection:text-black">
      {/* 1. HERO SECTION - INDUSTRIAL MAXIMALISM */}
      <section ref={heroRef} className="relative min-h-[70vh] md:min-h-screen flex items-center pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {/* Owner (2 Nov 2026): no overlay of any kind on the hero footage. Text readability comes from the text shadows only. */}
          <div ref={heroBgRef} className="w-full h-full will-change-transform" style={{ opacity: 1, transform: "scale(1.08)" }}>
            {aboutUsVideos?.heroBackground ? (
              <MediaPlayer
                type={aboutUsVideos?.heroBackgroundType || "image"}
                src={aboutUsVideos.heroBackground}
                alt="Paperware production floor"
                className="w-full h-full"
                autoPlay={true}
                muted={true}
                loop={true}
              />
            ) : (
              /* Default: real floor footage of operators at the cup lines, cut from the owner's 4K brand film (public/media/SOURCES.txt), muted ambient loop. */
              <video
                ref={heroVideoRef}
                src={mediaUrl("about-floor.mp4")}
                poster={posterFloor}
                className="size-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                onPlay={() => setHeroPaused(false)}
                onPause={() => setHeroPaused(true)}
              />
            )}
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-20">
          <div className="max-w-5xl">
            <div className="flex items-center gap-2 mb-4 md:mb-8">
              <div className="size-1.5 md:size-2 rounded-full bg-[#fabf37] animate-pulse" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Established 2020 • Dhaka</span>
            </div>

            <h1
              ref={heroHeadRef}
              className="text-4xl md:text-7xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.85] mb-8 md:mb-12 text-white drop-shadow-[0_2px_28px_rgba(0,0,0,0.7)]"
            >
              <span data-hero-line className="block will-change-transform">The <span className="text-[#fabf37]">Engine</span></span>
              <span data-hero-line className="block will-change-transform">Behind the</span>
              <span data-hero-line className="block will-change-transform text-white/70">Package.</span>
            </h1>

            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
              <p className="text-base md:text-2xl font-bold text-white/90 leading-tight max-w-2xl uppercase italic drop-shadow-[0_1px_12px_rgba(0,0,0,0.5)]">
                {t('about_text_1')} We are not just manufacturers; we are supply chain architects.
              </p>
              <button type="button" tabIndex={-1} aria-hidden="true" className="shrink-0 size-16 md:size-24 rounded-full bg-black text-[#fabf37] flex items-center justify-center group hover:scale-110 transition-transform">
                <Play className="size-6 md:size-8 fill-current group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {!aboutUsVideos?.heroBackground && (
          <button
            type="button"
            onClick={toggleHeroVideo}
            aria-pressed={!heroPaused}
            aria-label={heroPaused ? "Play factory floor video" : "Pause factory floor video"}
            className="absolute bottom-4 right-4 md:bottom-6 md:right-6 z-20 size-11 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2"
          >
            {heroPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
          </button>
        )}
      </section>

      {/* 2. OUR PROMISE - THE CORE VALUES */}
      <section className="bg-black py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
            <div className="lg:col-span-4 space-y-4 md:space-y-8">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-[#fabf37] leading-none">
                Our <br className="hidden md:block" /> Core <br className="hidden md:block" /> Mandate.
              </h2>
              <p className="text-zinc-500 font-bold uppercase tracking-widest leading-relaxed text-xs md:text-sm">
                Sustainability is not an option; it is the default setting of our factory.
              </p>
            </div>

            <div ref={mandateGridRef} className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
              {MANDATE.map((value, i) => (
                <div
                  key={i}
                  data-mandate-card
                  className="p-6 md:p-10 bg-white/5 border border-white/10 rounded-[24px] md:rounded-[48px] space-y-4 md:space-y-6 group hover:bg-[#fabf37] hover:border-[#fabf37] transition-colors will-change-transform"
                >
                  <div className="aspect-video rounded-2xl md:rounded-3xl overflow-hidden bg-zinc-900">
                    <img
                      src={value.photo}
                      alt={value.photoAlt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="size-10 md:size-14 rounded-xl md:rounded-2xl bg-white/10 flex items-center justify-center text-[#fabf37] group-hover:bg-black group-hover:text-[#fabf37] transition-colors">
                    <value.icon className="size-5 md:size-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white group-hover:text-black">
                    {value.title}
                  </h3>
                  <p className="text-[11px] md:text-sm font-bold text-zinc-500 leading-relaxed group-hover:text-black/80 transition-colors">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCTION METRICS - THE NUMBERS */}
      <section className="py-16 md:py-32 bg-white overflow-x-clip">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-10 md:mb-24 space-y-2 md:space-y-4">
            <h2 className="text-3xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-none">
              Scaling <br /> <span className="text-zinc-500 italic">Excellence.</span>
            </h2>
          </div>

          <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const { num, suffix } = splitStat(stat.val);
              return (
              <div
                key={i}
                data-stat-card
                className={`bg-white rounded-[32px] p-6 md:p-8 flex flex-col border-2 transition-colors duration-300 will-change-transform ${i === 0 ? 'border-[#fabf37]' : 'border-zinc-200 hover:border-[#fabf37]'
                  }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-20 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                      {"video" in stat && stat.video ? (
                        <video
                          src={stat.video}
                          poster={stat.photo}
                          className="w-full h-full object-cover"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="none"
                          aria-label={stat.photoAlt}
                        />
                      ) : (
                        <img
                          src={stat.photo}
                          alt={stat.photoAlt}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className={`${i === 0 ? 'text-[#fabf37]' : 'text-zinc-400'}`}>
                      <stat.icon className="size-6" />
                    </div>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-400">
                    UNIT {i + 1}
                  </span>
                </div>

                {/* Value */}
                <div className="mb-6">
                  <div
                    data-count={num}
                    data-suffix={suffix}
                    className="text-6xl md:text-7xl font-black italic tracking-tighter leading-none text-black tabular-nums"
                  >
                    {stat.val}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 mt-2">
                    {stat.unit}
                  </div>
                </div>

                {/* Main Title */}
                <div className="mb-6">
                  <h3 className={`text-xl md:text-2xl font-black uppercase tracking-tight mb-2 leading-tight ${i === 0 ? 'text-[#fabf37]' : 'text-black'
                    }`}>
                    {stat.label}
                  </h3>
                  <p className="text-xs font-bold uppercase tracking-wide text-zinc-400">
                    {stat.machineName}
                  </p>
                </div>

                {/* Description */}
                <p className="text-[10px] font-bold text-black leading-relaxed uppercase tracking-wide mb-6">
                  {stat.detail}
                </p>

                {/* Specs List */}
                <div className="space-y-3 mt-auto">
                  {stat.specs.map((spec, si) => (
                    <div key={si} className="flex items-start gap-2">
                      <div className={`size-1.5 rounded-full mt-1.5 shrink-0 ${i === 0 ? 'bg-[#fabf37]' : 'bg-zinc-400'
                        }`} />
                      <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wide leading-relaxed">
                        {spec}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. VISUAL JOURNEY - THE GALLERY */}
      <section ref={floorRef} className="py-16 md:py-32 bg-zinc-50 overflow-x-clip">
        <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-16 flex items-end justify-between">
          <div className="space-y-1 md:space-y-4">
            <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter">Factory Floor</h2>
            <p className="text-[8px] md:text-sm font-bold text-zinc-500 uppercase tracking-widest">A glimpse into our manufacturing hub.</p>
          </div>
          <button onClick={() => go("gallery")} className="flex items-center gap-2 text-[8px] md:text-xs font-black uppercase tracking-widest hover:text-[#fabf37] transition-colors">
            Full Gallery <ArrowRight className="size-3 md:size-4" />
          </button>
        </div>

        <div ref={floorTrackRef} className="flex gap-4 md:gap-8 px-4 md:px-6 pb-8 md:pb-12 w-max will-change-transform">
          {FACTORY_FLOOR.map((media, i) => (
            <div
              key={i}
              className="w-[240px] md:w-[400px] h-[300px] md:h-[500px] rounded-[24px] md:rounded-[60px] overflow-hidden relative group shrink-0"
            >
              <MediaPlayer
                type="image"
                src={media.src}
                alt={media.alt}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                <p className="text-[#fabf37] text-xs font-black uppercase tracking-widest mb-2">Facility View</p>
                <p className="text-white text-xl md:text-2xl font-black uppercase tracking-tight">{media.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HOW WE WORK - THE AI ADVANTAGE */}
      <section className="py-16 md:py-32 bg-black text-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="space-y-6 md:space-y-12">
              <div className="space-y-2 md:space-y-4">
                <div className="px-3 py-1 bg-[#fabf37] text-black text-[8px] md:text-[9px] font-black rounded-full uppercase inline-block">Methodology</div>
                <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                  Smart <br /> Manufacturing.
                </h2>
              </div>

              <div className="space-y-6 md:space-y-8">
                <p ref={smartTextRef} className="text-xs md:text-lg font-bold text-zinc-400 leading-relaxed uppercase">
                  {smartSentences.map((s, i) => (
                    <React.Fragment key={i}>
                      <span data-sentence style={{ opacity: 0.25 }}>{s}</span>
                      {i < smartSentences.length - 1 ? " " : null}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-10 bg-[#fabf37]/5 blur-3xl rounded-full" />
              <div className="relative rounded-[32px] md:rounded-[60px] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5]">
                <div ref={smartImgRef} className="w-full h-full will-change-transform" style={{ transform: "scale(1.08)" }}>
                  <MediaPlayer
                    type={aboutUsVideos?.smartManufacturingType || "image"}
                    src={aboutUsVideos?.smartManufacturing || imgInnovation}
                    alt="Operator at the cup forming line"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR JOURNEY - TIMELINE */}
      <OurJourney />
    </div>
  );
}

export default React.memo(AboutPage);
