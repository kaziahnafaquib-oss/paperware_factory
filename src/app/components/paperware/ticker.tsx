import React from "react";
import { Database, Globe, Leaf, Layers, PenTool, Clock, Microscope, Truck, Plane, Zap, Recycle, Pause, Play } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

/**
 * Top announcement strip (signature element, kept as designed).
 *
 * Phase A: the scroll is now a CSS animation (see `.pw-marquee` in styles/index.css)
 * instead of a JS motion loop, so it can be paused: it pauses on hover and keyboard
 * focus, has a Pause/Play button (WCAG 2.2.2), and stops entirely when the OS
 * "reduce motion" setting is on. Visual speed and layout are unchanged (40s for one
 * of five identical groups). Only the first group is exposed to screen readers.
 */
export const Ticker = React.memo(() => {
  const { t } = useLanguage();
  const [paused, setPaused] = React.useState(false);

  const items: { icon: React.ReactNode; label: string }[] = [
    { icon: <Layers className="size-4" />, label: t("ticker_1") },
    { icon: <Globe className="size-4" />, label: t("ticker_3") },
    { icon: <Layers className="size-4" />, label: t("ticker_7") },
    { icon: <PenTool className="size-4" />, label: t("ticker_8") },
    { icon: <Plane className="size-4" />, label: t("ticker_13") },
    { icon: <Recycle className="size-4" />, label: t("ticker_15") },
  ];

  const itemClass = "flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-black";

  return (
    <div
      className="pw-marquee fixed top-0 w-full z-[1002] bg-[#fabf37] h-8 flex items-center overflow-hidden border-b border-black/5 shadow-sm"
      data-paused={paused ? "true" : undefined}
      aria-label="Highlights"
      role="region"
    >
      <div className="pw-marquee-track flex shrink-0 w-max whitespace-nowrap items-center gap-12 md:gap-24">
        {[0, 1, 2, 3, 4].map((group) => (
          <div key={group} className="flex items-center gap-12 md:gap-24" aria-hidden={group > 0 ? true : undefined}>
            {items.map((item, i) => (
              <div key={i} className={itemClass}>
                <span aria-hidden="true">{item.icon}</span> {item.label}
              </div>
            ))}
            <div className={itemClass}>
              MADE IN BANGLADESH
              <img loading="lazy" decoding="async" src="https://flagcdn.com/bd.svg" alt="" width={20} height={12} className="h-3 w-auto rounded-sm shadow-sm" />
            </div>
            <div className="size-1.5 rounded-full bg-black/20" aria-hidden="true" />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? "Play scrolling highlights" : "Pause scrolling highlights"}
        className="pw-marquee-control absolute right-0 top-0 h-8 w-10 flex items-center justify-center bg-[#fabf37] text-black shadow-[-12px_0_12px_#fabf37] hover:bg-black hover:text-[#fabf37] focus-visible:outline-2 focus-visible:outline-black focus-visible:-outline-offset-2 transition-colors"
      >
        {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
});

Ticker.displayName = "Ticker";
