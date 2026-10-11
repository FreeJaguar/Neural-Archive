/**
 * Visual regression smoke test for the Neural Archive cinematic design preview.
 * The site runs locally with its real CSS, JavaScript and source assets.
 * Use only on the preview branch. Does not contact private APIs or secrets.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import assert from "node:assert/strict";

const base = "http://127.0.0.1:8765/design.html";
await mkdir("artifacts/hero-preview", { recursive: true });
const browser = await chromium.launch({ headless: true });
const scenarios = [
  { width: 1600, height: 900, id: "desktop-1600" },
  { width: 1920, height: 1080, id: "desktop-1920" },
  { width: 1366, height: 768, id: "laptop-1366" },
  { width: 390, height: 844, id: "mobile-390" },
  { width: 360, height: 740, id: "mobile-360" }
];

try {
  for (const spec of scenarios) {
    const mobile = spec.width < 690;
    const page = await browser.newPage({
      viewport: { width: spec.width, height: spec.height },
      deviceScaleFactor: 1,
      reducedMotion: "reduce"
    });
    // External fonts are decorative; the real page must remain functional offline.
    await page.route("https://fonts.googleapis.com/**", route => route.abort());
    await page.route("https://fonts.gstatic.com/**", route => route.abort());
    await page.goto(base, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.locator(".cinematic-backdrop").waitFor({ state: "visible" });
    await page.waitForFunction(() => document.querySelector(".cinematic-backdrop")?.naturalWidth > 0,
      { timeout: 8000 });
    const metrics = await page.evaluate(() => {
      const rect = selector => {
        const b = document.querySelector(selector)?.getBoundingClientRect();
        return b ? { x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom,right:b.right } : null;
      };
      return {
        viewportHeight: window.innerHeight,
        viewportWidth: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hero: rect(".hero"),
        visual: rect("#portalVisual"),
        photo: rect("#cinematicPhotograph"),
        head: rect("#cinematicHeadAnchor"),
        news: rect("#news"),
        title: rect("#heroHeading"),
        backgroundReady: document.querySelector(".cinematic-backdrop")?.naturalWidth,
        headTransform: getComputedStyle(document.querySelector(".cinematic-head-anchor")).transform,
        cubeLayerCount: document.querySelectorAll(".cinematic-layer").length,
        footerVisible: rect(".site-footer")?.y < innerHeight
      };
    });
    console.log("VISUAL_SMOKE",spec.id,JSON.stringify(metrics));
    assert.ok(metrics.backgroundReady >= 900,"Original source image is missing");
    assert.ok(metrics.hero.height >= spec.height - 1, "Hero must occupy the entire first viewport");
    assert.ok(metrics.news.y >= spec.height - 1, "News must not appear before the user scrolls");
    assert.ok(metrics.scrollWidth <= spec.width + 2, "Horizontal overflow on " + spec.id);
    assert.equal(metrics.headTransform, "none", "Person must never receive a CSS transform");
    assert.ok(metrics.cubeLayerCount >= 8,"Animated cube/panel layers have been removed");
    if (!mobile) {
      assert.ok(metrics.visual.width >= spec.width - 2,
        "Cinematic scene does not extend behind the title");
      assert.ok(metrics.photo.bottom >= metrics.hero.bottom - 30,
        "Photograph ends too early and leaves a hard bottom seam");
    }
    await page.screenshot({
      path: "artifacts/hero-preview/" + spec.id + ".png",
      fullPage: false,
      animations: "disabled"
    });
    await page.close();
  }

  const page = await browser.newPage({ viewport: {width:1600,height:900} });
  await page.goto(base, { waitUntil:"domcontentloaded",timeout:25000 });
  await page.waitForTimeout(400);
  const center = async selector => {
    const rect = await page.locator(selector).boundingBox();
    return { x:rect.x,y:rect.y,width:rect.width,height:rect.height };
  };
  const oldHead = await center("#cinematicHeadAnchor");
  const oldPhoto = await center("#cinematicPhotograph");
  const oldCube = await center(".cinematic-layer-cube");
  await page.mouse.move(1590,210);
  await page.waitForTimeout(600);
  const newHead = await center("#cinematicHeadAnchor");
  const newPhoto = await center("#cinematicPhotograph");
  const newCube = await center(".cinematic-layer-cube");
  assert.ok(Math.abs(oldHead.x - newHead.x) < .1 && Math.abs(oldHead.y - newHead.y) < .1,
    "Man's head moved with the pointer");
  assert.ok(Math.abs(oldPhoto.x - newPhoto.x) < .1 && Math.abs(oldPhoto.y - newPhoto.y) < .1,
    "The whole photo moved, including the man");
  assert.ok(Math.abs(oldCube.x - newCube.x) > 1 || Math.abs(oldCube.y-newCube.y) > 1,
    "Cube no longer reacts to the mouse");
  console.log("MOTION_SMOKE",JSON.stringify({
    headDelta:{x:newHead.x-oldHead.x,y:newHead.y-oldHead.y},
    photoDelta:{x:newPhoto.x-oldPhoto.x,y:newPhoto.y-oldPhoto.y},
    cubeDelta:{x:newCube.x-oldCube.x,y:newCube.y-oldCube.y}
  }));
  await page.locator("#portalMotionToggle").click();
  assert.equal(await page.locator("#portalMotionToggle").getAttribute("aria-pressed"),"true",
    "Pause button stopped functioning");
  await page.close();
  console.log("HERO_VISUAL_SMOKE_PASSED");
} finally {
  await browser.close();
}
