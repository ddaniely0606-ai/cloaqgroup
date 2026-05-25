"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Sun, Moon } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.style.setProperty("--bg", "#050508");
      root.style.setProperty("--bg2", "#0d0d18");
      root.style.setProperty("--text", "#f5f5f7");
      root.style.setProperty("--muted", "#8a8a9a");
      root.style.colorScheme = "dark";
    } else {
      root.style.setProperty("--bg", "#f8f8fc");
      root.style.setProperty("--bg2", "#eeecf8");
      root.style.setProperty("--text", "#0a0a14");
      root.style.setProperty("--muted", "#5a5a7a");
      root.style.colorScheme = "light";
    }
  }, [dark]);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
    );
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
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

      {/* Dark/light toggle */}
      <button
        onClick={() => setDark(!dark)}
        aria-label={dark ? "עבור למצב בהיר" : "עבור למצב כהה"}
        className="hidden md:flex"
        style={{
          alignItems: "center", justifyContent: "center",
          width: "36px", height: "36px",
          border: "1px solid rgba(5,150,105,0.35)",
          background: "transparent",
          cursor: "pointer",
          transition: "border-color 0.3s, background 0.3s",
          marginLeft: "8px",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(5,150,105,0.12)"; e.currentTarget.style.borderColor = "#059669"; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(5,150,105,0.35)"; }}
      >
        {dark
          ? <Sun size={15} color="#34d399" aria-hidden="true" />
          : <Moon size={15} color="#059669" aria-hidden="true" />
        }
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
  );
}
