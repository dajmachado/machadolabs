"use client";

import { motion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { consent } from "@/content/pt";

/**
 * Banner de consentimento LGPD. Puramente apresentacional — quem decide
 * carregar (ou não) o analytics é o `Analytics`, que controla este componente.
 */
export default function CookieConsent({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <motion.div
      role="dialog"
      aria-live="polite"
      aria-label={consent.title}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-4 bottom-4 z-[88] mx-auto max-w-2xl md:inset-x-auto md:right-6 md:bottom-6 md:mx-0"
    >
      <div className="glass flex flex-col gap-4 rounded-2xl p-5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] md:flex-row md:items-center md:gap-6 md:p-6">
        <div className="flex items-start gap-3.5">
          <span
            aria-hidden
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-500/25 text-gold-400"
          >
            <ShieldCheck className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-mist-100">{consent.title}</p>
            <p className="mt-1 text-xs leading-relaxed text-mist-500">
              {consent.description}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 gap-2.5">
          <button
            type="button"
            onClick={onReject}
            className="flex-1 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-mist-300 transition-colors duration-300 hover:border-white/25 hover:text-mist-100 md:flex-none"
          >
            {consent.reject}
          </button>
          <button
            type="button"
            onClick={onAccept}
            className="flex-1 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 px-5 py-2.5 text-xs font-semibold text-ink-950 shadow-[0_6px_24px_-6px_rgba(212,175,55,0.5)] transition-transform duration-300 hover:scale-[1.03] md:flex-none"
          >
            {consent.accept}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
