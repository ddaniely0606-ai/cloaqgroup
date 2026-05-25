"use client";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "כמה עולה לעבוד עם CloaqGroup?",
    a: "המחיר תלוי בהיקף הפרויקט ובסל השירותים הנדרש. אנחנו עובדים עם מותגים ברמות תקציב שונות — ממותגים בצמיחה ועד חברות Enterprise. בקשו פגישת אסטרטגיה חינמית ונבנה הצעה מותאמת אישית.",
  },
  {
    q: "כמה זמן עד שרואים תוצאות?",
    a: "פרסום ממומן: תוצאות ראשוניות תוך 2–4 שבועות. SEO: שיפור משמעותי תוך 3–6 חודשים. אסטרטגיית מותג: השפעה ניכרת תוך 90 יום. אנחנו מציבים יעדים ריאליים ומדדים ברורים מהיום הראשון.",
  },
  {
    q: "מה ההבדל ביניכם לסוכנויות אחרות?",
    a: "רוב הסוכנויות מריצות קמפיינים. אנחנו בונים שליטה. הגישה שלנו מבוססת נתונים, מותאמת אישית לכל מותג, ומחויבת לתוצאות מדידות — לא לשקפים יפים. 200+ מותגים, 340% גידול ממוצע במכירות. המספרים מדברים.",
  },
  {
    q: "אילו ערוצי שיווק אתם מנהלים?",
    a: "Meta (Facebook + Instagram), Google Ads, TikTok, LinkedIn, YouTube, SEO אורגני, שיווק תוכן ואסטרטגיה ברשתות חברתיות. אנחנו בוחרים את הערוצים הנכונים לפי קהל היעד שלכם — לא לפי מה שנוח לנו.",
  },
  {
    q: "האם אתם עובדים עם עסקים קטנים ובינוניים?",
    a: "כן. חלק מהתוצאות הטובות ביותר שלנו היו עם מותגים שהתחילו קטנים ובנינו איתם שליטה בשוק. הדרישה שלנו אחת: רצינות. לא נעבוד עם מותגים שלא מחויבים לצמיחה אמיתית.",
  },
  {
    q: "איך מתחילים לעבוד איתכם?",
    a: "שלב 1: פגישת גילוי חינמית — נבין את המותג, היעדים והתחרות. שלב 2: מסמך אסטרטגיה מותאם. שלב 3: השקה ועבודה. כל התהליך יכול להתחיל תוך 48 שעות מהפגישה הראשונה.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((f) => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a },
  })),
};

export default function FAQAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );
      gsap.utils.toArray<HTMLElement>(".faq-item").forEach((el, i) => {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: i * 0.06, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
        id="faq"
        ref={sectionRef}
        className="cv-auto"
        style={{ padding: "120px 40px", background: "var(--bg)", position: "relative", overflow: "hidden" }}
      >
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "100%", height: "1px",
          background: "linear-gradient(to right, transparent, rgba(124,58,237,0.3), transparent)",
        }} />

        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div ref={headingRef} style={{ marginBottom: "72px" }}>
            <p style={{ color: "#a78bfa", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
              שאלות נפוצות
            </p>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
              תשובות <span style={{ color: "#a78bfa" }}>ישירות</span>
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} isLast={i === faqs.length - 1} />
            ))}
          </div>

          <div style={{ marginTop: "64px", textAlign: "center" }}>
            <p style={{ color: "#8a8a9a", marginBottom: "24px", fontSize: "1rem" }}>
              יש לכם שאלה שלא מצאתם כאן?
            </p>
            <a
              href="#contact"
              style={{
                display: "inline-block",
                padding: "14px 40px",
                border: "1px solid rgba(124,58,237,0.5)",
                color: "#a78bfa",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "background 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#7c3aed"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#a78bfa"; }}
            >
              דברו איתנו ישירות
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ faq, index, isLast }: { faq: typeof faqs[0]; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      gsap.fromTo(bodyRef.current, { height: 0, opacity: 0 }, { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" });
    } else {
      gsap.to(bodyRef.current, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      className="faq-item"
      style={{ borderTop: "1px solid rgba(124,58,237,0.15)", borderBottom: isLast ? "1px solid rgba(124,58,237,0.15)" : "none" }}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "28px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: "24px",
          textAlign: "right",
          fontFamily: "var(--font-heebo)",
        }}
      >
        <span style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          fontWeight: 700,
          color: open ? "#e0d4ff" : "#fff",
          transition: "color 0.3s",
          flex: 1,
          textAlign: "right",
        }}>
          {faq.q}
        </span>
        <div style={{
          flexShrink: 0,
          width: "32px", height: "32px",
          border: `1px solid ${open ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.25)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s, background 0.3s",
          background: open ? "rgba(124,58,237,0.15)" : "transparent",
        }}>
          {open
            ? <Minus size={14} color="#a78bfa" aria-hidden="true" />
            : <Plus size={14} color="#8a8a9a" aria-hidden="true" />
          }
        </div>
      </button>

      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p style={{
          color: "#8a8a9a", fontSize: "0.95rem", lineHeight: 1.8,
          paddingBottom: "28px",
        }}>
          {faq.a}
        </p>
      </div>
    </div>
  );
}
