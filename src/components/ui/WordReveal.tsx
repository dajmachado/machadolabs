"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Título revelado palavra por palavra com máscara (mask reveal),
 * no estilo dos hero sections da Apple/OPPO.
 */
export default function WordReveal({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
  highlight = [],
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  highlight?: string[];
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion.create(Tag);

  return (
    <MotionTag
      className={cn("flex flex-wrap", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isGold = highlight.some((h) =>
          word.toLowerCase().startsWith(h.toLowerCase()),
        );
        return (
          <span key={i} className="overflow-hidden pb-[0.12em] -mb-[0.12em]">
            <motion.span
              aria-hidden
              className={cn("inline-block will-change-transform", isGold && "text-gradient-gold")}
              variants={{
                hidden: reduced ? { opacity: 0 } : { y: "115%", rotate: 3 },
                visible: {
                  opacity: 1,
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && <span aria-hidden>&nbsp;</span>}
          </span>
        );
      })}
    </MotionTag>
  );
}
