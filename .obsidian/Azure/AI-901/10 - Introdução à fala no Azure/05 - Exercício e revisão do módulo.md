---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - revisao
modulo: "10"
titulo: "Exercício e revisão do módulo"
nivel: iniciante
---

# Exercício e revisão do módulo

O exercício oficial propõe experimentar as funcionalidades de fala no Microsoft Foundry. Use o Playground para comparar reconhecimento, síntese e Voice Live e observe o que muda quando cada etapa é integrada a um aplicativo.

## Roteiro de prática

1. No Playground do Speech, grave uma frase ou envie um arquivo de áudio e examine a transcrição.
2. Teste a conversão de texto em fala com uma voz em português e ajuste a entrega do áudio.
3. Abra o cenário Voice Live e converse com o agente usando o microfone e os alto-falantes.
4. Identifique quais componentes o Voice Live reúne e quais recursos o SDK acrescenta ao aplicativo.
5. Compare o fluxo de um aplicativo que transcreve áudio com o de um agente que responde por voz.

## Perguntas para revisão

1. **Por que usar o SDK de fala em vez de apenas o Playground?** Para integrar o reconhecimento diretamente ao código do aplicativo.
2. **O que o SDK TTS gerencia?** Autenticação, comunicação com o serviço e geração/reprodução ou gravação do áudio configurado.
3. **Qual é o papel do SDK Voice Live?** Abrir a sessão em tempo real, transmitir áudio e tratar respostas faladas e interrupções.

## Resumo do módulo

- **STT:** áudio → texto.
- **TTS:** texto + voz → áudio.
- **Voice Live:** áudio do usuário → processamento pelo agente → áudio de resposta, em tempo real.
- **Playground:** exploração e teste no Foundry.
- **SDK:** integração dessas capacidades em um aplicativo cliente.

## Fontes

- [Exercício — Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-speech-azure/5-exercise)
- [Avaliação do módulo — Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-speech-azure/6-knowledge-check)
- [Guia de estudo oficial do AI-901](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901)