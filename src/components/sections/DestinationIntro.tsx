import Image from "next/image";
import Link from "next/link";
import { DirectionArrow } from "@/components/ui/DirectionArrow";

const scenes = [
  { src: "/images/viana/estacao.jpg", alt: "Locomotiva histórica e fachada amarela da Estação Ferroviária de Viana", title: "Histórias que permanecem", place: "Estação Ferroviária de Viana", href: "/historia" },
  { src: "/images/atracoes/cachoeira-do-aloisio.jpg", alt: "Cachoeira do Aloísio cercada de mata, com água caindo em um poço natural", title: "Natureza para aproveitar", place: "Cachoeira do Aloísio", href: "#atracoes" },
  { src: "/images/atracoes/viana-restaurante.webp", alt: "Mesas do Viana Restaurante em um vagão de trem", title: "Sabores para descobrir", place: "Viana Restaurante", href: "#atracoes" },
];

export function DestinationIntro() {
  return (
    <section id="conheca-viana" className="destination-intro" aria-labelledby="destination-intro-title">
      <div className="container-site">
        <div className="destination-intro-heading">
          <h2 id="destination-intro-title">Viana desponta<br />para o <em>turismo.</em></h2>
          <p>Casarios, monumentos e tradições guardam parte da memória capixaba. Entre trilhas, piscinas naturais e paisagens verdes, Viana também convida a aproveitar a natureza. À mesa, o passeio continua com comida caseira no fogão a lenha e cerveja artesanal produzida no município.</p>
        </div>
        <div className="destination-intro-scenes">
          {scenes.map(scene => (
            <Link key={scene.src} href={scene.href} className="destination-intro-link">
              <figure>
                <div className="destination-intro-photo"><Image src={scene.src} alt={scene.alt} fill sizes="(max-width: 767px) 90vw, 33vw" /></div>
                <figcaption><span>{scene.title} <DirectionArrow diagonal /></span><small>{scene.place}</small></figcaption>
              </figure>
            </Link>
          ))}
        </div>
        <p className="destination-photo-credit">Foto da Estação Ferroviária: Rafael Deminicis · CC BY SA 4.0.</p>
      </div>
    </section>
  );
}
