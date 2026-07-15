import Link from "next/link";
import { BRAND } from "@/lib/content";

/**
 * FTC affiliate disclosure, placed ON the click-out surface (right by the comparison board where
 * the "Check price on Amazon" buttons live) — not just in the footer. Short, plain, non-cheesy:
 * "clear and conspicuous", before the buy action. `compact` is the tighter inline variant.
 */
export function AffiliateDisclosure({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <p className="flex items-center justify-center gap-1.5 text-[0.72rem] leading-relaxed text-ink-dim">
        <Tag />
        <span>
          Affiliate links — as an Amazon Associate we earn from qualifying purchases, at no cost to
          you.
        </span>
      </p>
    );
  }
  return (
    <div className="flex items-start gap-2 rounded-xl border border-line-soft bg-surface/60 px-3.5 py-2.5">
      <Tag />
      <p className="text-[0.78rem] leading-relaxed text-ink-dim">
        The buttons below are Amazon affiliate links. As an Amazon Associate,{" "}
        {BRAND.name} earns from qualifying purchases — at no extra cost to you, and it never changes
        which product wins.{" "}
        <Link href="/disclosure" className="ulink font-medium text-ink-2">
          Full disclosure
        </Link>
        .
      </p>
    </div>
  );
}

function Tag() {
  return (
    <svg
      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-faint"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 7 v5 l9 9 8 -8 -9 -9 H3 Z" />
      <path d="M7.5 7.5 h.01" />
    </svg>
  );
}
