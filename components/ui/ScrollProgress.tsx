"use client";
import { useEffect, useRef, useState } from "react";

interface SectionDot {
  id: string;
  position: number; // 0–100 percent along the progress bar
}

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState<SectionDot[]>([]);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredDot, setHoveredDot] = useState<string>("");

  // Collect section dots once on mount
  useEffect(() => {
    const buildDots = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
      );
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const built: SectionDot[] = sections.map((s) => ({
        id: s.id,
        position: (s.offsetTop / docHeight) * 100,
      }));
      setDots(built);
    };

    // Delay slightly to allow layout to settle
    const timer = setTimeout(buildDots, 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(pct);

      // Determine active section
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("section[id]")
      );
      let current = "";
      for (const s of sections) {
        if (window.scrollY >= s.offsetTop - window.innerHeight * 0.4) {
          current = s.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      id="scroll-progress"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 200,
        background: "rgba(5,150,105,0.15)",
      }}
    >
      {/* Progress fill */}
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "linear-gradient(to right, #059669, #34d399)",
          transition: "width 0.1s linear",
          boxShadow: "0 0 8px #34d399",
        }}
      />

      {/* Section dots */}
      {dots.map((dot) => {
        const isActive = activeSection === dot.id;
        const isHovered = hoveredDot === dot.id;
        return (
          <div
            key={dot.id}
            style={{
              position: "absolute",
              top: "50%",
              left: `${dot.position}%`,
              transform: "translate(-50%, -50%)",
              width: isActive ? "8px" : "5px",
              height: isActive ? "8px" : "5px",
              borderRadius: "50%",
              background: isActive ? "#34d399" : "rgba(52,211,153,0.4)",
              boxShadow: isActive
                ? "0 0 8px #34d399, 0 0 16px rgba(52,211,153,0.5)"
                : "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
              zIndex: 201,
            }}
            onMouseEnter={() => setHoveredDot(dot.id)}
            onMouseLeave={() => setHoveredDot("")}
            onClick={() => {
              const el = document.getElementById(dot.id);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          >
            {/* Tooltip */}
            {isHovered && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#111318",
                  color: "#f5f5f7",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  padding: "4px 8px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                }}
              >
                {dot.id}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
