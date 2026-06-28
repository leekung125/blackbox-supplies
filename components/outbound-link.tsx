"use client";

import { track } from "@vercel/analytics";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { getOutboundLink, outboundRel, type Product } from "@/lib/products";

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 L17 7 M9 7 H17 V15" />
    </svg>
  );
}

type Variant = "primary" | "ghost";

const VARIANT_CLASS: Record<Variant, string> = {
  primary:
    "bg-accent text-[#04141d] font-medium hover:bg-accent-bright border border-accent/60 shadow-[0_8px_24px_-12px_rgba(77,139,176,0.7)]",
  ghost:
    "border border-line text-ink hover:border-accent/60 hover:text-accent-bright bg-card/40",
};

/**
 * The single outbound CTA for a product.
 * - Links to `affiliateUrl` if present, else `sourceUrl` (never fabricated).
 * - Affiliate links get rel="sponsored"; all get nofollow/noopener/noreferrer.
 * - When the link is a real affiliate link, the affiliate disclosure is shown
 *   nearby (full sentence by default, or a compact tag).
 */
export function OutboundLink({
  product,
  label,
  variant = "primary",
  disclosure = "full",
  className = "",
}: {
  product: Product;
  label?: string;
  variant?: Variant;
  disclosure?: "full" | "compact" | "none";
  className?: string;
}) {
  const { href, isAffiliate } = getOutboundLink(product);
  const text = label ?? (isAffiliate ? "View at retailer" : "View source");

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel={outboundRel(isAffiliate)}
        onClick={() => track("product_outbound", { product: product.id, category: product.category, affiliate: isAffiliate })}
        className={`group inline-flex items-center justify-center gap-2 rounded-sm px-4 py-2.5 text-sm transition-colors ${VARIANT_CLASS[variant]}`}
      >
        <span>{text}</span>
        <ExternalArrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      {isAffiliate && disclosure !== "none" ? (
        <AffiliateDisclosure
          variant={disclosure === "compact" ? "compact" : "full"}
          className="mt-2"
        />
      ) : null}
    </div>
  );
}
