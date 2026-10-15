# Viana Experience

## Platform
web — Next.js, React, Motion, Tailwind CSS.

## Product and audience
Site do Dia D do Turismo em Viana/ES. Apresenta o evento, atrações e parceiros, com quiz de curiosidades e jogo Bike Beer. Experiência responsiva, com prioridade para navegação pelo celular.

## Confirmed commitments
- Evento: domingo, 8 de novembro de 2026.
- Preservar imagens originais do título em public/logo.
- Preservar quiz, jogo, informações das atrações e fluxos de inscrição/reserva.
- Não inventar ofertas, horários, disponibilidade ou rotas operacionais.
- V2 autorizada na branch homologacao-v2. Base homologacao salva no commit d49c906.
- Direção Destino Viana aprovada: mapa animado Brasil → Espírito Santo → Viana, pin e data; nova paleta e transições de natureza.
- No celular, o mapa ocupa a capa durante a abertura e revela o conteúdo no mesmo espaço após o fade. Câmera de 5,8s no celular e 7,4s no desktop: enquadramento próximo do Espírito Santo, pausa estadual e aproximação profunda por Viana. Ao concluir o zoom, o mapa desaparece e é removido; marca, título, texto, data e ações se centralizam com transição sobre o fundo de natureza. Rever viagem reabre a sequência. Movimento reduzido salta ao conteúdo centralizado sem zoom.

- Variação cromática confirmada: capítulos em areia quente, azul claro, verde, pêssego, lima clara, mel e lilás; texto navy e marca original preservados.

- No hero móvel, marca, título, parágrafo, data e ações ficam centralizados após o mapa; o texto interno da data mantém alinhamento à esquerda.
- Fundos de natureza com folhas e água respeitam movimento reduzido e pausam fora da tela. Fotos e ações usam formas mais arredondadas; o mapa mantém todos os cantos retos.

## Data
src/data/attractions.ts e API existente de vouchers são as fontes de informação operacional. Geometria de localização fornecida pelas malhas públicas do IBGE, preservadas em public/maps. O pin indica o município, não o endereço de um evento.

A capa do hero ocupa a altura dinâmica da tela, incluindo o cabeçalho. A faixa fotográfica fica abaixo da capa. O mapa móvel usa a mesma área do conteúdo, sem empilhar uma segunda tela durante a introdução. Telas baixas recebem espaçamento e marca compactos; conteúdo ampliado por acessibilidade pode expandir a capa para preservar a leitura.
