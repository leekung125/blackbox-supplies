"use client";

/**
 * Power station sizing calculator.
 *
 * ⛔ WHY THIS EXISTS AND WHY IT IS BUILT THIS WAY. Search Console, 2026-09-08: this site has
 * EXTERNAL LINKS = 0 across 239 indexed pages. Prose roundups do not get cited; a tool that
 * gets the arithmetic right does. So the point of this component is not the UI - it is that
 * the numbers are defensible enough that a forum answer can link to it.
 *
 * ⛔ THE TWO THINGS MOST SIZING CALCULATORS GET WRONG, and the reason to build one at all:
 *   1. DUTY CYCLE. A fridge is not a 150 W load for 24 hours. Its compressor runs roughly a
 *      third of the time, so it is ~150 W x 24 h x 0.35. Calculators that skip this oversize a
 *      fridge by about 3x, which is the difference between a $400 unit and a $1,200 one.
 *   2. STARTING SURGE. Anything with a motor - fridge, sump pump, well pump, furnace blower -
 *      draws several times its running watts for a moment at startup. A station sized only on
 *      running watts will trip the instant the compressor kicks in. Surge sizes the INVERTER;
 *      energy sizes the BATTERY. They are different questions and both have to pass.
 *
 * Every assumption is displayed to the user rather than hidden, because an unexplained number
 * is not citable and this whole exercise is about being worth citing.
 */

import { useMemo, useState } from "react";

type Appliance = {
  id: string;
  name: string;
  watts: number;
  surge: number;
  /** Fraction of the hour the load actually draws power. 1 = continuous. */
  duty: number;
  note?: string;
};

/**
 * Running watts are typical mid-range figures for common household units; surge multipliers
 * follow the usual 2-3x for induction motors. These are PLANNING figures - the nameplate on the
 * specific unit always wins, and the UI says so.
 */
const CATALOG: Appliance[] = [
  { id: "fridge", name: "Refrigerator (full size)", watts: 150, surge: 1200, duty: 0.35,
    note: "Compressor cycles — runs roughly a third of the time" },
  { id: "chest", name: "Chest freezer", watts: 100, surge: 900, duty: 0.3,
    note: "Cycles like a fridge, slightly less often" },
  { id: "sump", name: "Sump pump (1/3 HP)", watts: 800, surge: 2200, duty: 0.25,
    note: "Duty depends entirely on how fast water comes in" },
  { id: "well", name: "Well pump (1/2 HP)", watts: 1000, surge: 3000, duty: 0.15 },
  { id: "furnace", name: "Furnace blower", watts: 600, surge: 1800, duty: 0.4 },
  { id: "cpap", name: "CPAP (no humidifier)", watts: 40, surge: 0, duty: 1,
    note: "Humidifier and heated hose roughly double this" },
  { id: "cpaph", name: "CPAP (heated humidifier)", watts: 90, surge: 0, duty: 1 },
  { id: "router", name: "Router + modem", watts: 20, surge: 0, duty: 1 },
  { id: "laptop", name: "Laptop", watts: 60, surge: 0, duty: 0.8 },
  { id: "phone", name: "Phone charging", watts: 15, surge: 0, duty: 0.5 },
  { id: "lights", name: "LED lights (a few rooms)", watts: 40, surge: 0, duty: 1 },
  { id: "tv", name: 'TV (55" LED)', watts: 100, surge: 0, duty: 1 },
  { id: "fan", name: "Box or tower fan", watts: 60, surge: 120, duty: 1 },
  { id: "pac", name: "Portable air conditioner (8k BTU)", watts: 900, surge: 2000, duty: 0.6 },
  { id: "heater", name: "Space heater (1500 W)", watts: 1500, surge: 0, duty: 0.7,
    note: "Resistive heat is brutal on a battery — expect very short runtime" },
  { id: "microwave", name: "Microwave (1000 W out)", watts: 1500, surge: 0, duty: 1,
    note: "Draws far more than its cooking rating" },
  { id: "coffee", name: "Coffee maker", watts: 900, surge: 0, duty: 1 },
  { id: "medical", name: "Oxygen concentrator", watts: 350, surge: 800, duty: 1 },
];

/** Inverter conversion loss, DC battery -> AC output. 85% is typical for a quality unit. */
const INVERTER_EFF = 0.85;
/** Reserve so the pack is not planned to 100% discharge. */
const RESERVE = 0.8;

type Row = { app: Appliance; hours: number; qty: number };

export function PowerStationCalculator() {
  const [rows, setRows] = useState<Row[]>([
    { app: CATALOG[0], hours: 24, qty: 1 },
    { app: CATALOG[6], hours: 24, qty: 1 },
  ]);
  const [pick, setPick] = useState<string>("cpap");

  const add = () => {
    const app = CATALOG.find((a) => a.id === pick);
    if (!app || rows.some((r) => r.app.id === app.id)) return;
    setRows([...rows, { app, hours: 8, qty: 1 }]);
  };

  const result = useMemo(() => {
    // BATTERY SIDE: energy actually consumed, adjusted for duty cycle.
    const wh = rows.reduce((s, r) => s + r.app.watts * r.qty * r.hours * r.app.duty, 0);
    const fromBattery = wh / INVERTER_EFF;
    const recommended = fromBattery / RESERVE;

    // INVERTER SIDE: continuous is everything running at once; surge is the worst single
    // motor starting while everything else is already running.
    const continuous = rows.reduce((s, r) => s + r.app.watts * r.qty, 0);
    const worstSurge = rows.reduce((m, r) => Math.max(m, r.app.surge), 0);
    const surgeNeeded = worstSurge
      ? worstSurge + continuous - rows.find((r) => r.app.surge === worstSurge)!.app.watts
      : continuous;

    return { wh, fromBattery, recommended, continuous, surgeNeeded };
  }, [rows]);

  const fmt = (n: number) => Math.round(n).toLocaleString("en-US");

  return (
    <div className="mt-8">
      <div className="bbx-card grad-border p-5 sm:p-6">
        <h2 className="font-display text-xl font-semibold text-ink">What do you need to run?</h2>

        <div className="mt-4 space-y-3">
          {rows.map((r, i) => (
            <div key={r.app.id} className="rounded-lg border border-line-soft p-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex-1 min-w-[12rem] font-medium text-ink">{r.app.name}</span>

                <label className="flex items-center gap-2 text-sm text-ink-dim">
                  qty
                  <input
                    type="number" min={1} max={20} value={r.qty}
                    onChange={(e) => {
                      const v = Math.max(1, Math.min(20, Number(e.target.value) || 1));
                      setRows(rows.map((x, j) => (j === i ? { ...x, qty: v } : x)));
                    }}
                    className="w-16 rounded border border-line bg-base px-2 py-1 text-ink"
                  />
                </label>

                <label className="flex items-center gap-2 text-sm text-ink-dim">
                  hours
                  <input
                    type="number" min={0} max={72} step={0.5} value={r.hours}
                    onChange={(e) => {
                      const v = Math.max(0, Math.min(72, Number(e.target.value) || 0));
                      setRows(rows.map((x, j) => (j === i ? { ...x, hours: v } : x)));
                    }}
                    className="w-20 rounded border border-line bg-base px-2 py-1 text-ink"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setRows(rows.filter((_, j) => j !== i))}
                  className="text-sm text-ink-faint underline hover:text-ink"
                >
                  remove
                </button>
              </div>
              <p className="mt-2 text-xs text-ink-faint">
                {r.app.watts} W running
                {r.app.surge ? ` · ${r.app.surge} W starting surge` : " · no motor surge"}
                {r.app.duty < 1 ? ` · runs ~${Math.round(r.app.duty * 100)}% of the time` : " · runs continuously"}
                {r.app.note ? ` — ${r.app.note}` : ""}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <select
            value={pick}
            onChange={(e) => setPick(e.target.value)}
            className="rounded border border-line bg-base px-3 py-2 text-ink"
          >
            {CATALOG.filter((a) => !rows.some((r) => r.app.id === a.id)).map((a) => (
              <option key={a.id} value={a.id}>{a.name}</option>
            ))}
          </select>
          <button type="button" onClick={add} className="cta-amber rounded px-4 py-2 font-medium">
            Add appliance
          </button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="bbx-card p-5">
          <span className="eyebrow eyebrow-accent">Battery capacity</span>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">
            {fmt(result.recommended)} <span className="text-2xl text-ink-dim">Wh</span>
          </p>
          <p className="mt-2 text-sm text-ink-dim">
            You will consume about <strong className="text-ink">{fmt(result.wh)} Wh</strong>.
            Inverter losses take that to {fmt(result.fromBattery)} Wh drawn from the pack, and the
            figure above adds a 20% reserve so you are not planning to a dead battery.
          </p>
        </div>

        <div className="bbx-card p-5">
          <span className="eyebrow eyebrow-accent">Inverter output</span>
          <p className="mt-2 font-display text-4xl font-semibold text-ink">
            {fmt(result.continuous)} <span className="text-2xl text-ink-dim">W continuous</span>
          </p>
          <p className="mt-2 text-sm text-ink-dim">
            Needs at least <strong className="text-ink">{fmt(result.surgeNeeded)} W surge</strong> to
            start the largest motor while everything else is already running. A station that
            passes on capacity but fails here will trip the moment a compressor kicks in.
          </p>
        </div>
      </div>

      <details className="mt-5 rounded-lg border border-line-soft p-4">
        <summary className="cursor-pointer font-medium text-ink">
          The arithmetic, so you can check it
        </summary>
        <div className="mt-3 space-y-2 text-sm text-ink-dim">
          <p><strong className="text-ink">Energy</strong> = Σ (watts × quantity × hours × duty cycle).
            Duty cycle is the part most calculators skip: a fridge compressor runs roughly a third
            of the time, so treating it as a constant 150 W load oversizes it by about three times.</p>
          <p><strong className="text-ink">From the battery</strong> = energy ÷ {INVERTER_EFF} — the
            inverter loses roughly 15% converting DC to AC.</p>
          <p><strong className="text-ink">Recommended capacity</strong> = that ÷ {RESERVE}, leaving a
            20% reserve. Lithium (LiFePO4) packs tolerate deep discharge far better than lead-acid,
            but planning to zero leaves nothing for a cold night or an ageing cell.</p>
          <p><strong className="text-ink">Surge</strong> = the largest single starting surge, plus
            everything else already running. Motors draw 2–3× their running watts for a moment at
            startup; resistive loads (heaters, kettles, microwaves) do not surge but are simply
            enormous the whole time they run.</p>
          <p className="text-ink-faint">
            Running watts here are typical planning figures for common household units. The
            nameplate on your specific appliance always wins — check it before buying.
          </p>
        </div>
      </details>
    </div>
  );
}
