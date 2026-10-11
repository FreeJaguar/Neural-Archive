/**
 * Neural Archive | Living AI Portal
 * Motion is progressive enhancement only: no frameworks, no canvas,
 * no WebGL, no remote assets. Scene is fully visible without JavaScript.
 */
(() => {
  "use strict";

  const visual = document.getElementById("portalVisual");
  const scene = document.getElementById("portalScene");
  const tilt = document.getElementById("portalTilt");
  const toggle = document.getElementById("portalMotionToggle");
  const hero = document.getElementById("home");
  if (!visual || !scene || !tilt || !toggle || !hero) return;

  const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  const motionKey = "neural-archive-hero-motion-paused";
  let pausedByUser = false;
  try {
    pausedByUser = window.localStorage.getItem(motionKey) === "true";
  } catch {
    /* Private browsing or restricted storage must not break motion. */
  }

  let visible = true;
  let running = false;
  let frame = 0;

  const current = { x: 0, y: 0 };
  const target = { x: 0, y: 0 };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (from, to, factor) => from + (to - from) * factor;

  const clearTransforms = () => {
    current.x = current.y = target.x = target.y = 0;
    tilt.style.setProperty("--tilt-x", "0deg");
    tilt.style.setProperty("--tilt-y", "0deg");
    scene.style.setProperty("--back-x", "0px");
    scene.style.setProperty("--back-y", "0px");
    scene.style.setProperty("--card-x", "0px");
    scene.style.setProperty("--card-y", "0px");
  };

  const isRunning = () => (
    !motionMedia.matches &&
    !pausedByUser &&
    visible &&
    document.visibilityState === "visible"
  );

  const repaint = () => {
    frame = 0;
    if (!running) return;

    current.x = lerp(current.x, target.x, .085);
    current.y = lerp(current.y, target.y, .085);
    tilt.style.setProperty("--tilt-x", (-current.y * 6).toFixed(2) + "deg");
    tilt.style.setProperty("--tilt-y", (current.x * 9).toFixed(2) + "deg");
    scene.style.setProperty("--back-x", (-current.x * 11).toFixed(2) + "px");
    scene.style.setProperty("--back-y", (-current.y * 8).toFixed(2) + "px");
    scene.style.setProperty("--card-x", (current.x * 8).toFixed(2) + "px");
    scene.style.setProperty("--card-y", (current.y * 6).toFixed(2) + "px");

    if (Math.abs(target.x - current.x) > .004 ||
        Math.abs(target.y - current.y) > .004) {
      frame = requestAnimationFrame(repaint);
    }
  };

  const queueFrame = () => {
    if (running && pointerMedia.matches && !frame) {
      frame = requestAnimationFrame(repaint);
    }
  };

  const syncState = () => {
    running = isRunning();
    visual.classList.toggle("portal-visual-paused", !running);
    const explicitPause = pausedByUser || motionMedia.matches;

    toggle.setAttribute("aria-pressed", String(explicitPause));
    toggle.disabled = motionMedia.matches;
    toggle.setAttribute("aria-label", motionMedia.matches
      ? "האנימציה נעצרה בהתאם להגדרות הנגישות של המכשיר"
      : pausedByUser ? "הפעלת האנימציה" : "עצירת האנימציה");
    toggle.title = motionMedia.matches
      ? "אנימציות כבויות לפי הגדרת הפחתת תנועה במכשיר"
      : pausedByUser ? "הפעלת תנועת התלת־ממד" : "עצירת תנועת התלת־ממד";

    const label = toggle.querySelector(".portal-toggle-label");
    const symbol = toggle.querySelector(".portal-toggle-icon");
    if (label) label.textContent = motionMedia.matches
      ? "תנועה מופחתת" : pausedByUser ? "הפעלת תנועה" : "עצירת תנועה";
    if (symbol) symbol.textContent = explicitPause ? "▶" : "Ⅱ";

    if (!running || !pointerMedia.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      clearTransforms();
    }
  };

  const pointerMove = event => {
    if (!running || !pointerMedia.matches) return;
    const bounds = hero.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    target.x = clamp(((event.clientX - bounds.left) / bounds.width - .5) * 2, -1, 1);
    target.y = clamp(((event.clientY - bounds.top) / bounds.height - .5) * 2, -1, 1);
    queueFrame();
  };

  const pointerLeave = () => {
    target.x = target.y = 0;
    queueFrame();
  };

  const setUserPaused = paused => {
    pausedByUser = paused;
    try {
      window.localStorage.setItem(motionKey, String(paused));
    } catch {
      /* Preferences are best-effort only. */
    }
    syncState();
  };

  toggle.addEventListener("click", () => {
    if (!motionMedia.matches) setUserPaused(!pausedByUser);
  });
  hero.addEventListener("pointermove", pointerMove, { passive: true });
  hero.addEventListener("pointerleave", pointerLeave, { passive: true });
  window.addEventListener("blur", pointerLeave);
  document.addEventListener("visibilitychange", syncState);

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries.some(entry => entry.isIntersecting);
      syncState();
    }, { threshold: .05 });
    observer.observe(visual);
  }

  const changeMotion = () => syncState();
  motionMedia.addEventListener?.("change", changeMotion);
  pointerMedia.addEventListener?.("change", changeMotion);

  syncState();
})();
