"use client";

import React, { useRef, useState } from "react";
import { CheckCircle2, Loader2, RefreshCw, AlertTriangle } from "lucide-react";

/* ─────────────────────────────────────────────
   Types
───────────────────────────────────────────── */
interface PartnerData {
  label: string;
  name: string;
  id: string;
  email: string;
  signatureData: string;
  signed: boolean;
  signedAt: string;
}

function initPartners(): PartnerData[] {
  return [
    { label: "שחר", name: "", id: "", email: "", signatureData: "", signed: false, signedAt: "" },
    { label: "דניאל", name: "", id: "", email: "", signatureData: "", signed: false, signedAt: "" },
    { label: "סתיו", name: "", id: "", email: "", signatureData: "", signed: false, signedAt: "" },
  ];
}

/* ─────────────────────────────────────────────
   Signature Pad (inline, no external lib)
───────────────────────────────────────────── */
function SignaturePad({ onConfirm }: { onConfirm: (dataURL: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const [hasDrawn, setHasDrawn] = useState(false);

  const pt = (e: React.MouseEvent | React.TouchEvent) => {
    const c = canvasRef.current!;
    const r = c.getBoundingClientRect();
    const sx = c.width / r.width;
    const sy = c.height / r.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - r.left) * sx,
        y: (e.touches[0].clientY - r.top) * sy,
      };
    }
    return {
      x: (e.clientX - r.left) * sx,
      y: (e.clientY - r.top) * sy,
    };
  };

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    drawing.current = true;
    last.current = pt(e);
    setHasDrawn(true);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    const c = canvasRef.current!;
    const ctx = c.getContext("2d")!;
    const p = pt(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.strokeStyle = "#111827";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    last.current = p;
  };

  const onEnd = () => { drawing.current = false; };

  const clear = () => {
    canvasRef.current!.getContext("2d")!.clearRect(0, 0, 800, 320);
    setHasDrawn(false);
  };

  const confirm = () => {
    if (!hasDrawn) { alert("יש לחתום בשדה החתימה תחילה"); return; }
    onConfirm(canvasRef.current!.toDataURL("image/png"));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-[#8a8a9a]">חתימה *</p>
      <div
        className="relative rounded-xl overflow-hidden border-2 border-dashed border-[rgba(5,150,105,0.4)] bg-white"
        style={{ height: 160 }}
      >
        <canvas
          ref={canvasRef}
          width={800}
          height={320}
          className="w-full h-full touch-none cursor-crosshair block"
          onMouseDown={onStart}
          onMouseMove={onMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
          onTouchStart={onStart}
          onTouchMove={onMove}
          onTouchEnd={onEnd}
        />
        {!hasDrawn && (
          <p className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm pointer-events-none select-none">
            חתום/י כאן (עם העכבר או האצבע)
          </p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={clear}
          className="flex items-center gap-1.5 text-sm text-[#8a8a9a] hover:text-white transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> נקה
        </button>
        <button
          type="button"
          onClick={confirm}
          className="px-7 py-2.5 bg-[#059669] hover:bg-[#047857] text-white text-sm font-semibold rounded-xl transition-all active:scale-95"
        >
          ✓ אני חותם/ת על ההסכם
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Contract Document (what goes into PDF)
───────────────────────────────────────────── */
function ContractDocument({
  partners,
  dateStr,
  contractRef,
}: {
  partners: PartnerData[];
  dateStr: string;
  contractRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={contractRef}
      id="contract-document"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        direction: "rtl",
        backgroundColor: "#ffffff",
        color: "#111827",
      }}
      className="rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
    >
      {/* Header */}
      <div
        style={{ backgroundColor: "#111827", color: "#ffffff" }}
        className="p-8 md:p-10 text-center"
      >
        <p style={{ color: "#34d399", letterSpacing: "0.25em" }} className="text-xs mb-2 font-medium uppercase">
          Partnership Agreement • הסכם שותפות
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-1">הסכם שותפות עסקית</h2>
        <p style={{ color: "#34d399" }} className="text-4xl font-black tracking-widest mt-2">
          ורטקס מדיה
        </p>
        <p style={{ color: "#9ca3af" }} className="text-sm mt-3">
          {dateStr}
        </p>
      </div>

      {/* Body */}
      <div className="p-8 md:p-12 space-y-7" style={{ lineHeight: "1.8", fontSize: "15px" }}>
        <p style={{ color: "#6b7280", borderBottom: "1px solid #e5e7eb", paddingBottom: "1rem" }} className="text-center">
          הסכם זה נערך ונחתם ביום{" "}
          <strong style={{ color: "#111827" }}>{dateStr}</strong> בין השותפים
          המפורטים להלן, הפועלים כאנשים פרטיים המבקשים להקים שותפות עסקית
          רשמית ומחייבת.
        </p>

        {/* Clause 1 */}
        <Clause title="סעיף 1 — מהות השותפות">
          <p>
            הצדדים מסכימים בזאת להקים ולנהל שותפות עסקית תחת השם המסחרי{" "}
            <strong>&quot;ורטקס מדיה&quot;</strong> (להלן: &quot;השותפות&quot;), לצורך
            פעילות עסקית משותפת בתחום השיווק הדיגיטלי, יצירת תוכן, ניהול
            מותגים, שירותי מדיה וכל פעילות עסקית נלווית שתוסכם פה-אחד על ידי
            השותפים.
          </p>
        </Clause>

        {/* Clause 2 — Parties */}
        <Clause title="סעיף 2 — הצדדים לחוזה">
          <div
            style={{ backgroundColor: "#f9fafb", borderRadius: "12px", padding: "16px" }}
          >
            {partners.map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "10px 0",
                  borderBottom: i < 2 ? "1px solid #e5e7eb" : "none",
                }}
              >
                <span
                  style={{
                    backgroundColor: "#059669",
                    color: "#fff",
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: "bold",
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span style={{ fontWeight: "bold", width: "60px" }}>{p.label}</span>
                {p.signed ? (
                  <span style={{ color: "#374151" }}>
                    {p.name}&nbsp;—&nbsp;ת&quot;ז:&nbsp;{p.id}
                  </span>
                ) : (
                  <span style={{ color: "#9ca3af", fontStyle: "italic" }}>
                    ממתין לחתימה...
                  </span>
                )}
              </div>
            ))}
          </div>
        </Clause>

        {/* Clause 3 */}
        <Clause title="סעיף 3 — חלוקת בעלות">
          <p>
            כל אחד משלושת השותפים מחזיק בחלק שווה ומלא בשותפות, קרי{" "}
            <strong>שליש (1/3 = 33.33%)</strong> מכלל השותפות. חלוקת הבעלות
            הינה שווה בין כל השותפים ולא ניתנת לשינוי אלא בהסכמה בכתב, מפורשת
            ומתועדת של כלל השותפים.
          </p>
        </Clause>

        {/* Clause 4 */}
        <Clause title="סעיף 4 — חלוקת רווחים והפסדים">
          <Items
            items={[
              "הרווחים הנקיים של השותפות יחולקו בחלקים שווים — שליש (33.33%) לכל שותף.",
              "חלוקת רווחים תתבצע בסוף כל חודש קלנדרי, לאחר הפרשת 20% מהרווחים לקרן חירום עסקית.",
              "לא תתבצע כל חלוקת רווח כל עוד השותפות מצויה בגרעון כספי.",
              "הפסדים, אם יהיו, יחולקו גם הם בחלקים שווים בין שלושת השותפים.",
              "כל שינוי במדיניות חלוקת הרווחים ידרוש הסכמה פה-אחד בכתב.",
            ]}
          />
        </Clause>

        {/* Clause 5 */}
        <Clause title="סעיף 5 — ניהול פיננסי">
          <Items
            items={[
              "השותפות תנהל חשבון בנק עסקי ייעודי הרשום על שמה. לא ייעשה שימוש בחשבונות אישיים לצרכי השותפות.",
              "הוצאות עסקיות עד ₪1,000 — כל שותף רשאי לאשר ולבצע באופן עצמאי.",
              "הוצאות בין ₪1,000 ל-₪10,000 — ידרשו אישור של לפחות שניים מתוך שלושת השותפים.",
              "הוצאות מעל ₪10,000 — ידרשו אישור פה-אחד של כל שלושת השותפים, בכתב.",
              "תנוהל הנהלת חשבונות תקינה; דוח כספי חודשי יועבר לכל השותפים עד ה-5 לחודש.",
              "כל שותף רשאי לעיין בכל מסמך פיננסי של השותפות בכל עת ללא הגבלה.",
              "תישמר קרן חירום עסקית בגובה לפחות 3 חודשי הוצאות תפעוליות ממוצעות.",
              "בכל שנה קלנדרית תיערך ביקורת חשבונות פנימית משותפת על ידי כל השותפים.",
            ]}
          />
        </Clause>

        {/* Clause 6 */}
        <Clause title="סעיף 6 — קבלת החלטות">
          <Items
            items={[
              "החלטות שוטפות (יומיומיות) — כל שותף רשאי לקבל ולבצע באופן עצמאי.",
              "החלטות אסטרטגיות (כניסה לשוק חדש, גיוס עובד, שינוי מותג) — רוב של 2 מתוך 3.",
              "החלטות מהותיות (שינוי הסכם, קבלת שותף חדש, פיזור השותפות) — פה-אחד של כל שלושת השותפים.",
              "אין שותף מחויב להחלטה שנתקבלה בניגוד לסעיפי ההחלטה לעיל.",
            ]}
          />
        </Clause>

        {/* Clause 7 */}
        <Clause title="סעיף 7 — תפקידים ואחריות">
          <p>
            כל שותף ייקח על עצמו תחום אחריות עסקי מוגדר שייקבע בנספח להסכם זה
            תוך 30 יום מיום החתימה. חלוקת התפקידים ניתנת לשינוי בהסכמת רוב
            השותפים. אין שותף ייחשב עובד של השותפות ללא הסכם עבודה נפרד.
          </p>
        </Clause>

        {/* Clause 8 */}
        <Clause title="סעיף 8 — מחויבות ושעות עבודה">
          <p>
            כל שותף מתחייב להקדיש מאמץ מלא, עקבי ומשמעותי לקידום ולצמיחת
            השותפות. כל שותף יימנע מניגוד עניינים ויגלה לשאר השותפים כל מידע
            רלוונטי שעשוי להשפיע על השותפות.
          </p>
        </Clause>

        {/* Clause 9 */}
        <Clause title="סעיף 9 — סודיות ואיסור תחרות">
          <Items
            items={[
              "כל מידע עסקי, פיננסי, לקוחות, ספקים, תוכניות ואסטרטגיות — נחשב מידע סודי וחסוי של השותפות.",
              "אין לגלות מידע עסקי לצד שלישי ללא הסכמה מפורשת ובכתב של כל השותפים.",
              "כל שותף מתחייב שלא לפעול בתחרות ישירה עם השותפות בזמן קיומה ולמשך 12 חודשים לאחר עזיבה.",
              "איסור פנייה ישירה ללקוחות השותפות לצרכים אישיים בזמן קיום השותפות ו-24 חודשים לאחריה.",
            ]}
          />
        </Clause>

        {/* Clause 10 */}
        <Clause title="סעיף 10 — כניסת שותף חדש">
          <p>
            הצטרפות שותף חדש תדרוש הסכמה פה-אחד של כל שלושת השותפים הקיימים,
            ניסוח ורישום הסכם שותפות חדש, ועדכון כל המסמכים המשפטיים הרלוונטיים.
          </p>
        </Clause>

        {/* Clause 11 */}
        <Clause title="סעיף 11 — עזיבת שותף">
          <Items
            items={[
              "שותף המבקש לעזוב יודיע בכתב לשני השותפים האחרים לפחות 90 יום מראש.",
              "שווי חלקתו של השותף העוזב תוערך על ידי רואה חשבון מוסכם על ידי כל הצדדים.",
              "לשני השותפים הנותרים תהיה זכות ראשונים לרכישת חלקת השותף העוזב, תוך 60 יום מהצעתו.",
              "השותף העוזב יחויב בעמידה בכל התחייבויות הסודיות ואי-התחרות כמפורט בסעיף 9.",
            ]}
          />
        </Clause>

        {/* Clause 12 */}
        <Clause title="סעיף 12 — יישוב סכסוכים">
          <Items
            items={[
              "הצדדים מתחייבים לפתור כל מחלוקת תחילה בשיח ישיר ופתוח בתוך 30 יום.",
              "סכסוך שלא יוכרע בהידברות ייועבר לגישור בפני מגשר מוסכם על ידי הצדדים.",
              "כישלון הגישור יביא להכרעה בבית המשפט המוסמך במדינת ישראל.",
              "הדין החל על הסכם זה הוא הדין הישראלי בלבד.",
            ]}
          />
        </Clause>

        {/* Clause 13 */}
        <Clause title="סעיף 13 — שינויים להסכם">
          <p>
            כל שינוי, תיקון, או תוספת להסכם זה יהיה תקף אך ורק אם נעשה בכתב
            וחתום על ידי כל שלושת השותפים. שום הסכם בעל-פה לא יוכר כשינוי
            להסכם זה.
          </p>
        </Clause>

        {/* Clause 14 */}
        <Clause title="סעיף 14 — תוקף ותחולה">
          <p>
            הסכם זה ייכנס לתוקף מיידי ביום חתימתו על ידי כל שלושת השותפים ויהיה
            תקף ומחייב ללא הגבלת זמן, עד לפיזור מוסכם ורשמי של השותפות.
          </p>
        </Clause>

        {/* ─── Signatures Table ─── */}
        <div
          style={{
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "2px solid #111827",
          }}
        >
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              textAlign: "center",
              marginBottom: "1.5rem",
              color: "#111827",
            }}
          >
            חתימות השותפים
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "16px",
            }}
          >
            {partners.map((p, i) => (
              <div
                key={i}
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: "12px",
                  padding: "16px",
                  minHeight: "180px",
                }}
              >
                <p
                  style={{
                    fontWeight: "bold",
                    textAlign: "center",
                    marginBottom: "12px",
                    color: "#111827",
                    fontSize: "16px",
                  }}
                >
                  {p.label}
                </p>
                {p.signed ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.signatureData}
                      alt={`חתימת ${p.name}`}
                      style={{
                        width: "100%",
                        height: "80px",
                        objectFit: "contain",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                        marginBottom: "10px",
                        background: "#fff",
                      }}
                    />
                    <div style={{ fontSize: "12px", color: "#374151", lineHeight: "1.6" }}>
                      <p>
                        <strong>שם:</strong> {p.name}
                      </p>
                      <p>
                        <strong>ת&quot;ז:</strong> {p.id}
                      </p>
                      <p>
                        <strong>תאריך:</strong> {p.signedAt}
                      </p>
                    </div>
                  </>
                ) : (
                  <div
                    style={{
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px dashed #d1d5db",
                      borderRadius: "8px",
                      color: "#9ca3af",
                      fontSize: "13px",
                      textAlign: "center",
                    }}
                  >
                    ממתין לחתימה
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer stamp */}
          <p
            style={{
              textAlign: "center",
              color: "#9ca3af",
              fontSize: "11px",
              marginTop: "2rem",
              paddingTop: "1rem",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            מסמך זה הינו הסכם משפטי מחייב • ורטקס מדיה Partnership Agreement •{" "}
            {dateStr}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Helper sub-components
───────────────────────────────────────────── */
function Clause({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <h3
        style={{
          fontWeight: "bold",
          color: "#111827",
          fontSize: "17px",
          borderRight: "4px solid #059669",
          paddingRight: "12px",
          margin: 0,
        }}
      >
        {title}
      </h3>
      <div style={{ color: "#374151" }}>{children}</div>
    </div>
  );
}

function Items({ items }: { items: string[] }) {
  const letters = ["א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: "10px" }}>
          <span style={{ color: "#059669", fontWeight: "bold", flexShrink: 0 }}>
            {letters[i]}.
          </span>
          <span>{item}</span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main component
───────────────────────────────────────────── */
export default function ContractForm() {
  const [partners, setPartners] = useState<PartnerData[]>(initPartners());
  const [activeTab, setActiveTab] = useState(0);
  const [status, setStatus] = useState<
    "idle" | "generating" | "sending" | "sent" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const contractRef = useRef<HTMLDivElement>(null);

  const today = new Date();
  const dateStr = today.toLocaleDateString("he-IL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const update = (idx: number, field: keyof PartnerData, val: string) => {
    setPartners((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: val } : p))
    );
  };

  const handleSign = (idx: number, signatureData: string) => {
    const p = partners[idx];
    if (!p.name.trim() || !p.id.trim() || !p.email.trim()) {
      alert('יש למלא את כל השדות: שם מלא, ת"ז ואימייל');
      return;
    }
    if (!/^\d{9}$/.test(p.id.trim())) {
      alert('מספר ת"ז חייב להכיל בדיוק 9 ספרות');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(p.email.trim())) {
      alert("כתובת האימייל אינה תקינה");
      return;
    }
    const now = new Date().toLocaleString("he-IL", {
      dateStyle: "short",
      timeStyle: "medium",
    });
    setPartners((prev) =>
      prev.map((pt, i) =>
        i === idx ? { ...pt, signatureData, signed: true, signedAt: now } : pt
      )
    );
    // Auto-advance to next unsigned partner
    const nextIdx = partners.findIndex((pt, i) => i > idx && !pt.signed);
    if (nextIdx !== -1) setActiveTab(nextIdx);
  };

  const allSigned = partners.every((p) => p.signed);

  const handleGenerateSend = async () => {
    setStatus("generating");
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const el = contractRef.current;
      if (!el) throw new Error("Contract element not found");

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const imgH = (canvas.height * pageW) / canvas.width;

      let yOffset = 0;
      let pageIndex = 0;
      while (yOffset < imgH) {
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", 0, -yOffset, pageW, imgH);
        yOffset += pageH;
        pageIndex++;
      }

      const pdfBase64 = pdf.output("datauristring").split(",")[1];

      setStatus("sending");

      const res = await fetch("/api/send-contract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfBase64,
          emails: partners.map((p) => p.email),
          partners: partners.map((p) => ({ name: p.name, signedAt: p.signedAt })),
          date: dateStr,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "שגיאה בשליחת האימיילים");
      }

      setStatus("sent");
    } catch (err) {
      console.error(err);
      setErrorMsg(err instanceof Error ? err.message : "שגיאה לא ידועה");
      setStatus("error");
    }
  };

  const signedCount = partners.filter((p) => p.signed).length;

  return (
    <div className="min-h-screen bg-[#050508] py-12 px-4" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-10">

        {/* ── Page header ── */}
        <div className="text-center space-y-3">
          <p
            className="text-xs tracking-[0.3em] uppercase font-medium"
            style={{ color: "#059669", fontFamily: "var(--font-syne)" }}
          >
            ורטקס מדיה
          </p>
          <h1
            className="text-3xl md:text-4xl font-bold text-white"
            style={{ fontFamily: "var(--font-syne)" }}
          >
            הסכם שותפות עסקית
          </h1>
          <p className="text-[#8a8a9a]">{dateStr}</p>

          {/* Progress bar */}
          <div className="flex justify-center gap-2 mt-4">
            {partners.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border transition-all"
                style={{
                  borderColor: p.signed
                    ? "rgba(5,150,105,0.5)"
                    : "rgba(255,255,255,0.1)",
                  color: p.signed ? "#34d399" : "#8a8a9a",
                  backgroundColor: p.signed
                    ? "rgba(5,150,105,0.1)"
                    : "transparent",
                }}
              >
                {p.signed ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <span className="w-3.5 h-3.5 rounded-full border border-current inline-block" />
                )}
                {p.label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Contract Document ── */}
        <ContractDocument
          partners={partners}
          dateStr={dateStr}
          contractRef={contractRef}
        />

        {/* ── Signing UI (not in PDF) ── */}
        <div className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-[#8a8a9a] text-sm">
              {signedCount} מתוך 3 שותפים חתמו —{" "}
              {allSigned ? "✅ כולם חתמו!" : "ממתין לחתימות..."}
            </p>

            {/* Partner tabs */}
            <div className="flex justify-center gap-2 flex-wrap">
              {partners.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="px-5 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor:
                      activeTab === i
                        ? "#059669"
                        : p.signed
                        ? "rgba(5,150,105,0.15)"
                        : "#0d0d18",
                    color:
                      activeTab === i
                        ? "#ffffff"
                        : p.signed
                        ? "#34d399"
                        : "#8a8a9a",
                    border:
                      activeTab === i
                        ? "1px solid #059669"
                        : p.signed
                        ? "1px solid rgba(5,150,105,0.3)"
                        : "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {p.signed ? "✓ " : ""}
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active partner sign form */}
          {!partners[activeTab].signed ? (
            <div
              className="rounded-2xl p-6 md:p-8 space-y-5"
              style={{
                backgroundColor: "#0d0d18",
                border: "1px solid rgba(5,150,105,0.2)",
              }}
            >
              <h3 className="text-white font-semibold text-lg">
                חתימת{" "}
                <span style={{ color: "#059669" }}>
                  {partners[activeTab].label}
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full name */}
                <div className="space-y-1.5">
                  <label className="text-sm text-[#8a8a9a]">שם מלא *</label>
                  <input
                    type="text"
                    placeholder="שם פרטי ושם משפחה"
                    value={partners[activeTab].name}
                    onChange={(e) => update(activeTab, "name", e.target.value)}
                    dir="rtl"
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-[#4a4a5a] outline-none transition-all"
                    style={{
                      backgroundColor: "#050508",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#059669")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* ID number */}
                <div className="space-y-1.5">
                  <label className="text-sm text-[#8a8a9a]">מספר ת&quot;ז *</label>
                  <input
                    type="text"
                    placeholder="9 ספרות"
                    value={partners[activeTab].id}
                    onChange={(e) =>
                      update(
                        activeTab,
                        "id",
                        e.target.value.replace(/\D/g, "").slice(0, 9)
                      )
                    }
                    dir="ltr"
                    inputMode="numeric"
                    maxLength={9}
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-[#4a4a5a] outline-none transition-all"
                    style={{
                      backgroundColor: "#050508",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#059669")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)")
                    }
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-sm text-[#8a8a9a]">
                    כתובת אימייל לקבלת החוזה *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={partners[activeTab].email}
                    onChange={(e) =>
                      update(activeTab, "email", e.target.value)
                    }
                    dir="ltr"
                    className="w-full rounded-xl px-4 py-3 text-white placeholder-[#4a4a5a] outline-none transition-all"
                    style={{
                      backgroundColor: "#050508",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor = "#059669")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.1)")
                    }
                  />
                </div>
              </div>

              {/* Signature canvas */}
              <SignaturePad onConfirm={(data) => handleSign(activeTab, data)} />

              <p className="text-xs text-[#4a4a5a] text-center">
                בחתימתך אתה/את מאשר/ת כי קראת את כל תנאי ההסכם וכי הנך מסכים/ה
                להם במלואם.
              </p>
            </div>
          ) : (
            <div
              className="rounded-2xl p-6 flex items-center gap-4"
              style={{
                backgroundColor: "#0d0d18",
                border: "1px solid rgba(5,150,105,0.3)",
              }}
            >
              <CheckCircle2
                className="flex-shrink-0"
                style={{ color: "#059669", width: 32, height: 32 }}
              />
              <div>
                <p className="text-white font-semibold">
                  {partners[activeTab].label} חתם/ה בהצלחה ✓
                </p>
                <p className="text-[#8a8a9a] text-sm">
                  {partners[activeTab].name} — {partners[activeTab].signedAt}
                </p>
              </div>
            </div>
          )}

          {/* ── All signed → Generate & Send ── */}
          {allSigned && (
            <div className="text-center space-y-4 pt-4">
              {status === "idle" && (
                <button
                  onClick={handleGenerateSend}
                  className="px-10 py-4 text-white text-lg font-bold rounded-2xl transition-all active:scale-95"
                  style={{
                    backgroundColor: "#059669",
                    boxShadow: "0 8px 32px rgba(5,150,105,0.35)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#047857")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#059669")
                  }
                >
                  📄 הפק PDF ושלח לכל השותפים
                </button>
              )}

              {(status === "generating" || status === "sending") && (
                <div className="flex items-center justify-center gap-3 text-[#8a8a9a]">
                  <Loader2
                    className="animate-spin"
                    style={{ color: "#059669", width: 20, height: 20 }}
                  />
                  <span>
                    {status === "generating"
                      ? "מייצר קובץ PDF..."
                      : "שולח אימיילים לשלושת השותפים..."}
                  </span>
                </div>
              )}

              {status === "sent" && (
                <div
                  className="rounded-2xl p-8 space-y-3"
                  style={{
                    backgroundColor: "rgba(5,150,105,0.08)",
                    border: "1px solid rgba(5,150,105,0.3)",
                  }}
                >
                  <CheckCircle2
                    className="mx-auto"
                    style={{ color: "#059669", width: 48, height: 48 }}
                  />
                  <p className="text-white font-bold text-xl">
                    ההסכם נשלח בהצלחה! 🎉
                  </p>
                  <p className="text-[#8a8a9a] text-sm">
                    קובץ PDF חתום של הסכם השותפות נשלח לאימייל של כל שלושת
                    השותפים.
                    <br />
                    מומלץ לשמור את הקובץ במקום בטוח.
                  </p>
                </div>
              )}

              {status === "error" && (
                <div
                  className="rounded-2xl p-6 space-y-3"
                  style={{
                    backgroundColor: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.3)",
                  }}
                >
                  <AlertTriangle
                    className="mx-auto"
                    style={{ color: "#f87171", width: 36, height: 36 }}
                  />
                  <p className="text-white font-semibold">שגיאה בשליחה</p>
                  <p className="text-[#8a8a9a] text-sm">{errorMsg}</p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2 rounded-xl text-sm transition-colors"
                    style={{
                      border: "1px solid rgba(239,68,68,0.3)",
                      color: "#f87171",
                    }}
                  >
                    נסה שוב
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div className="text-center text-[#4a4a5a] text-xs pb-8 space-y-1">
          <p>מסמך זה הינו הסכם משפטי מחייב בין שותפי ורטקס מדיה</p>
          <p>© {today.getFullYear()} ורטקס מדיה — כל הזכויות שמורות</p>
        </div>
      </div>
    </div>
  );
}
