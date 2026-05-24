**Transformadores de visão** representam imagens como **tokens visuais** (patches) e aplicam o mecanismo de **atenção** para modelar relações espaciais e contextuais entre essas partes. **Modelagem semântica multimodal** une representações visuais e textuais em um **espaço vetorial compartilhado**, permitindo que termos (palavras) sejam alinhados a objetos, regiões ou conceitos visuais.

#### Como imagens e texto são unidos (passo a passo)

- **Tokenização visual**: a imagem é dividida em _patches_ ou regiões; cada patch é convertido em um **embedding** (vetor).
![[Pasted image 20260524094154.png]]
    ![[Pasted image 20260524094605.png]]
    
- **Codificação textual**: palavras ou frases são convertidas em embeddings por um codificador de linguagem.
![[Pasted image 20260524094534.png]]
    
- **Espaço vetorial compartilhado**: ambos os tipos de embeddings são projetados para o mesmo espaço semântico, de modo que vetores próximos representam conceitos semelhantes (por exemplo, o vetor de “gato” fica próximo ao vetor do patch que contém um gato).
    ![[Pasted image 20260524094636.png]]
    
- **Atenção cruzada / fusão**: camadas de atenção cruzada permitem que o modelo aprenda quais palavras se relacionam a quais patches, ponderando a influência mútua entre visão e linguagem.
    
- **Aprendizado contrastivo**: durante o treino, pares imagem‑legenda correspondentes são aproximados no espaço vetorial enquanto pares não correspondentes são afastados; isso ensina o modelo a alinhar termos a objetos/regionais relevantes.
    
- **Grounding regional**: técnicas que extraem embeddings por região (não só por imagem inteira) permitem mapear palavras a **objetos específicos** dentro da cena, não apenas ao tema global.
    

#### Termos e conceitos-chave explicados

- **Embedding** **O que é:** vetor numérico que representa significado. **Papel:** permite comparar semanticamente palavras e regiões visuais por similaridade (ex.: cosseno).
    
- **Atenção (self‑attention / cross‑attention)** **O que é:** mecanismo que calcula pesos entre pares de tokens. **Papel:** identifica quais patches influenciam outros patches (self‑attention) e quais palavras se conectam a quais regiões (cross‑attention).
    
- **Contrastive learning** **O que é:** objetivo de treino que aproxima pares corretos (imagem, legenda) e afasta pares incorretos. **Papel:** cria um espaço onde termos e objetos correspondentes ficam próximos.
    
- **Vision Transformer (ViT)** **O que é:** arquitetura que trata patches como tokens e usa transformadores para processá‑los. **Papel:** captura relações globais entre regiões sem depender exclusivamente de convoluções locais.
    
- **Grounding / Visual grounding** **O que é:** processo de localizar a região da imagem que corresponde a uma expressão textual. **Papel:** permite responder “onde está X na imagem?” e suportar tarefas de legenda detalhada e QA visual.
    
- **Region embeddings / Object proposals** **O que é:** representações extraídas de regiões propostas (por detectores) em vez de patches fixos. **Papel:** melhora precisão do alinhamento palavra→objeto ao focar em contornos reais de objetos.
    

#### Aplicações práticas e exemplos de uso

- **Busca semântica por imagem**: encontrar imagens relevantes a uma consulta em linguagem natural usando similaridade de embeddings.
    
- **Geração de legendas e QA visual**: mapear termos a regiões para descrever ações e responder perguntas sobre a cena.
    
- **Detecção e rotulagem contextual**: usar atenção para inferir relações (quem segura o quê, ações entre objetos).
    
- **Sistemas multimodais**: agentes que combinam visão e linguagem para executar tarefas (ex.: inventário visual, suporte ao cliente com imagens).
    

#### Limitações e pontos de atenção

- **Alinhamento estatístico, não compreensão humana**: modelos aprendem correlações vetoriais; erros ocorrem em cenários raros ou ambíguos.
    
- **Dependência de dados**: qualidade do alinhamento depende de pares imagem‑texto ricos e variados; viéses nos dados se refletem nas predições.
    
- **Granularidade**: modelos treinados apenas em nível de imagem inteira têm dificuldade em grounding fino; region embeddings e detectores ajudam, mas exigem anotação adicional.
    
- **Robustez**: ruído visual, oclusões e variações de domínio (iluminação, estilo) reduzem precisão do alinhamento.
    

### Resumo rápido para AI‑900

- **Essência**: unir visão e linguagem significa projetar **embeddings visuais e textuais** num mesmo espaço e usar **atenção** e **aprendizado contrastivo** para alinhar termos a objetos/regionais.
    
- **Quando isso importa**: busca semântica, legendagem automática, QA visual e agentes multimodais.
    
- **Pontos-chave para a prova**: saber o papel de **patches/embeddings**, **atenção cruzada**, **contrastive learning**, **grounding regional** e as limitações práticas (dados, viés, granularidade).
