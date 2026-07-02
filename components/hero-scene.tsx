"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/**
 * Interactive hero scene — the visual FOLLOWS THE USER, it does not loop.
 * - cursor: a subtle 3D parallax tilt of the scene + a warm light that tracks the mouse
 * - scroll: the scene drifts up + fades as you scroll past (scroll-linked, not autoplay)
 * - prefers-reduced-motion: a clean static frame, no motion at all
 * No zooming-on-repeat. The premium feel comes from response to input, not playback.
 */
export function HeroScene({ poster }: { poster: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // scroll-linked drift + fade
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const driftY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.32]);

  // cursor-linked tilt + light
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 60, damping: 18, mass: 0.4 });
  const rotateY = useTransform(sx, [0, 1], ["2.4deg", "-2.4deg"]);
  const rotateX = useTransform(sy, [0, 1], ["-2.4deg", "2.4deg"]);
  const lightX = useTransform(sx, [0, 1], ["6%", "94%"]);
  const lightY = useTransform(sy, [0, 1], ["4%", "96%"]);
  const light = useMotionTemplate`radial-gradient(40% 46% at ${lightX} ${lightY}, rgba(224, 163, 82, 0.18), transparent 70%)`;

  function onMove(e: MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="absolute inset-0 -z-10 overflow-hidden"
      style={{ perspective: 1200 }}
      aria-hidden
    >
      <motion.div
        style={reduce ? undefined : { y: driftY, opacity: fade, rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="absolute -inset-[7%] will-change-transform"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* warm light that follows the cursor */}
      {reduce ? null : <motion.div className="pointer-events-none absolute inset-0" style={{ background: light }} />}

      {/* legibility scrims (warm-dark, left-weighted) */}
      <div className="absolute inset-0 bg-gradient-to-r from-paper via-paper/82 to-paper/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/30 to-transparent" />
    </div>
  );
}
