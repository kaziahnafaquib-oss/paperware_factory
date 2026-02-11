import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from "framer-motion";

export function AdvancedCursor() {
  // Check if mobile FIRST - but don't return early yet
  const [isMobile, setIsMobile] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trail springs - MUST be declared before early return
  const trailXSpring = useSpring(cursorX, { damping: 30, stiffness: 200 });
  const trailYSpring = useSpring(cursorY, { damping: 30, stiffness: 200 });
  
  // Text springs - MUST be declared before early return
  const textXSpring = useSpring(cursorX, { damping: 20, stiffness: 250 });
  const textYSpring = useSpring(cursorY, { damping: 20, stiffness: 250 });

  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  // Detect mobile
  useEffect(() => {
    setIsMobile(window.matchMedia("(max-width: 768px)").matches);
  }, []);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" || target.tagName === "A" || target.closest("button") || target.closest("a")) {
        setIsHovering(true);
        const text = target.getAttribute("data-cursor-text");
        if (text) setCursorText(text);
      } else {
        setIsHovering(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // NOW we can return null AFTER all hooks are called
  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99998] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.5 : 1,
            backgroundColor: isHovering ? "rgba(250, 191, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
          }}
          transition={{ duration: 0.2 }}
          className="w-full h-full rounded-full border-2 border-white"
        />
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[99997] bg-[#fabf37] rounded-full opacity-50"
        style={{
          x: trailXSpring,
          y: trailYSpring,
        }}
      />

      {/* Cursor Text */}
      {cursorText && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed top-0 left-0 pointer-events-none z-[99999] bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-bold"
          style={{
            x: textXSpring,
            y: textYSpring,
            translateX: 20,
            translateY: -20,
          }}
        >
          {cursorText}
        </motion.div>
      )}
    </>
  );
}