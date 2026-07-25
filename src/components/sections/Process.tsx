"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { process } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

/** Timeline vertical com linha de progresso ligada ao scroll. */
export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id={process.id} className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <SectionHeader
          kicker={process.kicker}
          title={process.title}
          highlight={["preciso,"]}
        />

        <div ref={ref} className="relative">
          {/* trilho + progresso */}
          <div
            aria-hidden
            className="absolute left-5 top-0 h-full w-px bg-white/8 md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 shadow-[0_0_12px_rgba(212,175,55,0.5)] md:left-1/2 md:-translate-x-1/2"
          />

          <ol className="space-y-14 md:space-y-24">
            {process.steps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li key={step.number} className="relative">
                  {/* nó da timeline */}
                  <span
                    aria-hidden
                    className="absolute left-5 top-1 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center md:left-1/2"
                  >
                    <span className="absolute h-3 w-3 rounded-full bg-gold-500/30 blur-[2px]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                  </span>

                  <Reveal
                    direction={left ? "right" : "left"}
                    className={cn(
                      "ml-12 md:ml-0 md:w-[calc(50%-3.5rem)]",
                      left ? "md:mr-auto md:text-right" : "md:ml-auto",
                    )}
                  >
                    <span className="text-5xl font-bold tracking-tighter text-white/[0.06] md:text-6xl">
                      {step.number}
                    </span>
                    <h3 className="-mt-4 text-xl font-semibold tracking-tight text-mist-100 md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-mist-500 md:text-base">
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
