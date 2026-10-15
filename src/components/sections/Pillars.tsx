"use client";
import Image from "next/image";
import { useDestinationExplorer } from "@/components/providers/DestinationExplorerProvider";
import { DirectionArrow } from "@/components/ui/DirectionArrow";
import { motion, useReducedMotion } from "motion/react";
import { SectionShell } from "@/components/ui/SectionShell";
import { SectionNext } from "@/components/ui/SectionNext";
import { pillars } from "@/data/pillars";
const images = [
  { src: "/images/viana/igreja-matriz-atual.png", alt: "Fachada da Igreja Matriz de Viana, com portas azuis e céu ao fundo" },
  { src: "/images/viana/mata-atlantica.jpg", alt: "Copas e samambaiaçus da Mata Atlântica em Viana" },
  { src: "/images/viana/lupulo.jpg", alt: "Cones de lúpulo cultivados em Viana" },
];
export function Pillars() {
  const reduced = useReducedMotion();
  const explore = useDestinationExplorer();
  return <SectionShell id="pillars" variant="cream">
    <div className="chapter-header"><h2>Três mundos.<br />Uma cidade que surpreende.</h2><div><p>História, natureza e novos sabores. Descubra os caminhos que se encontram em Viana.</p><button type="button" className="destination-primary destination-explore-cta" onClick={() => explore()} aria-haspopup="dialog">Explorar os três mundos <DirectionArrow diagonal /></button></div></div>
    <div className="pillars-editorial">{pillars.map((pillar, i) => <motion.article className="pillar-editorial" key={pillar.id} initial={false} whileInView={reduced ? undefined : { transform: ["translateY(20px)", "translateY(0px)"] }} viewport={{ once: true, amount: .2 }} transition={{ duration: .8, ease: [.23, 1, .32, 1] }}>
      <button type="button" className="pillar-photo" onClick={() => explore(i)} aria-label={`Explorar ${pillar.title}`} aria-haspopup="dialog"><Image src={images[i].src} alt={images[i].alt} fill sizes="(max-width: 767px) 90vw, 33vw" className="object-cover" /></button><h3>{pillar.title}</h3><p>{pillar.description}</p><small>{pillar.subtitle}</small>
      <button type="button" onClick={() => explore(i)} className="pillar-history-link" aria-haspopup="dialog">{["Conheça nossa história", "Explore a natureza", "Descubra os sabores"][i]} <DirectionArrow diagonal /></button>
    </motion.article>)}</div>
    <SectionNext copy="Esses três mundos se cruzam num único domingo. O que cabe entre o amanhecer e o último brinde?" label="Descobrir o Dia D" target="dia-d" />
    <p className="mt-6 max-w-3xl text-xs leading-relaxed text-primary/70">Fotos de Viana: Igreja Matriz, imagem fornecida para o projeto; Mata Atlântica, Instituto Últimos Refúgios (CC BY SA 4.0); lúpulo, Prefeitura de Viana.</p>
  </SectionShell>;
}
