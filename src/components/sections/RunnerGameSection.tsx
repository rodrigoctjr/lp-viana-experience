"use client";

import { PosterStrip } from "@/components/ui/BotanicalDecor";
import { VianaRunnerGame } from "@/components/game/VianaRunnerGame";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import { ATTRACTION_PRIZES } from "@/data/runner-game";

export function RunnerGameSection() {
  return (
    <SectionShell id="jogo" variant="cream" accentBar>
      <PosterStrip className="mb-6" />
      <TextReveal as="p" className="section-eyebrow">
        Bike Beer · Grande Vitória → Viana
      </TextReveal>
      <TextReveal
        as="h2"
        className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-primary"
      >
        Pedale e conquiste Viana
      </TextReveal>
      <p className="mt-4 max-w-xl font-body text-primary/70">
        Desvie de obstáculos e conquiste as
        atrações pelo caminho.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        {ATTRACTION_PRIZES.map((a) => (
          <span
            key={a.id}
            className="inline-flex items-center gap-1.5 rounded-sm border border-brown/15 bg-ochre-light/80 px-2.5 py-1 font-mono-label text-[9px] text-primary"
          >
            <span aria-hidden="true">{a.icon}</span>
            {a.label}
            <span className="text-brown">+{a.points}</span>
          </span>
        ))}
      </div>

      <div className="mt-10">
        <VianaRunnerGame />
      </div>
    </SectionShell>
  );
}
