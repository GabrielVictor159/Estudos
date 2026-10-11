---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
modulo: "06"
titulo: "Avaliar uma solução RAG"
nivel: iniciante
---

# Avaliar uma solução RAG

Uma solução RAG deve ser avaliada para verificar se recupera informações úteis e se o LLM produz respostas fundamentadas e relevantes. Examinar apenas a resposta final dificulta descobrir em qual etapa ocorreu uma falha.

##### O que avaliar

- **Recuperação:** os trechos encontrados são relevantes e contêm as informações necessárias?
- **Fundamentação (*groundedness* ou fidelidade):** as afirmações da resposta são apoiadas pelo contexto recuperado?
- **Relevância:** a resposta atende à pergunta do usuário?
- **Correção e completude:** a resposta é factual e cobre os pontos necessários?
- **Desempenho operacional:** a qualidade é adequada ao custo e à latência esperados?

##### Como avaliar

1. Monte perguntas representativas do uso esperado, cobrindo diferentes tópicos e formas de perguntar.
2. Para cada pergunta, identifique os documentos ou trechos que deveriam fornecer a resposta.
3. Execute a recuperação e confira se os trechos certos foram encontrados.
4. Examine a resposta para verificar apoio no contexto, relevância e completude.
5. Repita após ajustar fontes, divisão em trechos, estratégia de busca ou prompt.

Como respostas generativas podem variar, use critérios claros e um conjunto representativo de exemplos, em vez de depender de uma única saída.

##### Diagnóstico por etapa

- **A informação existe, mas não foi recuperada?** Revise a preparação, a divisão em trechos, os embeddings e a busca.
- **Os trechos são relevantes, mas a resposta não os usa corretamente?** Revise o contexto e as instruções do prompt.
- **A resposta está fundamentada, mas incompleta?** Verifique se os trechos recuperados cobrem toda a pergunta.
- **A resposta usa um trecho incorreto ou desatualizado?** Revise a fonte e a atualização do índice.

## Pontos-chave para revisão AI-900/AI-901

- Avalie **a recuperação**, **a resposta** e o sistema completo.
- Relevância verifica se o conteúdo atende à pergunta; fundamentação verifica se a resposta se apoia no contexto.
- Uma resposta correta depende tanto de recuperar boas evidências quanto de o modelo interpretá-las adequadamente.
- Use exemplos representativos e melhore a etapa responsável pela falha.

Fontes: [Módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/rag-fundamentals/), [avaliação de ponta a ponta de uma solução RAG](https://learn.microsoft.com/pt-br/azure/architecture/ai-ml/guide/rag/rag-llm-evaluation-phase).