---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - agentes
  - vs-code
  - agent-service
  - mcp
modulo: 07
titulo: Desenvolver agentes de IA com o Microsoft Foundry e o Visual Studio Code
nivel: intermediário
---

# Desenvolver Agentes de IA com o Microsoft Foundry e o VS Code

Nota de entrada do módulo. Aqui avançamos da simples chamada a modelos e ferramentas isoladas para a **construção de Agentes Autônomos de IA** com o **Microsoft Foundry Agent Service**. Agentes entendem contexto, tomam decisões e acionam ferramentas automaticamente em direção a metas de negócio. O desenvolvimento pode ocorrer visualmente no Portal ou em código no **Visual Studio Code** com arquivos declarativos YAML e controle de versão Git.

![[m07-arquitetura-agente-service.jpg]]

> **Conceito central:** O Microsoft Foundry Agent Service é uma plataforma gerenciada que elimina a complexidade de criar agentes: automatiza o ciclo de chamada e execução de ferramentas (*automatic tool calling*), gerencia o estado da conversação via **API de Respostas**, fornece catálogo extensivo de integrações (Code Interpreter, File Search, Bing, OpenAPI, servidores MCP) e viabiliza publicação corporativa com controle de acesso baseado em função (RBAC).

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Conceitos de Agentes e Foundry Agent Service]] | O que é um agente autônomo, tipos de agentes, arquitetura gerenciada e matriz de riscos de segurança |
| 2 | [[02 - Abordagens de Desenvolvimento (Portal vs VS Code)]] | Comparativo Portal vs Extensão do VS Code, seções da extensão, recursos Azure e fluxo em 8 etapas |
| 3 | [[03 - Configuração e Estrutura YAML de Agentes]] | Propriedades essenciais, hiperparâmetros (temperatura/top_p), schema YAML completo e boas práticas |
| 4 | [[04 - Estender Agentes com Ferramentas e Servidores MCP]] | Ciclo de tool calling automático, ferramentas nativas, ferramentas OpenAPI e Servidores MCP |
| 5 | [[05 - Testar, Implantar, Publicar e Integrar Agentes]] | Playgrounds, diferença crítica entre Deploy vs Publish, Endpoint Responses API, armadilha de RBAC e questões de prova |

---

## Mapa mental do módulo em uma frase

> Um agente no Microsoft Foundry reúne **Modelo + Instruções + Hiperparâmetros + Ferramentas** em uma configuração declarativa (YAML no VS Code ou formulário no Portal); em runtime, o Foundry Agent Service orquestra a chamada automática de ferramentas e o estado da conversa, permitindo testes em playground local/remoto e publicação como um **Aplicativo de Agente** seguro via Microsoft Entra ID.

---

## Tabela de decisão rápida

| Se o cenário pede… | A solução / abordagem é |
|---|---|
| Prototipar um agente rapidamente sem instalar ferramentas locais | **Portal do Microsoft Foundry** (interface web) |
| Versionar configurações de agentes com Git e integrá-las ao CI/CD | **Extensão do Microsoft Foundry no VS Code** (arquivos YAML) |
| Agente único definido apenas por prompt, modelo e ferramentas | **Agente Declarativo baseado em Prompt** (*Prompt-based*) |
| Múltiplos agentes especializados colaborando em um fluxo complexo | **Agente de Fluxo de Trabalho** (*Workflow Agent* via YAML) |
| Controle total sobre o runtime e código personalizado conteinerizado | **Agente Hospedado** (*Hosted Agent*) |
| Executar cálculos matemáticos exatos ou gerar gráficos dinâmicos | Ferramenta **Interpretador de Código** (*Code Interpreter*) |
| Pesquisa semântica em documentos internos (PDF/Word) com RAG nativo | Ferramenta **Pesquisa de Arquivo** (*File Search* / Vector Store) |
| Obter notícias de última hora e dados externos atualizados | Ferramenta **Pesquisa na Web do Bing** (*Bing Grounding*) |
| Conectar o agente a uma API REST existente da organização | Ferramenta **OpenAPI** (especificação OpenAPI 3.0) |
| Conectar ferramentas e fontes de contexto padronizadas da indústria | **Servidores MCP** (*Model Context Protocol*) |
| Salvar agente dentro do workspace para testes na equipe | **Implantar no Projeto** (*Deploy*) |
| Expor o agente para aplicações clientes (web/mobile) com URL estável | **Publicar em Ponto de Extremidade** (*Publish* → *Agent Application*) |
| Chave de autenticação em endpoint de Aplicativo de Agente | **Não suportada!** Usar exclusivamente tokens **Bearer do Microsoft Entra ID** |
| Erro `403 Forbidden` ao acessar AI Search ou Blob após publicar agente | **Reatribuir RBAC** à nova Identidade Gerenciada do Aplicativo de Agente |

---

## Comparativo: Portal do Foundry vs. Visual Studio Code

| Critério | Portal do Microsoft Foundry | Extensão Microsoft Foundry no VS Code |
| :--- | :--- | :--- |
| **Público principal** | Product managers, analistas, prototipagem rápida | Desenvolvedores de software, engenheiros de IA e DevOps |
| **Formato de trabalho** | Formulários visuais na web | Arquivos declarativos YAML + Designer visual |
| **Versionamento** | Histórico básico de versões gerenciado | Controle granular com Git / GitHub no repositório |
| **Ambiente de teste** | Playground remoto online | Playground remoto + Playground local (simulador offline) |
| **Produtividade** | Interface guiada sem dependências locais | Edição simultânea lado a lado (`split screen`), CI/CD |

---

## Objetivos de aprendizagem cobertos

- [x] Descrever a finalidade, arquitetura e recursos dos agentes de IA
- [x] Explicar os principais recursos do Serviço do Microsoft Foundry Agent
- [x] Configurar e ajustar a extensão Microsoft Foundry no Visual Studio Code
- [x] Criar e configurar agentes de IA usando abordagens visuais e declarativas (YAML)
- [x] Estender os recursos do agente com ferramentas internas, OpenAPI e servidores MCP
- [x] Testar agentes em ambientes integrados (happy path, edge cases, boundary testing)
- [x] Implantar, publicar em endpoints dedicados e integrar agentes com segurança RBAC

---

## Pré-requisitos assumidos pelo módulo

- Familiaridade com o Azure e o portal do Microsoft Foundry
- Compreensão dos conceitos de IA generativa e parâmetros de modelo
- Familiaridade básica com o Visual Studio Code

---

## Prática recomendada

- [Exercício oficial: Criar e implantar um agente de IA com Foundry e VS Code](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/9-exercise)

O que vale exercitar para fixar:
1. Instalar a extensão Microsoft Foundry no VS Code e autenticar na conta Azure.
2. Criar um agente declarativo no VS Code, inspecionar o arquivo `agent.yaml` gerado e ajustar `instructions` e `temperature`.
3. Adicionar as ferramentas `code_interpreter` e `bing_grounding` via YAML e testar no playground integrado.
4. Experimentar a publicação em endpoint dedicado e inspecionar a URL da API de Respostas.
5. Obter um token de acesso via `az account get-access-token --resource https://ai.azure.com` e efetuar uma chamada cURL.

---

## Aprofundar na documentação

- [Módulo oficial no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/)
- Módulo anterior: [[00 - Índice do Módulo 06]]
- Próximo módulo: [[00 - Índice do Módulo 08]]
- Próxima página: [[01 - Conceitos de Agentes e Foundry Agent Service]]
