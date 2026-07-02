import type { ReactNode } from "react";

/**
 * Trust band — the credibility layer, stated plainly. Answers "why should I trust this?"
 * Honest by construction: independent curation, source links, never overclaimed.
 * Stacks cleanly on mobile (divide-y), becomes three columns on larger screens (divide-x).
 */

const CUES: { title: string; sub: string; icon: ReactNode }[] = [
  {
    title: "Independently chosen",
    sub: "Curated from public research and real specs — never a paid placement.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="2.5" />
        <path d="M12 1.5v3M12 19.5v3M1.5 12h3M19.5 12h3" />
      </svg>
    ),
  },
  {
    title: "Always source-linked",
    sub: "Every pick points to a retailer or review source. No dead ends.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 15l6-6" />
        <path d="M11 6l1-1a4 4 0 0 1 6 6l-1 1" />
        <path d="M13 18l-1 1a4 4 0 0 1-6-6l1-1" />
      </svg>
    ),
  },
  {
    title: "Never overclaimed",
    sub: "Honest specs from real sources — no fabricated reviews, ratings, or results.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.5l7.5 3v6c0 4.5-3 7.8-7.5 9.5-4.5-1.7-7.5-5-7.5-9.5v-6z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

export function TrustStrip() {
  return (
    <section className="border-y border-line bg-panel/40">
      <div className="mx-auto grid max-w-6xl grid-cols-1 divide-y divide-line px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6">
        {CUES.map((c) => (
          <div key={c.title} className="flex items-start gap-3.5 py-5 sm:px-6 sm:py-6 sm:first:pl-0 sm:last:pr-0">
            <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line bg-card/60 text-accent-bright [&>svg]:h-[18px] [&>svg]:w-[18px]">
              {c.icon}
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ink">{c.title}</p>
              <p className="mt-1 text-[0.8rem] leading-relaxed text-ink-dim">{c.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
