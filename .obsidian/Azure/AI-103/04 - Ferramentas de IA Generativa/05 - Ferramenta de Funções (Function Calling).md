---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - function-calling
  - agentes
modulo: 04
---

# Ferramenta de Funções (Function Calling)

A ferramenta de **função** permite que o modelo decida quando acionar funções nomeadas que você disponibiliza no seu aplicativo. O modelo **não executa** sua lógica de negócios — ele retorna uma chamada de função estruturada, **seu código** executa a função, e você devolve o resultado ao modelo.

![[m04-function-calling-flow.jpg]]

> Essa é a única ferramenta do módulo em que a execução é **do lado do cliente**. Nas três anteriores (`code_interpreter`, `web_search`, `file_search`), o serviço executa automaticamente.

---

## Recursos principais

| Recurso | Significado |
|---|---|
| **Chamadas de ferramenta estruturadas** | O modelo emite solicitações explícitas com nome e argumentos JSON |
| **Execução controlada pelo desenvolvedor** | Seu aplicativo decide como e onde as funções são executadas |
| **Padrão de integração confiável** | Chamar APIs, serviços internos ou utilitários com segurança |
| **Orquestração de vários turnos** | Devolver a saída da ferramenta e deixar o modelo continuar o raciocínio |
| **Respostas baseadas em dados** | As respostas incluem dados ao vivo do seu sistema |

---

## Casos de uso comuns

| Caso de uso | Exemplo |
|---|---|
| **Integração de sistema** | Chamar API interna para obter detalhes de conta ou pedido |
| **Automação de tarefas** | Disparar fluxos de trabalho: criação de tíquetes, notificações |
| **Pesquisa de dados** | Consultar regras de negócios ou tabelas de referência |

---

## Exemplo completo com a API de Respostas

```python
import time
from openai import OpenAI

# Função local que será chamada
def get_time():
    return f"The time is {time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())}"


def main():
    client = OpenAI(
        base_url={openai_endpoint},
        api_key={auth_key_or_token}
    )

    # 1. Definir a ferramenta de função
    function_tools = [
        {
            "type": "function",
            "name": "get_time",
            "description": "Get the current time"
        }
    ]

    # 2. Inicializar mensagens com prompt de sistema
    messages = [
        {"role": "developer", "content": "You are an AI assistant that provides information."},
    ]

    # 3. Loop de chat
    while True:
        prompt = input("\nEnter a prompt (or type 'quit' to exit)\n")
        if prompt.lower() == "quit":
            break

        messages.append({"role": "user", "content": prompt})

        # 4. Chamada ao modelo
        response = client.responses.create(
            model=model_deployment,
            input=messages,
            tools=function_tools
        )

        # 5. Adicionar saída do modelo às mensagens
        messages += response.output

        # 6. Verificar se houve chamada de função
        for item in response.output:
            if item.type == "function_call" and item.name == "get_time":
                # 7. Executar a função LOCALMENTE
                current_time = get_time()

                # 8. Devolver o resultado ao modelo
                messages.append({
                    "type": "function_call_output",
                    "call_id": item.call_id,
                    "output": current_time
                })

                # 9. Segunda chamada — modelo usa o resultado da função
                response = client.responses.create(
                    model=model_deployment,
                    instructions="Answer only with the tool output.",
                    input=messages,
                    tools=function_tools
                )

        print(response.output_text)


if __name__ == '__main__':
    main()
```

**Saída de exemplo:**
```
Enter a prompt (or type 'quit' to exit)
Hello

Hello! How can I help you today?

Enter a prompt (or type 'quit' to exit)
What time is it?

The time is 2026-03-19 17:17:41.
```

O primeiro prompt ("Hello") não acionou a função — o modelo respondeu normalmente. O segundo ("What time is it?") fez o modelo emitir `function_call` para `get_time`.

---

## Como funciona o fluxo

```
1. Você define ferramentas → fornece definições de função na lista tools
   (nome, descrição, schema de parâmetros JSON)

2. O modelo avalia o prompt → decide se precisa chamar uma função

3. O modelo emite function_call → a resposta inclui:
   - item.type == "function_call"
   - item.name == nome da função
   - item.call_id == identificador da chamada
   - item.arguments == JSON com os argumentos (se houver)

4. Seu aplicativo executa a lógica → roda a função correspondente

5. Você retorna a saída → envia function_call_output com call_id + output

6. O modelo conclui a resposta → incorpora os resultados na resposta final
```

> **Diferença crítica das demais ferramentas:** o modelo **nunca** executa sua função. Ele só decide quando chamá-la e gera os argumentos — a execução é sempre do aplicativo.

---

## Schema de parâmetros (funções com argumentos)

Para funções que recebem parâmetros, defina o schema JSON:

```python
{
    "type": "function",
    "name": "fetch_customer_order",
    "description": "Retrieve shipping status and details for an order using its order ID.",
    "parameters": {
        "type": "object",
        "properties": {
            "order_id": {
                "type": "string",
                "description": "The unique order identifier, e.g. ORD-987"
            }
        },
        "required": ["order_id"],
        "additionalProperties": False
    }
}
```

| Campo do schema | Propósito |
|---|---|
| `name` | Identificador da função |
| `description` | Texto para o modelo entender **quando** chamar |
| `parameters.properties` | Cada parâmetro: nome, tipo, descrição |
| `parameters.required` | Quais parâmetros são obrigatórios |
| `additionalProperties: False` | Impõe conformidade estrita ao schema |

---

## Checklist do fluxo function_call

1. ☐ Definir a função Python local
2. ☐ Criar a definição da ferramenta com `type: "function"`, `name`, `description` e `parameters`
3. ☐ Incluir a ferramenta na lista `tools` da chamada
4. ☐ Enviar o prompt ao modelo
5. ☐ Inspecionar `response.output` procurando `item.type == "function_call"`
6. ☐ Parsear `item.arguments` (JSON string → dict)
7. ☐ Executar a função local com os argumentos
8. ☐ Enviar `function_call_output` com o `call_id` e a saída
9. ☐ Chamar o modelo novamente — ele incorpora o resultado na resposta final

---

## Práticas recomendadas

- **Funções pequenas e focadas** — funções de propósito único são mais fáceis de controlar e testar.
- **Valide entradas** — nunca confie cegamente nos argumentos gerados pelo modelo em produção.
- **Trate erros com clareza** — retorne mensagens de erro que o modelo possa interpretar e raciocinar.
- **Registre logs** — monitore chamadas, latência e taxas de falha para debug e governança.
- **Limite operações sensíveis** — exija autorização explícita para ações de alto impacto.

---

## Limitações

- O modelo **solicita** chamadas de função, mas **seu aplicativo** deve executá-las.
- Argumentos incorretos ou inesperados podem ocorrer — **validação é obrigatória**.
- A latência da ferramenta pode aumentar o tempo de resposta ponta a ponta.
- A chamada de função melhora a confiabilidade, mas saídas finais ainda precisam de revisão para decisões críticas.

---

## Pontos que costumam confundir

**O modelo NUNCA executa a função.** Isso é a diferença fundamental das outras ferramentas. O modelo gera nome + argumentos; seu código executa e retorna o resultado. Na prova, cuidado com opções que sugerem que "o LLM executa a função" — a resposta é sempre "o aplicativo cliente".

**`function_call` na resposta, não na request.** Você envia a **definição** da ferramenta na request. O modelo emite um `function_call` na response **quando decide usá-la**.

**`call_id` vincula chamada e saída.** Cada chamada de função tem um `call_id` único que deve ser referenciado na `function_call_output` — é assim que o modelo sabe qual resultado corresponde a qual chamada.

**Múltiplas funções são possíveis.** Um agente pode ter várias funções registradas, e o modelo pode chamar mais de uma na mesma resposta.

**Função sem parâmetros também funciona.** O exemplo `get_time` não tem parâmetros — a ferramenta pode ser simples.

**`requires_action` no SDK azure-ai-projects.** Quando usando o SDK de agentes, o status do run muda para `requires_action` quando o modelo quer chamar uma função — é o sinal para o aplicativo intervir.

---

## Aprofundar na documentação

- [Usar a ferramenta de funções — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/06-function)
- [Guia de desenvolvedores OpenAI — Function Calling](https://developers.openai.com/api/docs/guides/function-calling)
- Voltar ao [[00 - Índice do Módulo 04]]
- Página anterior: [[04 - Ferramenta file_search]]
