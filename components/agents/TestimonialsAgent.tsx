"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: "רן טורס", company: "Obsidian Spirits", text: "CloaqGroup הפכו את המותג שלנו מלא-מוכר לסוחף את הענף תוך 8 חודשים. התוצאות היו מעל כל ציפייה." },
  { name: "פריה נאיר", company: "NovaTech Labs", text: "האסטרטגיה שלהם לפרסום ממומן הורידה לנו את עלות הרכישה ב-60% ושילשה את ה-ROAS. מקצועיות ברמה אחרת." },
  { name: "ג'יימס וויטפילד", company: "Apex Realty", text: "עבודת ה-SEO בלבד הניבה לנו מעל ₪8M בפייפליין. אין סוכנות שקרובה לרמה הזו." },
  { name: "מיכל ברנשטיין", company: "Meridian Apparel", text: "תוכן הוידאו שהם יצרו הגיע ל-40M צפיות אורגניות. המותג שלנו הפך לרגע תרבותי." },
  { name: "אסף גולן", company: "Solstice Beauty", text: "תוך 90 יום שלטנו בקטגוריה שלנו בגוגל. אף סוכנות שעבדנו איתה לא התקרבה לזה." },
  { name: "תמר אלמוג", company: "Vantage Capital", text: "CloaqGroup לא מריצים קמפיינים. הם בונים שליטה. שווה כל שקל ויותר." },
];

export default function TestimonialsAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ padding: "120px 0", background: "var(--bg2)", overflow: "hidden" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 40px", marginBottom: "60px" }}>
        <div ref={headingRef}>
          <p style={{ color: "#34d399", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            מה אומרים עלינו
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
            הם <span style={{ color: "#34d399" }}>שולטים</span> עכשיו
          </h2>
        </div>
      </div>

      {/* Row 1 — scrolls right (RTL direction) */}
      <div style={{ overflow: "hidden", marginBottom: "12px" }}>
        <div className="marquee-rtl" style={{ display: "flex", width: "max-content" }}>
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls left */}
      <div style={{ overflow: "hidden" }}>
        <div className="marquee-ltr" style={{ display: "flex", width: "max-content", transform: "translateX(-50%)" }}>
          {[...testimonials.slice(2), ...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

const TestimonialCard = React.memo(function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "360px",
      padding: "32px",
      margin: "0 8px",
      border: "1px solid rgba(5,150,105,0.15)",
      background: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(24px) saturate(1.6)",
      WebkitBackdropFilter: "blur(24px) saturate(1.6)",
      boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
    }}>
      <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
        {Array(5).fill(0).map((_, i) => (
          <Star key={i} size={14} fill="#059669" color="#059669" />
        ))}
      </div>
      <p style={{ color: "#c4c4d4", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "20px" }}>
        &ldquo;{t.text}&rdquo;
      </p>
      <div>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>{t.name}</p>
        <p className="brand-en" style={{ color: "#34d399", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{t.company}</p>
      </div>
    </div>
  );
});
