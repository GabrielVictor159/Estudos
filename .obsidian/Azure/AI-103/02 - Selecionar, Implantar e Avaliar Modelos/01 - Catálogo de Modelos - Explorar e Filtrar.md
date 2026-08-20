---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - modelos
modulo: 02
---

# Catálogo de Modelos — Explorar e Filtrar

O catálogo do Microsoft Foundry é o ponto de partida de qualquer solução generativa: reúne **mais de 1.900 modelos** de provedores como Microsoft, OpenAI, Anthropic, Meta, Cohere, Mistral e Hugging Face. Explorar bem o catálogo é o que reduz um universo grande a **dois ou três candidatos** para comparação séria.

![[m02-catalogo-modelos.png]]

---

## 1. Duas categorias amplas — a diferença está no faturamento

| | **Vendidos diretamente pela Azure** | **De parceiros e da comunidade** |
|---|---|---|
| Cobrança | Direto na assinatura do Azure | Licenciamento e preços do próprio fornecedor |
| Quem fornece | Azure OpenAI, modelos Microsoft e de parceiros | Parceiros confiáveis e comunidade |
| Azure Marketplace | **Não exige** assinatura | **Exige** assinatura do Marketplace |
| Fluxo extra na implantação | Nenhum | Examinar os termos → **Concordar e Continuar** |
| Exemplo | GPT-4o-mini | Modelos do repositório Hugging Face |

> Esse é o ponto que mais gera questão prática: se o cenário fala em **aceitar termos** ou em **assinatura do Marketplace**, o modelo é de parceiro/comunidade.

---

## 2. Os seis filtros do catálogo

| Filtro | O que segmenta |
|---|---|
| **Coleção** | Modelos Azure diretos, repositório Hugging Face, entre outros |
| **Funcionalidades** | **Raciocínio** (solução de problemas complexa), **chamada de ferramenta** (integração com APIs e funções), **processamento multimodal** (texto, imagens, áudio) |
| **Origem** | Azure OpenAI, Microsoft, Cohere, Mistral, Meta, Anthropic e outros |
| **Tarefas de inferência** | Geração de texto, resumo, tradução, geração de imagem, síntese de fala |
| **Métodos de fine-tuning** | Técnicas de ajuste fino suportadas pelo modelo |
| **Setor** | Modelos treinados em conjuntos de dados de domínio específico |

**Estratégia de filtragem que funciona:** comece por **tarefa de inferência** (o que o app precisa fazer), estreite por **funcionalidade** (o app chama ferramentas? é multimodal?) e só então olhe **origem** e **coleção** — que são restrições de governança, não de capacidade.

---

## 3. Tipos de modelo generativo

### Por porte

| Tipo | Exemplos | Quando é a escolha certa |
|---|---|---|
| **LLM** — modelo de linguagem grande | GPT-5, Mistral Large, Llama 3 70B | Raciocínio profundo, geração complexa, compreensão contextual ampla |
| **SLM** — modelo de linguagem pequeno | Phi-4, Mistral OSS, Llama 3 8B | Eficiência, custo-benefício, hardware de baixo desempenho, dispositivos de borda |

### Por finalidade

| Tipo | Exemplo | O que faz |
|---|---|---|
| **Conclusão de chat** | Modelos de chat completion | Respostas coerentes e contextualmente apropriadas; alimentam interfaces conversacionais |
| **Raciocínio** | Claude Opus 4.6 | Dividem problemas complexos em etapas e **mostram o processo de raciocínio** — matemática, codificação, ciência, estratégia, logística |
| **Embedding** | Ada, Cohere | Representação vetorial para pesquisa semântica, sistemas de recomendação e **RAG** |
| **Geração de imagem** | GPT-image-1 | Marketing, ilustrações, simulações de design |
| **Geração de vídeo** | Sora 2 | Conteúdo de vídeo a partir de descrições |
| **Análise de imagem** | GPT-4.1 | Entrada multimodal (texto + imagens), saída de análise em linguagem natural |
| **Texto para fala** | GPT-4o-tts | Converte texto em fala sintetizada |
| **Fala em texto** | GPT-4o-transcribe | Converte áudio em transcrições de texto |

### Regionais e de domínio específico

Modelos otimizados para **idiomas, regiões ou setores** específicos — literatura médica, documentos jurídicos, corpora de linguagem particulares. Localize-os pelo filtro **Setor**.

---

## Tabela de decisão: necessidade → tipo de modelo

| O cenário descreve… | Tipo |
|---|---|
| "Assistente que conversa com o cliente" | Conclusão de chat / LLM |
| "Resolver problemas matemáticos mostrando os passos" | Modelo de raciocínio |
| "Rodar no dispositivo, com pouca memória e baixo custo" | SLM |
| "Buscar documentos por significado, não por palavra-chave" | Embedding |
| "Responder com base na base de conhecimento da empresa" | Embedding + LLM (padrão RAG) |
| "Criar peças visuais de campanha" | Geração de imagem |
| "Produzir um vídeo a partir de um roteiro" | Geração de vídeo |
| "Descrever o que aparece nas fotos enviadas" | Análise de imagem (multimodal) |
| "Ler o texto em voz alta para o usuário" | Texto para fala |
| "Transcrever a ligação" | Fala em texto |
| "Interpretar terminologia médica com precisão" | Modelo de domínio específico (filtro Setor) |

---

## Pontos que costumam confundir

**LLM × SLM não é sobre qualidade absoluta.** O SLM é a resposta quando o cenário enfatiza **custo, latência, hardware limitado ou execução na borda**. Não é "modelo pior" — é modelo dimensionado.

**Modelo de raciocínio ≠ LLM comum.** O diferencial é decompor problemas em várias etapas e expor o processo. Cenários com matemática, lógica, planejamento ou depuração apontam para ele.

**Embedding não gera texto.** Se o cenário fala em busca, similaridade ou recuperação, é embedding — mesmo que o app final também use um LLM.

**Multimodal aparece em dois lugares.** Como **filtro de funcionalidade** e como **tipo de modelo** (análise/geração de imagem e vídeo). São a mesma capacidade vista de ângulos diferentes.

**Marketplace só para parceiro/comunidade.** Modelos vendidos diretamente pela Azure dispensam a assinatura do Marketplace.

---

## Aprofundar na documentação

- [Explorar o catálogo de modelos — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/2-explore-model-catalog)
- Próxima página: [[02 - Benchmarks - Comparar e Selecionar Modelos]]
- Contexto de plataforma: [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]]
