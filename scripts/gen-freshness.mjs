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
import { readdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
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

// ⛔ REFUSE TO SHRINK THE MAP. This now runs as a `prebuild`, and Vercel builds from a SHALLOW
// clone where `git log -1 -- <file>` returns nothing for most files. Verified by running this
// script in a directory with no git history: it happily reported "wrote 0 real git dates". Without
// this guard the prebuild would overwrite 71 real dates with an empty object, collapse every page
// onto the fallback, and re-create the blanket-stamp problem this file exists to fix - silently,
// on the deploy, where nobody would ever see it.
// Writing FEWER dates than are already committed is never an improvement.
const OUT = path.join(SITE, "lib", "freshness-data.json");
let existing = {};
try {
  existing = JSON.parse(readFileSync(OUT, "utf8"));
} catch {
  /* first run - nothing to protect */
}
const have = Object.keys(existing).length;
const got = Object.keys(sorted).length;
if (have && got < have * 0.9) {
  console.log(
    `gen-freshness: SKIPPED - resolved only ${got} dates against ${have} already committed. ` +
      `This is a shallow clone or a checkout without history; keeping the existing map.`,
  );
} else {
  writeFileSync(OUT, JSON.stringify(sorted, null, 1) + String.fromCharCode(10));
  console.log(`gen-freshness: wrote ${got} real git dates -> lib/freshness-data.json`);
}
