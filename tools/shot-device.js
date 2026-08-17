// Truthful device screenshots — REAL mobile emulation, not a narrow desktop window.
//
// WHY THIS EXISTS (2026-08-12)
// ---------------------------
// `content-engine/tools/shot.py --only mobile` claims a 390x844 iPhone viewport. It does not
// deliver one. It drives headless Chrome with `--window-size=390,844` and an iPhone UA string,
// but no device emulation — and Chrome on Windows CLAMPS a window to a ~500px minimum. Measured
// with a page that prints its own metrics:
//
//     shot.py --only mobile  ->  innerWidth=500  clientWidth=500  outerWidth=516  dpr=1
//
// So the page LAYS OUT at 500 CSS px and the capture is then cropped to 390. Every element
// between x=390 and x=500 is sliced off, which reads exactly like a broken responsive layout:
// text "clipped" at the right edge, CTAs missing, images cropped wrong. None of it is real.
// A 500px layout is also past Tailwind's `sm:` behaviour boundary in places, so components can
// be shown in the wrong branch entirely.
//
// A review instrument that silently reports the wrong viewport is worse than no instrument:
// it manufactures phantom defects and hides real ones. This tool asks Playwright for a real
// device profile (isMobile + touch + dpr 3 + honoured meta viewport), so what you see is what
// a phone renders.
//
// Usage:
//     node tools/shot-device.js <url> <out-stem> [--full] [--only mobile|desktop]
//         -> <out-stem>.mobile.png    iPhone 14   (390 CSS px, dpr 3, mobile engine)
//         -> <out-stem>.desktop.png   1440x900    (dpr 1)
//
// Verify the viewport is honest at any time with:  node tools/shot-device.js --selftest
const { chromium, devices } = require('playwright');
const path = require('path');

const PROFILES = {
  mobile: () => ({ ...devices['iPhone 14'] }),
  desktop: () => ({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }),
};

async function shoot(url, out, profile, full) {
  const browser = await chromium.launch();
  try {
    const ctx = await browser.newContext(PROFILES[profile]());
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(Number(process.env.SETTLE || 2500));
    // Report the width the page actually laid out at, every run. If this ever disagrees with
    // the profile, the shot is not what it claims to be and the number says so on the spot.
    const got = await page.evaluate(() => ({
      inner: window.innerWidth,
      client: document.documentElement.clientWidth,
      dpr: window.devicePixelRatio,
      scrollW: document.documentElement.scrollWidth,
    }));
    await page.screenshot({ path: out, fullPage: !!full });
    const overflow = got.scrollW > got.client ? `  ⚠ OVERFLOW scrollWidth=${got.scrollW}` : '';
    console.log(
      `  ${profile.padEnd(7)} laid out at ${got.inner}px (dpr ${got.dpr})  ->  ${out}${overflow}`
    );
    return got;
  } finally {
    await browser.close();
  }
}

// Proves the emulation is real by measuring it, in BOTH directions: the mobile profile must
// report 390 and the desktop profile must report 1440. A tool that cannot show its own
// viewport is the tool that produced the phantom bug this file exists to prevent.
async function selftest() {
  const data = 'data:text/html,<meta name=viewport content="width=device-width,initial-scale=1">x';
  let ok = true;
  for (const [profile, want] of [['mobile', 390], ['desktop', 1440]]) {
    const browser = await chromium.launch();
    const ctx = await browser.newContext(PROFILES[profile]());
    const page = await ctx.newPage();
    await page.goto(data);
    const got = await page.evaluate(() => window.innerWidth);
    await browser.close();
    const pass = got === want;
    ok = ok && pass;
    console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${profile}: innerWidth=${got} (want ${want})`);
  }
  console.log(ok ? 'SELFTEST PASS' : 'SELFTEST FAIL');
  return ok ? 0 : 1;
}

(async () => {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) process.exit(await selftest());

  const positional = argv.filter((a) => !a.startsWith('--'));
  const url = positional[0];
  const stem = positional[1];
  if (!url || !stem) {
    console.error('usage: node tools/shot-device.js <url> <out-stem> [--full] [--only mobile|desktop]');
    process.exit(2);
  }
  const full = argv.includes('--full');
  const onlyIdx = argv.indexOf('--only');
  const want = onlyIdx >= 0 ? [argv[onlyIdx + 1]] : ['mobile', 'desktop'];

  for (const profile of want) {
    if (!PROFILES[profile]) {
      console.error(`unknown profile: ${profile}`);
      process.exit(2);
    }
    const out = path.resolve(`${stem}.${profile}.png`);
    await shoot(url, out, profile, full);
  }
})();
