import { newsQuery, newsStorageReady } from "./_news-store.mjs";

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!newsStorageReady()) {
    return res.status(200).json({ items: [], configured: false });
  }

  const requested = Number(req.query?.limit);
  const limit = Number.isInteger(requested) && requested > 0 ? Math.min(requested, 50) : 24;

  try {
    const items = await newsQuery("GET", {
      status: "eq.published",
      select: "id,title,summary,source_url,source_host,published_at",
      order: "published_at.desc",
      limit,
    });
    return res.status(200).json({ items, configured: true });
  } catch (error) {
    console.error("Public news read failed:", error?.name || "unknown");
    return res.status(503).json({ error: "News feed temporarily unavailable" });
  }
}
