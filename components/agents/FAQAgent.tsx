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
    q: "כמה עולה לעבוד עם CloaqGroup?",
    a: "המחיר תלוי בהיקף הפרויקט ובסל השירותים הנדרש. אנחנו עובדים עם מותגים ברמות תקציב שונות — ממותגים בצמיחה ועד חברות Enterprise. בקשו פגישת אסטרטגיה חינמית ונבנה הצעה מותאמת אישית.",
  },
  {
    q: "כמה זמן עד שרואים תוצאות?",
    a: "פרסום ממומן: תוצאות ראשוניות תוך 2–4 שבועות. SEO: שיפור משמעותי תוך 3–6 חודשים. אסטרטגיית מותג: השפעה ניכרת תוך 90 יום. אנחנו מציבים יעדים ריאליים ומדדים ברורים מהיום הראשון.",
  },
  {
    q: "מה ההבדל ביניכם לסוכנויות אחרות?",
    a: "רוב הסוכנויות מריצות קמפיינים. אנחנו בונים שליטה. הגישה שלנו מבוססת נתונים, מותאמת אישית לכל מותג, ומחויבת לתוצאות מדידות — לא לשקפים יפים. 200+ מותגים, 340% גידול ממוצע במכירות. המספרים מדברים.",
  },
  {
    q: "אילו ערוצי שיווק אתם מנהלים?",
    a: "Meta (Facebook + Instagram), Google Ads, TikTok, LinkedIn, YouTube, SEO אורגני, שיווק תוכן ואסטרטגיה ברשתות חברתיות. אנחנו בוחרים את הערוצים הנכונים לפי קהל היעד שלכם — לא לפי מה שנוח לנו.",
  },
  {
    q: "האם אתם עובדים עם עסקים קטנים ובינוניים?",
    a: "כן. חלק מהתוצאות הטובות ביותר שלנו היו עם מותגים שהתחילו קטנים ובנינו איתם שליטה בשוק. הדרישה שלנו אחת: רצינות. לא נעבוד עם מותגים שלא מחויבים לצמיחה אמיתית.",
  },
  {
    q: "איך מתחילים לעבוד איתכם?",
    a: "שלב 1: פגישת גילוי חינמית — נבין את המותג, היעדים והתחרות. שלב 2: מסמך אסטרטגיה מותאם. שלב 3: השקה ועבודה. כל התהליך יכול להתחיל תוך 48 שעות מהפגישה הראשונה.",
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: headingRef.current, start: "top 80%" } }
      );
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
        {/* Top divider */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(124,58,237,0.3), transparent)" }}
        />

        <div className="max-w-[860px] mx-auto">
          <div ref={headingRef} className="mb-16">
            <p className="text-[#a78bfa] text-xs tracking-[0.35em] uppercase mb-4">
              שאלות נפוצות
            </p>
            <h2 className="font-black text-white leading-tight" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
              תשובות <span className="text-[#a78bfa]">ישירות</span>
            </h2>
          </div>

          <Accordion
            multiple={false}
            className="w-full divide-y divide-[rgba(124,58,237,0.15)] border-t border-[rgba(124,58,237,0.15)] border-b"
          >
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-none faq-item"
              >
                <AccordionTrigger
                  className="py-7 text-right text-white font-bold hover:no-underline hover:text-[#e0d4ff] transition-colors duration-300 text-base leading-snug [&>svg]:text-[#a78bfa] [&>svg]:shrink-0"
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
              className="inline-block px-10 py-3.5 border border-[rgba(124,58,237,0.5)] text-[#a78bfa] text-sm font-semibold no-underline transition-all duration-300 hover:bg-[#7c3aed] hover:text-white hover:border-[#7c3aed]"
            >
              דברו איתנו ישירות
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
