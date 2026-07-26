"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/pt";
import Button from "@/components/ui/Button";
import Aurora from "@/components/effects/Aurora";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6500;
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Hero fullscreen com carrossel cinematográfico inspirado na OPPO:
 * troca de slides com blur + scale, títulos revelados palavra a palavra,
 * parallax de fundo reagindo ao mouse e indicadores de progresso.
 */
export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const parallaxRef = useRef<HTMLDivElement>(null);
  const slide = hero.slides[index];

  const next = useCallback(
    () => setIndex((i) => (i + 1) % hero.slides.length),
    [],
  );

  useEffect(() => {
    if (paused || reduced) return;
    const t = setInterval(next, SLIDE_MS);
    return () => clearInterval(t);
  }, [paused, reduced, next, index]);

  // Parallax sutil do fundo seguindo o mouse
  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    const el = parallaxRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const dx = (e.clientX / window.innerWidth - 0.5) * 26;
      const dy = (e.clientY / window.innerHeight - 0.5) * 18;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  const words = slide.title.split(" ");

  return (
    <section
      aria-label="Apresentação"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Fundo com parallax: aurora + imagem cinematográfica por slide */}
      <div ref={parallaxRef} className="absolute inset-[-4%] will-change-transform">
        <Aurora />
        <div aria-hidden className="absolute inset-0">
          {hero.slides.map((s, i) => {
            const image = (s as { image?: string }).image;
            if (!image) return null;
            return (
              <motion.div
                key={image}
                className="absolute inset-0"
                initial={false}
                animate={{
                  opacity: i === index ? 1 : 0,
                  scale: i === index ? 1 : 1.06,
                }}
                transition={{ duration: 1.3, ease: EASE }}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  quality={80}
                  className="object-cover object-[68%_center]"
                />
              </motion.div>
            );
          })}
          {/* gradientes para legibilidade do texto à esquerda */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/95 via-ink-950/60 to-ink-950/15" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-28 pt-32 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.985, filter: "blur(10px)" }}
            transition={{ duration: 0.55, ease: EASE }}
            className="max-w-3xl"
          >
            {/* Kicker */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
              className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.45em] text-gold-400"
            >
              <span aria-hidden className="h-px w-10 bg-gradient-to-r from-gold-500 to-transparent" />
              {slide.kicker}
            </motion.p>

            {/* Título com mask reveal palavra a palavra */}
            <h1
              aria-label={slide.title}
              className="mt-6 flex flex-wrap text-4xl font-semibold leading-[1.06] tracking-tight text-mist-100 sm:text-6xl md:text-7xl"
            >
              {words.map((word, i) => (
                <span key={`${index}-${i}`} className="overflow-hidden pb-[0.12em] -mb-[0.12em]">
                  <motion.span
                    aria-hidden
                    className={cn(
                      "inline-block will-change-transform",
                      i >= words.length - 2 && "text-gradient-gold",
                    )}
                    initial={reduced ? { opacity: 0 } : { y: "112%", rotate: 2.5 }}
                    animate={{ opacity: 1, y: "0%", rotate: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.06, ease: EASE }}
                  >
                    {word}
                  </motion.span>
                  {i < words.length - 1 && <span aria-hidden>&nbsp;</span>}
                </span>
              ))}
            </h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
              className="mt-7 max-w-xl text-base leading-relaxed text-mist-500 md:text-lg"
            >
              {slide.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href={slide.cta.href}>{slide.cta.label}</Button>
              <Button href="#servicos" variant="ghost" withArrow={false}>
                Ver serviços
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Indicadores de progresso */}
        <div
          role="tablist"
          aria-label="Slides"
          className="absolute bottom-12 left-5 right-5 z-20 flex max-w-sm gap-2.5 md:left-8"
        >
          {hero.slides.map((s, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Slide ${i + 1}: ${s.kicker}`}
              onClick={() => setIndex(i)}
              className="group flex-1 py-3"
            >
              <span className="block h-[2px] w-full overflow-hidden rounded-full bg-white/10 transition-colors group-hover:bg-white/20">
                {i === index ? (
                  <motion.span
                    key={`progress-${index}-${paused}`}
                    className="block h-full bg-gradient-to-r from-gold-600 to-gold-300"
                    initial={{ width: "0%" }}
                    animate={{ width: paused || reduced ? "100%" : ["0%", "100%"] }}
                    transition={
                      paused || reduced
                        ? { duration: 0.3 }
                        : { duration: SLIDE_MS / 1000, ease: "linear" }
                    }
                  />
                ) : (
                  <span className="block h-full w-0" />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Dica de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="absolute bottom-12 right-5 z-20 hidden items-center gap-3 md:right-8 md:flex"
          aria-hidden
        >
          <span className="text-[10px] uppercase tracking-[0.35em] text-mist-600">
            {hero.scrollHint}
          </span>
          <span className="relative h-10 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute left-0 top-0 h-4 w-px bg-gold-400"
              animate={{ y: [-16, 40] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </div>

      {/* Vinheta para profundidade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(6,6,7,0.85)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />
    </section>
  );
}
