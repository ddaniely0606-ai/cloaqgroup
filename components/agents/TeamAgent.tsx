"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AtSign, Link2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const team = [
  {
    initials: "DA",
    roleCode: "CEO",
    name: "דניאל אביב",
    nameEn: "Daniel Aviv",
    role: "מנכ\"ל ואסטרטג ראשי",
    bio: "12 שנות ניסיון בהפיכת מותגים ישראלים לאגדות בינלאומיות. הוא לא בונה קמפיינים — הוא בונה מורשת.",
    gradient: "linear-gradient(135deg, #052e16, #14532d)",
  },
  {
    initials: "SL",
    roleCode: "CCO",
    name: "שרה לוי",
    nameEn: "Sarah Levi",
    role: "מנהלת קריאייטיב",
    bio: "מעצבת ויזואלית שהופכת זהויות מותג לנכסים אבדיים. כל פיקסל שלה נחרת בתודעה.",
    gradient: "linear-gradient(135deg, #064e3b, #14532d)",
  },
  {
    initials: "OB",
    roleCode: "CPO",
    name: "אור בן-דוד",
    nameEn: "Or Ben-David",
    role: "ראש Performance",
    bio: "אסטרטג הביצועים שניהל מעל ₪85M בתקציבי פרסום. הנתונים שלו לא מדברים — הם צועקים.",
    gradient: "linear-gradient(135deg, #065f46, #1a1a2e)",
  },
  {
    initials: "NK",
    roleCode: "CMO",
    name: "נועה כהן",
    nameEn: "Noa Cohen",
    role: "ראשת תוכן ווידאו",
    bio: "יוצרת תוכן שהגיע ל-40M+ צפיות אורגניות. היא לא כותבת תוכן — היא כותבת היסטוריה.",
    gradient: "linear-gradient(135deg, #022c22, #14532d)",
  },
];

export default function TeamAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      gsap.utils.toArray<HTMLElement>(".team-card").forEach((card, i) => {
        const fromX = i % 2 === 0 ? -80 : 80;
        gsap.fromTo(
          card,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.7,
            delay: i * 0.15,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
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
          <p style={{ color: "#34d399", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            בוני האגדות
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
            הצוות <span style={{ color: "#34d399" }}>שיוצר מיתוסים</span>
          </h2>
          <p style={{ color: "#34d399", fontSize: "0.85rem", marginTop: "16px" }}>
            40+ שנות ניסיון משולבות בצוות
          </p>
        </div>

        <div
          className="team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "24px",
          }}
        >
          {team.map((member, i) => {
            // Asymmetric stagger: row 0 → [normal, offset], row 1 → [offset, normal]
            const row = Math.floor(i / 2);
            const col = i % 2;
            const isOffset = (row === 0 && col === 1) || (row === 1 && col === 0);
            return (
              <div
                key={i}
                style={{ marginTop: isOffset ? "48px" : "0px" }}
              >
                <TeamCard member={member} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: typeof team[0] }) {
  const [hovered, setHovered] = React.useState(false);
  const initialsRef = useRef<HTMLSpanElement>(null);
  const roleCodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (hovered) {
        gsap.to(initialsRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
        gsap.fromTo(
          roleCodeRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, delay: 0.15, ease: "power2.out" }
        );
      } else {
        gsap.to(roleCodeRef.current, { opacity: 0, duration: 0.2, ease: "power2.in" });
        gsap.fromTo(
          initialsRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.25, delay: 0.15, ease: "power2.out" }
        );
      }
    });

    return () => ctx.revert();
  }, [hovered]);

  return (
    <div
      className="team-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        overflow: "hidden",
        cursor: "pointer",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 24px 60px rgba(5,150,105,0.3)" : "0 0 0 rgba(0,0,0,0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Photo placeholder */}
      <div style={{ height: "300px", background: member.gradient, position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 50% 80%, rgba(5,150,105,0.35) 0%, transparent 60%)",
        }} />
        {/* Initials watermark */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span
            ref={initialsRef}
            className="brand-en"
            style={{
              fontFamily: "var(--font-syne)", fontSize: "5rem", fontWeight: 900,
              color: "rgba(255,255,255,0.12)", letterSpacing: "0.1em",
              position: "absolute",
            }}
          >
            {member.initials}
          </span>
          <span
            ref={roleCodeRef}
            className="brand-en"
            style={{
              fontFamily: "var(--font-syne)", fontSize: "5rem", fontWeight: 900,
              color: "rgba(52,211,153,0.35)", letterSpacing: "0.1em",
              position: "absolute",
              opacity: 0,
            }}
          >
            {member.roleCode}
          </span>
        </div>
        {/* Social icons overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered ? "rgba(21,128,61,0.25)" : "transparent",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "16px",
          opacity: hovered ? 1 : 0, transition: "opacity 0.3s, background 0.4s",
        }}>
          {[AtSign, Link2].map((Icon, j) => (
            <div key={j} style={{
              width: "40px", height: "40px",
              border: "1px solid rgba(52,211,153,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "rgba(5,5,8,0.5)",
              cursor: "pointer",
            }}>
              <Icon size={16} color="#34d399" />
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div style={{
        padding: "24px",
        background: hovered ? "rgba(5,150,105,0.09)" : "rgba(0,0,0,0.55)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        border: `1px solid ${hovered ? "rgba(52,211,153,0.3)" : "rgba(5,150,105,0.12)"}`,
        borderTop: "none",
        transition: "background 0.4s, border-color 0.3s",
      }}>
        <h3 style={{ fontWeight: 800, fontSize: "1.1rem", color: "#fff", marginBottom: "2px" }}>
          {member.name}
        </h3>
        <p className="brand-en" style={{ fontSize: "0.65rem", color: "#34d399", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
          {member.nameEn}
        </p>
        <p style={{ fontSize: "0.75rem", color: "#34d399", fontWeight: 600, marginBottom: "10px" }}>
          {member.role}
        </p>
        <p style={{ fontSize: "0.85rem", color: "#8a8a9a", lineHeight: 1.65 }}>
          {member.bio}
        </p>
      </div>
    </div>
  );
}
