"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          yPercent: -100, duration: 0.8, ease: "power4.inOut",
          onComplete: () => setDone(true),
        });
      },
    });

    tl.fromTo(logoRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
      .fromTo(barRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.2, ease: "power2.inOut", transformOrigin: "left center" }, "+=0.1")
      .to(logoRef.current, { opacity: 0, y: -10, duration: 0.3 }, "+=0.1");
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "#050508",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "32px",
      }}
    >
      <div ref={logoRef} style={{ opacity: 0 }}>
        <h1 className="brand-en" style={{
          fontFamily: "var(--font-syne)",
          fontSize: "clamp(2rem, 8vw, 5rem)",
          fontWeight: 900,
          letterSpacing: "0.2em",
          color: "#fff",
        }}>
          CLOAQ<span style={{ color: "#a78bfa" }}>GROUP</span>
        </h1>
      </div>

      <div style={{ width: "200px", height: "1px", background: "rgba(124,58,237,0.2)", position: "relative", overflow: "hidden" }}>
        <div ref={barRef} style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, #7c3aed, #a78bfa)",
          transformOrigin: "left center",
          transform: "scaleX(0)",
        }} />
      </div>
    </div>
  );
}
