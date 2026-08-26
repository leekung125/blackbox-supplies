import { TrackedAffiliateLink } from "@/components/tracked-affiliate-link";
import Image from "next/image";
import type { ResolvedPick } from "@/lib/affiliate-picks";

const BTN =
  "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong";
const rel = "sponsored nofollow noopener noreferrer";

/**
 * The "quick verdict" buy box for a guide — the single highest-lift CRO element.
 * Top pick highlighted with a big Check-Price CTA, runners-up below with their own buttons.
 * Every button points OUT to Amazon with the affiliate tag (allowed on-site; never in email).
 */
export function GuidePicks({ picks }: { picks: ResolvedPick[] }) {
  if (!picks.length) return null;
  const [top, ...rest] = picks;
  return (
    <aside className="not-prose my-8 overflow-hidden rounded-2xl border border-line-strong bg-surface p-5 sm:p-6">
      <span className="eyebrow eyebrow-accent">Our picks — check today&rsquo;s price</span>

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-accent/40 bg-well p-4 sm:flex-row sm:items-center">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
          {/* below sm the image is full-bleed (~100vw − padding), not 112px — the old `sizes="112px"`
              served a thumbnail stretched 3× on phones, blurring the product where it matters most */}
          <Image src={top.image} alt={top.name} fill sizes="(min-width: 640px) 112px, calc(100vw - 6.5rem)" className="object-cover" />
          <span className="absolute left-1.5 top-1.5 rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-on-accent">Top pick</span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-strong">{top.brand}</span>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink-strong">{top.name}</h3>
          {/* the one honest spec line from the catalog — what the thing actually is, no adjectives */}
          {top.keySpec ? <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-dim">{top.keySpec}</p> : null}
          <p className="mt-1.5 flex items-baseline gap-1.5">
            <span className="nums font-display text-accent-bright">{top.priceRange}</span>
            {/* catalog ranges are approximate — say so; the CTA is where the live price lives */}
            <span className="text-[0.68rem] text-ink-faint">typical price</span>
          </p>
        </div>
        <TrackedAffiliateLink href={top.affiliateUrl} rel={rel} productId={top.id} surface="guide_picks_hero" className={`${BTN} group px-5 py-2.5`}>
          Check Price on Amazon
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 L17 7 M9 7 h8 v8" /></svg>
        </TrackedAffiliateLink>
      </div>

      {rest.length ? (
        <div className="mt-3 grid gap-2">
          {rest.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded bg-well">
                <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                {/* the editorial role ("Real jumper cables", "Budget pick") was already in the data
                    and silently dropped — it is the reason each runner-up exists, so show it */}
                {p.label ? <p className="mono truncate text-[0.58rem] uppercase tracking-[0.12em] text-accent-strong">{p.label}</p> : null}
                <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                <p className="nums text-xs text-ink-dim">
                  {p.priceRange} <span className="text-ink-faint">typical</span>
                </p>
              </div>
              <TrackedAffiliateLink href={p.affiliateUrl} rel={rel} productId={p.id} surface="guide_picks_row" className="shrink-0 rounded-full border border-line-strong px-3.5 py-1.5 text-xs font-semibold text-accent transition-colors hover:border-accent hover:bg-accent hover:text-on-accent">
                Check price →
              </TrackedAffiliateLink>
            </div>
          ))}
        </div>
      ) : null}

      <p className="mt-3 text-[0.7rem] leading-relaxed text-ink-dim">
        As an Amazon Associate, BlackBox earns from qualifying purchases — at no extra cost to you.
      </p>
    </aside>
  );
}
