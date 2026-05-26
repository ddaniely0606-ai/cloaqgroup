"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Globe, AtSign, Link2, Play, ArrowUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = ["אסטרטגיית מותג", "פרסום ממומן", "יצירת תוכן", "SEO", "רשתות חברתיות", "שיווק וידאו"];
const company = ["אודות", "עבודות", "צוות", "בלוג", "מדיניות פרטיות", "תנאי שימוש"];

const taglineWords = "WE BUILD BRANDS HISTORY REMEMBERS.".split(" ");

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (taglineRef.current) {
        const words = taglineRef.current.querySelectorAll<HTMLSpanElement>(".tagline-word");
        gsap.fromTo(
          words,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.55,
            ease: "power2.out",
            scrollTrigger: {
              trigger: taglineRef.current,
              start: "top 92%",
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer
        ref={footerRef}
        style={{ borderTop: "1px solid rgba(5,150,105,0.15)", padding: "80px 40px 40px", background: "var(--bg)" }}
      >
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px", marginBottom: "64px" }} className="footer-grid">

            {/* Brand column */}
            <div>
              <div style={{ marginBottom: "20px", display: "inline-block" }}>
                <Image
                  src="/logo.jpg"
                  alt="Mythos Agency"
                  width={150}
                  height={50}
                  style={{ objectFit: "contain", objectPosition: "left center", background: "#fff", padding: "6px 12px" }}
                />
              </div>
              <p style={{ color: "#8a8a9a", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "340px", marginBottom: "28px" }}>
                הסוכנות שמאחורי מותגים שהפכו למיתוסים. אנחנו לא מריצים קמפיינים — אנחנו בונים נצח.
              </p>

              {/* Newsletter teaser */}
              <div style={{ marginTop: "20px", display: "flex", gap: "0", marginBottom: "28px" }}>
                <input
                  type="email"
                  placeholder="האימייל שלכם"
                  style={{
                    flex: 1,
                    padding: "12px 16px",
                    background: "transparent",
                    border: "1px solid rgba(5,150,105,0.35)",
                    borderRight: "none",
                    color: "#f5f5f7",
                    fontSize: "0.85rem",
                    outline: "none",
                    fontFamily: "var(--font-heebo)",
                    direction: "rtl",
                  }}
                />
                <button
                  style={{
                    padding: "12px 20px",
                    background: "#059669",
                    border: "1px solid #059669",
                    color: "#fff",
                    fontSize: "1rem",
                    cursor: "pointer",
                    lineHeight: 1,
                  }}
                >
                  →
                </button>
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                {[Globe, AtSign, Link2, Play].map((Icon, i) => (
                  <div
                    key={i}
                    style={{
                      width: "38px", height: "38px",
                      border: "1px solid rgba(5,150,105,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#059669";
                      e.currentTarget.style.background = "rgba(5,150,105,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(5,150,105,0.25)";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <Icon size={16} color="#8a8a9a" />
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", fontWeight: 700 }}>
                שירותים
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {services.map((s) => (
                  <li key={s}>
                    <a href="#services" style={{ color: "#8a8a9a", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", fontWeight: 700 }}>
                חברה
              </h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {company.map((s) => (
                  <li key={s}>
                    <a href="#" style={{ color: "#8a8a9a", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
                    >
                      {s}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(5,150,105,0.12)", paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ color: "#8a8a9a", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              © {new Date().getFullYear()} MYTHOS AGENCY. כל הזכויות שמורות.
            </p>
            <p
              ref={taglineRef}
              className="brand-en"
              style={{ color: "#8a8a9a", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase", display: "flex", gap: "0.4em", flexWrap: "wrap" }}
            >
              {taglineWords.map((word, i) => (
                <span key={i} className="tagline-word" style={{ display: "inline-block" }}>
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={scrollToTop}
        aria-label="חזרה למעלה"
        style={{
          position: "fixed",
          bottom: "32px",
          left: "32px",
          width: "44px",
          height: "44px",
          border: "1px solid #059669",
          background: "rgba(5,5,8,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          opacity: showBackTop ? 1 : 0,
          pointerEvents: showBackTop ? "auto" : "none",
          transition: "opacity 0.3s ease",
          zIndex: 150,
        }}
      >
        <ArrowUp size={18} color="#34d399" />
      </button>
    </>
  );
}
