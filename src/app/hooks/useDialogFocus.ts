import React from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Basic dialog focus management: when `active` becomes true, move focus into the dialog
 * (unless something inside already has it, e.g. an autofocused input), keep Tab/Shift+Tab
 * inside it, and return focus to the previously focused element when it closes.
 */
export function useDialogFocus(container: React.RefObject<HTMLElement | null>, active: boolean): void {
  React.useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    const root = container.current;
    const focusables = () =>
      root ? [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.getClientRects().length > 0) : [];

    const raf = requestAnimationFrame(() => {
      if (root && !root.contains(document.activeElement)) {
        const first = focusables()[0];
        if (first) first.focus();
        else {
          root.setAttribute("tabindex", "-1");
          root.focus();
        }
      }
    });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !root) return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !root.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !root.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      if (previous && document.contains(previous)) previous.focus();
    };
  }, [active, container]);
}
