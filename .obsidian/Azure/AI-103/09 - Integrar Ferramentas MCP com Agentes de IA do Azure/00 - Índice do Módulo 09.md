---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - mcp
  - agentes
  - ferramentas
modulo: 09
titulo: Integrar ferramentas MCP com Agentes de IA do Azure
nivel: intermediário
---

# Integrar Ferramentas MCP com Agentes de IA do Azure

O **Model Context Protocol (MCP)** é um padrão aberto que conecta LLMs a ferramentas externas e fontes de dados através de uma interface cliente-servidor padronizada baseada em **JSON-RPC 2.0**. Ele elimina a necessidade de codificar integrações rígidas (*hardcoded*) para cada API, viabilizando a **descoberta dinâmica de ferramentas em tempo de execução (*runtime*)**.

![[m09-mcp-arquitetura.jpg]]

---

## Páginas deste módulo

| # | Página | Conteúdo Direto |
|---|--------|-----------------|
| 1 | [[01 - Arquitetura e Descoberta Dinâmica no MCP]] | Papéis (Server vs Client), protocolo JSON-RPC, transportes (`stdio` vs `SSE`) e descoberta dinâmica. |
| 2 | [[02 - Implementação Prática - FastMCP e Azure AI Agent]] | Servidor FastMCP (`@mcp.tool`), wrappers assíncronos, `MCPTool` nativo e governança *Human-in-the-Loop*. |
| 3 | [[03 - Questões Comentadas e Cola de Prova]] | Questões da avaliação oficial explicadas, pegadinhas e tabela de identificação rápida de exame. |

---

## Mapa mental do módulo em uma frase

> O **Servidor MCP** expõe ferramentas e esquemas JSON via `@mcp.tool`, o **Cliente MCP** descobre essas ferramentas dinamicamente em runtime via `session.list_tools()` e as repassa de forma assíncrona ao **Agente de IA do Azure** (via `FunctionTool` ou nativamente via `MCPTool`), com suporte a aprovação humana (*Human-in-the-Loop*).

---

## Tabela de Decisão Rápida

| Cenário / Necessidade | Solução Técnica |
|---|---|
| Onde hospedar e definir ferramentas com schemas automáticos em Python | **Servidor FastMCP** com decorador `@mcp.tool` |
| Como o cliente obtém as ferramentas disponíveis em runtime | Invocando **`session.list_tools()`** (método JSON-RPC `tools/list`) |
| Como invocar a ferramenta no servidor sem bloquear o agente | Wrapper assíncrono executando **`await session.call_tool(...)`** |
| Comunicação quando servidor e cliente rodam na mesma máquina (local) | Transporte **`stdio`** (Standard Input/Output) |
| Comunicação com servidor MCP remoto em nuvem/microsserviço | Transporte **`SSE`** (Server-Sent Events) sobre HTTP |
| Conectar agente do Azure a servidor MCP remoto sem cliente manual | Classe nativa **`MCPTool`** do Azure AI Projects SDK |
| Exigir validação humana antes de o agente executar ação crítica via MCP | Configurar **`require_approval="always"`** no `MCPTool` |
| Como aprovar a execução pendente no runtime do agente | Responder com **`mcp_approval_response`** contendo `approve: True` |

---

## Comparativo Direto: stdio vs. SSE

| Critério | stdio (Standard I/O) | SSE (Server-Sent Events) |
| :--- | :--- | :--- |
| **Ambiente** | Processo local / Subprocesso na mesma máquina | Servidor remoto em nuvem / Microsserviço |
| **Canal** | `stdin` e `stdout` delimitados por quebra de linha | HTTP GET contínuo (eventos) + HTTP POST (mensagens) |
| **Caso de uso** | Desenvolvimento local, ferramentas CLI, scripts internos | Ambientes corporativos de produção, APIs de terceiros |

---

## Objetivos de Aprendizagem Cobertos

- [x] Explicar as funções do servidor MCP e do cliente na descoberta e invocação de ferramentas
- [x] Encapsular ferramentas do MCP como funções assíncronas e registrá-las com Agentes de IA do Azure
- [x] Conectar Agentes de IA do Azure a servidores remotos via `MCPTool` com aprovação humana

---

## Aprofundar na Documentação

- [Módulo oficial no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/connect-agent-to-mcp-tools/)
- Módulo anterior: [[00 - Índice do Módulo 08]]
- Próximo módulo: [[00 - Índice do Módulo 10]]
- Próxima página: [[01 - Arquitetura e Descoberta Dinâmica no MCP]]
