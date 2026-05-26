"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  { en: "STRATEGY", he: "אסטרטגיה", desc: "אנחנו לא יוצרים מודעות. אנחנו בונים רגשות שמוכרים." },
  { en: "CREATION", he: "יצירה", desc: "כל פיקסל שלנו יושב על מחקר. כל מילה — על כוונה." },
  { en: "PERFORMANCE", he: "ביצועים", desc: "הביצועים שלנו מדידים. המורשת שלנו — לא." },
  { en: "LEGACY", he: "מורשת", desc: "הלקוחות שלנו לא קונים שירות. הם קונים עתיד." },
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
      {/* Animated gradient background — cinematic atmosphere */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(135deg, #020408 0%, #04080f 30%, #02060b 60%, #050a10 100%)",
        zIndex: 0,
      }} />
      {/* Animated aurora layer */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse 120% 80% at 20% 50%, rgba(5,150,105,0.08) 0%, transparent 60%), radial-gradient(ellipse 80% 120% at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)",
        animation: "aurora-drift 18s ease-in-out infinite alternate",
        zIndex: 0,
      }} />
      {/* Grain overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E\")",
        zIndex: 0,
        opacity: 0.4,
        pointerEvents: "none",
      }} />

      {/* §04 Section identity mark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          fontFamily: "var(--font-syne)",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "rgba(52,211,153,0.3)",
          textTransform: "uppercase",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        §04 MANIFESTO
      </span>

      {/* Atmospheric left glow */}
      <div style={{
        position: "absolute", top: "30%", right: "-5%",
        width: "500px", height: "600px",
        background: "radial-gradient(ellipse, rgba(5,150,105,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
        zIndex: 0,
      }} />

      {/* Horizontal rule top */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(to right, transparent, rgba(5,150,105,0.3), transparent)",
        zIndex: 1,
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative", zIndex: 1 }}>

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
                marginBottom: "16px",
              }}>
                {line.he}
              </h3>
              <p style={{
                color: "#8a8a9a", fontSize: "0.9rem", lineHeight: 1.6,
              }}>
                {line.desc}
              </p>
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
            אנחנו{" "}
            <span style={{
              background: "linear-gradient(135deg, #6ee7b7, #34d399, #059669)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              נגד קמפיינים גנריים.
            </span>
            <br />
            נגד תקציבים מבוזבזים. נגד שיווק{" "}
            <span style={{ color: "#ffffff" }}>שאף אחד לא זוכר.</span>
          </h2>
        </div>
      </div>
    </section>
  );
}
