"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CursorAgent() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    const ctx = gsap.context(() => {
      // quickTo for butter-smooth ring following with lag
      const ringX = gsap.quickTo(ring, "x", { duration: 0.1, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.1, ease: "power3.out" });

      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        // Dot follows instantly via direct style (no tween overhead)
        gsap.set(dot, { x: clientX - 4, y: clientY - 4 });

        // Ring follows with quickTo lag
        ringX(clientX - 20);
        ringY(clientY - 20);
      };

      // Link/button expand effect
      const onEnterClickable = () => {
        gsap.to(ring, {
          width: 60,
          height: 60,
          x: "-=10",
          y: "-=10",
          mixBlendMode: "difference",
          borderColor: "#4ade80",
          duration: 0.25,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const onLeaveClickable = () => {
        gsap.to(ring, {
          width: 40,
          height: 40,
          mixBlendMode: "normal",
          borderColor: "rgba(5,150,105,0.7)",
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      // Magnetic pull — cursor snaps closer to element center
      const onEnterMagnetic = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        gsap.to(dot, { x: centerX - 4, y: centerY - 4, duration: 0.2, ease: "power3.out", overwrite: "auto" });
        gsap.to(ring, { x: centerX - 20, y: centerY - 20, duration: 0.2, ease: "power3.out", overwrite: "auto" });
      };

      window.addEventListener("mousemove", onMouseMove, { passive: true });

      const clickables = document.querySelectorAll<HTMLElement>("a, button, [role='button']");
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", onEnterClickable);
        el.addEventListener("mouseleave", onLeaveClickable);
      });

      const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      magnetics.forEach((el) => {
        el.addEventListener("mouseenter", onEnterMagnetic);
      });

      // Store cleanup references on ctx for revert
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        clickables.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterClickable);
          el.removeEventListener("mouseleave", onLeaveClickable);
        });
        magnetics.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterMagnetic);
        });
      };
    });

    return () => {
      ctx.revert();
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Dot — 8px solid emerald, instant follow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#059669",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: "0 0 8px rgba(5,150,105,0.8)",
        }}
      />
      {/* Ring — 40px ring, lags behind dot */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(5,150,105,0.7)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
        }}
      />
      {/* Mobile: hide cursor elements via media query */}
      <style>{`
        @media (pointer: coarse) {
          [data-cursor-dot], [data-cursor-ring] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
