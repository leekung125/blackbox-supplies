import Link from "next/link";
import { FindThumb } from "@/components/find-thumb";
import { FindOutbound } from "@/components/find-outbound";
import type { RareFind } from "@/lib/rare-finds";

/**
 * Rare Finds card — leads with curiosity, not a product photo (reasoned from BRAND_INTENT).
 * The hook ("whyClick") carries the card; the plate protects the "wait, what is that?";
 * two exits: deepen the curiosity (→ the find page) or convert it (→ Amazon).
 */
export function FindCard({ find }: { find: RareFind }) {
  const href = `/finds/${find.id}`;

  return (
    <article className="bbx-card card-lift flex h-full flex-col overflow-hidden">
      <Link href={href} className="group relative block">
        <FindThumb find={find} className="aspect-[16/11]" />
        <span className="absolute right-3 top-3 rounded-full border border-line-strong bg-paper/70 px-2.5 py-1 font-mono text-[0.7rem] font-semibold text-ink backdrop-blur-sm">
          {find.priceBand}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <span className="eyebrow eyebrow-accent">{find.category}</span>
        <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-ink-strong">
          <Link href={href} className="transition-colors hover:text-accent">{find.name}</Link>
        </h3>
        <p className="mt-2 flex-1 text-[0.94rem] leading-relaxed text-ink-dim">{find.whyClick}</p>

        <p className="mt-3.5 border-t border-line-soft pt-3 text-sm leading-relaxed text-ink-dim">
          <span className="font-semibold text-ink-dim">Solves:</span> {find.problem}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
          <FindOutbound find={find} variant="ghost" disclosure="none" />
          <Link href={href} className="ulink text-sm font-semibold">Details →</Link>
        </div>
      </div>
    </article>
  );
}
