import React from "react";
import { MotionGlobalConfig } from "motion/react";

const QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia(QUERY).matches;
}

/**
 * OS "reduce motion" handling (audit PF-026, revised at the owner's request).
 *
 * `MotionConfig reducedMotion="user"` in App.tsx turns transform/layout animations off for
 * visitors with the setting on. We no longer set `MotionGlobalConfig.skipAnimations`, because
 * it froze everything, including the header and ticker the owner wants to keep moving
 * (each has a pause control or only reacts to the pointer). Components that must move
 * anyway opt out locally with `<MotionConfig reducedMotion="never">`.
 */
export function applyReducedMotionPreference(): void {
  if (typeof window === "undefined") return;
  MotionGlobalConfig.skipAnimations = false;
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
