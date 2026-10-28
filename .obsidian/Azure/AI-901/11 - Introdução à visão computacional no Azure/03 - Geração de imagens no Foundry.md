---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/visao
  - ai/generativa
modulo: "11"
titulo: "Geração de imagens no Foundry"
nivel: iniciante
---

# Geração de imagens no Foundry

Na **geração de imagens**, um prompt descreve o resultado visual desejado. Modelos apropriados também permitem editar imagens existentes.

## Modelos e características

| Família ou modelo | Característica |
|---|---|
| GPT-Image-1.5 | Fidelidade visual e edição precisa |
| GPT-Image-1 | Geração e edição de uso geral |
| GPT-Image-1-Mini | Menor custo e latência |
| FLUX | Alternativa de geração de imagens de terceiros |

A escolha depende do equilíbrio entre fidelidade visual, edição, custo e latência. A disponibilidade varia conforme o projeto e a região.

## Fluxo de trabalho

1. Implante um modelo de geração de imagens.
2. Teste uma descrição no Playground.
3. Ajuste o prompt até obter o resultado desejado.
4. Integre usando uma API compatível com o modelo implantado.

Exemplo didático de prompt: “Ilustração de um computador antigo, monitor de tubo, fundo claro e estilo de cartaz educativo”.

## Integração programática

A integração pode usar APIs de imagens ou a **API de Respostas** com a ferramenta `image_generation`, conforme o suporte da implantação. Quando o resultado vem em Base64, o aplicativo decodifica os dados e grava os bytes em um arquivo de imagem.

## Exemplo Python: gerar e salvar uma imagem PNG

O exemplo usa uma implantação da família **GPT-Image** com a API de imagens. Instale os pacotes:

```powershell
python -m pip install --upgrade openai python-dotenv
```

Crie um arquivo `.env` na pasta do script com os dados do seu recurso:

```dotenv
ENDPOINT=https://<recurso>.openai.azure.com/openai/v1/
FOUNDRY_KEY=<chave-do-recurso>
IMAGE_DEPLOYMENT_NAME=<nome-da-implantacao-de-imagem>
```

`IMAGE_DEPLOYMENT_NAME` é o nome que você atribuiu à implantação, por exemplo `minha-geracao-imagens`. Mantenha `.env` fora do controle de versão.

Salve como `gerar_imagem.py`:

```python
import base64
import os
from pathlib import Path

from dotenv import load_dotenv
from openai import APIError, OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.environ["ENDPOINT"],
    api_key=os.environ["FOUNDRY_KEY"],
    timeout=300.0,
    max_retries=0,
)

try:
    resultado = client.images.generate(
        model=os.environ["IMAGE_DEPLOYMENT_NAME"],
        prompt=(
            "Ilustração de um computador antigo com monitor de tubo, "
            "fundo claro, estilo de cartaz educativo, sem texto."
        ),
        n=1,
        size="1024x1024",
        quality="medium",
        output_format="png",
    )
except APIError as erro:
    raise SystemExit(f"Falha na geração da imagem: {erro}") from erro

if not resultado.data or not resultado.data[0].b64_json:
    raise SystemExit("A resposta não contém uma imagem em Base64.")

imagem_bytes = base64.b64decode(resultado.data[0].b64_json)
destino = Path("imagem_gerada.png")
destino.write_bytes(imagem_bytes)
print(f"Imagem salva em: {destino.resolve()}")
```

Execute com `python gerar_imagem.py`. O arquivo será salvo no diretório em que você executar o comando.

### O que cada etapa faz

- **`images.generate`:** envia a descrição para a implantação de imagem.
- **`n`, `size` e `quality`:** configuram quantidade, dimensões e qualidade.
- **`output_format="png"`:** define o formato dos bytes retornados.
- **`b64_json`:** contém a imagem codificada como texto.
- **`b64decode` e `write_bytes`:** recuperam os bytes e criam o arquivo PNG.

Uma implantação do FLUX pode exigir outro cliente ou contrato de API. Este exemplo pressupõe uma implantação GPT-Image compatível com esses parâmetros.

## Pontos-chave para revisão AI-901

- Análise recebe imagem; geração produz imagem.
- Escolha um modelo com capacidade de geração.
- Base64 representa dados binários como texto; não é um formato de imagem.

