"use client";

import { cta, site } from "@/content/pt";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import Magnetic from "@/components/ui/Magnetic";
import Aurora from "@/components/effects/Aurora";

export default function Cta() {
  return (
    <section id={cta.id} className="relative overflow-hidden py-28 md:py-44">
      <Aurora />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/[0.07]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/[0.1]"
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center md:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500" aria-hidden />
            {cta.kicker}
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-500" aria-hidden />
          </span>
        </Reveal>

        <WordReveal
          text={cta.title}
          highlight={["extraordinário?"]}
          delay={0.15}
          className="mt-6 justify-center text-4xl font-semibold leading-[1.08] tracking-tight text-mist-100 md:text-6xl"
        />

        <Reveal delay={0.35}>
          <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-mist-500 md:text-lg">
            {cta.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div className="mt-11 flex flex-col items-center gap-5">
            <Magnetic strength={0.35}>
              <Button href={`mailto:${site.email}`} className="px-10 py-4 text-base">
                {cta.button}
              </Button>
            </Magnetic>
            <p className="text-sm text-mist-600">
              {cta.secondary}{" "}
              <a
                href={`mailto:${site.email}`}
                className="text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
              >
                {site.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
