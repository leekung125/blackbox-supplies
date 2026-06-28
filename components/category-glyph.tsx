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
    case "Power":
      // Lightning bolt.
      return (
        <svg {...common}>
          <path d="M13 2 L5 13.5 H11 L10 22 L19 9.5 H12.6 L13 2 Z" />
        </svg>
      );
    case "Car":
      // Simple car silhouette with wheels.
      return (
        <svg {...common}>
          <path d="M3 13.5 L4.8 8.6 A2 2 0 0 1 6.7 7.3 H16.3 A2 2 0 0 1 18.2 8.6 L20 13.5" />
          <path d="M2.6 13.5 H21.4 V17 H19.5 M4.5 17 H2.6 V13.5" />
          <circle cx="7" cy="17" r="1.9" />
          <circle cx="17" cy="17" r="1.9" />
        </svg>
      );
    case "Light":
      // Radiant point — light source with rays.
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.4" />
          <path d="M12 2.5 V5 M12 19 V21.5 M2.5 12 H5 M19 12 H21.5 M5.3 5.3 L7 7 M17 17 L18.7 18.7 M18.7 5.3 L17 7 M7 17 L5.3 18.7" />
        </svg>
      );
    case "Carry":
      // Luggage / item tag.
      return (
        <svg {...common}>
          <path d="M4 4.8 H11.2 A2 2 0 0 1 12.6 5.4 L19.4 12.2 A2 2 0 0 1 19.4 15 L15 19.4 A2 2 0 0 1 12.2 19.4 L5.4 12.6 A2 2 0 0 1 4.8 11.2 V4.8 Z" />
          <circle cx="8.2" cy="8.2" r="1.25" />
        </svg>
      );
  }
}
