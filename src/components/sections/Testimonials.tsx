"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote } from "lucide-react";
import { testimonials } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id={testimonials.id} className="relative py-24 md:py-36">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader
          kicker={testimonials.kicker}
          title={testimonials.title}
          highlight={["recomenda."]}
        />

        <Reveal>
          <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carrossel">
            <div className="flex">
              {testimonials.items.map((item, i) => (
                <div
                  key={item.name}
                  className="min-w-0 flex-[0_0_92%] px-2.5 sm:flex-[0_0_70%] lg:flex-[0_0_46%]"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${testimonials.items.length}`}
                >
                  <figure
                    className={cn(
                      "glass-card relative h-full rounded-2xl p-8 transition-all duration-700 md:p-10",
                      selected === i
                        ? "opacity-100 shadow-[0_24px_72px_-32px_rgba(212,175,55,0.25)]"
                        : "opacity-40 scale-[0.97]",
                    )}
                  >
                    <Quote aria-hidden className="h-8 w-8 text-gold-500/50" />
                    <blockquote className="mt-5 text-lg leading-relaxed text-mist-100 md:text-xl">
                      “{item.quote}”
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-4">
                      <span
                        aria-hidden
                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-500/30 to-gold-700/20 text-sm font-semibold text-gold-200"
                      >
                        {item.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-mist-100">{item.name}</p>
                        <p className="text-xs text-mist-500">{item.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Dots */}
        <div className="mt-9 flex justify-center gap-2.5" role="tablist" aria-label="Depoimentos">
          {testimonials.items.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={selected === i}
              aria-label={`Depoimento ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                selected === i ? "w-8 bg-gold-500" : "w-1.5 bg-white/15 hover:bg-white/30",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
