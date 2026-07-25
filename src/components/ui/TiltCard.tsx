"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Card de vidro com tilt 3D + borda iluminada que segue o mouse.
 * Usado em serviços, cases e diferenciais.
 */
export default function TiltCard({
  children,
  className,
  tiltStrength = 7,
}: {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 160, damping: 20 });
  const sy = useSpring(py, { stiffness: 160, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [tiltStrength, -tiltStrength]);
  const rotateY = useTransform(sx, [0, 1], [-tiltStrength, tiltStrength]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    ref.current?.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    ref.current?.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={cn(
        "group/card glass-card relative rounded-2xl transition-shadow duration-500",
        "hover:shadow-[0_24px_64px_-24px_rgba(212,175,55,0.18)]",
        className,
      )}
    >
      {/* borda que acende sob o mouse */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(212,175,55,0.12), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "linear-gradient(transparent, transparent) padding-box, radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), rgba(212,175,55,0.5), transparent 65%) border-box",
          borderWidth: 1,
        }}
      />
      <div style={{ transform: "translateZ(24px)" }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
