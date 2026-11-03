import React from "react";
import { Sparkles, ArrowRight, Pause, Play } from "lucide-react";
import { useScrollScrub, clamp01, smooth, easeOut3 } from "../../lib/useScrollScrub";
import pGiftBags from "../../../assets/products/gift-bags.webp";
import fQcCupInspection from "../../../assets/factory/qc-cup-inspection.webp";
import fOffsetPress from "../../../assets/factory/offset-press.webp";
import fFormingTurret from "../../../assets/factory/forming-turret.webp";
import fCupFormingMachines from "../../../assets/factory/cup-forming-machines.webp";
import posterLamination from "../../../assets/video-posters/lamination.webp";
import { useGo } from "../../lib/useGo";
import { useLanguage } from "../../context/LanguageContext";

// Factory tour (public/media, served under the deploy sub-path). Poster is a real QC photo.
// Owner-supplied 2026-11-02: public Facebook reel 1778452163018523 (HD 1272x720, video-only; the
// milestone video plays muted). Download recipe in public/media/SOURCES.txt.
const FOUNDED_2020_VIDEO = `${import.meta.env.BASE_URL}media/founded-2020.mp4`;
/** Owner (2 Nov 2026): lamination footage from the Paperware YouTube short "Drying and Lamination" (public/media/SOURCES.txt). */
const LAMINATION_VIDEO = `${import.meta.env.BASE_URL}media/lamination.mp4`;

// Helper to extract YouTube embed URL
const getYouTubeEmbed = (url: string): string | null => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11
    ? `https://www.youtube.com/embed/${match[2]}?autoplay=0&controls=1&modestbranding=1&rel=0`
    : null;
};

interface Milestone {
  id: string;
  year: string;
  title: string;
  stat: string;
  videoUrl: string;
  videoType: string;
  poster?: string;
}

/**
 * Default milestones, as given by the owner (31 Oct 2026, founding date from the Facebook Page: 8 Dec 2020): 2020 founded, 2021 forming unit
 * 2022 printing unit, 2022 cutting unit, 2024 lamination unit. The admin can extend this list via
 * localStorage('journeyMilestones').
 */
const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: "1",
    year: "2020",
    title: "Founded in Dhaka",
    stat: "December 2020 · Forming unit 2021",
    videoUrl: FOUNDED_2020_VIDEO,
    videoType: "video",
    poster: fQcCupInspection
  },
  {
    id: "2",
    year: "2022",
    title: "Printing unit added",
    stat: "In-house offset",
    videoUrl: fOffsetPress,
    videoType: "image"
  },
  {
    id: "3",
    year: "2022",
    title: "Cutting unit added",
    stat: "Die-cutting",
    videoUrl: fFormingTurret,
    videoType: "image"
  },
  {
    id: "4",
    year: "2024",
    title: "Lamination unit added",
    stat: "Lamination",
    videoUrl: LAMINATION_VIDEO,
    videoType: "video",
    poster: posterLamination
  },
  {
    id: "5",
    year: "Today",
    title: "Paper cups, food packaging, pharma boxes, stationery",
    stat: "Product lines",
    videoUrl: pGiftBags,
    videoType: "image"
  }
];

function loadMilestones(): Milestone[] {
  if (typeof localStorage === "undefined") return DEFAULT_MILESTONES;
  try {
    const saved = localStorage.getItem('journeyMilestones');
    const parsed = saved ? JSON.parse(saved) : null;
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MILESTONES;
  } catch {
    return DEFAULT_MILESTONES;
  }
}

// Milestone Item Component
interface MilestoneItemProps {
  milestone: Milestone;
}

function MilestoneItem({ milestone }: MilestoneItemProps) {
  const { t } = useLanguage();
  // The factory video autoplays muted for everyone (also under reduced motion) and has its own
  // pause control (WCAG 2.2.2), like the map in nationwide-export.tsx.
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [videoPaused, setVideoPaused] = React.useState(false);
  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); setVideoPaused(false); } else { v.pause(); setVideoPaused(true); }
  };

  return (
    <div data-milestone className="relative pl-8 md:pl-16 pb-16 md:pb-24 will-change-transform">
      {/* Timeline Dot */}
      <div
        data-milestone-dot
        className="absolute -left-3 top-0 size-5 rounded-full bg-[#fabf37] border-4 border-white shadow-lg will-change-transform"
      />

      {/* Content */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        {/* Left - Year & Icon */}
        <div className="flex items-center gap-6 shrink-0">
          {/* Year */}
          <div className="relative">
            <div className="text-6xl md:text-8xl font-black text-black/5 select-none">
              {t(milestone.year)}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl md:text-2xl font-black text-[#fabf37]">
                {t(milestone.year)}
              </span>
            </div>
          </div>

          {/* Icon */}
          <div
            className="size-16 md:size-20 rounded-full bg-black flex items-center justify-center"
            style={{ boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)" }}
          >
            <Sparkles className="size-8 md:size-10 text-[#fabf37]" strokeWidth={2} />
          </div>
        </div>

        {/* Right - Info */}
        <div className="flex-1 md:text-right">
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black mb-2 leading-none">
            {t(milestone.title)}
          </h3>
          <p className="text-lg md:text-2xl font-bold text-zinc-400 uppercase tracking-wide">
            {t(milestone.stat)}
          </p>
        </div>
      </div>

      {/* Video Screen - Phone Type */}
      <div className="mt-8 flex justify-center">
        <div
          data-milestone-phone
          className="relative rounded-[40px] overflow-hidden aspect-[9/16] w-full max-w-[320px] bg-black shadow-2xl border-[8px] border-black group will-change-transform"
        >
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20 border-b-2 border-zinc-800">
            <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-zinc-700 rounded-full" />
          </div>

          {/* Video/Image - Dynamic based on type */}
          <div data-milestone-media className="absolute inset-0 will-change-transform">
            {milestone.videoType === 'youtube' && getYouTubeEmbed(milestone.videoUrl) ? (
              <iframe
                src={getYouTubeEmbed(milestone.videoUrl) || ''}
                className="w-full h-full"
                allowFullScreen
                title={t(milestone.title)}
              />
            ) : milestone.videoType === 'video' ? (
              <video
                ref={videoRef}
                src={milestone.videoUrl}
                poster={milestone.poster}
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setVideoPaused(false)}
                onPause={() => setVideoPaused(true)}
                onError={(e) => e.currentTarget.style.display = 'none'}
                suppressHydrationWarning
              />
            ) : (
              <img loading="lazy" decoding="async"
                src={milestone.videoUrl}
                alt={t(milestone.title)}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Top Year Badge (+ pause/play for the video milestone) */}
          <div className="absolute top-8 left-4 right-4 z-10 flex items-start justify-between">
            <div className="bg-[#fabf37] text-black rounded-2xl px-4 py-2 inline-block">
              <span className="text-lg font-black">
                {t(milestone.year)}
              </span>
            </div>
            {milestone.videoType === 'video' && (
              <button
                type="button"
                onClick={toggleVideo}
                aria-pressed={videoPaused}
                aria-label={t(videoPaused ? "Play factory video" : "Pause factory video")}
                className="size-11 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2"
              >
                {videoPaused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
              </button>
            )}
          </div>

          {/* Bottom Info Card */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <div className="bg-black/90 backdrop-blur-xl rounded-3xl p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <div className="size-2 rounded-full bg-[#fabf37] animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60">
                  {t("our_journey_milestone")}
                </span>
              </div>
              <h4 className="text-lg font-black uppercase text-white mb-1 leading-tight">
                {t(milestone.title)}
              </h4>
              <p className="text-xs font-bold text-[#fabf37]">
                {t(milestone.stat)}
              </p>
            </div>
          </div>

          {/* Phone Home Indicator */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-20" />

          {/* Golden Glow Border on Hover */}
          <div className="absolute inset-0 border-4 border-[#fabf37] rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Hover Line */}
      <div data-milestone-rule className="h-0.5 bg-gradient-to-r from-[#fabf37] to-transparent mt-8 origin-left will-change-transform" />
    </div>
  );
}

export function OurJourney() {
  const { t } = useLanguage();
  const go = useGo();
  const sectionRef = React.useRef<HTMLElement>(null);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const lineRef = React.useRef<HTMLDivElement>(null);
  const ctaRef = React.useRef<HTMLDivElement>(null);

  // Load milestones from localStorage or use defaults
  const milestones = React.useMemo(loadMilestones, []);

  // Scroll-scrubbed motion: header drifts in, the timeline line grows with progress, each
  // milestone fades/slides in as its row crosses the viewport centre, the CTA rises to settle.
  useScrollScrub(() => {
    const h = window.innerHeight || 1;

    const header = headerRef.current;
    if (header) {
      const r = header.getBoundingClientRect();
      const p = easeOut3((h * 0.95 - r.top) / (h * 0.5));
      header.style.opacity = (0.1 + 0.9 * p).toFixed(3);
      const words = header.querySelectorAll<HTMLElement>("[data-journey-word]");
      words.forEach((el, i) => {
        const dir = i === 0 ? -1 : 1;
        el.style.transform = `translate3d(${(dir * 80 * (1 - p)).toFixed(1)}px,0,0)`;
      });
      const rule = header.querySelector<HTMLElement>("[data-journey-rule]");
      if (rule) rule.style.transform = `scaleX(${p.toFixed(4)})`;
    }

    const list = listRef.current;
    const line = lineRef.current;
    if (list && line) {
      const r = list.getBoundingClientRect();
      // Line reaches the point of the list currently at the viewport centre.
      const grow = clamp01((h * 0.5 - r.top) / Math.max(1, r.height));
      line.style.transform = `scaleY(${grow.toFixed(4)})`;

      const rows = list.querySelectorAll<HTMLElement>("[data-milestone]");
      rows.forEach((row) => {
        const rr = row.getBoundingClientRect();
        // 0 when the row top is at 85% of the viewport, 1 when it has reached the centre.
        const u = smooth((h * 0.85 - rr.top) / (h * 0.35));
        row.style.opacity = (0.1 + 0.9 * u).toFixed(3);
        row.style.transform = `translate3d(${(-28 * (1 - u)).toFixed(1)}px,0,0)`;
        const dot = row.querySelector<HTMLElement>("[data-milestone-dot]");
        if (dot) dot.style.transform = `scale(${u.toFixed(4)})`;
        const ruleEl = row.querySelector<HTMLElement>("[data-milestone-rule]");
        if (ruleEl) ruleEl.style.transform = `scaleX(${u.toFixed(4)})`;
        const media = row.querySelector<HTMLElement>("[data-milestone-media]");
        if (media) {
          const mr = media.getBoundingClientRect();
          const rel = clamp01((mr.top + mr.height / 2) / h) - 0.5;
          media.style.transform = `translate3d(0,${(rel * 48).toFixed(1)}px,0) scale(1.1)`;
        }
      });
    }

    const cta = ctaRef.current;
    if (cta) {
      const r = cta.getBoundingClientRect();
      const u = easeOut3((h - r.top) / (h * 0.6));
      cta.style.opacity = (0.15 + 0.85 * u).toFixed(3);
      cta.style.transform = `translate3d(0,${(64 * (1 - u)).toFixed(1)}px,0)`;
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 bg-gradient-to-b from-white via-zinc-50 to-white overflow-x-clip"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, black 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-16 md:mb-24 will-change-transform">
          <div className="flex items-center gap-4 mb-6">
            <div data-journey-rule className="h-1 w-12 bg-[#fabf37] origin-left will-change-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
              {t("our_journey_our_story")}
            </span>
          </div>

          <h2 className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            <span data-journey-word className="text-black block will-change-transform">
              {t("department_showcase_our")}
            </span>
            <span data-journey-word className="text-[#fabf37] block will-change-transform">
              {t("our_journey_journey")}
            </span>
          </h2>
        </div>

        {/* Timeline List - Vertical */}
        <div ref={listRef} className="relative max-w-4xl mx-auto space-y-0 border-l-2 border-black/10">
          <div
            ref={lineRef}
            aria-hidden="true"
            className="absolute -left-[2px] top-0 bottom-0 w-[2px] bg-[#fabf37] origin-top will-change-transform"
            style={{ transform: "scaleY(0)" }}
          />
          {milestones.map((milestone, index) => (
            <MilestoneItem key={milestone.id ?? index} milestone={milestone} />
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div ref={ctaRef} className="mt-16 md:mt-24 max-w-4xl mx-auto will-change-transform">
          <div className="bg-black rounded-[40px] p-10 md:p-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, #fabf37 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }} />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              {/* Text */}
              <div>
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-3 leading-tight">
                  {t("our_journey_be_part_of")}<br />
                  <span className="text-[#fabf37]">{t("our_journey_our_story")}</span>
                </h3>
                <p className="text-sm md:text-base font-bold text-zinc-400 max-w-md">
                  {t("our_journey_join_the_brands_that_trust")}
                </p>
              </div>

              {/* Button */}
              <button onClick={() => go("contact")}
                type="button"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#fabf37] text-black rounded-full text-sm font-black uppercase tracking-widest whitespace-nowrap shadow-xl shadow-[#fabf37]/20 hover:scale-105 transition-transform"
              >
                <span>{t("our_journey_get_started")}</span>
                <ArrowRight className="size-5" strokeWidth={3} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
