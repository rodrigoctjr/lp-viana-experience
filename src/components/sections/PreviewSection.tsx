"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { SectionShell } from "@/components/ui/SectionShell";
import { TextReveal } from "@/components/ui/TextReveal";
import { previewThemes } from "@/data/preview-themes";

const cardImages = [
  "/images/viana-2.jpg",
  "/images/bike-beer.jpg",
  "/images/viana-1.jpg",
  "/images/viana-2.jpg",
];

const accentColors = ["#4A7C59", "#6B3D2E", "#B5421C", "#2E6E7A"];

export function PreviewSection() {
  return (
    <SectionShell id="o-que-vem" variant="cream" accentBar>
      <TextReveal as="p" className="section-eyebrow">
        O que vem por aí
      </TextReveal>
      <TextReveal
        as="h2"
        className="mt-4 max-w-3xl font-display text-[clamp(2.5rem,5vw,4rem)] leading-[1.05] text-primary"
      >
        O melhor de Viana, em preview.
      </TextReveal>
      <p className="mt-4 max-w-xl font-body text-primary/60">
        Deslize para explorar as categorias do Dia D — natureza, cerveja, hospedagem e
        gastronomia capixaba.
      </p>

      <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto hide-scrollbar px-4 pb-6 sm:mx-0 sm:px-0">
        {previewThemes.map((item, i) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="relative h-[420px] w-[min(78vw,320px)] shrink-0 snap-center overflow-hidden rounded-sm border-4 border-brown/20 shadow-[0_16px_48px_-12px_rgba(107,61,46,0.3)] sm:h-[480px] sm:w-[360px]"
          >
            <Image src={cardImages[i]} alt="" fill className="object-cover" sizes="360px" />
            <div className="absolute inset-0 bg-linear-to-t from-brown-deep/95 via-brown/40 to-transparent" />
            <div
              className="absolute left-6 top-6 rounded-sm px-3 py-1.5 font-mono-label text-[10px] text-on-accent"
              style={{ backgroundColor: accentColors[i] }}
            >
              {item.category}
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="font-display text-2xl text-on-accent sm:text-3xl">{item.title}</h3>
              <p className="mt-2 font-body text-sm text-on-accent/80">{item.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}
