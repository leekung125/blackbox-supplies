"use client";

import { useEffect, useState } from "react";
import type { ResolvedPick } from "@/lib/affiliate-picks";

/**
 * Mobile-only sticky bottom bar with the product / top pick + Check-price CTA.
 * Appears after the reader scrolls past the buy box, so the buy action is always one tap away.
 * Accepts either a resolved guide pick or explicit product fields (name/priceRange/affiliateUrl).
 * Passive scroll listener + state only flips on threshold crossing (INP-safe).
 */
export function StickyBuyBar({
  pick,
  name,
  priceRange,
  affiliateUrl,
}: {
  pick?: ResolvedPick;
  name?: string;
  priceRange?: string;
  affiliateUrl?: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const label = name ?? pick?.name;
  const href = affiliateUrl ?? pick?.affiliateUrl;
  const price = priceRange ?? pick?.priceRange;
  if (!href || !label) return null;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line-strong bg-surface/95 px-4 py-2.5 backdrop-blur transition-transform duration-300 sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-strong">Top pick</p>
          <p className="truncate text-xs font-medium text-ink">
            {label}
            {price ? <span className="text-ink-faint"> · {price}</span> : null}
          </p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="shrink-0 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent"
        >
          Check price on Amazon
        </a>
      </div>
    </div>
  );
}
