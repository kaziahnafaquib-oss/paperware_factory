import { MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleMouseMove = (e: ReactMouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * -20;
    const rotateYValue = ((x - centerX) / centerX) * 20;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  // Convert scroll progress (0-1) to stroke dasharray for circle
  // Circumference of circle with r=18 is ~113
  const strokeDashoffset = useTransform(scaleX, [0, 1], [113, 0]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          className="fixed bottom-20 md:bottom-6 left-4 z-[9999]"
          style={{ perspective: "1000px" }}
        >
          <motion.button
            onClick={scrollToTop}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="group relative flex items-center justify-center size-12 rounded-full bg-black text-[#fabf37] shadow-lg hover:shadow-[#fabf37]/20 transition-all duration-300"
            style={{ 
              transformStyle: "preserve-3d",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 20px rgba(250, 191, 55, 0.1)"
            }}
          >
            {/* Circular Progress Indicator */}
            <svg className="absolute inset-0 size-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
              <circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-white/10"
              />
              <motion.circle
                cx="22"
                cy="22"
                r="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-[#fabf37]"
                strokeDasharray="113"
                style={{ strokeDashoffset }}
                strokeLinecap="round"
              />
            </svg>

            <ArrowUp className="size-5 group-hover:-translate-y-1 transition-transform duration-300" />
            
            {/* Tooltip */}
            <span className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#fabf37]/20">
              Scroll Top
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};