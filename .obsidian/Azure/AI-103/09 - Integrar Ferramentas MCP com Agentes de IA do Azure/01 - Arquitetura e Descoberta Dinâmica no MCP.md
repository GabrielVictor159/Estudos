---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - mcp
  - arquitetura
  - json-rpc
modulo: 09
---

# Arquitetura e Descoberta Dinâmica no MCP

O **Model Context Protocol (MCP)** é um padrão aberto que resolve o problema de acoplamento rígido entre agentes de IA e ferramentas externas.

---

## O Problema das Integrações Rígidas vs. Abordagem MCP

```
MODO TRADICIONAL (Rígido):
[Agente IA] ─── Código rígido ───> [API Clima]
            ─── Código rígido ───> [Banco SQL]    (Qualquer alteração quebra o agente)
            ─── Código rígido ───> [CRM]

PADRÃO MCP ("Integrar uma vez"):
[Agente IA] ─── JSON-RPC Padronizado ───> [Servidor MCP] ───> [Qualquer Ferramenta / API]
```

* **Desacoplamento:** O agente foca apenas no raciocínio; o servidor MCP foca na execução da ferramenta.
* **Independência de Modelo:** Você pode trocar o LLM base (GPT-4o, Claude, Llama) sem alterar nenhuma linha de código das ferramentas.
* **Descoberta Dinâmica:** O agente consulta as ferramentas disponíveis em tempo de execução (*runtime*), sem precisar de definições estáticas compiladas no código.

---

## Papéis na Arquitetura

| Componente | Papel Arquitetural | Responsabilidade Principal |
| :--- | :--- | :--- |
| **Servidor MCP (*Server*)** | Provedor de Ferramentas | • Hospeda as funções de negócio (`@mcp.tool`).<br>• Gera schemas JSON automaticamente a partir de anotações de tipo e docstrings.<br>• Executa as ferramentas quando solicitado. |
| **Cliente MCP (*Client*)** | Ponte de Comunicação | • Conecta-se ao servidor MCP.<br>• Executa a descoberta dinâmica via `session.list_tools()`.<br>• Encapsula chamadas assíncronas via `session.call_tool()`. |
| **Agente de IA do Azure** | Orquestrador Cognitivo | • Recebe os schemas do cliente.<br>• Decide dinamicamente se e quando chamar a ferramenta.<br>• Formata a resposta final ao usuário com base no resultado retornado. |

---

## Protocolo JSON-RPC 2.0: Descoberta e Invocação

A comunicação entre Cliente e Servidor MCP ocorre em duas fases estruturadas sob JSON-RPC:

### 1. Descoberta (`tools/list`)
O cliente envia a requisição de catálogo e o servidor responde com a lista completa de ferramentas e schemas:
```json
// Requisição do Cliente:
{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}

// Resposta do Servidor:
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "tools": [
      {
        "name": "get_order_status",
        "description": "Busca o status detalhado de um pedido.",
        "inputSchema": {
          "type": "object",
          "properties": {
            "order_id": {"type": "string", "description": "ID do pedido"}
          },
          "required": ["order_id"]
        }
      }
    ]
  }
}
```

### 2. Invocação (`tools/call`)
Quando o modelo decide acionar a ferramenta, o cliente despacha a chamada com os argumentos extraídos:
```json
// Requisição do Cliente:
{
  "jsonrpc": "2.0",
  "id": 2,
  "method": "tools/call",
  "params": {
    "name": "get_order_status",
    "arguments": {"order_id": "PED-1234"}
  }
}

// Resposta do Servidor:
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [{"type": "text", "text": "Pedido em transporte. Previsão: 2 dias úteis."}],
    "isError": false
  }
}
```

---

## Camadas de Transporte: `stdio` vs. `SSE`

| Característica | Transporte `stdio` | Transporte `SSE` (Server-Sent Events) |
| :--- | :--- | :--- |
| **Localização** | Mesma máquina (subprocesso local) | Servidor remoto (rede / nuvem) |
| **Protocolo base** | Entrada e saída padrão (`stdin`/`stdout`) | HTTP GET contínuo (eventos) + HTTP POST (mensagens) |
| **Ideal para** | Ferramentas locais de desenvolvimento, scripts CLI | Microsserviços empresariais e integrações corporativas |

---

## Pontos que Costumam Confundir

> [!NOTE]
> **Servidor MCP NÃO executa o LLM:** O servidor MCP apenas guarda e executa as ferramentas. O LLM e a lógica do agente rodam no Azure AI Foundry / OpenAI.

> [!IMPORTANT]
> **Descoberta Dinâmica vs. Arquivo Estático:** O cliente **não** lê um JSON salvo em disco; ele executa uma chamada em runtime (`session.list_tools()`) diretamente para o servidor ativo. Se novas ferramentas forem adicionadas ao servidor, o cliente as detecta na próxima inicialização sem alterar o código do agente.

---

## Aprofundar na Documentação

- [Entender a descoberta de ferramentas do MCP no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/connect-agent-to-mcp-tools/2-understand-mcp-tool-discovery)
- Voltar ao [[00 - Índice do Módulo 09]]
- Próxima página: [[02 - Implementação Prática - FastMCP e Azure AI Agent]]
