"use client";

import { useCallback, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { CategoryMeta, ComparableProduct } from "@/lib/comparison-schema";
import type { DecisionPicks } from "@/lib/comparison-guides";
import { ComparisonBoard, type SortOption } from "@/components/comparison-board";
import { resolveHero } from "@/components/guide/board-utils";
import { StickyDecisionSummary, type DecisionPick, type DecisionSlot } from "@/components/guide/sticky-decision-summary";

const SLOT_LABEL: Record<DecisionSlot, string> = {
  overall: "Best overall",
  value: "Best value",
  premium: "Best premium",
};

/** Resolve the three decision slots to real products; silently drop any id that doesn't match. */
function buildPicks(products: ComparableProduct[], dp?: DecisionPicks): DecisionPick[] {
  if (!dp) return [];
  return (["overall", "value", "premium"] as const)
    .map((slot): DecisionPick | null => {
      const product = products.find((p) => p.id === dp[slot]);
      return product ? { slot, label: SLOT_LABEL[slot], product } : null;
    })
    .filter((x): x is DecisionPick => x !== null);
}

/**
 * The interactive comparison island: owns the active sort so the sticky decision rail and the board
 * share ONE spotlight, and wires the rail's jump chips to smooth-scroll to the matching product card.
 */
export function ComparisonExperience({
  products,
  meta,
  sorts,
  decisionPicks,
}: {
  products: ComparableProduct[];
  meta: CategoryMeta;
  sorts: SortOption[];
  decisionPicks?: DecisionPicks;
}) {
  const reduce = useReducedMotion();
  const [sortId, setSortId] = useState(sorts[0]?.id ?? "rank");
  const { hero } = resolveHero(products, sorts, sortId);
  const picks = buildPicks(products, decisionPicks);

  const jump = useCallback(
    (productId: string) => {
      const el = document.getElementById(`pick-${productId}`);
      if (el) el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce],
  );

  return (
    <div>
      {picks.length && hero ? <StickyDecisionSummary picks={picks} hero={hero} onJump={jump} /> : null}
      <ComparisonBoard products={products} meta={meta} sorts={sorts} sortId={sortId} onSortChange={setSortId} />
    </div>
  );
}
