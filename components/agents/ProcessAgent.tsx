"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, Lightbulb, PenTool, Rocket, BarChart2, RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    icon: Search,
    title: "גילוי ואבחון",
    titleEn: "Discovery",
    desc: "שיחה עמוקה עם הצוות שלך. אנחנו חופרים לתוך המותג, המתחרים, והקהל שלך — לא מניחים כלום מראש.",
    detail: "שואלים שאלות שהמתחרים שלכם מפחדים לשאול",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "אסטרטגיה ומיצוב",
    titleEn: "Strategy",
    desc: "מסמך אסטרטגיה מותאם אישית: מיצוב, USP, קהל יעד, מפת תחרות — הכל מגובה בנתונים.",
    detail: "בונים מפה ברורה ממצב קיים למצב רצוי — עם KPIs ריאליים",
  },
  {
    number: "03",
    icon: PenTool,
    title: "קריאייטיב ועיצוב",
    titleEn: "Creative",
    desc: "הפקת נכסי מותג: ויזואלים, וידאו, קופי — כל מה שצריך כדי לשבות את הקהל שלך.",
    detail: "מייצרים תוכן, עיצוב ומסרים שגורמים לאנשים לעצור ולהקשיב",
  },
  {
    number: "04",
    icon: Rocket,
    title: "השקה והפצה",
    titleEn: "Launch",
    desc: "הפעלת קמפיינים מרובי ערוצים — Meta, Google, TikTok, SEO — עם מוניטורינג בזמן אמת.",
    detail: "מפעילים את הקמפיין בתזמון מדויק לאורך כל הערוצים הנכונים",
  },
  {
    number: "05",
    icon: BarChart2,
    title: "מדידה ואופטימיזציה",
    titleEn: "Optimize",
    desc: "דוחות שבועיים שקופים. A/B טסטים, הורדת CAC, הגדלת ROAS — נתונים שמספרים את הסיפור האמיתי.",
    detail: "מנתחים נתונים בזמן אמת ומשנים מה שצריך — ללא אגו",
  },
  {
    number: "06",
    icon: RefreshCw,
    title: "צמיחה וסקייל",
    titleEn: "Scale",
    desc: "כשמוצאים את הנוסחה המנצחת, מכפילים אותה. מגדילים תקציבים, פותחים שווקים חדשים, בונים לטווח ארוך.",
    detail: "לא עוצרים עד שהתוצאות מדברות בשבילנו — ואז מכפילים",
  },
];

// ─── ProcessStep ──────────────────────────────────────────────────────────────
function ProcessStep({ step, index }: { step: typeof steps[0]; index: number }) {
  const [hovered, setHovered] = React.useState(false);
  const stepRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const Icon = step.icon;

  useEffect(() => {
    const el = stepRef.current;
    const wm = watermarkRef.current;
    if (!el || !wm) return;

    const ctx = gsap.context(() => {
      // Entry animation
      gsap.fromTo(
        el,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );

      // Watermark rotation
      gsap.fromTo(
        wm,
        { rotate: -15 },
        {
          rotate: 0, duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 60%" },
        }
      );

      // Node lighting — add/remove CSS class
      ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        onEnter: () => el.classList.add("step-active"),
        onLeaveBack: () => el.classList.remove("step-active"),
      });
    });

    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={stepRef}
      className="process-step"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "40px",
        background: hovered ? "rgba(5,150,105,0.1)" : "rgba(0,0,0,0.45)",
        backdropFilter: "blur(20px) saturate(1.4)",
        WebkitBackdropFilter: "blur(20px) saturate(1.4)",
        transition: "background 0.4s",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: hovered ? "80px" : "40px", height: hovered ? "80px" : "40px",
        background: "radial-gradient(circle at top right, rgba(5,150,105,0.3), transparent 70%)",
        transition: "width 0.4s, height 0.4s",
        pointerEvents: "none",
      }} />

      {/* Step number watermark */}
      <span
        ref={watermarkRef}
        className="brand-en"
        style={{
          position: "absolute", bottom: "16px", left: "24px",
          fontSize: "5rem", fontWeight: 900,
          color: hovered ? "rgba(5,150,105,0.2)" : "rgba(5,150,105,0.07)",
          lineHeight: 1, transition: "color 0.4s",
          fontFamily: "var(--font-syne)",
          pointerEvents: "none",
          userSelect: "none",
          display: "inline-block",
          transformOrigin: "center center",
        }}
      >
        {step.number}
      </span>

      {/* Icon — lights up when step-active */}
      <div style={{
        width: "48px", height: "48px",
        border: `1px solid ${hovered ? "rgba(5,150,105,0.6)" : "rgba(5,150,105,0.2)"}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: "28px", transition: "border-color 0.3s, box-shadow 0.3s",
        background: hovered ? "rgba(5,150,105,0.1)" : "transparent",
      }}>
        <Icon size={20} color="#34d399" />
      </div>

      <h3 style={{ fontWeight: 800, fontSize: "1.15rem", color: hovered ? "#d1fae5" : "#fff", marginBottom: "6px", transition: "color 0.3s" }}>
        {step.title}
      </h3>
      <p className="brand-en" style={{ fontSize: "0.65rem", letterSpacing: "0.22em", color: "#34d399", marginBottom: "16px", textTransform: "uppercase" }}>
        {step.titleEn}
      </p>
      <p style={{ fontSize: "0.9rem", color: hovered ? "#c4c4d4" : "#8a8a9a", lineHeight: 1.7, transition: "color 0.3s" }}>
        {step.desc}
      </p>
      <p style={{ fontSize: "0.8rem", color: "#8a8a9a", marginTop: "8px", lineHeight: 1.6, fontStyle: "italic" }}>
        {step.detail}
      </p>
    </div>
  );
}

// ─── ProcessAgent ─────────────────────────────────────────────────────────────
export default function ProcessAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const svgLineRef = useRef<SVGLineElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      // SVG timeline draw — scrub on scroll
      const svgLine = svgLineRef.current;
      if (svgLine) {
        const totalLength = svgLine.getTotalLength ? svgLine.getTotalLength() : 600;
        gsap.set(svgLine, { strokeDasharray: totalLength, strokeDashoffset: totalLength });
        gsap.to(svgLine, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="cv-auto"
      style={{ padding: "120px 40px", background: "var(--bg2)", position: "relative", overflow: "hidden" }}
    >
      {/* §06 Section identity mark */}
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
        §06 PROCESS
      </span>

      {/* Background radial */}
      <div style={{
        position: "absolute", top: "50%", right: "-10%", transform: "translateY(-50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div ref={headingRef} style={{ marginBottom: "80px" }}>
          <p style={{ color: "#34d399", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            הדרך אל האגדה
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 1.1 }}>
            שישה שלבים{" "}
            <span style={{ background: "linear-gradient(135deg, #86efac, #34d399, #059669)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              אל הנצח
            </span>
          </h2>
        </div>

        {/* Mobile dot indicator — visible on small screens only */}
        <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginBottom: "40px" }} className="process-mobile-dots">
          {steps.map((_, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(5,150,105,0.4)", border: "1px solid rgba(5,150,105,0.6)" }} />
          ))}
        </div>

        {/* Desktop layout: SVG line + grid */}
        <div style={{ position: "relative" }}>
          {/* Vertical SVG timeline — desktop only */}
          <div
            ref={svgContainerRef}
            style={{
              position: "absolute",
              top: 0, bottom: 0,
              left: "-32px",
              width: "2px",
              pointerEvents: "none",
            }}
            className="process-svg-container"
          >
            <svg
              width="2"
              height="100%"
              viewBox="0 0 2 600"
              preserveAspectRatio="none"
              style={{ display: "block", height: "100%", width: "2px" }}
            >
              {/* Background track */}
              <line
                x1="1" y1="0" x2="1" y2="600"
                stroke="rgba(5,150,105,0.15)"
                strokeWidth="2"
              />
              {/* Animated draw line */}
              <line
                ref={svgLineRef}
                x1="1" y1="0" x2="1" y2="600"
                stroke="#34d399"
                strokeWidth="2"
                strokeLinecap="round"
                style={{ filter: "drop-shadow(0 0 4px rgba(52,211,153,0.6))" }}
              />
            </svg>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(5,150,105,0.1)" }}>
            {steps.map((step, i) => (
              <ProcessStep key={i} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Mobile: hide SVG line, show dots */
        @media (max-width: 768px) {
          .process-svg-container { display: none !important; }
        }
        /* Desktop: hide dot row */
        @media (min-width: 769px) {
          .process-mobile-dots { display: none !important; }
        }
        /* Step active state — icon glow */
        .process-step.step-active > div:nth-child(3) {
          box-shadow: 0 0 12px rgba(52,211,153,0.5);
          border-color: rgba(52,211,153,0.7) !important;
        }
      `}</style>
    </section>
  );
}
