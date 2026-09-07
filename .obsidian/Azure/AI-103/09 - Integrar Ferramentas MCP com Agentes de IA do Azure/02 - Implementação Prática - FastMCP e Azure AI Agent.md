---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - mcp
  - fastmcp
  - mcptool
  - python
  - human-in-the-loop
modulo: 09
---

# Implementação Prática: FastMCP e Azure AI Agent

Existem duas formas fundamentais de trabalhar com MCP no ecossistema do Azure AI:
1. **Cliente MCP Manual:** Descoberta via SDK MCP e registro das ferramentas no agente via `FunctionTool` assíncrono.
2. **Servidor MCP Remoto Nativo (`MCPTool`):** O próprio Azure AI Agent Service conecta diretamente ao servidor MCP remoto com suporte a governança e aprovação humana.

![[m09-fluxo-execucao-mcp.jpg]]

---

## 1. Criando o Servidor com FastMCP (Python)

A biblioteca **FastMCP** simplifica a criação do servidor: converte automaticamente as anotações de tipo (*type hints*) e as *docstrings* das funções no JSON Schema exigido pelo protocolo.

```python
from mcp.server.fastmcp import FastMCP

# 1. Inicializa o servidor FastMCP
mcp = FastMCP("SupportServer")

# 2. Registra funções com o decorador @mcp.tool
@mcp.tool()
def get_order_status(order_id: str) -> str:
    """Busca o status detalhado de um pedido pelo seu identificador único."""
    if order_id == "PED-1234":
        return "Pedido em transporte. Previsão: 2 dias úteis."
    return f"Pedido {order_id} não encontrado."

if __name__ == "__main__":
    mcp.run()
```

---

## 2. Cliente MCP: Wrappers Assíncronos e Registro no Agente

Como a invocação de ferramentas externas envolve I/O de rede, o cliente MCP **deve encapsular as chamadas em funções assíncronas (`async def`)**. Isso garante que o agente execute operações de forma **não bloqueadora**.

```python
import asyncio
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.projects.models import FunctionTool

async def build_mcp_agent():
    # 1. Configurar parâmetros do servidor local (stdio)
    server_params = StdioServerParameters(command="python", args=["server.py"])

    async with stdio_client(server_params) as (read_stream, write_stream):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()

            # 2. Descoberta dinâmica de ferramentas em runtime
            tools_result = await session.list_tools()
            agent_functions = []

            # 3. Criar wrapper assíncrono para cada ferramenta descoberta
            for tool in tools_result.tools:
                tool_name = tool.name
                tool_desc = tool.description

                async def make_wrapper(name=tool_name):
                    async def async_wrapper(**kwargs):
                        # Executa sem travar o loop de eventos
                        result = await session.call_tool(name, kwargs)
                        return result.content
                    async_wrapper.__name__ = name
                    async_wrapper.__doc__ = tool_desc
                    return async_wrapper

                wrapper = await make_wrapper(tool_name)
                agent_functions.append(wrapper)

            # 4. Registrar as funções descobertas no agente do Azure
            mcp_function_tool = FunctionTool(functions=agent_functions)

            project_client = AIProjectClient.from_connection_string(
                credential=DefaultAzureCredential(),
                conn_str="<PROJECT_CONNECTION_STRING>"
            )

            agent = project_client.agents.create_agent(
                model="gpt-4o",
                name="MCPOrderAgent",
                instructions="Use as ferramentas MCP para consultar pedidos.",
                tools=mcp_function_tool.definitions
            )
            return agent
```

---

## 3. Conexão Nativa com `MCPTool` e Servidores Remotos

Para servidores remotos (via SSE), o SDK do Azure AI Projects fornece a classe **`MCPTool`**, eliminando a necessidade de gerenciar o cliente manualmente:

```python
from azure.ai.projects.models import MCPTool

# 1. Configurar o MCPTool com endpoint remoto e regras de governança
mcp_tool = MCPTool(
    server_label="GitHubCopilotMCP",
    server_url="https://api.githubcopilot.com/mcp/",
    allowed_tools=["search_repositories", "get_issue_details"],
    require_approval="always"  # "always" (padrão) ou "never"
)

# 2. Injetar cabeçalhos de autenticação
mcp_tool.update_headers({
    "Authorization": "Bearer ghp_TokenSecretoExemplo",
    "Accept": "application/json"
})

# 3. Vincular diretamente ao agente
agent = project_client.agents.create_agent(
    model="gpt-4o",
    name="DevOpsAgent",
    instructions="Consulte issues e repositórios via MCP remoto.",
    tools=[mcp_tool]
)
```

---

## 4. Governança Humana no Circuito (*Human-in-the-Loop*)

Quando configurado com `require_approval="always"`:

1. O modelo decide disparar a ferramenta.
2. O runtime do agente pausa e coloca a execução no status `requires_action`.
3. A ação solicitada é do tipo **`mcp_approval_request`**.
4. A aplicação aprova ou rejeita via **`mcp_approval_response`**:

```python
# Verificação de ação pendente no Run
if run.status == "requires_action":
    for action in run.required_action.submit_tool_outputs.tool_calls:
        if action.type == "mcp_approval_request":
            approval_id = action.id
            
            # Envia aprovação humana explícita
            project_client.agents.submit_tool_outputs(
                thread_id=thread.id,
                run_id=run.id,
                tool_outputs=[{
                    "mcp_approval_response": {
                        "approval_request_id": approval_id,
                        "approve": True  # True para autorizar execução
                    }
                }]
            )
```

---

## Pontos que Costumam Confundir

> [!TIP]
> **Por que funções assíncronas?** No exame, a justificativa técnica para encapsular chamadas MCP em funções `async def` é **garantir execução não bloqueante de I/O** durante chamadas remotas de ferramentas.

> [!WARNING]
> **Padrão de Aprovação é `"always"`:** Se você omitir o parâmetro `require_approval` ao instanciar o `MCPTool`, o padrão de segurança é `"always"`. Para execução 100% autônoma, defina explicitamente `require_approval="never"`.

---

## Aprofundar na Documentação

- [Integrar ferramentas de agente usando servidor e cliente MCP](https://learn.microsoft.com/pt-br/training/modules/connect-agent-to-mcp-tools/3-mcp-client-server-setup)
- [Usar agentes de IA do Azure com servidores MCP](https://learn.microsoft.com/pt-br/training/modules/connect-agent-to-mcp-tools/4-use-azure-ai-agents-with-mcp)
- Página anterior: [[01 - Arquitetura e Descoberta Dinâmica no MCP]]
- Próxima página: [[03 - Questões Comentadas e Cola de Prova]]
