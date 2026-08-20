---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - avaliacao
  - metricas
modulo: 02
---

# Métricas de Avaliação — Referência

Página de consulta rápida. As métricas de avaliação automatizada se dividem em **três famílias**, e a escolha entre elas depende da **natureza da tarefa**, não da preferência do time.

![[m02-metricas-avaliacao.png]]

---

## Família 1 — Qualidade de geração

Métricas **assistidas por IA**: um modelo GPT atua como avaliador e atribui as pontuações.

| Métrica | Definição |
|---|---|
| **Fundamentação** (*Groundedness*) | Determina se as respostas se baseiam no **contexto fornecido**, em vez de especulação. O **Groundedness Pro** oferece avaliação **binária**: fundamentada ou não fundamentada |
| **Relevância** | Mede se as respostas abordam adequadamente a pergunta ou solicitação do usuário |
| **Coerência** | Avalia se as respostas fluem logicamente e mantêm ideias consistentes |
| **Fluência** | Avalia a correção linguística e a qualidade da linguagem natural |

**Use quando:** a tarefa é geração aberta, RAG ou assistente de conversa — casos sem uma resposta única correta.

---

## Família 2 — Risco e segurança

| Métrica | O que detecta |
|---|---|
| **Conteúdo de automutilação** | Respostas que discutem ou incentivam automutilação |
| **Conteúdo odioso e injusto** | Preconceito, discriminação ou declarações odiosas |
| **Conteúdo violento** | Respostas que contêm ou promovem violência |
| **Conteúdo sexual** | Conteúdo sexual inadequado |
| **Material protegido** | Possíveis violações de direitos autorais ou reprodução de conteúdo proprietário |
| **Ataque indireto** (*jailbreak*) | Vulnerabilidade a tentativas de manipulação do modelo |

### Cálculo da taxa de defeito

| Grupo de métricas | Fórmula |
|---|---|
| Danos de conteúdo (automutilação, ódio, violência, sexual) | **Percentual de respostas que excedem o limite de severidade** — normalmente **Médio** |
| Material protegido e ataque indireto | **(instâncias verdadeiras ÷ total de instâncias) × 100** |

**Use quando:** o cenário envolve conformidade, público amplo ou exposição pública do sistema.

---

## Família 3 — Processamento de linguagem natural (NLP)

Métricas **comparativas**: exigem uma resposta de referência ("gabarito").

| Métrica | Nome completo | Como funciona | Caso de uso típico |
|---|---|---|---|
| **Medida F1** | — | Proporção de palavras compartilhadas entre a resposta verdadeira e a gerada; equilibra **precisão** e **recall** | Classificação de texto, recuperação de informações |
| **BLEU** | *Bilingual Evaluation Understudy* | Compara **n-gramas** entre o texto gerado e o de referência | Avaliação de **tradução automática** |
| **METEOR** | *Metric for Evaluation of Translation with Explicit ORdering* | Estende o BLEU contabilizando **sinônimos, radicalização e paráfrase** | Comparação mais **flexível** que o BLEU |
| **ROUGE** | *Recall-Oriented Understudy for Gisting Evaluation* | Enfatiza **recall** (recuperação de informação) sobre precisão | Tarefas de **resumo**, em que cobrir os pontos principais é o que importa |
| **GLEU** | *Google-BLEU* | Variante do BLEU para avaliação no **nível da sentença** | Avaliação sentença a sentença |

**Requisito:** funcionam bem quando existe uma **resposta de referência correta e definitiva**. São **pouco adequadas** para geração aberta com múltiplas respostas válidas.

---

## Tabela de decisão: tarefa → métrica

| A tarefa é… | Métrica |
|---|---|
| Chatbot de suporte respondendo a partir da base de conhecimento | **Fundamentação** + **Relevância** |
| Verificar se a resposta não inventou informação | **Fundamentação** (Groundedness Pro para veredito binário) |
| Verificar se o texto está bem escrito | **Fluência** |
| Verificar se o raciocínio não se contradiz | **Coerência** |
| Traduzir catálogo de produtos | **BLEU**; **METEOR** se sinônimos e paráfrases forem aceitáveis |
| Resumir documentos longos | **ROUGE** |
| Avaliar frase por frase | **GLEU** |
| Classificar tíquetes em categorias fixas | **Medida F1** |
| Sistema aberto ao público em geral | Todas as métricas de **risco e segurança** |
| Risco de reproduzir conteúdo com direitos autorais | **Material protegido** |
| Testar resistência a manipulação | **Ataque indireto (jailbreak)** |

---

## Mapa rápido: qual família usar

| Situação | Família |
|---|---|
| Existe um gabarito correto e único | **NLP** |
| Não existe gabarito; a resposta pode variar e ainda estar certa | **Qualidade de geração** |
| A preocupação é o que o modelo **não deveria** dizer | **Risco e segurança** |

---

## Pontos que costumam confundir

**BLEU × ROUGE.** BLEU é orientado a **precisão** e nasceu para **tradução**; ROUGE é orientado a **recall** e é a métrica de **resumo**. Trocar as duas é o erro mais frequente.

**METEOR é BLEU flexibilizado.** A diferença é aceitar sinônimo, radical e paráfrase — o que importa quando "carro" e "automóvel" deveriam contar como acerto.

**GLEU não é o mesmo que BLEU.** É variante do Google para avaliação **no nível da sentença**.

**Métrica de NLP não serve para geração aberta.** Se o cenário diz que existem várias respostas válidas, a resposta correta é qualidade de geração assistida por IA — não F1, BLEU ou ROUGE.

**Fundamentação ≠ Relevância.** Fundamentação pergunta "isso vem do contexto?"; Relevância pergunta "isso responde à pergunta?". Uma resposta pode ser relevante e não fundamentada — é exatamente a definição de alucinação convincente.

**Duas fórmulas de taxa de defeito.** Danos de conteúdo usam **limite de severidade** (padrão Médio); material protegido e ataque indireto usam **proporção de instâncias verdadeiras**.

**Groundedness Pro é binário.** Enquanto a fundamentação comum dá pontuação, o Pro entrega veredito: fundamentada ou não.

---

## Aprofundar na documentação

- [Avaliar o desempenho do modelo — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/5-evaluate-performance)
- Voltar ao [[00 - Índice do Módulo 02]] · Página anterior: [[05 - Avaliar o Desempenho do Modelo]]
