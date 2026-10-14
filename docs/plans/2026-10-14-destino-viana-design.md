# Destino Viana — homologacao-v2

Direção aprovada em 14/10/2026. Base preservada no commit d49c906 em homologacao.

## Experiência
Hero cinematográfico com mapa geográfico do Brasil, aproximação ao Espírito Santo e pin em Viana. A mesma imagem do título permanece. Data: 8 de novembro de 2026. Conteúdo e ações acessíveis desde o carregamento; nenhuma espera obrigatória ou bloqueio do scroll.

## Identidade
Azul profundo, verde mineral, branco areia e coral. Fotografias grandes e composição editorial. Curvas de água e relevo ligam as seções. Movimento concentrado no mapa e nas transições; evita deslocar informação durante leitura e interação.

## Preservação
Quiz completo, jogo Bike Beer, catálogo, filtros, contatos, cupons, ofertas, horários, disponibilidade e inscrição mantidos. Dados e API de vouchers não mudam. Logos desktop/mobile inalterados. Correções de hidratação preservam perguntas, regras e textos: o quiz usa renderização inicial determinística e embaralhamento após hidratação; o texto animado conserva o mesmo markup no SSR e no cliente, inclusive em movimento reduzido.

## Implementação e validação
1. Converter malhas públicas do IBGE em vetores locais otimizados, mantendo fonte e identificadores.
2. Construir hero com zoom amplo, aproximação, pin, data e replay.
3. Substituir paleta, navegação, apresentação dos pilares e programação; atualizar transições compartilhadas.
4. Verificar TypeScript, build, desktop/mobile, quiz, filtros, jogo, navegação e movimento reduzido.

O mapa é uma visualização de localização, não uma rota de transporte. Sem novos horários, ofertas ou números inventados. Aproximação mais curta no celular, versão estática com prefers-reduced-motion.

## Decisões finais da superfície

No celular, o mapa vem antes da marca e revela Viana e a data na tela inicial. A marca completa, os textos e as ações ficam na sequência da página, sem bloqueio de scroll. Duração da câmera: 3s no celular e 4,2s no desktop. Com movimento reduzido, o destino é estático.

Paleta implementada: areia, azul profundo, verde mineral e coral. Textos secundários claros usam o valor sólido #476267; fotografias e conteúdo operacional permanecem identificáveis. A documentação normativa de tokens e componentes está em DESIGN.md e sua extensão de visualização em .impeccable/design.json (schemaVersion 2).

## Limites deste registro

Esta documentação foi conferida contra os estilos globais e os componentes implementados. O launcher/engine do Impeccable está indisponível; não houve instalação, download, execução do painel ou validação oficial do schema. O manifest registra amostras de componentes, não substitui verificação dos fluxos reais. Resultados de build, testes de navegação e revisão visual devem ser consultados na validação da implementação; este registro não os presume nem declara métricas de conversão ou conformidade integral.
