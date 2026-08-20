---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - sdk
  - api
modulo: 03
---

# API de ChatCompletions

A API **ChatCompletions** da OpenAI é amplamente usada em modelos e plataformas de IA generativa. Embora a **API de Respostas** seja a recomendada para projetos novos, ChatCompletions continua útil para **manutenção de código** e **compatibilidade entre plataformas**.

A diferença estrutural em relação à API de Respostas é uma só, e ela determina todo o resto: **ChatCompletions não tem rastreamento de estado embutido**.

---

## Enviar um prompt

A entrada é sempre uma **lista de objetos de mensagem** em JSON:

```python
completion = openai_client.chat.completions.create(
    model="gpt-4o",   # nome da implantação do modelo
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "When was Microsoft founded?"}
    ]
)

print(completion.choices[0].message.content)
```

---

## Os três papéis de mensagem

| Papel | Função |
|---|---|
| `system` | Define o comportamento do assistente |
| `user` | A entrada e os prompts do usuário |
| `assistant` | As respostas da IA |

O papel `system` é o equivalente ao parâmetro `instructions` da API de Respostas. O papel `assistant` é o que você usa para **devolver ao modelo** as respostas que ele já deu — é assim que o histórico é reconstruído.

---

## Reter o contexto da conversa

Diferentemente da API de Respostas, aqui **não há rastreamento de estado**. O gerenciamento do histórico é **manual**: toda a conversa acompanha cada interação.

### Exemplo de duas rodadas

```python
# Mensagem inicial do sistema
conversation_messages = [
    {
        "role": "system",
        "content": "You are a helpful AI assistant that answers questions and provides information."
    }
]

# Primeira mensagem do usuário
conversation_messages.append(
    {"role": "user", "content": "When was Microsoft founded?"}
)

completion = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=conversation_messages
)
assistant_message = completion.choices[0].message.content
print("Assistant:", assistant_message)

# Devolve a resposta para a conversa
conversation_messages.append(
    {"role": "assistant", "content": assistant_message}
)

# Próxima mensagem do usuário
conversation_messages.append(
    {"role": "user", "content": "Who founded it?"}
)

completion = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=conversation_messages
)
assistant_message = completion.choices[0].message.content
print("Assistant:", assistant_message)
```

Sem o `append` do papel `assistant`, a segunda pergunta ("Who founded it?") ficaria sem referente — o modelo não teria como saber o que é "it".

### Loop de chat completo

```python
conversation_messages = [
    {
        "role": "system",
        "content": "You are a helpful AI assistant that answers questions and provides information."
    }
]

print("Assistant: Enter a prompt (or type 'quit' to exit)")
while True:
    input_text = input('\nYou: ')
    if input_text.lower() == "quit":
        print("Assistant: Goodbye!")
        break

    # Acrescenta a mensagem do usuário
    conversation_messages.append(
        {"role": "user", "content": input_text}
    )

    completion = openai_client.chat.completions.create(
        model="gpt-4o",
        messages=conversation_messages
    )
    assistant_message = completion.choices[0].message.content
    print("\nAssistant:", assistant_message)

    # Acrescenta a resposta à conversa
    conversation_messages.append(
        {"role": "assistant", "content": assistant_message}
    )
```

**O padrão em três movimentos, repetido a cada rodada:**

1. `append` da mensagem do usuário;
2. chamada a `chat.completions.create` com a **lista inteira**;
3. `append` da resposta do assistente.

---

## Como se lê a saída

```python
completion.choices[0].message.content
```

O objeto de retorno traz uma lista `choices`; a mensagem fica em `choices[0].message`, e o texto em `.content`. Esse caminho é o marcador visual mais confiável de que um trecho de código está usando ChatCompletions, e não a API de Respostas.

---

## Consequências de não haver estado

| Consequência | Impacto |
|---|---|
| Cada pergunta e cada resposta são acrescentadas à lista | O código precisa manter essa lista viva |
| **Todo** o histórico vai junto em cada chamada | Mais tokens de entrada a cada rodada — o custo cresce com a conversa |
| Sem truncamento, a conversa estoura a janela de contexto | Cabe ao aplicativo decidir o que descartar |
| O estado vive no processo do aplicativo | Se o processo cai, a conversa se perde — a menos que você persista |

---

## Tabela de decisão: preciso de… → faço…

| Necessidade | Ação |
|---|---|
| Definir o comportamento do assistente | Mensagem com papel `system` na primeira posição |
| Enviar a pergunta do usuário | `append` de `{"role": "user", ...}` |
| Fazer o modelo lembrar do que respondeu | `append` de `{"role": "assistant", ...}` |
| Ler o texto da resposta | `completion.choices[0].message.content` |
| Manter uma conversa multi-turno | Reenviar a lista `messages` inteira a cada chamada |
| Controlar o crescimento do custo | Truncar a lista `messages` |
| Persistir a conversa entre execuções | Salvar e recarregar a lista `messages` |
| Migrar para estado gerenciado pelo serviço | Trocar para a **API de Respostas** com `previous_response_id` |

---

## Pontos que costumam confundir

**Esquecer o `append` do assistente quebra o contexto.** É o erro mais comum: o app envia só as perguntas do usuário e depois estranha que o modelo "não lembra".

**`messages` é sempre lista.** Diferente do `input` da API de Respostas, que aceita uma string simples.

**`system` é uma mensagem, não um parâmetro.** Em ChatCompletions o comportamento é definido por um item da lista com papel `system`; na API de Respostas, pelo parâmetro `instructions`.

**`choices[0].message.content` × `output_text`.** Caminhos diferentes para a mesma ideia. Questões que mostram código costumam se resolver só por esse detalhe.

**Não é uma API depreciada.** O material a descreve como **bem estabelecida no ecossistema** de modelos generativos; a recomendação de usar a API de Respostas vale para **projetos novos**.

**A conversa inteira trafega sempre.** Isso tem efeito direto em custo e em latência — e é a razão prática pela qual a API de Respostas foi criada.

---

## Aprofundar na documentação

- [Gerar respostas com a API de ChatCompletions — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/05-openai-api)
- Páginas relacionadas: [[03 - API de Respostas]] · [[05 - Respostas x ChatCompletions - Comparação e Decisão]]
