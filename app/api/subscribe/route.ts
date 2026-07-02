import { NextResponse } from "next/server";

/**
 * Newsletter subscribe endpoint.
 *
 * Honest status: there is no email service provider (ESP) wired in by default. If the env var
 * NEWSLETTER_WEBHOOK_URL is set (e.g. a Beehiiv/ConvertKit/Resend/Zapier inbound webhook), the email
 * is forwarded there and genuinely captured. If it is NOT set, the endpoint validates the address and
 * acknowledges receipt without persisting it — the front end copy is written to match (no false
 * promise of a confirmed subscription). Wiring a real list = set NEWSLETTER_WEBHOOK_URL.
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let email = "";
  try {
    const body = await request.json();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  const webhook = process.env.NEWSLETTER_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, source: "blackboxsupplies.com" }),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return NextResponse.json({ ok: true, captured: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Something went wrong on our end. Try again shortly." },
        { status: 502 }
      );
    }
  }

  // No ESP configured yet — acknowledge without claiming a confirmed subscription.
  return NextResponse.json({ ok: true, captured: false });
}
