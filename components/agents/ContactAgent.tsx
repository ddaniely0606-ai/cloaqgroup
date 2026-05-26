"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle, TrendingUp, DollarSign, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ─── Decorative stat pills for the right column ─── */
const decorativePills = [
  { icon: TrendingUp, value: "240+", label: "מותגים", sub: "Brands Mythologized" },
  { icon: DollarSign, value: "₪85M+", label: "מנוהל", sub: "Ad Spend Managed" },
  { icon: Clock, value: "48h", label: "זמן תגובה ממוצע", sub: "Avg. Response Time" },
];

/* ─── Input field with shimmer-border on focus ─── */
function FormField({
  label, type, placeholder, required, id, autoComplete,
}: {
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
  id: string;
  autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div className="form-field">
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "0.7rem",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          color: "var(--muted)",
          marginBottom: "8px",
          transition: "color 0.3s",
          ...(focused ? { color: "var(--emerald-light)" } : {}),
        }}
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        spellCheck={type === "email" ? false : undefined}
        style={{
          width: "100%",
          background: focused ? "rgba(5,150,105,0.04)" : "transparent",
          border: focused
            ? "1px solid var(--emerald)"
            : "1px solid rgba(5,150,105,0.22)",
          padding: "14px 20px",
          color: "var(--text)",
          fontSize: "0.9rem",
          outline: "none",
          fontFamily: "var(--font-heebo)",
          borderRadius: "var(--radius-sm)",
          transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
          boxShadow: focused
            ? "0 0 0 3px rgba(5,150,105,0.15), 0 0 20px rgba(5,150,105,0.08)"
            : "none",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

/* ─── Main component ─── */
export default function ContactAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [textareaFocused, setTextareaFocused] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading reveal */
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 80%" },
        }
      );

      /* Form fields stagger in */
      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out",
            scrollTrigger: { trigger: formRef.current, start: "top 80%" },
          }
        );
      }

      /* Right column pills cascade in */
      if (rightColRef.current) {
        gsap.fromTo(
          rightColRef.current.querySelectorAll(".stat-pill"),
          { x: 40, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.7, stagger: 0.18, ease: "power3.out",
            scrollTrigger: { trigger: rightColRef.current, start: "top 75%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSending(true);
    const form = formRef.current!;
    const data = {
      name: (form.querySelector("#contact-name") as HTMLInputElement).value,
      email: (form.querySelector("#contact-email") as HTMLInputElement).value,
      company: (form.querySelector("#contact-company") as HTMLInputElement).value,
      message: (form.querySelector("textarea") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSending(false);
    if (res.ok) { setSent(true); } else { setError(true); }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="cv-auto contact-bg"
      style={{ padding: "120px 40px", position: "relative", overflow: "hidden" }}
    >
      {/* ── Atmospheric layered background ─────────────────────────────── */}

      {/* Layer 1: Primary emerald radial — left-center anchor */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 60% 70% at 5% 55%, rgba(5,150,105,0.13) 0%, transparent 55%)",
      }} />

      {/* Layer 2: Gold warmth — far right upper */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 50% 50% at 95% 15%, rgba(196,154,60,0.08) 0%, transparent 55%)",
      }} />

      {/* Layer 3: Secondary emerald — bottom right */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 45% 40% at 90% 90%, rgba(6,78,59,0.16) 0%, transparent 60%)",
      }} />

      {/* Layer 4: SVG noise texture — kills color banding */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        backgroundSize: "256px 256px",
        opacity: 0.025,
      }} />

      {/* Layer 5: Top edge divider glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: "linear-gradient(90deg, transparent 0%, rgba(5,150,105,0.4) 35%, rgba(52,211,153,0.6) 50%, rgba(5,150,105,0.4) 65%, transparent 100%)",
      }} />

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        position: "relative",
        zIndex: 1,
        display: "grid",
        gridTemplateColumns: "3fr 2fr",
        gap: "80px",
        alignItems: "center",
      }}>

        {/* ── LEFT COLUMN: heading + form ─── */}
        <div>
          <div ref={headingRef} style={{ marginBottom: "56px" }}>
            <p
              className="brand-en"
              style={{
                color: "var(--emerald-light)",
                fontSize: "0.65rem",
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              הצטרפו למיתוס
            </p>
            <h2
              style={{
                fontWeight: 900,
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                color: "var(--text)",
                lineHeight: 1.02,
                marginBottom: "24px",
                fontFamily: "var(--font-heebo)",
              }}
            >
              הפכו<br />
              <span className="gradient-text-animate">למיתוס.</span>
            </h2>
            <p style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              lineHeight: 1.7,
              maxWidth: "480px",
            }}>
              אנחנו עובדים עם מותגים שמסרבים להיות ממוצעים. אם זה נשמע כמוכם — בואו נדבר.
            </p>
          </div>

          {/* Error banner */}
          <div aria-live="polite">
            {error && (
              <div style={{
                marginBottom: "20px",
                padding: "14px 20px",
                border: "1px solid rgba(239,68,68,0.35)",
                borderRadius: "var(--radius-sm)",
                color: "#fca5a5",
                fontSize: "0.875rem",
                background: "rgba(239,68,68,0.06)",
              }}>
                משהו השתבש. נסו שוב או כתבו לנו ישירות.
              </div>
            )}

            {sent ? (
              <div style={{ textAlign: "center", padding: "80px 0" }} role="status">
                <CheckCircle
                  size={48}
                  color="var(--emerald-light)"
                  style={{ margin: "0 auto 24px" }}
                  aria-hidden="true"
                />
                <h3 style={{ fontWeight: 800, fontSize: "1.6rem", color: "var(--text)", marginBottom: "12px" }}>
                  ההודעה התקבלה
                </h3>
                <p style={{ color: "var(--text-secondary)" }}>
                  נחזור אליכם תוך 24 שעות. המיתוס שלכם מתחיל כאן.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: "20px" }}
                aria-label="טופס יצירת קשר"
              >
                <div
                  className="grid-cols-2"
                  style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}
                >
                  <FormField label="שם מלא" type="text" placeholder="השם שלך" required id="contact-name" autoComplete="name" />
                  <FormField label="אימייל" type="email" placeholder="your@email.com" required id="contact-email" autoComplete="email" />
                </div>

                <FormField label="חברה / מותג" type="text" placeholder="שם החברה שלך" id="contact-company" autoComplete="organization" />

                {/* Textarea — shimmer-border variant */}
                <div className="form-field">
                  <label style={{
                    display: "block",
                    fontSize: "0.7rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: textareaFocused ? "var(--emerald-light)" : "var(--muted)",
                    marginBottom: "8px",
                    transition: "color 0.3s",
                  }}>
                    מה אתם רוצים להשיג?
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="ספרו לנו על יעדי המותג שלכם..."
                    style={{
                      width: "100%",
                      background: textareaFocused ? "rgba(5,150,105,0.04)" : "transparent",
                      border: textareaFocused
                        ? "1px solid var(--emerald)"
                        : "1px solid rgba(5,150,105,0.22)",
                      padding: "16px 20px",
                      color: "var(--text)",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "none",
                      fontFamily: "var(--font-heebo)",
                      borderRadius: "var(--radius-sm)",
                      transition: "border-color 0.3s, background 0.3s, box-shadow 0.3s",
                      boxShadow: textareaFocused
                        ? "0 0 0 3px rgba(5,150,105,0.15), 0 0 20px rgba(5,150,105,0.08)"
                        : "none",
                    }}
                    onFocus={() => setTextareaFocused(true)}
                    onBlur={() => setTextareaFocused(false)}
                  />
                </div>

                {/* Submit button — magnetic */}
                <div className="form-field" style={{ paddingTop: "8px" }}>
                  <button
                    type="submit"
                    disabled={sending}
                    data-magnetic
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px 44px",
                      background: sending ? "rgba(5,150,105,0.45)" : "var(--emerald)",
                      color: "#fff",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      border: "none",
                      borderRadius: "var(--radius-sm)",
                      cursor: sending ? "not-allowed" : "pointer",
                      transition: "background 0.3s, transform 0.25s, box-shadow 0.3s",
                      fontFamily: "var(--font-heebo)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      if (!sending) {
                        e.currentTarget.style.background = "#15803d";
                        e.currentTarget.style.transform = "scale(1.04)";
                        e.currentTarget.style.boxShadow = "0 0 32px rgba(5,150,105,0.45), 0 4px 16px rgba(0,0,0,0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!sending) {
                        e.currentTarget.style.background = "var(--emerald)";
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {sending ? "שולח..." : "שלח הודעה"}
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: decorative stat pills ─── */}
        <div
          ref={rightColRef}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            position: "relative",
          }}
        >
          {/* Ambient glow behind pills */}
          <div style={{
            position: "absolute",
            inset: "-40px",
            background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(5,150,105,0.10) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }} />

          {decorativePills.map((pill, i) => {
            const Icon = pill.icon;
            return (
              <div
                key={i}
                className="stat-pill"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  padding: "24px 28px",
                  background: "rgba(8,12,20,0.72)",
                  border: "1px solid rgba(52,211,153,0.16)",
                  borderRadius: "var(--radius-md)",
                  backdropFilter: "blur(20px) saturate(1.4)",
                  WebkitBackdropFilter: "blur(20px) saturate(1.4)",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(52,211,153,0.40)";
                  el.style.transform = "translateX(-6px)";
                  el.style.boxShadow = "0 8px 32px rgba(5,150,105,0.18)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = "rgba(52,211,153,0.16)";
                  el.style.transform = "translateX(0)";
                  el.style.boxShadow = "none";
                }}
              >
                {/* Shimmer sweep on hover (inline gradient) */}
                <div style={{
                  position: "absolute", inset: 0, pointerEvents: "none",
                  background: "linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.04) 50%, transparent 100%)",
                }} />

                {/* Icon badge */}
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "var(--radius-sm)",
                  background: "rgba(5,150,105,0.14)",
                  border: "1px solid rgba(52,211,153,0.22)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <Icon size={22} color="var(--emerald-light)" aria-hidden="true" />
                </div>

                {/* Text */}
                <div>
                  <div style={{
                    fontSize: "clamp(1.5rem, 3vw, 2rem)",
                    fontWeight: 900,
                    fontFamily: "var(--font-syne)",
                    color: "var(--gold)",
                    lineHeight: 1.1,
                    direction: "ltr",
                    textShadow: "0 0 24px rgba(196,154,60,0.30)",
                  }}>
                    {pill.value}
                  </div>
                  <div style={{
                    color: "var(--text)",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    marginTop: "2px",
                  }}>
                    {pill.label}
                  </div>
                  <div className="brand-en" style={{
                    color: "var(--muted)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}>
                    {pill.sub}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Decorative vertical emerald line */}
          <div style={{
            position: "absolute",
            right: "-20px",
            top: "10%",
            bottom: "10%",
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(52,211,153,0.35), transparent)",
          }} />
        </div>
      </div>

    </section>
  );
}
