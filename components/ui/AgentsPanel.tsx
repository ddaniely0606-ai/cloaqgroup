"use client";
import { useState } from "react";

const agents = [
  { name: "HeroAgent", role: "Three.js particles + GSAP logo reveal", color: "#4ade80" },
  { name: "LogoStripAgent", role: "Client trust marquee strip", color: "#818cf8" },
  { name: "StatsAgent", role: "Animated count-up KPI metrics", color: "#86efac" },
  { name: "ServicesAgent", role: "6 service cards with scroll animations", color: "#4ade80" },
  { name: "ProcessAgent", role: "6-step client process timeline", color: "#818cf8" },
  { name: "PortfolioAgent", role: "Case studies masonry grid", color: "#86efac" },
  { name: "TeamAgent", role: "Team members with hover overlays", color: "#4ade80" },
  { name: "TestimonialsAgent", role: "Infinite auto-scrolling reviews", color: "#818cf8" },
  { name: "FAQAgent", role: "FAQ accordion + JSON-LD rich results", color: "#86efac" },
  { name: "CTAAgent", role: "Pre-footer conversion banner", color: "#4ade80" },
  { name: "ContactAgent", role: "Hebrew animated contact form", color: "#818cf8" },
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
            border: "1px solid rgba(22,163,74,0.4)",
            backdropFilter: "blur(20px)",
            padding: "20px",
            width: "280px",
            boxShadow: "0 0 40px rgba(22,163,74,0.15)",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "16px", borderBottom: "1px solid rgba(22,163,74,0.2)", paddingBottom: "12px" }}>
            <p style={{ color: "#4ade80", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "4px" }}>
              CLOAQGROUP
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
                  background: "rgba(22,163,74,0.06)",
                  border: "1px solid rgba(22,163,74,0.1)",
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
          <div style={{ marginTop: "14px", paddingTop: "12px", borderTop: "1px solid rgba(22,163,74,0.2)" }}>
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
          background: open ? "#16a34a" : "rgba(5,5,8,0.95)",
          border: "1px solid rgba(22,163,74,0.5)",
          color: "#fff",
          fontSize: "0.72rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "all 0.3s",
          backdropFilter: "blur(20px)",
          boxShadow: open ? "0 0 20px rgba(22,163,74,0.4)" : "none",
          fontFamily: "var(--font-syne), monospace",
        }}
        onMouseEnter={(e) => { if (!open) e.currentTarget.style.borderColor = "#16a34a"; }}
        onMouseLeave={(e) => { if (!open) e.currentTarget.style.borderColor = "rgba(22,163,74,0.5)"; }}
      >
        {/* Pulse dot */}
        <div style={{
          width: "7px", height: "7px",
          borderRadius: "50%",
          background: "#4ade80",
          boxShadow: "0 0 8px #4ade80",
          animation: "pulse 2s ease-in-out infinite",
        }} />
        {open ? "Close" : `Agents (${agents.length})`}
      </button>
    </div>
  );
}
