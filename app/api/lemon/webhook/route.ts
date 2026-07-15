import { NextResponse } from "next/server";
import { track } from "@/lib/analytics";
import {
  getWebhookSecret,
  resolvePurchaseSlug,
  type LemonWebhookPayload,
} from "@/lib/lemon";
import { verifyWebhookSignature } from "@/lib/lemon-server";

/**
 * Lemon Squeezy purchase webhook — the server half of the checkout seam.
 *
 * Lemon Squeezy calls this endpoint after each store event. We care about `order_created`
 * (a completed purchase). The flow:
 *   1. Read the RAW body (needed for signature verification — must not be re-serialized).
 *   2. Verify the HMAC-SHA256 signature in `X-Signature` against LEMONSQUEEZY_WEBHOOK_SECRET
 *      (constant-time compare, in lib/lemon.ts). Reject anything unsigned/forged.
 *   3. On `order_created`: attribute the sale to our product slug, fire the typed
 *      `digital_purchase` event, and trigger the post-purchase (Brevo) email — then 200.
 *
 * SAFETY / FAIL-CLOSED (COMMERCE_STACK_RECOMMENDATION §5, IMPLEMENTATION_PLAN §4):
 *   - No webhook secret set yet → 503 (endpoint exists so the URL can be pasted into LS during
 *     setup, but it never processes an unauthenticated event). Ships safely before the account.
 *   - Bad/missing signature → 401. Malformed body → 400. We never trust an unverified payload.
 *   - The Brevo email is a documented STUB (Wave 1 wires the ESP); a failure there never fails the
 *     webhook — LS retries on non-2xx, and we must not double-charge retries with a 500 loop.
 *
 * Node runtime: needs `node:crypto` (HMAC) — not available on the Edge runtime.
 */
export const runtime = "nodejs";
// Never cache a webhook — every call is a unique event that must hit this handler.
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  // 1) Fail closed if the signing secret isn't configured (pre-launch / misconfig).
  const secret = getWebhookSecret();
  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook not configured (no signing secret set)." },
      { status: 503 },
    );
  }

  // 2) Read the RAW body exactly as sent — signature is computed over these bytes.
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Unreadable body." }, { status: 400 });
  }

  // 3) Verify the HMAC signature (constant-time). LS sends the hex digest in `X-Signature`.
  const signature = request.headers.get("x-signature");
  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  }

  // 4) Parse the now-trusted payload.
  let payload: LemonWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as LemonWebhookPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON." }, { status: 400 });
  }

  const eventName = payload?.meta?.event_name ?? "";

  // We only act on completed purchases. Other events (refunds, subscription_*, etc.) are ack'd 200
  // so Lemon Squeezy doesn't retry them — we simply don't have handling for them at launch.
  if (eventName === "order_created") {
    const slug = resolvePurchaseSlug(payload);

    // 5) Fire the purchase event (typed; best-effort — never throws into the webhook).
    track("digital_purchase", { product: slug, via: "lemonsqueezy" });

    // 6) Trigger the post-purchase email (Brevo). STUB until Wave 1's ESP is wired — a failure here
    //    is swallowed so LS is not made to retry a purchase we already recorded.
    const attrs = (payload?.data?.attributes ?? {}) as Record<string, unknown>;
    const buyerEmail = typeof attrs.user_email === "string" ? attrs.user_email : "";
    await triggerPostPurchaseEmail(buyerEmail, slug).catch(() => {
      // best-effort — log-and-continue; the sale is already delivered by Lemon Squeezy itself.
    });
  }

  // Always 200 for a verified event so Lemon Squeezy marks it delivered.
  return NextResponse.json({ ok: true });
}

/**
 * Post-purchase email hook (STUB).
 *
 * Lemon Squeezy already delivers the files + a receipt on its own — this is the BlackBox
 * post-purchase SEQUENCE (D0 quick-start → D3 fill-the-contacts nudge → seasonal reminders,
 * CROSS_SELL_RULES CS-6), which Wave 1 builds in Brevo. Until BREVO_API_KEY + the automation exist,
 * this is a no-op that documents the exact seam. When wired, add the buyer to the purchasers list /
 * fire the Brevo automation event keyed on `slug`.
 */
async function triggerPostPurchaseEmail(email: string, slug: string): Promise<void> {
  const brevoKey = process.env.BREVO_API_KEY;
  if (!brevoKey || !email) {
    // Not wired yet (or no email on the event) — nothing to do. Safe no-op by design.
    return;
  }

  // Wave-1 wiring target (left as the single documented step):
  //   POST https://api.brevo.com/v3/contacts  → add/update the buyer with attribute PURCHASED_SLUG
  //   = slug and a list/tag that starts the "post-purchase" automation in Brevo.
  // Kept minimal + non-fatal: any error is caught by the caller.
  const brevoList = process.env.BREVO_PURCHASERS_LIST_ID;
  await fetch("https://api.brevo.com/v3/contacts", {
    method: "POST",
    headers: { "content-type": "application/json", "api-key": brevoKey },
    body: JSON.stringify({
      email,
      updateEnabled: true,
      attributes: { PURCHASED_SLUG: slug },
      ...(brevoList ? { listIds: [Number(brevoList)] } : {}),
    }),
  });
}
