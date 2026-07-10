"use client";

import { useEffect, useRef } from "react";

/**
 * A calm, interactive background. A deep dark base with a faint grid and two soft static blooms,
 * plus a warm glow that smoothly follows the cursor (the "moves with the cursor" feel, without the
 * nauseating high-frequency noise). No WebGL, no fire. Reduced-motion drops the follow.
 */
export function Atmosphere() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let mx = 0.5, my = 0.32, tx = 0.5, ty = 0.32, raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth;
      ty = e.clientY / window.innerHeight;
    };
    if (!reduce) window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      mx += (tx - mx) * 0.055;
      my += (ty - my) * 0.055;
      el.style.setProperty("--mx", (mx * 100).toFixed(2) + "%");
      el.style.setProperty("--my", (my * 100).toFixed(2) + "%");
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10" aria-hidden style={{ ["--mx" as string]: "50%", ["--my" as string]: "32%" }}>
      <div className="absolute inset-0 bg-[#070504]" />
      <div className="atmo-blooms absolute inset-0" />
      <div className="atmo-grid absolute inset-0" />
      <div className="atmo-cursor absolute inset-0" />
      {/* seat content top/bottom */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,7,5,0.5) 0%, transparent 18%, transparent 82%, rgba(10,7,5,0.55) 100%)" }} />
    </div>
  );
}
