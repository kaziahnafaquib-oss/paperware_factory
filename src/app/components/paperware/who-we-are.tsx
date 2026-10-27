import React from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";
import imgCup from "figma:asset/49b7c1ac36cc61c1c728abd7230eab96c50bea6c.webp";
import pFoodBox from "figma:asset/products/takeaway-food-box.webp";
import pGiftBags from "figma:asset/products/gift-bags.webp";
import pTissue from "figma:asset/products/tissue-box-floral.webp";
import pCookie from "figma:asset/products/cookie-boxes.webp";

// Real product shots that drift past at their own speeds while the stage is pinned (parallax layers).
const FLOATERS = [
  { src: pFoodBox, cls: "left-[4vw] md:left-[9vw] top-[30vh] w-[26vw] md:w-[13vw] max-w-[220px]", from: 70, to: -40, rot: [-14, 6], speed: 1 },
  { src: pGiftBags, cls: "right-[2vw] md:right-[30vw] top-[36vh] md:top-[26vh] w-[22vw] md:w-[11vw] max-w-[190px]", from: 110, to: -70, rot: [12, -8], speed: 1.4 },
  { src: pTissue, cls: "hidden md:block left-[46vw] md:left-[38vw] top-[48vh] md:top-[52vh] w-[20vw] md:w-[10vw] max-w-[170px]", from: 90, to: -30, rot: [8, -16], speed: 0.8 },
  { src: pCookie, cls: "hidden md:block right-[8vw] md:right-[4vw] top-[60vh] md:top-[58vh] w-[22vw] md:w-[12vw] max-w-[200px]", from: 130, to: -60, rot: [-6, 14], speed: 1.2 },
] as const;

/** A product photo on its own parallax track, scrubbed by the section progress. */
function Floater({ progress, f }: { progress: MotionValue<number>; f: (typeof FLOATERS)[number] }) {
  const y = useTransform(progress, [0.08, 0.5 + 0.4 / f.speed], [`${f.from}vh`, `${f.to}vh`]);
  const rotate = useTransform(progress, [0.08, 0.9], [f.rot[0], f.rot[1]]);
  const opacity = useTransform(progress, [0.08, 0.2, 0.9, 1], [0, 1, 1, 0.85]);
  return (
    <motion.div aria-hidden="true" style={{ y, rotate, opacity }} className={`absolute will-change-transform ${f.cls}`}>
      <img src={f.src} alt="" draggable={false} loading="lazy" decoding="async" className="w-full h-auto rounded-[18px] shadow-[0_30px_50px_-20px_rgba(17,17,17,0.45)]" />
    </motion.div>
  );
}

interface WhoWeAreProps {
  onReadMore: () => void;
}

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  image: string;
}

const STATEMENT =
  "We form, print and finish paper cups, food boxes and bags in Dhaka — with your brand on every one.";
const WORDS = STATEMENT.split(" ");

// Scroll timeline (0..1 of the pinned section)
type Range = [number, number];
const T: Record<"titleIn" | "ink" | "cup" | "words" | "bg" | "cta", Range> = {
  titleIn: [0, 0.38],
  ink: [0.1, 0.42],
  cup: [0.16, 0.56],
  words: [0.5, 0.86],
  bg: [0.58, 1],
  cta: [0.86, 0.96],
};

/** One word of the statement: dim until the scrollbar reaches it. */
function ScrubWord({ progress, start, end, children }: { progress: MotionValue<number>; start: number; end: number; children: string }) {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-transform mr-[0.26em] last:mr-0">
      {children}
    </motion.span>
  );
}

function useTeam() {
  const [team, setTeam] = React.useState<TeamMember[]>([]);
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/images/team`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const data = await res.json();
        if (!cancelled && data?.success && Array.isArray(data.images) && data.images.length > 0) {
          setTeam(data.images.map((img: any) => ({ id: img.id, name: img.name, role: img.role || "Team member", image: img.url })));
        }
      } catch {
        /* no uploaded photos: the section is complete without them */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return team;
}

function TeamStrip({ team }: { team: TeamMember[] }) {
  if (team.length === 0) return null;
  return (
    <div className="bg-[#fabf37] text-[#111] px-4 md:px-12 pb-16">
      <ul className="max-w-7xl mx-auto flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:thin]" aria-label="Our team">
        {team.map((m) => (
          <li key={m.id} className="snap-start shrink-0 w-[200px] md:w-[240px]">
            <div className="aspect-[4/5] rounded-[20px] overflow-hidden bg-[#e3d1ae]">
              <ImageWithFallback src={m.image} alt={m.name} className="w-full h-full object-cover" />
            </div>
            <p className="mt-3 text-sm font-black">{m.name}</p>
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#111]/70">{m.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ctaClass =
  "group inline-flex items-center gap-4 min-h-[48px] pl-6 pr-2 py-2 rounded-full bg-[#111] text-[#f6f1e7] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#f6f1e7] hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fabf37]";

function ReadStory({ onReadMore }: { onReadMore: () => void }) {
  return (
    <button type="button" onClick={onReadMore} className={ctaClass}>
      Read our story
      <span className="size-9 rounded-full bg-[#fabf37] text-[#111] flex items-center justify-center group-hover:bg-[#111] group-hover:text-[#fabf37]">
        <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" aria-hidden="true" />
      </span>
    </button>
  );
}

const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[radial-gradient(circle,rgba(17,17,17,0.6)_0.6px,transparent_0.6px)] bg-[size:22px_22px]"
  />
);

const titleClass = "font-black uppercase tracking-[-0.04em] leading-[0.85] whitespace-nowrap text-[clamp(44px,10.5vw,150px)]";

/* ------------------------------------------------------------------ */
/* Reduced motion: the same content, static and in normal flow.        */
/* ------------------------------------------------------------------ */
function StaticWhoWeAre({ onReadMore, team }: { onReadMore: () => void; team: TeamMember[] }) {
  return (
    <section aria-labelledby="who-we-are-heading" className="relative bg-[#f6f1e7] text-[#111] [content-visibility:visible]">
      <Grain />
      <div className="relative max-w-7xl mx-auto px-4 md:px-12 py-20 md:py-28">
        <h2 id="who-we-are-heading" className={titleClass}>
          Who we are
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <p className="md:col-span-7 text-[clamp(22px,2.6vw,38px)] font-bold leading-[1.15]">{STATEMENT}</p>
          <div className="md:col-span-5 flex justify-center">
            <img src={imgCup} alt="A plain white Paperware Factory paper cup" className="w-[52vw] max-w-[360px] h-auto" />
          </div>
        </div>
        <ul className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4" aria-label="Some of what we make">
          {FLOATERS.map((f, i) => (
            <li key={i} className="rounded-[18px] overflow-hidden bg-[#fabf37]">
              <img src={f.src} alt="" loading="lazy" decoding="async" className="w-full h-auto" />
            </li>
          ))}
        </ul>
        <div className="mt-12">
          <ReadStory onReadMore={onReadMore} />
        </div>
      </div>
      <TeamStrip team={team} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Pinned scrollytelling                                               */
/* ------------------------------------------------------------------ */
export function WhoWeAreSection({ onReadMore }: WhoWeAreProps) {
  const reduced = useReducedMotion() ?? false;
  const team = useTeam();

  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Title: arrives huge, settles to its resting size and position at the top of the stage.
  const titleScale = useTransform(p, T.titleIn, [1.9, 1]);
  const titleY = useTransform(p, T.titleIn, ["34vh", "0vh"]);
  const inkClip = useTransform(p, T.ink, ["inset(100% 0 0 0)", "inset(0% 0 0 0)"]);

  // Cup: rises from below the fold, turning in 3D, then lands.
  const cupY = useTransform(p, T.cup, ["115vh", "0vh"]);
  const cupRotateY = useTransform(p, [T.cup[0], T.cup[1] + 0.06], [80, 0]);
  const cupRotateZ = useTransform(p, [T.cup[0], 0.4, T.cup[1]], [-32, 12, 0]);
  const cupScale = useTransform(p, T.cup, [0.55, 1]);
  const cupShadow = useTransform(p, T.cup, [0, 0.35]);

  // Background warms from cream to brand yellow at the end.
  const bg = useTransform(p, T.bg, ["#f6f1e7", "#fabf37"]);

  const ctaOpacity = useTransform(p, T.cta, [0, 1]);
  const ctaY = useTransform(p, T.cta, [24, 0]);
  const ctaPointer = useTransform(p, (v) => (v > T.cta[0] + 0.02 ? "auto" : "none"));

  const hintOpacity = useTransform(p, [0, 0.08], [1, 0]);

  if (reduced) return <StaticWhoWeAre onReadMore={onReadMore} team={team} />;

  const wordStep = (T.words[1] - T.words[0]) / WORDS.length;

  return (
    <>
    <section
      ref={sectionRef}
      aria-labelledby="who-we-are-heading"
      className="relative bg-[#f6f1e7] text-[#111] h-[230svh] md:h-[290svh] [content-visibility:visible]"
    >
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 h-svh overflow-hidden">
        <Grain />

        {/* Scroll hint */}
        <motion.p
          aria-hidden="true"
          style={{ opacity: hintOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-[#a16207]"
        >
          Keep scrolling
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex"
          >
            <ArrowDown className="size-3.5" />
          </motion.span>
        </motion.p>

        {/* Parallax product photos (behind the title and cup) */}
        {FLOATERS.map((f, i) => (
          <Floater key={i} progress={p} f={f} />
        ))}

        {/* Title: outline underneath, ink-filled copy clipped on top */}
        <motion.div
          style={{ scale: titleScale, y: titleY, transformOrigin: "50% 50%" }}
          className="absolute inset-x-0 top-[14vh] md:top-[16vh] flex justify-center will-change-transform z-10"
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className={`${titleClass} block text-transparent [-webkit-text-stroke:1.5px_#111] md:[-webkit-text-stroke:2px_#111]`}
            >
              Who we are
            </span>
            <motion.h2
              id="who-we-are-heading"
              style={{ clipPath: inkClip }}
              className={`${titleClass} absolute inset-0 text-[#111]`}
            >
              Who we are
            </motion.h2>
          </div>
        </motion.div>

        {/* Cup */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[7vw] top-[27vh] md:top-[27vh] z-20 w-[54vw] max-w-[300px] md:w-[32vw] md:max-w-[440px] [perspective:1200px]"
        >
          <motion.div
            style={{ y: cupY, rotateY: cupRotateY, rotateZ: cupRotateZ, scale: cupScale, transformOrigin: "50% 80%" }}
            className="will-change-transform [transform-style:preserve-3d]"
          >
            <img src={imgCup} alt="" className="w-full h-auto drop-shadow-[0_40px_50px_rgba(17,17,17,0.35)]" draggable={false} />
          </motion.div>
          <motion.div
            style={{ opacity: cupShadow, scaleX: cupScale }}
            className="mx-auto -mt-4 h-5 w-[70%] rounded-[50%] bg-[#111] blur-md"
          />
        </div>

        {/* Statement, scrubbed word by word */}
        <p
          aria-label={STATEMENT}
          className="absolute z-20 left-4 right-4 md:left-[8vw] md:right-auto bottom-[28vh] md:bottom-[18vh] md:max-w-[44vw] text-[clamp(21px,2.5vw,38px)] font-bold leading-[1.15]"
        >
          <span aria-hidden="true">
            {WORDS.map((w, i) => (
              <ScrubWord key={`${w}-${i}`} progress={p} start={T.words[0] + i * wordStep} end={T.words[0] + (i + 1.4) * wordStep}>
                {w}
              </ScrubWord>
            ))}
          </span>
        </p>

        {/* CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, y: ctaY, pointerEvents: ctaPointer }}
          className="absolute z-20 left-4 md:left-[8vw] bottom-[17vh] md:bottom-[8vh]"
        >
          <ReadStory onReadMore={onReadMore} />
        </motion.div>
      </motion.div>
    </section>
    {/* Admin-uploaded team photos follow the pinned stage, in normal flow */}
    <TeamStrip team={team} />
    </>
  );
}
