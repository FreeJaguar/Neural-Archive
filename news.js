const list = document.getElementById("newsList");
const message = document.getElementById("newsMessage");
const search = document.getElementById("newsSearch");
let items = [];

function dateLabel(value) {
  const timestamp = new Date(value);
  return Number.isNaN(timestamp.getTime())
    ? ""
    : timestamp.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
}

function card(item) {
  const article = document.createElement("article");
  article.className = "news-card";

  const meta = document.createElement("div");
  meta.className = "news-card-meta";
  const host = document.createElement("span");
  host.textContent = item.source_host || "מקור חיצוני";
  const time = document.createElement("time");
  time.textContent = dateLabel(item.published_at);
  if (item.published_at) time.dateTime = item.published_at;
  meta.append(host, time);

  const heading = document.createElement("h3");
  heading.textContent = item.title;
  const summary = document.createElement("p");
  summary.textContent = item.summary;

  const source = document.createElement("a");
  let url;
  try { url = new URL(item.source_url); } catch { /* invalid URL */ }
  if (url && ["http:", "https:"].includes(url.protocol)) {
    source.href = url.href;
    source.target = "_blank";
    source.rel = "noopener noreferrer";
    source.textContent = "לכתבה המקורית ↗";
  } else {
    source.textContent = "אין קישור למקור";
  }

  article.append(meta, heading, summary, source);
  return article;
}

function render() {
  const query = search.value.trim().toLocaleLowerCase("he");
  const visible = items.filter((item) => 
    [item.title, item.summary, item.source_host].join(" ").toLocaleLowerCase("he").includes(query)
  );
  list.replaceChildren(...visible.map(card));
  message.hidden = visible.length > 0;
  if (!visible.length) message.textContent = items.length ? "לא נמצאו חדשות התואמות לחיפוש." : "עדיין אין ידיעות שפורסמו.";
}

async function loadNews() {
  try {
    const response = await fetch("/api/news?limit=40", { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Feed unavailable");
    const data = await response.json();
    items = Array.isArray(data.items) ? data.items : [];
    if (!data.configured) {
      message.textContent = "עמוד החדשות בהקמה. מסד הנתונים עדיין לא חובר.";
      list.replaceChildren();
      return;
    }
    render();
  } catch {
    message.hidden = false;
    message.textContent = "לא ניתן לטעון חדשות כעת. אפשר לנסות שוב מאוחר יותר.";
  }
}

search.addEventListener("input", render);
loadNews();
