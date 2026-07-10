import Link from "next/link";
import { getProductById } from "@/lib/products";
import type { Guide } from "@/lib/guides";

/**
 * Editorial guide card — a lit, elevated object on the dark ground.
 * Hero image is the guide's own heroImage if set, else the lead pick's photo.
 */
export function GuideCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  const lead = getProductById(guide.picks[0]?.productId ?? "");
  const img = guide.heroImage ?? lead?.image;

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="bbx-card card-lift group flex h-full flex-col overflow-hidden"
    >
      <div className={`cutout-tile relative overflow-hidden ${featured ? "aspect-[16/9]" : "aspect-[3/2]"}`}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img}
            alt={lead ? `${lead.name} — ${guide.title}` : guide.title}
            loading="lazy"
            className="cutout-shadow absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
          />
        ) : null}
        {/* gentle bottom scrim so the type below the image reads on any photo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface/70 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-dark/75 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-dark-dim ring-1 ring-white/10">
          Guide
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2">
          <span className="eyebrow eyebrow-accent">{guide.category}</span>
          <span className="text-ink-faint/60">·</span>
          <span className="font-mono text-[0.68rem] text-ink-faint">{guide.readMinutes} min read</span>
        </div>
        <h3 className={`mt-2.5 font-display font-semibold leading-[1.15] text-ink-strong transition-colors group-hover:text-accent ${featured ? "text-[1.65rem]" : "text-xl"}`}>
          {guide.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-dim">{guide.dek}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
          Read the guide
          <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12 H19 M13 6 L19 12 L13 18" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
