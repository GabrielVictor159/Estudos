---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - otimização
  - prompt-engineering
  - RAG
  - fine-tuning
modulo: 05
titulo: Otimizar o desempenho do modelo de IA generativo com o Microsoft Foundry
nivel: intermediário
---

# Otimizar o Desempenho do Modelo de IA Generativo

Nota de entrada do módulo. Aqui o assunto deixa de ser "como conectar e chamar o modelo" e passa a ser **como fazer o modelo responder melhor**: com prompts bem estruturados, com dados reais via RAG, ou com treinamento adicional via ajuste fino. As três estratégias são **complementares** — saber quando usar cada uma e quando combiná-las é o que cai na prova.

![[m05-espectro-otimizacao.jpg]]

> **Conceito central:** Engenharia de prompt é a base; RAG adiciona **conhecimento**; ajuste fino adiciona **consistência comportamental**. Comece simples e adicione complexidade só quando necessário.

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Engenharia de Prompt]] | Mensagem de sistema, padrões de prompt, few-shot e parâmetros de modelo |
| 2 | [[02 - RAG (Geração Aumentada de Recuperação)]] | Fundamentar o modelo com dados reais via embeddings e Azure AI Search |
| 3 | [[03 - Ajuste Fino (Fine-Tuning)]] | Treinar o modelo com dados rotulados para comportamento consistente |
| 4 | [[04 - Comparar e Combinar Estratégias]] | Quando usar cada uma e as combinações mais eficazes |

---

## Mapa mental do módulo em uma frase

> Comece com **engenharia de prompt** (sem custo extra, iteração rápida), adicione **RAG** quando o modelo precisa de dados que ele não tem (domínio, atualizações), e considere **ajuste fino** quando precisa de consistência de estilo/formato que prompts detalhados não garantem — combinando as três para aplicativos exigentes.

---

## Tabela de decisão rápida

| Se o cenário pede… | A estratégia é |
|---|---|
| Definir tom, formato e comportamento do assistente | **Engenharia de prompt** (mensagem de sistema) |
| Iterar rapidamente sem custo de infraestrutura | **Engenharia de prompt** |
| Demonstrar o formato esperado com exemplos | **Engenharia de prompt** (few-shot) |
| Respostas mais criativas vs. mais focadas | **Parâmetros de modelo** (temperatura / top_p) |
| O modelo inventa dados porque não tem o conhecimento | **RAG** |
| Precisão factual com dados privados da empresa | **RAG** (Azure AI Search + embeddings) |
| Dados que mudam com frequência (preços, estoque) | **RAG** |
| O modelo não mantém estilo/tom consistente apesar de prompts detalhados | **Ajuste fino** |
| Reduzir prompts longos para economizar tokens | **Ajuste fino** |
| Transferir capacidade de modelo grande para modelo menor | **Ajuste fino** (destilação) |
| Melhorar precisão do function calling | **Ajuste fino** com exemplos de ferramentas |
| Dados atualizados + estilo consistente | **RAG + Ajuste fino** |
| Aplicativo exigente com todas as necessidades | **Prompt + RAG + Ajuste fino** |

---

## Tabela comparativa das três estratégias

| Aspecto | Engenharia de Prompt | RAG | Ajuste Fino |
|---|---|---|---|
| **Tempo para implementar** | Baixo | Médio | Alto |
| **Complexidade** | Baixa | Média | Alta |
| **Custo** | Baixo (por token) | Médio (infra + storage + token) | Alto (treinamento + hospedagem + token) |
| **Melhor para** | Tom, formato, comportamento, iteração rápida | Precisão factual, dados privados, dados dinâmicos | Consistência de estilo, redução de prompt, destilação |
| **O que otimiza** | Como o modelo responde | O que o modelo sabe | Como o modelo se comporta |
| **Requer dados adicionais?** | Não | Sim (índice de busca) | Sim (JSONL de treinamento) |
| **Requer retreinamento?** | Não | Não (índice é atualizado) | Sim (ao mudar requisitos ou modelo base) |

---

## Framework de decisão incremental

```
1. Comece com Engenharia de Prompt
   → Atende? ✅ Pare aqui
   → Não atende (falta conhecimento)? ↓

2. Adicione RAG
   → Atende? ✅ Pare aqui
   → Não atende (inconsistência de estilo)? ↓

3. Adicione Ajuste Fino
   → Atende? ✅ Pare aqui
   → Precisa de tudo? ↓

4. Combine as três
   Ajuste fino (estilo) + RAG (dados) + Prompt (instruções por sessão)
```

---

## Objetivos de aprendizagem cobrados

- [x] Aplicar técnicas de engenharia de prompt: mensagens do sistema, few-shot e parâmetros de modelo
- [x] Entender quando e como fundamentar um modelo usando RAG
- [x] Identificar quando o ajuste fino melhora a consistência comportamental
- [x] Comparar as estratégias e determinar quando combiná-las

---

## Pré-requisitos assumidos pelo módulo

- Familiaridade com conceitos e serviços fundamentais de IA no Azure

---

## Prática recomendada

- [Exercício: Otimizar o desempenho do modelo de IA generativo](https://learn.microsoft.com/pt-br/training/modules/optimize-generative-ai-model-performance/6-exercise)

O que vale exercitar:

1. Criar mensagens de sistema com persona, formato e política de incerteza.
2. Testar temperatura baixa (0,2) vs. alta (0,7) para o mesmo prompt.
3. Experimentar few-shot adicionando 2-3 exemplos de classificação.
4. Injetar dados recuperados na mensagem de sistema e comparar com resposta sem grounding.
5. Preparar um JSONL de treinamento e observar a diferença de consistência.

---

## Aprofundar na documentação

- [Módulo completo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/optimize-generative-ai-model-performance/)
- Módulo anterior: [[00 - Índice do Módulo 04]]
- Próximo módulo: [[00 - Índice do Módulo 06]]
