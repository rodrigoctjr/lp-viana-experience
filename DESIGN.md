---
name: Destino Viana
description: Identidade editorial e cartográfica do Viana Experience.
colors:
  paper: "#f4f3ec"
  warm-sand: "#f8e7ce"
  sky-background: "#d5e8ed"
  mint-background: "#d7e7cf"
  coral-background: "#f0bc9e"
  lime-background: "#eef1dc"
  honey-background: "#f3dda0"
  lilac-background: "#e6def1"
  peach-emphasis: "#703522"
  peach-secondary-text: "#344e50"
  surface-elevated: "#ffffff"
  mineral: "#dfe8df"
  primary: "#143c42"
  primary-deep: "#082a34"
  ink: "#14343b"
  secondary-text: "#476267"
  hop: "#326650"
  accent: "#b84732"
  accent-hover: "#963923"
  accent-sun: "#f7ab8c"
  on-dark-muted: "#b9d5c9"
typography:
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(34px, 4.6vw, 66px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "30px"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
rounded:
  photo: "28px"
  action: "999px"
  attraction: "24px"
  photo-strip: "22px"
  quiz-answer: "20px"
  game: "24px"
  map: "0px"
spacing:
  gutter: "clamp(22px, 5vw, 80px)"
  chapter: "96px"
  chapter-wide: "128px"
components:
  destination-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-elevated}"
    typography: "{typography.label}"
    rounded: "{rounded.action}"
    padding: "15px 20px"
  destination-primary-hover:
    backgroundColor: "{colors.hop}"
  destination-secondary:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.surface-elevated}"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-secondary:
    textColor: "{colors.ink}"
  button-ghost:
    textColor: "{colors.paper}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  navigation:
    backgroundColor: "{colors.warm-sand}"
    textColor: "{colors.ink}"
  category-chip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-elevated}"
  nature-backdrop:
    textColor: "{colors.hop}"
  attraction-card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.primary}"
    rounded: "{rounded.attraction}"
---

# Design System: Destino Viana

## Overview

**Creative North Star: "Destino Viana"**

Uma linguagem de atlas e ensaio fotográfico apresenta Viana como um destino a descobrir. Capítulos em cores claras, texto navy e fotografias grandes dão espaço à marca original e à informação do evento. A abertura usa o atlas como introdução e termina no conteúdo centralizado sobre o fundo de natureza.

A tipografia editorial organiza os capítulos; a interface permanece direta e legível. O movimento localiza o município, encerra o mapa e acompanha a centralização do hero e a passagem entre capítulos, sem bloquear o scroll ou exigir animação para acessar conteúdo.

**Key Characteristics:**
- Abertura cartográfica com origem identificada.
- Capítulos fotográficos com espaço para leitura.
- Marca original preservada e ações reconhecíveis.

## Colors

A areia quente acolhe a marca; azul claro, verde, pêssego, lima clara, mel e lilás distinguem os capítulos. O azul profundo permanece no atlas e nos textos navy. Os valores normativos estão no frontmatter; os aliases legados continuam no CSS para os fluxos existentes.

### Primary
- **Azul editorial** (`primary`): títulos, ações principais e navegação.
- **Azul de atlas** (`primary-deep`): mapa e estrutura de contraste.

### Secondary
- **Verde mineral** (`hop`): destaques de natureza e hover da ação do hero.

### Tertiary
- **Coral terra** (`accent`, `accent-hover`): data sobre areia e ações dos componentes compartilhados.
- **Coral iluminado** (`accent-sun`): data sobre o azul profundo do mapa introdutório.
- **Terra sobre pêssego** (`peach-emphasis`): ênfase no título e ícones da programação.

### Neutral
- **Areia** (`paper`): base legada de leitura e texto claro.
- **Areia quente** (`warm-sand`): hero, cabeçalho e menu móvel.
- **Azul claro** (`sky-background`): faixa fotográfica e jogo.
- **Verde claro** (`mint-background`): pilares.
- **Pêssego** (`coral-background`): Dia D, com títulos e corpo em navy.
- **Lima clara** (`lime-background`): atrações.
- **Mel** (`honey-background`): quiz.
- **Lilás** (`lilac-background`): fechamento.
- **Branco** (`surface-elevated`): cartões do catálogo.
- **Mineral claro** (`mineral`): base mineral anterior, mantida no CSS sob as substituições de capítulo.
- **Tinta** (`ink`): texto de base.
- **Texto secundário sólido** (`secondary-text`): descrições editoriais e horários das atrações.
- **Verde claro sobre azul** (`on-dark-muted`): legendas do mapa.
- **Texto sobre pêssego** (`peach-secondary-text`): descrições e informação de data da programação.

**The Legibility Rule.** Preserve o texto secundário sólido nas superfícies claras e avalie cada combinação de texto e fundo antes de reduzir sua opacidade.

## Typography

**Display Font:** DM Serif Display, com Georgia e serif como alternativas.

**Body Font:** Bricolage Grotesque, com system-ui e sans-serif como alternativas.

DM Serif Display dá caráter aos títulos; Bricolage organiza interface, data, números e leitura. A marca no título é uma imagem existente. JetBrains Mono e Alfa Slab One permanecem carregadas para compatibilidade; as classes de rótulo e contagem são sobrescritas por Bricolage na direção atual.

### Hierarchy
- **Headline:** capítulos editoriais; escala e espaçamento definidos no frontmatter.
- **Title:** títulos dos pilares. Os cartões de atrações usam Bricolage (26px, peso 600).
- **Body:** base do site. Descrições editoriais usam 14–16px e entrelinha 1,7.
- **Label:** ações do hero. Data e números usam Bricolage com espaçamento mais compacto nas escalas grandes.

## Layout

Contêiner com largura máxima de 1440px e espaço lateral fluido. Os capítulos compartilhados usam 96px de respiro vertical, passando a 128px a partir de 640px; programação e fechamento usam 100px. Durante a introdução, o mapa ocupa toda a capa, com chamada de campanha e data sobrepostas. Após a saída e remoção do mapa, uma coluna centraliza marca, título, descrição, data e ações. A composição interna da data mantém texto à esquerda.

Até 767px, o mapa ocupa a mesma área da capa, com chamada na base e opção Pular abertura no alto. Os pilares deixam o escalonamento de 80/160px e passam a uma coluna; a programação e o fechamento também se empilham. Marca, título, parágrafo, bloco de data e ações ficam centralizados no hero móvel; o texto dentro da data mantém alinhamento à esquerda. O menu substitui a navegação desktop. Entre 768px e 1100px, a navegação permanece e a ação lateral do cabeçalho fica oculta.

## Elevation & Depth

O sistema usa contraste de superfícies e fotografia como profundidade. Cartões de atrações têm borda fina e nenhuma sombra; o menu móvel usa sombra discreta para separar o painel do conteúdo. Curvas de água e folhagens são decorativas e não interceptam interação. NatureBackdrop aparece no hero, nos capítulos compartilhados, no Dia D e no fechamento. Folhas oscilam em ciclos de 14s e água em 18s, usando transform; useInView pausa os ciclos fora do viewport. Em movimento reduzido, os fundos ficam estáticos. A textura de grão legada está desativada.

## Shapes

Fotografias dos pilares usam cantos de 28px; cartões de atrações, 24px; a fotografia da faixa, 22px. Ações, botões, replay e contatos adotam cápsulas (999px), com exceção das respostas do quiz (20px). O contêiner do jogo usa 24px. O mapa é a exceção explícita: todos os cantos são retos (0px), em qualquer breakpoint. O quadro reto existe somente durante a introdução e é removido ao concluir a saída.

## Components

### Buttons
A ação do hero usa fundo azul, hover verde, altura mínima de 48px e seta consistente. O link secundário usa contorno completo, padding de 12px 20px e forma de cápsula. Botões compartilhados preservam variantes coral, contorno e transparente, com foco e estados desabilitado/carregando. Controles de navegação, filtros e ações usam alvos de pelo menos 44px; essa regra não declara auditoria integral de todos os links de texto.

### Cards and filters
O catálogo conserva informações, categorias, filtros e ações existentes. Cartões usam superfície branca, borda fina, imagem em 4:3 e texto de horário sólido. Os filtros de categoria indicam seleção por preenchimento e estado acessível.

### Inputs
Campos existentes de cadastro e vouchers mantêm rótulos explícitos, bordas, estado de foco e validação dos fluxos atuais. Não redesenhar sua lógica ao aplicar os tokens.

### Navigation
Cabeçalho fixo em areia quente: 88px no desktop, 76px no celular. Âncoras respeitam o espaço superior de 100px. O botão móvel expande uma lista de links com linhas de 52px; foco visível acompanha a navegação por teclado.

### Nature backgrounds
Fundos de folhas e água acrescentam movimento discreto atrás do conteúdo, com camadas isoladas e sem alvos de interação. São pausados fora de vista e estáticos em movimento reduzido. Essa ambientação complementa as transições entre capítulos.

### Cartographic opening
Malhas locais do IBGE mostram uma aproximação contínua do Brasil até Viana em 2s, sem recuo ou pausas intermediárias, terminando em viewBox 858.4 630 8 10. Pin e rótulo compensam o zoom por escala inversa, surgem desde o começo da viagem e permanecem até o fade. O mapa ocupa toda a capa; chamada do Dia D, data e Pular abertura compõem a introdução. O pin indica o município, não o endereço de um evento.

O encerramento segue as fases mapping → fading → centered. O pin permanece visível até o fim do zoom e sai junto com o mapa. O callback real de conclusão do zoom inicia o fade-out do mapa (0,65s); após a remoção do quadro, a conclusão da saída dispara a centralização dos grupos por Motion layout (0,85s, ease-out). Não há fotografia de chegada. O estado final reúne marca, título, descrição, data e ações sobre o fundo de natureza. O subtítulo é “Dia D do Turismo. Viva Viana.”.

O botão Rever viagem continua disponível fora do mapa removido e reinicia a introdução. O identificador da jornada ignora callbacks antigos de replays. A data permanece no conteúdo textual do hero. Em movimento reduzido, zoom, fade e reposicionamento têm duração zero: o hero chega imediatamente ao conteúdo centralizado e a natureza fica estática. A ordem mobile e esses tempos são decisões desta superfície; novos usos do sistema devem respeitar seu próprio contexto.

**The Motion Rule.** Preserve a informação e as ações acessíveis durante o movimento; com movimento reduzido, mostre o conteúdo centralizado imediatamente e retire deslocamentos decorativos.

## Do's and Don'ts

### Do:
- Do preservar as imagens originais da marca e a data confirmada.
- Do manter foco visível e controles com espaço de toque.
- Do usar fotografias com alternativas e créditos existentes.
- Do oferecer o conteúdo centralizado imediatamente quando houver preferência por movimento reduzido.

### Don't:
- Don't usar animação como espera obrigatória para conteúdo ou ações.
- Don't exigir hover para ler informações ou operar fluxos.
- Don't apresentar o pin municipal como endereço do evento ou rota de transporte.

A capa do hero ocupa a altura dinâmica da tela, incluindo o cabeçalho. A faixa fotográfica fica abaixo da capa. O mapa móvel usa a mesma área do conteúdo, sem empilhar uma segunda tela durante a introdução. Telas baixas recebem espaçamento e marca compactos; conteúdo ampliado por acessibilidade pode expandir a capa para preservar a leitura.

As marcas Descubra Viana e Prefeitura de Viana aparecem em faixa clara na base da capa e no rodapé, com proporções originais. A capa reserva 80px no desktop e 72px no celular para essa assinatura institucional.

A chegada cartográfica agora revela a foto atual da Igreja Matriz em toda a capa. O estado hero-photographic usa branco quente no título, amarelo solar na ênfase, data e ação principal, sombra verde sobre a foto e a marca original em fundo claro. A foto entra junto ao fade do mapa e acomoda uma aproximação de escala 1,08 para 1 em 2,4s, sem loop; movimento reduzido apresenta a fotografia estática. Logos institucionais, duração da câmera, pin e replay permanecem.

A antiga faixa de foto após o hero dá lugar à apresentação em azul claro com título, resumo e três fotografias escalonadas: estação, cachoeira e restaurante. No celular, as imagens se empilham com legendas visíveis. O terceiro pilar passa a Sabores de Viana. A página /historia usa leitura editorial de até 68ch, foto atual da igreja, cabeçalho e rodapé com âncoras para a página inicial. Fechamento: Venha pra Viana. Estamos te esperando.

As duas seções de apresentação usam o explorador compartilhado em overlay. CTAs preenchidos e fotos abrem história, natureza ou sabores no próprio contexto. Popup com imagem acima do texto, leitura rolável e controles fixos, setas, indicadores, teclado e gesto móvel. A história completa expande dentro do popup. Sem reprodução automática ou navegação para outra página no fluxo principal.

Os seis acessos individuais ao explorador exibem ação textual em cápsula preenchida, além das entradas gerais. O popup tem largura máxima de 700px e altura máxima de 820px, respeitando a tela; fotografia de até 220px, leitura rolável e controles persistentes.
