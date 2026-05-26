"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpLeft, Search, LayoutGrid, Layers, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type FilterKey = "all" | "brand" | "ads" | "content" | "seo";
type ViewMode = "grid" | "scroll";

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  filterKey: FilterKey;
  result: string;
  gradient: string;
  gridArea: string;
  accentColor: string;
  description: string;
  keyResults: { label: string; value: string }[];
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
    id: "carmel-peak-spirits",
    title: "Carmel Peak Spirits",
    slug: "carmel-peak-spirits",
    category: "אסטרטגיית מותג + סושיאל",
    filterKey: "brand",
    result: "+380% מכירות תוך 6 חודשים",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    gridArea: "span 2 / span 1",
    accentColor: "rgba(5,150,105,0.03)",
    description: "בניית אסטרטגיית מותג מקיפה לחברת הוויסקי הישראלית המובילה, כולל זהות ויזואלית, קמפיין סושיאל ממוקד ותוכן דיגיטלי שהפך את המותג לאייקון.",
    keyResults: [
      { label: "עלייה במכירות", value: "+380%" },
      { label: "עוקבים חדשים", value: "42,000" },
      { label: "שיעור מעורבות", value: "8.7%" },
    ],
  },
  {
    id: "teltech-labs",
    title: "TelTech Labs",
    slug: "teltech-labs",
    category: "פרסום ממומן + SEO",
    filterKey: "ads",
    result: "עלות רכישה ירדה ב-60%",
    gradient: "linear-gradient(135deg, #064e3b 0%, #14532d 100%)",
    gridArea: "span 1 / span 1",
    accentColor: "rgba(6,78,59,0.04)",
    description: "אופטימיזציה מלאה של מערך הפרסום הממומן עבור חברת הטק מתל אביב, כולל בניית קמפיינים חכמים ב-Google ו-Meta עם טרגטינג מדויק.",
    keyResults: [
      { label: "ירידה בעלות רכישה", value: "-60%" },
      { label: "עלייה ב-ROAS", value: "340%" },
      { label: "לידים חדשים לחודש", value: "1,200" },
    ],
  },
  {
    id: "dizengoff-apparel",
    title: "Dizengoff Apparel",
    slug: "dizengoff-apparel",
    category: "תוכן + וידאו",
    filterKey: "content",
    result: "40M צפיות אורגניות",
    gradient: "linear-gradient(135deg, #065f46 0%, #1a1a2e 100%)",
    gridArea: "span 1 / span 1",
    accentColor: "rgba(6,95,70,0.04)",
    description: "יצירת אסטרטגיית תוכן וידאו ל-TikTok ו-Instagram עבור מותג האופנה הישראלי, עם קמפיינים ויראליים שהגיעו לעשרות מיליוני צפיות.",
    keyResults: [
      { label: "צפיות אורגניות", value: "40M" },
      { label: "גידול במכירות אונליין", value: "+290%" },
      { label: "כיסוי מדיה", value: "×12" },
    ],
  },
  {
    id: "ayalon-finance",
    title: "Ayalon Finance",
    slug: "ayalon-finance",
    category: "שיווק Full-Funnel",
    filterKey: "seo",
    result: "₪12M פייפליין חדש מ-SEO",
    gradient: "linear-gradient(135deg, #022c22 0%, #0d0d18 100%)",
    gridArea: "span 1 / span 2",
    accentColor: "rgba(2,44,34,0.05)",
    description: "בניית מנוע SEO אורגני לחברת הפיננסים המובילה, עם תוכן סמכותי ואסטרטגיית קישורים שהגדילה את תנועת הגולשים האיכותיים פי שלושה.",
    keyResults: [
      { label: "פייפליין SEO", value: "₪12M" },
      { label: "עלייה בדירוג ביטויים", value: "+480" },
      { label: "תנועה אורגנית", value: "×3.2" },
    ],
  },
  {
    id: "ramat-studios",
    title: "Ramat Studios",
    slug: "ramat-studios",
    category: "רשתות חברתיות + תוכן",
    filterKey: "content",
    result: "×4 בעוקבים תוך 90 יום",
    gradient: "linear-gradient(135deg, #052e16 0%, #14532d 100%)",
    gridArea: "span 1 / span 1",
    accentColor: "rgba(5,46,22,0.04)",
    description: "ניהול מלא של הנוכחות הדיגיטלית עבור רשת האולפנים הישראלית, כולל אסטרטגיית תוכן, ניהול קהילה ושיתופי פעולה עם אמנים מובילים.",
    keyResults: [
      { label: "גידול בעוקבים", value: "×4" },
      { label: "הכנסות ממוניטיזציה", value: "+₪280K" },
      { label: "שיתופי פעולה", value: "18 אמנים" },
    ],
  },
];

// ─── CaseStudyModal ───────────────────────────────────────────────────────────
function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(
        panelRef.current,
        { scale: 0.96, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleCTA = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  if (!mounted) return null;

  return createPortal(
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(4,6,10,0.97)",
        backdropFilter: "blur(32px)",
        WebkitBackdropFilter: "blur(32px)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "40px 20px",
      }}
    >
      <div
        ref={panelRef}
        style={{
          width: "100%",
          maxWidth: "760px",
          background: "linear-gradient(135deg, #0a1a12 0%, #060d10 100%)",
          border: "1px solid rgba(5,150,105,0.2)",
          borderRadius: "20px",
          padding: "clamp(32px, 5vw, 56px)",
          position: "relative",
        }}
      >
        {/* Close button — RTL top-left */}
        <button
          onClick={onClose}
          aria-label="סגור"
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#8a8a9a",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(5,150,105,0.2)";
            e.currentTarget.style.color = "#34d399";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            e.currentTarget.style.color = "#8a8a9a";
          }}
        >
          <X size={18} />
        </button>

        {/* Category badge */}
        <span
          style={{
            display: "inline-block",
            background: "rgba(5,150,105,0.15)",
            border: "1px solid rgba(5,150,105,0.3)",
            borderRadius: "100px",
            padding: "4px 14px",
            fontSize: "0.7rem",
            color: "#34d399",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          {project.category}
        </span>

        {/* Title */}
        <h2
          className="brand-en"
          style={{
            fontFamily: "var(--font-syne)",
            fontWeight: 900,
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            color: "#fff",
            marginBottom: "12px",
            lineHeight: 1.15,
          }}
        >
          {project.title}
        </h2>

        {/* Result metric — gold */}
        <p
          style={{
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            fontWeight: 800,
            color: "#c49a3c",
            marginBottom: "28px",
            textShadow: "0 0 24px rgba(196,154,60,0.4)",
          }}
        >
          {project.result}
        </p>

        {/* Description */}
        <p
          style={{
            color: "#8a8a9a",
            fontSize: "1rem",
            lineHeight: 1.8,
            marginBottom: "36px",
            direction: "rtl",
          }}
        >
          {project.description}
        </p>

        {/* Key results */}
        <div
          style={{
            marginBottom: "40px",
            background: "rgba(5,150,105,0.05)",
            border: "1px solid rgba(5,150,105,0.12)",
            borderRadius: "14px",
            padding: "28px",
          }}
        >
          <p
            style={{
              color: "#34d399",
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            תוצאות מרכזיות
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "20px",
            }}
          >
            {project.keyResults.map((kr) => (
              <div key={kr.label} style={{ textAlign: "center" }}>
                <div
                  className="brand-en"
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 900,
                    color: "#c49a3c",
                    fontFamily: "var(--font-syne)",
                    marginBottom: "6px",
                  }}
                >
                  {kr.value}
                </div>
                <div style={{ color: "#8a8a9a", fontSize: "0.78rem" }}>
                  {kr.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleCTA}
          style={{
            width: "100%",
            padding: "18px 32px",
            background: "linear-gradient(135deg, #059669, #34d399)",
            border: "none",
            borderRadius: "12px",
            color: "#fff",
            fontFamily: "var(--font-heebo)",
            fontWeight: 700,
            fontSize: "1.05rem",
            cursor: "pointer",
            transition: "opacity 0.2s, transform 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.9";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          התחילו פרויקט דומה
        </button>
      </div>
    </div>,
    document.body
  );
}

// ─── PortfolioCard ────────────────────────────────────────────────────────────
const PortfolioCard = React.memo(function PortfolioCard({
  project,
  disableGridArea,
  scrollMode,
  onCardClick,
}: {
  project: Project;
  disableGridArea?: boolean;
  scrollMode?: boolean;
  onCardClick: (project: Project) => void;
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
      onClick={() => onCardClick(project)}
      onMouseEnter={() => {
        setHovered(true);
        document.documentElement.style.setProperty("--portfolio-accent", project.accentColor);
      }}
      onMouseLeave={() => {
        setHovered(false);
        document.documentElement.style.setProperty("--portfolio-accent", "transparent");
      }}
      style={{
        gridArea: (!disableGridArea && !scrollMode) ? project.gridArea : undefined,
        width: scrollMode ? "85vw" : undefined,
        flexShrink: scrollMode ? 0 : undefined,
        scrollSnapAlign: scrollMode ? "start" : undefined,
        height: scrollMode ? "450px" : undefined,
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        background: project.gradient,
        transform: hovered ? "translateY(-4px) scale(1.01)" : "translateY(0) scale(1)",
        boxShadow: hovered ? "0 20px 60px rgba(5,150,105,0.35)" : "0 0 0 rgba(0,0,0,0)",
        transition: "transform 0.35s ease, box-shadow 0.35s ease",
        borderRadius: scrollMode ? "16px" : undefined,
      }}
    >
      {/* Grid lines */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.15,
        backgroundImage: "linear-gradient(rgba(5,150,105,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.4) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        pointerEvents: "none",
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
      <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(4,120,87,0.15)" : "transparent", transition: "background 0.4s", pointerEvents: "none" }} />

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

      {/* Micro-CTA panel — slides up on hover */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 20px",
          background: "linear-gradient(0deg, rgba(5,150,105,0.9) 0%, transparent 100%)",
          textAlign: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: hovered ? "auto" : "none",
          zIndex: 10,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.72rem", marginBottom: "8px", letterSpacing: "0.05em" }}>
          רוצים תוצאות כאלה?
        </p>
        <a
          href="#contact"
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "100px",
            padding: "5px 16px",
            color: "#fff",
            fontSize: "0.78rem",
            fontFamily: "var(--font-heebo)",
            fontWeight: 600,
            textDecoration: "none",
            backdropFilter: "blur(8px)",
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.25)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
        >
          בואו נדבר →
        </a>
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
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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

    if (outItems.length > 0) {
      gsap.to(outItems, {
        scale: 0.9, opacity: 0, duration: 0.3, ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          outItems.forEach((el) => { el.style.display = "none"; });
          setFilter(key);
          gsap.fromTo(inItems, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 });
        },
      });
    } else {
      items.forEach((el) => { el.style.display = ""; });
      setFilter(key);
      gsap.fromTo(inItems, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.06 });
    }
  };

  const handleCardClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedProject(null);
  }, []);

  // Compute visible projects: search overrides filter
  const visible = searchQuery.trim()
    ? projects.filter((p) =>
        JSON.stringify(p).toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filter === "all"
    ? projects
    : projects.filter((p) => p.filterKey === filter);

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

        {/* Search + View Toggle row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {/* Search input */}
          <div
            style={{
              flex: 1,
              minWidth: "200px",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "14px",
                color: "#8a8a9a",
                pointerEvents: "none",
                flexShrink: 0,
              }}
            />
            <input
              type="text"
              dir="rtl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חפשו לפי תוצאה, ענף, או שירות..."
              style={{
                width: "100%",
                padding: "11px 16px 11px 40px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(5,150,105,0.2)",
                borderRadius: "10px",
                color: "#f5f5f7",
                fontFamily: "var(--font-heebo)",
                fontSize: "0.88rem",
                outline: "none",
                transition: "border-color 0.25s, box-shadow 0.25s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "#059669";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(5,150,105,0.15)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "rgba(5,150,105,0.2)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          {/* View mode toggle */}
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(5,150,105,0.15)",
              borderRadius: "10px",
              padding: "4px",
            }}
          >
            <button
              onClick={() => setViewMode("grid")}
              aria-label="תצוגת גריד"
              style={{
                background: viewMode === "grid" ? "rgba(5,150,105,0.2)" : "none",
                border: "none",
                borderRadius: "7px",
                padding: "7px 10px",
                cursor: "pointer",
                color: viewMode === "grid" ? "#34d399" : "#8a8a9a",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <LayoutGrid size={17} />
            </button>
            <button
              onClick={() => setViewMode("scroll")}
              aria-label="תצוגת גלילה"
              style={{
                background: viewMode === "scroll" ? "rgba(5,150,105,0.2)" : "none",
                border: "none",
                borderRadius: "7px",
                padding: "7px 10px",
                cursor: "pointer",
                color: viewMode === "scroll" ? "#34d399" : "#8a8a9a",
                display: "flex",
                alignItems: "center",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              <Layers size={17} />
            </button>
          </div>
        </div>

        {/* Filter tabs — shown only when no search query */}
        {!searchQuery.trim() && (
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
        )}

        {/* When search active, add spacing */}
        {searchQuery.trim() && <div style={{ marginBottom: "40px" }} />}

        {/* Grid view */}
        {viewMode === "grid" && (
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
            {visible.map((project) => (
              <PortfolioCard
                key={project.id}
                project={project}
                disableGridArea={breakpoint !== "desktop"}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        )}

        {/* Horizontal scroll view */}
        {viewMode === "scroll" && (
          <div>
            <div
              style={{
                display: "flex",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                gap: "16px",
                paddingBottom: "16px",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(5,150,105,0.3) transparent",
              }}
            >
              {visible.map((project) => (
                <PortfolioCard
                  key={project.id}
                  project={project}
                  disableGridArea
                  scrollMode
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
            <p
              style={{
                textAlign: "center",
                color: "#8a8a9a",
                fontSize: "0.78rem",
                marginTop: "12px",
                letterSpacing: "0.05em",
              }}
            >
              ← → לגלילה
            </p>
          </div>
        )}
      </div>

      {/* Full-page case study modal */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={handleModalClose} />
      )}
    </section>
  );
}
