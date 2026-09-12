"use client";

import { useEffect } from "react";

/**
 * CHANNEL ATTRIBUTION FOR AMAZON LINKS — swap the Associates tracking ID at click time.
 *
 * ⛔ WHY THIS EXISTS. Measured 2026-09-12: the site had exactly ONE tracking ID
 * (`blackboxsuppl-20`), so Amazon could tell us that 15 items were ordered and $22 earned last
 * month, and nothing at all about WHERE those buyers came from. Search Console said 28 Google
 * clicks in 28 days across 200 pages — far too few to explain 15 orders — so most of the money is
 * arriving from somewhere else (pins, posts, or Amazon's 24-hour attribution) and we could not
 * name it. Every scaling decision (more niches? more channels? another site?) was therefore blind.
 * Four sibling tracking IDs now exist in the Associates account; this component routes clicks to
 * the right one.
 *
 * HOW. One capture-phase click listener on the document, mounted once in the root layout:
 *   - the channel is decided ONCE per session (utm_source first, then the referrer host) and kept
 *     in sessionStorage, so a visitor who lands from Pinterest and then reads three more guides is
 *     still counted as Pinterest;
 *   - on any click of an `amazon.*` link, `tag=` is rewritten to that channel's ID.
 *
 * WHY A LISTENER AND NOT THE RENDERER. Amazon URLs are baked into ~20 article/comparison modules
 * and rendered on the server for static pages; a per-request tag would break static generation and
 * a per-component change would miss the hardcoded ones. A single delegated listener covers every
 * link on every page, including any added later, and changes no existing file.
 *
 * HONESTY. This changes only which of OUR OWN tracking IDs is credited. It does not track the
 * visitor, set a cookie, or send anything anywhere: sessionStorage is per-tab and dies with it.
 */

const DEFAULT_TAG = "blackboxsuppl-20";

const CHANNEL_TAGS: Record<string, string> = {
  pinterest: "blackboxsuppl-pin-20",
  instagram: "blackboxsuppl-ig-20",
  facebook: "blackboxsuppl-fb-20",
  search: "blackboxsuppl-seo-20",
};

const REFERRER_CHANNEL: [RegExp, string][] = [
  [/(^|\.)pinterest\./i, "pinterest"],
  [/(^|\.)pin\.it$/i, "pinterest"],
  [/(^|\.)instagram\./i, "instagram"],
  [/(^|\.)(facebook|fb)\./i, "facebook"],
  [/(^|\.)(google|bing|duckduckgo|yahoo|ecosia|brave)\./i, "search"],
];

const KEY = "bb_channel";

function detectChannel(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const utm = (params.get("utm_source") || "").toLowerCase().trim();
    if (utm) {
      if (utm in CHANNEL_TAGS) return utm;
      if (/pin/.test(utm)) return "pinterest";
      if (/insta|ig\b/.test(utm)) return "instagram";
      if (/face|fb\b/.test(utm)) return "facebook";
      if (/google|bing|seo|organic|search/.test(utm)) return "search";
    }
    const ref = document.referrer;
    if (ref) {
      const host = new URL(ref).hostname;
      if (host && host !== window.location.hostname) {
        for (const [re, channel] of REFERRER_CHANNEL) if (re.test(host)) return channel;
      }
    }
  } catch {
    /* a malformed referrer or blocked storage must never break a page */
  }
  return null;
}

function sessionChannel(): string | null {
  try {
    const stored = window.sessionStorage.getItem(KEY);
    if (stored) return stored === "-" ? null : stored;
    const found = detectChannel();
    window.sessionStorage.setItem(KEY, found ?? "-");
    return found;
  } catch {
    return detectChannel();
  }
}

/** Rewrite `tag=` on an Amazon URL. Exported for tests; the listener below is the only caller. */
export function retagAmazonUrl(href: string, tag: string): string {
  if (!/^https?:\/\/(www\.)?amazon\.[a-z.]+\//i.test(href)) return href;
  try {
    const url = new URL(href);
    url.searchParams.set("tag", tag);
    return url.toString();
  } catch {
    return href;
  }
}

export function AffiliateChannel() {
  useEffect(() => {
    const channel = sessionChannel();
    if (!channel) return; // direct / unknown traffic keeps the default tag
    const tag = CHANNEL_TAGS[channel] || DEFAULT_TAG;
    if (tag === DEFAULT_TAG) return;

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") || "";
      if (!/amazon\.[a-z.]+\//i.test(href)) return;
      const next = retagAmazonUrl(href, tag);
      if (next !== href) anchor.setAttribute("href", next);
    };

    // capture phase: the href is corrected before the browser follows it, and before any
    // component's own onClick runs.
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true); // middle-click / open in new tab
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
