// Hero contrast gate — measures text against the PIXELS ACTUALLY BEHIND IT.
//
// WHY THIS EXISTS
// ---------------
// 2026-08-10 a hero shipped with "THE SHORT ANSWER" invisible on a golden-hour sky. It passed
// every automated contrast check, because those checks compared the text colour against the
// element's *CSS* background — which was `transparent` — or against the median of the region.
// The median was 6.83:1. The brightest 5% of the pixels under the glyphs were at 1.01:1.
//
// Text over a PHOTOGRAPH has no CSS background colour to check. The only honest measurement is
// the real composited pixels in the text's own box. So this tool:
//   1. makes one element's GLYPHS invisible while leaving the element itself painted,
//   2. screenshots exactly that element's box: the background plate the glyphs sit on,
//   3. decodes it in-browser via canvas (no image deps) and takes the luminance distribution,
//   4. contrasts the text colour against the WORST realistic background, not the average.
//
// It gates on p95 luminance — the bright tail — and prints median beside it so a passing median
// can never again hide a failing tail. Alpha-blended text colours are composited over each
// sampled pixel before the ratio is taken.
//
// Usage:
//   node tools/contrast-check.js <url> [--profile mobile|desktop] [--json]
//   node tools/contrast-check.js --selftest      # proves the gate fails on known-bad input
//
// Exit code 0 = every target passes WCAG AA, 1 = at least one failure.
const { chromium, devices } = require('playwright');

const PROFILES = {
  mobile: () => ({ ...devices['iPhone 14'] }),
  desktop: () => ({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }),
};

// The hero surfaces a Pinterest visitor sees first. Order matters only for reading the report.
const TARGETS = [
  { sel: 'section h1', label: 'hero headline' },
  { sel: 'section h1 .amber-word', label: 'headline accent word' },
  { sel: 'section .mono.text-accent-bright', label: 'eyebrow' },
  { sel: 'section p', label: 'hero body copy' },
  { sel: '.cta-amber', label: 'primary CTA label' },
  { sel: 'section a[href="/guides"]', label: 'secondary CTA' },
  { sel: '.bbxh-stat .nums', label: 'stat number' },
  { sel: '.bbxh-stat .mono', label: 'stat label' },
];

const srgb = (c) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
const lum = (r, g, b) => 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b);
const ratio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

function parseColor(s) {
  const m = s.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[,/]/).map((x) => parseFloat(x.trim()));
  return { r: p[0], g: p[1], b: p[2], a: p.length > 3 && !Number.isNaN(p[3]) ? p[3] : 1 };
}

// WCAG "large text": >=24px, or >=18.66px when bold.
const isLarge = (px, weight) => px >= 24 || (px >= 18.66 && Number(weight) >= 700);

async function decode(page, b64, w, h) {
  return page.evaluate(
    ({ b64, w, h }) =>
      new Promise((res) => {
        const img = new Image();
        img.onload = () => {
          const c = document.createElement('canvas');
          c.width = w; c.height = h;
          const g = c.getContext('2d', { willReadFrequently: true });
          g.drawImage(img, 0, 0, w, h);
          res(Array.from(g.getImageData(0, 0, w, h).data));
        };
        img.src = 'data:image/png;base64,' + b64;
      }),
    { b64, w, h }
  );
}

async function run(url, profileName) {
  const browser = await chromium.launch();
  const ctx = await browser.newContext(PROFILES[profileName]());
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(Number(process.env.SETTLE || 3000));
  // Settle the entrance/ken-burns animations so we measure the resting frame, not a keyframe.
  await page.evaluate(() => document.getAnimations().forEach((a) => { try { a.finish(); } catch (e) {} }));
  await page.waitForTimeout(300);

  // Layout viewport must equal the visual viewport, or every clip is measured in the wrong
  // coordinate space and the numbers below are fiction. Happens on any page missing a viewport
  // meta tag: mobile emulation lays out at 980px and scales down to fit.
  const vpW = page.viewportSize().width;
  const layoutW = await page.evaluate(() => document.documentElement.clientWidth);
  if (layoutW !== vpW) {
    console.error(
      `\nABORT: layout viewport is ${layoutW}px but the visual viewport is ${vpW}px.\n` +
      `  getBoundingClientRect() and screenshot({clip}) would use different units, so every\n` +
      `  measurement would be wrong. The page is almost certainly missing:\n` +
      `  <meta name="viewport" content="width=device-width, initial-scale=1">`
    );
    await browser.close();
    process.exit(2);
  }

  const helper = await ctx.newPage(); // canvas scratch page for decoding
  await helper.goto('about:blank');

  const rows = [];
  for (const t of TARGETS) {
    const info = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return null;
      const b = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        x: b.x, y: b.y, w: b.width, h: b.height,
        color: cs.color, fontSize: parseFloat(cs.fontSize), fontWeight: cs.fontWeight,
      };
    }, t.sel);
    if (!info || info.w < 2 || info.h < 2) { rows.push({ ...t, missing: true }); continue; }

    // Clamp to the viewport — screenshot clips outside it throw.
    const vp = page.viewportSize();
    const clip = {
      x: Math.max(0, Math.floor(info.x)), y: Math.max(0, Math.floor(info.y)),
      width: Math.min(Math.ceil(info.w), vp.width - Math.max(0, Math.floor(info.x))),
      height: Math.min(Math.ceil(info.h), vp.height - Math.max(0, Math.floor(info.y))),
    };
    if (clip.width < 2 || clip.height < 2) { rows.push({ ...t, offscreen: true }); continue; }

    // Blank the GLYPHS, not the element. `visibility:hidden` would take the element's own
    // background with it — on the amber CTA that measured dark-on-dark and reported 1.03:1 for
    // a button that is plainly legible. A gate that refuses correct input gets switched off,
    // which is worse than no gate. Transparent fill keeps the button, kills the letters.
    // text-shadow is cleared too: it paints even when the fill is transparent, and it is light
    // cast BY the glyph, not backdrop the glyph must survive.
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      el.dataset.ccPrev = el.getAttribute('style') || '';
      el.style.setProperty('color', 'transparent', 'important');
      el.style.setProperty('-webkit-text-fill-color', 'transparent', 'important');
      el.style.setProperty('text-shadow', 'none', 'important');
    }, t.sel);
    const buf = await page.screenshot({ clip });
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      const prev = el.dataset.ccPrev || '';
      if (prev) el.setAttribute('style', prev); else el.removeAttribute('style');
      delete el.dataset.ccPrev;
    }, t.sel);

    const px = await decode(helper, buf.toString('base64'), clip.width, clip.height);
    const fg = parseColor(info.color) || { r: 255, g: 255, b: 255, a: 1 };

    const ratios = [];
    for (let i = 0; i < px.length; i += 4) {
      const br = px[i], bg = px[i + 1], bb = px[i + 2];
      // Composite the (possibly translucent) text colour over THIS pixel before comparing.
      const cr = fg.r * fg.a + br * (1 - fg.a);
      const cg = fg.g * fg.a + bg * (1 - fg.a);
      const cb = fg.b * fg.a + bb * (1 - fg.a);
      ratios.push(ratio(lum(cr, cg, cb), lum(br, bg, bb)));
    }
    ratios.sort((a, b) => a - b);
    const at = (q) => ratios[Math.min(ratios.length - 1, Math.floor(q * ratios.length))];
    const need = isLarge(info.fontSize, info.fontWeight) ? 3 : 4.5;
    // p05 of the ratio distribution == the worst 5% of pixels == the bright tail.
    const worst = at(0.05);
    rows.push({
      ...t, need, worst, median: at(0.5), min: ratios[0],
      fontSize: info.fontSize, pass: worst >= need,
    });
  }
  await browser.close();
  return rows;
}

function report(rows, profileName) {
  console.log(`\ncontrast @ ${profileName} — text vs the real pixels behind it (WCAG AA)`);
  console.log('  ' + 'target'.padEnd(24) + 'worst5%   median     need   verdict');
  let fails = 0, checked = 0;
  for (const r of rows) {
    if (r.missing) { console.log(`  ${r.label.padEnd(24)}—  selector not found (${r.sel})`); continue; }
    if (r.offscreen) { console.log(`  ${r.label.padEnd(24)}—  outside viewport, not measured`); continue; }
    checked++;
    if (!r.pass) fails++;
    console.log(
      `  ${r.label.padEnd(24)}${r.worst.toFixed(2).padStart(6)}  ${r.median.toFixed(2).padStart(7)}  ` +
      `${r.need.toFixed(1).padStart(6)}   ${r.pass ? 'pass' : 'FAIL'}`
    );
  }
  console.log(`\n  ${checked} measured, ${fails} failing`);
  return fails;
}

// Both directions, on purpose. A gate only earns trust if you have watched it reject something.
async function selftest() {
  // NOTE the viewport meta on every fixture. Without it, mobile emulation lays the page out at
  // 980px and scales it to 390 — getBoundingClientRect() then returns LAYOUT px while
  // screenshot({clip}) takes VISUAL px, so the plate silently covers ~2.5x the intended area.
  // That is what made the CTA fixture read 1.06:1. The guard in run() now refuses that state.
  const VP = '<meta name="viewport" content="width=device-width,initial-scale=1">';
  const good = 'data:text/html,' + encodeURIComponent(
    VP + '<body style="margin:0;background:#070504"><section><h1 style="color:#faf5ea;font:600 44px serif">Legible headline</h1></section>');
  const bad = 'data:text/html,' + encodeURIComponent(
    VP + '<body style="margin:0;background:#f6e7c8"><section><h1 style="color:#faf5ea;font:600 44px serif">Invisible headline</h1></section>');
  // Regression case: dark label on the amber CTA, sitting on a DARK page. The first version of
  // this gate hid the whole element, so the plate was the dark page rather than the amber pill,
  // and it reported 1.03:1 for a button anyone can read. It must be accepted.
  const cta = 'data:text/html,' + encodeURIComponent(
    VP + '<body style="margin:0;background:#0b0806"><a class="cta-amber" style="display:inline-flex;padding:14px 28px;' +
    'color:#15110b;font:600 17px sans-serif;background:linear-gradient(135deg,#edba66,#d99a45)">What’s the problem?</a>');

  let ok = true;
  const cases = [
    ['headline', 'cream on near-black', good, true, 'hero headline'],
    ['headline', 'cream on lamp-glow cream', bad, false, 'hero headline'],
    ['cta', 'dark label on amber pill over dark page', cta, true, 'primary CTA label'],
  ];
  for (const [, name, url, wantPass, label] of cases) {
    const rows = await run(url, 'mobile');
    const row = rows.find((r) => r.label === label);
    const got = !!(row && row.pass);
    const pass = got === wantPass;
    ok = ok && pass;
    console.log(`  ${pass ? 'PASS' : 'FAIL'}  ${name}: worst5%=${row && row.worst ? row.worst.toFixed(2) : 'n/a'} ` +
      `-> ${got ? 'accepted' : 'rejected'} (want ${wantPass ? 'accepted' : 'rejected'})`);
  }
  console.log(ok ? 'SELFTEST PASS — the gate accepts good input and rejects bad' : 'SELFTEST FAIL');
  return ok ? 0 : 1;
}

(async () => {
  const argv = process.argv.slice(2);
  if (argv.includes('--selftest')) process.exit(await selftest());
  const url = argv.find((a) => !a.startsWith('--'));
  if (!url) { console.error('usage: node tools/contrast-check.js <url> [--profile mobile|desktop]'); process.exit(2); }
  const pi = argv.indexOf('--profile');
  const profileName = pi >= 0 ? argv[pi + 1] : 'mobile';
  const rows = await run(url, profileName);
  if (argv.includes('--json')) console.log(JSON.stringify(rows, null, 2));
  process.exit(report(rows, profileName) > 0 ? 1 : 0);
})();
