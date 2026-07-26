import type { MetadataRoute } from "next";
import { site } from "@/content/pt";

/**
 * Crawlers de IA liberados explicitamente.
 *
 * `*` já permitiria todos, mas vários desses agentes só rastreiam quando
 * encontram uma regra nominal — e ser lido por eles é o que faz a Machado Labs
 * aparecer nas respostas do ChatGPT, Claude, Perplexity, Gemini e afins.
 */
const aiCrawlers = [
  "GPTBot", // OpenAI — base de conhecimento
  "OAI-SearchBot", // OpenAI — busca do ChatGPT
  "ChatGPT-User", // OpenAI — navegação a pedido do usuário
  "ClaudeBot", // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot", // Perplexity — índice
  "Perplexity-User",
  "Google-Extended", // Google Gemini
  "Applebot", // Siri / Spotlight
  "Applebot-Extended",
  "Amazonbot",
  "meta-externalagent", // Meta AI
  "FacebookBot",
  "CCBot", // Common Crawl — alimenta diversos modelos
  "cohere-ai",
  "MistralAI-User",
  "DuckAssistBot",
  "YouBot",
  "Bytespider",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
