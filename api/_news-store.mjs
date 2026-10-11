/**
 * Server-side Supabase REST adapter for Neural Archive news moderation.
 * Never import this file in browser scripts.
 */
export function newsStorageReady() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY);
}

export class NewsStoreError extends Error {
  constructor(status) {
    super("News storage request failed");
    this.name = "NewsStoreError";
    this.status = status;
  }
}

export async function newsQuery(method, params = {}, body = undefined) {
  if (!newsStorageReady()) throw new NewsStoreError(503);

  const base = new URL(process.env.SUPABASE_URL);
  if (base.protocol !== "https:") throw new NewsStoreError(503);

  const url = new URL("/rest/v1/news_items", base);
  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    method,
    headers: {
      apikey: process.env.SUPABASE_SERVICE_ROLE_KEY,
      Authorization: "Bearer " + process.env.SUPABASE_SERVICE_ROLE_KEY,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) throw new NewsStoreError(response.status);
  return response.json();
}

export function normalizeSource(input) {
  if (!input || typeof input !== "string" || input.length > 2000) return null;
  try {
    const u = new URL(input.trim().replace(/[),.;]+$/, ""));
    if (!["http:", "https:"].includes(u.protocol)) return null;
    if (u.username || u.password || !u.hostname.includes(".")) return null;
    if (["localhost", "127.0.0.1", "::1"].includes(u.hostname)) return null;
    u.hash = "";
    if ((u.protocol === "http:" && u.port === "80") || (u.protocol === "https:" && u.port === "443")) u.port = "";
    return u.toString();
  } catch {
    return null;
  }
}

export function sourceHost(input) {
  try {
    return new URL(input).hostname.replace(/^www\./, "");
  } catch {
    return "מקור חיצוני";
  }
}
