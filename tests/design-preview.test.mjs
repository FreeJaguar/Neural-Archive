import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { Script } from "node:vm";

const read = path => readFileSync(new URL("../" + path, import.meta.url), "utf8");
const html = read("design.html");
const css = read("design.css");
const compactCss = read("compact-sections.css");
const js = read("design.js");
const data = read("data.js");
const portal = read("assets/design-portal.svg");
const portalBackdrop = read("assets/design-portal-backdrop.svg");
const heroAssets = [
  "assets/cinematic-scene-backdrop-hq.webp",
  "assets/cinematic-cube-hq.webp",
  "assets/cinematic-panel-woman.webp",
  "assets/cinematic-panel-light.webp",
  "assets/cinematic-panel-code.webp",
  "assets/cinematic-panel-mountain.webp",
  "assets/cinematic-panel-robot.webp",
  "assets/cinematic-panel-top.webp",
  "assets/cinematic-panel-top2.webp",
  "assets/cinematic-man-head-hq.webp"
];
const heroMotionCss = read("hero-motion.css");
const heroMotionJs = read("hero-motion.js");

test("preview is independent of live homepage and stays unindexed", () => {
  assert.match(html, /lang="he"\s+dir="rtl"/);
  assert.match(html, /name="robots"\s+content="noindex,nofollow"/);
  assert.match(html, /src="\/data\.js"/);
  assert.match(html, /src="\/design\.js"/);
  assert.match(html, /href="\/design\.css"/);
  assert.match(html, /src="\/assets\/cinematic-scene-backdrop-hq\.webp"/);
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

test("high-resolution photographed 2.5D art is split into real moving image layers", () => {
  assert.match(html, /id="portalVisual"/);
  assert.match(html, /id="cinematicPhotograph"/);
  assert.match(html, /id="cinematicHeadAnchor"/);
  assert.match(html, /class="cinematic-head"/);
  assert.match(html, /src="\/assets\/cinematic-scene-backdrop-hq\.webp"/);
  assert.match(html, /width="910"\s+height="636"/);
  assert.match(html, /src="\/hero-motion\.js"/);
  assert.match(html, /href="\/hero-motion\.css"/);
  assert.match(portalBackdrop, /<svg[\s>]/);
  for (const asset of heroAssets) {
    const binary = readFileSync(new URL("../" + asset, import.meta.url));
    assert.equal(binary.toString("ascii",0,4), "RIFF", asset);
    assert.equal(binary.toString("ascii",8,12), "WEBP", asset);
    assert.ok(binary.length > 1000, "Empty asset: " + asset);
    assert.ok(binary.length < 200000, "Oversized asset: " + asset);
    assert.ok(html.includes('src="/' + asset + '"'), "Missing layer image: " + asset);
  }
  const layers = ["cube","woman","light","code","mountain","robot","top","top2"];
  for (const layer of layers) {
    assert.match(html, new RegExp("cinematic-layer-" + layer + '"'));
    assert.match(heroMotionCss, new RegExp("\\.cinematic-layer-" + layer));
  }
  assert.match(html, /class="cinematic-layer-motion"/);
  assert.match(heroMotionCss, /--panels-x/);
  assert.match(heroMotionCss, /--cube-x/);
  assert.match(heroMotionCss, /@keyframes cinematic-cube-hover/);
  assert.match(heroMotionCss, /@keyframes cinematic-panel-hover/);
  assert.match(heroMotionCss, /min-height:\s*100svh/);
  assert.match(heroMotionCss, /min-height:\s*calc\(100svh - 76px\)/);
  assert.match(heroMotionCss, /top:\s*-76px/);
  assert.match(heroMotionCss, /right:\s*0;\s*width:\s*100%/);
  assert.match(heroMotionCss, /\.hero-visual#portalVisual::before/);
  assert.match(heroMotionCss, /\.hero-visual#portalVisual::after/);
  assert.match(heroMotionCss, /background: url\("\/assets\/cinematic-scene-backdrop-hq\.webp"\) right center \/ 280% auto/);
  assert.match(heroMotionCss, /height:\s*104%/);
  assert.match(heroMotionCss, /-webkit-mask-image:\s*linear-gradient/);
  assert.match(heroMotionCss, /\.cinematic-head-anchor\s*\{/);
  assert.match(heroMotionCss, /\.cinematic-head-anchor\s*\{[^}]*transform:\s*none/);
  assert.match(heroMotionJs, /body AND head are all locked in place/);
  assert.doesNotMatch(heroMotionJs, /--head-|cinematicHeadAnchor|rotateY|rotateX/);
  assert.doesNotMatch(heroMotionCss, /var\(--head-/);
  assert.match(heroMotionJs, /--cube-x/);
  assert.match(heroMotionJs, /--panels-x/);
  assert.doesNotMatch(html, /src="\/assets\/cinematic-hero\.avif"/);
  assert.doesNotMatch(html, /class="holo-cube"/);
});

test("the scene reaches the full viewport while the person stays grounded", () => {
  const desktop = heroMotionCss.slice(0, heroMotionCss.indexOf("@media(max-width:1200px)"));
  assert.match(desktop, /\.hero\s*\{[^}]*min-height:\s*100svh/);
  assert.match(desktop, /\.hero-inner\s*\{[^}]*min-height:\s*calc\(100svh - 76px\)/);
  assert.match(desktop, /\.hero-visual#portalVisual\s*\{[^}]*width:\s*100%/);
  assert.match(desktop, /\.cinematic-photograph\s*\{[^}]*height:\s*104%/);
  assert.match(desktop, /\.cinematic-photograph\s*\{[^}]*top:\s*49%/);
  assert.match(desktop, /\.cinematic-head-anchor\s*\{[^}]*transform:\s*none/);
  assert.doesNotMatch(desktop, /animation:\s*cinematic-arrival/);
  assert.match(heroMotionCss, /\.hero \{min-height:100svh\}/);
  assert.match(heroMotionCss, /min-height:calc\(100svh - 64px\)/);
  assert.match(heroMotionCss, /\.hero-visual#portalVisual::before \{display:none\}/);
  assert.match(heroMotionJs, /--cube-x/);
  assert.match(heroMotionJs, /--panels-y/);
  assert.doesNotMatch(heroMotionJs, /--scene-|--head-/);
});

test("3D pointer motion stops on reduced motion, hidden tab and user pause", () => {
  assert.doesNotThrow(() => new Script(heroMotionJs, { filename: "hero-motion.js" }));
  assert.match(heroMotionJs, /prefers-reduced-motion: reduce/);
  assert.match(heroMotionJs, /document\.visibilityState === "visible"/);
  assert.match(heroMotionJs, /IntersectionObserver/);
  assert.match(heroMotionJs, /requestAnimationFrame/);
  assert.match(heroMotionJs, /pointermove/);
  assert.match(heroMotionJs, /pointerleave/);
  assert.match(heroMotionJs, /cancelAnimationFrame/);
  assert.match(heroMotionJs, /aria-pressed/);
  assert.match(heroMotionJs, /portal-visual-paused/);
  assert.match(heroMotionCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(heroMotionCss, /portal-visual-paused/);
  assert.match(heroMotionCss, /max-width:\s*690px/);
  assert.match(html, /id="portalMotionToggle"/);
  assert.ok(!/GEMINI_API_KEY|TG_STRING_SESSION|SUPABASE_SERVICE_ROLE_KEY/.test(heroMotionJs));
});

test("news and categories are compact, responsive and visually readable", () => {
  assert.match(html, /href="\/compact-sections\.css"/);
  assert.match(compactCss, /\.news-section\s*\{/);
  assert.match(compactCss, /\.news-card\s*\{/);
  assert.match(compactCss, /height:\s*171px/);
  assert.match(compactCss, /\.news-card-content\s*\{/);
  assert.match(compactCss, /linear-gradient/);
  assert.match(compactCss, /\.news-skeleton\s*\{/);
  assert.match(compactCss, /min-height:\s*68px/);
  assert.match(compactCss, /\.categories-section\s*\{/);
  assert.match(compactCss, /\.category-card\s*\{/);
  assert.match(compactCss, /min-height:\s*104px/);
  assert.match(compactCss, /@media\s*\(max-width:\s*690px\)/);
  assert.ok(!/\.hero(?:\s|\{|\-inner|\-visual)/.test(compactCss),
    "Compact strip must not alter the cinematic Hero.");
});

test("hero headline punctuation is separated and readable at responsive sizes", () => {
  assert.match(html, /<h1 id="heroHeading">כל הכלים<span class="hero-dot">\.<\/span><br><em>בלי אותיות קטנות<span class="hero-dot">\.<\/span><\/em><\/h1>/);
  assert.match(heroMotionCss, /NEURAL HERO TYPE REFINEMENT/);
  assert.match(heroMotionCss, /margin-inline-start:\s*\.085em/);
  assert.match(heroMotionCss, /letter-spacing:\s*-\.045em/);
  assert.match(heroMotionCss, /@media \(max-width: 690px\)/);
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
