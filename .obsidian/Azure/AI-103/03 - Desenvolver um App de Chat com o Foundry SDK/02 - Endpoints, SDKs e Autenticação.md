---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - sdk
  - desenvolvimento
modulo: 03
---

# Endpoints, SDKs e Autenticação

Três decisões de conexão, tomadas juntas: **por qual endpoint** o aplicativo entra, **com qual biblioteca** ele fala e **com qual credencial** ele se identifica.

![[m03-endpoints-sdks.png]]

---

## Os dois endpoints

| Endpoint | Formato | Serve para |
|---|---|---|
| **Endpoint do projeto** | `https://{resource-name}.services.ai.azure.com/api/projects/<project-name>` | Alcançar o projeto do Foundry — agentes, avaliações, metadados |
| **Endpoint do Azure OpenAI** | `https://{resource-name}.openai.azure.com/openai/v1` | Superfície compatível com a OpenAI |

Repare no padrão das URLs: o endpoint do projeto vive em **`services.ai.azure.com`** e inclui `/api/projects/`; o do Azure OpenAI vive em **`openai.azure.com`** e termina em **`/openai/v1`**.

---

## Os dois SDKs de cliente

### SDK do Microsoft Foundry (Azure AI Projects)

| Linguagem | Pacote |
|---|---|
| Python | [`azure-ai-projects`](https://pypi.org/project/azure-ai-projects?azure-portal=true) |
| .NET | [`Azure.AI.Projects`](https://www.nuget.org/packages/Azure.AI.Projects?azure-portal=true) |
| JavaScript | [`@azure/ai-projects`](https://www.npmjs.com/package/@azure/ai-projects?azure-portal=true) |

**Use quando o aplicativo precisa de:**

- Foundry Agent Service
- fluxos de invocação e aprovação de ferramentas
- avaliações de nuvem
- rastreamento e observabilidade
- modelos diretos do Foundry
- metadados do projeto e recursos de governança

### SDK da OpenAI

Pacote Python: `openai`.

**Use quando o aplicativo precisa de:**

- compatibilidade máxima com a API da OpenAI
- portabilidade entre OpenAI e Azure OpenAI
- APIs de Chat Completions, Responses e Imagens
- dependência mínima de conceitos específicos do Foundry

---

## Instalar as dependências

```bash
# Caminho do SDK do Foundry
pip install azure-ai-projects azure-identity openai

# Caminho apenas do SDK da OpenAI
pip install openai azure-identity
```

`azure-identity` aparece nos dois caminhos — é o pacote que fornece a `DefaultAzureCredential`.

---

## O detalhe que amarra os dois mundos

O cliente do projeto **entrega um cliente compatível com a OpenAI**:

```python
from azure.identity import DefaultAzureCredential
from azure.ai.projects import AIProjectClient

project_endpoint = "https://{resource-name}.services.ai.azure.com/api/projects/<project-name>"

project_client = AIProjectClient(
    credential=DefaultAzureCredential(),
    endpoint=project_endpoint
)

openai_client = project_client.get_openai_client(api_version="2024-10-21")
```

Ou seja: dá para conectar pelo **endpoint do projeto** e ainda assim escrever o código de chat no **estilo OpenAI**. Não é uma escolha excludente.

---

## Os padrões de autenticação

![[m03-autenticacao.png]]

### 1. Microsoft Entra ID — recomendado

Com o **SDK da OpenAI**, usando um provedor de token:

```python
from openai import OpenAI
from azure.identity import DefaultAzureCredential, get_bearer_token_provider

token_provider = get_bearer_token_provider(
    DefaultAzureCredential(), "https://ai.azure.com/.default"
)

openai_client = OpenAI(
    base_url="https://{resource-name}.openai.azure.com/openai/v1/",
    api_key=token_provider,
)
```

O `token_provider` ocupa o lugar da chave. A `DefaultAzureCredential` resolve identidade gerenciada, credenciais da CLI, variáveis de ambiente e outras fontes, na ordem.

### 2. Chave de API

```python
import os
from openai import OpenAI

openai_client = OpenAI(
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    base_url="https://{resource-name}.openai.azure.com/openai/v1/"
)
```

### 3. Variáveis de ambiente

```python
from openai import OpenAI

openai_client = OpenAI()  # Usa OPENAI_BASE_URL e OPENAI_API_KEY
```

### 4. Cliente `AzureOpenAI` com versão de API explícita

```python
import os
from openai import AzureOpenAI

openai_client = AzureOpenAI(
    azure_endpoint="https://{resource-name}.openai.azure.com",
    api_key=os.getenv("AZURE_OPENAI_KEY"),
    api_version="2024-10-21",
)
```

Repare: aqui o `azure_endpoint` vai **sem** o sufixo `/openai/v1`, porque a classe monta o caminho a partir da `api_version`.

---

## Tabela de decisão: requisito → escolha

| O cenário exige… | Escolha |
|---|---|
| "Chamar um agente do Foundry Agent Service" | Endpoint do **projeto** + **SDK do Foundry** |
| "Registrar rastreamento e telemetria do fluxo de IA" | **SDK do Foundry** |
| "Executar avaliações na nuvem a partir do código" | **SDK do Foundry** |
| "Ler metadados do projeto ou aplicar governança" | **SDK do Foundry** |
| "Migrar um app que já usa a biblioteca da OpenAI" | Endpoint do **Azure OpenAI** + **SDK da OpenAI** |
| "O mesmo código precisa rodar contra a OpenAI e contra o Azure" | **SDK da OpenAI** |
| "Gerar imagens além de texto" | **SDK da OpenAI** (APIs de Imagens) |
| "Nenhum segredo no código-fonte" | **Microsoft Entra ID** |
| "Aplicativo em VM ou App Service com identidade gerenciada" | **Microsoft Entra ID** |
| "Script local para testar rapidamente" | **Chave de API** |
| "Mesma imagem de container em dev, homologação e produção" | **Variáveis de ambiente** |
| "Preciso travar a versão da API que o cliente usa" | Cliente **`AzureOpenAI`** com `api_version` |
| "Linguagem sem SDK oficial" | **REST API** |

---

## Pontos que costumam confundir

**Endpoint e SDK não são a mesma decisão.** Pelo endpoint do projeto você ainda obtém um cliente OpenAI (`get_openai_client`). O que amarra de verdade é a **capacidade** que o app precisa: agentes, avaliações e observabilidade exigem o SDK do Foundry.

**As duas URLs têm domínios diferentes.** `services.ai.azure.com/api/projects/...` para o projeto; `openai.azure.com/openai/v1` para o Azure OpenAI. Questões de identificação de endpoint se resolvem por esse detalhe.

**`OpenAI` × `AzureOpenAI`.** A classe `OpenAI` recebe `base_url` já com `/openai/v1/`; a classe `AzureOpenAI` recebe `azure_endpoint` sem o sufixo, mais uma `api_version`. Confundir as duas é erro comum de leitura de código.

**`azure-identity` é obrigatório nos dois caminhos.** Não é um pacote "do Foundry" — é o que fornece a credencial do Entra ID em qualquer cenário.

**`api_key=token_provider` não é gambiarra.** É o padrão suportado: o parâmetro aceita um provedor de token em vez de uma string de chave.

**Chave é conveniência, Entra ID é produção.** Enunciados com "rotação de credenciais", "identidade gerenciada" ou "sem armazenar segredos" sempre respondem Entra ID.

---

## Aprofundar na documentação

- [Escolher um endpoint e um SDK — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/03-microsoft-foundry-sdk)
- [Visão geral do SDK do Microsoft Foundry](https://learn.microsoft.com/pt-br/azure/foundry/how-to/develop/sdk-overview?azure-portal=true)
- Páginas relacionadas: [[03 - API de Respostas]] · [[04 - Ferramentas de Desenvolvimento e SDKs]] · [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]]
