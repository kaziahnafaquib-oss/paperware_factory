import React from "react";
import { Play, Pause } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useScrollScrub, clamp01, easeOut3 } from "../lib/useScrollScrub";
import imgFloorCupMachines from "../../assets/factory/floor-cup-machines.webp";
import imgQcCupInspection from "../../assets/factory/qc-cup-inspection.webp";
import imgCupsStacking from "../../assets/factory/cups-stacking.webp";
import imgOperatorForming from "../../assets/factory/operator-forming-line.webp";

const TOUR_VIDEO = `${import.meta.env.BASE_URL}media/factory-tour.mp4`;

export function FactoryLivePage() {
  const { isRTL } = useLanguage();
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#fabf37]">From the floor</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Factory <span className="text-zinc-500">Ops</span> <br /> <span className="text-[#fabf37]">Floor</span>
            </h1>
          </div>
          <p className="max-w-xs text-xs font-bold text-zinc-500 uppercase tracking-widest leading-relaxed md:text-right">
            Photos and a short clip from our Dhaka production floor.
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
                  <span className="text-[9px] font-black uppercase tracking-widest">{cams[activeCam].id}</span>
                </div>
                <div className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">{cams[activeCam].location}</span>
                </div>
              </div>

              <div className="absolute top-8 right-8 z-20">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-pressed={!isPlaying}
                  aria-label={isPlaying ? "Pause slow zoom" : "Play slow zoom"}
                  className="size-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors"
                >
                  {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                </button>
              </div>

              <ImageWithFallback
                key={activeCam}
                src={cams[activeCam].img}
                alt={cams[activeCam].name}
                loading="eager"
                className={`size-full object-cover transition-transform duration-[10s] ease-linear ${isPlaying ? 'scale-110' : 'scale-100'}`}
              />

              {/* Frame Switcher Bar */}
              <div className="absolute bottom-8 left-8 right-8 z-20 flex items-center gap-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-white/80">{cams[activeCam].name}</p>
                <div className="flex-1 h-px bg-white/10" />
                <div className="flex gap-2">
                  {cams.map((cam, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveCam(i)}
                      aria-label={cam.name}
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
                <span className="text-[9px] font-black uppercase tracking-widest text-[#fabf37]">Floor clip</span>
              </div>
              <button
                type="button"
                onClick={toggleTour}
                aria-pressed={tourPaused}
                aria-label={tourPaused ? "Play factory clip" : "Pause factory clip"}
                className="absolute top-6 right-6 size-11 rounded-full bg-black/70 text-white border border-white/10 flex items-center justify-center hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37]"
              >
                {tourPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              </button>
              <p className="absolute bottom-6 left-6 right-6 text-[10px] font-black uppercase tracking-widest text-white/80">
                Factory tour, Dhaka
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
