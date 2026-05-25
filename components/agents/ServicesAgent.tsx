"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, TrendingUp, PenTool, Search, Share2, Film } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Target,
    number: "01",
    title: "אסטרטגיית מותג",
    titleEn: "Brand Strategy",
    desc: "אנחנו בונים זהויות מותג שלא רק בולטות — הן הופכות לבלתי נשכחות. מהמיצוב ועד לקול המותג.",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "פרסום ממומן",
    titleEn: "Paid Advertising",
    desc: "קמפיינים ממוקדי לייזר שהופכים תקציב פרסום לצמיחה אמיתית — Meta, Google, TikTok ועוד.",
  },
  {
    icon: PenTool,
    number: "03",
    title: "יצירת תוכן",
    titleEn: "Content Creation",
    desc: "מקונספט ועד ביצוע — כל נכס מוכן לתפוס את תשומת הלב וּלהחזיק בה.",
  },
  {
    icon: Search,
    number: "04",
    title: "שליטה ב-SEO",
    titleEn: "SEO Domination",
    desc: "אנחנו מציבים את המותג שלך בראש תוצאות החיפוש — ושומרים אותו שם.",
  },
  {
    icon: Share2,
    number: "05",
    title: "רשתות חברתיות",
    titleEn: "Social Media",
    desc: "נוכחות חברתית אסטרטגית שבונה קהלים ממעורבים ומהפכת עוקבים ללקוחות.",
  },
  {
    icon: Film,
    number: "06",
    title: "שיווק וידאו",
    titleEn: "Video Marketing",
    desc: "סרטי מותג קולנועיים ופרסומות וידאו שמעצרות גוללים במקום.",
  },
];

export default function ServicesAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { y: 70, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, delay: (i % 3) * 0.1,
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
      id="services"
      ref={sectionRef}
      className="cv-auto"
      style={{ padding: "120px 40px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={headingRef} style={{ marginBottom: "72px" }}>
          <p style={{ color: "#a78bfa", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            מה אנחנו עושים
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
            הארסנל <span style={{ background: "linear-gradient(135deg, #a78bfa, #7c3aed, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>שלנו</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "1px", background: "rgba(124,58,237,0.12)" }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <ServiceCard
                key={i}
                ref={(el) => { cardsRef.current[i] = el; }}
                icon={Icon}
                number={service.number}
                title={service.title}
                titleEn={service.titleEn}
                desc={service.desc}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

import React from "react";
import type { LucideIcon } from "lucide-react";

const ServiceCard = React.forwardRef<
  HTMLDivElement,
  { icon: LucideIcon; number: string; title: string; titleEn: string; desc: string }
>(({ icon: Icon, number, title, titleEn, desc }, ref) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px",
        background: hovered ? "var(--bg2)" : "var(--bg)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 20px 50px rgba(124,58,237,0.25)" : "0 0 0 rgba(0,0,0,0)",
        transition: "background 0.4s, transform 0.35s ease, box-shadow 0.35s ease",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
        zIndex: hovered ? 1 : 0,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: hovered ? "linear-gradient(to right, transparent, rgba(124,58,237,0.7), transparent)" : "transparent", transition: "background 0.4s" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, height: "1px", width: hovered ? "100%" : "0%", background: "#7c3aed", transition: "width 0.5s ease" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div style={{
          width: "48px", height: "48px",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: `1px solid ${hovered ? "rgba(124,58,237,0.6)" : "rgba(124,58,237,0.25)"}`,
          transition: "border 0.3s",
        }}>
          <Icon size={20} color="#a78bfa" />
        </div>
        <span className="brand-en" style={{ fontSize: "3rem", fontWeight: 900, color: hovered ? "rgba(124,58,237,0.3)" : "rgba(124,58,237,0.1)", transition: "color 0.3s", lineHeight: 1 }}>
          {number}
        </span>
      </div>

      <h3 style={{ fontWeight: 800, fontSize: "1.2rem", color: hovered ? "#e0d4ff" : "#fff", marginBottom: "6px", transition: "color 0.3s" }}>
        {title}
      </h3>
      <p className="brand-en" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#a78bfa", marginBottom: "16px", textTransform: "uppercase" }}>
        {titleEn}
      </p>
      <p style={{ color: hovered ? "#c4c4d4" : "#8a8a9a", fontSize: "0.9rem", lineHeight: 1.7, transition: "color 0.3s" }}>
        {desc}
      </p>
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";
