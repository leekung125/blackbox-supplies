import type { Article } from "@/lib/articles";

/**
 * Long-tail buyer page. Target keyword:
 *   "best power bank to take on a plane that charges a laptop"
 * Angle: the tightest legal-and-capable intersection — the biggest bank that
 * stays under the 100Wh carry-on ceiling AND pushes real USB-C PD wattage to
 * refill a laptop, not just a phone. Routes to /products/anker-prime-power-bank.
 *
 * Honesty laws: no "we tested", no invented specs/ratings. Every number is the
 * manufacturer's own rating (said as theirs) or the FAA/IATA regulatory figure.
 */
export const BEST_TSA_LEGAL_LAPTOP_POWER_BANK: Article = {
  slug: "best-tsa-legal-power-bank-that-charges-a-laptop",
  seoTitle: "TSA-Legal Power Bank That Charges a Laptop",
  seoDescription:
    "Under the 100Wh carry-on ceiling, but with enough USB-C wattage to refill a laptop and not just a phone. The narrow window that works.",
  title: "The Best Power Bank to Take on a Plane That Actually Charges a Laptop (TSA-Legal)",
  dek: "The best power bank to take on a plane that charges a laptop lives in a narrow window: under the 100Wh carry-on ceiling, but with enough USB-C wattage to refill a laptop and not just a phone. Here's the rule, the math, and the one bank that fits.",
  category: "Power & Charging",
  readMinutes: 8,
  updated: "July 2026",
  answerFirst:
    "The best power bank to take on a plane that charges a laptop is the largest one that still stays under the 100Wh carry-on limit while pushing 100W+ over USB-C Power Delivery. That window is tight: 3.6-3.7V cells cap the legal ceiling near 27,000mAh (~99Wh). Anker's Prime 27,650mAh (99.54Wh, 140W per USB-C port) is the pick that fills it — it clears security and actually refills a laptop.",
  sections: [
    {
      heading: "The rule, stated plainly: 100Wh, carry-on only, never checked",
      body: [
        "Airlines regulate power banks by watt-hours (Wh), not the milliamp-hour number on the box. The threshold is the same across the FAA, TSA, and the international IATA rules, so it applies whether you're flying domestic or overseas: a lithium power bank up to 100Wh rides in your carry-on with no approval needed. Above 100Wh (up to 160Wh) you need airline permission and are usually capped at two spares; above 160Wh it can't fly at all.",
        "Two parts of the rule catch people out. First, spare and portable batteries must travel in the cabin — a power bank in a checked bag is a violation, and it's the classic way a bank gets pulled at the gate or flagged after check-in. Second, most airlines now ask that the bank stay accessible (seat pocket or under the seat, not the overhead bin) and not charge devices during taxi, takeoff, and landing. None of that changes which bank to buy; it just means the number printed on the housing is the number security reads.",
        "So the whole question — the best power bank to take on a plane that charges a laptop — collapses to a single tension: you want the most capacity you can carry, but the 100Wh wall is hard, and a laptop needs far more power per charge than a phone. Get both right and you have exactly one narrow band of banks to shop.",
      ],
    },
    {
      heading: "The math that makes this a narrow long-tail",
      body: [
        "Watt-hours are what security cares about, and the conversion is fixed: Wh = (mAh x cell voltage) / 1000. Power-bank cells run at roughly 3.6-3.7V nominal, so the 100Wh ceiling works out to about 27,000-27,800mAh. That is the legal wall. Any bank advertised much past ~27,000mAh either uses that math to sit just under 100Wh, or it's over the line and can't fly carry-on without approval.",
        "That's why this is a genuinely tight question rather than 'buy the biggest bank.' A 20,000mAh bank is only ~72Wh — comfortably legal, but modest for a laptop. A 40,000mAh bank is ~144Wh — over the free limit and into approval-required territory. The sweet spot for someone who specifically needs to refill a laptop is the 25,000-27,650mAh band that maxes out the legal ceiling without crossing it.",
        "One more honest wrinkle: rated capacity is not usable capacity. The cells sit at ~3.7V and your laptop wants USB-C voltages, and that step-up conversion is never free — real delivered energy is roughly 60-68% of the rating. So a ~99Wh bank does not put 99Wh into your laptop; plan around a single full laptop refill plus phone top-ups, not two laptop charges.",
      ],
      table: {
        caption: "Capacity vs. the 100Wh airline ceiling (Wh figured at ~3.6-3.7V nominal; usable output is approximate)",
        columns: ["Rated capacity", "Approx. watt-hours", "Carry-on status", "Realistic laptop charging"],
        rows: [
          ["10,000mAh", "~37Wh", "Legal, far under", "Trickle only — phone bank, not a laptop bank"],
          ["20,000mAh", "~72Wh", "Legal", "~1 partial laptop top-up + phones"],
          ["25,000mAh", "~90Wh", "Legal", "Roughly one full ultrabook refill"],
          ["27,650mAh", "~99.5Wh", "Legal — at the ceiling, check the printed label", "One full laptop refill + phone, if wattage is high enough"],
          ["40,000mAh", "~144Wh", "Airline approval required, 2-spare cap", "Two laptop charges — but you may not be allowed to board with it"],
          ["Power station (200Wh+)", "200Wh+", "Cannot fly", "Many refills — grounded"],
        ],
      },
    },
    {
      heading: "Charging a phone is not charging a laptop (the wattage half)",
      body: [
        "Capacity gets you legal; wattage decides whether a laptop charges at all. A phone sips 20-30W. A laptop wants far more, and it will only pull it over USB-C Power Delivery (PD) — the standard where the bank and the laptop 'handshake' up to a higher voltage. A bank that only does 5V phone charging, or a low PD wattage, will keep a laptop alive but not meaningfully refill it while you work.",
        "The number to match is your laptop's own charger. A MacBook Air ships with a 30W brick; a 14-inch MacBook Pro wants 67-96W; a 16-inch or a gaming laptop wants up to 140W. To actually refill any of those on a flight you need a bank with a single USB-C PD port rated at or above that figure — for the broadest coverage, look for 100W+, and 140W if you carry a large 16-inch machine.",
        "The catch that trips buyers: a bank's headline wattage is the total across all ports, split when several are in use. A '250W' bank does not push 250W into your laptop — it means multiple ports adding up. What matters for a laptop is the per-port USB-C PD rating with one device plugged in. Check that number, not the big total on the front of the box.",
      ],
      list: [
        "Under 30W USB-C PD|Keeps a laptop from dying, barely refills it. Fine for a phone bank; wrong tool for this job.",
        "45-65W USB-C PD|Genuinely refills an ultrabook or MacBook Air near wall speed. The practical minimum for a 'charges a laptop' bank.",
        "100W USB-C PD|Covers almost every laptop, including most 14-inch pro machines, at close to full speed.",
        "140W USB-C PD (single port)|Covers 16-inch MacBook Pro and gaming laptops. This is the ceiling worth paying for if you carry a big machine.",
      ],
    },
    {
      heading: "How to pick the best power bank to take on a plane that charges a laptop",
      body: [
        "Put the two halves together and the shortlist is small. You want the top of the legal capacity band (25,000-27,650mAh, ~90-99Wh) paired with a single USB-C PD port of 100W or more. Very few banks sit in both circles at once, which is exactly why this is a specific buying question and not a generic 'best power bank' search.",
        "Anker's Prime Power Bank is the unit that fills the window. By Anker's rating it's 27,650mAh / 99.54Wh — deliberately engineered to sit just under the 100Wh line so it clears security — with 250W total across two USB-C ports plus USB-A, and each USB-C port rated up to 140W on its own. That 140W single-port figure is the part that matters here: it's enough to refill a 16-inch MacBook Pro, not just trickle it. A small display shows exactly what's going in and out, which is genuinely useful when you're rationing one charge across a laptop and a phone on a long-haul.",
        "Who this is for: frequent flyers and remote workers who open a laptop at the gate and on the plane, and who have been burned by a bank that revives a phone but can't touch a MacBook. Who should skip it: if you only ever charge a phone, this is overkill and overweight — a 10,000mAh bank does that at a fraction of the size and price. And if you need a real AC wall outlet, or to power devices for multiple days off-grid, no carry-on bank fits; that's a portable power station, and a station over 100Wh is grounded (it cannot fly), so it's a car-and-cabin tool, not a travel one.",
      ],
      productIds: ["anker-prime-power-bank", "anker-power-bank-20-000mah-with"],
    },
    {
      heading: "The catch — every honest tradeoff on this pick",
      body: [
        "No bank in this window is free of compromise; the physics guarantees it. Being straight about the downsides is the whole point of a page like this.",
        "First, chemistry. Power banks use standard lithium (Li-ion/LiPo) cells, which are rated for meaningfully fewer full charge cycles than the LiFePO4 cells inside a power station — hundreds versus thousands. That's the price of pocketability and it's the same for every travel bank, not a flaw unique to this one; it just means a bank is a several-year device, not a decade one.",
        "Second, scale. Roughly 99Wh sounds like a lot until a laptop asks for most of it. Expect about one full laptop refill plus a couple of phone top-ups per charge, not an all-day off-grid supply. If your travel day means charging a laptop twice with no wall outlet in between, no legal carry-on bank solves that — you'd need to cross the 100Wh line, and then you're into airline-approval territory.",
        "Third, the specifics of this unit. To hit the full 250W you need multiple ports in use at once; a single port tops out at 140W (still plenty for a laptop). The magnetic charging base/dock is sold separately — you don't need it to use the bank, but the marketing photos show it. And at ~99.5Wh it sits right at the ceiling, so buy from a listing that shows the printed Wh on the housing and trust that label over any math, because that's the figure a screener reads.",
      ],
    },
    {
      heading: "How it compares to the lighter alternative",
      body: [
        "The Prime is the answer when refilling a laptop is the actual requirement. If your laptop only needs the occasional top-up and weight matters more, a 20,000mAh bank is the lighter, cheaper, still-legal step down — it just won't fully refill a big laptop the way a ceiling-capacity bank can.",
      ],
      table: {
        caption: "The two legal carry-on options, honestly",
        columns: ["", "Anker Prime 27,650mAh", "Anker 20,000mAh (built-in cable)"],
        rows: [
          ["Watt-hours", "~99.54Wh (at the ceiling)", "~72Wh (comfortable margin)"],
          ["Carry-on legal", "Yes — check the printed label", "Yes"],
          ["Single-port USB-C PD", "Up to 140W", "Up to 87W"],
          ["Laptop charging", "One full refill of most laptops", "Partial top-up; near-full for an ultrabook"],
          ["Best for", "16-inch/pro laptops, max legal capacity", "Ultrabooks + phones, lighter bag"],
          ["Approx. price", "$129-179", "$50-70"],
          ["The catch", "Heavy, dock sold separately, at the Wh limit", "Won't fully refill a big laptop; built-in cable can't be replaced"],
        ],
      },
    },
    {
      heading: "Mistakes people make buying a laptop bank for flights",
      list: [
        "Buying by mAh alone|A 40,000mAh bank looks best on paper and can't legally board without approval. Convert to Wh first — 100Wh is the wall.",
        "Ignoring per-port wattage|A big total wattage split across ports may only give a laptop 60W. Check the single-port USB-C PD number, not the headline total.",
        "Assuming any USB-C bank charges a laptop|Without enough PD wattage it just slows the drain. Match the bank's port to your laptop's own charger rating.",
        "Packing it in a checked bag|Every portable battery must fly in the cabin. This is the single most common way a bank gets confiscated.",
        "Expecting two laptop charges|Usable output is ~60-68% of the rating; a ~99Wh bank is one laptop refill plus phones, not an off-grid day.",
        "Trusting your own Wh math over the label|Reputable banks print the Wh on the housing. That printed figure is what a screener reads — buy one that shows it.",
      ],
    },
    {
      heading: "How we researched this",
      body: [
        "This page is built from published manufacturer specifications (Anker's own capacity, watt-hour, and per-port PD ratings) and the FAA/IATA/TSA lithium-battery rules, cross-read against long-term owner feedback. We have not bench-tested these units and don't claim to — where a number matters, we've said whose rating it is. Prices are approximate and move with sales, so confirm the current listing and the printed Wh figure before you buy.",
      ],
    },
  ],
  faq: [
    {
      q: "What is the biggest power bank I can take on a plane?",
      a: "Up to 100Wh rides in carry-on with no approval. Because cells sit at ~3.6-3.7V, that ceiling is roughly 27,000-27,800mAh — so a bank like the Anker Prime at 27,650mAh / 99.54Wh is about as large as you can bring freely. From 100 to 160Wh needs airline permission (usually two spares max); over 160Wh can't fly at all.",
    },
    {
      q: "Can a TSA-legal power bank actually charge a laptop, or just a phone?",
      a: "It can charge a laptop if it has enough USB-C Power Delivery wattage. Match the bank's single-port PD rating to your laptop's charger: 45-65W for an ultrabook, 100W for most 14-inch machines, up to 140W for a 16-inch or gaming laptop. A high-capacity bank with only low-wattage phone charging will keep a laptop alive but won't meaningfully refill it.",
    },
    {
      q: "Do I have to put my power bank in my carry-on, or can it go in a checked bag?",
      a: "Carry-on only — always. Spare and portable lithium batteries are prohibited in checked luggage by the FAA, TSA, and international rules. A power bank found in a checked bag can get the bag pulled, and it's the most common reason a battery is confiscated at the airport.",
    },
    {
      q: "How do I convert my power bank's mAh to watt-hours for the airline rule?",
      a: "Wh = (mAh x cell voltage) / 1000, using ~3.6-3.7V for the cells. So 20,000mAh is about 72Wh and 27,650mAh is about 99.5Wh. Reputable banks print the Wh figure right on the housing — trust that printed number over your own math, because it's what security reads.",
    },
    {
      q: "Why does one charge not fully refill my laptop twice?",
      a: "Usable output is only about 60-68% of the rated capacity, because stepping the cells' ~3.7V up to USB-C charging voltage loses energy as heat. Plan a ~99Wh bank as one full laptop refill plus a couple of phone top-ups — not an all-day, no-outlet supply. Needing two laptop charges means crossing the 100Wh line, which requires airline approval.",
    },
  ],
  relatedGuides: ["roadside-emergency-kit"],
  heroImage: "/products/scene/anker-prime-power-bank.webp",
  sources: [
    { label: "FAA PackSafe - Batteries carried by airline passengers (lithium 100Wh/160Wh rule)", url: "https://www.faa.gov/hazmat/packsafe/lithium-batteries" },
    { label: "IATA - Lithium battery guidance for passengers", url: "https://www.iata.org/en/programs/cargo/dgr/lithium-batteries/" },
    { label: "BlackBox: The Best Power Bank for Travel (2026) - our broader travel-bank guide", url: "/guides/best-power-bank-travel" },
  ],
};
