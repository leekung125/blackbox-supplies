"use client";

import { useState } from "react";
import { track } from "@vercel/analytics";

type State = "idle" | "loading" | "ok-captured" | "ok-pending" | "error";

/**
 * Newsletter signup form. Posts to /api/subscribe. Copy is honest about status: if the backend has an
 * ESP webhook wired (captured), it confirms the subscription; otherwise it thanks the user for early
 * interest without claiming a confirmed subscription.
 */
export function NewsletterForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [msg, setMsg] = useState("");

  const dark = tone === "dark";
  const done = state === "ok-captured" || state === "ok-pending";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setMsg("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setState("error");
        setMsg(data?.error ?? "Something went wrong. Try again.");
        return;
      }
      track("newsletter_signup", { captured: !!data.captured });
      setState(data.captured ? "ok-captured" : "ok-pending");
    } catch {
      setState("error");
      setMsg("Network error. Try again in a moment.");
    }
  }

  if (done) {
    return (
      <div
        className={`rounded-xl border px-5 py-4 text-sm ${
          dark ? "border-white/15 bg-white/5 text-white/85" : "border-line bg-accent-tint text-ink"
        }`}
      >
        <p className="font-semibold">Thanks — you&rsquo;re on the early list.</p>
        <p className={`mt-1 ${dark ? "text-white/60" : "text-ink-2"}`}>
          The newsletter is just getting started. You&rsquo;ll be among the first when the first issue
          ships — no spam, unsubscribe anytime.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          aria-label="Email address"
          className={`min-w-0 flex-1 rounded-full border px-5 py-3 text-sm outline-none transition-colors focus:border-accent ${
            dark
              ? "border-white/20 bg-white/10 text-white placeholder:text-white/40"
              : "border-line-strong bg-surface text-ink placeholder:text-ink-faint"
          }`}
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={`shrink-0 rounded-full px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-60 ${
            dark ? "bg-white text-graphite hover:bg-white/90" : "bg-accent text-on-accent hover:bg-accent-bright"
          }`}
        >
          {state === "loading" ? "Joining…" : "Join free"}
        </button>
      </div>
      {state === "error" ? (
        <p className={`mt-2 text-xs ${dark ? "text-red-300" : "text-red-600"}`}>{msg}</p>
      ) : (
        <p className={`mt-2 text-xs ${dark ? "text-white/45" : "text-ink-faint"}`}>
          Useful gear notes, a few times a month. No spam, unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
