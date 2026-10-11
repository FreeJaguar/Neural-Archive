import { timingSafeEqual } from "node:crypto";
import { newsQuery, newsStorageReady, normalizeSource, sourceHost, NewsStoreError } from "./_news-store.mjs";

function safeEqual(a, b) {
  if (typeof a !== "string" || typeof b !== "string") return false;
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

async function telegramCall(method, payload, token) {
  const response = await fetch("https://api.telegram.org/bot" + token + "/" + method, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error("Telegram " + method + " failed: HTTP " + response.status);
  return response.json();
}

const actions = (id) => ({
  inline_keyboard: [[
    { text: "✅ אישור", callback_data: "approve:" + id },
    { text: "❌ דחייה", callback_data: "reject:" + id },
    { text: "✏️ עריכה", callback_data: "edit:" + id },
  ]],
});

async function reply(chatId, text, token, replyMarkup) {
  const payload = { chat_id: chatId, text, link_preview_options: { is_disabled: true } };
  if (replyMarkup) payload.reply_markup = replyMarkup;
  return telegramCall("sendMessage", payload, token);
}

function extractUrl(text, message) {
  const match = (text || "").match(/https?:\/\/[^\s<>"']+/i);
  if (match) return normalizeSource(match[0]);
  const entities = [...(message?.entities || []), ...(message?.caption_entities || [])];
  const linked = entities.find((entity) => entity.type === "text_link" && entity.url);
  return linked ? normalizeSource(linked.url) : null;
}

function validCopy(title, summary) {
  return title.length >= 8 && title.length <= 180 && summary.length >= 30 && summary.length <= 1200;
}

function formatCandidate(item) {
  return (
    "📰 ידיעה #" + item.id + "\n" +
    "סטטוס: " + (item.status === "pending" ? "ממתינה לאישור" : item.status === "draft" ? "טיוטה" : item.status) + "\n\n" +
    (item.title || "כותרת טרם הוזנה") + "\n\n" +
    (item.summary || "טרם נכתב תקציר מקורי") + "\n\n" +
    "מקור: " + item.source_url
  ).slice(0, 3900);
}

function parseFields(input) {
  const parts = input.split("|").map((part) => part.trim());
  if (parts.length !== 3) return null;
  const [source, title, summary] = parts;
  const url = normalizeSource(source);
  if (!url || !validCopy(title, summary)) return null;
  return { source_url: url, source_host: sourceHost(url), title, summary };
}

async function handleSubmission(update, message, chatId, token, input) {
  const fields = parseFields(input);
  let source, title, summary, status;

  if (fields) {
    ({ source_url: source, title, summary } = fields);
    status = "pending";
  } else {
    source = extractUrl(input, message);
    title = "";
    summary = "";
    status = "draft";
  }

  if (!source) {
    return reply(chatId,
      "להוספת ידיעה מוכנה לבדיקה:\n/add https://example.com/article | כותרת מקורית בעברית | תקציר מקורי בעברית של 30 תווים לפחות\n\nאפשר גם לשלוח קישור בלבד ולערוך בהמשך.", token);
  }

  let records;
  try {
    records = await newsQuery("POST", { select: "id,source_url,title,summary,status" }, {
      source_url: source,
      source_host: sourceHost(source),
      title,
      summary,
      status,
      telegram_update_id: update.update_id,
      submitted_by_chat_id: chatId,
    });
  } catch (error) {
    if (error instanceof NewsStoreError && error.status === 409) {
      return reply(chatId, "הידיעה כבר קיימת במאגר (או שהודעת Telegram נקלטה בעבר). השתמש ב-/pending כדי למצוא אותה.", token);
    }
    throw error;
  }

  const item = records?.[0];
  if (!item) throw new Error("News insert returned no row");
  if (status === "draft") {
    return reply(chatId,
      "📌 הקישור נשמר כטיוטה #" + item.id +
      "\nכדי להכין אותה לאישור, שלח:\n/edit " + item.id +
      " | כותרת מקורית של הידיעה | תקציר מקורי בעברית של לפחות 30 תווים", token);
  }

  return reply(chatId, formatCandidate(item), token, actions(item.id));
}

async function handleEdit(chatId, token, input) {
  const match = input.match(/^(\d+)\s*\|\s*([\s\S]+)$/);
  if (!match || !Number.isSafeInteger(Number(match[1])) || Number(match[1]) < 1) {
    return reply(chatId, "עריכת ידיעה:\n/edit ID | כותרת חדשה | תקציר מקורי של לפחות 30 תווים", token);
  }
  const parts = match[2].split("|").map((part) => part.trim());
  if (parts.length !== 2 || !validCopy(parts[0], parts[1])) {
    return reply(chatId, "הכותרת חייבת להכיל 8-180 תווים, והתקציר 30-1200 תווים. יש להפריד בין השדות עם |.", token);
  }
  const records = await newsQuery("PATCH", {
    id: "eq." + match[1],
    status: "in.(draft,pending)",
    select: "id,title,summary,source_url,status",
  }, {
    title: parts[0],
    summary: parts[1],
    status: "pending",
    updated_at: new Date().toISOString(),
  });
  if (!records?.length) return reply(chatId, "לא נמצאה טיוטה פתוחה עם המזהה הזה.", token);
  return reply(chatId, formatCandidate(records[0]), token, actions(records[0].id));
}

async function handlePending(chatId, token) {
  const records = await newsQuery("GET", {
    status: "in.(draft,pending)",
    select: "id,title,summary,source_url,status",
    order: "created_at.desc",
    limit: "6",
  });
  if (!records?.length) return reply(chatId, "אין ידיעות שממתינות לאישור.", token);
  for (const item of records) {
    await reply(chatId, formatCandidate(item), token, item.status === "pending" ? actions(item.id) : undefined);
  }
}

async function handleCallback(callback, chatId, token) {
  const payload = String(callback.data || "").match(/^(approve|reject|edit):([1-9]\d{0,15})$/);
  await telegramCall("answerCallbackQuery", { callback_query_id: callback.id }, token);
  if (!payload) return;
  const [, action, id] = payload;

  const records = await newsQuery("GET", {
    id: "eq." + id,
    select: "id,title,summary,status,source_url",
    limit: "1",
  });
  const item = records?.[0];
  if (!item) return reply(chatId, "הידיעה לא נמצאה.", token);
  if (action === "edit") {
    if (!["draft", "pending"].includes(item.status)) {
      return reply(chatId, "ניתן לערוך כרגע רק טיוטות וידיעות שממתינות לאישור.", token);
    }
    return reply(chatId,
      "לעריכת ידיעה #" + id + " שלח:\n/edit " + id +
      " | כותרת חדשה | תקציר מקורי חדש של לפחות 30 תווים", token);
  }
  if (item.status !== "pending") {
    return reply(chatId, "הידיעה כבר טופלה. הסטטוס הנוכחי: " + item.status, token);
  }

  if (action === "approve" && !validCopy(item.title, item.summary)) {
    return reply(chatId, "לא ניתן לפרסם ללא כותרת ותקציר מלאים. לחץ על עריכה תחילה.", token);
  }

  const now = new Date().toISOString();
  const nextStatus = action === "approve" ? "published" : "rejected";
  const updated = await newsQuery("PATCH", {
    id: "eq." + id,
    status: "eq.pending",
    select: "id,status",
  }, {
    status: nextStatus,
    reviewed_at: now,
    published_at: nextStatus === "published" ? now : null,
    updated_at: now,
  });

  if (!updated?.length) return reply(chatId, "הידיעה טופלה במקביל. בדוק את מצבה באמצעות /pending.", token);
  return reply(chatId,
    (nextStatus === "published" ? "✅ ידיעה #" + id + " אושרה לפרסום." : "❌ ידיעה #" + id + " נדחתה.") +
    "\nלא בוצע כאן איסוף אוטומטי או עיבוד AI.", token);
}

function helpMessage() {
  return [
    "🤖 Neural Archive - ניהול חדשות",
    "",
    "/status - בדיקת חיבור ואחסון",
    "/add URL | כותרת | תקציר - יצירת ידיעה לאישור",
    "/pending - הצגת ידיעות פתוחות",
    "/edit ID | כותרת | תקציר - עריכת ידיעה",
    "/help - עזרה",
    "",
    "אפשר לשלוח קישור בלבד, לשמור טיוטה ולהשלים אותה בהמשך.",
    "הבוט אינו אוסף הודעות מערוצים אחרים ואינו מפעיל AI בשלב זה.",
  ].join("\n");
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") {
    return res.status(200).json({ ok: true, service: "neural-archive-telegram" });
  }
  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const secret = process.env.TELEGRAM_WEBHOOK_SECRET;
  if (!token || !secret) return res.status(503).json({ ok: false });
  if (!safeEqual(req.headers["x-telegram-bot-api-secret-token"], secret)) {
    return res.status(403).json({ ok: false });
  }

  let update;
  try {
    update = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ ok: false });
  }
  if (!update || typeof update !== "object") return res.status(400).json({ ok: false });

  const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  const callback = update.callback_query;
  const message = update.message;
  const chatId = callback ? String(callback.message?.chat?.id || "") : String(message?.chat?.id || "");
  const senderId = callback ? String(callback.from?.id || "") : String(message?.from?.id || "");

  if (!chatId || (callback && callback.message?.chat?.type !== "private") ||
      (message && message.chat?.type !== "private")) {
    return res.status(200).json({ ok: true });
  }

  try {
    if (!adminChatId) {
      if (message && /^\/start(?:@\w+)?(?:\s|$)/i.test(message.text || "")) {
        await reply(chatId,
          "ברוכים הבאים ל-Neural Archive!\n\nמזהה הצ'אט שלך: " + chatId +
          "\nהגדר TELEGRAM_ADMIN_CHAT_ID ב-Vercel ובצע פריסה מחדש.", token);
      }
      return res.status(200).json({ ok: true });
    }

    if (chatId !== adminChatId || senderId !== adminChatId) {
      return res.status(200).json({ ok: true });
    }

    if (callback) {
      if (!newsStorageReady()) {
        await telegramCall("answerCallbackQuery", { callback_query_id: callback.id, text: "חסר חיבור למסד הנתונים" }, token);
      } else {
        await handleCallback(callback, chatId, token);
      }
      return res.status(200).json({ ok: true });
    }
    if (!message) return res.status(200).json({ ok: true });

    const text = (message.text || message.caption || "").trim();
    const command = text.split(/\s+/)[0].split("@")[0].toLowerCase();
    const content = text.slice(text.indexOf(" ") + 1).trim();

    if (command === "/status") {
      let dbMessage = "⏳ מסד החדשות עדיין לא הוגדר ב-Vercel.";
      if (newsStorageReady()) {
        try {
          await newsQuery("GET", { select: "id", limit: "1" });
          dbMessage = "✅ מסד החדשות מחובר ופעיל.";
        } catch {
          dbMessage = "⚠️ הוגדרו פרטי מסד נתונים, אך החיבור או הטבלה אינם תקינים.";
        }
      }
      await reply(chatId, "✅ הבוט מחובר ואתה מזוהה כמנהל.\n" + dbMessage, token);
    } else if (command === "/start" || command === "/help") {
      await reply(chatId, helpMessage(), token);
    } else if (!newsStorageReady()) {
      await reply(chatId, "מסד החדשות עדיין לא מחובר. הוסף SUPABASE_URL ו-SUPABASE_SERVICE_ROLE_KEY ב-Vercel לאחר יצירת מסד הנתונים.", token);
    } else if (command === "/pending") {
      await handlePending(chatId, token);
    } else if (command === "/edit") {
      await handleEdit(chatId, token, content);
    } else if (command === "/add") {
      await handleSubmission(update, message, chatId, token, content);
    } else {
      // An ordinary link, optionally with a title and summary separated by |.
      if (extractUrl(text, message)) {
        await handleSubmission(update, message, chatId, token, text);
      } else {
        await reply(chatId, helpMessage(), token);
      }
    }
    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Telegram moderation error:", error?.name || "unknown");
    return res.status(502).json({ ok: false });
  }
}
