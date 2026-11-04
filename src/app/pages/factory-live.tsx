import React from "react";
import { Play, Pause } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, clamp01, easeOut3 } from "../lib/useScrollScrub";
import imgFloorCupMachines from "../../assets/factory/floor-cup-machines.webp";
import imgQcCupInspection from "../../assets/factory/qc-cup-inspection.webp";
import imgCupsStacking from "../../assets/factory/cups-stacking.webp";
import imgOperatorForming from "../../assets/factory/operator-forming-line.webp";
import imgFloorPlanGround from "../../assets/factory/floor-plan-ground.webp"; // owner 4 Nov 2026
import imgFloorPlanSecond from "../../assets/factory/floor-plan-second.webp"; // owner 4 Nov 2026

const TOUR_VIDEO = `${import.meta.env.BASE_URL}media/factory-tour.mp4`;

export function FactoryLivePage() {
  const { t, isRTL } = useLanguage();
  const [activeCam, setActiveCam] = React.useState(0);
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [tourPaused, setTourPaused] = React.useState(false);
  const tourRef = React.useRef<HTMLVideoElement>(null);

  const toggleTour = () => {
    const v = tourRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); setTourPaused(false); } else { v.pause(); setTourPaused(true); }
  };

  // Real photos from the Paperware floor (see src/assets/factory/SOURCES.txt).
  const cams = [
    { id: "Floor 01", name: "Cup forming line", location: "Production Floor", img: imgFloorCupMachines },
    { id: "Floor 02", name: "Quality control", location: "QC Bench", img: imgQcCupInspection },
    { id: "Floor 03", name: "Stacking & packing", location: "Finishing", img: imgCupsStacking }
  ];

  const headRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);

  // Scroll-scrubbed: header drifts up and fades; the two media frames rise and settle in sequence.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;
    const head = headRef.current;
    if (head) {
      const p = clamp01(window.scrollY / (h * 0.6));
      head.style.transform = `translate3d(0,${(p * 80).toFixed(1)}px,0)`;
      head.style.opacity = (1 - 0.7 * p).toFixed(3);
    }
    const grid = gridRef.current;
    if (grid) {
      const r = grid.getBoundingClientRect();
      const tp = clamp01((h - r.top) / (h * 0.7));
      grid.querySelectorAll<HTMLElement>("[data-frame]").forEach((el, i) => {
        const u = easeOut3((tp - i * 0.15) / 0.6);
        el.style.transform = `translate3d(0,${((1 - u) * 72).toFixed(1)}px,0) scale(${(0.96 + 0.04 * u).toFixed(4)})`;
        el.style.opacity = (0.2 + 0.8 * u).toFixed(3);
      });
    }
  });

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 overflow-x-clip ${isRTL ? 'rtl' : 'ltr'}`}>

      {/* Industrial Top Header */}
      <div className="container mx-auto px-4 max-w-7xl">
        <div ref={headRef} className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 will-change-transform">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-2 rounded-full bg-[#fabf37]" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">{t("factory_live_from_the_floor")}</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              {t("business_factory")} <span className="text-zinc-500">{t("factory_live_ops")}</span> <br /> <span className="text-[#fabf37]">{t("factory_live_floor")}</span>
            </h1>
          </div>
          <p className="max-w-xs text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed md:text-right">
            {t("factory_live_photos_and_a_short_clip")}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">

          {/* Floor Photos */}
          <div data-frame className="lg:col-span-8 will-change-transform">
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[640px] bg-black rounded-[48px] overflow-hidden border border-white/10 shadow-2xl group">
              {/* Frame Metadata Overlay */}
              <div className="absolute top-8 left-8 z-20 flex flex-wrap items-center gap-4">
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-3">
                  <div className="size-1.5 rounded-full bg-[#fabf37]" />
                  <span className="text-[9px] font-black uppercase tracking-widest">{t(cams[activeCam].id)}</span>
                </div>
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{t(cams[activeCam].location)}</span>
                </div>
              </div>

              <div className="absolute top-8 right-8 z-20">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-pressed={!isPlaying}
                  aria-label={t(isPlaying ? "Pause slow zoom" : "Play slow zoom")}
                  className="size-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                </button>
              </div>

              <ImageWithFallback
                key={activeCam}
                src={cams[activeCam].img}
                alt={t(cams[activeCam].name)}
                loading="eager"
                className={`size-full object-cover transition-transform duration-[10s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
              />

              {/* Frame Switcher Bar */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/80">{t(cams[activeCam].name)}</p>
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex gap-2">
                  {cams.map((cam, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveCam(i)}
                      aria-label={t(cam.name)}
                      aria-pressed={activeCam === i}
                      className={`h-3 rounded-full transition-all ${activeCam === i ? 'bg-[#fabf37] w-12' : 'bg-white/20 w-3'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Portrait clip from the floor */}
          <div data-frame className="lg:col-span-4 will-change-transform">
            <div className="relative mx-auto max-w-[360px] lg:max-w-none aspect-[9/16] bg-zinc-900 rounded-[48px] overflow-hidden border border-white/10 shadow-2xl">
              <video
                ref={tourRef}
                className="absolute inset-0 size-full object-cover"
                poster={imgOperatorForming}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              >
                <source src={TOUR_VIDEO} type="video/mp4" />
              </video>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              <div className="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                <span className="text-[9px] font-black uppercase tracking-widest text-[#fabf37]">{t("factory_live_floor_clip")}</span>
              </div>
              <button
                type="button"
                onClick={toggleTour}
                aria-pressed={tourPaused}
                aria-label={t(tourPaused ? "Play factory clip" : "Pause factory clip")}
                className="absolute top-6 right-6 size-11 rounded-full bg-black/70 text-white border border-white/10 flex items-center justify-center hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37]"
              >
                {tourPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              </button>
              <p className="absolute bottom-6 left-6 right-6 text-[10px] font-black uppercase tracking-widest text-white/80">
                {t("factory_live_factory_tour_dhaka")}
              </p>
            </div>
          </div>

        </div>

        {/* Owner (2 Nov 2026): the factory floor plan, shown as a tilted 3D board that levels out on hover. */}
        <section className="mt-16 md:mt-24" aria-labelledby="floor-plan-heading">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-[#fabf37]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">Layout</span>
              </div>
              <h2 id="floor-plan-heading" className="text-3xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                Floor <span className="text-zinc-500">Plan</span>
              </h2>
            </div>
            <p className="max-w-xs text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed md:text-right">
              Forming, printing, cutting, lamination, warehouse and offices under one roof.
            </p>
          </div>
          <div className="space-y-10 md:space-y-16">
            {[
              { src: imgFloorPlanGround, label: "Factory floor plan", alt: "Paperware Factory ground floor plan: distributor warehouse, paper stock, cartons, finished goods, forming machines F1-F4, printing P1-P2, cutting C1, packing P3, lab, production and accounts, offices, canteen, staff quarter" },
              { src: imgFloorPlanSecond, label: "2nd floor plan", alt: "Paperware Factory 2nd floor plan: buffer stock, inspection area, manual packaging, canteen, accounts and sales, sales and costing, production management and design, quality control lab, conference and board room, prayer hall, manager and director rooms" },
            ].map((plan) => (
              <div key={plan.label} className="[perspective:1600px] group">
                <div className="relative rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_60px_120px_-40px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out [transform-style:preserve-3d] [transform:rotateX(14deg)_rotateZ(-1.5deg)] group-hover:[transform:rotateX(0deg)_rotateZ(0deg)] motion-reduce:[transform:none]">
                  <img src={plan.src} alt={plan.alt} loading="lazy" decoding="async" className="w-full h-auto block" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80 group-hover:opacity-0 transition-opacity duration-700" />
                  <div className="absolute top-5 left-5 md:top-8 md:left-8 px-4 py-2 bg-black/70 backdrop-blur-xl border border-white/10 rounded-full">
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#fabf37]">{plan.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
