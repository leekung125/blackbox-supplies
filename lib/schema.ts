import { GUIDES, type Guide } from "@/lib/guides";
import { getProductById } from "@/lib/products";

/**
 * JSON-LD builders. Honesty constraints are structural:
 * - NO aggregateRating / review stars anywhere (we have no ratings and will not invent them)
 * - NO offers (we don't sell; Amazon does)
 * - itemListElement order mirrors the guide's real editorial pick order
 */

const BASE = "https://www.blackboxsupplies.com";

/** Normalize a content date ("July 2026" or ISO "2026-07-04") to ISO 8601 date for schema.org. */
function toISO(s: string): string {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? "2026-07-01" : d.toISOString().slice(0, 10);
}

/** FAQPage JSON-LD from a guide/article's FAQ — a high-ROI AI-Overview / People-Also-Ask citation lever. */
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "BlackBox Supply",
    alternateName: "BlackBox",
    url: BASE,
    logo: `${BASE}/logo.png`,
    slogan: "Genuinely useful gear that solves real problems.",
    description:
      "BlackBox Supply researches and curates premium, genuinely useful gear — cooling (portable AC, fans, cooling sleep), everyday useful gear (desk & tech, kitchen, travel, home), and car & roadside essentials — and publishes honest, research-based buying guides. Picks are based on cross-checked verified-buyer reviews, manufacturer spec sheets, and price history.",
    knowsAbout: [
      "portable air conditioners",
      "cooling fans",
      "cooling sleep products",
      "desk and tech gear",
      "kitchen gear",
      "travel and everyday-carry gear",
      "car jump starters",
      "tire inflators",
      "dash cams",
    ],
    foundingDate: "2026",
    email: "info@blackboxsupplies.com",
    sameAs: ["https://www.instagram.com/black_boxsupplies/"],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: "BlackBox Supply",
    publisher: { "@id": `${BASE}/#organization` },
  };
}

export function breadcrumbSchema(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${BASE}${c.path}`,
    })),
  };
}

/** A buying guide = Article + ItemList of its real picks (no ratings, no offers). */
export function guideSchema(guide: Guide) {
  const picks = guide.picks
    .map((p, i) => {
      const product = getProductById(p.productId);
      if (!product) return null;
      return {
        "@type": "ListItem",
        position: i + 1,
        name: `${p.role}: ${product.name}`,
        url: `${BASE}/products/${product.id}`,
      };
    })
    .filter(Boolean);

  // Guides are living documents: the content model records only a single `updated`
  // date. When a distinct original `published` date is ever recorded, use it so
  // datePublished ≠ dateModified; until then they honestly coincide.
  const published = (guide as { published?: string }).published ?? guide.updated;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BASE}/guides/${guide.slug}#article`,
      headline: guide.title,
      description: guide.dek,
      url: `${BASE}/guides/${guide.slug}`,
      datePublished: toISO(published),
      dateModified: toISO(guide.updated),
      ...(guide.heroImage ? { image: guide.heroImage.startsWith("http") ? guide.heroImage : `${BASE}${guide.heroImage}` } : {}),
      author: { "@id": `${BASE}/#organization` },
      publisher: { "@id": `${BASE}/#organization` },
      articleSection: guide.category,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${BASE}/guides/${guide.slug}#list`,
      name: guide.title,
      numberOfItems: picks.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: picks,
    },
  ];
}

/** Question/comparison article page schema. */
export function articleSchema(a: { slug: string; title: string; dek: string; updated: string; category: string; heroImage?: string; published?: string }) {
  // Prefer a distinct original publish date when the article records one; otherwise
  // fall back to `updated` (articles are continuously revised), so datePublished
  // honestly coincides with dateModified rather than inventing an earlier date.
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/guides/${a.slug}#article`,
    headline: a.title,
    description: a.dek,
    url: `${BASE}/guides/${a.slug}`,
    datePublished: toISO(a.published ?? a.updated),
    dateModified: toISO(a.updated),
    ...(a.heroImage ? { image: a.heroImage.startsWith("http") ? a.heroImage : `${BASE}${a.heroImage}` } : {}),
    author: { "@id": `${BASE}/#organization` },
    publisher: { "@id": `${BASE}/#organization` },
    articleSection: a.category,
  };
}

/**
 * Product page schema: Product + editorial Review by the Organization.
 * positiveNotes/negativeNotes mirror the on-page keyFeatures/cons verbatim.
 * Deliberately NO offers (we don't sell) and NO aggregateRating (we have none).
 */
export function productSchema(p: {
  id: string;
  name: string;
  brand: string;
  verdict: string;
  keyFeatures: string[];
  cons: string[];
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE}/products/${p.id}#product`,
    name: p.name,
    brand: { "@type": "Brand", name: p.brand },
    ...(p.image ? { image: p.image } : {}),
    review: {
      "@type": "Review",
      author: { "@id": `${BASE}/#organization` },
      reviewBody: p.verdict,
      ...(p.keyFeatures.length
        ? {
            positiveNotes: {
              "@type": "ItemList",
              itemListElement: p.keyFeatures.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f })),
            },
          }
        : {}),
      ...(p.cons.length
        ? {
            negativeNotes: {
              "@type": "ItemList",
              itemListElement: p.cons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c })),
            },
          }
        : {}),
    },
  };
}

export function categorySchema(name: string, slug: string, productIds: { id: string; name: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${name} — researched picks`,
    numberOfItems: productIds.length,
    itemListElement: productIds.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: `${BASE}/products/${p.id}`,
    })),
  };
}

export function guidesHubSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BlackBox Supply Buying Guides",
    numberOfItems: GUIDES.length,
    itemListElement: GUIDES.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: g.title,
      url: `${BASE}/guides/${g.slug}`,
    })),
  };
}

/**
 * An affiliate vertical (/heat, /useful) as an ItemList of Products.
 * Honest: name + brand + image + on-site product page + one-line blurb — NO invented
 * ratings, NO fabricated offers. The canonical `url` points to the on-site
 * /products/{id} page (a clean, stable citation target) rather than the raw tagged
 * affiliate link, and `description` carries the product blurb so Google + AI Overviews
 * have a quotable summary. Gives structured, citable product data (discovery moat).
 */
export function affiliateListSchema(
  name: string,
  items: { id: string; name: string; brand: string; image: string; blurb?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        name: p.name,
        brand: { "@type": "Brand", name: p.brand },
        image: p.image?.startsWith("http") ? p.image : `${BASE}${p.image}`,
        url: `${BASE}/products/${p.id}`,
        ...(p.blurb ? { description: p.blurb } : {}),
      },
    })),
  };
}
