---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - agentes
modulo: 04
titulo: Desenvolver aplicativos de IA generativos que usam ferramentas
nivel: iniciante
---

# Ferramentas de IA Generativa

Nota de entrada do módulo. Aqui o assunto passa de "como chamar o modelo" para **como dar superpoderes ao modelo**: executar código, pesquisar na web, buscar em documentos e chamar funções do seu próprio sistema. Ferramentas transformam o LLM de um gerador de texto em um **orquestrador de ações**.

![[m04-ferramentas-overview.jpg]]

> **Conceito-chave:** Sozinho, o modelo tem dados estáticos de treinamento, não faz cálculos confiáveis, não acessa arquivos e não executa ações. As **ferramentas** eliminam essas limitações conectando-o a sistemas externos em runtime.

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - O Que São Ferramentas]] | O conceito, as categorias e o fluxo de execução de uma ferramenta |
| 2 | [[02 - Ferramenta code_interpreter]] | Executar código Python em sandbox para cálculos e análise de dados |
| 3 | [[03 - Ferramenta web_search]] | Buscar informações em tempo real na web via Bing |
| 4 | [[04 - Ferramenta file_search]] | Pesquisa semântica em documentos privados (RAG automatizado) |
| 5 | [[05 - Ferramenta de Funções (Function Calling)]] | Chamar funções personalizadas e APIs externas |

---

## Mapa mental do módulo em uma frase

> Modelos de IA generativa ganham capacidades além do chat quando equipados com **ferramentas**: `code_interpreter` (execução de Python em sandbox), `web_search` (consultas Bing em tempo real), `file_search` (RAG gerenciado sobre documentos privados) e **function calling** (chamadas a APIs e funções do seu código, executadas pelo aplicativo cliente).

---

## Tabela de decisão rápida

| Se o cenário pede… | A ferramenta é |
|---|---|
| Calcular raiz quadrada, média, desvio padrão | **code_interpreter** |
| Analisar um CSV e gerar gráficos | **code_interpreter** |
| Converter entre formatos de dados (CSV ↔ JSON) | **code_interpreter** |
| Simular cenários matemáticos ou de física | **code_interpreter** |
| Obter notícias e eventos do dia | **web_search** |
| Comparar preços ou versões atuais de produtos | **web_search** |
| Verificar fatos contra fontes públicas | **web_search** |
| Responder sobre políticas internas a partir de PDFs | **file_search** |
| Revisar contratos ou manuais técnicos internos | **file_search** |
| Recuperar passagens relevantes por significado semântico | **file_search** |
| Consultar status de pedido no banco de dados da empresa | **function (function calling)** |
| Disparar criação de tíquete ou notificação via API | **function (function calling)** |
| Acessar regras de negócio ou tabelas de referência | **function (function calling)** |
| Combinar análise de documento + cálculos + update em ERP | **Múltiplas ferramentas** no mesmo agente |

---

## Tabela de referência comparativa

| Aspecto | code_interpreter | web_search | file_search | function |
|---|---|---|---|---|
| **Tipo** | `code_interpreter` | `web_search` | `file_search` | `function` |
| **Executado onde** | Sandbox Python gerenciado | Serviço Bing / Web | Vector Store gerenciado | Aplicativo cliente (seu código) |
| **Entrada típica** | Prompt + arquivos | Prompt (consulta implícita) | Prompt + `vector_store_ids` | JSON Schema de parâmetros |
| **Saída típica** | Texto + arquivos gerados (PNG, CSV) | Texto + citações com URL | Texto + citações de documento | JSON retornado via `function_call_output` |
| **Quem executa?** | O serviço, automaticamente | O serviço, automaticamente | O serviço, automaticamente | **Seu código** — o modelo só pede |
| **Caso clássico** | Análise de dados e gráficos | Informações em tempo real | Q&A sobre docs internos (RAG) | Integração com APIs e bancos |

---

## Objetivos de aprendizagem cobertos

- [x] Descrever os recursos das ferramentas de IA generativa
- [x] Usar a ferramenta `code_interpreter` para executar código e analisar dados
- [x] Usar a ferramenta `web_search` para recuperar informações em tempo real da Internet
- [x] Usar a ferramenta `file_search` para acessar e analisar arquivos
- [x] Usar a ferramenta de função para executar código personalizado

---

## Pré-requisitos assumidos pelo módulo

- Familiaridade com o Microsoft Foundry e modelos de IA generativa
- Experiência com programação (Python)

---

## Prática recomendada

- [Exercício: Criar um aplicativo de chat de IA generativo que usa ferramentas](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/07-exercise)

O que vale exercitar, porque vira questão de "como faço X":

1. Chamar `code_interpreter` com um prompt matemático e inspecionar o código Python gerado internamente.
2. Habilitar `web_search` e perguntar sobre um evento recente — observar as citações.
3. Criar um `vector_store`, carregar um PDF e usar `file_search` para perguntar sobre o conteúdo.
4. Definir uma função personalizada com schema JSON, tratar o `function_call` no loop e devolver `function_call_output`.
5. Combinar mais de uma ferramenta no mesmo agente e observar o modelo decidir qual usar.

---

## Aprofundar na documentação

- [Módulo completo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/)
- Módulo anterior: [[00 - Índice do Módulo 03]]
- Próximo módulo: [[00 - Índice do Módulo 05]]
