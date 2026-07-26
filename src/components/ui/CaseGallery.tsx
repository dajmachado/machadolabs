"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type GalleryItem = {
  readonly src: string;
  readonly caption: string;
  readonly alt: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Galeria de prints de um projeto: troca com crossfade cinematográfico,
 * navegação por setas, teclado e miniaturas, e ampliação em tela cheia.
 */
export default function CaseGallery({ items }: { items: readonly GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const total = items.length;

  const go = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  // setas do teclado funcionam com a galeria (ou o zoom) em foco
  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, go]);

  const current = items[index];

  return (
    <div className="group/gal">
      {/* Moldura de navegador */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-900 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.9)]">
        <div className="flex items-center gap-2 border-b border-white/5 bg-ink-800/80 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-gold-500/50" aria-hidden />
          <span aria-hidden className="ml-3 h-4 flex-1 rounded-full bg-white/[0.04]" />
          <span className="text-[10px] font-medium tabular-nums tracking-widest text-mist-600">
            {String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="relative aspect-[16/10] overflow-hidden">
          <AnimatePresence mode="sync">
            <motion.div
              key={current.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 92vw, 46vw"
                className="object-cover object-top"
              />
            </motion.div>
          </AnimatePresence>

          {/* Ampliar */}
          <button
            type="button"
            onClick={() => setZoom(true)}
            aria-label={`Ampliar imagem: ${current.caption}`}
            /* sempre visível no toque (sem hover); no desktop aparece ao passar o mouse */
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/70 text-mist-300 backdrop-blur transition-all duration-300 hover:text-gold-300 focus-visible:opacity-100 lg:opacity-0 lg:group-hover/gal:opacity-100"
          >
            <Expand className="h-4 w-4" aria-hidden />
          </button>

          {/* Setas */}
          {total > 1 && (
            <>
              <NavButton side="left" onClick={() => go(-1)} label="Imagem anterior" />
              <NavButton side="right" onClick={() => go(1)} label="Próxima imagem" />
            </>
          )}
        </div>
      </div>

      {/* Legenda + miniaturas */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <p aria-live="polite" className="min-h-[2.5em] flex-1 text-sm text-mist-500">
          {current.caption}
        </p>
        <div className="flex shrink-0 gap-1.5" role="tablist" aria-label="Imagens do projeto">
          {items.map((item, i) => (
            <button
              key={item.src}
              role="tab"
              aria-selected={i === index}
              aria-label={item.caption}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-500",
                i === index ? "w-7 bg-gold-500" : "w-1.5 bg-white/15 hover:bg-white/35",
              )}
            />
          ))}
        </div>
      </div>

      {zoom && (
        <Lightbox
          item={current}
          index={index}
          total={total}
          onClose={() => setZoom(false)}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      )}
    </div>
  );
}

function NavButton({
  side,
  onClick,
  label,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
}) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        // sempre visível no toque; no desktop surge com o hover
        "absolute top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-ink-950/70 text-mist-200 backdrop-blur transition-all duration-300 hover:bg-ink-950/90 hover:text-gold-300 focus-visible:opacity-100 lg:opacity-0 lg:group-hover/gal:opacity-100",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}

/** Visualização em tela cheia — os prints têm texto pequeno demais no card. */
function Lightbox({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryItem;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-[95] flex flex-col items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-colors hover:text-gold-300"
      >
        <X className="h-5 w-5" aria-hidden />
      </button>

      <div
        className="relative w-full max-w-6xl overflow-hidden rounded-xl border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={1280}
          height={800}
          className="h-auto w-full"
        />
      </div>

      <div
        className="mt-5 flex items-center gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onPrev}
          aria-label="Imagem anterior"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-colors hover:text-gold-300"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>
        <p className="text-center text-sm text-mist-400">
          <span className="tabular-nums text-mist-600">
            {index + 1}/{total}
          </span>{" "}
          · {item.caption}
        </p>
        <button
          type="button"
          onClick={onNext}
          aria-label="Próxima imagem"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-mist-300 transition-colors hover:text-gold-300"
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>
    </motion.div>,
    document.body,
  );
}
