---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - sdk
  - api
modulo: 03
---

# Respostas × ChatCompletions — Comparação e Decisão

As duas APIs são acessadas pelo **mesmo cliente compatível com a OpenAI** e pelo **mesmo endpoint**. Trocar de uma para a outra é trocar o **método**, não o SDK. O que muda é o modelo de programação.

![[m03-comparacao-apis.png]]

---

## Comparação ponto a ponto

| | **API de Respostas** | **API de ChatCompletions** |
|---|---|---|
| Método | `openai_client.responses.create()` | `openai_client.chat.completions.create()` |
| Rastreamento de conversa | **Com estado embutido** — `previous_response_id` encadeia as chamadas | **Manual** — você mantém e reenvia a lista de mensagens |
| Formato da entrada | `input` aceita string **ou** lista de objetos de mensagem | `messages` é sempre lista de objetos com `role` e `content` |
| Definição de comportamento | Parâmetro `instructions` | Mensagem com papel `system` |
| Leitura da saída | `response.output_text` | `completion.choices[0].message.content` |
| Identificador da resposta | `response.id`, reaproveitável | Não há encadeamento por id |
| O que reúne | Unifica **ChatCompletions + API de Assistentes** | API estabelecida e amplamente adotada |
| Recomendação do material | **Recomendada para projetos novos** | Manutenção de código e compatibilidade entre plataformas |

---

## O mesmo loop de chat, nas duas APIs

### Com a API de Respostas

```python
last_response_id = None

while True:
    input_text = input('\nYou: ')
    if input_text.lower() == "quit":
        break

    response = openai_client.responses.create(
        model=model_name,
        instructions="You are a helpful AI assistant.",
        input=input_text,
        previous_response_id=last_response_id
    )
    print("\nAssistant:", response.output_text)
    last_response_id = response.id
```

### Com a API de ChatCompletions

```python
conversation_messages = [
    {"role": "system", "content": "You are a helpful AI assistant."}
]

while True:
    input_text = input('\nYou: ')
    if input_text.lower() == "quit":
        break

    conversation_messages.append({"role": "user", "content": input_text})

    completion = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_messages
    )
    assistant_message = completion.choices[0].message.content
    print("\nAssistant:", assistant_message)

    conversation_messages.append({"role": "assistant", "content": assistant_message})
```

**A diferença de esforço fica visível:** na primeira versão o estado é uma variável com um id; na segunda, é uma lista que precisa ser alimentada dos dois lados a cada rodada.

---

## Tabela de decisão

| O cenário descreve… | Escolha |
|---|---|
| Projeto novo de chat multi-turno | **API de Respostas** |
| "Manter o contexto sem gerenciar histórico" | **API de Respostas** com `previous_response_id` |
| "Quero o mínimo de código de estado" | **API de Respostas** |
| Recursos vindos da API de Assistentes | **API de Respostas** (é ela que os unifica) |
| Modelos diretos do Foundry | **API de Respostas** |
| "Manutenção de um aplicativo existente" | **ChatCompletions** |
| "Compatibilidade entre plataformas de IA generativa" | **ChatCompletions** |
| "Portar o mesmo código entre OpenAI e Azure OpenAI" | **ChatCompletions** (ou o SDK da OpenAI em geral) |
| "Escolher exatamente quais mensagens vão no contexto" | **Respostas** com encadeamento manual **ou** ChatCompletions |
| "Truncar a conversa para caber no limite de tokens" | Encadeamento manual, em qualquer das duas |
| Código que lê `completion.choices[0].message.content` | Já está usando **ChatCompletions** |
| Código que lê `response.output_text` | Já está usando **Respostas** |

---

## Cola de identificação rápida

Diante de um trecho de código, três marcadores resolvem:

| Marcador no código | API |
|---|---|
| `responses.create(` | Respostas |
| `chat.completions.create(` | ChatCompletions |
| `input=` | Respostas |
| `messages=[` | ChatCompletions |
| `instructions=` | Respostas |
| `{"role": "system", ...}` | ChatCompletions |
| `previous_response_id=` | Respostas |
| `.output_text` | Respostas |
| `.choices[0].message.content` | ChatCompletions |

---

## Pontos que costumam confundir

**Não é uma escolha de SDK.** As duas vivem no mesmo cliente OpenAI. A pergunta "qual SDK usar" é outra decisão, tratada em [[02 - Endpoints, SDKs e Autenticação]].

**"Recomendada" não significa "obrigatória".** A recomendação da API de Respostas vale para **projetos novos**. Cenários de manutenção respondem ChatCompletions sem que isso seja um erro de arquitetura.

**As duas suportam conversa multi-turno.** A diferença é **quem** gerencia o estado: o serviço ou o seu código.

**A API de Respostas também aceita histórico manual.** Passando uma lista em `input`, ela funciona no modelo "sem estado" — o que a torna o superconjunto das duas abordagens.

**ChatCompletions não tem `previous_response_id`.** Se um enunciado oferecer essa opção junto de `chat.completions.create`, é distrator.

**Custo cresce diferente.** Em ChatCompletions, toda a conversa trafega a cada chamada, então o custo por rodada aumenta ao longo do diálogo. Com `previous_response_id`, o histórico não é reenviado pelo cliente.

---

## Aprofundar na documentação

- [Gerar respostas com a API de Respostas](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/04-responses-api)
- [Gerar respostas com a API de ChatCompletions](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/05-openai-api)
- Voltar ao [[AI-103/03 - Desenvolver um App de Chat com o Foundry SDK/00 - Índice do Módulo 03]]
