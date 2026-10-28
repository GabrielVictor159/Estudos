---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
  - ai/sdk
modulo: "13"
titulo: "Recuperação agêntica e consulta à base"
nivel: iniciante
---

# Recuperação agêntica e consulta à base

A **recuperação agêntica** usa planejamento para encontrar informações pertinentes. Uma pergunta complexa pode originar várias consultas, executadas nas fontes relevantes e seguidas da seleção de evidências.

## Da pergunta às evidências

![[assets/m13-recuperacao-e-resposta.png|1000]]

Na pergunta “Posso pedir reembolso de hospedagem?”, a recuperação pode buscar regras de elegibilidade, limites e comprovantes. O agente usa os trechos encontrados para elaborar a resposta.

## Técnicas de pesquisa

| Técnica | Como contribui |
|---|---|
| Palavra-chave | Localiza termos e expressões |
| Vetorial | Busca proximidade de significado por embeddings |
| Híbrida | Combina sinais textuais e vetoriais |
| Reclassificação | Reordena os resultados por relevância |

A técnica disponível depende da fonte e da configuração. Um índice com campos vetoriais precisa de configuração adequada para vetorização das consultas.

## Resultado da recuperação

- **Conteúdo:** informações que podem fundamentar a resposta.
- **Referências:** ligação com as fontes de origem.
- **Atividade:** informações sobre o processamento, quando solicitadas.

`extractiveData` retorna conteúdo de apoio; `answerSynthesis` solicita uma resposta sintetizada, quando configurado e suportado.

## Exemplo Python: consultar e salvar as evidências

Use a configuração de [[02 - Bases e fontes de conhecimento]]. Salve como `consultar_base.py`:

```python
import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv
from azure.identity import DefaultAzureCredential
from azure.core.exceptions import AzureError

load_dotenv()
endpoint = os.environ["SEARCH_ENDPOINT"].rstrip("/")
base = os.environ["KNOWLEDGE_BASE_NAME"]

try:
    with DefaultAzureCredential() as credencial:
        token = credencial.get_token("https://search.azure.com/.default")
        resposta = requests.post(
            f"{endpoint}/knowledgebases/{base}/retrieve",
            params={"api-version": "2026-08-01-preview"},
            headers={"Authorization": f"Bearer {token.token}"},
            json={
                "messages": [{
                    "role": "user",
                    "content": [{
                        "type": "text",
                        "text": "Quais comprovantes preciso para reembolso de hospedagem?",
                    }],
                }],
                "outputMode": "extractiveData",
                "includeActivity": True,
                "knowledgeSourceParams": [{
                    "kind": "searchIndex",
                    "knowledgeSourceName": os.environ["KNOWLEDGE_SOURCE_NAME"],
                    "includeReferences": True,
                }],
            },
            timeout=180,
        )
        resposta.raise_for_status()
        if resposta.status_code == 206:
            print("Resultado parcial: examine a atividade e os erros retornados.")
        resultado = resposta.json()

    for mensagem in resultado.get("response", []):
        for parte in mensagem.get("content", []):
            if parte.get("type") == "text":
                print(parte.get("text", ""))

    print("Referências:")
    print(json.dumps(resultado.get("references", []), ensure_ascii=False, indent=2))
    destino = Path("recuperacao_resultado.json")
    destino.write_text(
        json.dumps(resultado, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    print("Resultado completo salvo em:", destino.resolve())
except (requests.RequestException, AzureError) as erro:
    raise SystemExit(f"Falha na recuperação: {erro}") from erro
```

Execute com `python consultar_base.py`. O script consulta a base e salva conteúdo, referências e atividade em JSON; ainda cabe ao consumidor usar as evidências para construir sua resposta.

## Pontos-chave para revisão AI-901

- Recuperar evidências e redigir uma resposta são etapas diferentes.
- Planejamento pode decompor a pergunta e coordenar buscas em várias fontes.
- Referências permitem verificar o apoio de uma afirmação; não garantem sua correção por si sós.
