import React from "react";
import { MotionGlobalConfig } from "motion/react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(QUERY).matches;
}

/**
 * Honour the OS "reduce motion" setting for every motion/react animation (audit PF-026).
 *
 * `MotionConfig reducedMotion="user"` only disables transform/layout animations; opacity,
 * colour and the ~250 `repeat: Infinity` loops keep running. `skipAnimations` makes every
 * motion animation jump straight to its final state instead, so marquees, pulsing dots
 * and entrance reveals all become static. Must run before the first render, because the
 * flag is read when an animation starts. Changing the OS setting applies to animations
 * started afterwards (e.g. after navigating or reloading).
 */
export function applyReducedMotionPreference(): void {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
  const media = window.matchMedia(QUERY);
  const apply = () => {
    MotionGlobalConfig.skipAnimations = media.matches;
  };
  apply();
  media.addEventListener?.("change", apply);
}

/** React hook for components that need to branch (e.g. don't autoplay video). */
export function useReducedMotionPreference(): boolean {
  const [reduced, setReduced] = React.useState(prefersReducedMotion);
  React.useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const media = window.matchMedia(QUERY);
    const onChange = () => setReduced(media.matches);
    media.addEventListener?.("change", onChange);
    return () => media.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}
