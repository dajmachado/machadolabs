"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { faq } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id={faq.id} className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <SectionHeader kicker={faq.kicker} title={faq.title} highlight={["frequentes."]} />

        <div className="space-y-3">
          {faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <Reveal key={i} delay={i * 0.06} duration={0.6}>
                <div
                  className={cn(
                    "glass-card overflow-hidden rounded-xl transition-colors duration-500",
                    open && "border-gold-500/25",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-base font-medium text-mist-100 md:text-lg">
                      {item.question}
                    </span>
                    <motion.span
                      aria-hidden
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                        open
                          ? "border-gold-500/50 text-gold-400"
                          : "border-white/10 text-mist-500",
                      )}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="content"
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-mist-500 md:text-base">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
