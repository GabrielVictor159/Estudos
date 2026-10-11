---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - otimização
  - comparação
modulo: 05
---

# Comparar e Combinar Estratégias de Otimização

As três estratégias — engenharia de prompt, RAG e ajuste fino — **não são mutuamente exclusivas**. São métodos complementares que abordam **dimensões diferentes** do desempenho do modelo. Esta página é a cola para decidir o que usar.

![[m05-model-optimization.png]]

---

## O espectro de otimização

As estratégias operam em dois eixos:

- **Otimizar para o contexto** → RAG: quando o modelo precisa de conhecimento que não tem
- **Otimizar o modelo** → Ajuste fino: quando o modelo precisa de comportamento consistente

A **engenharia de prompt** é a base que suporta ambos os eixos.

```
                 Engenharia de Prompt (base)
                        ↙           ↘
              Otimizar contexto    Otimizar modelo
                   RAG              Ajuste fino
         (o que o modelo sabe)   (como o modelo se comporta)
```

---

## Comparação ponto a ponto

| Aspecto | Engenharia de Prompt | RAG | Ajuste Fino |
|---|---|---|---|
| **Tempo para implementar** | Baixo | Médio | Alto |
| **Complexidade** | Baixa | Média | Alta |
| **Custo** | Baixo (por token) | Médio (infra de pesquisa + storage + token) | Alto (treinamento + hospedagem + token) |
| **Mais adequado para** | Tom, formato, comportamento, iteração rápida | Precisão factual, dados privados, dados dinâmicos | Consistência de estilo, redução de prompt, destilação |

---

## Trade-offs de cada estratégia

### Engenharia de prompt

| ✅ Vantagem | ⚠️ Desvantagem |
|---|---|
| Mais rápida e menos custosa | Prompts longos consomem mais tokens |
| Sem mudança de infraestrutura | O modelo nem sempre segue instruções complexas |
| Iteração imediata | Não pode dar ao modelo informações que ele não tem |

### RAG

| ✅ Vantagem | ⚠️ Desvantagem |
|---|---|
| Dados relevantes e atualizados em tempo de consulta | Requer search service, índice e processamento de embeddings |
| Melhora significativa na precisão factual | Qualidade depende de como os dados são chunkeados e indexados |
| Dados podem ser atualizados sem retreinar | Adiciona latência e custo de infraestrutura |

### Ajuste fino

| ✅ Vantagem | ⚠️ Desvantagem |
|---|---|
| Comportamento mais consistente (padrões nos pesos) | Maior investimento inicial (dados, treinamento, hospedagem) |
| Reduz tamanho dos prompts → menos tokens/chamada | Pode precisar retreinar com modelo base atualizado |
| Destilação para modelo menor | Dados de baixa qualidade causam overfitting/bias |

---

## Combinações comuns

### Prompt + RAG (a mais comum)

- **Prompt** define o comportamento (mensagem de sistema)
- **RAG** fornece o contexto factual (dados do catálogo)
- Resolve *como o modelo age* + *o que o modelo sabe*

### Prompt + Ajuste fino

- **Ajuste fino** define o comportamento padrão (estilo, voz de marca)
- **Prompt** adiciona instruções específicas por sessão (ex.: promoção sazonal)
- Resolve consistência de estilo + flexibilidade por conversa

### RAG + Ajuste fino

- **Ajuste fino** garante formato e estilo confiáveis
- **RAG** fornece dados atuais e específicos do domínio
- Resolve fundamentação factual + consistência comportamental

### As três juntas

Para os aplicativos mais exigentes:

1. **Ajuste fino** → estilo e formato consistentes
2. **RAG** → conhecimento de domínio preciso e atualizado
3. **Engenharia de prompt** → instruções específicas de conversa e proteções

---

## Framework de decisão (o que a prova cobra)

```
1. Comece com ENGENHARIA DE PROMPT
   → Teste mensagens de sistema, few-shot, parâmetros
   → Avalie se os resultados atendem

2. Adicione RAG se PRECISÃO é importante
   → O modelo precisa de dados específicos, atuais ou privados?
   → Implemente com Azure AI Search

3. Adicione AJUSTE FINO se CONSISTÊNCIA é importante
   → O modelo não mantém estilo/tom/formato?
   → Ajuste com exemplos representativos

4. COMBINE conforme necessário
   → Nem todo aplicativo precisa dos três
```

---

## Cola para a prova: cenário → estratégia

| Cenário descrito na questão | Resposta |
|---|---|
| "O modelo gera informações fictícias sobre nossos produtos" | **RAG** (falta de dados) |
| "O modelo não segue nosso formato de resposta consistentemente" | **Ajuste fino** (inconsistência comportamental) |
| "Queremos testar rapidamente diferentes formatos de resposta" | **Engenharia de prompt** (iteração rápida) |
| "O modelo precisa acessar nossa knowledge base interna" | **RAG** (dados privados) |
| "Os preços dos produtos mudam semanalmente" | **RAG** (dados dinâmicos) |
| "Queremos que o modelo responda sempre no tom da marca" | **Ajuste fino** (consistência de estilo) |
| "Temos um modelo caro e queremos usar um menor com qualidade similar" | **Ajuste fino** (destilação) |
| "O prompt está muito longo e caro" | **Ajuste fino** (reduzir prompt) |
| "Precisamos de respostas factuais E no estilo da marca" | **RAG + Ajuste fino** |
| "Implementação rápida sem infraestrutura adicional" | **Engenharia de prompt** |
| "Adicionar exemplos de classificação no prompt" | **Few-shot** (engenharia de prompt) |
| "Qual técnica de pesquisa é recomendada para IA generativa?" | **Pesquisa híbrida** (Azure AI Search) |
| "O ajuste fino muda os dados de treinamento ou os pesos?" | **Pesos** do modelo |
| "O que o LoRA faz?" | Atualiza **subconjunto** de parâmetros (eficiência) |
| "Formato dos dados de ajuste fino?" | **JSONL** |

---

## Pontos que costumam confundir

**As estratégias não são excludentes.** A pergunta "qual é a melhor" quase nunca é a certa — a pergunta certa é "qual combinação resolve meu problema?"

**RAG ≠ ajuste fino.** RAG resolve "o modelo não sabe"; ajuste fino resolve "o modelo não se comporta como quero". Na prova, a distinção é sempre pelo **tipo de problema**.

**Engenharia de prompt é SEMPRE o ponto de partida.** Mesmo quando RAG e ajuste fino são necessários, a mensagem de sistema e os parâmetros continuam relevantes.

**Nem todo app precisa dos três.** A recomendação é incremental: comece simples, adicione complexidade só quando necessário.

**Custo importa.** Engenharia de prompt é a mais barata; ajuste fino é o mais caro. A prova pode perguntar sobre trade-offs de custo × benefício.

---

## Aprofundar na documentação

- [Comparar e combinar estratégias — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/optimize-generative-ai-model-performance/5-compare-combine-strategies)
- Voltar ao [[AI-103/05 - Otimizar Desempenho do Modelo/00 - Índice do Módulo 05]]
- Página anterior: [[03 - Ajuste Fino (Fine-Tuning)]]
