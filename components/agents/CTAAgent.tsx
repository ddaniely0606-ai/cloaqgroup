"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTAAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: contentRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "140px 40px",
        background: "var(--bg)",
        position: "relative",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Background radial glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "900px", height: "600px",
        background: "radial-gradient(ellipse, rgba(109,40,217,0.2) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Grid pattern */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        maskImage: "radial-gradient(ellipse 70% 80% at 50% 50%, black 30%, transparent 100%)",
      }} />

      {/* Top border line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, #7c3aed, transparent)" }} />

      <div ref={contentRef} style={{ position: "relative", zIndex: 2, maxWidth: "800px", margin: "0 auto" }}>
        <p style={{
          color: "#a78bfa", fontSize: "0.75rem", letterSpacing: "0.35em",
          textTransform: "uppercase", marginBottom: "24px",
        }}>
          מוכנים לשלוט?
        </p>

        <h2 style={{
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
          lineHeight: 1.05,
          color: "#fff",
          marginBottom: "32px",
        }}>
          הגיע הזמן להפוך את{" "}
          <span style={{
            background: "linear-gradient(135deg, #c084fc, #a78bfa, #7c3aed)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            המותג שלך
          </span>
          {" "}לבלתי ניתן להתעלמות.
        </h2>

        <p style={{
          color: "#8a8a9a", fontSize: "1.1rem", lineHeight: 1.7,
          marginBottom: "52px", maxWidth: "560px", margin: "0 auto 52px",
        }}>
          חברות שעובדות איתנו רואות תוצאות ממשיות — לא הבטחות. בואו נראה מה אפשר לעשות עם המותג שלכם.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#contact"
            style={{
              padding: "18px 48px",
              background: "#7c3aed",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid #7c3aed",
              transition: "background 0.3s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#6d28d9";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#7c3aed";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            התחילו עכשיו
          </a>
          <a
            href="#work"
            style={{
              padding: "18px 48px",
              background: "transparent",
              color: "#c4c4d4",
              fontSize: "1rem",
              fontWeight: 600,
              letterSpacing: "0.04em",
              textDecoration: "none",
              border: "1px solid rgba(124,58,237,0.4)",
              transition: "border-color 0.3s, color 0.3s, transform 0.2s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#7c3aed";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(124,58,237,0.4)";
              e.currentTarget.style.color = "#c4c4d4";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            ראו עבודות
          </a>
        </div>
      </div>
    </section>
  );
}
