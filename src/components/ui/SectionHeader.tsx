import Reveal from "@/components/ui/Reveal";
import WordReveal from "@/components/ui/WordReveal";
import { cn } from "@/lib/utils";

/** Cabeçalho padrão de seção: kicker dourado + título com reveal por palavra. */
export default function SectionHeader({
  kicker,
  title,
  subtitle,
  align = "center",
  highlight = [],
}: {
  kicker: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  highlight?: string[];
}) {
  const centered = align === "center";
  return (
    <div className={cn("mb-14 md:mb-20", centered && "text-center")}>
      <Reveal direction="up" duration={0.7}>
        <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.42em] text-gold-400">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-gold-500" aria-hidden />
          {kicker}
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-gold-500" aria-hidden />
        </span>
      </Reveal>
      <WordReveal
        text={title}
        highlight={highlight}
        delay={0.1}
        className={cn(
          "mt-5 text-3xl font-semibold leading-[1.12] tracking-tight text-mist-100 md:text-5xl",
          centered && "justify-center",
        )}
      />
      {subtitle && (
        <Reveal delay={0.25}>
          <p
            className={cn(
              "mt-5 max-w-xl text-base leading-relaxed text-mist-500 md:text-lg",
              centered && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
