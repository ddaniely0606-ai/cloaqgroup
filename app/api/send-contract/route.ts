import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

interface PartnerInfo {
  name: string;
  signedAt: string;
}

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { pdfBase64, emails, partners, date } = (await req.json()) as {
      pdfBase64: string;
      emails: string[];
      partners: PartnerInfo[];
      date: string;
    };

    if (!pdfBase64 || !emails || emails.length !== 3 || !partners) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(pdfBase64, "base64");
    const partnerNames = partners.map((p) => p.name).join(" | ");
    const fileName = `Vertex-Media-Partnership-Agreement.pdf`;

    const emailPromises = emails.map((email) =>
      resend.emails.send({
        from: "ורטקס מדיה <onboarding@resend.dev>",
        to: [email],
        subject: `הסכם שותפות ורטקס מדיה — נחתם ב-${date}`,
        html: `
          <div dir="rtl" style="font-family: Arial, Helvetica, sans-serif; max-width: 620px; margin: 0 auto; background: #050508; color: #f5f5f7; border-radius: 16px; overflow: hidden;">

            <!-- Header -->
            <div style="background: #111827; padding: 40px 48px; text-align: center; border-bottom: 1px solid rgba(5,150,105,0.3);">
              <p style="color: #34d399; font-size: 11px; letter-spacing: 0.25em; margin: 0 0 8px; text-transform: uppercase;">Partnership Agreement</p>
              <p style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0; letter-spacing: 0.15em;">ורטקס מדיה</p>
            </div>

            <!-- Body -->
            <div style="padding: 40px 48px;">
              <div style="background: rgba(5,150,105,0.12); border: 1px solid rgba(5,150,105,0.3); border-radius: 12px; padding: 20px 24px; margin-bottom: 28px;">
                <p style="color: #34d399; font-size: 18px; font-weight: bold; margin: 0 0 4px;">✅ הסכם השותפות נחתם בהצלחה!</p>
                <p style="color: #8a8a9a; font-size: 13px; margin: 0;">כל שלושת השותפים חתמו — ${date}</p>
              </div>

              <p style="color: #f5f5f7; line-height: 1.8; margin: 0 0 16px;">שלום,</p>
              <p style="color: #8a8a9a; line-height: 1.8; margin: 0 0 16px;">
                הסכם השותפות של <strong style="color: #f5f5f7;">ורטקס מדיה</strong> נחתם רשמית על ידי כל השותפים.<br/>
                השותפים: <strong style="color: #34d399;">${partnerNames}</strong>
              </p>

              <!-- Partners table -->
              <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
                ${partners.map((p, i) => `
                  <tr>
                    <td style="padding: 10px 0; color: #8a8a9a; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.06); width: 40px;">${i + 1}.</td>
                    <td style="padding: 10px 0; color: #f5f5f7; font-weight: bold; border-bottom: 1px solid rgba(255,255,255,0.06);">${p.name}</td>
                    <td style="padding: 10px 0; color: #8a8a9a; font-size: 12px; border-bottom: 1px solid rgba(255,255,255,0.06); text-align: left;" dir="ltr">${p.signedAt}</td>
                  </tr>
                `).join("")}
              </table>

              <p style="color: #8a8a9a; line-height: 1.8; margin: 0 0 8px;">
                מצורף להודעה זו עותק PDF מלא וחתום של הסכם השותפות.<br/>
                <strong style="color: #f5f5f7;">מומלץ מאוד לשמור את הקובץ במקום בטוח.</strong>
              </p>

              <div style="background: rgba(255,255,255,0.04); border-radius: 10px; padding: 16px 20px; margin-top: 24px;">
                <p style="color: #8a8a9a; font-size: 12px; margin: 0; line-height: 1.7;">
                  💡 <strong style="color: #f5f5f7;">טיפ:</strong> שמרו את המסמך בענן (Google Drive, iCloud) וכן בגיבוי פיזי.<br/>
                  ניתן להדפיס את ה-PDF ולשמור עותק מודפס חתום אצל כל שותף.
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding: 20px 48px; border-top: 1px solid rgba(5,150,105,0.15); text-align: center;">
              <p style="color: #4a4a5a; font-size: 11px; margin: 0;">
                ורטקס מדיה Partnership Agreement • ${date}<br/>
                מסמך זה הינו הסכם משפטי מחייב
              </p>
            </div>
          </div>
        `,
        attachments: [
          {
            filename: fileName,
            content: pdfBuffer,
          },
        ],
      })
    );

    const results = await Promise.allSettled(emailPromises);
    const failed = results.filter((r) => r.status === "rejected");

    if (failed.length === 3) {
      console.error("All emails failed:", failed);
      return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
    }

    if (failed.length > 0) {
      console.warn(`${failed.length} of 3 emails failed`);
      return NextResponse.json({
        success: true,
        warning: `${failed.length} email(s) failed to send`,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-contract error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
