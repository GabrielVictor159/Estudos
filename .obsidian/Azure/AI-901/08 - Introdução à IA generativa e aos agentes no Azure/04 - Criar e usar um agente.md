---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/agentes
modulo: "08"
titulo: "Criar e usar um agente"
nivel: iniciante
---

# Criar e usar um agente

Um **agente no Microsoft Foundry** é um componente reutilizável que reúne um modelo e instruções e pode usar ferramentas e fontes de conhecimento para completar tarefas.

## Componentes

| Elemento | Papel |
|---|---|
| **Modelo** | Processa a entrada, gera conteúdo e ajuda a decidir como prosseguir |
| **Instruções do sistema** | Definem função, estilo, regras, restrições e formato |
| **Ferramentas** | Executam ações por APIs, funções ou recursos conectados |
| **Conhecimento opcional** | Recupera contexto externo, por exemplo de documentos ou fontes de dados |

> **Ferramentas = ações. Conhecimento = contexto.**

## Ciclo de interação

1. O agente recebe a solicitação.
2. O modelo interpreta a tarefa com as instruções.
3. Se necessário, consulta conhecimento ou escolhe uma ferramenta.
4. O resultado da recuperação ou ação retorna ao fluxo do agente.
5. O agente formula a resposta.

![[assets/m08-ciclo-agente.png|900]]

*O agente decide quando responder diretamente, recuperar contexto ou executar uma ação por ferramenta.*

Ferramentas podem consultar sistemas ou executar ações. Conhecimento pode usar RAG para recuperar trechos relevantes. Para ações com efeitos externos, configure permissões adequadas e valide o comportamento.

## Criar, testar e integrar

No portal do Foundry, escolha o modelo, escreva as instruções, adicione apenas as ferramentas necessárias e teste solicitações no Playground. Avalie se o agente responde, recupera contexto ou chama uma ferramenta nos casos esperados.

Para integração, o SDK do Foundry Projects conecta o cliente ao projeto e à API de Projeto. O aplicativo recupera a referência ou identificação do agente e envia uma solicitação. A publicação pode expor o agente como um recurso gerenciado com endpoint estável.

## Pontos-chave para revisão AI-900/AI-901

- Agente = modelo + instruções; ferramentas e conhecimento são capacidades que podem ser adicionadas.
- Ferramentas executam ações; conhecimento fornece contexto.
- Playground ajuda a testar prompts, ferramentas e comportamento antes de integrar.
- SDK e API de Projeto conectam o aplicativo cliente ao agente.
- Permissões e validações devem acompanhar as ferramentas que executam ações.

## Fonte

- [Criando um agente — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-generative-ai-and-agents/4-creating-an-agent)
