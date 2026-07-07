"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { searchItems, bestSellers, type SearchItem } from "@/lib/search-index";

function KindTag({ kind }: { kind: SearchItem["kind"] }) {
  const label = kind === "product" ? "Product" : kind === "guide" ? "Guide" : "Category";
  return (
    <span className="mono shrink-0 rounded-full border border-dark-line px-1.5 py-0.5 text-[0.54rem] uppercase tracking-[0.1em] text-on-dark-dim">
      {label}
    </span>
  );
}

/**
 * Always-visible site search with thumbnail autocomplete. Client-side over the local
 * index — instant, no backend. Enter (or click) routes straight to a real page;
 * an empty query with focus and no matches still shows best-sellers (never a dead end).
 */
export function SiteSearch({
  className = "",
  onNavigate,
  placeholder = "Search gear, guides, categories…",
}: {
  className?: string;
  onNavigate?: () => void;
  placeholder?: string;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const router = useRouter();
  const boxRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => searchItems(q, 8), [q]);
  const typed = q.trim().length > 0;
  const list = results.length ? results : typed ? bestSellers(4) : [];
  const showPanel = open && typed;

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function go(it: SearchItem) {
    setOpen(false);
    setQ("");
    onNavigate?.();
    router.push(it.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (!showPanel) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, list.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (list[active]) go(list[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div ref={boxRef} className={`relative ${className}`}>
      <div className="flex items-center gap-2 rounded-full border border-dark-line bg-white/[0.04] px-3.5 py-2 transition-colors focus-within:border-accent/60">
        <svg className="h-4 w-4 shrink-0 text-on-dark-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21 L16 16" />
        </svg>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label="Search the site"
          className="w-full min-w-0 bg-transparent text-sm text-on-dark placeholder:text-on-dark-dim focus:outline-none"
        />
      </div>

      {showPanel ? (
        <div className="glass absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-dark-line p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.85)]">
          {results.length === 0 ? (
            <p className="px-3 py-2 text-[0.78rem] text-on-dark-dim">
              No matches for &ldquo;{q.trim()}&rdquo; — try a broader term, or start here:
            </p>
          ) : null}
          {list.map((it, i) => (
            <button
              key={it.href}
              type="button"
              onMouseEnter={() => setActive(i)}
              onClick={() => go(it)}
              className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                i === active ? "bg-accent/15" : "hover:bg-white/[0.05]"
              }`}
            >
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dark-line bg-[#0c0906]">
                {it.image ? (
                  <Image src={it.image} alt="" fill sizes="36px" className="object-cover" />
                ) : (
                  <svg className="h-4 w-4 text-on-dark-dim" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden><path d="M4 7 h16 v13 h-16 z M4 7 l3 -4 h10 l3 4" /></svg>
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.86rem] font-medium text-on-dark">{it.title}</span>
                <span className="block truncate text-[0.7rem] text-on-dark-dim">{it.subtitle}</span>
              </span>
              <KindTag kind={it.kind} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
