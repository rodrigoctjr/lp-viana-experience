"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { HeroScene } from "@/components/hero/HeroScene";
import { BotanicalDecor, PosterStrip } from "@/components/ui/BotanicalDecor";
import { Logo } from "@/components/ui/Logo";
import { SplitHeadline } from "@/components/ui/TextReveal";
import { scrollToSection } from "@/lib/utils";

interface HeroProps {
  refCopy?: string;
}

export function Hero({ refCopy }: HeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.45], [0, 60]);

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
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 w-full sm:mb-10"
          >
            <Logo variant="hero" priority className="drop-shadow-[0_8px_24px_rgba(107,61,46,0.2)]" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="mb-6"
          >
            <PosterStrip />
          </motion.div>

          <SplitHeadline
            lines={["DUAS ROTAS", "UMA CIDADE", "VIANA · ES"]}
            outlineIndex={1}
            className="text-[clamp(2.75rem,10vw,6.5rem)] text-primary"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="mt-6 max-w-xl font-body text-base leading-relaxed text-primary/75 sm:text-lg"
          >
            Da Grande Vitória às montanhas, rios e cervejarias artesanais — história, natureza e
            aventura no coração do Espírito Santo.
          </motion.p>

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
              onClick={() => scrollToSection("pillars")}
              className="group rounded-sm bg-brown px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-on-accent shadow-[0_8px_24px_-4px_rgba(107,61,46,0.4)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              <span className="flex items-center gap-2">
                Explorar Viana
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("dia-d")}
              className="rounded-sm border-2 border-primary/25 bg-ochre-light/50 px-8 py-4 font-body text-sm font-bold uppercase tracking-[0.12em] text-primary/80 transition-colors hover:border-hop hover:text-hop"
            >
              Dia D · 08.11.2026
            </button>
          </motion.div>

          <p className="mt-6 font-mono-label text-[10px] text-primary/45">Viana/ES</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 w-full max-w-md lg:mt-0 lg:max-w-lg"
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-2, -1, -2] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden rounded-sm shadow-[0_24px_80px_-12px_rgba(107,61,46,0.45)] ring-4 ring-brown/25"
          >
            <Image
              src="/images/polo-cervejeiro-poster.png"
              alt="Polo Cervejeiro – Dia D do Turismo em Viana/ES"
              width={800}
              height={800}
              className="w-full object-cover"
              priority
              sizes="(max-width: 1024px) 90vw, 480px"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-site relative z-10 mt-auto flex items-end justify-between pt-10"
      >
        <p className="font-mono-label text-[10px] text-primary/40">Scroll para descobrir</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="h-10 w-px bg-linear-to-b from-transparent via-brown to-transparent" />
        </motion.div>
        <p className="font-countdown text-2xl text-brown sm:text-3xl">Jun/26</p>
      </motion.div>
    </section>
  );
}
