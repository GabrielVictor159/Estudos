---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/agentes
  - ai/mcp
modulo: "09"
titulo: "Usar Azure Language em um agente via MCP"
nivel: iniciante
---

# Usar Azure Language em um agente via MCP

Um modelo generativo pode interpretar solicitações e formular respostas, enquanto o **Azure Language in Foundry Tools** fornece operações de análise de texto estruturadas. O agente pode combinar o raciocínio do modelo com resultados de linguagem específicos.

## O que é MCP

**Model Context Protocol (MCP)** é um protocolo aberto para conectar agentes a ferramentas e fontes de dados externas por uma interface comum.

- **Cliente MCP:** o agente ou aplicativo host envia solicitações e recebe resultados.
- **Servidor MCP:** expõe ferramentas ou dados, executa a função solicitada e devolve uma resposta estruturada.
- O agente pode descobrir as ferramentas disponíveis e chamá-las quando forem adequadas à tarefa.

## Servidor MCP do Azure Language

O servidor MCP gerenciado do Azure Language expõe recursos de linguagem por meio do protocolo MCP, como reconhecimento de entidades, análise de sentimento e detecção de idioma. Assim, o agente usa o mesmo padrão para descobrir e chamar essas ferramentas, sem integrar cada operação diretamente por REST no código do agente.

No portal do Foundry, o fluxo conceitual é:

1. Implantar um modelo e salvá-lo como agente.
2. Adicionar o servidor MCP do Azure Language como ferramenta.
3. Configurar a conexão usando o recurso do Foundry.
4. Escrever instruções que indiquem quando usar a ferramenta.
5. Testar o agente com textos que exijam análise estruturada.

O módulo informa que o recurso do Foundry inclui acesso às ferramentas de linguagem, portanto não é necessário criar um recurso Azure Language separado para essa conexão MCP descrita no exercício.

![[assets/m09-fluxo-mcp.png|900]]

*O servidor MCP executa a análise de texto e retorna dados estruturados ao agente.*

## Quando essa integração é útil

O agente pode encaminhar uma tarefa determinística — como detectar idioma, identificar PII ou obter sentimento — para o servidor especializado e usar o resultado na conversa ou em outra etapa do fluxo. Isso permite combinar respostas naturais com operações estruturadas.

Para rever a composição de agente, consulte [[08 - Introdução à IA generativa e aos agentes no Azure/04 - Criar e usar um agente|criação de agentes no módulo 08]].

## Pontos-chave para revisão AI-900/AI-901

- MCP define um padrão cliente-servidor para conectar agentes a ferramentas externas.
- O servidor MCP expõe operações; o agente descobre e invoca ferramentas.
- Azure Language pode prover resultados estruturados para tarefas de texto dentro do fluxo do agente.
- A integração via MCP combina a linguagem natural do modelo com a análise especializada.

## Fonte

- [Usar a Linguagem do Azure com um agente — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-text-analysis-azure/4-language-mcp)
