"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function HeroAgent() {
  const mythosRef = useRef<HTMLDivElement>(null);
  const agencyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    if (mythosRef.current) {
      const letters = mythosRef.current.querySelectorAll(".letter");
      tl.fromTo(
        letters,
        { y: 130, opacity: 0, rotateX: -45 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1, stagger: 0.06, ease: "power4.out" }
      );
    }
    if (agencyRef.current) {
      const letters = agencyRef.current.querySelectorAll(".letter");
      tl.fromTo(
        letters,
        { y: 110, opacity: 0, rotateX: -35 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.06, ease: "power4.out" },
        "-=0.6"
      );
    }
    tl.fromTo(dividerRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 1, ease: "power3.out" }, "-=0.2");
    tl.fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.5");
    tl.fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");
  }, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--bg)",
      }}
    >
      <ParticleCanvas />

      {/* Cinematic atmospheric lighting */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        background: [
          "radial-gradient(ellipse at 18% 55%, rgba(5,150,105,0.22) 0%, transparent 48%)",
          "radial-gradient(ellipse at 82% 28%, rgba(16,185,129,0.12) 0%, transparent 42%)",
          "radial-gradient(ellipse at 50% 110%, rgba(5,150,105,0.18) 0%, transparent 42%)",
        ].join(", "),
      }} />

      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(5,150,105,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.06) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)",
      }} />

      {/* Vignette */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(3,8,6,0.65) 0%, transparent 30%, transparent 70%, rgba(3,8,6,0.85) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(3,8,6,0.4), transparent 18%, transparent 82%, rgba(3,8,6,0.4))", zIndex: 1 }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        textAlign: "center", padding: "0 32px",
        maxWidth: "1100px", margin: "0 auto",
      }}>

        {/* MYTHOS */}
        <div style={{ overflow: "hidden", perspective: "900px", marginBottom: "-0.05em" }}>
          <div
            ref={mythosRef}
            className="brand-en"
            translate="no"
            style={{
              fontSize: "clamp(4.5rem, 17vw, 13rem)",
              fontWeight: 900,
              letterSpacing: "0.15em",
              lineHeight: 0.88,
              color: "#ffffff",
            }}
          >
            {"MYTHOS".split("").map((l, i) => (
              <span key={i} className="letter" style={{ display: "inline-block" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* AGENCY — gradient emerald */}
        <div style={{ overflow: "hidden", perspective: "900px" }}>
          <div
            ref={agencyRef}
            className="brand-en"
            translate="no"
            style={{
              fontSize: "clamp(4.5rem, 17vw, 13rem)",
              fontWeight: 900,
              letterSpacing: "0.15em",
              lineHeight: 0.88,
              background: "linear-gradient(135deg, #6ee7b7 0%, #34d399 40%, #059669 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {"AGENCY".split("").map((l, i) => (
              <span key={i} className="letter" style={{ display: "inline-block" }}>{l}</span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #34d399, #059669, #34d399, transparent)",
            maxWidth: "520px",
            margin: "36px auto",
            transformOrigin: "center",
          }}
        />

        {/* Tagline */}
        <p
          ref={taglineRef}
          style={{
            fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
            fontWeight: 400,
            color: "#8a8a9a",
            letterSpacing: "0.08em",
            marginBottom: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <span className="brand-en" style={{ color: "#34d399", letterSpacing: "0.15em", fontSize: "0.75rem", textTransform: "uppercase" }}>
            We Engineer Attention
          </span>
          <span style={{ width: "1px", height: "14px", background: "rgba(5,150,105,0.4)", display: "inline-block" }} />
          <span>אנחנו הופכים מותגים לבלתי ניתנים להתעלמות.</span>
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <HoverButton href="#work" primary>צפו בעבודות שלנו</HoverButton>
          <HoverButton href="#contact" primary={false}>להתחיל פרויקט</HoverButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2,
        }}
      >
        <span style={{ color: "#8a8a9a", fontSize: "0.7rem", letterSpacing: "0.3em" }}>גלול</span>
        <div style={{
          width: "1px", height: "60px",
          background: "linear-gradient(to bottom, #059669, transparent)",
          animation: "pulse 2s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}

function HoverButton({ href, primary, children }: { href: string; primary: boolean; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        padding: "14px 36px",
        fontSize: "0.9rem",
        fontWeight: 600,
        letterSpacing: "0.05em",
        textDecoration: "none",
        transition: "all 0.3s",
        display: "inline-block",
        background: primary ? "#059669" : "rgba(0,0,0,0.45)",
        color: primary ? "#fff" : "#c4c4d4",
        border: primary ? "1px solid #059669" : "1px solid rgba(5,150,105,0.35)",
        backdropFilter: primary ? "none" : "blur(14px)",
        WebkitBackdropFilter: primary ? "none" : "blur(14px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = primary ? "#047857" : "rgba(5,150,105,0.15)";
        e.currentTarget.style.borderColor = primary ? "#047857" : "#059669";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = primary ? "0 8px 24px rgba(5,150,105,0.4)" : "0 4px 16px rgba(5,150,105,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = primary ? "#059669" : "rgba(0,0,0,0.45)";
        e.currentTarget.style.color = primary ? "#fff" : "#c4c4d4";
        e.currentTarget.style.borderColor = primary ? "#059669" : "rgba(5,150,105,0.35)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {children}
    </a>
  );
}
