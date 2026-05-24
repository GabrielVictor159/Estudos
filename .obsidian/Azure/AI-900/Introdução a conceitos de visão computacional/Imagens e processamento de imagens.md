**Imagens são matrizes numéricas de pixels** onde cada valor representa intensidade luminosa em uma posição x,y. Em imagens em escala de cinza cada pixel varia entre 0 e 255; em imagens coloridas cada pixel é composto por **três canais** que representam vermelho, verde e azul. Essas matrizes definem resolução, profundidade de cor e a estrutura básica que algoritmos de visão processam.

#### Canais de cor e composição de pixels


Red:
 150  150  150  150  150  150  150  
 150  150  150  150  150  150  150
 150  150  255  255  255  150  150
 150  150  255  255  255  150  150
 150  150  255  255  255  150  150
 150  150  150  150  150  150  150
 150  150  150  150  150  150  150

Green:
 0    0    0    0    0    0    0          
 0    0    0    0    0    0    0
 0    0   255  255  255   0    0
 0    0   255  255  255   0    0
 0    0   255  255  255   0    0
 0    0    0    0    0    0    0
 0    0    0    0    0    0    0

Blue:
 255  255  255  255  255  255  255  
 255  255  255  255  255  255  255
 255  255   0    0    0   255  255
 255  255   0    0    0   255  255
 255  255   0    0    0   255  255
 255  255  255  255  255  255  255
 255  255  255  255  255  255  255

![[Pasted image 20260524092015.png]]

**RGB é a forma mais comum de representar cor** em imagens digitais. Cada canal é uma matriz separada com valores 0–255 e a combinação dos três canais produz a cor final de cada pixel. Entender canais permite manipular cor, isolar componentes e aplicar transformações específicas por canal.

#### Filtros e kernels

|Imagem original|Imagem filtrada|
|---|---|
|![Foto de um cachorro.](https://learn.microsoft.com/pt-br/training/wwl-data-ai/introduction-computer-vision/media/dog-grayscale.png)|![Fotografia de um cachorro com um filtro Laplace aplicado.](https://learn.microsoft.com/pt-br/training/wwl-data-ai/introduction-computer-vision/media/dog-filtered.png)|

**Filtros são kernels matriciais aplicados por convolução** sobre a imagem para produzir efeitos como realce de bordas, desfoque ou nitidez. A operação consiste em multiplicar elemento a elemento um patch da imagem pelo kernel e somar os resultados para gerar o novo valor do pixel. Kernels comuns incluem detectores de borda, filtros de suavização e filtros de realce.

#### Convolução, padding e normalização

**A convolução percorre a imagem com o kernel**, gerando uma nova matriz de saída. Valores resultantes podem sair do intervalo 0–255 e por isso são ajustados por normalização ou recorte. Para calcular bordas externas aplica‑se preenchimento de borda, tipicamente com zeros, para manter dimensões ou controlar artefatos.

#### Exemplo prático e efeito Laplace

**Exemplo numérico ilustra o processo**: aplicar um kernel 3×3 com pesos que somam zero pode produzir valores negativos que, após ajuste, realçam contornos. O filtro Laplace é citado como exemplo que destaca bordas ao amplificar diferenças locais entre pixels. Esse tipo de filtragem é a base para detecção de contornos e pré‑processamento antes de modelos mais avançados.

#### Aplicações e transição para redes convolucionais

**Filtragem convolucional é o fundamento para redes neurais convolucionais** que aprendem kernels automaticamente a partir de dados rotulados. Técnicas de filtragem manual servem para entender operações básicas e para pipelines de pré‑processamento em tarefas como segmentação, detecção de objetos e classificação.

**Resumo rápido para revisão AI‑900**

- **Imagem = matriz de pixels**; valores 0–255.
    
- **RGB = três canais** que combinam para formar cor.
    
- **Kernels aplicados por convolução** transformam a imagem para realçar ou suprimir características.
    
- **Padding e normalização** são necessários para preservar dimensões e manter valores válidos.
    
- **Filtros como Laplace** realçam bordas e preparam dados para redes convolucionais.