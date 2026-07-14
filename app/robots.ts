import type { MetadataRoute } from "next";

/**
 * robots.txt — allow everything (minus /api) for classic crawlers, and EXPLICITLY name +
 * allow every major AI crawler so we stay eligible to be cited by ChatGPT, Perplexity,
 * Google AI Overviews, Claude, Apple Intelligence, and the shopping agents. A named allow
 * rule is the signal these bots look for; the wildcard rule alone leaves it ambiguous.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        // AI answer engines & training/search crawlers we want to be cited by.
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "anthropic-ai",
          "PerplexityBot",
          "Perplexity-User",
          "Google-Extended",
          "Applebot-Extended",
          "Amazonbot",
          "Bytespider",
          "CCBot",
          "cohere-ai",
          "Diffbot",
          "Meta-ExternalAgent",
          "Timpibot",
          "YouBot",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.blackboxsupplies.com/sitemap.xml",
  };
}
