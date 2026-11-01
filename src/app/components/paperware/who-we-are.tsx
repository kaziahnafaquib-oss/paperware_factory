import React from "react";
import "./who-we-are.css";
import imgCup from "../../../assets/cutouts/cup.webp";
import imgWave from "../../../assets/cutouts/cup-wave-yellow.webp";
import imgRipple from "../../../assets/cutouts/cup-ripple-orange.webp";
import imgStripe from "../../../assets/cutouts/cup-stripe-orange.webp";
import imgBag from "../../../assets/cutouts/carry-bag-kraft.webp";
import pCarryBag from "../../../assets/products/carry-bag-pink.webp";
import pFoodBox from "../../../assets/products/takeaway-food-box.webp";
import pChowmein from "../../../assets/products/chowmein-boxes.webp";
import pCookie from "../../../assets/products/cookie-boxes.webp";
import pGiftBags from "../../../assets/products/gift-bags.webp";
import pConfectionery from "../../../assets/products/confectionery-boxes.webp";
import pTissue from "../../../assets/products/tissue-boxes.webp";
import pMedicine from "../../../assets/products/medicine-boxes.webp";

/** Finale strip: bags, boxes and food packaging (no cups: the cups had their own chapters). Owner request, 1 Nov 2026. */
const FINALE_PRODUCTS = [
  { src: pCarryBag, alt: "Printed paper carry bag" },
  { src: pFoodBox, alt: "Takeaway food box" },
  { src: pChowmein, alt: "Chowmein boxes" },
  { src: pCookie, alt: "Cookie boxes" },
  { src: pGiftBags, alt: "Gift bags" },
  { src: pConfectionery, alt: "Confectionery boxes" },
  { src: pTissue, alt: "Tissue boxes" },
  { src: pMedicine, alt: "Medicine boxes" },
];

/**
 * "Who we are" as an Apple-style product story (ported from the approved demo).
 * One tall section, a sticky 100svh stage, and five chapters rendered directly from scroll
 * progress: transforms and opacity only, written straight to the DOM on each scroll frame so
 * the scrub has zero lag. There is no idle loop, and it is user-driven motion, so it runs
 * regardless of prefers-reduced-motion (the owner asked for that explicitly).
 *
 * Chapters (progress 0..1 over the section):
 *   1 Intro      0.00 – 0.17   cup emerges from darkness
 *   2 Close-up   0.17 – 0.40   cup fills the frame, "Every band, your colours."
 *   3 Variants   0.40 – 0.67   wave / ripple / stripe, one at a time
 *   4 Bag        0.67 – 0.84   stage warms to off-white, the carry bag drops in
 *   5 Finale     0.84 – 1.00   auto-scrolling strip of bags/boxes + "Your brand, on our paper." + actions
 */

interface WhoWeAreProps {
  /** Kept for call-site compatibility; the finale no longer links to the story page. */
  onReadMore?: () => void;
  onQuote?: () => void;
  onProducts?: () => void;
}

/* ---------- easing helpers ---------- */
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const smooth = (t: number) => { t = clamp01(t); return t * t * (3 - 2 * t); };
const easeOut = (t: number) => { t = clamp01(t); return 1 - Math.pow(1 - t, 3); };
/** 0→1 between a..b */
const win = (p: number, a: number, b: number) => smooth((p - a) / (b - a));
/** in a..b, hold, out c..d */
const hold = (p: number, a: number, b: number, c: number, d: number) => win(p, a, b) * (1 - win(p, c, d));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
type RGB = [number, number, number];
const mix = (c1: RGB, c2: RGB, t: number) =>
  `rgb(${Math.round(lerp(c1[0], c2[0], t))},${Math.round(lerp(c1[1], c2[1], t))},${Math.round(lerp(c1[2], c2[2], t))})`;

const DARK: RGB = [11, 11, 11];
const LIGHT: RGB = [245, 242, 236];
const WHITE: RGB = [255, 255, 255];
const FG_D: RGB = [255, 255, 255];
const FG_L: RGB = [20, 18, 14];

interface ObjState { x?: number; y?: number; s?: number; rx?: number; ry?: number; rz?: number; o?: number; sh?: number }

function setObj(el: HTMLElement, { x = 0, y = 0, s = 1, rx = 0, ry = 0, rz = 0, o = 1, sh = 0 }: ObjState) {
  el.style.opacity = o.toFixed(3);
  el.style.transform =
    `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), 0) ` +
    `scale(${s.toFixed(4)}) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg)`;
  (el.firstElementChild as HTMLElement).style.opacity = sh.toFixed(3);
  el.style.visibility = o <= 0.001 ? "hidden" : "visible";
}

function setLines(arr: HTMLElement[], p: number, a: number, b: number, c: number, d: number, stagger = 0.025, rise = 28) {
  arr.forEach((el, i) => {
    const i0 = a + i * stagger, i1 = b + i * stagger;
    const vin = easeOut((p - i0) / (i1 - i0));
    const vout = win(p, c, d);
    const o = vin * (1 - vout);
    el.style.opacity = o.toFixed(3);
    el.style.transform = `translate3d(0, ${((1 - vin) * rise - vout * rise * 0.6).toFixed(1)}px, 0)`;
    el.style.visibility = o <= 0.001 ? "hidden" : "visible";
  });
}

const ACTIONS_SELECTOR = "[data-line]";

/* ---------- component ---------- */
export function WhoWeAreSection({ onQuote, onProducts }: WhoWeAreProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const heroRef = React.useRef<HTMLDivElement>(null);
  const waveRef = React.useRef<HTMLDivElement>(null);
  const rippleRef = React.useRef<HTMLDivElement>(null);
  const stripeRef = React.useRef<HTMLDivElement>(null);
  const bagRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const copyIntroRef = React.useRef<HTMLDivElement>(null);
  const copyCloseRef = React.useRef<HTMLDivElement>(null);
  const capWaveRef = React.useRef<HTMLDivElement>(null);
  const capRippleRef = React.useRef<HTMLDivElement>(null);
  const capStripeRef = React.useRef<HTMLDivElement>(null);
  const copyBagRef = React.useRef<HTMLDivElement>(null);
  const copyFinaleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const section = sectionRef.current, stage = stageRef.current, bgLight = bgRef.current, glow = glowRef.current;
    const hero = heroRef.current, wave = waveRef.current, ripple = rippleRef.current, stripe = stripeRef.current, bag = bagRef.current, marquee = marqueeRef.current;
    const copies = {
      intro: copyIntroRef.current, close: copyCloseRef.current,
      capWave: capWaveRef.current, capRipple: capRippleRef.current, capStripe: capStripeRef.current,
      bag: copyBagRef.current, finale: copyFinaleRef.current,
    };
    if (!section || !stage || !bgLight || !glow || !hero || !wave || !ripple || !stripe || !bag || !marquee) return;
    if (Object.values(copies).some((c) => !c)) return;
    const lines = Object.fromEntries(
      Object.entries(copies).map(([k, el]) => [k, Array.from((el as HTMLElement).querySelectorAll<HTMLElement>(ACTIONS_SELECTOR))]),
    ) as Record<keyof typeof copies, HTMLElement[]>;

    // ---------- viewport metrics ----------
    let vw = 0, vh = 0, heroH = 440, mobile = false, cyOff = 0;
    function measure() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      mobile = vw < 721;
      // The fixed site header (ticker + floating nav) overlays the top of the stage: ~108px desktop, ~96px mobile.
      // Centre the story in the visible area below it and size the hero from that usable height.
      const header = mobile ? 96 : 108;
      cyOff = Math.round(header / 2);
      heroH = Math.round(Math.min((vh - header) * 0.56, vw * 0.62, 620));
      stage!.style.setProperty("--hero-h", heroH + "px");
      stage!.style.setProperty("--cy", `calc(50% + ${cyOff}px)`);
    }

    function render(p: number) {
      // ----- stage colour -----
      const warm = win(p, 0.655, 0.72);
      // Hand off into the next (white) section: the off-white eases to white over the last stretch.
      const toWhite = win(p, 0.965, 1.0);
      bgLight.style.opacity = warm.toFixed(3);
      bgLight.style.backgroundColor = mix(LIGHT, WHITE, toWhite);
      const fg = mix(FG_D, FG_L, warm);
      stage!.style.setProperty("--fg", fg);
      stage!.style.setProperty("--fg-muted", warm < 0.5 ? "rgba(255,255,255,.62)" : "rgba(20,18,14,.58)");
      // soft light behind product
      glow.style.opacity = (hold(p, 0.03, 0.14, 0.6, 0.68) * 0.9 * (1 - warm)).toFixed(3);

      const lineUpY = -heroH * 0.2; // line-up sits a little above centre so the finale copy fits below it

      // ----- hero cup -----
      {
        let x = 0, y = 0, s = 1, rx = 0, ry = 0, rz = 0, o = 0, sh = 0;
        // Chapter 1: emerge from darkness (resting slightly above centre so the intro copy fits below)
        const a = win(p, 0.0, 0.12);
        o = easeOut(a / 0.9);
        s = lerp(0.32, 1.0, a);
        y = lerp(heroH * 0.08, -heroH * 0.12, a);
        sh = a * 0.5;
        // Chapter 2: close-up, scale up + gentle tilt
        const c = win(p, 0.17, 0.36);
        const bigS = Math.max((vh * 1.25) / heroH, 1.6);
        s = lerp(s, bigS, c);
        x = lerp(0, mobile ? vw * 0.16 : vw * 0.14, c);
        y = lerp(y, mobile ? -vh * 0.1 : vh * 0.02, c);
        rz = lerp(0, 10, c);
        ry = lerp(0, -16, c);
        rx = lerp(0, 7, c);
        sh = lerp(sh, 0, c);
        // Chapter 3 start: hero slides off and fades
        const out = win(p, 0.4, 0.46);
        o *= 1 - out;
        x = lerp(x, x + vw * 0.35, out);
        s = lerp(s, bigS * 1.08, out);
        setObj(hero, { x, y, s, rx, ry, rz, o, sh });
      }

      // ----- variants, one at a time -----
      const variant = (el: HTMLElement, a: number, b: number, c: number, d: number) => {
        const vin = win(p, a, b), vout = win(p, c, d);
        const o = vin * (1 - vout);
        const s = lerp(0.72, 1.0, easeOut(vin)) * lerp(1, 1.06, vout);
        const y = lerp(heroH * 0.12, 0, easeOut(vin)) - vout * heroH * 0.1;
        const ry = lerp(14, 0, easeOut(vin)) - vout * 10;
        setObj(el, { y, s, ry, o, sh: o * 0.55 });
      };
      variant(wave, 0.43, 0.49, 0.515, 0.545);
      variant(ripple, 0.515, 0.57, 0.595, 0.625);
      variant(stripe, 0.595, 0.65, 0.675, 0.71);

      // ----- bag -----
      {
        const vin = win(p, 0.67, 0.75);
        const o = easeOut(vin);
        let s = lerp(0.9, 1.0, easeOut(vin));
        let y = lerp(vh * 0.55, 0, easeOut(vin));
        const rx = lerp(8, 0, easeOut(vin));
        let sh = easeOut(vin) * 0.5;
        // finale: the bag lifts out and hands over to the product strip
        const f = win(p, 0.84, 0.9);
        s = lerp(s, 0.92, f);
        y = lerp(y, -heroH * 0.35, f);
        sh = lerp(sh, 0, f);
        setObj(bag, { y, s, rx, o: o * (1 - f), sh });
      }

      // ----- finale product strip (CSS keeps it scrolling; scroll only fades/lifts it) -----
      {
        const f = easeOut(win(p, 0.87, 0.95));
        marquee.style.opacity = f.toFixed(3);
        marquee.style.visibility = f <= 0.001 ? "hidden" : "visible";
        marquee.style.transform = `translate3d(0, ${(lineUpY + (1 - f) * 40).toFixed(1)}px, 0)`;
      }

      // ----- copy -----
      setLines(lines.intro, p, 0.035, 0.095, 0.145, 0.175, 0.03);
      setLines(lines.close, p, 0.24, 0.3, 0.365, 0.395, 0.0, 36);
      setLines(lines.capWave, p, 0.455, 0.49, 0.515, 0.535, 0, 18);
      setLines(lines.capRipple, p, 0.535, 0.57, 0.595, 0.615, 0, 18);
      setLines(lines.capStripe, p, 0.615, 0.65, 0.675, 0.7, 0, 18);
      setLines(lines.bag, p, 0.72, 0.78, 0.815, 0.845, 0, 36);
      setLines(lines.finale, p, 0.9, 0.95, 1.5, 1.6, 0.03, 28);
    }

    // ---------- scroll driver (no idle loop; one frame per scroll/resize) ----------
    let queued = false, lastP = -1, raf = 0;
    function progress() {
      const r = section!.getBoundingClientRect();
      const total = r.height - vh;
      return total > 0 ? clamp01(-r.top / total) : 0;
    }
    function frame() {
      queued = false;
      const p = progress();
      if (p !== lastP) { lastP = p; render(p); }
    }
    function schedule() { if (!queued) { queued = true; raf = requestAnimationFrame(frame); } }
    function onResize() { measure(); lastP = -1; schedule(); }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", onResize);
    measure();
    render(progress());
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="who-we-are-heading" className="wwa">
      <div ref={stageRef} className="wwa__stage">
        <div ref={bgRef} className="wwa__bg" aria-hidden="true" />
        <div ref={glowRef} className="wwa__glow" aria-hidden="true" />

        {/* objects */}
        <div ref={heroRef} className="wwa__obj">
          <div className="wwa__shadow" />
          <img src={imgCup} alt="Paperware Factory branded paper cup" draggable={false} decoding="async" />
        </div>
        <div ref={waveRef} className="wwa__obj">
          <div className="wwa__shadow" />
          <img src={imgWave} alt="Paper cup with yellow wave print" draggable={false} loading="lazy" decoding="async" />
        </div>
        <div ref={rippleRef} className="wwa__obj">
          <div className="wwa__shadow" />
          <img src={imgRipple} alt="Orange ripple-wall paper cup" draggable={false} loading="lazy" decoding="async" />
        </div>
        <div ref={stripeRef} className="wwa__obj">
          <div className="wwa__shadow" />
          <img src={imgStripe} alt="Paper cup with orange stripe print" draggable={false} loading="lazy" decoding="async" />
        </div>
        <div ref={bagRef} className="wwa__obj wwa__obj--bag">
          <div className="wwa__shadow" />
          <img src={imgBag} alt="Kraft paper carry bag with wave print" draggable={false} loading="lazy" decoding="async" />
        </div>

        <div ref={marqueeRef} className="wwa__marquee" aria-hidden="true">
          <div className="wwa__marquee-track">
            {[0, 1].map((copy) => FINALE_PRODUCTS.map((item, i) => (
              <div key={`${copy}-${i}`} className="wwa__tile">
                <img src={item.src} alt={copy === 0 ? item.alt : ""} draggable={false} loading="lazy" decoding="async" />
              </div>
            )))}
          </div>
        </div>

        {/* copy */}
        <div ref={copyIntroRef} className="wwa__copy wwa__copy--center">
          <h2 id="who-we-are-heading" className="wwa__line wwa__h1" data-line>Paper cups.</h2>
          <p className="wwa__line wwa__sub" data-line>Made in Dhaka. Printed with your brand.</p>
        </div>

        <div ref={copyCloseRef} className="wwa__copy wwa__copy--left">
          <h3 className="wwa__line wwa__h2" data-line>Every band,<br />your colours.</h3>
        </div>

        <div ref={capWaveRef} className="wwa__copy wwa__copy--caption"><p className="wwa__line wwa__cap" data-line>Wave</p></div>
        <div ref={capRippleRef} className="wwa__copy wwa__copy--caption"><p className="wwa__line wwa__cap" data-line>Ripple</p></div>
        <div ref={capStripeRef} className="wwa__copy wwa__copy--caption"><p className="wwa__line wwa__cap" data-line>Stripe</p></div>

        <div ref={copyBagRef} className="wwa__copy wwa__copy--top">
          <h3 className="wwa__line wwa__h2" data-line>And the bag<br />it goes home in.</h3>
        </div>

        <div ref={copyFinaleRef} className="wwa__copy wwa__copy--finale">
          <h3 className="wwa__line wwa__h2" data-line>Your brand,<br />on our paper.</h3>
          <div className="wwa__line wwa__actions" data-line>
            <button type="button" className="wwa__btn wwa__btn--primary" onClick={onQuote}>Request a quote</button>
            <button type="button" className="wwa__btn wwa__btn--ghost" onClick={onProducts}>See products</button>
          </div>
        </div>
      </div>
    </section>
  );
}
