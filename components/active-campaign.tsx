import Link from "next/link";
import { CornerTicks } from "@/components/corner-ticks";
import { Reveal } from "@/components/motion/reveal";

/**
 * Active Campaign — the homepage's launch connector. A cinematic case-file panel featuring the live
 * Dead Phone film (real reel cover), the campaign's core line, and a CTA into the product field record.
 * Honest by construction: the visual is labelled AI-generated, the product is source-linked + not tested.
 */
export function ActiveCampaign() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
      <Reveal>
        <Link
          href="/products/power-bank-compact-10k"
          className="group relative block overflow-hidden rounded-2xl border border-line bg-card/40 transition-colors hover:border-accent/35"
        >
          <div className="relative aspect-[16/11] w-full overflow-hidden sm:aspect-[21/9]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/campaigns/dead-phone.jpg"
              alt="Dead Phone — a phone at 3% on a wet lot as headlights turn in"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(6,7,11,0.94) 4%, rgba(6,7,11,0.30) 46%, rgba(6,7,11,0.52) 100%)" }}
              aria-hidden
            />
            <CornerTicks className="border-accent/25" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-6">
              <span className="kicker text-accent-bright/90">Case file · Dead Phone</span>
              <span className="mono rounded-sm border border-accent/40 bg-accent/15 px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.16em] text-accent-bright">
                New film
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <h2 className="max-w-xl text-balance text-[1.6rem] font-semibold leading-[1.12] tracking-tight text-ink sm:text-4xl">
                The ride was already coming. The phone wasn&rsquo;t.
              </h2>
              <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-ink-dim sm:text-base">
                3%, an empty lot, a ride that turned in and left. One boring object rewrote the night.
                See the field record, then the source.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="inline-flex items-center gap-2 rounded-lg border border-accent/45 bg-accent/15 px-4 py-2 text-sm font-semibold text-accent-bright transition-colors group-hover:bg-accent/25">
                  Open the field record
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                  </svg>
                </span>
                <span className="kicker text-ink-faint/85">AI-generated visual · source-linked · not personally tested</span>
              </div>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
