"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { System } from "@/lib/systems";
import { PaperPreview } from "@/app/(site)/systems/paper-preview";
import { SYSTEM_PREVIEWS } from "@/components/systems/tool-card";

/**
 * The /systems index card — the System shown as a premium OBJECT, not a flat tile.
 *
 * Top: the preview stage — the actual rendered pages fanned on a WARM ESPRESSO ground under
 * the amber lamp (all paper goes through PaperPreview: warm parchment tone, amber hairline,
 * layered soft light — never a hard white rectangle), gently spreading on hover.
 * The imagery is always OUR OWN rendered paper, never a product photo, so the trust separation
 * from affiliate picks holds visually as well as verbally (INFORMATION_ARCHITECTURE §5.3):
 * the "A BlackBox System" pill sits ON the stage, and the footer repeats "Made by us · sold by us".
 * Systems without preview renders (in-development SKUs) fall back to the blueprint-glyph header.
 * Fires system_card_click on navigation (unchanged analytics contract).
 */
export function SystemsIndexCard({ system, slot = "systems-index" }: { system: System; slot?: string }) {
  const available = system.status === "available";
  const preview = SYSTEM_PREVIEWS[system.slug];

  return (
    <Link
      href={`/systems/${system.slug}`}
      onClick={() =>
        track("system_card_click", { product: system.slug, path: "/systems", slot, tier: "index" })
      }
      className="lit-card grad-border-amber lift group relative flex h-full flex-col overflow-hidden rounded-2xl"
    >
      {/* ── the preview stage — real pages on warm espresso ground ───────────── */}
      {preview ? (
        <div className="relative h-48 shrink-0 overflow-hidden sm:h-56">
          {/* warm espresso stage — a lit room, never a near-black well */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(90% 85% at 50% 18%, #271c0f 0%, #1e150b 55%, #171008 100%)",
            }}
          />
          {/* the lamp behind the paper */}
          <span
            aria-hidden
            className="glow-amber"
            style={{ left: "50%", top: "62%", width: "18rem", height: "11rem", transform: "translate(-50%, -50%)" }}
          />

          {/* left page — fans out further on hover */}
          {preview.pages[0] && (
            <div className="absolute left-[3%] top-12 w-[40%] rotate-[-9deg] transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-[-11deg]">
              <PaperPreview
                src={preview.pages[0]}
                alt=""
                sizes="(min-width: 640px) 220px, 42vw"
                radius={8}
              />
            </div>
          )}

          {/* right page */}
          {preview.pages[1] && (
            <div className="absolute right-[3%] top-12 w-[40%] rotate-[9deg] transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:rotate-[11deg]">
              <PaperPreview
                src={preview.pages[1]}
                alt=""
                sizes="(min-width: 640px) 220px, 42vw"
                radius={8}
              />
            </div>
          )}

          {/* the cover — front, the lamp finds it */}
          <div className="absolute left-1/2 top-5 w-[44%] -translate-x-1/2 rotate-[1deg] transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:-translate-y-2">
            <PaperPreview
              src={preview.cover}
              alt={`${system.title} — rendered cover page`}
              sizes="(min-width: 640px) 240px, 46vw"
              focal
              radius={8}
            />
          </div>

          {/* seam — the paper settles into the card body */}
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-b from-transparent to-card" />

          {/* the trust mark, ON the object */}
          <span className="pill-amber absolute left-4 top-4 z-10 shadow-[0_2px_10px_rgba(0,0,0,0.45)]">
            A BlackBox System
          </span>
        </div>
      ) : (
        /* ── fallback header for SKUs without renders yet — the blueprint glyph ── */
        <div className="relative flex items-start justify-between gap-4 p-6 pb-0">
          <span
            aria-hidden
            className="glow-amber-soft"
            style={{ top: "-3rem", left: "-2rem", width: "15rem", height: "9rem" }}
          />
          <span
            className="focal-glow relative grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
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
          <span className="pill-amber relative shrink-0">A BlackBox System</span>
        </div>
      )}

      {/* ── content ──────────────────────────────────────────────────────────── */}
      <div className="relative flex flex-1 flex-col p-6">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink-strong transition-colors group-hover:text-accent-bright sm:text-[1.7rem]">
            {system.title}
          </h3>
          <p className="mt-1.5 text-[0.95rem] font-medium text-accent-strong">{system.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-dim">{system.promise}</p>
        </div>

        {/* the price moment — flat, confident, no theater */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-baseline gap-2">
            {available ? (
              <>
                <span className="mono nums text-3xl font-semibold leading-none text-ink-strong" style={{ textShadow: "0 0 24px rgba(217,154,69,0.22)" }}>
                  ${system.price}
                </span>
                <span className="mono text-[0.6rem] uppercase tracking-[0.14em] text-ink-faint">one-time · yours forever</span>
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

        <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-4">
          <span className="mono text-[0.6rem] uppercase tracking-[0.12em] text-ink-faint">Made by us · sold by us</span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors group-hover:text-accent-bright">
            {available ? "See what's inside" : "Learn more"}
            <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12 H19 M13 6 L19 12 L13 18" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
