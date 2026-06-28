import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryGlyph } from "@/components/category-glyph";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product-card";
import { ButtonLink } from "@/components/ui/button-link";
import { CATEGORY_SLUGS, getCategoryBySlug } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) return { title: "Field not found" };
  return { title: `${meta.name} — ${meta.kitName}`, description: meta.blurb };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) notFound();
  const products = getProductsByCategory(meta.name);

  return (
    <Reveal blur={false} className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <nav className="mono flex flex-wrap items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-ink-faint">
        <Link href="/" className="transition-colors hover:text-accent-bright">
          Home
        </Link>
        <span aria-hidden>/</span>
        <Link href="/products" className="transition-colors hover:text-accent-bright">
          Catalog
        </Link>
        <span aria-hidden>/</span>
        <span className="text-ink-dim">{meta.name}</span>
      </nav>

      <div className="mt-8 flex items-start gap-4">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md border border-line bg-base text-accent">
          <CategoryGlyph category={meta.name} className="h-7 w-7" />
        </span>
        <div>
          <div className="flex items-center gap-2">
            <span className="h-px w-6 bg-accent/60" aria-hidden />
            <span className="kicker text-accent-bright">
              {meta.kitName} · {products.length} units
            </span>
          </div>
          <h1 className="mt-2 text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {meta.name}
          </h1>
          <p className="mono mt-2 text-xs uppercase tracking-[0.18em] text-ink-faint">
            {meta.tagline}
          </p>
        </div>
      </div>

      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-dim">{meta.blurb}</p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-12">
        <ButtonLink href="/products" variant="ghost">
          ← All gear
        </ButtonLink>
      </div>
    </Reveal>
  );
}
