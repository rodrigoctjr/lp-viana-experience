import { DirectionArrow } from "@/components/ui/DirectionArrow";
import { NatureTransition } from "@/components/ui/NatureTransition";
import { NatureBackdrop } from "@/components/ui/NatureBackdrop";
import { WHATSAPP_INSTITUTIONAL } from "@/lib/constants";
export function ImpactCta() {
  return <section id="impacto" className="destination-close"><NatureTransition /><NatureBackdrop /><div className="container-site destination-close-grid relative z-10"><div><h2>Venha pra Viana.<br /><em>Estamos te esperando.</em></h2><p>No Dia D do Turismo, descubra a história, aproveite a natureza e experimente os sabores de Viana.</p><div className="destination-actions"><a href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`} target="_blank" rel="noopener noreferrer" className="destination-primary">Quero estar lá <DirectionArrow diagonal /></a><a href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`} target="_blank" rel="noopener noreferrer" className="destination-secondary">Fale conosco</a></div></div><div className="close-date">08.11<span>Domingo, 8 de novembro de 2026<br />Viana, Espírito Santo</span></div></div></section>;
}
