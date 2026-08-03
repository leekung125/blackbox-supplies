"use client";

import { track } from "@vercel/analytics";
import type { ReactNode } from "react";

/**
 * An outbound affiliate anchor that reports the click.
 *
 * WHY THIS EXISTS. `OutboundLink` has tracked `product_outbound` since it was written, but seven
 * raw `<a href={p.affiliateUrl}>` anchors bypassed it — including the ones inside `guide-picks`
 * and `comparison-board`, which sit on all 60 guide pages. Those pages are where the SEO traffic
 * lands, so the one metric that matters for an affiliate business (which guide sends someone to
 * Amazon) was missing precisely where most of the clicks happen. Partial data reads as real data,
 * which is worse than none: a guide with no recorded clicks looked like a guide nobody clicked.
 *
 * This is deliberately a thin anchor rather than a copy of OutboundLink. OutboundLink owns the
 * product CTA and its disclosure; this exists only so a server component can render a tracked
 * link inline without becoming a client component itself.
 *
 * `rel` is required rather than defaulted — an affiliate link that loses `sponsored` is an FTC
 * problem, and a default is exactly how that goes missing.
 */
export function TrackedAffiliateLink({
  href,
  rel,
  className,
  productId,
  surface,
  children,
}: {
  href: string;
  rel: string;
  className?: string;
  /** Which product was clicked — the join key back to the catalogue. */
  productId: string;
  /** Where on the site the click happened, so we can tell a guide click from a card click. */
  surface: string;
  children: ReactNode;
}) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel={rel}
      onClick={() => track("product_outbound", { product: productId, surface, affiliate: true })}
      className={className}
    >
      {children}
    </a>
  );
}
