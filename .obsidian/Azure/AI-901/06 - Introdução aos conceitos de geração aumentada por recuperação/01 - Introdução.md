---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
modulo: "06"
titulo: "Introdução"
nivel: iniciante
---

# Introdução

**Geração aumentada por recuperação (RAG)** combina a busca por informações relevantes em fontes externas com um **LLM**, que usa o conteúdo encontrado para elaborar uma resposta. Esse padrão permite responder com base em dados próprios ou atualizados, complementando o conhecimento aprendido pelo modelo durante o treinamento.

##### Objetivo do módulo

O módulo apresenta como uma solução RAG prepara dados, recupera informações para uma pergunta e usa esse contexto para gerar uma resposta. Também aborda como avaliar os resultados e identificar oportunidades de melhoria.

##### Tópicos deste módulo

- [[02 - Entenda a geração aumentada por recuperação]] — finalidade, benefícios e funcionamento geral do RAG.
- [[03 - Preparar dados para recuperação]] — como organizar fontes de conhecimento para que possam ser pesquisadas.
- [[04 - Recuperar informações e gerar uma resposta]] — como a busca e o LLM trabalham juntos durante uma consulta.
- [[05 - Avaliar uma solução RAG]] — como verificar a qualidade da recuperação e das respostas.

##### Pré-requisitos

- Familiaridade com conceitos e terminologia de IA generativa.
- Noções básicas de [[02 - LLMs|LLMs]] e [[03 - Solicitações|prompts]].

##### Fluxo geral

**Dados de referência → preparação e indexação → pergunta do usuário → recuperação de contexto → geração da resposta pelo LLM.**

## Pontos-chave para revisão AI-900/AI-901

- RAG é um padrão que combina **recuperação de informação** e **geração de linguagem**.
- Os dados precisam ser preparados antes de serem usados como contexto.
- A resposta depende tanto de encontrar os trechos certos quanto de o modelo usá-los adequadamente.

Fonte principal: [Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/rag-fundamentals/)