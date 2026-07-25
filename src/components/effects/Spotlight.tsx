"use client";

import { useEffect, useRef } from "react";

/** Luz difusa dourada que segue o mouse por todo o site (desktop). */
export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const el = ref.current!;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let cx = x;
    let cy = y;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    let raf = requestAnimationFrame(function loop() {
      cx += (x - cx) * 0.06;
      cy += (y - cy) * 0.06;
      el.style.background = `radial-gradient(560px circle at ${cx}px ${cy}px, rgba(212,175,55,0.055), transparent 65%)`;
      raf = requestAnimationFrame(loop);
    });

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-[1]" />;
}
