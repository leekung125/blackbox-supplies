import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { OutboundLink } from "@/components/outbound-link";
import { GuideCard } from "@/components/guide-card";
import { GuidePicks } from "@/components/guide-picks";
import { AwardStrip } from "@/components/award-strip";
import { StickyBuyBar } from "@/components/sticky-buy-bar";
import { NewsletterCta } from "@/components/newsletter-cta";
import { getAllGuides, getGuideBySlug, GUIDE_SLUGS, type GuidePick } from "@/lib/guides";
import { getDateModified, displayUpdated, GUIDES_SOURCE, articleSourcePath, comparisonSourcePath } from "@/lib/freshness";
import { getKitById } from "@/lib/kits";
import { getProductById } from "@/lib/products";
import { EDITOR } from "@/lib/content";
import { matchByText, productToPick, type ResolvedPick } from "@/lib/affiliate-picks";
import { JsonLd } from "@/components/json-ld";
import { articleSchema, breadcrumbSchema, comparisonGuideSchema, faqSchema, guideSchema, howToSchema } from "@/lib/schema";
import { ARTICLE_SLUGS, getArticleBySlug } from "@/lib/articles";
import { ArticleView } from "@/components/article-view";
import { COMPARISON_GUIDE_SLUGS, getComparisonGuideBySlug } from "@/lib/comparison-guides";
import { ComparisonGuideView } from "@/components/comparison-guide";

export const dynamicParams = false;

export function generateStaticParams() {
  return [...GUIDE_SLUGS, ...COMPARISON_GUIDE_SLUGS, ...ARTICLE_SLUGS].map((slug) => ({ slug }));
}

/**
 * Long titles get an `absolute` title so the global " · BlackBox Supplies" template suffix
 * (~20 chars) doesn't push them past Google's ~60-char display limit and truncate. Short titles
 * keep the brand suffix for recognition. Threshold chosen so title + suffix stays near ~60.
 */
function titleField(raw: string): string | { absolute: string } {
  return raw.length >= 44 ? { absolute: raw } : raw;
}

/**
 * The share image for a guide, with a fallback.
 *
 * `openGraph.images` was emitted only when an entry declared `heroImage`, and nine live
 * guides don't — so sharing those links anywhere (Facebook, Pinterest, iMessage, Slack)
 * produced a bare text card. The legacy `guides.ts` branch below already fell back to its
 * lead product image; the article and comparison branches had no fallback at all, which is
 * why the gap tracked the content model rather than anything about the page.
 *
 * Every guide already ships a Pinterest image at /pins/guide-<slug>.jpg, so that is the
 * fallback. Existence is checked on disk rather than assumed: a 404 in og:image is worse
 * than no og:image, because the scraper caches the miss.
 */
function shareImage(slug: string, declared?: string): string | undefined {
  if (declared) return declared;
  const rel = `/pins/guide-${slug}.jpg`;
  return existsSync(path.join(process.cwd(), "public", rel)) ? rel : undefined;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (article) {
    const og = shareImage(article.slug, article.heroImage);
    return {
      title: titleField(article.title),
      description: article.dek,
      alternates: { canonical: `/guides/${article.slug}` },
      openGraph: { type: "article", title: article.title, description: article.dek, url: `/guides/${article.slug}`, ...(og ? { images: [{ url: og }] } : {}) },
    };
  }
  const cmp = getComparisonGuideBySlug(slug);
  if (cmp) {
    const og = shareImage(cmp.slug, cmp.heroImage);
    return {
      title: titleField(cmp.title),
      description: cmp.dek,
      alternates: { canonical: `/guides/${cmp.slug}` },
      openGraph: {
        type: "article",
        title: cmp.title,
        description: cmp.dek,
        url: `/guides/${cmp.slug}`,
        ...(og ? { images: [{ url: og }] } : {}),
      },
    };
  }
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide not found" };
  const lead = getProductById(guide.picks[0]?.productId ?? "");
  const ogImage = guide.heroImage ?? lead?.image ?? shareImage(guide.slug);
  return {
    title: titleField(guide.title),
    description: guide.dek,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.dek,
      url: `/guides/${guide.slug}`,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (article) {
    // HowTo is emitted ONLY when the article data genuinely carries a `steps` array (real,
    // user-visible procedural instructions). We never synthesize steps from prose or from the
    // "mistakes / what to check" lists — those aren't procedures — so an article without authored
    // steps emits no HowTo. When a data author adds a real `steps` field, the schema lights up.
    const howToSteps = (article as { steps?: { name: string; text: string }[] }).steps;
    return (
      <>
        <JsonLd
          data={[
            articleSchema(article, getDateModified(articleSourcePath(article.slug))),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: article.title, path: `/guides/${article.slug}` },
            ]),
            ...(article.faq?.length ? [faqSchema(article.faq)] : []),
            ...(howToSteps?.length ? [howToSchema(article.title, howToSteps)] : []),
          ]}
        />
        <ArticleView article={article} />
      </>
    );
  }
  const cmp = getComparisonGuideBySlug(slug);
  if (cmp) {
    return (
      <>
        <JsonLd
          data={[
            ...comparisonGuideSchema(cmp, getDateModified(comparisonSourcePath(cmp.slug))),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides" },
              { name: cmp.title, path: `/guides/${cmp.slug}` },
            ]),
          ]}
        />
        <ComparisonGuideView guide={cmp} />
      </>
    );
  }

  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const lead = getProductById(guide.picks[0]?.productId ?? "");
  const heroImg = guide.heroImage ?? lead?.image;
  const related = guide.relatedGuides.map(getGuideBySlug).filter(Boolean).slice(0, 3);
  const kit = guide.relatedKit ? getKitById(guide.relatedKit) : undefined;

  // Resolve each guide pick (car catalog) to the buy-CTA shape used by GuidePicks / StickyBuyBar.
  const picks: ResolvedPick[] = guide.picks
    .map((pk) => {
      const p = getProductById(pk.productId);
      return p ? productToPick(p, pk.role) : undefined;
    })
    .filter((p): p is ResolvedPick => Boolean(p));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          ...guideSchema(guide, getDateModified(GUIDES_SOURCE)),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Guides", path: "/guides" },
            { name: guide.title, path: `/guides/${guide.slug}` },
          ]),
        ]}
      />
      {/* breadcrumb */}
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/guides" className="hover:text-accent-strong">Guides</Link>
      </nav>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
          <span className="eyebrow eyebrow-accent">{guide.category}</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-dim">{guide.readMinutes} min read</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-dim">Updated {displayUpdated(getDateModified(GUIDES_SOURCE))}</span>
        </div>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-[2.9rem]">
          {guide.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-ink-dim">
          <Link href="/methodology" className="ulink font-medium">By {EDITOR.name}</Link>
        </div>
        <p className="lede mt-4">{guide.dek}</p>
      </header>

      {heroImg ? (
        <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-surface-2">
          <div className="relative aspect-[16/9]">
            <Image src={heroImg} alt={guide.title} fill priority sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
          </div>
        </div>
      ) : null}

      {/* quick answer */}
      <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">The short version</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{guide.quickAnswer}</p>
      </div>

      {/* award strip — the shortlist above the fold, for the ~half who never scroll */}
      <AwardStrip picks={picks} anchor="the-picks" />

      {/* quick-verdict buy box — the highest-lift conversion element */}
      <GuidePicks picks={picks} />

      {/* who this is for */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">Who this is for</h2>
        <ul className="mt-4 space-y-2.5">
          {guide.whoFor.map((w) => (
            <li key={w} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
              <Check />
              <span>{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* what to buy first */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold text-ink">What to buy first</h2>
        <p className="article mt-3 text-[0.98rem]">{guide.buyFirst}</p>
      </section>

      {/* the picks */}
      <section id="the-picks" className="mt-12 scroll-mt-24">
        <h2 className="font-display text-2xl font-semibold text-ink">The picks</h2>
        <p className="mt-2 text-sm text-ink-2">
          Each pick links straight to Amazon — confirm the exact model, options, and current price there.
        </p>
        <div className="mt-5 space-y-4">
          {guide.picks.map((pick) => (
            <PickRow key={pick.productId} pick={pick} />
          ))}
        </div>
      </section>

      {/* comparison */}
      {guide.comparison ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Compare the picks</h2>
          <div className="mt-4 overflow-x-auto rounded-2xl border border-line">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr className="bg-surface-2">
                  {guide.comparison.columns.map((c) => (
                    <th key={c} className="px-4 py-3 text-left font-semibold text-ink">{c}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {guide.comparison.rows.map((row, i) => {
                  const rowPick = matchByText(row[0] ?? "", picks);
                  return (
                    <tr key={i} className="border-t border-line">
                      {row.map((cell, j) => (
                        <td key={j} className={`px-4 py-3 align-top ${j === 0 ? "font-semibold text-ink" : "text-ink-2"}`}>
                          {cell}
                          {j === 0 && rowPick ? (
                            <a href={rowPick.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="mt-1.5 block text-xs font-semibold text-accent hover:text-accent-strong">
                              Check price on Amazon →
                            </a>
                          ) : null}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {/* what to check */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">What to check before buying</h2>
        <div className="mt-4 space-y-4">
          {guide.checkBeforeBuying.map((c) => (
            <div key={c.label} className="rounded-xl border border-line bg-surface p-4">
              <h3 className="font-display text-base font-semibold text-ink">{c.label}</h3>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* mistakes */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">Common mistakes</h2>
        <ul className="mt-4 space-y-2.5">
          {guide.mistakes.map((m) => (
            <li key={m} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* tradeoffs */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-ink">The honest tradeoffs</h2>
        <p className="article mt-3 text-[0.98rem]">{guide.tradeoffs}</p>
      </section>

      {/* disclosure note */}
      <p className="mt-10 rounded-xl border border-line bg-surface-2 p-4 text-xs leading-relaxed text-ink-dim">
        How we choose: picks are based on rigorous research and manufacturer specs — no paid placement, ever. Outbound links are Amazon affiliate links: as an Amazon Associate, BlackBox Supplies earns from qualifying purchases, at no extra cost to you. <Link href="/disclosure" className="ulink font-semibold">Full disclosure</Link>.
      </p>

      {/* related kit */}
      {kit ? (
        <section className="mt-12">
          <Link href={`/kits#${kit.id}`} className="group flex items-center justify-between gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-accent/40">
            <div>
              <span className="eyebrow eyebrow-accent">Build the kit</span>
              <h3 className="mt-1.5 font-display text-xl font-semibold text-ink group-hover:text-accent-strong">{kit.name}</h3>
              <p className="mt-1 text-sm text-ink-2">{kit.dek}</p>
            </div>
            <span className="shrink-0 text-accent-strong" aria-hidden>→</span>
          </Link>
        </section>
      ) : null}

      {/* related guides */}
      {related.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Keep reading</h2>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((g) => (
              <GuideCard key={g!.slug} guide={g!} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-16">
        <NewsletterCta />
      </div>

      <StickyBuyBar pick={picks[0]} />
    </div>
  );
}

function PickRow({ pick }: { pick: GuidePick }) {
  const p = getProductById(pick.productId);
  if (!p) return null;
  return (
    <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={`/products/${p.id}`}
          className="relative aspect-[5/3] w-full shrink-0 overflow-hidden rounded-xl border border-line bg-surface-2 sm:aspect-square sm:w-36"
        >
          {p.image ? (
            <Image src={p.image} alt={p.name} fill sizes="(min-width: 640px) 9rem, 100vw" className="object-cover" />
          ) : null}
        </Link>
        <div className="min-w-0 flex-1">
          <span className="inline-block rounded-full bg-accent px-2.5 py-1 text-[0.7rem] font-semibold text-on-accent">{pick.role}</span>
          <h3 className="mt-2 font-display text-xl font-semibold leading-snug text-ink">
            <Link href={`/products/${p.id}`} className="hover:text-accent-strong">{p.name}</Link>
          </h3>
          <div className="mt-1 flex items-center gap-2 text-sm">
            <span className="nums font-semibold text-ink">{p.priceRange}</span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-dim">{p.subcategory}</span>
          </div>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{pick.why}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <OutboundLink product={p} variant="primary" disclosure="none" />
            <Link href={`/products/${p.id}`} className="ulink text-sm font-semibold">Full details</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg className="mt-1 h-4 w-4 shrink-0 text-accent-strong" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 13 L9 17 L19 6" />
    </svg>
  );
}
