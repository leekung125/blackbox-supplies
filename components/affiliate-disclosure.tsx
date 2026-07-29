import Link from "next/link";
import { DISCLOSURE_SHORT } from "@/lib/content";

/**
 * Inline affiliate disclosure. Render this ONLY next to an actual affiliate
 * (monetized) link — i.e. when a product's `affiliateUrl` is non-empty.
 * FTC material-connection disclosure, clear and conspicuous.
 * Wording comes from lib/content.ts so every surface names the brand identically.
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
      {DISCLOSURE_SHORT} See our{" "}
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
