---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/fala
modulo: "10"
titulo: "Fundamentos de fala com IA"
nivel: iniciante
---

# Fundamentos de fala com IA

A **fala de IA** permite que aplicações recebam instruções faladas e devolvam respostas em áudio. Ela pode tornar a interação mais natural, acessível e adequada a cenários em que digitar não é prático.

## Duas capacidades básicas

| Capacidade | Entrada | Saída | Exemplos |
|---|---|---|---|
| **Reconhecimento de fala (STT)** | Áudio falado | Texto | Transcrição de chamadas, legendas, ditado e entrada de voz para um agente |
| **Síntese de fala (TTS)** | Texto e voz escolhida | Áudio falado | Leitura de mensagens, respostas faladas e anúncios |

O **Voice Live** reúne as duas capacidades em uma experiência de fala para fala: o usuário fala, a aplicação interpreta ou raciocina sobre a solicitação e responde com fala sintetizada.

## Cenários de uso

- **Saúde:** ditado de observações clínicas.
- **Atendimento:** transcrição de chamadas e análise posterior das conversas.
- **Mídia:** legendas ao vivo ou para gravações.
- **Educação:** prática de idioma e retorno sobre pronúncia.
- **Varejo:** assistentes de voz que consultam produtos ou pedidos.
- **Acessibilidade e uso mãos-livres:** interação por voz para pessoas ou situações em que a tela e o teclado não são a melhor opção.

## Azure Speech no Foundry

Azure Speech oferece recursos de fala no Microsoft Foundry. O Playground permite testar áudio e vozes antes de integrar o serviço ao código. Para um aplicativo, o SDK conecta a aplicação ao serviço e gerencia autenticação, envio de áudio e interpretação do resultado.

## Pontos-chave para revisão AI-901

- STT e TTS resolvem direções opostas da conversão de fala e texto.
- Uma experiência conversacional por voz usa reconhecimento, processamento da solicitação e síntese da resposta.
- Aplicações de voz podem melhorar acessibilidade e permitir interação sem as mãos.

## Fonte

- [Introdução — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-speech-azure/1-introduction)