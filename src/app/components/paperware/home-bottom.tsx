import React from "react";
import "./home-bottom.css";
import {
  SALES_EMAIL,
  SALES_PHONE_DISPLAY,
  SALES_PHONE_TEL,
  SALES_WHATSAPP_DISPLAY,
  SALES_WHATSAPP_NUMBER,
  whatsAppInquiryUrl,
} from "../../lib/inquiry";
import mCookie from "../../../assets/products/cookie-boxes.webp";
import mGiftBag from "../../../assets/products/gift-bag-purple.webp";
import mChowmein from "../../../assets/products/chowmein-boxes.webp";
import mTissue from "../../../assets/products/tissue-box-floral.webp";
import mCarryBag from "../../../assets/products/carry-bag-pink.webp";
import mConfectionery from "../../../assets/products/confectionery-boxes.webp";
import mStickers from "../../../assets/products/stickers.webp";
import mMagazines from "../../../assets/products/magazines.webp";
import tFoodBox from "../../../assets/products/takeaway-food-box.webp";
import tCup from "../../../assets/industries/cafe-cup.webp";
import tFlyers from "../../../assets/products/flyers.webp";
import tGiftBags from "../../../assets/products/gift-bags.webp";

const MARQUEE = [mCookie, mGiftBag, mChowmein, mTissue, mCarryBag, mConfectionery, mStickers, mMagazines];

const HEAD_OFFICE = "7813 Trimohoni Nandipara Main Road, Dhaka";
const HEAD_OFFICE_MAP = "https://www.google.com/maps/search/?api=1&query=7813+Trimohoni+Nandipara+Main+Road,+Dhaka";

const DISCOVER: { page: string; label: string; photo: string }[] = [
  { page: "products", label: "Full catalogue", photo: tFoodBox },
  { page: "papercups", label: "Paper cups", photo: tCup },
  { page: "manufacturing", label: "Manufacturing", photo: tFlyers },
  { page: "about", label: "About us", photo: tGiftBags },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

interface HomeBottomProps {
  onNavigate: (page: string) => void;
}

/**
 * Homepage bottom (demo option 3 "Big yellow CTA"): headline + two pills over a photo marquee,
 * four contact cards, four "Discover more" tiles. The marquee is scrubbed by scroll: progress 0 when
 * the CTA block enters at the viewport bottom, 1 when it leaves at the top. Transform only, no timers,
 * so it also runs with prefers-reduced-motion (the motion is user-driven).
 */
export const HomeBottom: React.FC<HomeBottomProps> = ({ onNavigate }) => {
  const ctaRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const tilesRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const cta = ctaRef.current;
    const track = trackRef.current;
    const tiles = tilesRef.current;
    if (!cta || !track || !tiles) return;

    const tileEls = Array.from(tiles.querySelectorAll<HTMLElement>(".hb-tile"));
    const tileImgs = tileEls.map((el) => el.querySelector<HTMLElement>("img"));
    const ease = (t: number) => 1 - (1 - t) * (1 - t) * (1 - t);

    let lastX = Number.NaN;
    const render = () => {
      const h = window.innerHeight || 1;
      const r = cta.getBoundingClientRect();
      const p = clamp((h - r.top) / (h + r.height), 0, 1);
      const max = Math.max(0, track.scrollWidth - window.innerWidth);
      const x = -p * max;
      if (x !== lastX) {
        lastX = x;
        track.style.transform = `translate3d(${x.toFixed(1)}px,0,0)`;
      }

      // Discover tiles: rise + settle 1:1 with scroll, staggered left to right.
      const tr = tiles.getBoundingClientRect();
      const tp = clamp((h - tr.top) / (h * 0.75), 0, 1);
      const n = tileEls.length || 1;
      tileEls.forEach((el, i) => {
        const start = (i / n) * 0.45;
        const u = ease(clamp((tp - start) / (1 - 0.45), 0, 1));
        const y = (1 - u) * 160;
        const s = 0.88 + 0.12 * u;
        el.style.transform = `translate3d(0,${y.toFixed(1)}px,0) scale(${s.toFixed(3)})`;
        el.style.opacity = (0.2 + 0.8 * u).toFixed(3);
        const img = tileImgs[i];
        if (img) {
          const c = el.getBoundingClientRect();
          const rel = clamp((c.top + c.height / 2) / h, 0, 1) - 0.5; // -0.5..0.5
          img.style.transform = `translate3d(0,${(rel * 36).toFixed(1)}px,0) scale(1.12)`;
        }
      });
    };

    let queued = false;
    let raf = 0;
    const schedule = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        render();
      });
    };

    render();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(track);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hb">
      <section ref={ctaRef} className="hb-cta" aria-labelledby="hb-cta-h" data-testid="home-cta">
        <div className="hb-wrap">
          <h2 id="hb-cta-h" className="hb-display">
            Your brand,
            <br />
            on our paper.
          </h2>
          <div className="hb-cta-row">
            <p className="hb-sub">From a single cup design to a full packaging line. Tell us what you need.</p>
            <div className="hb-pills">
              <button type="button" className="hb-pill hb-pill-dark" onClick={() => onNavigate("quote")}>
                Request a quote
              </button>
              <a
                className="hb-pill hb-pill-outline"
                href={whatsAppInquiryUrl("Quote request")}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="hb-marquee" aria-hidden="true">
          <div ref={trackRef} className="hb-track" data-testid="home-marquee">
            {MARQUEE.map((src) => (
              <img key={src} src={src} alt="" width={999} height={1250} loading="lazy" decoding="async" />
            ))}
          </div>
        </div>
      </section>

      <section className="hb-cards" aria-label="Contact details">
        <div className="hb-wrap">
          <ul className="hb-cards-grid">
            <li>
              <a className="hb-card" href={`tel:${SALES_PHONE_TEL}`}>
                <span className="k">Phone</span>
                <span className="v">{SALES_PHONE_DISPLAY}</span>
                <span className="d">Factory working hour: 24/7</span>
              </a>
            </li>
            <li>
              <a className="hb-card" href={`mailto:${SALES_EMAIL}`}>
                <span className="k">Email</span>
                <span className="v">
                  {/* break after the @ instead of mid-word when the card is narrow */}
                  {SALES_EMAIL.split("@")[0]}@<wbr />{SALES_EMAIL.split("@")[1]}
                </span>
                <span className="d">Quotes, artwork, questions</span>
              </a>
            </li>
            <li>
              <a className="hb-card" href={`https://wa.me/${SALES_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                <span className="k">WhatsApp</span>
                <span className="v">{SALES_WHATSAPP_DISPLAY}</span>
                <span className="d">Fastest reply</span>
              </a>
            </li>
            <li>
              <a className="hb-card" href={HEAD_OFFICE_MAP} target="_blank" rel="noopener noreferrer">
                <span className="k">Head Office</span>
                <span className="v">{HEAD_OFFICE}</span>
                <span className="d">Open in Maps</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section className="hb-discover" aria-labelledby="hb-discover-h">
        <div className="hb-wrap">
          <h3 id="hb-discover-h" className="hb-section-h">
            Discover more
          </h3>
          <ul ref={tilesRef} className="hb-tiles">
            {DISCOVER.map((tile) => (
              <li key={tile.page}>
                <button type="button" className="hb-tile" onClick={() => onNavigate(tile.page)} data-page={tile.page}>
                  <img src={tile.photo} alt="" width={999} height={1250} loading="lazy" decoding="async" />
                  <span className="t">{tile.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};
