---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - revisao
modulo: "13"
titulo: "Aplicações e revisão do Foundry IQ"
nivel: iniciante
---

# Aplicações e revisão do Foundry IQ

## Cenários de uso

| Aplicação | Conhecimento relevante |
|---|---|
| Assistente financeiro | Políticas de despesas e prestação de contas |
| Assistente de RH | Regras de férias e procedimentos internos |
| Suporte a instalações | Orientações de manutenção e uso dos espaços |

Uma base pode atender mais de um agente. A organização por domínio deve facilitar a recuperação de conteúdo pertinente e autorizado.

## Avaliar recuperação e resposta

| Etapa | Pergunta de avaliação |
|---|---|
| Recuperação | Os trechos são relevantes, atuais e autorizados? |
| Resposta | As afirmações estão apoiadas nesses trechos? |
| Referências | Cada indicação leva à evidência correspondente? |
| Falta de informação | O agente reconhece que não encontrou apoio suficiente? |

Teste perguntas simples, perguntas que combinam fontes, ambiguidades e perguntas sem resposta. Inclua identidades com acessos diferentes e conteúdo que tente modificar as instruções do agente.

## Perguntas para revisão

1. **Qual é a finalidade do Foundry IQ?** Fornecer conhecimento gerenciado e reutilizável para agentes e aplicações.
2. **Qual serviço sustenta a indexação e a recuperação?** Azure AI Search.
3. **O que uma base contém?** Referências a fontes e configurações de recuperação.
4. **O que é uma fonte?** Uma conexão com conteúdo indexado ou remoto.
5. **O que a recuperação agêntica acrescenta?** Planejamento de buscas, possível decomposição de perguntas e reunião de evidências.
6. **Por que apresentar referências na resposta?** Para permitir rastrear e conferir a informação utilizada.
7. **MCP elimina a necessidade de autenticação?** Não. A ferramenta precisa de identidade e acesso adequados.
8. **Usar a base retreina o modelo?** Não. Os dados recuperados fornecem contexto à interação.

## Para memorizar

> **Fonte:** onde consultar. **Base:** o que reunir e como recuperar. **Recuperação:** quais evidências usar. **Agente:** como responder. **Permissões:** o que pode ser acessado.
