"use client";

import { useState } from "react";

/**
 * Share / copy-link button. Uses the native share sheet on mobile when available, otherwise copies
 * the URL to the clipboard and shows a "Copied!" confirmation for ~1.6s. Helps readers pass a page on.
 */
export function ShareButton({
  title,
  className = "",
  label = "Share",
}: {
  title?: string;
  className?: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onClick() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const nav = typeof navigator !== "undefined" ? navigator : undefined;
    if (nav && "share" in nav) {
      try {
        await nav.share({ title: title || document.title, url });
        return;
      } catch {
        /* user cancelled — fall through to copy */
      }
    }
    try {
      await nav?.clipboard?.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Share this page"
      className={`inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-ink-dim transition-colors hover:border-accent/50 hover:text-ink ${className}`}
    >
      {copied ? (
        <>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-accent" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M20 6 L9 17 L4 12" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
            <path d="M8.6 13.5 L15.4 17.5 M15.4 6.5 L8.6 10.5" />
          </svg>
          {label}
        </>
      )}
    </button>
  );
}
