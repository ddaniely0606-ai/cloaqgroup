import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// In-memory rate limit (5 requests per 15 minutes per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= 5) return false;
  entry.count++;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

interface ContactPayload {
  name: string;
  email: string;
  company: string;
  message: string;
  honey: string;
}

type ValidationResult =
  | { success: true; data: ContactPayload }
  | { success: false; error: string };

function validatePayload(body: unknown): ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { success: false, error: "נתונים לא תקינים." };
  }

  const raw = body as Record<string, unknown>;

  const name = typeof raw.name === "string" ? raw.name.trim() : "";
  const email = typeof raw.email === "string" ? raw.email.trim() : "";
  const company = typeof raw.company === "string" ? raw.company.trim() : "";
  const message = typeof raw.message === "string" ? raw.message.trim() : "";
  const honey = typeof raw.honey === "string" ? raw.honey : "";

  if (name.length < 2 || name.length > 100) {
    return { success: false, error: "שם חייב להכיל בין 2 ל-100 תווים." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email) || email.length > 254) {
    return { success: false, error: "כתובת אימייל לא תקינה." };
  }

  if (company.length > 200) {
    return { success: false, error: "שם החברה חייב להיות עד 200 תווים." };
  }

  if (message.length < 10 || message.length > 2000) {
    return { success: false, error: "ההודעה חייבת להכיל בין 10 ל-2000 תווים." };
  }

  return { success: true, data: { name, email, company, message, honey } };
}

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Cache-Control": "no-store",
};

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "יותר מדי בקשות. נסו שוב בעוד 15 דקות." },
      {
        status: 429,
        headers: { ...securityHeaders, "Retry-After": "900" },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "בקשה לא תקינה." },
      { status: 400, headers: securityHeaders }
    );
  }

  const result = validatePayload(body);
  if (!result.success) {
    return NextResponse.json(
      { error: result.error },
      { status: 422, headers: securityHeaders }
    );
  }

  const { name, email, company, message, honey } = result.data;

  // Silent honeypot reject
  if (honey) {
    return NextResponse.json({ ok: true });
  }

  const html = `
    <div dir="rtl" style="font-family:sans-serif;max-width:600px">
      <h2 style="color:#059669">ליד חדש — Mythos Agency</h2>
      <p><strong>שם:</strong> ${escapeHtml(name)}</p>
      <p><strong>אימייל:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      ${company ? `<p><strong>חברה:</strong> ${escapeHtml(company)}</p>` : ""}
      <hr style="border-color:#059669;margin:16px 0"/>
      <p><strong>הודעה:</strong></p>
      <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${escapeHtml(message)}</p>
    </div>
  `;

  const resend = new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");

  try {
    await resend.emails.send({
      from: "Mythos Agency <onboarding@resend.dev>",
      to: ["hello@mythos-agency.com"],
      subject: `[ליד חדש] ${name}${company ? ` — ${company}` : ""}`,
      html,
      replyTo: email,
    });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "שגיאה בשליחה. נסו שוב." },
      { status: 500, headers: securityHeaders }
    );
  }

  return NextResponse.json({ ok: true }, { headers: securityHeaders });
}
