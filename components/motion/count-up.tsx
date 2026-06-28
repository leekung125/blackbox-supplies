"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/** Counts 0 → `to` shortly after mount (used in the always-visible hero). Robust on mobile. */
export function CountUp({
  to,
  className,
  suffix = "",
}: {
  to: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 55, damping: 18, mass: 0.8 });

  useEffect(() => {
    if (reduce) {
      if (ref.current) ref.current.textContent = `${to}${suffix}`;
      return;
    }
    const t = setTimeout(() => mv.set(to), 300);
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return () => {
      clearTimeout(t);
      unsub();
    };
  }, [reduce, to, suffix, mv, spring]);

  return (
    <span ref={ref} className={className}>
      {reduce ? `${to}${suffix}` : `0${suffix}`}
    </span>
  );
}
