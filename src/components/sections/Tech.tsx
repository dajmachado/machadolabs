import { tech } from "@/content/pt";
import SectionHeader from "@/components/ui/SectionHeader";

function MarqueeRow({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  // 4 cópias garantem trilha longa o suficiente para o loop não expor vãos
  // mesmo em telas largas (o deslocamento de -50% continua perfeitamente cíclico)
  const doubled = [...items, ...items, ...items, ...items];
  return (
    <div
      className="flex overflow-hidden"
      style={{
        maskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
        WebkitMaskImage: "linear-gradient(90deg, transparent, black 12%, black 88%, transparent)",
      }}
    >
      <div
        className={
          reverse
            ? "flex shrink-0 gap-4 pr-4 animate-marquee-reverse"
            : "flex shrink-0 gap-4 pr-4 animate-marquee"
        }
      >
        {doubled.map((name, i) => (
          <span
            key={`${name}-${i}`}
            aria-hidden={i >= items.length}
            className="glass-card flex items-center gap-3 whitespace-nowrap rounded-full px-7 py-3.5 text-sm font-medium tracking-wide text-mist-300 transition-colors duration-300 hover:text-gold-300"
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-gold-500/70" />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Marquee infinito de tecnologias — duas faixas em direções opostas. */
export default function Tech() {
  return (
    <section id={tech.id} className="relative py-24 md:py-32">
      <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
        <SectionHeader kicker={tech.kicker} title={tech.title} highlight={["dominamos."]} />
      </div>
      {/* limita a faixa à mesma largura do restante do layout em telas grandes */}
      <div className="mx-auto w-full max-w-7xl space-y-4">
        <MarqueeRow items={tech.rowA} />
        <MarqueeRow items={tech.rowB} reverse />
      </div>
    </section>
  );
}
