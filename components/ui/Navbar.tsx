"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const links = [
  { label: "שירותים", href: "#services" },
  { label: "תהליך", href: "#process" },
  { label: "עבודות", href: "#work" },
  { label: "צוות", href: "#team" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 });

      // Logo heartbeat — subtle scale pulse every ~7.5s
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          scale: 1.02,
          duration: 0.25,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          repeatDelay: 7,
          transformOrigin: "left center",
        });
      }
    }, navRef);
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      ctx.revert();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <a href="#hero" className="skip-nav">
      דלג לתוכן הראשי
    </a>
    <nav
      id="navbar"
      ref={navRef}
      aria-label="תפריט ניווט ראשי"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.5s, backdrop-filter 0.5s, border-color 0.5s",
        background: scrolled ? "rgba(4,6,5,0.92)" : "rgba(4,6,5,0.2)",
        backdropFilter: "blur(24px) saturate(1.6)",
        WebkitBackdropFilter: "blur(24px) saturate(1.6)",
        borderBottom: scrolled ? "1px solid rgba(5,150,105,0.15)" : "1px solid rgba(5,150,105,0.05)",
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
        <Image
          ref={logoRef}
          src="/logo.jpg"
          alt="Mythos Agency"
          width={130}
          height={44}
          style={{ objectFit: "contain", objectPosition: "left center", background: "#fff", padding: "4px 10px" }}
          priority
        />
      </a>

      {/* Desktop nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }} className="hidden md:flex">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="nav-link"
            style={{
              color: "#8a8a9a",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* 47-second page tour */}
      <button
        onClick={() => {
          window.scrollTo({ top: 0 });
          const startTime = performance.now();
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          const duration = 47000;
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            window.scrollTo(0, ease * totalHeight);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }}
        className="hidden md:block"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "rgba(52,211,153,0.45)",
          fontSize: "0.65rem",
          letterSpacing: "0.25em",
          fontFamily: "var(--font-syne, sans-serif)",
          transition: "color 0.3s",
          padding: "4px 8px",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#34d399")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(52,211,153,0.45)")}
        aria-label="סיור 47 שניות בדף"
      >
        47 SEC TOUR
      </button>

      <a
        href="#contact"
        className="hidden md:block"
        style={{
          padding: "10px 24px",
          border: "1px solid rgba(5,150,105,0.6)",
          color: "#34d399",
          fontSize: "0.85rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.3s",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#059669";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#34d399";
        }}
      >
        בואו נדבר
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}
        aria-label="תפריט"
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "24px",
              height: "2px",
              background: "#fff",
              margin: "5px 0",
              transition: "all 0.3s",
              transform:
                menuOpen && i === 0 ? "rotate(45deg) translate(5px, 5px)" :
                menuOpen && i === 2 ? "rotate(-45deg) translate(5px, -5px)" : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(5,5,8,0.97)",
            backdropFilter: "blur(24px)",
            padding: "32px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            borderBottom: "1px solid rgba(5,150,105,0.15)",
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "#fff",
                textDecoration: "none",
                fontSize: "1.5rem",
                fontWeight: 800,
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
    </>
  );
}
