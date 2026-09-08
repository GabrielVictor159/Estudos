---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - foundry-iq
  - rag
  - arquitetura
  - azure-ai-search
modulo: 10
---

# RAG Empresarial e a Camada Foundry IQ

Agentes baseados exclusivamente em modelos de linguagem pré-treinados falham em ambientes corporativos por três motivos principais: **corte temporal do conhecimento (*knowledge cutoff*)**, **alucinações (*ungrounded outputs*)** e **ausência de fontes verificáveis** para auditoria.

O **RAG (Retrieval-Augmented Generation)** resolve essas falhas orquestrando a recuperação de dados antes da resposta do modelo.

![[m10-fluxo-recuperacao-grounding.jpg]]

---

## O Ciclo de Três Fases do RAG

```
 1. RECUPERAR (Retrieve)
    A consulta do usuário aciona a busca nas bases de conhecimento indexadas
    para recuperar os fragmentos (chunks) mais relevantes.
                     │
                     ▼
 2. AUMENTAR (Augment)
    Os fragmentos recuperados e metadados de auditoria são injetados
    junto à consulta do usuário no contexto (prompt) enviado ao LLM.
                     │
                     ▼
 3. GERAR (Generate)
    O LLM sintetiza a resposta final fundamentada estritamente nas evidências
    documentais fornecidas, incluindo citações exatas da fonte.
```

---

## O Que É o Foundry IQ?

O **Foundry IQ** é uma plataforma corporativa gerenciada que atua como uma **camada centralizada de conhecimento compartilhado**, construída diretamente sobre o **Azure AI Search** (*Pesquisa de IA do Azure*).

### Por Que Usar Foundry IQ em Vez de RAG Tradicional?

| Desafio no RAG Tradicional | Solução Nativa no Foundry IQ |
| :--- | :--- |
| **Silos de Conhecimento:** Cada agente exige seu próprio pipeline de ingestão, banco vetorial e código de busca. | **Camada Compartilhada:** Conecte fontes corporativas uma única vez; múltiplos agentes acessam a mesma base. |
| **Manutenção Contínua:** Desenvolvedores precisam programar rotinas de parsing, chunking e sincronização de dados. | **Pipeline Automatizado:** Descoberta, conversão, chunking e reindexação incremental são 100% gerenciados. |
| **Complexidade de Algoritmos:** Afinação manual de busca vetorial vs. lexical vs. semântica. | **Inteligência Embutida:** Seleção adaptativa de busca híbrida com *Semantic Re-ranking* nativo. |
| **Protocolo de Acesso Proprietário:** Código customizado de integração para cada agente. | **Padrão Aberto MCP:** Acesso padronizado via *Model Context Protocol*. |

---

## Organização por Domínio de Negócio (*Knowledge Bases*)

Em vez de organizar os dados por pastas técnicas de armazenamento de TI (ex.: "Bucket X do S3" ou "Contêiner Y do Blob"), o Foundry IQ estrutura as informações em **Bases de Conhecimento por Domínio de Negócio**:

```
                       BASE DE CONHECIMENTO: SUPORTE AO CLIENTE
                                          │
       ┌──────────────────┬───────────────┴───────────────┬──────────────────┐
       ▼                  ▼                               ▼                  ▼
Manuais em PDF      Especificações               Histórico de Tíquetes     Artigos Públicos
 (Azure Blob)        (SharePoint)                  (Azure AI Search)        da Web (Bing)
```

Uma única base de dados de conhecimento pode agregar dinamicamente múltiplos repositórios heterogêneos.

---

## Pipeline Automatizado de Ingestão de Dados

Ao conectar uma fonte ao Foundry IQ, o serviço executa 4 etapas contínuas:

1. **Descoberta (*Discovery*):** Varredura e enumeração de arquivos e documentos nas fontes configuradas.
2. **Processamento (*Processing*):** Conversão de formatos (PDF, Word, HTML), quebra em pedaços textuais ótimos (*chunking*) e geração de vetores matemáticos (*embeddings*).
3. **Indexação (*Indexing*):** Gravação estruturada no Azure AI Search com suporte a busca lexical e vetorial.
4. **Monitoramento (*Monitoring*):** Detecção contínua de alterações ou exclusões nas fontes de origem com reindexação incremental automática.

---

## Inteligência de Recuperação Embutida

O mecanismo interno de recuperação do Foundry IQ executa automaticamente:
* **Análise de Intenção:** Distingue se a pergunta é uma dúvida conceitual, busca de fato isolado ou pedido de listagem.
* **Busca Híbrida Adaptativa:** Combina busca por palavra-chave (BM25) com busca vetorial de similaridade semântica e expansão de termos (*query expansion*).
* **Ranqueamento Semântico (*Semantic Re-ranking*):** Reordena os fragmentos recuperados para que os mais contextualmente relevantes ocupem as primeiras posições do prompt, economizando tokens.
* **Metadados de Citação:** Anexa automaticamente identificadores de documentos para que o agente gere citações verificáveis.

---

## Pontos que Costumam Confundir

> [!NOTE]
> **Foundry IQ ≠ Banco Vetorial Isolado:** O Foundry IQ não é apenas um banco vetorial; é a orquestração completa construída sobre o Azure AI Search que engloba conectores de dados, pipelines de processamento, inteligência de busca híbrida e interfaces MCP.

> [!IMPORTANT]
> **"Construa uma vez, acesse com vários":** No exame, a principal vantagem arquitetural do Foundry IQ sobre o RAG tradicional é o **compartilhamento de conhecimento** entre diferentes agentes sem duplicação de dados ou infraestrutura.

---

## Aprofundar na Documentação

- [Noções básicas sobre o RAG para agentes no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/introduction-foundry-iq/2-understand-rag)
- [Explorar o IQ do Foundry no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/introduction-foundry-iq/3-foundry-iq)
- Voltar ao [[00 - Índice do Módulo 10]]
- Próxima página: [[02 - Fontes de Dados e Mecanismos de Busca]]
