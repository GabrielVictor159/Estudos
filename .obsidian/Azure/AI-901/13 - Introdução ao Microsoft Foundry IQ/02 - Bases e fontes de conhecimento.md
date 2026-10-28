---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
  - ai/sdk
modulo: "13"
titulo: "Bases e fontes de conhecimento"
nivel: iniciante
---

# Bases e fontes de conhecimento

Uma **base de conhecimento** reúne fontes relacionadas e configura como recuperá-las. Uma **fonte de conhecimento** descreve a conexão com o conteúdo pesquisável.

## Conteúdo indexado e remoto

| Abordagem | Funcionamento |
|---|---|
| Indexada | O conteúdo é preparado e disponibilizado em um índice de pesquisa |
| Remota | A recuperação consulta o sistema conectado, conforme o conector |

As fontes podem incluir índices do Azure AI Search, Blob Storage, SharePoint, OneLake e conteúdo público da Web. O suporte e o comportamento dependem do tipo de conexão.

## Organização por domínio

Uma base de Finanças pode reunir políticas de despesas e procedimentos de prestação de contas. Seu escopo deve ter perguntas claras, fontes aprovadas e conteúdo atualizado.

Metadados como título, data e categoria ajudam a recuperar e identificar documentos. Conteúdo duplicado ou contraditório dificulta selecionar a informação adequada.

## Preparar os exemplos Python

Instale os pacotes e autentique sua conta na Azure CLI:

```powershell
python -m pip install --upgrade requests azure-identity python-dotenv
az login
```

Crie `.env` na pasta dos scripts:

```dotenv
SEARCH_ENDPOINT=https://<servico>.search.windows.net
SEARCH_INDEX_NAME=<indice-existente>
SEARCH_SEMANTIC_CONFIG=<configuracao-semantica-do-indice>
KNOWLEDGE_SOURCE_NAME=politicas-fonte
KNOWLEDGE_BASE_NAME=politicas-kb
AZURE_OPENAI_RESOURCE=https://<recurso>.openai.azure.com
RETRIEVAL_MODEL_DEPLOYMENT=<implantacao-para-recuperacao>
RETRIEVAL_MODEL_NAME=<nome-base-do-modelo-compativel>
```

Os exemplos REST usam `2026-08-01-preview` para planejamento com modelo. Mantenha essa versão consistente entre criação, consulta e MCP.

### Pré-requisitos do recurso

- Índice já populado, com `content` pesquisável e recuperável e campos `title` e `url` recuperáveis.
- Configuração semântica que utilize o conteúdo apropriado do índice.
- Modelo compatível implantado para o planejamento da recuperação.
- Identidade do Azure AI Search com acesso ao modelo, por exemplo **Cognitive Services OpenAI User** no recurso correspondente.
- Conta que cria os objetos com **Search Service Contributor**; identidade de consulta com **Search Index Data Reader**.

## Exemplo Python: criar fonte e base de conhecimento

Salve como `configurar_base.py`. O script cria ou atualiza as definições; o conteúdo do índice deve existir antes da execução.

```python
import os

import requests
from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential
from azure.core.exceptions import AzureError

load_dotenv()
endpoint = os.environ["SEARCH_ENDPOINT"].rstrip("/")
versao = "2026-08-01-preview"
fonte = os.environ["KNOWLEDGE_SOURCE_NAME"]
base = os.environ["KNOWLEDGE_BASE_NAME"]

def salvar(sessao, caminho, definicao):
    resposta = sessao.put(
        f"{endpoint}/{caminho}",
        params={"api-version": versao},
        json=definicao,
        timeout=120,
    )
    resposta.raise_for_status()

try:
    with DefaultAzureCredential() as credencial, requests.Session() as sessao:
        token = credencial.get_token("https://search.azure.com/.default")
        sessao.headers.update({
            "Authorization": f"Bearer {token.token}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        })

        salvar(sessao, f"knowledgesources/{fonte}", {
            "name": fonte,
            "kind": "searchIndex",
            "description": "Políticas e procedimentos de despesas.",
            "searchIndexParameters": {
                "searchIndexName": os.environ["SEARCH_INDEX_NAME"],
                "semanticConfigurationName": os.environ["SEARCH_SEMANTIC_CONFIG"],
                "sourceDataFields": [
                    {"name": "content"}, {"name": "title"}, {"name": "url"},
                ],
            },
        })

        salvar(sessao, f"knowledgebases/{base}", {
            "name": base,
            "knowledgeSources": [{"name": fonte}],
            "outputMode": "extractiveData",
            "retrievalReasoningEffort": {"kind": "auto"},
            "models": [{
                "kind": "azureOpenAI",
                "azureOpenAIParameters": {
                    "resourceUri": os.environ["AZURE_OPENAI_RESOURCE"],
                    "deploymentId": os.environ["RETRIEVAL_MODEL_DEPLOYMENT"],
                    "modelName": os.environ["RETRIEVAL_MODEL_NAME"],
                },
            }],
        })
        print(f"Fonte {fonte} e base {base} configuradas.")
except (requests.RequestException, AzureError) as erro:
    raise SystemExit(f"Falha na configuração: {erro}") from erro
```

Execute com `python configurar_base.py`. `deploymentId` identifica a implantação; `modelName` identifica seu modelo base. O modo `extractiveData` prepara a base para devolver conteúdo de apoio à geração da resposta.

## Pontos-chave para revisão AI-901

- Base, fonte e índice representam recursos distintos.
- Criar uma fonte para um índice existente não carrega documentos nesse índice.
- Uma base deve reunir informações relacionadas ao domínio que atende.
