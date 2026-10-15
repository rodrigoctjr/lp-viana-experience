# Primeira cena 3D de aventura

Direção aprovada: personagem 3D estilizado com corpo articulado, praticando pêndulo, controlado pelo scroll. Modelo construído com geometria tridimensional, materiais e iluminação; juntas hierárquicas para ombros, cotovelos, quadris e joelhos. A corda acompanha a conexão ao arnês. Plataforma, árvores, pedras e rio compõem um pequeno cenário.

Uma seção dedicada após Três mundos mantém a cena visível durante a rolagem. O progresso controla preparação, queda e balanço, e reverte ao subir a página. Sem bloqueio do scroll. No celular, a cena vem após o texto. Carregamento do Three.js próximo da seção, pixel ratio limitado, renderização sob demanda e pausa fora de vista. Movimento reduzido apresenta uma pose estática. Sem WebGL, a fotografia existente mantém o conteúdo acessível.

Validar renderização WebGL, poses em diferentes progressos, desktop e celular, retorno do scroll, preferência de movimento reduzido, fallback e descarte dos recursos.

Validação concluída: build e ESLint aprovados. Chrome com WebGL 2 em 1440x1000 e 390x844, quatro posições de scroll incluindo retorno, sem transbordamento ou erros de execução. Troca de preferência de movimento em tempo real congela a pose; perda de contexto gráfico exibe a fotografia. O hook nativo de preferência acompanha alterações sem recriar o renderer.
