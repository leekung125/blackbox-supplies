import Image from "next/image";
import Link from "next/link";

/**
 * Premium affiliate product card for the /heat and /useful verticals.
 * Matches the cinematic /gear look: a full-bleed relit product scene on a dark tile,
 * a price badge, brand + name + one-line blurb.
 *
 * The image + title link INTERNALLY to `/products/{id}` (the decision receipt + cross-sell +
 * buy button), matching ProductCard — this keeps the ~90 detail pages reachable instead of
 * orphaned. A direct "Check price on Amazon" CTA still links straight out for the 1-click buy.
 * The image is expected to be a cinematically-relit shot (dark background) so it reads
 * premium — never a stark white box.
 */
export type AffiliateProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  priceRange: string;
  keySpec: string;
  blurb: string;
  image: string;
  affiliateUrl: string;
};

export function AffiliateCard({ p }: { p: AffiliateProduct }) {
  const detailHref = `/products/${p.id}`;
  return (
    <article className="lit-card card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl">
      <Link href={detailHref} className="relative block aspect-square overflow-hidden bg-[#0c0906]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-[750ms] ease-out group-hover:scale-[1.06]"
        />
        {/* cinematic legibility fade + amber focal bloom that ignites on hover */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,6,3,0.5), transparent 42%)" }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(125% 92% at 50% 116%, rgba(217,154,69,0.30), transparent 60%)" }}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06] transition-[box-shadow] duration-500 group-hover:ring-[rgba(217,154,69,0.28)]" />
        <span
          className="nums absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            color: "#f6ead2",
            border: "1px solid rgba(237,186,102,0.60)",
            background: "linear-gradient(180deg, rgba(20,14,8,0.86), rgba(12,9,6,0.90))",
            boxShadow: "0 0 20px -6px #d99a45, inset 0 0 12px -7px #edba66",
          }}
        >
          {p.priceRange}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className="mono text-[0.65rem] uppercase tracking-[0.14em] text-ink-faint">{p.brand}</span>
        <h3 className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug text-ink-strong">
          <Link href={detailHref} className="line-clamp-2 transition-colors group-hover:text-accent hover:text-accent">
            {p.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-dim">{p.blurb}</p>

        <div className="mt-4 flex items-center gap-3">
          <a
            href={p.affiliateUrl}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="group/btn inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-on-accent shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_10px_26px_-10px_rgba(217,154,69,0.75)]"
          >
            Check price on Amazon
            <svg className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M7 17 L17 7 M9 7 h8 v8" /></svg>
          </a>
          <Link href={detailHref} className="ulink shrink-0 text-xs font-semibold">
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}
