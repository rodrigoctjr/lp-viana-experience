"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type MouseEvent } from "react";
import { HeroScene } from "@/components/hero/HeroScene";
import { BotanicalDecor } from "@/components/ui/BotanicalDecor";
import { Logo } from "@/components/ui/Logo";
import { diaDThemes } from "@/data/dia-d-themes";
import { scrollToSection } from "@/lib/utils";

interface HeroProps {
  refCopy?: string;
}

export function Hero({ refCopy }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, 60]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const tiltX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 16 });
  const tiltY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 16 });

  function tiltPostcard(event: MouseEvent<HTMLDivElement>) {
    if (reduced) return;
    const box = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - box.left) / box.width - 0.5);
    pointerY.set((event.clientY - box.top) / box.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section
      ref={ref}
      id="top"
      className="grain hero-poster relative flex min-h-[100dvh] flex-col overflow-hidden pb-8 pt-24 sm:pb-12 sm:pt-28"
    >
      <HeroScene />
      <BotanicalDecor variant="hero" />

      <motion.div
        style={{ opacity, y }}
        className="container-site relative z-10 flex flex-1 flex-col lg:grid lg:grid-cols-2 lg:items-center lg:gap-14"
      >
        <div className="flex w-full flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-1 w-full"
          >
            <Logo variant="hero" priority className="drop-shadow-[0_8px_24px_rgba(107,61,46,0.2)]" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="font-mono-label text-[11px] text-brown"
          >
            Sábado, 7 de novembro de 2026 · Viana, ES
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-4 max-w-xl font-body text-base leading-relaxed text-primary/80 sm:text-lg"
          >
            Um dia de turismo em Viana, com programação de aventura, polo cervejeiro, gastronomia
            e transporte entre as atrações.
          </motion.p>

          <dl className="mt-6 grid w-full max-w-xl grid-cols-1 gap-2 sm:grid-cols-2">
            {diaDThemes.map((theme, i) => (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}
                className="rounded-sm border border-brown/15 bg-ochre-light/60 px-4 py-3 text-left"
              >
                <dt className="font-body text-sm font-semibold text-primary">{theme.title}</dt>
                <dd className="mt-1 font-body text-sm leading-snug text-primary/70">
                  {theme.id === "transporte"
                    ? "Deslocamento entre as atrações durante o dia."
                    : theme.description}
                </dd>
              </motion.div>
            ))}
          </dl>

          {refCopy ? (
            <motion.p
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-4 inline-flex items-center gap-2 rounded-sm border border-brown/30 bg-brown/10 px-4 py-2 font-mono-label text-[10px] text-brown"
            >
              <span className="size-1.5 rounded-full bg-accent-sun" />
              {refCopy}
            </motion.p>
          ) : null}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <button
              type="button"
              onClick={() => scrollToSection("dia-d")}
              className="group rounded-sm bg-brown px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-on-accent shadow-[0_8px_24px_-4px_rgba(107,61,46,0.4)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                Ver a programação
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("atracoes")}
              className="rounded-sm border-2 border-primary/25 bg-ochre-light/50 px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-primary/80 transition-colors hover:border-hop hover:text-hop"
            >
              Ver as atrações
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 48, rotate: -6 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.35, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 w-full max-w-md lg:mt-0 lg:max-w-lg"
          onMouseMove={tiltPostcard}
          onMouseLeave={resetTilt}
        >
          <motion.span
            aria-hidden="true"
            animate={reduced ? undefined : { y: [0, -10, 0], rotate: [-8, -2, -8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-2 top-8 z-20 hidden rounded-full border border-brown/20 bg-ochre px-3 py-1 font-mono-label text-[9px] text-brown shadow-md sm:block"
          >
            Dia D
          </motion.span>
          <motion.span
            aria-hidden="true"
            animate={reduced ? undefined : { y: [0, 12, 0], x: [0, 6, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-1 top-2 z-20 rounded-full bg-brown px-3 py-1 font-mono-label text-[9px] text-on-accent shadow-md"
          >
            07.11
          </motion.span>
          <motion.div
            style={reduced ? undefined : { rotateX: tiltX, rotateY: tiltY, transformPerspective: 900 }}
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative bg-[#f4efe2] p-3 pb-16 shadow-[0_24px_80px_-12px_rgba(107,61,46,0.45)] ring-1 ring-brown/15 sm:p-4 sm:pb-20"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-brown-deep">
              <motion.div
                className="absolute inset-0"
                animate={reduced ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/images/viana/estacao.jpg"
                  alt="Estação ferroviária de Viana, com o nome da cidade na fachada amarela e uma locomotiva na frente."
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </motion.div>
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent"
                initial={{ x: "-120%" }}
                animate={reduced ? undefined : { x: "320%" }}
                transition={{ duration: 2.8, delay: 1.2, repeat: Infinity, repeatDelay: 4.5, ease: "easeInOut" }}
              />
            </div>
            <div className="absolute inset-x-4 bottom-4 flex items-end justify-between sm:inset-x-5 sm:bottom-5">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                <p className="font-display text-2xl italic leading-none text-brown">Viana, ES</p>
                <p className="mt-1 font-mono-label text-[9px] text-brown/55">Estação Ferroviária</p>
              </motion.div>
              <motion.div
                initial={{ scale: 1.8, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 12 }}
                transition={{ delay: 1.05, type: "spring", stiffness: 420, damping: 12 }}
                className="rounded-full border-2 border-dashed border-terra px-3 py-2 text-center font-mono-label text-[9px] leading-tight text-terra"
              >
                07.11
                <span className="mt-0.5 block">VIANA</span>
              </motion.div>
            </div>
          </motion.div>
          <p className="mt-3 text-center font-mono-label text-[8px] text-primary/35 lg:text-left">
            Foto: Rafael Deminicis · CC BY-SA 4.0
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-site relative z-10 mt-auto flex items-end justify-between pt-10"
      >
        <p className="font-mono-label text-[10px] text-primary/40">Viana, Espírito Santo</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-10 w-px bg-linear-to-b from-transparent via-brown to-transparent" />
        </motion.div>
        <p className="font-countdown text-2xl text-brown sm:text-3xl">07.11.2026</p>
      </motion.div>
    </section>
  );
}
