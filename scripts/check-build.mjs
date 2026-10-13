// Fails if the production build contains content that must never ship again (audit Phase A0).
// Usage: node scripts/check-build.mjs [distDir]   (default: dist)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dist = process.argv[2] ?? "dist";
const FORBIDDEN = [
  { pattern: /Bypass Admin|Login Bypass|BYPASS LOGIN/i, why: "auth bypass UI in public build" },
  { pattern: /ipapi\.co/, why: "visitor IP sent to third party without consent" },
  { pattern: /\+880-XXX|aggregateRating/, why: "placeholder phone / unbacked rating in structured data" },
  { pattern: /https:\/\/paperware\.com\//, why: "wrong domain (canonical is paperwarefactory.com)" },
  { pattern: /1605806616949/, why: "unsafe stock image (removed in Phase A0)" },
  { pattern: /FSC-C123456/, why: "placeholder certificate code" },
  { pattern: /Inquiry Transmitted Successfully|Request Received/, why: "fake form-success message" },
];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|js|css|json|xml|txt)$/.test(name)) files.push(p);
  }
};
walk(dist);

const problems = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const { pattern, why } of FORBIDDEN) if (pattern.test(text)) problems.push(`${file}: ${why} (${pattern})`);
}

if (!files.some((f) => f.endsWith("index.html"))) problems.push(`${dist}/index.html missing`);
if (problems.length) {
  console.error("Build check failed:\n" + problems.join("\n"));
  process.exit(1);
}
console.log(`Build check passed (${files.length} files scanned).`);
