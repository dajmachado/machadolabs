"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsent from "@/components/ui/CookieConsent";

const STORAGE_KEY = "ml-consent";
type Decision = "granted" | "denied";

/**
 * Orquestra o consentimento (LGPD) e o carregamento do Google Analytics.
 *
 * Enquanto o visitante não aceitar, **nenhum** script do Google é baixado —
 * a abordagem é "opt-in", não "carregar e depois desligar". A decisão fica
 * em localStorage, então o banner não reaparece a cada visita.
 */
export default function Analytics({ gaId }: { gaId?: string }) {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [asking, setAsking] = useState(false);

  useEffect(() => {
    if (!gaId) return;
    const saved = window.localStorage.getItem(STORAGE_KEY) as Decision | null;
    if (saved === "granted" || saved === "denied") {
      setDecision(saved);
      return;
    }
    // espera o preloader sair antes de interromper o visitante
    const t = setTimeout(() => setAsking(true), 3600);
    return () => clearTimeout(t);
  }, [gaId]);

  const decide = (value: Decision) => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setDecision(value);
    setAsking(false);
  };

  if (!gaId) return null;

  return (
    <>
      {decision === "granted" && <GoogleAnalytics gaId={gaId} />}
      <AnimatePresence>
        {asking && (
          <CookieConsent
            key="consent"
            onAccept={() => decide("granted")}
            onReject={() => decide("denied")}
          />
        )}
      </AnimatePresence>
    </>
  );
}
