"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

/**
 * Tela de carregamento premium: logo + varredura dourada,
 * seguida de saída cinematográfica revelando o Hero.
 */
export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setDone(true), reduced ? 150 : 2100);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
          aria-label="Carregando"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image
              src="/brand/logo-mark.png"
              alt="Machado Labs"
              width={96}
              height={96}
              priority
              className="h-20 w-20 object-contain md:h-24 md:w-24"
            />
          </motion.div>

          <motion.p
            className="mt-6 text-[11px] font-medium uppercase tracking-[0.5em] text-mist-500"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Machado <span className="text-gold-400">Labs</span>
          </motion.p>

          <div className="mt-8 h-px w-40 overflow-hidden bg-ink-700">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-600 via-gold-300 to-gold-600"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
