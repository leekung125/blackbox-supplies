import { getAllGuides, type Guide } from "@/lib/guides";
import { COMPARISON_GUIDES, type ComparisonGuide } from "@/lib/comparison-guides";
import { getAllArticles, type Article } from "@/lib/articles";
import { SCENARIOS, type Scenario } from "@/lib/scenarios";

const BASE = "https://www.blackboxsupplies.com";

export const dynamic = "force-static";

/**
 * /llms-full.txt — the extended companion to /llms.txt. Where /llms.txt is a MAP (links +
 * one-liners), this is the CORPUS: the full editorial text of every guide, comparison guide,
 * and article in one plain-text file, formatted for verbatim ingestion + citation by LLMs
 * (ChatGPT, Perplexity, Claude, Google AI Overviews, shopping agents).
 *
 * HONESTY: this serializes ONLY content that already exists in the catalog — no new claims,
 * no fabricated testing, no invented specs. It is a faithful flattening of the live data.
 */

const RULE = "═".repeat(72);
const SEP = "─".repeat(72);

function block(lines: (string | false | null | undefined)[]): string {
  // Keep empty strings (they are deliberate blank-line spacers); drop only false/null/undefined.
  return lines.filter((l): l is string => typeof l === "string").join("\n");
}

function sourcesLines(sources?: { label: string; url: string }[]): string[] {
  if (!sources || sources.length === 0) return [];
  return ["", "Sources:", ...sources.map((s) => `- ${s.label}: ${s.url}`)];
}

function faqLines(faq?: { q: string; a: string }[]): string[] {
  if (!faq || faq.length === 0) return [];
  const out = ["", "FAQ:"];
  for (const f of faq) out.push(`Q: ${f.q}`, `A: ${f.a}`, "");
  return out;
}

function comparisonSection(g: ComparisonGuide): string {
  return block([
    `## ${g.title}`,
    `URL: ${BASE}/guides/${g.slug}`,
    `Category: ${g.categoryLabel}`,
    `Updated: ${g.updated}`,
    "",
    `Short answer: ${g.quickAnswer}`,
    "",
    `Buy first: ${g.buyFirst}`,
    "",
    "Who it's for:",
    ...g.whoFor.map((w) => `- ${w}`),
    "",
    "What to check before buying:",
    ...g.checkBeforeBuying.map((c) => `- ${c.label}: ${c.detail}`),
    ...(g.specsThatMatter
      ? [
          "",
          "Specs that decide the buy:",
          ...g.specsThatMatter.decisive.map((d) => `- ${d}`),
          "",
          "Marketing figures to discount:",
          ...g.specsThatMatter.noise.map((n) => `- ${n}`),
        ]
      : []),
    "",
    "Common mistakes:",
    ...g.mistakes.map((m) => `- ${m}`),
    ...(g.winnerFlaws && g.winnerFlaws.length
      ? ["", "Honest flaws of the top pick:", ...g.winnerFlaws.map((w) => `- ${w}`)]
      : []),
    ...(g.skipThisIf && g.skipThisIf.length
      ? ["", "Skip this if:", ...g.skipThisIf.map((s) => `- ${s}`)]
      : []),
    "",
    `Tradeoffs: ${g.tradeoffs}`,
    ...faqLines(g.faq),
    ...sourcesLines(g.sources),
    "",
    SEP,
  ]);
}

function guideSection(g: Guide): string {
  return block([
    `## ${g.title}`,
    `URL: ${BASE}/guides/${g.slug}`,
    `Category: ${g.category}`,
    `Updated: ${g.updated}`,
    "",
    `Short answer: ${g.quickAnswer}`,
    "",
    `Buy first: ${g.buyFirst}`,
    "",
    "Who it's for:",
    ...g.whoFor.map((w) => `- ${w}`),
    "",
    "What to check before buying:",
    ...g.checkBeforeBuying.map((c) => `- ${c.label}: ${c.detail}`),
    "",
    "Common mistakes:",
    ...g.mistakes.map((m) => `- ${m}`),
    "",
    "Our picks:",
    ...g.picks.map((p) => `- ${p.role}: ${p.why}`),
    "",
    `Tradeoffs: ${g.tradeoffs}`,
    "",
    SEP,
  ]);
}

function articleSection(a: Article): string {
  const sectionLines: string[] = [];
  for (const s of a.sections) {
    sectionLines.push("", `### ${s.heading}`);
    if (s.body) for (const p of s.body) sectionLines.push(p);
    if (s.list) {
      for (const item of s.list) {
        const bar = item.indexOf("|");
        sectionLines.push(bar >= 0 ? `- ${item.slice(0, bar)}: ${item.slice(bar + 1)}` : `- ${item}`);
      }
    }
    if (s.table) {
      if (s.table.caption) sectionLines.push(s.table.caption);
      sectionLines.push(s.table.columns.join(" | "));
      for (const row of s.table.rows) sectionLines.push(row.join(" | "));
    }
  }
  return block([
    `## ${a.title}`,
    `URL: ${BASE}/guides/${a.slug}`,
    `Category: ${a.category}`,
    `Updated: ${a.updated}`,
    "",
    `Short answer: ${a.answerFirst}`,
    ...sectionLines,
    ...faqLines(a.faq),
    ...sourcesLines(a.sources),
    "",
    SEP,
  ]);
}

function scenarioSection(s: Scenario): string {
  return block([
    `## ${s.h1}`,
    `URL: ${BASE}/when/${s.slug}`,
    `Situation: ${s.situation}`,
    `Updated: ${s.updated}`,
    "",
    s.intro,
    "",
    "What to do right now (free, in order):",
    ...s.doNow.map((d, i) => `${i + 1}. ${d.step}: ${d.detail}`),
    "",
    `Fix it now: ${s.fixNow.blurb}`,
    "",
    `Prevent it next time: ${s.prevent.blurb}`,
    ...faqLines(s.faq),
    "",
    SEP,
  ]);
}

export function GET() {
  const guides = getAllGuides();
  const articles = getAllArticles();

  const parts: string[] = [
    "# BlackBox Supplies — Full Content Corpus",
    "",
    "> Premium, honest buying guides and curated Amazon picks — cooling gear, genuinely useful everyday gear, and car & roadside essentials. Every product is a real, verified Amazon listing. Picks are based on verified-buyer reviews, manufacturer spec sheets, price history, and the independent outlets that lab-test; we do not fabricate hands-on testing. As an Amazon Associate, BlackBox earns from qualifying purchases.",
    "",
    `Homepage: ${BASE}`,
    "This file is the full text of every guide and article, for AI ingestion and citation. The link map is at /llms.txt.",
    "",
    RULE,
    "WHEN IT BREAKS — EMERGENCY SCENARIO GUIDES (free triage first, then the gear)",
    RULE,
    "",
    ...SCENARIOS.map(scenarioSection),
    "",
    RULE,
    "COMPARISON GUIDES",
    RULE,
    "",
    ...COMPARISON_GUIDES.map(comparisonSection),
    "",
    RULE,
    "BUYING GUIDES",
    RULE,
    "",
    ...guides.map(guideSection),
    "",
    RULE,
    "ARTICLES & ANSWERS",
    RULE,
    "",
    ...articles.map(articleSection),
    "",
  ];

  return new Response(parts.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
