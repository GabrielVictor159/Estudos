---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/extracao
  - ai/sdk
modulo: "12"
titulo: "Extração de informações de documentos"
nivel: iniciante
---

# Extração de informações de documentos

Documentos como faturas e recibos podem ser convertidos em campos estruturados. Texto e layout ajudam a relacionar valores a conceitos como fornecedor, data, itens e total, mesmo quando a disposição visual muda.

## Texto, campos e confiança

- **Markdown:** representa o conteúdo para leitura e processamento textual.
- **Campos:** representam as informações identificadas segundo o esquema.
- **Confiança:** quando disponível, auxilia a decidir se um valor precisa de revisão; não garante que ele esteja correto.

Um total extraído pode ser conferido com regras do negócio antes de alimentar um processo financeiro.

## Preparar o ambiente Python

Os exemplos usam Python 3.9 ou superior e SDK `1.1.0`:

```powershell
python -m pip install azure-ai-contentunderstanding==1.1.0 python-dotenv
```

Crie `.env` na pasta dos scripts:

```dotenv
FOUNDRY_ENDPOINT=https://<recurso>.services.ai.azure.com/
FOUNDRY_KEY=<chave-do-recurso>
GPT_4_1_DEPLOYMENT=<implantacao-gpt-4.1>
GPT_4_1_MINI_DEPLOYMENT=<implantacao-gpt-4.1-mini>
EMBEDDING_DEPLOYMENT=<implantacao-text-embedding-3-large>
DOCUMENT_URL=https://<seu-host>/fatura.pdf
```

O endpoint é o do recurso Foundry, sem `/openai/v1/`. A URL de entrada deve estar acessível ao serviço. Mantenha `.env` fora do controle de versão.

### Configurar os modelos do recurso

Implante `gpt-4.1`, `gpt-4.1-mini` e `text-embedding-3-large` e associe seus nomes às implantações. Faturas usam GPT-4.1; os analisadores de pesquisa de áudio e vídeo usam GPT-4.1-mini. Os exemplos pressupõem os modelos necessários configurados em uma região compatível.

Salve como `configurar_modelos.py` e execute uma vez por recurso, ou quando mudar as implantações:

```python
import os

from dotenv import load_dotenv
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import AzureError

load_dotenv()

try:
    with ContentUnderstandingClient(
        endpoint=os.environ["FOUNDRY_ENDPOINT"],
        credential=AzureKeyCredential(os.environ["FOUNDRY_KEY"]),
    ) as client:
        client.update_defaults(model_deployments={
            "gpt-4.1": os.environ["GPT_4_1_DEPLOYMENT"],
            "gpt-4.1-mini": os.environ["GPT_4_1_MINI_DEPLOYMENT"],
            "text-embedding-3-large": os.environ["EMBEDDING_DEPLOYMENT"],
        })
        print("Mapeamento de modelos configurado.")
except AzureError as erro:
    raise SystemExit(f"Falha na configuração: {erro}") from erro
```

Execute com `python configurar_modelos.py`. As chaves do dicionário são modelos; os valores são nomes de implantações existentes. Essa chamada altera os padrões do recurso e requer permissões para configurá-los, incluindo a atribuição apropriada de **Cognitive Services User**.

## Exemplo Python: analisar uma fatura e salvar JSON

Salve como `analisar_fatura.py`:

```python
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import AnalysisInput
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import AzureError

load_dotenv()

try:
    with ContentUnderstandingClient(
        endpoint=os.environ["FOUNDRY_ENDPOINT"],
        credential=AzureKeyCredential(os.environ["FOUNDRY_KEY"]),
    ) as client:
        operacao = client.begin_analyze(
            analyzer_id="prebuilt-invoice",
            inputs=[AnalysisInput(url=os.environ["DOCUMENT_URL"])],
        )
        print("Operação:", operacao.operation_id)
        resultado = operacao.result()

        for conteudo in resultado.contents:
            print(conteudo.markdown or "")
            for nome, campo in (conteudo.fields or {}).items():
                print(f"{nome}: {campo.value}")

        destino = Path("fatura_resultado.json")
        destino.write_text(
            json.dumps(resultado.as_dict(), ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print("Resultado salvo em:", destino.resolve())
except AzureError as erro:
    raise SystemExit(f"Falha na análise: {erro}") from erro
```

Execute com `python analisar_fatura.py`. `begin_analyze()` inicia uma operação; `result()` aguarda sua conclusão e o SDK realiza as consultas de acompanhamento.

O JSON preserva a estrutura completa; `campo.value` permite acessar o valor no objeto Python. Listas e objetos exigem percorrer seus elementos para tratar itens e subcampos individualmente.

## Pontos-chave para revisão AI-901

- `prebuilt-invoice` identifica o analisador, não uma implantação de modelo.
- Enviar o documento e obter o resultado são etapas de uma operação demorada.
- Cabe à aplicação validar, armazenar e encaminhar os dados extraídos.
