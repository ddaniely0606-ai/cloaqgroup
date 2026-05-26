"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mythosRef = useRef<HTMLDivElement>(null);
  const agencyRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(overlayRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.inOut",
            onComplete: () => setDone(true),
          });
        },
      });
      tl.fromTo(mythosRef.current!.querySelectorAll(".pl"), { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out" });
      tl.fromTo(agencyRef.current!.querySelectorAll(".pl"), { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power3.out" }, "-=0.4");
      tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: "power2.out" }, "-=0.2");
      tl.fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power2.inOut", transformOrigin: "left center" }, "-=0.1");
      tl.to([mythosRef.current, agencyRef.current, lineRef.current], { opacity: 0, y: -20, duration: 0.4, stagger: 0.05 }, "+=0.1");
    });
    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      role="status"
      aria-live="polite"
      aria-label="הדף בטעינה"
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#050508",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "4px",
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "300px",
        background: "radial-gradient(ellipse, rgba(5,150,105,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* MYTHOS */}
      <div ref={mythosRef} className="brand-en" style={{
        fontFamily: "var(--font-syne)",
        fontSize: "clamp(2.5rem, 10vw, 7rem)",
        fontWeight: 900,
        letterSpacing: "0.18em",
        color: "#ffffff",
        lineHeight: 0.9,
        overflow: "hidden",
      }}>
        {"MYTHOS".split("").map((l, i) => (
          <span key={i} className="pl" style={{ display: "inline-block" }}>{l}</span>
        ))}
      </div>

      {/* AGENCY */}
      <div ref={agencyRef} className="brand-en" style={{
        fontFamily: "var(--font-syne)",
        fontSize: "clamp(2.5rem, 10vw, 7rem)",
        fontWeight: 900,
        letterSpacing: "0.18em",
        lineHeight: 0.9,
        background: "linear-gradient(135deg, #6ee7b7, #34d399, #059669)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        overflow: "hidden",
      }}>
        {"AGENCY".split("").map((l, i) => (
          <span key={i} className="pl" style={{ display: "inline-block" }}>{l}</span>
        ))}
      </div>

      {/* Divider */}
      <div ref={lineRef} style={{
        width: "180px", height: "1px", marginTop: "20px",
        background: "linear-gradient(to right, transparent, #34d399, transparent)",
        transformOrigin: "center",
        transform: "scaleX(0)",
      }} />

      {/* Progress bar */}
      <div style={{ width: "180px", height: "1px", background: "rgba(5,150,105,0.2)", position: "relative", overflow: "hidden", marginTop: "8px" }}>
        <div ref={barRef} style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #059669, #34d399)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
        }} />
      </div>
    </div>
  );
}
