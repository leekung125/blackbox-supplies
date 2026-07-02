import type { Category } from "@/lib/products";

/**
 * The framing line for each category — the real driver moment it answers. Shared by the homepage
 * category rail and the category pages so the "problem → gear" story is consistent everywhere.
 * `scene` is an optional plate under /public; empty means the UI uses the category's product image.
 */
export interface FieldScene {
  scene: string;
  /** The moment, present tense. */
  mood: string;
  /** A concrete, specific line. */
  incident: string;
}

export const FIELD_SCENE: Record<Category, FieldScene> = {
  "Jump Starters": {
    scene: "",
    mood: "When it won't turn over.",
    incident: "Dead battery in a cold parking lot, and no second car in sight.",
  },
  "Tire Inflators": {
    scene: "",
    mood: "When the pump's out of order.",
    incident: "Low-pressure light at 11pm, every gas-station air machine closed.",
  },
  "Dash Cams": {
    scene: "",
    mood: "When it's their word against yours.",
    incident: "They ran the light, swore they didn't — and there were no witnesses.",
  },
  "Power & Charging": {
    scene: "",
    mood: "When the outlet is miles away.",
    incident: "Three days off-grid, or a grid that just went dark — and phones at zero.",
  },
  "Roadside Safety": {
    scene: "",
    mood: "When the shoulder is the only option.",
    incident: "Stranded on an unlit shoulder, unseen by the traffic coming up behind.",
  },
  "Car Utility": {
    scene: "",
    mood: "When the car is your second home.",
    incident: "A trunk of loose gear, a dead cabin battery, and nothing where you need it.",
  },
};

export function getFieldScene(category: Category): FieldScene {
  return FIELD_SCENE[category];
}
