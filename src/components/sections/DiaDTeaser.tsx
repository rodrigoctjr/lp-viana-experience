"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { BotanicalDecor, PosterStrip } from "@/components/ui/BotanicalDecor";
import { SectionNext } from "@/components/ui/SectionNext";
import { TextReveal } from "@/components/ui/TextReveal";
import { diaDThemes } from "@/data/dia-d-themes";
import { cn } from "@/lib/utils";

const themeColors = ["#6B3D2E", "#2E6E7A", "#C4A035", "#4A7C59"];

export function DiaDTeaser() {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const stageInView = useInView(stageRef, { once: true, margin: "-10%" });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || !stageInView) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % diaDThemes.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [reduced, stageInView]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1.08, 1]);

  return (
    <section
      id="dia-d"
      ref={containerRef}
      className="grain relative overflow-hidden bg-brown py-24 sm:py-32"
    >
      <BotanicalDecor variant="section" />
      <motion.div
        style={{ scale: bgScale }}
        className="pointer-events-none absolute inset-0 opacity-25"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-wheat/40 blur-[150px]" />
      </motion.div>

      <div className="container-site relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <PosterStrip className="mb-6 !bg-brown-deep" />
            <TextReveal as="p" className="section-eyebrow !text-accent-sun">
              07.11.2026 · Viana/ES
            </TextReveal>
            <TextReveal
              as="h2"
              className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-on-accent"
            >
              Um dia inteiro de turismo em Viana
            </TextReveal>
          </div>
          <motion.a
            href="#atracoes"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex w-fit rounded-sm border-2 border-accent-sun/50 bg-accent-sun/20 px-5 py-2 font-mono-label text-xs text-accent-sun transition-colors hover:bg-accent-sun/30"
          >
            Parceiros confirmados
          </motion.a>
        </div>

        <div ref={stageRef} className="mt-16 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {diaDThemes.map((theme, i) => {
            const featured = active === i;
            return (
              <motion.article
                key={theme.id}
                initial={reduced ? false : { opacity: 0, y: 72, scale: 0.9, rotate: i % 2 === 0 ? -2 : 2 }}
                whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{
                  delay: reduced ? 0 : 0.12 + i * 0.2,
                  type: "spring",
                  stiffness: 220,
                  damping: 18,
                }}
                className="h-full"
              >
                <motion.div
                  animate={reduced ? undefined : { y: featured ? -14 : 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className={cn(
                    "relative h-full overflow-hidden rounded-sm border-2 bg-ochre p-6 text-primary shadow-lg sm:p-8",
                    featured
                      ? "border-accent-sun shadow-[0_20px_40px_-16px_rgba(245,166,35,0.55)]"
                      : "border-on-accent/15",
                  )}
                >
                <motion.span
                  className="font-countdown text-6xl leading-none sm:text-7xl"
                  animate={{ opacity: featured ? 0.45 : 0.22, color: themeColors[i] }}
                  transition={{ duration: 0.4 }}
                >
                  0{i + 1}
                </motion.span>
                <h3 className="mt-4 font-display text-2xl text-primary">{theme.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-primary/70">{theme.description}</p>
                <motion.div
                  className="absolute -bottom-8 -right-8 size-32 rounded-full blur-3xl"
                  style={{ backgroundColor: themeColors[i] }}
                  animate={{ opacity: featured ? 0.55 : 0.2, scale: featured ? 1.15 : 1 }}
                  transition={{ duration: 0.45 }}
                />
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        <SectionNext
          tone="dark"
          copy="Sete portas já abriram. Uma delas separou uma cortesia com o seu nome."
          label="Ver quem confirmou"
          target="atracoes"
        />
      </div>
    </section>
  );
}
