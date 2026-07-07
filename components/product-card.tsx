import Link from "next/link";
import { ProductThumb } from "@/components/product-thumb";
import { getOutboundLink, outboundRel, type Product } from "@/lib/products";

/**
 * Product card — framed, elevated card on the dark ground. Image + name link to the detail
 * page; a DIRECT "Check price on Amazon" CTA links straight out (no 2-click detour), matching
 * the 1-click journey the cooling/useful AffiliateCards already give. `role` shows a pick label.
 */
export function ProductCard({ product, role }: { product: Product; role?: string }) {
  const { href, isAffiliate } = getOutboundLink(product);
  return (
    <div className="bbx-card card-lift group flex h-full flex-col overflow-hidden">
      <Link href={`/products/${product.id}`} className="relative block aspect-square overflow-hidden">
        <ProductThumb product={product} className="h-full w-full" />
        {role ? (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[0.68rem] font-semibold text-on-accent shadow-md shadow-black/30">
            {role}
          </span>
        ) : null}
        <span className="nums absolute right-3 top-3 z-10 rounded-full bg-dark/80 px-2.5 py-1 text-xs font-semibold text-on-dark ring-1 ring-white/10 backdrop-blur-sm">
          {product.priceRange}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <span className="eyebrow">{product.category}</span>
        <h3 className="mt-1.5 font-display text-[1.02rem] font-semibold leading-snug text-ink-strong">
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
            className="group/btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[0.82rem] font-semibold text-on-accent transition-colors hover:bg-accent-strong"
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
      </div>
    </div>
  );
}
