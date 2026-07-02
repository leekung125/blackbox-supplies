import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { CategoryGlyph } from "@/components/category-glyph";
import { NewsletterCta } from "@/components/newsletter-cta";
import { getCategoryBySlug, CATEGORY_SLUGS } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { getFieldScene } from "@/lib/scenes";
import { getAllGuides } from "@/lib/guides";
import { getAllKits } from "@/lib/kits";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbSchema, categorySchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORY_SLUGS.map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) return { title: "Not found" };
  return {
    title: `${meta.name}: researched picks & buying notes`,
    description: meta.blurb,
    alternates: { canonical: `/category/${meta.slug}` },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = getCategoryBySlug(category);
  if (!meta) notFound();

  const products = getProductsByCategory(meta.name);
  const scene = getFieldScene(meta.name);
  const guide = getAllGuides().find((g) => g.category === meta.name);
  const kit = getAllKits().find((k) => k.id === (meta.kitName === "The Roadside Kit" ? "roadside-kit" : meta.kitName === "The Backup Power Kit" ? "backup-power-kit" : "road-trip-kit"));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <JsonLd
        data={[
          categorySchema(meta.name, meta.slug, products.map((p) => ({ id: p.id, name: p.name }))),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Gear", path: "/gear" },
            { name: meta.name, path: `/category/${meta.slug}` },
          ]),
        ]}
      />
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/gear" className="hover:text-accent-strong">Gear</Link>
        <span aria-hidden>/</span>
        <span className="text-ink-2">{meta.name}</span>
      </nav>

      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5">
            <CategoryGlyph category={meta.name} className="h-6 w-6 text-accent" />
            <span className="eyebrow eyebrow-accent">{meta.tagline}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">{meta.name}</h1>
          <p className="lede mt-4">{meta.blurb}</p>
          <p className="mt-3 text-sm text-ink-dim"><span className="font-medium text-ink-2">{scene.mood}</span> {scene.incident}</p>
        </div>
        {guide ? (
          <Link href={`/guides/${guide.slug}`} className="shrink-0 rounded-full border border-accent/40 bg-accent-tint px-5 py-2.5 text-sm font-semibold text-accent-strong transition-colors hover:bg-accent hover:text-on-accent">
            Read the {meta.name.toLowerCase()} guide →
          </Link>
        ) : null}
      </header>

      <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {kit ? (
        <Link href={`/kits/${kit.id}`} className="group mt-14 flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
          <div>
            <span className="eyebrow eyebrow-accent">Build the kit</span>
            <h3 className="mt-1.5 font-display text-xl font-semibold text-ink group-hover:text-accent-strong">{kit.name}</h3>
            <p className="mt-1 text-sm text-ink-2">{kit.dek}</p>
          </div>
          <span className="shrink-0 text-accent-strong" aria-hidden>→</span>
        </Link>
      ) : null}

      <div className="mt-16">
        <NewsletterCta />
      </div>
    </div>
  );
}
