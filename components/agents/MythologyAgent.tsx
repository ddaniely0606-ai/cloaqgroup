"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * MythologyAgent — "Become a Myth" cinematic chamber.
 *
 * Architecture notes (senior-architect):
 *  - Single responsibility: one emotional beat, one CTA.
 *  - No data fetching; pure presentational.
 *  - GSAP context scoped to sectionRef — ctx.revert() on cleanup.
 *
 * Motion choreography (motion-orchestration-staggered):
 *  Beat 1 (shell)   — giant "MYTHOS" outline word fades + parallax up
 *  Beat 2 (content) — headline chars reveal stagger 0.04s per char
 *  Beat 3 (accent)  — subtext + CTA fade in, 600ms cap on all durations
 *
 * Scroll trigger start: "top 65%" — enters late for drama.
 * All animations use transform + opacity only (no layout paint).
 * prefers-reduced-motion: honours via GSAP's reducedMotion defaults.
 */
export default function MythologyAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgWordRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          once: true,
        },
      });

      // Beat 1 — background watermark word rises with parallax feel
      tl.fromTo(
        bgWordRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );

      // Separate slow parallax scroll on the watermark (continuous)
      gsap.to(bgWordRef.current, {
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Beat 2 — headline chars stagger in
      const chars = headingRef.current?.querySelectorAll(".myth-char");
      if (chars && chars.length > 0) {
        tl.fromTo(
          chars,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" },
          "-=0.2"
        );
      }

      // Beat 3 — subtext + CTA
      tl.fromTo(
        subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "-=0.15"
      );
      tl.fromTo(
        ctaRef.current,
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.2"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const headline = "המותג שלך יכול להפוך למיתוס.";

  return (
    <section
      ref={sectionRef}
      id="mythology"
      className="cv-auto"
      style={{
        position: "relative",
        padding: "180px 40px",
        background: "var(--bg2)",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* ── Atmospheric purple glow ─────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "900px",
          height: "600px",
          background:
            "radial-gradient(ellipse, rgba(124,58,237,0.18) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Top separator line ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)",
        }}
      />

      {/* ── Bottom separator line ───────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(124,58,237,0.4), transparent)",
        }}
      />

      {/* ── Giant watermark outline word ────────────────────────── */}
      <div
        ref={bgWordRef}
        className="brand-en"
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(8rem, 22vw, 22rem)",
          fontWeight: 900,
          letterSpacing: "0.1em",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(124,58,237,0.12)",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        MYTHOS
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Kicker */}
        <p
          className="brand-en"
          style={{
            color: "var(--purple-light)",
            fontSize: "0.7rem",
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            marginBottom: "40px",
          }}
        >
          THE MYTHOLOGY CHAMBER
        </p>

        {/* Headline — individual chars for stagger reveal */}
        <h2
          ref={headingRef}
          style={{
            fontWeight: 900,
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
            lineHeight: 1.08,
            color: "#ffffff",
            marginBottom: "32px",
          }}
        >
          {headline.split("").map((char, i) => (
            <span
              key={i}
              className="myth-char"
              style={{ display: "inline-block", whiteSpace: "pre" }}
            >
              {char}
            </span>
          ))}
        </h2>

        {/* Divider */}
        <div
          aria-hidden="true"
          style={{
            width: "120px",
            height: "1px",
            background:
              "linear-gradient(to right, transparent, var(--purple), transparent)",
            margin: "0 auto 32px",
          }}
        />

        {/* Subtext */}
        <p
          ref={subRef}
          style={{
            color: "var(--muted)",
            fontSize: "1.1rem",
            lineHeight: 1.8,
            maxWidth: "600px",
            margin: "0 auto 52px",
          }}
        >
          מיתוסים לא נבנים בקמפיין אחד — הם נבנים בבחירה נכונה של סיפור, ערוץ, ותזמון. זה מה שאנחנו עושים.
        </p>

        {/* CTA */}
        <a
          ref={ctaRef}
          href="#contact"
          style={{
            display: "inline-block",
            padding: "18px 52px",
            background: "var(--purple)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1rem",
            letterSpacing: "0.05em",
            textDecoration: "none",
            border: "1px solid var(--purple)",
            transition: "background 0.3s, transform 0.25s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#6d28d9";
            e.currentTarget.style.transform = "translateY(-3px)";
            e.currentTarget.style.boxShadow = "0 12px 36px rgba(124,58,237,0.45)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "var(--purple)";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          בואו נבנה את המיתוס שלכם
        </a>
      </div>
    </section>
  );
}
