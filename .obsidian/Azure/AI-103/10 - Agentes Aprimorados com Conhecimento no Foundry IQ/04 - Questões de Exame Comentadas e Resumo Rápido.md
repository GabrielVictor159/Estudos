---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - foundry-iq
  - questoes-exame
  - simulado
  - revisao
modulo: 10
---

# Questões de Exame Comentadas e Resumo Rápido

Esta página traz as questões oficiais da avaliação do Microsoft Learn comentadas de forma objetiva, acompanhadas da cola rápida para o exame **AI-102 / AI-103**.

---

## Questões Oficiais da Avaliação (Microsoft Learn)

### Questão 1
**Qual é a principal vantagem do RAG (Recuperação de Geração Aumentada) em relação a agentes de IA simples?**
- [ ] A) O RAG elimina a necessidade de modelos de linguagem grandes dependendo inteiramente da recuperação de documentos.
- [x] **B) O RAG permite que os agentes fundamentem as respostas nas informações organizacionais atuais e garantam transparência da fonte.** *(Correta)*
- [ ] C) O RAG retreina automaticamente o modelo de linguagem sempre que os documentos organizacionais são alterados.

> **Justificativa Técnica:** Agentes simples dependem exclusivamente de pesos paramétricos estáticos do pré-treinamento. O RAG conecta o agente a repositórios em tempo real, ancorando as respostas em dados verídicos e auditáveis com citações, dispensando o custo computacional de retreinar o modelo (*fine-tuning*).

---

### Questão 2
**Qual opção de fonte de dados fornece acesso em tempo real ao conteúdo do SharePoint com a governança do Microsoft 365?**
- [ ] A) SharePoint Indexed, que pré-processa o conteúdo do SharePoint no Azure AI Search.
- [x] **B) SharePoint Remote, que consulta sites e bibliotecas do SharePoint em tempo real.** *(Correta)*
- [ ] C) Armazenamento de Blobs do Azure, que se conecta a arquivos do SharePoint armazenados como blobs.

> **Justificativa Técnica:** O **SharePoint Remote** realiza consultas federadas diretamente nos sites e bibliotecas do SharePoint no momento da consulta (*runtime*). Ele herda e aplica as permissões de acesso (ACLs) do Microsoft 365 em tempo real e não exige manutenção ou sincronização periódica de índices de busca.

---

### Questão 3
**Qual é a finalidade de pontuar perfis (*scoring profiles*) nas bases de dados de conhecimento do IQ do Foundry?**
- [ ] A) Criptografar campos confidenciais e proteger informações sensíveis durante a recuperação.
- [x] **B) Aumentar campos ou atributos específicos (*boosting*) para que os resultados mais importantes sejam exibidos primeiro.** *(Correta)*
- [ ] C) Configurar como os documentos são agrupados e divididos em chunks para pesquisa semântica.

> **Justificativa Técnica:** Perfis de pontuação (*scoring profiles*) no Azure AI Search calibram os pesos matemáticos da relevância, permitindo que critérios de negócio — como termos encontrados no título, recência do arquivo ou tags prioritárias — recebam um multiplicador de relevância (*boosting*).

---

### Questão 4
**Por que é fundamental especificar o comportamento de recuperação nas instruções do agente?**
- [x] **A) Sem instruções adequadas, os agentes podem responder a partir de dados de treinamento em vez da base de conhecimento, fornecer respostas não verificáveis ou não citar fontes.** *(Correta)*
- [ ] B) As instruções determinam o algoritmo de classificação semântica que o IQ do Foundry aplica aos resultados da pesquisa.
- [ ] C) As instruções permitem que o agente atualize automaticamente o conteúdo da base de dados de conhecimento ao detectar informações desatualizadas.

> **Justificativa Técnica:** O LLM opera de forma probabilística. Sem instruções explícitas de sistema proibindo o uso de conhecimento paramétrico estático e exigindo citações estritas e políticas de incerteza (fallback), o modelo recorrerá ao seu treinamento prévio, gerando alucinações e respostas sem fundamentação auditável.

---

## Cola Rápida para o Exame

| Se a questão mencionar… | Marque imediatamente… |
|---|---|
| *"Camada de conhecimento compartilhada gerenciada para agentes de IA"* | **Foundry IQ** (construído sobre o **Azure AI Search**) |
| *"Consulta ao SharePoint respeitando permissões do M365 em tempo real sem indexar"* | **SharePoint Remote** |
| *"Pesquisa no SharePoint com baixa latência e enriquecimento cognitivo prévio"* | **SharePoint Indexed** |
| *"Priorizar documentos recentes ou palavras no título no resultado da busca"* | **Perfis de Pontuação (*Scoring Profiles* / Boosting)** |
| *"Como conectar a Base de Conhecimento do Foundry IQ ao agente no código?"* | **`MCPTool`** (Protocolo MCP) |
| *"Por que definir instruções estritas de recuperação no prompt do sistema?"* | **Evitar que o agente use dados de treino e force citações auditáveis** |
| *"O que fazer quando o agente não encontra a resposta na base de dados?"* | **Disparar mensagem de fallback/incerteza definida na instrução** |
| *"Fonte para dados analíticos e Lakehouse do Microsoft Fabric"* | **Microsoft OneLake** |

---

## Aprofundar na Documentação

- [Avaliação do módulo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/introduction-foundry-iq/6-knowledge-check)
- Voltar ao [[00 - Índice do Módulo 10]]
- Módulo anterior: [[00 - Índice do Módulo 09]]
