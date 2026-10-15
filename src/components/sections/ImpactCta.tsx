import { DirectionArrow } from "@/components/ui/DirectionArrow";
import { NatureTransition } from "@/components/ui/NatureTransition";
import { NatureBackdrop } from "@/components/ui/NatureBackdrop";
import { WHATSAPP_INSTITUTIONAL } from "@/lib/constants";
export function ImpactCta() {
  return <section id="impacto" className="destination-close"><NatureTransition /><NatureBackdrop /><div className="container-site destination-close-grid relative z-10"><div><h2>O caminho termina.<br /><em>A história começa.</em></h2><p>8 de novembro. Um dia inteiro. A cidade abre por dentro, e a próxima decisão é se você entra.</p><div className="destination-actions"><a href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`} target="_blank" rel="noopener noreferrer" className="destination-primary">Quero estar lá <DirectionArrow diagonal /></a><a href={`https://wa.me/${WHATSAPP_INSTITUTIONAL}`} target="_blank" rel="noopener noreferrer" className="destination-secondary">Fale conosco</a></div></div><div className="close-date">08.11<span>Domingo, 8 de novembro de 2026<br />Viana, Espírito Santo</span></div></div></section>;
}
