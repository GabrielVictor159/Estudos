---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - modelos
  - benchmarks
modulo: 02
---

# Benchmarks — Comparar e Selecionar Modelos

Benchmarks são medidas **padronizadas do setor** que permitem comparar modelos em condições iguais. No Microsoft Foundry eles se organizam em quatro dimensões — **qualidade, segurança, custo e desempenho** — e a habilidade cobrada é saber **qual dimensão importa em cada cenário** e **em que direção se lê cada métrica**.

![[m02-benchmarks.png]]

---

## Onde encontrar os benchmarks

| Caminho | O que oferece |
|---|---|
| **Catálogo de Modelos → Ranking de Modelos** | Classificações comparativas entre **todos** os modelos, com placares por qualidade, segurança, custo estimado e taxa de transferência |
| **Cartão individual do modelo → guia Benchmarks** | Parâmetros detalhados **daquele** modelo e gráficos de comparação contra modelos semelhantes |

![Captura de tela da classificação de modelos no portal Microsoft Foundry](https://learn.microsoft.com/pt-br/training/wwl-data-ai/model-catalog-evaluate/media/model-leaderboard.png)

---

## Dimensão 1 — Qualidade

**Escala:** índices normalizados de **0 a 1**. **Maior é melhor.**

| Métrica | O que mede |
|---|---|
| **Índice de Qualidade** | Média das pontuações de precisão em vários conjuntos de benchmark: raciocínio, conhecimento, resposta a perguntas, matemática e codificação. É o número-resumo da dimensão |
| **Arena-Hard** | Resposta a perguntas adversárias |
| **BIG-Bench Hard** | Recursos de raciocínio |
| **GPQA** | Perguntas multidisciplinares de nível de pós-graduação |
| **HumanEval+** | Tarefas de geração de código |
| **MBPP+** | Tarefas de geração de código |
| **MATH** | Raciocínio matemático |
| **MMLU-Pro** | Avaliação geral de conhecimento |
| **IFEval** | Capacidade de seguir instruções |

---

## Dimensão 2 — Segurança

**Atenção: a direção de leitura varia métrica a métrica.**

| Métrica | O que mede | Direção |
|---|---|---|
| **ASR — HarmBench** (Taxa de Sucesso de Ataque) | Resistência do modelo a produzir conteúdo não seguro | **Menor = mais seguro** |
| ↳ Comportamentos nocivos padrão | Crimes cibernéticos, atividades ilegais, danos gerais | Menor |
| ↳ Comportamentos contextualmente prejudiciais | Desinformação, assédio, bullying | Menor |
| ↳ Violações de direitos autorais | Reprodução de material protegido | Menor |
| **ToxiGen** (medida F) | Detecção de fala de ódio adversária e implícita | **Maior = melhor** |
| **WMDP** (proxy para armas de destruição em massa) | Conhecimento em biossegurança, segurança cibernética e segurança química | **Maior = mais conhecimento perigoso** |

> O WMDP é a pegadinha clássica: um valor **alto** não é um bom sinal — indica que o modelo detém mais conhecimento sensível.

---

## Dimensão 3 — Custo

**Menor é melhor.** Aplica-se a implantações de **API serverless** e a modelos do **Azure OpenAI**.

| Métrica | Definição |
|---|---|
| **Custo por tokens de entrada** | Preço para processar 1 milhão de tokens de entrada |
| **Custo por tokens de saída** | Preço para gerar 1 milhão de tokens de saída |
| **Custo estimado** | Combina entrada e saída na proporção típica de **3:1** (3 tokens de entrada para 1 de saída) |

---

## Dimensão 4 — Desempenho

Divide-se em **latência** (quanto demora) e **taxa de transferência** (quanto processa por segundo).

### Latência — menor é melhor

| Métrica | Definição |
|---|---|
| **Latência média** | Tempo médio, em segundos, para processar uma solicitação |
| **P50 (mediana)** | 50% das solicitações concluem mais rápido que esse tempo |
| **P90** | 90% concluem mais rápido que esse tempo |
| **P95** | 95% concluem mais rápido que esse tempo |
| **P99** | 99% concluem mais rápido que esse tempo |
| **TTFT** (Tempo para o Primeiro Token) | Tempo até o primeiro token chegar, ao usar **streaming** |

### Taxa de transferência — maior é melhor

| Métrica | Definição |
|---|---|
| **GTPS** (Tokens Gerados por Segundo) | Tokens de **saída** gerados por segundo |
| **TTPS** (Total de Tokens por Segundo) | Tokens de entrada **e** saída combinados, por segundo |
| **Tempo entre tokens** | Intervalo entre tokens consecutivos — aqui, **menor** é melhor |

**Resumo que aparece na tabela de classificação:** tempo médio até o primeiro token (menor é melhor) e tokens gerados por segundo em média (maior é melhor).

---

## As quatro ferramentas de comparação

![[m02-ferramentas-comparacao.png]]

| Ferramenta | Como funciona | Use para |
|---|---|---|
| **Placares de líderes** | Classificação por qualidade, segurança, custo estimado ou taxa de transferência | Levantar candidatos iniciais |
| **Placares de cenário** | Placares otimizados por caso de uso: raciocínio, codificação, matemática, resposta a perguntas e fundamentação | Filtrar pela tarefa que o app realmente executa |
| **Gráficos de compensação** | Exibem **duas** métricas ao mesmo tempo — qualidade × custo, qualidade × taxa de transferência, qualidade × segurança. **Melhor posição: canto superior direito** | Enxergar o trade-off em vez de um ranking único |
| **Comparação lado a lado** | 2 ou 3 modelos comparados em desempenho (qualidade, segurança, throughput), detalhes (janela de contexto, dados de treinamento, idiomas), endpoints suportados e recursos (chamada de função, saída estruturada, visão) | Decidir entre finalistas |

---

## Tabela de decisão: prioridade do cenário → métrica

| O cenário prioriza… | Olhe para |
|---|---|
| "Respostas corretas acima de tudo" | Índice de Qualidade; MMLU-Pro para conhecimento geral |
| "Gerar código confiável" | HumanEval+ e MBPP+ |
| "Cálculos e lógica" | MATH e BIG-Bench Hard |
| "O modelo tem que obedecer ao formato pedido" | IFEval |
| "Resistir a prompts maliciosos" | ASR do HarmBench (menor) |
| "Não reproduzir material protegido" | Violações de direitos autorais (menor) |
| "Não gerar discurso de ódio" | ToxiGen (maior) |
| "Orçamento apertado, alto volume" | Custo estimado (proporção 3:1) |
| "Interface de chat que precisa parecer instantânea" | TTFT — tempo até o primeiro token |
| "Processar muitos documentos por minuto" | GTPS / TTPS |
| "Garantir experiência consistente, sem picos" | P95 e P99, não a média |
| "Equilibrar qualidade e preço" | Gráfico de compensação qualidade × custo |
| "Escolher entre dois modelos já pré-selecionados" | Comparação lado a lado |

---

## Pontos que costumam confundir

**Média engana; percentil não.** Uma latência média boa pode esconder picos horríveis. Cenários que mencionam **experiência consistente** ou **pior caso** pedem P95 ou P99.

**TTFT só faz sentido com streaming.** É a métrica de percepção de velocidade em interfaces de chat — o usuário vê a resposta começar, mesmo que ela demore a terminar.

**GTPS × TTPS.** GTPS conta só a **saída**; TTPS conta **entrada + saída**. Cenários de resumo de documentos longos (muita entrada, pouca saída) são melhor descritos por TTPS.

**Custo estimado assume 3:1.** Se a carga real for muito diferente dessa proporção — por exemplo, RAG com prompts enormes — o custo estimado subestima a conta.

**No gráfico de compensação, o canto superior direito vence.** Mas o que interessa mesmo é a **borda superior**: a partir dela, cada ponto de qualidade custa caro.

**Segurança não tem direção única.** ASR e violações: menor. ToxiGen: maior. WMDP: maior significa mais conhecimento perigoso. Ler a direção errada é o erro mais comum dessa unidade.

---

## Aprofundar na documentação

- [Selecionar modelos usando parâmetros de comparação — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/3-select-models-benchmarks)
- Páginas relacionadas: [[01 - Catálogo de Modelos - Explorar e Filtrar]] · [[03 - Implantar Modelos em Endpoints]]
