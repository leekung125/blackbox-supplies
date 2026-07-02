"use client";

import { useEffect, useState } from "react";

/** Counts up to `to` on mount (eased, ~1.2s). Used for above-the-fold hero stats. */
export function CountUp({ to, suffix = "", className = "" }: { to: number; suffix?: string; className?: string }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    let raf = 0;
    const startTimer = setTimeout(() => {
      const start = performance.now();
      const dur = 1200;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / dur);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, 300);
    return () => {
      clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <span className={className}>
      {n}
      {suffix}
    </span>
  );
}
