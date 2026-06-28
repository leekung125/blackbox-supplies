import type { ReactNode } from "react";

type BadgeVariant = "default" | "outline" | "accent" | "warn";

const VARIANTS: Record<BadgeVariant, string> = {
  default: "border-line bg-card-2 text-ink-dim",
  outline: "border-line bg-transparent text-ink-faint",
  accent: "border-accent/40 bg-accent/10 text-accent-bright",
  warn: "border-warn/40 bg-warn/10 text-warn",
};

/**
 * Small shadcn-style badge we own outright (no external dependency).
 * Mono, letter-spaced, hairline border — the quiet HUD tag.
 */
export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.16em] ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
