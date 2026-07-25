"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 36 },
  down: { x: 0, y: -36 },
  left: { x: 36, y: 0 },
  right: { x: -36, y: 0 },
  none: { x: 0, y: 0 },
};

/** Revela conteúdo ao entrar na viewport, com blur + fade + deslocamento. */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}) {
  const reduced = useReducedMotion();
  const { x, y } = offsets[direction];

  const variants: Variants = {
    hidden: reduced
      ? { opacity: 0 }
      : { opacity: 0, x, y, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
