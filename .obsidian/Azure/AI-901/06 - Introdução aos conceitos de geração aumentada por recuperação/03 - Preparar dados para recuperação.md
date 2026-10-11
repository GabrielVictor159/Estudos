---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
modulo: "06"
titulo: "Preparar dados para recuperação"
nivel: iniciante
---

# Preparar dados para recuperação

Para que uma solução RAG encontre informações úteis, os documentos precisam ser transformados em conteúdo pesquisável que possa ser recuperado como contexto. A preparação organiza as fontes antes da consulta do usuário.

##### Pipeline de preparação

1. **Definir o cenário** — identificar que perguntas a solução deve responder e quais fontes podem respondê-las.
2. **Ingerir e extrair conteúdo** — carregar os arquivos e converter seu conteúdo para uma representação pesquisável. Digitalizações ou mídias podem exigir OCR ou transcrição.
3. **Limpar e organizar** — remover ruído, preservar estrutura útil e associar metadados, como título, página, origem ou categoria.
4. **Dividir em trechos (*chunks*)** — separar o material em unidades que possam ser recuperadas individualmente.
5. **Gerar embeddings e indexar** — representar trechos em vetores numéricos e armazená-los em um índice junto ao texto e metadados necessários.

##### Trechos e contexto

- Trechos grandes podem trazer conteúdo irrelevante e consumir mais contexto do modelo.
- Trechos pequenos demais podem separar uma afirmação das explicações necessárias para entendê-la.
- Dividir por títulos, seções ou parágrafos ajuda a manter o significado.
- Tabelas, títulos, páginas e imagens podem carregar contexto que deve ser preservado.

A estratégia depende do tipo e da organização das fontes. A preparação também deve considerar formatos, idiomas, qualidade da extração e frequência de atualização.

##### Embeddings e índice

- **Embedding:** representação numérica de um conteúdo; permite comparar o significado da consulta e dos trechos.
- **Índice:** organiza texto, vetores e metadados para permitir recuperação eficiente.
- Quando os documentos mudam, o índice deve refletir as alterações para que a busca encontre o conteúdo atualizado.

##### Qualidade das fontes

- Use fontes relevantes, legíveis, confiáveis e adequadas ao domínio.
- Erros de OCR ou conversão podem aparecer depois na resposta.
- Preserve permissões e requisitos de privacidade; cada usuário deve recuperar apenas conteúdo autorizado.
- Verifique com perguntas representativas se o material preparado contém as respostas esperadas.

## Pontos-chave para revisão AI-900/AI-901

- Preparar dados envolve **extrair, limpar, dividir, representar e indexar** o conteúdo.
- *Chunking* define as unidades pesquisáveis que poderão ser enviadas ao LLM.
- Embeddings ajudam a localizar trechos por significado; o índice torna o conteúdo recuperável.
- Dados ruins ou trechos sem contexto prejudicam as etapas seguintes.

Fontes: [Módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/rag-fundamentals/), [fase de preparação RAG](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-preparation-phase), [fase de chunking](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/rag/rag-chunking-phase).