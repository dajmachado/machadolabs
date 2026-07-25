"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { nav, site } from "@/content/pt";
import { scrollToAnchor } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/ui/Magnetic";
import Button from "@/components/ui/Button";

/**
 * Navbar fixa: transparente no topo, vidro translúcido após o scroll.
 * Menu mobile fullscreen com hambúrguer animado feito à mão.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);
    // aguarda o overlay fechar antes de rolar
    setTimeout(() => scrollToAnchor(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 transition-all duration-500",
          open ? "z-[86]" : "z-[80]",
          scrolled && !open
            ? "glass py-3 shadow-[0_8px_40px_-16px_rgba(0,0,0,0.7)]"
            : "bg-transparent py-5",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 md:px-8">
          <a
            href="#"
            aria-label="Machado Labs — início"
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group flex items-center gap-3"
          >
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={38}
              height={38}
              priority
              className="h-9 w-9 object-contain transition-transform duration-500 group-hover:rotate-[360deg]"
            />
            <span className="hidden text-sm font-semibold tracking-[0.28em] text-mist-100 sm:block">
              MACHADO<span className="text-gold-400">LABS</span>
            </span>
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="group relative text-sm font-medium text-mist-300 transition-colors duration-300 hover:text-mist-100"
              >
                {link.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-400 group-hover:w-full"
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Magnetic>
              <Button href={site.whatsapp} className="px-6 py-2.5 text-[13px]">
                {nav.cta}
              </Button>
            </Magnetic>
          </div>

          {/* Hambúrguer artesanal */}
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative z-[86] flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <span className="relative block h-3.5 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-full bg-mist-100 transition-all duration-400",
                  open && "top-1/2 -translate-y-1/2 rotate-45 bg-gold-400",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-4 bg-mist-100 transition-all duration-400",
                  open ? "bottom-1/2 w-full translate-y-1/2 -rotate-45 bg-gold-400" : "group-hover:w-full",
                )}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Menu mobile fullscreen */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="noise fixed inset-0 z-[85] flex flex-col justify-between bg-ink-950 px-6 pb-10 pt-28 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Menu mobile" className="flex flex-col gap-2">
              {nav.links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => go(e, link.href)}
                  className="flex items-baseline gap-4 border-b border-white/5 py-4 text-3xl font-semibold tracking-tight text-mist-100"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="text-xs font-medium text-gold-500">0{i + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <Button href={site.whatsapp} onClick={() => setOpen(false)} className="w-full">
                {nav.cta}
              </Button>
              <p className="text-center text-xs tracking-[0.3em] text-mist-600">
                MACHADO <span className="text-gold-500">LABS</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
