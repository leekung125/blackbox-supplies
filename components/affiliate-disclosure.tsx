import Link from "next/link";
import { BRAND } from "@/lib/content";

/**
 * Inline affiliate disclosure. Render this ONLY next to an actual affiliate
 * (monetized) link — i.e. when a product's `affiliateUrl` is non-empty.
 * FTC material-connection disclosure, clear and conspicuous. Entity name is
 * always the registered `BRAND.name` (INCONSISTENCY_REPORT §5).
 */
export function AffiliateDisclosure({
  variant = "full",
  className = "",
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <span
        className={`mono inline-flex items-center gap-1 text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint ${className}`}
      >
        <span className="text-accent/80" aria-hidden>
          •
        </span>
        Affiliate link
      </span>
    );
  }

  return (
    <p className={`text-xs leading-relaxed text-ink-dim ${className}`}>
      <span className="mono uppercase tracking-[0.14em] text-accent-bright">
        Disclosure ·{" "}
      </span>
      As an Amazon Associate, {BRAND.name} earns from qualifying purchases — at
      no extra cost to you. See our{" "}
      <Link
        href="/disclosure"
        className="text-ink-dim underline decoration-line underline-offset-2 transition-colors hover:text-accent-bright"
      >
        full disclosure
      </Link>
      .
    </p>
  );
}
