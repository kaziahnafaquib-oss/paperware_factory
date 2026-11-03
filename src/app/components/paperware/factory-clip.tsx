import React from "react";
import { Pause, Play } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * Real Paperware footage, muted and looping (public/media/*.mp4, see public/media/SOURCES.txt).
 *
 * - Lazy: the <video> is only mounted once the tile is within ~400px of the viewport, so a page
 *   with several clips does not fetch them all on load.
 * - Reduced motion: no autoplay; the poster shows with a Play control (WCAG 2.2.2 / 2.3.3).
 *   Otherwise the clip autoplays and has its own Pause/Play control.
 * - Same URL pattern as our-journey.tsx: `${import.meta.env.BASE_URL}media/<name>.mp4`.
 */
export const mediaUrl = (name: string) => `${import.meta.env.BASE_URL}media/${name}`;

const GRADE: React.CSSProperties = { filter: "contrast(1.12) saturate(1.15) brightness(1.04)" };

type FactoryClipProps = {
  src: string;
  poster: string;
  /** What the footage shows, used for the Pause/Play aria-label ("Pause <label> video"). */
  label: string;
  className?: string;
  videoClassName?: string;
  /** Light non-destructive grade for flat (log) camera footage; natural look kept. */
  graded?: boolean;
  /** Where the control sits. */
  controlPosition?: "top-right" | "bottom-right" | "bottom-left";
  children?: React.ReactNode;
};

export function FactoryClip({
  src,
  poster,
  label,
  className = "",
  videoClassName = "",
  graded = false,
  controlPosition = "bottom-right",
  children,
}: FactoryClipProps) {
  const { t } = useLanguage();
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = React.useState(false);
  // Autoplays muted for everyone, also under reduced motion (owner decision 2026-11-02); the
  // play/pause button stays as the opt-out.
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setMounted(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setMounted(true); io.disconnect(); } },
      { rootMargin: "400px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { void v.play(); setPaused(false); } else { v.pause(); setPaused(true); }
  };

  const pos =
    controlPosition === "top-right" ? "top-4 right-4" :
    controlPosition === "bottom-left" ? "bottom-4 left-4" : "bottom-4 right-4";

  return (
    <div ref={wrapRef} className={`relative overflow-hidden bg-zinc-900 ${className}`}>
      {mounted ? (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className={`absolute inset-0 size-full object-cover ${videoClassName}`}
          style={graded ? GRADE : undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          suppressHydrationWarning
        />
      ) : (
        <img src={poster} alt="" style={graded ? GRADE : undefined} className={`absolute inset-0 size-full object-cover ${videoClassName}`} loading="lazy" decoding="async" />
      )}
      {children}
      <button
        type="button"
        onClick={toggle}
        aria-pressed={!paused}
        aria-label={t(paused ? `Play ${label} video` : `Pause ${label} video`)}
        className={`absolute ${pos} z-20 size-11 rounded-full bg-black/80 text-white flex items-center justify-center hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2`}
      >
        {paused ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
      </button>
    </div>
  );
}
