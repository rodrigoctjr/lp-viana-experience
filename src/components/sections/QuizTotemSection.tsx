"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import { PosterStrip } from "@/components/ui/BotanicalDecor";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import quizData from "@/data/quiz-viana.json";
import { shuffleArray } from "@/lib/shuffle";
import { cn } from "@/lib/utils";
import { CATEGORY_LABELS, type QuizQuestion } from "@/types/quiz";

const OPTION_LABELS = ["A", "B", "C", "D"] as const;

const questions = quizData as QuizQuestion[];

function CategoryBadge({ category }: { category: QuizQuestion["category"] }) {
  const colors: Record<QuizQuestion["category"], string> = {
    historia: "bg-brown text-on-accent",
    cultura: "bg-hop text-on-accent",
    turismo: "bg-rio text-on-accent",
  };

  return (
    <span className={cn("rounded-sm px-3 py-1 font-mono-label text-[10px]", colors[category])}>
      {CATEGORY_LABELS[category]}
    </span>
  );
}

export function QuizTotemSection() {
  const [shuffled, setShuffled] = useState(() => shuffleArray(questions));
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const current = shuffled[index];
  const isLast = index >= shuffled.length - 1;
  const progress = ((index + (revealed ? 1 : 0)) / shuffled.length) * 100;

  const resetRound = useCallback(() => {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
  }, []);

  const reshuffle = useCallback(() => {
    setShuffled(shuffleArray(questions));
    resetRound();
  }, [resetRound]);

  function handleSelect(optionIndex: number) {
    if (revealed) return;
    setSelected(optionIndex);
    setRevealed(true);
  }

  function handleNext() {
    if (!revealed) return;
    if (isLast) {
      reshuffle();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  return (
    <SectionShell id="quiz" variant="ochre" accentBar>
      <TextReveal as="p" className="section-eyebrow">
        Totem interativo
      </TextReveal>
      <TextReveal
        as="h2"
        className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-primary"
      >
        Quiz de curiosidades de Viana
      </TextReveal>
      <p className="mt-4 max-w-xl font-body text-primary/70">
        História, cultura e turismo — toque na resposta, descubra a curiosidade e avance para a
        próxima. Perguntas em ordem aleatória a cada rodada.
      </p>

      <div className="mt-12 flex justify-center">
        <div className="relative w-full max-w-2xl">
          {/* Totem frame */}
          <div className="absolute -inset-3 rounded-sm bg-brown shadow-[0_24px_64px_-12px_rgba(74,42,31,0.5)] sm:-inset-4" />
          <div className="absolute left-1/2 top-0 z-20 h-3 w-24 -translate-x-1/2 -translate-y-full rounded-t-sm bg-brown-deep" />

          <div className="relative overflow-hidden rounded-sm border-4 border-brown bg-paper shadow-inner">
            {/* Totem header */}
            <div className="border-b-2 border-brown/20 bg-ochre px-6 py-4 sm:px-8">
              <PosterStrip className="!py-2 text-sm" />
              <div className="mt-4 flex items-center justify-between gap-4">
                <CategoryBadge category={current.category} />
                <span className="font-mono-label text-[10px] text-primary/50">
                  {index + 1} / {shuffled.length}
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-brown/15">
                <motion.div
                  className="h-full bg-brown"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Question screen */}
            <div className="min-h-[420px] px-6 py-8 sm:min-h-[460px] sm:px-10 sm:py-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="font-mono-label text-[10px] text-brown">Pergunta</p>
                  <h3 className="mt-3 font-display text-2xl leading-snug text-primary sm:text-3xl">
                    {current.question}
                  </h3>

                  <div className="mt-8 grid gap-3 sm:gap-4" role="group" aria-label="Opções de resposta">
                    {current.options.map((option, i) => {
                      const isSelected = selected === i;
                      const isCorrect = i === current.correctIndex;
                      let stateClass =
                        "border-brown/20 bg-ochre-light hover:border-brown/50 hover:bg-ochre/80";

                      if (revealed && isCorrect) {
                        stateClass = "border-brand-green bg-brand-green/15 text-primary";
                      } else if (revealed && isSelected && !isCorrect) {
                        stateClass = "border-error bg-error/10 text-error";
                      } else if (revealed && !isCorrect && !isSelected) {
                        stateClass = "border-brown/10 bg-paper/80 opacity-60";
                      }

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={revealed}
                          onClick={() => handleSelect(i)}
                          className={cn(
                            "flex min-h-14 w-full items-center gap-4 rounded-sm border-2 px-4 py-3 text-left transition-all",
                            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown",
                            "disabled:cursor-default",
                            stateClass,
                          )}
                          aria-pressed={isSelected}
                        >
                          <span className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-brown font-mono-label text-xs text-on-accent">
                            {OPTION_LABELS[i]}
                          </span>
                          <span className="font-body text-base font-medium">{option}</span>
                          {revealed && isCorrect ? (
                            <span className="ml-auto text-brand-green" aria-hidden="true">
                              ✓
                            </span>
                          ) : null}
                          {revealed && isSelected && !isCorrect ? (
                            <span className="ml-auto text-error" aria-hidden="true">
                              ✕
                            </span>
                          ) : null}
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {revealed ? (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-8 rounded-sm border-2 border-brown/20 bg-brown/10 p-5"
                        role="status"
                      >
                        <p className="font-mono-label text-[10px] text-brown">Curiosidade</p>
                        <p className="mt-2 font-body text-sm leading-relaxed text-primary/80">
                          {current.curiosity}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Totem footer controls */}
            <div className="flex flex-col gap-3 border-t-2 border-brown/20 bg-ochre px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <button
                type="button"
                onClick={reshuffle}
                className="font-mono-label text-[10px] text-primary/50 underline-offset-2 hover:text-brown hover:underline"
              >
                Embaralhar perguntas
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={!revealed}
                className={cn(
                  "rounded-sm px-8 py-4 font-body text-sm font-bold uppercase tracking-widest transition-all",
                  revealed
                    ? "bg-brown text-on-accent shadow-lg hover:scale-[1.02]"
                    : "cursor-not-allowed bg-brown/20 text-primary/30",
                )}
              >
                {isLast && revealed ? "Nova rodada →" : "Próxima pergunta →"}
              </button>
            </div>
          </div>

          {/* Totem base */}
          <div className="mx-auto mt-0 h-4 w-[85%] rounded-b-sm bg-brown-deep" />
          <div className="mx-auto h-3 w-[70%] rounded-b-sm bg-brown/80" />
        </div>
      </div>
    </SectionShell>
  );
}
