"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: readonly string[];
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

export function Marquee({ items, className, speed = "normal" }: MarqueeProps) {
  const duration = speed === "slow" ? "40s" : speed === "fast" ? "18s" : "28s";
  const doubled = [...items, ...items];

  return (
    <div className={cn("overflow-hidden border-y border-on-primary/10 py-4", className)}>
      <div
        className="flex w-max gap-12 whitespace-nowrap"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono-label text-xs text-on-accent/50 sm:text-sm"
          >
            {item}
            <span className="mx-6 text-accent-sun" aria-hidden="true">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
