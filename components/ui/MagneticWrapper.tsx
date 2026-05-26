"use client";
import { useRef, useCallback } from "react";
import { gsap } from "gsap";
import type { CSSProperties } from "react";

interface MagneticWrapperProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}

export default function MagneticWrapper({
  children,
  strength = 0.3,
  className,
  style,
}: MagneticWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = e.clientX - centerX;
      const offsetY = e.clientY - centerY;

      gsap.to(el, {
        x: offsetX * strength,
        y: offsetY * strength,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = wrapperRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      data-magnetic
      className={className}
      style={{ display: "inline-block", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
