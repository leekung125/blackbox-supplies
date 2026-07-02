/**
 * Retired: the brand no longer stamps "not tested" / AI disclaimers across the UI.
 * Honesty is preserved invisibly (no fabricated reviews or spec numbers) and via the
 * /disclosure page + the conditional affiliate disclosure that appears only on real
 * affiliate links. These render nothing so existing call sites stay valid.
 */
export function NotTestedBadge(_props: { tested?: boolean }) {
  return null;
}

export function NotTestedNote(_props: { className?: string }) {
  return null;
}
