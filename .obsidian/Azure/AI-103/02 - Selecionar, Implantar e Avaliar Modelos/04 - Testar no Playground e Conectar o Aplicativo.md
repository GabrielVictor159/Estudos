---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - implantacao
  - desenvolvimento
modulo: 02
---

# Testar no Playground e Conectar o Aplicativo

Depois de implantado, o modelo fica imediatamente disponível para teste no **playground** — sem escrever uma linha de código. É o passo entre "implantei" e "integrei", e é onde se descobrem as limitações antes de custarem caro.

---

## O playground interativo

**Acesso:** automaticamente ao concluir a implantação, ou pela lista de modelos implantados.

![Captura de tela do playground de chat no portal do Microsoft Foundry](https://learn.microsoft.com/pt-br/training/wwl-data-ai/model-catalog-evaluate/media/chat-playground.png)

### O que testar

| Tipo de teste | Por que importa |
|---|---|
| Perguntas simples | Confirma o comportamento básico e o tom |
| Problemas complexos de raciocínio em várias etapas | Revela se o modelo sustenta a cadeia de raciocínio |
| Solicitações de formato ou estilo específicos | Mede aderência a instruções |
| **Casos extremos** | É o que **revela as limitações** — o teste mais valioso |

### Mensagem do sistema

Orienta o comportamento do modelo antes de qualquer prompt do usuário. Exemplos citados no material:

- "responder como representante de customer service";
- "fornecer explicações técnicas concisas".

Ajustar a mensagem do sistema é o instrumento mais barato de correção de comportamento — e o primeiro a tentar quando a avaliação vai mal (ver [[05 - Avaliar o Desempenho do Modelo]]).

### Parâmetros ajustáveis

| Parâmetro | Efeito |
|---|---|
| **Temperatura** | Equilíbrio entre **criatividade** e **consistência**. Valores baixos → respostas mais determinísticas |
| **Tokens máximos** | Limite de comprimento da resposta |
| **Top-P** | Amostragem de núcleo (*nucleus sampling*) — restringe o conjunto de tokens considerados |

### Aba Código

O playground gera exemplos programáticos prontos em **Python, C# e JavaScript**, mostrando autenticação, configuração do endpoint e formatação da requisição. O código é copiável direto para o aplicativo — é o atalho oficial entre o teste manual e a integração.

---

## Acesso programático: as três informações necessárias

![[m02-fluxo-implantacao.png]]

| # | Informação | Detalhe |
|---|---|---|
| 1 | **URL do endpoint** | Dois tipos suportados: **endpoints de projeto** (funcionalidade específica do Foundry) e **endpoints OpenAI v1** (ampla compatibilidade com as APIs de modelo da OpenAI) |
| 2 | **Chave de autenticação** | Chave secreta ou token. Alternativa recomendada em produção: **autenticação do Microsoft Entra ID**, com a aplicação apresentando um token baseado na sua identidade |
| 3 | **Nome da implantação** | Especificado na implantação; vai no parâmetro da requisição e **roteia** a chamada para a implantação certa |

**Suporte de biblioteca:** há SDKs para múltiplas linguagens e documentação de **REST API** para o restante. Os exemplos de código cobrem formatação de requisição, autenticação e tratamento de resposta.

---

## Tabela de decisão: preciso de… → faço…

| Necessidade | Ação |
|---|---|
| Ver se o modelo entende o domínio antes de codificar | Playground, com prompts reais do negócio |
| Fazer o modelo assumir um papel fixo | **Mensagem do sistema** |
| Reduzir variação entre execuções idênticas | Baixar a **temperatura** |
| Evitar respostas longas demais | Limitar **tokens máximos** |
| Controlar diversidade de vocabulário | Ajustar **Top-P** |
| Comparar dois modelos com o mesmo prompt | Teste **lado a lado**, sincronizando instruções e prompts |
| Sair do teste manual para o código | Aba **Código** do playground |
| Autenticar sem guardar segredo na aplicação | **Microsoft Entra ID** / identidade gerenciada |
| Apontar para uma implantação específica entre várias do mesmo modelo | **Nome da implantação** no parâmetro da requisição |
| Integrar de uma linguagem sem SDK | **REST API** |

---

## Pontos que costumam confundir

**Temperatura × Top-P.** Temperatura mexe na aleatoriedade da distribuição inteira; Top-P restringe **quais** tokens entram na amostragem. Cenários sobre "respostas mais previsíveis" aceitam os dois, mas o material associa **temperatura** diretamente ao eixo criatividade/consistência.

**Playground não substitui avaliação.** Ele é teste interativo — uma das abordagens **manuais**. Cenários sobre medir de forma repetível e em escala pedem avaliação automatizada.

**Dois endpoints, propósitos diferentes.** Endpoint de projeto para funcionalidade específica do Foundry; endpoint OpenAI v1 quando a compatibilidade com as APIs da OpenAI é o que importa.

**Chave é conveniência; Entra ID é produção.** Se o cenário menciona não armazenar segredos, rotação de credenciais ou identidade gerenciada, a resposta é Entra ID.

**Nome da implantação, não nome do modelo.** A requisição roteia pelo nome **da implantação**. É por isso que dá para ter `gpt-4o-mini-prod` e `gpt-4o-mini-teste` sobre o mesmo modelo.

---

## Aprofundar na documentação

- [Implantar modelos em endpoints — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/4-deploy-models)
- Páginas relacionadas: [[03 - Implantar Modelos em Endpoints]] · [[04 - Ferramentas de Desenvolvimento e SDKs]]
