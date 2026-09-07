---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - responsible-ai
  - content-safety
  - filtros
modulo: 06
titulo: Implementar uma solução de IA de geração responsável no Microsoft Foundry
nivel: intermediário
---

# IA Generativa Responsável

Nota de entrada do módulo. Aqui o assunto é **como garantir que sua solução de IA generativa não cause danos** — desde a identificação de riscos até a operação em produção. O módulo define um processo de 4 estágios (Mapear → Medir → Atenuar → Gerenciar) e detalha as camadas de mitigação disponíveis no Microsoft Foundry.

![[m06-processo-ia-responsavel.jpg]]

> **Conceito central:** IA responsável não é uma etapa isolada — é um **processo iterativo e contínuo** que permeia todo o ciclo de vida da solução, desde o planejamento até a operação em produção.

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Planejar e Mapear Danos]] | As 4 fases do processo e como identificar/priorizar danos |
| 2 | [[02 - Medir Danos]] | Como quantificar e testar a presença de danos nas saídas |
| 3 | [[03 - Atenuar Danos (Camadas de Mitigação)]] | As 4 camadas de defesa: modelo, segurança, prompt e UX |
| 4 | [[04 - Gerenciar e Operar com Responsabilidade]] | Revisão pré-lançamento, entrega em fases e monitoramento |

---

## Mapa mental do módulo em uma frase

> O processo de IA responsável é cíclico: **Mapear** danos potenciais (identificar, priorizar, red team, documentar), **Medir** sua presença (testes manuais + automáticos), **Atenuar** em 4 camadas (modelo → sistema de segurança → mensagem do sistema/RAG → UX) e **Gerenciar** em produção (revisão pré-lançamento, entrega em fases, incidentes, telemetria).

---

## Tabela de decisão rápida

| Se o cenário pede… | A ação/conceito é |
|---|---|
| Identificar quais danos a solução pode causar | **Mapear** — etapa 1 do processo |
| Descobrir se o modelo gera conteúdo ofensivo | **Red teaming** (fase de Mapear) |
| Avaliar quantos prompts resultam em saída prejudicial | **Medir** — testes com prompts adversários |
| Bloquear automaticamente conteúdo violento ou sexual | **Filtros de conteúdo** (camada de segurança) |
| Impedir que o modelo ignore restrições do sistema | **Prompt Shields** (camada de segurança) |
| Definir papel, tom e limites comportamentais do modelo | **Mensagem de sistema** (camada 3) |
| Fundamentar respostas em dados confiáveis | **RAG / Grounding** (camada 3) |
| Restringir o tipo de entrada que o usuário pode enviar | **UX design** (camada 4) |
| Informar o usuário sobre limitações da IA | **Transparência** (camada 4) |
| Lançar a solução com segurança | **Entrega em fases** (Gerenciar) |
| Reagir a um incidente em produção | **Plano de resposta a incidentes** (Gerenciar) |

---

## As 4 fases em resumo

| Fase | O que faz | Entregável |
|---|---|---|
| **1. Mapear** | Identifica, prioriza, testa (red team) e documenta danos | Lista de danos priorizados |
| **2. Medir** | Prepara prompts adversários, coleta saídas, avalia e categoriza | Métricas de baseline |
| **3. Atenuar** | Aplica mitigações em 4 camadas | Configuração de filtros, prompts e UX |
| **4. Gerenciar** | Revisão pré-lançamento, entrega em fases, monitoramento | Plano operacional |

---

## As 4 camadas de mitigação

| Camada | O que faz | Exemplos |
|---|---|---|
| **1. Modelo** | Escolha do modelo e ajuste fino | Modelo menor para tarefa simples, fine-tuning |
| **2. Sistema de segurança** | Filtros de conteúdo e proteções de prompt | Content filters (4 categorias), Prompt Shields |
| **3. Mensagem do sistema + Grounding** | Instruções e dados confiáveis | System prompt com restrições, RAG |
| **4. Experiência do usuário** | Interface e comunicação | UI restritiva, validação, transparência |

---

## Objetivos de aprendizagem cobrados

- [x] Descrever o processo geral para desenvolvimento responsável de IA
- [x] Identificar e priorizar possíveis danos relevantes para uma solução de IA generativa
- [x] Medir a presença de danos em uma solução de IA generativa
- [x] Reduzir os danos em uma solução de IA generativa
- [x] Preparar para implantar e operar uma solução de IA generativa de forma responsável

---

## Pré-requisitos assumidos pelo módulo

- Familiaridade com o Microsoft Foundry

---

## Prática recomendada

- [Exercício: Aplicar guardrails para evitar a saída de conteúdo prejudicial](https://learn.microsoft.com/pt-br/training/modules/responsible-ai-studio/7-exercise-content-filters)

---

## Aprofundar na documentação

- [Módulo completo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/responsible-ai-studio/)
- Módulo anterior: [[00 - Índice do Módulo 05]]
- Próximo módulo: [[00 - Índice do Módulo 07]]
