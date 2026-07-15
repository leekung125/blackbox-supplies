/**
 * Analytics event taxonomy — the single typed source of truth for every custom `track()` event.
 *
 * Why this exists: `track` from `@vercel/analytics` takes a free-form string name, so event names
 * and their prop shapes drift silently across call sites. This file pins them down. Import the
 * typed {@link track} from here and the compiler enforces the correct event name AND props.
 *
 * Wave-0 scope (IMPLEMENTATION_PLAN §2, KPI_SCORECARD §1): the taxonomy is EXTENDED with the
 * event names later waves will fire, as typed no-op-safe stubs. Firing any of them today is a
 * safe no-op (Vercel Analytics ignores unknown events until the surface is wired). We do NOT
 * change existing event behavior — existing call sites that import `track` straight from
 * `@vercel/analytics` keep working unchanged; this file only ADDS names/types and a typed wrapper.
 */
import { track as vercelTrack } from "@vercel/analytics";

/** Prop value types Vercel Analytics accepts. Mirrors the package's `AllowedPropertyValues`. */
type PropValue = string | number | boolean | null | undefined;

/**
 * The complete event map: event name → its props.
 *
 * EXISTING events (behavior unchanged — documented here so the taxonomy is complete and any
 * future call site that opts into the typed wrapper gets checked):
 *   amazon_click, product_outbound, award_strip_outbound, compare_sort, decision_jump,
 *   decision_outbound, find_outbound, sticky_outbound, newsletter_signup.
 *
 * NEW Wave-0 stubs (added now, fired by later waves):
 *   lead_magnet_view, lead_magnet_signup, system_view, system_card_click, checkout_start,
 *   digital_purchase, checklist_pdf_request. Plus a `source` field added to newsletter_signup.
 */
export interface AnalyticsEvents {
  // ── existing (unchanged) ─────────────────────────────────────────────────
  amazon_click: { path: string; asin: string; label: string };
  product_outbound: {
    product: string;
    category: string;
    where?: string;
    affiliate: boolean;
  };
  award_strip_outbound: { product: string; role: string; affiliate: boolean };
  compare_sort: { category: string; sort: string };
  decision_jump: { slot: string; product: string };
  decision_outbound: {
    product: string;
    category: string;
    where: string;
    affiliate: boolean;
  };
  find_outbound: { find: string; category: string; affiliate: boolean };
  sticky_outbound: { product: string; category: string; affiliate: boolean };
  /** `source` added in Wave 0 so capture can be attributed per surface (KPI §1). Optional so the
   *  existing `track("newsletter_signup", { captured })` call site stays valid. */
  newsletter_signup: { captured: boolean; source?: string };

  // ── new Wave-0 stubs (fired by later waves) ──────────────────────────────
  /** A free lead-magnet offer entered the viewport / was shown. */
  lead_magnet_view: { magnet: string; path: string; slot: string };
  /** A visitor signed up for a free lead magnet. */
  lead_magnet_signup: { magnet: string; path: string; slot: string };
  /** A Systems (owned digital product) card / landing surface was shown. */
  system_view: { product: string; path: string; slot: string; tier: string };
  /** A Systems card was clicked through. */
  system_card_click: {
    product: string;
    path: string;
    slot: string;
    tier: string;
  };
  /** The checkout flow for a digital product was started. */
  checkout_start: { product: string };
  /** A digital product purchase completed (fired from the webhook / receipt page). */
  digital_purchase: { product: string; via: string };
  /** The PDF version of a free checklist was requested (email opt-in). */
  checklist_pdf_request: { checklist: string; path: string };
}

export type AnalyticsEventName = keyof AnalyticsEvents;

/**
 * Typed, no-op-safe `track`. Enforces a known event name and its exact props at compile time,
 * then delegates to Vercel Analytics. Wrapped so a missing/uninitialized analytics runtime can
 * never throw into product code — firing a not-yet-wired stub is a silent no-op by design.
 */
export function track<K extends AnalyticsEventName>(
  name: K,
  props: AnalyticsEvents[K],
): void {
  try {
    vercelTrack(name, props as Record<string, PropValue>);
  } catch {
    // no-op: analytics is best-effort telemetry, never a hard dependency.
  }
}
