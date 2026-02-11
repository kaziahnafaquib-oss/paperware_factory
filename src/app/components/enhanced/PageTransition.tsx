import { ReactNode } from 'react';
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  pageKey: string;
}

export function PageTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Slide Transition
export function SlideTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Scale Transition
export function ScaleTransition({ children, pageKey }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.1, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
