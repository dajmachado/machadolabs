"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsent from "@/components/ui/CookieConsent";

const STORAGE_KEY = "ml-consent";
type Decision = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Registra os cliques que levam o visitante para fora do site (WhatsApp e
 * e-mail). Sem isso o Analytics vê a visita mas nunca sabe que ela virou
 * contato — e o Google Ads não consegue otimizar por conversão.
 *
 * Usa `generate_lead`, o nome de evento que o GA4 reconhece e que pode ser
 * importado como conversão no Google Ads.
 */
function useLeadTracking(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest?.("a");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const method = href.includes("wa.me")
        ? "whatsapp"
        : href.startsWith("mailto:")
          ? "email"
          : null;
      if (!method) return;

      // de qual parte da página partiu o clique — mostra o que converte
      const secao = link.closest("section")?.id;
      const origem =
        secao ||
        (link.closest("footer")
          ? "rodape"
          : link.closest("header")
            ? "menu"
            : "outro");

      window.gtag?.("event", "generate_lead", {
        method,
        origem,
        link_text: link.textContent?.trim().slice(0, 60) || method,
      });
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [active]);
}

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

  // só mede contatos depois do aceite — o gtag nem existe antes disso
  useLeadTracking(decision === "granted");

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
