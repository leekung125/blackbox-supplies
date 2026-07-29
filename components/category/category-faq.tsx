"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Faq } from "@/components/category/category-data";

/**
 * Buyer FAQ accordion — honest, category-specific Q&A. One panel open at a time; smooth
 * height/opacity reveal, fully reduced-motion guarded (the panel just snaps open). Tap targets are
 * the whole row (≥44px). The matching FAQPage JSON-LD is emitted server-side by the page.
 *
 * EVERY answer stays in the DOM and collapses with CSS (grid-template-rows 1fr → 0fr) — it must
 * never unmount. An earlier version rendered only the open panel, so three of the four answers the
 * page marks up as FAQPage were absent from the served/rendered HTML. Structured data has to match
 * content that's actually on the page; a mismatch is what gets FAQ rich results revoked.
 */
export function CategoryFaq({ faqs }: { faqs: Faq[] }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number | null>(0);

  if (!faqs.length) return null;

  const EASE = "cubic-bezier(0.16,1,0.3,1)";

  return (
    <div className="mt-8 space-y-3">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        const panelId = `cat-faq-${i}`;
        return (
          <div key={f.q} className={`lit-card overflow-hidden ${isOpen ? "grad-border-amber" : ""}`}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-raised/40 sm:px-6 sm:py-5"
              >
                <span className="font-display text-lg font-semibold leading-snug text-ink-strong">{f.q}</span>
                <span
                  aria-hidden
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line-strong text-accent-bright transition-transform duration-300 ${isOpen ? "rotate-45 border-accent/50" : ""}`}
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 5 V19 M5 12 H19" />
                  </svg>
                </span>
              </button>
            </h3>

            {/* Collapsed = a 0fr grid row, not an unmount. The inner overflow-hidden is what lets
                the row actually collapse to zero (grid items default to min-height: auto). */}
            <div
              id={panelId}
              className="grid"
              style={{
                gridTemplateRows: isOpen ? "1fr" : "0fr",
                opacity: isOpen ? 1 : 0,
                transition: reduce
                  ? "none"
                  : `grid-template-rows 0.34s ${EASE}, opacity 0.34s ${EASE}`,
              }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[0.98rem] leading-relaxed text-ink-dim sm:px-6 sm:pb-6">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
