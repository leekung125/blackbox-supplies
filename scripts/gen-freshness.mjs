// Precompute REAL per-file git last-commit dates into lib/freshness-data.json.
//
// WHY committed JSON instead of git-at-build: Vercel builds from a SHALLOW clone, so
// `git log -1 -- <file>` returns empty for any file not touched in the fetched history and
// every page would collapse onto one fallback date — re-creating the blanket-stamp problem
// we're fixing. Running this locally (full history) and committing the result makes the real
// dates available wherever the site builds. Regenerate before deploy whenever content changes.
//
//   node scripts/gen-freshness.mjs        (run from the site dir)
import { execSync } from "node:child_process";
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const SITE = process.cwd();
const rels = [];

// Every source module that a content page's freshness can resolve to.
for (const dir of ["lib", "data"]) {
  const abs = path.join(SITE, dir);
  if (!existsSync(abs)) continue;
  for (const f of readdirSync(abs)) {
    if (f.endsWith(".ts") || f.endsWith(".json")) rels.push(`${dir}/${f}`);
  }
}
const articlesDir = path.join(SITE, "lib", "articles");
if (existsSync(articlesDir)) {
  for (const f of readdirSync(articlesDir)) if (f.endsWith(".ts")) rels.push(`lib/articles/${f}`);
}

const data = {};
for (const rel of rels) {
  try {
    const iso = execSync(`git log -1 --format=%cI -- "${rel}"`, {
      cwd: SITE,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (iso) data[rel] = iso;
  } catch {
    /* untracked / no history — omit; freshness.ts uses its floor */
  }
}

// Deterministic key order so the committed file has a stable, reviewable diff.
const sorted = Object.fromEntries(Object.keys(data).sort().map((k) => [k, data[k]]));
writeFileSync(path.join(SITE, "lib", "freshness-data.json"), JSON.stringify(sorted, null, 1) + "\n");
console.log(`gen-freshness: wrote ${Object.keys(sorted).length} real git dates -> lib/freshness-data.json`);
