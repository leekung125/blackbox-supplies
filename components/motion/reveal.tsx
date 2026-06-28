"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/** Premium easing — expo-out (fast in, long settle). The single most important "feel" value. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/** A single scroll-triggered reveal: fade + rise, runs once when it enters view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  blur?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** A container that staggers its <StaggerItem> children as the group enters view. */
export function Stagger({
  children,
  className,
  delayChildren = 0.04,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  const container: Variants = {
    hidden: {},
    show: { transition: { delayChildren, staggerChildren: stagger } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: EASE } },
};

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
