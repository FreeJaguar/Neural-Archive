const state = { category: "all", use: "all", query: "", recent: false };
const categoryMap = Object.fromEntries(CATEGORIES.map((category) => [category.id, category]));

const els = {
  categoryNav: document.querySelector("#categoryNav"), categoryKey: document.querySelector("#categoryKey"),
  toolGrid: document.querySelector("#toolGrid"), recentStrip: document.querySelector("#recentStrip"),
  search: document.querySelector("#searchInput"), useFilter: document.querySelector("#useFilter"),
  recentFilter: document.querySelector("#recentFilter"), resultCount: document.querySelector("#resultCount"),
  toolCount: document.querySelector("#toolCount"), empty: document.querySelector("#emptyState"),
  dialog: document.querySelector("#toolDialog"), dialogContent: document.querySelector("#dialogContent")
};

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[char]);
}

function toolCard(tool, compact = false) {
  const category = categoryMap[tool.category];
  return `
    <article class="tool-card ${compact ? "compact" : ""}" data-category="${tool.category}" tabindex="0" role="button" aria-label="פרטים על ${escapeHtml(tool.name)}" data-tool="${tool.slug}">
      <div class="card-accent" style="--category:${category.color}"></div>
      <div class="card-topline">
        <span class="tool-mark" style="--category:${category.color}">${escapeHtml(tool.mark)}</span>
        <span class="category-name">${category.short}</span>
        ${tool.recent ? '<span class="new-label">חדש</span>' : ""}
      </div>
      <h3>${escapeHtml(tool.name)}</h3>
      <p>${escapeHtml(tool.tagline)}</p>
      <div class="tag-row">${tool.subcategories.slice(0, compact ? 1 : 2).map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <div class="free-line"><strong>חינם:</strong> ${escapeHtml(tool.free.split(".")[0])}.</div>
      <span class="details-link">לפרטים <span aria-hidden="true">←</span></span>
    </article>`;
}

function renderNavigation() {
  els.categoryNav.innerHTML = CATEGORIES.map((category) => {
    const count = category.id === "all" ? TOOLS.length : TOOLS.filter((tool) => tool.category === category.id).length;
    return `<button type="button" data-category="${category.id}" class="category-button ${state.category === category.id ? "active" : ""}" ${category.color ? `style="--category:${category.color}"` : ""}>
      <span>${escapeHtml(category.short)}</span><strong>${count}</strong>
    </button>`;
  }).join("");
  els.categoryKey.innerHTML = CATEGORIES.slice(1).map((category) => `<button type="button" data-key-category="${category.id}"><i style="--category:${category.color}"></i>${category.short}</button>`).join("");
}

function renderUseOptions() {
  const uses = [...new Set(TOOLS.flatMap((tool) => tool.uses))].sort((a, b) => a.localeCompare(b, "he"));
  els.useFilter.insertAdjacentHTML("beforeend", uses.map((use) => `<option value="${escapeHtml(use)}">${escapeHtml(use)}</option>`).join(""));
}

function filteredTools() {
  const query = state.query.trim().toLocaleLowerCase("he");
  return TOOLS.filter((tool) => {
    const searchable = [tool.name, tool.tagline, tool.solves, tool.free, tool.limits, ...tool.uses, ...tool.subcategories].join(" ").toLocaleLowerCase("he");
    return (state.category === "all" || tool.category === state.category)
      && (state.use === "all" || tool.uses.includes(state.use))
      && (!state.recent || tool.recent)
      && (!query || searchable.includes(query));
  });
}

function renderCatalog() {
  const tools = filteredTools();
  els.toolGrid.innerHTML = tools.map((tool) => toolCard(tool)).join("");
  els.resultCount.textContent = `${tools.length} מתוך ${TOOLS.length} כלים`;
  els.empty.hidden = tools.length !== 0;
  els.toolGrid.hidden = tools.length === 0;
  renderNavigation();
}

function renderRecent() {
  els.recentStrip.innerHTML = TOOLS.filter((tool) => tool.recent).slice(0, 4).map((tool) => toolCard(tool, true)).join("");
}

function detailTemplate(tool) {
  const category = categoryMap[tool.category];
  const list = (items) => items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return `
    <header class="dialog-header" style="--category:${category.color}">
      <span class="tool-mark large">${escapeHtml(tool.mark)}</span>
      <div><p>${category.name}</p><h2 id="dialogTitle">${escapeHtml(tool.name)}</h2><p class="dialog-tagline">${escapeHtml(tool.tagline)}</p></div>
    </header>
    <div class="dialog-body">
      <section><h3>מה הכלי פותר</h3><p>${escapeHtml(tool.solves)}</p><p><strong>מתאים ל:</strong> ${escapeHtml(tool.audience)}</p></section>
      <section class="free-panel"><p class="mini-label">המסלול החינמי</p><h3>${escapeHtml(tool.free)}</h3><p><strong>חשוב לדעת:</strong> ${escapeHtml(tool.limits)}</p></section>
      <div class="pros-cons"><section><h3>יתרונות</h3><ul>${list(tool.pros)}</ul></section><section><h3>חסרונות</h3><ul>${list(tool.cons)}</ul></section></div>
      <section><h3>חלופות דומות</h3><div class="alternative-list">${tool.alternatives.map((name) => `<button type="button" data-alternative="${escapeHtml(name)}">${escapeHtml(name)}</button>`).join("")}</div></section>
      <section><h3>מקורות ואימות</h3><p>נבדק לאחרונה: <time datetime="${tool.verified}">${new Date(`${tool.verified}T00:00:00`).toLocaleDateString("he-IL")}</time></p><div class="source-list">${tool.sources.map((source) => `<a href="${source.url}" target="_blank" rel="noreferrer">${escapeHtml(source.label)} ↗</a>`).join("")}</div></section>
    </div>
    <div class="dialog-actions"><a class="primary-action" href="${tool.url}" target="_blank" rel="noreferrer">מעבר לאתר הרשמי ↗</a></div>`;
}

function openTool(slug, updateHash = true) {
  const tool = TOOLS.find((item) => item.slug === slug);
  if (!tool) return;
  els.dialogContent.innerHTML = detailTemplate(tool);
  if (!els.dialog.open) els.dialog.showModal();
  if (updateHash) history.pushState(null, "", `#tool=${tool.slug}`);
}

function closeDialog(updateHash = true) {
  if (els.dialog.open) els.dialog.close();
  if (updateHash && location.hash.startsWith("#tool=")) history.pushState(null, "", location.pathname + location.search);
}

function resetFilters() {
  state.category = "all"; state.use = "all"; state.query = ""; state.recent = false;
  els.search.value = ""; els.useFilter.value = "all"; els.recentFilter.checked = false;
  renderCatalog();
}

document.addEventListener("click", (event) => {
  const card = event.target.closest("[data-tool]");
  const categoryButton = event.target.closest("[data-category]");
  const keyButton = event.target.closest("[data-key-category]");
  const alternative = event.target.closest("[data-alternative]");
  if (card) openTool(card.dataset.tool);
  if (categoryButton) { state.category = categoryButton.dataset.category; renderCatalog(); }
  if (keyButton) { state.category = keyButton.dataset.keyCategory; renderCatalog(); document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" }); }
  if (alternative) { const match = TOOLS.find((tool) => tool.name === alternative.dataset.alternative); if (match) openTool(match.slug); }
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); els.search.focus(); }
  if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-tool]")) { event.preventDefault(); openTool(event.target.dataset.tool); }
});

els.search.addEventListener("input", () => { state.query = els.search.value; renderCatalog(); });
els.useFilter.addEventListener("change", () => { state.use = els.useFilter.value; renderCatalog(); });
els.recentFilter.addEventListener("change", () => { state.recent = els.recentFilter.checked; renderCatalog(); });
document.querySelector("#showRecent").addEventListener("click", () => { state.recent = true; els.recentFilter.checked = true; renderCatalog(); document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" }); });
document.querySelector("#clearFilters").addEventListener("click", resetFilters);
document.querySelector("#closeDialog").addEventListener("click", () => closeDialog());
els.dialog.addEventListener("click", (event) => { if (event.target === els.dialog) closeDialog(); });
els.dialog.addEventListener("cancel", (event) => { event.preventDefault(); closeDialog(); });
window.addEventListener("hashchange", () => { const slug = location.hash.match(/^#tool=(.+)$/)?.[1]; slug ? openTool(slug, false) : closeDialog(false); });

renderUseOptions();
renderRecent();
renderCatalog();
els.toolCount.textContent = TOOLS.length;
const initialSlug = location.hash.match(/^#tool=(.+)$/)?.[1];
if (initialSlug) openTool(initialSlug, false);
