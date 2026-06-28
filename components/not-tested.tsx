import { Badge } from "@/components/ui/badge";
import { NOT_TESTED_NOTE } from "@/lib/content";

/** Compact badge for cards — surfaced wherever `tested === false`. */
export function NotTestedBadge() {
  return <Badge variant="outline">Not tested</Badge>;
}

/** Full honest note for the product detail page. */
export function NotTestedNote({ className = "" }: { className?: string }) {
  return (
    <p
      className={`flex gap-2 text-xs leading-relaxed text-ink-faint ${className}`}
    >
      <span className="mono mt-px shrink-0 text-accent/70" aria-hidden>
        ▢
      </span>
      <span>{NOT_TESTED_NOTE}</span>
    </p>
  );
}
