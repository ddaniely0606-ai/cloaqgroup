"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 200, suffix: "+", label: "מותגים שטיפלנו", sublabel: "Brands Served" },
  { value: 50, prefix: "₪", suffix: "M+", label: "תקציב פרסום מנוהל", sublabel: "Ad Spend Managed" },
  { value: 340, suffix: "%", label: "ממוצע גידול במכירות", sublabel: "Avg. Sales Growth" },
  { value: 98, suffix: "%", label: "שביעות רצון לקוחות", sublabel: "Client Satisfaction" },
];

function useCountUp(target: number, active: boolean, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [active, target, duration]);

  return count;
}

function StatCard({ stat, active }: { stat: typeof stats[0]; active: boolean }) {
  const count = useCountUp(stat.value, active);
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", position: "relative" }}>
      <div style={{
        fontSize: "clamp(3rem, 7vw, 5.5rem)",
        fontWeight: 900,
        fontFamily: "var(--font-syne)",
        color: "#fff",
        lineHeight: 1,
        marginBottom: "16px",
        direction: "ltr",
      }}>
        {stat.prefix && <span style={{ color: "#a78bfa" }}>{stat.prefix}</span>}
        <span>{count}</span>
        <span style={{ color: "#a78bfa" }}>{stat.suffix}</span>
      </div>
      <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: "4px" }}>
        {stat.label}
      </p>
      <p className="brand-en" style={{ color: "#8a8a9a", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
        {stat.sublabel}
      </p>
    </div>
  );
}

export default function StatsAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => setActive(true),
      });

      gsap.fromTo(
        ".stat-card",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: "80px 40px",
        background: "linear-gradient(135deg, #0d0d18 0%, #050508 50%, #0d0d18 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Purple glow line top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, #7c3aed, transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(to right, transparent, #7c3aed, transparent)" }} />

      {/* Bg glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "600px", height: "200px",
        background: "radial-gradient(ellipse, rgba(124,58,237,0.12) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1px",
          background: "rgba(124,58,237,0.12)",
        }}>
          {stats.map((stat, i) => (
            <div key={i} className="stat-card" style={{ background: "var(--bg)" }}>
              <StatCard stat={stat} active={active} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
