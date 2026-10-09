"use client";

import { cn, scrollToSection } from "@/lib/utils";

interface SectionNextProps {
  copy: string;
  label: string;
  target: string;
  tone?: "light" | "dark";
}

export function SectionNext({ copy, label, target, tone = "light" }: SectionNextProps) {
  const dark = tone === "dark";

  return (
    <div className="mt-14 flex flex-col gap-5 border-t border-current/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
      <p
        className={cn(
          "max-w-xl font-display text-xl italic leading-snug sm:text-2xl",
          dark ? "text-on-accent" : "text-primary",
        )}
      >
        {copy}
      </p>
      <button
        type="button"
        onClick={() => scrollToSection(target)}
        className={cn(
          "group inline-flex min-h-12 shrink-0 items-center gap-2 rounded-sm px-6 py-3 font-body text-xs font-bold uppercase tracking-[0.14em] transition-transform hover:scale-[1.02] active:scale-[0.98]",
          dark
            ? "bg-accent-sun text-brown-deep"
            : "bg-brown text-on-accent shadow-[0_8px_24px_-8px_rgba(107,61,46,0.45)]",
        )}
      >
        {label}
        <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </button>
    </div>
  );
}
