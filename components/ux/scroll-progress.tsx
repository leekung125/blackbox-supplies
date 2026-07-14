"use client";

import { useEffect, useState } from "react";

/**
 * Thin amber reading-progress bar pinned to the very top of the viewport, above the sticky header.
 * Width tracks how far down the page you've scrolled. Purely decorative (aria-hidden).
 */
export function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5" aria-hidden>
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${pct / 100})`,
          background: "linear-gradient(90deg, #d99a45, #edba66)",
          boxShadow: "0 0 12px -2px rgba(217,154,69,0.8)",
        }}
      />
    </div>
  );
}
