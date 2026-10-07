---
status: draft
version: 1.1.0
author: ux-agent
skills_used:
  - ux-agent
  - ui-craft
  - impeccable
  - design-spec-extraction
  - writing-clearly-and-concisely
  - frontend-viability-review
assets:
  - docs/design/references/poster-desktop.jpg
  - docs/design/references/poster-mobile.png
---

# Viana Experience — hero em construção (v2)

> Versão 1.1.0 · Status: draft · Gerado por ux-agent

A 1.1.0 incorpora os cartazes oficiais. O retrato (`poster-mobile.png`, 573×1024) é uma composição própria. O landscape (`poster-desktop.jpg`, 1024×581) não é reduzido para caber no celular.

Dois pontos ficam sujeitos ao delta do frontend, e só estes: o retângulo de clip da line-art no retrato, e o tamanho das folhas que invadem o creme. O resto está fechado.

## O que a imagem mostra

Medido no pixel, não estimado.

| | Desktop 1024×581 | Retrato 573×1024 |
| --- | --- | --- |
| Campo | `#FDF6E6` no centro | `#FEF8EA` no centro |
| Pílula | Caixa x 726–943, y 38–68. Miolo amostrado `#B15030` / `#AF4E2D` | Caixa x 183–413, y 100–130. Miolo amostrado `#B2452E` / `#AF452D` |
| Texto da pílula | Claro, média `#FEEDED`. Nenhum pixel terracota no miolo do texto | Claro, média `#FEE9DB`. A faixa horizontal de terracota quebra onde entram as letras |
| Fora da pílula | Creme (`#FCF9EA` acima, `#FEF7E7` abaixo) | Creme (`#FDFAE9` acima, `#FFF6E9` abaixo) |

As duas pílulas são preenchidas de terracota, com texto claro. Nenhuma é contorno com miolo creme e texto terracota. O texto claro da arte é um branco quente por causa do antialias sobre o terracota. Na implementação o par é `--color-on-accent` `#FFFFFF` sobre `--color-soon-terra` `#B24A28` (5,38:1). Não criar token para o branco quente da amostra.

A pílula do desktop senta no creme, canto superior direito, perto da onda. Não é uma barra de ponta a ponta. No retrato ela é centrada, abaixo da onda e acima do wordmark.

A cruz do retrato: horizontal perto de y 642, cor amostrada `#B7B4A1`, de x 104 a x 472. Vertical perto de x 288, cor amostrada `#C9C6B3`. As duas mapeiam para `--color-soon-line` `#B0A68C`. Não criar token. No desktop as quatro atividades ficam em linha, sem cruz.

Folhas do retrato saem da faixa e entram no creme. À direita descem até cerca de y 389 (altura do “Dia D”). À esquerda do topo, até cerca de y 249 (ao lado do wordmark). Não cobrem o miolo do título.

## Acordos que continuam válidos

- Sem `public/poster/frame-*.webp`. Sem artboard em porcentagem. Sem listener de `resize`. Sem `h-[100svh]` com `overflow: hidden`. Sem `max-height: 100svh` na seção.
- Fundo em duas faixas SVG curtas (topo e base), `slice` na borda que encontra o creme. `preserveAspectRatio` de um cartaz 1024×579 inteiro continua vetado. Sem filtro, sem grain, sem canvas.
- Texto composto só em Bricolage Grotesque. Wordmark é PNG (`Viana` + pingo). `EXPERIENCE` é HTML, peso 600, tracking no elemento, centralizado. Piso 24px. Sem DM Serif Display e sem Alfa Slab One neste hero.
- Recortar a legenda dos PNG de atividade na faixa vazia. Legenda em HTML. Manter o disco. Não cortar logos nem letras do wordmark. Não recolorir o wordmark. Teto visual do ícone: 160px.
- `next/image`. `priority` só no wordmark.
- CTA é `<a href="#quiz">`, texto “Ver os desafios”, alvo mínimo 44×44px. A pílula não é o CTA e não some. O jogo permanece `#jogo`. Não editar `QuizTotemSection` nem `RunnerGameSection`.
- Hero: `min-height: 100svh` e `height: auto`. Em tela curta a seção cresce. Não corta selos nem rótulos. Nada desta zona é `sticky`.
- `--color-soon-cream` é `#FDF6E7`. Não criar token novo. O disco das atividades continua ~`#ECE4C8`.
- `h1` visível: “Site em construção”, dentro da pílula. “Dia D do Turismo em Viana/ES” é parágrafo e é maior que o `h1`. O `h2` seguinte é o do quiz. Proibido `h1` só para leitor de tela.
- Folhas são 4 a 6 `<symbol>` simples, sem nervura. A onda e o filete terracota são obrigatórios. O tamanho das folhas que entram no creme fica sujeito ao delta do frontend.

## O que a 1.1.0 substitui na 1.0.0

- A barra terracota full-bleed sai. No lugar entra a pílula da referência.
- A line-art também existe no retrato. O veto “sumir abaixo de 768” cai. Ela fica clipada à banda do título. A grade 2×2 permanece limpa.
- O apoio “Quiz e jogo já estão abertos.” não entra abaixo de 1024px. Não empilha um terceiro bloco sobre o wordmark.

## Objetivo

O hero informa que o site está em construção e leva o visitante aos desafios que já existem.

Ação principal: “Ver os desafios” (`href="#quiz"`). O quiz é o primeiro desafio. O jogo é a seção seguinte. O `href` não aponta para os dois.

Sucesso: em 390×844, 768×1024, 1024×768 e 1440×900 a pílula e o CTA cabem antes do wordmark, os selos não são cortados, e o miolo do quiz e do jogo permanece o atual.

## Público-alvo

Morador ou visitante de Viana/ES. Chega por link do Dia D, sem conta e sem menu. O celular (390px) usa o cartaz retrato. A partir de 1024px usa o cartaz landscape.

Cena: a pessoa abre o link de dia, no celular, e em dois segundos lê a pílula e encontra o CTA logo abaixo dela.

## Branding

Cartaz impresso de turismo municipal. Campo creme quente, faixas verdes orgânicas, filete terracota, folhas chapadas que invadem o creme nos cantos, line-art de rio e serra atrás do título.

Tom: direto, local, de convite. A pílula fala de obra. O cartaz fala do Dia D. O CTA é o controle que a referência não desenhou.

Anti-referências: barra terracota de ponta a ponta, landscape espremido no celular, grain, vidro, gradiente no texto, card em volta das atrações, moldura `frame-*.webp`.

| Asset | Arquivo |
| --- | --- |
| Wordmark | `public/logo/viana-wordmark.png` (6174×1478, RGBA) |
| Atividades | `public/activities/caiaque.png` (180×152), `pendulo.png` (139×147), `trilha.png` (151×137), `floresta.png` (171×140) |
| Selos | `public/brands/descubra-viana.png` (208×62), `prefeitura-viana.png` (240×101) |
| Referência landscape | `docs/design/references/poster-desktop.jpg` (1024×581). Não entra no DOM |
| Referência retrato | `docs/design/references/poster-mobile.png` (573×1024). Não entra no DOM |

Não há `PRODUCT.md` nem `DESIGN.md`. A autoridade é esta spec, os dois cartazes, o bloco `--color-soon-*` e as fontes de `src/app/layout.tsx`.

## Direção visual

Registro de marca. Variância visual 7. Densidade 4. Motion 1.

Abaixo de 1024px o hero segue o retrato: pílula centrada, CTA centrado embaixo dela, título, line-art nessa banda, grade 2×2 com cruz, selos, ondas. De 1024px em diante segue o landscape: pílula no canto superior direito, CTA na mesma linha à esquerda, quatro atividades em fila, sem cruz.

A onda é full-bleed nos dois. A pílula e o CTA ficam no creme, não em cima do verde.

## Paleta de cores

| Token | Hex | Uso |
| --- | --- | --- |
| `--color-soon-cream` | `#FDF6E7` | Campo. Valor já definido na 1.0.0. Amostra do desktop `#FDF6E6`, do retrato `#FEF8EA` |
| `--color-soon-forest` | `#1A6E36` | Faixa verde clara, “Dia D”, rótulos, “E outras experiências” |
| `--color-soon-forest-deep` | `#0F4A24` | Faixa verde escura, texto e borda do CTA, anel de foco |
| `--color-soon-terra` | `#B24A28` | Pílula, filete, `EXPERIENCE` |
| `--color-soon-dot` | `#E24B2A` | Já está no PNG do wordmark. Não redesenhar o pingo |
| `--color-soon-leaf` | `#1A6E36` | Folha |
| `--color-soon-leaf-bright` | `#2F8F4C` | Segundo verde da folha |
| `--color-soon-line` | `#B0A68C` | Line-art e cruz da grade. Decoração. 2,25:1 sobre o creme. Nunca texto |
| `--color-soon-water` | `#2F7A72` | Contorno do rio |
| `--color-soon-water-fill` | `#8FCDC4` | Miolo do rio, opacidade 0,35 |
| `--color-soon-sun` | `#F2B84B` | Disco do sol, opacidade 0,45. Sem texto |
| `--color-soon-icon` | `#E5F0E4` | Hover do CTA |
| `--color-on-accent` | `#FFFFFF` | Texto da pílula |

Contraste com o creme `#FDF6E7`:

| Par | Razão | Regra |
| --- | --- | --- |
| `#FFFFFF` sobre `#B24A28` | 5,38:1 | Texto da pílula, inclusive a 14px |
| `#0F4A24` sobre `#FDF6E7` | 9,63:1 | Texto do CTA e borda do CTA sobre o campo |
| `#1A6E36` sobre `#FDF6E7` | 5,86:1 | “Dia D”, rótulos, “E outras experiências”, a partir de 14px |
| `#B24A28` sobre `#FDF6E7` | 5,00:1 | `EXPERIENCE`. Passa AA em corpo. O piso de 24px permanece |
| `#E5F0E4` sobre `#FDF6E7` | baixo | Hover do botão. A borda forest-deep segura o contorno |
| `#6B3D2E` sobre `#B24A28` | 1,67:1 | Foco marrom global. Proibido na pílula e no CTA |
| `#B0A68C` sobre `#FDF6E7` | 2,25:1 | Line-art e cruz. Fora de texto |

Modo escuro: não se aplica. Paleta ocre do quiz não entra no hero.

## Tipografia

Neste hero, só Bricolage Grotesque (`--font-body`). DM Serif permanece nos `h2` do quiz e do jogo. Alfa Slab e JetBrains Mono ficam fora.

O wordmark não é fonte.

| Papel | Peso | 390 | 768 | 1024 | 1440 | Cor | Entrelinha | Tracking |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `h1` na pílula | 700 | 14px | 14px | 15px | 16px | `#FFFFFF` | 1 | 0,12em |
| Apoio (≥ 1024) | 500 | oculto | oculto | 16px | 16px | `#1A6E36` | 1,3 | 0 |
| CTA | 700 | 16px | 16px | 16px | 16px | `#0F4A24` | 1 | 0,01em |
| `EXPERIENCE` | 600 | 24px | 28px | 36px | 40px | `#B24A28` | 1 | 0,42em / 0,46em / 0,48em / 0,50em |
| “Dia D…” (`p`) | 700 | 22px | 26px | 32px | 36px | `#1A6E36` | 1,2 | −0,01em |
| Rótulo | 600 | 14px | 14px | 15px | 16px | `#1A6E36` | 1,25 | 0 |
| “E outras experiências” | 500 | 16px | 16px | 18px | 18px | `#1A6E36` | 1,3 | 0 |

O `h1` é a frase “Site em construção”. `text-transform: uppercase` pinta “SITE EM CONSTRUÇÃO”, como nos dois cartazes. O leitor de tela lê a frase em sentença.

`EXPERIENCE` é um `<p>` com `text-align: center` e `letter-spacing`. Proibido fatiar em `<span>` com `justify-between`.

“Dia D” é maior que o `h1` em todos os breakpoints. O tamanho não promove o parágrafo a heading.

O apoio, quando existe, é forest sobre creme (5,86:1). Ele não senta na pílula. Texto: “Quiz e jogo já estão abertos.”

## Espaçamentos e grid

Base 4px. Escala do hero: 4, 8, 12, 16, 20, 24, 32, 48.

| Breakpoint | Largura | Composição |
| --- | --- | --- |
| mobile | 390 | Retrato. Pílula centrada. CTA abaixo. Grade 2×2 com cruz. Line-art só na banda do título |
| tablet | 768 | O mesmo retrato, com mais ar. Ícone até o teto de 160px. Apoio ainda oculto |
| desktop | 1024 | Landscape. Pílula no canto direito. CTA à esquerda, na mesma linha. Apoio no meio se couber numa linha. Quatro atividades, sem cruz |
| wide | 1440 | Igual ao desktop. Miolo do título e da grade até 1120px. Faixas full-bleed |
| ultra-wide | > 1440 | Conteúdo travado em 1120px. Tipo não cresce além da coluna 1440 |

Altura: `min-height: 100svh; height: auto`. Se os selos passarem de 390×844, a seção cresce. Não cortar.

Faixas: no retrato, superior 56px e inferior 88px, mais as folhas que saem delas. No landscape, `clamp(48px, 10vh, 112px)` cada.

## Componentes

### Pílula “Site em construção”

- Não é link. Não é botão. É o `h1`. `cursor: default`. Sem hover. Sem `href`.
- Fundo `#B24A28`. Texto `#FFFFFF`. Cápsula, `border-radius: 999px`.
- Padding: 8px 16px no retrato, 8px 18px no landscape. Altura resultante cerca de 32–36px. A pílula da arte tem ~30px na imagem-fonte. Não reduzir o texto abaixo de 14px para imitar esse tamanho.
- Largura: a do texto. Centralizada abaixo de 1024px. No landscape, canto superior direito do creme, inset 48px da borda direita em 1024px e 64px em 1440px. A base da pílula fica no creme, não sobre o verde.
- Abaixo de 1024px, margin-top 12px depois da faixa superior.

A forma de pílula parece clicável. O único controle é o CTA. A pílula não muda de cor.

### CTA “Ver os desafios”

Decisão provisória de posição, fechada nesta spec até o frontend dizer o contrário do lugar, não do desenho.

- Elemento `<a href="#quiz">`.
- Abaixo de 1024px: centrado, imediatamente abaixo da pílula e acima do wordmark. Gap de 8px sob a pílula e 16px acima do wordmark.
- De 1024px em diante: na mesma linha da pílula, à esquerda, no creme superior. Inset esquerdo 48px (1024) ou 64px (1440). A onda continua full-bleed por trás. A linha não é uma barra terracota.
- Cápsula creme, texto forest-deep, `min-width: 44px`, `min-height: 44px`.
- Borda 2px `#0F4A24`. O fundo creme do botão é o mesmo do campo. Sem a borda o controle some. A borda mede 9,63:1 sobre `#FDF6E7`.
- Padding: 10px 16px abaixo de 1024px. 12px 20px de 1024px em diante. No retrato o botão não estica a 100% da tela.
- `scroll-margin-top: 16px` em `#quiz`, em CSS fora de `QuizTotemSection`.

| Estado | Fundo | Texto | Outro |
| --- | --- | --- | --- |
| Default | `#FDF6E7` | `#0F4A24` | Borda 2px `#0F4A24`. Sem sombra |
| Hover | `#E5F0E4` | `#0F4A24` | Só `background-color`, 120ms, `ease-out`. Borda permanece. Sem `translate` |
| Active | `#FDF6E7` | `#0F4A24` | `box-shadow: inset 0 0 0 2px #0F4A24`. Sem `scale` |
| Focus-visible | igual ao default | igual | Além da borda: 2px de creme e mais 2px `#0F4A24` por fora (`box-shadow: 0 0 0 2px #FDF6E7, 0 0 0 4px #0F4A24`). O anel que se vê sobre o campo é forest-deep, 9,63:1. Distinto do hover. Não herda o outline marrom |
| Visitado | igual ao default | `#0F4A24` | Sem roxo de link |
| Disabled, loading, erro | não se aplicam | | Não há envio |

Em `prefers-reduced-motion: reduce`, a troca de cor dura 0ms.

O anel creme-por-fora da 1.0.0 servia para uma barra terracota. Essa barra saiu. O creme de 2px fica entre a borda e o anel externo, para o foco não colar no botão.

### Apoio

- Só de 1024px em diante, na mesma linha, entre o CTA e a pílula.
- `white-space: nowrap`. Cor `#1A6E36`. Uma linha.
- A zona é um container (`container-type: inline-size`). Se a coluna do meio ficar menor que 17,5rem (280px), o apoio vai para `display: none`. Sem reticências. Sem listener de `resize`.
- Quando o apoio não está visível, o CTA não leva `aria-describedby`. Quando está, `aria-describedby="desafios-apoio"`.
- Abaixo de 1024px o apoio não existe. Não empilhar pílula, apoio e CTA.

### Wordmark

- `next/image`, `priority`, `alt="Viana"`.
- Largura: 240px (390), 300px (768), 400px (1024), 480px (1440). Altura automática (razão 6174/1478 ≈ 4,18).
- Não usar os 6174px nativos como largura de layout.
- Não cortar letras nem o pingo. Não recolorir.

### EXPERIENCE e “Dia D”

- `EXPERIENCE`: `<p>`, Bricolage 600, `#B24A28`, piso 24px, tracking da tabela, centralizado. Não é heading.
- “Dia D do Turismo em Viana/ES”: `<p>`. Abaixo de 1024px, duas linhas, `max-width: 18rem`, quebra depois de “Turismo”. De 1024px em diante, uma linha se couber.
- Os dois são maiores que o `h1`.

### Line-art

- SVG, `aria-hidden="true"`, `pointer-events: none`. Sem `filter`.
- Rio à esquerda, serra, sol e pássaros à direita. Traço 1px no retrato, 1,5px em 1440px. Serra e pássaros em `#B0A68C`. Rio: preenchimento `#8FCDC4` a 0,35, contorno `#2F7A72`. Sol: miolo `#F2B84B` a 0,45.
- Abaixo de 1024px a line-art existe. Fica clipada à banda do título (wordmark + `EXPERIENCE` + “Dia D”). A grade 2×2 fica limpa, sem traço atrás dos discos.
- Banda no 390, em px aproximados, a partir do topo do bloco do título (não a partir da onda):
  - 8px de creme acima do wordmark
  - wordmark ~57px de altura (240 / 4,18)
  - 8px
  - `EXPERIENCE` 24px
  - 8px
  - “Dia D” em duas linhas, ~53px
  - 16px de creme abaixo da segunda linha
  - altura do clip ≈ 174px
  - largura: a da seção
  - a grade começa depois desse clip, com pelo menos 20px de creme limpo
- Esse retângulo de 174px é o ponto sujeito ao delta do frontend. Não mover a line-art para trás da grade enquanto o delta não chegar.
- De 1024px em diante a line-art fica atrás do wordmark, de `EXPERIENCE` e de “Dia D”, estendendo-se às laterais do miolo, e para acima da fila de atividades. Os ícones não levam traço por cima.

### Grade de atividades

- `<ul>` com quatro `<li>`. `img` com `alt=""`. Rótulo no `<p>`.
- `next/image` sem `priority`.
- Largura do ícone: 112px (390), 160px (768, teto), 128px (1024), 140px (1440). Nunca acima de 160px.
- Recorte na faixa vazia, largura inteira, a partir do topo:

| Arquivo | Fonte | Manter | Descartar | Razão |
| --- | --- | --- | --- | --- |
| `caiaque.png` | 180×152 | y 0–100 | y 101–152 | 180/100 |
| `pendulo.png` | 139×147 | y 0–111 | y 112–147 | 139/111 |
| `trilha.png` | 151×137 | y 0–106 | y 107–137 | 151/106 |
| `floresta.png` | 171×140 | y 0–112 | y 113–140 | 171/112 |

Wrapper com `overflow: hidden` e `aspect-ratio` da coluna “manter”. Imagem a 100% da largura, alinhada ao topo. Não cortar o disco. Sem card e sem chapa creme.

Rótulos, centralizados, no máximo 3 linhas, nunca abaixo de 14px:

- Descida de caiaque no rio Jucu
- Pêndulo
- Trilha
- Banho de floresta

Cruz, só abaixo de 1024px:

- Uma linha vertical e uma horizontal, 1px, `#B0A68C`.
- A vertical no meio da grade. A horizontal no meio da grade. As duas se encontram.
- Cada linha vai de borda a borda da grade, não da página.
- Gap entre células: 0. A cruz é o separador. Padding interno da célula: 12px (390) e 16px (768).
- De 1024px em diante não há cruz. Quatro colunas, gap 32px (1024) e 40px (1440).

### Selos

- `next/image` sem `priority`. Sem crop. Não são links.
- Altura: 36px (390), 44px (768), 48px (1024 e 1440).
- `alt="Descubra Viana"` e `alt="Prefeitura de Viana"`.
- Fio vertical de 1px `#1A6E36` entre os dois.
- Ficam no creme, acima da faixa inferior. Se não couberem em 390×844, o hero cresce.

### Faixas e folhas

- Duas faixas SVG. Topo: `viewBox="0 0 1440 112"`, `preserveAspectRatio="xMidYMax slice"`. A borda de baixo encontra o creme e não pode ser comida pelo slice.
- Base: o mesmo viewBox, `preserveAspectRatio="xMidYMin slice"`. A borda de cima encontra o creme.
- Onda orgânica, massas `#1A6E36` e `#0F4A24`. Filete `#B24A28` na borda do creme: 4px abaixo de 1024px, 6px de 1024px em diante.
- Folhas: 4 a 6 `<symbol>`, preenchimento chapado, só `#1A6E36` e `#2F8F4C`. Sem nervura, sem filtro.
- Elas nascem na faixa e entram no creme. No retrato, o canto superior direito e a base são os maiores. No landscape, os quatro cantos.
- `z-index`: faixa, depois folhas, depois line-art, depois pílula, CTA, tipo, grade e selos. Folha não cobre pílula, CTA, wordmark, rótulo nem selo.
- O tamanho (quanto a folha avança no creme) é o outro ponto sujeito ao delta do frontend. A onda e o filete não entram nesse delta.

## Estrutura de navegação

Uma página. Sem menu.

Ordem no retrato: faixa, pílula (`h1`), CTA, wordmark, `EXPERIENCE`, “Dia D”, grade, “E outras experiências”, selos, faixa. Line-art e folhas são decoração.

Ordem no landscape: faixa, linha do creme (CTA, apoio se couber, pílula), wordmark, `EXPERIENCE`, “Dia D”, quatro atividades, “E outras experiências”, selos, faixa.

Depois: `#quiz`, `#jogo`, footer `ComingSoonClose`.

Tab no hero encontra só o CTA. Enter segue para `#quiz`.

## Páginas

### Home

#### Objetivo da página

Dizer que o site está em construção e abrir o quiz. O jogo continua abaixo.

#### Estrutura

- Header: não há barra. A pílula é o `h1` dentro da seção do hero, dentro de `<main>`. Sem `<nav>`.
- Hero: cartaz com pílula e CTA.
- Seções: `QuizTotemSection` (`id="quiz"`) e `RunnerGameSection` (`id="jogo"`), intocadas.
- Footer: `ComingSoonClose`, intocado.

#### Sessões

1. **Pílula e CTA.** `h1` “Site em construção”. Link “Ver os desafios”. Apoio só ≥ 1024px, se couber numa linha.
2. **Cartaz.** Wordmark, `EXPERIENCE`, “Dia D”, atividades, “E outras experiências”, selos. Line-art atrás do título. No retrato, cruz na grade.
3. **Quiz.** `h2` “Quiz de curiosidades de Viana”. Não mexer.
4. **Jogo.** `h2` “Pedale e conquiste Viana”. Não mexer.

#### Comportamentos

- Hover, foco e active: só no CTA.
- A pílula não tem estado de interação.
- Loading, empty e error: não se aplicam. Não há envio.
- O hash usa o `scroll-behavior: smooth` já existente no `html`. Ele já cai para `auto` com `prefers-reduced-motion`. O hero não adiciona outro scroll.

#### Responsividade

| Elemento | 390 | 768 | 1024 | 1440 |
| --- | --- | --- | --- | --- |
| Pílula | Centrada, abaixo da onda | Centrada | Canto direito do creme | Canto direito, inset 64px |
| CTA | Centrado, sob a pílula, 44px | Igual | À esquerda da pílula, mesma linha | Igual, inset 64px |
| Apoio | Ausente | Ausente | No meio, ou ausente se não couber | No meio, ou ausente se não couber |
| Line-art | Clip ~174px na banda do título | O mesmo clip, banda mais alta | Atrás do título, laterais, para antes da fila | Igual |
| Grade | 2×2 com cruz, ícone 112px | 2×2 com cruz, ícone 160px | 4 colunas, sem cruz, 128px | 4 colunas, 140px |
| Wordmark | 240px | 300px | 400px | 480px |
| “Dia D” | 2 linhas | 2 linhas | 1 linha se couber | 1 linha |
| Folhas | Invadem o creme. Tamanho em delta | Igual | Quatro cantos. Tamanho em delta | Igual |

#### Animações

| Elemento | Trigger | Tipo | Duração | Easing | Reduced motion |
| --- | --- | --- | --- | --- | --- |
| CTA, fundo | hover | `background-color` | 120ms | `ease-out` | 0ms |
| Pílula, faixas, folhas, line-art, tipo | nenhum | nenhuma | 0ms | nenhum | sem transform |

## Fluxos de usuário

1. A pessoa abre a home.
2. Lê a pílula “Site em construção” e vê o CTA logo em seguida (embaixo no retrato, ao lado no landscape).
3. Aciona “Ver os desafios”.
4. A viewport para em `#quiz`.
5. O scroll seguinte chega em `#jogo`.

## Responsividade (global)

Breakpoints: base, `min-width: 768px`, `1024px`, `1440px`. A troca de retrato para landscape acontece em 1024px, não em 768px. 768px continua o cartaz em pé, mais largo.

Proibido posicionar peças com porcentagem de um artboard 1024×579 ou 573×1024.

Proibido `preserveAspectRatio` que mapeie o cartaz inteiro na viewport.

Ordem do DOM igual à ordem visual de cada breakpoint. Abaixo de 1024px a pílula vem antes do CTA. De 1024px em diante o CTA vem antes da pílula no DOM, para o Tab bater no controle primeiro, e a linha visual continua CTA à esquerda e pílula à direita. Sem `order` que descole o foco da leitura.

Zoom a 200% em 390px: pílula e CTA continuam centrados, um sob o outro. A seção cresce. Nada some por `overflow: hidden`.

## Interações

- `cursor: pointer` só no CTA. A pílula usa `cursor: default`.
- `:focus-visible` só no CTA, anel descrito acima.
- Hover não imita o foco.
- Selos, wordmark, line-art, folhas e cruz não são interativos.

## Microinterações

A única é a troca de fundo do CTA. Sem skeleton, sem toast.

## Motion design

Default estático. Sem fade, parallax, balanço de folha ou reveal de letra.

## Regras de UX

- Uma ação. O CTA é o único controle.
- A pílula diz o estado do site. O cartaz diz o evento. Não repetir “em construção” no miolo.
- O apoio, quando cabe, nomeia os dois desafios. O link só promete o salto até o quiz.
- “Dia D” pode ser maior que o `h1`.
- Não empilhar três textos entre a onda e o wordmark. No retrato são dois: pílula e CTA.

## Regras de acessibilidade

- Um `h1` visível dentro da pílula: “Site em construção”.
- “Dia D do Turismo em Viana/ES” é parágrafo.
- O próximo heading é o `h2` do quiz.
- Landmarks: `<main>`, `<footer>` existente. Sem `<nav>`. Sem `<header>` de barra.
- Faixas, folhas, line-art e cruz: `aria-hidden="true"`.
- Wordmark: `alt="Viana"`. `EXPERIENCE` é texto.
- Atividade: `alt=""` no ícone, nome no parágrafo. Lista `<ul>`.
- Selos com `alt` próprio.
- `aria-describedby="desafios-apoio"` só quando o apoio está visível.
- Contraste: tabela da paleta.
- Foco: anel do CTA, ≥ 2px, ≥ 3:1 sobre o creme. O outline marrom global não se aplica aqui.
- Alvo: 44×44px no CTA.
- Teclado: Tab no CTA, Enter ativa o link nativo. Sem `tabindex` positivo. Sem scroll em JavaScript.

## Assets necessários

| Asset | Formato | Dimensões | Observações |
| --- | --- | --- | --- |
| Wordmark | PNG RGBA | layout 240–480px | `priority`. Sem crop. Sem recolor |
| Caiaque | PNG RGBA | crop y 0–100 | Legenda em HTML |
| Pêndulo | PNG RGBA | crop y 0–111 | Legenda em HTML |
| Trilha | PNG RGBA | crop y 0–106 | Legenda em HTML |
| Floresta | PNG RGBA | crop y 0–112 | Legenda em HTML |
| Descubra Viana | PNG RGBA | altura 36–48px | Sem crop |
| Prefeitura | PNG RGBA | altura 36–48px | Sem crop |
| Faixas e folhas | SVG inline | viewBox 1440×112 cada faixa | Folhas podem desenhar fora da faixa, no creme |
| Line-art | SVG inline | clip na banda do título no retrato | Sem bitmap |
| Referências | JPG 1024×581 e PNG 573×1024 | não usar no DOM | Consulta |

## Guidelines para desenvolvimento

- Atualizar `--color-soon-cream` para `#FDF6E7` se isso ainda não estiver no CSS. Não criar token paralelo.
- Substituir o miolo visual do hero. Não levar `aspect-ratio` 390/720 nem 1024/579 como motor de layout.
- Não editar `QuizTotemSection`, `RunnerGameSection`, `VianaRunnerGame` nem `ComingSoonClose`.
- CTA é `<a href="#quiz">`.
- Não adicionar fonte, asset ou token fora desta spec.

Vetado:

- `public/poster/frame-desktop.webp`, `frame-tablet.webp`, `frame-mobile.webp`
- Barra terracota full-bleed
- Artboard com slots em `%`
- `window.addEventListener("resize", …)` para montar o hero
- `h-[100svh]` com `overflow: hidden`, e `max-height: 100svh` na seção
- `preserveAspectRatio` de um viewBox 1024×579 ou 573×1024 cobrindo o hero
- Grain, `filter`, canvas, parallax
- DM Serif, Alfa Slab e JetBrains Mono no hero
- `justify-between` em `EXPERIENCE`
- Pílula como link, ou segunda pílula além da do `h1`
- Sumir com a pílula
- Recorte de letras do wordmark, do pingo, ou dos selos
- Recolorir o wordmark
- Ícone acima de 160px
- `priority` em atividade ou selo
- Empilhar pílula, apoio e CTA
- Apoio abaixo de 1024px
- `h1` só para leitor de tela
- “Dia D” como `h1` ou `h2`
- Foco marrom global no CTA
- Nervura detalhada nas folhas
- Line-art atrás da grade 2×2
- Cruz na fila de quatro do landscape
- Editar o interior do quiz ou do jogo

Sujeito ao delta do frontend, e nada mais:

- O clip de ~174px da line-art no 390 (a banda pode ajustar alguns px, sem invadir a grade).
- O quanto a folha avança no creme (sem cobrir pílula, CTA, wordmark, rótulo ou selo).

## Checklist de implementação

- [ ] `--color-soon-cream` em `#FDF6E7`, sem token novo
- [ ] Pílula terracota preenchida, texto `#FFFFFF`, `h1` visível “Site em construção” em caixa alta pintada
- [ ] Pílula centrada abaixo de 1024px. Canto direito do creme de 1024px em diante. Não é link
- [ ] CTA cápsula creme com borda 2px `#0F4A24`, 44×44, sob a pílula no retrato e à esquerda dela no landscape
- [ ] Apoio só ≥ 1024px, numa linha, ou ausente
- [ ] Sem barra full-bleed
- [ ] Line-art no retrato, clipada à banda do título (~174px no 390). Grade limpa
- [ ] Cruz 1px `#B0A68C` só na grade 2×2
- [ ] Faixas SVG curtas com `slice` na borda do creme. Filete terracota. Folhas simples invadindo o creme
- [ ] Crops y 100 / 111 / 106 / 112. Rótulos em HTML. Ícone ≤ 160px
- [ ] `priority` só no wordmark
- [ ] Hero `min-height: 100svh` e `height: auto`, selos visíveis
- [ ] Quiz, jogo e footer intocados
- [ ] Foco do CTA com anel forest-deep sobre o creme, distinto do hover
- [ ] `prefers-reduced-motion`: cor do CTA em 0ms, sem transform

## Critérios de validação UX/UI

| Critério | Como verificar | Passa se |
| --- | --- | --- |
| Pílula | 390 e 1440 | Terracota cheia, texto branco. Centrada no 390. Canto direito no 1440. Não é link |
| CTA | 390 | Imediatamente abaixo da pílula, acima do wordmark, 44px, borda forest-deep |
| CTA | 1440 | À esquerda da pílula, mesma linha, no creme. A onda é full-bleed. Não há barra |
| Apoio | 390 e 768 | Ausente |
| Apoio | 1024 e 1440 | Uma linha entre CTA e pílula, ou ausente se a coluna do meio for menor que 17,5rem |
| Headline | DOM | `h1` é “Site em construção”. “Dia D” é `<p>` e é maior |
| Line-art | 390 | Visível atrás do título. Ausente na grade 2×2 |
| Cruz | 390 | Uma vertical e uma horizontal, 1px, `#B0A68C`, só na grade |
| Cruz | 1440 | Ausente |
| Creme | Token | `#FDF6E7` |
| Moldura antiga | Rede e DOM | Nenhum `frame-*.webp` |
| Folhas | 390 | Entram no creme. Sem nervura. Não cobrem pílula, CTA, wordmark nem selo |
| Crop | Quatro imagens | Legenda do PNG fora. Disco dentro |
| Ícone | 768 | Largura visual ≤ 160px |
| Foco | Tab no CTA | Anel forest-deep visível sobre o creme. Diferente do hover. Sem outline marrom |
| Altura | 390×844 e 390×640 | Selos visíveis. Se não couber, a página cresce. Sem `overflow: hidden` cortando a seção |
| Quiz e jogo | Percorrer os dois | Iguais aos de antes |
| Contraste | Pares da tabela | Pílula ≥ 4,5:1. CTA ≥ 4,5:1. Borda e foco ≥ 3:1 |
