"use client";

import { useEffect, useRef } from "react";
import { NewsletterForm } from "@/components/newsletter-form";
import { track } from "@/lib/analytics";

/**
 * InlineMagnet — the mid-content FREE lead-magnet capture block (Wave 3 / OFFER_PLACEMENT_MAP S2).
 *
 * The free rung of the relationship, offered BEFORE any paid card (CROSS_SELL_RULES §4.3). It reuses
 * the existing {@link NewsletterForm} for the actual email capture (one field, one verb — no extra
 * fields), matched to a content cluster via the `magnet` prop. It is deliberately styled as a FREE
 * download (a download/checklist glyph, no price), so it never reads as the paid ToolCard.
 *
 * Honest by construction: names its contents concretely (BEHAVIORAL_UX §2), states cadence, never
 * gates a free answer, and only ONE renders per page (the consumer enforces one-per-page).
 *
 * Instrumentation (KPI §1): `lead_magnet_view {magnet,path,slot}` once on viewport entry;
 * `lead_magnet_signup {magnet,path,slot}` on capture; and — via the reused NewsletterForm — a
 * `newsletter_signup {captured,source}` with the surface attribution.
 */

export interface InlineMagnetProps {
  /** Which free magnet to offer — matches the page's content cluster (CS-2). */
  magnet?: "glovebox-card" | "outage-card" | "cooling-worksheet" | "trip-prep";
  /** Placement slot for analytics (e.g. "guide-s2", "article-s2"). */
  slot?: string;
  /** The page path the block sits on — for analytics attribution. */
  path: string;
  /** Override the newsletter_signup `source`. Defaults to the magnet id (surface + cluster signal). */
  source?: string;
  /** Optional copy overrides — the defaults are honest, contents-named copy per magnet. */
  heading?: string;
  dek?: string;
  className?: string;
}

interface MagnetMeta {
  name: string;
  heading: string;
  /** Contents-named blurb (never an adjective — the pages ARE the copy, BEHAVIORAL_UX §2). */
  dek: string;
}

const MAGNETS: Record<NonNullable<InlineMagnetProps["magnet"]>, MagnetMeta> = {
  "glovebox-card": {
    name: "The Glovebox Card",
    heading: "Get the free Glovebox Card",
    dek: "The contacts page and the roadside action protocol — two of the eight systems, condensed to one printable card. Free. Keep it in the car before you need it.",
  },
  "outage-card": {
    name: "The Outage Card",
    heading: "Get the free Outage Card",
    dek: "The first-ten-minutes-of-an-outage card plus a fridge and freezer food-safety timing chart. One page, free.",
  },
  "cooling-worksheet": {
    name: "The Cooling Worksheet",
    heading: "Get the free Cooling Worksheet",
    dek: "Room-size to BTU sizing worksheet plus the portable-AC hose-setup checklist — the two things people get wrong. Free.",
  },
  "trip-prep": {
    name: "The Trip-Prep Checklist",
    heading: "Get the free Trip-Prep Checklist",
    dek: "The one-page pre-departure road-trip checklist — car, power, and documents, in the order you pack them. Free.",
  },
};

/** Fire a callback exactly once, when `ref` first enters the viewport (falls back to mount). */
function useViewOnce(ref: React.RefObject<HTMLElement | null>, cb: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      cb();
      return;
    }
    let fired = false;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !fired) {
            fired = true;
            cb();
            io.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function InlineMagnet({
  magnet = "glovebox-card",
  slot = "s2",
  path,
  source,
  heading,
  dek,
  className = "",
}: InlineMagnetProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const meta = MAGNETS[magnet];
  const src = source ?? magnet;

  useViewOnce(ref, () => track("lead_magnet_view", { magnet, path, slot }));

  return (
    <aside
      ref={ref}
      className={`lit-card grad-border-amber relative isolate overflow-hidden rounded-2xl p-5 sm:p-6 ${className}`}
    >
      <span
        aria-hidden
        className="glow-amber-soft"
        style={{ top: "-3rem", right: "-2rem", width: "14rem", height: "8rem" }}
      />

      <div className="relative flex items-start gap-4">
        {/* free-download glyph — a page pulled down into a tray. Distinct from the paid ToolCard mark. */}
        <span
          className="focal-glow grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
          style={{
            border: "1px solid #edba66bb",
            background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
            boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
          }}
          aria-hidden
        >
          <svg
            className="h-6 w-6 text-accent-bright"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 3 V13 M8.5 9.5 L12 13 L15.5 9.5" />
            <path d="M5 15 V18 A2 2 0 0 0 7 20 H17 A2 2 0 0 0 19 18 V15" />
          </svg>
        </span>

        <div className="min-w-0 flex-1">
          <span className="mono text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-accent-strong">
            Free download · {meta.name}
          </span>
          <h3 className="mt-1.5 font-display text-xl font-semibold leading-tight text-ink-strong">
            {heading ?? meta.heading}
          </h3>
          <p className="mt-2 text-[0.92rem] leading-relaxed text-ink-dim">{dek ?? meta.dek}</p>

          <div className="mt-4">
            <NewsletterForm
              tone="dark"
              source={src}
              onCaptured={() => track("lead_magnet_signup", { magnet, path, slot })}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default InlineMagnet;
