**Redes neurais convolucionais (CNNs)** são arquiteturas de aprendizado profundo que aprendem **filtros** para extrair **mapas de características** de imagens e usam essas características para prever rótulos ou realizar outras tarefas de visão.

#### Pipeline conceitual (etapas principais)

![[Pasted image 20260524093334.png]]


- **Entrada**: imagens rotuladas usadas para treinar o modelo.
    
- **Camadas convolucionais**: aplicam **kernels** (filtros) sobre patches da imagem para gerar mapas de ativação que destacam padrões visuais.
    
- **Pooling / agregação**: reduz a dimensão dos mapas, preservando características dominantes e reduzindo custo computacional.
    
- **Flatten**: transforma mapas em um vetor único.
    
- **Camadas totalmente conectadas**: processam o vetor para produzir saídas.
    
- **Saída (softmax)**: gera probabilidades por classe para classificação.
    

#### Termos e conceitos explicados (cada termo com definição e papel)

- **Filtro / Kernel** **Definição:** matriz de pesos aplicada por convolução sobre regiões da imagem. **Papel:** detecta padrões locais (bordas, texturas, formas); pesos são aprendidos durante o treinamento.
    
- **Convolução** **Definição:** operação que multiplica elemento a elemento um patch da imagem pelo kernel e soma o resultado. **Papel:** produz mapas de ativação que representam a presença de características locais.
    
- **Mapa de características (feature map)** **Definição:** matriz de valores resultante da aplicação de um filtro sobre a imagem. **Papel:** codifica onde e com que intensidade um padrão aparece; entradas para camadas posteriores.
    
- **Pooling** **Definição:** operação de redução (ex.: max pooling, average pooling) que resume regiões do mapa. **Papel:** reduz resolução espacial, torna representações mais robustas a pequenas variações e diminui custo computacional.
    
- **Flatten** **Definição:** transformação que converte mapas multidimensionais em um vetor unidimensional. **Papel:** prepara as características para camadas totalmente conectadas.
    
- **Camada totalmente conectada (dense)** **Definição:** camada em que cada neurônio conecta‑se a todas as saídas da camada anterior. **Papel:** combina características extraídas para produzir decisões de alto nível.
    
- **Softmax** **Definição:** função que converte logits em probabilidades somando 1. **Papel:** fornece probabilidade por classe para tarefas de classificação.
    
- **Inicialização de pesos** **Definição:** atribuição inicial de valores aos kernels e neurônios (geralmente aleatória). **Papel:** ponto de partida para o treinamento; influencia convergência.
    
- **Forward pass** **Definição:** propagação dos dados de entrada pela rede para obter previsões. **Papel:** gera as probabilidades usadas para calcular perda.
    
- **Função de perda** **Definição:** medida da diferença entre previsões e rótulos verdadeiros (ex.: cross‑entropy). **Papel:** sinaliza o quanto o modelo errou; guia a atualização de pesos.
    
- **Backpropagation** **Definição:** algoritmo que calcula gradientes da perda em relação aos pesos e os propaga para atualizar parâmetros. **Papel:** ajusta kernels e pesos das camadas para reduzir a perda ao longo das épocas.
    
- **Época (epoch)** **Definição:** uma passagem completa por todo o conjunto de treinamento. **Papel:** repetir múltiplas épocas permite ao modelo refinar pesos até convergir.
    
- **Regularização** **Definição:** técnicas (dropout, weight decay) que evitam overfitting. **Papel:** melhoram generalização do modelo para dados não vistos.
    
- **Aumento de dados (data augmentation)** **Definição:** gerar variações das imagens de treino (rotações, cortes, flips, alterações de cor). **Papel:** aumenta diversidade do conjunto de treino e reduz overfitting.
    
- **Transfer learning** **Definição:** reaproveitar pesos de uma rede pré‑treinada e ajustar (fine‑tune) para novo domínio. **Papel:** acelera treinamento e melhora desempenho quando dados rotulados são limitados.
    

#### Considerações práticas e de projeto

- **Dados**: volume e qualidade de imagens rotuladas são determinantes para desempenho.
    
- **Hiperparâmetros**: número de filtros, tamanho do kernel, profundidade da rede e estratégia de pooling afetam capacidade e custo.
    
- **Trade‑offs**: redes mais profundas capturam padrões complexos mas exigem mais dados e recursos; use transfer learning quando apropriado.
    

### Resumo rápido para AI‑900

- **Essência**: CNNs aprendem filtros que geram mapas de características; esses mapas são reduzidos, achatados e processados por camadas densas para produzir probabilidades por classe.
    
- **Ciclo de treinamento**: forward pass → cálculo de perda → backpropagation → atualização de pesos → repetir por épocas.
    
- **Pontos-chave para a prova**: entender o papel de **kernels**, **mapas de características**, **pooling**, **flatten**, **softmax**, **loss** e **backprop**; reconhecer quando usar **data augmentation** e **transfer learning**.
- 