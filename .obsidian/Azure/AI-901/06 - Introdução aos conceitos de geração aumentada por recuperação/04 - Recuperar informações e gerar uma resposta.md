---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
modulo: "06"
titulo: "Recuperar informações e gerar uma resposta"
nivel: iniciante
---

# Recuperar informações e gerar uma resposta

![[assets/m06-rag.png|1000]]

*A aplicação acrescenta evidências ao contexto do modelo; uma consulta RAG não altera seus parâmetros.*


Quando o usuário faz uma pergunta, a solução RAG procura conteúdo relacionado no índice. Depois, combina os trechos recuperados com a pergunta e envia esse contexto ao LLM para gerar uma resposta.

##### Recuperação de informações

A consulta localiza partes relevantes da base preparada. Um índice pode oferecer diferentes formas de busca:

- **Por palavra-chave:** procura termos presentes no conteúdo.
- **Semântica ou vetorial:** procura conteúdo relacionado ao significado da consulta por meio de embeddings.
- **Híbrida:** combina correspondência de palavras-chave e de significado.

O sistema seleciona e ordena resultados conforme a estratégia de busca. A relevância dos trechos é essencial: o LLM só pode usar como evidência o conteúdo que recebeu.

##### Geração com contexto

1. A aplicação recebe a pergunta.
2. A busca localiza trechos relacionados no índice.
3. A aplicação reúne pergunta, trechos e instruções em um prompt aumentado.
4. O LLM gera uma resposta usando o contexto recuperado.
5. Quando configurado, o sistema pode incluir referências aos documentos ou páginas de origem.

**Exemplo:** para “Qual é o prazo para solicitar reembolso?”, a solução busca a política correspondente, envia o trecho sobre prazos junto à pergunta e solicita ao LLM uma resposta baseada naquele material.

##### O que afeta o resultado

- **Recuperação insuficiente:** a resposta pode omitir informações porque os trechos necessários não foram encontrados.
- **Contexto excessivo ou irrelevante:** pode confundir o modelo e ocupar a janela de contexto.
- **Prompt pouco claro:** pode não orientar o modelo a usar as fontes corretamente.
- **Fonte desatualizada ou conflitante:** pode não representar a regra vigente.

Uma resposta convincente não comprova que está fundamentada. Verifique se os trechos recuperados apoiam suas afirmações e se a fonte é apropriada.

## Pontos-chave para revisão AI-900/AI-901

- A pergunta dispara a **busca por trechos relevantes** no índice.
- Os resultados são adicionados ao prompt junto à pergunta; o **LLM gera** a resposta.
- Busca por palavra-chave, semântica/vetorial e híbrida são estratégias de recuperação.
- A resposta depende da qualidade do conteúdo recuperado e da geração.

Fonte: [Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/rag-fundamentals/)