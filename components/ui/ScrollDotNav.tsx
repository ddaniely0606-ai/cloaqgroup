"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  { id: "hero",         label: "פתיחה" },
  { id: "logos",        label: "לקוחות" },
  { id: "stats",        label: "נתונים" },
  { id: "manifesto",    label: "מניפסט" },
  { id: "services",     label: "שירותים" },
  { id: "process",      label: "תהליך" },
  { id: "work",         label: "עבודות" },
  { id: "testimonials", label: "לקוחות מספרים" },
  { id: "team",         label: "צוות" },
  { id: "mythology",    label: "מיתולוגיה" },
  { id: "faq",          label: "שאלות" },
  { id: "cta",          label: "התחילו" },
  { id: "contact",      label: "צור קשר" },
];

export default function ScrollDotNav() {
  const navRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  /* Fade in after hero scrolls out */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const hero = document.getElementById("hero");
      if (!hero || !navRef.current) return;

      ScrollTrigger.create({
        trigger: hero,
        start: "bottom 80%",
        onEnter: () => {
          setVisible(true);
          gsap.to(navRef.current, { opacity: 1, duration: 0.5, ease: "power2.out" });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => setVisible(false),
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  /* IntersectionObserver — track active section */
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleDotClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @media (pointer: coarse) {
          .scroll-dot-nav { display: none !important; }
        }
        @media (max-width: 767px) {
          .scroll-dot-nav { display: none !important; }
        }
      `}</style>

      <div
        ref={navRef}
        className="scroll-dot-nav"
        style={{
          position: "fixed",
          left: "20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 50,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          opacity: 0,
          pointerEvents: visible ? "auto" : "none",
        }}
      >
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeId === id;
          const isHovered = hoveredId === id;

          return (
            <div
              key={id}
              style={{ position: "relative", display: "flex", alignItems: "center" }}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Tooltip */}
              <div
                style={{
                  position: "absolute",
                  left: "18px",
                  whiteSpace: "nowrap",
                  background: "rgba(5,5,8,0.85)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(52,211,153,0.25)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "0.72rem",
                  color: "var(--text, #f5f5f7)",
                  fontFamily: "var(--font-heebo, sans-serif)",
                  direction: "rtl",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(-4px)",
                  transition: "opacity 0.18s ease, transform 0.18s ease",
                  pointerEvents: "none",
                }}
              >
                {label}
              </div>

              {/* Dot */}
              <button
                onClick={() => handleDotClick(id)}
                aria-label={label}
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  border: "1px solid rgba(52,211,153,0.3)",
                  background: isActive ? "#34d399" : "transparent",
                  transform: isActive ? "scale(1.5)" : "scale(1)",
                  boxShadow: isActive
                    ? "0 0 8px rgba(52,211,153,0.5)"
                    : "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
                  flexShrink: 0,
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
