---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/rag
modulo: "13"
titulo: "Fundamentos do Foundry IQ"
nivel: iniciante
---

# Fundamentos do Foundry IQ

Um modelo generativo não recebe automaticamente acesso às políticas privadas ou às informações atuais de uma organização. Para responder sobre despesas, férias ou procedimentos internos, precisa receber conteúdo relevante no contexto da solicitação.

## RAG e conhecimento compartilhado

Na **geração aumentada por recuperação (RAG)**, a aplicação recupera informações e as fornece ao modelo. O **Foundry IQ** organiza essa recuperação em uma camada gerenciada e reutilizável, apoiada no **Azure AI Search**.

Vários agentes podem consultar a mesma base. Atualizar o conhecimento compartilhado pode beneficiar todos eles, conforme a atualização efetiva das fontes.

## Responsabilidade de cada componente

| Componente | Papel |
|---|---|
| Modelo | Interpretar a pergunta e gerar a resposta |
| Ferramenta | Permitir ao agente consultar dados ou executar uma operação |
| Conhecimento | Fornecer informações pertinentes ao domínio |
| Foundry IQ | Organizar fontes e coordenar a recuperação |

## Exemplo de aplicação

Um agente financeiro e um agente de viagens podem consultar a mesma política de reembolso. Cada um mantém suas instruções e sua finalidade, usando uma fonte aprovada em comum.

## Pontos-chave para revisão AI-901

- RAG acrescenta contexto durante a consulta; não retreina o modelo a cada pergunta.
- Reutilizar uma base reduz a duplicação de pipelines de recuperação.
- Conhecimento, raciocínio do modelo e ferramentas cumprem papéis diferentes.
