// ✍️ Text Reveal Animation Component
import React from 'react';
import { motion } from 'framer-motion';

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  as: Component = 'p'
}: TextRevealProps) {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(8px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <Component className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="inline-block"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={child}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}

export function CharReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.02
}: TextRevealProps) {
  const chars = text.split('');

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
      filter: 'blur(4px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`inline-block ${className}`}
    >
      {chars.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block"
          style={{ transformOrigin: 'bottom' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  );
}

export function LineReveal({
  lines,
  className = '',
  delay = 0,
  stagger = 0.15
}: {
  lines: string[];
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay
      }
    }
  };

  const child = {
    hidden: {
      opacity: 0,
      x: -50,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={className}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          variants={child}
          className="overflow-hidden"
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}
