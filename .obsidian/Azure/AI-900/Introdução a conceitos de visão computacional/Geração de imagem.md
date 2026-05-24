**Modelos multimodais** podem gerar imagens a partir de descrições em linguagem natural ao **identificar recursos visuais associados a tokens de linguagem** e sintetizar pixels que correspondem a esses recursos. A técnica dominante é a **difusão**, que constrói a imagem iterativamente removendo ruído a partir de um mapa inicial aleatório até que a saída corresponda ao prompt.

#### Processo de geração por difusão

- **Inicialização**: começa com uma matriz de pixels aleatórios (ruído).
    
- **Iterações de denoising**: em cada passo o modelo aplica uma transformação que reduz ruído e introduz estrutura coerente com o prompt.
    
- **Avaliação do prompt**: após cada iteração o modelo compara a imagem gerada com a representação do prompt para guiar as próximas alterações.
    
- **Convergência**: repete até produzir uma imagem final que ilustra a cena descrita.
    
![[Pasted image 20260524095209.png]]

#### Geração de vídeo (difusão temporal)

- **Mesma ideia básica**: usa identificação de recursos visuais a partir de linguagem.
    
- **Fatores adicionais**: incorpora **consistência física** (ex.: movimento plausível dos pés de um cão) e **progressão temporal** para garantir sequência lógica entre frames.
    
- **Desafio**: manter coerência espacial e temporal ao longo de múltiplos quadros.
    

#### Aplicações e implicações práticas

- **Uso**: criação de imagens e vídeos a partir de prompts descritivos; prototipagem visual; geração de conteúdo multimídia.
    
- **Limitações**: qualidade e fidelidade dependem do modelo e dos dados de treino; geração de vídeo exige modelagem de dinâmica física e temporal.
    

### Resumo rápido para revisão AI‑900

- **Essência**: geração por difusão = iniciar com ruído → remover ruído iterativamente guiado pelo prompt → imagem final.
    
- **Vídeo**: mesma técnica com atenção à coerência física e temporal.
    
- **Pontos-chave para prova**: entender o fluxo iterativo de denoising, o papel do prompt na orientação da síntese e as diferenças práticas entre gerar imagens e gerar vídeos.