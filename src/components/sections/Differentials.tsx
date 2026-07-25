"use client";

import {
  Cpu,
  Gem,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { differentials } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  Zap,
  TrendingUp,
  ShieldCheck,
  Gem,
  Cpu,
  Sparkles,
};

export default function Differentials() {
  return (
    <section id={differentials.id} className="relative py-24 md:py-36">
      {/* faixa de luz de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(212,175,55,0.05),transparent_70%)]"
      />
      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader
          kicker={differentials.kicker}
          title={differentials.title}
          highlight={["Machado", "Labs."]}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.items.map((item, i) => {
            const Icon = icons[item.icon] ?? Zap;
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.1} duration={0.7}>
                <TiltCard className="h-full p-8">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/25 text-gold-400">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-mist-100">
                      {item.title}
                    </h3>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-mist-500">
                    {item.description}
                  </p>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
