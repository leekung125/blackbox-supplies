/**
 * Lemon Squeezy checkout seam — the single, env-driven config point for the paid Systems layer.
 *
 * WHY THIS FILE EXISTS (COMMERCE_STACK_RECOMMENDATION §5, DECISION_LOG D5):
 * the processor is treated as *swappable by design* — nothing in the pages or components
 * hardcodes a store URL or a secret. The buy button reads {@link getCheckoutUrl}; the webhook
 * reads {@link getWebhookSecret} + {@link verifyWebhookSignature}. Going live = pasting a real
 * checkout URL + webhook secret into Vercel env (see docs/commerce/LEMON_SQUEEZY_SETUP.md).
 * Building + testing against Lemon Squeezy TEST MODE needs no code change — only test-mode envs.
 *
 * HARD RULE: no secret ever lives in this file or the repo. Everything is read from
 * `process.env` at runtime; `.env*` is gitignored (same discipline as the Amazon tag + Brevo key).
 * Every getter degrades gracefully to a safe "not configured yet" state so the whole Systems
 * layer ships and renders BEFORE the Lemon Squeezy account exists.
 *
 * ── The env contract (set in Vercel; documented in LEMON_SQUEEZY_SETUP.md) ──────────────────
 *   NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL  the flagship hosted-checkout URL (the single-SKU case).
 *                                       A checkout URL is customer-facing (not a secret), so it is
 *                                       exposed with NEXT_PUBLIC_ → the client buy button can
 *                                       self-resolve it. (A server-only `LEMONSQUEEZY_CHECKOUT_URL`
 *                                       is also honored for server-side resolution.)
 *   LEMONSQUEEZY_CHECKOUT_URL_<SLUG>    optional per-product override, SLUG upper-cased with
 *                                       non-alphanumerics → "_" (e.g. DIGITAL_GLOVEBOX). Server-side
 *                                       resolution only (the page passes the URL to the button).
 *   LEMONSQUEEZY_STORE_SUBDOMAIN        optional fallback: build a URL from store + variant when no
 *   LEMONSQUEEZY_VARIANT_<SLUG>         explicit checkout URL is set →
 *                                       https://<sub>.lemonsqueezy.com/checkout/buy/<variant>.
 *   LEMONSQUEEZY_WEBHOOK_SECRET         the signing secret for the /api/lemon/webhook HMAC check
 *                                       (server-only — never NEXT_PUBLIC, never in the client).
 *
 * CLIENT vs SERVER (Next 16 gotcha): only `NEXT_PUBLIC_*` env vars accessed by a LITERAL key are
 * inlined into the client bundle. So the client button can self-resolve ONLY the flagship
 * `NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL`. For any other SKU / env form, the SERVER page resolves
 * the URL via {@link getCheckoutUrl} and passes it to <BuyButton checkoutUrl={...} />. Both paths
 * flow through this one module — the seam stays single-sourced.
 *
 * This module is CLIENT-SAFE (imported by the client <BuyButton>): it deliberately has NO
 * `node:crypto` / Node-builtin import. The HMAC webhook-signature verification lives in the
 * server-only sibling `lemon-server.ts`, so bundling this module into the browser never pulls a
 * Node builtin.
 */

/** The flagship slug — the single SKU at launch (DECISION_LOG D3). Used as the webhook fallback. */
export const FLAGSHIP_SLUG = "digital-glovebox";

/** slug → ENV KEY fragment: "digital-glovebox" → "DIGITAL_GLOVEBOX". */
function slugEnvKey(slug: string): string {
  return slug
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

/** Read an env var, returning undefined for missing OR empty/whitespace-only values. */
function env(name: string): string | undefined {
  const v = process.env[name];
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t.length > 0 ? t : undefined;
}

/**
 * Resolve the raw Lemon Squeezy checkout base URL for a product slug, or `null` if the store
 * isn't wired yet. Resolution order (most specific first):
 *   1. LEMONSQUEEZY_CHECKOUT_URL_<SLUG>            (per-product override)
 *   2. LEMONSQUEEZY_CHECKOUT_URL                   (flagship / single-SKU default)
 *   3. store subdomain + LEMONSQUEEZY_VARIANT_<SLUG> (constructed hosted URL)
 * Returns null (not a fake URL) when nothing is configured — the button then shows "coming soon".
 */
function resolveBaseUrl(slug: string): string | null {
  const key = slugEnvKey(slug);

  // Per-product override (server-side dynamic key — resolved when the page calls getCheckoutUrl).
  const perProduct = env(`LEMONSQUEEZY_CHECKOUT_URL_${key}`);
  if (perProduct) return perProduct;

  // The flagship default only applies to the flagship slug — never silently point a second SKU at
  // the flagship's checkout (that would sell the wrong product). Other SKUs must set their own env.
  if (slug === FLAGSHIP_SLUG) {
    // NEXT_PUBLIC literal → the ONLY value the client button can read directly. This MUST be a
    // literal `process.env.NAME` access (not the dynamic env() helper) or Next won't inline it
    // into the client bundle and it would be undefined in the browser.
    const flagshipPublicRaw = process.env.NEXT_PUBLIC_LEMONSQUEEZY_CHECKOUT_URL;
    const flagshipPublic =
      typeof flagshipPublicRaw === "string" && flagshipPublicRaw.trim().length > 0
        ? flagshipPublicRaw.trim()
        : undefined;
    if (flagshipPublic) return flagshipPublic;
    // Server-only fallback (honored during server-side resolution).
    const flagship = env("LEMONSQUEEZY_CHECKOUT_URL");
    if (flagship) return flagship;
  }

  const sub = env("LEMONSQUEEZY_STORE_SUBDOMAIN");
  const variant = env(`LEMONSQUEEZY_VARIANT_${key}`);
  if (sub && variant) {
    return `https://${sub}.lemonsqueezy.com/checkout/buy/${variant}`;
  }

  return null;
}

/**
 * Public helper the buy button relies on. Returns a ready-to-open Lemon Squeezy checkout URL for
 * the given product slug, with our `slug` threaded through as checkout custom data so the webhook
 * can attribute the purchase back to the right product (read from `meta.custom_data.slug`).
 * Returns `null` when no checkout is configured yet → the button degrades to a disabled
 * "coming soon" state (see buy-button.tsx). Never returns a fabricated URL.
 *
 * @param slug     product slug (e.g. "digital-glovebox")
 * @param opts.dark render the overlay in dark mode to match the site (adds `?dark=1`)
 */
export function getCheckoutUrl(
  slug: string,
  opts: { dark?: boolean } = {},
): string | null {
  const base = resolveBaseUrl(slug);
  if (!base) return null;

  try {
    const url = new URL(base);
    // Attribution: thread our slug into LS "custom data" → returned in the webhook payload.
    url.searchParams.set("checkout[custom][slug]", slug);
    // Match the site's warm-dark editorial system in the hosted/overlay checkout.
    if (opts.dark) url.searchParams.set("dark", "1");
    return url.toString();
  } catch {
    // If the env value isn't a valid URL, fail closed to "not configured" rather than emit junk.
    return null;
  }
}

/** True when a real checkout URL exists for this slug (gates the buy button's live vs "coming soon"). */
export function isCheckoutConfigured(slug: string): boolean {
  return resolveBaseUrl(slug) !== null;
}

/** The webhook signing secret, or undefined if not set yet (webhook then returns 503, never processes). */
export function getWebhookSecret(): string | undefined {
  return env("LEMONSQUEEZY_WEBHOOK_SECRET");
}

/** Minimal shape of the bits of the LS webhook payload we read (order_created). */
export interface LemonWebhookPayload {
  meta?: {
    event_name?: string;
    custom_data?: Record<string, unknown> | null;
  };
  data?: {
    id?: string;
    type?: string;
    attributes?: Record<string, unknown>;
  };
}

/**
 * Attribute a webhook event back to one of our product slugs. Prefers the `slug` we threaded
 * through checkout custom data ({@link getCheckoutUrl}); falls back to the flagship, since at
 * launch there is exactly one SKU (DECISION_LOG D3). Keeps the webhook correct as the shelf grows.
 */
export function resolvePurchaseSlug(payload: LemonWebhookPayload): string {
  const custom = payload?.meta?.custom_data;
  const fromCustom = custom && typeof custom["slug"] === "string" ? (custom["slug"] as string) : "";
  return fromCustom.trim() || FLAGSHIP_SLUG;
}
