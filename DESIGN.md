---
name: Destino Viana
description: Identidade editorial e cartográfica do Viana Experience.
colors:
  paper: "#f4f3ec"
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
  photo: "4px"
  action: "5px"
  attraction: "12px"
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
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
  category-chip:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface-elevated}"
  attraction-card:
    backgroundColor: "{colors.surface-elevated}"
    textColor: "{colors.primary}"
    rounded: "{rounded.attraction}"
---

# Design System: Destino Viana

## Overview

**Creative North Star: "Destino Viana"**

Uma linguagem de atlas e ensaio fotográfico apresenta Viana como um destino a descobrir. Superfícies claras, azul profundo e fotografias grandes dão espaço à marca original e à informação do evento.

A tipografia editorial organiza os capítulos; a interface permanece direta e legível. O movimento localiza o município e acompanha a passagem entre capítulos, sem bloquear o scroll ou exigir animação para acessar conteúdo.

**Key Characteristics:**
- Abertura cartográfica com origem identificada.
- Capítulos fotográficos com espaço para leitura.
- Marca original preservada e ações reconhecíveis.

## Colors

A areia sustenta a leitura, o azul profundo cria os capítulos escuros e o verde conecta a paisagem. Os valores normativos estão no frontmatter; os aliases legados continuam no CSS para os fluxos existentes.

### Primary
- **Azul editorial** (`primary`): títulos, ações principais e navegação.
- **Azul de atlas** (`primary-deep`): mapa e programação.

### Secondary
- **Verde mineral** (`hop`): destaques de natureza e hover da ação do hero.

### Tertiary
- **Coral terra** (`accent`, `accent-hover`): data sobre areia e ações dos componentes compartilhados.
- **Coral iluminado** (`accent-sun`): ênfases sobre azul profundo.

### Neutral
- **Areia** (`paper`): fundo de leitura e texto claro.
- **Branco** (`surface-elevated`): cartões do catálogo.
- **Mineral claro** (`mineral`): faixa fotográfica e quiz.
- **Tinta** (`ink`): texto de base.
- **Texto secundário sólido** (`secondary-text`): descrições editoriais e horários das atrações.
- **Verde claro sobre azul** (`on-dark-muted`): descrições na programação e legendas do mapa.

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

Contêiner com largura máxima de 1440px e espaço lateral fluido. Os capítulos compartilhados usam 96px de respiro vertical, passando a 128px a partir de 640px; programação e fechamento usam 100px. O hero em desktop combina duas colunas proporcionais (.95fr / 1.05fr), com marca e informação ao lado do mapa.

Até 767px, o mapa ocupa a primeira linha e revela pin e data na tela inicial; marca completa, textos e ações vêm em seguida. O mapa tem altura mínima de 510px. Os pilares deixam o escalonamento de 80/160px e passam a uma coluna; a programação e o fechamento também se empilham. O menu substitui a navegação desktop. Entre 768px e 1100px, a navegação permanece e a ação lateral do cabeçalho fica oculta.

## Elevation & Depth

O sistema usa contraste de superfícies e fotografia como profundidade. Cartões de atrações têm borda fina e nenhuma sombra; o menu móvel usa sombra discreta para separar o painel do conteúdo. Curvas de água são decorativas e não interceptam interação. A textura de grão legada está desativada.

## Shapes

Fotografias dos pilares usam cantos discretos; ações do hero têm curva curta e atrações têm cantos mais suaves. O mapa abre com um único canto superior esquerdo amplo (110px no desktop, 60px no celular). Filtros e contatos existentes mantêm a forma de cápsula.

## Components

### Buttons
A ação do hero usa fundo azul, hover verde, altura mínima de 48px e seta consistente. O link secundário usa linha inferior. Botões compartilhados preservam variantes coral, contorno e transparente, com foco e estados desabilitado/carregando. Controles de navegação, filtros e ações usam alvos de pelo menos 44px; essa regra não declara auditoria integral de todos os links de texto.

### Cards and filters
O catálogo conserva informações, categorias, filtros e ações existentes. Cartões usam superfície branca, borda fina, imagem em 4:3 e texto de horário sólido. Os filtros de categoria indicam seleção por preenchimento e estado acessível.

### Inputs
Campos existentes de cadastro e vouchers mantêm rótulos explícitos, bordas, estado de foco e validação dos fluxos atuais. Não redesenhar sua lógica ao aplicar os tokens.

### Navigation
Cabeçalho fixo em areia: 88px no desktop, 76px no celular. Âncoras respeitam o espaço superior de 100px. O botão móvel expande uma lista de links com linhas de 52px; foco visível acompanha a navegação por teclado.

### Cartographic opening
Malhas locais do IBGE mostram Brasil, recuo inicial e aproximação ao Espírito Santo e a Viana. O pin marca o município; a fonte cartográfica fica visível. A viagem pode ser repetida, dura 4,2s no desktop e 3s no celular e tem versão estática em movimento reduzido. A data aparece também no conteúdo textual do hero. A ordem mobile e esses tempos são decisões desta superfície; novos usos do sistema devem respeitar seu próprio contexto.

**The Motion Rule.** Preserve a informação e as ações acessíveis durante o movimento; com movimento reduzido, mostre o destino estático e retire deslocamentos decorativos.

## Do's and Don'ts

### Do:
- Do preservar as imagens originais da marca e a data confirmada.
- Do manter foco visível e controles com espaço de toque.
- Do usar fotografias com alternativas e créditos existentes.
- Do oferecer o destino estático quando houver preferência por movimento reduzido.

### Don't:
- Don't usar animação como espera obrigatória para conteúdo ou ações.
- Don't exigir hover para ler informações ou operar fluxos.
- Don't apresentar o pin municipal como endereço do evento ou rota de transporte.
