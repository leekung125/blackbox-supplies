import type { ComparisonGuide } from "@/lib/comparison-guides";
import type { ComparableProduct } from "@/lib/comparison-schema";
import { withAffiliateTag } from "@/lib/affiliate-tag";

/** Display host for a citation chip, e.g. "https://www.rtings.com/…" → "rtings.com". */
function hostLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const CITE_REL = "nofollow noopener noreferrer";

/**
 * "Sources / receipts" — the clickable citation backbone, sat right beneath the Research Trail.
 * Two honest layers:
 *  1. Guide-level `sources` — the labelled pages backing the verdicts (spec sheets, RTINGS, DOE,
 *     Consumer Reports, the product's own Amazon page).
 *  2. Per-product `sourceUrls` — the receipts behind each row's numbers, surfaced as small
 *     domain chips so a reader can check any spec at its origin.
 * Every URL is real + reachable (HONESTY LAW); a fabricated citation is worse than none. Renders
 * only the layers that actually have links.
 */
export function SourcesBlock({
  sources,
  products,
}: {
  sources?: ComparisonGuide["sources"];
  products: ComparableProduct[];
}) {
  const productSources = products
    .map((p) => ({ name: p.name, urls: (p.sourceUrls ?? []).filter(Boolean) }))
    .filter((p) => p.urls.length > 0);

  const hasGuideSources = Boolean(sources?.length);
  const hasProductSources = productSources.length > 0;
  if (!hasGuideSources && !hasProductSources) return null;

  return (
    <section className="mt-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <div className="flex items-center gap-2">
        <LinkIcon />
        <h2 className="mono text-[0.72rem] font-medium uppercase tracking-[0.16em] text-accent-strong">
          Sources &amp; receipts
        </h2>
      </div>
      <p className="mt-2.5 text-sm leading-relaxed text-ink-2">
        Every number above traces back to a real, reachable page — check any of them yourself.
      </p>

      {hasGuideSources ? (
        <ol className="mt-4 space-y-2.5">
          {sources!.map((s, i) => (
            <li key={s.url} className="flex gap-3 text-[0.9rem] leading-relaxed">
              <span className="mono mt-0.5 shrink-0 text-[0.72rem] text-ink-faint" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">
                <a
                  href={withAffiliateTag(s.url)}
                  target="_blank"
                  rel={CITE_REL}
                  className="ulink font-medium text-ink"
                >
                  {s.label}
                </a>
                <span className="mono ml-2 break-all text-[0.72rem] text-ink-faint">
                  {hostLabel(s.url)}
                </span>
              </span>
            </li>
          ))}
        </ol>
      ) : null}

      {hasProductSources ? (
        <div className={hasGuideSources ? "mt-4 border-t border-line-soft pt-4" : "mt-4"}>
          <span className="mono text-[0.66rem] uppercase tracking-[0.12em] text-ink-dim">
            Per-product spec sources
          </span>
          <ul className="mt-2.5 space-y-2.5">
            {productSources.map((p) => (
              <li key={p.name} className="text-[0.85rem] leading-relaxed">
                <span className="text-ink-2">{p.name}</span>
                <span className="mt-1 flex flex-wrap gap-x-2 gap-y-1">
                  {p.urls.map((u, i) => (
                    <a
                      key={u}
                      href={withAffiliateTag(u)}
                      target="_blank"
                      rel={CITE_REL}
                      className="mono inline-flex items-center gap-1 rounded-md border border-line-soft bg-surface-2 px-2 py-0.5 text-[0.7rem] text-ink-dim transition-colors hover:border-accent/40 hover:text-accent-strong"
                    >
                      <Cite />
                      {p.urls.length > 1 ? `${hostLabel(u)} · ${i + 1}` : hostLabel(u)}
                    </a>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function LinkIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0 text-accent-strong"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M10 13 a5 5 0 0 0 7 0 l3 -3 a5 5 0 0 0 -7 -7 l-1.5 1.5" />
      <path d="M14 11 a5 5 0 0 0 -7 0 l-3 3 a5 5 0 0 0 7 7 l1.5 -1.5" />
    </svg>
  );
}
function Cite() {
  return (
    <svg
      className="h-3 w-3 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17 L17 7 M9 7 h8 v8" />
    </svg>
  );
}
