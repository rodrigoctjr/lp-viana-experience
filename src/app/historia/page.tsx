import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { DirectionArrow } from "@/components/ui/DirectionArrow";
import { destinationStories } from "@/data/destination-stories";

export const metadata: Metadata = {
  title: "História e Cultura de Viana | Viana Experience",
  description: "Conheça os rios, as comunidades e o patrimônio que fazem parte da história de Viana, no Espírito Santo.",
};

export default function HistoryPage() {
  return (
    <>
      <Header homePath="/" />
      <main id="top" className="history-page">
        <div className="container-site">
          <Link href="/#pillars" className="history-back">Voltar para Viana <DirectionArrow /></Link>
          <header className="history-heading">
            <h1>Histórias que<br /><em>permanecem vivas.</em></h1>
            <p>Casarios, rios e tradições ajudam a contar a trajetória de Viana. Uma memória construída por diferentes povos, que continua presente nos caminhos da cidade.</p>
          </header>
          <figure className="history-cover">
            <div><Image src="/images/viana/igreja-matriz-atual.png" alt="Igreja Matriz de Viana, com fachada clara e portas azuis" fill priority sizes="(max-width: 767px) 90vw, 90vw" /></div>
            <figcaption>Igreja Matriz de Viana. Imagem fornecida para o projeto.</figcaption>
          </figure>
          <article className="history-reading" aria-label="História e Cultura de Viana">
            {destinationStories[0].details.map(section => <section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <div className="history-invitation"><h2>A história continua no passeio.</h2><p>Encontre os caminhos para conhecer Viana de perto.</p><Link href="/#atracoes" className="destination-primary">Explorar as atrações <DirectionArrow diagonal /></Link></div>
          </article>
        </div>
      </main>
      <Footer homePath="/" />
    </>
  );
}
