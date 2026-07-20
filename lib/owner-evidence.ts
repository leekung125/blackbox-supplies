/**
 * THE OWNER EVIDENCE ENGINE — the honest information-gain layer.
 *
 * BlackBox does not run a physical test lab. Instead of faking a hands-on test, we do something the
 * broad incumbents don't bother with: systematically analyze REAL verified-buyer reviews, recall
 * notices, and owner forums for each anchor product, and publish the aggregated result — the actual
 * failure modes owners report, the real-world numbers they cite (not manufacturer specs), and how
 * long the thing really lasts. This is genuine original analysis (the "information gain" Google's
 * 2026 reviews system rewards) AND it is exactly the "moment it breaks" wedge, backed by evidence.
 *
 * HONESTY RULES (do not violate):
 *  - Everything here is drawn from real owner reviews/reports. No invented numbers.
 *  - We never claim WE tested it. The UI states "aggregated from owner reviews — not our own test."
 *  - `reviewsBasis` describes the real evidence base; `sources` are real, cited URLs.
 */
export interface OwnerEvidence {
  /** The evidence base, e.g. "45,000+ Amazon ratings, 4.7 avg + Reddit long-term threads". */
  reviewsBasis: string;
  /** Real-world figures owners actually cite (NOT spec-sheet numbers). */
  realWorldNumbers: { label: string; value: string }[];
  /** The failure modes owners genuinely report — what breaks, and roughly when. */
  failureModes: { mode: string; note: string }[];
  /** What owners consistently praise (1-2 genuine strengths). */
  praise: string[];
  /** Lifespan + most-common long-term failure, in owners' experience. */
  longevity: string;
  /** Real cited sources (owner-review pages, forums, independent long-term reviews). */
  sources: string[];
}

/**
 * Registry keyed by product id (matches the ids in data/*.json). Start with the flagship
 * comparison-guide winners — the highest-traffic money pages — then expand.
 */
export const OWNER_EVIDENCE: Record<string, OwnerEvidence> = {
  "noco-boost-gb40-1000a-ultrasafe": {
    reviewsBasis: "~100,000 Amazon ratings (Amazon's #1 automotive best-seller), ~4.7 avg, plus recurring cold-weather threads on Reddit and owner forums",
    realWorldNumbers: [
      { label: "Jumps per charge", value: "~15–20 gas starts" },
      { label: "Cold-weather limit", value: "Weakens below ~10°F" },
      { label: "Recharge cadence", value: "Top up every 1–3 mo" },
    ],
    failureModes: [
      { mode: "Weak or dead in real cold", note: "Owners report a red error light or refused boost around 0–10°F until the pack is warmed against the body or indoors first — the field limit is well short of NOCO's stated −22°F." },
      { mode: "Self-drains if left unattended", note: "Sit it in a glovebox for months without a top-up and the cell drops too low to wake; forgotten units are the most common 'won't turn on' cause." },
      { mode: "Cell swelling with age", note: "Occasional but repeated reports of the battery swelling or dropping fast under load after a couple of years — sometimes just outside the ~1-year warranty." },
    ],
    praise: ["Genuinely pocketable", "Spark-proof, reverse-polarity safe", "Starts most gas engines in mild temps"],
    longevity: "With monthly top-ups and indoor storage, many owners get 3–5 years. The usual long-term failure is the lithium cell degrading — swelling or no longer holding charge — accelerated by cold storage and letting it fully drain.",
    sources: [
      "https://www.garagejournal.com/forum/threads/bad-experience-with-noco-gb-40-in-cold-weather.381251/",
      "https://www.techgearlab.com/reviews/tools/jump-starter/noco-boost-plus-gb40",
      "https://carxplorer.com/noco-boost-gb40-review/",
    ],
  },
  "jackery-explorer-1000-v2-portable": {
    reviewsBasis: "~2,900 Amazon ratings, ~4.6 avg, plus independent blackout-simulation bench tests",
    realWorldNumbers: [
      { label: "Usable capacity", value: "~1,070Wh (near full)" },
      { label: "Recharge time", value: "~1 hr to 80%" },
      { label: "Full-fridge runtime", value: "~14–18 hrs" },
      { label: "Microwave / heater", value: "Under ~1 hr" },
    ],
    failureModes: [
      { mode: "App / Bluetooth connectivity quirks", note: "The single most common complaint — the app dropping connection or failing to pair, cited by a meaningful minority of owners." },
      { mode: "Proprietary DC8020 input", note: "The v2's 8mm input doesn't fit older Jackery panels or generic 7.9mm 12V cables, catching owners who reuse gear from an older unit." },
      { mode: "Inverter overhead surprises", note: "The AC inverter draws power just being on, so real usable runtime on small AC loads falls short of what people assume from the 1,070Wh figure." },
    ],
    praise: ["Verified ~1-hour AC recharge", "Durable LiFePO4 chemistry", "Quiet, simple operation"],
    longevity: "Built on LFP cells Jackery rates for ~4,000 cycles (a maker figure — too new for owners to confirm a decade of use). Real long-term failure signal is thin so far; the few complaints are early charging faults handled under warranty, not gradual capacity loss.",
    sources: [
      "https://www.thesolarlab.com/review/jackery-1000-v2-review",
      "https://rvoutfitting.com/jackery-explorer-1000-v2-review/",
      "https://www.androidpolice.com/jackery-explorer-1000-v2-short-review/",
    ],
  },
  "viofo-a229-plus": {
    reviewsBasis: "~390 Amazon ratings (~4.3 avg) plus a ~136-review Reddit aggregation at ~91% positive",
    realWorldNumbers: [
      { label: "Recording", value: "2K front + 2K rear @30fps" },
      { label: "Heat shutdown", value: "~183°F internal" },
      { label: "Power", value: "Supercapacitor, no battery" },
    ],
    failureModes: [
      { mode: "Finicky Wi-Fi / app", note: "The most frequently cited issue by far — the app connection dropping or being hard to pair is the recurring 'con' across owner reports." },
      { mode: "'Please format SD card' prompts", note: "Firmware nags after an update or interrupted power-down; owners fix it with a quality high-endurance card or by disabling the format-reminder timer." },
      { mode: "Weak rear footage at night", note: "Front night video is fine, but the rear struggles with oncoming-headlight glare and a tinted/dirty rear window — partly physics, not a defect." },
    ],
    praise: ["Sharp daytime dual-Sony STARVIS 2 footage", "Discreet install", "Strong value for 2K+2K"],
    longevity: "Too new for a long owner track record, but the supercapacitor (vs a lithium button cell) is the real longevity edge — it resists the heat-driven swelling that kills older dash cams. Most reported 'failures' are recoverable firmware/SD/Wi-Fi annoyances, not hardware death.",
    sources: [
      "https://redditrecs.com/dash-cam/model/viofo-a229-plus-2ch/",
      "https://dashcamtalk.com/forum/threads/a229-2ch-says-please-format-sd-card-now-and-then.51753/",
    ],
  },
  "fanttik-x8-apex-portable-tire": {
    reviewsBasis: "~1,000 verified retailer reviews at ~4.8 avg, plus independent long-term tests (CleanTechnica, Tom's Guide, Automoblog)",
    realWorldNumbers: [
      { label: "Car tires per charge", value: "~4 dead tires" },
      { label: "Inflate time", value: "~1–2 min a low tire" },
      { label: "Runtime / recharge", value: "~40 min / ~2 hrs" },
      { label: "Gauge accuracy", value: "±2 psi" },
    ],
    failureModes: [
      { mode: "Thermal cutoff on hot days", note: "Owners report it overheats and shuts off after ~2 tires in hot weather — it self-protects, but you wait for it to cool before finishing." },
      { mode: "Self-discharges in storage", note: "Left in a trunk for months it can be dead when needed, and a fully deep-discharged pack may not wake up; owners advise a monthly top-up at 60–80%." },
      { mode: "Capacity fades over 2+ years", note: "A ~2.5-year owner said the battery 'isn't what it used to be' and wouldn't rely on it for continuous heavy use." },
    ],
    praise: ["Fast, truly cordless with auto-stop preset", "Doubles as a power bank + LED/SOS light"],
    longevity: "Most owners report reliable service over 1–2+ years; the common long-term weakness is the lithium battery — capacity fades with age and it can deep-discharge to an unrecoverable state if stored empty. Keep it charged and it lasts. (Fanttik's 'up to 17 refills' is a small-tire/top-up claim — real owners get ~4 dead car tires.)",
    sources: [
      "https://cleantechnica.com/2023/07/04/long-term-review-fanttik-x8-apex-portable-air-compressor/",
      "https://www.tomsguide.com/reviews/fanttik-x8-apex-air-inflator",
      "https://www.automoblog.com/fanttik-x8-apex-review/",
    ],
  },
  "midea-duo-14-000-btu-smart": {
    reviewsBasis: "~400 Best Buy verified ratings (~3.7 avg) plus a ~77-review Reddit owner analysis at ~81% positive — a genuinely mixed record",
    realWorldNumbers: [
      { label: "Cooling speed", value: "86→72°F in ~12 min" },
      { label: "Noise", value: "~52 dB low / 63 dB high" },
      { label: "Power draw", value: "~1,269 W" },
      { label: "Size", value: "~85 lbs, ~3 ft tall" },
    ],
    failureModes: [
      { mode: "Fragile window-kit tabs", note: "Owners snap the thin plastic tabs that lock the hose adapter into the window insert, and end up taping the kit together." },
      { mode: "Leaks / drainage confusion", note: "Some report water pooling or leaks (one caused drywall damage); certain modes need manual draining despite the self-evaporation marketing." },
      { mode: "Early or mid-life cooling failure", note: "~18% cite build quality — some units died in the first week, and at least one stopped blowing cold at ~1.5 years, with a painful warranty process." },
    ],
    praise: ["Strong, fast cooling for its size", "Excellent inverter efficiency", "Quiet on low, tool-free window kit"],
    longevity: "Many owners get 2–3 years of trouble-free cooling, but it's inconsistent: a meaningful minority hit build-quality failures early (broken tabs, first-week duds) or lose cooling around ~1.5 years, and warranty support is a common frustration.",
    sources: [
      "https://www.consumeranalysis.com/guides/portable-ac/midea-duo-review/",
      "https://redditrecs.com/portable-air-conditioner/model/midea-duo-14000-btu-12000-btu-sacc-high-efficiency-inverter-map14hs1tbl/",
    ],
  },
  "shark-turboblade-bladeless-tower-fan-tf202s": {
    reviewsBasis: "~4.7 avg across retailers plus independent bench tests (Tom's Guide, Expert Reviews); no recalls",
    realWorldNumbers: [
      { label: "Noise", value: "~30 dB low / 52 dB max" },
      { label: "Power draw", value: "~4.5–51 W" },
      { label: "Height", value: "~43 in, extends ~50 in" },
    ],
    failureModes: [
      { mode: "Oscillation stops / clicking", note: "Some units click and won't oscillate — most often the 'remove after assembly' base tape was left on, but a subset are genuine failures needing Shark support." },
      { mode: "Diffuse airflow in big rooms", note: "Owners upgrading from metal-blade fans find the bladeless stream soft past a certain distance — 'no better than a standard oscillating fan' at range." },
      { mode: "High draw, no smart features", note: "Pulls ~50W at max (high for a tower fan) and, at $150–200, has no Wi-Fi/voice control some buyers expect." },
    ],
    praise: ["Pivots/twists/tilts to aim air anywhere", "Genuinely quiet on low–mid", "Sleek, easy to clean"],
    longevity: "Long-term data is still thin (the fan is fairly new), but reviewers report smooth operation over weeks of daily use and there are no recalls. The oscillation drive is the part owners most flag — though most 'won't oscillate' cases trace to leftover assembly tape, not motor failure.",
    sources: [
      "https://www.tomsguide.com/home/home-appliances/shark-turboblade-multi-directional-cooling-fan-review",
      "https://www.expertreviews.co.uk/beauty-wellness/air-treatment/shark-turboblade-fan-review",
      "https://support.sharkninja.com/article/TF200-Series-Shark-TurboBlade-Fan-What-are-some-common-issues-I-might-have",
    ],
  },
};

export function getOwnerEvidence(id: string): OwnerEvidence | undefined {
  return OWNER_EVIDENCE[id];
}
