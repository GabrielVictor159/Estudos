---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - arquitetura
  - openapi
  - azure-functions
  - function-calling
  - logic-apps
modulo: 08
---

# Opções de Implementação de Ferramentas Personalizadas

O Microsoft Foundry Agent Service suporta quatro abordagens principais para criar e vincular ferramentas personalizadas ao seu agente. Cada abordagem resolve uma necessidade arquitetural distinta, variando entre execução no processo do cliente, execução serverless em nuvem, integração padronizada com APIs REST e orquestrações corporativas low-code.

![[m08-opcoes-ferramentas-personalizadas.jpg]]

---

## Detalhamento das Quatro Opções

### 1. Chamada de Função Personalizada (*Function Calling*)
- **Conceito:** O desenvolvedor define uma função em seu próprio código (Python, C#, JavaScript) e declara ao agente o nome, a descrição semântica e o esquema JSON estrito dos parâmetros esperados.
- **Onde Executa:** Localmente, no próprio processo e runtime da aplicação cliente hospedeira.
- **Como Funciona:** Quando o modelo decide usar a função, ele gera os argumentos em formato JSON. A aplicação cliente recebe o payload, executa a função localmente e devolve o resultado técnico ao agente.
- **Autenticação:** Gerenciada internamente pelo aplicativo cliente (conexões com bancos locais, variáveis de ambiente).
- **Quando Usar:** Cálculos em memória, acesso a bases de dados locais, validações rápidas de regras de negócio, bibliotecas internas do projeto.

---

### 2. Azure Functions (*AzureFunctionTool*)
- **Conceito:** Lógica de negócio empacotada como código *serverless* (sem servidor) hospedado na infraestrutura do Azure.
- **Onde Executa:** Na nuvem gerenciada do Azure, dentro do Azure Functions Runtime.
- **Modelo Orientado a Eventos:** Utiliza o modelo clássico de **Gatilhos (*Triggers*)** e **Associações (*Bindings*)**:
  - *Gatilho de Fila (*Storage Queue Trigger*):* O agente enfileira uma mensagem com os parâmetros da tarefa em uma fila de entrada (`AzureFunctionStorageQueue`), a Azure Function é ativada de forma assíncrona, processa o cálculo ou integração pesada e deposita o resultado em uma fila de saída.
  - *Gatilho HTTP (*HTTP Trigger*):* Invocação síncrona direta via requisição HTTP.
- **Autenticação:** Suporte a chaves de função (*Function Keys*) ou autenticação sem chave via **Identidades Gerenciadas do Azure (*Managed Identity*)**.
- **Quando Usar:** Tarefas de longa duração, processamento assíncrono em segundo plano, desacoplamento arquitetural, operações que exigem escalabilidade elástica sob demanda.

---

### 3. Ferramentas de Especificação OpenAPI (*OpenApiTool*)
- **Conceito:** Conexão nativa e declarativa com APIs RESTful existentes por meio de um arquivo de contrato formal **OpenAPI 3.0 ou 3.1** (Swagger).
- **Onde Executa:** Diretamente nos servidores que hospedam a API REST de destino (seja ela pública na internet ou um microsserviço privado no Azure).
- **Como Funciona:** O desenvolvedor fornece a especificação JSON/YAML da API ao Foundry Agent Service. O serviço analisa automaticamente as operações (`paths`, métodos `GET`/`POST`, parâmetros de rota, query e corpo) e despacha as chamadas HTTP em tempo real quando o modelo decide acioná-las.
- **Modelos de Autenticação Nativos:**
  1. *Anônima (`OpenApiAnonymousAuthDetails`):* APIs públicas que não requerem credenciais.
  2. *Chave de API (`API Key`):* Envio de chave secreta no cabeçalho HTTP da requisição (gerenciada via Azure Key Vault / configurações seguras).
  3. *Identidade Gerenciada (`Managed Identity`):* Autenticação segura corporativa baseada no Microsoft Entra ID sem gerenciamento de senhas em código.
- **Quando Usar:** Qualquer cenário onde já exista uma API REST documentada com Swagger/OpenAPI. **Evita reescrever clientes HTTP ou código intermediário!**

---

### 4. Aplicativos Lógicos do Azure (*Azure Logic Apps*)
- **Conceito:** Plataforma de integração visual em nuvem (*low-code / no-code*) com centenas de conectores corporativos pré-construídos.
- **Onde Executa:** No mecanismo gerenciado de workflows do Azure Logic Apps.
- **Como Funciona:** O agente dispara o fluxo do Logic App passando dados contextuais, e o workflow orquestra de forma visual a comunicação entre múltiplos sistemas externos.
- **Autenticação:** Gerenciada nativamente pelo Azure através de conexões de API corporativas seguras.
- **Quando Usar:** Integrações corporativas complexas envolvendo sistemas heterogêneos (SAP, Salesforce, Dynamics 365, ServiceNow, SQL Server, Office 365) sem necessidade de desenvolvimento de código do zero.

---

## Matriz Comparativa e Critérios de Escolha

| Requisito do Projeto | Melhor Abordagem | Motivação Técnica |
| :--- | :--- | :--- |
| "A API já existe e tem documentação OpenAPI/Swagger" | **Ferramenta OpenAPI (*OpenApiTool*)** | Conexão imediata declarativa; zero código cliente novo. |
| "A função roda no mesmo executável/código do bot" | **Chamada de Função (*FunctionTool*)** | Baixa latência, execução local no processo da aplicação. |
| "Processamento assíncrono desacoplado via fila" | **Azure Functions (*AzureFunctionTool*)** | Suporte nativo a gatilhos de filas e escalabilidade elástica. |
| "Conectar ao SAP e disparar e-mail no Outlook sem programar" | **Azure Logic Apps** | Conectores visuais nativos gerenciados corporativamente. |
| "Calcular desvio padrão e plotar gráfico dinâmico" | **Code Interpreter (Nativa)** | Sandbox Python isolado pronto na nuvem sem setup. |

---

## Pontos que Costumam Confundir

> [!WARNING]
> **OpenAPI Tool vs. Reescrever em Python:** Em exames da Microsoft, quando o enunciado diz: *"Você possui uma API REST baseada em OpenAPI 3.0 e precisa que o agente a consulte"*, a resposta correta é **adicionar a especificação OpenAPI à definição de ferramentas do agente**, e NUNCA reescrever a API em Python nem colar o JSON schema dentro do texto de instruções do sistema!

> [!NOTE]
> **FunctionTool vs. AzureFunctionTool:** Embora os nomes sejam parecidos, `FunctionTool` é uma função local residente no seu script, enquanto `AzureFunctionTool` é um recurso de computação em nuvem serverless hospedado no Microsoft Azure.

---

## Aprofundar na Documentação

- [Opções para implementar ferramentas personalizadas no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/build-agent-with-custom-tools/3-custom-tool-options)
- Página anterior: [[01 - Por Que Usar Ferramentas Personalizadas]]
- Próxima página: [[03 - Integração Prática no SDK (Código e OpenAPI)]]
