"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

// Hoisted outside component — stable reference, no rerender cost
const MYTHOS_LETTERS = "MYTHOS".split("");
const AGENCY_LETTERS = "AGENCY".split("");

export default function HeroAgent() {
  const mythosRef = useRef<HTMLDivElement>(null);
  const agencyRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.4 });

      const mythosLetters = mythosRef.current!.querySelectorAll(".letter");
      const agencyLetters = agencyRef.current!.querySelectorAll(".letter");

      // MYTHOS — cinematic 3D letter reveal
      tl.fromTo(
        mythosLetters,
        { y: 140, opacity: 0, rotateX: -50, transformOrigin: "50% 100%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.065, ease: "power4.out" }
      );

      // AGENCY — offset start for cascade feel
      tl.fromTo(
        agencyLetters,
        { y: 110, opacity: 0, rotateX: -35, transformOrigin: "50% 100%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.06, ease: "power4.out" },
        "-=0.65"
      );

      // Divider line expand
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
        "-=0.25"
      );

      // Hebrew tagline
      tl.fromTo(
        taglineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
        "-=0.55"
      );

      // English sub-line
      tl.fromTo(
        sublineRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.45"
      );

      // CTA row
      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // Scroll indicator fade-in
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
      );

      // Continuous scroll indicator pulse
      gsap.to(scrollRef.current!.querySelector(".scroll-line"), {
        scaleY: 0.3,
        opacity: 0.2,
        duration: 1.1,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "top center",
      });
    });

    return () => ctx.revert();
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
      {/* Three.js particle field */}
      <ParticleCanvas />

      {/* Atmospheric emerald radial gradients */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background: [
            "radial-gradient(ellipse at 15% 55%, rgba(5,150,105,0.22) 0%, transparent 50%)",
            "radial-gradient(ellipse at 85% 25%, rgba(5,150,105,0.12) 0%, transparent 44%)",
            "radial-gradient(ellipse at 50% 115%, rgba(74,222,128,0.18) 0%, transparent 46%)",
            "radial-gradient(ellipse at 62% 72%, rgba(5,150,105,0.08) 0%, transparent 38%)",
          ].join(", "),
        }}
      />

      {/* Cinematic grid overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(5,150,105,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.055) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 78% 58% at 50% 50%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 78% 58% at 50% 50%, black 30%, transparent 100%)",
        }}
      />

      {/* Top/bottom vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(5,5,8,0.7) 0%, transparent 28%, transparent 68%, rgba(5,5,8,0.9) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Side vignette */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(5,5,8,0.45), transparent 20%, transparent 80%, rgba(5,5,8,0.45))",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Hero content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          padding: "0 32px",
          maxWidth: "1120px",
          margin: "0 auto",
        }}
      >
        {/* MYTHOS */}
        <div style={{ overflow: "hidden", perspective: "900px", marginBottom: "-0.04em" }}>
          <div
            ref={mythosRef}
            className="brand-en"
            translate="no"
            style={{
              fontSize: "clamp(4.8rem, 18vw, 13.5rem)",
              fontWeight: 900,
              letterSpacing: "0.14em",
              lineHeight: 0.87,
              color: "#ffffff",
              fontFamily: "var(--font-syne)",
            }}
          >
            {MYTHOS_LETTERS.map((letter, i) => (
              <span key={i} className="letter" style={{ display: "inline-block" }}>
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* AGENCY — emerald gradient */}
        <div style={{ overflow: "hidden", perspective: "900px" }}>
          <div
            ref={agencyRef}
            className="brand-en"
            translate="no"
            style={{
              fontSize: "clamp(4.8rem, 18vw, 13.5rem)",
              fontWeight: 900,
              letterSpacing: "0.14em",
              lineHeight: 0.87,
              background: "linear-gradient(135deg, #4ade80 0%, #059669 55%, #064e35 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontFamily: "var(--font-syne)",
            }}
          >
            {AGENCY_LETTERS.map((letter, i) => (
              <span key={i} className="letter" style={{ display: "inline-block" }}>
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          ref={dividerRef}
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, #4ade80, #059669, #4ade80, transparent)",
            maxWidth: "540px",
            margin: "38px auto 32px",
            transformOrigin: "center",
          }}
        />

        {/* Hebrew tagline */}
        <p
          ref={taglineRef}
          style={{
            fontSize: "clamp(1.05rem, 2.4vw, 1.35rem)",
            fontWeight: 600,
            color: "#f5f5f7",
            letterSpacing: "0.02em",
            marginBottom: "10px",
            fontFamily: "var(--font-heebo)",
          }}
        >
          מותגים הופכים למיתוסים.
        </p>

        {/* English sub-line */}
        <p
          ref={sublineRef}
          className="brand-en"
          style={{
            fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
            fontWeight: 400,
            color: "#4ade80",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: "52px",
            fontFamily: "var(--font-syne)",
          }}
        >
          Where Brands Become Legends
        </p>

        {/* CTA row */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <HoverButton href="#work" primary>
            צפו בעבודות
          </HoverButton>
          <HoverButton href="#contact" primary={false}>
            בואו נדבר
          </HoverButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "38px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
          zIndex: 2,
        }}
      >
        <span
          style={{
            color: "#8a8a9a",
            fontSize: "0.65rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            fontFamily: "var(--font-syne)",
          }}
          className="brand-en"
        >
          SCROLL
        </span>
        <div
          className="scroll-line"
          style={{
            width: "1px",
            height: "58px",
            background: "linear-gradient(to bottom, #059669, transparent)",
            transformOrigin: "top center",
          }}
        />
      </div>
    </section>
  );
}

// Defined outside HeroAgent — stable identity, no rerender on parent state change
interface HoverButtonProps {
  href: string;
  primary: boolean;
  children: React.ReactNode;
}

function HoverButton({ href, primary, children }: HoverButtonProps) {
  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.background = primary ? "#047857" : "rgba(5,150,105,0.14)";
    el.style.borderColor = primary ? "#047857" : "#059669";
    el.style.color = "#ffffff";
    el.style.transform = "translateY(-2px)";
    el.style.boxShadow = primary
      ? "0 10px 28px rgba(5,150,105,0.45)"
      : "0 4px 18px rgba(5,150,105,0.22)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget;
    el.style.background = primary ? "#059669" : "rgba(0,0,0,0.45)";
    el.style.color = primary ? "#ffffff" : "#c4c4d4";
    el.style.borderColor = primary ? "#059669" : "rgba(5,150,105,0.35)";
    el.style.transform = "translateY(0)";
    el.style.boxShadow = "none";
  };

  return (
    <a
      href={href}
      style={{
        padding: "14px 38px",
        fontSize: "0.92rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
        textDecoration: "none",
        transition: "all 0.28s ease",
        display: "inline-block",
        background: primary ? "#059669" : "rgba(0,0,0,0.45)",
        color: primary ? "#ffffff" : "#c4c4d4",
        border: primary ? "1px solid #059669" : "1px solid rgba(5,150,105,0.35)",
        backdropFilter: primary ? "none" : "blur(14px)",
        WebkitBackdropFilter: primary ? "none" : "blur(14px)",
        fontFamily: "var(--font-heebo)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </a>
  );
}
