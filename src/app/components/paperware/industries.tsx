import React from "react";
import "./industries.css";
import { useLanguage } from "../../context/LanguageContext";
import r1 from "../../../assets/industries/restaurants-1.webp";
import r2 from "../../../assets/industries/restaurants-2.webp";
import r3 from "../../../assets/industries/restaurants-3.webp";
import c1 from "../../../assets/industries/cafes-1.webp";
import c2 from "../../../assets/industries/cafes-2.webp";
import c3 from "../../../assets/industries/cafes-3.webp";
import h1 from "../../../assets/industries/hospitals-1.webp";
import h2 from "../../../assets/industries/hospitals-2.webp";
import h3 from "../../../assets/industries/hospitals-3.webp";
import pMedicine from "../../../assets/industries/medicine-boxes.webp";
import pCalendars from "../../../assets/industries/desk-calendars.webp";
import pTissue from "../../../assets/industries/tissue-box-rose.webp";
import pRx from "../../../assets/industries/prescription-pad.webp";
import pBrochures from "../../../assets/products/brochures.webp";
import pStickers from "../../../assets/products/stickers.webp";
import pFlyers from "../../../assets/products/flyers.webp";
import pTissueFloral from "../../../assets/products/tissue-box-floral.webp";
import pTissueBoxes from "../../../assets/products/tissue-boxes.webp";

type Industry = { title: string; desc: string; photos: string[]; alt: string };

// photos[0] is the large shot; photos[1..2] sit as smaller overlapping cards.
const getIndustries = (t: (key: string) => string): Industry[] => [
  { title: t("restaurants"), desc: t("restaurant_desc"), photos: [r1, r2, r3], alt: "Takeaway boxes and bags in use at a restaurant" },
  { title: t("cafes"), desc: t("cafe_desc"), photos: [c1, c2, c3], alt: "Paper cups in use at a cafe" },
  { title: t("hospitals"), desc: t("hospital_desc"), photos: [h1, h2, h3], alt: "Prescription pads and paper files in a hospital" },
  { title: t("pharmaceutical"), desc: t("pharma_desc"), photos: [pMedicine, pRx, pStickers], alt: "Medicine boxes" },
  { title: t("corporate_clients"), desc: t("corporate_desc"), photos: [pCalendars, pBrochures, pFlyers], alt: "Desk calendars" },
  { title: t("hotels"), desc: t("hotel_desc"), photos: [pTissue, pTissueFloral, pTissueBoxes], alt: "Tissue box" },
];

const PER_STEP = 1;
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

/**
 * Industries: "Big type" scroll story. One sector per step, six steps; each step shows one large
 * photo with up to two smaller overlapping shots. The stage pins for the
 * track's height and every frame is derived from the scroll position (no timers, no easing), so it
 * also runs under prefers-reduced-motion: the user drives it. Only transform/opacity are written.
 */
export const Industries = React.memo(function Industries({ onExplore }: { onExplore: () => void }) {
  const { t } = useLanguage();
  const industries = React.useMemo(() => getIndustries(t), [t]);
  const pairs = React.useMemo(() => {
    const out: Industry[][] = [];
    for (let i = 0; i < industries.length; i += PER_STEP) out.push(industries.slice(i, i + PER_STEP));
    return out;
  }, [industries]);
  const steps = pairs.length;

  const trackRef = React.useRef<HTMLDivElement>(null);
  const namesRef = React.useRef<HTMLDivElement>(null);
  const photosRef = React.useRef<HTMLDivElement>(null);
  const countRef = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    const track = trackRef.current;
    const names = namesRef.current;
    const photos = photosRef.current;
    const count = countRef.current;
    if (!track || !names || !photos || !count) return;

    const pairEls = Array.from(names.querySelectorAll<HTMLElement>(".ind__pair"));
    const descEls = pairEls.map((el) => Array.from(el.querySelectorAll<HTMLElement>(".ind__desc")));
    const panelEls = Array.from(photos.querySelectorAll<HTMLElement>(".ind__panel"));
    const n = pairEls.length;
    let stride = 320;
    let solid = -1;
    let lastP = -1;

    const mobile = () => window.innerWidth <= 820;
    const measure = () => {
      const h = pairEls[0]?.getBoundingClientRect().height ?? 240;
      // Neighbouring pairs sit one stride away so their outlined first word peeks in at the edge.
      stride = Math.round(h * (mobile() ? 1.3 : 1.25));
    };
    const progress = () => {
      const r = track.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
    };
    const render = (p: number) => {
      const c = clamp(p * n - 0.5, 0, n - 1); // continuous centre index
      const idx = Math.round(c);
      const fadeSpan = mobile() ? 0.6 : 1.2;
      pairEls.forEach((el, i) => {
        const d = i - c;
        const ad = Math.abs(d);
        el.style.transform = `translateY(calc(-50% + ${(d * stride).toFixed(1)}px))`;
        el.style.opacity = ad < 0.5 ? "1" : (clamp(1 - (ad - 0.5) / fadeSpan, 0, 1) * 0.5).toFixed(3);
        const o = clamp(1 - ad * 2.2, 0, 1).toFixed(3);
        descEls[i].forEach((de) => (de.style.opacity = o));
      });
      panelEls.forEach((el, i) => {
        const w = 1 - clamp(Math.abs(i - c) / 0.6, 0, 1);
        el.style.opacity = w.toFixed(3);
        el.style.transform = `scale(${(1.06 - 0.06 * w).toFixed(4)})`;
      });
      if (idx !== solid) {
        pairEls.forEach((el, i) => {
          const on = i === idx;
          el.classList.toggle("is-solid", on);
          el.toggleAttribute("inert", !on); // only the current pair is focusable / read by AT
        });
        panelEls.forEach((el, i) => el.toggleAttribute("inert", i !== idx));
        count.textContent = String(idx + 1).padStart(2, "0");
        solid = idx;
      }
    };

    let queued = false;
    let raf = 0;
    const frame = () => {
      queued = false;
      const p = progress();
      if (p !== lastP) {
        lastP = p;
        render(p);
      }
    };
    const schedule = () => {
      if (!queued) {
        queued = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const refresh = () => {
      measure();
      lastP = -1;
      schedule();
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    const ro = new ResizeObserver(refresh);
    if (pairEls[0]) ro.observe(pairEls[0]);
    if (document.fonts?.ready) document.fonts.ready.then(refresh);
    measure();
    render(progress());
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [pairs]);

  return (
    <section aria-labelledby="industries-heading" className="ind">
      <div className="ind__head">
        <span className="ind__label">{t("sectors_tag")}</span>
        <h2 id="industries-heading" className="ind__h2">{t("industries_subtitle")}</h2>
        <p className="ind__lede">{t("industries_desc")}</p>
      </div>

      <div ref={trackRef} className="ind__track">
        <div className="ind__stage">
          <div ref={photosRef} className="ind__photos">
            {pairs.map((pair, i) => (
              <div key={i} className="ind__panel">
                {pair.map((item) => (
                  <button key={item.title} type="button" className={`ind__set ind__set--${item.photos.length}`} onClick={onExplore} aria-label={`${item.title}: ${item.alt}`}>
                    {item.photos.map((src, k) => (
                      <span key={src} className={`ind__photo ind__photo--${k}`}>
                        <img src={src} alt="" draggable={false} loading="lazy" decoding="async" />
                      </span>
                    ))}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div ref={namesRef} className="ind__names">
            {pairs.map((pair, i) => (
              <div key={i} className="ind__pair">
                {pair.map((item) => (
                  <button key={item.title} type="button" className="ind__name" onClick={onExplore}>
                    <span className="ind__word">{t(item.title)}</span>
                    <span className="ind__desc">{t(item.desc)}</span>
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="ind__counter" aria-hidden="true">
            <span ref={countRef}>01</span>
            <span className="of">/ {String(steps).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      <div className="ind__foot">
        <button type="button" className="ind__pill" onClick={onExplore}>
          {t("explore_all_sectors")}
        </button>
      </div>
    </section>
  );
});
