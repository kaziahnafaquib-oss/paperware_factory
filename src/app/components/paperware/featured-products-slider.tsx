import React from "react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type PanInfo,
} from "motion/react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import imgCup from "figma:asset/49b7c1ac36cc61c1c728abd7230eab96c50bea6c.webp";
import pFoodBox from "figma:asset/products/takeaway-food-box.webp";
import pBrochures from "figma:asset/products/brochures.webp";
import pMedicine from "figma:asset/products/medicine-boxes.webp";
import pGiftBags from "figma:asset/products/gift-bags.webp";

// Real Paperware photos for products whose incoming image is a stock URL and whose name clearly matches a photo.
const REAL_PHOTO_BY_KEYWORD: Array<[RegExp, string]> = [
  [/coffee cup|paper cup/i, imgCup],
  [/food box/i, pFoodBox],
  [/brochure/i, pBrochures],
  [/medicine/i, pMedicine],
  [/gift bag/i, pGiftBags],
];
const isStock = (url: string) => /unsplash\.com|pexels\.com|picsum\.photos/i.test(url);
export function withRealPhoto<T extends { name: string; image: string }>(p: T): T {
  if (!isStock(p.image)) return p;
  const hit = REAL_PHOTO_BY_KEYWORD.find(([re]) => re.test(p.name));
  return hit ? { ...p, image: hit[1] } : p;
}

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price?: string;
  rating?: number;
  badge?: string;
}

interface FeaturedProductsSliderProps {
  products: Product[];
  onViewProduct?: (productId: string) => void;
}

const EASE_OUT = [0.16, 1, 0.3, 1] as const;
const AUTOPLAY_MS = 3000;
const SWIPE_PX = 60;
const SWIPE_VELOCITY = 400;
const TILT_SPRING = { stiffness: 180, damping: 20, mass: 0.7 };

export function FeaturedProductsSlider({ products: rawProducts, onViewProduct }: FeaturedProductsSliderProps) {
  // Only products with a real Paperware photo; stock placeholders are left out (no demo data).
  const products = React.useMemo(
    () => rawProducts.map(withRealPhoto).filter((p) => !isStock(p.image ?? "")),
    [rawProducts],
  );
  const reduced = useReducedMotion() ?? false;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  // Autoplay is off entirely when the OS asks for reduced motion.
  const [isAutoPlay, setIsAutoPlay] = React.useState(!reduced);
  const [dragging, setDragging] = React.useState(false);

  const count = products.length;

  const nextSlide = React.useCallback(() => setCurrentIndex((prev) => (prev + 1) % count), [count]);
  const prevSlide = React.useCallback(() => setCurrentIndex((prev) => (prev - 1 + count) % count), [count]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false); // user interaction pauses autoplay
  };

  React.useEffect(() => {
    if (reduced) setIsAutoPlay(false);
  }, [reduced]);

  React.useEffect(() => {
    if (!isAutoPlay || count <= 1) return;
    const interval = window.setInterval(nextSlide, AUTOPLAY_MS);
    return () => window.clearInterval(interval);
  }, [currentIndex, isAutoPlay, count, nextSlide]);

  /* ---------- scroll-linked: the whole stage tips and sinks with the scrollbar ---------- */
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const stageRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [22, 0, -14]);
  const stageY = useTransform(scrollYProgress, [0, 0.5, 1], [140, 0, -90]);
  const stageScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.86, 1, 0.94]);
  const headingX = useTransform(scrollYProgress, [0, 1], [60, -120]);
  const subX = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const glowY = useTransform(scrollYProgress, [0, 1], [240, -240]);

  /* ---------- entrance: cards fly in from depth, staggered ---------- */
  const stageRef = React.useRef<HTMLDivElement>(null);
  const entered = useInView(stageRef, { once: true, amount: 0.25 });

  /* ---------- cursor tilt + image parallax on the active card ---------- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), TILT_SPRING);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), TILT_SPRING);
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), TILT_SPRING);
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [-18, 18]), TILT_SPRING);
  const onStageMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || dragging) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetTilt = () => {
    mx.set(0);
    my.set(0);
  };

  /* ---------- drag / swipe ---------- */
  const dragEndAt = React.useRef(0);
  const onDragEnd = (_: unknown, info: PanInfo) => {
    setDragging(false);
    dragEndAt.current = performance.now();
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_PX || velocity.x < -SWIPE_VELOCITY) nextSlide();
    else if (offset.x > SWIPE_PX || velocity.x > SWIPE_VELOCITY) prevSlide();
  };

  if (count === 0) return null;
  const current = products[currentIndex] ?? products[0];

  const slideTransition = reduced ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT };
  const scrub = (mv: typeof stageY) => (reduced ? undefined : mv);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-products-heading"
      className="relative bg-[#111] text-[#f6f1e7] py-20 md:py-28 lg:py-32 overflow-x-clip [content-visibility:visible]"
    >
      {/* Yellow glow behind the active card, drifting against the scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: scrub(glowY) }}
        className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[760px] aspect-square rounded-full bg-[#fabf37] opacity-[0.14] blur-[120px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-12">
        {/* Header, sliding in opposite directions as you scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-end mb-10 md:mb-14">
          <motion.div style={{ x: scrub(headingX) }} className="lg:col-span-8 will-change-transform">
            <p className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-[#fabf37] mb-6">
              <span aria-hidden="true" className="h-px w-8 bg-[#fabf37]" />
              Showcase
            </p>
            <h2
              id="featured-products-heading"
              className="font-black uppercase tracking-tight leading-[0.92] text-[36px] sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Featured products
            </h2>
          </motion.div>
          <motion.p style={{ x: scrub(subX) }} className="lg:col-span-4 text-sm md:text-base text-[#f6f1e7]/70 leading-relaxed lg:pb-2 will-change-transform">
            Cups, boxes, bags and printed packaging from our line. Drag, swipe or pick one to see the details.
          </motion.p>
        </div>

        {/* Carousel */}
        <div
          className="flex flex-col items-center w-full"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => {
            if (!reduced) setIsAutoPlay(true);
          }}
        >
          <div className="w-full [perspective:1600px]">
            <motion.div
              ref={stageRef}
              style={{ rotateX: scrub(stageRotateX), y: scrub(stageY), scale: scrub(stageScale), transformStyle: "preserve-3d" }}
              drag={reduced ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              dragSnapToOrigin
              onDragStart={() => {
                setDragging(true);
                setIsAutoPlay(false);
                resetTilt();
              }}
              onDragEnd={onDragEnd}
              onPointerMove={onStageMove}
              onPointerLeave={resetTilt}
              className={`relative w-full h-[340px] sm:h-[420px] md:h-[500px] flex items-center justify-center [perspective:1400px] will-change-transform touch-pan-y ${
                reduced ? "" : dragging ? "cursor-grabbing" : "cursor-grab"
              }`}
              role="group"
              aria-roledescription="carousel"
              aria-label="Featured products"
            >
              {/* Prev / next */}
              <div className="absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between pointer-events-none">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous product"
                  className="pointer-events-auto size-12 md:size-14 rounded-full bg-[#f6f1e7] text-[#111] flex items-center justify-center shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-[#fabf37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                >
                  <ChevronLeft className="size-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next product"
                  className="pointer-events-auto size-12 md:size-14 rounded-full bg-[#f6f1e7] text-[#111] flex items-center justify-center shadow-[0_12px_30px_-10px_rgba(0,0,0,0.6)] hover:bg-[#fabf37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                >
                  <ChevronRight className="size-6" aria-hidden="true" />
                </button>
              </div>

              {/* Cards */}
              {products.map((product, index) => {
                let offset = (index - currentIndex + count) % count;
                if (offset > count / 2) offset -= count;

                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 2;

                const xOffset = offset * 62; // percent of card width
                const zOffset = Math.abs(offset) * -260;
                const rotateY = offset * -22;
                const scale = isActive ? 1 : 0.9;
                const flyDelay = 0.08 * ((index - currentIndex + count) % count);

                return (
                  <motion.div
                    key={product.id}
                    initial={reduced ? false : { opacity: 0, scale: 0.3, y: 220, z: -900, rotateX: 35 }}
                    animate={entered || reduced ? { opacity: 1, scale: 1, y: 0, z: 0, rotateX: 0 } : undefined}
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 18, mass: 0.9, delay: flyDelay }}
                    style={{ zIndex: 100 - Math.abs(offset), transformStyle: "preserve-3d" }}
                    className={`absolute w-[58vw] sm:w-[44vw] md:w-[36vw] lg:w-[28vw] max-w-[420px] aspect-[4/5] ${!isVisible ? "pointer-events-none" : ""}`}
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: `${xOffset}%`,
                        z: zOffset,
                        rotateY,
                        scale,
                        opacity: isVisible ? (isActive ? 1 : 0.55) : 0,
                      }}
                      transition={slideTransition}
                      style={{ transformStyle: "preserve-3d" }}
                      aria-hidden={!isActive}
                      className="w-full h-full"
                    >
                      <motion.button
                        type="button"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => {
                          if (dragging || performance.now() - dragEndAt.current < 300) return; // a swipe is not a click
                          if (isActive) onViewProduct?.(product.id);
                          else goToSlide(index);
                        }}
                        aria-label={isActive ? `View ${product.name}` : `Show ${product.name}`}
                        style={isActive && !reduced ? { rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" } : undefined}
                        className={`group relative w-full h-full rounded-[24px] overflow-hidden text-left border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111] ${
                          isActive
                            ? "bg-[#f6f1e7] border-[#fabf37]/60 shadow-[0_40px_90px_-30px_rgba(250,191,55,0.35)]"
                            : "bg-[#e3d1ae] border-transparent"
                        }`}
                      >
                        <motion.div
                          style={isActive && !reduced ? { x: imgX, y: imgY } : undefined}
                          className="absolute inset-0 p-6 sm:p-8 md:p-10 flex items-center justify-center will-change-transform"
                        >
                          <ImageWithFallback
                            src={product.image}
                            alt={product.name}
                            draggable={false}
                            className="w-full h-full object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.25)] group-hover:scale-[1.06] transition-transform duration-500 select-none"
                          />
                        </motion.div>

                        {product.badge && isActive && (
                          <span className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#111] text-[#fabf37] text-[10px] font-black uppercase tracking-[0.2em]">
                            {product.badge}
                          </span>
                        )}

                        {isActive && (
                          <span className="absolute bottom-4 right-4 size-11 rounded-full bg-[#111] text-[#fabf37] flex items-center justify-center group-hover:bg-[#fabf37] group-hover:text-[#111]">
                            <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" aria-hidden="true" />
                          </span>
                        )}
                      </motion.button>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Details */}
          <div className="w-full flex flex-col items-center mt-8 md:mt-10" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
                className="text-center max-w-2xl px-2"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#fabf37]">{current.category}</p>
                <h3 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight leading-none">{current.name}</h3>
                <p className="mt-4 text-sm md:text-base text-[#f6f1e7]/70 leading-relaxed line-clamp-2">{current.description}</p>

                <div className="mt-6 flex items-center justify-center gap-6">
                  {current.price && <span className="text-2xl font-black">{current.price}</span>}
                  <button
                    type="button"
                    onClick={() => onViewProduct?.(current.id)}
                    className="group inline-flex items-center gap-4 min-h-[48px] pl-6 pr-2 py-2 rounded-full bg-[#fabf37] text-[#111] text-xs font-black uppercase tracking-[0.2em] hover:bg-[#f6f1e7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111]"
                  >
                    View details
                    <span className="size-9 rounded-full bg-[#111] text-[#fabf37] flex items-center justify-center">
                      <ArrowRight className="size-4 -rotate-45 group-hover:rotate-0 transition-transform" aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center gap-1 mt-8" role="tablist" aria-label="Choose product">
              {products.map((product, idx) => {
                const active = idx === currentIndex;
                return (
                  <button
                    key={product.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    aria-label={`${idx + 1}: ${product.name}`}
                    onClick={() => goToSlide(idx)}
                    className="group size-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#fabf37] rounded-full"
                  >
                    <span
                      className={`block h-1.5 rounded-full overflow-hidden transition-[width,background-color] ${
                        active ? "w-10 bg-[#f6f1e7]/25" : "w-1.5 bg-[#f6f1e7]/35 group-hover:bg-[#f6f1e7]/70"
                      }`}
                    >
                      {active && isAutoPlay && !reduced && (
                        <motion.span
                          key={`progress-${currentIndex}`}
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                          className="block h-full bg-[#fabf37]"
                        />
                      )}
                      {active && (!isAutoPlay || reduced) && <span className="block h-full w-full bg-[#fabf37]" />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
