import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const window = 15 * 60 * 1000; // 15 minutes
  const limit = 5;
  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + window });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

const securityHeaders = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: securityHeaders }
    );
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json() as Record<string, unknown>;
  const { name, email, company, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400, headers: securityHeaders }
    );
  }

  const nameStr = String(name);
  const emailStr = String(email);
  const companyStr = company ? String(company) : "";
  const messageStr = String(message);

  // Length validation
  if (nameStr.length > 100) {
    return NextResponse.json(
      { error: "Name must be 100 characters or fewer" },
      { status: 400, headers: securityHeaders }
    );
  }
  if (emailStr.length > 254) {
    return NextResponse.json(
      { error: "Email must be 254 characters or fewer" },
      { status: 400, headers: securityHeaders }
    );
  }
  if (companyStr.length > 200) {
    return NextResponse.json(
      { error: "Company name must be 200 characters or fewer" },
      { status: 400, headers: securityHeaders }
    );
  }
  if (messageStr.length > 2000) {
    return NextResponse.json(
      { error: "Message must be 2000 characters or fewer" },
      { status: 400, headers: securityHeaders }
    );
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailStr)) {
    return NextResponse.json(
      { error: "Invalid email address format" },
      { status: 400, headers: securityHeaders }
    );
  }

  const safeName = escapeHtml(nameStr);
  const safeEmail = escapeHtml(emailStr);
  const safeCompany = companyStr ? escapeHtml(companyStr) : "";
  const safeMessage = escapeHtml(messageStr);

  const { error } = await resend.emails.send({
    from: "Mythos Agency Contact <onboarding@resend.dev>",
    to: ["ddyTM@proton.me"],
    replyTo: emailStr,
    subject: `הודעה חדשה מ-${safeName}${safeCompany ? ` — ${safeCompany}` : ""}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #050508; color: #f5f5f7; padding: 40px; border: 1px solid rgba(5,150,105,0.2);">
        <h2 style="color: #34d399; margin: 0 0 24px; font-size: 1.4rem;">הודעה חדשה מאתר Mythos Agency</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 10px 0; color: #8a8a9a; width: 120px;">שם</td><td style="padding: 10px 0; color: #fff;">${safeName}</td></tr>
          <tr><td style="padding: 10px 0; color: #8a8a9a;">אימייל</td><td style="padding: 10px 0;"><a href="mailto:${safeEmail}" style="color: #34d399;">${safeEmail}</a></td></tr>
          ${safeCompany ? `<tr><td style="padding: 10px 0; color: #8a8a9a;">חברה</td><td style="padding: 10px 0; color: #fff;">${safeCompany}</td></tr>` : ""}
        </table>
        <div style="margin-top: 24px; padding: 20px; background: rgba(5,150,105,0.05); border-right: 3px solid #059669;">
          <p style="color: #8a8a9a; font-size: 0.8rem; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.1em;">הודעה</p>
          <p style="color: #f5f5f7; line-height: 1.7; margin: 0; white-space: pre-wrap;">${safeMessage}</p>
        </div>
        <p style="color: #4a4a5a; font-size: 0.75rem; margin-top: 32px; border-top: 1px solid rgba(5,150,105,0.1); padding-top: 16px;">נשלח מ-mythosagency.co.il</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500, headers: securityHeaders }
    );
  }

  return NextResponse.json({ success: true }, { headers: securityHeaders });
}
