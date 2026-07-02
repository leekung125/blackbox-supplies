import { FindPlate } from "@/components/find-plate";
import type { RareFind } from "@/lib/rare-finds";

/**
 * The find's visual: the real product photo on a clean warm tile when we have it
 * (an affiliate product's Amazon-hosted image), falling back to the designed
 * typographic plate when we don't. Product images are object-contain on a light
 * surface so a white-background shot reads as a premium product tile against the dark site.
 */
export function FindThumb({
  find,
  big = false,
  className = "",
}: {
  find: Pick<RareFind, "id" | "name" | "category" | "image">;
  big?: boolean;
  className?: string;
}) {
  if (find.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(158deg,#f7f2e8 0%,#ece2d0 58%,#e2d6c0 100%)" }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={find.image}
          alt={find.name}
          loading="lazy"
          className={`relative h-full w-full object-contain ${big ? "p-10 sm:p-14" : "p-5 sm:p-6"}`}
        />
      </div>
    );
  }
  return <FindPlate find={find} big={big} className={className} />;
}
