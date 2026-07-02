"use client";

import { track } from "@vercel/analytics";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { outboundRel } from "@/lib/products";
import { getFindOutbound, type RareFind } from "@/lib/rare-finds";

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M7 17 L17 7 M9 7 H17 V15" />
    </svg>
  );
}

type Variant = "primary" | "ghost";

const VARIANT_CLASS: Record<Variant, string> = {
  primary: "bg-accent text-on-accent font-semibold hover:bg-accent-strong",
  ghost: "border border-line-strong text-ink font-semibold hover:border-accent hover:text-accent bg-surface",
};

/**
 * The single outbound CTA for a rare find → the specific Amazon product page
 * (uses `affiliateUrl` once it exists, else the real Amazon source link — never fabricated).
 * Honest by design: names the retailer ("Amazon"), never claims a live price.
 */
export function FindOutbound({
  find,
  label,
  variant = "primary",
  disclosure = "full",
  className = "",
}: {
  find: RareFind;
  label?: string;
  variant?: Variant;
  disclosure?: "full" | "compact" | "none";
  className?: string;
}) {
  const { href, isAffiliate } = getFindOutbound(find);
  const text = label ?? "Check price on Amazon";

  return (
    <div className={className}>
      <a
        href={href}
        target="_blank"
        rel={outboundRel(isAffiliate)}
        onClick={() => track("find_outbound", { find: find.id, category: find.category, affiliate: isAffiliate })}
        className={`group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm transition-colors ${VARIANT_CLASS[variant]}`}
      >
        <span>{text}</span>
        <ExternalArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      {isAffiliate && disclosure !== "none" ? (
        <AffiliateDisclosure variant={disclosure === "compact" ? "compact" : "full"} className="mt-2" />
      ) : null}
    </div>
  );
}
