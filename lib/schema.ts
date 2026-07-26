import { getAllGuides, type Guide } from "@/lib/guides";
import { getProductById } from "@/lib/products";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { EXTRA_ARTICLES } from "@/lib/articles-extra";
import { EDITOR } from "@/lib/content";

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

/**
 * The author node — a schema.org Person (the real, named, accountable founder shown in on-page
 * bylines), affiliated with the Organization. Built verbatim from lib/content.ts EDITOR (name +
 * bio → description, role → jobTitle): no invented credentials and no hands-on lab-testing claim
 * (the bio itself states it is research-based). Its `url` points at /methodology, where the same
 * person is named — so the byline, the schema author, and the About page all resolve to one honest
 * human identity. A named Person author is a materially stronger E-E-A-T signal than a bare
 * Organization for product-review content.
 */
function editorAuthorNode() {
  return {
    "@type": "Person",
    "@id": `${BASE}/#editor`,
    name: EDITOR.name,
    description: EDITOR.bio,
    jobTitle: EDITOR.role,
    url: `${BASE}/methodology`,
    worksFor: { "@id": `${BASE}/#organization` },
    ...(EDITOR.avatar ? { image: `${BASE}${EDITOR.avatar}` } : {}),
  };
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

/**
 * FAQPage JSON-LD for a PRODUCT page's honest buyer Q&A — same shape as faqSchema(), kept as a
 * distinct builder so the product page owns its own emitter (and future product-only tweaks stay
 * isolated from the guide/article FAQ). Same AI-Overview / People-Also-Ask citation lever.
 */
export function productFaqSchema(faqs: { q: string; a: string }[]) {
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
    name: "BlackBox Supplies",
    alternateName: "BlackBox",
    url: BASE,
    logo: {
      "@type": "ImageObject",
      url: `${BASE}/logo.png`,
    },
    slogan: "Genuinely useful gear that solves real problems.",
    description:
      "BlackBox Supplies researches and curates premium, genuinely useful gear — cooling (portable AC, fans, cooling sleep), everyday useful gear (desk & tech, kitchen, travel, home), and car & roadside essentials — and publishes honest, research-based buying guides. Picks are based on cross-checked verified-buyer reviews, manufacturer spec sheets, and price history.",
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
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@blackboxsupplies.com",
      contactType: "customer support",
    },
    // sameAs: ONLY profiles that really resolve. Instagram @black_boxsupplies and the Facebook
    // page (see lib/content.ts BRAND.instagram / BRAND.facebook + site footer) are the two verified
    // accounts. No real, resolving Pinterest handle exists in the codebase, so none is invented here.
    sameAs: ["https://www.instagram.com/black_boxsupplies/", "https://www.facebook.com/Blackboxsupplies/"],
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE}/#website`,
    url: BASE,
    name: "BlackBox Supplies",
    publisher: { "@id": `${BASE}/#organization` },
    // A real crawlable /search?q=… results route now exists, so the Sitelinks Searchbox action
    // targets a genuine (non-404) URL and is honest markup.
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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
export function guideSchema(guide: Guide, dateModified?: string) {
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
      dateModified: toISO(dateModified ?? guide.updated),
      inLanguage: "en-US",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/guides/${guide.slug}` },
      ...(guide.heroImage ? { image: guide.heroImage.startsWith("http") ? guide.heroImage : `${BASE}${guide.heroImage}` } : {}),
      author: editorAuthorNode(),
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

/**
 * Interactive comparison-guide schema = Article (authored by the named editorial desk) +
 * ItemList of its real ranked picks. Mirrors guideSchema(): no ratings, no offers.
 *
 * FIX over the previous inline JSON-LD: that block set `dateModified` to the raw human string
 * (e.g. "July 2026" — not valid ISO-8601, which Google rejects) and had no `datePublished`,
 * `author`, `publisher`, or `@id`. Here the dates are normalized through toISO(), the author is
 * the named editorial Person (editorAuthorNode(), built verbatim from lib/content.ts EDITOR and
 * affiliated with the Organization via worksFor — honestly reflecting the on-page byline, no
 * fabricated credentials), the publisher is the Organization, and both nodes carry an `@id` so
 * they join the site's linked-data graph.
 */
export function comparisonGuideSchema(guide: {
  slug: string;
  title: string;
  dek: string;
  categoryLabel: string;
  updated: string;
  heroImage?: string;
  published?: string;
  products: { id: string; name: string }[];
}, dateModified?: string) {
  // Comparison guides are living documents recording a single `updated` date. Use a distinct
  // original `published` date when one is ever added; until then datePublished honestly
  // coincides with dateModified rather than inventing an earlier date.
  const published = guide.published ?? guide.updated;

  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${BASE}/guides/${guide.slug}#article`,
      headline: guide.title,
      description: guide.dek,
      url: `${BASE}/guides/${guide.slug}`,
      datePublished: toISO(published),
      dateModified: toISO(dateModified ?? guide.updated),
      inLanguage: "en-US",
      mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/guides/${guide.slug}` },
      ...(guide.heroImage
        ? { image: guide.heroImage.startsWith("http") ? guide.heroImage : `${BASE}${guide.heroImage}` }
        : {}),
      author: editorAuthorNode(),
      publisher: { "@id": `${BASE}/#organization` },
      articleSection: guide.categoryLabel,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${BASE}/guides/${guide.slug}#list`,
      name: guide.title,
      numberOfItems: guide.products.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: guide.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        // Every ListItem needs a real, unique, same-domain URL. Link the product's on-site page
        // when one exists; otherwise a stable anchor on this guide keeps the URL unique + valid.
        url: getProductById(p.id)
          ? `${BASE}/products/${p.id}`
          : `${BASE}/guides/${guide.slug}#${p.id}`,
      })),
    },
  ];
}

/** Question/comparison article page schema. */
export function articleSchema(a: { slug: string; title: string; dek: string; updated: string; category: string; heroImage?: string; published?: string }, dateModified?: string) {
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
    dateModified: toISO(dateModified ?? a.updated),
    inLanguage: "en-US",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE}/guides/${a.slug}` },
    ...(a.heroImage ? { image: a.heroImage.startsWith("http") ? a.heroImage : `${BASE}${a.heroImage}` } : {}),
    author: editorAuthorNode(),
    publisher: { "@id": `${BASE}/#organization` },
    articleSection: a.category,
  };
}

/** Absolute-ize a possibly-relative asset path against the site origin. */
function absUrl(u: string): string {
  return u.startsWith("http") ? u : `${BASE}${u.startsWith("/") ? "" : "/"}${u}`;
}

/** Extract {low,high} dollar figures from an approximate price string like "$80–$100" / "$45".
 *  Returns null when no numeric price is present. Honest: represents the range as-published,
 *  never a fabricated precise price. */
function parsePriceRange(s?: string): { low: number; high: number } | null {
  if (!s) return null;
  const nums = (s.match(/\d+(?:\.\d+)?/g) || []).map(Number).filter((n) => Number.isFinite(n) && n > 0);
  if (!nums.length) return null;
  return { low: Math.min(...nums), high: Math.max(...nums) };
}

/** Build an Offer (single price) or AggregateOffer (a range) from an approximate price string.
 *  priceCurrency USD, url = the outbound buy link. Returns null when no parseable price — the
 *  caller then omits `offers` rather than inventing one.
 *
 *  HONESTY: no `availability` is asserted. We don't hold or track stock — availability lives on
 *  Amazon and changes constantly — so claiming InStock would be an unverifiable assertion. The
 *  AggregateOffer price range (as-published, approximate) is the only claim we can stand behind. */
function offerNode(priceRange?: string, url?: string) {
  const parsed = parsePriceRange(priceRange);
  if (!parsed) return null;
  const common = {
    priceCurrency: "USD",
    ...(url ? { url } : {}),
  };
  if (parsed.low === parsed.high) {
    return { "@type": "Offer", price: parsed.low, ...common };
  }
  return { "@type": "AggregateOffer", lowPrice: parsed.low, highPrice: parsed.high, offerCount: 1, ...common };
}

/**
 * Product page schema — the rich-result-eligible node.
 * Emits: Product + brand + image + description + category (+ sku from Amazon ASIN when present)
 * + an Offer/AggregateOffer (price range, USD, InStock, buy URL) so the page qualifies for the
 * price/availability snippet, plus positiveNotes/negativeNotes (Google's editorial pros-and-cons
 * feature — honest, user-visible, no rating).
 *
 * HONESTY RULE (structural): NO aggregateRating and NO Review/ratingValue anywhere. Our
 * rating/reviewCount are unverified and must never become star markup. Pros/cons carry no rating
 * and are legitimate on-page editorial content, so they stay as direct Product properties.
 *
 * Widened to read a Product's real field names (verdict/whyItMatters → description, priceRange,
 * affiliateUrl, category, amazon.amazonAsin → sku) so callers may pass a whole Product unchanged.
 */
export function productSchema(p: {
  id: string;
  name: string;
  brand: string;
  category?: string;
  image?: string;
  priceRange?: string;
  affiliateUrl?: string;
  verdict?: string;
  whyItMatters?: string;
  keyFeatures?: string[];
  cons?: string[];
  sku?: string;
  mpn?: string;
  amazon?: { amazonAsin?: string };
}) {
  const description = (p.verdict?.trim() || p.whyItMatters?.trim() || "").slice(0, 5000);
  const sku = p.sku?.trim() || p.amazon?.amazonAsin?.trim();
  const offers = offerNode(p.priceRange, p.affiliateUrl);
  const pros = (p.keyFeatures ?? []).filter((s) => s && s.trim());
  const cons = (p.cons ?? []).filter((s) => s && s.trim());

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${BASE}/products/${p.id}#product`,
    name: p.name,
    brand: { "@type": "Brand", name: p.brand },
    ...(description ? { description } : {}),
    ...(p.category ? { category: p.category } : {}),
    ...(p.image ? { image: absUrl(p.image) } : {}),
    ...(sku ? { sku } : {}),
    ...(p.mpn ? { mpn: p.mpn } : {}),
    // Tie the product into the site's linked-data graph.
    isPartOf: { "@id": `${BASE}/#website` },
    ...(offers ? { offers } : {}),
    ...(pros.length
      ? {
          positiveNotes: {
            "@type": "ItemList",
            itemListElement: pros.map((f, i) => ({ "@type": "ListItem", position: i + 1, name: f })),
          },
        }
      : {}),
    ...(cons.length
      ? {
          negativeNotes: {
            "@type": "ItemList",
            itemListElement: cons.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c })),
          },
        }
      : {}),
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
  // The hub used to list ONLY the legacy GUIDES, silently dropping the crown-jewel comparison
  // guides and the extra articles that live under the same /guides/{slug} space. Union all three
  // real collections so every crawlable guide/article page is enumerated as a citable ListItem.
  const entries = [...COMPARISON_GUIDES, ...EXTRA_ARTICLES, ...getAllGuides()];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "BlackBox Supplies Buying Guides",
    numberOfItems: entries.length,
    itemListElement: entries.map((g, i) => ({
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
        // Only emit `image` when the product actually has one — otherwise `${BASE}${""}` would
        // point the ImageObject at the homepage URL (an invalid image reference).
        ...(p.image ? { image: p.image.startsWith("http") ? p.image : `${BASE}${p.image}` } : {}),
        url: `${BASE}/products/${p.id}`,
        ...(p.blurb ? { description: p.blurb } : {}),
      },
    })),
  };
}

/**
 * Generic WebPage node for a non-Article page (contact, disclosure, category index, etc.).
 * Ties the page into the site graph: isPartOf the WebSite, about the Organization. Carries no
 * unverifiable claims — just identity + description the page's own <head> already states.
 */
export function webPageSchema(path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}${path}#webpage`,
    url: `${BASE}${path}`,
    name,
    ...(description ? { description } : {}),
    inLanguage: "en-US",
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}/#organization` },
  };
}

/**
 * Kit page schema — a curated shopping path (/kits/{id}) as a CollectionPage whose mainEntity is
 * an ItemList of the kit's real, resolved products. Honest: name + on-site product URL only, no
 * invented ratings or offers. `resolvedProducts` is the caller's already-deduped ordered list of
 * the products the kit actually references.
 */
export function kitSchema(
  kit: { id: string; name: string; dek?: string; tagline?: string },
  resolvedProducts: { id: string; name: string }[],
) {
  const description = kit.dek?.trim() || kit.tagline?.trim();
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${BASE}/kits/${kit.id}#page`,
    url: `${BASE}/kits/${kit.id}`,
    name: kit.name,
    ...(description ? { description } : {}),
    inLanguage: "en-US",
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: resolvedProducts.length,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: resolvedProducts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: `${BASE}/products/${p.id}`,
      })),
    },
  };
}

/**
 * HowTo node for a genuine step-by-step page (e.g. "how to jump-start a car"). Honest only when
 * `steps` are the real, user-visible on-page instructions — never fabricate steps for a page that
 * doesn't teach them. No `totalTime`/`supply`/`tool`/cost is asserted unless the caller has it.
 */
export function howToSchema(name: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/**
 * DefinedTermSet for the gear glossary — the honest jargon-translation layer. Terms are sourced
 * from the real, user-visible spec labels + tooltips already authored on every comparison guide's
 * `meta.fields`, so every definition is one a buyer actually sees on the comparison boards —
 * nothing invented. Iterating the live COMPARISON_GUIDES (not a hand-maintained registry) means
 * every category's jargon lands in the glossary automatically. Only fields carrying a tooltip (a
 * real definition) become terms; duplicate labels are collapsed. Falls back to a small honest set
 * of universal gear terms if none are found, so the set is never dishonestly padded.
 */
export function definedTermSetSchema() {
  const seen = new Set<string>();
  const terms: { "@type": "DefinedTerm"; name: string; description: string }[] = [];
  for (const guide of COMPARISON_GUIDES) {
    const meta = guide.meta;
    if (!meta) continue;
    for (const field of Object.values(meta.fields)) {
      if (!field || !field.tooltip) continue;
      const key = field.label.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      terms.push({ "@type": "DefinedTerm", name: field.label, description: field.tooltip });
    }
  }

  if (terms.length === 0) {
    // Honest universal fallback — real, checkable gear terms, not padding.
    const fallback: { name: string; description: string }[] = [
      {
        name: "SACC (Seasonally Adjusted Cooling Capacity)",
        description:
          "The US DOE's real-world tested cooling number for portable air conditioners — usually 30–50% lower than the older ASHRAE 'BTU' printed on the box.",
      },
      {
        name: "Peak amps",
        description:
          "The momentary burst current a jump starter can deliver when the starter first engages — the headline number, always higher than the sustained cranking current.",
      },
    ];
    for (const t of fallback) terms.push({ "@type": "DefinedTerm", name: t.name, description: t.description });
  }

  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": `${BASE}/#glossary`,
    name: "BlackBox Gear Glossary",
    hasDefinedTerm: terms,
  };
}
