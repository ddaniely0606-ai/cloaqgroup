"use client";
import { useEffect, useRef } from "react";
import Script from "next/script";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "כמה עולה סוכנות שיווק דיגיטלי בישראל?",
    a: "המחירים שלנו מתחילים מ-₪3,500 לחודש לניהול קמפיין בסיסי, עד ₪25,000+ לתוכנית פרימיום מלאה. אנחנו לא מתחרים על מחיר — אנחנו מתחרים על תוצאות.",
  },
  {
    q: "כמה זמן לוקח לראות תוצאות מ-SEO?",
    a: "SEO הוא השקעה לטווח ארוך. תוצאות ראשוניות — 60-90 יום. תוצאות משמעותיות — 4-6 חודשים. הלקוחות שלנו רואים ממוצע של 340% עלייה בתנועה אורגנית בשנה הראשונה.",
  },
  {
    q: "מה ההבדל בין SEO לפרסום ממומן?",
    a: "פרסום ממומן = תוצאות מיידיות, עלות מתמשכת. SEO = בנייה אטית, תוצאות לצמיתות. הגישה האופטימלית: שניהם יחד. הממומן מממן את הצמיחה בזמן שה-SEO בונה את העתיד.",
  },
  {
    q: "האם Mythos Agency עובדים עם עסקים קטנים?",
    a: "אנחנו בוחרים לקוחות לפי פוטנציאל, לא לפי גודל. אם יש לכם מוצר חזק ורצון לצמוח — בואו נדבר. אנחנו לוקחים 3 לקוחות חדשים ברבעון.",
  },
  {
    q: "אילו רשתות חברתיות אתם מנהלים?",
    a: "Instagram, TikTok, LinkedIn, Facebook, YouTube — ולפעמים X. בוחרים את הפלטפורמות לפי הקהל שלכם, לא לפי הטרנד.",
  },
  {
    q: "האם אתם כותבים תוכן בעברית?",
    a: "כן — עברית היא שפת הבית שלנו. כל התוכן שלנו נכתב על ידי קופירייטרים ישראלים שמבינים את הקהל המקומי לעומק.",
  },
  {
    q: "כמה זמן לוקח תהליך הצטרפות חדש?",
    a: "Kickoff תוך 72 שעות מחתימת חוזה. קמפיין ראשון live תוך 10 ימי עסקים. לא מבזבזים זמן על ביורוקרטיה.",
  },
  {
    q: "האם יש לכם הצלחות מוכחות?",
    a: "240+ לקוחות. ₪85M+ תקציב מנוהל. 380% ממוצע צמיחה. Obsidian Spirits — +380% מכירות תוך 6 חודשים. NovaTech Labs — עלות רכישה ירדה ב-60%. Meridian Apparel — 40M צפיות אורגניות.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FAQAgent() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );

      // Reading progress line — scrub-driven height on left edge
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (progressLineRef.current) {
            progressLineRef.current.style.height = `${self.progress * 100}%`;
          }
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
        id="faq"
        ref={sectionRef}
        className="cv-auto relative overflow-hidden"
        style={{ padding: "120px 40px", background: "var(--bg)" }}
      >
        {/* Reading progress line — left edge rail */}
        <div style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "100%", background: "rgba(52,211,153,0.1)", zIndex: 2, pointerEvents: "none" }} />
        <div ref={progressLineRef} style={{ position: "absolute", top: 0, left: 0, width: "2px", height: "0%", background: "var(--emerald-light)", zIndex: 2, pointerEvents: "none", transformOrigin: "top center", boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />

        <span className="section-mark">§11 FAQ</span>
        {/* Top divider */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(5,150,105,0.3), transparent)" }}
        />

        <div className="max-w-[860px] mx-auto">
          <div ref={headingRef} className="mb-16">
            <p className="text-[#34d399] text-xs tracking-[0.35em] uppercase mb-4">
              שאלות נפוצות
            </p>
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              תשובות <span className="text-[#34d399]">ישירות</span>
            </h2>
          </div>

          <Accordion
            multiple={false}
            className="w-full divide-y divide-[rgba(5,150,105,0.15)] border-t border-[rgba(5,150,105,0.15)] border-b"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-none faq-item"
              >
                <AccordionTrigger
                  className="py-7 text-right text-white font-bold hover:no-underline hover:text-[#e0d4ff] transition-colors duration-300 text-base leading-snug [&>svg]:text-[#34d399] [&>svg]:shrink-0"
                  style={{ fontSize: "clamp(1rem, 2vw, 1.1rem)" }}
                >
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#8a8a9a] leading-[1.8] pb-7 text-[0.95rem]">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-16 text-center">
            <p className="text-[#8a8a9a] mb-6 text-base">
              יש לכם שאלה שלא מצאתם כאן?
            </p>
            <a
              href="#contact"
              className="inline-block px-10 py-3.5 border border-[rgba(5,150,105,0.5)] text-[#34d399] text-sm font-semibold no-underline transition-all duration-300 hover:bg-[#059669] hover:text-white hover:border-[#059669]"
            >
              דברו איתנו ישירות
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
