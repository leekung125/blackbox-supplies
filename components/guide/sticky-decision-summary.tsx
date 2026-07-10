"use client";

import { track } from "@vercel/analytics";
import type { ComparableProduct } from "@/lib/comparison-schema";

export type DecisionSlot = "overall" | "value" | "premium";

export interface DecisionPick {
  slot: DecisionSlot;
  label: string;
  product: ComparableProduct;
}

/**
 * StickyDecisionSummary — a slim desktop rail that pins under the header on long comparison guides.
 * Left: the three decisions a buyer is really choosing between (Best overall · value · premium) as
 * quick jump-to chips. Right: the CURRENT spotlight from the live board + a persistent "Check price"
 * so the buy action is never more than one glance away. Desktop only (lg+) — mobile reuses the
 * existing bottom StickyCta. Pure CSS `position: sticky`, so it's reduced-motion safe by design.
 */
export function StickyDecisionSummary({
  picks,
  hero,
  onJump,
}: {
  picks: DecisionPick[];
  hero: ComparableProduct;
  onJump: (productId: string) => void;
}) {
  return (
    <div className="sticky top-[4.75rem] z-30 mb-5 hidden lg:block">
      <div className="lit-card grad-border-amber flex items-center gap-4 rounded-2xl px-4 py-2.5">
        {/* the three decisions as jump chips */}
        <span className="eyebrow eyebrow-accent shrink-0">Jump to</span>
        <div className="flex min-w-0 flex-1 items-stretch gap-2">
          {picks.map((pk) => (
            <button
              key={pk.slot}
              type="button"
              onClick={() => {
                onJump(pk.product.id);
                track("decision_jump", { slot: pk.slot, product: pk.product.id });
              }}
              className="group flex min-w-0 flex-1 flex-col items-start rounded-xl border border-line-strong bg-surface px-3 py-1.5 text-left transition-colors hover:border-accent/50"
            >
              <span className="mono text-[0.54rem] uppercase tracking-[0.12em] text-accent-strong">{pk.label}</span>
              <span className="mt-0.5 w-full truncate text-[0.82rem] font-semibold text-ink group-hover:text-accent-bright">
                {pk.product.brand}{" "}
                <span className="font-normal text-ink-dim">{shortName(pk.product)}</span>
              </span>
            </button>
          ))}
        </div>

        {/* the live spotlight + persistent buy */}
        <div className="flex shrink-0 items-center gap-3 border-l border-line-soft pl-4">
          <div className="text-right">
            <p className="mono text-[0.54rem] uppercase tracking-[0.14em] text-ink-faint">★ Spotlight</p>
            <p className="max-w-[13rem] truncate text-[0.82rem] font-semibold text-ink-strong">{hero.name}</p>
          </div>
          <SpotlightCta hero={hero} />
        </div>
      </div>
    </div>
  );
}

function SpotlightCta({ hero }: { hero: ComparableProduct }) {
  if (!hero.affiliateUrl) {
    return (
      <span
        className="inline-flex shrink-0 items-center rounded-full border border-line-strong px-4 py-2 text-[0.8rem] font-semibold text-ink-faint"
        title="No verified Amazon listing for this exact model yet."
      >
        Verifying
      </span>
    );
  }
  return (
    <a
      href={hero.affiliateUrl}
      target="_blank"
      rel="sponsored nofollow noopener noreferrer"
      onClick={() => track("decision_outbound", { product: hero.id, category: hero.category, where: "decision_rail", affiliate: true })}
      className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[0.8rem] font-semibold text-on-accent shadow-[0_10px_30px_-12px_rgba(217,154,69,0.7)] transition-colors hover:bg-accent-strong"
    >
      Check price
      <svg
        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M7 17 L17 7 M9 7 h8 v8" />
      </svg>
    </a>
  );
}

/** Trim the brand off the front of the model name so the chip reads "Brand · model" cleanly. */
function shortName(p: ComparableProduct): string {
  const n = p.name.startsWith(p.brand) ? p.name.slice(p.brand.length).trim() : p.name;
  return n.length > 26 ? `${n.slice(0, 24)}…` : n;
}
