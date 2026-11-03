import React from "react";
import { useLanguage } from "../../context/LanguageContext";
import { useScrollScrub, clamp01, smooth } from "../../lib/useScrollScrub";
import cupImg from "../../../assets/cutouts/cup.webp";

const CAPTIONS = ["sustain_cup_step_design", "sustain_cup_step_print", "sustain_cup_step_form", "sustain_cup_step_raise"];

/**
 * Scroll-scrubbed cup. The stage is sticky; progress = how far the tall section has scrolled.
 * At progress 0 every transform is the identity, so the cup sits still until scrolling begins.
 */
export function SustainCupStory() {
  const { t } = useLanguage();
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const cupRef = React.useRef<HTMLImageElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const capRefs = React.useRef<(HTMLParagraphElement | null)[]>([]);

  useScrollScrub(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const r = sec.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const p = clamp01(-r.top / Math.max(r.height - vh, 1));
    const s = smooth(p);
    if (cupRef.current) {
      cupRef.current.style.transform = `translate3d(0, ${(-s * 30).toFixed(1)}px, 0) rotate(${(s * -10).toFixed(1)}deg) scale(${(1 + s * 0.18).toFixed(4)})`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `scale(${(1 + s * 0.35).toFixed(4)})`;
      ringRef.current.style.opacity = (0.35 + s * 0.65).toFixed(3);
    }
    capRefs.current.forEach((el, i) => {
      if (!el) return;
      const c = (i + 0.5) / CAPTIONS.length;
      const o = clamp01(1 - Math.abs(p - c) / (0.5 / CAPTIONS.length + 0.08));
      el.style.opacity = o.toFixed(3);
      el.style.transform = `translateY(${((1 - o) * 14).toFixed(1)}px)`;
    });
  });

  return (
    <div ref={sectionRef} className="relative" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-[100svh] flex flex-col items-center justify-center gap-8 overflow-hidden">
        <div className="relative size-[240px] md:size-[340px] flex items-center justify-center">
          <div ref={ringRef} aria-hidden="true" className="absolute inset-0 rounded-full bg-[#9DC88D]/40 border-2 border-[#4D8B55]/40" style={{ opacity: 0.35 }} />
          <img ref={cupRef} src={cupImg} alt={t("sustain_cup_alt")} decoding="async" className="relative h-[85%] w-auto object-contain will-change-transform drop-shadow-xl" />
        </div>
        <div className="relative h-16 w-full max-w-xl px-4">
          {CAPTIONS.map((k, i) => (
            <p
              key={k}
              ref={(el) => { capRefs.current[i] = el; }}
              style={{ opacity: i === 0 ? 1 : 0 }}
              className="absolute inset-x-4 text-center font-['Poppins',sans-serif] font-black uppercase text-[#003301] text-xl md:text-3xl"
            >
              {t(k)}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
