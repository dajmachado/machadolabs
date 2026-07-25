"use client";

import { cases } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

/** Mockup de dispositivo desenhado em CSS — sem imagens externas. */
function DeviceMockup({ device }: { device: string }) {
  const screen = (
    <div className="grid-lines relative h-full w-full overflow-hidden bg-ink-850">
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-500/15 blur-2xl"
      />
      {/* UI abstrata */}
      <div className="absolute inset-0 flex flex-col gap-2 p-4">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold-500/60" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        </div>
        <div className="mt-1 h-2 w-2/3 rounded-full bg-white/12" />
        <div className="h-2 w-1/2 rounded-full bg-white/8" />
        <div className="mt-auto grid grid-cols-3 gap-2">
          <div className="h-10 rounded-md bg-gradient-to-br from-gold-500/25 to-gold-700/10" />
          <div className="h-10 rounded-md bg-white/6" />
          <div className="h-10 rounded-md bg-white/6" />
        </div>
        <div className="flex h-14 items-end gap-1.5">
          {[38, 62, 45, 80, 55, 92, 70].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className="flex-1 rounded-sm bg-gradient-to-t from-gold-600/50 to-gold-300/60 transition-all duration-700 group-hover/card:from-gold-600/80 group-hover/card:to-gold-300"
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (device === "mobile") {
    return (
      <div className="mx-auto aspect-[9/17] w-32 overflow-hidden rounded-[1.6rem] border-[5px] border-ink-700 shadow-2xl transition-transform duration-700 group-hover/card:-translate-y-2 group-hover/card:rotate-1 sm:w-36">
        {screen}
      </div>
    );
  }
  if (device === "tablet") {
    return (
      <div className="mx-auto aspect-[4/3] w-56 overflow-hidden rounded-xl border-[6px] border-ink-700 shadow-2xl transition-transform duration-700 group-hover/card:-translate-y-2 group-hover/card:-rotate-1 sm:w-64">
        {screen}
      </div>
    );
  }
  return (
    <div className="mx-auto w-64 transition-transform duration-700 group-hover/card:-translate-y-2 sm:w-72">
      <div className="overflow-hidden rounded-t-lg border border-ink-700 shadow-2xl">
        <div className="flex items-center gap-1.5 border-b border-white/5 bg-ink-800 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-gold-500/50" />
        </div>
        <div className="aspect-[16/9]">{screen}</div>
      </div>
      <div className="mx-auto h-1.5 w-3/4 rounded-b-xl bg-ink-700" />
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

        <div className="grid gap-6 lg:grid-cols-3">
          {cases.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.12} duration={0.8}>
              <TiltCard tiltStrength={5} className="h-full overflow-hidden">
                <div className="flex h-full flex-col p-7">
                  <div className="noise relative flex h-64 items-center justify-center overflow-hidden rounded-xl bg-ink-900 py-6">
                    <DeviceMockup device={item.device} />
                  </div>
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
