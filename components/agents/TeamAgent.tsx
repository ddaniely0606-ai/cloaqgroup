"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtSign, Link2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    initials: "MS",
    name: "מרקוס סטיל",
    nameEn: "Marcus Steele",
    role: "מנכ\"ל ומנהל אסטרטגיה",
    bio: "15 שנות ניסיון בבניית מותגים מובילים עבור חברות Fortune 500. מאחורי כמה מהמהלכים המוצלחים ביותר בתעשייה.",
    gradient: "linear-gradient(135deg, #3b0764, #1e1b4b)",
  },
  {
    initials: "AC",
    name: "אריה צ'ן",
    nameEn: "Aria Chen",
    role: "מנהלת קריאייטיב",
    bio: "מעצבת זוכת פרסים שהופכת חזון מותג למציאות ויזואלית שבלתי ניתן להתעלם ממנה.",
    gradient: "linear-gradient(135deg, #4c1d95, #1e1b4b)",
  },
  {
    initials: "JV",
    name: "ג'ורדן ויל",
    nameEn: "Jordan Vale",
    role: "ראש תחום Performance",
    bio: "אסטרטג צמיחה מונע נתונים עם ניהול תקציבי פרסום של מעל $50M. ה-ROAS שלו מדבר בעד עצמו.",
    gradient: "linear-gradient(135deg, #312e81, #1a1a2e)",
  },
  {
    initials: "SK",
    name: "סמרה קינג",
    nameEn: "Samara King",
    role: "ראשת תוכן ווידאו",
    bio: "אדריכלית תוכן וירלי שיצירותיה צברו מעל 2 מיליארד צפיות אורגניות ברחבי הרשת.",
    gradient: "linear-gradient(135deg, #2e1065, #1e1b4b)",
  },
];

export default function TeamAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        gsap.fromTo(card,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, delay: i * 0.12, ease: "power3.out", scrollTrigger: { trigger: card, start: "top 88%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="team"
      ref={sectionRef}
      className="cv-auto"
      style={{ padding: "120px 40px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={headingRef} style={{ marginBottom: "72px" }}>
          <p style={{ color: "#a78bfa", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            הכוח שמאחורינו
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
            הכירו את <span style={{ color: "#a78bfa" }}>הצוות</span>
          </h2>
        </div>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" }}>
          {team.map((member, i) => (
            <TeamCard key={i} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: typeof team[0] }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="team-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden", cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(124,58,237,0.3)" : "0 0 0 rgba(0,0,0,0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Photo placeholder */}
      <div style={{ height: "300px", background: member.gradient, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 80%, rgba(124,58,237,0.35) 0%, transparent 60%)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span className="brand-en" style={{
            fontFamily: "var(--font-syne)", fontSize: "5rem", fontWeight: 900,
            color: "rgba(255,255,255,0.12)", letterSpacing: "0.1em",
          }}>
            {member.initials}
          </span>
        </div>
        {/* Social icons overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(109,40,217,0.25)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "16px",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s, background 0.4s",
        }}>
          {[AtSign, Link2].map((Icon, j) => (
            <div key={j} style={{
              width: "40px", height: "40px",
              border: "1px solid rgba(167,139,250,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(5,5,8,0.5)",
              cursor: "pointer",
            }}>
              <Icon size={16} color="#a78bfa" />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: "24px",
        background: "var(--bg2)",
        border: `1px solid ${hovered ? "rgba(124,58,237,0.35)" : "rgba(124,58,237,0.12)"}`,
        borderTop: "none",
        transition: "border-color 0.3s",
      }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: "2px" }}>
          {member.name}
        </h3>
        <p className="brand-en" style={{ fontSize: "0.65rem", color: "#a78bfa", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
          {member.nameEn}
        </p>
        <p style={{ fontSize: "0.75rem", color: "#a78bfa", fontWeight: 600, marginBottom: "10px" }}>
          {member.role}
        </p>
        <p style={{ fontSize: "0.85rem", color: "#8a8a9a", lineHeight: 1.65 }}>
          {member.bio}
        </p>
      </div>
    </div>
  );
}
