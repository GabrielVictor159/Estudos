---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - yaml
  - configuracao
  - parametros
modulo: 07
---

# Configuração e Estrutura YAML de Agentes

No Visual Studio Code, os agentes declarativos do Microsoft Foundry são expressos por meio de arquivos no formato **YAML**. Essa abordagem *Configuration-as-Code* permite versionar, auditar e automatizar o ciclo de vida dos seus agentes com as mesmas práticas consolidadas de engenharia de software (Git, pull requests e pipelines de CI/CD).

---

## Propriedades Essenciais de Configuração

Cada agente declarativo possui um conjunto de campos fundamentais que determinam sua identidade e capacidade operacional:

| Propriedade | Tipo | Descrição |
| :--- | :--- | :--- |
| `name` | String | Nome amigável do agente, visível em dashboards, listagens e logs. |
| `description` | String | Resumo textual da finalidade e responsabilidade do agente. |
| `id` | String | Identificador exclusivo gerado pela plataforma (`agent-...`), usado para invocações de API. |
| `metadata` | Objeto | Metadados de rastreabilidade (autores, tags, versão da organização). |
| `model.id` | String | Nome exato da implantação do modelo ativa no projeto Foundry (ex.: `gpt-4.1`). |
| `instructions` | String (Multilinha) | O *System Prompt* mestre que dita o papel, limites éticos, regras de recusa e tom de voz. |
| `tools` | Array | Coleção de ferramentas anexadas ao agente para execução de ações. |

---

## Hiperparâmetros de Inferência do Modelo

A seção `model.options` permite calibrar como o modelo gera suas respostas:

```yaml
model:
  id: 'gpt-4.1'
  options:
    temperature: 0.5
    top_p: 1.0
```

### 1. Temperatura (`temperature`)
Controla a aleatoriedade e o dinamismo criativo da geração de tokens:
- **`0.1` a `0.3` (Baixa):** Respostas altamente determinísticas, focadas e factuais. Ideal para análise de dados, operações financeiras, conformidade regulatória e resolução de chamados baseados em manuais técnicos.
- **`0.3` a `0.7` (Média - Padrão Recomendado):** Equilíbrio ótimo entre consistência e fluidez textual. Ideal para assistentes de atendimento ao cliente, agendamentos e automações de tarefas corporativas.
- **`0.7` a `1.0` (Alta):** Maior variabilidade e criatividade. Indicado para ideação, redação de marketing e síntese aberta de cenários.

### 2. Top P (`top_p`)
Controla a amostragem por núcleo (*nucleus sampling*), determinando a massa cumulativa de probabilidade dos tokens considerados:
- O valor padrão é `1.0` (todos os tokens ponderados pela temperatura).
- Valores menores (como `0.9`) limitam o modelo aos 90% tokens mais prováveis, eliminando caudas longas de respostas improváveis.

> [!TIP]
> **Regra de Ouro da Microsoft:** Ajuste a `temperature` **OU** o `top_p`, mas **não altere ambos simultaneamente**, pois eles competem pelo controle da aleatoriedade amostral.

---

## Exemplo Completo de Estrutura YAML

Abaixo está o arquivo de configuração de um agente de agendamento em saúde (`healthcare-assistant.agent.yaml`), com schema oficial referenciado:

```yaml
# yaml-language-server: $schema=https://aka.ms/ai-foundry-vsc/agent/1.0.0
version: 1.0.0
name: healthcare-assistant
description: Assists healthcare staff with patient appointment scheduling and information retrieval
id: 'agent-abc123xyz'
metadata:
  authors:
    - ai-engineer@empresa.com
  tags:
    - healthcare
    - customer-service
    - scheduling
model:
  id: 'gpt-4.1'
  options:
    temperature: 0.5
    top_p: 1.0
instructions: |
  You are a healthcare assistant helping staff schedule patient appointments and retrieve information.

  Your core responsibilities:
  - Help staff find available appointment slots by date and specialty
  - Answer questions about patient scheduling policies and clinic operating hours
  - Provide information about different appointment types (consultation, routine exams, follow-up)
  - Assist with rescheduling and cancellations

  Important security and compliance guidelines:
  - NEVER access, process, or share private patient medical records or diagnoses
  - Always verify appointment details (date, provider name, clinic location) before confirming
  - Be professional, empathetic, and courteous in all interactions
  - If you are unsure about policies or encounter an unhandled request, advise staff to check with clinic management
tools: []
```

---

## Benefícios da Abordagem Declarativa em YAML

1. **Controle de Versão Completo:** Cada alteração em instruções de sistema ou ferramentas é registrada como um commit no Git, facilitando histórico e rollback.
2. **Revisão por Pares (*Code Review*):** Mudanças no comportamento do agente passam por processos formais de aprovação de equipe via *Pull Requests*.
3. **Automação de CI/CD:** Arquivos YAML podem ser validados por linter com base no JSON Schema oficial e promovidos automaticamente entre ambientes (Dev, Staging, Prod).
4. **Reprodutibilidade:** Ambientes inteiros de agentes podem ser clonados e instanciados sem inconsistências causadas por cliques manuais em interfaces web.

---

## Práticas Recomendadas de Configuração

- **Princípio da Responsabilidade Única:** Crie agentes especializados para domínios específicos em vez de um único agente "faz-tudo".
- **Regras de Recusa Explícitas (*Refusal Rules*):** Instrua claramente no prompt o que o agente **não deve** responder e o que fazer quando não tiver certeza.
- **Sintaxe de Bloco Multilinha (`|`):** No YAML, use o caractere pipe (`|`) para instruções multilinha preservando quebras de texto limpas.
- **Validação de Schema:** Mantenha a diretiva de schema `# yaml-language-server: $schema=...` no topo do arquivo para habilitar autocompletion e validação de sintaxe no editor.

---

## Pontos que Costumam Confundir

> [!WARNING]
> **`model.id` Aponta para o Deployment Name:** O valor de `model.id` no YAML não é o nome genérico do modelo na OpenAI (como `gpt-4o`), mas sim o **nome da implantação ativa** provisionada no seu projeto Foundry. Se o deploy se chama `meu-gpt4-prod`, o YAML deve refletir `meu-gpt4-prod`.

> [!NOTE]
> **Geração do `id`:** O identificador `id: 'agent-...'` é atribuído pelo serviço quando o agente é salvo pela primeira vez no Foundry. Ao criar um novo agente manualmente em YAML, esse campo pode iniciar vazio até a primeira sincronização.

---

## Aprofundar na Documentação

- [Configurar e gerenciar agentes no Visual Studio Code](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/6-configure-manage-agents)
- Página anterior: [[02 - Abordagens de Desenvolvimento (Portal vs VS Code)]]
- Próxima página: [[04 - Estender Agentes com Ferramentas e Servidores MCP]]
