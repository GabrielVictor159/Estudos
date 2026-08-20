---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - sdk
  - api
modulo: 03
---

# API de Respostas

A API de **Respostas** (*Responses*) da OpenAI reúne em uma experiência única o que antes eram duas APIs separadas: **ChatCompletions** e **Assistentes**. É a opção **recomendada para projetos novos**.

**O que ela traz:**

| Vantagem | Significado |
|---|---|
| **Conversas com estado** | Mantém o contexto ao longo de várias rodadas, sem você gerenciar o histórico |
| **Experiência unificada** | Combina os padrões de preenchimento de chat e da API de Assistentes |
| **Modelos diretos do Foundry** | Funciona com modelos hospedados diretamente no Foundry |
| **Integração simples** | Acessada pelo cliente compatível com a OpenAI |

![[m03-responses-api.png]]

---

## A chamada mais simples

```python
response = openai_client.responses.create(
    model="gpt-4.1",          # nome da implantação do modelo
    input="What is Microsoft Foundry?"
)

print(response.output_text)
```

---

## Parâmetros de entrada

| Parâmetro | O que faz |
|---|---|
| `model` | Nome da **implantação** do modelo (não o nome do modelo no catálogo) |
| `input` | O prompt — aceita uma string ou uma lista de objetos de mensagem |
| `instructions` | Orienta o comportamento do assistente, como a mensagem do sistema |
| `temperature` | Aleatoriedade, de **0,0 a 2,0**; mais alto = mais criativo e variado |
| `max_output_tokens` | Limita o número máximo de tokens da resposta |
| `top_p` | Alternativa à temperatura para controlar a aleatoriedade |
| `previous_response_id` | Encadeia esta chamada à resposta anterior, preservando o contexto |
| `stream` | `True` devolve a resposta em eventos, token a token |

### Com instruções e controles de geração

```python
response = openai_client.responses.create(
    model="gpt-4.1",
    instructions="You are a helpful AI assistant that answers questions clearly and concisely.",
    input="Write a creative story about AI.",
    temperature=0.8,          # mais criatividade
    max_output_tokens=200     # limita o tamanho
)

print(response.output_text)
```

---

## Propriedades do objeto de resposta

| Propriedade | Conteúdo |
|---|---|
| `output_text` | A resposta de texto gerada |
| `id` | Identificador único desta resposta — alimenta o `previous_response_id` |
| `status` | Status da resposta, por exemplo `"completed"` |
| `usage` | Uso de tokens: entrada, saída e total (`usage.total_tokens`) |
| `model` | O modelo usado para gerar a resposta |

```python
response = openai_client.responses.create(
    model="gpt-4.1",
    input="Explain machine learning in simple terms."
)

print(f"Response: {response.output_text}")
print(f"Response ID: {response.id}")
print(f"Tokens used: {response.usage.total_tokens}")
print(f"Status: {response.status}")
```

---

## Modelos diretos do Foundry

A mesma chamada funciona com modelos hospedados diretamente no Foundry — só muda o `model`:

```python
response = openai_client.responses.create(
    model="microsoft-phi-4",   # exemplo de modelo direto do Foundry
    instructions="You are a helpful AI assistant that answers questions clearly and concisely.",
    input="What are the benefits of small language models?"
)

print(response.output_text)
```

---

## Manter o contexto da conversa

![[m03-estado-conversa.png]]

### Encadeamento automático com `previous_response_id`

```python
# Primeira rodada
response1 = openai_client.responses.create(
    model="gpt-4.1",
    instructions="You are a helpful AI assistant that explains technology concepts clearly.",
    input="What is machine learning?"
)
print("Assistant:", response1.output_text)

# Continuando a conversa
response2 = openai_client.responses.create(
    model="gpt-4.1",
    instructions="You are a helpful AI assistant that explains technology concepts clearly.",
    input="Can you give me an example?",
    previous_response_id=response1.id
)
print("Assistant:", response2.output_text)
```

### Loop interativo de chat

O padrão completo de um aplicativo de chat de linha de comando:

```python
last_response_id = None

print("Assistant: Enter a prompt (or type 'quit' to exit)")
while True:
    input_text = input('\nYou: ')
    if input_text.lower() == "quit":
        print("Assistant: Goodbye!")
        break

    response = openai_client.responses.create(
        model=model_name,
        instructions="You are a helpful AI assistant that explains technology concepts clearly.",
        input=input_text,
        previous_response_id=last_response_id
    )
    assistant_text = response.output_text
    print("\nAssistant:", assistant_text)
    last_response_id = response.id
```

O ponto central: **guardar `response.id` e devolvê-lo na chamada seguinte**. Na primeira rodada ele é `None`, e a API entende que a conversa está começando.

### Encadeamento manual do histórico

Quando é preciso controlar exatamente o que entra no contexto:

```python
try:
    conversation_history = [
        {
            "type": "message",
            "role": "user",
            "content": "What is machine learning?"
        }
    ]

    response1 = openai_client.responses.create(
        model="gpt-4.1",
        input=conversation_history
    )
    print("Assistant:", response1.output_text)

    # Acrescenta a saída do assistente ao histórico
    conversation_history += response1.output

    # Nova mensagem do usuário
    conversation_history.append({
        "type": "message",
        "role": "user",
        "content": "Can you give me an example?"
    })

    response2 = openai_client.responses.create(
        model="gpt-4.1",
        input=conversation_history
    )
    print("Assistant:", response2.output_text)

except Exception as ex:
    print(f"Error: {ex}")
```

**Quando usar esta abordagem:**

- personalizar **quais mensagens** entram no contexto;
- implementar **truncamento** da conversa para respeitar limites de token;
- **armazenar e restaurar** o histórico a partir de um banco de dados.

### Recuperar uma resposta anterior específica

```python
try:
    response_id = "resp_67cb61fa3a448190bcf2c42d96f0d1a8"
    previous_response = openai_client.responses.retrieve(response_id)
    print(f"Previous response: {previous_response.output_text}")
except Exception as ex:
    print(f"Error: {ex}")
```

---

## A janela de contexto

![[m03-janela-contexto.png]]

O `previous_response_id` vincula respostas, mantendo o contexto entre chamadas sucessivas. Mas o contexto ativo não é infinito — ele pode conter:

- **instruções do sistema** (instruções e regras de segurança);
- o **prompt atual**;
- o **histórico de conversas** (mensagens anteriores de usuário e assistente);
- **esquemas de ferramentas** (funções, especificações OpenAPI, ferramentas MCP);
- **saídas da ferramenta** (resultados de pesquisa, saída do interpretador de código, arquivos);
- **memória ou documentos recuperados** (repositórios de memória, RAG, pesquisa de arquivos).

Cada rodada empurra mais conteúdo para dentro dessa janela — é exatamente por isso que o encadeamento manual existe.

---

## Streaming

```python
stream = openai_client.responses.create(
    model="gpt-4.1",
    input="Write a short story about a robot learning to paint.",
    stream=True
)

for event in stream:
    print(event, end="", flush=True)
```

Para exibir só o texto e ainda capturar o `id` da resposta, é preciso tratar os tipos de evento:

```python
stream = openai_client.responses.create(
    model="gpt-4.1",
    input="Write a short story about a robot learning to paint.",
    stream=True
)
for event in stream:
    if event.type == "response.output_text.delta":
        print(event.delta, end="")
    elif event.type == "response.completed":
        response_id = event.response.id
```

| Evento | Significado |
|---|---|
| `response.output_text.delta` | Um pedaço de texto novo chegou (`event.delta`) |
| `response.completed` | A resposta terminou; o `id` está em `event.response.id` |

---

## Uso assíncrono

```python
import asyncio
from openai import AsyncOpenAI

client = AsyncOpenAI(
    base_url="https://<resource-name>.openai.azure.com/openai/v1/",
    api_key=token_provider,
)

async def main():
    response = await client.responses.create(
        model="gpt-4.1",
        input="Explain quantum computing briefly."
    )
    print(response.output_text)

asyncio.run(main())
```

Com streaming assíncrono:

```python
async def stream_response():
    stream = await client.responses.create(
        model="gpt-4.1",
        input="Write a haiku about coding.",
        stream=True
    )
    async for event in stream:
        print(event, end="", flush=True)

asyncio.run(stream_response())
```

---

## Tabela de decisão: preciso de… → uso…

| Necessidade | Parâmetro / método |
|---|---|
| Definir o papel do assistente | `instructions` |
| Respostas mais criativas | `temperature` mais alta (até 2,0) |
| Respostas mais previsíveis | `temperature` baixa |
| Limitar o tamanho da resposta | `max_output_tokens` |
| Controlar aleatoriedade sem mexer na temperatura | `top_p` |
| Continuar a conversa anterior | `previous_response_id=response.id` |
| Escolher o que entra no contexto | `input=conversation_history` (lista de mensagens) |
| Mostrar a resposta enquanto é gerada | `stream=True` |
| Capturar o id em uma resposta com streaming | Evento `response.completed` |
| Buscar uma resposta antiga | `responses.retrieve(response_id)` |
| Não bloquear o processo enquanto espera | `AsyncOpenAI` + `await` |
| Saber quantos tokens custou | `response.usage.total_tokens` |

---

## Pontos que costumam confundir

**`model` é o nome da implantação.** Não é o nome do modelo no catálogo — é o nome que você deu quando implantou. Ver [[03 - Implantar Modelos em Endpoints]].

**`instructions` × `input`.** `instructions` condiciona o comportamento; `input` é a pergunta. Trocar os dois é erro clássico de leitura de código.

**`previous_response_id` guarda estado no serviço.** Você não envia o histórico — envia só o identificador. É isso que torna a API "com estado".

**Na primeira rodada, `previous_response_id` é `None`.** O loop do exemplo inicializa `last_response_id = None` justamente por isso.

**`output_text`, não `choices[0]`.** A propriedade de saída da API de Respostas é `response.output_text`. A forma `completion.choices[0].message.content` pertence ao ChatCompletions — ver [[04 - API de ChatCompletions]].

**Streaming sem tratar eventos imprime objetos.** O primeiro exemplo imprime os eventos inteiros; para ver só o texto é preciso filtrar por `response.output_text.delta`.

**Temperatura vai até 2,0 aqui.** O material especifica a faixa de 0,0 a 2,0 para a API de Respostas.

---

## Aprofundar na documentação

- [Gerar respostas com a API de Respostas — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/04-responses-api)
- Páginas relacionadas: [[04 - API de ChatCompletions]] · [[05 - Respostas x ChatCompletions - Comparação e Decisão]]
