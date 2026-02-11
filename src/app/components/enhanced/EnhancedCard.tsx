// 🎴 Enhanced Card Component with 3D Effects
import { MouseEvent as ReactMouseEvent, ReactNode, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface EnhancedCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: '3d' | 'lift' | 'glow' | 'none';
  glassEffect?: boolean;
  onClick?: () => void;
}

export function EnhancedCard({
  children,
  className = '',
  hoverEffect = '3d',
  glassEffect = false,
  onClick
}: EnhancedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-15, 15]);

  const springConfig = { stiffness: 200, damping: 20 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (hoverEffect !== '3d' || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const hoverEffects = {
    '3d': {
      rotateX: rotateXSpring,
      rotateY: rotateYSpring,
      transformPerspective: 1000
    },
    lift: {},
    glow: {},
    none: {}
  };

  const hoverClasses = {
    '3d': 'transform-gpu',
    lift: 'hover:-translate-y-2 hover:shadow-2xl',
    glow: 'hover:shadow-[0_0_40px_rgba(250,191,55,0.4)]',
    none: ''
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={hoverEffect === '3d' ? hoverEffects['3d'] : {}}
      whileHover={hoverEffect === 'lift' ? { y: -8, scale: 1.02 } : {}}
      className={`
        relative rounded-2xl overflow-hidden
        transition-all duration-300 ease-out
        ${glassEffect ? 'glass backdrop-blur-lg' : 'bg-white shadow-lg'}
        ${hoverClasses[hoverEffect]}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}

export function EnhancedCardHeader({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 border-b border-zinc-100 ${className}`}>
      {children}
    </div>
  );
}

export function EnhancedCardBody({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 ${className}`}>
      {children}
    </div>
  );
}

export function EnhancedCardFooter({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`p-6 border-t border-zinc-100 ${className}`}>
      {children}
    </div>
  );
}
