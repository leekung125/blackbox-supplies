"use client";

import { track } from "@vercel/analytics";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { getOutboundLink, outboundRel, type Product } from "@/lib/products";

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 L17 7 M9 7 H17 V15" />
    </svg>
  );
}

/**
 * The hero buy action — the ONE glowing amber lamp of the page. Reuses the same honest
 * outbound plumbing as <OutboundLink> (getOutboundLink → the real Amazon/affiliate URL,
 * the sponsored rel, the FTC disclosure, the same analytics event) but wears the lit
 * `.cta-amber` treatment instead of the flat pill. Never fabricates a price or retailer.
 */
export function BuyCta({
  product,
  label = "Check price on Amazon",
  block = false,
  disclosure = "full",
  className = "",
}: {
  product: Product;
  label?: string;
  block?: boolean;
  disclosure?: "full" | "compact" | "none";
  className?: string;
}) {
  const { href, isAffiliate } = getOutboundLink(product);
  if (!href) return null;

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel={outboundRel(isAffiliate)}
        onClick={() => track("product_outbound", { product: product.id, category: String(product.category), affiliate: isAffiliate })}
        className={`cta-amber group ${block ? "w-full justify-center" : ""}`}
      >
        <span>{label}</span>
        <ExternalArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      {isAffiliate && disclosure !== "none" ? (
        <AffiliateDisclosure variant={disclosure === "compact" ? "compact" : "full"} className="mt-3" />
      ) : null}
    </div>
  );
}
