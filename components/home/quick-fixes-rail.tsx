import Link from "next/link";
import Image from "next/image";
import { getQuickFixProducts } from "@/lib/products";

/**
 * QUICK FIXES — a horizontally-scrollable rail of genuinely useful CORE picks under $25.
 * The small, quietly-essential stuff for the moment it breaks (escape tool, thermal blanket,
 * fire extinguisher, first-aid) — surfaced here because the ≥$25 main-grid gate otherwise hides
 * it on every browse surface. Honest framing: "cheap that saves the day," not "cheap = filler."
 * Server component. Inherits the warm-dark tokens; amber reserved for the price only.
 */
export function QuickFixesRail() {
  const picks = getQuickFixProducts(12);
  if (picks.length < 4) return null;

  return (
    <div>
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-px w-6 bg-accent" aria-hidden />
            <span className="eyebrow eyebrow-accent">Under $25</span>
          </div>
          <h2 className="section-title mt-3.5">The cheap stuff that saves the day</h2>
          <p className="mt-2.5 max-w-xl text-[0.98rem] leading-relaxed text-ink-dim">
            Small, quietly essential — the pocket-money gear you&rsquo;re glad was in the trunk the
            one time you needed it.
          </p>
        </div>
        <Link href="/finds" className="ulink hidden shrink-0 pb-1.5 text-sm font-semibold sm:block">
          All value picks →
        </Link>
      </div>
      <div className="rule-fade mt-5" />

      <div className="mt-7 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {picks.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="lit-card lift group flex w-[14.5rem] shrink-0 snap-start flex-col overflow-hidden"
          >
            <div className="relative aspect-square overflow-hidden bg-[#0c0906]">
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="14.5rem"
                  className="object-cover transition-transform duration-[650ms] ease-out group-hover:scale-[1.05]"
                />
              ) : null}
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#0c0906]/55 via-transparent to-transparent" />
            </div>
            <div className="flex flex-1 flex-col p-4">
              <span className="mono text-[0.56rem] uppercase tracking-[0.12em] text-ink-faint">{p.category}</span>
              <h3 className="mt-1.5 line-clamp-2 font-display text-[1.02rem] font-semibold leading-snug text-ink-strong transition-colors group-hover:text-accent-bright">
                {p.name}
              </h3>
              <p className="mt-1.5 line-clamp-2 flex-1 text-[0.82rem] leading-relaxed text-ink-dim">{p.problemSolved || p.bestFor}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="mono text-[0.92rem] font-semibold text-accent-bright">{p.priceRange}</span>
                <span aria-hidden className="text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:text-accent">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
