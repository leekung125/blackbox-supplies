// Auth-aware full-page screenshots of the Ascension app (PIN session + ?stay + boot wait).
// Usage: BASE=... PINFILE=... OUT=... ROUTES=/business,/sanctum,/,/finance node tools/auth_shot.js
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const BASE = process.env.BASE || 'http://localhost:3939';
  const PIN = fs.readFileSync(process.env.PINFILE, 'utf8').trim();
  const OUT = process.env.OUT;
  const routes = (process.env.ROUTES || '/business,/sanctum,/,/finance').split(',');
  const width = Number(process.env.WIDTH || 1440);
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: 1.4 });
  const res = await ctx.request.post(`${BASE}/api/auth`, { data: { pin: PIN } });
  const j = await res.json();
  console.log('auth ok=' + j.ok + ' session=' + String(j.sessionId || '').slice(0, 6));
  const auth = JSON.stringify({ ts: Date.now(), sessionId: j.sessionId || '', token: j.token || '' });
  for (const r of routes) {
    const page = await ctx.newPage();
    await page.addInitScript((a) => { try { localStorage.setItem('nightmareAuth', a); } catch (e) {} }, auth);
    const url = `${BASE}${r}${r.includes('?') ? '&' : '?'}stay`;
    try { await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 }); } catch (e) { console.log('goto warn', r, e.message); }
    await page.waitForTimeout(Number(process.env.WAIT || 12000)); // SystemBoot ceremony ~7.9s
    const name = r === '/' ? 'void' : r.replace(/[/?=&]/g, '_').replace(/^_+/, '');
    try { await page.screenshot({ path: `${OUT}/os-${name}-${width}.png`, fullPage: true }); console.log('shot', r); }
    catch (e) { console.log('shot FAIL', r, e.message); }
    await page.close();
  }
  await browser.close();
  console.log('DONE');
})();
