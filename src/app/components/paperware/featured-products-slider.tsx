import React from "react";
import "./featured-products-slider.css";
import pFoodBox from "../../../assets/products/takeaway-food-box.webp";
import pChowmein from "../../../assets/products/chowmein-boxes.webp";
import pCup from "../../../assets/industries/cafe-cup.webp";
import pCookie from "../../../assets/products/cookie-boxes.webp";
import pGiftBag from "../../../assets/products/gift-bags.webp";
import pConfectionery from "../../../assets/products/confectionery-boxes.webp";
import pTissue from "../../../assets/products/tissue-box-rose.webp";
import pMedicine from "../../../assets/products/medicine-boxes.webp";
import pCarryBag from "../../../assets/products/carry-bag-pink.webp";
import pCalendar from "../../../assets/products/desk-calendars.webp";
import pBrochure from "../../../assets/products/brochures.webp";
import pStickers from "../../../assets/products/stickers.webp";

type Tile = { name: string; photo: string; alt: string; hero?: boolean };

// Same 12 real products as the approved demo. The chowmein box is the hero the camera pulls back from.
const TILES: Tile[] = [
  { name: "Takeaway food box", photo: pFoodBox, alt: "Takeaway food box" },
  { name: "Chowmein box", photo: pChowmein, alt: "Chowmein box", hero: true },
  { name: "Paper cup", photo: pCup, alt: "Ripple paper cup" },
  { name: "Cookie box", photo: pCookie, alt: "Cookie box" },
  { name: "Gift bag", photo: pGiftBag, alt: "Gift bag" },
  { name: "Confectionery box", photo: pConfectionery, alt: "Confectionery box" },
  { name: "Tissue box", photo: pTissue, alt: "Tissue box" },
  { name: "Medicine box", photo: pMedicine, alt: "Medicine box" },
  { name: "Carry bag", photo: pCarryBag, alt: "Carry bag" },
  { name: "Desk calendar", photo: pCalendar, alt: "Desk calendar" },
  { name: "Brochure", photo: pBrochure, alt: "Brochure" },
  { name: "Stickers", photo: pStickers, alt: "Stickers" },
];
const HERO = TILES.find((t) => t.hero) ?? TILES[0];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

interface LegacyProduct {
  id: string;
  name: string;
  image: string;
  [key: string]: unknown;
}

interface FeaturedProductsSliderProps {
  /** Opens the products page (tile click). */
  onProducts?: () => void;
  /** Opens the quote page ("Get a quote"). */
  onQuote?: () => void;
  /** Kept for compatibility with older callers; the grid shows a fixed set of real photos. */
  products?: LegacyProduct[];
  onViewProduct?: (productId: string) => void;
}

/**
 * Featured products: "Zoom out" scroll story. The stage pins for the section's height. At progress 0
 * the grid is scaled so the hero tile covers the viewport; as the user scrolls the grid eases back to
 * scale 1 and settles under the heading. Every frame is derived from the scroll position (no timers),
 * so it also runs under prefers-reduced-motion: the user drives it. Only transform/opacity are written.
 */
export const FeaturedProductsSlider = React.memo(function FeaturedProductsSlider({
  onProducts,
  onQuote,
}: FeaturedProductsSliderProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const headRef = React.useRef<HTMLDivElement>(null);
  const gridRef = React.useRef<HTMLDivElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const capRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const head = headRef.current;
    const grid = gridRef.current;
    const hero = heroRef.current;
    const cap = capRef.current;
    if (!section || !stage || !head || !grid || !hero || !cap) return;

    const names = Array.from(grid.querySelectorAll<HTMLElement>(".fp__name"));
    // Geometry at scale 1: hero photo rect and grid origin, both relative to the stage.
    let m = { hx: 0, hy: 0, hw: 1, hh: 1, gx: 0, gy: 0 };
    let settled = false;
    let lastP = -1;

    const measure = () => {
      grid.style.transform = "none";
      const st = stage.getBoundingClientRect();
      const g = grid.getBoundingClientRect();
      const h = hero.getBoundingClientRect();
      m = { hx: h.left - g.left, hy: h.top - g.top, hw: h.width || 1, hh: h.height || 1, gx: g.left - st.left, gy: g.top - st.top };
    };
    const progress = () => {
      const r = section.getBoundingClientRect();
      const span = r.height - stage.getBoundingClientRect().height;
      return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
    };
    const render = (raw: number) => {
      const st = stage.getBoundingClientRect();
      const vw = st.width;
      const vh = st.height;
      const p = easeInOut(clamp((raw - 0.08) / 0.72, 0, 1));
      const cover = Math.max(vw / m.hw, vh / m.hh) * 1.02; // scale at which the hero covers the stage
      const scale = lerp(cover, 1, p);
      // Grid origin on screen (transform-origin is 0 0); the hero centre must sit at the stage centre.
      const gx = st.left + m.gx;
      const gy = st.top + m.gy;
      const heroCx = gx + (m.hx + m.hw / 2) * scale;
      const heroCy = gy + (m.hy + m.hh / 2) * scale;
      const tx = lerp(st.left + vw / 2 - heroCx, 0, p);
      const ty = lerp(st.top + vh / 2 - heroCy, 0, p);
      grid.style.transform = `translate3d(${tx.toFixed(2)}px,${ty.toFixed(2)}px,0) scale(${scale.toFixed(4)})`;

      // Names and heading fade in near the end; the caption fades out early.
      const late = clamp((raw - 0.66) / 0.22, 0, 1);
      const lateStr = late.toFixed(3);
      names.forEach((n) => (n.style.opacity = lateStr));
      head.style.opacity = lateStr;
      head.style.transform = `translate3d(0,${((1 - late) * 14).toFixed(1)}px,0)`;
      const early = 1 - clamp((raw - 0.04) / 0.16, 0, 1);
      cap.style.opacity = early.toFixed(3);
      cap.style.transform = `translate3d(0,${((1 - early) * 24).toFixed(1)}px,0)`;

      const nowSettled = late > 0.5;
      if (nowSettled !== settled) {
        settled = nowSettled;
        grid.classList.toggle("is-settled", settled);
        // Heading only reachable once it is visible.
        head.toggleAttribute("inert", !settled);
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
      render(progress()); // same task as measure: no painted frame at transform none
    };

    refresh();
    const ro = new ResizeObserver(refresh);
    ro.observe(stage);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh);
    const fontsReady = typeof document !== "undefined" && document.fonts ? document.fonts.ready : null;
    fontsReady?.then(refresh).catch(() => {});
    const imgs = Array.from(grid.querySelectorAll("img"));
    imgs.forEach((img) => { if (!img.complete) img.addEventListener("load", refresh, { once: true }); });

    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="fp" aria-label="Featured products">
      <div ref={stageRef} className="fp__stage">
        <div ref={headRef} className="fp__head">
          <div>
            <p className="fp__eyebrow"><span className="fp__dot" aria-hidden="true" />Featured products</p>
            <h2 className="fp__title">One of many.</h2>
          </div>
          <button type="button" className="fp__cta" onClick={onQuote}>Get a quote</button>
        </div>

        <div ref={gridRef} className="fp__grid">
          {TILES.map((t) => (
            <article key={t.name} className="fp__tile">
              <button type="button" className="fp__hit" onClick={onProducts} aria-label={`${t.name}: see all products`}>
                <div ref={t.hero ? heroRef : undefined} className="fp__ph">
                  <img
                    src={t.photo}
                    alt={t.alt}
                    width={999}
                    height={1250}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                </div>
                <span className="fp__name">{t.name}</span>
              </button>
              <button type="button" className="fp__quote" onClick={onQuote} aria-label={`Get a quote for ${t.name}`}>
                Get a quote
              </button>
            </article>
          ))}
        </div>

        <div ref={capRef} className="fp__cap" aria-hidden="true">
          <h2>{HERO.name}</h2>
          <p>Start with one. Scroll to see the rest.</p>
        </div>
      </div>
    </section>
  );
});
