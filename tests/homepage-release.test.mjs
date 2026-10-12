import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { Script, runInNewContext } from "node:vm";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const home = read("index.html");
const preview = read("design.html");

test("production root uses approved cinematic layout instead of legacy catalog UI", () => {
  assert.match(home, /<html lang="he" dir="rtl"/);
  assert.match(home, /<section class="hero" id="home"/);
  assert.match(home, /id="cinematicPhotograph"/);
  assert.match(home, /id="portalMotionToggle"/);
  assert.match(home, /id="heroHeading"/);
  assert.match(home, /id="newsTrack"/);
  assert.match(home, /id="categoryGrid"/);
  assert.match(home, /id="toolsGrid"/);
  assert.match(home, /id="detailDialog"/);
  assert.doesNotMatch(home, /class="workspace-head"|id="toolGrid"|src="app\.js"/);
  const hero = html => html.slice(html.indexOf('<section class="hero" id="home"'),
    html.indexOf('<nav class="section-rail"'));
  assert.equal(hero(home), hero(preview), "Production visual Hero must be identical to approved Preview");
});

test("production page is publicly indexable and has correct metadata", () => {
  assert.match(home, /<title>Neural Archive \| כלי AI חינמיים, חדשות ומחקר בעברית<\/title>/);
  assert.match(home, /<meta name="robots" content="index,follow">/);
  assert.doesNotMatch(home, /noindex|nofollow[^"]*"/);
  assert.match(home, /<link rel="canonical" href="https:\/\/neural-archive-two\.vercel\.app\/">/);
  assert.match(home, /<meta name="description" content="Neural Archive:/);
  assert.match(home, /<meta property="og:url" content="https:\/\/neural-archive-two\.vercel\.app\/">/);
  assert.doesNotMatch(home, /תצוגה מקדימה/);
});

test("approved UI loads its actual animation, CSS and up-to-date shared catalog", () => {
  const paths = [
    "design.css", "compact-sections.css", "category-spacing.css", "hero-motion.css", "compact-hero.css",
    "data.js", "design.js", "hero-motion.js",
    "assets/cinematic-scene-backdrop-hq.webp",
    "assets/cinematic-cube-hq.webp", "assets/cinematic-panel-woman.webp"
  ];
  for (const path of paths) {
    assert.ok(existsSync(new URL("../" + path, import.meta.url)), "Missing resource: " + path);
    assert.ok(home.includes('"/' + path + '"'), "Homepage does not load resource: " + path);
  }
  assert.match(home, /href="\/news"/);
  assert.match(home, /id="catalog"/); // Legacy deep links remain functional.
  assert.doesNotThrow(() => new Script(read("design.js")));
  assert.doesNotThrow(() => new Script(read("hero-motion.js")));
  const sandbox = { window: {} };
  runInNewContext(read("data.js"), sandbox);
  assert.ok(sandbox.window.TOOLS.length >= 80, "Shared live catalog must not be replaced by stale preview data");
  assert.ok(sandbox.window.CATEGORIES.length >= 5);
  assert.ok(Array.isArray(sandbox.window.WATCHLIST));
});

test("home page keeps only unique ids and functional navigation destinations", () => {
  const ids = [...home.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const unique = new Set(ids);
  assert.equal(ids.length, unique.size, "Duplicate element IDs");
  for (const match of home.matchAll(/<a\b[^>]*\bhref="#([^"]+)"[^>]*>/g)) {
    assert.ok(unique.has(match[1]), "Unresolved homepage link: #" + match[1]);
  }
  assert.match(home, /class="skip-link" href="#news"/);
  assert.match(home, /id="themeToggle"/);
  assert.match(home, /id="mobileMenuToggle"/);
  assert.match(home, /id="heroSearchForm"/);
  assert.match(home, /id="openQuickSearch"/);
  assert.match(home, /id="detailDialog"/);
});
