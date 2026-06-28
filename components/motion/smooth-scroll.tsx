"use client";

import { ReactLenis } from "lenis/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Buttery smooth-scroll (Lenis) — DESKTOP ONLY. On touch devices native iOS/Android
 * momentum beats Lenis (and Lenis fights it), and reduced-motion users get native scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [smooth, setSmooth] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setSmooth(desktop && !reduce);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis root options={{ duration: 1.2, smoothWheel: true, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
