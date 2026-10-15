# Capa fotográfica aprovada

O usuário aprovou a direção proposta de campanha turística: o mapa aproxima Viana e revela a fotografia atual da Igreja Matriz em tela inteira. Marca original, Dia D do Turismo, data de 8 de novembro de 2026 e logos institucionais permanecem. A fotografia chega por fade e aproximação suave; conteúdo permanece acessível e o replay reinicia a viagem. Movimento reduzido apresenta a capa estática diretamente.

Implementação: adicionar camada fotográfica no Hero, coordenar a revelação com a conclusão real do mapa e aplicar cores e escala de campanha somente após a viagem. Preservar altura de tela e faixa institucional. Verificar desktop, celular, tela baixa, replay e preferência de movimento reduzido. Quiz, jogo e informações das atrações permanecem.

Validação: build de produção, ESLint do Hero, Chrome em 1440px, 698px e 390px, movimento reduzido e replay. Capa medida em 1440x900 e 375x667 sem aumento de altura ou sobreposição dos controles às logos. Quiz, jogo, catálogo e menu passaram no fluxo existente.
