// 🌊 Parallax Section Component
import { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
}

export function ParallaxSection({
  children,
  speed = 0.5,
  direction = 'up',
  className = ''
}: ParallaxSectionProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const transforms = {
    up: useTransform(scrollYProgress, [0, 1], [`${100 * speed}%`, `${-100 * speed}%`]),
    down: useTransform(scrollYProgress, [0, 1], [`${-100 * speed}%`, `${100 * speed}%`]),
    left: useTransform(scrollYProgress, [0, 1], [`${100 * speed}%`, `${-100 * speed}%`]),
    right: useTransform(scrollYProgress, [0, 1], [`${-100 * speed}%`, `${100 * speed}%`])
  };

  const yTransform = direction === 'up' || direction === 'down' ? transforms[direction] : 0;
  const xTransform = direction === 'left' || direction === 'right' ? transforms[direction] : 0;

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={{
          y: yTransform,
          x: xTransform
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

export function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = ''
}: {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-50 * speed}%`, `${50 * speed}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
