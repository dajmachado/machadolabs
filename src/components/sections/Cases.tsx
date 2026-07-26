"use client";

import Image from "next/image";
import { cases } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

/** Moldura de navegador que emoldura o print real do projeto. */
function BrowserFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]">
      <div className="flex items-center gap-2 border-b border-white/5 bg-ink-800/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-gold-500/50" aria-hidden />
        <span
          aria-hidden
          className="ml-3 h-4 flex-1 rounded-full bg-white/[0.04]"
        />
      </div>
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 40vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.04]"
        />
      </div>
    </div>
  );
}

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

        <div className="grid gap-6 md:grid-cols-2">
          {cases.items.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 0.12} duration={0.8}>
              <TiltCard tiltStrength={4} className="h-full">
                <div className="flex h-full flex-col p-5 md:p-7">
                  <BrowserFrame src={item.image} alt={item.alt} />

                  <span className="mt-6 w-fit rounded-full border border-gold-500/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">
                    {item.tag}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-mist-100">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-mist-500">
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
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
