"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TrackedAffiliateLink } from "@/components/tracked-affiliate-link";
import type { ResolvedPick } from "@/lib/affiliate-picks";

/**
 * Sticky bottom buy bar for guides + articles — ALL widths, not just phones.
 * (⛔ WAS `sm:hidden` — the bar existed only below 640px, so every tablet, laptop and desktop
 * reader had NO persistent buy action. On a 4,000-word guide that is ~3,000 words of scrolling
 * past the one inline buy box with no way back to it.)
 *
 * Design mirrors the product-page StickyCta (the house pattern): 44px thumbnail so the product
 * is recognisable, mono "Top pick" kicker, name + typical-price, one amber pill, and the FTC
 * disclosure ON the click-out surface itself. On sm+ it becomes a floating card (rounded,
 * inset, shadowed) instead of an edge-to-edge strip — an app-wide banner reads heavy on desktop.
 *
 * Appears after the reader scrolls past the buy box; passive scroll listener, state only flips
 * on threshold crossing (INP-safe). `inert` while hidden so the off-screen CTA can't take focus.
 * Accepts either a resolved guide pick or explicit product fields (name/priceRange/affiliateUrl).
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
      inert={!show}
      aria-hidden={!show}
      /* pointer-events-none on the WRAPPER, auto on the card: at sm+ the card is an inset
         max-w-3xl float, so a full-width click-catching wrapper would eat clicks in the
         gutters either side of it — including footer links sitting at the bottom edge. */
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 motion-reduce:transition-none sm:px-6 sm:pb-4 ${
        show ? "translate-y-0" : "translate-y-[110%]"
      }`}
    >
      {/* shadow value reused verbatim from StickyCta — one shadow language across both bars */}
      <div
        className="pointer-events-auto mx-auto max-w-3xl border-t border-line-strong bg-surface/95 px-4 pt-2.5 backdrop-blur sm:rounded-2xl sm:border sm:shadow-[0_-10px_40px_-18px_rgba(0,0,0,0.85)]"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 0.625rem)" }}
      >
        <div className="flex items-center gap-3">
          {pick?.image ? (
            <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-line bg-well">
              <Image src={pick.image} alt="" fill sizes="44px" className="object-cover" />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <p className="mono text-[0.58rem] uppercase tracking-[0.14em] text-accent-strong">Top pick</p>
            <p className="mt-0.5 truncate text-xs font-medium text-ink sm:text-[0.82rem]">
              {label}
              {/* catalog ranges are approximate — say so, never imply a live price */}
              {price ? <span className="nums text-ink-faint"> · {price} typical</span> : null}
            </p>
          </div>
          <TrackedAffiliateLink
            href={href}
            rel="sponsored nofollow noopener noreferrer"
            productId={pick?.id ?? "direct"}
            surface="sticky_buy_bar"
            className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgba(217,154,69,0.8)] transition-colors hover:bg-accent-strong sm:px-5"
          >
            <span className="sm:hidden">Check price</span>
            <span className="hidden sm:inline">Check price on Amazon</span>
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M7 17 L17 7 M9 7 h8 v8" />
            </svg>
          </TrackedAffiliateLink>
        </div>
        {/* FTC: disclosure on the click-out surface itself, not only the footer (matches StickyCta) */}
        <p className="mt-1 text-center text-[0.58rem] leading-tight tracking-wide text-ink-dim">
          #ad · Amazon affiliate link — we may earn a commission, at no extra cost to you.
        </p>
      </div>
    </div>
  );
}
