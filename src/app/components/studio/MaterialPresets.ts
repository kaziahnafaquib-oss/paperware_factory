// Procedural material presets for the 3D studio preview. No external assets.

export type FinishName = "none" | "None" | "Gold Foil" | "Spot UV" | "Embossed" | string;
export type MaterialName = "Kraft" | "Bamboo" | "Recycled" | "Premium White" | string;

export interface SurfacePreset {
  /** Final paper colour (hex) after the substrate tint is applied. */
  paperColor: string;
  roughness: number;
  metalness: number;
  clearcoat: number;
  clearcoatRoughness: number;
  /** Subtle PE-lining sheen on cups. */
  sheen: number;
  sheenRoughness: number;
  /** Bump strength used by the Embossed finish (0 = off). */
  bumpScale: number;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return "#" + [r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("");
}

/** Linear mix of two hex colours; t = 0 -> a, t = 1 -> b. */
export function mixHex(a: string, b: string, t: number): string {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex([ca[0] + (cb[0] - ca[0]) * t, ca[1] + (cb[1] - ca[1]) * t, ca[2] + (cb[2] - ca[2]) * t]);
}

export function isDarkHex(hex: string): boolean {
  const [r, g, b] = hexToRgb(hex);
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.45;
}

/** Substrate tints. Kraft dominates a white base; a chosen colour still shows through. */
const SUBSTRATE_TINT: Record<string, { tint: string; amount: number }> = {
  Kraft: { tint: "#b98f5c", amount: 0.7 },
  Bamboo: { tint: "#e4d6b3", amount: 0.45 },
  Recycled: { tint: "#d8d1c2", amount: 0.4 },
  "Premium White": { tint: "#ffffff", amount: 0 },
};

export function getSurfacePreset(color: string, material: MaterialName, finish: FinishName): SurfacePreset {
  const sub = SUBSTRATE_TINT[material] ?? SUBSTRATE_TINT["Premium White"];
  const paperColor = sub.amount > 0 ? mixHex(color || "#ffffff", sub.tint, sub.amount) : color || "#ffffff";

  // Base: matte paper board.
  let roughness = material === "Kraft" ? 0.9 : material === "Recycled" ? 0.85 : 0.7;
  let clearcoat = 0.0;
  let clearcoatRoughness = 0.6;
  let bumpScale = 0;
  // Subtle PE sheen on coated boards.
  const sheen = material === "Kraft" ? 0.08 : 0.18;
  const sheenRoughness = 0.8;

  switch (finish) {
    case "Spot UV":
      clearcoat = 0.9;
      clearcoatRoughness = 0.12;
      roughness = Math.min(roughness, 0.55);
      break;
    case "Gold Foil":
      clearcoat = 0.35;
      clearcoatRoughness = 0.3;
      break;
    case "Embossed":
      bumpScale = 0.02;
      break;
    default:
      break;
  }

  return { paperColor, roughness, metalness: 0, clearcoat, clearcoatRoughness, sheen, sheenRoughness, bumpScale };
}
