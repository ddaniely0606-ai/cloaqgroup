import { gsap } from "gsap";
import { EASE_DECEL, DURATION_BASE, DURATION_FAST } from "./animation";

export function initPageTimeline() {
  const tl = gsap.timeline({ defaults: { ease: EASE_DECEL } });

  // Navbar slides down
  const navbar = document.getElementById("navbar") ?? document.querySelector("nav");
  if (navbar) {
    tl.fromTo(navbar, { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: DURATION_BASE });
  }

  // WhatsApp button pops in
  const wa = document.getElementById("whatsapp-btn") ?? document.querySelector("[data-whatsapp]");
  if (wa) {
    tl.fromTo(wa, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: DURATION_FAST, ease: "elastic.out(1, 0.5)" }, "<+1.8");
  }

  return tl;
}
