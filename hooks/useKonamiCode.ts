import { useEffect } from "react";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export function useKonamiCode(onSuccess: () => void) {
  useEffect(() => {
    let index = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index]) {
        index++;
        if (index === KONAMI.length) {
          index = 0;
          onSuccess();
        }
      } else {
        index = e.key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSuccess]);
}
