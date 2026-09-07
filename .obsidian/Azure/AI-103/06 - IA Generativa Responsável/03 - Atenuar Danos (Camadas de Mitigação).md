---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - responsible-ai
  - content-filters
  - prompt-shields
  - mitigação
modulo: 06
---

# Atenuar Danos (Camadas de Mitigação)

O terceiro estágio é **atenuar** (mitigar) os danos identificados e medidos. A mitigação adota uma abordagem de **defesa em profundidade** — múltiplas camadas, de dentro para fora, cada uma reforçando as anteriores.

![[m06-camadas-mitigacao.jpg]]

---

## As 4 camadas de mitigação

![[mitigate-harms.png]]

---

### Camada 1: Modelo

A camada mais interna — o modelo generativo no núcleo da solução.

| Mitigação | Descrição |
|---|---|
| **Seleção do modelo adequado** | Usar modelos menores e mais simples para tarefas focadas (ex.: classificação de texto) reduz riscos de conteúdo indesejado |
| **Fine-tuning com dados proprietários** | Ajustar o modelo com dados rotulados para respostas mais controladas e contextualizadas |

> Nem todo caso precisa de GPT-4. Um modelo menor, treinado para uma tarefa específica, pode ser mais seguro.

---

### Camada 2: Sistema de segurança

Configurações e guardrails a nível de plataforma (Azure AI Content Safety).

#### Filtros de conteúdo

| Categoria de dano | O que filtra |
|---|---|
| **Ódio e justiça** (*Hate and fairness*) | Conteúdo discriminatório, preconceituoso ou injusto |
| **Sexual** | Conteúdo sexualmente explícito ou sugestivo |
| **Violência** (*Violence*) | Conteúdo que descreve ou incentiva violência |
| **Automutilação** (*Self-harm*) | Conteúdo relacionado a autolesão ou suicídio |
| **Aderência à tarefa** (*Task adherence*) | Desvio do propósito definido para a solução |

#### 4 níveis de gravidade

| Nível | Ação |
|---|---|
| **Seguro** (*Safe*) | Permitido |
| **Baixo** (*Low*) | Avaliação contextual |
| **Médio** (*Medium*) | Bloqueio recomendado na maioria dos cenários |
| **Alto** (*High*) | Bloqueado por padrão |

#### Proteções adicionais

| Proteção | O que faz |
|---|---|
| **Prompt Shields** | Detecta e bloqueia tentativas de **jailbreak** e **injeção de prompt** |
| **Detecção de abuso** | Identifica padrões de uso malicioso (evasão do system prompt) |

---

### Camada 3: Mensagem do sistema + Grounding

Foco na engenharia de prompts e nos dados enviados ao modelo.

| Mitigação | Descrição |
|---|---|
| **Mensagem de sistema (system prompt / metaprompt)** | Delimita papel, tom e restrições comportamentais |
| **Engenharia de prompts com dados de aterramento** | Injeta dados factuais confiáveis no contexto |
| **RAG com fontes corporativas** | Geração Aumentada de Recuperação a partir de dados internos confiáveis |

> É a mesma mensagem de sistema e RAG que você aprendeu no módulo anterior (otimização). Aqui o foco é usá-los como **camada de segurança**, não apenas de qualidade.

---

### Camada 4: Experiência do usuário (UX)

A camada mais externa — o software e a interface por onde os usuários interagem.

| Mitigação | Descrição |
|---|---|
| **Design restritivo da UI** | Limitar tipos de entrada ou assuntos que o usuário pode enviar |
| **Validação de entrada e saída** | Verificar conteúdo antes de enviar ao modelo e antes de exibir |
| **Transparência** | Informar sobre recursos, limitações, modelos utilizados e riscos residuais |

> **Transparência é obrigatória.** Mesmo com todas as camadas anteriores, danos residuais podem existir. O usuário precisa saber.

---

## Tabela de decisão: preciso mitigar… → qual camada?

| Cenário | Camada de atuação |
|---|---|
| O modelo gera conteúdo violento | **Camada 2** — filtro de conteúdo (violência) |
| Usuário tenta jailbreak do modelo | **Camada 2** — Prompt Shields |
| O modelo responde fora do escopo | **Camada 3** — mensagem de sistema com limites |
| O modelo inventa dados | **Camada 3** — RAG com dados confiáveis |
| Quero usar modelo menor para tarefa simples | **Camada 1** — seleção de modelo |
| Quero impedir que o usuário envie certos tipos de entrada | **Camada 4** — UI restritiva |
| Quero informar o usuário sobre limitações | **Camada 4** — transparência |

---

## Pontos que costumam confundir

**São camadas complementares, não alternativas.** Todas as 4 devem ser usadas em conjunto — defesa em profundidade.

**Filtros de conteúdo são da camada 2 (plataforma), não do modelo.** O modelo não faz a filtragem — o Azure AI Content Safety faz, antes e depois do modelo processar.

**Prompt Shields ≠ filtros de conteúdo.** Filtros avaliam o **conteúdo** da entrada/saída. Prompt Shields detectam **tentativas de manipulação** do sistema (jailbreak, injeção de prompt).

**5 categorias, 4 níveis.** As categorias de dano são 5 (ódio, sexual, violência, automutilação, aderência à tarefa). Os níveis de gravidade são 4 (seguro, baixo, médio, alto).

**Mensagem de sistema é segurança E qualidade.** No módulo anterior era para otimizar respostas; aqui é para restringir comportamento — mesmo conceito, perspectiva diferente.

**Transparência não é opcional.** Mesmo com todas as mitigações, a comunicação ao usuário sobre limitações é uma exigência.

---

## Aprofundar na documentação

- [Atenuar possíveis danos — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/responsible-ai-studio/5-mitigate-harms)
- Próxima página: [[04 - Gerenciar e Operar com Responsabilidade]]
- Página anterior: [[02 - Medir Danos]]
