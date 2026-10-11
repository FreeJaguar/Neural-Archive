/**
 * Browser-level validation for Neural Archive's isolated /design preview.
 * The visual QA checks geometry, image loading, 2.5D movement, motion pause,
 * accessibility preferences, responsive overflow and takes review screenshots.
 * No production credentials, APIs or database writes are involved.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const origin = process.env.DESIGN_TEST_ORIGIN || "http://127.0.0.1:4173";
const output = process.env.DESIGN_QA_OUTPUT || "design-qa-artifacts";
fs.mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];
async function run(name, fn) {
  try {
    await fn();
    console.log("PASS", name);
    results.push({ name, ok: true });
  } catch (error) {
    console.error("FAIL", name, error?.stack || String(error));
    results.push({ name, ok: false });
  }
}
async function newPage(width, height, reducedMotion = "no-preference") {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    locale: "he-IL",
    reducedMotion,
    colorScheme: "dark"
  });
  const page = await context.newPage();
  await page.route("**/api/news**", route => route.fulfill({
    status: 200, contentType: "application/json",
    body: JSON.stringify({ items: [] })
  }));
  await page.goto(origin + "/design.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector(".cinematic-layer-cube img");
  await page.evaluate(async () => {
    const assets = [...document.querySelectorAll(
      ".cinematic-photograph img"
    )];
    await Promise.all(assets.map(img => img.decode()));
  });
  return { page, context };
}
try {
  const { page, context } = await newPage(1600, 900);
  await run("All high-resolution scene layers load", async () => {
    const images = await page.locator(".cinematic-photograph img").evaluateAll(items =>
      items.map(img => ({
        url: img.getAttribute("src"),
        loaded: img.complete && img.naturalWidth > 0,
        width: img.naturalWidth,
        height: img.naturalHeight
      }))
    );
    assert.equal(images.length, 10);
    assert.ok(images.every(image => image.loaded), JSON.stringify(images));
    const background = images.find(img => img.url?.includes("backdrop-hq.webp"));
    assert.equal(background.width, 910);
    assert.equal(background.height, 636);
  });

  await run("Desktop hero is immersive, not a small thumbnail", async () => {
    const geometry = await page.evaluate(() => {
      const bounds = selector => {
        const e = document.querySelector(selector);
        const b = e.getBoundingClientRect();
        return { x:b.x, y:b.y, width:b.width, height:b.height };
      };
      return {
        hero:bounds(".hero"),
        visual:bounds("#portalVisual"),
        photograph:bounds("#cinematicPhotograph"),
        heading:bounds("#heroHeading")
      };
    });
    assert.ok(geometry.hero.height > 720, JSON.stringify(geometry));
    assert.ok(geometry.visual.width >= 900, JSON.stringify(geometry));
    assert.ok(geometry.visual.height >= 650, JSON.stringify(geometry));
    assert.ok(geometry.photograph.width >= 950, JSON.stringify(geometry));
    assert.ok(geometry.photograph.height >= 650, JSON.stringify(geometry));
    assert.ok(geometry.heading.width > 420, JSON.stringify(geometry));
    fs.writeFileSync(path.join(output, "desktop-geometry.json"), JSON.stringify(geometry,null,2));
  });

  await run("Independent cube and panel animations are active", async () => {
    const animation = await page.evaluate(() => ({
      cube:getComputedStyle(document.querySelector(".cinematic-layer-cube .cinematic-layer-motion")).animationName,
      woman:getComputedStyle(document.querySelector(".cinematic-layer-woman .cinematic-layer-motion")).animationName,
      mountain:getComputedStyle(document.querySelector(".cinematic-layer-mountain .cinematic-layer-motion")).animationName
    }));
    assert.equal(animation.cube,"cinematic-cube-hover");
    assert.equal(animation.woman,"cinematic-panel-hover");
    assert.equal(animation.mountain,"cinematic-panel-hover");
  });
  await page.mouse.move(150, 240);
  await page.waitForTimeout(440);
  await run("Mouse moves the real cube, cards and head independently", async () => {
    const vars = await page.locator("#portalScene").evaluate(scene => {
      const css = getComputedStyle(scene);
      return {
        cube:css.getPropertyValue("--cube-x").trim(),
        panels:css.getPropertyValue("--panels-x").trim(),
        head:css.getPropertyValue("--head-ry").trim()
      };
    });
    assert.notEqual(vars.cube,"0px", JSON.stringify(vars));
    assert.notEqual(vars.panels,"0px", JSON.stringify(vars));
    assert.notEqual(vars.head,"0deg", JSON.stringify(vars));
  });
  await page.screenshot({path:path.join(output,"hero-desktop.png"),fullPage:false});
  await run("Pause button stops cube/panel motion and supports resume", async () => {
    const toggle = page.locator("#portalMotionToggle");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-pressed"),"true");
    const state = await page.locator(".cinematic-layer-cube .cinematic-layer-motion")
      .evaluate(el => getComputedStyle(el).animationPlayState);
    assert.equal(state,"paused");
    await toggle.click();
    assert.equal(await toggle.getAttribute("aria-pressed"),"false");
  });
  await context.close();

  const {page:mobile,context:mobileContext} = await newPage(390,844);
  await run("Mobile visual remains large and no sideways overflow", async () => {
    const geometry = await mobile.evaluate(() => {
      const a=document.querySelector("#portalVisual").getBoundingClientRect();
      return {
        innerWidth:window.innerWidth,
        scrollWidth:document.documentElement.scrollWidth,
        visualWidth:a.width,
        visualHeight:a.height,
        photographOpacity:getComputedStyle(document.querySelector(".cinematic-photograph")).opacity
      };
    });
    assert.ok(geometry.visualWidth >= 360,JSON.stringify(geometry));
    assert.ok(geometry.visualHeight >= 290,JSON.stringify(geometry));
    assert.ok(Number(geometry.photographOpacity) > .95, "Mobile hero must be visible on first frame: "+JSON.stringify(geometry));
    assert.ok(geometry.scrollWidth <= geometry.innerWidth+2,JSON.stringify(geometry));
  });
  await mobile.screenshot({path:path.join(output,"hero-mobile.png"),fullPage:false});
  await mobileContext.close();

  const {page:reducedPage,context:reducedContext} = await newPage(1600,900,"reduce");
  await run("Reduced-motion user has a static but visible hero", async () => {
    const state=await reducedPage.evaluate(() => ({
      disabled:document.querySelector("#portalMotionToggle").disabled,
      animation:getComputedStyle(document.querySelector(".cinematic-layer-cube .cinematic-layer-motion")).animationName,
      opacity:getComputedStyle(document.querySelector(".cinematic-photograph")).opacity
    }));
    assert.equal(state.disabled,true);
    assert.equal(state.animation,"none");
    assert.ok(Number(state.opacity)>.9);
  });
  await reducedContext.close();
} finally {
  await browser.close();
}
const fails=results.filter(x=>!x.ok);
console.log(results.length,"checks",fails.length,"failures");
if (fails.length) process.exitCode=1;
