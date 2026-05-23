"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { RichCard } from "@/components/ui/RichCard";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import { pillars } from "@/data/pillars";

const images = [
  "/images/viana-1.jpg",
  "/images/viana-2.jpg",
  "/images/bike-beer.jpg",
];

const gradients = [
  "from-brown-deep via-brown/90 to-terra/60",
  "from-primary via-hop/80 to-brand-green/50",
  "from-brown via-wheat/70 to-accent-sun/50",
];

export function Pillars() {
  const quoteRef = useRef<HTMLDivElement>(null);
  const inView = useInView(quoteRef, { once: true, margin: "-10%" });

  return (
    <SectionShell id="pillars" variant="cream" accentBar>
      <TextReveal as="p" className="section-eyebrow">
        A joia escondida
      </TextReveal>
      <TextReveal
        as="h2"
        className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] text-primary"
      >
        Três mundos. Uma cidade que surpreende.
      </TextReveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {pillars.map((pillar, i) => (
          <RichCard
            key={pillar.id}
            index={`0${i + 1}`}
            title={pillar.title}
            subtitle={pillar.subtitle}
            description={pillar.description}
            image={images[i]}
            gradient={gradients[i]}
            size={i === 0 ? "large" : "default"}
          />
        ))}
      </div>

      <motion.div
        ref={quoteRef}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mt-16 overflow-hidden rounded-sm bg-brown p-8 shadow-[0_16px_48px_-12px_rgba(107,61,46,0.35)] ring-2 ring-brown/30 sm:p-12"
      >
        <div
          className="pointer-events-none absolute -right-4 -top-4 font-countdown text-[10rem] leading-none text-on-accent/10 sm:text-[12rem]"
          aria-hidden="true"
        >
          V
        </div>
        <blockquote className="relative font-display text-xl italic leading-snug text-on-accent sm:text-2xl">
          &ldquo;Viana possui o produto perfeito. O desafio agora é mostrar essa joia ao
          mundo.&rdquo;
        </blockquote>
        <p className="relative mt-4 font-mono-label text-[10px] text-on-accent/50">Viana/ES</p>
      </motion.div>
    </SectionShell>
  );
}
