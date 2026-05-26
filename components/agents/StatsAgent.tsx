"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ─────────────────────────────────────────────────────────────── */
const stats = [
  {
    value: 240,
    suffix: "+",
    label: "מותגים שהפכו לאגדה",
    sublabel: "Brands Mythologized",
    bg: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(5,150,105,0.18) 0%, transparent 70%), linear-gradient(160deg, #04060a 0%, #080c14 100%)",
    accentGlow: "rgba(5,150,105,0.22)",
  },
  {
    value: 85,
    prefix: "₪",
    suffix: "M+",
    label: "תקציב פרסום מנוהל",
    sublabel: "Ad Spend Managed",
    bg: "radial-gradient(ellipse 80% 60% at 30% 80%, rgba(6,78,59,0.28) 0%, transparent 65%), linear-gradient(160deg, #050a0d 0%, #060f0c 100%)",
    accentGlow: "rgba(6,78,59,0.30)",
  },
  {
    value: 380,
    suffix: "%",
    label: "ממוצע גידול בהכנסות",
    sublabel: "Avg. Revenue Growth",
    bg: "radial-gradient(ellipse 70% 50% at 70% 40%, rgba(5,150,105,0.14) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 90%, rgba(196,154,60,0.08) 0%, transparent 55%), linear-gradient(160deg, #04060a 0%, #0a0d10 100%)",
    accentGlow: "rgba(52,211,153,0.18)",
  },
  {
    value: 98,
    suffix: "%",
    label: "לקוחות ממשיכים איתנו",
    sublabel: "Client Retention",
    bg: "radial-gradient(ellipse 90% 70% at 50% 50%, rgba(5,150,105,0.10) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(196,154,60,0.10) 0%, transparent 50%), linear-gradient(160deg, #080c14 0%, #04060a 100%)",
    accentGlow: "rgba(196,154,60,0.20)",
  },
];

/* ─── Hebrew number formatter ───────────────────────────────────────────── */
function formatStat(val: number, suffix: string): string {
  if (suffix.includes("M") || suffix.includes("מ")) return suffix;
  return `${Math.round(val).toLocaleString("he-IL")}${suffix}`;
}

/* ─── Mobile fallback card ──────────────────────────────────────────────── */
function MobileStatCard({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Elastic count-up via GSAP — overshoot 10% then settle */
  useEffect(() => {
    if (!active) return;
    const target = stat.value;
    const obj = { val: 0 };

    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: "elastic.out(1, 0.3)",
        onUpdate: () => setCount(Math.round(obj.val)),
      });
    });

    return () => ctx.revert();
  }, [active, stat.value]);

  return (
    <div
      ref={ref}
      style={{
        padding: "48px 24px",
        textAlign: "center",
        background: stat.bg,
        border: "1px solid rgba(5,150,105,0.15)",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${stat.accentGlow} 0%, transparent 70%)`,
      }} />
      <p className="brand-en" style={{
        fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase",
        color: "var(--emerald-light)", marginBottom: "16px", position: "relative",
      }}>
        {stat.sublabel}
      </p>
      <div
        style={{
          fontSize: "clamp(3.5rem, 14vw, 5rem)",
          fontWeight: 900,
          fontFamily: "var(--font-syne)",
          color: "var(--gold)",
          lineHeight: 1,
          marginBottom: "20px",
          direction: "ltr",
          position: "relative",
          textShadow: "0 0 40px rgba(196,154,60,0.40), 0 0 80px rgba(196,154,60,0.15)",
        }}
      >
        {stat.prefix && <span style={{ color: "var(--emerald-light)", fontSize: "0.6em" }}>{stat.prefix}</span>}
        <span>{count}</span>
        <span style={{ color: "var(--emerald-light)", fontSize: "0.65em" }}>{stat.suffix}</span>
      </div>
      <p style={{ color: "var(--text)", fontWeight: 700, fontSize: "1rem", position: "relative" }}>
        {stat.label}
      </p>
    </div>
  );
}

/* ─── Main component ────────────────────────────────────────────────────── */
export default function StatsAgent() {
  const outerRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  /* detect mobile once on client */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler, { passive: true } as AddEventListenerOptions);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Desktop: GSAP horizontal scroll */
  useEffect(() => {
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const outer = outerRef.current;
      if (!track || !outer) return;

      /* How far the track must slide: (slides - 1) * 100vw */
      const totalSlide = (stats.length - 1) * window.innerWidth;

      /* Pinned horizontal scroll */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: `+=${totalSlide}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            /* Animate progress bar */
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });

      /* Slide the track left */
      tl.to(track, {
        x: -totalSlide,
        ease: "none",
      });

      /* Per-slide count-up — elastic overshoot bounce-in, fires once per slide */
      stats.forEach((stat, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        /* Approximate scroll position where this slide is centred in the viewport:
           each slide occupies (1/N) of totalSlide scroll distance.
           "left 60%" maps to when the slide has scrolled ~60% into view.            */
        const slideScrollFraction = (i + 0.45) / stats.length;

        ScrollTrigger.create({
          trigger: outer,
          start: `${slideScrollFraction * 100}% top`,
          once: true,
          onEnter: () => {
            const obj = { val: 0 };
            const target = stat.value;

            /* Phase 1 — overshoot to 112% */
            gsap.to(obj, {
              val: target * 1.12,
              duration: 1.0,
              ease: "power3.out",
              onUpdate: () => {
                if (el) el.textContent = String(Math.round(obj.val));
              },
              onComplete: () => {
                /* Phase 2 — elastic settle to exact target */
                gsap.to(obj, {
                  val: target,
                  duration: 0.4,
                  ease: "elastic.out(1, 0.5)",
                  onUpdate: () => {
                    if (el) el.textContent = String(Math.round(obj.val));
                  },
                });
              },
            });
          },
        });
      });

      /* Slide-in animations for labels — each slide fades in as it enters */
      stats.forEach((_, i) => {
        const slideProgress = i / stats.length;
        gsap.fromTo(
          `.stat-slide-${i} .stat-label-group`,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
            scrollTrigger: {
              trigger: outer,
              start: `${slideProgress * 100}% top`,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, outerRef);

    return () => ctx.revert();
  }, [isMobile]);

  /* ── Mobile render ─────────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <section
        id="stats"
        className="cv-auto"
        style={{
          padding: "80px 20px",
          background: "var(--bg2)",
          position: "relative",
        }}
      >
        {/* §03 Section identity mark */}
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
          §03 STATS
        </span>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          maxWidth: "600px",
          margin: "0 auto",
        }}>
          {stats.map((stat, i) => (
            <MobileStatCard key={i} stat={stat} />
          ))}
        </div>
      </section>
    );
  }

  /* ── Desktop render ────────────────────────────────────────────────── */
  return (
    <section
      id="stats"
      ref={outerRef}
      className="cv-auto"
      style={{
        height: `${stats.length * 100}vh`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* §03 Section identity mark */}
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
          zIndex: 11,
        }}
      >
        §03 STATS
      </span>

      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          width: "100%",
        }}
      >
        {/* Horizontal track — width = slides * 100vw */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            width: `${stats.length * 100}vw`,
            height: "100%",
            willChange: "transform",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`stat-slide-${i}`}
              style={{
                width: "100vw",
                height: "100vh",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                position: "relative",
                background: stat.bg,
                overflow: "hidden",
              }}
            >
              {/* Atmospheric glow */}
              <div style={{
                position: "absolute",
                inset: "-20%",
                width: "140%",
                height: "140%",
                background: `radial-gradient(ellipse 50% 40% at 50% 50%, ${stat.accentGlow} 0%, transparent 70%)`,
                filter: "blur(80px)",
                pointerEvents: "none",
                animation: "aurora-drift var(--aurora-speed, 22s) ease-in-out infinite alternate",
              }} />

              {/* Top divider line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(to right, transparent, rgba(52,211,153,0.35), transparent)",
              }} />

              {/* Slide number — subtle index */}
              <div className="brand-en" style={{
                position: "absolute",
                top: "40px",
                right: "60px",
                fontSize: "0.65rem",
                letterSpacing: "0.5em",
                color: "var(--muted)",
                textTransform: "uppercase",
              }}>
                0{i + 1} / 0{stats.length}
              </div>

              {/* Main content group */}
              <div className="stat-label-group" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                {/* English sublabel */}
                <p className="brand-en" style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.45em",
                  textTransform: "uppercase",
                  color: "var(--emerald-light)",
                  marginBottom: "32px",
                  opacity: 0.85,
                }}>
                  {stat.sublabel}
                </p>

                {/* Giant number */}
                <div
                  style={{
                    fontSize: "clamp(6rem, 20vw, 14rem)",
                    fontWeight: 900,
                    fontFamily: "var(--font-syne)",
                    color: "var(--gold)",
                    lineHeight: 1,
                    marginBottom: "32px",
                    direction: "ltr",
                    textShadow: "0 0 60px rgba(196,154,60,0.35), 0 0 120px rgba(196,154,60,0.12)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {stat.prefix && (
                    <span style={{ color: "var(--emerald-light)", fontSize: "0.5em", verticalAlign: "middle", marginInlineEnd: "4px" }}>
                      {stat.prefix}
                    </span>
                  )}
                  <span ref={(el) => { numberRefs.current[i] = el; }}>0</span>
                  <span style={{ color: "var(--emerald-light)", fontSize: "0.45em", verticalAlign: "middle", marginInlineStart: "2px" }}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Hebrew label */}
                <p style={{
                  color: "var(--text)",
                  fontWeight: 700,
                  fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)",
                  fontFamily: "var(--font-heebo)",
                  letterSpacing: "0.01em",
                }}>
                  {stat.label}
                </p>
              </div>

              {/* Bottom divider line */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
                background: "linear-gradient(to right, transparent, rgba(52,211,153,0.35), transparent)",
              }} />
            </div>
          ))}
        </div>

        {/* Progress bar — scrub-driven, bottom of sticky container */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "rgba(255,255,255,0.06)",
          zIndex: 10,
        }}>
          <div
            ref={progressRef}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, var(--emerald-dim), var(--emerald-light))",
              transformOrigin: "left center",
              transform: "scaleX(0)",
              willChange: "transform",
            }}
          />
        </div>

        {/* Scroll hint — fades away as user begins scrolling */}
        <div style={{
          position: "absolute",
          bottom: "48px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          opacity: 0.45,
          pointerEvents: "none",
        }}>
          <span style={{
            fontSize: "0.6rem",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "var(--muted)",
            fontFamily: "var(--font-syne)",
          }}>
            SCROLL
          </span>
          <div style={{
            width: "1px",
            height: "32px",
            background: "linear-gradient(to bottom, var(--emerald-dim), transparent)",
            animation: "float 2s ease-in-out infinite",
          }} />
        </div>
      </div>
    </section>
  );
}
