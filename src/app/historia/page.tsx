import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";
import { DirectionArrow } from "@/components/ui/DirectionArrow";

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
            <h2>Os rios e os primeiros caminhos</h2>
            <p>A história de Viana passa pelos rios Jucu e Santo Agostinho. Entre o final do século XVI e o início do século XVII, portugueses partiram de Vila Velha e seguiram pelo Jucu em canoas, em busca de ouro. Uma das primeiras passagens teria ocorrido por Araçatiba, antes de seguirem até a região onde hoje fica a sede do município.</p>
            <p>A região já era habitada por povos indígenas, entre eles os Puris. Ao longo do tempo, a presença indígena, africana, jesuíta e de imigrantes europeus contribuiu para a formação de um patrimônio material, cultural e natural que pode ser conhecido pelos visitantes.</p>
            <h2>Povos que construíram essa história</h2>
            <p>Viana participou do início da imigração europeia oficial no Espírito Santo, em fevereiro de 1813. Os traços culturais dos Açores e a presença de povos germânicos e italianos fazem parte da memória do município.</p>
            <p>Paulo Fernandes Viana trouxe dos Açores 53 famílias, que receberam terrenos, casas, ferramentas, carros de bois ou cavalgaduras. As famílias se instalaram nas proximidades do Rio Jucu e de seus afluentes, Formate e Santo Agostinho. Iniciaram o cultivo de trigo e arroz e ampliaram as culturas de milho e mandioca, já conhecidas pelos povos indígenas.</p>
            <p>Os açorianos também foram chamados para atuar no trabalho agrícola e na ocupação das margens da estrada que ligaria Vitória a Minas Gerais. As contribuições dos diferentes grupos permanecem nos costumes, nas manifestações culturais e nos casarios que resistem ao tempo.</p>
            <h2>O porto, a igreja e o nome da cidade</h2>
            <p>Às margens do Rio Santo Agostinho, ao sul da cidade, o Porto da Igreja foi um ponto de comércio e circulação de mercadorias. Por ele chegaram materiais para a construção da Igreja Matriz, objetos religiosos e a imagem de Nossa Senhora da Conceição.</p>
            <p>O capelão Frei Francisco Nascimento Teixeira recebeu terras do governo e foi encarregado de fundar um núcleo populacional. A localidade, antes chamada Jabaeté, recebeu o nome de Viana em homenagem a Paulo Fernandes Viana.</p>
            <h2>Uma memória para visitar</h2>
            <p>O município foi criado oficialmente em 23 de julho de 1862, ao ser desmembrado de Vitória. Hoje, seus monumentos, construções e tradições ajudam a contar essa trajetória.</p>
            <p>Em Araçatiba, o Centro de Interpretação Fazenda de Araçatiba é um dos espaços onde o visitante pode se aproximar da história local. No centro de Viana, a Igreja Matriz também convida a observar as marcas do tempo e a conhecer a memória da cidade.</p>
            <div className="history-invitation"><h2>A história continua no passeio.</h2><p>Encontre os caminhos para conhecer Viana de perto.</p><Link href="/#atracoes" className="destination-primary">Explorar as atrações <DirectionArrow diagonal /></Link></div>
          </article>
        </div>
      </main>
      <Footer homePath="/" />
    </>
  );
}
