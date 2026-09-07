---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - python
  - sdk
  - openapi
  - azure-functions
  - function-tool
modulo: 08
---

# Integração Prática no SDK: Código e OpenAPI

Integrar ferramentas personalizadas no Microsoft Foundry Agent Service segue um princípio essencial: **a integração é puramente declarativa**. O desenvolvedor registra as assinaturas técnicas, os parâmetros e as descrições contextuais das ferramentas no array `tools` do agente, e o modelo assume a responsabilidade de decidir quando acioná-las.

Abaixo estão os três padrões de código oficiais cobrados na certificação utilizando a biblioteca Python `azure-ai-projects`.

![[m08-fluxo-openapi.jpg]]

---

## 1. Padrão: Chamada de Função Local (*FunctionTool*)

Esse padrão é usado quando a lógica reside diretamente no código-fonte da aplicação que executa o agente.

### Passo 1: Implementar a Função de Negócio em Python
```python
import json

def recent_snowfall(location: str) -> str:
    """
    Consulta o acumulado recente de neve para uma determinada cidade.
    :param location: O nome da cidade (ex: 'Denver', 'Seattle').
    :return: String JSON com os dados consolidados.
    """
    mock_snow_data = {
        "Seattle": "0 inches", 
        "Denver": "2 inches",
        "Aspen": "14 inches"
    }
    snow = mock_snow_data.get(location, "Dados de neve indisponíveis para esta localidade.")
    return json.dumps({"location": location, "snowfall": snow})
```

### Passo 2: Declarar o `FunctionTool` e Criar a Versão do Agente
```python
from azure.ai.projects.models import FunctionTool, PromptAgentDefinition, Tool

# 1. Declarar a ferramenta com esquema de parâmetros estrito
function_tool = FunctionTool(
    name="recent_snowfall",
    description="Get recent snowfall totals for a given location.",
    parameters={
        "type": "object",
        "properties": {
            "location": {
                "type": "string", 
                "description": "The city name to check snowfall for."
            },
        },
        "required": ["location"],
        "additionalProperties": False  # Garante conformidade estrita ao schema
    },
    strict=True,
)

# 2. Adicionar à lista de ferramentas do agente
tools: list[Tool] = [function_tool]

# 3. Criar a versão do agente no projeto
agent = project_client.agents.create_version(
    name="snowfall-agent",
    definition=PromptAgentDefinition(
        model="gpt-4.1",
        instructions=(
            "You are a helpful winter sports assistant. "
            "Use the provided functions to check recent snowfall before recommending ski resorts."
        ),
        tools=tools,
    )
)
```

---

## 2. Padrão: Azure Functions com Gatilho de Fila (*AzureFunctionTool*)

Esse padrão é indicado para operações assíncronas em nuvem com desacoplamento via filas de mensageria (*Storage Queues*).

```python
from azure.ai.projects.models import (
    AzureFunctionTool,
    AzureFunctionDefinition,
    AzureFunctionBinding,
    AzureFunctionStorageQueue,
    AzureFunctionDefinitionFunction,
    PromptAgentDefinition,
)

# 1. Definir a ferramenta apontando para as filas do Azure Storage
tool = AzureFunctionTool(
    azure_function=AzureFunctionDefinition(
        input_binding=AzureFunctionBinding(
            storage_queue=AzureFunctionStorageQueue(
                queue_name="input-weather-requests",
                queue_service_endpoint="https://meustorage.queue.core.windows.net",
            )
        ),
        output_binding=AzureFunctionBinding(
            storage_queue=AzureFunctionStorageQueue(
                queue_name="output-weather-results",
                queue_service_endpoint="https://meustorage.queue.core.windows.net",
            )
        ),
        function=AzureFunctionDefinitionFunction(
            name="queue_trigger_weather",
            description="Asynchronously retrieves weather forecast for a given location",
            parameters={
                "type": "object",
                "properties": {
                    "location": {
                        "type": "string", 
                        "description": "Location to determine weather for"
                    }
                },
                "required": ["location"],
            },
        ),
    )
)

# 2. Acoplar a ferramenta ao agente
agent = project_client.agents.create_version(
    agent_name="ServerlessWeatherAgent",
    definition=PromptAgentDefinition(
        model="gpt-4.1",
        instructions="You are a helpful weather assistant. Use the Azure Function tool when weather updates are requested.",
        tools=[tool],
    ),
)
```

---

## 3. Padrão: Especificação OpenAPI 3.0 (*OpenApiTool*)

Esse padrão conecta o agente a qualquer API REST existente usando a especificação OpenAPI 3.0 / 3.1.

### Passo 1: O Contrato Formal OpenAPI (`weather_openapi.json`)
```json
{
  "openapi": "3.1.0",
  "info": {
    "title": "Weather Data API",
    "description": "Retrieves current weather data for a location using wttr.in service.",
    "version": "v1.0.0"
  },
  "servers": [
    {
      "url": "https://wttr.in"
    }
  ],
  "auth": [],
  "paths": {
    "/{location}": {
      "get": {
        "description": "Get weather information for a specific location",
        "operationId": "GetCurrentWeather",
        "parameters": [
          {
            "name": "location",
            "in": "path",
            "description": "City or location to retrieve the weather for",
            "required": true,
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "format",
            "in": "query",
            "description": "Output format identifier (always use j1)",
            "required": true,
            "schema": {
              "type": "string",
              "default": "j1"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response with weather data",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object"
                }
              }
            }
          },
          "404": {
            "description": "Location not found"
          }
        }
      }
    }
  }
}
```

### Passo 2: Registrar a Ferramenta no Python SDK
```python
from typing import Any, cast
import jsonref
from azure.ai.projects.models import (
    OpenApiTool,
    OpenApiFunctionDefinition,
    OpenApiAnonymousAuthDetails,
    PromptAgentDefinition,
)

# 1. Carregar e resolver referências do arquivo OpenAPI
with open("weather_openapi.json", "r", encoding="utf-8") as f:
    openapi_weather = cast(dict[str, Any], jsonref.loads(f.read()))

# 2. Configurar a ferramenta OpenAPI com autenticação anônima
openapi_tool = OpenApiTool(
    openapi=OpenApiFunctionDefinition(
        name="get_weather",
        spec=openapi_weather,
        description="Retrieve live weather and forecast information for any location.",
        auth=OpenApiAnonymousAuthDetails(),  # Autenticação Anônima para API pública
    )
)

# 3. Vincular a ferramenta ao agente
agent = project_client.agents.create_version(
    agent_name="openapi-weather-agent",
    definition=PromptAgentDefinition(
        model="gpt-4.1",
        instructions="You are an expert weather assistant. Use the get_weather API tool to retrieve live conditions.",
        tools=[openapi_tool],
    ),
)
```

---

## Modelos de Autenticação em Ferramentas OpenAPI

O parâmetro `auth` no `OpenApiFunctionDefinition` aceita três modalidades essenciais:

| Classe de Autenticação | Finalidade | Exemplo de Aplicação |
| :--- | :--- | :--- |
| `OpenApiAnonymousAuthDetails` | APIs públicas abertas sem restrições de cabeçalho. | APIs públicas de clima, cotação de moedas abertas ou CEP. |
| `OpenApiApiKeyAuthDetails` | Envio seguro de chave secreta no cabeçalho HTTP (`header`) ou query string. | APIs comerciais de fornecedores externos com token de subscrição. |
| `OpenApiManagedIdentityAuthDetails` | Autenticação corporativa baseada no Microsoft Entra ID sem chaves estáticas. | Microsserviços internos hospedados no Azure App Service ou Container Apps. |

---

## Pontos que Costumam Confundir

> [!TIP]
> **A Importância da `description` e `strict=True`:** O modelo de IA decide se chama a função com base na descrição semântica (`description`). Uma descrição vaga faz o modelo ignorar a ferramenta. O parâmetro `strict=True` (com `additionalProperties: False`) obriga o modelo a respeitar rigorosamente os tipos e parâmetros obrigatórios especificados.

> [!NOTE]
> **Resolução de `$ref` com `jsonref`:** Arquivos OpenAPI frequentemente usam `$ref` para reaproveitar schemas. Ao carregar em Python, a biblioteca `jsonref.loads()` resolve essas referências para garantir que o Foundry receba o schema completo sem ponteiros quebrados.

---

## Aprofundar na Documentação

- [Como integrar ferramentas personalizadas no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/build-agent-with-custom-tools/4-how-use-custom-tools)
- Página anterior: [[02 - Opções de Implementação de Ferramentas Personalizadas]]
- Próxima página: [[04 - Questões de Exame e Pontos de Atenção]]
