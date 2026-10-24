# Movimento cartográfico ao longo da página

Direção aprovada: linha de percurso e curvas de relevo, com linguagem sóbria ligada a turismo e aventura. Sem personagens nem seção adicional.

Uma camada SVG transparente aparece sobre as seções existentes de Três mundos, Dia D e Atrações. A primeira trajetória desenha um arco amplo; a segunda forma um caminho sinuoso; a terceira sugere subida por uma serra. Uma linha fina revela o percurso, um trecho mais forte acompanha a ponta e um marcador circular discreto indica o avanço. Famílias de curvas topográficas aparecem pelas bordas, com baixa opacidade e deslocamento suave durante a rolagem.

A animação é ligada ao scroll e reverte ao voltar. Cada passagem entra e sai pela opacidade. As posições são medidas fora do evento de scroll, com um único desenho por frame. Não há loop em repouso. Movimento reduzido oculta a camada e cancela o frame pendente; mudanças na preferência são acompanhadas em tempo real. A decoração tem pointer-events none, semântica oculta e fica abaixo da navegação e dos popups.

No celular, o SVG usa coordenadas da tela, mantendo a espessura dos traços e o tamanho do marcador. As famílias de relevo exibem menos curvas. ResizeObserver acompanha as seções e o elemento main, recalculando os marcos inclusive quando o hero muda de altura após a abertura. A camada não acrescenta altura ou largura à página.

O personagem, a cena WebGL, o modelo GLB, a preparação do modelo e as dependências de Three.js foram removidos. A implementação é local e usa somente SVG e os recursos já presentes no navegador.

Validar: build, ESLint, três trajetórias, retorno do scroll, marcador e progressão, desktop e duas larguras móveis, ausência de transbordamento, cliques através da camada, popup acima da decoração, movimento reduzido em tempo real e ausência de requisições de modelos 3D.

Verificado: build e ESLint aprovados. Chrome em 1440x1000, 390x844 e 320x568, com três trajetórias, retorno da rolagem, CTAs e popup, movimento reduzido em tempo real e ausência de transbordamento ou requisições de modelos. Uma mudança de 120px na altura do hero reproduziu o desalinhamento anterior; o mesmo teste passou nos três tamanhos após observar o main. Evidências em .impeccable/review/journey-qa.json e capturas journey por tamanho e passagem.
