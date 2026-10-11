---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - responsible-ai
  - operações
  - deployment
modulo: 06
---

# Gerenciar e Operar com Responsabilidade

O quarto e último estágio é **gerenciar** a solução — preparar para o lançamento e manter a operação responsável em produção. Não basta desenvolver com cuidado; é preciso **lançar com segurança e monitorar continuamente**.

---

## Revisão de pré-lançamento

Antes de liberar a solução, faça uma revisão formal cobrindo **4 áreas**:

| Área | O que verificar |
|---|---|
| **Jurídico** (*Legal*) | Conformidade com leis e regulamentações aplicáveis |
| **Privacidade** (*Privacy*) | Tratamento adequado de dados pessoais e políticas de privacidade |
| **Segurança** (*Security*) | Proteções contra ataques, acesso não autorizado e vazamento de dados |
| **Acessibilidade** (*Accessibility*) | A solução é utilizável por pessoas com deficiência |

---

## Plano de implementação e operação

| Componente | O que é | Para que serve |
|---|---|---|
| **Entrega em fases** (*Phased rollout*) | Liberação para grupo restrito antes do público geral | Validar em produção real com escala controlada |
| **Plano de resposta a incidentes** | Processos documentados com tempos estimados de resposta | Reagir rapidamente a falhas e comportamentos imprevistos |
| **Plano de reversão** (*Rollback*) | Procedimentos para retornar ao estado anterior | Restaurar estabilidade imediatamente em caso de incidente |
| **Bloqueio em tempo real** | Capacidade de barrar respostas prejudiciais em produção | Reagir a danos descobertos após o lançamento |
| **Controle de abuso** | Bloqueio de usuários, clientes ou IPs abusivos | Impedir uso indevido recorrente |
| **Feedback do usuário** | Mecanismos para sinalizar conteúdo problemático | Coletar evidências de danos não previstos |
| **Telemetria de monitoramento** | Rastreamento de métricas operacionais e satisfação | Acompanhar performance e detectar anomalias |

---

## Checklist de operação responsável

- ☐ Revisão **jurídica** concluída
- ☐ Revisão de **privacidade** concluída
- ☐ Revisão de **segurança** concluída
- ☐ Revisão de **acessibilidade** concluída
- ☐ **Plano de entrega em fases** definido
- ☐ **Plano de resposta a incidentes** documentado
- ☐ **Plano de rollback** testado
- ☐ **Bloqueio em tempo real** implementado
- ☐ **Mecanismo de feedback** disponível para usuários
- ☐ **Telemetria** configurada (respeitando privacidade)
- ☐ **Controle de abuso** ativo

---

## Cola para a prova: cenário → conceito

| Cenário descrito na questão | Resposta |
|---|---|
| "Lançar primeiro para um grupo pequeno antes de expandir" | **Entrega em fases** (*phased rollout*) |
| "Como reagir se a IA gerar conteúdo prejudicial em produção" | **Plano de resposta a incidentes** |
| "Voltar a solução ao estado anterior rapidamente" | **Plano de reversão** (*rollback*) |
| "Bloquear um usuário que está abusando do sistema" | **Controle de abuso** |
| "Permitir que usuários sinalizem respostas ruins" | **Mecanismo de feedback** |
| "Verificar conformidade legal antes do lançamento" | **Revisão de pré-lançamento** (jurídico) |
| "Coletar métricas de uso respeitando privacidade" | **Telemetria de monitoramento** |
| "Testadores tentam quebrar o sistema com prompts maliciosos" | **Red teaming** (fase de Mapear, não Gerenciar) |
| "Qual das 4 fases vem por último?" | **Gerenciar** |
| "Qual framework é referenciado pelo processo?" | **NIST AI Risk Management Framework** |

---

## Pontos que costumam confundir

**Gerenciar é a última fase, mas não termina.** O processo é **iterativo** — monitoramento contínuo pode revelar novos danos que reiniciam o ciclo (mapear → medir → atenuar → gerenciar).

**Entrega em fases ≠ teste beta.** É uma estratégia de lançamento controlado em produção, com usuários reais, mas em escala restrita.

**Rollback é diferente de bloqueio em tempo real.** Rollback reverte toda a solução; bloqueio em tempo real filtra respostas específicas sem reverter.

**Telemetria requer conformidade com privacidade.** Coletar dados de uso é necessário, mas deve respeitar legislações de privacidade e políticas corporativas.

**As 4 revisões pré-lançamento são mandatórias.** Jurídico, privacidade, segurança E acessibilidade — todas devem ser concluídas.

---

## Aprofundar na documentação

- [Gerenciar uma solução de IA responsável — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/responsible-ai-studio/6-operate-responsibly)
- Voltar ao [[AI-103/06 - IA Generativa Responsável/00 - Índice do Módulo 06]]
- Página anterior: [[03 - Atenuar Danos (Camadas de Mitigação)]]
