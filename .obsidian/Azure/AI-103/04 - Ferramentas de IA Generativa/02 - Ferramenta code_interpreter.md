---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - code-interpreter
modulo: 04
---

# Ferramenta code_interpreter

A ferramenta `code_interpreter` fornece ao modelo um **runtime Python em sandbox** onde ele pode gerar e executar código dinamicamente. O modelo deixa de "discutir" código e passa a **executá-lo**, retornando resultados reais.

---

## Recursos principais

| Recurso | Significado |
|---|---|
| **Execução dinâmica de Python** | O modelo escreve e executa código em ambiente isolado |
| **Tratamento de arquivos** | Carregar, processar e baixar arquivos (CSV, JSON, imagens) |
| **Análise de dados** | Cálculos, estatísticas e transformações em tempo real |
| **Feedback em tempo real** | O modelo vê os resultados da execução e pode iterar/corrigir erros |
| **Solução de problemas complexos** | Equações, simulações e quebra-cabeças lógicos via código executável |

---

## Casos de uso comuns

| Caso de uso | Exemplo |
|---|---|
| **Análise de dados** | Analisar CSV e gerar estatísticas resumidas |
| **Matemática & Física** | Resolver equações diferenciais ou simular cenários |
| **Conversão de arquivo** | Converter entre formatos (CSV ↔ JSON) |
| **Prototipagem** | Testar algoritmos antes da implementação formal |

---

## Exemplo com a API de Respostas

```python
from openai import OpenAI

client = OpenAI(
    base_url={openai_endpoint},
    api_key={auth_key_or_token}
)

# Usar code_interpreter para um cálculo
response = client.responses.create(
    model={model_deployment},
    instructions="You are an AI assistant that provides information. Use the python tool to run code for math problems.",
    input="What is the square root of 16?",
    tools=[{"type": "code_interpreter",
            "container": {"type": "auto"}}]
)
print(response.output_text)
```

**Saída:**
```
The square root of 16 is 4.
```

Internamente, o modelo gerou e executou:

```python
import math
square_root = math.sqrt(16)
square_root
```

---

## Como funciona o fluxo

```
1. Você envia a solicitação → inclui code_interpreter na lista de tools
2. O modelo analisa a tarefa → determina se precisa executar código
3. O modelo gera código Python → escreve o script para resolver o problema
4. Execução em sandbox → código roda em ambiente isolado
   (com acesso a pandas, numpy, math, matplotlib)
5. Resultados retornados → o modelo incorpora a saída na resposta
```

> O modelo pode **iterar**: se o código falhar, ele vê o erro, corrige e tenta novamente automaticamente.

---

## Bibliotecas pré-instaladas no sandbox

As principais bibliotecas disponíveis no ambiente:

- `pandas` — manipulação de DataFrames
- `numpy` — computação numérica
- `math` — funções matemáticas
- `matplotlib` — geração de gráficos

---

## Práticas recomendadas

- **Seja específico** no prompt: descreva o formato de dados e a saída esperada. Muitos modelos reconhecem a expressão `python tool` para identificar o `code_interpreter`, então use-a nas instruções.
- **Forneça contexto de domínio** relevante nos prompts.
- **Valide resultados** — sempre examine o código gerado antes de usar em produção.
- **Monitore custos** — execução de código adiciona tokens; operações complexas usam mais recursos.
- **Aproveite as bibliotecas** pré-instaladas (pandas, numpy, matplotlib).
- **Tratamento de erros** — o modelo pode ver erros de execução e tentará corrigi-los automaticamente.

---

## Limitações

- Execução em **ambiente isolado (sandbox)** — sem acesso à rede externa.
- Algumas bibliotecas podem não estar disponíveis.
- **Limites de timeout** se aplicam a operações de longa duração.
- **Restrições de memória** — conjuntos de dados muito grandes podem precisar de streaming ou agrupamento.

---

## Tabela de decisão: preciso de… → uso code_interpreter?

| Necessidade | code_interpreter é a resposta? |
|---|---|
| Calcular média, desvio padrão, variância | ✅ Sim — cálculos exatos via código |
| Gerar gráfico de barras a partir de um CSV | ✅ Sim — matplotlib no sandbox |
| Converter CSV para JSON | ✅ Sim — pandas |
| Resolver equação diferencial | ✅ Sim — numpy/math |
| Buscar notícias de hoje | ❌ Não — use `web_search` |
| Responder sobre documento interno | ❌ Não — use `file_search` |
| Chamar API do seu sistema | ❌ Não — use `function` |

---

## Pontos que costumam confundir

**O modelo gera E executa o código.** Diferente da ferramenta de função, onde seu aplicativo executa — aqui o sandbox gerenciado faz tudo.

**O sandbox não tem rede.** O código roda em ambiente isolado, sem acesso à internet ou sistemas externos.

**`python tool` nas instruções.** Muitos modelos usam internamente o nome "python tool" para o `code_interpreter`. Usar essa expressão nas instruções melhora a seleção da ferramenta.

**O container precisa de tipo.** Na API de Respostas, o `code_interpreter` precisa do campo `"container": {"type": "auto"}`.

**Não confundir com function calling.** `code_interpreter` é para o modelo escrever e rodar Python genérico; `function` é para chamar funções específicas do **seu** código.

---

## Aprofundar na documentação

- [Usar a ferramenta code_interpreter — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/03-code-interpreter)
- Próxima página: [[03 - Ferramenta web_search]]
- Página anterior: [[01 - O Que São Ferramentas]]
