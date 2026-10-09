"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { cn } from "@/lib/utils";

interface CounterProps {
  variant?: "hero" | "header";
  className?: string;
}

export function Counter({ variant = "hero", className }: CounterProps) {
  const { months, days, isPast, isLive } = useCountdown();

  if (variant === "header") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded border border-dashed border-accent-sun/60 px-3 py-1.5",
          className,
        )}
        aria-label="Contagem para o Dia D do Turismo em 8 de novembro de 2026"
      >
        <span className="font-mono-label text-[10px] text-on-primary/80">Dia D</span>
        <span className="font-countdown text-lg text-accent-sun">
          {isPast ? "AGORA!" : "08.11"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-lg border-2 border-dashed border-accent-sun bg-primary-deep/80 p-6 text-center backdrop-blur-sm",
        className,
      )}
      aria-live={isLive ? "polite" : undefined}
      aria-label="Contagem regressiva para o Dia D do Turismo"
    >
      <p className="font-mono-label mb-2 text-[11px] text-accent-sun">
        Em breve: Dia D do Turismo
      </p>
      {isPast ? (
        <p className="font-countdown text-5xl text-accent-sun sm:text-6xl">AGORA!</p>
      ) : (
        <>
          <p className="font-countdown text-5xl leading-none text-accent-sun sm:text-7xl">
            08.11
          </p>
          <div className="mt-4 flex gap-4">
            <div className="text-center">
              <span className="font-countdown block text-3xl text-on-primary">{months}</span>
              <span className="font-mono-label text-[9px] text-on-primary/70">meses</span>
            </div>
            <div className="text-center">
              <span className="font-countdown block text-3xl text-on-primary">{days}</span>
              <span className="font-mono-label text-[9px] text-on-primary/70">dias</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
