---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - agentes
modulo: 04
---

# O Que São Ferramentas

**Ferramentas** são interfaces que permitem a um modelo de IA generativa interagir com ambientes, serviços e runtimes externos. Sem elas, o modelo opera apenas com o que aprendeu no treinamento — com elas, ele vira um **executor**.

---

## Por que o modelo precisa de ferramentas

| Limitação do LLM sozinho | O que a ferramenta resolve |
|---|---|
| **Corte de conhecimento** — dados limitados ao snapshot de treinamento | `web_search` traz informações em tempo real |
| **Cálculos imprecisos** — previsão probabilística de tokens não é aritmética | `code_interpreter` executa código Python real |
| **Sem acesso a arquivos privados** — não indexa documentos internos | `file_search` faz RAG gerenciado sobre documentos carregados |
| **Sem capacidade de agir** — não chama APIs, bancos ou serviços externos | `function` conecta o modelo ao seu código |

---

## Duas categorias de ferramentas

| Categoria | Execução | Exemplos |
|---|---|---|
| **Hospedadas (server-side)** | Executadas automaticamente pela infraestrutura do Azure AI Foundry | `code_interpreter`, `web_search`, `file_search` |
| **Do cliente (client-side)** | Executadas pelo seu aplicativo — o modelo só pede, você executa | `function` (function calling) |

> Essa distinção é fundamental para a prova: nas ferramentas hospedadas, o fluxo é transparente; na ferramenta de função, o **status do run muda para `requires_action`** e o código do aplicativo precisa intervir.

---

## Fluxo de execução geral de uma ferramenta

```
1. CONFIGURAÇÃO
   Você registra as ferramentas (nome, descrição, schema JSON de parâmetros)
                          ↓
2. PROMPT DO USUÁRIO
   Usuário envia uma mensagem (ex.: "Analise o CSV de vendas e plote o gráfico")
                          ↓
3. RACIOCÍNIO DO MODELO
   O modelo avalia se precisa de uma ferramenta e emite uma chamada
                          ↓
          ┌───────────────┴───────────────┐
   [Ferramenta hospedada]        [Function Tool]
   Executa automaticamente       Status → requires_action
   no sandbox / Bing /           App parseia argumentos JSON
   Vector Store                  App executa a função local
                                 App envia tool_outputs
          └───────────────┬───────────────┘
                          ↓
4. SÍNTESE DA RESPOSTA
   O modelo incorpora o resultado da ferramenta na resposta final
   (com citações, arquivos gerados ou dados ao vivo)
```

---

## As quatro ferramentas do módulo

| Ferramenta | Classe / Tipo | Propósito principal |
|---|---|---|
| **code_interpreter** | `{"type": "code_interpreter"}` | Cálculos, análise de dados, geração de gráficos em sandbox Python |
| **web_search** | `{"type": "web_search"}` | Recuperar informações atuais da web com citações |
| **file_search** | `{"type": "file_search"}` | RAG automatizado sobre documentos privados via Vector Store |
| **function** | `{"type": "function", "name": "...", ...}` | Chamar funções do seu código / APIs externas |

---

## Como adicionar ferramentas à chamada da API de Respostas

Todas as ferramentas seguem o mesmo padrão de inclusão no parâmetro `tools`:

```python
response = client.responses.create(
    model=model_deployment,
    instructions="Você é um assistente útil.",
    input="Qual é a raiz quadrada de 256?",
    tools=[
        {"type": "code_interpreter", "container": {"type": "auto"}},
        {"type": "web_search"},
        {"type": "file_search", "vector_store_ids": [vector_store.id]},
        {"type": "function", "name": "get_time", "description": "Get the current time"}
    ]
)
```

O modelo **decide sozinho** qual ferramenta usar (ou nenhuma) com base no prompt.

---

## Pontos que costumam confundir

**Ferramenta hospedada ≠ ferramenta de função.** Nas três primeiras, o modelo executa e recebe o resultado automaticamente. Na function tool, **seu código** precisa executar e devolver o resultado — o modelo nunca executa sua lógica de negócios diretamente.

**O modelo escolhe a ferramenta.** Você registra todas as disponíveis; o modelo decide se e qual usar com base no prompt e nas descrições.

**Uma ferramenta pode não ser usada.** Se o prompt não requer a ferramenta, o modelo responde normalmente sem chamá-la.

**Múltiplas ferramentas no mesmo agente.** Um agente pode ter `code_interpreter` + `file_search` + `function` ao mesmo tempo — é assim que agentes empresariais funcionam.

**Ferramentas adicionam tokens e latência.** Cada ferramenta carrega seu schema para a janela de contexto, e a execução adiciona tempo de resposta.

---

## Aprofundar na documentação

- [O que são ferramentas? — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/02-what-are-tools)
- Próxima página: [[02 - Ferramenta code_interpreter]]
