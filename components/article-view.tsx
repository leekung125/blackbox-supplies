import Link from "next/link";
import type { Article } from "@/lib/articles";
import { getGuideBySlug } from "@/lib/guides";
import { getProductById } from "@/lib/products";
import { GuideCard } from "@/components/guide-card";
import { ProductCard } from "@/components/product-card";
import { NewsletterCta } from "@/components/newsletter-cta";

/** Renders a question/comparison article in the site's editorial voice. */
export function ArticleView({ article }: { article: Article }) {
  const related = article.relatedGuides.map(getGuideBySlug).filter(Boolean);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-faint">
        <Link href="/" className="hover:text-accent-strong">Home</Link>
        <span aria-hidden>/</span>
        <Link href="/guides" className="hover:text-accent-strong">Guides</Link>
      </nav>

      <header className="mt-5">
        <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
          <span className="eyebrow eyebrow-accent">{article.category}</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-faint">{article.readMinutes} min read</span>
          <span className="text-ink-faint">·</span>
          <span className="text-ink-faint">Updated {article.updated}</span>
        </div>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-[2.9rem]">
          {article.title}
        </h1>
        <p className="lede mt-4">{article.dek}</p>
      </header>

      {/* answer-first */}
      <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">The short answer</h2>
        <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{article.answerFirst}</p>
      </div>

      {article.sections.map((s) => (
        <section key={s.heading} className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-ink">{s.heading}</h2>
          {s.body?.map((p, i) => (
            <p key={i} className="article mt-3 text-[0.98rem] leading-relaxed text-ink-2">{p}</p>
          ))}
          {s.table ? (
            <div className="mt-5 overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-left text-[0.92rem]">
                {s.table.caption ? <caption className="sr-only">{s.table.caption}</caption> : null}
                <thead>
                  <tr className="border-b border-line bg-surface-2">
                    {s.table.columns.map((c) => (
                      <th key={c} className="px-4 py-3 font-sans text-xs font-semibold uppercase tracking-wide text-ink-2">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-line/60 last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className={`px-4 py-3 align-top leading-relaxed ${ci === 0 ? "font-medium text-ink" : "text-ink-2"}`}>{cell}</td>
                      ))}
                    </tr>
                  ))}
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
        <section className="mt-12">
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
                <a href={src.url} target="_blank" rel="noopener noreferrer" className="ulink">{src.label}</a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-[0.82rem] leading-relaxed text-ink-faint">
            Research-based, not hands-on tested — our picks come from verified manufacturer specs and long-term owner feedback. How we work: <Link href="/methodology" className="ulink">our methodology</Link>.
          </p>
        </section>
      ) : null}

      {related.length ? (
        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink">Keep reading</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {related.map((g) => (g ? <GuideCard key={g.slug} guide={g} /> : null))}
          </div>
        </section>
      ) : null}

      <div className="mt-14">
        <NewsletterCta />
      </div>
    </div>
  );
}
