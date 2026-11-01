import React from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  type MotionValue,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import imgCup from "figma:asset/49b7c1ac36cc61c1c728abd7230eab96c50bea6c.webp";
import pFoodBox from "figma:asset/products/takeaway-food-box.webp";
import pGiftBag from "figma:asset/products/gift-bag-purple.webp";
import pChowmein from "figma:asset/products/chowmein-boxes.webp";
import pCarryBag from "figma:asset/products/carry-bag-pink.webp";
import pStickers from "figma:asset/products/stickers.webp";

// Real product shots used as the "glyphs" between words.
const GLYPHS = [imgCup, pFoodBox, pGiftBag, pChowmein, pCarryBag, pStickers] as const;
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { projectId, publicAnonKey } from "../../../../utils/supabase/info";

interface ClientLogo {
  id: string;
  name: string;
  image: string;
}

interface PremiumClientsProps {
  clients?: ClientLogo[];
  onPageChange?: (page: string) => void;
}

const REPEATS = 4;
const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* ------------------------------------------------------------------ */
/* Giant text marquee: base speed + a boost from scroll velocity.       */
/* ------------------------------------------------------------------ */
function TextLine({
  words,
  outline = false,
  baseVelocity,
  velocityFactor,
  skew,
}: {
  words: string;
  outline?: boolean;
  baseVelocity: number;
  velocityFactor: MotionValue<number>;
  skew: MotionValue<number>;
}) {
  const baseX = useMotionValue(0);
  const direction = React.useRef(baseVelocity < 0 ? -1 : 1);
  const x = useTransform(baseX, (v) => `${wrap(-100 / REPEATS, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    const vf = velocityFactor.get();
    // Follow the scroll direction, keep rolling when the page is still.
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    const move = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(vf));
    baseX.set(baseX.get() + move);
  });

  const item = (i: number) => {
    const glyph = GLYPHS[(i + (outline ? 3 : 0)) % GLYPHS.length];
    return (
      <span key={i} className="inline-flex items-center gap-[0.3em] mr-[0.3em]">
        <span className={outline ? "text-transparent [-webkit-text-stroke:2px_#111]" : "text-[#111]"}>{words}</span>
        <span className="inline-flex size-[0.6em] rounded-full bg-[#fabf37] overflow-hidden shrink-0 ring-2 ring-[#111]">
          <img src={glyph} alt="" draggable={false} loading="lazy" decoding="async" className="w-full h-full object-cover" />
        </span>
      </span>
    );
  };

  return (
    <div className="overflow-hidden whitespace-nowrap select-none">
      <motion.div
        style={{ x, skewX: skew }}
        className="flex w-max font-black uppercase tracking-[-0.03em] leading-[1.05] text-[clamp(56px,11vw,170px)] will-change-transform"
      >
        {Array.from({ length: REPEATS }, (_, i) => item(i))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic button                                                      */
/* ------------------------------------------------------------------ */
function MagneticButton({
  children,
  onClick,
  className,
  magnetic,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
  magnetic: boolean;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 200, damping: 16, mass: 0.5 });
  const y = useSpring(my, { stiffness: 200, damping: 16, mass: 0.5 });

  const onMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!magnetic || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.35);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={magnetic ? { x, y } : undefined}
      whileTap={magnetic ? { scale: 0.96 } : undefined}
      className={className}
    >
      {children}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/* Logo rows (only when real logos exist)                               */
/* ------------------------------------------------------------------ */
function LogoTile({ client }: { client: ClientLogo }) {
  return (
    <div className="shrink-0 w-[160px] h-[88px] md:w-[190px] md:h-[100px] rounded-[18px] bg-[#f6f1e7] border border-black/5 flex items-center justify-center p-5">
      <ImageWithFallback src={client.image} alt={client.name} className="max-w-full max-h-full object-contain" />
    </div>
  );
}

function LogoMarquee({ clients, velocityFactor, baseVelocity }: { clients: ClientLogo[]; velocityFactor: MotionValue<number>; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-100 / REPEATS, 0, v)}%`);
  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() + baseVelocity * (delta / 1000) * (1 + Math.abs(velocityFactor.get())));
  });
  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div style={{ x }} className="flex gap-4 md:gap-5 w-max">
        {Array.from({ length: REPEATS }, (_, r) =>
          clients.map((client) => (
            <div key={`${client.id}-${r}`} aria-hidden={r > 0}>
              <LogoTile client={client} />
            </div>
          )),
        )}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function PremiumClients({ clients: propClients, onPageChange }: PremiumClientsProps) {
  const reduced = useReducedMotion() ?? false;
  const [clients, setClients] = React.useState<ClientLogo[]>(propClients ?? []);

  // Admin-uploaded logos only. No stock fallback.
  React.useEffect(() => {
    if (propClients && propClients.length > 0) {
      setClients(propClients);
      return;
    }
    // CMS logo endpoint is not live yet (answers 402); opt in with VITE_CMS_IMAGES=true.
    if (import.meta.env.VITE_CMS_IMAGES !== 'true') return;
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-bf34c9a5/images/logo`, {
          headers: { Authorization: `Bearer ${publicAnonKey}` },
        });
        const data = await response.json();
        if (cancelled) return;
        setClients(
          data?.success && Array.isArray(data.images) && data.images.length > 0
            ? data.images.map((img: any) => ({ id: img.id, name: img.name, image: img.url }))
            : [],
        );
      } catch {
        if (!cancelled) setClients([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [propClients]);

  const hasLogos = clients.length > 0;

  // Scroll velocity -> marquee boost + skew
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: true });
  const skew = useTransform(smoothVelocity, [-2000, 2000], [-10, 10], { clamp: true });

  const primary =
    "group inline-flex items-center justify-center gap-4 min-h-[48px] pl-6 pr-2 py-2 rounded-full bg-[#fabf37] text-[#111] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#f6f1e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]";
  const secondary =
    "inline-flex items-center justify-center min-h-[48px] px-6 py-2 rounded-full border border-[#f6f1e7]/30 text-[#f6f1e7] text-xs font-black uppercase tracking-[0.2em] hover:border-[#fabf37] hover:text-[#fabf37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]";

  return (
    <section
      aria-labelledby="clients-heading"
      className="relative bg-[#e3d1ae] text-[#111] py-16 md:py-24 overflow-x-clip [content-visibility:visible]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle,rgba(17,17,17,0.6)_0.6px,transparent_0.6px)] bg-[size:22px_22px]"
      />

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-12 mb-8 md:mb-10">
          <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-[#a16207]">
            <span aria-hidden="true" className="h-px w-8 bg-[#a16207]" />
            {hasLogos ? "Trusted by" : "Clients"}
          </p>
          <h2 id="clients-heading" className="sr-only">
            Your brand, on our paper
          </h2>
        </div>

        {/* Two giant lines moving against each other */}
        {reduced ? (
          <div aria-hidden="true" className="px-4 md:px-12 font-black uppercase tracking-[-0.03em] leading-[0.95] text-[clamp(44px,9vw,150px)]">
            <p className="text-[#111]">Your brand</p>
            <p className="text-transparent [-webkit-text-stroke:2px_#111]">On our paper</p>
          </div>
        ) : (
          <div aria-hidden="true" className="-rotate-[2deg] scale-[1.03] origin-center">
            <TextLine words="Your brand" baseVelocity={-3.5} velocityFactor={velocityFactor} skew={skew} />
            <TextLine words="On our paper" outline baseVelocity={3.5} velocityFactor={velocityFactor} skew={skew} />
          </div>
        )}

        <div className="max-w-7xl mx-auto px-4 md:px-12 mt-12 md:mt-16 space-y-10 md:space-y-12">
          {/* Logo rows (only when real logos exist) */}
          {hasLogos && (
            <div aria-label="Client logos" role="group">
              {reduced ? (
                <ul className="flex flex-wrap justify-center gap-4 md:gap-5">
                  {clients.map((client) => (
                    <li key={client.id}>
                      <LogoTile client={client} />
                    </li>
                  ))}
                </ul>
              ) : (
                <LogoMarquee clients={clients} velocityFactor={velocityFactor} baseVelocity={-1.5} />
              )}
            </div>
          )}

          {/* CTA */}
          <div className="rounded-[28px] bg-[#111] text-[#f6f1e7] p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-[#fabf37] opacity-20 blur-[90px]"
            />
            <div className="relative max-w-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#fabf37] mb-4">Become a client</p>
              <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tight leading-[0.95]">
                Send us your artwork and quantities. We reply with a quote.
              </h3>
            </div>
            <div className="relative flex flex-col sm:flex-row gap-3 shrink-0">
              <MagneticButton magnetic={!reduced} onClick={() => onPageChange?.("contact")} className={primary}>
                Request a quote
                <span className="size-9 rounded-full bg-[#111] text-[#fabf37] flex items-center justify-center">
                  <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" aria-hidden="true" />
                </span>
              </MagneticButton>
              <button type="button" onClick={() => onPageChange?.("products")} className={secondary}>
                See products
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
