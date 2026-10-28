---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/extracao
  - ai/sdk
modulo: "12"
titulo: "Extração de informações de áudio e vídeo"
nivel: iniciante
---

# Extração de informações de áudio e vídeo

Gravações contêm informações que podem ser transformadas em transcrições, resumos e campos úteis para uma aplicação.

## Áudio: da fala às informações

Uma transcrição registra o que foi dito. Um esquema permite pedir informações específicas, como motivo do contato, resumo e ação solicitada.

Exemplo fictício: “Sou Bruno. Preciso remarcar a entrega para sexta. Podem me ligar para combinar o horário?”. Uma extração pode organizar **solicitante**, **alteração solicitada** e **próxima ação**.

## Vídeo: contexto visual e temporal

A análise pode combinar quadros visuais e transcrição do áudio. A posição temporal ajuda a associar informações aos momentos em que aparecem.

Em uma reunião gravada, um esquema personalizado pode pedir assunto, decisões e ações. Os campos disponíveis dependem do analisador; não presuma que toda análise retorna uma lista de tarefas.

## Analisadores de pesquisa

| Identificador | Uso |
|---|---|
| `prebuilt-audioSearch` | Transcrição, informações de falantes e tempo, resumo |
| `prebuilt-videoSearch` | Conteúdo visual, áudio e resumos com contexto temporal |

## Exemplo Python: analisar áudio ou vídeo

Use a instalação e a configuração de modelos de [[03 - Extração de informações de documentos]]. Acrescente ao mesmo `.env`:

```dotenv
AUDIO_URL=https://<seu-host>/chamada.wav
VIDEO_URL=https://<seu-host>/reuniao.mp4
```

Salve como `analisar_midia.py`. O argumento seleciona o analisador e a URL correspondentes:

```python
import argparse
import json
import os
from pathlib import Path

from dotenv import load_dotenv
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.ai.contentunderstanding.models import AnalysisInput
from azure.core.credentials import AzureKeyCredential
from azure.core.exceptions import AzureError

load_dotenv()

parser = argparse.ArgumentParser()
parser.add_argument("tipo", choices=["audio", "video"])
tipo = parser.parse_args().tipo
analisador, variavel_url = {
    "audio": ("prebuilt-audioSearch", "AUDIO_URL"),
    "video": ("prebuilt-videoSearch", "VIDEO_URL"),
}[tipo]

try:
    with ContentUnderstandingClient(
        endpoint=os.environ["FOUNDRY_ENDPOINT"],
        credential=AzureKeyCredential(os.environ["FOUNDRY_KEY"]),
    ) as client:
        operacao = client.begin_analyze(
            analyzer_id=analisador,
            inputs=[AnalysisInput(url=os.environ[variavel_url])],
        )
        print("Operação:", operacao.operation_id)
        resultado = operacao.result()

        for indice, conteudo in enumerate(resultado.contents, start=1):
            print(f"Conteúdo {indice}:")
            print(conteudo.markdown or "")

        destino = Path(f"{tipo}_resultado.json")
        destino.write_text(
            json.dumps(resultado.as_dict(), ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        print("Resultado salvo em:", destino.resolve())
except AzureError as erro:
    raise SystemExit(f"Falha na análise de {tipo}: {erro}") from erro
```

Para áudio:

```powershell
python analisar_midia.py audio
```

Para vídeo:

```powershell
python analisar_midia.py video
```

O script salva `audio_resultado.json` ou `video_resultado.json`. Percorra todos os conteúdos: um vídeo pode produzir vários segmentos. O JSON preserva os detalhes disponíveis para processamento posterior.

## Pontos-chave para revisão AI-901

- Transcrição e extração de campos cumprem funções diferentes.
- A modalidade muda o analisador e o conteúdo de entrada; o fluxo básico de chamada é semelhante.
- A análise é assíncrona no serviço, embora `result()` bloqueie o script enquanto aguarda.
