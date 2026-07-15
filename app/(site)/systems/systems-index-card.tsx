"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { System } from "@/lib/systems";

/**
 * The /systems index card — a premium TOOL card for an owned digital product. Deliberately its
 * OWN glyph family (a layered-document blueprint mark, never a product photo) so Systems read as
 * visually + verbally distinct from affiliate picks and are NEVER mistaken for an Amazon card
 * (trust-separation rule, INFORMATION_ARCHITECTURE §5.3). Fires system_card_click on navigation.
 */
export function SystemsIndexCard({ system, slot = "systems-index" }: { system: System; slot?: string }) {
  const available = system.status === "available";

  const inner = (
    <>
      <div className="relative flex items-start justify-between gap-4">
        {/* the System glyph — a layered blueprint/document stack, lit by one amber lamp */}
        <span
          className="focal-glow grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
          style={{
            border: "1px solid #edba66bb",
            background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
            boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
          }}
          aria-hidden
        >
          <svg className="h-6 w-6 text-accent-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 3 H15 L19 7 V19 A2 2 0 0 1 17 21 H7 A2 2 0 0 1 5 19 V5 A2 2 0 0 1 7 3 Z" />
            <path d="M15 3 V7 H19 M8.5 12 H15.5 M8.5 15.5 H15.5 M8.5 8.5 H11" />
          </svg>
        </span>
        <span className="pill-amber shrink-0">A BlackBox System</span>
      </div>

      <div className="relative mt-5">
        <h3 className="font-display text-2xl font-semibold text-ink-strong transition-colors group-hover:text-accent-bright">
          {system.title}
        </h3>
        <p className="mt-1.5 text-[0.95rem] font-medium text-accent-strong">{system.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">{system.promise}</p>
      </div>

      <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-baseline gap-2">
          {available ? (
            <>
              <span className="mono nums text-2xl font-semibold leading-none text-ink-strong">${system.price}</span>
              <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">one-time</span>
            </>
          ) : (
            <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">In development</span>
          )}
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-accent-bright"
          style={{
            border: "1px solid #edba66bb",
            background: "radial-gradient(125% 125% at 50% 22%, #d99a453d, transparent 72%)",
            boxShadow: "0 0 20px -5px #d99a45, inset 0 0 12px -6px #edba66",
          }}
        >
          {system.contents.length} systems
        </span>
      </div>

      <div className="relative mt-4 flex items-center justify-between border-t border-line-soft pt-4">
        <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">Made by us · sold by us</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-bright">
          {available ? "See what's inside" : "Learn more"}
          <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12 H19 M13 6 L19 12 L13 18" />
          </svg>
        </span>
      </div>
    </>
  );

  return (
    <Link
      href={`/systems/${system.slug}`}
      onClick={() =>
        track("system_card_click", { product: system.slug, path: "/systems", slot, tier: "index" })
      }
      className="lit-card grad-border-amber lift group relative flex h-full flex-col overflow-hidden rounded-2xl p-6"
    >
      {/* amber bloom behind the glyph — the lamp */}
      <span
        aria-hidden
        className="glow-amber-soft"
        style={{ top: "-3rem", left: "-2rem", width: "15rem", height: "9rem" }}
      />
      {inner}
    </Link>
  );
}
