"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor customizado (desktop / pointer fine): ponto dourado + anel com lag.
 * O anel expande sobre elementos interativos.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.documentElement.classList.add("custom-cursor-active");

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let visible = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
      const t = e.target as HTMLElement;
      hovering = !!t.closest("a, button, [role='button'], input, textarea, [data-cursor]");
    };
    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    let raf = requestAnimationFrame(function loop() {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      const scale = hovering ? 2.1 : 1;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      raf = requestAnimationFrame(loop);
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden lg:block">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold-400 opacity-0 transition-opacity duration-300"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-gold-500/40 opacity-0 transition-[opacity] duration-300 will-change-transform"
        style={{ transitionProperty: "opacity" }}
      />
    </div>
  );
}
