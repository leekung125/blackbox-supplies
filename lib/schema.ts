import { GUIDES, type Guide } from "@/lib/guides";
import { getProductById } from "@/lib/products";

/**
 * JSON-LD builders. Honesty constraints are structural:
 * - NO aggregateRating / review stars anywhere (we have no ratings and will not invent them)
 * - NO offers (we don't sell; Amazon does)
 * - itemListElement order mirrors the guide's real editorial pick order
 */

const BASE = "https://blackboxsupplies.com";

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
