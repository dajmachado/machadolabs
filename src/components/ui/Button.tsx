"use client";

import { type ComponentProps } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { scrollToAnchor } from "@/components/providers/SmoothScroll";

type Variant = "gold" | "ghost";

/**
 * Botão da marca. `gold` = CTA principal com brilho; `ghost` = secundário em vidro.
 * Âncoras internas rolam suavemente via Lenis.
 */
export default function Button({
  variant = "gold",
  href,
  className,
  children,
  withArrow = true,
  ...rest
}: {
  variant?: Variant;
  href: string;
  withArrow?: boolean;
} & ComponentProps<"a">) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.035] active:scale-[0.98]";

  const styles: Record<Variant, string> = {
    gold: "bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 text-ink-950 shadow-[0_8px_32px_-8px_rgba(212,175,55,0.55)] hover:shadow-[0_10px_44px_-6px_rgba(212,175,55,0.7)]",
    ghost:
      "glass text-mist-100 hover:border-gold-500/40 hover:text-gold-200 transition-colors",
  };

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToAnchor(href);
    }
  };

  const external = href.startsWith("http");

  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(base, styles[variant], className)}
      {...rest}
    >
      {/* brilho que atravessa o botão no hover */}
      {variant === "gold" && (
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
      )}
      <span className="relative">{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden
          className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </a>
  );
}
