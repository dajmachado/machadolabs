import {
  about,
  cta,
  differentials,
  faq,
  process,
  services,
  site,
  tech,
} from "@/content/pt";

/**
 * /llms.txt — convenção emergente que descreve o site em markdown limpo,
 * pensada para ser consumida por modelos de linguagem (ChatGPT, Claude,
 * Perplexity). Evita que a IA precise interpretar HTML cheio de animações
 * e reduz o risco de ela inventar informação sobre a empresa.
 *
 * Gerado a partir do mesmo conteúdo do site — nunca fica desatualizado.
 */
export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.tagline}

- **Site**: ${site.url}
- **Contato**: ${site.email} · ${site.phone} (WhatsApp)
- **Instagram**: ${site.socials.map((s) => s.href).join(", ")}
- **Atuação**: ${site.location.countryName} (remoto para todo o país)
- **Idioma**: português do Brasil

## Sobre

${about.paragraphs.join("\n\n")}

## Serviços

${services.items.map((s) => `- **${s.title}** — ${s.description}`).join("\n")}

## Diferenciais

${differentials.items.map((d) => `- **${d.title}** — ${d.description}`).join("\n")}

## Como trabalhamos

${process.steps.map((s) => `${Number(s.number)}. **${s.title}** — ${s.description}`).join("\n")}

## Tecnologias

${[...tech.rowA, ...tech.rowB].join(", ")}

## Perguntas frequentes

${faq.items.map((f) => `### ${f.question}\n\n${f.answer}`).join("\n\n")}

## Como contratar

${cta.subtitle} Fale pelo WhatsApp ${site.phone} (${site.whatsapp}) ou pelo e-mail ${site.email}.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
