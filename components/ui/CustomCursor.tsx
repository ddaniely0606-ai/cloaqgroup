"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 20}px, ${ringY - 20}px)`;
      animId = requestAnimationFrame(animate);
    };

    const onEnterClickable = () => {
      ring.style.width = "48px";
      ring.style.height = "48px";
      ring.style.borderColor = "#a78bfa";
      ring.style.background = "rgba(124,58,237,0.1)";
    };

    const onLeaveClickable = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(167,139,250,0.6)";
      ring.style.background = "transparent";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    animId = requestAnimationFrame(animate);

    const clickables = document.querySelectorAll("a, button, [role='button'], input, textarea");
    clickables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterClickable);
      el.addEventListener("mouseleave", onLeaveClickable);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(animId);
      clickables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterClickable);
        el.removeEventListener("mouseleave", onLeaveClickable);
      });
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "8px", height: "8px",
        borderRadius: "50%",
        background: "#a78bfa",
        pointerEvents: "none",
        zIndex: 99999,
        boxShadow: "0 0 10px #a78bfa, 0 0 20px rgba(167,139,250,0.4)",
        willChange: "transform",
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "40px", height: "40px",
        borderRadius: "50%",
        border: "1px solid rgba(167,139,250,0.6)",
        pointerEvents: "none",
        zIndex: 99998,
        transition: "width 0.3s, height 0.3s, border-color 0.3s, background 0.3s",
        willChange: "transform",
      }} />
    </>
  );
}
