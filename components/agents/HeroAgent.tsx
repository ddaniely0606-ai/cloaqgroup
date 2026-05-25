"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

export default function HeroAgent() {
  const logoRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.4 });

    if (logoRef.current) {
      const letters = logoRef.current.querySelectorAll(".letter");
      tl.fromTo(
        letters,
        { y: 120, opacity: 0, rotateX: -40 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.9, stagger: 0.04, ease: "power4.out" }
      );
    }

    tl.fromTo(lineRef.current, { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.2");
    tl.fromTo(taglineRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" }, "-=0.4");
    tl.fromTo(ctaRef.current, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.3");
    tl.fromTo(scrollRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");
  }, []);

  const logoText = "CLOAQGROUP";

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

      {/* Gradient overlays */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,8,0.5) 0%, transparent 40%, rgba(5,5,8,0.9) 100%)", zIndex: 1 }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,8,0.3), transparent, rgba(5,5,8,0.3))", zIndex: 1 }} />

      {/* Central purple glow */}
      <div style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "700px", height: "500px",
        background: "radial-gradient(ellipse, rgba(109,40,217,0.18) 0%, transparent 70%)",
        zIndex: 1,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 32px", maxWidth: "900px", margin: "0 auto" }}>

        {/* Logo — English, perspective container */}
        <div style={{ overflow: "hidden", perspective: "800px", marginBottom: "8px" }}>
          <h1
            ref={logoRef}
            className="brand-en"
            translate="no"
            style={{
              fontSize: "clamp(3rem, 12vw, 9rem)",
              fontWeight: 800,
              letterSpacing: "0.12em",
              lineHeight: 1,
              color: "#fff",
            }}
          >
            {logoText.split("").map((letter, i) => (
              <span
                key={i}
                className="letter"
                style={{
                  display: "inline-block",
                  color: i >= 5 ? "#a78bfa" : "#fff",
                }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        {/* Divider line */}
        <div
          ref={lineRef}
          style={{
            height: "1px",
            background: "linear-gradient(to right, transparent, #7c3aed, transparent)",
            maxWidth: "500px",
            margin: "24px auto",
            transformOrigin: "center",
          }}
        />

        {/* Hebrew tagline */}
        <p
          ref={taglineRef}
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
            fontWeight: 500,
            color: "#8a8a9a",
            letterSpacing: "0.05em",
            marginBottom: "48px",
          }}
        >
          אנחנו הופכים מותגים לבלתי ניתנים להתעלמות.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <HoverButton href="#work" primary>
            צפו בעבודות שלנו
          </HoverButton>
          <HoverButton href="#contact" primary={false}>
            להתחיל פרויקט
          </HoverButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 2,
        }}
      >
        <span style={{ color: "#8a8a9a", fontSize: "0.7rem", letterSpacing: "0.3em" }}>גלול</span>
        <div style={{
          width: "1px",
          height: "60px",
          background: "linear-gradient(to bottom, #7c3aed, transparent)",
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
        transition: "background 0.3s, color 0.3s, border-color 0.3s",
        display: "inline-block",
        background: primary ? "#7c3aed" : "transparent",
        color: primary ? "#fff" : "#c4c4d4",
        border: primary ? "1px solid #7c3aed" : "1px solid rgba(124,58,237,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = primary ? "#6d28d9" : "rgba(124,58,237,0.15)";
        e.currentTarget.style.borderColor = "#7c3aed";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = primary ? "#7c3aed" : "transparent";
        e.currentTarget.style.color = primary ? "#fff" : "#c4c4d4";
        e.currentTarget.style.borderColor = primary ? "#7c3aed" : "rgba(124,58,237,0.4)";
      }}
    >
      {children}
    </a>
  );
}
