// Run with: npm test   (Node >= 22.18 / 23.6 runs TypeScript natively; no test framework needed)
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { ROUTES, PATH_REDIRECTS, pathFor, idForPath, isKnownId, normalizePath, surfaceFor } from "../src/app/routes/routeTable.ts";

const SRC = join(import.meta.dirname, "..", "src", "app");

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(tsx?|jsx?)$/.test(name) ? [p] : [];
  });
}

test("ids and paths are unique", () => {
  const ids = ROUTES.map((r) => r.id);
  const paths = ROUTES.map((r) => r.path);
  assert.equal(new Set(ids).size, ids.length, "duplicate id");
  assert.equal(new Set(paths).size, paths.length, "duplicate path");
});

test("id -> path -> id round-trips", () => {
  for (const r of ROUTES) assert.equal(idForPath(pathFor(r.id)), r.id, r.id);
});

test("paths are lowercase, start with / and have no trailing slash", () => {
  for (const r of ROUTES) {
    assert.match(r.path, /^\/[a-z0-9\-/]*$/, r.path);
    assert.equal(normalizePath(r.path), r.path, r.path);
  }
});

test("redirects point at real paths", () => {
  for (const [from, to] of Object.entries(PATH_REDIRECTS)) {
    assert.notEqual(idForPath(to), "not-found", `${from} -> ${to}`);
    assert.equal(idForPath(from), "not-found", `${from} should not also be a live path`);
  }
});

test("unknown paths resolve to not-found; trailing slash and case are tolerated", () => {
  assert.equal(idForPath("/definitely-not-a-page"), "not-found");
  assert.equal(idForPath("/Contact/"), "contact");
});

test("every page rendered by MainContent has a route", () => {
  const main = readFileSync(join(SRC, "MainContent.tsx"), "utf8");
  const cases = [...main.matchAll(/case\s+"([a-z0-9-]+)":/g)].map((m) => m[1]);
  assert.ok(cases.length > 30, "expected the page switch to be found");
  for (const id of cases) assert.ok(isKnownId(id), `MainContent renders "${id}" but it has no route`);
});

test("every navigation target used in components has a route (catches broken links like garments-supplies)", () => {
  const files = walk(SRC).filter((f) => !/[/\\]admin[/\\]|admin-|ClientDashboard|GlobalSettings|AccountOverview/.test(f));
  const NAV_FILES = /(navbar|footer|bottom-nav|page-discovery|search-overlay|more|company)\.tsx$/;
  const problems: string[] = [];
  for (const file of files) {
    const text = readFileSync(file, "utf8");
    const ids = [...text.matchAll(/(?:onPageChange|handlePageChange|onNavigate|handleInternalPageChange|onExplore)\??\.?\(\s*["']([a-z0-9-]+)["']\s*\)/g)].map((m) => m[1]);
    // In navigation config files every `id: "..."` is a page id (verified when this test was written).
    if (NAV_FILES.test(file)) ids.push(...[...text.matchAll(/\bid:\s*["']([a-z0-9-]+)["']/g)].map((m) => m[1]));
    for (const id of ids) if (!isKnownId(id)) problems.push(`${file.replace(SRC, "src/app")}: "${id}"`);
  }
  assert.deepEqual(problems, [], `Unknown navigation targets:\n${problems.join("\n")}`);
});

test("public/sitemap.xml lists exactly the indexable routes (run `npm run sitemap` after changing routes)", () => {
  const xml = readFileSync(join(import.meta.dirname, "..", "public", "sitemap.xml"), "utf8");
  const locs = [...xml.matchAll(/<loc>https:\/\/paperwarefactory\.com([^<]*)<\/loc>/g)].map((m) => m[1]).sort();
  const expected = ROUTES.filter((r) => !r.noindex).map((r) => r.path).sort();
  assert.deepEqual(locs, expected);
});

test("page surfaces: light by default, dark only where the page is designed dark", () => {
  assert.equal(surfaceFor("home"), "light");
  assert.equal(surfaceFor("partners"), "light");
  assert.equal(surfaceFor("career"), "light");
  assert.equal(surfaceFor("export"), "dark");
  assert.equal(surfaceFor("unknown-id"), "light");
  for (const r of ROUTES) assert.ok(r.surface === undefined || r.surface === "light" || r.surface === "dark", r.id);
});
