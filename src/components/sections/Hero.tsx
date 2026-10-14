"use client";
import { DirectionArrow } from "@/components/ui/DirectionArrow";

import Image from "next/image";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { DestinationMap } from "@/components/hero/DestinationMap";

export function Hero({ refCopy }: { refCopy?: string }) {
  const [journey, setJourney] = useState(0);
  return (
    <section id="top" className="destination-hero">
      <div className="destination-hero-grid">
        <div className="destination-copy">
          <h1><span className="sr-only">Viana Experience — Dia D do Turismo</span><Logo variant="hero" priority className="destination-logo" /></h1>
          <h2>Seu próximo destino.<br /><em>Uma nova história.</em></h2>
          <p>Um dia de turismo em Viana, com programação de aventura, polo cervejeiro, gastronomia e transporte entre as atrações.</p>
          <div className="destination-date"><span className="destination-day">08</span><div><strong>NOVEMBRO</strong><span>Domingo · 2026<br />Viana, Espírito Santo</span></div></div>
          {refCopy ? <p className="destination-ref">{refCopy}</p> : null}
          <div className="destination-actions"><a href="#dia-d" className="destination-primary">Explorar o Dia D <DirectionArrow diagonal /></a><a href="#atracoes" className="destination-secondary">Ver as atrações <DirectionArrow /></a></div>
        </div>
        <div className="destination-map-stage">
          <DestinationMap key={journey} />
          <div className="map-caption"><span>Brasil <span aria-hidden="true">/</span> Espírito Santo <span aria-hidden="true">/</span> <strong>Viana</strong></span><button type="button" onClick={() => setJourney(j => j + 1)} aria-label="Repetir aproximação do mapa até Viana"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" /></svg>Rever viagem</button></div>
          <a className="map-source" href="https://servicodados.ibge.gov.br/api/docs/malhas?versao=3" target="_blank" rel="noopener noreferrer">Base cartográfica: IBGE · localização do município</a>
        </div>
      </div>
      <div className="destination-photo-strip">
        <div className="destination-photo"><Image src="/images/viana/mata-atlantica.jpg" alt="Copas da Mata Atlântica em Viana" fill sizes="(max-width: 700px) 40vw, 25vw" className="object-cover" /></div>
        <p>Entre a mata e a cidade,<br /><strong>há muito para descobrir.</strong></p>
        <a href="#pillars">Conheça Viana <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
