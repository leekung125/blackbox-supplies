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

  // 1) Brevo (recommended — simplest, free forever: unlimited contacts + 300 emails/day).
  //    Set BREVO_API_KEY (+ optional BREVO_LIST_ID) in Vercel to go live.
  const brevoKey = process.env.BREVO_API_KEY;
  if (brevoKey) {
    const brevoList = process.env.BREVO_LIST_ID;
    try {
      const res = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: { "content-type": "application/json", "api-key": brevoKey },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          ...(brevoList ? { listIds: [Number(brevoList)] } : {}),
        }),
      });
      if (res.ok || res.status === 204) return NextResponse.json({ ok: true, captured: true });
      const t = await res.text().catch(() => "");
      if (t.includes("already exist")) return NextResponse.json({ ok: true, captured: true });
      throw new Error(`brevo ${res.status}`);
    } catch {
      return NextResponse.json(
        { ok: false, error: "Something went wrong on our end. Try again shortly." },
        { status: 502 }
      );
    }
  }

  // 2) Beehiiv (alternative). Set BEEHIIV_API_KEY + BEEHIIV_PUBLICATION_ID to use instead.
  const beehiivKey = process.env.BEEHIIV_API_KEY;
  const beehiivPub = process.env.BEEHIIV_PUBLICATION_ID;
  if (beehiivKey && beehiivPub) {
    try {
      const res = await fetch(`https://api.beehiiv.com/v2/publications/${beehiivPub}/subscriptions`, {
        method: "POST",
        headers: { "content-type": "application/json", authorization: `Bearer ${beehiivKey}` },
        body: JSON.stringify({
          email,
          reactivate_existing: false,
          send_welcome_email: true,
          utm_source: "blackboxsupplies.com",
          referring_site: "blackboxsupplies.com",
        }),
      });
      if (!res.ok) throw new Error(`beehiiv ${res.status}`);
      return NextResponse.json({ ok: true, captured: true });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Something went wrong on our end. Try again shortly." },
        { status: 502 }
      );
    }
  }

  // 2) Generic webhook fallback (Zapier/Make/etc.) if a webhook URL is set instead.
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

  // 3) No ESP configured yet — acknowledge without claiming a confirmed subscription.
  return NextResponse.json({ ok: true, captured: false });
}
