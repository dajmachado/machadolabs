"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/** Scroll suave global via Lenis, respeitando prefers-reduced-motion. */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.11, smoothWheel: true });
    window.__lenis = lenis;

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return children;
}

/** Navega suavemente até uma âncora usando o Lenis quando disponível. */
export function scrollToAnchor(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
  } else {
    (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}
