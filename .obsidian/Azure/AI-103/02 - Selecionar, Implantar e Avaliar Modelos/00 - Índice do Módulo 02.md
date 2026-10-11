---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - moc
modulo: 02
titulo: Selecionar, implantar e avaliar modelos do Microsoft Foundry
nivel: intermediário
---

# Selecionar, Implantar e Avaliar Modelos

Nota de entrada do módulo. Com mais de **1.900 modelos** no catálogo do Microsoft Foundry, escolher "o melhor modelo" não é uma decisão de opinião: é um processo estruturado de **descobrir → comparar por métrica → implantar → testar → medir → iterar**.

O cenário que amarra o módulo: um **chatbot de suporte ao cliente de uma empresa de varejo**, que precisa entender as perguntas, responder com precisão e manter tom e padrões de segurança adequados. Três perguntas guiam tudo: como escolher no meio do catálogo, como saber se o modelo é bom **para esta necessidade** e como medir e melhorar depois de implantado.

![[m02-fluxo-modulo.png]]

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Catálogo de Modelos - Explorar e Filtrar]] | Categorias de cobrança, os seis filtros e todos os tipos de modelo |
| 2 | [[02 - Benchmarks - Comparar e Selecionar Modelos]] | As quatro dimensões de métrica e as quatro ferramentas de comparação |
| 3 | [[03 - Implantar Modelos em Endpoints]] | Os nove tipos de implantação, o fluxo no portal e o gerenciamento |
| 4 | [[04 - Testar no Playground e Conectar o Aplicativo]] | Teste interativo, parâmetros de inferência e acesso programático |
| 5 | [[05 - Avaliar o Desempenho do Modelo]] | Avaliação manual, avaliação automatizada e o ciclo de iteração |
| 6 | [[06 - Métricas de Avaliação - Referência]] | As três famílias de métricas, definição por definição |

---

## Mapa mental do módulo em uma frase

> Filtre o **catálogo** para chegar a poucos candidatos, compare-os por **qualidade, segurança, custo e desempenho**, **implante** o escolhido no tipo de implantação que atende à conformidade e ao orçamento, **teste** no playground, **avalie** com métricas automatizadas mais julgamento humano e **itere** — reavaliando a cada mudança.

---

## Tabela de decisão rápida

| Se o cenário pede… | A resposta é |
|---|---|
| Comparar rapidamente quem lidera em uma métrica | **Placar de líderes** (Catálogo → Ranking de Modelos) |
| Escolher pensando na tarefa concreta (código, matemática, fundamentação) | **Placar de cenário** |
| Equilibrar duas métricas ao mesmo tempo | **Gráfico de compensação** — melhor posição no canto superior direito |
| Decidir entre dois ou três finalistas | **Comparação lado a lado** |
| Modelo pequeno, barato, para dispositivo de borda | **SLM** (Phi-4, Llama 3 8B) |
| Pesquisa semântica ou RAG | Modelo de **embedding** (Ada, Cohere) |
| Cargas gerais com a cota mais alta | **Padrão Global** |
| Taxa de produtividade alta e previsível | **Provisionado** (PTU) |
| Processar um lote grande com 50% de desconto | **Batch Global** — assíncrono, até 24 h |
| Dados que não podem sair da UE ou dos EUA | **Zona de Dados** (padrão, provisionado ou batch) |
| Residência de dados em uma região específica | **Regional** |
| Só avaliar um modelo ajustado (fine-tuned) | **Implantação Desenvolvedor** |
| Verificar se a resposta se apoia no contexto fornecido | Métrica de **Fundamentação** (Groundedness) |
| Avaliar tradução automática | **BLEU** (ou METEOR, se sinônimos importam) |
| Avaliar resumo | **ROUGE** — enfatiza recall |
| Descobrir se o modelo cede a jailbreak | **Ataque indireto** |
| Reduzir conteúdo prejudicial na saída | **Filtros de conteúdo** (Segurança de Conteúdo de IA do Azure) |

---

## Objetivos de aprendizagem cobertos

- [x] Explorar e filtrar modelos no catálogo de modelos
- [x] Comparar modelos usando métricas de benchmark para qualidade, segurança, custo e desempenho
- [x] Implantar um modelo em um endpoint e testá-lo no playground
- [x] Avaliar o desempenho do modelo com abordagens manuais e automatizadas
- [x] Entender as diferentes métricas de avaliação e quando usar cada uma

---

## Prática recomendada

Laboratório de ~20 minutos: selecionar modelos de linguagem no catálogo, implantá-los, testá-los e avaliar o desempenho. Requer assinatura do Azure com acesso administrativo.

- [Exercício: Selecionar, implantar e avaliar modelos](https://go.microsoft.com/fwlink/?linkid=2354118&azure-portal=true)

O que vale exercitar, porque vira questão de "onde faço X":

1. Aplicar dois filtros diferentes no catálogo e ver o conjunto de candidatos mudar.
2. Abrir o **Ranking de Modelos** e alternar entre placar de líderes e gráfico de compensação.
3. Implantar dois modelos e comparar as respostas **lado a lado** no playground.
4. Alterar **temperatura** e **mensagem do sistema** e observar a mudança de comportamento.
5. Localizar **endpoint, chave e nome da implantação** na tela da implantação.
6. Criar uma avaliação automatizada com conjunto de dados sintético e ler as pontuações agregadas.

---

## Aprofundar na documentação

- [Módulo completo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/)
- Módulo anterior: [[AI-901/01 - Introdução a conceitos de IA/00 - Índice do Módulo 01]] · Próximo módulo: [[AI-901/03 - Introdução a conceitos de fala de IA/00 - Índice do Módulo 03]]
