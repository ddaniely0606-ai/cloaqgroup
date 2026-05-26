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
    a: "מחיר שירותי שיווק דיגיטלי בישראל נע בין ₪3,000 לחודש לפרילנסר, לבין ₪25,000+ לחודש לסוכנות בוטיק עם צוות מלא. אצלנו מתחילים ב-₪8,000/חודש לחבילה מלאה — פרסום ממומן, SEO ותוכן.",
  },
  {
    q: "מה ההבדל בין SEO לפרסום ממומן?",
    a: "פרסום ממומן (גוגל, פייסבוק, אינסטגרם) מביא תוצאות מיידיות אבל עוצר כשמפסיקים לשלם. SEO הוא השקעה לטווח ארוך — בונים נוכחות אורגנית שממשיכה לייצר לידים גם בלי תקציב פרסום. אנחנו ממליצים על שילוב של השניים.",
  },
  {
    q: "כמה זמן לוקח לראות תוצאות משיווק דיגיטלי?",
    a: "פרסום ממומן — תוצאות ראשונות תוך 2-3 שבועות. SEO — שיפור ראשוני תוך 3-4 חודשים, תוצאות משמעותיות תוך 6-12 חודשים. מיתוג — השפעה מצטברת לאורך 12-24 חודשים. אנחנו שקופים לגמרי לגבי ציר הזמן.",
  },
  {
    q: "האם אתם עובדים עם עסקים קטנים?",
    a: "אנחנו בוחרים לקוחות לפי פוטנציאל ומחויבות — לא לפי גודל. עבדנו עם סטרטאפים בשלב ה-Seed ועם חברות ציבוריות. אם יש לכם מוצר שאתם מאמינים בו ותקציב שיווק של ₪10,000+ לחודש — בואו נדבר.",
  },
  {
    q: "איך אתם מודדים הצלחה?",
    a: "לכל לקוח מגדירים KPIs ברורים לפני שמתחילים: CPA (עלות לרכישה), ROAS (החזר על פרסום), MQL (לידים מוכשרים לשיווק), ורווחיות. אנחנו מדווחים בשקיפות מלאה מדי שבוע — כולל מה לא עבד.",
  },
  {
    q: "האם אתם מתמחים בענף מסוים?",
    a: 'יש לנו ניסיון מוכח ב-5 ענפים: טכנולוגיה ו-SaaS, נדל"ן, אופנה ולייפסטייל, מזון ושתייה, ושירותים פיננסיים. הגישה שלנו מתאימה לכל ענף — אבל הידע הספציפי שלנו בענפים האלה מקצר זמן ומייצר תוצאות מהירות יותר.',
  },
  {
    q: "מה כלול בחוזה העבודה שלכם?",
    a: "כל ההסכמים שלנו כוללים: SLA מוגדר לזמני תגובה, דוחות שבועיים, ישיבת סטטוס חודשית, גישה מלאה לכל הנתונים והחשבונות, וסעיף יציאה הוגן ב-30 יום. שלכם — לא שלנו.",
  },
  {
    q: "כמה לקוחות אתם מנהלים במקביל?",
    a: "מקסימום 12 לקוחות פעילים בכל זמן נתון. זו החלטה עסקית מכוונת — כדי שכל לקוח יקבל תשומת לב אמיתית מהצוות הבכיר. כרגע יש לנו 2 מקומות פנויים לרבעון הקרוב.",
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
                <AccordionContent className="text-[#8a8a9a] leading-[1.8] pb-7 text-[0.95rem]" dir="rtl">
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
