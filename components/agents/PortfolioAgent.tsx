"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Obsidian Spirits",
    category: "אסטרטגיית מותג + סושיאל",
    result: "+340% מכירות תוך 6 חודשים",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    gridArea: "span 2 / span 1",
  },
  {
    title: "NovaTech Labs",
    category: "פרסום ממומן + SEO",
    result: "עלות רכישה ירדה ב-60%",
    gradient: "linear-gradient(135deg, #064e3b 0%, #14532d 100%)",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Meridian Apparel",
    category: "תוכן + וידאו",
    result: "40M צפיות אורגניות",
    gradient: "linear-gradient(135deg, #065f46 0%, #1a1a2e 100%)",
    gridArea: "span 1 / span 1",
  },
  {
    title: "Apex Realty",
    category: "שיווק Full-Funnel",
    result: "₪8M פייפליין חדש מ-SEO",
    gradient: "linear-gradient(135deg, #022c22 0%, #0d0d18 100%)",
    gridArea: "span 1 / span 2",
  },
  {
    title: "Solstice Beauty",
    category: "רשתות חברתיות + תוכן",
    result: "x3 בעוקבים תוך 90 יום",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    gridArea: "span 1 / span 1",
  },
];

export default function PortfolioAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      gsap.utils.toArray<HTMLElement>(".portfolio-item").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, duration: 0.8, delay: i * 0.08, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="cv-auto"
      style={{ padding: "120px 40px", background: "var(--bg2)" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          ref={headingRef}
          style={{ marginBottom: "72px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <p style={{ color: "#34d399", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
              העבודות שלנו
            </p>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
              תיק <span style={{ background: "linear-gradient(135deg, #34d399, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>עבודות</span>
            </h2>
          </div>
          <a
            href="#contact"
            style={{ color: "#8a8a9a", fontSize: "0.85rem", textDecoration: "none", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
          >
            <ArrowUpLeft size={16} /> לכל הפרויקטים
          </a>
        </div>

        <div className="portfolio-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "280px", gap: "8px" }}>
          {projects.map((project, i) => (
            <PortfolioCard key={i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PortfolioCard = React.memo(function PortfolioCard({ project }: { project: typeof projects[0] }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      className="portfolio-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridArea: project.gridArea,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: project.gradient,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 20px 60px rgba(5,150,105,0.35)" : "0 0 0 rgba(0,0,0,0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.15,
        backgroundImage: "linear-gradient(rgba(5,150,105,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.4) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "60%", height: "60%",
        background: hovered ? "radial-gradient(ellipse, rgba(5,150,105,0.4) 0%, transparent 70%)" : "radial-gradient(ellipse, rgba(4,120,87,0.2) 0%, transparent 70%)",
        transition: "background 0.6s",
        pointerEvents: "none",
      }} />

      {/* Hover overlay */}
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(4,120,87,0.15)" : "transparent", transition: "background 0.4s" }} />

      {/* Content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "32px",
        background: "linear-gradient(to top, rgba(5,5,8,0.85) 0%, transparent 100%)",
        transform: hovered ? "translateY(0)" : "translateY(8px)",
        transition: "transform 0.4s",
      }}>
        <p style={{ color: "#34d399", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "6px", opacity: hovered ? 1 : 0, transition: "opacity 0.3s" }}>
          {project.category}
        </p>
        <h3 className="brand-en" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.4rem", color: "#fff", marginBottom: "4px", display: "flex", alignItems: "center", gap: "10px" }}>
          {project.title}
          <ArrowUpLeft size={18} color="#34d399" style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s", transform: "rotate(180deg)" }} />
        </h3>
        <p style={{ color: "#c4c4d4", fontSize: "0.8rem", opacity: hovered ? 1 : 0, transition: "opacity 0.4s 0.05s" }}>
          {project.result}
        </p>
      </div>
    </div>
  );
});
