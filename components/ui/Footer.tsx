"use client";
import Image from "next/image";
import { Globe, AtSign, Link2, Play } from "lucide-react";

const services = ["אסטרטגיית מותג", "פרסום ממומן", "יצירת תוכן", "SEO", "רשתות חברתיות", "שיווק וידאו"];
const company = ["אודות", "עבודות", "צוות", "בלוג", "מדיניות פרטיות", "תנאי שימוש"];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(5,150,105,0.15)", padding: "80px 40px 40px", background: "var(--bg)" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "60px", marginBottom: "64px" }} className="footer-grid">

          {/* Brand column */}
          <div>
            <div style={{ marginBottom: "20px", display: "inline-block" }}>
              <Image
                src="/logo.jpg"
                alt="CloaqGroup"
                width={150}
                height={50}
                style={{ objectFit: "contain", objectPosition: "left center", background: "#fff", padding: "6px 12px" }}
              />
            </div>
            <p style={{ color: "#8a8a9a", fontSize: "0.9rem", lineHeight: 1.75, maxWidth: "340px", marginBottom: "28px" }}>
              הכוח השיווקי הסמוי מאחורי מותגים שמשלטים בשוק שלהם. אנחנו פועלים מאחורי הקלעים כדי שהמותג שלכם יעמוד בזרקור.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              {[Globe, AtSign, Link2, Play].map((Icon, i) => (
                <div
                  key={i}
                  style={{
                    width: "38px", height: "38px",
                    border: "1px solid rgba(5,150,105,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#059669";
                    e.currentTarget.style.background = "rgba(5,150,105,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(5,150,105,0.25)";
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  <Icon size={16} color="#8a8a9a" />
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", fontWeight: 700 }}>
              שירותים
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" style={{ color: "#8a8a9a", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "24px", fontWeight: 700 }}>
              חברה
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
              {company.map((s) => (
                <li key={s}>
                  <a href="#" style={{ color: "#8a8a9a", textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(5,150,105,0.12)", paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ color: "#8a8a9a", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} MYTHOS AGENCY. כל הזכויות שמורות.
          </p>
          <p className="brand-en" style={{ color: "#8a8a9a", fontSize: "0.7rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>
            WE MAKE BRANDS IMPOSSIBLE TO IGNORE.
          </p>
        </div>
      </div>
    </footer>
  );
}
