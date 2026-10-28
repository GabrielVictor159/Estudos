---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/extracao
  - ai/sdk
modulo: "12"
titulo: "Esquemas e analisadores"
nivel: iniciante
---

# Esquemas e analisadores

Um **esquema** descreve os campos desejados e seus tipos. Um **analisador** combina esse esquema com a configuração necessária para processar o conteúdo.

## Estrutura dos campos

| Tipo | Exemplo de uso |
|---|---|
| Texto | Nome do fornecedor |
| Número | Quantidade ou total |
| Data | Data de emissão |
| Objeto | Endereço com componentes |
| Lista | Itens de uma fatura |

Campos aninhados preservam relações: cada item mantém sua descrição, quantidade e preço. A interpretação semântica permite mapear rótulos diferentes, como “Nº da fatura” e “Invoice #”, para o mesmo conceito.

## Predefinido ou personalizado?

| Analisador | Finalidade |
|---|---|
| `prebuilt-invoice` | Campos de faturas |
| `prebuilt-documentSearch` | Conteúdo documental para pesquisa e RAG |
| `prebuilt-audioSearch` | Transcrição e informações de áudio |
| `prebuilt-videoSearch` | Conteúdo visual e falado de vídeo |
| Personalizado | Campos específicos do seu processo |

Um analisador de pesquisa não garante todos os campos de negócio que você imaginar. Para pedir campos próprios, configure um esquema personalizado.

## Exemplo Python: criar um analisador personalizado

Prepare o ambiente e os modelos conforme [[03 - Extração de informações de documentos]]. Salve como `criar_analisador.py`:

```python
import os

from dotenv import load_dotenv
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import (
    ContentAnalyzer, ContentFieldSchema, ContentFieldDefinition,
)
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import AzureError

load_dotenv()

analisador = ContentAnalyzer(
    base_analyzer_id="prebuilt-document",
    description="Identifica fornecedor e resume documentos de compras.",
    models={
        "completion": "gpt-4.1",
        "embedding": "text-embedding-3-large",
    },
    field_schema=ContentFieldSchema(
        name="Compras",
        fields={
            "Fornecedor": ContentFieldDefinition(
                type="string",
                description="Nome da empresa que emitiu o documento.",
            ),
            "Resumo": ContentFieldDefinition(
                type="string",
                method="generate",
                description="Resumo em português, em uma frase.",
            ),
        },
    ),
)

try:
    with ContentUnderstandingClient(
        endpoint=os.environ["FOUNDRY_ENDPOINT"],
        credential=AzureKeyCredential(os.environ["FOUNDRY_KEY"]),
    ) as client:
        operacao = client.begin_create_analyzer(
            analyzer_id="compras-resumo-v1",
            resource=analisador,
        )
        operacao.result()
        print("Analisador criado: compras-resumo-v1")
except AzureError as erro:
    raise SystemExit(f"Falha ao criar o analisador: {erro}") from erro
```

Execute uma vez com `python criar_analisador.py`. A criação registra a configuração no recurso; a análise de um arquivo ocorre em outra chamada. O identificador deve estar disponível para criação.

Para usar esse analisador, passe `analyzer_id="compras-resumo-v1"` no exemplo de análise de documentos.

## Pontos-chave para revisão AI-901

- Esquema define **quais dados**; analisador define **como processá-los**.
- Estrutura consistente não implica acerto garantido dos valores.
- O analisador não substitui o banco de dados da aplicação.
