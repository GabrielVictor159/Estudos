**Visão computacional** transforma imagens, vídeos ou streams em **informação acionável** por meio de técnicas que extraem rótulos, localizações, contornos e relações semânticas entre objetos.

#### Classificação de imagens

![[Pasted image 20260524091020.png]]

**Definição:** prever um **rótulo único** que descreve o conteúdo principal de uma imagem. **Quando usar:** cenários onde interessa apenas o assunto dominante, por exemplo identificar o tipo de produto em um checkout automático. **Requisitos:** grande conjunto de imagens rotuladas para treinamento; atenção a variações de iluminação e ângulo.

#### Detecção de objetos
![[Pasted image 20260524091049.png]]

**Definição:** localizar e classificar **múltiplos objetos** em uma imagem, retornando caixas delimitadoras com coordenadas. **Quando usar:** situações com vários itens na cena que precisam ser identificados individualmente, por exemplo escanear vários produtos simultaneamente. **Saída típica:** lista de objetos com rótulo e bounding box; pode incluir scores de confiança.

#### Segmentação semântica

![[Pasted image 20260524091122.png]]

**Definição:** classificar **cada pixel** da imagem segundo a que objeto pertence, produzindo máscaras precisas. **Quando usar:** aplicações que exigem contornos exatos e compreensão de forma, como medicina, robótica e direção autônoma. **Vantagem:** precisão espacial superior à detecção por caixas; permite operações por região.

#### Análise de imagem contextual e modelos multimodais
![[Pasted image 20260524091157.png]]

**Definição:** identificar **relações contextuais** entre objetos e gerar descrições em linguagem natural ou sugestões semânticas. **Capacidades:** interpretar atividades, relacionar objetos entre si e produzir legendas ou recomendações de marcas. **Impacto:** habilita busca por imagem com texto, geração automática de legendas e agentes visuais que entendem cena e intenção.

#### Considerações práticas e escolha de técnica

- **Complexidade crescente:** classificação → detecção → segmentação → análise contextual.
    
- **Escolha conforme objetivo:** usar classificação para rótulos simples; detecção para múltiplos objetos; segmentação para precisão por pixel; multimodal para compreensão semântica.
    
- **Dados e rotulagem:** qualidade e volume de dados rotulados determinam desempenho; domínios específicos exigem conjuntos de treino adaptados.
    

**Síntese rápida para revisão AI‑900**

- **Classificação:** rótulo único.
    
- **Detecção:** múltiplos objetos + localização.
    
- **Segmentação:** classificação por pixel.
    
- **Análise contextual:** compreensão semântica e geração de texto.