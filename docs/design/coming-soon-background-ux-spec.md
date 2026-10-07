---
status: implemented
version: 1.0.0
author: ux-agent
skills_used:
  - ux-agent
  - brainstorming
  - design-spec-extraction
  - ui-craft
  - writing-clearly-and-concisely
assumptions_approved_by_conversation: true
---

# Viana Experience — Background do hero “em breve”

> Versão 1.0.0 · Status: approved · Gerado por ux-agent

## Objetivo

Dar ao hero a **atmosfera do cartaz** (natureza, rio, serra, sol) sem virar foto e sem competir com marca, atrações ou logos institucionais.

Métrica de sucesso: numa viewport de 1440×900 e 390×844, o fundo se lê como o cartaz; a faixa de atrações e as marcas Descubra/Prefeitura ficam sobre creme limpo.

Ação principal do hero continua sendo o CTA **Começar o quiz** na faixa do topo.

## Público-alvo

Visitantes do Dia D do Turismo em Viana/ES, desktop e celular. O fundo é cenário, não conteúdo.

## Branding

- Referência oficial: cartaz “Viana Experience — site em construção”.
- Não usar o JPG do cartaz como `<img>` de fundo.
- Anti-referência: colinas preenchidas no meio da tela; traços que cortam ícones; logos institucionais em cima do verde.

## Direção visual

Ilustração editorial em **line-art**, creme + verde-floresta + terracota.

- Faixas verdes orgânicas em cima e embaixo, com filete terracota.
- Paisagem (rio, serra, sol) só na **metade superior** do palco, atrás da marca.
- Vegetação só nos **cantos**, nascendo das faixas verdes.
- Centro da tela (atrações) e faixa das marcas = creme livre.

Nível de animação: nenhum no fundo (estático). Reduced motion: n/a.

## Paleta de cores

| Token | Valor | Uso |
| --- | --- | --- |
| `--color-soon-cream` | `#f4f0e6` | Campo do hero |
| `--color-soon-forest` | `#1a6e36` | Marca, ícones, texto |
| `--color-soon-forest-deep` | `#0f4a24` | Preenchimento das faixas de terreno |
| `--color-soon-terra` | `#b24a28` | Filete do terreno, faixa do aviso, EXPERIENCE |
| `--color-soon-dot` | `#e24b2a` | Pingo do wordmark |
| `--color-soon-line` | `#b0a68c` | Contorno da serra de fundo |
| `--color-soon-leaf` | `#1a6e36` | Fill das folhas 2D |
| `--color-soon-leaf-bright` | `#2f8f4c` | Fill das folhas claras |
| `--color-soon-water` | `#2f7a72` | Contorno do lago |
| `--color-soon-water-fill` | `#8fcdc4` | Fill plano do lago |
| `--color-soon-sun` | `#f2b84b` | Fill plano do sol |

Contraste do texto do hero sobre creme: verde `#1a6e36` ≥ 4.5:1. Vegetação e paisagem são decorativas (aria-hidden).

## Tipografia

Não muda nesta spec. O fundo não contém tipo.

| Token | Família | Tamanho | Peso | Uso |
| --- | --- | --- | --- | --- |
| `--font-body` | Bricolage Grotesque | existente | 600 | Fora do fundo |

## Espaçamentos e grid

Base 8px. Hero = `100svh` em coluna: faixa de aviso + palco.

| Breakpoint | Largura | Comportamento do fundo |
| --- | --- | --- |
| mobile | < 640px | Só terrenos + vegetação dos cantos de baixo (menor). Sem paisagem de serra/rio. |
| tablet | 640–1023 | Terrenos + vegetação 4 cantos. Paisagem superior opcional, opacidade 70%. |
| desktop | ≥ 1024 | Composição completa da referência, com zona morta no meio. |
| ultra-wide | ≥ 1440 | Paisagem `slice` nas laterais; centro continua livre. |

Zonas do palco (de cima para baixo):

1. **Terreno alto** — 9–11% da altura do palco. Verde + filete.
2. **Paisagem** — do fim do terreno alto até o fim da faixa do título (`clamp(11rem, 38%, 16.5rem)`). Clip obrigatório. Não entra na zona 3.
3. **Atrações** — 48%–78%. Creme. Zero line-art.
4. **Marcas** — 78%–88%. Creme. Logos inteiros, acima do verde.
5. **Terreno baixo** — 12–16% da altura. Verde + filete. Vegetação pode sobrepor o verde, não as marcas.

Respiro mínimo entre a base das marcas e o filete terracota: **24px**.

## Componentes

### TerrenoAlto / TerrenoBaixo

- **Variantes:** top | bottom
- **Estados:** estático
- **Anatomia:** fill verde-profundo + stroke terracota 5–6px na borda orgânica
- **Comportamento:** `pointer-events: none`, `aria-hidden`
- **Forma:** onda contínua, mais alta nas laterais, mais baixa no centro (espelha o cartaz)
- **Responsividade:** `preserveAspectRatio="none"` na largura; altura em `clamp`

### PaisagemLineArt

- **Anatomia:**
  - Esquerda: 2–3 curvas horizontais (rio)
  - Centro-direita: duas serras em polilinha (frente + fundo)
  - Direita-alto: círculo do sol (r ≈ 28–36 no viewBox 1440) + 1–2 arcos de nuvem
- **Tokens:** stroke `--color-soon-line`, 1.4–1.8px, `round`
- **Proibido:** fill de colina; blur; passar da linha dos 48%
- **Responsividade:** `hidden` abaixo de 640px; em tablet, opacity 0.7

### VegetacaoCanto

- **Variantes:** top-left, top-right, bottom-left, bottom-right
- **Anatomia:** talos + folhas ovais + 1 folha recortada (tipo costela-de-adão) por canto de baixo
- **Tokens:** stroke `--color-soon-leaf`, 1.4–1.6px, sem fill
- **Âncora:** nasce de dentro da faixa verde e entra 40–80px no creme
- **Proibido:** silhueta preenchida; ocupar mais que 18vw a partir da borda; tocar atrações ou marcas
- **Mobile:** só bottom-left e bottom-right, max 22vw

### FaixaAviso (já existente — fora do escopo de desenho, só âncora)

Permanece no topo, largura 100%, terracota. O terreno alto começa **abaixo** dela.

## Estrutura de navegação

Não aplicável ao fundo. A home continua: hero → quiz → jogo → rodapé.

## Páginas

### Home — Hero “em breve”

#### Objetivo da página
Teaser institucional + CTA para o quiz.

#### Estrutura
- Header: faixa “Site em construção”
- Hero: marca, subtítulo, 4 atrações, “E outras experiências”, logos
- Fundo: camadas desta spec
- Seções seguintes: quiz e jogo (inalteradas)

#### Sessões
1. **Palco ilustrado**
   - Conteúdo: apenas decoração
   - Hierarquia: terreno > vegetação > paisagem (z-index crescente, todos abaixo do conteúdo `z-10`)
   - CTA: nenhum no fundo

#### Comportamentos
Sem hover/loading no fundo.

#### Responsividade
| Elemento | Mobile | Tablet | Desktop |
| --- | --- | --- | --- |
| Terrenos | sim | sim | sim |
| Paisagem | não | suave | completa, clipada |
| Vegetação | cantos de baixo | 4 cantos | 4 cantos, mais densa embaixo |

#### Animações
Nenhuma.

## Fluxos de usuário

Entrada na home → lê o cartaz → CTA da faixa → `#quiz`. O fundo não participa do fluxo.

## Responsividade (global)

Tipografia e grid do hero já existentes. Imagens de atração e logos institucionais continuam PNG oficiais, sem recorte extra.

## Interações

Fundo não interativo. Focus ring só no CTA da faixa.

## Microinterações

Nenhuma no fundo.

## Motion design

Fundo estático. Proibido parallax.

## Regras de UX

- Reconhecimento: rio à esquerda, serra ao fundo, sol à direita, mata nos cantos.
- Atrações e logos leem primeiro; o fundo some se o usuário não prestar atenção.
- Se um traço cruzar um ícone, o traço perde — nunca o ícone.

## Regras de acessibilidade

- Todas as camadas de fundo: `aria-hidden="true"` e `pointer-events-none`
- Contraste AA só no conteúdo
- Touch targets do CTA: mín. 36×36px (já na faixa)

## Assets necessários

| Asset | Formato | Dimensões | Observações |
| --- | --- | --- | --- |
| Cartaz (referência) | JPG | — | Só referência. Não embedar. |
| Wordmark / atrações / marcas | PNG existentes | — | Fora desta spec |

## Guidelines para desenvolvimento

- Stack atual: Next 15, Tailwind 4, SVG inline no `ComingSoonPoster.tsx`
- Substituir `Atmosphere` (colinas fill) e `Grove`/`Branch` (silhueta fill) por `PaisagemLineArt` + `VegetacaoCanto`
- Manter `TopTerrain` / `BottomTerrain`
- Clip da paisagem: classe `.soon-scenery` (`height: 38%; max-height: 16.5rem; min-height: 11rem`) + `overflow-hidden`
- Não usar a imagem do cartaz como background-image
- Não commitar `.tmp-design-specs`

## Checklist de implementação

- [ ] Tokens de fundo inalterados ou só `--color-soon-line` / `--color-soon-leaf`
- [ ] Paisagem clipada à faixa do título (`clamp(11rem, 38%, 16.5rem)`)
- [ ] Atrações sem traço por cima
- [ ] Logos com ≥ 24px de creme até o filete
- [ ] Mobile sem paisagem de serra
- [ ] `aria-hidden` em todas as camadas
- [ ] Hero continua `100svh`

## Critérios de validação UX/UI

| Critério | Como verificar | Pass/Fail |
| --- | --- | --- |
| Sem colina fill no meio | Screenshot 1440 | |
| Serra/rio/sol visíveis no desktop | Screenshot 1440, zona superior | |
| Atrações livres | Screenshot, faixa dos ícones | |
| Logos acima do verde | Screenshot, comparar com cartaz | |
| Mobile limpo no centro | Screenshot 390 | |
| Hero cabe na viewport | `heroH === innerH` | |
