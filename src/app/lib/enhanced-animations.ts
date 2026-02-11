// 🎨 Enhanced Animation Library for Paperware
// This file contains reusable animation variants and utilities

export const fadeInUp = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] // Custom easing
    }
  }
};

export const fadeInDown = {
  hidden: { 
    opacity: 0, 
    y: -60,
    scale: 0.95,
    filter: "blur(10px)"
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInLeft = {
  hidden: { 
    opacity: 0, 
    x: -60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const fadeInRight = {
  hidden: { 
    opacity: 0, 
    x: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const scaleIn = {
  hidden: { 
    opacity: 0, 
    scale: 0.5,
    filter: "blur(20px)"
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: "blur(0px)",
    transition: { 
      duration: 0.6, 
      ease: [0.34, 1.56, 0.64, 1] // Bouncy easing
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const staggerFastContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// 3D Perspective Animations
export const flipIn = {
  hidden: {
    opacity: 0,
    rotateX: -90,
    transformPerspective: 1000
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const rotateIn = {
  hidden: {
    opacity: 0,
    rotate: -180,
    scale: 0.5
  },
  visible: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1]
    }
  }
};

// Slide animations
export const slideInFromBottom = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Hover effects
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

export const hoverLift = {
  y: -10,
  scale: 1.02,
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

export const hoverGlow = {
  boxShadow: "0 20px 60px rgba(250, 191, 55, 0.4)",
  transition: {
    duration: 0.3
  }
};

// Text animations
export const textReveal = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(8px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Page transitions
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)"
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Continuous animations
export const floatingAnimation = {
  y: [0, -20, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  opacity: [0.8, 1, 0.8],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
};

// Magnetic button effect utility
export const createMagneticEffect = (strength: number = 0.3) => {
  return {
    onMouseMove: (e: ReactMouseEvent, ref: RefObject<HTMLElement>) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      return { x: deltaX, y: deltaY };
    },
    onMouseLeave: () => {
      return { x: 0, y: 0 };
    }
  };
};

// Parallax scroll utility
export const createParallaxEffect = (speed: number = 0.5) => {
  return {
    y: [`${-100 * speed}%`, `${100 * speed}%`],
    transition: {
      ease: "linear"
    }
  };
};

// Viewport animation options
export const viewportOptions = {
  once: true,
  margin: "-100px",
  amount: 0.3
};

export const viewportOptionsRepeat = {
  once: false,
  margin: "-50px",
  amount: 0.2
};

// Spring configurations
export const springConfig = {
  stiff: {
    type: "spring",
    stiffness: 300,
    damping: 20
  },
  soft: {
    type: "spring",
    stiffness: 100,
    damping: 15
  },
  bouncy: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};
