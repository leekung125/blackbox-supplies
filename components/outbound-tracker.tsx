"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Fires a Vercel Analytics custom event on every outbound click to Amazon.
 * This is our LEADING INDICATOR: an Amazon click is the last thing we can see
 * before a commission (Amazon's own conversion data lives in Associates Central).
 * Tracking it here — capture-phase, delegated to the document so it catches every
 * affiliate CTA (buy boxes, sticky bars, comparison rows, cards) without touching
 * each component — lets us watch which pages and products actually drive intent.
 */
export function OutboundTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const a = el?.closest?.("a") as HTMLAnchorElement | null;
      if (!a?.href) return;
      const isAmazon = /(^|\.)amazon\.[a-z.]+/i.test(a.href) || /amzn\.to/i.test(a.href);
      if (!isAmazon) return;
      // Pull the ASIN if present so we can attribute clicks to a specific product.
      const asin = a.href.match(/\/dp\/([A-Z0-9]{10})/)?.[1] ?? "";
      track("amazon_click", {
        path: window.location.pathname,
        asin,
        label: (a.innerText || a.getAttribute("aria-label") || "").trim().slice(0, 60),
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
