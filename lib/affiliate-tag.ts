/**
 * Append the Associates tag to any link that points at Amazon.
 *
 * ⛔ WHY THIS EXISTS. 40 distinct Amazon URLs (46 occurrences) shipped as SOURCE/citation links
 * with no tag - "VIOFO A229 Plus official specifications", "NOCO GB40", and so on. A reader who
 * clicks one of those and buys earns this site nothing, and Amazon is 100% of its revenue. The
 * convention was already right in lib/articles.ts, where every source URL carries the tag; these
 * simply leaked past it, which is what happens when a convention lives in prose rather than code.
 *
 * Applied at RENDER time on purpose. `sourceUrl` in data/products.json is documented as the plain,
 * untagged URL that is the source of truth for the ASIN, and it should stay that way - tagging the
 * DATA would corrupt the identifier. Tagging the rendered HREF earns on the click without touching
 * the record.
 *
 * Non-Amazon URLs pass through untouched. A URL that already carries any `tag=` is left alone
 * rather than double-tagged.
 */
export const AMAZON_TAG = "blackboxsuppl-20";

export function withAffiliateTag(url: string | undefined | null): string {
  if (!url) return "";
  if (!/^https?:\/\/(www\.)?amazon\.[a-z.]+\//i.test(url)) return url;
  if (/[?&]tag=/.test(url)) return url;
  return url + (url.includes("?") ? "&" : "?") + "tag=" + AMAZON_TAG;
}
