import React from "react";

/** Calls `onEscape` when Escape is pressed while `active` is true (overlays, menus, dialogs). */
export function useEscapeKey(active: boolean, onEscape: () => void): void {
  const handler = React.useRef(onEscape);
  handler.current = onEscape;
  React.useEffect(() => {
    if (!active) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") handler.current();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
}
