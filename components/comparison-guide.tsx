import Link from "next/link";
import Image from "next/image";
import { ComparisonExperience } from "@/components/guide/comparison-experience";
import { SpecsThatMatterBlock } from "@/components/guide/specs-that-matter";
import { GuideFaq } from "@/components/guide/guide-faq";
import { NewsletterCta } from "@/components/newsletter-cta";
import { MethodologyPanel } from "@/components/methodology-panel";
import { StickyCta } from "@/components/sticky-cta";
import { JsonLd } from "@/components/json-ld";
import { CompetitionSection } from "@/components/guide/competition";
import { OwnerInsights } from "@/components/guide/owner-insights";
import { PickCaveats } from "@/components/guide/pick-caveats";
import { SourcesBlock } from "@/components/guide/sources-block";
import { ChangelogLine } from "@/components/guide/changelog-line";
import { AffiliateDisclosure } from "@/components/guide/affiliate-disclosure";
import { faqSchema } from "@/lib/schema";
import { COMPARISON_GUIDES, type ComparisonGuide } from "@/lib/comparison-guides";
import { guideRefForSlug } from "@/lib/guides";
import { getProductById } from "@/lib/products";
import { EDITOR } from "@/lib/content";

/**
 * The full interactive comparison guide page. A real magazine buying guide whose centre is a
 * live, sortable side-by-side of the real products (<ComparisonBoard/>), wrapped in the honest
 * editorial shell (short version, who it's for, what to check, mistakes, tradeoffs).
 * Prose reads at a comfortable measure; the board breaks out wider so the comparison breathes.
 */
export function ComparisonGuideView({ guide }: { guide: ComparisonGuide }) {
  const count = guide.products.length;
  // Category-correct sort hint — read from THIS guide's own sorts; never hardcode "cooling".
  const sortLabels = guide.sorts.map((s) => s.label.toLowerCase()).slice(0, 3);
  const sortPhrase =
    sortLabels.length >= 2
      ? `${sortLabels.slice(0, -1).join(", ")}, or ${sortLabels[sortLabels.length - 1]}`
      : "the spec that matters most";
  // The editorial #1 = first product; map to the catalog for the mobile sticky buy bar.
  const topPick = getProductById(guide.products[0]?.id);
  // Related guides via the unified resolver; fall back to the other comparison guides so every
  // money page cross-links to another money page.
  const related = (guide.relatedGuides ?? [])
    .map((s) => guideRefForSlug(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const relatedFallback = related.length
    ? related
    : COMPARISON_GUIDES.filter((g) => g.slug !== guide.slug)
        .slice(0, 3)
        .map((g) => ({ slug: g.slug, title: g.title, categoryLabel: g.categoryLabel, kind: "comparison" as const }));

  return (
    <div className="px-4 py-10 sm:px-6">
      {/* ── narrow editorial intro ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-3xl">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink-dim">
          <Link href="/" className="hover:text-accent-strong">Home</Link>
          <span aria-hidden>/</span>
          <Link href="/guides" className="hover:text-accent-strong">Guides</Link>
        </nav>

        <header className="mt-5">
          <div className="flex flex-wrap items-center gap-2 text-[0.78rem]">
            <span className="eyebrow eyebrow-accent">{guide.categoryLabel}</span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-faint">{guide.readMinutes} min read</span>
            <span className="text-ink-faint">·</span>
            <span className="text-ink-faint">Updated {guide.updated}</span>
            <span className="text-ink-faint">·</span>
            <span className="mono text-[0.72rem] text-accent-strong">{count} compared</span>
          </div>
          <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.08] text-ink-strong sm:text-[2.9rem]">
            {guide.title}
          </h1>
          <p className="lede mt-4">{guide.dek}</p>
          {/* dated "what changed / last verified" trust line */}
          {guide.changelog?.length ? <ChangelogLine changelog={guide.changelog} /> : null}
        </header>

        {guide.heroImage ? (
          <div className="mt-7 overflow-hidden rounded-2xl border border-line bg-surface-2">
            <div className="relative aspect-[16/9]">
              <Image
                src={guide.heroImage}
                alt={guide.title}
                fill
                priority
                sizes="(min-width: 768px) 48rem, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        ) : null}

        {/* the short version */}
        <div className="mt-8 rounded-2xl border border-accent/25 bg-accent-tint p-5 sm:p-6">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.12em] text-accent-strong">
            The short version
          </h2>
          <p className="mt-2 text-[1.02rem] leading-relaxed text-ink">{guide.quickAnswer}</p>
        </div>
      </div>

      {/* ── the interactive comparison — the centre of gravity, wider ───────── */}
      <section className="mx-auto mt-12 max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow eyebrow-accent">Compare, then buy</span>
          <h2 className="mt-2 font-display text-2xl font-semibold text-ink-strong sm:text-3xl">
            Tell us what matters — we&rsquo;ll surface the pick
          </h2>
          <p className="mt-2 text-[0.98rem] leading-relaxed text-ink-2">
            Sort by {sortPhrase} — the winner rises to the top. Every number is real, and each pick
            links straight to its exact Amazon page.
          </p>
        </div>

        {/* FTC disclosure ON the click-out surface (buttons are affiliate links), not just the footer */}
        <div className="mx-auto mt-5 max-w-2xl">
          <AffiliateDisclosure />
        </div>

        <div className="mt-5">
          <ComparisonExperience
            products={guide.products}
            meta={guide.meta}
            sorts={guide.sorts}
            decisionPicks={guide.decisionPicks}
          />
        </div>
        {/* Sentinel: once the board scrolls past, the mobile sticky buy bar (top pick) slides up. */}
        <div id="sticky-cta-anchor" aria-hidden className="h-px w-full" />

        {/* the honest catch on the #1 pick + when to skip us entirely */}
        <PickCaveats
          topPickName={guide.products[0]?.name}
          winnerFlaws={guide.winnerFlaws}
          skipThisIf={guide.skipThisIf}
        />

        {/* what actually decides the buy vs the box marketing — breaks out to the board's width */}
        {guide.specsThatMatter ? <SpecsThatMatterBlock data={guide.specsThatMatter} /> : null}

        {/* the real models we set aside, and the one honest reason each lost */}
        {guide.competition?.length ? <CompetitionSection competition={guide.competition} /> : null}

        {/* qualitative synthesis of verified-buyer review patterns (NOT our lab testing, no stats) */}
        {guide.ownerInsights?.length ? <OwnerInsights insights={guide.ownerInsights} /> : null}
      </section>

      {/* ── the rest of the editorial ──────────────────────────────────────── */}
      <div className="mx-auto mt-14 max-w-3xl">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink-strong">Who this is for</h2>
          <ul className="mt-4 space-y-2.5">
            {guide.whoFor.map((w) => (
              <li key={w} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                <Check />
                <span>{w}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">What to buy first</h2>
          <p className="article mt-3 text-[0.98rem]">{guide.buyFirst}</p>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">
            What to check before buying
          </h2>
          <div className="mt-4 space-y-4">
            {guide.checkBeforeBuying.map((c) => (
              <div key={c.label} className="rounded-xl border border-line bg-surface p-4">
                <h3 className="font-display text-base font-semibold text-ink-strong">{c.label}</h3>
                <p className="mt-1 text-[0.95rem] leading-relaxed text-ink-2">{c.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">Common mistakes</h2>
          <ul className="mt-4 space-y-2.5">
            {guide.mistakes.map((m) => (
              <li key={m} className="flex gap-3 text-[0.98rem] leading-relaxed text-ink-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" aria-hidden />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold text-ink-strong">The honest tradeoffs</h2>
          <p className="article mt-3 text-[0.98rem]">{guide.tradeoffs}</p>
        </section>

        {/* buyer FAQ — accordion + FAQPage JSON-LD for AI-Overview / People-Also-Ask citations */}
        {guide.faq?.length ? (
          <>
            <GuideFaq faq={guide.faq} />
            <JsonLd data={faqSchema(guide.faq)} />
          </>
        ) : null}

        {/* the research trail — the trust backbone — + clickable sources/receipts beneath it */}
        <div className="mt-12">
          <MethodologyPanel
            updated={guide.updated}
            authorities={guide.authorities}
            editor={EDITOR}
          />
          <SourcesBlock sources={guide.sources} products={guide.products} />
        </div>

        {/* keep reading — cross-link to other money pages */}
        {relatedFallback.length ? (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-ink-strong">Keep reading</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {relatedFallback.map((r) => (
                <Link
                  key={r.slug}
                  href={`/guides/${r.slug}`}
                  className="group rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-accent/40"
                >
                  <span className="eyebrow eyebrow-accent">
                    {r.kind === "comparison" ? "Comparison guide" : "Buying guide"}
                  </span>
                  <h3 className="mt-1.5 font-display text-lg font-semibold text-ink group-hover:text-accent-strong">
                    {r.title}
                  </h3>
                  <span className="mt-1 inline-block text-sm text-ink-dim">{r.categoryLabel}</span>
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        <p className="mt-10 text-xs leading-relaxed text-ink-dim">
          Outbound links are Amazon affiliate links: as an Amazon Associate, BlackBox Supplies earns from
          qualifying purchases, at no extra cost to you.{" "}
          <Link href="/disclosure" className="ulink font-semibold">Full disclosure</Link>.
        </p>

        <div className="mt-16">
          <NewsletterCta />
        </div>
      </div>

      {/* mobile: persistent buy action for the top pick on the highest-intent page */}
      {topPick ? <StickyCta product={topPick} /> : null}
    </div>
  );
}

function Check() {
  return (
    <svg
      className="mt-1 h-4 w-4 shrink-0 text-accent-strong"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 13 L9 17 L19 6" />
    </svg>
  );
}
