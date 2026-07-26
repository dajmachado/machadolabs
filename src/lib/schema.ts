/**
 * Dados estruturados (JSON-LD / schema.org).
 *
 * São a principal fonte que buscadores e modelos de linguagem usam para
 * entender *o que* é a Machado Labs, *o que* ela vende e *como* contratá-la.
 * Os `@id` conectam os nós entre si, formando um grafo de entidade único —
 * é isso que permite ao Google e às IAs tratarem tudo como a mesma empresa.
 */

import { faq, services, site } from "@/content/pt";

const ORG_ID = `${site.url}/#organization`;
const SITE_ID = `${site.url}/#website`;
const PAGE_ID = `${site.url}/#webpage`;

/** Endereço só é emitido quando a cidade estiver preenchida em `site.location`. */
function address() {
  const { city, state, stateCode, country } = site.location;
  return {
    "@type": "PostalAddress",
    ...(city ? { addressLocality: city } : {}),
    addressRegion: stateCode || state,
    addressCountry: country,
  };
}

const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": ORG_ID,
  name: site.name,
  legalName: site.legalName,
  alternateName: ["MachadoLabs", "Machado Labs Tecnologia"],
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/brand/logo-mark.png`,
    caption: site.name,
  },
  image: `${site.url}/og.jpg`,
  description: site.tagline,
  slogan: "Transformamos ideias em soluções digitais.",
  foundingDate: site.foundingYear,
  email: site.email,
  telephone: site.phoneE164,
  address: address(),
  areaServed: [
    { "@type": "Country", name: site.location.countryName },
    { "@type": "State", name: site.location.state },
  ],
  knowsAbout: [
    "Desenvolvimento de software sob medida",
    "Inteligência artificial aplicada a negócios",
    "Automação de processos empresariais",
    "Desenvolvimento de sistemas web",
    "Desenvolvimento de aplicativos mobile",
    "ERP e CRM personalizados",
    "UX/UI Design",
    "Infraestrutura em nuvem",
    "Next.js",
    "React",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "AWS",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    telephone: site.phoneE164,
    email: site.email,
    availableLanguage: ["Portuguese", "pt-BR"],
    areaServed: site.location.country,
  },
  sameAs: site.socials.map((s) => s.href),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Serviços de tecnologia",
    itemListElement: services.items.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        provider: { "@id": ORG_ID },
        areaServed: site.location.countryName,
      },
    })),
  },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": ORG_ID },
  inLanguage: "pt-BR",
};

const webPage = {
  "@type": "WebPage",
  "@id": PAGE_ID,
  url: site.url,
  name: site.title,
  description: site.description,
  isPartOf: { "@id": SITE_ID },
  about: { "@id": ORG_ID },
  primaryImageOfPage: `${site.url}/og.jpg`,
  inLanguage: "pt-BR",
};

/**
 * FAQPage: alimenta os resultados expandidos do Google e é uma das fontes
 * mais citadas por assistentes de IA ao responderem sobre a empresa.
 */
const faqPage = {
  "@type": "FAQPage",
  "@id": `${site.url}/#faq`,
  isPartOf: { "@id": PAGE_ID },
  mainEntity: faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

/** Grafo completo emitido num único bloco <script type="application/ld+json">. */
export const jsonLdGraph = {
  "@context": "https://schema.org",
  "@graph": [organization, website, webPage, faqPage],
};
