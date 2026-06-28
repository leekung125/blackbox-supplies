import type { FC, ReactNode } from "react";
import type { Category } from "@/lib/products";

/**
 * CATEGORY OBJECT ART — static, code-drawn product illustrations.
 * The same dark-utility visual identity as the films (graphite body, cold-blue key/rim
 * light, ground bloom). Original illustration, not a product photo — see /disclosure.
 */

const A = "#4d8bb0";
const AB = "#8fc4e6";

function Frame({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="100%" role="img" aria-hidden>
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b313d" />
          <stop offset="0.45" stopColor="#191d26" />
          <stop offset="1" stopColor="#0c0f16" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.74" stopColor={A} stopOpacity="0" />
          <stop offset="1" stopColor={AB} stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id={`${id}-g`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={A} stopOpacity="0.45" />
          <stop offset="1" stopColor={A} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="100" cy="182" rx="60" ry="10" fill={`url(#${id}-g)`} />
      {children}
    </svg>
  );
}

function PowerBankArt() {
  return (
    <Frame id="pb">
      <path d="M100 52 C100 34, 124 30, 132 44 C138 54, 132 62, 124 60" fill="none" stroke="#11141b" strokeWidth="4" strokeLinecap="round" />
      <path d="M100 52 C100 34, 124 30, 132 44 C138 54, 132 62, 124 60" fill="none" stroke="#272d39" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="68" y="52" width="64" height="116" rx="13" fill="url(#pb-b)" stroke="#07090e" strokeWidth="1" />
      <rect x="68" y="52" width="64" height="116" rx="13" fill="url(#pb-r)" />
      <rect x="68" y="52" width="7" height="116" rx="13" fill="#000" opacity="0.28" />
      <rect x="88" y="58" width="22" height="6" rx="3" fill="#04060a" stroke="#3a4250" strokeWidth="0.5" />
      <rect x="88" y="86" width="22" height="2.4" rx="1.2" fill={A} opacity="0.55" />
      {[0, 1, 2, 3].map((i) => {
        const on = i < 3;
        const x = 82 + i * 12;
        return (
          <g key={i}>
            {on && <circle cx={x} cy="150" r="6" fill={AB} opacity="0.35" />}
            <circle cx={x} cy="150" r="3" fill={on ? AB : "#2a3038"} />
          </g>
        );
      })}
    </Frame>
  );
}

function InflatorArt() {
  return (
    <Frame id="in">
      <path d="M132 110 C160 110, 164 146, 142 158" fill="none" stroke="#11141b" strokeWidth="5" strokeLinecap="round" />
      <path d="M132 110 C160 110, 164 146, 142 158" fill="none" stroke="#272d39" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="68" y="56" width="64" height="100" rx="11" fill="url(#in-b)" stroke="#07090e" strokeWidth="1" />
      <rect x="68" y="56" width="64" height="100" rx="11" fill="url(#in-r)" />
      <rect x="68" y="56" width="7" height="100" rx="11" fill="#000" opacity="0.28" />
      <rect x="79" y="66" width="42" height="24" rx="4" fill="#04070b" stroke="#2a3340" strokeWidth="0.8" />
      <text x="100" y="84" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="15" fontWeight="700" fill={AB}>35</text>
      <rect x="84" y="102" width="32" height="4" rx="2" fill="#0c0f16" />
      <rect x="84" y="112" width="32" height="4" rx="2" fill="#0c0f16" />
      <circle cx="100" cy="134" r="7" fill="#11151d" stroke={A} strokeOpacity="0.5" strokeWidth="1" />
    </Frame>
  );
}

function FlashlightArt() {
  return (
    <Frame id="fl">
      <defs>
        <linearGradient id="fl-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={AB} stopOpacity="0.5" />
          <stop offset="1" stopColor={AB} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M150 100 L196 78 L196 122 Z" fill="url(#fl-beam)" />
      <rect x="40" y="88" width="98" height="26" rx="9" fill="url(#fl-b)" stroke="#07090e" strokeWidth="1" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={58 + i * 11} y1="90" x2={58 + i * 11} y2="112" stroke="#0a0d13" strokeWidth="1.4" opacity="0.5" />
      ))}
      <rect x="132" y="83" width="18" height="36" rx="6" fill="url(#fl-b)" stroke="#07090e" strokeWidth="1" />
      <ellipse cx="149" cy="101" rx="4" ry="15" fill={AB} opacity="0.75" />
      <rect x="40" y="88" width="98" height="26" rx="9" fill="url(#fl-r)" />
      <rect x="84" y="84" width="13" height="5" rx="2.5" fill={A} opacity="0.6" />
    </Frame>
  );
}

function TrackerArt() {
  return (
    <Frame id="tk">
      {[26, 38].map((r, i) => (
        <circle key={r} cx="100" cy="104" r={r} fill="none" stroke={AB} strokeWidth="1.4" opacity={0.28 - i * 0.12} />
      ))}
      <rect x="74" y="62" width="52" height="84" rx="16" fill="url(#tk-b)" stroke="#07090e" strokeWidth="1" />
      <rect x="74" y="62" width="52" height="84" rx="16" fill="url(#tk-r)" />
      <circle cx="100" cy="58" r="6" fill="none" stroke="#272d39" strokeWidth="3" />
      <circle cx="100" cy="106" r="13" fill="#0c0f16" stroke={A} strokeOpacity="0.5" strokeWidth="1.2" />
      <circle cx="100" cy="106" r="4" fill={AB} opacity="0.85" />
    </Frame>
  );
}

const BY_CATEGORY: Record<Category, FC> = {
  Power: PowerBankArt,
  Car: InflatorArt,
  Light: FlashlightArt,
  Carry: TrackerArt,
};

export function CategoryObject({ category, className = "" }: { category: Category; className?: string }) {
  const Art = BY_CATEGORY[category];
  return (
    <div className={className}>
      <Art />
    </div>
  );
}
