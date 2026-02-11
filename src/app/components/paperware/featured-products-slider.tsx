import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import { getDevicePerformanceTier } from "../../lib/performance";
import { useLanguage } from "../../context/LanguageContext";

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

export function FeaturedProductsSlider({ products, onViewProduct }: FeaturedProductsSliderProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [dragStartX, setDragStartX] = useState(0);
  const [cursorZone, setCursorZone] = useState<'left' | 'center' | 'right' | null>(null);
  const isLowEnd = getDevicePerformanceTier() === 'low';

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || products.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Faster 3s interval for better engagement

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlay, products.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false); // User interaction pauses autoplay
  };

  // Handle drag/swipe gestures (optimized for touch)
  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 30; // Lower threshold for easier swipes (was 50)
    const velocityThreshold = 300; // Velocity-based detection for quick swipes
    const dragDistance = info.offset.x;
    const velocity = info.velocity.x;

    // Check if swipe was strong enough (distance OR velocity)
    const isStrongSwipe = Math.abs(dragDistance) > swipeThreshold || Math.abs(velocity) > velocityThreshold;

    if (isStrongSwipe) {
      if (dragDistance > 0 || velocity > 0) {
        // Swiped right - go to previous
        prevSlide();
      } else {
        // Swiped left - go to next
        nextSlide();
      }
      setIsAutoPlay(false); // Pause autoplay on user interaction
    }
  };

  // Handle mouse movement for cursor-based navigation
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const containerWidth = rect.width;

    // Divide container into 3 zones: left (30%), center (40%), right (30%)
    const leftZone = containerWidth * 0.3;
    const rightZone = containerWidth * 0.7;

    if (x < leftZone) {
      // Mouse in left zone - show previous hint
      container.style.cursor = 'w-resize';
      setCursorZone('left');
    } else if (x > rightZone) {
      // Mouse in right zone - show next hint
      container.style.cursor = 'e-resize';
      setCursorZone('right');
    } else {
      // Mouse in center - show grab cursor
      container.style.cursor = 'grab';
      setCursorZone('center');
    }
  };

  // Handle click based on cursor position
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const containerWidth = rect.width;

    const leftZone = containerWidth * 0.3;
    const rightZone = containerWidth * 0.7;

    if (x < leftZone) {
      prevSlide();
      setIsAutoPlay(false);
    } else if (x > rightZone) {
      nextSlide();
      setIsAutoPlay(false);
    }
  };

  return (
    <section className="relative bg-zinc-50 py-20 md:py-32 overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      {!isLowEnd && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: currentIndex * -50,
              y: currentIndex * 30,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-500/5 rounded-full blur-[120px]"
          />
          <motion.div
            animate={{
              x: currentIndex * 50,
              y: currentIndex * -30,
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-500/5 rounded-full blur-[120px]"
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')] opacity-20 mix-blend-soft-light" />
        </div>
      )}

      <div className="max-w-[1600px] mx-auto px-4 md:px-8 relative z-10 perspective-[2500px]">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-zinc-400 font-semibold tracking-[0.3em] uppercase text-xs md:text-sm">
            {t('showcase') || "Showcase"}
          </span>
          <h2 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-bold text-zinc-900 tracking-tighter">
            {t('featured_products') || "Featured Products"}
          </h2>
          <p className="mt-4 text-zinc-400 text-sm font-medium">
            {t('swipe_hint') || "👆 Swipe with finger • Move cursor • Click sides to navigate"}
          </p>
        </motion.div>

        {/* Main Content Layout */}
        <div
          className="flex flex-col items-center w-full"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >

          {/* 3D Carousel Section */}
          <motion.div
            className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center mb-12 md:mb-16"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            dragMomentum={false}
            onDragEnd={handleDragEnd}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setCursorZone(null)}
            onClick={handleContainerClick}
            style={{
              cursor: 'grab',
              perspective: '2000px',
              transformStyle: 'preserve-3d',
              touchAction: 'pan-y pinch-zoom'
            }}
            whileTap={{ cursor: 'grabbing' }}
          >

            {/* Floating Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 z-40 flex justify-between px-4 md:px-12 pointer-events-none">
              <motion.button
                whileHover={{ scale: 1.1, x: -5 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevSlide}
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-xl flex items-center justify-center text-zinc-900 transition-colors hover:bg-white"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1, x: 5 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextSlide}
                className="pointer-events-auto w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/90 backdrop-blur-xl border border-white shadow-xl flex items-center justify-center text-zinc-900 transition-colors hover:bg-white"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Cards */}
            {products.map((product, index) => {
              // Calculate circular distance
              let offset = (index - currentIndex + products.length) % products.length;
              if (offset > products.length / 2) offset -= products.length;

              const isActive = offset === 0;
              const isVisible = Math.abs(offset) <= 2;

              const isLowEnd = getDevicePerformanceTier() === 'low';
              const isMediumEnd = getDevicePerformanceTier() === 'medium';

              // Enhanced 3D Transform Logic with more depth
              const xOffset = offset * (isLowEnd ? 80 : 55); // Tighter spacing for more 3D feel
              const zOffset = isLowEnd ? 0 : Math.abs(offset) * -650; // Much deeper Z push for dramatic depth
              const rotateY = isLowEnd ? 0 : offset * -55; // Stronger rotation for 3D effect
              const rotateX = isLowEnd ? 0 : (isActive ? 0 : Math.abs(offset) * 8); // Slight tilt for depth
              const scale = isActive ? 1.05 : (isLowEnd ? 0.85 : 0.75); // More dramatic scale difference
              const brightness = isActive ? 1 : 0.7; // Dim non-active cards

              return (
                <motion.div
                  key={product.id}
                  layout={!isLowEnd}
                  initial={false}
                  animate={{
                    x: `${xOffset}%`,
                    z: zOffset,
                    rotateY: rotateY,
                    rotateX: rotateX,
                    scale: scale,
                    opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                    filter: `brightness(${brightness})`,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: isLowEnd ? 150 : 100,
                    damping: 25,
                    mass: 1.2
                  }}
                  style={{
                    zIndex: 100 - Math.abs(offset),
                    transformStyle: isLowEnd ? "flat" : "preserve-3d",
                    boxShadow: isActive
                      ? '0 40px 80px rgba(0,0,0,0.25), 0 20px 40px rgba(0,0,0,0.15)'
                      : `0 ${Math.abs(offset) * 20}px ${Math.abs(offset) * 40}px rgba(0,0,0,0.2)`,
                  }}
                  className={`absolute w-[65vw] md:w-[40vw] lg:w-[30vw] max-w-[500px] aspect-[4/5] bg-white rounded-[2rem] cursor-pointer ${!isVisible ? 'pointer-events-none' : ''}`}
                  onClick={() => {
                    if (isActive) onViewProduct?.(product.id);
                    else goToSlide(index);
                  }}
                >
                  {/* Card Content */}
                  <div className="relative w-full h-full rounded-[2rem] overflow-hidden bg-white border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] group">

                    {/* Glossy Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white via-zinc-50 to-zinc-200 opacity-80" />

                    {/* Image Container */}
                    <div className="relative w-full h-full p-10 md:p-14 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                      <motion.div
                        animate={{
                          translateZ: isActive ? 100 : 0,
                          scale: isActive ? 1.08 : 1,
                          rotateY: isActive ? 0 : offset * 5,
                        }}
                        transition={{
                          duration: 0.6,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="w-full h-full"
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <ImageWithFallback
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)]"
                        />
                      </motion.div>
                    </div>

                    {/* Active State Hover Overlay */}
                    {isActive && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/5 backdrop-blur-[2px]">
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          whileHover={{ scale: 1.05 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="px-6 py-3 bg-white text-zinc-900 rounded-full font-medium shadow-xl flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          <span>{t('view_details') || "View Details"}</span>
                        </motion.div>
                      </div>
                    )}

                    {/* Badge */}
                    {product.badge && (
                      <div className="absolute top-6 right-6 px-4 py-2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-wider rounded-full z-20 shadow-lg">
                        {product.badge}
                      </div>
                    )}
                  </div>

                  {/* Reflection Effect - Hidden on low end */}
                  {!isLowEnd && !isMediumEnd && (
                    <div
                      className="absolute top-[105%] left-0 right-0 h-[20%] bg-gradient-to-b from-white/20 to-transparent rounded-[2rem] transform scale-y-[-1] opacity-30 blur-sm mask-image-gradient pointer-events-none"
                      aria-hidden="true"
                    >
                      <ImageWithFallback
                        src={product.image}
                        alt=""
                        className="w-full h-full object-contain p-10 md:p-14 opacity-50"
                      />
                    </div>
                  )}

                </motion.div>
              );
            })}
          </motion.div>

          {/* Product Details */}
          <div className="w-full flex flex-col items-center z-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center max-w-2xl px-6"
              >
                <div className="mb-3 text-zinc-400 text-sm tracking-widest uppercase font-medium">
                  {t(products[currentIndex].category)}
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">
                  {t(products[currentIndex].name)}
                </h3>

                <p className="text-lg text-zinc-500 font-light mb-8 leading-relaxed line-clamp-2">
                  {t(products[currentIndex].description)}
                </p>

                <div className="flex items-center justify-center gap-6">
                  {products[currentIndex].price && (
                    <div className="text-3xl font-medium text-zinc-900">
                      {products[currentIndex].price}
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onViewProduct?.(products[currentIndex].id)}
                    className="px-8 py-3 bg-zinc-900 text-white rounded-full font-medium hover:bg-zinc-800 transition-colors shadow-lg shadow-zinc-900/20"
                  >
                    {t('view_details') || "View Details"}
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots with Auto-Scroll Indicator */}
            <div className="flex gap-3 mt-12 items-center h-4">
              {products.map((_, idx) => (
                <div key={idx} className="relative">
                  <button
                    onClick={() => goToSlide(idx)}
                    className={`transition-all duration-500 rounded-full ${idx === currentIndex
                      ? "w-12 h-1.5 bg-zinc-200 overflow-hidden"
                      : "w-1.5 h-1.5 bg-zinc-300 hover:bg-zinc-400"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  >
                    {idx === currentIndex && isAutoPlay && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="h-full bg-zinc-900"
                      />
                    )}
                    {idx === currentIndex && !isAutoPlay && (
                      <div className="h-full w-full bg-zinc-900" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section >
  );
}
