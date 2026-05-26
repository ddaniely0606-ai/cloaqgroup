"use client";
import { useEffect, useState } from "react";

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("exit-intent-shown")) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 50 && !visible) {
        setVisible(true);
        sessionStorage.setItem("exit-intent-shown", "1");
        window.removeEventListener("mousemove", handleMouseMove);
      }
    };

    const timer = setTimeout(() => {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 300,
        background: "rgba(4,6,10,0.75)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "fadeIn 0.3s ease",
      }}
      onClick={() => setVisible(false)}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
      <div
        style={{
          background: "rgba(8,12,20,0.98)",
          border: "1px solid rgba(5,150,105,0.3)",
          boxShadow: "0 0 0 1px rgba(52,211,153,0.2), 0 0 40px rgba(5,150,105,0.1)",
          padding: "48px 56px",
          maxWidth: "520px",
          width: "90%",
          textAlign: "center",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          style={{
            color: "rgba(52,211,153,0.6)",
            fontSize: "0.65rem",
            letterSpacing: "0.3em",
            marginBottom: "16px",
            fontFamily: "var(--font-syne, sans-serif)",
            textTransform: "uppercase",
          }}
          className="brand-en"
        >
          לפני שתלכו
        </p>
        <h3
          style={{
            fontSize: "1.8rem",
            fontWeight: 800,
            color: "#fff",
            marginBottom: "16px",
            fontFamily: "var(--font-heebo, sans-serif)",
          }}
        >
          קחו 30 שניות לראות מה בנינו
        </h3>
        <p
          style={{
            color: "#8a8a9a",
            marginBottom: "32px",
            lineHeight: 1.7,
            fontFamily: "var(--font-heebo, sans-serif)",
          }}
        >
          240 לקוחות. ₪85M מנוהל. אפס קמפיינים גנריים.
          <br />
          הסתכלו על העבודות שלנו — ואז תחליטו.
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a
            href="#work"
            onClick={() => setVisible(false)}
            style={{
              padding: "12px 28px",
              background: "#059669",
              color: "#fff",
              fontWeight: 700,
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "var(--font-heebo, sans-serif)",
              display: "inline-block",
            }}
          >
            ראו את העבודות
          </a>
          <button
            onClick={() => setVisible(false)}
            style={{
              padding: "12px 28px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "transparent",
              color: "#8a8a9a",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontFamily: "var(--font-heebo, sans-serif)",
            }}
          >
            אולי בפעם אחרת
          </button>
        </div>
        <button
          onClick={() => setVisible(false)}
          aria-label="סגור"
          style={{
            position: "absolute",
            top: "16px",
            left: "16px",
            background: "none",
            border: "none",
            color: "#8a8a9a",
            cursor: "pointer",
            fontSize: "1.2rem",
            lineHeight: 1,
            padding: "4px",
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
