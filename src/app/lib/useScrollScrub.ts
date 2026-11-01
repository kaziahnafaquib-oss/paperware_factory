import React from "react";

/** Clamp to 0..1. */
export const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

/** Smoothstep: gentle ease-in-out on a 0..1 scrubbed value. */
export const smooth = (t: number): number => {
  const u = clamp01(t);
  return u * u * (3 - 2 * u);
};

/** Cubic ease-out on a 0..1 scrubbed value. */
export const easeOut3 = (t: number): number => {
  const u = clamp01(t);
  return 1 - (1 - u) * (1 - u) * (1 - u);
};

/**
 * Runs `render` once on mount and then on every scroll/resize (coalesced to one call per
 * animation frame) and whenever the document resizes (images loading, fonts swapping).
 * `render` reads element rects and writes transform/opacity directly, so the motion is
 * scrubbed 1:1 by the scroll position: no timers, no tweens, and it still runs under
 * prefers-reduced-motion because the user drives it.
 */
export function useScrollScrub(render: () => void): void {
  const renderRef = React.useRef(render);
  renderRef.current = render;

  React.useEffect(() => {
    let queued = false;
    let raf = 0;
    const schedule = () => {
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(() => {
        queued = false;
        renderRef.current();
      });
    };

    renderRef.current();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const ro = typeof ResizeObserver === "function" ? new ResizeObserver(schedule) : null;
    ro?.observe(document.documentElement);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      ro?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);
}
