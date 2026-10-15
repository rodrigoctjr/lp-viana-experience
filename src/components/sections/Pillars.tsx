"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionNext } from "@/components/ui/SectionNext";
import { pillars } from "@/data/pillars";
const images = [
  { src: "/images/viana/igreja-matriz.jpg", alt: "Igreja Matriz no centro de Viana" },
  { src: "/images/viana/mata-atlantica.jpg", alt: "Copas e samambaiaçus da Mata Atlântica em Viana" },
  { src: "/images/viana/lupulo.jpg", alt: "Cones de lúpulo cultivados em Viana" },
];
export function Pillars() {
  const reduced = useReducedMotion();
  return <SectionShell id="pillars" variant="cream">
    <div className="chapter-header"><h2>Três mundos.<br />Uma cidade que surpreende.</h2><p>História, natureza e novos sabores. Descubra os caminhos que se encontram em Viana.</p></div>
    <div className="pillars-editorial">{pillars.map((pillar, i) => <motion.article className="pillar-editorial" key={pillar.id} initial={false} whileInView={reduced ? undefined : { transform: ["translateY(20px)", "translateY(0px)"] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, ease: [.23, 1, .32, 1] }}>
      <div className="pillar-photo"><Image src={images[i].src} alt={images[i].alt} fill sizes="(max-width: 767px) 90vw, 33vw" className="object-cover" /></div><h3>{pillar.title}</h3><p>{pillar.description}</p><small>{pillar.subtitle}</small>
    </motion.article>)}</div>
    <SectionNext copy="Esses três mundos se cruzam num único domingo. O que cabe entre o amanhecer e o último brinde?" label="Descobrir o Dia D" target="dia-d" />
    <p className="mt-6 max-w-3xl text-xs leading-relaxed text-primary/70">Fotos públicas de Viana: Igreja Matriz, Siumara Gonçalves (CC BY SA 3.0); Mata Atlântica, Instituto Últimos Refúgios (CC BY SA 4.0); lúpulo, Prefeitura de Viana.</p>
  </SectionShell>;
}
