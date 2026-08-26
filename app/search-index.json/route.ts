import { getSearchIndex } from "@/lib/search-index";

/**
 * The site-search index as a STATIC JSON file.
 *
 * ⛔ It exists so the header's search box does not have to import the index BUILDER. Building
 * the index requires every product, guide and article module; importing that into a client
 * component shipped the whole content library in the JS bundle on every page. Serving the finished
 * index here means the browser downloads it ONCE, lazily, only when someone actually focuses the
 * search field - and never at all for the majority who don't.
 */
export const dynamic = "force-static";

export function GET() {
  return Response.json(getSearchIndex(), {
    headers: { "cache-control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800" },
  });
}
