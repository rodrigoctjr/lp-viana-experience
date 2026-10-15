# Destino Viana — homologacao-v2

Direção aprovada em 14/10/2026. Base preservada no commit d49c906 em homologacao.

## Experiência
Hero cinematográfico com mapa geográfico do Brasil, aproximação ao Espírito Santo, pausa no pin em Viana e zoom profundo. Ao concluir, o mapa sai por fade, é removido e o conteúdo do hero se centraliza sobre o fundo de natureza. A mesma imagem do título permanece. Data: 8 de novembro de 2026. Conteúdo e ações acessíveis desde o carregamento; nenhuma espera obrigatória ou bloqueio do scroll.

## Identidade
Areia quente no hero/cabeçalho, azul claro na faixa e jogo, verde nos pilares, pêssego no Dia D, lima clara nas atrações, mel no quiz e lilás no fechamento. Texto navy e ênfase terra no Dia D. Fotografias grandes e composição editorial. Curvas de água e relevo ligam as seções. Movimento concentrado no mapa e nas transições; evita deslocar informação durante leitura e interação.

## Preservação
Quiz completo, jogo Bike Beer, catálogo, filtros, contatos, cupons, ofertas, horários, disponibilidade e inscrição mantidos. Dados e API de vouchers não mudam. Logos desktop/mobile inalterados. Correções de hidratação preservam perguntas, regras e textos: o quiz usa renderização inicial determinística e embaralhamento após hidratação; o texto animado conserva o mesmo markup no SSR e no cliente, inclusive em movimento reduzido.

## Implementação e validação
1. Converter malhas públicas do IBGE em vetores locais otimizados, mantendo fonte e identificadores.
2. Construir hero com zoom amplo, aproximação, pin, data e replay.
3. Substituir paleta, navegação, apresentação dos pilares e programação; atualizar transições compartilhadas.
4. Verificar TypeScript, build, desktop/mobile, quiz, filtros, jogo, navegação e movimento reduzido.

O mapa é uma visualização de localização, não uma rota de transporte. Sem novos horários, ofertas ou números inventados. Aproximação mais curta no celular; com prefers-reduced-motion, conteúdo centralizado imediatamente, sem zoom.

## Decisões finais da superfície

No celular, o mapa ocupa a mesma área da capa e revela marca, textos e ações após o fade, sem bloqueio de scroll. Duração da câmera: 5,8s no celular e 7,4s no desktop. A etapa do Espírito Santo usa viewBox 818 565 82 102, com pausa estadual; segue por 850 619 25 31 e chega a 858.4 630 8 10. Pin e rótulo compensam o zoom por escala inversa. A conclusão real do zoom inicia a fase fading e o fade-out do mapa (0,65s). Após a remoção, onExitComplete inicia centered e os grupos de marca, título, descrição, data e ações se centralizam por Motion layout (0,85s, easing .23,1,.32,1). Não há fotografia de chegada. A data permanece no conteúdo. Rever viagem fica fora do mapa removido, reabre a introdução e usa um identificador de jornada para ignorar callbacks antigos. Em movimento reduzido, a transição chega imediatamente ao centro, sem zoom.

Paleta de fundos implementada: hero/cabeçalho #f8e7ce; faixa/jogo #d5e8ed; pilares #d7e7cf; Dia D #f0bc9e; atrações #eef1dc; quiz #f3dda0; fechamento #e6def1. O Dia D usa texto navy e ênfase #703522. Textos secundários claros usam o valor sólido #476267; fotografias e conteúdo operacional permanecem identificáveis. A documentação normativa de tokens e componentes está em DESIGN.md e sua extensão de visualização em .impeccable/design.json (schemaVersion 2).

O hero móvel centraliza marca, título, parágrafo, data e ações após o mapa; a composição interna da data mantém texto à esquerda. O mapa introdutório mantém cantos retos em todos os tamanhos e deixa de ocupar espaço ao ser removido. Fotos dos pilares usam 28px, atrações 24px, foto da faixa 22px, ações em cápsula de 999px, respostas do quiz 20px e contêiner do jogo 24px.

NatureBackdrop adiciona folhagens e água ao hero, capítulos compartilhados, Dia D e fechamento. Ciclos CSS transform de 14s e 18s pausam fora do viewport via useInView e ficam estáticos em movimento reduzido.

## Limites deste registro

Esta documentação foi conferida contra os estilos globais e os componentes implementados. O launcher/engine do Impeccable está indisponível; não houve instalação, download, execução do painel ou validação oficial do schema. O manifest registra amostras de componentes, não substitui verificação dos fluxos reais. A sequência de encerramento passou no build e na verificação em Chrome a 1440px, 698px e 390px, incluindo movimento reduzido, replay, pin visível no fim do zoom, catálogo, quiz, jogo e menu móvel. O subtítulo passou a “Dia D do Turismo. Viva Viana.”. A revisão textual remove hífens e travessões da apresentação, preservando identificadores e URLs. Este registro não declara métricas de conversão ou conformidade integral.

A capa do hero ocupa a altura dinâmica da tela, incluindo o cabeçalho. A faixa fotográfica fica abaixo da capa. O mapa móvel usa a mesma área do conteúdo, sem empilhar uma segunda tela durante a introdução. Telas baixas recebem espaçamento e marca compactos; conteúdo ampliado por acessibilidade pode expandir a capa para preservar a leitura.
