"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const SIZE = 620;

/**
 * Ambient cursor light — a soft cold-blue spotlight that trails the pointer across the whole site.
 * Uses `mix-blend-mode: screen`, so it only ever LIGHTENS: on the near-black ground it reads as a
 * living glow, and it can never reduce the contrast of the light text sitting on top. Desktop +
 * fine-pointer only; respects reduced-motion. Renders nothing where it isn't wanted.
 */
export function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 130, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 130, damping: 24, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX - SIZE / 2);
      y.set(e.clientY - SIZE / 2);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden md:block"
      style={{
        x: sx,
        y: sy,
        width: SIZE,
        height: SIZE,
        background:
          "radial-gradient(circle, rgba(91,147,184,0.11), rgba(91,147,184,0.045) 36%, transparent 68%)",
        mixBlendMode: "screen",
      }}
    />
  );
}
