"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Target, TrendingUp, PenTool, Search, Share2, Film, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTextScramble } from "@/hooks/useTextScramble";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Target,
    number: "01",
    title: "אסטרטגיית מותג",
    titleEn: "Brand Strategy",
    desc: "אנחנו בונים זהויות מותג שלא רק בולטות — הן הופכות לבלתי נשכחות. מהמיצוב ועד לקול המותג.",
    metric: "+380% brand lift ממוצע",
    ctaText: "בנו את המותג שלכם",
  },
  {
    icon: TrendingUp,
    number: "02",
    title: "פרסום ממומן",
    titleEn: "Paid Advertising",
    desc: "קמפיינים ממוקדי לייזר שהופכים תקציב פרסום לצמיחה אמיתית — Meta, Google, TikTok ועוד.",
    metric: "עלות רכישה נמוכה ב-60%",
    ctaText: "הפעילו קמפיין",
  },
  {
    icon: PenTool,
    number: "03",
    title: "יצירת תוכן",
    titleEn: "Content Creation",
    desc: "מקונספט ועד ביצוע — כל נכס מוכן לתפוס את תשומת הלב וּלהחזיק בה.",
    metric: "40M+ צפיות אורגניות",
    ctaText: "ייצרו תוכן שנזכרים",
  },
  {
    icon: Search,
    number: "04",
    title: "שליטה ב-SEO",
    titleEn: "SEO Domination",
    desc: "אנחנו מציבים את המותג שלך בראש תוצאות החיפוש — ושומרים אותו שם.",
    metric: "₪12M פייפליין מ-SEO",
    ctaText: "עלו למקום הראשון",
  },
  {
    icon: Share2,
    number: "05",
    title: "רשתות חברתיות",
    titleEn: "Social Media",
    desc: "נוכחות חברתית אסטרטגית שבונה קהלים ממעורבים ומהפכת עוקבים ללקוחות.",
    metric: "×4 בעוקבים תוך 90 יום",
    ctaText: "בנו קהילה",
  },
  {
    icon: Film,
    number: "06",
    title: "שיווק וידאו",
    titleEn: "Video Marketing",
    desc: "סרטי מותג קולנועיים ופרסומות וידאו שמעצרות גוללים במקום.",
    metric: "×8 engagement rate",
    ctaText: "צרו ווידאו מרגש",
  },
];

// ─── ServiceCard ──────────────────────────────────────────────────────────────
const ServiceCard = React.forwardRef<
  HTMLDivElement,
  { icon: LucideIcon; number: string; title: string; titleEn: string; desc: string; metric: string; ctaText: string }
>(({ icon: Icon, number, title, titleEn, desc, metric, ctaText }, forwardedRef) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  const scramble = useTextScramble(title);

  // Merge forwarded ref and internal ref
  const setRefs = (el: HTMLDivElement | null) => {
    (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
    if (typeof forwardedRef === "function") forwardedRef(el);
    else if (forwardedRef) forwardedRef.current = el;
  };

  // Tilt + shine — disabled on touch devices
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    // GSAP quickTo for smooth tilt
    const qRotX = gsap.quickTo(card, "rotateX", { duration: 0.4, ease: "power2.out" });
    const qRotY = gsap.quickTo(card, "rotateY", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const tiltX = (dx / (rect.width / 2)) * 8;
      const tiltY = -(dy / (rect.height / 2)) * 8;

      qRotY(tiltX);
      qRotX(tiltY);

      const pctX = ((e.clientX - rect.left) / rect.width) * 100;
      const pctY = ((e.clientY - rect.top) / rect.height) * 100;
      if (shineRef.current) {
        shineRef.current.style.setProperty("--mouse-x", `${pctX}%`);
        shineRef.current.style.setProperty("--mouse-y", `${pctY}%`);
        shineRef.current.style.opacity = "1";
      }
    };

    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
      if (shineRef.current) shineRef.current.style.opacity = "0";
    };

    card.addEventListener("mousemove", onMove, { passive: true });
    card.addEventListener("mouseleave", onLeave, { passive: true });

    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Expand / collapse detail panel with GSAP (maxHeight avoids height:auto issues)
  useEffect(() => {
    const detail = detailRef.current;
    if (!detail) return;
    const ctx = gsap.context(() => {
      if (expanded) {
        gsap.fromTo(
          detail,
          { maxHeight: 0, opacity: 0 },
          { maxHeight: 200, opacity: 1, duration: 0.4, ease: "power2.out" }
        );
      } else {
        gsap.to(detail, { maxHeight: 0, opacity: 0, duration: 0.3, ease: "power2.in" });
      }
    });
    return () => ctx.revert();
  }, [expanded]);

  return (
    <div
      ref={setRefs}
      onClick={() => setExpanded((v) => !v)}
      style={{
        padding: "40px",
        background: "rgba(0,0,0,0.45)",
        backdropFilter: "blur(20px) saturate(1.5)",
        WebkitBackdropFilter: "blur(20px) saturate(1.5)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "background 0.4s, box-shadow 0.35s",
      }}
      onMouseEnter={(e) => {
        const t = e.currentTarget;
        t.style.background = "rgba(5,150,105,0.09)";
        t.style.boxShadow = "0 20px 50px rgba(5,150,105,0.3), inset 0 1px 0 rgba(255,255,255,0.04)";
        scramble(titleRef.current);
      }}
      onMouseLeave={(e) => {
        const t = e.currentTarget;
        t.style.background = "rgba(0,0,0,0.45)";
        t.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.03)";
      }}
    >
      {/* Shine overlay */}
      <div
        ref={shineRef}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0,
          pointerEvents: "none",
          transition: "opacity 0.3s",
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(52,211,153,0.12) 0%, transparent 60%)",
        } as React.CSSProperties}
      />

      {/* Top border */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, rgba(5,150,105,0.5), transparent)", opacity: 0.6 }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div style={{
          width: "48px", height: "48px",
          display: "flex", alignItems: "center", justifyContent: "center",
          border: "1px solid rgba(5,150,105,0.35)",
        }}>
          <Icon size={20} color="#34d399" />
        </div>
        <span className="brand-en" style={{ fontSize: "3rem", fontWeight: 900, color: "rgba(5,150,105,0.12)", lineHeight: 1 }}>
          {number}
        </span>
      </div>

      {/* Title row with expand chevron */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
        <h3 ref={titleRef} style={{ fontWeight: 800, fontSize: "1.2rem", color: "#fff", margin: 0 }}>
          {title}
        </h3>
        <ChevronDown
          size={18}
          color="#34d399"
          style={{
            flexShrink: 0,
            marginInlineStart: "12px",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      <p className="brand-en" style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#34d399", marginBottom: "16px", textTransform: "uppercase" }}>
        {titleEn}
      </p>
      <p style={{ color: "#8a8a9a", fontSize: "0.9rem", lineHeight: 1.7 }}>
        {desc}
      </p>

      {/* Expandable detail panel */}
      <div
        ref={detailRef}
        style={{ maxHeight: 0, opacity: 0, overflow: "hidden" }}
      >
        <div style={{ paddingTop: "20px", borderTop: "1px solid rgba(5,150,105,0.2)", marginTop: "20px" }}>
          <p style={{ color: "#c4b341", fontSize: "0.9rem", fontWeight: 700, marginBottom: "12px" }}>
            {metric}
          </p>
          <a
            href="#contact"
            onClick={(e) => e.stopPropagation()}
            style={{
              color: "#34d399",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.75"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {ctaText} ←
          </a>
        </div>
      </div>
    </div>
  );
});
ServiceCard.displayName = "ServiceCard";

// ─── ServicesAgent ────────────────────────────────────────────────────────────
export default function ServicesAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      // Count-up "06"
      if (countRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 6,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
          onUpdate() {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(obj.val)).padStart(2, "0");
            }
          },
        });
      }

      // Card stagger — alternating sides
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromX = i % 2 === 0 ? -60 : 60;
        gsap.fromTo(
          card,
          { x: fromX, y: 40, opacity: 0 },
          {
            x: 0, y: 0, opacity: 1, duration: 0.75,
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
      style={{ padding: "clamp(64px, 10vw, 120px) clamp(20px, 4vw, 40px)", background: "var(--bg)", position: "relative" }}
    >
      {/* §05 Section identity mark */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "24px",
          left: "24px",
          fontFamily: "var(--font-syne)",
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          color: "rgba(52,211,153,0.3)",
          textTransform: "uppercase",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        §05 SERVICES
      </span>

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={headingRef} style={{ marginBottom: "72px" }}>
          <p style={{ color: "#34d399", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            מה אנחנו יוצרים —{" "}
            <span className="brand-en" ref={countRef} style={{ fontFamily: "var(--font-syne)", fontWeight: 900 }}>
              00
            </span>{" "}
            שירותים
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
            הכלים{" "}
            <span style={{ background: "linear-gradient(135deg, #34d399, #059669, #86efac)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              שיוצרים אגדות
            </span>
          </h2>
        </div>

        {/* Perspective wrapper for 3D tilt */}
        <div className="services-grid" style={{ perspective: "1000px", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "1px", background: "rgba(5,150,105,0.12)" }}>
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
                metric={service.metric}
                ctaText={service.ctaText}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
