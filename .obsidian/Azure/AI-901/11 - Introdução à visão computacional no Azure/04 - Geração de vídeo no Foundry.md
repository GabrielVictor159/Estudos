---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/visao
  - ai/generativa
modulo: "11"
titulo: "Geração de vídeo no Foundry"
nivel: iniciante
---

# Geração de vídeo no Foundry

**Geração de vídeo** transforma instruções em clipes. Uma descrição define a cena e o movimento desejados; uma imagem pode servir de referência visual. A família **Sora** oferece modelos voltados a esse tipo de criação.

## Capacidades

- **Sora 1:** geração orientada por texto e imagens.
- **Sora 2:** texto, imagem e remix de vídeo, com geração de áudio.
- **Playground:** experimentação com descrição, dimensões e duração.

Os cenários incluem storyboards, material promocional e conteúdo educacional. Disponibilidade depende de região, acesso e implantação.

## Por que o processamento é assíncrono?

Gerar vídeo consome recursos e leva tempo. A aplicação cria um trabalho, consulta seu andamento e baixa o resultado quando estiver pronto.

![[assets/m11-geracao-video-assincrona.png|1000]]

## Integração por REST

| Ação | Método e caminho após `/openai/v1` |
|---|---|
| Criar | `POST /videos` |
| Consultar | `GET /videos/{video_id}` |
| Baixar | `GET /videos/{video_id}/content?variant=video` |

## Exemplo Python: gerar e baixar um vídeo MP4

Este exemplo usa **Sora 2 pela API REST v1**: cria o trabalho, acompanha o status e baixa o vídeo após a conclusão. Instale os pacotes:

```powershell
python -m pip install --upgrade requests python-dotenv
```

Configure `.env` na pasta do script:

```dotenv
ENDPOINT=https://<recurso>.openai.azure.com/openai/v1/
FOUNDRY_KEY=<chave-do-recurso>
VIDEO_DEPLOYMENT_NAME=<nome-da-implantacao-sora-2>
```

Use uma implantação Sora 2 com acesso habilitado no recurso. Os valores de duração e resolução precisam ser aceitos pela implantação. Mantenha `.env` fora do controle de versão.

Salve como `gerar_video.py`:

```python
import os
import time
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

base_url = os.environ["ENDPOINT"].rstrip("/")
limite_espera = 15 * 60  # Limite local de acompanhamento: 15 minutos.

try:
    with requests.Session() as sessao:
        sessao.headers.update({"api-key": os.environ["FOUNDRY_KEY"]})

        # 1. Inicia a geração e recebe o identificador do trabalho.
        resposta = sessao.post(
            f"{base_url}/videos",
            json={
                "model": os.environ["VIDEO_DEPLOYMENT_NAME"],
                "prompt": (
                    "Um robô pequeno rega uma planta em uma mesa, "
                    "luz suave da manhã, câmera fixa."
                ),
                "size": "1280x720",
                "seconds": "8",
            },
            timeout=120,
        )
        resposta.raise_for_status()
        trabalho = resposta.json()
        video_id = trabalho["id"]
        print(f"Trabalho criado: {video_id}")

        # 2. Consulta o status sem criar outro trabalho.
        inicio = time.monotonic()
        while trabalho["status"] in {"queued", "in_progress"}:
            if time.monotonic() - inicio >= limite_espera:
                raise TimeoutError(
                    f"Limite local atingido. Consulte depois o ID {video_id}."
                )

            print(f"Status: {trabalho['status']}")
            time.sleep(5)
            resposta = sessao.get(
                f"{base_url}/videos/{video_id}", timeout=60
            )
            resposta.raise_for_status()
            trabalho = resposta.json()

        if trabalho["status"] != "completed":
            raise RuntimeError(
                f"Geração não concluída: {trabalho['status']}; "
                f"detalhes: {trabalho.get('error')}"
            )

        # 3. Baixa o conteúdo somente após a conclusão.
        resposta = sessao.get(
            f"{base_url}/videos/{video_id}/content",
            params={"variant": "video"},
            timeout=120,
        )
        resposta.raise_for_status()
        destino = Path("video_gerado.mp4")
        destino.write_bytes(resposta.content)
        print(f"Vídeo salvo em: {destino.resolve()}")

except (requests.RequestException, TimeoutError, RuntimeError) as erro:
    raise SystemExit(f"Falha ao gerar ou baixar o vídeo: {erro}") from erro
```

Execute com `python gerar_video.py`. O arquivo MP4 será salvo no diretório em que o comando for executado.

### O que observar no código

- **`POST`:** cria um único trabalho e obtém `video_id`.
- **`GET` no laço:** acompanha o mesmo trabalho a cada cinco segundos.
- **`completed`:** permite baixar o conteúdo; uma falha interrompe o fluxo.
- **`raise_for_status()`:** detecta erros HTTP, como autenticação ou parâmetros inválidos.
- **Limite local:** encerra a espera do script; não cancela o processamento no servidor. Guarde o ID para consultar novamente.
- **`timeout`:** limita a espera por cada chamada HTTP; é diferente do limite total de acompanhamento.

O código usa chamadas HTTP síncronas e espera entre consultas, enquanto o trabalho de geração é assíncrono no serviço.

## Pontos-chave para revisão AI-901

- A criação retorna um identificador para acompanhamento.
- Baixe o arquivo após `completed`.
- A demora decorre do processamento; REST também pode atender operações síncronas.

