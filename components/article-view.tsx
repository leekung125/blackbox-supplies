import Link from "next/link";
import { getArticleBySlug, type Article } from "@/lib/articles";
import { getAnyGuideBySlug, guideRefForSlug } from "@/lib/guides";
import { getProductById } from "@/lib/products";
import { EDITOR } from "@/lib/content";
import { ProductCard } from "@/components/product-card";
import { GuidePicks } from "@/components/guide-picks";
import { SectionNav } from "@/components/section-nav";
import { StickyBuyBar } from "@/components/sticky-buy-bar";
import { NewsletterCta } from "@/components/newsletter-cta";
import { resolvePicks, matchByText, productToPick } from "@/lib/affiliate-picks";
import { withAffiliateTag } from "@/lib/affiliate-tag";
import { getDateModified, displayUpdated, articleSourcePath } from "@/lib/freshness";

/** A related link normalized across ALL content types so the card render is shape-safe. */
interface RelatedRef {
  slug: string;
  href: string;
  title: string;
  label: string;
  dek: string;
}

/** Heading → stable anchor id, same scheme the /useful category anchors use. */
function anchorId(heading: string): string {
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/**
 * Heading → jump-nav chip label. SectionNav was built for CATEGORY names ("Dorm Cooling");
 * article headings are full sentences — 280 of 324 in the corpus run past 32 characters and the
 * longest is 96. Passed raw, a single `shrink-0` chip renders ~560px wide, so at 360px the reader
 * gets one unreadable half-sentence and has to scroll the bar sideways to find anything. Take the
 * leading clause before an em-dash/colon when that alone is a real label, else truncate on a word
 * boundary. Max output is 32 chars ≈ 250px including the chip's padding and dot — it fits.
 */
const NAV_LABEL_MAX = 32;
function navLabel(heading: string): string {
  const clause = heading.split(/\s+[—–]\s+|:\s+/)[0].trim();
  let s = clause.length >= 12 && clause.length <= NAV_LABEL_MAX ? clause : heading.trim();
  if (s.length > NAV_LABEL_MAX) {
    const cut = s.slice(0, NAV_LABEL_MAX);
    const sp = cut.lastIndexOf(" ");
    s = `${(sp >= 16 ? cut.slice(0, sp) : cut).replace(/[\s,;:.—–-]+$/, "")}…`;
  }
  return s;
}

/**
 * Resolve a related slug against EVERY content model, not just the two legacy guides.
 * getAnyGuideBySlug covers legacy guides AND the comparison guides (getComparisonGuideBySlug);
 * getArticleBySlug covers the question/comparison articles. Before this, every article- and
 * comparison-typed related link was silently dropped, making the deep-SEO batch dead-ends.
 */
function resolveRelated(slug: string): RelatedRef | null {
  const g = getAnyGuideBySlug(slug);
  if (g) {
    const ref = guideRefForSlug(slug);
    return { slug, href: `/guides/${slug}`, title: g.title, label: ref?.categoryLabel ?? "Guide", dek: g.dek };
  }
  const a = getArticleBySlug(slug);
  if (a) return { slug, href: `/guides/${a.slug}`, title: a.title, label: String(a.category), dek: a.dek };
  return null;
}

/** Renders a question/comparison article in the site's editorial voice. */
export function ArticleView({ article }: { article: Article }) {
  // REAL freshness: the article's source-file git last-commit time, not a blanket stamp.
  const modifiedIso = getDateModified(articleSourcePath(article.slug));
  const related = article.relatedGuides
    .map(resolveRelated)
    .filter((r): r is RelatedRef => r !== null);
  // ⛔ ONE EDIT THAT GIVES 30 ARTICLES A BUY PATH. Half the corpus never declared `picks` because
  // the resolver could not see products.json, so those pages rendered no buy box and no sticky bar
  // and simply ended on the newsletter block. Every one of them DOES already declare `productIds`
  // on its sections, and all of those ids resolve — so derive the buy box from the content the page
  // already carries rather than hand-authoring 30 picks arrays and risking a mismatched product.
  // An explicit `picks` array still wins. The `image` guard is load-bearing: a missing image is a
  // build-time crash under dynamicParams=false, not a silent miss.
  const picks = article.picks?.length
    ? resolvePicks(article.picks)
    : Array.from(new Set(article.sections.flatMap((sec) => sec.productIds ?? [])))
        .slice(0, 3)
        .map((id) => getProductById(id))
        .filter((prod): prod is NonNullable<typeof prod> => Boolean(prod?.image))
        .map((prod) => productToPick(prod));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/guides" className="hover:text-accent-strong">Guides</Link>
      </nav>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
          <span className="eyebrow eyebrow-accent">{article.category}</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-faint">{article.readMinutes} min read</span>
        </div>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-[2.9rem]">
          {article.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.85rem] text-ink-dim">
          <Link href="/methodology" className="ulink font-medium">By {EDITOR.name}</Link>
          <span aria-hidden className="text-ink-faint">·</span>
          <span>
            Updated <time dateTime={modifiedIso}>{displayUpdated(modifiedIso)}</time>
          </span>
        </div>
        <p className="lede mt-4">{article.dek}</p>
      </header>

      {/* answer-first — the most valuable 40–60 words on the page. Rendered on the warm-PAPER
          reading surface (the design system's long-form-readability panel) so it is the one
          bright, lit object near the top of the dark page instead of another tinted paragraph. */}
      <div className="read-surface mt-8 p-5 sm:p-7">
        <h2 className="eyebrow">The short answer</h2>
        <p className="mt-3 font-display text-[1.16rem] leading-[1.6] text-readink sm:text-[1.28rem]">{article.answerFirst}</p>
      </div>

      {/* quick-verdict buy box — the highest-lift conversion element */}
      <GuidePicks picks={picks} />

      {/* sticky jump-nav — the same SectionNav the category pages use. On a 3–4k-word page this
          is the reader's map: every section heading is one tap away, and the bar rides under the
          site header for the rest of the scroll. Anchor ids must match the section ids below. */}
      <SectionNav
        sections={[
          ...article.sections.map((s) => ({ id: anchorId(s.heading), label: navLabel(s.heading) })),
          ...(article.faq?.length ? [{ id: "common-questions", label: "Common questions" }] : []),
        ]}
      />

      {/* scroll-mt-28 ≈ sticky header (64px) + jump-nav (~44px), same offset the comparison
          board uses, so an anchor jump never hides the heading under the chrome. */}
      {/* `si`, not `i`: the paragraph map below already binds `i`, and an outer `i` would shadow it. */}
      {article.sections.map((s, si) => (
        <section key={s.heading} id={anchorId(s.heading)} className="mt-12 scroll-mt-28 sm:mt-14">
          {/* honest progress marker: 03 / 07 — where you are in a real 4k-word read */}
          <div aria-hidden className="flex items-center gap-3">
            <span className="mono tabular text-[0.65rem] tracking-[0.14em] text-accent">
              {String(si + 1).padStart(2, "0")}&thinsp;/&thinsp;{String(article.sections.length).padStart(2, "0")}
            </span>
            <span className="rule-fade min-w-0 flex-1" />
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold text-ink">{s.heading}</h2>
          {s.body?.map((p, i) => (
            <p key={i} className="article mt-3 text-[0.98rem] leading-relaxed text-ink-2">{p}</p>
          ))}
          {s.table ? (
            <div className="mt-5 overflow-x-auto rounded-xl border border-line">
              {/* min-w: at 360px a 3-column spec table crushed to ~90px columns of vertical
                  word-stacks; a floor lets it scroll sideways inside this wrapper instead. */}
              <table className="w-full min-w-[540px] text-left text-[0.92rem]">
                {s.table.caption ? <caption className="sr-only">{s.table.caption}</caption> : null}
                <thead>
                  <tr className="border-b border-line bg-surface-2">
                    {s.table.columns.map((c) => (
                      <th key={c} className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-ink-2">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, ri) => {
                    const rowPick = matchByText(row[0] ?? "", picks);
                    return (
                      <tr key={ri} className="border-b border-line/60 last:border-0">
                        {row.map((cell, ci) => (
                          <td key={ci} className={`px-4 py-3 align-top leading-relaxed ${ci === 0 ? "font-medium text-ink" : "text-ink-2"}`}>
                            {cell}
                            {ci === 0 && rowPick ? (
                              <a href={rowPick.affiliateUrl} target="_blank" rel="sponsored nofollow noopener noreferrer" className="mt-1.5 inline-block text-xs font-semibold text-accent hover:text-accent-strong">
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
          ) : null}
          {s.list ? (
            <ul className="mt-4 space-y-3">
              {s.list.map((item) => {
                const [label, detail] = item.split("|");
                return (
                  <li key={label} className="rounded-xl border border-line bg-surface p-4 text-[0.95rem] leading-relaxed">
                    <span className="font-semibold text-ink">{label.trim()}</span>
                    {detail ? <span className="text-ink-2"> — {detail.trim()}</span> : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
          {s.productIds?.length ? (
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {s.productIds.map((id) => {
                const p = getProductById(id);
                return p ? <ProductCard key={id} product={p} /> : null;
              })}
            </div>
          ) : null}
        </section>
      ))}

      {article.faq?.length ? (
        <section id="common-questions" className="mt-12 scroll-mt-28">
          <h2 className="font-display text-2xl font-semibold text-ink">Common questions</h2>
          <div className="mt-4 space-y-4">
            {article.faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-line bg-surface p-5">
                <h3 className="font-sans text-[1rem] font-semibold text-ink">{f.q}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-2">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {article.sources?.length ? (
        <section className="mt-10 rounded-xl border border-line bg-surface-2 p-5">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">Sources & further reading</h2>
          <ul className="mt-3 space-y-1.5 text-[0.9rem]">
            {article.sources.map((src) => (
              <li key={src.url}>
                <a href={withAffiliateTag(src.url)} target="_blank" rel="noopener noreferrer" className="ulink">{src.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-dim">
            Research-driven — our picks come from verified manufacturer specs and long-term owner feedback. How we work: <Link href="/methodology" className="ulink">our methodology</Link>.
          </p>
        </section>
      ) : null}

      {related.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Keep reading</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={r.href}
                className="bbx-card card-lift group flex h-full flex-col p-5"
              >
                <span className="eyebrow eyebrow-accent">{r.label}</span>
                <h3 className="mt-2.5 font-display text-xl font-semibold leading-[1.15] text-ink-strong transition-colors group-hover:text-accent">
                  {r.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-dim">{r.dek}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Read more
                  <svg className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12 H19 M13 6 L19 12 L13 18" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-14">
        <NewsletterCta />
      </div>

      <StickyBuyBar pick={picks[0]} />
    </div>
  );
}
