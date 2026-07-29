"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Counts up to `to` after mount.
 *
 * The SSR output is the REAL number, never 0. This renders the hero's credibility
 * statistics ("94+ researched picks", "60 buying guides"), and it used to
 * server-render `0`, only reaching the true value in a client effect — so every
 * crawler, AI answer engine, social scraper and no-JS visitor was served a gear
 * site advertising "0+ researched picks" and "0 buying guides", while the marquee
 * lower on the same page rendered the correct number. The count-up is decoration;
 * the number is the claim. The number wins, and the animation is now a progressive
 * enhancement applied only once JS has mounted.
 */
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
    // Reduced motion keeps the server-rendered value exactly as it is.
    if (reduce) return;
    const node = ref.current;
    if (!node) return;

    node.textContent = `0${suffix}`;
    const t = setTimeout(() => mv.set(to), 300);
    const unsub = spring.on("change", (v) => {
      if (ref.current) ref.current.textContent = `${Math.round(v)}${suffix}`;
    });
    return () => {
      clearTimeout(t);
      unsub();
      // Never leave a partial count behind on unmount.
      if (ref.current) ref.current.textContent = `${to}${suffix}`;
    };
  }, [reduce, to, suffix, mv, spring]);

  return (
    <span ref={ref} className={className}>
      {`${to}${suffix}`}
    </span>
  );
}
