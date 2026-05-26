"use client";
import { useCallback } from "react";
import { gsap } from "gsap";
import { useKonamiCode } from "@/hooks/useKonamiCode";

export default function KonamiEasterEgg() {
  const onKonami = useCallback(() => {
    // Flash full page with emerald/gold color rotation for 3s
    const tl = gsap.timeline();
    tl.to("body", { filter: "hue-rotate(30deg) saturate(2)", duration: 0.3, ease: "power2.out" })
      .to("body", { filter: "hue-rotate(60deg) saturate(2.5)", duration: 0.5 })
      .to("body", { filter: "hue-rotate(0deg) saturate(1)", duration: 1.2, ease: "power2.inOut", delay: 1 });

    // Show toast-like message
    const msg = document.createElement("div");
    msg.textContent = "מצאתם את הסוד. אתם שלנו. 🔥";
    msg.dir = "rtl";
    Object.assign(msg.style, {
      position: "fixed", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)",
      background: "rgba(5,150,105,0.95)",
      backdropFilter: "blur(20px)",
      color: "#fff",
      fontFamily: "var(--font-heebo, sans-serif)",
      fontSize: "1.5rem",
      fontWeight: "800",
      padding: "24px 48px",
      borderRadius: "4px",
      border: "1px solid rgba(52,211,153,0.5)",
      zIndex: "99999",
      pointerEvents: "none",
      whiteSpace: "nowrap",
    });
    document.body.appendChild(msg);
    gsap.fromTo(msg, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" });
    setTimeout(() => {
      gsap.to(msg, { opacity: 0, scale: 0.9, duration: 0.4, onComplete: () => msg.remove() });
    }, 3000);
  }, []);

  useKonamiCode(onKonami);
  return null;
}
