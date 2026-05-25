// ─────────────────────────────────────────────────────────────────────────────
// MYTHOS AGENCY — Page Composition
// Section order follows the cinematic narrative arc:
//   Myth Opens → Proof → Promise → Journey → Work → Believers → Word → Become → CTA
// ─────────────────────────────────────────────────────────────────────────────

import Navbar from "@/components/ui/Navbar";
import HeroAgent from "@/components/agents/HeroAgent";
import LogoStripAgent from "@/components/agents/LogoStripAgent";
import StatsAgent from "@/components/agents/StatsAgent";
import ManifestoAgent from "@/components/agents/ManifestoAgent";
import ServicesAgent from "@/components/agents/ServicesAgent";
import ProcessAgent from "@/components/agents/ProcessAgent";
import PortfolioAgent from "@/components/agents/PortfolioAgent";
import TestimonialsAgent from "@/components/agents/TestimonialsAgent";
import TeamAgent from "@/components/agents/TeamAgent";
import MythologyAgent from "@/components/agents/MythologyAgent";
import FAQAgent from "@/components/agents/FAQAgent";
import CTAAgent from "@/components/agents/CTAAgent";
import ContactAgent from "@/components/agents/ContactAgent";
import Footer from "@/components/ui/Footer";
import AgentsPanel from "@/components/ui/AgentsPanel";
import Preloader from "@/components/ui/Preloader";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ScrollProgress from "@/components/ui/ScrollProgress";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";

export default function Home() {
  return (
    <main className="grain">
      {/* ── Global chrome ─────────────────────────────────────────── */}
      <SmoothScroll />
      <CustomCursor />
      <Preloader />
      <ScrollProgress />
      <Navbar />

      {/* ── 01  HERO ──────────────────────────────────────────────── */}
      {/* Three.js particles + staggered letter reveal (GSAP power4.out)  */}
      {/* Brand: MYTHOS / AGENCY with purple gradient on AGENCY          */}
      {/* Tagline: "מותגים שהופכים למיתוסים."                           */}
      <HeroAgent />

      {/* ── 02  LOGO STRIP ────────────────────────────────────────── */}
      {/* Infinite LTR marquee — client names as social proof anchor    */}
      {/* Appears immediately under hero, zero breathing room → urgency */}
      <LogoStripAgent />

      {/* ── 03  STATS ─────────────────────────────────────────────── */}
      {/* Count-up KPIs: 200+, ₪50M+, 340%, 98%                       */}
      {/* Scroll-trigger: top 70% — numbers fire as section enters view */}
      <StatsAgent />

      {/* ── 04  MANIFESTO ─────────────────────────────────────────── */}
      {/* 4-pillar creed grid (MYTH · POWER · LEGACY · DOMINANCE)      */}
      {/* Closing statement: "אנחנו לא מריצים קמפיינים. אנחנו בונים   */}
      {/*  מיתולוגיה." — rebranded from "שליטה"                       */}
      {/* Stagger: y+80 → y0, 0.05s delay per block                   */}
      <ManifestoAgent />

      {/* ── 05  SERVICES ──────────────────────────────────────────── */}
      {/* 6 service cards in auto-fill grid with hover lift            */}
      {/* Animation: cards enter in columns (i%3 delay), start 88%     */}
      <ServicesAgent />

      {/* ── 06  PROCESS ───────────────────────────────────────────── */}
      {/* 6-step journey: Discovery → Strategy → Creative →            */}
      {/*   Launch → Optimize → Scale                                  */}
      {/* Horizontal timeline on desktop, stacked on mobile            */}
      {/* Animation: connector line draws from 0% width as it enters   */}
      <ProcessAgent />

      {/* ── 07  PORTFOLIO ─────────────────────────────────────────── */}
      {/* Masonry case-study grid — tall hero card left, 2-col right   */}
      {/* Hover: project overlay slides up (translateY 100% → 0)       */}
      {/* Animation: staggered fromTo y+80, opacity 0→1               */}
      <PortfolioAgent />

      {/* ── 08  TESTIMONIALS ──────────────────────────────────────── */}
      {/* Infinite RTL marquee — two-row offset for premium density    */}
      {/* No ScrollTrigger needed — CSS animation auto-plays           */}
      <TestimonialsAgent />

      {/* ── 09  TEAM ──────────────────────────────────────────────── */}
      {/* Team cards with hover overlay name+title reveal              */}
      {/* Animation: scale 0.92→1, opacity 0→1, stagger 0.1s         */}
      <TeamAgent />

      {/* ── 10  MYTHOLOGY CHAMBER ─────────────────────────────────── */}
      {/* NEW SECTION — full-bleed cinematic "become a myth" moment    */}
      {/* Large background word "MYTHOS" in outline text, parallax    */}
      {/* Central statement + single CTA → #contact                   */}
      {/* Animation: split-text char reveal, then fade-in subtext     */}
      <MythologyAgent />

      {/* ── 11  FAQ ───────────────────────────────────────────────── */}
      {/* Accordion-style Q&A — schema markup via next/script         */}
      {/* Animation: each item fades in at top 80%                    */}
      <FAQAgent />

      {/* ── 12  CTA BANNER ────────────────────────────────────────── */}
      {/* Glassmorphic centered card with radial green glow            */}
      {/* "הגיע הזמן" headline + dual CTAs                            */}
      <CTAAgent />

      {/* ── 13  CONTACT ───────────────────────────────────────────── */}
      {/* Animated Hebrew form with field-level GSAP line underlines   */}
      <ContactAgent />

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Footer />

      {/* ── Utilities ─────────────────────────────────────────────── */}
      <AgentsPanel />
      <WhatsAppButton />
    </main>
  );
}
