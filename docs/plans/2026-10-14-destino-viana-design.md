# Destino Viana — homologacao-v2

Direção aprovada em 14/10/2026. Base preservada no commit d49c906 em homologacao.

## Experiência
Hero cinematográfico com mapa geográfico do Brasil, aproximação ao Espírito Santo, pausa no pin em Viana e zoom profundo que se transforma na fotografia da Estação Ferroviária. A mesma imagem do título permanece. Data: 8 de novembro de 2026. Conteúdo e ações acessíveis desde o carregamento; nenhuma espera obrigatória ou bloqueio do scroll.

## Identidade
Areia quente no hero/cabeçalho, azul claro na faixa e jogo, verde nos pilares, pêssego no Dia D, lima clara nas atrações, mel no quiz e lilás no fechamento. Texto navy e ênfase terra no Dia D. Fotografias grandes e composição editorial. Curvas de água e relevo ligam as seções. Movimento concentrado no mapa e nas transições; evita deslocar informação durante leitura e interação.

## Preservação
Quiz completo, jogo Bike Beer, catálogo, filtros, contatos, cupons, ofertas, horários, disponibilidade e inscrição mantidos. Dados e API de vouchers não mudam. Logos desktop/mobile inalterados. Correções de hidratação preservam perguntas, regras e textos: o quiz usa renderização inicial determinística e embaralhamento após hidratação; o texto animado conserva o mesmo markup no SSR e no cliente, inclusive em movimento reduzido.

## Implementação e validação
1. Converter malhas públicas do IBGE em vetores locais otimizados, mantendo fonte e identificadores.
2. Construir hero com zoom amplo, aproximação, pin, data e replay.
3. Substituir paleta, navegação, apresentação dos pilares e programação; atualizar transições compartilhadas.
4. Verificar TypeScript, build, desktop/mobile, quiz, filtros, jogo, navegação e movimento reduzido.

O mapa é uma visualização de localização, não uma rota de transporte. Sem novos horários, ofertas ou números inventados. Aproximação mais curta no celular; foto final estática com prefers-reduced-motion.

## Decisões finais da superfície

No celular, o mapa vem antes da marca e revela Viana e a data na tela inicial. A marca completa, os textos e as ações ficam na sequência da página, sem bloqueio de scroll. Duração da câmera: 5,8s no celular e 7,4s no desktop. A etapa do Espírito Santo usa viewBox 818 565 82 102, com pausa estadual; segue por 850 619 25 31 e chega a 858.4 630 8 10. Pin e rótulo compensam o zoom por escala inversa. A foto existente public/images/viana/estacao.jpg aparece por abertura circular do centro (1,2s) e se assenta de escala 1,16 para 1 (2s), começando em 4,8s no celular e 6,3s no desktop. Data e replay permanecem. A legenda identifica a Estação Ferroviária de Viana e credita Rafael Deminicis, CC BY-SA 4.0. Com movimento reduzido, foto e legenda finais ficam estáticas.

Paleta de fundos implementada: hero/cabeçalho #f8e7ce; faixa/jogo #d5e8ed; pilares #d7e7cf; Dia D #f0bc9e; atrações #eef1dc; quiz #f3dda0; fechamento #e6def1. O Dia D usa texto navy e ênfase #703522. Textos secundários claros usam o valor sólido #476267; fotografias e conteúdo operacional permanecem identificáveis. A documentação normativa de tokens e componentes está em DESIGN.md e sua extensão de visualização em .impeccable/design.json (schemaVersion 2).

O hero móvel centraliza marca, título, parágrafo, data e ações após o mapa; a composição interna da data mantém texto à esquerda. O mapa e a foto final ficam em quadro de cantos retos em todos os tamanhos. Fotos dos pilares usam 28px, atrações 24px, foto da faixa 22px, ações em cápsula de 999px, respostas do quiz 20px e contêiner do jogo 24px.

NatureBackdrop adiciona folhagens e água ao hero, capítulos compartilhados, Dia D e fechamento. Ciclos CSS transform de 14s e 18s pausam fora do viewport via useInView e ficam estáticos em movimento reduzido.

## Limites deste registro

Esta documentação foi conferida contra os estilos globais e os componentes implementados. O launcher/engine do Impeccable está indisponível; não houve instalação, download, execução do painel ou validação oficial do schema. O manifest registra amostras de componentes, não substitui verificação dos fluxos reais. Typecheck e build de produção aprovados. QA em 1440px, 390px e 698px passou sem erros JavaScript ou overflow, com centralização móvel, quadro do mapa de raio zero e replay. O teste de ancoragem mediu desvio de 0px; o teste de natureza confirmou execução visível, pausa fora da tela e modo reduzido estático. A revisão visual independente retornou ship no escopo solicitado. Resultados de build, testes de navegação e revisão visual devem ser consultados na validação da implementação; este registro não os presume nem declara métricas de conversão ou conformidade integral.
