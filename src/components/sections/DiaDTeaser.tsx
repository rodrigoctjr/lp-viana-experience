"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BotanicalDecor, PosterStrip } from "@/components/ui/BotanicalDecor";
import { TextReveal } from "@/components/ui/TextReveal";
import { diaDThemes } from "@/data/dia-d-themes";

const themeColors = ["#6B3D2E", "#2E6E7A", "#C4A035", "#4A7C59"];

export function DiaDTeaser() {
  const containerRef = useRef<HTMLElement>(null);
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
              08.11.2026 · Viana/ES
            </TextReveal>
            <TextReveal
              as="h2"
              className="mt-4 font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-on-accent"
            >
              Um dia inteiro de turismo em Viana
            </TextReveal>
          </div>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex w-fit animate-pulse-glow rounded-sm border-2 border-accent-sun/50 bg-accent-sun/20 px-5 py-2 font-mono-label text-xs text-accent-sun"
          >
            Programação em breve
          </motion.span>
        </div>

        <div className="mt-16 -mx-4 overflow-x-auto px-4 hide-scrollbar sm:mx-0 sm:px-0">
          <div className="flex w-max gap-5 pb-4 sm:gap-6">
            {diaDThemes.map((theme, i) => (
              <motion.article
                key={theme.id}
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="relative w-[min(85vw,340px)] shrink-0 overflow-hidden rounded-sm border-2 border-on-accent/15 bg-ochre p-8 text-primary shadow-lg sm:w-[380px]"
              >
                <span
                  className="font-countdown text-7xl leading-none opacity-25"
                  style={{ color: themeColors[i] }}
                >
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-2xl text-primary">{theme.title}</h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-primary/70">
                  {theme.description}
                </p>
                <div
                  className="absolute -bottom-8 -right-8 size-32 rounded-full blur-3xl"
                  style={{ backgroundColor: themeColors[i], opacity: 0.35 }}
                />
              </motion.article>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center font-display text-lg italic text-on-accent/70"
        >
          A programação oficial será divulgada em breve — fique de olho.
        </motion.p>
      </div>
    </section>
  );
}
