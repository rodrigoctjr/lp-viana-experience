"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BotanicalDecor, PosterStrip } from "@/components/ui/BotanicalDecor";
import { Logo } from "@/components/ui/Logo";
import { SplitHeadline } from "@/components/ui/TextReveal";
import { WHATSAPP_INSTITUTIONAL } from "@/lib/constants";

export function ImpactCta() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 0.6], [0.88, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [0.4, 1]);

  return (
    <section
      ref={ref}
      id="impacto"
      className="grain hero-poster relative flex min-h-[90dvh] items-center overflow-hidden py-24"
    >
      <BotanicalDecor variant="hero" />

      <motion.div
        style={{ scale, opacity }}
        className="container-site relative z-10 text-center"
      >
        <Logo variant="hero" className="mx-auto mb-10 justify-center" />
        <PosterStrip className="mb-8" />

        <SplitHeadline
          lines={["DUAS ROTAS", "UMA CIDADE", "INFINITAS HISTÓRIAS"]}
          outlineIndex={1}
          className="text-[clamp(2.5rem,9vw,6rem)] text-primary"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mx-auto mt-8 max-w-lg font-body text-lg text-primary/70"
        >
          7 de novembro. Um dia inteiro. A cidade abre por dentro — e a próxima decisão é se você
          entra.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm bg-brown px-10 py-4 font-body text-sm font-bold uppercase tracking-widest text-on-accent shadow-lg transition-transform hover:scale-105"
          >
            Quero estar lá
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border-2 border-primary/25 bg-ochre-light/60 px-10 py-4 font-body text-sm font-bold uppercase tracking-widest text-primary/80 transition-colors hover:border-brown hover:text-brown"
          >
            Fale conosco
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-16 font-countdown text-[clamp(4rem,15vw,10rem)] leading-none text-brown"
        >
          07.11
        </motion.p>
        <p className="mt-4 font-mono-label text-[10px] text-primary/45">Viana/ES</p>
      </motion.div>
    </section>
  );
}
