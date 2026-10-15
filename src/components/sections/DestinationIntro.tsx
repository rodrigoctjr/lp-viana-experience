"use client";

import Image from "next/image";
import { DirectionArrow } from "@/components/ui/DirectionArrow";
import { useDestinationExplorer } from "@/components/providers/DestinationExplorerProvider";

const scenes = [
  { src: "/images/viana/estacao.jpg", alt: "Locomotiva histórica e fachada amarela da Estação Ferroviária de Viana", title: "Histórias que permanecem", place: "Estação Ferroviária de Viana", cta: "Conhecer a história" },
  { src: "/images/atracoes/cachoeira-do-aloisio.jpg", alt: "Cachoeira do Aloísio cercada de mata, com água caindo em um poço natural", title: "Natureza para aproveitar", place: "Cachoeira do Aloísio", cta: "Explorar a natureza" },
  { src: "/images/atracoes/viana-restaurante.webp", alt: "Mesas do Viana Restaurante em um vagão de trem", title: "Sabores para descobrir", place: "Viana Restaurante", cta: "Descobrir os sabores" },
];

export function DestinationIntro() {
  const explore = useDestinationExplorer();
  return (
    <section id="conheca-viana" className="destination-intro" aria-labelledby="destination-intro-title">
      <div className="container-site">
        <div className="destination-intro-heading">
          <h2 id="destination-intro-title">Viana desponta<br />para o <em>turismo.</em></h2>
          <div><p>Casarios, monumentos e tradições guardam parte da memória capixaba. Entre trilhas, piscinas naturais e paisagens verdes, Viana também convida a aproveitar a natureza. À mesa, o passeio continua com comida caseira no fogão a lenha e cerveja artesanal produzida no município.</p><button type="button" className="destination-primary destination-explore-cta" onClick={() => explore()} aria-haspopup="dialog">Explorar Viana <DirectionArrow diagonal /></button></div>
        </div>
        <div className="destination-intro-scenes">
          {scenes.map((scene, i) => (
            <button key={scene.src} type="button" onClick={() => explore(i)} aria-haspopup="dialog" aria-label={scene.cta} className="destination-intro-link">
              <span className="destination-intro-photo"><Image src={scene.src} alt={scene.alt} fill sizes="(max-width: 767px) 90vw, 33vw" /></span>
              <span className="destination-intro-caption"><span className="destination-intro-title">{scene.title}</span><small>{scene.place}</small><span className="destination-item-cta">{scene.cta} <DirectionArrow diagonal /></span></span>
            </button>
          ))}
        </div>
        <p className="destination-photo-credit">Foto da Estação Ferroviária: Rafael Deminicis · CC BY SA 4.0.</p>
      </div>
    </section>
  );
}
