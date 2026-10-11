import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Script } from "node:vm";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const html = read("design.html");
const css = read("design.css");
const js = read("design.js");
const data = read("data.js");
const portal = read("assets/design-portal.svg");

test("preview is independent of live homepage and stays unindexed", () => {
  assert.match(html, /lang="he"\s+dir="rtl"/);
  assert.match(html, /name="robots"\s+content="noindex,nofollow"/);
  assert.match(html, /src="\/data\.js"/);
  assert.match(html, /src="\/design\.js"/);
  assert.match(html, /href="\/design\.css"/);
  assert.match(html, /href="\/assets\/design-portal\.svg"/);
  assert.match(portal, /<svg[\s>]/);
  assert.ok(!html.includes("SUPABASE_SERVICE_ROLE_KEY"));
  assert.ok(!html.includes("TG_STRING_SESSION"));
});

test("javascript parses and includes only public data integrations", () => {
  assert.doesNotThrow(() => new Script(js, { filename: "design.js" }));
  assert.match(js, /\/api\/news\?limit=20/);
  assert.match(js, /window\.TOOLS/);
  assert.match(js, /window\.CATEGORIES/);
  assert.match(js, /window\.WATCHLIST/);
  assert.match(data, /window\.TOOLS\s*=/);
  assert.match(data, /window\.CATEGORIES\s*=/);
  assert.ok(!/TG_API_HASH|GEMINI_API_KEY|SUPABASE_SERVICE_ROLE_KEY/.test(js));
});

test("interactive controls and internal section links have matching ids", () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const id of [
    "themeToggle", "heroSearchForm", "heroSearchInput", "openQuickSearch", "toolsGrid",
    "categoryGrid", "toolTabs", "toolSort", "loadMore", "favoritesOnly", "newsTrack",
    "newsPrev", "newsNext", "detailDialog", "closeDetail", "detailContent", "watchCards"
  ]) assert.ok(ids.has(id), "Missing expected control: " + id);
  for (const match of html.matchAll(/<a\b[^>]*\bhref="#([^"]+)"[^>]*>/g)) {
    assert.ok(ids.has(match[1]), "Broken internal navigation: #" + match[1]);
  }
  assert.match(html, /aria-labelledby="detailTitle"/);
  assert.match(html, /aria-live="polite"/);
  assert.match(html, /class="skip-link"/);
});

test("light and dark modes, motion accessibility and mobile layouts exist", () => {
  assert.match(css, /:root\[data-theme="dark"\]/);
  assert.match(css, /@media\(max-width:690px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
  assert.match(js, /na-theme/);
  assert.match(js, /localStorage/);
  assert.match(js, /IntersectionObserver/);
  assert.match(js, /showModal\(\)/);
  assert.match(js, /aria-pressed/);
  assert.match(js, /event\.ctrlKey \|\| event\.metaKey/);
});

test("news cards reflect approved API content and never fake headlines or rankings", () => {
  assert.ok(!html.includes("GPT-5 הושק"));
  assert.ok(!html.includes("12.4K"));
  assert.match(js, /state\.news = Array\.isArray\(result\.items\)/);
  assert.match(js, /html\(item\.title\)/);
  assert.match(js, /html\(item\.summary\)/);
  assert.match(js, /isUrl\(url\)/);
  assert.match(js, /noopener noreferrer/);
});

test("catalog cards surface actual limitations, sources and valid free-plan terms", () => {
  assert.match(js, /html\(tool\.free\)/);
  assert.match(js, /html\(tool\.limits\)/);
  assert.match(js, /tool\.sources/);
  assert.match(js, /favorites\.has\(tool\.slug\)/);
  assert.match(js, /filter\(tool =>/);
  assert.match(js, /tool\.category === state\.category/);
});
