"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import MagneticWrapper from "@/components/ui/MagneticWrapper";

// Rotating subline copy — cycles every 4 seconds
const SUBLINES = [
  "אנחנו הופכים מותגים לבלתי ניתנים להתעלמות.",
  "240 לקוחות. ₪85M מנוהל. אפס קמפיינים גנריים.",
  "SEO, תוכן, מיתוג — הכל תחת קורת גג אחת.",
  "אם אתם כאן, כנראה שאתם מחפשים משהו שלא מצאתם.",
];

const ParticleCanvas = dynamic(() => import("./ParticleCanvas"), { ssr: false });

// Hoisted outside component — stable reference, no rerender cost
const MYTHOS_LETTERS = "MYTHOS".split("");
const AGENCY_LETTERS = "AGENCY".split("");

const TICKER_STATS = ["240+ מותגים", "₪85M+ מנוהל", "380% צמיחה ממוצעת"];

// SVG viewBox width for the underline
const AGENCY_UNDERLINE_WIDTH = 520;

export default function HeroAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const mythosRef = useRef<HTMLDivElement>(null);
  const agencyRef = useRef<HTMLDivElement>(null);
  const agencyWrapRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollLineRef = useRef<HTMLDivElement>(null);
  const parallaxLayerRef = useRef<HTMLDivElement>(null);
  const underlinePathRef = useRef<SVGPathElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  // Ghost layer refs — outline duplicate behind each headline row
  const mythosGhostRef = useRef<HTMLDivElement>(null);
  const agencyGhostRef = useRef<HTMLDivElement>(null);

  // Parallax quickTo refs — stored outside state to avoid rerenders
  const mythosQX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const mythosQY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const agencyQX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const agencyQY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const layerQX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const layerQY = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  // Ghost quickTo refs — inverse direction, half strength
  const mythosGhostQX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const agencyGhostQX = useRef<ReturnType<typeof gsap.quickTo> | null>(null);

  // UTM-aware sub-headline
  const [utmSubline, setUtmSubline] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get("src") || params.get("utm_source");
    if (src === "linkedin") setUtmSubline("היי, אנשי לינקדאין — שמחים שהגעתם.");
    else if (src === "facebook" || src === "fb") setUtmSubline("היי, חברים מפייסבוק — אתם במקום הנכון.");
    else if (src === "google") setUtmSubline("מצאתם אותנו בגוגל — עוד מיליון אנשים כבר יודעים למה.");
  }, []);

  // Ticker state
  const [tickerIndex, setTickerIndex] = useState(0);
  const tickerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Subline rotation state
  const [sublineIndex, setSublineIndex] = useState(0);
  const sublineIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Hero parallax on mousemove
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width; // -0.5 to 0.5
    const dy = (e.clientY - cy) / rect.height;

    // Letters move opposite to cursor (depth illusion)
    mythosQX.current?.(-dx * 18);
    mythosQY.current?.(-dy * 10);
    agencyQX.current?.(-dx * 14);
    agencyQY.current?.(-dy * 8);

    // Ghost layers — half strength, same direction as foreground (depth offset)
    mythosGhostQX.current?.(-dx * 8);
    agencyGhostQX.current?.(-dx * 6);

    // Parallax layer drifts same direction but slower
    layerQX.current?.(dx * 30);
    layerQY.current?.(dy * 18);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set up quickTo for parallax
      if (mythosRef.current) {
        mythosQX.current = gsap.quickTo(mythosRef.current, "x", { duration: 0.6, ease: "power2.out" });
        mythosQY.current = gsap.quickTo(mythosRef.current, "y", { duration: 0.6, ease: "power2.out" });
      }
      if (agencyRef.current) {
        agencyQX.current = gsap.quickTo(agencyRef.current, "x", { duration: 0.6, ease: "power2.out" });
        agencyQY.current = gsap.quickTo(agencyRef.current, "y", { duration: 0.6, ease: "power2.out" });
      }
      if (parallaxLayerRef.current) {
        layerQX.current = gsap.quickTo(parallaxLayerRef.current, "x", { duration: 1.0, ease: "power2.out" });
        layerQY.current = gsap.quickTo(parallaxLayerRef.current, "y", { duration: 1.0, ease: "power2.out" });
      }
      if (mythosGhostRef.current) {
        mythosGhostQX.current = gsap.quickTo(mythosGhostRef.current, "x", { duration: 0.8, ease: "power2.out" });
      }
      if (agencyGhostRef.current) {
        agencyGhostQX.current = gsap.quickTo(agencyGhostRef.current, "x", { duration: 0.8, ease: "power2.out" });
      }

      const tl = gsap.timeline({ delay: 0.4 });

      const mythosLetters = mythosRef.current!.querySelectorAll(".letter");
      const agencyLetters = agencyRef.current!.querySelectorAll(".letter");

      // MYTHOS — cinematic 3D letter reveal
      tl.fromTo(
        mythosLetters,
        { y: 140, opacity: 0, rotateX: -50, transformOrigin: "50% 100%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.065, ease: "power4.out" }
      );

      // Ghost MYTHOS — starts slightly before main (creates depth perception)
      if (mythosGhostRef.current) {
        tl.fromTo(
          mythosGhostRef.current.querySelectorAll("span"),
          { y: 160, opacity: 0, rotateX: -50, transformOrigin: "50% 100%" },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.065, ease: "power4.out" },
          "<-0.1"
        );
      }

      // AGENCY — offset start for cascade feel
      tl.fromTo(
        agencyLetters,
        { y: 110, opacity: 0, rotateX: -35, transformOrigin: "50% 100%" },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.06, ease: "power4.out" },
        "-=0.65"
      );

      // Ghost AGENCY — trails slightly behind AGENCY reveal
      if (agencyGhostRef.current) {
        tl.fromTo(
          agencyGhostRef.current.querySelectorAll("span"),
          { y: 130, opacity: 0, rotateX: -35, transformOrigin: "50% 100%" },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.0, stagger: 0.06, ease: "power4.out" },
          "<-0.1"
        );
      }

      // SVG underline draw from right-to-left after AGENCY reveal
      if (underlinePathRef.current) {
        const totalLength = underlinePathRef.current.getTotalLength();
        gsap.set(underlinePathRef.current, {
          strokeDasharray: totalLength,
          strokeDashoffset: totalLength,
          opacity: 1,
        });
        tl.to(
          underlinePathRef.current,
          {
            strokeDashoffset: 0,
            duration: 1.0,
            ease: "power3.inOut",
          },
          "-=0.2"
        );
      }

      // Divider line expand
      tl.fromTo(
        dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 1.1, ease: "power3.out" },
        "-=0.45"
      );

      // Hebrew tagline
      tl.fromTo(
        taglineRef.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
        "-=0.55"
      );

      // CTA row
      tl.fromTo(
        ctaRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.3"
      );

      // Ticker bar fade-in
      tl.fromTo(
        tickerRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.15"
      );

      // Scroll indicator fade-in
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        "-=0.1"
      );

      // Scroll indicator shimmer pulse
      if (scrollLineRef.current) {
        gsap.to(scrollLineRef.current, {
          backgroundPosition: "0% 200%",
          duration: 1.8,
          ease: "none",
          repeat: -1,
        });
        // Also pulse opacity
        gsap.to(scrollLineRef.current, {
          opacity: 0.3,
          duration: 1.1,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Breathing animation on MYTHOS after reveal
      tl.add(() => {
        if (mythosRef.current) {
          gsap.to(mythosRef.current, {
            scale: 1.005,
            duration: 4,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      });
    });

    // Mousemove parallax — passive, scoped to section; disabled on touch devices
    const section = sectionRef.current;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (section && !isTouch) {
      section.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Ticker cycle
    tickerIntervalRef.current = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % TICKER_STATS.length);
    }, 3000);

    // Subline rotation cycle — 4s interval, GSAP clip-path handled in SublineDisplay
    sublineIntervalRef.current = setInterval(() => {
      setSublineIndex((prev) => (prev + 1) % SUBLINES.length);
    }, 4000);

    return () => {
      ctx.revert();
      if (section) {
        section.removeEventListener("mousemove", handleMouseMove);
      }
      if (tickerIntervalRef.current) {
        clearInterval(tickerIntervalRef.current);
      }
      if (sublineIntervalRef.current) {
        clearInterval(sublineIntervalRef.current);
      }
    };
  }, [handleMouseMove]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="cv-auto"
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
      {/* §01 Section identity mark */}
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
        §01 HERO
      </span>

      {/* Three.js particle field */}
      <ParticleCanvas />

      {/* Slow-drift parallax decorative layer */}
      <div
        ref={parallaxLayerRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          willChange: "transform",
          background: [
            "radial-gradient(ellipse 40% 40% at 20% 30%, rgba(5,150,105,0.07) 0%, transparent 100%)",
            "radial-gradient(ellipse 35% 35% at 80% 70%, rgba(74,222,128,0.05) 0%, transparent 100%)",
          ].join(", "),
        }}
      />

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
        <div style={{ overflow: "hidden", perspective: "900px", marginBottom: "-0.04em", position: "relative" }}>
          {/* Ghost layer — outline text behind MYTHOS, offset slightly for depth */}
          <div
            ref={mythosGhostRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "4px",
              display: "flex",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {MYTHOS_LETTERS.map((letter, i) => (
              <span
                key={`ghost-mythos-${i}`}
                style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(4.8rem, 18vw, 13.5rem)",
                  WebkitTextStroke: "1px rgba(52,211,153,0.12)",
                  color: "transparent",
                  letterSpacing: "0.14em",
                  lineHeight: 0.87,
                  display: "inline-block",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
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
              willChange: "transform",
            }}
          >
            {MYTHOS_LETTERS.map((letter, i) => (
              <span key={i} className="letter" style={{ display: "inline-block" }}>
                {letter}
              </span>
            ))}
          </div>
        </div>

        {/* AGENCY — emerald gradient + SVG underline */}
        <div ref={agencyWrapRef} style={{ overflow: "hidden", perspective: "900px", position: "relative" }}>
          {/* Ghost layer — outline text behind AGENCY, offset slightly for depth */}
          <div
            ref={agencyGhostRef}
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              left: "4px",
              display: "flex",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {AGENCY_LETTERS.map((letter, i) => (
              <span
                key={`ghost-agency-${i}`}
                style={{
                  fontFamily: "var(--font-syne, sans-serif)",
                  fontWeight: 900,
                  fontSize: "clamp(4.8rem, 18vw, 13.5rem)",
                  WebkitTextStroke: "1px rgba(52,211,153,0.12)",
                  color: "transparent",
                  letterSpacing: "0.14em",
                  lineHeight: 0.87,
                  display: "inline-block",
                }}
              >
                {letter}
              </span>
            ))}
          </div>
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
              willChange: "transform",
            }}
          >
            {AGENCY_LETTERS.map((letter, i) => (
              <span key={i} className="letter" style={{ display: "inline-block" }}>
                {letter}
              </span>
            ))}
          </div>

          {/* Animated SVG underline — draws right to left */}
          <svg
            aria-hidden="true"
            viewBox={`0 0 ${AGENCY_UNDERLINE_WIDTH} 12`}
            style={{
              position: "absolute",
              bottom: "-6px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(80%, 520px)",
              height: "12px",
              overflow: "visible",
              pointerEvents: "none",
            }}
            preserveAspectRatio="none"
          >
            <path
              ref={underlinePathRef}
              d={`M${AGENCY_UNDERLINE_WIDTH} 6 C${AGENCY_UNDERLINE_WIDTH * 0.75} 2, ${AGENCY_UNDERLINE_WIDTH * 0.25} 10, 0 6`}
              fill="none"
              stroke="url(#underlineGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0"
            />
            <defs>
              <linearGradient id="underlineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4ade80" stopOpacity="0" />
                <stop offset="30%" stopColor="#4ade80" />
                <stop offset="70%" stopColor="#059669" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
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
          className="hero-headline-breathe"
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

        {/* Rotating Hebrew subline — or UTM-personalized static line */}
        {utmSubline !== null ? (
          <div
            style={{
              height: "2.2em",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "52px",
            }}
          >
            <p
              style={{
                fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
                fontWeight: 500,
                color: "var(--gold-light, #f0c674)",
                letterSpacing: "0.02em",
                margin: 0,
                fontFamily: "var(--font-heebo)",
                textAlign: "center",
                direction: "rtl",
              }}
            >
              {utmSubline}
            </p>
          </div>
        ) : (
          <SublineDisplay index={sublineIndex} />
        )}

        {/* CTA row — wrapped in MagneticWrapper */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <MagneticWrapper strength={0.25}>
            <HoverButton href="#work" primary>
              צפו בעבודות
            </HoverButton>
          </MagneticWrapper>
          <MagneticWrapper strength={0.25}>
            <HoverButton href="#contact" primary={false}>
              בואו נדבר
            </HoverButton>
          </MagneticWrapper>
        </div>
      </div>

      {/* Stat ticker bar — above scroll indicator */}
      <div
        ref={tickerRef}
        style={{
          position: "absolute",
          bottom: "120px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          pointerEvents: "none",
          opacity: 0, // animated in by GSAP
        }}
      >
        <TickerDisplay index={tickerIndex} />
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
          ref={scrollLineRef}
          style={{
            width: "1px",
            height: "58px",
            background:
              "linear-gradient(to bottom, #4ade80 0%, #059669 40%, transparent 100%)",
            backgroundSize: "100% 300%",
            backgroundPosition: "0% 0%",
            transformOrigin: "top center",
          }}
        />
      </div>
    </section>
  );
}

// ─── SublineDisplay ──────────────────────────────────────────────────────────
// Clips out old line, clips in new line via GSAP clipPath animation
interface SublineDisplayProps {
  index: number;
}

function SublineDisplay({ index }: SublineDisplayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLParagraphElement>(null);
  const prevIndex = useRef(index);

  useEffect(() => {
    if (!currentRef.current) return;
    const isFirstRender = prevIndex.current === index && index === 0;

    if (isFirstRender) {
      // First render — just clip in immediately
      const ctx = gsap.context(() => {
        gsap.fromTo(
          currentRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 1 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      });
      return () => ctx.revert();
    }

    if (prevIndex.current === index) return;
    prevIndex.current = index;

    const el = currentRef.current;
    const ctx = gsap.context(() => {
      // Clip out the outgoing text (already replaced by React), then clip in the new
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "2.2em",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "52px",
      }}
    >
      <p
        ref={currentRef}
        style={{
          fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
          fontWeight: 500,
          color: "#f5f5f7",
          letterSpacing: "0.02em",
          margin: 0,
          fontFamily: "var(--font-heebo)",
          textAlign: "center",
          direction: "rtl",
          clipPath: "inset(0 100% 0 0)",
        }}
      >
        {SUBLINES[index]}
      </p>
    </div>
  );
}

// Ticker stat display with clip-reveal animation
interface TickerDisplayProps {
  index: number;
}

function TickerDisplay({ index }: TickerDisplayProps) {
  const itemRef = useRef<HTMLSpanElement>(null);
  const prevIndex = useRef(index);

  useEffect(() => {
    if (!itemRef.current || prevIndex.current === index) return;
    prevIndex.current = index;

    const el = itemRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <span
      ref={itemRef}
      style={{
        fontFamily: "var(--font-syne)",
        fontSize: "clamp(0.7rem, 1.4vw, 0.85rem)",
        fontWeight: 600,
        color: "#4ade80",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        padding: "6px 18px",
        border: "1px solid rgba(5,150,105,0.3)",
        background: "rgba(5,150,105,0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        whiteSpace: "nowrap",
        fontFeatureSettings: '"tnum"',
      }}
      className="brand-en"
    >
      {TICKER_STATS[index]}
    </span>
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
