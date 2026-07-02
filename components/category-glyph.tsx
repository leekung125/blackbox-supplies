import type { Category } from "@/lib/products";

/**
 * Clean line-art glyph per category. Stroke uses `currentColor`, so color it
 * with a text utility (e.g. `text-accent`). No third-party icon dependency.
 */
export function CategoryGlyph({
  category,
  className = "h-6 w-6",
}: {
  category: Category;
  className?: string;
}) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (category) {
    case "Jump Starters":
      // Battery with a bolt.
      return (
        <svg {...common}>
          <rect x="2.5" y="7" width="15.5" height="10" rx="2" />
          <path d="M18 10 h2.2 a1 1 0 0 1 1 1 v2 a1 1 0 0 1-1 1 H18" />
          <path d="M10.6 8.6 L7.8 12.4 H10.3 L9.4 15.4 L12.8 11.2 H10.3 Z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Tire Inflators":
      // Pressure gauge.
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 12 L15.2 8.4" />
          <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
          <path d="M12 4 V5.4 M20 12 H18.6 M12 20 V18.6 M4 12 H5.4" />
        </svg>
      );
    case "Dash Cams":
      // Camera body with lens.
      return (
        <svg {...common}>
          <rect x="3" y="8" width="12.5" height="8.5" rx="2" />
          <circle cx="9.2" cy="12.2" r="2.6" />
          <path d="M15.5 10.4 L21 8 V16.4 L15.5 14 Z" />
        </svg>
      );
    case "Power & Charging":
      // Lightning bolt.
      return (
        <svg {...common}>
          <path d="M13 2 L5 13.5 H11 L10 22 L19 9.5 H12.6 L13 2 Z" />
        </svg>
      );
    case "Roadside Safety":
      // Warning triangle.
      return (
        <svg {...common}>
          <path d="M12 3.4 L21.2 19.6 A1 1 0 0 1 20.3 21 H3.7 A1 1 0 0 1 2.8 19.6 Z" />
          <path d="M12 9.5 V13.5" />
          <circle cx="12" cy="16.6" r="0.5" fill="currentColor" stroke="none" />
        </svg>
      );
    case "Car Utility":
      // Wrench.
      return (
        <svg {...common}>
          <path d="M15.2 6.1 a3.6 3.6 0 0 0-4.9 4.4 L4.3 16.5 a1.4 1.4 0 0 0 0 2 l1.2 1.2 a1.4 1.4 0 0 0 2 0 l6-6 a3.6 3.6 0 0 0 4.4-4.9 L15.4 11 L13 8.6 Z" />
        </svg>
      );
  }
}
