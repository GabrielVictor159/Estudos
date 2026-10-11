---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - agentes
  - ferramentas-personalizadas
  - openapi
  - azure-functions
  - function-calling
modulo: 08
titulo: Integrar ferramentas personalizadas ao seu agente
nivel: intermediário
---

# Integrar Ferramentas Personalizadas ao seu Agente

Nota de entrada do módulo. As ferramentas internas nativas (como Interpretador de Código, Pesquisa de Arquivo e Bing Search) cobrem muitos cenários comuns, mas não atendem a todas as demandas de negócios. Aqui aprendemos como **estender os recursos do agente de IA** integrando ferramentas proprietárias e externas: **Chamadas de Função locais (*Function Calling*)**, **Azure Functions (serverless)**, **especificações OpenAPI 3.0** e **Azure Logic Apps**.

![[m08-opcoes-ferramentas-personalizadas.jpg]]

> **Conceito central:** O desenvolvedor **não escreve código imperativo para acionar a ferramenta**. Em vez disso, declara suas assinaturas, esquemas de parâmetros e descrições semânticas. O modelo de linguagem decide dinamicamente *quando* e *como* acioná-la com base na intenção do usuário, recebendo a resposta técnica e sintetizando o resultado em linguagem natural.

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Por Que Usar Ferramentas Personalizadas]] | Motivações centrais, ciclo de decisão do agente e 5 cenários práticos de negócio |
| 2 | [[02 - Opções de Implementação de Ferramentas Personalizadas]] | Comparativo das 4 abordagens: Function Calling, Azure Functions, OpenAPI Tools e Logic Apps |
| 3 | [[03 - Integração Prática no SDK (Código e OpenAPI)]] | Implementação com Python SDK: FunctionTool, AzureFunctionTool, especificação OpenAPI 3.0 e modelos de autenticação |
| 4 | [[04 - Questões de Exame e Pontos de Atenção]] | Questões oficiais de avaliação comentadas, justificativas técnicas e armadilhas frequentes de prova |

---

## Mapa mental do módulo em uma frase

> O Microsoft Foundry Agent Service permite estender o agente além das ferramentas nativas conectando lógica local via **FunctionTool**, computação em nuvem orientada a eventos via **AzureFunctionTool** e serviços web RESTful via **OpenApiTool** (com autenticação anônima, chave de API ou identidade gerenciada), com execução orquestrada autonomamente pelo modelo.

---

## Tabela de decisão rápida: qual ferramenta personalizada escolher?

| Se o cenário pede… | A ferramenta personalizada ideal é |
|---|---|
| Chamar uma função Python ou lógica residente no próprio código/processo da aplicação cliente | **Chamada de Função (*FunctionTool*)** |
| Processamento em segundo plano assíncrono desacoplado via filas (*Storage Queues*) | **Azure Functions (*AzureFunctionTool*)** |
| Conectar a uma API REST existente que já possui contrato/documentação OpenAPI 3.0 | **Ferramenta OpenAPI (*OpenApiTool*)** |
| Integrar o agente a dezenas de sistemas SaaS corporativos (Salesforce, SAP, M365) sem código | **Azure Logic Apps** |
| Executar cálculos matemáticos ou plotar gráficos sem criar infraestrutura de API | Ferramenta nativa **Code Interpreter** (não personalizada) |
| Acessar uma API pública de clima sem credenciais | **OpenApiTool** com autenticação **Anônima** |
| Acessar um microsserviço corporativo no Azure de forma segura sem chaves | **OpenApiTool** com **Identidade Gerenciada (Entra ID)** |
| O desenvolvedor precisa programar `if/else` para chamar a ferramenta? | **Não!** O agente avalia a intenção e decide **autonomamente** quando acionar |

---

## Comparativo das 4 Opções de Ferramentas Personalizadas

| Opção | Onde Executa | Padrão / Protocolo | Autenticação Típica | Caso de Uso Ideal |
| :--- | :--- | :--- | :--- | :--- |
| **Chamada de Função** (*Function Calling*) | Localmente no processo da aplicação cliente | Schemas JSON de parâmetros (Python/.NET) | Gerenciada pela aplicação hospedeira | Cálculos em memória, acesso ao banco local, manipulação de estado em runtime. |
| **Azure Functions** | Nuvem serverless no Azure Functions Runtime | Gatilhos e associações (*bindings*) orientados a eventos | Identidade Gerenciada / Chave de Função | Tarefas desacopladas, processamento em filas de mensagens (*Storage Queue*), escalabilidade elástica. |
| **Ferramentas OpenAPI** (*OpenApiTool*) | Servidores web da API REST de destino | Especificação OpenAPI 3.0 / 3.1 | Anônima, API Key ou Identidade Gerenciada | Consumo direto de serviços web existentes sem reescrever código cliente. |
| **Azure Logic Apps** | Mecanismo de fluxos de trabalho gerenciado no Azure | Conectores visuais corporativos | Conexões de API corporativas gerenciadas | Orquestrações empresariais de vários passos e integração *low-code* com sistemas corporativos. |

---

## Objetivos de aprendizagem cobertos

- [x] Descrever os benefícios de usar ferramentas personalizadas com agentes de IA
- [x] Explorar e comparar as opções de implementação de ferramentas personalizadas
- [x] Criar agentes que integram ferramentas locais, Azure Functions e OpenAPI 3.0 usando o SDK do Foundry

---

## Pré-requisitos assumidos pelo módulo

- Familiaridade com o Azure e o portal do Microsoft Foundry
- Compreensão dos conceitos de IA generativa e chamadas de modelo
- Experiência prévia com o Microsoft Foundry Agent Service (Módulo 07)

---

## Prática recomendada

- [Exercício oficial: Criar um agente com ferramentas personalizadas](https://learn.microsoft.com/pt-br/training/modules/build-agent-with-custom-tools/5-exercise)

O que vale exercitar para fixar:
1. Criar uma função Python local com schema JSON rigoroso (`strict=True`) e acoplá-la a um agente com `FunctionTool`.
2. Criar uma especificação OpenAPI 3.0 simples para uma API de consulta (como clima ou CEP).
3. Registrar o arquivo JSON da OpenAPI usando `OpenApiTool` e testar a invocação automática pelo agente.
4. Experimentar a transição entre autenticação anônima e chave de API em chamadas OpenAPI.

---

## Aprofundar na documentação

- [Módulo oficial no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/build-agent-with-custom-tools/)
- Módulo anterior: [[AI-901/07 - Introdução à IA no Azure/00 - Índice do Módulo 07]]
- Próximo módulo: [[00 - Índice do Módulo 09]]
- Próxima página: [[01 - Por Que Usar Ferramentas Personalizadas]]
