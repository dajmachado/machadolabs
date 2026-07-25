"use client";

import {
  AppWindow,
  Boxes,
  BrainCircuit,
  CloudCog,
  Compass,
  Globe,
  PenTool,
  Rocket,
  Smartphone,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { services } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import TiltCard from "@/components/ui/TiltCard";
import Reveal from "@/components/ui/Reveal";

const icons: Record<string, LucideIcon> = {
  Globe,
  Rocket,
  AppWindow,
  Boxes,
  Users,
  Smartphone,
  BrainCircuit,
  Workflow,
  Compass,
  PenTool,
  CloudCog,
};

export default function Services() {
  return (
    <section id={services.id} className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader
          kicker={services.kicker}
          title={services.title}
          subtitle={services.subtitle}
          highlight={["dominar", "digital."]}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.items.map((service, i) => {
            const Icon = icons[service.icon] ?? Globe;
            return (
              <Reveal key={service.title} delay={(i % 4) * 0.08} duration={0.7}>
                <TiltCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/20 bg-gold-500/[0.06] text-gold-400 transition-all duration-500 group-hover/card:border-gold-500/50 group-hover/card:bg-gold-500/10 group-hover/card:shadow-[0_0_24px_-4px_rgba(212,175,55,0.4)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-mist-100">
                    {service.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-mist-500">
                    {service.description}
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
