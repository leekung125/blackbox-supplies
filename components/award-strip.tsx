"use client";

import Image from "next/image";
import { track } from "@vercel/analytics";
import { motion, useReducedMotion } from "motion/react";
import type { ResolvedPick } from "@/lib/affiliate-picks";

const REL = "sponsored nofollow noopener noreferrer";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * EVERYTHING WE RECOMMEND — an above-the-fold award row for buying guides.
 *
 * Roughly half of guide readers never scroll to the numbered picks, so this puts the
 * whole shortlist — each with a role award, a thumbnail, a price, and a direct
 * Check-price CTA — one tap away at the top of the page. The lead pick is visually
 * elevated (amber ring + glow) as the Top Pick; the rest carry their editorial role.
 */
export function AwardStrip({ picks, anchor = "the-picks" }: { picks: ResolvedPick[]; anchor?: string }) {
  const reduce = useReducedMotion();
  if (!picks.length) return null;

  // A tight, scannable strip — the shortlist, not the whole roster.
  const shown = picks.slice(0, 4);
  const cols = shown.length <= 2 ? "sm:grid-cols-2" : shown.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section aria-label="Everything we recommend" className="not-prose my-9">
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-2">
          <span aria-hidden className="text-accent-bright">★</span>
          <h2 className="mono text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-accent-strong">
            Everything we recommend
          </h2>
        </div>
        <a
          href={`#${anchor}`}
          className="mono hidden shrink-0 text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-accent sm:inline"
        >
          Jump to full picks ↓
        </a>
      </div>

      <div className={`mt-4 grid grid-cols-2 gap-3 sm:gap-4 ${cols}`}>
        {shown.map((p, i) => {
          const isTop = i === 0;
          const role = isTop ? "Top Pick" : p.label ?? "Also great";
          return (
            <motion.article
              key={p.id}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: reduce ? 0 : 0.04 * i }}
              className={`bbx-card card-lift flex flex-col overflow-hidden ${
                isTop ? "ring-1 ring-accent/45 shadow-[0_18px_44px_-22px_rgba(217,154,69,0.55)]" : ""
              }`}
            >
              {/* media stage */}
              <a
                href={`#${anchor}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden border-b border-line bg-[#0c0906]"
              >
                {isTop ? <span className="glow-blob absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 opacity-70" aria-hidden /> : null}
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 15rem, (min-width: 640px) 33vw, 45vw"
                    className="relative object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
                {/* role award badge */}
                <span
                  className={`absolute left-2 top-2 rounded-full px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.08em] ${
                    isTop
                      ? "bg-accent text-on-accent shadow-[0_6px_16px_-6px_rgba(217,154,69,0.8)]"
                      : "border border-accent/35 bg-[#120d07]/85 text-accent-bright backdrop-blur"
                  }`}
                >
                  {isTop ? `★ ${role}` : role}
                </span>
              </a>

              {/* content */}
              <div className="flex flex-1 flex-col p-3 sm:p-3.5">
                <span className="mono text-[0.56rem] uppercase tracking-[0.14em] text-ink-faint">{p.brand}</span>
                <h3 className="mt-1 line-clamp-2 font-display text-[0.9rem] font-semibold leading-tight text-ink-strong sm:text-[0.98rem]">
                  {p.name}
                </h3>
                <p className="nums mt-1.5 font-display text-sm font-semibold text-accent-bright">{p.priceRange}</p>

                <a
                  href={p.affiliateUrl}
                  target="_blank"
                  rel={REL}
                  onClick={() => track("award_strip_outbound", { product: p.id, role, affiliate: true })}
                  className={`group mt-3 inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[0.76rem] font-semibold transition-colors ${
                    isTop
                      ? "bg-accent text-on-accent shadow-[0_10px_26px_-12px_rgba(217,154,69,0.7)] hover:bg-accent-strong"
                      : "border border-line-strong text-accent hover:border-accent hover:bg-accent hover:text-on-accent"
                  }`}
                >
                  Check price on Amazon
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
                </a>
              </div>
            </motion.article>
          );
        })}
      </div>

      <p className="mt-3 text-[0.68rem] leading-relaxed text-ink-dim">
        As an Amazon Associate, BlackBox earns from qualifying purchases — at no extra cost to you.
      </p>
    </section>
  );
}
