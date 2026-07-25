"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { about } from "@/content/pt";
import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id={about.id} ref={ref} className="relative py-24 md:py-36">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500" aria-hidden />
              {about.kicker}
            </span>
          </Reveal>
          <WordReveal
            text={about.title}
            highlight={["laboratório"]}
            delay={0.1}
            className="mt-5 text-3xl font-semibold leading-[1.12] tracking-tight text-mist-100 md:text-5xl"
          />
          <div className="mt-7 space-y-5">
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={0.2 + i * 0.12}>
                <p className="text-base leading-relaxed text-mist-500 md:text-lg">{p}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {about.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={0.3 + i * 0.1}>
                <div className="border-l border-gold-500/25 pl-4">
                  <p className="text-3xl font-semibold tracking-tight text-gradient-gold md:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-xs uppercase tracking-[0.18em] text-mist-600">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Composição visual com parallax */}
        <motion.div style={{ y: imageY }} className="relative hidden lg:block">
          <div className="glass-card noise relative mx-auto flex aspect-[4/5] max-w-md items-center justify-center overflow-hidden rounded-3xl">
            <div className="grid-lines absolute inset-0" aria-hidden />
            <div
              aria-hidden
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-[90px]"
            />
            <div
              aria-hidden
              className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-gold-300/[0.07] blur-[80px]"
            />
            <Image
              src="/brand/logo-full.png"
              alt="Logotipo Machado Labs"
              width={340}
              height={260}
              className="relative w-2/3 object-contain drop-shadow-[0_12px_48px_rgba(212,175,55,0.25)]"
            />
            {/* linha de varredura */}
            <motion.div
              aria-hidden
              className="absolute inset-x-8 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent"
              animate={{ top: ["18%", "82%", "18%"] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
