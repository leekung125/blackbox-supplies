import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { NewsletterCta } from "@/components/newsletter-cta";
import { getCategoryBySlug, CATEGORY_SLUGS } from "@/lib/categories";
import { getProductsByCategory } from "@/lib/products";
import { getFieldScene } from "@/lib/scenes";
import { getAllGuides, getAnyGuideBySlug, guideRefForSlug, type GuideRef } from "@/lib/guides";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { getAllKits } from "@/lib/kits";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { CategoryHero } from "@/components/category/category-hero";
import { CategoryFaq } from "@/components/category/category-faq";
import { SectionHead, StartHereCard, UseCasePaths, FeaturedSpotlight, RelatedGuides } from "@/components/category/category-blocks";
import { heroForCategory, getFaqs, getWhatMatters, resolveUseCases } from "@/components/category/category-data";

export const dynamicParams = false;

const SITE = "https://www.blackboxsupplies.com";

// Each category's flagship interactive comparison guide (the legacy resolver missed these).
const COMPARISON_BY_CATEGORY: Record<string, string> = {
  "Portable AC": "best-portable-air-conditioners",
  "Cooling Fans": "best-tower-fans-compared",
  "Dash Cams": "best-dash-cams-compared",
  "Jump Starters": "best-jump-starters-compared",
  "Power & Charging": "best-power-stations-compared",
  "Tire Inflators": "best-tire-inflators-compared",
};

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
  // Legacy guide first, then the category's flagship comparison guide (was never linked).
  const guideSlug = getAllGuides().find((g) => g.category === meta.name)?.slug ?? COMPARISON_BY_CATEGORY[meta.name];
  const guide = guideSlug ? getAnyGuideBySlug(guideSlug) : undefined;
  const guideIsComparison = guide ? "products" in guide : false;
  const guideMeta = guide
    ? `${guide.readMinutes} min read${guideIsComparison && "products" in guide ? ` · ${guide.products.length} compared` : ""}`
    : undefined;

  // The vertical this category belongs to — drives the breadcrumb + which kit (if any) fits.
  const COOLING_CATS = new Set(["Portable AC", "Cooling Fans", "Personal Cooling", "Cooling Sleep", "Dorm Cooling"]);
  const CAR_CATS = new Set(["Jump Starters", "Tire Inflators", "Dash Cams", "Power & Charging", "Roadside Safety", "Car Utility"]);
  const vertical = COOLING_CATS.has(meta.name)
    ? { label: "Cooling", href: "/heat" }
    : CAR_CATS.has(meta.name)
      ? { label: "Car & roadside", href: "/gear" }
      : { label: "Useful gear", href: "/useful" };

  // Kits are car-vertical bundles — only surface one on a car category page.
  const kit = CAR_CATS.has(meta.name)
    ? getAllKits().find((k) => k.id === (meta.kitName === "The Roadside Kit" ? "roadside-kit" : meta.kitName === "The Backup Power Kit" ? "backup-power-kit" : "road-trip-kit"))
    : undefined;

  const faqs = getFaqs(meta.name);
  const whatMatters = getWhatMatters(meta.name);
  const useCases = resolveUseCases(meta.name, products);
  const heroImage = heroForCategory(meta.name);
  const problem = scene?.incident ?? meta.blurb;

  // Featured lead pick, then the rest of the ranked grid.
  const [featured, ...rest] = products;

  // Related guides: the flagship's + kit's related, deduped, then topped up with sibling money pages.
  const relatedSlugs = new Set<string>();
  for (const s of [
    ...(((guide as { relatedGuides?: string[] } | undefined)?.relatedGuides) ?? []),
    ...(kit?.relatedGuides ?? []),
  ]) {
    if (s && s !== guideSlug) relatedSlugs.add(s);
  }
  for (const g of COMPARISON_GUIDES) {
    if (relatedSlugs.size >= 3) break;
    if (g.slug !== guideSlug) relatedSlugs.add(g.slug);
  }
  const relatedGuides: GuideRef[] = [...relatedSlugs]
    .map((s) => guideRefForSlug(s))
    .filter((r): r is GuideRef => Boolean(r))
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <JsonLd
        data={[
          // The category page as a CollectionPage entity, with its ranked products as a nested
          // ItemList (each ListItem links to its on-site product page). Stronger entity-graph
          // signal than a bare ItemList; honest — no ratings, no fabricated offers.
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": `${SITE}/category/${meta.slug}#page`,
            url: `${SITE}/category/${meta.slug}`,
            name: `${meta.name} — researched picks`,
            description: meta.blurb,
            isPartOf: { "@id": `${SITE}/#website` },
            mainEntity: {
              "@type": "ItemList",
              "@id": `${SITE}/category/${meta.slug}#list`,
              name: `${meta.name} — researched picks`,
              numberOfItems: products.length,
              itemListOrder: "https://schema.org/ItemListOrderAscending",
              itemListElement: products.map((p, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: p.name,
                url: `${SITE}/products/${p.id}`,
              })),
            },
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: vertical.label, path: vertical.href },
            { name: meta.name, path: `/category/${meta.slug}` },
          ]),
          faqSchema(faqs),
        ]}
      />
      <Breadcrumbs
        trail={[
          { label: "Home", href: "/" },
          { label: vertical.label, href: vertical.href },
          { label: meta.name },
        ]}
      />

      {/* ── cinematic hero (holds the H1) ──────────────────────────────────── */}
      <CategoryHero name={meta.name} tagline={meta.tagline} image={heroImage} sceneMood={scene?.mood} />

      {/* ── the problem + the single best starting point ──────────────────── */}
      <section className="mt-12 sm:mt-14">
        <StartHereCard
          problem={problem}
          whatMatters={whatMatters}
          guideHref={guideSlug ? `/guides/${guideSlug}` : undefined}
          guideTitle={guide?.title}
          guideDek={guide?.dek}
          guideMeta={guideMeta}
          fallbackHref={vertical.href}
          fallbackLabel={`Browse all ${vertical.label.toLowerCase()}`}
        />
      </section>

      {/* ── shop by need ──────────────────────────────────────────────────── */}
      {useCases.length >= 2 ? (
        <section className="mt-16 sm:mt-20">
          <SectionHead eyebrow="Shop by need" title="Best for your situation" sub="Jump straight to the pick that fits how you'll actually use it." />
          <UseCasePaths cases={useCases} />
        </section>
      ) : null}

      {/* ── the ranked picks: lead with the top pick, then the grid ────────── */}
      {featured ? (
        <section className="mt-16 sm:mt-20">
          <SectionHead
            eyebrow="The picks"
            title={`Researched ${meta.name.toLowerCase()}, ranked`}
            sub="Every pick earns its slot on specs, reputation, and real demand — never paid placement. Prices are approximate; confirm live on Amazon."
          />
          <div className="mt-8">
            <FeaturedSpotlight product={featured} />
          </div>
          {rest.length ? (
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {rest.map((p, i) => (
                <ProductCard key={p.id} product={p} role={i === 0 ? "Also great" : undefined} />
              ))}
            </div>
          ) : null}
        </section>
      ) : null}

      {/* ── buyer FAQ ─────────────────────────────────────────────────────── */}
      <section className="mt-16 sm:mt-20">
        <SectionHead eyebrow="Before you buy" title="Questions worth answering first" sub="Straight answers to the things that actually change which one you should buy." />
        <CategoryFaq faqs={faqs} />
      </section>

      {/* ── build the kit (car verticals) ─────────────────────────────────── */}
      {kit ? (
        <section className="mt-16 sm:mt-20">
          <Link href={`/kits/${kit.id}`} className="lit-card lift group flex items-center justify-between gap-4 p-6 sm:p-7">
            <div>
              <span className="eyebrow eyebrow-accent">Build the kit</span>
              <h3 className="mt-1.5 font-display text-xl font-semibold text-ink-strong transition-colors group-hover:text-accent sm:text-2xl">{kit.name}</h3>
              <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-dim">{kit.dek}</p>
            </div>
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent-bright transition-colors group-hover:border-accent/50" aria-hidden>
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12 H19 M13 6 L19 12 L13 18" /></svg>
            </span>
          </Link>
        </section>
      ) : null}

      {/* ── keep reading ──────────────────────────────────────────────────── */}
      {relatedGuides.length ? (
        <section className="mt-16 sm:mt-20">
          <SectionHead eyebrow="Keep reading" title="Related guides" />
          <RelatedGuides guides={relatedGuides} />
        </section>
      ) : null}

      <div className="mt-16 sm:mt-20">
        <NewsletterCta />
      </div>
    </div>
  );
}
