import { useCallback, useRef } from "react";

const HEBREW_CHARS = "אבגדהוזחטיכלמנסעפצקרשתםןץףך";

export function useTextScramble(originalText: string) {
  const frameRef = useRef<number>(0);
  const iterRef = useRef(0);

  const scramble = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const len = originalText.length;
    iterRef.current = 0;
    cancelAnimationFrame(frameRef.current);

    const animate = () => {
      iterRef.current += 0.5;
      el.textContent = originalText
        .split("")
        .map((char, i) => {
          if (i < iterRef.current) return char;
          if (char === " ") return " ";
          return HEBREW_CHARS[Math.floor(Math.random() * HEBREW_CHARS.length)];
        })
        .join("");
      if (iterRef.current < len) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        el.textContent = originalText;
      }
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [originalText]);

  return scramble;
}
