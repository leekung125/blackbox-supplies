import { getAllGuides } from "@/lib/guides";
import { COMPARISON_GUIDES } from "@/lib/comparison-guides";
import { getAllArticles } from "@/lib/articles";
import { SCENARIOS } from "@/lib/scenarios";

const BASE = "https://www.blackboxsupplies.com";

export const dynamic = "force-static";

/**
 * /llms.txt — the emerging standard that helps AI models (ChatGPT, Perplexity, Google AI
 * Overviews, shopping agents) understand and cite the site. Generated from live data so it
 * never goes stale. Honest framing matches the rest of the site (no fabricated testing).
 */
export function GET() {
  const guides = getAllGuides();
  const articles = getAllArticles();
  const lines = [
    "# BlackBox Supplies",
    "",
    "> Premium, honest buying guides and curated Amazon picks — cooling gear, genuinely useful everyday gear, and car & roadside essentials. Every product is a real, verified Amazon listing. Picks are based on verified-buyer reviews, manufacturer spec sheets, and the independent outlets that lab-test. As an Amazon Associate, BlackBox earns from qualifying purchases.",
    "",
    "## Product categories",
    `- [Cooling gear](${BASE}/heat): portable AC, tower & bladeless fans, cooling sleep, mini fridges, personal cooling`,
    `- [Genuinely useful upgrades](${BASE}/useful): desk & tech, travel & EDC, everyday carry, power & charging`,
    `- [Car & roadside](${BASE}/gear): jump starters, tire inflators, dash cams, portable power, roadside safety`,
    "",
    "## When it breaks — emergency scenario guides (what to do the moment something fails, free triage first, then the gear)",
    ...SCENARIOS.map((s) => `- [${s.situation}](${BASE}/when/${s.slug}): ${s.metaDescription}`),
    "",
    "## Interactive comparison guides",
    ...COMPARISON_GUIDES.map((g) => `- [${g.title}](${BASE}/guides/${g.slug}): ${g.dek}`),
    "",
    "## Buying guides",
    ...[...guides, ...articles].map((g) => `- [${g.title}](${BASE}/guides/${g.slug}): ${g.dek}`),
    "",
    "## About",
    `- [How we pick](${BASE}/methodology): our research method — specs, verified-buyer reviews, independent outlets; no fabricated testing`,
    `- [Affiliate disclosure](${BASE}/disclosure)`,
    `- [Privacy](${BASE}/privacy)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
