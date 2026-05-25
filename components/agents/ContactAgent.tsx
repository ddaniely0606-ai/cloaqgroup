"use client";
import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function ContactAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      if (formRef.current) {
        gsap.fromTo(
          formRef.current.querySelectorAll(".form-field"),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out", scrollTrigger: { trigger: formRef.current, start: "top 80%" } }
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
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setSending(false);
    if (res.ok) { setSent(true); } else { setError(true); }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: "120px 40px", background: "var(--bg)", position: "relative" }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        width: "900px", height: "400px",
        background: "radial-gradient(ellipse, rgba(21,128,61,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "820px", margin: "0 auto", position: "relative" }}>
        <div ref={headingRef} style={{ marginBottom: "64px" }}>
          <p style={{ color: "#4ade80", fontSize: "0.75rem", letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: "16px" }}>
            בואו נדבר
          </p>
          <h2 style={{ fontWeight: 900, fontSize: "clamp(3rem, 8vw, 6rem)", color: "#fff", lineHeight: 1, marginBottom: "24px" }}>
            מוכנים<br />
            <span style={{ color: "#4ade80" }}>לשלוט?</span>
          </h2>
          <p style={{ color: "#8a8a9a", fontSize: "1rem", lineHeight: 1.7, maxWidth: "500px" }}>
            ספרו לנו על המותג שלכם ואנחנו נחזור אליכם תוך 24 שעות עם תוכנית להשתלטות על השוק.
          </p>
        </div>

        <div aria-live="polite">
        {error && (
          <div style={{ marginBottom: "20px", padding: "14px 20px", border: "1px solid rgba(239,68,68,0.4)", color: "#fca5a5", fontSize: "0.9rem" }}>
            משהו השתבש. נסו שוב או כתבו לנו ישירות.
          </div>
        )}
        {sent ? (
          <div style={{ textAlign: "center", padding: "80px 0" }} role="status">
            <CheckCircle size={48} color="#4ade80" style={{ margin: "0 auto 24px" }} aria-hidden="true" />
            <h3 style={{ fontWeight: 800, fontSize: "1.6rem", color: "#fff", marginBottom: "12px" }}>
              ההודעה התקבלה
            </h3>
            <p style={{ color: "#8a8a9a" }}>נחזור אליכם תוך 24 שעות. התכוננו לשלוט.</p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "24px" }} aria-label="טופס יצירת קשר">
            <div className="grid-cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              <FormField label="שם מלא" type="text" placeholder="השם שלך" required id="contact-name" autoComplete="name" />
              <FormField label="אימייל" type="email" placeholder="your@email.com" required id="contact-email" autoComplete="email" />
            </div>

            <FormField label="חברה / מותג" type="text" placeholder="שם החברה שלך" id="contact-company" autoComplete="organization" />

            <div className="form-field">
              <label style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a8a9a", marginBottom: "8px" }}>
                מה אתם רוצים להשיג?
              </label>
              <textarea
                required
                rows={5}
                placeholder="ספרו לנו על יעדי המותג שלכם..."
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "1px solid rgba(22,163,74,0.25)",
                  padding: "16px 20px",
                  color: "#fff",
                  fontSize: "0.9rem",
                  outline: "none",
                  resize: "none",
                  fontFamily: "var(--font-heebo)",
                  transition: "border-color 0.3s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#16a34a";
                  e.currentTarget.style.boxShadow = "0 0 0 3px #050508, 0 0 0 5px rgba(22,163,74,0.5)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(22,163,74,0.25)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <div className="form-field" style={{ paddingTop: "8px" }}>
              <button
                type="submit"
                disabled={sending}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "16px 40px",
                  background: sending ? "rgba(22,163,74,0.5)" : "#16a34a",
                  color: "#fff",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  border: "none",
                  cursor: sending ? "not-allowed" : "pointer",
                  transition: "background 0.3s, transform 0.3s",
                  fontFamily: "var(--font-heebo)",
                }}
                onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.background = "#15803d"; e.currentTarget.style.transform = "scale(1.04)"; } }}
                onMouseLeave={(e) => { if (!sending) { e.currentTarget.style.background = "#16a34a"; e.currentTarget.style.transform = "scale(1)"; } }}
              >
                {sending ? "שולח..." : "שלח הודעה"}
                <Send size={16} />
              </button>
            </div>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}

function FormField({ label, type, placeholder, required, id, autoComplete }: { label: string; type: string; placeholder: string; required?: boolean; id: string; autoComplete?: string }) {
  return (
    <div className="form-field">
      <label htmlFor={id} style={{ display: "block", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8a8a9a", marginBottom: "8px" }}>
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
          background: "transparent",
          border: "1px solid rgba(22,163,74,0.25)",
          padding: "14px 20px",
          color: "#fff",
          fontSize: "0.9rem",
          outline: "none",
          fontFamily: "var(--font-heebo)",
          transition: "border-color 0.3s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "#16a34a";
          e.currentTarget.style.boxShadow = "0 0 0 3px #050508, 0 0 0 5px rgba(22,163,74,0.5)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "rgba(22,163,74,0.25)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}
