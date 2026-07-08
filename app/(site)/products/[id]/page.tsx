import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OutboundLink } from "@/components/outbound-link";
import { StickyCta } from "@/components/sticky-cta";
import { ProductCard } from "@/components/product-card";
import { ProductThumb } from "@/components/product-thumb";
import { getCategoryByName, categorySlug } from "@/lib/categories";
import { getGuideBySlug, getGuidesForProduct } from "@/lib/guides";
import { KITS } from "@/lib/kits";
import { getAllProducts, getProductById, getRelatedProducts } from "@/lib/products";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, productSchema } from "@/lib/schema";

export const dynamicParams = false;

/** Single honest "as of" date for approximate prices + the desk byline. No live-price fabrication. */
const AS_OF = "July 2026";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Not found" };
  const title = `${product.name}: our take, key specs & honest trade-offs`;
  const description = product.verdict || product.problemSolved;
  return {
    title,
    description,
    alternates: { canonical: `/products/${product.id}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `/products/${product.id}`,
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const meta = getCategoryByName(product.category);
  const guide = getGuidesForProduct(product.id)[0] ?? getGuideBySlug(product.guideSlug);
  const kit = KITS.find((k) =>
    [k.buyFirstId, ...k.starterIds, ...k.betterIds, ...k.premiumIds].includes(product.id)
  );
  const alternatives = getRelatedProducts(product, 3);

  // Breadcrumb middle crumb = the product's vertical (not always "Gear"/car).
  const COOLING_CATS = new Set(["Portable AC", "Cooling Fans", "Personal Cooling", "Cooling Sleep", "Dorm Cooling"]);
  const CAR_CATS = new Set(["Jump Starters", "Tire Inflators", "Dash Cams", "Power & Charging", "Roadside Safety", "Car Utility"]);
  const vertical = COOLING_CATS.has(String(product.category))
    ? { label: "Cooling", href: "/heat" }
    : CAR_CATS.has(String(product.category))
      ? { label: "Car & roadside", href: "/gear" }
      : { label: "Useful gear", href: "/useful" };

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: vertical.label, path: vertical.href },
            { name: meta.name, path: `/category/${categorySlug(product.category)}` },
            { name: product.name, path: `/products/${product.id}` },
          ]),
        ]}
      />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href={vertical.href} className="hover:text-accent-strong">{vertical.label}</Link>
        <span aria-hidden>/</span>
        <Link href={`/category/${categorySlug(product.category)}`} className="hover:text-accent-strong">{meta.name}</Link>
      </nav>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_1.1fr]">
        {/* LEFT — image + buy card (sticky) */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface-2">
            <ProductThumb product={product} className="aspect-square w-full" pad="p-8 sm:p-10" />
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-surface p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-ink-dim">
                  Typical price <span className="normal-case text-ink-dim/80">· as of {AS_OF}</span>
                </p>
                <p className="nums mt-1 font-display text-2xl font-semibold text-ink">{product.priceRange}</p>
              </div>
              <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[0.7rem] font-medium text-ink-2">Approx.</span>
            </div>
            {product.keySpec ? (
              <div className="mt-4 rounded-xl border border-line-soft bg-surface-2 p-3">
                <p className="text-[0.68rem] font-semibold uppercase tracking-wide text-ink-dim">Key spec</p>
                <p className="mt-1 text-[0.9rem] leading-snug text-ink-2">{product.keySpec}</p>
              </div>
            ) : null}
            <OutboundLink product={product} variant="primary" disclosure="full" className="mt-5 [&>a]:w-full" />
            <p className="mt-3 text-xs leading-relaxed text-ink-dim">
              Opens the product on Amazon. Confirm the exact model and current price there.
            </p>
          </div>

          {/* Sentinel: once this scrolls past, the mobile sticky buy bar slides up. */}
          <div id="sticky-cta-anchor" aria-hidden className="h-px w-full" />
        </div>

        {/* RIGHT — the writeup */}
        <div>
          <div className="flex items-center gap-2 text-[0.78rem]">
            <span className="eyebrow eyebrow-accent">{meta.name}</span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-dim">{product.brand}</span>
          </div>
          <h1 className="mt-2 text-balance font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-3 text-sm text-ink-dim">
            By the{" "}
            <Link href="/methodology" className="ulink font-medium">BlackBox gear desk</Link>
            {" "}· Updated {AS_OF}
          </p>

          <p className="lede mt-4">{product.problemSolved}</p>

          {/* quick verdict */}
          {product.verdict ? (
            <div className="mt-6 rounded-2xl border border-accent/25 bg-accent-tint p-5">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">Quick verdict</h2>
              <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{product.verdict}</p>
            </div>
          ) : null}

          {/* good for */}
          {product.bestFor ? (
            <div className="mt-6">
              <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">Who it's for</h2>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">{product.bestFor}</p>
            </div>
          ) : null}

          {/* key features */}
          {product.keyFeatures.length ? (
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-ink">Key features</h2>
              <ul className="mt-3.5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {product.keyFeatures.map((f) => (
                  <li key={f} className="flex gap-2.5 text-[0.95rem] leading-snug text-ink-2">
                    <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13 L9 17 L19 6" /></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* what to know before you buy */}
          {product.cons.length ? (
            <section className="mt-8">
              <h2 className="font-display text-xl font-semibold text-ink">What to know before you buy</h2>
              <ul className="mt-3.5 space-y-2.5">
                {product.cons.map((c) => (
                  <li key={c} className="flex gap-2.5 text-[0.95rem] leading-relaxed text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* how we picked */}
          <section className="mt-8 rounded-2xl border border-line bg-surface p-5">
            <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">How we picked this</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Ranked on merit from manufacturer specs, published lab reviews, and real buyer feedback —
              never paid placement. Every number is real or left out; we don&rsquo;t invent reviews or
              ratings. Specs and prices change over time, so confirm your exact model on the Amazon listing.
            </p>
            <Link href="/disclosure" className="ulink mt-3 inline-block text-sm font-semibold">How we work →</Link>
          </section>

          <div className="mt-7">
            <OutboundLink product={product} variant="primary" disclosure="compact" />
          </div>
        </div>
      </div>

      {/* related guide + kit */}
      {(guide || kit) ? (
        <section className="mt-16 grid gap-5 sm:grid-cols-2">
          {guide ? (
            <Link href={`/guides/${guide.slug}`} className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
              <span className="eyebrow eyebrow-accent">Featured in a guide</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent-strong">{guide.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink-2">{guide.dek}</p>
            </Link>
          ) : null}
          {kit ? (
            <Link href={`/kits/${kit.id}`} className="group rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
              <span className="eyebrow eyebrow-accent">Part of a kit</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent-strong">{kit.name}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-ink-2">{kit.dek}</p>
            </Link>
          ) : null}
        </section>
      ) : null}

      {/* alternatives */}
      {alternatives.length ? (
        <section className="mt-16 border-t border-line pt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">More in {meta.name}</h2>
          <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-3">
            {alternatives.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}

      {/* Mobile: persistent buy action once the top buy card scrolls away */}
      <StickyCta product={product} />
    </div>
  );
}
