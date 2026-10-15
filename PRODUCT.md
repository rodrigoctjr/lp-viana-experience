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
- No celular, o mapa vem primeiro e revela pin/data na tela inicial; marca completa, textos e ações seguem na página. Câmera de 4,8s no celular e 6,2s no desktop: pausa em Viana, aproximação profunda e chegada à foto existente da Estação Ferroviária por abertura circular. Movimento reduzido mostra a foto final estática.

- Variação cromática confirmada: capítulos em areia quente, azul claro, verde, pêssego, lima clara, mel e lilás; texto navy e marca original preservados.

## Data
src/data/attractions.ts e API existente de vouchers são as fontes de informação operacional. Geometria de localização fornecida pelas malhas públicas do IBGE, preservadas em public/maps. O pin indica o município, não o endereço de um evento.
