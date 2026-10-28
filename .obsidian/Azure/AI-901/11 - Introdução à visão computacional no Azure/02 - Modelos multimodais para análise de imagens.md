---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/visao
  - ai/sdk
modulo: "11"
titulo: "Modelos multimodais para análise de imagens"
nivel: iniciante
---

# Modelos multimodais para análise de imagens

Um **modelo multimodal** trabalha com mais de um tipo de dado. Um modelo com visão pode receber texto e imagem juntos e responder sobre uma fotografia, um gráfico ou uma captura de tela.

## Uso no Foundry

1. Implante um modelo compatível com entrada de imagem.
2. Teste no Playground com imagem e pergunta.
3. Integre ao aplicativo com endpoint, credencial e **nome da implantação**.

Modelos com visão, como variantes compatíveis de GPT-4.1 e da série GPT-5, combinam imagens e instruções textuais. A imagem pode ser enviada por URL ou como dados Base64.

## Exemplo Python: analisar uma imagem

Instale `openai` e configure as variáveis de ambiente usadas abaixo. `ENDPOINT` deve seguir o formato `https://<recurso>.openai.azure.com/openai/v1/`.

```python
import os
from openai import OpenAI

client = OpenAI(
    base_url=os.environ["ENDPOINT"],
    api_key=os.environ["FOUNDRY_KEY"],
)

response = client.responses.create(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    input=[{
        "role": "user",
        "content": [
            {"type": "input_text", "text": "Descreva esta imagem."},
            {"type": "input_image", "image_url": os.environ["IMAGE_URL"]},
        ],
    }],
)
print(response.output_text)
```

O código requer recurso e implantação configurados. `IMAGE_URL` deve conter uma URL de imagem acessível ao serviço. A pergunta define o objetivo: descrever uma cena, explicar um gráfico ou identificar informações em uma captura de tela.

## Pontos-chave para revisão AI-901

- Texto orienta a análise; imagem fornece o conteúdo visual.
- `model` recebe o nome da implantação.
- A resposta textual está em `output_text`.

