"use client";
import { useState } from "react";

const agents = [
  { name: "HeroAgent", role: "Three.js particles + GSAP logo reveal", color: "#34d399" },
  { name: "LogoStripAgent", role: "Client trust marquee strip", color: "#86efac" },
  { name: "StatsAgent", role: "Animated count-up KPI metrics", color: "#34d399" },
  { name: "ServicesAgent", role: "6 service cards with scroll animations", color: "#86efac" },
  { name: "ProcessAgent", role: "6-step client process timeline", color: "#34d399" },
  { name: "PortfolioAgent", role: "Case studies masonry grid", color: "#86efac" },
  { name: "TeamAgent", role: "Team members with hover overlays", color: "#34d399" },
  { name: "TestimonialsAgent", role: "Infinite auto-scrolling reviews", color: "#86efac" },
  { name: "FAQAgent", role: "FAQ accordion + JSON-LD rich results", color: "#34d399" },
  { name: "CTAAgent", role: "Pre-footer conversion banner", color: "#86efac" },
  { name: "ContactAgent", role: "Hebrew animated contact form", color: "#34d399" },
  { name: "SEO Agent", role: "Schema, sitemap, robots, OpenGraph", color: "#86efac" },
];

export default function AgentsPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 999,
        direction: "ltr",
        fontFamily: "var(--font-syne), monospace",
      }}
    >
      {/* Expanded panel */}
      {open && (
        <div
          style={{
            marginBottom: "10px",
            background: "rgba(5,5,8,0.95)",
            border: "1px solid rgba(5,150,105,0.4)",
            backdropFilter: "blur(20px)",
            padding: "20px",
            width: "280px",
            boxShadow: "0 0 40px rgba(5,150,105,0.15)",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "16px", borderBottom: "1px solid rgba(5,150,105,0.2)", paddingBottom: "12px" }}>
            <p style={{ color: "#34d399", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "4px" }}>
              MYTHOS AGENCY
            </p>
            <p style={{ color: "#fff", fontSize: "0.85rem", fontWeight: 700 }}>
              Active Agents — {agents.length}
            </p>
          </div>

          {/* Agent list */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {agents.map((agent, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "8px 10px",
                  background: "rgba(5,150,105,0.06)",
                  border: "1px solid rgba(5,150,105,0.1)",
                }}
              >
                {/* Status dot */}
                <div style={{
                  width: "6px", height: "6px",
                  borderRadius: "50%",
                  background: agent.color,
                  marginTop: "5px",
                  flexShrink: 0,
                  boxShadow: `0 0 6px ${agent.color}`,
                }} />
                <div>
                  <p style={{ color: "#f5f5f7", fontSize: "0.75rem", fontWeight: 700, marginBottom: "2px" }}>
                    {agent.name}
                  </p>
                  <p style={{ color: "#8a8a9a", fontSize: "0.65rem", lineHeight: 1.4 }}>
                    {agent.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(5,150,105,0.2)" }}>
            <p style={{ color: "#8a8a9a", fontSize: "0.6rem", letterSpacing: "0.15em", textAlign: "center" }}>
              BUILT BY CLAUDE CODE · ANTHROPIC
            </p>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 16px",
          background: open ? "#059669" : "rgba(5,5,8,0.95)",
          border: "1px solid rgba(5,150,105,0.5)",
          color: "#fff",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s",
          backdropFilter: "blur(20px)",
          boxShadow: open ? "0 0 20px rgba(5,150,105,0.4)" : "none",
          fontFamily: "var(--font-syne), monospace",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = "#059669"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = "rgba(5,150,105,0.5)"; }}
      >
        {/* Pulse dot */}
        <div style={{
          width: "7px", height: "7px",
          borderRadius: "50%",
          background: "#34d399",
          boxShadow: "0 0 8px #34d399",
          animation: "pulse 2s ease-in-out infinite",
        }} />
        {open ? "Close" : `Agents (${agents.length})`}
      </button>
    </div>
  );
}
