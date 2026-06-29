import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryGlyph } from "@/components/category-glyph";
import { NotTestedNote } from "@/components/not-tested";
import { OutboundLink } from "@/components/outbound-link";
import { ProductCard } from "@/components/product-card";
import { ProductPlaceholder } from "@/components/product-placeholder";
import { Badge } from "@/components/ui/badge";
import { categorySlug, getCategoryByName } from "@/lib/categories";
import { VIDEO_DROPS } from "@/lib/content";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: product.problemSolved,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const meta = getCategoryByName(product.category);
  const slug = categorySlug(product.category);
  const relatedDrop = VIDEO_DROPS.find((d) => d.category === product.category);
  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      {/* breadcrumb */}
      <nav className="mono flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
        <Link href="/" className="transition-colors hover:text-accent-bright">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link
          href={`/category/${slug}`}
          className="transition-colors hover:text-accent-bright"
        >
          {meta.name}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-dim">{product.subcategory}</span>
      </nav>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
        {/* ----------------------------------------------------- LEFT: visual */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductPlaceholder
            category={product.category}
            caption={product.subcategory}
            aspect="square"
            image={product.image}
          />

          <div className="mt-5 rounded-lg border border-line bg-card/40 p-5">
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="kicker text-ink-faint">Price range · approx.</p>
                <p className="mono mt-1.5 text-2xl text-ink">
                  {product.priceRange}
                </p>
              </div>
              <Badge variant="outline">Est. market price</Badge>
            </div>

            <OutboundLink
              product={product}
              variant="primary"
              disclosure="full"
              className="mt-5 [&>a]:w-full"
            />

            <NotTestedNote className="mt-4 border-t border-line-soft pt-4" />
          </div>
        </div>

        {/* --------------------------------------------------- RIGHT: details */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              <CategoryGlyph category={product.category} className="h-3 w-3" />
              {meta.name}
            </Badge>
            <Badge variant="outline">{product.subcategory}</Badge>
            <Badge variant="outline">Not tested</Badge>
          </div>

          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-ink-dim">
            {product.problemSolved}
          </p>

          {/* failure moment callout */}
          <div className="mt-6 rounded-lg border border-line bg-panel/60 p-5">
            <p className="kicker text-warn/80">The failure moment</p>
            <p className="mt-2 text-base leading-relaxed text-ink">
              {product.failureMoment}
            </p>
          </div>

          {/* best for */}
          <Detail label="Best for" className="mt-6">
            {product.bestFor}
          </Detail>

          {/* key features */}
          <section className="mt-8">
            <h2 className="kicker text-ink-faint">Key features</h2>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {product.keyFeatures.map((f) => (
                <li key={f} className="flex gap-2.5 text-sm text-ink-dim">
                  <CheckTick />
                  <span className="leading-snug">{f}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* honest trade-offs */}
          <section className="mt-8">
            <h2 className="kicker text-ink-faint">Honest trade-offs</h2>
            <ul className="mt-3 space-y-2">
              {product.cons.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-ink-dim">
                  <span
                    className="mono mt-px shrink-0 text-warn/70"
                    aria-hidden
                  >
                    –
                  </span>
                  <span className="leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* claims we stand behind */}
          <section className="mt-8 rounded-lg border border-line bg-card/30 p-5">
            <h2 className="kicker text-accent-bright">What we&rsquo;ll say</h2>
            <p className="mt-2 text-xs leading-relaxed text-ink-faint">
              The only claims we make about this product. Specs vary by model —
              verify on the source listing. We don&rsquo;t publish ratings,
              testimonials, or guarantees.
            </p>
            <ul className="mt-3 space-y-2">
              {product.allowedClaims.map((c) => (
                <li key={c} className="flex gap-2.5 text-sm text-ink-dim">
                  <span
                    className="mono mt-px shrink-0 text-accent/80"
                    aria-hidden
                  >
                    •
                  </span>
                  <span className="leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* related film concept */}
          <section className="mt-8">
            <h2 className="kicker text-ink-faint">Related film concept</h2>
            <div className="mt-3 flex items-start gap-3 rounded-lg border border-line bg-card/30 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-line bg-base text-accent">
                <PlayGlyph />
              </span>
              <div>
                <p className="text-sm italic leading-relaxed text-ink-dim">
                  &ldquo;{product.videoHook}&rdquo;
                </p>
                {relatedDrop ? (
                  <p className="mono mt-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
                    {relatedDrop.code} · {relatedDrop.title} · {relatedDrop.status}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          <div className="mt-8">
            <OutboundLink product={product} variant="ghost" disclosure="compact" />
          </div>
        </div>
      </div>

      {/* related products */}
      {related.length > 0 ? (
        <section className="mt-20 border-t border-line pt-12">
          <div className="flex items-center gap-2">
            <span className="kicker text-ink-faint">
              More in {meta.kitName}
            </span>
            <Link
              href={`/category/${slug}`}
              className="mono ml-auto text-[0.7rem] uppercase tracking-[0.14em] text-accent-bright hover:underline"
            >
              View field →
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function Detail({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <span className="kicker text-ink-faint">{label}</span>
      <span className="text-sm leading-relaxed text-ink-dim">{children}</span>
    </div>
  );
}

function CheckTick() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13 L9 17 L19 6" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M8 5 L19 12 L8 19 Z" />
    </svg>
  );
}
