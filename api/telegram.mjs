import { timingSafeEqual } from "node:crypto";

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const first = Buffer.from(a);
  const second = Buffer.from(b);
  return first.length === second.length && timingSafeEqual(first, second);
}

async function sendTelegramMessage(token, chatId, text) {
  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Telegram sendMessage returned HTTP ${response.status}`);
}

// Basic connection check only. No updates are stored or sent to an AI service.
export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, service: "neural-archive-telegram" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!token || !secret) {
    return res.status(503).json({ ok: false, error: "Bot is not configured" });
  }

  const supplied = req.headers["x-telegram-bot-api-secret-token"];
  if (!safeEqual(supplied, secret)) {
    return res.status(403).json({ ok: false });
  }

  let update;
  try {
    update = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false, error: "Invalid JSON" });
  }
  if (!update || typeof update !== "object") {
    return res.status(400).json({ ok: false, error: "Invalid update" });
  }

  const message = update.message;
  if (!message || message.chat?.type !== "private") {
    return res.status(200).json({ ok: true });
  }

  const chatId = String(message.chat.id);
  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  const command = (message.text || "").trim().split(/\s+/)[0]?.split("@")[0]?.toLowerCase();

  // Initial bootstrap: the owner obtains their Telegram chat ID with /start.
  // Until the admin ID is configured, do not process any other messages.
  if (!adminChatId && command !== "/start") {
    return res.status(200).json({ ok: true });
  }
  if (adminChatId && adminChatId !== chatId) {
    return res.status(200).json({ ok: true });
  }

  let reply;
  if (command === "/start" && !adminChatId) {
    reply = `ברוכים הבאים ל-Neural Archive!\n\nמזהה הצ'אט שלך: ${chatId}\n\nהכנס את המספר הזה במשתנה TELEGRAM_ADMIN_CHAT_ID בהגדרות Vercel ובצע פריסה מחדש.\n\nזהו שלב בדיקת החיבור בלבד. עדיין אין איסוף או פרסום חדשות.`;
  } else if (command === "/start" || command === "/help") {
    reply = "Neural Archive Bot פעיל ✅\n\n/start - הפעלה\n/status - בדיקת חיבור\n/help - עזרה\n\nאיסוף חדשות ואישור פרסום יתווספו בשלב הבא.";
  } else if (command === "/status") {
    reply = "✅ הבוט מחובר ל-Vercel ואתה מזוהה כמנהל.\nℹ️ מנגנון החדשות עדיין לא מחובר.";
  } else {
    reply = "החיבור לבוט פעיל. בשלב זה הודעות וקישורים אינם נשמרים או מתפרסמים. השתמש ב-/status לבדיקת החיבור.";
  }

  try {
    await sendTelegramMessage(token, chatId, reply);
    return res.status(200).json({ ok: true });
  } catch (error) {
    // Telegram may retry this update. Never log token, content or chat identifiers.
    console.error("Telegram reply failed:", error?.message || "unknown error");
    return res.status(502).json({ ok: false });
  }
}
