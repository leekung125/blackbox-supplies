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

      <div className="mt-4 flex flex-col gap-4 rounded-xl border border-accent/40 bg-[#0c0906] p-4 sm:flex-row sm:items-center">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-lg sm:h-28 sm:w-28">
          <Image src={top.image} alt={top.name} fill sizes="112px" className="object-cover" />
          <span className="absolute left-1.5 top-1.5 rounded-full bg-accent px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-on-accent">Top pick</span>
        </div>
        <div className="min-w-0 flex-1">
          <span className="mono text-[0.62rem] uppercase tracking-[0.14em] text-accent-strong">{top.brand}</span>
          <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink-strong">{top.name}</h3>
          <p className="mt-1 font-display text-accent-bright">{top.priceRange}</p>
        </div>
        <TrackedAffiliateLink href={top.affiliateUrl} rel={rel} productId={top.id} surface="guide_picks_hero" className={`${BTN} px-5 py-2.5`}>
          Check Price on Amazon
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 L17 7 M9 7 h8 v8" /></svg>
        </TrackedAffiliateLink>
      </div>

      {rest.length ? (
        <div className="mt-3 grid gap-2">
          {rest.map((p) => (
            <div key={p.id} className="flex items-center gap-3 rounded-lg border border-line px-3 py-2">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded bg-[#0c0906]">
                <Image src={p.image} alt={p.name} fill sizes="44px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{p.name}</p>
                <p className="text-xs text-ink-dim">{p.priceRange}</p>
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
