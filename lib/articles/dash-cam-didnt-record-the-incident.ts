import type { Article } from "@/lib/articles";

/**
 * Self-contained deep guide. Wire-in (orchestrator, one edit):
 *   lib/articles-extra.ts →
 *     import { DASH_CAM_DIDNT_RECORD_THE_INCIDENT } from "./articles/dash-cam-didnt-record-the-incident";
 *     ...and push DASH_CAM_DIDNT_RECORD_THE_INCIDENT into EXTRA_ARTICLES.
 *
 * Honesty notes: every failure described here is traceable to a specific entry in
 * lib/owner-evidence.ts — the Garmin Mini 2 heat lock-up and the lost trip, the VIOFO
 * A119 Mini 2 card fussiness and dropped clips, the Nextbase iQ parking drain and
 * unreliable low-voltage cut-off. Nothing is lab-tested by us and nothing is invented.
 * Where a number appears it is the owner-reported figure already published on the
 * product page, stated as an owner report rather than as our measurement. All three
 * cams resolve via getProductById against the merged car catalog (data/products.json)
 * and all three have usable plates. No `picks` (those resolve only against the
 * heat/useful catalogs and would silently drop dash-cam ids).
 */
export const DASH_CAM_DIDNT_RECORD_THE_INCIDENT: Article = {
  slug: "dash-cam-didnt-record-the-incident",
  title:
    "Your Dash Cam Didn't Record the Incident: Why the Footage Isn't There, and How to Stop It Happening Again",
  dek: "Something happened, you pulled the card, and the clip you needed is missing — or the file is there but the minutes that matter are not. There are only three common reasons a dash cam has no footage of the one event you bought it for: heat shut it down, the memory card failed, or the camera had no power when it mattered. Here is how to tell which one bit you, what is recoverable, and what actually prevents a repeat.",
  category: "Dash Cams",
  readMinutes: 8,
  updated: "August 2026",
  answerFirst:
    "If your dash cam has no footage of an incident, check three things in this order. First the memory card: pull it, look for a gap in the file timestamps around the event, and treat a card that is old, generic, or not high-endurance as the prime suspect — dropped and short clips usually trace back to a failing or incompatible card. Second heat: a cam that was hot to the touch, frozen, or needed its power cable pulled to restart had likely locked up before the event, which is a documented trait on some models in a parked, sun-heated cabin. Third power: if the gap is while the car was parked, the camera almost certainly was not powered at all, or its parking mode drained the battery and cut out. The card is the cheapest fix and the most common cause, so start there.",
  sections: [
    {
      heading: "First: is the footage actually gone, or just hard to find?",
      body: [
        "Before assuming a failure, rule out the boring explanation. Most dash cams loop-record, which means once the card is full the oldest files are overwritten to make room for new ones. If the incident was days ago and you have been driving since, ordinary looping may simply have recorded over it — the camera worked exactly as designed and the clip aged out. That is not a fault, and it is why the single most useful habit is pulling the card the same day something happens rather than a week later.",
        "Also check whether the clip was saved into a protected or 'event' folder rather than the normal loop folder. Most cams move impact-triggered recordings somewhere separate so looping cannot overwrite them, and plenty of people conclude the footage is missing while it is sitting in a different directory on the same card. Put the card in a computer and look at every folder before you conclude anything.",
        "If you have done both of those and there is a genuine hole — footage before the event, footage after it, nothing during — then you are looking at one of the three real failures below. That specific signature, a gap bracketed by working recordings, is the thing to look for, and it is exactly what one Garmin Dash Cam Mini 2 owner described: an entire trip missing from the card despite footage recorded before and after it.",
      ],
    },
    {
      heading: "Cause #1: the memory card — the most common and the cheapest to fix",
      body: [
        "A dash cam writes continuously, all day, every day, in a hot windshield. That is one of the harshest write workloads any consumer storage sees, and an ordinary microSD card is not built for it. Cards wear out, and the way they fail is rarely a clean death — they start dropping frames, truncating clips, and silently failing to write, which produces precisely the 'footage before and after but not during' gap that sends people looking for answers.",
        "This is not a theoretical risk. On the VIOFO A119 Mini 2, owners report the camera is fussy about cards and specifically want a high-endurance U3 card to avoid errors, and the minority who report missing or short recordings usually trace it back to a failing or incompatible card rather than to the camera. That is the pattern across the category: when clips go missing on an otherwise healthy cam, the card is the first thing to suspect.",
        "Two habits fix most of this. Use a high-endurance microSD card — they are sold specifically for dash cams and surveillance, and the price gap over a generic card is small next to the cost of not having the footage. Then format the card in the camera on a schedule (many cams have a reminder for this), because formatting in the camera clears accumulated file-system damage that a computer format can leave behind. A card that has been in service a long time should simply be replaced; it is the cheapest insurance in this entire guide.",
      ],
      list: [
        "Use a high-endurance card, not a generic one|Dash cams write continuously in heat. High-endurance cards are built for that duty cycle; ordinary cards degrade and start dropping clips before they visibly die.",
        "Match the card to what the camera asks for|The A119 Mini 2's owners specifically call for a high-endurance U3 card to avoid errors. Check the manual's requirement rather than assuming any card works.",
        "Format in the camera, on a schedule|Formatting in-camera clears file-system damage that accumulates from constant writing. Many cams prompt for it — do not dismiss the prompt indefinitely.",
        "Replace an old card outright|Cards are consumables in this application. If you cannot remember when you bought it, that is the answer.",
        "Pull the card the same day something happens|Loop recording overwrites the oldest footage. Waiting a week can lose a clip that was captured perfectly.",
      ],
      productIds: ["viofo-a119-mini-2"],
    },
    {
      heading: "Cause #2: heat — the camera locked up before the incident",
      body: [
        "A parked car in the sun becomes an oven, and a dash cam sits at the top of the windshield in the worst of it. Some cameras handle that and some do not, and when one does not the failure is not a dramatic melt — it quietly stops recording, or freezes entirely, and stays that way until it is power-cycled. If your camera was hot to the touch, unresponsive, or needed the power cable pulled before it would work again, heat is the likely explanation for the gap.",
        "The clearest documented case in our catalog is the Garmin Dash Cam Mini 2. Owners report it going red-hot and freezing, needing a power-cable pull to recover, and describe the problem persisting even on firmware 7.50 and in moderate heat. Owner reports put a freeze at around 85°F cabin temperature in parking use — which is an ordinary summer afternoon in a parked car, not an extreme. It has been a known trait since launch. That is worth knowing before you rely on one for parked-car coverage in a hot climate.",
        "The underlying design fork is what the camera uses to hold power: a supercapacitor or a lithium battery. A supercapacitor tolerates heat far better and exists mainly to keep the camera alive long enough to close the current file when power is cut. A lithium cell in the same position is a heat liability — on the Nextbase iQ, the internal lithium battery rather than a supercapacitor is described as a real overheat and failure risk in hot climates like Arizona or Texas. The VIOFO A119 Mini 2 sits on the other side of that fork: it is a supercapacitor design, owners say it shrugs off heat, and its longevity note credits that design with avoiding the lithium-battery heat-death failure mode, with at least one owner reporting three-plus years of daily use without issues.",
        "If you park in the sun and want parked-car coverage, buy a supercapacitor camera. It is the single design decision that most changes whether footage exists on a hot day, and no setting or firmware compensates for the wrong side of it.",
      ],
      table: {
        caption: "What owners report about heat, by power design",
        columns: ["Camera", "Power design", "What owners report in heat"],
        rows: [
          [
            "VIOFO A119 Mini 2",
            "Supercapacitor, no lithium battery",
            "Shrugs off heat; longevity note credits the design with avoiding lithium heat-death; 3+ years daily use reported by an owner",
          ],
          [
            "Garmin Dash Cam Mini 2",
            "Not a supercapacitor design",
            "Goes red-hot and freezes, needing a power-cable pull; reported at ~85°F cabin in parking mode, persisting on firmware 7.50",
          ],
          [
            "Nextbase iQ",
            "Internal lithium battery",
            "Lithium cell called a real overheat and failure risk in hot climates such as Arizona or Texas",
          ],
        ],
      },
      productIds: ["garmin-dash-cam-mini-2"],
    },
    {
      heading: "Cause #3: no power when it mattered",
      body: [
        "If the gap lines up with the car being parked, the most likely answer is the simplest one: the camera was not running. On most cars the 12V accessory socket dies with the ignition, so a cam powered only from that socket stops the moment you switch off. Everything it recorded while you were driving is there, and nothing from the hours you were parked exists, because there was never any power to record with. People often read that as a fault; it is the wiring.",
        "Continuous parked coverage requires constant power — a hardwire kit into the fuse box, a dedicated dash-cam battery pack, or an OBD power cable — and every one of those needs a low-voltage cut-off so the camera stops before it pulls the starter battery below cranking voltage. That protection is also a failure point in its own right. On the Nextbase iQ, owners report parking mode flattening the car's 12V battery overnight, a dead battery within days, and the low-voltage cut-off not working reliably; one owner reported a dead battery by the second morning. So the failure can land either way — no footage because there was no power, or no footage because the camera drained the battery and everything stopped.",
        "There is a second, quieter version of this: the camera had power but you could not get the clip off it. Also on the Nextbase iQ, owners describe frequent connection failures over Wi-Fi and Bluetooth, and clips that are not viewable in the app without pulling the card unless you pay for a subscription, which the catalog records at roughly seven to ten dollars a month. The footage existed and the retrieval path did not, which from the driver's seat feels identical to having nothing.",
      ],
      list: [
        "Socket-only power means no parked coverage|The 12V socket dies with the ignition on most cars. If that is your only power source, the camera sleeps the moment you park.",
        "Constant power needs a low-voltage cut-off|A hardwire kit, battery pack, or OBD cable keeps the cam alive when parked — the cut-off is what stops it flattening the starter battery.",
        "Do not assume the cut-off works|Nextbase iQ owners report the low-voltage cut-off not working reliably and a dead battery within days. Check your battery after the first few nights of parking mode.",
        "A dedicated battery pack avoids the question|It powers parking mode from its own cell and never touches the starter battery. Costs more and takes space; removes the no-start risk.",
        "Know how you will actually retrieve a clip|If app access is unreliable or paywalled, plan on pulling the card. Test the retrieval path before you need it, not after.",
      ],
      productIds: ["nextbase-iq-4k-smart-dash"],
    },
    {
      heading: "Diagnosing yours in about five minutes",
      body: [
        "Work through it in order of likelihood and cost. Pull the card first and look at the file list around the time of the incident. If there is footage before and after with a hole in the middle, and the camera was running normally otherwise, the card is the leading suspect — replace it with a high-endurance card and format in the camera. If the whole parked period is absent and driving footage is intact, it is power: the camera almost certainly was not on. If the camera was hot, frozen, or needed a power-cycle to come back, it is heat, and no card or wiring change will fix that on a camera whose design is the problem.",
        "One honest limitation: none of these leaves a log you can read. Dash cams do not generally record why they stopped, so this is inference from the shape of the gap rather than a diagnostic readout. The signatures above are reliable in the common cases, but a camera can also have failed outright, and if the pattern does not match any of the three it is worth testing the unit with a known-good card on a bench before buying anything.",
      ],
      table: {
        caption: "Match the symptom to the cause",
        columns: ["What you see", "Most likely cause", "First move"],
        rows: [
          [
            "Footage before and after, gap in the middle",
            "Card failing or incompatible",
            "Replace with a high-endurance card, format in-camera",
          ],
          [
            "Clips are short or truncated",
            "Card cannot sustain the write rate",
            "Replace the card; check the camera's required class",
          ],
          [
            "Nothing at all while parked, driving footage fine",
            "No constant power",
            "Hardwire kit or battery pack with a low-voltage cut-off",
          ],
          [
            "Nothing while parked and the car battery is flat",
            "Parking mode drained it; cut-off did not hold",
            "Check the cut-off setting; consider a separate battery pack",
          ],
          [
            "Camera hot, frozen, or needed a cable pull",
            "Heat lock-up",
            "A supercapacitor camera; shade or reposition the mount",
          ],
          [
            "Footage exists but you cannot get it off the cam",
            "App or connectivity failure",
            "Pull the card directly; test the retrieval path in advance",
          ],
        ],
      },
    },
    {
      heading: "What we would change first, honestly",
      body: [
        "If you only do one thing after reading this, put a high-endurance card in the camera. It is the cheapest of the three fixes, it addresses the most common cause, and it is the one that requires no wiring and no new hardware. A great many 'my dash cam did not record' stories end there.",
        "If you park in the sun and want the parked car covered, the camera design matters more than any feature on the box, and the choice is supercapacitor over lithium. In our catalog the VIOFO A119 Mini 2 is the one on the right side of that line — a supercapacitor design owners say shrugs off heat, with a longevity note crediting it for avoiding the lithium heat-death failure mode. The honest catch is the flip side of this whole page: it is the cam owners call fussy about cards, and its most common complaint is a clunky app with dropped Wi-Fi handshakes when pulling clips. Buy the high-endurance card with it and plan to pull the card by hand.",
        "The Garmin Dash Cam Mini 2 earns its place for being genuinely tiny and discreet, with clean daytime 1080p, and we would still name the catch plainly: overheating has been a known trait since launch, and owners report freezing in parking mode at ordinary summer cabin temperatures. It is a reasonable driving camera and a questionable parked-car camera in a hot climate. The Nextbase iQ is the connected option with genuinely excellent 4K and remote features, and its documented costs are a lithium battery that is a heat liability, a parking mode owners report flattening the 12V battery with a cut-off that does not always hold, and a subscription for live view and cloud clips. None of these are secrets and none of them should be discovered after an incident.",
        "We research this from manufacturer specs and aggregated long-term owner reports — we do not run a lab, we have not bench-tested these cameras in heat, and we will not claim to have. Everything above is what owners consistently report, and it is cited on each product page.",
      ],
      productIds: ["viofo-a119-mini-2", "garmin-dash-cam-mini-2", "nextbase-iq-4k-smart-dash"],
    },
    {
      heading: "The 60-second prevention checklist",
      list: [
        "High-endurance microSD, replaced on a schedule|The most common cause of missing footage and the cheapest fix. Treat the card as a consumable, not a permanent part.",
        "Format in the camera, not just the computer|In-camera formatting clears the file-system damage that constant writing accumulates. Do not keep dismissing the reminder.",
        "Supercapacitor if the car parks in the sun|Heat lock-up is a design problem, not a settings problem. A supercapacitor cam is the fix; a lithium-cell cam in a hot cabin is the risk.",
        "Constant power with a working low-voltage cut-off|Socket-only power records nothing while parked. A cut-off protects the starter battery — and verify it actually holds over the first few nights.",
        "Test how you retrieve a clip before you need one|If the app is unreliable or paywalled, know that you will be pulling the card, and know how.",
        "Pull the card the day something happens|Loop recording overwrites the oldest footage first. A perfectly captured clip can still age out while you wait.",
      ],
    },
  ],
  faq: [
    {
      q: "Why does my dash cam have no footage of the accident?",
      a: "There are three common reasons. The memory card failed or was incompatible, which produces a gap with normal footage before and after it — this is the most frequent cause and the cheapest to fix. The camera overheated and locked up, which is a documented trait on some models in a parked, sun-heated cabin and usually leaves the camera hot, frozen, or needing a power-cable pull. Or the camera had no power at the time, which is normal if it is powered only from the 12V socket, because that socket dies with the ignition on most cars. Check the card first, then whether the camera was hot, then how it was powered.",
    },
    {
      q: "Can dash cam footage be recovered once it is gone?",
      a: "It depends on why it is missing. If loop recording simply overwrote it, the data has been written over and is realistically gone. If the card is failing, some files may still be readable with recovery software before you write anything else to it — so stop using that card immediately rather than putting it back in the camera. If the camera never recorded because it had no power or had locked up from heat, there is nothing to recover, because nothing was ever written.",
    },
    {
      q: "Does heat really stop a dash cam recording?",
      a: "Yes, on some models. Garmin Dash Cam Mini 2 owners report it going red-hot and freezing, needing a power-cable pull to recover, with reports of a freeze at around 85°F cabin temperature in parking use and the problem persisting on firmware 7.50. The underlying factor is whether the camera uses a supercapacitor or a lithium battery — a supercapacitor tolerates heat far better, which is why the VIOFO A119 Mini 2's supercapacitor design is credited by owners with shrugging off heat, while the Nextbase iQ's internal lithium cell is described as a real overheat risk in hot climates.",
    },
    {
      q: "What memory card should a dash cam use?",
      a: "A high-endurance microSD card, sized generously, and replaced periodically. Dash cams write continuously in a hot windshield, which is a far harder duty cycle than an ordinary card is designed for, and worn cards drop frames and truncate clips before they visibly fail. Check what your camera specifically asks for — VIOFO A119 Mini 2 owners report the camera is fussy about cards and call for a high-endurance U3 card to avoid errors — and format the card in the camera rather than only on a computer.",
    },
    {
      q: "Why did my dash cam record while driving but not while parked?",
      a: "Almost certainly because it had no power while parked. On most cars the 12V accessory socket is dead with the ignition off, so a camera plugged into it stops recording the moment you switch the car off. Continuous parked coverage needs constant power from a hardwire kit, a dedicated dash-cam battery pack, or an OBD power cable — each of which should include a low-voltage cut-off so the camera stops before it pulls the starter battery below cranking voltage.",
    },
    {
      q: "Can parking mode kill my car battery?",
      a: "It can, and the protection meant to prevent it does not always work. Nextbase iQ owners report parking mode flattening the car's 12V battery overnight, a dead battery within days, and the low-voltage cut-off not working reliably, with one owner reporting a dead battery by the second morning. If you run parking mode, check the battery over the first few nights rather than assuming the cut-off is holding, or use a dedicated dash-cam battery pack that powers parking mode from its own cell and never touches the starter battery.",
    },
  ],
  relatedGuides: [
    "best-dash-cams-compared",
    "dash-cam-parking-mode-vs-security-camera",
    "do-i-need-a-dash-cam",
  ],
  sources: [
    {
      label: "DashCamTalk forum thread: Garmin Dash Cam Mini overheating",
      url: "https://dashcamtalk.com/forum/threads/garmin-dash-cam-mini-failed-me-overheating.44883/",
    },
    {
      label: "TechGearLab review: Garmin Dash Cam Mini 2",
      url: "https://www.techgearlab.com/reviews/cool-gadgets/dash-cam/garmin-mini-2",
    },
    {
      label: "RedditRecs aggregated owner reports: VIOFO A119 Mini 2",
      url: "https://redditrecs.com/dash-cam/model/viofo-a119-mini-2/",
    },
    {
      label: "PCWorld review: Nextbase iQ 4K dash cam",
      url: "https://www.pcworld.com/article/2107428/nextbase-iq-4k-dash-cam-review.html",
    },
    {
      label: "Companion explainer: Dash Cam Parking Mode vs Security Camera (BlackBox)",
      url: "https://www.blackboxsupplies.com/guides/dash-cam-parking-mode-vs-security-camera",
    },
    {
      label: "Full comparison: Best Dash Cams for Everyday Drivers (BlackBox)",
      url: "https://www.blackboxsupplies.com/guides/best-dash-cams-compared",
    },
  ],
};
