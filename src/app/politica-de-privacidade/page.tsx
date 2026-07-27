import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { privacy, site } from "@/content/pt";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Aurora from "@/components/effects/Aurora";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: privacy.title,
  description:
    "Como a Machado Labs trata dados neste site: o que é coletado, por quê, e como revogar seu consentimento. Em conformidade com a LGPD.",
  alternates: { canonical: `/${privacy.slug}` },
  openGraph: {
    title: `${privacy.title} | ${site.name}`,
    description: "Transparência sobre dados, cookies e seus direitos sob a LGPD.",
    url: `${site.url}/${privacy.slug}`,
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden">
        <Aurora className="opacity-60" />

        <div className="relative mx-auto w-full max-w-3xl px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
          <Reveal>
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-sm text-mist-500 transition-colors hover:text-gold-300"
            >
              <ArrowLeft
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Voltar ao início
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-8 text-4xl font-semibold leading-tight tracking-tight text-mist-100 md:text-5xl">
              {privacy.title}
            </h1>
            <p className="mt-3 text-xs uppercase tracking-[0.3em] text-gold-500">
              Última atualização: {privacy.updatedAt}
            </p>
            <p className="mt-7 text-base leading-relaxed text-mist-400 md:text-lg">
              {privacy.intro}
            </p>
          </Reveal>

          <div className="mt-14 space-y-12">
            {privacy.sections.map((section, i) => (
              <Reveal key={section.title} delay={0.05 + i * 0.03} duration={0.7}>
                <section>
                  <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight text-mist-100 md:text-2xl">
                    <span
                      aria-hidden
                      className="text-xs font-medium tabular-nums text-gold-500"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-3.5 border-l border-gold-500/15 pl-5">
                    {section.body.map((paragraph, j) => (
                      <p
                        key={j}
                        className="text-sm leading-relaxed text-mist-500 md:text-base"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="glass-card mt-16 rounded-2xl p-7 text-center">
              <p className="text-sm text-mist-400">
                Dúvidas sobre esta política ou sobre seus dados?
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-base font-semibold text-gold-400 underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
              >
                {site.email}
              </a>
            </div>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
