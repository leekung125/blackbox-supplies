import { GUIDES, type Guide } from "@/lib/guides";
import { getProductById } from "@/lib/products";

/**
 * JSON-LD builders. Honesty constraints are structural:
 * - NO aggregateRating / review stars anywhere (we have no ratings and will not invent them)
 * - NO offers (we don't sell; Amazon does)
 * - itemListElement order mirrors the guide's real editorial pick order
 */

const BASE = "https://www.blackboxsupplies.com";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE}/#organization`,
    name: "BlackBox Supply",
    url: BASE,
    slogan: "Gear for bad timing.",
    description:
      "BlackBox Supply researches practical car and roadside gear — jump starters, tire inflators, dash cams, roadside kits and portable power — and publishes honest, research-based buying guides.",
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

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BASE}/guides/${guide.slug}#article`,
      headline: guide.title,
      description: guide.dek,
      url: `${BASE}/guides/${guide.slug}`,
      dateModified: guide.updated,
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
export function articleSchema(a: { slug: string; title: string; dek: string; updated: string; category: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE}/guides/${a.slug}#article`,
    headline: a.title,
    description: a.dek,
    url: `${BASE}/guides/${a.slug}`,
    dateModified: a.updated,
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
