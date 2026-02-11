import { useState, useEffect, useRef, useMemo, type ReactNode, type MouseEvent as ReactMouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { getDevicePerformanceTier } from '../../lib/performance';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Card3D({ children, className = '', intensity = 15 }: Card3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-intensity, intensity]);

  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isLowEnd = getDevicePerformanceTier() === 'low';

  return (
    <motion.div
      onMouseMove={isLowEnd ? undefined : handleMouseMove}
      onMouseLeave={isLowEnd ? undefined : handleMouseLeave}
      style={{
        rotateX: isLowEnd ? 0 : rotateX,
        rotateY: isLowEnd ? 0 : rotateY,
        transformStyle: isLowEnd ? 'flat' : 'preserve-3d',
        perspective: '1000px',
      }}
      className={`${className} hardware-accelerated`}
    >
      {children}
    </motion.div>
  );
}

interface FloatingCard3DProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function FloatingCard3D({ children, className = '', delay = 0 }: FloatingCard3DProps) {
  const isLowEnd = getDevicePerformanceTier() === 'low';

  return (
    <motion.div
      initial={{ y: 0, z: 0 }}
      animate={isLowEnd ? { y: [0, -10, 0] } : {
        y: [0, -20, 0],
        z: [0, 30, 0],
        rotateX: [0, 5, 0],
        rotateY: [0, 5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{ transformStyle: isLowEnd ? 'flat' : 'preserve-3d' }}
      className={`${className} hardware-accelerated`}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayer3DProps {
  children: ReactNode;
  depth?: number;
  className?: string;
}

export function ParallaxLayer3D({ children, depth = 50, className = '' }: ParallaxLayer3DProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, depth]);
  const z = useTransform(scrollY, [0, 1000], [0, depth / 2]);

  return (
    <motion.div
      style={{
        y,
        z,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Advanced 3D Parallax Container with Mouse Tracking
interface Parallax3DContainerProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function Parallax3DContainer({ children, className = '', intensity = 20 }: Parallax3DContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      animate={{
        rotateY: mousePosition.x * intensity,
        rotateX: -mousePosition.y * intensity,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{ transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// 3D Particle Field Background
export function Particle3DField() {
  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: Math.random() * 200 - 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }))
    , []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ perspective: '1000px' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
            z: particle.z,
            opacity: 0
          }}
          animate={{
            y: [`${particle.y}%`, `${particle.y - 30}%`, `${particle.y}%`],
            z: [particle.z, particle.z + 100, particle.z],
            opacity: [0, 0.6, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: 'preserve-3d',
            width: particle.size,
            height: particle.size,
          }}
          className="absolute rounded-full bg-[#fabf37]/30 blur-sm"
        />
      ))}
    </div>
  );
}

// 3D Grid Background
export function Grid3DBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10" style={{ perspective: '800px' }}>
      <motion.div
        animate={{
          rotateX: [60, 65, 60],
          z: [-200, -150, -200],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute inset-0"
      >
        {/* Horizontal lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`h-${i}`}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleX: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1,
            }}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#fabf37] to-transparent"
            style={{
              top: `${(i / 20) * 100}%`,
              transform: `translateZ(${i * 10}px)`,
            }}
          />
        ))}
        {/* Vertical lines */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={`v-${i}`}
            initial={{ opacity: 0.3 }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scaleY: [1, 1.1, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.1 + 0.5,
            }}
            className="absolute w-px h-full bg-gradient-to-b from-transparent via-[#fabf37] to-transparent"
            style={{
              left: `${(i / 20) * 100}%`,
              transform: `translateZ(${i * 10}px)`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

// Depth Layers Component
interface DepthLayersProps {
  children: ReactNode;
  layers?: number;
  spacing?: number;
}

export function DepthLayers({ children, layers = 5, spacing = 20 }: DepthLayersProps) {
  return (
    <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
      {Array.from({ length: layers }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - (i / layers) * 0.7 }}
          style={{
            position: 'absolute',
            inset: 0,
            transform: `translateZ(${-i * spacing}px)`,
            filter: `blur(${i * 2}px)`,
          }}
        >
          {children}
        </motion.div>
      ))}
      <div style={{ transform: 'translateZ(0px)' }}>{children}</div>
    </div>
  );
}
