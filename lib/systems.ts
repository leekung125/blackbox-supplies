/**
 * Systems — printable + fillable plans that keep you organized. Made by us, sold by us.
 *
 * The L3 digital-product layer (route /systems). NOT affiliate items: price is OUR exact
 * price (never a band), availability is honestly assertable (InStock), and every record carries
 * the made-by-us disclosure. Mirrors the lib/kits.ts pattern (typed interface + exported const
 * array) so the shelf scales flat to ~8 SKUs (INFORMATION_ARCHITECTURE §6.3).
 *
 * Copy source of truth: products/digital-glovebox/SALES_PAGE.md (every field annotated with its
 * §). Canon: DECISION_LOG D1–D9 — price $19 (never $24), 8 systems (never "10 sections"),
 * free sample = The Glovebox Card, refund = "30 days, any reason, keep the files."
 */

export interface SystemContent {
  /** System name, e.g. "Vehicle Record" */
  name: string;
  /** Honest page count, e.g. "1 per vehicle", "2 pages", "3 pages" */
  pages: string;
  /** What it is — one plain sentence (SALES_PAGE §3). */
  what: string;
  /** The concrete moment the owner opens this page — the D7 test, stated to the buyer (SALES_PAGE §3). */
  moment: string;
}

export interface SystemSample {
  /** Render asset id, e.g. "dg-sample-vehicle-record" */
  id: string;
  title: string;
  /** Caption shown under the render — final copy in SALES_PAGE §4. */
  caption: string;
  /** Path under /public once the spreads are rendered; may not exist yet (styled placeholder shown). */
  image: string;
}

export interface SystemFaqItem {
  q: string;
  /** Final copy in SALES_PAGE §8 — used verbatim, also feeds FAQPage JSON-LD. */
  a: string;
}

export interface System {
  /** URL slug → /systems/[slug] */
  slug: string;
  title: string;
  /** Exact <title> tag copy (SALES_PAGE §0) — brand appended by the layout template, so no brand here. */
  seoTitle: string;
  /** Exact meta description (SALES_PAGE §0). */
  seoDescription: string;
  /** Small-caps kicker over the hero (SALES_PAGE §1). */
  kicker: string;
  /** "available" renders the buy box; "in-development" renders an honest what's-coming row
   *  (no fake waitlist, no price until real). */
  status: "available" | "in-development";
  /** Exact USD price — a number we set, shown flat. Never a band, never a compare-at. */
  price: number;
  tagline: string;
  /** The verdict paragraph (hero dek — SALES_PAGE §1). */
  dek: string;
  /** The one-line promise / pull-quote (SALES_PAGE §1). */
  promise: string;
  /** Who it's for, one line (SALES_PAGE §1). */
  forWho: string;
  /** The one quiet, structural anchor line under the price (SALES_PAGE §6). */
  anchorLine: string;
  /** Honest setup cost, rendered like a read-time spec (SALES_PAGE §6). */
  setupTime: string;
  /** Plain format list, buyer-facing strings (SALES_PAGE §5). */
  formats: string[];
  /** The full public manifest — the contents ARE the pitch (SALES_PAGE §3). */
  contents: SystemContent[];
  samples: SystemSample[];
  /** The three situation cards — who this is for, in their own words (SALES_PAGE §2). */
  whoFor: { title: string; body: string }[];
  /** DecisionReceipt-pattern honest catch — min 3 (PRICING_STRATEGY §4, SALES_PAGE §7). */
  whoShouldSkip: string[];
  /** Honest-value strip (SALES_PAGE §10). */
  payingFor: string[];
  notPayingFor: string[];
  faq: SystemFaqItem[];
  /** The refund promise, verbatim + identical across all Systems + /disclosure + /terms. */
  guarantee: string;
  /** How-this-was-built candor panel (SALES_PAGE §9). */
  howBuilt: string;
  /** Free-sample slug (the risk-reversal fallback) — the Glovebox Card magnet id. */
  freeSampleSlug?: string;
  /** Free-sample display name for CTA copy. */
  freeSampleName?: string;
  /** Lemon Squeezy hosted-checkout / overlay URL. Set at the W2 account step (env-driven, D5). */
  checkoutUrl?: string;
  /** Real version + real date — printed on page and inside the files. */
  version: string;
  relatedGuides: string[];
  relatedKits: string[];
}

/** One refund promise, one string, everywhere (must match /terms + /disclosure verbatim). */
export const SYSTEM_GUARANTEE =
  "30 days, any reason, full refund — and you keep the files. Email us; we refund. No form, no argument.";

/** The made-by-us disclosure, one string, rendered by <SystemsDisclosure /> on /systems and every system page. */
export const SYSTEMS_DISCLOSURE =
  "Made by us, sold by us. Our gear picks are chosen on merit and earn us a commission only if you buy through our links. Systems are different: we build them ourselves and earn the full price — and we tell you so everywhere they appear. We will never rank gear to favor our own products, and we sell no gear.";

/** The category promise line — introduced with its job everywhere Systems appears (IA §3.2). */
export const SYSTEMS_PROMISE =
  "Printable + fillable plans that keep you organized. Made by us, sold by us.";

export const SYSTEMS: System[] = [
  {
    slug: "digital-glovebox",
    title: "The Digital Glovebox",
    seoTitle:
      "The Digital Glovebox — Car Records, Contacts & Action Plans in One Fillable PDF",
    seoDescription:
      "One fillable pack for everything about your car: vehicle record, service log, insurance contacts, the accident photo checklist, and a roadside action plan. $19 one-time. Print it or keep it on your phone.",
    kicker: "A BlackBox System · Made by us, sold by us",
    status: "available",
    price: 19,
    tagline: "Everything about your car, in one place, before you need it.",
    dek: "Every document, log, and action plan your car needs, in one fillable pack — set up in an evening. It is not a binder for the end of the world. It's a filing cabinet and an action plan for the one machine your day actually depends on: what's in it, who to call, what to do when it stops, and what to photograph if someone hits it.",
    promise:
      "Fill it out once. Stop scrambling — at the parts counter, on the phone with your insurer, and on the shoulder.",
    forWho:
      "For normal car-owning households. If your vehicle's paper life is a glovebox of receipts, an insurer app you'd have to reset the password for, and memory — this replaces all three.",
    anchorLine: "Less than a fifth of the jump starter it sits next to. A fraction of one tow.",
    setupTime:
      "one evening — about 40 minutes, with your insurance card and the driver's-door sticker in reach. The two highest-value pages take the first ten; the logs fill themselves in as you drive.",
    formats: [
      "Fillable PDF (US Letter) — type into the form fields on any computer or tablet, save, done. The master format.",
      "Phone PDF — the same content re-laid for a phone screen, saved to Files or Drive in 30 seconds. Because the breakdown happens next to your phone, not your printer.",
      "Print pack — ink-friendly light version, no dark backgrounds, made to be printed, filled by hand, and kept in the actual glovebox. Paper works where logins don't.",
      "Google Sheets — a copy of the Service History Log and Trunk Inventory (the two systems that benefit from being living spreadsheets). One click to copy into your own Drive; we keep no access.",
    ],
    contents: [
      {
        name: "Vehicle Record",
        pages: "1 per vehicle",
        what: "Every number your car has: VIN, plate, tire size and pressures, oil spec and capacity, battery group size, CCA and install date, wiper sizes, bulb sizes, key-fob battery type.",
        moment:
          "At the parts counter, when the person behind it asks “what group size?” — and at every oil change, tire shop, and online parts order after that.",
      },
      {
        name: "Contacts Card",
        pages: "1 page",
        what: "Insurance company, policy number and claims line; roadside assistance and membership number; your preferred shop; your tow preference; two emergency contacts.",
        moment:
          "On a dark shoulder, with 15% battery, when “it's in my email somewhere” is not a plan. Also: taped inside a new driver's glovebox.",
      },
      {
        name: "Service History Log",
        pages: "4 pages + Sheets",
        what: "One running table for everything done to the car: date, mileage, work, cost, shop. Maintenance, repairs, rotations, and battery tests in one place — owners keep one history or none, so we built one.",
        moment:
          "When a mechanic says “you're due for X” and you can answer with a date and a mileage. And at resale, when “full service history” adds real money.",
      },
      {
        name: "Warranty & Receipt Tracker",
        pages: "2 pages",
        what: "What's under warranty — the car, the battery, the tires, the jump starter itself — until when, and where each receipt lives (a photo checklist, so the receipt survives the wash cycle).",
        moment:
          "The day a 4-year-old tire fails at year three and the free replacement depends on a receipt you can actually produce.",
      },
      {
        name: "Trunk Inventory & Replacement Schedule",
        pages: "2 pages",
        what: "What readiness gear is in the vehicle, when the jump starter and power bank were last charged, and the expiry dates on the things that quietly expire (first-aid contents, sealant, flares).",
        moment:
          "The 60-second quarterly check that prevents the classic failure: owning the right gear and finding it dead when you need it.",
      },
      {
        name: "Seasonal Readiness Checklists",
        pages: "2 pages",
        what: "Two one-pagers — going into winter, going into summer: battery test, tires, coolant, wipers, kit swap. Deliberately light; it's a checklist, not a curriculum.",
        moment: "The first cold week of November and the first hot week of June. Twenty minutes each, twice a year.",
      },
      {
        name: "Accident Protocol + Photo Shot List",
        pages: "2 pages",
        what: "The step-by-step scene procedure, then the exact ten photos insurers ask for: wide scene from two angles, all four corners of both cars, plates, licenses and insurance cards, and the road conditions. Numbered, in order.",
        moment:
          "The five worst minutes of car ownership. Nobody improvises documentation well with shaking hands — you follow a list or you miss shots.",
      },
      {
        name: "Roadside Action Plan",
        pages: "3 pages",
        what: "The full decision tree by failure type — won't start / flat / overheating / stuck: what to check, when to jump it yourself, when to call, in what order, and where to wait. Written in the same voice as our guides.",
        moment:
          "The breakdown itself. This is the deep version of the free Glovebox Card's protocol — the Card gets you safe; this gets you moving.",
      },
    ],
    samples: [
      {
        id: "dg-sample-vehicle-record",
        title: "The Vehicle Record, filled in",
        caption:
          "The page that answers every parts-counter question. Ten minutes with your door jamb sticker and owner's manual, once — then it's just true forever.",
        image: "/systems/dg-sample-vehicle-record.png",
      },
      {
        id: "dg-sample-accident-protocol",
        title: "The Accident Protocol spread",
        caption:
          "The ten photos insurers actually ask for, in the order you take them. This page exists because nobody remembers this under stress — that's the point of it being printed.",
        image: "/systems/dg-sample-accident-protocol.png",
      },
      {
        id: "dg-sample-service-log",
        title: "The Service History Log, both formats",
        caption:
          "The same log, two ways: the printed page for the glovebox, the spreadsheet if you'd rather type. Buy it once, use whichever one you'll actually keep up.",
        image: "/systems/dg-sample-service-log.png",
      },
    ],
    whoFor: [
      {
        title: "“That's never happening again.”",
        body: "You got stranded — or came close — and spent an afternoon learning how disorganized you were: no roadside number saved, no idea what the insurer needed, a jump starter that turned out to be flat. The gear closes the hardware gap. This closes the other one.",
      },
      {
        title: "“Someone I love just started driving.”",
        body: "A new driver has a phone and no idea what to do when the car dies or someone rear-ends them at a light. The Glovebox is the knowledge transfer: the action plan, the contacts, and the accident checklist, printed and in the car before the 2 a.m. call instead of after. Fill it out together in an evening — that conversation is half the product.",
      },
      {
        title: "“My car's paperwork is chaos.”",
        body: "The insurance card in the glovebox is last year's. The tire receipt that carries the warranty is somewhere. Nobody can say when the battery went in. This is one place for the car's whole paper life — and it stays current, because logging a service takes one line.",
      },
    ],
    whoShouldSkip: [
      "You already keep a disciplined vehicle spreadsheet and your insurer's app is set up and current. You've built your own version; you don't need ours.",
      "Your car is a managed fleet or full-service lease — the fleet company already holds the records, the roadside plan, and the claims process. You'd be duplicating their job.",
      "You want the information, not the system. Everything the Glovebox teaches — what to do in a breakdown, what to photograph at a scene — is in our free guides and always will be. The $19 is for the organized, fillable, in-your-car version, not for secret knowledge.",
      "$19 is tight this month. Take the free Glovebox Card instead — genuinely. It's the contacts page and the breakdown protocol, the two pages that matter most. The rest can wait.",
    ],
    payingFor: [
      "8 systems, form-field engineered, in four formats (fillable, phone, print, Sheets)",
      "The insurer photo shot list and the failure-type decision tree — the two pages you can't improvise under stress",
      "~20 hours of structure and sourcing you won't have to do",
      "Free updates to this edition, forever",
    ],
    notPayingFor: [
      "Information you couldn't eventually assemble yourself from our free guides",
      "Legal or insurance advice",
      "A subscription, an app, or an account",
      "Anything your insurer's app already does well",
    ],
    faq: [
      {
        q: "Couldn't I just make this myself in a spreadsheet?",
        a: "You could — and if you actually will, do that; it's free. This is the version where the structure is already done: the parts-counter fields you won't think of until you're at the counter, maintenance intervals cross-checked against manufacturer schedules, the ten-photo accident list cross-checked against insurer claims guidance, and a failure-type decision tree. That took us about 20 hours to research and assemble. $19 buys the 20 hours, not the idea.",
      },
      {
        q: "Free templates are all over Pinterest and Etsy. Why pay?",
        a: "A template is a blank table. This is the table plus what goes in it — the intervals, the steps, the shot list — kept current, with free updates to this edition. And we give the template tier away ourselves: the free Glovebox Card is exactly that. If free covers you, take free; we made it for that.",
      },
      {
        q: "It's a PDF. Why would I pay for a PDF?",
        a: "Because of where and when it works. Your glovebox doesn't have wifi at an accident scene; the printed pages work anyway. Your receipts live on your phone; the fillable and Sheets versions live there too. The format is the feature — it's the version of your car's information that works when apps, logins, and signal don't.",
      },
      {
        q: "Is this a subscription in disguise?",
        a: "No. One-time $19. Yours forever, free updates to this edition, no account, no app, nothing renews. There is nothing on this site that renews.",
      },
      {
        q: "How do I know it's good before I pay?",
        a: "Three ways, all before checkout: the full table of contents is on this page (every system, with page counts — nothing hidden), three real sample pages are rendered above, and the free Glovebox Card is two of the eight systems in working, condensed form. Try the free one first if you're unsure; that's what it's for.",
      },
      {
        q: "What if I buy it and it's not for me?",
        a: "Thirty days, any reason, full refund — and you keep the files, because pretending you can “return” a PDF would be theater. Email the address on your receipt; a human refunds it. No form, no argument.",
      },
      {
        q: "Who is BlackBox, and is my card safe with a site I've never bought from?",
        a: "Your card never touches us. Checkout runs on Lemon Squeezy, a payment processor that handles the card and the taxes — we see an order, not a card number. As for us: same editorial team, same methodology, same contact address as the guides you've been reading. We put our name on this the same way we put it on our picks.",
      },
      {
        q: "My insurance app already has my policy info.",
        a: "It does — keep using it. Your insurer's app knows your policy. It doesn't know your tire-purchase date, your battery's age, what to photograph at a scene, or who you'd call first. The Glovebox is the layer around the app: everything about the car your insurer was never going to track for you.",
      },
      {
        q: "I'll set it up later.",
        a: "That's the honest risk with this product, so we designed for it: the core setup is one sitting, about 40 minutes, and the two pages that matter most take the first ten. If even that's not tonight, download the free Card — ten minutes, and the highest-value pages are in the car. Later has a way of arriving on a shoulder.",
      },
      {
        q: "$19 for a document pack is steep.",
        a: "It's a real price for real work, so here's the honest math: it's less than a fifth of the jump starter beside it in the trunk, and a fraction of one tow. If the accident shot list gets used once, it will have paid for itself many times over in claim friction alone. And if you disagree after buying, the refund is 30 days, any reason.",
      },
      {
        q: "We have two cars. Do I need two copies?",
        a: "No. The Vehicle Record and Trunk Inventory pages are per-vehicle by design — print or duplicate one per car (the Sheets version duplicates as tabs). One purchase covers your household's vehicles.",
      },
      {
        q: "Do I have to print it?",
        a: "No. The phone PDF is a first-class format, not an afterthought — most owners keep the action plan and contacts on the phone and print only the glovebox pages. We'd suggest printing the Contacts Card and Accident Protocol at minimum: paper is the only format that works with a dead phone.",
      },
    ],
    guarantee: SYSTEM_GUARANTEE,
    howBuilt:
      "Researched and assembled by the BlackBox editorial team — the same masthead behind our comparison guides. Maintenance fields were cross-checked against manufacturer service schedules; the accident shot list against published insurer claims guidance; the roadside decision tree against the same sources as our roadside guides. It contains no legal advice and isn't affiliated with any insurer — it's an organizational system, and we say exactly what's in it above.",
    freeSampleSlug: "glovebox-card",
    freeSampleName: "the free Glovebox Card",
    // Set after the Lemon Squeezy account step (human action, W2). Falls back to the env seam
    // NEXT_PUBLIC_LS_CHECKOUT_DIGITAL_GLOVEBOX read by the BuyButton when this is undefined.
    checkoutUrl: undefined,
    version: "1.0 — July 2026",
    relatedGuides: [
      "best-jump-starters-compared",
      "battery-or-alternator-how-to-tell",
      "best-dash-cams-compared",
    ],
    relatedKits: ["roadside-kit", "winter-car-kit"],
  },
];

const BY_SLUG = new Map(SYSTEMS.map((s) => [s.slug, s]));

export function getAllSystems(): System[] {
  return SYSTEMS;
}

export function getSystem(slug: string): System | undefined {
  return BY_SLUG.get(slug);
}

/** Only the shippable SKUs (buy box renders). "in-development" entries are listed but not sold. */
export function getAvailableSystems(): System[] {
  return SYSTEMS.filter((s) => s.status === "available");
}

export const SYSTEM_SLUGS = SYSTEMS.map((s) => s.slug);
