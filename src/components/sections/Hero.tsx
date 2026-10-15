"use client";
import { DirectionArrow } from "@/components/ui/DirectionArrow";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { DestinationMap } from "@/components/hero/DestinationMap";
import { NatureBackdrop } from "@/components/ui/NatureBackdrop";
import { InstitutionalLogos } from "@/components/ui/InstitutionalLogos";

export function Hero({ refCopy }: { refCopy?: string }) {
  const [journey, setJourney] = useState(0);
  const activeJourney = useRef(0);
  const [phase, setPhase] = useState<"mapping" | "fading" | "centered">("mapping");
  const reduced = useReducedMotion();
  const finishZoom = useCallback((completedJourney: number) => {
    if (completedJourney === activeJourney.current) setPhase(current => current === "mapping" ? "fading" : current);
  }, []);
  const positionTransition = { duration: reduced ? 0 : .85, ease: [.23, 1, .32, 1] as const };
  function replay() {
    activeJourney.current += 1;
    setJourney(activeJourney.current);
    setPhase("mapping");
  }
  return (
    <LayoutGroup><section id="top" className="destination-hero hero-photographic hero-cartographic-opening" data-phase={phase}>
      <NatureBackdrop />
      <motion.div className="hero-city-scene" aria-hidden="true" initial={false} animate={{ opacity: phase === "mapping" ? 0 : 1 }} transition={{ duration: reduced ? 0 : .85, ease: "easeOut" }}>
        <motion.div className="hero-city-camera" initial={false} animate={{ scale: phase === "mapping" ? 1.08 : 1 }} transition={{ duration: reduced ? 0 : 2.4, ease: [.23, 1, .32, 1] }}>
          <Image src="/images/viana/igreja-matriz-atual.png" alt="" fill priority sizes="100vw" className="hero-city-image" />
        </motion.div>
        <div className="hero-city-shade" />
      </motion.div>
      <motion.div layout transition={{ layout: positionTransition }} className={`destination-hero-grid${phase === "centered" ? " hero-centered" : ""}`}>
        <div className="destination-copy">
          <motion.h1 layout="position" transition={{ layout: positionTransition }}><span className="sr-only">Viana Experience, Dia D do Turismo</span><Logo variant="hero" priority className="destination-logo" /></motion.h1>
          <motion.h2 layout="position" transition={{ layout: positionTransition }}>Dia D do Turismo.<br /><em>Viva Viana.</em></motion.h2>
          <motion.p layout="position" transition={{ layout: positionTransition }}>Um dia de turismo em Viana, com programação de aventura, polo cervejeiro, gastronomia e transporte entre as atrações.</motion.p>
          <motion.div layout="position" transition={{ layout: positionTransition }} className="destination-date"><span className="destination-day">08</span><div><strong>NOVEMBRO</strong><span>Domingo · 2026<br />Viana, Espírito Santo</span></div></motion.div>
          {refCopy ? <p className="destination-ref">{refCopy}</p> : null}
          <motion.div layout="position" transition={{ layout: positionTransition }} className="destination-actions"><a href="#dia-d" className="destination-primary">Explorar o Dia D <DirectionArrow diagonal /></a><a href="#atracoes" className="destination-secondary">Ver as atrações <DirectionArrow /></a></motion.div>
          {phase === "centered" ? <motion.button layout="position" transition={{ layout: positionTransition }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} type="button" onClick={replay} className="hero-replay">Rever viagem <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /></svg></motion.button> : null}
        </div>
        <AnimatePresence onExitComplete={() => setPhase(current => current === "fading" ? "centered" : current)}>
        {phase === "mapping" ? <motion.div key={`map-${journey}`} className="destination-map-stage" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .65, ease: "easeOut" }}>
          <DestinationMap onZoomComplete={() => finishZoom(journey)} />
          <div className="map-opening-copy"><Logo variant="hero" className="map-opening-logo" /><h2>Dia D do Turismo.<br /><em>A viagem começa aqui.</em></h2><p>8 de novembro de 2026 · Viana, ES</p></div>
          <div className="map-caption"><span>Brasil <span aria-hidden="true">/</span> Espírito Santo <span aria-hidden="true">/</span> <strong>Viana</strong></span><button type="button" onClick={() => finishZoom(journey)}>Pular abertura <DirectionArrow /></button></div>
          <a className="map-source" href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3" target="_blank" rel="noopener noreferrer">Base cartográfica: IBGE · localização do município</a>
        </motion.div> : null}
        </AnimatePresence>
      </motion.div>
      <InstitutionalLogos className="hero-institutional" />
    </section>
      <motion.div layout="position" transition={{ layout: positionTransition }} className="destination-photo-strip">
        <div className="destination-photo"><Image src="/images/viana/mata-atlantica.jpg" alt="Copas da Mata Atlântica em Viana" fill sizes="(max-width: 700px) 40vw, 25vw" className="object-cover" /></div>
        <p>Entre a mata e a cidade,<br /><strong>há muito para descobrir.</strong></p>
        <a href="#pillars">Conheça Viana <span aria-hidden="true">↓</span></a>
      </motion.div></LayoutGroup>
  );
}
