/**
 * Lemon Squeezy — SERVER-ONLY helpers (webhook signature verification).
 *
 * Split out from `lemon.ts` because this module imports `node:crypto`, which must never be pulled
 * into a client bundle. `lemon.ts` (imported by the client <BuyButton>) stays Node-builtin-free;
 * this file is imported ONLY by the webhook route (`app/api/lemon/webhook/route.ts`, Node runtime).
 * (No `server-only` guard import — that package isn't a dependency here; the `node:crypto` import
 * itself would already break any accidental client bundling, which is the guarantee we need.)
 */
import { createHmac, timingSafeEqual } from "node:crypto";
import { getWebhookSecret } from "@/lib/lemon";

/**
 * Verify a Lemon Squeezy webhook signature.
 *
 * LS signs the RAW request body with HMAC-SHA256 using the webhook's signing secret and sends the
 * hex digest in the `X-Signature` header. We recompute it over the raw body and compare with a
 * timing-safe equality check (constant-time — never a plain `===`, per the repo security rule).
 *
 * Returns false (reject) on any missing input or length mismatch — fail closed, never throw.
 *
 * @param rawBody   the exact raw request body string (must NOT be re-serialized JSON)
 * @param signature the `X-Signature` header value (hex)
 * @param secret    the signing secret (defaults to {@link getWebhookSecret})
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null | undefined,
  secret: string | undefined = getWebhookSecret(),
): boolean {
  if (!secret || !signature) return false;
  try {
    const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest();
    const received = Buffer.from(signature, "hex");
    // timingSafeEqual throws on length mismatch — guard first so a bad-length sig is a clean reject.
    if (expected.length !== received.length) return false;
    return timingSafeEqual(expected, received);
  } catch {
    return false;
  }
}
