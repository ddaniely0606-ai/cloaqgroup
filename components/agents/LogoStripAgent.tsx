"use client";

const clients = [
  { name: "OBSIDIAN SPIRITS" },
  { name: "NOVATECH LABS" },
  { name: "APEX REALTY" },
  { name: "MERIDIAN APPAREL" },
  { name: "SOLSTICE BEAUTY" },
  { name: "VANTAGE CAPITAL" },
  { name: "NEXUS GROUP" },
  { name: "IRONCLAD VENTURES" },
  { name: "AURORA BRANDS" },
  { name: "PINNACLE MEDIA" },
];

export default function LogoStripAgent() {
  const doubledRow1 = [...clients, ...clients];
  const doubledRow2 = [...clients.slice(5), ...clients, ...clients];

  return (
    <div
      style={{
        padding: "32px 0",
        background: "var(--bg2)",
        borderTop: "1px solid rgba(5,150,105,0.1)",
        borderBottom: "1px solid rgba(5,150,105,0.1)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Edge fades */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to right, var(--bg2) 0%, transparent 12%, transparent 88%, var(--bg2) 100%)",
      }} />

      {/* Row 1 — RTL scroll */}
      <div style={{ overflow: "hidden", marginBottom: "8px" }}>
        <div
          className="marquee-rtl brand-en"
          style={{ display: "flex", width: "max-content", alignItems: "center", gap: "0" }}
        >
          {doubledRow1.map((client, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "rgba(52,211,153,0.35)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                padding: "0 48px",
                transition: "color 0.3s",
                userSelect: "none",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(52,211,153,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(52,211,153,0.35)")}
              >
                {client.name}
              </span>
              <span style={{ width: "1px", height: "16px", background: "rgba(5,150,105,0.2)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Separator line */}
      <div style={{
        height: "1px",
        background: "rgba(5,150,105,0.08)",
        margin: "0 40px",
      }} />

      {/* Row 2 — LTR scroll */}
      <div style={{ overflow: "hidden", marginTop: "8px" }}>
        <div
          className="marquee-ltr brand-en"
          style={{ display: "flex", width: "max-content", alignItems: "center", gap: "0" }}
        >
          {doubledRow2.map((client, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <span style={{
                fontFamily: "var(--font-syne)",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                color: "rgba(52,211,153,0.35)",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                padding: "0 48px",
                transition: "color 0.3s",
                userSelect: "none",
              }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(52,211,153,0.75)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(52,211,153,0.35)")}
              >
                {client.name}
              </span>
              <span style={{ width: "1px", height: "16px", background: "rgba(5,150,105,0.2)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
