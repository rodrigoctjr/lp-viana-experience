"use client";

import { Marquee } from "@/components/ui/Marquee";
import { AnimatedStat } from "@/components/ui/RichCard";
import { MARQUEE_ITEMS, STATS } from "@/lib/constants";

export function StatsStrip() {
  return (
    <div className="relative z-20 bg-brown">
      <div className="container-site grid grid-cols-2 gap-8 py-16 sm:grid-cols-4 sm:py-20">
        {STATS.map((stat) => (
          <AnimatedStat key={stat.label} {...stat} />
        ))}
      </div>
      <Marquee items={MARQUEE_ITEMS} className="border-ochre/20" />
    </div>
  );
}
