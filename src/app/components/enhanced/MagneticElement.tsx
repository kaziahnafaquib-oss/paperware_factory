// 🧲 Magnetic Element Component
import { MouseEvent as ReactMouseEvent, ReactNode, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticElementProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticElement({
  children,
  strength = 0.3,
  className = '',
  onClick
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;
    
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x: xSpring,
        y: ySpring
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
