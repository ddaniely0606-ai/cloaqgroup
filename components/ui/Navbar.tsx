"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const links = [
  { label: "שירותים", href: "#services" },
  { label: "עבודות", href: "#work" },
  { label: "צוות", href: "#team" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
    );
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      ref={navRef}
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
        transition: "all 0.5s",
        background: scrolled ? "rgba(5,5,8,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(124,58,237,0.12)" : "none",
      }}
    >
      {/* Logo — always English, LTR */}
      <a
        href="#"
        className="brand-en"
        style={{
          fontWeight: 800,
          fontSize: "1.25rem",
          letterSpacing: "0.18em",
          color: "#fff",
          textDecoration: "none",
        }}
      >
        CLOAQ<span style={{ color: "#a78bfa" }}>GROUP</span>
      </a>

      {/* Desktop nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "36px" }} className="hidden md:flex">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            style={{
              color: "#8a8a9a",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#a78bfa")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8a8a9a")}
          >
            {link.label}
          </a>
        ))}
      </div>

      <a
        href="#contact"
        className="hidden md:block"
        style={{
          padding: "10px 24px",
          border: "1px solid rgba(124,58,237,0.6)",
          color: "#a78bfa",
          fontSize: "0.85rem",
          fontWeight: 600,
          textDecoration: "none",
          transition: "all 0.3s",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#7c3aed";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#a78bfa";
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
            borderBottom: "1px solid rgba(124,58,237,0.15)",
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
  );
}
