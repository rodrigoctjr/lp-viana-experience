# Exploração no mesmo fluxo

Refinamento solicitado: as seções Viana desponta para o turismo e Três mundos abrem um explorador comum em popup com overlay. CTAs preenchidos e imagens abrem o tema correspondente. O fluxo principal não usa links para outra página nem muda a URL.

Três temas, com imagem acima do texto: história, natureza e sabores. Setas, indicadores clicáveis, teclado e gesto horizontal no celular permitem navegar. Trocas são manuais, sem reprodução automática. O texto histórico integral é expansível no próprio popup; controles ficam fora da área de leitura rolável. Escape, botão fechar e overlay retornam ao ponto de origem com foco no acionador. Movimento reduzido elimina o deslocamento na troca de temas.

Dados editoriais compartilhados entre o popup e a rota histórica preexistente, que continua disponível por endereço direto. A página inicial usa somente o explorador. Verificação: ambos os CTAs, seis imagens de entrada, histórico expansível, foco, teclado, overlay, bloqueio de rolagem, gesto móvel, URL e posição preservadas, telas pequenas e ausência de transbordamento.

Validação concluída: build de produção, ESLint dos arquivos alterados e Chrome em desktop e 375x667. Os dois CTAs e nove entradas por imagem/texto abriram o tema correto. Teclado, indicadores, histórico expansível, rolagem interna, controles fixos, Escape, clique no overlay, restauração de foco e posição, URL preservada e gesto horizontal móvel passaram. Sem erros de execução ou transbordamento. Quiz, jogo, API e dados de atrações sem alterações.

Refinamento de destaque: os seis temas exibem botão preenchido com ação textual de 48px. Popup reduzido de 860px para 700px de largura e foto de 300px para 220px de altura máxima. Na medição desktop, o popup ficou em 700x750px; em 375x667, usa margens laterais de 16px e verticais de 20px. Build, lint e fluxo do explorador passaram novamente, incluindo gesto móvel e foco.

Consolidação posterior solicitada: remover a seção Viana desponta para o turismo. Três mundos passa a concentrar o CTA geral, três fotos e três botões individuais. O popup mantém os mesmos temas e conteúdo, sem repetição de seções na página.

Consolidação validada no Chrome: seção antiga ausente, Três mundos imediatamente após o hero, três botões preenchidos e seis acessos ao explorador funcionando. Teclado, foco, overlay, gesto móvel e posição preservada passaram. Build e lint aprovados.
