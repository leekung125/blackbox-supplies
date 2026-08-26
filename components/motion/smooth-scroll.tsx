"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Buttery smooth-scroll (Lenis) — DESKTOP ONLY. On touch devices native iOS/Android
 * momentum beats Lenis (and Lenis fights it), and reduced-motion users get native scroll.
 *
 * ⛔ LOADED DYNAMICALLY, AND THAT IS THE POINT. This component already refused to RUN Lenis on
 * touch devices, but it IMPORTED it statically, so every mobile visitor downloaded the whole
 * library and then never used a line of it. Measured on a live guide page: 724 KB of gzipped JS,
 * and the largest single chunk (969 KB uncompressed) is the one carrying Lenis. Search traffic to
 * this site lands on a phone, so that was the worst possible place to spend the budget.
 *
 * next/dynamic with ssr:false means the chunk is requested only when `smooth` becomes true —
 * i.e. on a fine-pointer, non-reduced-motion device that is actually going to use it.
 */
const ReactLenis = dynamic(() => import("lenis/react").then((m) => m.ReactLenis), {
  ssr: false,
});

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [smooth, setSmooth] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setSmooth(desktop && !reduce);
  }, []);

  if (!smooth) return <>{children}</>;

  return (
    <ReactLenis root options={{ duration: 0.75, smoothWheel: true, wheelMultiplier: 1 }}>
      {children}
    </ReactLenis>
  );
}
