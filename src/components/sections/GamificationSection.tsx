"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { RegistrationForm } from "@/components/ui/Forms";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useRegistration } from "@/components/providers/RegistrationProvider";
import { quizQuestion } from "@/data/quiz";
import { cn } from "@/lib/utils";

const perks = [
  "Voucher R$50 (quando confirmado)",
  "Aviso por e-mail",
  "Brinde no evento",
  "Prioridade no Dia D",
];

export function GamificationSection() {
  const { openRegistration } = useRegistration();
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const isCorrect = selected === quizQuestion.correctId;

  function handleSelect(optionId: string) {
    if (answered) return;
    setSelected(optionId);
    setAnswered(true);
  }

  return (
    <section id="gamificacao" className="bg-surface py-20 sm:py-24">
      <div className="container-site">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <ScrollReveal>
            <p className="section-eyebrow">Gamificação</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-tight text-primary">
              Seja o primeiro a saber
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-ink/75">
              Cadastre-se e receba a programação oficial, vouchers e novidades do Dia D.
            </p>
            <ul className="mt-6 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex items-center gap-3 font-body text-sm text-ink">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-sun/20 text-accent">
                    ✓
                  </span>
                  {perk}
                </li>
              ))}
            </ul>
            <div className="mt-8 hidden lg:block">
              <RegistrationForm />
            </div>
            <Button
              onClick={openRegistration}
              className="mt-6 w-full lg:hidden"
              icon={<span aria-hidden="true">→</span>}
            >
              QUERO SER AVISADO →
            </Button>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="rounded-xl border border-primary/10 bg-surface-elevated p-6 shadow-[0_4px_24px_rgba(26,20,16,0.08)] sm:p-8">
              <span className="font-mono-label text-[10px] text-accent">Quiz</span>
              <p className="mt-4 font-display text-xl text-primary">{quizQuestion.question}</p>

              <div className="mt-6 grid gap-3" role="group" aria-label="Opções do quiz">
                {quizQuestion.options.map((option) => {
                  const isSelected = selected === option.id;
                  const showResult = answered && isSelected;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      disabled={answered}
                      onClick={() => handleSelect(option.id)}
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded border-2 px-4 py-3 text-left font-body text-sm transition-colors",
                        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                        !answered && "border-primary/15 hover:border-accent/50",
                        showResult && isCorrect && "border-success bg-success/10 text-success",
                        showResult && !isCorrect && "border-error bg-error/10 text-error",
                        answered && !isSelected && "opacity-50",
                      )}
                      aria-pressed={isSelected}
                    >
                      <span className="font-mono-label text-xs">{option.id.toUpperCase()}</span>
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {answered ? (
                <div
                  className={cn(
                    "mt-6 rounded-lg p-4 font-body text-sm",
                    isCorrect ? "bg-success/10 text-success" : "bg-surface-muted text-ink",
                  )}
                  role="status"
                >
                  {isCorrect ? quizQuestion.successMessage : quizQuestion.errorMessage}
                  <Button
                    onClick={openRegistration}
                    className="mt-4 w-full"
                    icon={<span aria-hidden="true">→</span>}
                  >
                    QUERO MEU VOUCHER →
                  </Button>
                </div>
              ) : null}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
