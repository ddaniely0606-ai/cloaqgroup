"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!dot || !ring || !glow) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let glowX = 0, glowY = 0;
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

      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.transform = `translate(${glowX - 60}px, ${glowY - 60}px)`;

      animId = requestAnimationFrame(animate);
    };

    const onEnterClickable = () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "#34d399";
      ring.style.background = "rgba(5,150,105,0.12)";
      dot.style.opacity = "0";
    };

    const onLeaveClickable = () => {
      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "rgba(52,211,153,0.55)";
      ring.style.background = "transparent";
      dot.style.opacity = "1";
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
      {/* Ambient glow — lags behind most */}
      <div ref={glowRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "120px", height: "120px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(5,150,105,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 99996,
        willChange: "transform",
      }} />
      {/* Dot */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "8px", height: "8px",
        borderRadius: "50%",
        background: "#34d399",
        pointerEvents: "none",
        zIndex: 99999,
        boxShadow: "0 0 10px #34d399, 0 0 24px rgba(52,211,153,0.5)",
        willChange: "transform",
        transition: "opacity 0.2s",
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: "fixed", top: 0, left: 0,
        width: "40px", height: "40px",
        borderRadius: "50%",
        border: "1px solid rgba(52,211,153,0.55)",
        pointerEvents: "none",
        zIndex: 99998,
        transition: "width 0.3s, height 0.3s, border-color 0.3s, background 0.3s",
        willChange: "transform",
      }} />
    </>
  );
}
