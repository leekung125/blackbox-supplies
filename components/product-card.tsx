import Link from "next/link";
import { ProductThumb } from "@/components/product-thumb";
import type { Product } from "@/lib/products";
import { getOutboundLink, outboundRel } from "@/lib/product-link";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";

/**
 * Product card — framed, elevated card on the dark ground. Image + name link to the detail
 * page; a DIRECT "Check price on Amazon" CTA links straight out (no 2-click detour), matching
 * the 1-click journey the cooling/useful AffiliateCards already give. `role` shows a pick label.
 */
export function ProductCard({ product, role }: { product: Product; role?: string }) {
  const { href, isAffiliate } = getOutboundLink(product);
  return (
    <div className="lit-card card-lift group relative flex h-full flex-col overflow-hidden rounded-2xl">
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-[#0c0906]">
        <ProductThumb product={product} className="h-full w-full" />
        {/* cinematic legibility fade + amber focal bloom that ignites on hover */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(9,6,3,0.5), transparent 42%)" }} />
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: "radial-gradient(125% 92% at 50% 116%, rgba(217,154,69,0.30), transparent 60%)" }}
        />
        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.06] transition-[box-shadow] duration-500 group-hover:ring-[rgba(217,154,69,0.28)]" />
        {role ? (
          <span
            className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide text-on-accent"
            style={{
              background: "linear-gradient(180deg, #edba66, #d99a45)",
              boxShadow: "0 0 22px -4px rgba(217,154,69,0.80), inset 0 1px 0 rgba(255,255,255,0.28)",
            }}
          >
            {role}
          </span>
        ) : null}
        <span
          className="nums absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            color: "#f6ead2",
            border: "1px solid rgba(237,186,102,0.60)",
            background: "linear-gradient(180deg, rgba(20,14,8,0.86), rgba(12,9,6,0.90))",
            boxShadow: "0 0 20px -6px #d99a45, inset 0 0 12px -7px #edba66",
          }}
        >
          {product.priceRange}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="eyebrow eyebrow-accent">{product.category}</span>
        <h3 className="mt-1.5 font-display text-[1.05rem] font-semibold leading-snug text-ink-strong">
          <Link href={`/products/${product.id}`} className="line-clamp-2 transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-dim">
          {product.verdict || product.problemSolved}
        </p>

        <div className="mt-3.5 flex items-center gap-3">
          <a
            href={href}
            target="_blank"
            rel={outboundRel(isAffiliate)}
            className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[0.82rem] font-semibold text-on-accent shadow-[0_0_0_rgba(0,0,0,0)] transition-all duration-300 hover:bg-accent-strong hover:shadow-[0_10px_26px_-10px_rgba(217,154,69,0.75)]"
          >
            Check price
            <svg className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M7 17 L17 7 M9 7 h8 v8" />
            </svg>
          </a>
          <Link href={`/products/${product.id}`} className="ulink shrink-0 text-xs font-semibold">
            Details
          </Link>
        </div>
        {/* ⛔ FTC MATERIAL-CONNECTION DISCLOSURE, ADJACENT TO THE LINK.
            Every page already carried a disclosure - in the FOOTER. Measured across the built
            site, 23 pages put it more than 120 visible words from the first affiliate link, and
            on /products it was 4,199 words away. ProductCard is what every browse grid renders
            (/products, /gear, /finds, /heat, /useful, /category/*, /kits/*, home), so one marker
            here is what makes those surfaces compliant. Only shown when the CTA is monetised. */}
        {isAffiliate ? <AffiliateDisclosure variant="compact" className="mt-2" /> : null}
      </div>
    </div>
  );
}
