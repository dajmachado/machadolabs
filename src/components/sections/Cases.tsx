"use client";

import { cases } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import CaseGallery from "@/components/ui/CaseGallery";
import Reveal from "@/components/ui/Reveal";

export default function Cases() {
  return (
    <section id={cases.id} className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader
          kicker={cases.kicker}
          title={cases.title}
          subtitle={cases.subtitle}
          highlight={["falam"]}
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {cases.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.14} duration={0.85}>
              <article className="glass-card flex h-full flex-col rounded-2xl p-5 transition-shadow duration-500 hover:shadow-[0_24px_64px_-24px_rgba(212,175,55,0.18)] md:p-7">
                <CaseGallery items={item.gallery} />

                <span className="mt-7 w-fit rounded-full border border-gold-500/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                  {item.tag}
                </span>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-mist-100">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-500 md:text-base">
                  {item.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {item.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-full bg-white/[0.045] px-3.5 py-1.5 text-xs font-medium text-mist-300"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
