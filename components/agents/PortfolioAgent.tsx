"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpLeft } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FilterKey = "all" | "brand" | "ads" | "content" | "seo";

interface Project {
  title: string;
  category: string;
  filterKey: FilterKey;
  result: string;
  gradient: string;
  gridArea: string;
  accentColor: string;
}

const filterOptions: { key: FilterKey; label: string }[] = [
  { key: "all",     label: "הכל" },
  { key: "brand",   label: "מותג" },
  { key: "ads",     label: "פרסום" },
  { key: "content", label: "תוכן" },
  { key: "seo",     label: "SEO" },
];

const projects: Project[] = [
  {
    title: "Obsidian Spirits",
    category: "אסטרטגיית מותג + סושיאל",
    filterKey: "brand",
    result: "+380% מכירות תוך 6 חודשים",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    gridArea: "span 2 / span 1",
    accentColor: "rgba(5,150,105,0.03)",
  },
  {
    title: "NovaTech Labs",
    category: "פרסום ממומן + SEO",
    filterKey: "ads",
    result: "עלות רכישה ירדה ב-60%",
    gradient: "linear-gradient(135deg, #064e3b 0%, #14532d 100%)",
    gridArea: "span 1 / span 1",
    accentColor: "rgba(6,78,59,0.04)",
  },
  {
    title: "Meridian Apparel",
    category: "תוכן + וידאו",
    filterKey: "content",
    result: "40M צפיות אורגניות",
    gradient: "linear-gradient(135deg, #065f46 0%, #1a1a2e 100%)",
    gridArea: "span 1 / span 1",
    accentColor: "rgba(6,95,70,0.04)",
  },
  {
    title: "Apex Realty",
    category: "שיווק Full-Funnel",
    filterKey: "seo",
    result: "₪12M פייפליין חדש מ-SEO",
    gradient: "linear-gradient(135deg, #022c22 0%, #0d0d18 100%)",
    gridArea: "span 1 / span 2",
    accentColor: "rgba(2,44,34,0.05)",
  },
  {
    title: "Solstice Beauty",
    category: "רשתות חברתיות + תוכן",
    filterKey: "content",
    result: "×4 בעוקבים תוך 90 יום",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    gridArea: "span 1 / span 1",
    accentColor: "rgba(5,46,22,0.04)",
  },
];

// ─── PortfolioCard ────────────────────────────────────────────────────────────
const PortfolioCard = React.memo(function PortfolioCard({
  project,
  disableGridArea,
}: {
  project: Project;
  disableGridArea?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const metricRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = metricRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      className="portfolio-item"
      data-cursor="view"
      onMouseEnter={() => {
        setHovered(true);
        document.documentElement.style.setProperty("--portfolio-accent", project.accentColor);
      }}
      onMouseLeave={() => {
        setHovered(false);
        document.documentElement.style.setProperty("--portfolio-accent", "transparent");
      }}
      style={{
        gridArea: disableGridArea ? undefined : project.gridArea,
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
        background: hovered
          ? "radial-gradient(ellipse, rgba(5,150,105,0.4) 0%, transparent 70%)"
          : "radial-gradient(ellipse, rgba(4,120,87,0.2) 0%, transparent 70%)",
        transition: "background 0.6s",
        pointerEvents: "none",
      }} />

      {/* Hover overlay */}
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(4,120,87,0.15)" : "transparent", transition: "background 0.4s" }} />

      {/* Big metric watermark — clip-path reveal */}
      <div
        ref={metricRef}
        className="brand-en"
        style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "clamp(2.5rem, 6vw, 4rem)",
          fontWeight: 900, fontFamily: "var(--font-syne)",
          color: hovered ? "rgba(52,211,153,0.25)" : "rgba(52,211,153,0.1)",
          whiteSpace: "nowrap", pointerEvents: "none",
          transition: "color 0.5s",
          textAlign: "center", letterSpacing: "0.05em",
          // initial state managed by GSAP (opacity 0, clipPath)
        }}
      >
        {project.result}
      </div>

      {/* Content — glass panel */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "24px 28px",
        background: hovered ? "rgba(0,0,0,0.72)" : "rgba(0,0,0,0.55)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderTop: `1px solid ${hovered ? "rgba(52,211,153,0.2)" : "rgba(5,150,105,0.1)"}`,
        transition: "background 0.4s, border-color 0.4s",
      }}>
        <p style={{ color: "#34d399", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "6px", opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s" }}>
          {project.category}
        </p>
        <h3 className="brand-en" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "1.25rem", color: "#fff", display: "flex", alignItems: "center", gap: "10px" }}>
          {project.title}
          <ArrowUpLeft size={16} color="#34d399" style={{ opacity: hovered ? 1 : 0, transition: "opacity 0.3s", transform: "rotate(180deg)", flexShrink: 0 }} />
        </h3>
      </div>
    </div>
  );
});

// ─── PortfolioAgent ───────────────────────────────────────────────────────────
export default function PortfolioAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const activeIndicatorRef = useRef<HTMLSpanElement>(null);
  const tabEls = useRef<(HTMLButtonElement | null)[]>([]);

  const [filter, setFilter] = useState<FilterKey>("all");
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBreakpoint(w < 640 ? "mobile" : w < 1024 ? "tablet" : "desktop");
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Initial heading reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate active tab underline indicator
  useEffect(() => {
    const idx = filterOptions.findIndex((f) => f.key === filter);
    const btn = tabEls.current[idx];
    const indicator = activeIndicatorRef.current;
    if (!btn || !indicator || !tabsRef.current) return;

    const tabRect = btn.getBoundingClientRect();
    const parentRect = tabsRef.current.getBoundingClientRect();
    const left = tabRect.left - parentRect.left;
    const width = tabRect.width;

    gsap.to(indicator, {
      left, width,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [filter]);

  // Filter animation
  const handleFilter = (key: FilterKey) => {
    if (key === filter) return;
    const grid = gridRef.current;
    if (!grid) { setFilter(key); return; }

    const items = Array.from(grid.querySelectorAll<HTMLElement>(".portfolio-item"));
    const outItems = key === "all"
      ? []
      : items.filter((el) => {
          const idx = items.indexOf(el);
          return projects[idx]?.filterKey !== key;
        });
    const inItems = key === "all"
      ? items
      : items.filter((el) => {
          const idx = items.indexOf(el);
          return projects[idx]?.filterKey === key;
        });

    // Animate out non-matching
    if (outItems.length > 0) {
      gsap.to(outItems, {
        scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          outItems.forEach((el) => { el.style.display = "none"; });
          setFilter(key);
          // Animate in matching
          gsap.fromTo(inItems, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 });
        },
      });
    } else {
      // Show all — reset hidden
      items.forEach((el) => { el.style.display = ""; });
      setFilter(key);
      gsap.fromTo(inItems, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 });
    }
  };

  const visible = filter === "all" ? projects : projects.filter((p) => p.filterKey === filter);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="cv-auto"
      style={{ padding: "clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)", background: "var(--bg2)", transition: "background 0.6s ease", position: "relative" }}
    >
      <span className="section-mark">§07 WORK</span>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div
          ref={headingRef}
          style={{ marginBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "16px" }}
        >
          <div>
            <p style={{ color: "#34d399", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
              אגדות שבנינו
            </p>
            <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
              אגדות{" "}
              <span style={{ background: "linear-gradient(135deg, #34d399, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                שבנינו
              </span>
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

        {/* Filter tabs */}
        <div
          ref={tabsRef}
          style={{ position: "relative", display: "flex", gap: "4px", marginBottom: "40px", borderBottom: "1px solid rgba(5,150,105,0.15)" }}
        >
          {filterOptions.map((opt, i) => (
            <button
              key={opt.key}
              ref={(el) => { tabEls.current[i] = el; }}
              onClick={() => handleFilter(opt.key)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "10px 20px",
                fontSize: "0.85rem",
                fontFamily: "var(--font-heebo)",
                color: filter === opt.key ? "#34d399" : "#8a8a9a",
                transition: "color 0.25s",
                fontWeight: filter === opt.key ? 700 : 400,
                letterSpacing: "0.03em",
              }}
            >
              {opt.label}
            </button>
          ))}
          {/* Sliding underline indicator */}
          <span
            ref={activeIndicatorRef}
            style={{
              position: "absolute",
              bottom: "-1px",
              height: "2px",
              background: "linear-gradient(90deg, #059669, #34d399)",
              boxShadow: "0 0 8px rgba(52,211,153,0.5)",
              left: 0,
              width: 0,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Grid — responsive columns: 3 desktop, 2 tablet, 1 mobile */}
        <div
          ref={gridRef}
          className="portfolio-grid"
          style={{
            display: "grid",
            gridTemplateColumns: breakpoint === "mobile" ? "1fr" : breakpoint === "tablet" ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
            gridAutoRows: breakpoint === "mobile" ? "220px" : "280px",
            gap: "8px",
          }}
        >
          {visible.map((project, i) => (
            <PortfolioCard
              key={project.title}
              project={project}
              disableGridArea={breakpoint !== "desktop"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
