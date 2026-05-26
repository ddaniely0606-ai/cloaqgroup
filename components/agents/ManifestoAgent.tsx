"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { en: "MYTH", he: "מיתוס לא נבנה בפרסומות. הוא נחרת בתודעה." },
  { en: "STORY", he: "הסיפור הנכון ממיר גוללים ללקוחות." },
  { en: "LEGACY", he: "מורשת היא הנכס היחיד שמתחזק עם הזמן." },
  { en: "SCALE", he: "סקייל בלי בסיס הוא רעש. אנחנו בונים את שניהם." },
];

export default function ManifestoAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const stmtRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger each manifesto block in
      gsap.utils.toArray<HTMLElement>(".manifesto-block").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%" },
            delay: i * 0.05,
          }
        );
      });

      // Slow parallax on the statement
      if (stmtRef.current) {
        gsap.fromTo(
          stmtRef.current,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: stmtRef.current, start: "top 75%" } }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="cv-auto"
      style={{
        padding: "160px 40px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric left glow */}
      <div style={{
        position: "absolute", top: "30%", right: "-5%",
        width: "500px", height: "600px",
        background: "radial-gradient(ellipse, rgba(5,150,105,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Horizontal rule top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(5,150,105,0.3), transparent)",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Kicker */}
        <p style={{
          color: "#34d399", fontSize: "0.7rem", letterSpacing: "0.4em",
          textTransform: "uppercase", marginBottom: "80px",
        }}>
          המניפסט שלנו
        </p>

        {/* Four manifesto pillars */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "1px", background: "rgba(5,150,105,0.1)",
          marginBottom: "120px",
        }}>
          {lines.map((line, i) => (
            <div
              key={i}
              className="manifesto-block"
              style={{
                padding: "56px 40px",
                background: "rgba(0,0,0,0.5)",
                backdropFilter: "blur(20px) saturate(1.5)",
                WebkitBackdropFilter: "blur(20px) saturate(1.5)",
                position: "relative", overflow: "hidden",
              }}
            >
              {/* Big watermark number */}
              <span className="brand-en" style={{
                position: "absolute", bottom: "12px", left: "24px",
                fontSize: "6rem", fontWeight: 900,
                color: "rgba(5,150,105,0.06)", lineHeight: 1,
                fontFamily: "var(--font-syne)", pointerEvents: "none", userSelect: "none",
              }}>
                0{i + 1}
              </span>

              <p className="brand-en" style={{
                fontSize: "0.65rem", letterSpacing: "0.4em", color: "#34d399",
                textTransform: "uppercase", marginBottom: "20px",
              }}>
                {line.en}
              </p>
              <h3 style={{
                fontWeight: 900, fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                color: "#ffffff", lineHeight: 1.15,
              }}>
                {line.he}
              </h3>
            </div>
          ))}
        </div>

        {/* Closing statement */}
        <div ref={stmtRef} style={{ maxWidth: "900px" }}>
          <h2 style={{
            fontWeight: 900,
            fontSize: "clamp(2.8rem, 7vw, 6rem)",
            color: "#fff",
            lineHeight: 1.05,
            marginBottom: "32px",
          }}>
            אנחנו לא מריצים{" "}
            <span style={{
              background: "linear-gradient(135deg, #6ee7b7, #34d399, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              קמפיינים.
            </span>
            <br />
            אנחנו הופכים מותגים{" "}
            <span style={{ color: "#ffffff" }}>למיתוסים.</span>
          </h2>
          <p style={{
            color: "#8a8a9a", fontSize: "1.1rem", lineHeight: 1.8,
            maxWidth: "620px",
          }}>
            כל מותג שפועל בשוק הישראלי יכול לבחור: להיות נשכח, או להפוך למיתוס. Mythos בנויה לאלה שבוחרים נצח.
          </p>
        </div>
      </div>
    </section>
  );
}
