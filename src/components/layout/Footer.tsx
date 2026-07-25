"use client";

import Image from "next/image";
import { ArrowUp } from "lucide-react";
import { footer, nav, site } from "@/content/pt";
import { scrollToAnchor } from "@/components/providers/SmoothScroll";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/5 bg-ink-900/60">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_auto]">
            <div>
              <Image
                src="/brand/logo-full.png"
                alt="Machado Labs"
                width={150}
                height={110}
                className="h-24 w-auto object-contain"
              />
              <p className="mt-5 max-w-xs text-sm leading-relaxed text-mist-500">
                {footer.tagline}
              </p>
            </div>

            {footer.sections.map((section) => (
              <nav key={section.title} aria-label={section.title}>
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500">
                  {section.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToAnchor(link.href);
                        }}
                        className="text-sm text-mist-500 transition-colors duration-300 hover:text-gold-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.35em] text-gold-500">
                Contato
              </h3>
              <ul className="mt-5 space-y-3 text-sm text-mist-500">
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="transition-colors duration-300 hover:text-gold-300"
                  >
                    {site.email}
                  </a>
                </li>
                {site.socials.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-gold-300"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-mist-600">
            © {year} {site.name}. {footer.rights}
          </p>
          <Magnetic>
            <button
              type="button"
              aria-label="Voltar ao topo"
              onClick={() =>
                window.__lenis
                  ? window.__lenis.scrollTo(0, { duration: 1.6 })
                  : window.scrollTo({ top: 0, behavior: "smooth" })
              }
              className="glass flex h-11 w-11 items-center justify-center rounded-full text-mist-300 transition-colors duration-300 hover:border-gold-500/40 hover:text-gold-300"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
