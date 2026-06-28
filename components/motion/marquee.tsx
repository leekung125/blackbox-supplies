"use client";

import { motion, useReducedMotion } from "motion/react";
import { BrandMark } from "@/components/wordmark";

/** Kinetic brand marquee — slow, cinematic, edge-faded. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const row = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className ?? ""}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-base to-transparent sm:w-32" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-base to-transparent sm:w-32" />
      <motion.div
        className="flex shrink-0 items-center"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 34, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 pr-8">
            <span className="mono whitespace-nowrap text-sm uppercase tracking-[0.32em] text-ink-faint">
              {t}
            </span>
            <BrandMark className="h-3.5 w-3.5 shrink-0 opacity-35" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
