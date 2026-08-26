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
  /** The evidence base, e.g. "a large body of Amazon owner reviews + Reddit long-term threads". */
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
    reviewsBasis: "a very large body of Amazon owner reviews (Amazon's #1 automotive best-seller), plus recurring cold-weather threads on Reddit and owner forums",
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
    reviewsBasis: "several thousand Amazon owner reviews, plus independent blackout-simulation bench tests",
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
    reviewsBasis: "a few hundred Amazon owner reviews, plus a ~136-review Reddit aggregation at ~91% positive",
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
    reviewsBasis: "around a thousand verified retailer reviews, plus independent long-term tests (CleanTechnica, Tom's Guide, Automoblog)",
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
    reviewsBasis: "several hundred Best Buy verified reviews plus a ~77-review Reddit owner analysis at ~81% positive — a genuinely mixed record",
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
    reviewsBasis: "strong owner sentiment across retailers plus independent bench tests (Tom's Guide, Expert Reviews); no recalls",
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
  "viofo-a119-mini-2": {
    reviewsBasis: "RedditRecs aggregates 258 Reddit reports (84% positive across 208 owners); Strong positive consensus — the most-recommended budget pick on r/Dashcam.",
    realWorldNumbers: [{ label: "Resolution", value: "2K 1440p 60fps, STARVIS 2 IMX675" }, { label: "Night video", value: "Strong; owners say plates readable" }, { label: "Power", value: "Supercapacitor, no lithium battery" }, { label: "Parking mode", value: "24h, buffered/low-bitrate" }],
    failureModes: [{ mode: "App / Wi-Fi flakiness", note: "The single most common complaint is a clunky app and dropped Wi-Fi handshakes when pulling clips." }, { mode: "SD card pickiness", note: "Owners report the cam is fussy about cards and want a high-endurance U3 to avoid errors." }, { mode: "Occasional dropped clips", note: "A minority report missing or short recordings, usually traced back to a failing or incompatible card." }],
    praise: ["STARVIS 2 clarity captures plates day and night for the price", "Supercapacitor shrugs off heat; easy discreet install"],
    longevity: "Good — at least one owner reports 3+ years of daily use with no issues; supercapacitor design avoids the lithium-battery heat-death failure mode.",
    sources: ["https://redditrecs.com/dash-cam/model/viofo-a119-mini-2/", "https://www.amazon.com/VIOFO-STARVIS-Control-Parking-Supercapacitor/dp/B0C5MVB7NX"],
  },
  "rove-r2-4k": {
    reviewsBasis: "On sale since 2017 and independently tested by TechGearLab and CarXplorer. Broad, long-running positive consensus, tempered by the fact its '4K' is an 8MP sensor.",
    realWorldNumbers: [{ label: "Resolution", value: "2160p, f/1.5 aperture, 150 degree FOV" }, { label: "Night video", value: "Grainy but plates legible" }, { label: "Heat", value: "Survived 115F dash, no shutdown" }, { label: "Power", value: "Supercapacitor, not lithium" }],
    failureModes: [{ mode: "SD card format prompts / beeping", note: "The dominant complaint: cheap or Class-10-U1 cards trigger constant format prompts and beeping, so owners must use a U3 card." }, { mode: "Mediocre low-light detail", note: "Night footage is noticeably grainy and testers had to squint to read plates on unlit roads." }, { mode: "Card-brand sensitivity", note: "Recording interruptions are common and usually stem from an incompatible or corrupted microSD card." }],
    praise: ["Supercapacitor gives instant boot and reliable operation in extreme heat and cold", "Strong value — long-proven best-seller with real GPS and Wi-Fi"],
    longevity: "Good — supercapacitor design is built to last years; one owner upgraded to it from a 5-year-old cam. No widespread early-death pattern.",
    sources: ["https://www.techgearlab.com/reviews/cool-gadgets/dash-cam/rove-r2-4k", "https://carxplorer.com/rove-r2-4k-dash-cam-review/"],
  },
  "redtiger-f7n": {
    reviewsBasis: "Amazon's #1 best-selling dash-cam brand by units in 2024 (~570k buyers); variants are well reviewed across thousands of owner reports. High retail satisfaction but thin independent scrutiny, and reviewers flag marketing overclaims.",
    realWorldNumbers: [{ label: "Resolution", value: "Marketed 4K; sensor maxes at 1440p" }, { label: "Night video", value: "Weak low-light per independent test" }, { label: "Bundle", value: "Includes rear cam + SD card" }, { label: "GPS", value: "Encrypted; needs their own app" }],
    failureModes: [{ mode: "Heat-triggered reboot loop", note: "Owners report the cam gets hot to the touch and reboots repeatedly, cycling on and off until it cools." }, { mode: "'4K' overclaim", note: "Independent reviewers found the CMOS sensor tops out near 2.5K (1440p), not the advertised native 4K." }, { mode: "Average app / Wi-Fi conflicts", note: "The app is basic with infrequent updates, and its Wi-Fi can fight with in-car systems like Audi Connect." }],
    praise: ["Complete bundle (front+rear, touchscreen, card included) at a low price", "High everyday Amazon satisfaction and easy setup"],
    longevity: "Mixed/unclear — at least one owner reports 3+ years (garaged), but low forum presence means little independent long-term data exists.",
    sources: ["https://dashcamtalk.com/forum/threads/f7n-constantly-reboots.52872/", "https://jcx.life/2023/10/red-tiger-f7n-dashcam-not-4k-encrypted-gps-poor-customer-service/"],
  },
  "viofo-a139-pro": {
    reviewsBasis: "Multiple DashCamTalk threads plus Walmart/Amazon and pro reviews (TrustedReviews, BlackboxMyCar). Consensus: outstanding image quality, but a real cluster of heat/power-related reliability complaints.",
    realWorldNumbers: [{ label: "Resolution", value: "True 4K 3840x2160 30fps, STARVIS 2" }, { label: "Night video", value: "Plates readable 3-5 car lengths" }, { label: "Heat", value: "Runs hot; can thermal-shutdown" }, { label: "Power draw", value: "Needs 10W supply; 5W reboots it" }],
    failureModes: [{ mode: "Heat shutdown", note: "The high-bitrate multi-channel unit runs hot and owners report it powering itself off in hot conditions." }, { mode: "Reboot loop when underpowered", note: "An underpowered hardwire kit or 5W brick causes constant rebooting; a 10W supply is needed for stability." }, { mode: "Firmware / startup recording glitches", note: "Owners report HDR-'Auto' firmware bugs and occasional failure to start recording or freezing on boot." }],
    praise: ["Excellent, genuinely 4K day and night image quality (STARVIS 2 IMX678)", "Class-leading low-light plate legibility"],
    longevity: "Mixed — some owners report it 'always working' for the long haul, while others hit repeated faults and returned units; heat/power sensitivity is the swing factor.",
    sources: ["https://dashcamtalk.com/forum/threads/a139-pro-constant-reboot-loop.48332/", "https://www.trustedreviews.com/reviews/viofo-a139-pro-dashcam"],
  },
  "nextbase-iq-4k-smart-dash": {
    reviewsBasis: "Pro reviews (TrustedReviews, PCWorld, TechRadar, Tom's Guide) plus Best Buy owner reviews. Polarized consensus: video and smart features impress, but subscription paywall, battery drain and early-firmware bugs draw heavy criticism.",
    realWorldNumbers: [{ label: "Video", value: "4K, excellent day and night" }, { label: "Battery", value: "Internal lithium, not supercapacitor" }, { label: "Battery drain", value: "Owner reported dead battery 2nd morning" }, { label: "Subscription", value: "$7-10/mo for live view/cloud" }],
    failureModes: [{ mode: "Parasitic battery drain", note: "Parking mode can flatten the car's 12V battery overnight, with owners reporting a dead battery within days and low-voltage cutoff not working reliably." }, { mode: "Lithium-battery heat failure", note: "Its internal lithium battery (vs a supercapacitor) is a real overheat/failure risk in hot climates like Arizona or Texas." }, { mode: "Connectivity + paywall friction", note: "Frequent 'Connection Failed' Wi-Fi/Bluetooth errors, and clips aren't viewable in-app without pulling the card unless you pay for a subscription." }],
    praise: ["Genuinely excellent 4K video quality day and night", "Powerful smart features — radar parking alerts, Witness Mode live-share, Guardian geofencing"],
    longevity: "Concerning — internal lithium-battery failures and early reliability problems reported (some resolved by Sept-2024 firmware); the battery is a long-term heat liability supercapacitor rivals avoid.",
    sources: ["https://www.pcworld.com/article/2107428/nextbase-iq-4k-dash-cam-review.html", "https://www.truckingway.com/nextbase-dash-cam-review/"],
  },
  "garmin-dash-cam-mini-2": {
    reviewsBasis: "Thousands of Amazon and Best Buy ratings, generally positive on size and daytime video, plus recurring overheating threads on DashCamTalk. Consensus: excellent discreet daytime cam whose recurring weak spot is heat/parking-mode reliability.",
    realWorldNumbers: [{ label: "Resolution", value: "1080p 30fps HDR, 140 degree FOV" }, { label: "Size", value: "Car-key sized, very discreet" }, { label: "Overheat threshold", value: "Froze at ~85F cabin (parking)" }, { label: "Recording gap", value: "One owner lost entire crash trip" }],
    failureModes: [{ mode: "Overheating lock-up in parking mode", note: "Owners report it going red-hot and freezing (needing a power-cable pull), a problem persisting even on firmware 7.50 and in moderate heat." }, { mode: "Missing/gap recordings", note: "One owner found an entire trip (including a rollover) missing from the card despite footage before and after." }, { mode: "App instability", note: "Owners cite occasional freezing, frequent restarts, disabled voice control and eventual phone-connection failures." }],
    praise: ["Extremely small and discreet — mounts nearly invisibly", "Strong, clean daytime 1080p and simple Garmin app/cloud clips"],
    longevity: "Mixed — overheating has been a known trait since launch; many run fine for months, but heat-driven lock-ups and rare recording gaps undercut trust for hot-climate/parking-mode use.",
    sources: ["https://dashcamtalk.com/forum/threads/garmin-dash-cam-mini-failed-me-overheating.44883/", "https://www.techgearlab.com/reviews/cool-gadgets/dash-cam/garmin-mini-2"],
  },
  "astroai-cordless-tire-inflator-160": {
    reviewsBasis: "Thousands of Amazon verified reviews plus Home Depot reviews and independent review sites; own 20V rechargeable battery included",
    realWorldNumbers: [{ label: "Standard tire fill", value: "about 4 minutes" }, { label: "5 tires topped 10-15 psi", value: "left 3/4 charge" }, { label: "Continuous-run rating", value: "up to 20 minutes" }, { label: "Max pressure", value: "160 psi (rated)" }],
    failureModes: [{ mode: "Thermal cutoff on high-pressure use", note: "One owner inflating an e-bike tire to 45 psi reported it got too hot to touch and shut down within a minute." }, { mode: "Limited battery for full inflations", note: "Handles top-offs well but capacity is strained when inflating several near-flat tires from scratch." }, { mode: "Heat-related battery wear", note: "AstroAI itself advises cooling between uses because overheating can shorten battery lifespan." }],
    praise: ["Fast top-offs and holds charge across multiple uses", "Digital preset gauge with auto shut-off and 12V backup adapter"],
    longevity: "Adequate for periodic top-offs; heat during extended or high-pressure runs is the main factor cited as reducing battery life over time.",
    sources: ["https://www.amazon.com/AstroAI-Cordless-Compressor-Rechargeable-Motorcycles/product-reviews/B0948WY5YX", "https://www.homedepot.com/p/reviews/AstroAI-Cordless-160-PSI-20-volt-Li-ion-Air-Inflator/337270563/1"],
  },
  "dewalt-20v-max-corded-cordless": {
    reviewsBasis: "Amazon and Home Depot verified reviews plus ToolGuyd hands-on; sold bare tool, runs on 20V MAX platform batteries or corded 12V",
    realWorldNumbers: [{ label: "SUV all four wheels", value: "under 2 minutes" }, { label: "Single tire to 35 psi", value: "about 2 minutes" }, { label: "Gauge accuracy", value: "roughly +/-0.5 psi" }, { label: "Battery", value: "not included, platform pack" }],
    failureModes: [{ mode: "Sensor/PCB faults brick the unit", note: "ErS, Er5 and OP error codes signal a pressure-sensor or board fault that DeWalt does not make user-serviceable." }, { mode: "LoP low-power lockout", note: "Owners report persistent LoP errors that stop it running on both 12V and even fully charged 20V batteries." }, { mode: "Heavy battery drain", note: "Reviewers note it goes through 20V packs quickly, similar to a DeWalt leaf blower." }],
    praise: ["Digital gauge measured accurate against calibrated references", "Corded-and-cordless flexibility and quieter than the Milwaukee M12"],
    longevity: "Generally durable but some units fail after roughly two years / about 30 uses with error codes; the sensor board is not a user-replaceable part.",
    sources: ["https://toolguyd.com/dewalt-cordless-inflator-review-dcc020ib/", "https://www.homedepot.com/p/reviews/DEWALT-20V-MAX-Cordless-Electric-Portable-Inflator-Tool-Only-DCC020IB/305709688/1"],
  },
  "milwaukee-m12-compact-inflator-2475": {
    reviewsBasis: "Pro Tool Reviews and Garage Journal hands-on plus Home Depot verified reviews; sold bare tool, runs on M12 platform batteries",
    realWorldNumbers: [{ label: "Car tire 28-35 psi", value: "under 60 seconds" }, { label: "LT truck 30-45 psi", value: "under 4 minutes" }, { label: "Pressure accuracy", value: "about +/-3%" }, { label: "Duty cycle", value: "50 percent (overheats)" }],
    failureModes: [{ mode: "Thermal shutdown on big/high-pressure tires", note: "Testing a Load Range D tire toward 80 psi, it overheated and shut down at only 56 psi." }, { mode: "Fast battery drain under load", note: "Small 1.5Ah packs are drained very quickly during high-pressure inflation." }, { mode: "Ergonomics and noise", note: "Some owners report awkward battery removal and that the unit runs loud." }],
    praise: ["Very fast and accurate on passenger-car top-offs", "Compact, one-handed, with reliable auto shut-off"],
    longevity: "Well-regarded for passenger-car duty; the 50% duty cycle makes it unsuitable for large truck/off-road tires rather than a durability defect.",
    sources: ["https://www.protoolreviews.com/milwaukee-m12-inflator-up-to-120-psi/", "https://www.homedepot.com/p/reviews/Milwaukee-M12-Cordless-Electric-Portable-Inflator-Tool-Only-2475-20/304768834/4"],
  },
  "hoto-portable-tire-inflator-pro": {
    reviewsBasis: "Amazon and Best Buy verified reviews plus Bike Perfect hands-on; built-in 7500mAh battery",
    realWorldNumbers: [{ label: "Manufacturer claim", value: "15 tires per charge" }, { label: "Owner reports", value: "often 2-4 tires realistically" }, { label: "Gauge reads", value: "1-2 psi below stick" }, { label: "Max pressure", value: "120 psi" }],
    failureModes: [{ mode: "Battery self-discharge / poor charge holding", note: "Owners report it loses charge over about a month and drains fast, especially in cold, some dying after one tire." }, { mode: "Gauge reads low", note: "The live readout runs one to two psi under a reference stick gauge." }, { mode: "Short hose", note: "The very short hose makes attaching to valves awkward and the display is hard to read at night." }],
    praise: ["Sleek, compact, premium-feeling design", "Precise enough for exact bike/cyclocross pressures and easy top-offs"],
    longevity: "Mixed; several owners report noticeable battery degradation or charge-holding problems within about a month, while others get long trouble-free use.",
    sources: ["https://www.amazon.com/HOTO-Inflator-Portable-Compressor-Motorcycle/dp/B0CQ1RCJV7", "https://www.bikeperfect.com/reviews/hoto-portable-electric-air-compressor-review"],
  },
  "astroai-l7-compact-cordless-tire": {
    reviewsBasis: "Amazon and Walmart verified reviews plus multiple hands-on review sites; built-in battery, 150 psi mini",
    realWorldNumbers: [{ label: "215/55R17 28-35 psi", value: "1 min 52 sec" }, { label: "One tire 32-40 psi", value: "about 8 minutes reported" }, { label: "After one tire", value: "battery nearly depleted" }, { label: "Max pressure", value: "150 psi" }],
    failureModes: [{ mode: "Small battery limits multi-tire use", note: "An owner reported the battery was nearly dead after a single tire, making all four hard on one charge." }, { mode: "Slow on larger inflations", note: "Fine for quick top-offs but sluggish when adding many psi to a bigger tire." }, { mode: "Heat on extended use", note: "AstroAI advises letting it cool after extended use as overheating can shorten battery life." }],
    praise: ["Genuinely fast on a single top-off for its pocket size", "Dual-value digital display, auto shut-off and LED light"],
    longevity: "Good for periodic single-tire top-offs; not built for inflating a full set in one session, and heat is the cited wear factor.",
    sources: ["https://www.amazon.com/AstroAI-L7-Inflator-Compressor-Motorcycles/dp/B0CS3B7MD8", "https://carxplorer.com/astroai-l7-review/"],
  },
  "epauto-12v-dc-portable-air": {
    reviewsBasis: "Tens of thousands of Amazon verified reviews plus AutoGuide hands-on; corded 12V cigarette-lighter unit, no battery",
    realWorldNumbers: [{ label: "Max working pressure", value: "70 psi" }, { label: "Output", value: "120W, about 1.06 CFM" }, { label: "Duty cycle", value: "10 minutes, cutoff 167F" }, { label: "Power cord", value: "9 feet (bare minimum)" }],
    failureModes: [{ mode: "Overheating / short duty cycle", note: "The 10-minute duty cycle and 167F thermal cutoff make it unsuitable for large or truck tires." }, { mode: "Overshoots set pressure", note: "Owners note it can keep pumping and stop about half a psi past the preset target." }, { mode: "DOA/defective units and light-duty build", note: "A minority arrive non-functional and it is explicitly emergency-grade, not made for daily use." }],
    praise: ["Accurate built-in digital gauge that reads instantly on connection", "Corded design means no battery to charge or degrade, and strong value for standard car tires"],
    longevity: "Emergency/occasional-use grade; reviewers say it likely will not hold up to daily use, and the 9ft cord plus short hose limits reach.",
    sources: ["https://www.autoguide.com/auto/products/product-tests/epauto-12v-dc-portable-air-compressor-pump-review-44610364", "https://www.amazon.com/EPAuto-Portable-Compressor-Digital-Inflator/product-reviews/B01L9WSTEG"],
  },
  "dreo-42-inch-bladeless-tower-fan": {
    reviewsBasis: "Several thousand Amazon owner reviews, plus Walmart buyer reviews and third-party review sites; no RTINGS lab test exists for this model",
    realWorldNumbers: [{ label: "Noise floor", value: "20dB claimed (whistles at max)" }, { label: "Air velocity", value: "28 ft/s (marketing spec)" }, { label: "Controls", value: "120 degree oscillation, 12 speeds" }],
    failureModes: [{ mode: "High-speed whistle", note: "Owners report a low-pitched whine or whistle at top speed that runs louder than the advertised 20dB figure." }, { mode: "Rattle/ticking out of box", note: "Some buyers received units that rattled or ticked from day one, and one reported both replacement units did the same with unhelpful support." }, { mode: "Remote and app quirks", note: "The LED remote is hard to read in low light and owners note occasional app/Bluetooth connectivity glitches." }],
    praise: ["Genuinely quiet and smooth on low and medium speeds", "Strong airflow that pushes cool air across a whole room, and assembles in under 10 minutes"],
    longevity: "Relatively new model with limited long-term data; the large majority report no durability issues (under ~5% cite problems), but multi-year reliability is unproven.",
    sources: ["https://www.amazon.com/Dreo-Oscillating-Bladeless-Bedroom-Standing/dp/B09M8PMW26", "https://www.walmart.com/reviews/product/226185493"],
  },
  "dyson-purifier-cool-tp07-bladeless-tower": {
    reviewsBasis: "Around 1,750 owner reviews on Dyson.com and thousands more across Amazon and Best Buy, plus RTINGS, HouseFresh lab tests and Reddit owner threads",
    realWorldNumbers: [{ label: "Noise (HouseFresh measured)", value: "35.5 dB low, 54.4 dB max" }, { label: "Power (HouseFresh measured)", value: "3.5W low, 28.9W max" }, { label: "Air clearing", value: "728 cu ft in 62 min" }, { label: "Annual running cost", value: "~$124/yr incl $80 filter" }],
    failureModes: [{ mode: "Bearing squeak / oscillation click", note: "Owners report squeaky bearings developing within months and a known oscillation clicking as the gear mechanism wears, especially on units run 24/7." }, { mode: "Loud for the airflow", note: "Multiple Reddit owners call it 'stupid loud on even medium speeds' with low CFM, making it a weak pure fan for the price." }, { mode: "Cost and software friction", note: "Replacement filters are expensive, the app/software draws complaints, and repair-or-replace turnaround can take about a month." }],
    praise: ["When healthy it delivers a smooth, even rush of air with no motor whine or rattle", "Genuinely purifies with real-time air-quality monitoring and a sleek, well-built design"],
    longevity: "Mixed: some units develop bearing noise within months of heavy use (motor covered under the 2-year warranty), while other owners run theirs, even refurbished, trouble-free for years.",
    sources: ["https://housefresh.com/dyson-purifier-cool-tp07-review/", "https://www.rtings.com/air-purifier/reviews/dyson/purifier-cool-tp07"],
  },
  "dreo-cruiser-pro-t1-oscillating-tower": {
    reviewsBasis: "20,000+ Amazon owner reviews, plus Forbes and BestReviews hands-on decibel testing (no RTINGS review)",
    realWorldNumbers: [{ label: "Noise (Forbes/BestReviews measured)", value: "41 dB speed 2, 52 dB max" }, { label: "Power draw", value: "45 watts rated" }, { label: "Reach", value: "Airflow felt to ~29.5 ft" }],
    failureModes: [{ mode: "Failure after 1-2 years", note: "A subset of owners report the fan simply stopping or the oscillation failing after one to two years of use." }, { mode: "Base wobble / instability", note: "Testers note a slightly unstable base with a brief wobble, so it wants a hard floor rather than carpet." }, { mode: "Remote and oscillation hitches", note: "Some owners cite remote-control sensitivity problems and minor hitches in the oscillation motion." }],
    praise: ["Quiet and smooth with strong air output that punches above its price", "Trim, compact design that pairs well with AC during extreme heat"],
    longevity: "Most owners report years of reliable service, but a meaningful minority see the motor or oscillation quit around the 1-2 year mark.",
    sources: ["https://bestreviews.com/home/fans/dreo-cruiser-pro-t1-tower-fan", "https://www.forbes.com/sites/forbes-personal-shopper/2023/08/25/dreo-cruiser-pro-t1-tower-fan-review/"],
  },
  "shark-flexbreeze-pro-mist-fan-fa302": {
    reviewsBasis: "Hundreds of verified-buyer reviews across Amazon, Best Buy and Walmart, plus independent tester reviews (TechRadar); product launched 2025.",
    realWorldNumbers: [{ label: "Noise range (3 ft)", value: "~40 dB low to 62 dB high" }, { label: "Idle noise, speed 1", value: "32.4 dB, near-silent" }, { label: "Battery, low no-mist", value: "up to 24 hours" }, { label: "Battery, full mist+oscillate", value: "roughly 1.5 hours" }],
    failureModes: [{ mode: "Misting pump defects and leaks", note: "Early units had pump defects Shark acknowledged, and tanks tend to leak water onto the patio." }, { mode: "Battery collapses when misting", note: "Runtime drops from the advertised 24 hours to about 1.5 hours once mist and oscillation are running." }, { mode: "Underwhelming cooling and slow charge", note: "Some owners say it doesn't drop room temperature as advertised even with ice, and recharging is slow." }],
    praise: ["Genuinely quiet on low speed, quiet enough to sleep next to.", "Versatile pedestal-to-tabletop, indoor/outdoor, cordless design."],
    longevity: "Too new (2025 release) for long-term data; early pump reliability is the main durability question so far.",
    sources: ["https://www.bestbuy.com/site/reviews/shark-flexbreeze-pro-mist-indoor-outdoor-fan/6613575", "https://www.techradar.com/home/small-appliances/shark-flexbreeze-fan-review"],
  },
  "lasko-wind-curve-2551-42-inch": {
    reviewsBasis: "A 13+ year best-seller with tens of thousands of Amazon, Walmart and Best Buy buyer reviews and multiple tested reviews (Top Ten Reviews, Bob Vila).",
    realWorldNumbers: [{ label: "Measured noise (3 ft)", value: "53.9 dB, quiet-office level" }, { label: "Timer range", value: "30 min to 7.5 hours" }, { label: "Owner-reported lifespan", value: "often 5 to 7 years" }],
    failureModes: [{ mode: "Develops a rattle over time", note: "Owners report an irritating rattle that is most noticeable on the lowest speed at night." }, { mode: "Burning smell or motor failure", note: "A minority report a burning-plastic smell or motor failure, occasionally within the first weeks." }, { mode: "Onboard control panel buttons fail", note: "The unit's control-panel buttons can stop working, forcing owners to rely on the remote." }],
    praise: ["Wide base makes it stable and it doesn't wobble.", "Cheap, long-lasting and effective for small-to-medium rooms."],
    longevity: "Strong for a budget fan; many owners report 5 to 7 years of near-continuous use.",
    sources: ["https://www.toptenreviews.com/tower-fans-lasko-wind-curve-review", "https://www.bobvila.com/articles/lasko-wind-curve-review/"],
  },
  "bluetti-ac180-portable-power-station": {
    reviewsBasis: "Independent lab tests (StorageReview, OutdoorGearLab), the Bluetti owner community forum, and Amazon verified reviews.",
    realWorldNumbers: [{ label: "Real usable capacity", value: "~1030Wh of 1152Wh rated" }, { label: "Round-trip efficiency", value: "roughly 80-82%" }, { label: "Recharge to full (AC turbo)", value: "under 2 hours" }, { label: "Mini-fridge runtime", value: "approximately 20 hours" }],
    failureModes: [{ mode: "Cooling fan whine on light loads", note: "The internal fans ramp loud and whine even under small loads, a complaint owners raised for over a year." }, { mode: "Fans cycle at idle / full charge", note: "Some owners report the fans kicking on every 5 to 10 minutes even when already at 100% charge." }, { mode: "Weak app and connectivity", note: "The Bluetti app's WiFi/Bluetooth is less reliable than rivals and units can need manual fault resets." }],
    praise: ["LiFePO4 cells rated 3,500+ cycles with a 5-year warranty.", "Fast sub-2-hour recharge and 20ms UPS switchover for outages."],
    longevity: "LiFePO4 chemistry rated 3,500+ cycles (years of use); fan-noise behavior has been partly addressed via firmware updates.",
    sources: ["https://www.storagereview.com/review/bluetti-ac180-portable-power-station-review", "https://www.outdoorgearlab.com/reviews/camping-and-hiking/power-station/bluetti-ac180"],
  },
  "ecoflow-river-2-pro-portable": {
    reviewsBasis: "Thousands of Amazon verified-buyer reviews, plus RV/CPAP owner-pattern aggregation and independent tests (OutdoorGearLab, RVoutfitting)",
    realWorldNumbers: [{ label: "Full recharge (wall)", value: "~70 minutes 0-100%" }, { label: "Inverter efficiency", value: "~88-92%, usable under 768Wh" }, { label: "60W CPAP runtime", value: "~10+ hrs, a full night" }, { label: "175W mixed load", value: "4.2 hrs to 50%" }],
    failureModes: [{ mode: "Standby self-drain", note: "Owners report noticeable self-discharge in storage when wireless/app features are left on, so it is not reliable for charge-and-forget backup." }, { mode: "App/charging glitches", note: "Bluetooth/app connection drops and solar-charging quirks (odd behavior near full, adapter mismatches) are recurring in owner reports." }, { mode: "Heat shutdowns and occasional AC defects", note: "A minority of units show AC-charge faults or overload lockups, and hot enclosed storage (truck beds, summer cars) can trigger thermal shutdowns." }],
    praise: ["Fast ~1-hour AC recharge is the single most-praised feature", "Runs real devices reliably (fridge, CPAP, coffee maker) and stays portable at ~17 lb"],
    longevity: "LiFePO4 rated 3,000+ cycles to 80% (~10 yrs light use); chemistry suits repeated cycling, but no multi-year owner degradation data confirms the claim yet.",
    sources: ["https://rvoutfitting.com/ef-ecoflow-river-2-pro-review/", "https://www.outdoorgearlab.com/reviews/camping-and-hiking/power-station/ecoflow-river-2-pro"],
  },
  "anker-solix-c300-portable-power": {
    reviewsBasis: "~1,750+ Amazon verified-buyer reviews, plus independent reviews (Trusted Reviews, Battery Skills) and Anker community troubleshooting threads",
    realWorldNumbers: [{ label: "Rated capacity", value: "288Wh LiFePO4" }, { label: "Recharge to 80%", value: "~50 min at 140W" }, { label: "Travel CPAP (30-60W)", value: "~4-5 hours runtime" }, { label: "60Wh laptop charges", value: "~4.8 full charges" }],
    failureModes: [{ mode: "Fan cycling and heat under load", note: "Despite the marketed 25dB whisper-quiet rating, owners report the fan kicking in audibly during 140W fast-charge and heavy AC load, with the unit running hot near full charge because charging does not taper." }, { mode: "App/Bluetooth connectivity drops", note: "Owners frequently report trouble pairing or staying connected to the Anker app, needing restart, Bluetooth toggle, or re-pairing." }, { mode: "Auto-shutoff and isolated charge faults", note: "The power-saving mode switches off with low-draw devices unless low-current mode is enabled, and at least one owner reports a unit that will not accept charge past 25%." }],
    praise: ["Strong value with genuine LiFePO4 longevity and fast 140W recharge", "Compact and travel-friendly (~15% smaller than similar-capacity rivals)"],
    longevity: "Claimed 3,000 cycles to 80% (~10 yr); one reviewer saw no capacity drop after rigorous cycling, but there is no multi-year owner data to confirm it yet.",
    sources: ["https://www.trustedreviews.com/reviews/anker-solix-c300", "https://www.batteryskills.com/anker-solix-c300-lifepo4-review/"],
  },
  "anker-prime-power-bank": {
    reviewsBasis: "Multiple independent bench tests (Android Central, Macworld, Gadgetoid, Consumer Reports) plus Best Buy and Amazon verified-buyer reviews",
    realWorldNumbers: [{ label: "Rated capacity", value: "99.56Wh, TSA carry-on legal" }, { label: "Weight", value: "~659g, heavy for pocket" }, { label: "iPhone 15 Pro", value: "full in ~1h40m, 85% left" }, { label: "16-inch MacBook Pro", value: "to 50% in ~30 min" }],
    failureModes: [{ mode: "Heat during high-power charging", note: "The pack becomes very warm-to-hot at 200W+ input or output, though the onboard gauge reports it stays within safe limits." }, { mode: "Heavy and bulky", note: "At ~1.45 lb it is far too large and heavy for a pocket, a common owner complaint for an everyday carry charger." }, { mode: "Usable capacity below rated and fast drain", note: "Real delivered energy is roughly 85% of the rated ~99.5Wh after conversion loss, and it empties in under ~20 minutes when pushed near its 250W ceiling." }],
    praise: ["Premium build with a genuinely useful real-time per-port power display", "Charges MacBooks at full laptop speed via 140W USB-C, with a helpful custom-profile app"],
    longevity: "Li-polymer cells rated ~500 cycles to 80% (well short of LiFePO4 stations); one tracked review saw ~5% capacity loss after 3.5 months, plus typical ~2-3%/month self-discharge when idle.",
    sources: ["https://www.androidcentral.com/accessories/anker-prime-27650mah-250w-power-bank-review", "https://www.macworld.com/article/2345205/anker-prime-27650mah-power-bank-250w-review.html"],
  },
  "whynter-nex-arc-1230wn-14-000": {
    reviewsBasis: "~940+ Amazon owner reviews, plus Reddit owner threads and independent lab tests (TechGearLab, RTINGS)",
    realWorldNumbers: [{ label: "Cooling (tested)", value: "11.9°F drop in 60 min" }, { label: "SACC vs box BTU", value: "12,000 SACC / 14,000 ASHRAE" }, { label: "Power draw (tested)", value: "~1,240-1,290W at full" }, { label: "Noise (tested at 4ft)", value: "58.4 dBA vs 42.5 claim" }],
    failureModes: [{ mode: "Window-kit fit", note: "The ~28-inch extension panel is too wide for common windows and often must be cut down to seal properly." }, { mode: "Drainage / condensate leak", note: "Owners report water leaking from the bottom when the unit is moved, as the self-evaporation system can overflow in humid conditions." }, { mode: "Louder than advertised", note: "Independent testing measured 58.4 dBA at four feet, well above the 42.5 dB spec, so it is not as quiet as the box claims." }],
    praise: ["Superior cooling power that out-cooled every other portable unit in independent testing", "Inverter dual-hose design runs efficiently and quietly idles rather than cycling hard"],
    longevity: "Thin long-term data: testers reported no durability findings; warranty is 1-year parts plus 3-year compressor; a few owner reports flag long-term reliability and warranty hassle.",
    sources: ["https://www.techgearlab.com/reviews/electronics/portable-air-conditioner/whynter-arc-1230wn", "https://www.rtings.com/air-conditioner/reviews/whynter/nex-arc-1230wn", "https://redditrecs.com/portable-air-conditioner/model/whynter-arc-1230wn/", "https://portableacreviews.com/portable-air-conditioners/review/whynter-arc-1230wn/"],
  },
  "lg-lp1419ivsm-dual-inverter-14000-btu": {
    reviewsBasis: "Aggregated from ~168 verified Best Buy buyers, plus Home Depot/Abt owner reviews and independent lab tests (ConsumerAnalysis, Rtings); a former Wirecutter pick.",
    realWorldNumbers: [{ label: "Cooling speed (150 sq ft)", value: "90°F to 75°F in ~30 min" }, { label: "Measured noise (high)", value: "58-62 dB (marketed 44 dB)" }, { label: "Power draw (max)", value: "1370 watts" }, { label: "SACC vs ASHRAE rating", value: "10,000 SACC / 14,000 ASHRAE" }],
    failureModes: [{ mode: "Water leakage in humid climates", note: "Roughly 15% of owners report the self-evaporating system overflowing in high humidity or when the drain pan clogs or the unit sits unlevel, spilling water onto the floor." }, { mode: "Louder than advertised", note: "Owners and testers measure 58-62 dB at full cooling versus the ~44 dB marketing figure, exceeding the claim by 7-11 dB." }, { mode: "Early compressor/electronic failure", note: "About 10% of units are reported to suffer compressor or electronic failure within the first two years, painful against LG's 1-year parts-and-labor warranty." }],
    praise: ["Best-in-class energy efficiency (SACC/watt ratio ~7.3), the most efficient portable unit in several test roundups", "Strong cooling and dehumidification with notably quiet operation at low fan speed compared to rival portables"],
    longevity: "Mixed: build quality rated good and many owners run it for years, but ~10% report compressor/electronic failure inside two years and the warranty is only 1 year.",
    sources: ["https://www.consumeranalysis.com/guides/portable-ac/lg-lp1419ivsm-review/", "https://www.rtings.com/air-conditioner/reviews/lg/dual-inverter-lp1419ivsm", "https://www.bestbuy.com/site/reviews/lg-14-000-btu-smart-portble-air-conditioner-white/6354675", "https://www.justanswer.com/hvac/h5fkv-lg-lp1419ivsm-water-constantly-coming-floor-when.html"],
  },
  "whynter-arc-14s-14000-btu-dual-hose": {
    reviewsBasis: "~3,891 Amazon owner reviews, plus Best Buy, RTINGS/independent lab tests and Reddit threads",
    realWorldNumbers: [{ label: "Real capacity (SACC vs rated)", value: "9,500 SACC vs 14,000 ASHRAE" }, { label: "Measured noise (max)", value: "75 dBA (claim: 51)" }, { label: "Power draw", value: "~1,300 watts at max" }, { label: "Cooling speed", value: "~2-3 hrs per room" }],
    failureModes: [{ mode: "Window-kit fit and leaks", note: "The included window bracket and weatherstrip are thin and leave gaps, so hot outside air leaks back in unless owners add aftermarket foam or seals." }, { mode: "Noise far above the claim", note: "Independent testing measured up to 75 dBA versus the ~51 dBA low-speed spec, and owners repeatedly call it too loud for a bedroom." }, { mode: "Cooling degradation / fan wear over years", note: "Some owners report the compressor running but barely cooling around the 2-year mark, and fan bearings starting to grind after several years of use." }],
    praise: ["Genuinely strong cooling on the hottest days; one owner held a 1,300 sq ft house near 70-71°F during 108°F heat", "Dual-hose design cools efficiently and many units run as reliable long-lived workhorses"],
    longevity: "An old, long-running model with a real track record: many owners get 5+ years (one Reddit owner reports 10+ years) though reliability hinges on routine coil/filter maintenance, and a minority see cooling fade or fan grinding within a few years.",
    sources: ["https://www.consumeranalysis.com/guides/portable-ac/whynter-arc-14s-review/", "https://www.yourbestdigs.com/reviews/whynter-portable-ac/", "https://redditrecs.com/portable-air-conditioner/model/whynter-arc-14s/", "https://www.rtings.com/air-conditioner/reviews/whynter/arc-14s"],
  },
  "delonghi-pinguino-pacex390lvyn-14000-btu": {
    reviewsBasis: "Aggregated from a Reviewed.com hands-on test (180 sq ft room), redditrecs-collected owner reports (~50% positive sentiment), and DeLonghi/JustAnswer support threads; no single verified-buyer star count was reliably confirmed.",
    realWorldNumbers: [{ label: "BTU vs SACC rating", value: "14,000 ASHRAE / ~8,000 SACC" }, { label: "Temp drop (test)", value: "~10°F in under an hour" }, { label: "Noise (rating)", value: "~50 dB claimed; no independent dB" }, { label: "Weight", value: "~83 lbs; hard on stairs" }],
    failureModes: [{ mode: "Window kit fit and air leak-back", note: "The wide round exhaust fitting and imperfect seal nets leave gaps at the sill, letting hot air leak back in on high-lip windows." }, { mode: "Compressor stays audible ('quiet' overstated)", note: "Quiet mode muffles the fan but the compressor remains clearly audible, and owners describe the unit as noisy and power-hungry despite the Arctic Whisper name." }, { mode: "Cooling loss / compressor failure over time", note: "Pinguino-line owners report units running the fan but no longer cooling, sometimes after a winter of storage or within a year, pointing to compressor or refrigerant issues." }],
    praise: ["Cools fast and effectively, dropping a small room ~10°F within the first 10-15 minutes, with an attractive design and easy setup.", "Backed by a 2-year warranty, above the industry-standard 1 year."],
    longevity: "Mixed: one Reddit owner reports reliable cooling into a third year, but the Pinguino line has documented reports of compressors failing to cool after roughly a year or after off-season storage.",
    sources: ["https://www.reviewed.com/home-outdoors/content/delonghi-pacex390lvyn-pinguino-portable-air-conditioner-review", "https://redditrecs.com/portable-air-conditioner/model/delonghi-pinguino-arctic-whisper-extreme-portable-air-conditioner/", "https://versus.com/en/delonghi-pinguino-arctic-whisper-extreme-pac-ex390lvyn", "https://www.justanswer.co.uk/hvac/jlppp-delonghi-pacex100-pinguino-portable-air-conditioner.html"],
  },
  "black-decker-10-000-btu-3": {
    reviewsBasis: "Aggregated from tens of thousands of Amazon verified-buyer ratings on the BPACT10WT listing (ASIN B01DLPUWG2), plus Home Depot reviews and independent test writeups; exact live rating count not verified at time of writing.",
    realWorldNumbers: [{ label: "BTU rating gap", value: "10,000 ASHRAE vs ~5,500 SACC" }, { label: "Noise on high", value: "~75 dB (fan-like)" }, { label: "Realistic coverage", value: "~150 sq ft, not 450" }, { label: "Power draw", value: "not independently verified" }],
    failureModes: [{ mode: "Undersized real cooling / BTU-vs-SACC gap", note: "Marketed as 10,000 BTU (ASHRAE) but the real SACC/DOE rating is only about 5,500 BTU, so owners find it comfortably cools roughly 150 sq ft rather than the advertised 450 sq ft." }, { mode: "Condensate tank fills fast / water leaks", note: "In humid conditions owners report the internal reservoir filling within a day or two and needing frequent draining, and some say it overflows or leaks onto the floor when not monitored." }, { mode: "Bare-bones window kit fit", note: "Reviewers report the window-mount pieces fit poorly and need modification, with minimal weather stripping and a short exhaust hose that lets warm air seep back in." }],
    praise: ["Strong value for the price and cools a small bedroom or office quickly on the coldest setting", "Easy to move room-to-room on its casters, with a well-liked Follow Me remote"],
    longevity: "Budget build: multiple owner reviews report units stopping producing cold air after about 2 years, and because the refrigerant system is sealed with no recharge port a leak effectively ends the unit's life.",
    sources: ["https://www.amazon.com/Black-Decker-BPACT10WT-Portable-Conditioner/product-reviews/B01DLPUWG2", "https://www.homedepot.com/p/reviews/BLACK-DECKER-10-000-BTU-Portable-Air-Conditioner-Cools-450-Sq-Ft-with-Dehumidifier-and-Remote-in-White-BPP10WTB/316567955/1", "https://temperaturemaster.com/black-decker-bpact10wt-portable-air-conditioner-review/", "https://www.consumeranalysis.com/guides/portable-ac/black-decker-bpp10wtb-review/"],
  },
  "shinco-spf1-08c-8000-btu": {
    reviewsBasis: "Aggregated from Amazon verified buyers (ASIN B07HR5CN7G), Home Depot owner reviews, and TechGearLab's independent lab test; no exact rating count confirmed",
    realWorldNumbers: [{ label: "SACC vs ASHRAE", value: "4,550 SACC vs 8,000 ASHRAE" }, { label: "Measured temp drop", value: "6.1°F in one hour (lab)" }, { label: "Measured noise", value: "61 dBA at 4ft, high" }, { label: "Power draw", value: "~0.81 kWh; CEER 6" }],
    failureModes: [{ mode: "Weak / undersized real cooling", note: "Real SACC output is only ~4,550 BTU versus the 8,000 ASHRAE claim, and owners say it struggles beyond ~200 sq ft." }, { mode: "Noise louder than expected", note: "Independently measured at 61 dBA on high with a noticeable compressor 'thump' when cycling, so many find it too loud for sleeping." }, { mode: "Warranty / support pain", note: "Multiple owners report ignored warranty claims and slow or unresponsive support when seeking replacement parts, though a minority got fast free parts." }],
    praise: ["Fast, tool-free window-kit setup (about 5 minutes) with everything included in the box", "Lightweight and cools a small single room quickly during standard bucketless cooling mode"],
    longevity: "Budget brand with weak longevity signals: some owners doubt build quality, and 'FL' full-tank/sensor errors plus cooling-failure and refrigerant-leak reports appear; no hard lifespan data found.",
    sources: ["https://www.techgearlab.com/reviews/electronics/portable-air-conditioner/shinco-spf1-08c", "https://www.amazon.com/Shinco-10000-Portable-Conditioners-SPF1-08C/dp/B07HR5CN7G", "https://www.homedepot.com/p/reviews/Shinco-8-000-BTU-Portable-Air-Conditioner-Cools-200-Sq-Ft-with-Dehumidifierand-Fan-in-White-SPF1-08C/322676110/1", "https://trendxplore.com/shinco-8000-btu-portable-ac-review/"],
  },
  "ecoflow-wave-3-portable-air-conditioner": {
    reviewsBasis: "Aggregated from r/vandwellers/EcoFlow owner threads (RedditRecs) plus multiple multi-week hands-on reviews (NerdTechy, StorageReview, Notebookcheck); a newer product with limited long-term owner history.",
    realWorldNumbers: [{ label: "Runtime on add-on battery", value: "Max ~2-3 hrs; Eco ~8 hrs" }, { label: "Measured noise", value: "44 dB sleep, 58 dB max" }, { label: "Cooling / heating capacity", value: "6,100 BTU cool / 6,800 heat" }, { label: "Cooling power draw", value: "~350-690W cooling" }],
    failureModes: [{ mode: "Runtime far shorter than the 8-hour claim on real heat", note: "On max cooling in 90s-degree weather owners get only about 2-3.75 hours per add-on battery charge, not the advertised eight." }, { mode: "Condensate and water leaks in humid/enclosed use", note: "The tank can fill in roughly 1.5 hours in humidity, the stopper has come loose in transport, and some owners report side leaking after about a month." }, { mode: "True off-grid use requires the pricey add-on battery", note: "The ~$899 battery is a separate purchase on top of the ~$1,299 unit and pushes the stacked package past 50 lbs, hurting real portability." }],
    praise: ["Genuinely cools a van or small tent, holding comfortable temps even in direct sun on high-90s days when run on max", "All-in-one off-grid heat-and-cool with easy app control and fast (~75 min) recharge"],
    longevity: "Add-on LFP battery is rated for ~4,000 cycles to 80% capacity, and Wave 2 owners report two summers/winters of use; balanced against a few owner reports of leaks and weak QA.",
    sources: ["https://redditrecs.com/portable-air-conditioner/model/ecoflow-ecoflow-wave-3-portable-air-conditioner/", "https://nerdtechy.com/ecoflow-wave-3-review", "https://www.storagereview.com/review/ecoflow-wave-3-review-smarter-stronger-and-ready-for-the-field", "https://www.notebookcheck.net/Smart-cooling-in-hot-summers-Portable-air-conditioner-EcoFlow-Wave-3-review.1048905.0.html"],
  },
  "noco-boost-hd-gb70-2000a": {
    reviewsBasis: "Widely-reviewed popular unit; secondary sources cite 18,000+ Amazon owner reviews (listing figure, not independently re-counted)",
    realWorldNumbers: [{ label: "Jumps per charge (owner field test)", value: "~35 (spec claims 40)" }, { label: "Cold usable limit", value: "down to about -4F/-20C" }, { label: "Cold-weather jump reduction", value: "30-50% fewer jumps" }, { label: "Charge retention degrades", value: "after 12-18 months unused" }],
    failureModes: [{ mode: "Deep-discharge lockout / won't recharge", note: "The lithium protection circuit disables the pack once voltage drops too low, and neglected units refuse to recharge (one owner of two had one fail after ~2 years)." }, { mode: "Cell swelling / bulging case", note: "Owners report internal cells expanded and bulged the plastic case after storage in a hot vehicle trunk, forcing disposal." }, { mode: "Self-discharge in storage", note: "It loses charge below the operating threshold if not topped up roughly every 3 months, and the 1-year warranty often expires before failures surface." }],
    praise: ["UltraSafe reverse-polarity and spark-proof clamps make it forgiving and beginner-safe", "Strong 2000A output with thick rugged clamps that start large gas/diesel engines"],
    longevity: "Mixed: owners who top it up monthly report multi-year reliable service, but several report failure-to-recharge or swelling around the 1-2 year mark, often just past the 1-year warranty; recharging every ~3 months is the decisive factor.",
    sources: ["https://www.garagejournal.com/forum/threads/battery-jump-box-noco-is-a-no-go.489624/", "https://www.garagejournal.com/forum/threads/noco-boost-issues.465513/", "https://leadfootautomotive.com/car-maintenance/car-jump-starter/noco-gb70-review/"],
  },
  "hulkman-alpha85-2000a-smart-jump": {
    reviewsBasis: "13,000+ Amazon owner reviews",
    realWorldNumbers: [{ label: "Dead-battery starts per charge", value: "7 starts drained 90%->50%" }, { label: "Per V8 gas jump drain", value: "~5% (99%->94%)" }, { label: "Cold storage loss", value: "-2% after 3 weeks at 15F" }, { label: "Full recharge time", value: "~1.5 hours" }],
    failureModes: [{ mode: "Won't engage a fully dead battery", note: "Owners report it detects nothing on a completely flat battery unless they manually trigger Force Start, which disables reverse-polarity protection." }, { mode: "Overheats / drains fast under heavy load", note: "On a 6.5L diesel with dual batteries it managed only two cranks before overheating, and seven consecutive starts drained it from 90% to 50%." }, { mode: "Short cables, no screen protection", note: "The ~15-inch clamps struggle to reach deep engine bays, and the drawstring bag offers no impact protection for the large glass display." }],
    praise: ["The large color READY display removes the anxiety of hooking clamps up correctly", "Fast ~1.5-hour recharge and roughly 20-second starts on a healthy connection"],
    longevity: "Generally strong: owners report ~95% after 6-8 months in a trunk and one reliable at 3 years; reviewers estimate 3-5 year / ~1000-cycle life, with no pattern of premature death-in-storage.",
    sources: ["https://www.howtogeek.com/128471/hulkman-alpha-85-portable-jump-starter-review-perfect-in-a-pinch/", "https://carxplorer.com/hulkman-alpha85-jump-starter-review/", "https://www.autoguide.com/hulkman-alpha-85-s-jump-starter-review", "https://www.amazon.com/HULKMAN-Alpha85-Starter-20000mAh-Portable/dp/B08M41FX48"],
  },
  "fanttik-t8-apex-2000a-jump": {
    reviewsBasis: "A broad base of Amazon owner reviews (exact count not verifiable); plus independent hands-on reviews and Fanttik support-ticket clusters",
    realWorldNumbers: [{ label: "Jumps per charge (support est.)", value: "20-30 on 4-6 cyl" }, { label: "Self-discharge (maker support)", value: "~5-8% per month" }, { label: "Cold-weather limit", value: "rated 5F, sags below" }],
    failureModes: [{ mode: "Won't hold or take a charge", note: "Multiple verified Amazon buyers report units, including warranty replacements, that would not hold a charge or showed a continuously blinking LCD." }, { mode: "Self-discharge dead after trunk storage", note: "Fanttik's own support says low-state-of-charge storage is the leading 'won't recharge' cause, requiring a top-up every ~60 days." }, { mode: "Cold-weather voltage sag / refuses to boost", note: "Below its rated 5F limit the lithium cells lose output and the unit may refuse to jump until warmed indoors." }],
    praise: ["Compact and light for its 2000A/20000mAh capacity", "Bright, easy-to-read 3-inch display and solid IP65 build"],
    longevity: "Rated 500 cycles to 80% capacity with a 24-month warranty; owners' main complaint is early 'won't hold charge' defects rather than gradual wear, plus storage self-discharge if not topped up.",
    sources: ["https://www.yuenx.com/2021/review-fanttik-t8-apex-lithium-car-jump-starter-vs-noco/", "https://www.protoolreviews.com/fanttik-t8-apex-jump-starter/", "https://nerdtechy.com/fanttik-t8-apex-review", "https://fanttik.com/blogs/support/fanttik-t8-apex-troubleshooting-guide", "https://www.amazon.com/Fanttik-T8-APEX-Deluxe-Package/product-reviews/B09GW2NC12/"],
  },
  "gooloo-gp4000-4000a-peak-lithium": {
    reviewsBasis: "8,500+ Amazon owner reviews",
    realWorldNumbers: [{ label: "Measured under load", value: "~400A at 11V, 500A at 9V" }, { label: "Advertised peak", value: "4000A (burst spec only)" }, { label: "Amps a car actually needs", value: "~100-300A to start" }, { label: "Idle recharge interval", value: "every 2-3 months" }],
    failureModes: [{ mode: "Inflated 4000A peak-amp claim", note: "Independent load-testers measure only a few hundred sustained amps, far below the headline 4000A burst figure, though still enough to start most engines." }, { mode: "Quality-control / DOA units", note: "Owners report units dead out of the box or cables with thin cracked insulation exposing copper, plus difficulty getting refunds from GOOLOO." }, { mode: "Cold weather + self-discharge in storage", note: "Extreme cold cuts starts-per-charge and the cell self-discharges, so GOOLOO itself says recharge every 2-3 months and avoid long glovebox/trunk storage." }],
    praise: ["Small, light, and powerful enough to crank large diesels at a fraction of NOCO's price", "Holds charge well over long idle periods (one owner: 5 years, ~90% capacity)"],
    longevity: "Owners report multi-year service (some 5+ years still working), but only with periodic recharging; material quality rated a notch below NOCO.",
    sources: ["https://www.amazon.com/GOOLOO-GP4000-Starter-SuperSafe-Portable/dp/B09HJH1S41", "https://cheaprvliving.com/gooloo-gp4000-jump-starter-user-review/", "https://carbatterynerd.com/gooloo-jump-starter-review-gp4000-gt4000/", "https://www.jeepcherokeeclub.com/threads/testing-the-gooloo-gt4000-jump-starter-pack.247036/", "https://us.gooloo.com/pages/faqs"],
  },
  "dewalt-dxaeps14-2000-peak-amp": {
    reviewsBasis: "Synthesized from a pro hands-on review (Pro Tool Reviews), the DXAEPS2/DXAEPS14 manual, owner troubleshooting Q&A (JustAnswer), a Sawmill Creek owner thread, and an owner-problems writeup; retailer reviews skew positive but the recurring durability signal is the internal lead-acid battery",
    realWorldNumbers: [{ label: "Weight", value: "~20.9 lbs (heavy)" }, { label: "Recharge interval", value: "at least every 30 days" }, { label: "Full recharge time", value: "~10 hrs (40 hrs initial)" }, { label: "Compressor", value: "120 PSI with auto-stop" }],
    failureModes: [{ mode: "Internal AGM/lead-acid battery dies or won't hold charge", note: "The signature complaint: if not recharged regularly the sealed lead-acid battery self-discharges, deep-discharges and sulfates, then refuses to take or hold a charge." }, { mode: "Very slow recharge / long downtime", note: "Owners note about 40 hours for the initial charge and roughly 10 hours per full cycle, far slower than lithium packs." }, { mode: "Charging and electronics faults as it ages", note: "Units develop won't-charge, won't-power-on, continuous-beeping and flashing-button faults, often ending in battery or board replacement." }],
    praise: ["Built-in 120 PSI digital compressor with auto-stop is genuinely useful and well-liked", "Versatile all-in-one (jump, inflation, 500W AC outlets, USB) from a trusted DeWalt brand"],
    longevity: "Hinges entirely on maintenance: kept charged (every ~30 days per the manual) the sealed lead-acid battery lasts for years, but repeated deep discharge sulfates it; aging units commonly fail by no longer accepting a charge. No reliable owner year-figure was verifiable.",
    sources: ["https://www.protoolreviews.com/dewalt-jump-starter-and-power-station-review/", "https://www.manualslib.com/manual/1498464/Dewalt-Dxaeps2.html?page=12", "https://www.everstartjumpstarter.com/the-easy-fix-to-all-common-dewalt-dxaeps14-problems/", "https://www.justanswer.com/electronics/mm6rw-dxaeps2-powerstation-won-t-charge-dxaeps2-i-ve-tried.html", "https://sawmillcreek.org/threads/dewalt-1400-jump-starter.307074/"],
  },
  "gooloo-gp2000-2000a-compact-lithium": {
    reviewsBasis: "~1,400+ Amazon owner reviews (affiliate-cited, unverified exact count), corroborated by Whirlpool forum owner threads and independent review write-ups",
    realWorldNumbers: [{ label: "Jumps per full charge", value: "~4-5 (owner-reported)" }, { label: "Rated cold-weather limit", value: "-4F / -20C" }, { label: "Recharge interval in storage", value: "every ~3 months" }, { label: "Auto shut-off per attempt", value: "~15 seconds" }],
    failureModes: [{ mode: "Self-discharge death in storage", note: "Owners report the unit failing to recharge or start after long idle storage unless topped up roughly every three months." }, { mode: "Weak cranking on fully-dead or large diesel batteries", note: "Owners describe the starter just clicking without turning over, and the ~15-second auto-off preventing any pre-charge of a flat battery." }, { mode: "Cell swelling/degradation from hot-car storage", note: "Leaving the lithium pack in a vehicle above ~140F degrades or swells the cells, a widely cautioned lithium failure." }],
    praise: ["Compact and strong value - genuinely starts cars and even diesels when kept charged", "USB Quick Charge port doubles as a handy power bank"],
    longevity: "Owners report ~3-5 years with quarterly recharging; units left uncharged can fail to recover within ~2 years.",
    sources: ["https://forums.whirlpool.net.au/archive/374pqkrl", "https://leadfootautomotive.com/car-maintenance/car-jump-starter/gooloo-jump-starter-review/", "https://www.amazon.com/GOOLOO-GP2000-Starter-Supersafe-Portable/dp/B0C5M36W2G"],
  },
  "autowit-supercap-2-batteryless-supercapacitor": {
    reviewsBasis: "Aggregated from independent hands-on reviews (Nerd Techy, The Gadgeteer), an Expedition Portal overlander owner thread, and BobIsTheOilGuy/Amazon Q&A; several first-hand owner reports rather than a large star-count sample",
    realWorldNumbers: [{ label: "Self-charge from car battery", value: "~2-3 min (~10 min via USB)" }, { label: "Bootstrapped from weak battery", value: "owner started from ~5V" }, { label: "Temperature tolerance", value: "-40F to 158F rated" }, { label: "Peak current / crank window", value: "~800A, ~5-10 sec burst" }],
    failureModes: [{ mode: "Needs residual voltage or external source", note: "A stone-dead 0V or shorted-cell battery can't charge the capacitor, so you must feed it from USB/power bank or another car's battery." }, { mode: "Rapid self-discharge once charged", note: "The supercapacitor loses usable charge within roughly 10-30 minutes, so it must be charged right before each crank rather than kept ready like a lithium pack." }, { mode: "Limited output on hard-starting engines", note: "One owner found it insufficient to crank a cold 2.5L diesel at 15-17F despite the 4.0L-diesel rating, and each miss means recharging before the next attempt." }],
    praise: ["No lithium cell means it never self-discharges in storage or swells, so it can live in the vehicle for months and still work", "Charges off the vehicle's own dying battery in a couple of minutes and tolerates extreme heat and deep cold"],
    longevity: "The core selling point owners echo: with no battery to degrade, the capacitor is rated for very long maintenance-free life (maker cites 10-20 year lifespan / thousands of cycles), though long-term owner data is still thin and it carries only a 1-year warranty.",
    sources: ["https://nerdtechy.com/autowit-supercap-2-review", "https://the-gadgeteer.com/2020/07/28/autowit-supercap-2-jump-starter-review/", "https://forum.expeditionportal.com/threads/autowit-supercap-2-jump-starter.221222/", "https://bobistheoilguy.com/forums/threads/autowit-supercap-2.340275/", "https://www.amazon.com/autowit-SuperCap2-Batteryless-Capacitor-arrancador/dp/B086L29DL9"],
  },
};

export function getOwnerEvidence(id: string): OwnerEvidence | undefined {
  return OWNER_EVIDENCE[id];
}
