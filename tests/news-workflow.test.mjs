import test from "node:test";
import assert from "node:assert/strict";
import telegramHandler from "../api/telegram.mjs";
import newsHandler from "../api/news.mjs";
import { normalizeSource } from "../api/_news-store.mjs";

function response(data, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => data };
}
function fakeResponse() {
  return {
    headers: {}, statusCode: 200, body: undefined,
    setHeader(key, value) { this.headers[key] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(value) { this.body = value; return this; },
  };
}
async function invoke(handler, { method = "POST", body, secret = "test-secret", query = {} } = {}) {
  const res = fakeResponse();
  await handler({ method, body, headers: { "x-telegram-bot-api-secret-token": secret }, query }, res);
  return res;
}

function setup(admin = "145088490", database = false) {
  process.env.TELEGRAM_BOT_TOKEN = "test-bot-token";
  process.env.TELEGRAM_WEBHOOK_SECRET = "test-secret";
  process.env.TELEGRAM_ADMIN_CHAT_ID = admin;
  if (database) {
    process.env.SUPABASE_URL = "https://example.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-role";
  } else {
    delete process.env.SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;
  }
}

const adminMessage = (text, id = 44) => ({
  update_id: id,
  message: { text, chat: { id: 145088490, type: "private" }, from: { id: 145088490 } },
});

test("accepts web links and rejects non-web schemes", () => {
  assert.equal(normalizeSource("https://example.com/story#section"), "https://example.com/story");
  assert.equal(normalizeSource("javascript:alert(1)"), null);
  assert.equal(normalizeSource("http://localhost/news"), null);
  assert.equal(normalizeSource("https://user:pass@example.com/"), null);
});

test("invalid webhook secret is rejected before any external calls", async () => {
  setup();
  const previous = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Should not fetch"); };
  try {
    const res = await invoke(telegramHandler, { body: adminMessage("/status"), secret: "wrong" });
    assert.equal(res.statusCode, 403);
  } finally { globalThis.fetch = previous; }
});

test("non-admin user is ignored", async () => {
  setup();
  const previous = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Should not fetch"); };
  try {
    const res = await invoke(telegramHandler, { body: { message: { text: "/status", chat: { id: 555, type: "private" }, from: { id: 555 } } } });
    assert.equal(res.statusCode, 200);
  } finally { globalThis.fetch = previous; }
});

test("status command reports missing database without leaking credentials", async () => {
  setup();
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    calls.push({ url: String(url), body: JSON.parse(options.body) });
    return response({ ok: true });
  };
  try {
    const res = await invoke(telegramHandler, { body: adminMessage("/status") });
    assert.equal(res.statusCode, 200);
    assert.equal(calls.length, 1);
    assert.match(calls[0].body.text, /Supabase|מסד/);
    assert.ok(!calls[0].body.text.includes("test-bot-token"));
  } finally { globalThis.fetch = previous; }
});

test("submitted original summary enters pending queue with approval buttons", async () => {
  setup("145088490", true);
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const address = String(url);
    calls.push({ url: address, options });
    if (address.includes("/rest/v1/news_items")) {
      assert.equal(options.method, "POST");
      const body = JSON.parse(options.body);
      assert.equal(body.status, "pending");
      assert.equal(body.source_host, "example.com");
      return response([{ id: 7, title: body.title, summary: body.summary, source_url: body.source_url, status: "pending" }]);
    }
    return response({ ok: true });
  };
  try {
    const input = "/add https://example.com/post | מודל חדש ומשמעותי לבינה מלאכותית | פורסם מודל חדש עם יכולות מעניינות בתחום הפיתוח והשפה.";
    const res = await invoke(telegramHandler, { body: adminMessage(input) });
    assert.equal(res.statusCode, 200);
    assert.equal(calls.length, 2);
    const sendPayload = JSON.parse(calls[1].options.body);
    assert.equal(sendPayload.reply_markup.inline_keyboard[0][0].callback_data, "approve:7");
  } finally { globalThis.fetch = previous; }
});

test("approval changes only a pending item and acknowledges callback", async () => {
  setup("145088490", true);
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, options) => {
    const address = String(url);
    calls.push({ url: address, options });
    if (address.includes("/rest/v1/news_items") && options.method === "GET") {
      return response([{ id: 7, title: "מודל חדש ומעניין", summary: "סיכום מקורי בעברית על המודל החדש ועל האפשרויות המעשיות שלו.", status: "pending", source_url: "https://example.com/post" }]);
    }
    if (address.includes("/rest/v1/news_items") && options.method === "PATCH") {
      const data = JSON.parse(options.body);
      assert.equal(data.status, "published");
      assert.ok(address.includes("status=eq.pending"));
      return response([{ id: 7, status: "published" }]);
    }
    return response({ ok: true });
  };
  try {
    const callback = { callback_query: { id: "callback-123", data: "approve:7", from: { id: 145088490 }, message: { chat: { id: 145088490, type: "private" } } } };
    const res = await invoke(telegramHandler, { body: callback });
    assert.equal(res.statusCode, 200);
    assert.ok(calls.some((c) => c.url.includes("/answerCallbackQuery")));
    assert.ok(calls.some((c) => c.url.includes("/rest/v1/news_items") && c.options.method === "PATCH"));
  } finally { globalThis.fetch = previous; }
});

test("public news API returns only approved records from storage", async () => {
  setup("145088490", true);
  const previous = globalThis.fetch;
  globalThis.fetch = async (url) => {
    const address = String(url);
    assert.ok(address.includes("status=eq.published"));
    return response([{ id: 7, title: "ידיעה", summary: "תוכן", source_url: "https://example.com", source_host: "example.com" }]);
  };
  try {
    const res = await invoke(newsHandler, { method: "GET", query: { limit: "10" } });
    assert.equal(res.statusCode, 200);
    assert.equal(res.body.items.length, 1);
    assert.equal(res.body.configured, true);
  } finally { globalThis.fetch = previous; }
});


test("weakly grounded model summaries require a second confirmation", async () => {
  setup("145088490", true);
  const prior = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    calls.push([String(url), options]);
    if (String(url).includes("/rest/v1/news_items") && options.method === "GET") {
      return response([{
        id: 21, title: "מודל חדש לתכנות", summary: "עדכון חדשותי למודל בינה מלאכותית שהגיע ממקור ראשוני ומהימן.",
        source_url: "https://example.com/a", status: "pending", ai_confidence: 30
      }]);
    }
    if (String(url).includes("/rest/v1/news_items") && options.method === "PATCH") {
      return response([{ id: 21, status: "published" }]);
    }
    return response({ ok: true });
  };
  const callback = (data) => ({
    callback_query: { id: data, data, from: { id: 145088490 },
      message: { chat: { id: 145088490, type: "private" } } }
  });
  try {
    await invoke(telegramHandler, { body: callback("approve:21") });
    assert.equal(calls.filter((x) => x[1].method === "PATCH").length, 0);
    const reply = calls.find((x) => x[0].includes("sendMessage"));
    assert.equal(JSON.parse(reply[1].body).reply_markup.inline_keyboard[0][0].callback_data, "approve_confirm:21");
    await invoke(telegramHandler, { body: callback("approve_confirm:21") });
    assert.equal(calls.filter((x) => x[1].method === "PATCH").length, 1);
  } finally {
    globalThis.fetch = prior;
  }
});


test("language-review drafts in /pending can only be edited", async () => {
  setup("145088490", true);
  const previous = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    const address = String(url);
    calls.push({ address, options });
    if (address.includes("/rest/v1/news_items")) {
      return response([{ id: 27, title: "טיוטה על מודל בינה מלאכותית",
        summary: "התקציר ממתין לתיקון ניסוח לפני אישור ופרסום בחדשות באתר.",
        source_url: "https://example.com/item", status: "draft",
        language_quality_state: "needs_review", ai_evidence: [] }]);
    }
    return response({ ok: true });
  };
  try {
    const result = await invoke(telegramHandler, { body: adminMessage("/pending") });
    assert.equal(result.statusCode, 200);
    const outbound = calls.find((x) => x.address.includes("/sendMessage"));
    const payload = JSON.parse(outbound.options.body);
    assert.match(payload.text, /נדרשת הגהה ידנית/);
    assert.equal(payload.reply_markup.inline_keyboard[0].length, 1);
    assert.equal(payload.reply_markup.inline_keyboard[0][0].callback_data, "edit:27");
  } finally {
    globalThis.fetch = previous;
  }
});

test("an AI item marked as linguistically unsafe cannot be published", async () => {
  setup("145088490", true);
  const previous = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options) => {
    const address = String(url);
    calls.push({ address, options });
    if (address.includes("/rest/v1/news_items") && options.method === "GET") {
      return response([{ id: 27, title: "מודל AI חדש",
        summary: "הסיכום כולל מידע מוגבל על פיתוח מודל חדש שטרם עבר בדיקה.",
        source_url: "https://example.com/item", status: "pending",
        ai_confidence: 90, language_quality_state: "needs_review" }]);
    }
    return response({ ok: true });
  };
  try {
    const callback = { callback_query: { id: "check-27", data: "approve_confirm:27",
      from: { id: 145088490 }, message: { chat: { id: 145088490, type: "private" } } } };
    const result = await invoke(telegramHandler, { body: callback });
    assert.equal(result.statusCode, 200);
    assert.ok(!calls.some((x) => x.options?.method === "PATCH"));
    assert.ok(calls.some((x) => x.address.includes("/sendMessage")));
  } finally {
    globalThis.fetch = previous;
  }
});
