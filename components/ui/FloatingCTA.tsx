"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FloatingCTA() {
  const pillRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    const ctx = gsap.context(() => {
      const hero = document.getElementById("hero");
      const contact = document.getElementById("contact");

      if (!hero) return;

      /* Show after hero scrolls away */
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom 80%",
        onEnter: () => {
          gsap.to(pill, {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out",
            pointerEvents: "auto",
          });
        },
        onLeaveBack: () => {
          gsap.to(pill, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: "power2.in",
            pointerEvents: "none",
          });
        },
      });

      /* Hide when contact section is in view */
      if (contact) {
        ScrollTrigger.create({
          trigger: contact,
          start: "top 80%",
          onEnter: () => {
            gsap.to(pill, {
              opacity: 0,
              y: -10,
              duration: 0.3,
              ease: "power2.in",
              pointerEvents: "none",
            });
          },
          onLeaveBack: () => {
            gsap.to(pill, {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
              pointerEvents: "auto",
            });
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .floating-cta-pill { display: none !important; }
        }
      `}</style>

      <button
        ref={pillRef}
        onClick={handleClick}
        className="floating-cta-pill"
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(5,150,105,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(52,211,153,0.4)",
          borderRadius: "999px",
          padding: "10px 24px",
          fontFamily: "var(--font-heebo, sans-serif)",
          fontSize: "0.85rem",
          color: "#ffffff",
          cursor: "pointer",
          zIndex: 80,
          opacity: 0,
          pointerEvents: "none",
          whiteSpace: "nowrap",
          direction: "rtl",
          letterSpacing: "0.01em",
          transition: "background 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(5,150,105,1)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(52,211,153,0.7)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(5,150,105,0.9)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(52,211,153,0.4)";
        }}
      >
        קבלו הצעת מחיר בחינם ←
      </button>
    </>
  );
}
