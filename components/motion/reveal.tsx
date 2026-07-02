import type { ReactNode } from "react";

/** Premium easing — expo-out (fast in, long settle). Kept exported for any callers. */
export const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * A reveal that fades + rises on mount via PURE CSS (`.rise`) — it ALWAYS ends
 * visible, so a section can never blank if JS/intersection fails (the hard-won
 * lesson from the homepage-blank saga). Extra props are accepted but ignored
 * for backwards compatibility with old call sites.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** @deprecated kept for compat */ y?: number;
  /** @deprecated kept for compat */ blur?: boolean;
}) {
  return (
    <div className={`rise ${className}`.trim()} style={delay ? { animationDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}

/** Container whose direct children stagger in via CSS (`.stagger-rise` nth-child delays). */
export function Stagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
  /** @deprecated kept for compat */ delayChildren?: number;
  /** @deprecated kept for compat */ stagger?: number;
}) {
  return <div className={`stagger-rise ${className}`.trim()}>{children}</div>;
}

/** A staggered child — the parent `.stagger-rise` animates it; this is just a wrapper. */
export function StaggerItem({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
