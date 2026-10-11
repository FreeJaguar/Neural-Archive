/**
 * Neural Archive - Cinematic 2.5D Hero
 *
 * The original image supplies the landscape, holographic panels, cube and
 * full figure. Only a tiny, separately cut head sprite follows the pointer.
 * Body orientation NEVER changes. This is parallax / puppet animation,
 * not a reconstructed human 3D mesh.
 */
(() => {
  "use strict";
  const visual = document.getElementById("portalVisual");
  const scene = document.getElementById("portalScene");
  const photo = document.getElementById("cinematicPhotograph");
  const head = document.getElementById("cinematicHeadAnchor");
  const toggle = document.getElementById("portalMotionToggle");
  const hero = document.getElementById("home");
  if (!visual || !scene || !photo || !head || !toggle || !hero) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const preferenceKey = "neural-archive-hero-motion-paused";
  let userPaused = false;
  try { userPaused = localStorage.getItem(preferenceKey) === "true"; } catch { /* private mode */ }

  let inView = true;
  let enabled = false;
  let request = 0;
  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const lerp = (a, b, speed) => a + (b - a) * speed;

  const clearMotion = () => {
    current.x = current.y = target.x = target.y = 0;
    for (const [name, value] of [
      ["--scene-x", "0px"], ["--scene-y", "0px"],
      ["--lens-x", "0px"], ["--lens-y", "0px"],
      ["--head-x", "0px"], ["--head-y", "0px"],
      ["--head-rx", "0deg"], ["--head-ry", "0deg"]
    ]) scene.style.setProperty(name, value);
  };

  const shouldAnimate = () =>
    !reduced.matches &&
    !userPaused &&
    inView &&
    document.visibilityState === "visible";

  const renderFrame = () => {
    request = 0;
    if (!enabled) return;

    current.x = lerp(current.x, target.x, 0.075);
    current.y = lerp(current.y, target.y, 0.075);

    // Physical background movement is deliberately much smaller than the
    // panel motion so the original photographic geometry remains intact.
    scene.style.setProperty("--scene-x", (current.x * 4).toFixed(2) + "px");
    scene.style.setProperty("--scene-y", (current.y * 2.5).toFixed(2) + "px");
    scene.style.setProperty("--lens-x", (-current.x * 5).toFixed(2) + "px");
    scene.style.setProperty("--lens-y", (-current.y * 4).toFixed(2) + "px");

    // Head crop is 21x21 pixels in the 570x301 original scene. Convert to
    // screen pixels; max translation is ~2 source pixels horizontally.
    const scale = clamp(photo.getBoundingClientRect().width / 570, .5, 3);
    scene.style.setProperty("--head-x", (current.x * scale * 1.8).toFixed(2) + "px");
    scene.style.setProperty("--head-y", (current.y * scale * 1.0).toFixed(2) + "px");
    scene.style.setProperty("--head-ry", (current.x * 5).toFixed(2) + "deg");
    scene.style.setProperty("--head-rx", (-current.y * 3.2).toFixed(2) + "deg");

    if (Math.abs(target.x - current.x) > .005 ||
        Math.abs(target.y - current.y) > .005) {
      request = requestAnimationFrame(renderFrame);
    }
  };

  const schedule = () => {
    if (enabled && finePointer.matches && !request) request = requestAnimationFrame(renderFrame);
  };

  const resetPointer = () => {
    target.x = 0;
    target.y = 0;
    schedule();
  };

  const onPointer = event => {
    if (!enabled || !finePointer.matches || event.pointerType === "touch") return;
    const box = hero.getBoundingClientRect();
    if (!box.width || !box.height) return;
    target.x = clamp(2 * (event.clientX - box.left) / box.width - 1, -1, 1);
    target.y = clamp(2 * (event.clientY - box.top) / box.height - 1, -1, 1);
    schedule();
  };

  const sync = () => {
    enabled = shouldAnimate();
    visual.classList.toggle("portal-visual-paused", !enabled);

    const explicitPause = userPaused || reduced.matches;
    const label = toggle.querySelector(".portal-toggle-label");
    const icon = toggle.querySelector(".portal-toggle-icon");
    toggle.disabled = reduced.matches;
    toggle.setAttribute("aria-pressed", String(explicitPause));
    toggle.setAttribute("aria-label", reduced.matches
      ? "התנועה נעצרה בהתאם להגדרות הנגישות במכשיר"
      : userPaused ? "הפעלת התנועה" : "עצירת התנועה");
    toggle.title = reduced.matches ? "אנימציות כבויות לפי הגדרת הפחתת תנועה"
      : userPaused ? "הפעלת האנימציה" : "עצירת האנימציה";
    if (label) label.textContent = reduced.matches ? "תנועה מופחתת"
      : userPaused ? "הפעלת תנועה" : "עצירת תנועה";
    if (icon) icon.textContent = explicitPause ? "▶" : "Ⅱ";

    if (!enabled || !finePointer.matches) {
      if (request) cancelAnimationFrame(request);
      request = 0;
      clearMotion();
    }
  };

  toggle.addEventListener("click", () => {
    if (reduced.matches) return;
    userPaused = !userPaused;
    try { localStorage.setItem(preferenceKey, String(userPaused)); } catch { /* optional */ }
    sync();
  });

  hero.addEventListener("pointermove", onPointer, { passive: true });
  hero.addEventListener("pointerleave", resetPointer, { passive: true });
  window.addEventListener("blur", resetPointer);
  window.addEventListener("resize", schedule, { passive: true });
  document.addEventListener("visibilitychange", sync);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      sync();
    }, { threshold: .02 });
    observer.observe(visual);
  }

  reduced.addEventListener?.("change", sync);
  finePointer.addEventListener?.("change", sync);
  clearMotion();
  sync();
})();
