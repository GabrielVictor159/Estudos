---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - prompt-engineering
  - otimização
modulo: 05
---

# Engenharia de Prompt

A **engenharia de prompt** é o processo de criação e refinação de prompts para melhorar a qualidade, precisão e relevância das respostas. É o ponto de partida de qualquer otimização — não requer infraestrutura adicional, dados de treinamento, e você pode experimentar imediatamente.

---

## Componentes de um prompt

| Componente | O que faz |
|---|---|
| **Mensagem do sistema** | Instruções que definem comportamento, função e restrições do modelo |
| **Mensagem do usuário** | A pergunta ou entrada do usuário |
| **Mensagem do assistente** | Respostas anteriores do modelo (em conversas multi-turno) |
| **Exemplos** | Pares de entrada/saída que demonstram o formato esperado (few-shot) |

---

## Mensagens de sistema eficazes

A mensagem do sistema é a instrução de nível mais alto. Use-a para:

- Definir a **função e os limites** do assistente
- Definir o **tom e estilo** de comunicação
- Especificar **formatos de saída** (JSON, marcadores, tabela)
- Adicionar **restrições de segurança e qualidade**

### Exemplo simples

```text
You are a helpful AI assistant.
```

### Exemplo detalhado

```text
You are a friendly travel advisor for Margie's Travel.
Answer only questions related to travel, hotels, and trip planning.
Use a warm, conversational tone.
If you don't have enough information to answer, ask a clarifying question.
Format hotel recommendations as a bulleted list with the hotel name, location, and price range.
```

> **Importante:** uma mensagem do sistema **influencia** o modelo, mas não **garante** conformidade. Teste, itere e combine com filtragem de conteúdo e avaliação.

### Checklist para mensagem de sistema

1. **Comece com a função** — declare o papel e o resultado esperado
2. **Defina limites** — tópicos, ações e conteúdo a evitar
3. **Especifique formato de saída** — declare o formato e mantenha consistente
4. **Adicione política de incerteza** — o que fazer quando a pergunta é ambígua, fora do escopo ou sem informação

---

## Padrões de prompt

### Padrão de persona

Instrua o modelo a assumir uma perspectiva ou função específica:

| | Sem persona | Com persona |
|---|---|---|
| **Mensagem do sistema** | *Nenhuma* | Você é um profissional de marketing experiente escrevendo para clientes técnicos. |
| **Prompt** | Escreva uma descrição de um produto CRM. | Escreva uma descrição de um produto CRM. |
| **Resposta** | Definição genérica | Copy persuasivo com foco em benefícios |

### Padrão de formato/template

Forneça um modelo ou estrutura para a saída:

```text
Format the result to show:
- Hotel name
- Location
- Star rating
- Price range per night
```

### Padrão de cadeia de pensamento (Chain of Thought)

Peça ao modelo para **explicar o raciocínio passo a passo** — reduz imprecisões e facilita a verificação:

```text
Which hotel is best for a family of four? Take a step-by-step approach:
consider room size, amenities for children, location, and price.
```

Uma técnica relacionada é **dividir a tarefa** em sub-etapas explícitas: primeiro extrair fatos, depois responder com base neles.

> **Nota:** cadeia de pensamento é para modelos **não baseados em raciocínio**. Modelos da série "o" (como o1) lidam com raciocínio internamente.

### Padrão de aprendizado few-shot

Forneça exemplos de entrada/saída para o modelo identificar o padrão:

```text
Classify the following customer messages:

Message: "I need to change my flight to Rome"
Category: Booking change

Message: "What's the weather like in Bali in March?"
Category: Travel information

Message: "Can I get a refund for my cancelled tour?"
Category:
```

| Termo | Significado |
|---|---|
| **Zero-shot** | Nenhum exemplo fornecido |
| **One-shot** | Um único exemplo |
| **Few-shot** | Dois ou mais exemplos |

### Delimitadores e sintaxe clara

Quando o prompt tem múltiplas seções (instruções, texto de origem, exemplos), use delimitadores como `---`, títulos Markdown ou tags XML para separar:

> **Dica:** modelos podem ter **viés de recência** — texto no final do prompt pode ter mais influência. Se o modelo não segue instruções consistentemente, repita a instrução-chave no final.

---

## Parâmetros de modelo

| Parâmetro | O que controla | Quando usar |
|---|---|---|
| **Temperatura** | Aleatoriedade da saída (0,0 a 2,0) | Baixa (0,2) para tarefas factuais; alta (0,7) para criativas |
| **Top_p** | Limita a probabilidade cumulativa dos tokens considerados | Alternativa à temperatura; top_p=0,9 = 90% tokens mais prováveis |

> **Recomendação:** ajuste **temperatura OU top_p**, não os dois ao mesmo tempo.

---

## Quando a engenharia de prompt é suficiente

Ela é eficaz quando você precisa:

- Guiar tom, formato e comportamento
- Fornecer instruções específicas para uma tarefa
- Iterar rapidamente sem mudanças de infraestrutura
- Manter custos baixos (sem treinamento adicional nem armazenamento)

### Quando não é suficiente

- O modelo **não tem acesso** às informações necessárias (dados privados, catálogo) → use **RAG**
- O modelo **falha em manter** um comportamento consistente apesar de instruções detalhadas → use **ajuste fino**

---

## Pontos que costumam confundir

**Mensagem do sistema ≠ garantia.** O modelo é influenciado, não controlado. Instruções podem ser ignoradas — combine com filtragem e avaliação.

**Few-shot não é fine-tuning.** Few-shot fornece exemplos *no prompt* a cada chamada (consome tokens). Fine-tuning incorpora os padrões nos pesos do modelo (não consome tokens extras).

**Temperatura e top_p fazem coisas parecidas.** Os dois controlam aleatoriedade, mas por mecanismos diferentes. Não ajuste os dois simultaneamente.

**Viés de recência.** O modelo dá mais peso ao que está perto do final do prompt. Se uma instrução é ignorada, repita-a no final.

**Cadeia de pensamento é para modelos que não raciocinam sozinhos.** Modelos da série "o" já fazem isso internamente — forçar chain-of-thought é redundante neles.

---

## Aprofundar na documentação

- [Otimizar a saída do modelo com engenharia de prompt — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/optimize-generative-ai-model-performance/2-prompt-engineering)
- Próxima página: [[02 - RAG (Geração Aumentada de Recuperação)]]
