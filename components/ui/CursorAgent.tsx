"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// Trail pool size
const TRAIL_COUNT = 8;

export default function CursorAgent() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trailIndexRef = useRef(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    // Touch/coarse pointer: bail out entirely
    if (window.matchMedia("(pointer: coarse)").matches) {
      dot.style.display = "none";
      ring.style.display = "none";
      trailRefs.current.forEach((t) => { if (t) t.style.display = "none"; });
      return;
    }

    // Hide native cursor
    document.documentElement.style.cursor = "none";

    // Idle timer state (outside ctx so clearTimeout works across re-renders)
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let isIdle = false;

    // Scroll velocity state
    let lastScrollY = window.scrollY;
    let lastScrollTime = Date.now();
    let scrollEndTimer: ReturnType<typeof setTimeout> | null = null;

    const ctx = gsap.context(() => {
      // ── quickTo for ring lag ──────────────────────────────────────────────
      const ringX = gsap.quickTo(ring, "x", { duration: 0.1, ease: "power3.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.1, ease: "power3.out" });

      // Current ring size (mutable, so idle + section-aware can read it)
      let ringSize = 40;

      // ── Trail dots ────────────────────────────────────────────────────────
      const getTrailDot = (i: number) => trailRefs.current[i];

      const spawnTrail = (x: number, y: number) => {
        const idx = trailIndexRef.current % TRAIL_COUNT;
        trailIndexRef.current++;
        const td = getTrailDot(idx);
        if (!td) return;
        gsap.killTweensOf(td);
        gsap.set(td, { x: x - 4, y: y - 4, opacity: 0.4 });
        gsap.to(td, { opacity: 0, duration: 0.6, ease: "power2.out" });
      };

      // ── Mouse move ────────────────────────────────────────────────────────
      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        // Dot: instant
        gsap.set(dot, { x: clientX - 4, y: clientY - 4 });

        // Ring: quickTo lag
        ringX(clientX - ringSize / 2);
        ringY(clientY - ringSize / 2);

        // Trail
        spawnTrail(clientX, clientY);

        // Idle reset
        if (idleTimer) clearTimeout(idleTimer);
        if (isIdle) {
          isIdle = false;
          gsap.to(ring, {
            width: ringSize,
            height: ringSize,
            duration: 0.6,
            ease: "elastic.out(1, 0.4)",
            overwrite: "auto",
          });
        }
        idleTimer = setTimeout(() => {
          isIdle = true;
          gsap.to(ring, {
            width: 24,
            height: 24,
            duration: 0.4,
            ease: "power2.inOut",
            overwrite: "auto",
          });
        }, 3000);
      };

      // ── Link/button expand ────────────────────────────────────────────────
      const onEnterClickable = () => {
        ringSize = 60;
        gsap.to(ring, {
          width: 60,
          height: 60,
          x: "-=10",
          y: "-=10",
          mixBlendMode: "difference",
          borderColor: "#4ade80",
          duration: 0.25,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const onLeaveClickable = () => {
        ringSize = 40;
        gsap.to(ring, {
          width: 40,
          height: 40,
          mixBlendMode: "normal",
          borderColor: "rgba(5,150,105,0.7)",
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      // ── Magnetic snap ─────────────────────────────────────────────────────
      const onEnterMagnetic = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        gsap.to(dot, { x: centerX - 4, y: centerY - 4, duration: 0.2, ease: "power3.out", overwrite: "auto" });
        gsap.to(ring, { x: centerX - 20, y: centerY - 20, duration: 0.2, ease: "power3.out", overwrite: "auto" });
      };

      // ── Section-aware cursor text ─────────────────────────────────────────
      const onEnterCursorZone = (e: Event) => {
        const target = e.currentTarget as HTMLElement;
        const mode = target.dataset.cursor as string;

        if (mode === "view") {
          ringSize = 72;
          label.textContent = "VIEW";
          gsap.to(ring, {
            width: 72,
            height: 72,
            borderColor: "#4ade80",
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
        } else if (mode === "drag") {
          ringSize = 56;
          label.textContent = "←→";
          gsap.to(ring, {
            width: 56,
            height: 56,
            borderColor: "rgba(5,150,105,0.9)",
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
          });
          gsap.to(label, { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" });
        }
      };

      const onLeaveCursorZone = () => {
        ringSize = 40;
        gsap.to(ring, {
          width: 40,
          height: 40,
          borderColor: "rgba(5,150,105,0.7)",
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
        });
        gsap.to(label, {
          opacity: 0,
          scale: 0.6,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => { label.textContent = ""; },
        });
      };

      // ── Velocity stretch on scroll ────────────────────────────────────────
      const onScroll = () => {
        const now = Date.now();
        const dt = now - lastScrollTime;
        const velocity = dt > 0 ? Math.abs(window.scrollY - lastScrollY) / dt : 0;
        lastScrollY = window.scrollY;
        lastScrollTime = now;

        const stretch = 1 + Math.min(velocity * 2, 0.8);
        const squeeze = 1 / Math.sqrt(stretch);
        gsap.to(ring, {
          scaleY: stretch,
          scaleX: squeeze,
          duration: 0.1,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (scrollEndTimer) clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(() => {
          gsap.to(ring, {
            scaleY: 1,
            scaleX: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)",
          });
        }, 80);
      };

      // ── Attach listeners ──────────────────────────────────────────────────
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });

      const clickables = document.querySelectorAll<HTMLElement>("a, button, [role='button']");
      clickables.forEach((el) => {
        el.addEventListener("mouseenter", onEnterClickable);
        el.addEventListener("mouseleave", onLeaveClickable);
      });

      const magnetics = document.querySelectorAll<HTMLElement>("[data-magnetic]");
      magnetics.forEach((el) => {
        el.addEventListener("mouseenter", onEnterMagnetic);
      });

      const cursorZones = document.querySelectorAll<HTMLElement>("[data-cursor]");
      cursorZones.forEach((el) => {
        el.addEventListener("mouseenter", onEnterCursorZone);
        el.addEventListener("mouseleave", onLeaveCursorZone);
      });

      // ── Cleanup ───────────────────────────────────────────────────────────
      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("scroll", onScroll);
        if (idleTimer) clearTimeout(idleTimer);
        if (scrollEndTimer) clearTimeout(scrollEndTimer);
        clickables.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterClickable);
          el.removeEventListener("mouseleave", onLeaveClickable);
        });
        magnetics.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterMagnetic);
        });
        cursorZones.forEach((el) => {
          el.removeEventListener("mouseenter", onEnterCursorZone);
          el.removeEventListener("mouseleave", onLeaveCursorZone);
        });
      };
    });

    return () => {
      ctx.revert();
      document.documentElement.style.cursor = "";
      if (idleTimer) clearTimeout(idleTimer);
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
    };
  }, []);

  return (
    <>
      {/* Dot — 8px solid emerald, instant follow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#059669",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          boxShadow: "0 0 8px rgba(5,150,105,0.8)",
        }}
      />

      {/* Ring — 40px ring, lags behind dot, stretches on scroll */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: "1px solid rgba(5,150,105,0.7)",
          pointerEvents: "none",
          zIndex: 9998,
          willChange: "transform",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Section-aware label inside ring */}
        <span
          ref={labelRef}
          aria-hidden="true"
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#4ade80",
            fontFamily: "var(--font-syne), sans-serif",
            opacity: 0,
            transform: "scale(0.6)",
            userSelect: "none",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        />
      </div>

      {/* Trail dots — circular buffer of 8 */}
      {Array.from({ length: TRAIL_COUNT }).map((_, i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el; }}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#059669",
            pointerEvents: "none",
            zIndex: 9997,
            willChange: "transform, opacity",
            opacity: 0,
          }}
        />
      ))}

      {/* Mobile/coarse: hide all cursor elements */}
      <style>{`
        @media (pointer: coarse) {
          [data-cursor-dot], [data-cursor-ring] {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
