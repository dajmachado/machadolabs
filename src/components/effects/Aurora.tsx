import { cn } from "@/lib/utils";

/**
 * Fundo vivo: orbes de gradiente dourado em movimento lento + grade + ruído.
 * 100% CSS — custo de performance próximo de zero.
 */
export default function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("noise absolute inset-0 overflow-hidden", className)}>
      <div className="grid-lines absolute inset-0" />
      <div className="absolute -left-[20%] -top-[30%] h-[70vh] w-[70vh] rounded-full bg-gold-500/[0.07] blur-[120px] animate-aurora" />
      <div
        className="absolute -right-[15%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-gold-300/[0.05] blur-[140px] animate-aurora"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="absolute bottom-[-25%] left-[30%] h-[55vh] w-[55vh] rounded-full bg-gold-600/[0.06] blur-[130px] animate-aurora"
        style={{ animationDelay: "-12s", animationDuration: "26s" }}
      />
    </div>
  );
}
