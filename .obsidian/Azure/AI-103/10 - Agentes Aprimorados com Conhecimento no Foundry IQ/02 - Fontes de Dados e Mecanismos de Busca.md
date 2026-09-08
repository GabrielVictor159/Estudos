---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - foundry-iq
  - fontes-de-dados
  - sharepoint
  - onelake
  - scoring-profiles
modulo: 10
---

# Fontes de Dados e Mecanismos de Busca

O Foundry IQ permite que uma única **Base de Conhecimento** ingira e correlacione dados de múltiplos serviços corporativos do ecossistema Microsoft e fontes públicas da web.

---

## Fontes de Dados Suportadas

| Fonte de Dados | Modo de Operação | Casos de Uso Recomendados | Características Principais |
| :--- | :--- | :--- | :--- |
| **Índice do Azure AI Search** | Consulta direta em índice preexistente | Organizações com índices legados ou enriquecimentos prévios | Suporte a *Semantic Ranking*, navegação facetada e suporte avançado a múltiplos idiomas. |
| **Azure Blob Storage** | Ingestão gerenciada via contêineres | Repositórios de documentos e manuais corporativos | Suporte a PDF, Word (`.docx`), Texto puro (`.txt`), Markdown (`.md`) e HTML. Dispensa manutenção manual de índices. |
| **Web (Bing Grounding)** | Consulta em tempo real via motor Bing | Notícias do dia, cotações de mercado e acontecimentos externos | Fornece dados públicos ao vivo. *Atenção de prova:* Menor controle factual quando comparado a repositórios internos indexados. |
| **SharePoint Remote** | Consulta federada em tempo real (sem pré-indexação) | Bibliotecas do M365 que exigem controle rigoroso de acesso | **Respeita permissões de segurança do Microsoft 365 (ACLs) em tempo real**. Zero custo de sincronização; sempre reflete a versão mais atual do arquivo. |
| **SharePoint Indexed** | Ingestão e pré-indexação no Azure AI Search | Pipelines complexos de enriquecimento por IA e busca semântica veloz | Pré-processamento que garante **menor latência de recuperação**. Permite habilidades cognitivas customizadas e mescla com dados de outras fontes. |
| **Microsoft OneLake** | Conexão com o *Lakehouse* do Microsoft Fabric | Análise de dados analíticos, relatórios de BI e governança analítica | Fundamenta agentes em documentos não estruturados, métricas corporativas e tabelas analíticas do Fabric. |

---

## SharePoint Remote vs. SharePoint Indexed (Alerta de Prova)

Essa distinção é um dos tópicos mais cobrados em certificações:

| Critério | SharePoint Remote | SharePoint Indexed |
| :--- | :--- | :--- |
| **Indexação Prévia** | **Não** (consulta ao vivo) | **Sim** (pré-indexado no Azure AI Search) |
| **Governança Microsoft 365** | Aplica permissões de acesso (ACLs) do M365 em tempo real | Permissões gerenciadas no nível do índice de busca |
| **Latência de Recuperação** | Maior (espera a consulta no SharePoint) | **Menor** (recuperação ultraveloz do índice) |
| **Recência dos Dados** | Imediata (reflete a última edição) | Depende da frequência do ciclo de reindexação |

---

## Perfis de Pontuação (*Scoring Profiles*) e Boosting

Os **Perfis de Pontuação (*Scoring Profiles*)** no Azure AI Search permitem ajustar a função de pontuação de relevância do motor de busca:
* **Finalidade:** Aumentar (*boosting*) a pontuação de campos ou atributos específicos para que os resultados mais importantes apareçam no topo do ranking.
* **Exemplos de Ponderação:**
  * Dar peso 3x maior para termos encontrados no **título** ou no **resumo** do que no corpo do documento.
  * Priorizar documentos com base na **data de publicação** (conteúdo mais recente ganha bônus).
  * Elevar pontuações com base em tags categóricas de prioridade de negócio.

---

## Conectando a Base de Conhecimento ao Agente via SDK (Python)

A integração entre o agente do Azure AI e a base de conhecimento do Foundry IQ é padronizada através de uma ferramenta **MCP (`MCPTool`)**:

```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential
from azure.ai.projects.models import PromptAgentDefinition, MCPTool

# 1. Inicializar cliente do projeto Foundry
project_client = AIProjectClient.from_connection_string(
    credential=DefaultAzureCredential(),
    conn_str="<PROJECT_CONNECTION_STRING>"
)

# 2. Configurar a ferramenta MCP apontando para a Base de Conhecimento
knowledge_tool = MCPTool(
    server_label="product-docs-kb",
    server_url=f"https://meu-search.search.windows.net/knowledgebases/product-documentation/mcp"
)

# 3. Criar a versão do agente acoplando a base como ferramenta
agent = project_client.agents.create_version(
    agent_name="support-agent",
    definition=PromptAgentDefinition(
        model="gpt-4o-mini",
        instructions="Answer questions using the product documentation knowledge base. Always cite your sources.",
        tools=[knowledge_tool]
    )
)
```

---

## Pontos que Costumam Confundir

> [!WARNING]
> **SharePoint Remote vs Indexed:** Se a questão pedir *"acesso em tempo real com governança estrita de permissões do Microsoft 365 sem indexar arquivos"*, a resposta é **SharePoint Remote**. Se pedir *"pesquisa semântica rápida com enriquecimento cognitivo prévio"*, a resposta é **SharePoint Indexed**.

> [!NOTE]
> **Perfis de Pontuação Não Criptografam Dados:** Perfis de pontuação servem exclusivamente para **calibrar relevância e impulsionar campos (*boosting*)**, e não têm relação com segurança ou criptografia de campos.

---

## Aprofundar na Documentação

- [Configurar fontes de dados para bases de conhecimento no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/introduction-foundry-iq/4-data-requirements)
- Página anterior: [[01 - RAG Empresarial e a Camada Foundry IQ]]
- Próxima página: [[03 - Controle de Recuperação, Citações e Monitoramento]]
