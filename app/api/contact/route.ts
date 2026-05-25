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

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, company, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const safeName = escapeHtml(String(name));
  const safeEmail = escapeHtml(String(email));
  const safeCompany = company ? escapeHtml(String(company)) : "";
  const safeMessage = escapeHtml(String(message));

  const { error } = await resend.emails.send({
    from: "Mythos Agency Contact <onboarding@resend.dev>",
    to: ["ddyTM@proton.me"],
    replyTo: email,
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
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
