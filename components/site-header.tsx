"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Wordmark } from "@/components/wordmark";
import { SiteSearch } from "@/components/site-search";

// Nav is revenue-weighted: the highest-intent decision surfaces (guides, kits) lead, then the
// full catalog ("All Gear") and the value-entry surface ("Value Picks") sit last — reachable up
// top as well as in the footer. Car vertical uses one consistent label ("Car & Roadside") sitewide.
const NAV = [
  { href: "/gear", label: "Car & Roadside" },
  { href: "/heat", label: "Cooling" },
  { href: "/useful", label: "Work & EDC" },
  { href: "/guides", label: "Guides" },
  { href: "/kits", label: "Kits" },
  { href: "/products", label: "All Gear" },
  { href: "/finds", label: "Value Picks" },
];

/** Dark-accent header — brand frame + always-visible search (the #1 findability path). */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-dark text-on-dark transition-[box-shadow,border-color] duration-300 ${
        scrolled ? "border-dark-line shadow-[0_12px_34px_-18px_rgba(0,0,0,0.95)]" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:gap-4 sm:px-6">
        <Link href="/" aria-label="BlackBox Supplies — home" className="shrink-0">
          <Wordmark light markClassName="h-6 w-6 sm:h-7 sm:w-7" size="text-[0.95rem] sm:text-[1.05rem]" showMark />
        </Link>

        {/* always-visible search — mobile + desktop; the fastest intent → product path */}
        <SiteSearch className="min-w-0 flex-1 sm:max-w-sm" placeholder="Search gear…" />

        <nav className="ml-auto hidden shrink-0 items-center gap-6 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`relative py-1 text-sm font-medium transition-colors ${
                isActive(item.href) ? "text-on-dark" : "text-on-dark-dim hover:text-on-dark"
              }`}
            >
              {item.label}
              {isActive(item.href) ? (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-accent-bright" aria-hidden />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/newsletter"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition-colors hover:bg-accent-strong lg:inline-flex"
          >
            Newsletter
          </Link>

          {/* mobile / tablet menu toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-dark-line text-on-dark lg:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round">
              {open ? <path d="M6 6 L18 18 M18 6 L6 18" /> : <path d="M4 7 H20 M4 12 H20 M4 17 H20" />}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile / tablet menu */}
      <AnimatePresence>
        {open ? (
          <motion.nav
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-dark-2 lg:hidden"
          >
            <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-dark-line py-3.5 text-[0.95rem] font-medium ${
                    isActive(item.href) ? "text-accent-bright" : "text-on-dark"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/newsletter"
                onClick={() => setOpen(false)}
                className="mt-3 mb-2 block rounded-full bg-accent py-3 text-center text-sm font-semibold text-on-accent"
              >
                Join the newsletter
              </Link>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
