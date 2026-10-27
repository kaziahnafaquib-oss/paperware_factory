import React from "react";
import { Utensils, Coffee, Hospital, Pill, Briefcase, Hotel, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion, type MotionValue } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import imgCup from "figma:asset/49b7c1ac36cc61c1c728abd7230eab96c50bea6c.webp";
import pFoodBox from "figma:asset/products/takeaway-food-box.webp";
import pPrescription from "figma:asset/products/prescription-pad.webp";
import pMedicine from "figma:asset/products/medicine-boxes.webp";
import pCalendars from "figma:asset/products/desk-calendars.webp";
import pTissue from "figma:asset/products/tissue-box-floral.webp";

// Real product shot that fits each sector (order matches getIndustries).
const PHOTOS = [pFoodBox, imgCup, pPrescription, pMedicine, pCalendars, pTissue] as const;

type Industry = { title: string; desc: string; icon: React.ComponentType<{ className?: string }>; photo: string };

const getIndustries = (t: (key: string) => string): Industry[] => [
  { title: t("restaurants"), desc: t("restaurant_desc"), icon: Utensils, photo: PHOTOS[0] },
  { title: t("cafes"), desc: t("cafe_desc"), icon: Coffee, photo: PHOTOS[1] },
  { title: t("hospitals"), desc: t("hospital_desc"), icon: Hospital, photo: PHOTOS[2] },
  { title: t("pharmaceutical"), desc: t("pharma_desc"), icon: Pill, photo: PHOTOS[3] },
  { title: t("corporate_clients"), desc: t("corporate_desc"), icon: Briefcase, photo: PHOTOS[4] },
  { title: t("hotels"), desc: t("hotel_desc"), icon: Hotel, photo: PHOTOS[5] },
];

// Alternating surfaces so the track reads as a run of printed sheets, not six identical boxes.
const SURFACES = [
  "bg-[#f6f1e7] text-[#111] border-[#e3d1ae]",
  "bg-[#111] text-[#f6f1e7] border-[#111]",
  "bg-[#fabf37] text-[#111] border-[#fabf37]",
] as const;
const INDEX_COLOR = ["text-[#e3d1ae]", "text-[#f6f1e7]/15", "text-[#111]/15"] as const;
const DESC_COLOR = ["text-zinc-700", "text-[#f6f1e7]/70", "text-[#111]/75"] as const;
const ICON_SURFACE = ["bg-[#111] text-[#fabf37]", "bg-[#fabf37] text-[#111]", "bg-[#111] text-[#fabf37]"] as const;
const RING = ["focus-visible:ring-[#111]", "focus-visible:ring-[#fabf37]", "focus-visible:ring-[#111]"] as const;

function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(() => (typeof window === "undefined" ? false : window.matchMedia(query).matches));
  React.useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

const SPRING = { stiffness: 220, damping: 18, mass: 0.6 };

/** A sector card. On a pointer device it tilts toward the cursor and the icon pops. */
function SectorCard({
  item,
  index,
  onExplore,
  tilt,
  className = "",
  progress,
}: {
  item: Industry;
  index: number;
  onExplore: () => void;
  tilt: boolean;
  className?: string;
  progress?: MotionValue<number>;
}) {
  // Photo parallax: each card's photo drifts against the track, a little faster the further right the card sits.
  const fallback = useMotionValue(0.5);
  const photoX = useTransform(progress ?? fallback, [0, 1], [40 + index * 10, -40 - index * 10]);
  const photoRotate = useTransform(progress ?? fallback, [0, 1], [-6, 6]);
  const Icon = item.icon;
  const v = index % SURFACES.length;

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, SPRING);
  const rotateY = useSpring(ry, SPRING);

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!tilt || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 16);
  };
  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onExplore}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={tilt ? { scale: 1.03 } : undefined}
      whileTap={tilt ? { scale: 0.98 } : undefined}
      style={tilt ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
      className={`group relative text-left rounded-[26px] border p-6 md:p-8 flex flex-col overflow-hidden shadow-[0_30px_60px_-30px_rgba(17,17,17,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${SURFACES[v]} ${RING[v]} ${className}`}
    >
      {/* Giant index */}
      <span
        aria-hidden="true"
        className={`absolute -right-3 -top-6 font-black leading-none tracking-[-0.06em] text-[clamp(120px,11vw,190px)] select-none ${INDEX_COLOR[v]}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <motion.span
        aria-hidden="true"
        whileHover={tilt ? { scale: 1.25, rotate: -10 } : undefined}
        transition={{ type: "spring", stiffness: 400, damping: 12 }}
        className={`relative size-14 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform ${ICON_SURFACE[v]}`}
        style={tilt ? { translateZ: 30 } : undefined}
      >
        <Icon className="size-6" />
      </motion.span>

      {/* Product photo */}
      <motion.div
        aria-hidden="true"
        style={progress ? { x: photoX, rotate: photoRotate } : undefined}
        className="absolute right-[2%] top-[17%] w-[44%] will-change-transform transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
      >
        <img src={item.photo} alt="" draggable={false} loading="lazy" decoding="async" className="w-full h-auto rounded-[16px] shadow-[0_24px_40px_-20px_rgba(17,17,17,0.5)]" />
      </motion.div>

      <div className="relative mt-auto pt-16" style={tilt ? { transform: "translateZ(20px)" } : undefined}>
        <h3 className="text-[28px] md:text-[34px] font-black uppercase tracking-tight leading-[0.95]">{item.title}</h3>
        <p className={`mt-3 text-sm md:text-[15px] leading-snug ${DESC_COLOR[v]}`}>{item.desc}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em]">
          View solutions
          <ArrowRight className="size-3.5 -rotate-45 group-hover:rotate-0 transition-transform" aria-hidden="true" />
        </span>
      </div>
    </motion.button>
  );
}

function EndCard({ onExplore, label }: { onExplore: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onExplore}
      className="group relative text-left rounded-[26px] border border-dashed border-[#111]/30 bg-white p-6 md:p-8 flex flex-col justify-between hover:bg-[#111] hover:text-[#f6f1e7] hover:border-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 w-[260px] md:w-[300px] shrink-0 snap-start min-h-[320px] md:min-h-0"
    >
      <span className="text-[11px] font-black uppercase tracking-[0.3em] text-[#a16207] group-hover:text-[#fabf37]">All sectors</span>
      <span>
        <span className="block text-[26px] md:text-[32px] font-black uppercase tracking-tight leading-[0.95]">{label}</span>
        <span className="mt-6 inline-flex items-center justify-center size-12 rounded-full bg-[#fabf37] text-[#111]">
          <ArrowRight className="size-5 -rotate-45 group-hover:rotate-0 transition-transform" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

export const Industries = React.memo(function Industries({ onExplore }: { onExplore: () => void }) {
  const { t } = useLanguage();
  const reduced = useReducedMotion() ?? false;
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const pinned = isDesktop && !reduced;
  const industries = React.useMemo(() => getIndustries(t), [t]);

  const sectionRef = React.useRef<HTMLElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const [travel, setTravel] = React.useState(0);

  // How far the track must move so its last card ends flush with the right edge.
  React.useLayoutEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      const vp = viewportRef.current;
      if (!track || !vp) return;
      setTravel(Math.max(0, track.scrollWidth - vp.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [pinned, industries]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.06, 0.94], [0, -travel]);
  const barScale = useTransform(scrollYProgress, [0.06, 0.94], [0, 1]);
  const counter = useTransform(scrollYProgress, [0.06, 0.94], [1, industries.length]);
  const counterText = useTransform(counter, (v) => String(Math.round(v)).padStart(2, "0"));

  const header = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 items-end">
      <div className="lg:col-span-8">
        <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-[#a16207] mb-4 md:mb-5">
          <span aria-hidden="true" className="h-px w-8 bg-[#a16207]" />
          {t("sectors_tag")}
        </p>
        <h2
          id="industries-heading"
          className="font-black uppercase tracking-tight leading-[0.92] text-[36px] sm:text-5xl lg:text-[56px] xl:text-[68px]"
        >
          {t("industries_subtitle")}
        </h2>
      </div>
      <p className="lg:col-span-4 text-sm md:text-base text-zinc-700 leading-relaxed lg:pb-2">{t("industries_desc")}</p>
    </div>
  );

  /* --------------------------- pinned (desktop) --------------------------- */
  if (pinned) {
    return (
      <section
        ref={sectionRef}
        aria-labelledby="industries-heading"
        className="relative bg-white text-[#111] h-[320svh] [content-visibility:visible]"
      >
        <div className="sticky top-0 h-svh overflow-hidden flex flex-col">
          <div className="max-w-7xl w-full mx-auto px-4 md:px-12 pt-[15vh] shrink-0">{header}</div>

          {/* Track */}
          <div ref={viewportRef} className="relative flex-1 min-h-0 flex items-center [perspective:1400px]">
            <motion.div
              ref={trackRef}
              style={{ x }}
              role="list"
              aria-label={t("sectors_tag")}
              className="flex items-stretch gap-6 pl-[max(16px,calc((100vw-80rem)/2+48px))] pr-12 will-change-transform h-[min(54vh,440px)]"
            >
              {industries.map((item, i) => (
                <div key={item.title} role="listitem" className="shrink-0 w-[min(34vw,380px)] flex">
                  <SectorCard item={item} index={i} onExplore={onExplore} tilt className="w-full h-full" progress={scrollYProgress} />
                </div>
              ))}
              <div role="listitem" className="flex">
                <EndCard onExplore={onExplore} label={t("explore_all_sectors")} />
              </div>
            </motion.div>
          </div>

          {/* Progress */}
          <div className="max-w-7xl w-full mx-auto px-4 md:px-12 pb-[5vh] shrink-0 flex items-center gap-5" aria-hidden="true">
            <span className="text-[11px] font-black tracking-[0.25em] tabular-nums text-[#a16207] flex items-center gap-1">
              <motion.span>{counterText}</motion.span>
              <span>/ {String(industries.length).padStart(2, "0")}</span>
            </span>
            <div className="relative flex-1 h-[3px] bg-[#e3d1ae] rounded-full overflow-hidden">
              <motion.div style={{ scaleX: barScale, transformOrigin: "0 50%" }} className="absolute inset-0 bg-[#111] rounded-full" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-zinc-500">Scroll</span>
          </div>
        </div>
      </section>
    );
  }

  /* ----------------- mobile snap row / reduced-motion grid ----------------- */
  return (
    <section
      aria-labelledby="industries-heading"
      className="relative bg-white text-[#111] py-20 md:py-28 [content-visibility:visible]"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-12">{header}</div>

      {reduced ? (
        <ul className="max-w-7xl mx-auto px-4 md:px-12 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5" aria-label={t("sectors_tag")}>
          {industries.map((item, i) => (
            <li key={item.title} className="flex">
              <SectorCard item={item} index={i} onExplore={onExplore} tilt={false} className="w-full min-h-[300px]" />
            </li>
          ))}
          <li className="flex">
            <EndCard onExplore={onExplore} label={t("explore_all_sectors")} />
          </li>
        </ul>
      ) : (
        <ul
          className="mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={t("sectors_tag")}
        >
          {industries.map((item, i) => (
            <li key={item.title} className="snap-start shrink-0 w-[78vw] max-w-[360px] flex">
              <SectorCard item={item} index={i} onExplore={onExplore} tilt={false} className="w-full min-h-[340px]" />
            </li>
          ))}
          <li className="snap-start shrink-0 flex pr-4">
            <EndCard onExplore={onExplore} label={t("explore_all_sectors")} />
          </li>
        </ul>
      )}
    </section>
  );
});
