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
  const signatureRef = useRef<SVGPathElement>(null);
  const [showBackTop, setShowBackTop] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Task 4: time-on-page counter
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

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

  // Task 2: SVG signature stroke animation
  useEffect(() => {
    const path = signatureRef.current;
    if (!path) return;
    let length = 400;
    try { length = path.getTotalLength(); } catch (_) {}
    if (!length) length = 400;
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const trigger = ScrollTrigger.create({
      trigger: path,
      start: "top 90%",
      onEnter: () => gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }),
    });
    return () => trigger.kill();
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
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", gap: isMobile ? "40px" : "60px", marginBottom: "64px" }} className="footer-grid">

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

          {/* Task 2: Handwritten SVG signature */}
          <svg
            viewBox="0 0 240 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ width: "180px", height: "45px", margin: "0 auto 24px", display: "block" }}
          >
            <path
              ref={signatureRef}
              d="M10 45 C15 20, 25 15, 30 30 C35 45, 40 20, 50 25 C60 30, 55 40, 65 35 C75 30, 70 15, 85 20 C100 25, 95 45, 110 40 C120 35, 115 20, 130 25 C145 30, 140 45, 155 42 C165 40, 162 25, 175 28 C188 31, 190 45, 200 42 C210 39, 215 25, 230 30"
              stroke="rgba(196,154,60,0.6)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* Bottom bar */}
          <div style={{ borderTop: "1px solid rgba(5,150,105,0.12)", paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
            <p style={{ color: "#8a8a9a", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
              © {new Date().getFullYear()} MYTHOS AGENCY. כל הזכויות שמורות.
            </p>
            {/* Task 3: Made in Israel badge */}
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              תוצרת ישראל 🇮🇱 &nbsp;|&nbsp; עם ❤️ מתל אביב
            </span>
            {/* Task 4: Time on page counter */}
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem" }}>
              {(() => {
                const mins = Math.floor(elapsed / 60);
                const secs = elapsed % 60;
                return `בילית ${mins > 0 ? `${mins}:${String(secs).padStart(2, "0")}` : `${secs} שניות`} בדף`;
              })()}
            </span>
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
          bottom: "max(32px, calc(32px + env(safe-area-inset-bottom)))",
          left: "32px",
          width: "48px",
          height: "48px",
          minWidth: "48px",
          minHeight: "48px",
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
