"use client";
import { motion, useReducedMotion } from "motion/react";
import { NatureTransition } from "@/components/ui/NatureTransition";
import { SectionNext } from "@/components/ui/SectionNext";
import { diaDThemes } from "@/data/dia-d-themes";
const icons = [
  <path key="mountain" d="M3 28L14 8l7 12 5-9 11 17H3zm7-12 4 4 4-4M24 14l3 4 3-2" />,
  <path key="beer" d="M9 12h19v21H9zM28 15h5a5 5 0 0 1 0 10h-5M15 17v10m7-10v10M9 12c-5-5 1-10 5-7 3-5 9-3 9 1 5-2 9 3 5 6" />,
  <path key="bed" d="M5 33V9m0 17h30v7M5 19h25a5 5 0 0 1 5 5v2M10 12h9v7h-9zM23 8v8m5-8v8m5-8v8" />,
  <path key="bus" d="M9 29V8a3 3 0 0 1 3-3h16a3 3 0 0 1 3 3v21H9zm0-17h22M20 5v7M13 29v5m14-5v5M13 23h3m8 0h3" />,
];
export function DiaDTeaser() {
  const reduced = useReducedMotion();
  return <section id="dia-d" className="day-chapter"><NatureTransition /><div className="container-site relative z-10">
    <div className="day-heading"><h2>Um dia inteiro.<br /><em>Todos os caminhos.</em></h2><div className="day-date"><strong>08.11</strong><span>Domingo, 2026<br />Dia D do Turismo<br />Viana, ES</span></div></div>
    <div className="day-program">{diaDThemes.map((theme, i) => <motion.article key={theme.id} initial={false} whileInView={reduced ? undefined : { opacity: [.65, 1] }} viewport={{ once: true }} transition={{ duration: .6 }}><svg viewBox="0 0 40 40" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">{icons[i]}</svg><h3>{theme.title}</h3><p>{theme.description}</p></motion.article>)}</div>
    <SectionNext copy="Escolha por onde começar. Os parceiros e suas experiências estão logo adiante." label="Explorar atrações" target="atracoes" tone="dark" />
  </div></section>;
}
