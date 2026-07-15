"use client";

import Script from "next/script";
import { track } from "@/lib/analytics";
import { getCheckoutUrl } from "@/lib/lemon";

/**
 * The Systems buy button — the ONE glowing amber lamp on a Systems page, styled with the same
 * `.cta-amber` treatment as the affiliate <BuyCta> so the two revenue layers read as one
 * publication. But this button is verbally + behaviorally DISTINCT from an affiliate pick:
 * it opens OUR Lemon Squeezy checkout (we earn the full price), never an Amazon link.
 *
 * Behavior:
 *  - Fires the typed `checkout_start` event on click (KPI_SCORECARD §1).
 *  - Opens the Lemon Squeezy OVERLAY when lemon.js has loaded (anchor carries the
 *    `lemonsqueezy-button` class LS auto-binds); if the script hasn't/can't load, the exact same
 *    anchor is a normal link to the HOSTED checkout — graceful degradation, no broken button.
 *  - Degrades to a disabled "coming soon" state when no checkout URL env is set yet, so the whole
 *    /systems layer ships and renders BEFORE the Lemon Squeezy account exists (the launch is not
 *    blocked on the human account step).
 *
 * HONEST, NO DARK PATTERNS: no countdown, no fake scarcity, no pre-checked anything. Just a price
 * and a button (BEHAVIORAL_UX; IMPLEMENTATION_PLAN §11).
 *
 * Deliberately decoupled from the `System` type (lib/systems.ts) — it takes only the primitives it
 * needs so the data model and the checkout seam can evolve independently.
 */
export function BuyButton({
  slug,
  price,
  label,
  block = false,
  className = "",
  note,
  checkoutUrl: checkoutUrlProp,
}: {
  /** Product slug — used to resolve the env-driven checkout URL and as purchase attribution. */
  slug: string;
  /** Exact USD price shown in the default label (e.g. 19). */
  price: number;
  /** Optional override for the button label. Defaults to "Get it — $19"-style. */
  label?: string;
  /** Full-width button. */
  block?: boolean;
  className?: string;
  /** Optional small line rendered under the button (e.g. the delivery/refund spec). */
  note?: string;
  /**
   * RECOMMENDED CONTRACT: the server page resolves the URL with `getCheckoutUrl(slug)` (from
   * lib/lemon.ts) and passes it here. This is the only path that works for non-flagship SKUs and
   * server-only env forms (see the Next 16 client/server note in lib/lemon.ts). Pass `null`
   * explicitly to force the "coming soon" state. Omit it entirely to let the button self-resolve
   * the flagship's public `NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL` as a drop-in fallback.
   */
  checkoutUrl?: string | null;
}) {
  // Prefer the server-resolved prop; otherwise self-resolve (works for the flagship's public var).
  // `undefined` prop = "not passed" → self-resolve; `null` prop = "explicitly not configured".
  const checkoutUrl =
    checkoutUrlProp === undefined ? getCheckoutUrl(slug, { dark: true }) : checkoutUrlProp;
  const buttonLabel = label ?? `Get it — $${price}`;

  // ── Not wired yet: honest disabled "coming soon" (launch ships before the LS account exists) ──
  if (!checkoutUrl) {
    return (
      <div className={className}>
        <span
          aria-disabled="true"
          className={`cta-amber pointer-events-none opacity-55 ${block ? "w-full justify-center" : ""}`}
          style={{ filter: "saturate(0.7)" }}
        >
          <span>Available soon</span>
        </span>
        <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-[color:var(--color-muted,#8a7f6a)]">
          Checkout opening shortly — the files are ready.
        </p>
      </div>
    );
  }

  // ── Wired: overlay when lemon.js loads, hosted-link fallback otherwise ──
  return (
    <div className={className}>
      {/* lemon.js auto-binds any anchor with the `lemonsqueezy-button` class to the overlay.
          afterInteractive so it never blocks paint; if it fails to load the anchor is a plain link. */}
      <Script
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="afterInteractive"
      />
      <a
        href={checkoutUrl}
        className={`cta-amber lemonsqueezy-button group ${block ? "w-full justify-center" : ""}`}
        onClick={() => track("checkout_start", { product: slug })}
        // Hosted-link fallback semantics when the overlay script isn't active.
        target="_blank"
        rel="noopener"
      >
        <span>{buttonLabel}</span>
        <ExternalArrow className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </a>
      {note ? (
        <p className="mt-3 text-sm text-[color:var(--color-muted,#8a7f6a)]">{note}</p>
      ) : null}
    </div>
  );
}

function ExternalArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.1}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 L17 7 M9 7 H17 V15" />
    </svg>
  );
}
