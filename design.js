/* Neural Archive cinematic preview. No credentials or server-side logic. */
(() => {
  "use strict";
  const TOOLS = Array.isArray(window.TOOLS) ? window.TOOLS : [];
  const CATEGORIES = Array.isArray(window.CATEGORIES) ? window.CATEGORIES : [];
  const WATCHLIST = Array.isArray(window.WATCHLIST) ? window.WATCHLIST : [];
  const categoryMap = new Map(CATEGORIES.map(item => [item.id, item]));
  const state = { category: "all", query: "", sort: "newest", favoritesOnly: false, visible: 12, news: [], newsLoaded: false, newsIndex: 0 };
  const $ = selector => document.querySelector(selector);
  const els = {
    header: $(".site-header"), scroll: $("#scrollFill"), theme: $("#themeToggle"),
    mobileMenu: $("#mobileMenuToggle"), mobileNav: $("#mobileNav"),
    heroSearch: $("#heroSearchInput"), heroForm: $("#heroSearchForm"),
    newsTrack: $("#newsTrack"), newsPrev: $("#newsPrev"), newsNext: $("#newsNext"), newsDots: $("#newsDots"),
    categoryGrid: $("#categoryGrid"), topics: $("#heroTopics"), tabs: $("#toolTabs"),
    toolsGrid: $("#toolsGrid"), empty: $("#toolsEmpty"), loadMore: $("#loadMore"),
    visibleCount: $("#visibleCount"), searchStatus: $("#activeSearch"), sort: $("#toolSort"),
    favoritesOnly: $("#favoritesOnly"), watchCards: $("#watchCards"),
    detail: $("#detailDialog"), detailContent: $("#detailContent"), toast: $("#toast")
  };
  const color = category => /^#[0-9a-f]{6}$/i.test(categoryMap.get(category)?.color || "")
    ? categoryMap.get(category).color : "#71bdfd";
  const html = value => String(value ?? "").replace(/[&<>"']/g, char =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const text = value => String(value ?? "").trim();
  const icon = name => '<svg aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  const isUrl = candidate => {
    try {
      const uri = new URL(candidate);
      return ["https:", "http:"].includes(uri.protocol) && !!uri.hostname && !uri.username && !uri.password;
    } catch { return false; }
  };
  const host = value => {
    try { return new URL(value).hostname.replace(/^www\./, ""); } catch { return ""; }
  };
  const date = value => {
    const point = /^\d{4}-\d{2}-\d{2}$/.test(String(value))
      ? new Date(value + "T12:00:00") : new Date(value);
    return Number.isNaN(point.getTime()) ? "" :
      point.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
  };
  const shortDate = value => {
    const point = new Date(value);
    return Number.isNaN(point.getTime()) ? "" :
      point.toLocaleDateString("he-IL", { day: "numeric", month: "short" });
  };
  const safeSet = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* storage blocked */ }
  };
  const safeGet = key => {
    try { return localStorage.getItem(key); } catch { return null; }
  };
  const allSlugs = new Set(TOOLS.map(t => t.slug));
  let favorites;
  try {
    const stored = JSON.parse(safeGet("na-favorites-v1") || "[]");
    favorites = new Set(Array.isArray(stored) ? stored.filter(x => allSlugs.has(x)) : []);
  } catch { favorites = new Set(); }
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let toastTimer;
  const showToast = message => {
    els.toast.textContent = message;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
  };
  const logo = (tool, large = false) => {
    const domain = host(tool.url);
    const image = domain
      ? '<img alt="" src="https://www.google.com/s2/favicons?sz=128&domain_url=' +
        encodeURIComponent("https://" + domain) + '" loading="lazy" referrerpolicy="no-referrer">'
      : "";
    return '<span class="tool-logo ' + (large ? "large" : "") +
      '" style="--tool-accent:' + color(tool.category) + '"><span class="mark">' +
      html(tool.mark || tool.name?.slice(0, 2) || "AI") + "</span>" + image + "</span>";
  };
  const scrollToTools = () => $("#tools").scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
  const filteredTools = () => {
    const query = state.query.trim().toLocaleLowerCase("he");
    return TOOLS.filter(tool => {
      const searchable = [
        tool.name, tool.tagline, tool.solves, tool.free, tool.limits,
        tool.audience, ...(tool.uses || []), ...(tool.subcategories || []),
        categoryMap.get(tool.category)?.name
      ].join(" ").toLocaleLowerCase("he");
      return (state.category === "all" || tool.category === state.category) &&
        (!state.favoritesOnly || favorites.has(tool.slug)) &&
        (!query || searchable.includes(query));
    }).sort((a,b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name);
      if (state.sort === "category") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      return String(b.added || b.verified || "").localeCompare(String(a.added || a.verified || "")) ||
        a.name.localeCompare(b.name);
    });
  };
  const toolCard = tool => {
    const category = categoryMap.get(tool.category) || { short: "כלי AI" };
    const liked = favorites.has(tool.slug);
    return '<article class="tool-card" data-card="' + html(tool.slug) +
      '" style="--tool-accent:' + color(tool.category) + '">' +
      '<div class="tool-card-top">' + logo(tool) +
      '<button type="button" class="tool-fav" data-favorite="' + html(tool.slug) +
      '" aria-label="' + (liked ? "הסרה ממועדפים" : "הוספה למועדפים") + ' ' + html(tool.name) +
      '" aria-pressed="' + liked + '">' + icon("heart") + "</button></div>" +
      '<span class="tool-chip">' + html(category.short || category.name) + "</span>" +
      '<h3 dir="auto">' + html(tool.name) + "</h3>" +
      '<p>' + html(tool.tagline) + "</p>" +
      '<div class="tool-card-bottom"><span>' + icon("check") + " מסלול חינמי מאומת</span>" +
      '<button type="button" class="tool-open" data-tool="' + html(tool.slug) +
      '" aria-label="פתיחת פרטים על ' + html(tool.name) + '">' + icon("arrow") + "</button></div></article>";
  };
  const renderTools = () => {
    const found = filteredTools();
    els.visibleCount.textContent = found.length.toLocaleString("he-IL");
    els.toolsGrid.innerHTML = found.slice(0, state.visible).map(toolCard).join("");
    els.loadMore.hidden = state.visible >= found.length;
    els.empty.hidden = found.length > 0;
    if (state.query) {
      els.searchStatus.hidden = false;
      els.searchStatus.textContent = "תוצאות חיפוש עבור: " + state.query + " · " + found.length + " כלים";
    } else {
      els.searchStatus.hidden = true;
      els.searchStatus.textContent = "";
    }
    els.tabs.querySelectorAll("[data-category]").forEach(button =>
      button.setAttribute("aria-pressed", String(button.dataset.category === state.category)));
    els.categoryGrid.querySelectorAll("[data-category]").forEach(button =>
      button.classList.toggle("selected", button.dataset.category === state.category));
    els.favoritesOnly.setAttribute("aria-pressed", String(state.favoritesOnly));
  };
  const chooseCategory = category => {
    if (category !== "all" && !categoryMap.has(category)) return;
    state.category = category;
    state.visible = 12;
    state.query = "";
    els.heroSearch.value = "";
    renderTools();
    renderNews();
    scrollToTools();
  };
  const search = query => {
    state.query = text(query);
    state.category = "all";
    state.visible = 12;
    els.heroSearch.value = state.query;
    renderTools();
    renderNews();
    scrollToTools();
  };
  const renderCategories = () => {
    const categories = [{ id: "all", name: "כל הקטגוריות", short: "הכול", color: "#70b8ff" },
      ...CATEGORIES.filter(category => category.id !== "all")];
    const icons = { all: "grid", productivity: "zap", development: "code", design: "palette",
      research: "book", skills: "graduation" };
    els.categoryGrid.innerHTML = categories.map(cat => {
      const count = cat.id === "all" ? TOOLS.length :
        TOOLS.filter(tool => tool.category === cat.id).length;
      return '<button type="button" class="category-card" data-category="' + html(cat.id) +
        '" style="--category-glow:' + color(cat.id) + '">' +
        '<span class="category-icon">' + icon(icons[cat.id] || "spark") + "</span>" +
        '<span class="category-text"><strong>' + html(cat.short || cat.name) +
        "</strong><small>" + count + " כלים מאומתים</small></span>" +
        '<span class="corner-arrow">' + icon("arrow") + "</span></button>";
    }).join("");
    els.tabs.innerHTML = categories.map(cat =>
      '<button type="button" data-category="' + html(cat.id) + '" aria-pressed="' +
      (cat.id === "all") + '">' + html(cat.short || cat.name) + "</button>"
    ).join("");
    els.topics.innerHTML = CATEGORIES.filter(c=>c.id!=="all").slice(0,5).map(cat =>
      '<button type="button" data-category="' + html(cat.id) + '">' + html(cat.short) + "</button>"
    ).join("");
    $("#heroCount").textContent = String(TOOLS.length);
    $("#heroCategoryCount").textContent = String(CATEGORIES.filter(c => c.id !== "all").length);
  };
  const renderWatch = () => {
    const picks = WATCHLIST.slice(-3).reverse();
    if (!picks.length) {
      els.watchCards.innerHTML = '<div class="news-skeleton">אין כרגע כלים במעקב.</div>';
      return;
    }
    els.watchCards.innerHTML = picks.map(tool =>
      '<article class="watch-card"><div class="watch-card-top"><strong dir="auto">' +
      html(tool.name) + '</strong><span>בבדיקה</span></div><p>' +
      html(tool.signal) + '</p><a href="' +
      (isUrl(tool.url) ? html(tool.url) : "#watchlist") +
      '" target="_blank" rel="noopener noreferrer">למידע מהמקור ↗</a></article>'
    ).join("");
  };
  const filteredNews = () => {
    const query = state.query.trim().toLocaleLowerCase("he");
    return !query ? state.news : state.news.filter(item =>
      [item.title,item.summary,item.source_host].join(" ").toLocaleLowerCase("he").includes(query));
  };
  const newsCard = (item, index) => {
    const source = text(item.source_host) || host(item.source_url) || "מקור חיצוני";
    const chip = text(item.title).slice(0,36);
    return '<article class="news-card">' +
      '<button type="button" class="news-card-btn" data-news-id="' + html(item.id) +
      '" aria-label="לקריאת תקציר הידיעה: ' + html(item.title) + '">' +
      '<div class="news-art theme-' + (index % 4) +
      '"><small>' + html(source) + '</small><strong>' + html(chip) +
      '</strong></div><div class="news-card-content"><h3>' + html(item.title) +
      '</h3><p>' + html(item.summary) +
      '</p><div class="news-card-foot"><span class="time">' + icon("clock") +
      '<time datetime="' + html(item.published_at || "") + '">' + html(shortDate(item.published_at)) +
      '</time></span><span class="read-more">לפרטים ←</span></div></div></button></article>';
  };
  const renderNews = () => {
    if (!state.newsLoaded) return;
    const items = filteredNews();
    state.newsIndex = 0;
    els.newsTrack.innerHTML = items.length ? items.map(newsCard).join("") :
      '<div class="news-skeleton">' +
      (state.query ? "לא נמצאו ידיעות שתואמות לחיפוש. נסו מונח אחר." : "אין עדיין ידיעות מאושרות להצגה. מוזמנים לבדוק שוב בקרוב.") +
      "</div>";
    const showControls = items.length > 1;
    els.newsPrev.disabled = !showControls;
    els.newsNext.disabled = !showControls;
    els.newsDots.innerHTML = items.slice(0,6).map((_, i) =>
      '<i class="' + (i === 0 ? "active" : "") + '"></i>').join("");
    els.newsTrack.scrollLeft = 0;
  };
  const loadNews = async () => {
    try {
      const response = await fetch("/api/news?limit=20", {
        headers: { Accept: "application/json" }, signal: AbortSignal.timeout(12000)
      });
      if (!response.ok) throw new Error("News API temporarily unavailable");
      const result = await response.json();
      state.news = Array.isArray(result.items) ? result.items.filter(item =>
        item && item.id != null && typeof item.title === "string" &&
        typeof item.summary === "string") : [];
      state.newsLoaded = true;
      renderNews();
    } catch {
      state.news = [];
      state.newsLoaded = true;
      els.newsTrack.innerHTML =
        '<div class="news-skeleton">לא הצלחנו לטעון חדשות כרגע. אפשר להיכנס לעמוד החדשות ולנסות שוב.</div>';
      els.newsPrev.disabled = true;
      els.newsNext.disabled = true;
    }
  };
  const newsStep = delta => {
    const cards = [...els.newsTrack.querySelectorAll(".news-card")];
    if (!cards.length) return;
    state.newsIndex = Math.min(cards.length - 1, Math.max(0, state.newsIndex + delta));
    cards[state.newsIndex].scrollIntoView({ inline: "start", block: "nearest",
      behavior: reducedMotion ? "instant" : "smooth" });
    els.newsPrev.disabled = state.newsIndex === 0;
    els.newsNext.disabled = state.newsIndex === cards.length - 1;
    els.newsDots.querySelectorAll("i").forEach((el, i) =>
      el.classList.toggle("active", i === state.newsIndex % 6));
  };
  const link = (url, label, kind = "external") => {
    if (!isUrl(url)) return "";
    return '<a href="' + html(url) + '" target="_blank" rel="noopener noreferrer">' +
      icon(kind) + " " + html(label) + "</a>";
  };
  const list = values => (Array.isArray(values) ? values : []).map(value =>
    "<li>" + html(value) + "</li>").join("");
  const toolDetail = tool => {
    const cat = categoryMap.get(tool.category) || { name: "כלי AI" };
    const focuses = (tool.subcategories || []).filter(Boolean).join(" · ");
    const uses = (tool.uses || []).filter(Boolean).join(" · ");
    const highlights = (tool.pros || []).filter(Boolean).slice(0, 3).join(" · ");
    const overview = tool.description || ("הכלי " + tool.name + " משתייך לקטגוריית " + cat.name +
      (focuses ? " ומתמקד ב" + focuses : "") +
      (uses ? ". אפשר להשתמש בו בעיקר עבור " + uses : "") + ".");
    const problem = tool.problem || (tool.solves +
      (uses ? " השימושים המרכזיים בהקשר הזה הם " + uses + "." : ""));
    const audience = tool.audienceDetails || (tool.audience +
      (highlights ? " עבור קהל זה בולטים במיוחד היתרונות הבאים: " + highlights + "." : ""));
    const sources = (tool.sources || []).filter(s => isUrl(s.url)).map(s => link(s.url,s.label)).join("");
    const alternatives = (tool.alternatives || []).map(name =>
      '<button type="button" data-alternative="' + html(name) + '">' + html(name) + "</button>"
    ).join("");
    return '<div class="detail-heading">' + logo(tool,true) + '<div><h2 id="detailTitle">' +
      html(tool.name) + '</h2><p>' + html(cat.name) + " · " + html(tool.tagline) + "</p></div></div>" +
      '<div class="detail-art"><div class="detail-mark">' + logo(tool,true).replace('class="tool-logo large"', 'class="tool-logo large"') +
      "</div></div>" +
      '<div class="detail-pills">' + (tool.subcategories || []).map(tag => '<span>' + html(tag) + '</span>').join("") + "</div>" +
      '<p class="detail-label">תיאור כללי</p><p class="detail-summary">' + html(overview) + "</p>" +
      '<p class="detail-label">מה הכלי פותר</p><p class="detail-summary">' + html(problem) + "</p>" +
      '<p class="detail-label">למי זה מתאים</p><p class="detail-summary">' + html(audience) + "</p>" +
      '<section class="detail-copy-block free"><strong>✓ מה מקבלים בחינם</strong>' + html(tool.free) + "</section>" +
      '<section class="detail-copy-block"><strong>המגבלות שכדאי להכיר</strong>' + html(tool.limits) + "</section>" +
      '<section class="detail-copy-block"><strong>יתרונות</strong><ul>' + list(tool.pros) + "</ul></section>" +
      '<section class="detail-copy-block"><strong>חסרונות</strong><ul>' + list(tool.cons) + "</ul></section>" +
      (alternatives ? '<p class="detail-label">חלופות בקטלוג</p><div class="detail-links">' + alternatives + "</div>" : "") +
      '<p class="detail-label">מקורות ואימות</p><p class="detail-summary">אומת: ' + html(date(tool.verified)) + "</p>" +
      '<div class="detail-links">' + sources +
      '<button type="button" data-share="' + html(tool.slug) + '">' + icon("copy") + " שיתוף קישור</button></div>" +
      '<div class="detail-cta">' + link(tool.url, "מעבר לאתר הרשמי", "external") + "</div>";
  };
  const newsDetail = item => {
    const source = text(item.source_host) || host(item.source_url) || "מקור חיצוני";
    return '<div class="news-detail"><p class="section-eyebrow">NEURAL ARCHIVE / AI NEWS</p>' +
      '<h2 id="detailTitle">' + html(item.title) + "</h2>" +
      '<p class="news-author">' + html(source) + " · " + html(date(item.published_at)) + "</p>" +
      '<div class="news-detail-art">' + icon("spark") + "</div>" +
      '<p class="detail-label">תקציר הידיעה</p><p class="detail-summary">' +
      html(item.summary).replace(/\n/g,"<br>") + "</p>" +
      '<section class="detail-copy-block"><strong>על המקור</strong>התקציר נערך בנפרד מהפרסום המקורי ואושר לפני הצגתו. מומלץ לבדוק את פרטי הידיעה באתר המקור.</section>' +
      '<div class="detail-cta">' + link(item.source_url, "לקריאת הפרסום המקורי", "external") + "</div></div>";
  };
  const openDetail = markup => {
    if (els.detail.open) els.detail.close();
    els.detailContent.innerHTML = markup;
    els.detail.showModal();
    // Native dialog focus management, Escape and focus restoration.
  };
  const showTool = slug => {
    const tool = TOOLS.find(item => item.slug === slug);
    if (tool) openDetail(toolDetail(tool));
  };
  const showNews = id => {
    const item = state.news.find(entry => String(entry.id) === String(id));
    if (item) openDetail(newsDetail(item));
  };
  const toggleFavorite = slug => {
    if (!allSlugs.has(slug)) return;
    if (favorites.has(slug)) favorites.delete(slug);
    else favorites.add(slug);
    safeSet("na-favorites-v1", JSON.stringify([...favorites]));
    renderTools();
    showToast(favorites.has(slug) ? "נוסף למועדפים בדפדפן הזה" : "הוסר מהמועדפים");
  };
  const toggleTheme = () => {
    const theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    els.theme.setAttribute("aria-pressed", String(theme === "dark"));
    els.theme.setAttribute("aria-label", theme === "dark" ? "מעבר למצב בהיר" : "מעבר למצב כהה");
    safeSet("na-theme", theme);
  };
  const updateScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    els.scroll.style.width = (max > 0 ? Math.max(0, Math.min(100, scrollY / max * 100)) : 0) + "%";
    els.header.classList.toggle("scrolled", scrollY > 12);
  };
  let scrollScheduled = false;
  window.addEventListener("scroll", () => {
    if (scrollScheduled) return;
    scrollScheduled = true;
    requestAnimationFrame(() => { scrollScheduled = false; updateScroll(); });
  }, { passive: true });
  window.addEventListener("resize", updateScroll, { passive: true });
  document.addEventListener("click", event => {
    const favorite = event.target.closest("[data-favorite]");
    if (favorite) { toggleFavorite(favorite.dataset.favorite); return; }
    const tool = event.target.closest("[data-tool]");
    if (tool) { showTool(tool.dataset.tool); return; }
    const card = event.target.closest("[data-card]");
    if (card && !event.target.closest("button,a")) { showTool(card.dataset.card); return; }
    const news = event.target.closest("[data-news-id]");
    if (news) { showNews(news.dataset.newsId); return; }
    const category = event.target.closest("[data-category]");
    if (category) { chooseCategory(category.dataset.category); return; }
    const alternative = event.target.closest("[data-alternative]");
    if (alternative) {
      const find = TOOLS.find(t => t.name === alternative.dataset.alternative);
      els.detail.close();
      if (find) showTool(find.slug);
      else search(alternative.dataset.alternative);
      return;
    }
    const share = event.target.closest("[data-share]");
    if (share) {
      const u = new URL("/design#tool=" + encodeURIComponent(share.dataset.share), location.origin);
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(u.href).then(() => showToast("הקישור הועתק")).catch(() => showToast("לא ניתן להעתיק כרגע"));
      } else showToast("העתקה אינה נתמכת בדפדפן הזה");
    }
  });
  const closeMenu = () => {
    els.mobileNav.hidden = true;
    els.mobileMenu.setAttribute("aria-expanded", "false");
  };
  els.mobileMenu.addEventListener("click", () => {
    const open = els.mobileNav.hidden;
    els.mobileNav.hidden = !open;
    els.mobileMenu.setAttribute("aria-expanded", String(open));
  });
  els.mobileNav.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });
  els.theme.addEventListener("click", toggleTheme);
  els.theme.setAttribute("aria-pressed", String(document.documentElement.dataset.theme === "dark"));
  els.theme.setAttribute("aria-label", document.documentElement.dataset.theme === "dark" ?
    "מעבר למצב בהיר" : "מעבר למצב כהה");
  els.heroForm.addEventListener("submit", event => {
    event.preventDefault();
    search(els.heroSearch.value);
  });
  $("#openQuickSearch").addEventListener("click", () => {
    $("#home").scrollIntoView({ behavior: reducedMotion ? "instant" : "smooth" });
    setTimeout(() => els.heroSearch.focus({ preventScroll: true }), reducedMotion ? 0 : 330);
  });
  els.sort.addEventListener("change", () => { state.sort = els.sort.value; renderTools(); });
  els.favoritesOnly.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    state.visible = 12;
    renderTools();
  });
  els.loadMore.addEventListener("click", () => {
    state.visible += 12;
    renderTools();
  });
  $("#clearSearch").addEventListener("click", () => {
    state.favoritesOnly = false; state.category = "all"; search("");
  });
  els.newsNext.addEventListener("click", () => newsStep(1));
  els.newsPrev.addEventListener("click", () => newsStep(-1));
  $("#closeDetail").addEventListener("click", () => els.detail.close());
  els.detail.addEventListener("click", event => { if (event.target === els.detail) els.detail.close(); });
  document.addEventListener("keydown", event => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      if (els.detail.open) els.detail.close();
      $("#home").scrollIntoView({ behavior: "instant" });
      els.heroSearch.focus({ preventScroll: true });
    }
  });
  document.addEventListener("error", event => {
    if (event.target?.matches?.(".tool-logo img")) event.target.hidden = true;
  }, true);
  const railObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      document.querySelectorAll("[data-rail]").forEach(item =>
        item.classList.toggle("active", item.dataset.rail === entry.target.id));
      els.header.querySelectorAll(".desktop-nav a").forEach(item =>
        item.classList.toggle("active", item.getAttribute("href") === "#" + entry.target.id));
    }
  }, { rootMargin: "-22% 0px -62% 0px", threshold: 0 });
  ["home","news","categories","tools","watchlist"].forEach(id => {
    const section = document.getElementById(id);
    if (section) railObserver.observe(section);
  });
  if (!reducedMotion && "IntersectionObserver" in window) {
    document.documentElement.classList.add("js-motion");
    const revealObserver = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    }, { threshold: .08, rootMargin: "0px 0px 30px 0px" });
    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
  }
  renderCategories();
  renderWatch();
  renderTools();
  loadNews();
  updateScroll();
  if (location.hash.startsWith("#tool=")) {
    const slug = decodeURIComponent(location.hash.slice(6));
    if (allSlugs.has(slug)) setTimeout(() => showTool(slug), 150);
  }
})();
