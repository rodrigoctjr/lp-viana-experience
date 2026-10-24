"use client";
import { motion, useReducedMotion } from "motion/react";
import { NatureTransition } from "@/components/ui/NatureTransition";
import { NatureBackdrop } from "@/components/ui/NatureBackdrop";
import { PromoVideo } from "@/components/ui/PromoVideo";
import { SectionNext } from "@/components/ui/SectionNext";
import { diaDThemes } from "@/data/dia-d-themes";
const icons: Record<(typeof diaDThemes)[number]["icon"], React.ReactNode> = {
  kayak: <path d="M3 25c6 4 28 4 34 0-6-4-28-4-34 0zm8-11 18 22M12 10l-3 6 6-2m14 22 3-6-6 2M16 22a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />,
  pendulum: <path d="M4 6h32M10 6l3 6m14-6-3 6M20 6v14m0 0a3 3 0 1 0 0 .1M17 26l3-3 3 3m-3-3v8m-4 3 4-3 4 3M4 36c6-3 10-3 16 0s10 3 16 0" />,
  mountain: <path d="M3 33 14 13l7 12 5-9 11 17H3zm8-16 3 3 3-3m10 3 2 3 2-1" />,
  bike: <path d="M4 27a6 6 0 1 0 12 0 6 6 0 1 0-12 0zm20 0a6 6 0 1 0 12 0 6 6 0 1 0-12 0zM10 27l6-12h9l5 12M16 15l6 12h-6m3-16h5M14 11h5" />,
  horse: <path d="M8 34V22c0-5 4-8 9-8h7l4-6 2 5 4 3-2 4-4-1-3 4v11M14 22v12m-6-14-4 6m24-8h.1" />,
  run: <path d="M24 6a3 3 0 1 0 0 .1M20 13l-6 4-3 6m9-10 6 6 6 1M20 13l-3 9 6 5-2 9m-4-14-5 5H6" />,
  food: <path d="M5 21h30c0 8-6 13-15 13S5 29 5 21zm3-4c2-5 7-8 12-8s10 3 12 8M20 9V5M14 15h.1m6-1h.1m6 1h.1" />,
  beer: <path d="M9 12h19v21H9zM28 15h5a5 5 0 0 1 0 10h-5M15 17v10m7-10v10M9 12c-5-5 1-10 5-7 3-5 9-3 9 1 5-2 9 3 5 6" />,
  craft: <path d="M6 34 30 10m0 0 4-4-2 6m-2-2 6-2M10 20c4-6 12-6 16 0M8 28c6-6 18-6 24 0M30 34a2 2 0 1 0 0 .1" />,
};
export function DiaDTeaser() {
  const reduced = useReducedMotion();
  return <section id="dia-d" className="day-chapter"><NatureTransition /><NatureBackdrop /><div className="container-site relative z-10">
    <div className="day-heading"><h2>Um dia inteiro.<br /><em>Todos os caminhos.</em></h2><div className="day-date"><strong>08.11</strong><span>Domingo, 2026<br />Dia D do Turismo<br />Viana, ES</span></div></div>
    <div className="day-body">
      <div className="day-program">{diaDThemes.map((theme) => <motion.article key={theme.id} initial={false} whileInView={reduced ? undefined : { opacity: [.65, 1] }} viewport={{ once: true }} transition={{ duration: .6 }}><svg viewBox="0 0 40 40" aria-hidden="true" strokeLinecap="round" strokeLinejoin="round">{icons[theme.icon]}</svg><h3>{theme.title}</h3><p>{theme.description}</p></motion.article>)}</div>
      <div className="day-video"><PromoVideo /></div>
    </div>
    <SectionNext copy="Veja os horários, os pontos de encontro e como chegar em cada atividade." label="Ver a programação" target="programacao" />
  </div></section>;
}
