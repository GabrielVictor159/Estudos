---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - foundry-iq
  - rag
  - agentes
  - knowledge-base
modulo: 10
titulo: Criar agentes de IA aprimorados com conhecimento com o IQ do Foundry
nivel: intermediário
---

# Agentes de IA Aprimorados com Conhecimento no Foundry IQ

O **Foundry IQ** é uma camada de conhecimento corporativo gerenciada, construída sobre o **Azure AI Search** (*Pesquisa de IA do Azure*), que elimina a complexidade de criar e manter infraestruturas de RAG isoladas para cada agente. Ele permite unificar fontes heterogêneas (Blob, SharePoint, OneLake, Web) em **Bases de Conhecimento** organizadas por domínios de negócio e consumidas por múltiplos agentes via protocolo MCP.

![[m10-arquitetura-foundry-iq.jpg]]

---

## Páginas deste módulo

| # | Página | Conteúdo Direto |
|---|--------|-----------------|
| 1 | [[01 - RAG Empresarial e a Camada Foundry IQ]] | Limitações de LLMs puros, as 3 fases do RAG (Retrieve, Augment, Generate), RAG tradicional vs Foundry IQ e pipeline de dados. |
| 2 | [[02 - Fontes de Dados e Mecanismos de Busca]] | Fontes suportadas (AI Search, Blob, Web, SharePoint Remote vs Indexed, Fabric OneLake), perfis de pontuação (*scoring profiles*) e conexão MCP. |
| 3 | [[03 - Controle de Recuperação, Citações e Monitoramento]] | Instruções como contrato (regras estritas, formatação de citações, incerteza), arquétipos de agentes e métricas de qualidade. |
| 4 | [[04 - Questões de Exame Comentadas e Resumo Rápido]] | Questões oficiais de avaliação resolvidas e justificadas, pegadinhas de prova e tabela de identificação imediata. |

---

## Mapa mental do módulo em uma frase

> O **Foundry IQ** atua como um repositório centralizado de conhecimento sobre o **Azure AI Search**: ingere e indexa automaticamente dados de múltiplas fontes corporativas em **Bases de Conhecimento** por domínio de negócio, que são consumidas por múltiplos agentes de IA via ferramentas MCP com citações verificáveis e respostas estritamente fundamentadas.

---

## Tabela de Decisão Rápida

| Se o cenário exigir… | A escolha técnica é |
|---|---|
| Acesso a dados do SharePoint com respeito às permissões do M365 em tempo real (sem indexação) | **SharePoint Remote** |
| Processamento profundo de documentos do SharePoint com busca semântica veloz e enriquecimentos | **SharePoint Indexed** (via Azure AI Search) |
| Aumentar a relevância de campos específicos (ex.: títulos) ou priorizar documentos mais recentes | **Perfis de Pontuação (*Scoring Profiles* / Boosting)** |
| Como conectar a Base de Conhecimento do Foundry IQ ao agente de IA no SDK | **Ferramenta MCP (`MCPTool`)** |
| Evitar que o agente alucine quando não houver documento relevante na base | **Regra estrita de Incerteza/Fallback nas instruções do sistema** |
| Rastreabilidade e conformidade jurídica das respostas geradas | **Formato obrigatório de citações** (ex.: `【doc_id:search_id†source_name】`) |
| Conectar dados analíticos corporativos e Lakehouse do Microsoft Fabric | **Microsoft OneLake** |
| Dados públicos em tempo real (preços, notícias de mercado) como enriquecimento | **Web (Bing Grounding)** |

---

## RAG Tradicional vs. Foundry IQ

| Aspecto | RAG Tradicional (Customizado) | Foundry IQ (Gerenciado) |
| :--- | :--- | :--- |
| **Arquitetura** | Fragmentada: 1 pipeline RAG dedicado por agente | Centralizada: 1 Camada de Conhecimento compartilhada |
| **Infraestrutura** | Desenvolvedor cria parsing, chunking, embeddings e bancos vetoriais | Gerenciada nativamente pelo Azure AI Search |
| **Reutilização** | Nula ou difícil: dados duplicados entre projetos | Total: múltiplos agentes conectam à mesma base |
| **Protocolo de Acesso** | APIs e conectores proprietários em código | Padrão aberto **MCP (Model Context Protocol)** |

---

## Objetivos de Aprendizagem Cobertos

- [x] Explicar como o RAG soluciona o corte temporal e alucinações conectando agentes a dados em tempo real
- [x] Descrever o Foundry IQ como plataforma gerenciada de conhecimento compartilhado
- [x] Configurar fontes de dados: Azure AI Search, Blob Storage, Web, SharePoint (Remote/Indexed) e OneLake
- [x] Elaborar instruções de sistema para impor regras de recuperação, citações auditáveis e fallbacks
- [x] Avaliar e monitorar a qualidade do grounding e citações em ambientes de produção

---

## Aprofundar na Documentação

- [Módulo oficial no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/introduction-foundry-iq/)
- Módulo anterior: [[00 - Índice do Módulo 09]]
- Próxima página: [[01 - RAG Empresarial e a Camada Foundry IQ]]
