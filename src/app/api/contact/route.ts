import { NextResponse } from "next/server";
import { contactCategories } from "@/lib/content";

export const runtime = "nodejs";

type Payload = {
  name?: unknown;
  company?: unknown;
  email?: unknown;
  category?: unknown;
  message?: unknown;
  consent?: unknown;
  website?: unknown; // honeypot
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Contact form endpoint.
 * Validates input and forwards it as JSON to CONTACT_WEBHOOK_URL (e.g. a Slack
 * incoming webhook, Zapier/Make, or a mail-sending function). Without that
 * variable the endpoint answers 503 so the form can point people to email.
 */
export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Bots fill hidden fields; pretend success and drop it.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const data = {
    name: str(body.name, 100),
    company: str(body.company, 150),
    email: str(body.email, 200),
    category: str(body.category, 50),
    message: str(body.message, 5000),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "お名前を入力してください。";
  if (!EMAIL.test(data.email)) errors.email = "メールアドレスの形式をご確認ください。";
  if (!(contactCategories as readonly string[]).includes(data.category)) errors.category = "種別を選択してください。";
  if (data.message.length < 10) errors.message = "お問い合わせ内容を10文字以上でご入力ください。";
  if (body.consent !== true) errors.consent = "個人情報の取り扱いへの同意が必要です。";
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `【ARQO お問い合わせ】${data.category}\n${data.name}${data.company ? `（${data.company}）` : ""} <${data.email}>\n\n${data.message}`,
        ...data,
        receivedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error(String(res.status));
  } catch {
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
