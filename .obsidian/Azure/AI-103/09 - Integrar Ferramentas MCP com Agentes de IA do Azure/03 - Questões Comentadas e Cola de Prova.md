---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - mcp
  - simulado
  - questoes-exame
  - revisao
modulo: 09
---

# Questões Comentadas e Cola de Prova

Esta página traz as questões oficiais da avaliação do Microsoft Learn comentadas de forma objetiva, acompanhadas da cola de identificação rápida para o exame **AI-102 / AI-103**.

---

## Questões Oficiais da Avaliação (Microsoft Learn)

### Questão 1
**Qual é a função que o servidor MCP desempenha na integração de ferramentas do agente MCP?**
- [ ] A) Executa o agente de IA e processa os prompts do usuário diretamente.
- [ ] B) Gerencia conexões de rede entre vários agentes de IA.
- [x] **C) Hospeda definições de ferramenta e as disponibiliza para descoberta pelo cliente.** *(Correta)*

> **Explicação Direta:** O servidor MCP funciona como o catálogo e provedor de ferramentas. Ele expõe métodos decorados (via `@mcp.tool`), mantém os contratos em schemas JSON e executa o código sob demanda. O raciocínio cognitivo sobre prompts e a orquestração cabem ao modelo e ao serviço de agentes, não ao servidor MCP.

---

### Questão 2
**Como um cliente MCP recupera as ferramentas disponíveis do servidor MCP?**
- [x] **A) Ao chamar `session.list_tools()` para obter o catálogo de ferramentas atual.** *(Correta)*
- [ ] B) Lendo um arquivo JSON estático do diretório do servidor.
- [ ] C) Ao assinar eventos de servidor por meio de uma conexão WebSocket.

> **Explicação Direta:** A recuperação é dinâmica e ocorre em tempo de execução através do método `session.list_tools()`. Isso envia a requisição JSON-RPC `tools/list` ao servidor ativo, eliminando arquivos estáticos locais ou acoplamentos fixos.

---

### Questão 3
**Por que as ferramentas MCP devem ser encapsuladas em funções assíncronas no lado do cliente?**
- [ ] A) Para permitir que o agente aguarde a entrada textual do usuário.
- [x] **B) Para habilitar a invocação assíncrona de forma que o agente possa chamar ferramentas de forma não bloqueadora.** *(Correta)*
- [ ] C) Para converter automaticamente as funções em endpoints da API REST.

> **Explicação Direta:** Chamadas a ferramentas remotas envolvem latência de rede e processamento externo. O uso de funções assíncronas (`async def` com `await session.call_tool(...)`) evita que a thread de execução do agente seja travada enquanto a ferramenta é executada, garantindo escalabilidade e responsividade.

---

## Cola Rápida para o Exame

| Se a questão mencionar… | Marque imediatamente… |
|---|---|
| *"Qual protocolo aberto padroniza a conexão entre LLMs e ferramentas?"* | **Model Context Protocol (MCP)** |
| *"Qual o papel do servidor MCP?"* | **Hospedar definições de ferramentas e disponibilizá-las para descoberta** |
| *"Como o cliente descobre ferramentas em tempo de execução?"* | Invocando **`session.list_tools()`** |
| *"Por que encapsular chamadas MCP em funções assíncronas (`async def`)?"* | **Garantir chamadas não bloqueadoras (*non-blocking*)** |
| *"Qual biblioteca Python converte automaticamente type hints em schemas MCP?"* | **FastMCP** (com decorador `@mcp.tool`) |
| *"Transporte para MCP local (mesma máquina / CLI)"* | **stdio** |
| *"Transporte para MCP remoto / microsserviço em nuvem"* | **SSE** (Server-Sent Events) sobre HTTP |
| *"Classe do Azure SDK para conectar a servidor MCP remoto"* | **`MCPTool`** |
| *"Como pausar o agente para validação humana em chamadas MCP?"* | **`require_approval="always"`** (evento `mcp_approval_request`) |

---

## Aprofundar na Documentação

- [Avaliação do módulo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/connect-agent-to-mcp-tools/6-knowledge-check)
- Voltar ao [[00 - Índice do Módulo 09]]
- Módulo anterior: [[00 - Índice do Módulo 08]]
