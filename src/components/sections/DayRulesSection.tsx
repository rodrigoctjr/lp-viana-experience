"use client";

import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import { couponRules, courtesyRules, dayFaqItems } from "@/data/dia-8";

function RuleList({ title, rules }: { title: string; rules: readonly string[] }) {
  return (
    <div>
      <p className="font-mono-label text-[10px] text-accent-sun">{title}</p>
      <ul className="mt-4 space-y-4">
        {rules.map((rule) => (
          <li key={rule} className="flex gap-3 font-body text-[15px] leading-relaxed">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-sun" aria-hidden="true" />
            {rule}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function DayRulesSection() {
  return (
    <SectionShell id="regras" variant="cream" decor={false} className="scroll-mt-28">
      <TextReveal as="p" className="section-eyebrow">
        Antes de ir
      </TextReveal>
      <TextReveal
        as="h2"
        className="mt-4 font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-primary"
      >
        Regras e dúvidas sobre o dia
      </TextReveal>

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-8 rounded-3xl bg-brown p-8 text-on-accent sm:p-10 lg:col-span-5">
          <RuleList title="Cortesias" rules={courtesyRules} />
          <RuleList title="Cupons de desconto" rules={couponRules} />
        </div>

        <div className="lg:col-span-7">
          <FaqAccordion items={dayFaqItems} />
        </div>
      </div>
    </SectionShell>
  );
}
