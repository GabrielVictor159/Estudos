---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
modulo: "06"
titulo: "Entenda a geração aumentada por recuperação"
nivel: iniciante
---

# Entenda a geração aumentada por recuperação

![[assets/m06-rag-ajuste-exclusivo.png|1000]]




**RAG** (*Retrieval-Augmented Generation*, geração aumentada por recuperação) é um padrão que combina um mecanismo de busca com um **LLM**. A aplicação recupera informações de uma fonte de conhecimento e as inclui na entrada do modelo, para que a resposta seja gerada com base nesse contexto.

##### Por que usar RAG

Um LLM pode não conhecer documentos privados de uma organização nem alterações feitas depois do treinamento. O RAG permite consultar essas fontes no momento da pergunta, sem precisar retreinar o modelo a cada atualização dos dados.

- **Conhecimento específico:** responder perguntas sobre políticas, manuais, produtos ou outros documentos de domínio.
- **Informações recentes:** atualizar e reindexar as fontes sem modificar os pesos do modelo.
- **Respostas fundamentadas:** usar trechos recuperados como evidências e, quando configurado, indicar as fontes.
- **Acesso em linguagem natural:** perguntar sobre documentos sem conhecer sua organização interna.

##### Etapas conceituais

1. **Recuperar** — pesquisar nas fontes ou em um índice e localizar conteúdo relacionado à consulta.
2. **Aumentar o prompt** — reunir pergunta e conteúdo recuperado no contexto enviado ao modelo.
3. **Gerar** — o LLM usa a pergunta, as instruções e o contexto para redigir uma resposta.

##### RAG e retreinamento

- **RAG:** busca dados externos durante a solicitação e os fornece como contexto ao modelo.
- **Retreinamento ou ajuste fino:** altera comportamento ou parâmetros do modelo por meio de treinamento adicional.

RAG é útil quando a resposta precisa se apoiar em informações privadas, específicas ou atualizadas. Ele não atualiza o treinamento do modelo e não garante, por si só, respostas corretas.

##### Limitações

- Se a fonte não contiver a resposta, não haverá evidência suficiente para recuperá-la.
- Trechos errados ou incompletos podem levar a respostas ruins.
- O LLM ainda pode interpretar incorretamente o contexto ou acrescentar afirmações sem suporte.
- Alterações na fonte precisam refletir-se no conteúdo indexado para serem recuperadas.

## Pontos-chave para revisão AI-900/AI-901

- RAG **recupera informação externa e a inclui no prompt** para fundamentar a geração.
- É indicado para conteúdo privado, específico de domínio ou atualizado.
- RAG complementa o modelo durante a inferência; **não equivale a retreinar o LLM**.
- A resposta depende da qualidade dos dados e da busca.

Fonte: [Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/rag-fundamentals/)