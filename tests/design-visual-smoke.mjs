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
async function newPage(width, height, reducedMotion = "no-preference", route = "/design.html") {
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
  await page.goto(origin + route, { waitUntil: "domcontentloaded" });
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

  await run("Compact desktop hero reveals the next sections without losing full-bleed art", async () => {
    const geometry = await page.evaluate(() => {
      const bounds = selector => {
        const e = document.querySelector(selector);
        const b = e.getBoundingClientRect();
        return { x:b.x, y:b.y, width:b.width, height:b.height, right:b.right, bottom:b.bottom };
      };
      return {
        hero:bounds(".hero"),
        header:bounds(".site-header"),
        visual:bounds("#portalVisual"),
        photograph:bounds("#cinematicPhotograph"),
        copy:bounds(".hero-copy"),
        heading:bounds("#heroHeading"),
        search:bounds("#heroSearchForm"),
        cta:bounds(".hero-cta-row"),
        news:bounds("#news"),
        categories:bounds("#categories"),
        tools:bounds("#tools"),
        scrollWidth:document.documentElement.scrollWidth,
        viewport:window.innerWidth
      };
    });
    assert.ok(geometry.hero.height >= 360 && geometry.hero.height <= 490, JSON.stringify(geometry));
    assert.ok(Math.abs(geometry.news.y - geometry.hero.bottom) <= 2, JSON.stringify(geometry));
    assert.ok(geometry.news.y < 500, "News should appear in the opening viewport: "+JSON.stringify(geometry));
    assert.ok(geometry.visual.width >= 1598, "Full-bleed art must span both columns: "+JSON.stringify(geometry));
    assert.ok(geometry.visual.height >= 360 && geometry.visual.height <= 490, JSON.stringify(geometry));
    assert.ok(geometry.photograph.width >= 540, JSON.stringify(geometry));
    assert.ok(geometry.photograph.bottom >= geometry.hero.bottom - 30, JSON.stringify(geometry));
    assert.ok(geometry.heading.width > 400, JSON.stringify(geometry));
    assert.ok(geometry.copy.y >= geometry.header.bottom - 8, "Heading overlaps navigation: "+JSON.stringify(geometry));
    assert.ok(geometry.cta.bottom <= geometry.hero.bottom - 6, "Hero CTA was clipped: "+JSON.stringify(geometry));
    assert.ok(geometry.scrollWidth <= geometry.viewport + 2, "Unexpected horizontal scroll: "+JSON.stringify(geometry));
    assert.ok(geometry.categories.y < 850, "Compact news strip should reveal categories: "+JSON.stringify(geometry));
    fs.writeFileSync(path.join(output, "desktop-geometry.json"), JSON.stringify(geometry,null,2));
  });

  await run("Category cards have breathing room inside the dark ribbon", async () => {
    const spacing = await page.evaluate(() => {
      const region = document.querySelector(".categories-section");
      const heading = region.querySelector(".section-title-group");
      const grid = region.querySelector(".category-grid");
      const card = region.querySelector(".category-card:not(.selected)");
      const bounds = element => element.getBoundingClientRect();
      const css = getComputedStyle(region);
      const cardStyle = getComputedStyle(card);
      return {
        paddingTop: parseFloat(css.paddingTop),
        paddingBottom: parseFloat(css.paddingBottom),
        headerGap: bounds(grid).top - bounds(heading).bottom,
        bottomGap: bounds(region).bottom - bounds(card).bottom,
        cardHeight: bounds(card).height,
        cardPaddingTop: parseFloat(cardStyle.paddingTop),
        cardPaddingBottom: parseFloat(cardStyle.paddingBottom),
        cardCount: region.querySelectorAll(".category-card").length,
        sectionHeight: bounds(region).height
      };
    });
    console.log("CATEGORY_RIBBON_SPACING", JSON.stringify(spacing));
    assert.equal(spacing.cardCount,6);
    assert.ok(spacing.paddingTop >= 20,JSON.stringify(spacing));
    assert.ok(spacing.paddingBottom >= 24,JSON.stringify(spacing));
    assert.ok(spacing.headerGap >= 16,JSON.stringify(spacing));
    assert.ok(spacing.cardHeight >= 107,JSON.stringify(spacing));
    assert.ok(spacing.cardPaddingTop >= 13 && spacing.cardPaddingBottom >= 13,JSON.stringify(spacing));
    assert.ok(spacing.bottomGap >= 23,JSON.stringify(spacing));
    assert.ok(spacing.sectionHeight >= 225 && spacing.sectionHeight < 285, "Category ribbon should feel airy without becoming oversized: "+JSON.stringify(spacing));
    fs.writeFileSync(path.join(output,"category-ribbon-spacing.json"),JSON.stringify(spacing,null,2));
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
  const headBefore = await page.locator("#cinematicHeadAnchor").boundingBox();
  const photoBefore = await page.locator("#cinematicPhotograph").boundingBox();
  await page.mouse.move(150, 240);
  await page.waitForTimeout(440);
  await run("Mouse moves cube and panels without moving the person", async () => {
    const vars = await page.locator("#portalScene").evaluate(scene => {
      const css = getComputedStyle(scene);
      return {
        cube:css.getPropertyValue("--cube-x").trim(),
        panels:css.getPropertyValue("--panels-x").trim(),
        headTransform:getComputedStyle(document.querySelector("#cinematicHeadAnchor")).transform,
        personVariables:["--head-x","--head-y","--head-rx","--head-ry"].map(key => css.getPropertyValue(key).trim())
      };
    });
    const headAfter = await page.locator("#cinematicHeadAnchor").boundingBox();
    const photoAfter = await page.locator("#cinematicPhotograph").boundingBox();
    assert.notEqual(vars.cube,"0px", JSON.stringify(vars));
    assert.notEqual(vars.panels,"0px", JSON.stringify(vars));
    assert.equal(vars.headTransform,"none",JSON.stringify(vars));
    assert.ok(vars.personVariables.every(value => !value),"Head tracking variables must not exist");
    assert.ok(Math.abs(headAfter.x-headBefore.x)<.1 && Math.abs(headAfter.y-headBefore.y)<.1,
      "Head unexpectedly moved");
    assert.ok(Math.abs(photoAfter.x-photoBefore.x)<.1 && Math.abs(photoAfter.y-photoBefore.y)<.1,
      "Entire photograph unexpectedly moved");
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
  await page.locator("#categories").scrollIntoViewIfNeeded();
  await page.screenshot({path:path.join(output,"categories-spacing-desktop.png"),fullPage:false});
  await context.close();

  const {page:referencePage,context:referenceContext} = await newPage(1755,827);
  await run("Reference screenshot: categories end near the bottom of the first fold", async () => {
    const geometry = await referencePage.evaluate(() => {
      const rect = selector => {
        const b=document.querySelector(selector).getBoundingClientRect();
        return {y:b.y,bottom:b.bottom,height:b.height,width:b.width};
      };
      return {
        viewportHeight:innerHeight,
        viewportWidth:innerWidth,
        hero:rect(".hero"),
        news:rect("#news"),
        categories:rect("#categories"),
        tools:rect("#tools"),
        cta:rect(".hero-cta-row"),
        visual:rect("#portalVisual"),
        scrollWidth:document.documentElement.scrollWidth
      };
    });
    console.log("FOLD_1755x827",JSON.stringify(geometry));
    fs.writeFileSync(path.join(output,"reference-fold-1755x827.json"),JSON.stringify(geometry,null,2));
    assert.ok(geometry.hero.height >= 435 && geometry.hero.height <= 455,JSON.stringify(geometry));
    assert.ok(geometry.news.y < 470, "News should remain visible: "+JSON.stringify(geometry));
    assert.ok(geometry.categories.y < geometry.viewportHeight-90, "Categories should be visible, not only starting at the bottom: "+JSON.stringify(geometry));
    assert.ok(geometry.tools.y >= geometry.viewportHeight-100 && geometry.tools.y <= geometry.viewportHeight+120,
      "Category ribbon should roughly meet the lower edge: "+JSON.stringify(geometry));
    assert.ok(geometry.cta.bottom < geometry.hero.bottom-5, "Hero actions clipped: "+JSON.stringify(geometry));
    assert.ok(geometry.visual.width >= geometry.viewportWidth-2, "Lost full-bleed art: "+JSON.stringify(geometry));
    assert.ok(geometry.scrollWidth <= geometry.viewportWidth+2, "Horizontal overflow: "+JSON.stringify(geometry));
  });
  await referencePage.screenshot({path:path.join(output,"hero-reference-1755x827.png"),fullPage:false});
  await referenceContext.close();

  const {page:laptop,context:laptopContext} = await newPage(1366,768);
  await run("Laptop-size first fold matches compact mockup without clipped controls", async () => {
    const metric = await laptop.evaluate(() => {
      const rect = selector => {
        const b = document.querySelector(selector).getBoundingClientRect();
        return { x:b.x, y:b.y, width:b.width, height:b.height, bottom:b.bottom };
      };
      return {
        hero:rect(".hero"),
        header:rect(".site-header"),
        title:rect("#heroHeading"),
        search:rect("#heroSearchForm"),
        cta:rect(".hero-cta-row"),
        news:rect("#news"),
        categories:rect("#categories"),
        scrollWidth:document.documentElement.scrollWidth
      };
    });
    assert.ok(metric.hero.height >= 410 && metric.hero.height <= 455, JSON.stringify(metric));
    assert.ok(metric.news.y < 465, "The news strip should be above the fold: "+JSON.stringify(metric));
    assert.ok(metric.cta.bottom <= metric.hero.bottom - 5, "Laptop actions are clipped: "+JSON.stringify(metric));
    assert.ok(metric.title.y >= metric.header.bottom - 3, "Headline collides with navbar: "+JSON.stringify(metric));
    assert.ok(metric.scrollWidth <= 1368, "Horizontal page overflow: "+JSON.stringify(metric));
    assert.ok(metric.categories.y < 768, "Category heading should appear in opening laptop viewport: "+JSON.stringify(metric));
    fs.writeFileSync(path.join(output, "laptop-geometry.json"), JSON.stringify(metric,null,2));
  });
  await laptop.screenshot({path:path.join(output,"hero-laptop.png"),fullPage:false});
  await laptopContext.close();

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
  // Test the real index.html, not just the approved /design preview.
  const {page:live,context:liveContext} = await newPage(1600,900,"no-preference","/");
  await run("Production homepage matches approved cinematic preview and uses live catalog", async () => {
    const state = await live.evaluate(() => {
      const rect = sel => document.querySelector(sel)?.getBoundingClientRect();
      const hero = rect(".hero"), news = rect("#news"), visual = rect("#portalVisual");
      return {
        title:document.title,
        robots:document.querySelector('meta[name="robots"]')?.content,
        canonical:document.querySelector('link[rel="canonical"]')?.href,
        heroHeight:hero?.height,
        heroWidth:hero?.width,
        newsStart:news?.top,
        visualWidth:visual?.width,
        toolCount:window.TOOLS?.length,
        displayedCount:document.querySelector("#heroCount")?.textContent,
        categoryTiles:document.querySelectorAll(".category-card").length,
        horizontalScroll:document.documentElement.scrollWidth
      };
    });
    assert.match(state.title,/Neural Archive/);
    assert.equal(state.robots,"index,follow");
    assert.equal(state.canonical,"https://neural-archive-two.vercel.app/");
    assert.ok(state.heroHeight >= 430 && state.heroHeight < 570,JSON.stringify(state));
    assert.ok(state.visualWidth >= 1598,JSON.stringify(state));
    assert.ok(state.newsStart < 570,JSON.stringify(state));
    assert.ok(state.toolCount >= 40,JSON.stringify(state));
    assert.equal(Number(state.displayedCount),state.toolCount,JSON.stringify(state));
    assert.equal(state.categoryTiles,6,JSON.stringify(state));
    assert.ok(state.horizontalScroll <= 1602,JSON.stringify(state));
    fs.writeFileSync(path.join(output,"production-home-geometry.json"),JSON.stringify(state,null,2));
  });
  await live.screenshot({path:path.join(output,"hero-production-home.png"),fullPage:false});
  await run("Production search and tool modal remain functional", async () => {
    await live.locator("#heroSearchInput").fill("Claude");
    await live.locator("#heroSearchForm button[type=submit]").click();
    await live.waitForTimeout(120);
    const found = Number(await live.locator("#visibleCount").innerText());
    const total = await live.evaluate(() => window.TOOLS.length);\n    assert.ok(found > 0 && found < total,"Search should filter to Claude tools: "+found);
    await live.locator(".tool-open").first().click();
    assert.ok(await live.locator("#detailDialog").evaluate(dialog=>dialog.open),"Tool detail modal must open");
    await live.locator("#closeDetail").click();
    assert.ok(!(await live.locator("#detailDialog").evaluate(dialog=>dialog.open)),"Tool detail modal must close");
  });
  await run("Production dark mode toggle is accessible", async () => {
    const button=live.locator("#themeToggle");
    const before=await live.locator("html").getAttribute("data-theme");
    await button.click();
    const after=await live.locator("html").getAttribute("data-theme");
    assert.notEqual(after,before);
    await button.click();
  });
  await liveContext.close();
  const {page:liveMobile,context:liveMobileContext} = await newPage(390,844,"reduce","/");
  await run("Production mobile homepage is readable without sideways scrolling", async () => {
    const metrics=await liveMobile.evaluate(()=>({
      viewport:innerWidth,
      scrollWidth:document.documentElement.scrollWidth,
      heroWidth:document.querySelector(".hero").getBoundingClientRect().width,
      visualWidth:document.querySelector("#portalVisual").getBoundingClientRect().width,
      count:document.querySelectorAll(".category-card").length
    }));
    assert.ok(metrics.scrollWidth <= metrics.viewport+2,JSON.stringify(metrics));
    assert.ok(metrics.heroWidth <= metrics.viewport+2,JSON.stringify(metrics));
    assert.equal(metrics.count,6);
  });
  await liveMobileContext.close();
} finally {
  await browser.close();
}
const fails=results.filter(x=>!x.ok);
console.log(results.length,"checks",fails.length,"failures");
if (fails.length) process.exitCode=1;
