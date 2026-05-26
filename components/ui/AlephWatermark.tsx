"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AlephWatermark() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      // Slow rotation
      gsap.to(el, { rotation: 360, duration: 120, ease: "none", repeat: -1 });
      // Opacity pulse on scroll — fades in as user scrolls
      gsap.fromTo(el, { opacity: 0.008 }, {
        opacity: 0.022,
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 2 },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        pointerEvents: "none",
        userSelect: "none",
        fontSize: "42vw",
        lineHeight: 1,
        fontFamily: "var(--font-heebo, sans-serif)",
        fontWeight: 900,
        color: "rgba(52,211,153,0.012)",
        WebkitTextStroke: "1px rgba(52,211,153,0.025)",
        opacity: 0.012,
        willChange: "transform",
      }}
    >
      א
    </div>
  );
}
