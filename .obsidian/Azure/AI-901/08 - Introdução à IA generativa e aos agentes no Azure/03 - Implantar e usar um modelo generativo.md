---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/modelos-generativos
modulo: "08"
titulo: "Implantar e usar um modelo generativo"
nivel: iniciante
---

# Implantar e usar um modelo generativo

Implantar um modelo no Microsoft Foundry o disponibiliza para inferência por meio de um endpoint. Um aplicativo cliente pode chamar esse endpoint usando uma API ou um SDK compatível.

## Testar no Playground

O Playground permite enviar prompts, comparar respostas e testar configurações antes de escrever código. Entre os parâmetros apresentados pelo módulo estão:

- **Instruções do sistema:** definem o papel, o comportamento, o tom e as restrições do assistente.
- **Prompt do usuário:** expressa a solicitação específica da interação.
- **Temperatura:** influencia a variação das respostas; valores maiores tendem a produzir maior variedade.
- **Máximo de tokens de saída:** limita o comprimento da resposta e afeta o consumo.

Depois de testar exemplos representativos, use as configurações do Playground como ponto de partida para o código. A aplicação ainda precisa fornecer endpoint, implantação, autenticação e entrada no formato esperado.

## Cliente de chat leve

Um cliente leve coleta a entrada, chama o serviço remoto e apresenta a saída. O SDK do Foundry reduz o trabalho de montar chamadas REST, mas não elimina a configuração de endpoint e autenticação. O módulo apresenta a API de Respostas compatível com OpenAI para interagir com uma implantação.

Consulte também [[07 - Introdução à IA no Azure/05 - Endpoints e Integração com Aplicativos|a nota sobre endpoints, REST e SDK no módulo 07]].

## Modelo direto e agente

Na chamada direta, a aplicação envia um prompt e recebe a resposta do modelo. Uma inferência não significa que o aplicativo está treinando ou alterando o modelo. Quando é necessário comportamento reutilizável, uso de ferramentas ou consulta a fontes, um agente pode encapsular esses recursos; veja [[04 - Criar e usar um agente]].

## Pontos-chave para revisão AI-900/AI-901

- O Playground valida prompts e parâmetros; a implantação disponibiliza o modelo para chamadas por API.
- Instruções do sistema definem comportamento geral; o prompt do usuário traz a tarefa da interação.
- Ao migrar para o código, reproduza as configurações que foram testadas.
- REST e SDK são formas de integrar o cliente ao endpoint.

## Fonte

- [Usando um modelo de IA generativo — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-generative-ai-and-agents/3-using-generative-ai-models)
