"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Wordmark } from "@/components/wordmark";

/**
 * Route-level error boundary. Renders when a page in the tree throws during render.
 * Calm and on-brand: a retry (`reset`) plus honest recovery paths — never a bare stack trace.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface for the browser console / monitoring; no user-facing stack traces.
    console.error(error);
  }, [error]);

  return (
    <div className="ground-field flex min-h-screen flex-col items-center px-4 py-16 sm:py-24">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" aria-label="BlackBox Supplies — home" className="inline-flex">
          <Wordmark light size="text-[1.1rem]" markClassName="h-8 w-8" />
        </Link>

        <span className="eyebrow eyebrow-accent mt-12 block">Something broke</span>
        <h1 className="mt-3 text-balance font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl">
          A part of the page failed to load.
        </h1>
        <p className="lede mt-4 max-w-xl">
          This one&rsquo;s on us, not you. Try again — most of the time a reload clears it. If it keeps
          happening, the routes below always work.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={reset} className="cta-amber">
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[10px] border border-line px-6 py-[13px] text-sm font-semibold text-ink transition-colors hover:border-accent/50 hover:text-accent"
          >
            Back to home
          </Link>
        </div>

        <p className="mt-8 text-sm text-ink-dim">
          Or browse{" "}
          <Link href="/guides" className="ulink font-semibold">all guides</Link>, see{" "}
          <Link href="/products" className="ulink font-semibold">every product</Link> we track, or read{" "}
          <Link href="/about" className="ulink font-semibold">how we work</Link>.
        </p>

        {error?.digest ? (
          <p className="mono mt-8 text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">
            Reference · {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
