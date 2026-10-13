// Converts the project images that the code imports (`figma:asset/<sha>.png`) to WebP,
// capped at MAX_WIDTH, and rewrites those imports to the .webp file.
// Re-runnable: already-converted imports are skipped. Originals are left in src/assets
// (no longer bundled once nothing imports them).
//
// Usage: npm run images:optimize          (dry run: npm run images:optimize -- --dry)
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";
import sharp from "sharp";

const ROOT = join(import.meta.dirname, "..");
const SRC = join(ROOT, "src");
const ASSETS = join(SRC, "assets");
const MAX_WIDTH = 1920;
const QUALITY = 80;
const DRY = process.argv.includes("--dry");

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return name === "imports" ? [] : walk(p); // src/imports is unreachable Figma export
    return /\.(tsx?|jsx?)$/.test(name) ? [p] : [];
  });

const IMPORT_RE = /figma:asset\/([0-9a-f]{40}|logo)\.png/g;
const files = walk(SRC);
const referenced = new Set();
for (const f of files) for (const m of readFileSync(f, "utf8").matchAll(IMPORT_RE)) referenced.add(m[1]);

const converted = new Map(); // id -> { before, after, width }
let before = 0, after = 0;
for (const id of [...referenced].sort()) {
  const input = join(ASSETS, `${id}.png`);
  if (!existsSync(input)) { console.warn(`missing asset: ${id}.png (left as is)`); continue; }
  const original = readFileSync(input);
  const meta = await sharp(original).metadata();
  const out = await sharp(original)
    .rotate()
    .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90, effort: 5 })
    .toBuffer();
  if (out.length >= original.length) { console.log(`keep ${id}.png (WebP not smaller)`); continue; }
  if (!DRY) writeFileSync(join(ASSETS, `${id}.webp`), out);
  converted.set(id, { before: original.length, after: out.length, width: `${meta.width}->${Math.min(meta.width ?? 0, MAX_WIDTH)}` });
  before += original.length; after += out.length;
}

let rewrites = 0;
for (const f of files) {
  const text = readFileSync(f, "utf8");
  const next = text.replace(IMPORT_RE, (whole, id) => (converted.has(id) ? `figma:asset/${id}.webp` : whole));
  if (next !== text) { rewrites++; if (!DRY) writeFileSync(f, next); }
}

const kb = (n) => `${(n / 1024).toFixed(0)} KB`;
for (const [id, r] of [...converted].sort((a, b) => b[1].before - a[1].before).slice(0, 10))
  console.log(`${id.slice(0, 12)}  ${kb(r.before).padStart(8)} -> ${kb(r.after).padStart(7)}  (${r.width}px)`);
console.log(`${DRY ? "[dry run] " : ""}${converted.size} images converted: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB; ${rewrites} source files updated (${relative(ROOT, SRC)})`);
