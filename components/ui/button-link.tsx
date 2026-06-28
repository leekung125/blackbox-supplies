import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const VARIANT: Record<Variant, string> = {
  primary:
    "bg-accent text-[#04141d] font-medium hover:bg-accent-bright border border-accent/60 shadow-[0_8px_24px_-12px_rgba(77,139,176,0.7)]",
  ghost:
    "border border-line text-ink hover:border-accent/60 hover:text-accent-bright bg-card/40",
};

/** Internal Link styled as a button. Mirrors the OutboundLink visual language. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm transition-colors ${VARIANT[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
