---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - questoes-exame
  - simulado
  - revisao
  - armadilhas
modulo: 08
---

# Questões de Exame e Pontos de Atenção

Esta página consolida as questões oficiais de avaliação do módulo no Microsoft Learn, acompanhadas de justificativas técnicas aprofundadas e a análise das principais armadilhas conceituais cobradas no exame **AI-102 / AI-103**.

---

## Questões Oficiais da Avaliação (Microsoft Learn)

### Questão 1
**O que são ferramentas personalizadas e como elas podem ajudá-lo a desenvolver agentes eficazes com o Microsoft Foundry Agent Service?**
- [x] **A) Funções que podem ser chamadas que um agente pode usar para estender suas capacidades.** *(Correta)*
- [ ] B) Extensões para Visual Studio Code que facilitam a criação e implantação de agentes.
- [ ] C) Modelos ajustados (*fine-tuned models*) que o agente pode usar para gerar saídas customizadas.

> **Justificativa Técnica:** No ecossistema de agentes de IA, ferramentas personalizadas (*custom tools*) são interfaces computacionais executáveis (funções locais, APIs REST via OpenAPI, funções serverless) que o agente pode decidir acionar autonomamente em tempo de execução. Isso permite buscar dados dinâmicos e realizar ações no mundo real. Extensões do VS Code são ferramentas para o desenvolvedor humano, e modelos ajustados referem-se à customização dos pesos da rede neural, não à execução de código externo.

---

### Questão 2
**Você precisa integrar a funcionalidade de um serviço Web baseado em OpenAPI 3.0 em uma solução de agente. O que você deve fazer?**
- [ ] A) Adicionar o esquema JSON do serviço Web às instruções do agente (*system prompt*).
- [ ] B) Reescrever o serviço Web como uma função Python e codificá-lo em seu aplicativo de agente.
- [x] **C) Adicionar o serviço Web como uma ferramenta de especificação OpenAPI à definição do agente.** *(Correta)*

> **Justificativa Técnica:** O Microsoft Foundry Agent Service possui suporte de primeira classe para especificações OpenAPI 3.0 através do `OpenApiTool`. Ao registrar o arquivo de especificação formal na propriedade `tools` da definição do agente (`PromptAgentDefinition`), o serviço cuida nativamente do mapeamento de endpoints, extração de parâmetros e despacho das requisições HTTP REST. Colocar esquemas JSON nas instruções consome tokens de contexto inutilmente sem permitir a chamada HTTP real; e reescrever a API em Python duplica esforço e descarta o contrato OpenAPI já existente.

---

### Questão 3
**O código do aplicativo do seu agente inclui uma função local que você deseja que o agente chame. Que tipo de ferramenta você deve adicionar à definição do agente?**
- [x] **A) Chamada de função (*Function calling / FunctionTool*)** *(Correta)*
- [ ] B) Intérprete de código (*Code Interpreter*)
- [ ] C) Azure Functions (*AzureFunctionTool*)

> **Justificativa Técnica:** Quando a lógica a ser executada reside diretamente no próprio processo/código-fonte da aplicação hospedeira do cliente, a ferramenta correta é a **Chamada de função** (`FunctionTool`). O modelo gera os parâmetros JSON e a aplicação cliente executa a função localmente. O *Code Interpreter* executa código Python genérico em uma sandbox gerenciada na nuvem para cálculos matemáticos e gráficos, enquanto o *Azure Functions* se destina a funções serverless hospedadas e executadas na nuvem do Azure.

---

## As Quatro Armadilhas Mais Comuns em Prova

```
                                  MAPA DE ARMADILHAS DE EXAME
                                               │
      ┌────────────────────────┬───────────────┴───────────────┬────────────────────────┐
      ▼                        ▼                               ▼                        ▼
  ARMADILHA 1              ARMADILHA 2                     ARMADILHA 3              ARMADILHA 4
"Reescrever API          "Colocar Schemas                "Code Interpreter        "Acesso Irrestrito
 em Python"               JSON no Prompt"                 para Rodar Função"       para Melhorar Agente"
      │                        │                               │                        │
      ▼                        ▼                               ▼                        ▼
   ERRADO!                  ERRADO!                         ERRADO!                  ERRADO!
Use OpenApiTool          Registre no array               Use FunctionTool         Sempre Menor Privilégio
diretamente.             tools=[] do agente.             ou Azure Functions.      (Least Privilege/RBAC).
```

### 1. "Reescrever a API em Python" vs. "Adicionar OpenAPI Tool"
- **Pegadinha de Prova:** A questão descreve um sistema legado com dezenas de endpoints documentados em Swagger/OpenAPI 3.0 e pergunta qual o método mais eficiente para integrar ao agente.
- **Resposta Correta:** **Anexar o arquivo de especificação OpenAPI como uma `OpenApiTool`**. Qualquer opção que sugira reescrever endpoints, criar clientes HTTP manuais ou criar wrappers intermediários está incorreta.

### 2. "Inserir schemas JSON no System Prompt" vs. "Registrar no array `tools`"
- **Pegadinha de Prova:** A questão sugere colar a especificação OpenAPI ou os schemas de parâmetros dentro do campo `instructions` do agente.
- **Resposta Correta:** **Registrar as ferramentas na lista `tools`**. Inserir no prompt apenas desperdiça a janela de contexto de tokens e não habilita o mecanismo de *automated tool calling* do Foundry.

### 3. "Code Interpreter" vs. "Function Calling" vs. "Azure Functions"
- **Se a tarefa for:** Executar cálculos analíticos, equações ou plotar gráficos sem uma API específica → **Code Interpreter** (ferramenta nativa em sandbox).
- **Se a tarefa for:** Chamar uma função Python escrita no código local do seu bot → **Function Calling** (`FunctionTool`).
- **Se a tarefa for:** Processar tarefas assíncronas serverless via filas de mensageria na nuvem → **Azure Functions** (`AzureFunctionTool`).

### 4. Concessão de Acessos e Segurança
- **Pegadinha de Prova:** Opções que sugerem conceder acesso de Administrador (*Owner*) ou permissões irrestritas a bancos corporativos para evitar erros `403`.
- **Resposta Correta:** **Princípio do Menor Privilégio (*Least Privilege*)**, uso de **Identidades Gerenciadas (*Managed Identity*)** e papéis granulares de RBAC.

---

## Cola de Identificação Rápida para o Exame

| Palavra-chave no Enunciado | Escolha Imediata |
| :--- | :--- |
| *"Contrato OpenAPI 3.0 / 3.1", "Swagger"* | `OpenApiTool` / Ferramenta de especificação OpenAPI |
| *"Função local no código do aplicativo"* | `FunctionTool` / Chamada de função |
| *"Gatilho de fila", "Serverless", "Event-driven"* | `AzureFunctionTool` / Azure Functions |
| *"Conectar ao SAP/Salesforce sem escrever código"* | Azure Logic Apps |
| *"API pública sem autenticação"* | `OpenApiAnonymousAuthDetails` |
| *"API com segredo no cabeçalho"* | `OpenApiApiKeyAuthDetails` |
| *"Segurança corporativa sem senhas"* | `OpenApiManagedIdentityAuthDetails` |
| *"O desenvolvedor precisa programar o despacho da ferramenta?"* | Não, o modelo gerencia a invocação automaticamente |

---

## Aprofundar na Documentação

- [Avaliação do módulo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/build-agent-with-custom-tools/6-knowledge-check)
- [Desenvolver um agente com Microsoft Foundry Agent Service](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agent-azure/)
- Voltar ao [[00 - Índice do Módulo 08]]
- Módulo anterior: [[00 - Índice do Módulo 07]]
