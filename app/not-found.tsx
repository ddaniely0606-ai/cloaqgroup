"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

export default function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(codeRef.current,
        { opacity: 0, y: 40, filter: "blur(12px)" },
        { opacity: 1, y: 0, filter: "blur(0)", duration: 1.2 }
      );
      tl.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        "<+0.4"
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        minHeight: "100vh",
        background: "#04060a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(5,150,105,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <h1
        ref={codeRef}
        style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(8rem, 25vw, 18rem)",
          fontWeight: 900,
          WebkitTextStroke: "1px rgba(52,211,153,0.2)",
          color: "transparent",
          lineHeight: 1,
          letterSpacing: "-0.05em",
          userSelect: "none",
        }}
      >
        404
      </h1>

      <div ref={textRef} style={{ maxWidth: "480px" }}>
        <p style={{
          color: "#34d399",
          fontSize: "0.75rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}>
          הדף הזה הפך למיתוס
        </p>
        <h2 style={{
          fontFamily: "var(--font-heebo)",
          fontSize: "clamp(1.4rem, 4vw, 2rem)",
          fontWeight: 800,
          color: "#eef0f4",
          marginBottom: "16px",
          lineHeight: 1.3,
        }}>
          הדף שחיפשתם לא קיים.
          <br />
          הסוכנות — עדיין כאן.
        </h2>
        <p style={{ color: "#8a8a9a", marginBottom: "40px", lineHeight: 1.7 }}>
          אולי הקישור ישן, אולי הוא פשוט הפך לאגדה.
          בכל מקרה, בואו נחזיר אתכם למסלול.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "14px 32px",
            background: "#059669",
            color: "#fff",
            fontFamily: "var(--font-heebo)",
            fontSize: "1rem",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          חזרה לדף הבית ←
        </Link>
      </div>
    </div>
  );
}
