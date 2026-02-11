// 📊 Scroll Progress Indicator
import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-[#fabf37] origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
}

export function CircularScrollProgress() {
  const { scrollYProgress } = useScroll();
  const circumference = 2 * Math.PI * 40; // radius = 40

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="#fabf37"
          strokeWidth="4"
          strokeLinecap="round"
          style={{
            pathLength: scrollYProgress,
            strokeDasharray: circumference,
            strokeDashoffset: 0
          }}
        />
      </motion.svg>
      
      {/* Percentage text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center text-xs font-bold text-zinc-900"
        style={{
          opacity: useSpring(scrollYProgress)
        }}
      >
        <motion.span>
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.span>
      </motion.div>
    </div>
  );
}
