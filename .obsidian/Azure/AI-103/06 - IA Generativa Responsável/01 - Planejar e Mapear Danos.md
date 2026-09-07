---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - responsible-ai
  - red-teaming
modulo: 06
---

# Planejar e Mapear Danos

O primeiro e mais fundamental estágio do processo de IA responsável é **mapear os possíveis danos** que sua solução de IA generativa pode causar. Sem essa etapa, todas as outras (medir, atenuar, gerenciar) ficam sem direção.

---

## O processo de IA responsável — visão geral

As diretrizes da Microsoft definem um processo prático em **4 estágios** (alinhados ao NIST AI Risk Management Framework):

| Estágio | Nome | O que faz |
|---|---|---|
| 1 | **Mapear** (*Map*) | Identificar e priorizar danos potenciais |
| 2 | **Medir** (*Measure*) | Quantificar a presença desses danos nas saídas |
| 3 | **Atenuar** (*Mitigate*) | Mitigar em múltiplas camadas para minimizar impacto |
| 4 | **Gerenciar** (*Manage*) | Implantar e operar com plano de prontidão operacional |

> **Nota:** esses estágios correspondem de perto às funções do **NIST AI Risk Management Framework**.

---

## As 4 etapas do mapeamento

![[identify-harms.png]]

### 1. Identificar possíveis danos

Os danos dependem de:
- **Serviços e modelos** utilizados
- **Dados de fine-tuning** aplicados
- **Dados de grounding** (aterramento)

| Tipo de dano | Exemplo |
|---|---|
| **Conteúdo ofensivo/discriminatório** | Gerar texto racista, sexista ou preconceituoso |
| **Imprecisão factual (alucinação)** | Inventar dados, nomes ou fatos inexistentes |
| **Conteúdo ilegal/antiético** | Fornecer instruções para atividades ilegais |

**Documentação de apoio para identificação:**
- Nota de transparência do Serviço Azure OpenAI
- System Card da OpenAI para GPT-4
- Microsoft RAI Impact Assessment (Guia e Modelo)

### 2. Priorizar os danos

Dois critérios para priorização:

| Critério | Significado |
|---|---|
| **Probabilidade de ocorrência** | Quão provável é o dano acontecer |
| **Nível de impacto** | Quão grave é o dano se ocorrer |

> **Exemplo:** em um copilot de cozinha, sugerir receita de veneno tem impacto **extremo** mas probabilidade **baixa**; tempos de cozimento imprecisos têm impacto **menor** mas frequência **muito maior**.

A priorização é **subjetiva** — depende do uso pretendido e do potencial de uso indevido.

### 3. Testar e verificar (Red Teaming)

**Red teaming** é uma abordagem de teste onde testadores **deliberadamente investigam** a solução em busca de pontos fracos e tentam induzir saídas prejudiciais.

| Aspecto | Detalhe |
|---|---|
| **Origem** | Cibersegurança — estendida para IA generativa |
| **Objetivo** | Encontrar vulnerabilidades que produzem conteúdo prejudicial |
| **Como funciona** | Testadores tentam prompts adversários (jailbreaks, manipulação) |
| **Complementa** | Práticas de segurança cibernética existentes |

### 4. Documentar e compartilhar

- **Documentar formalmente** as evidências de danos encontrados
- **Comunicar** aos stakeholders relevantes
- **Manter a lista dinâmica** — novos danos podem surgir com o uso

---

## Pontos que costumam confundir

**Mapear ≠ corrigir.** Na fase de mapeamento você **identifica e documenta** — a correção vem nas fases seguintes (medir + atenuar).

**Red teaming não é teste funcional.** É teste **adversário** — o objetivo é quebrar o sistema, não validar que funciona. Testadores agem como atacantes.

**Probabilidade × impacto.** Nem todo dano grave é provável e nem todo dano frequente é grave. A priorização combina os dois eixos.

**A lista de danos é viva.** Novos danos podem surgir com mudanças no modelo, nos dados ou no comportamento dos usuários. Revisão contínua é necessária.

**NIST AI RMF.** O material cita explicitamente que os 4 estágios correspondem ao NIST AI Risk Management Framework — pode aparecer na prova.

---

## Aprofundar na documentação

- [Planejar uma solução de IA responsável — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/responsible-ai-studio/2-plan-responsible-ai)
- [Mapear possíveis danos — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/responsible-ai-studio/3-identify-harms)
- Próxima página: [[02 - Medir Danos]]
