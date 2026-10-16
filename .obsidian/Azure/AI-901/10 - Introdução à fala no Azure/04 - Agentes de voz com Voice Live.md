---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/fala
  - ai/agentes
modulo: "10"
titulo: "Agentes de voz com Voice Live"
nivel: iniciante
---

# Agentes de voz com Voice Live

Uma conversa de **fala para fala** permite que o usuário fale e receba uma resposta falada. Em um pipeline tradicional, a aplicação reconhece a fala, processa o texto com um agente ou outra lógica e sintetiza a resposta.

## Voice Live

O **Azure Speech Voice Live** combina reconhecimento de fala, raciocínio de IA e síntese de fala em um serviço gerenciado para conversas em tempo real. Ele reduz a necessidade de montar e manter cada componente de áudio como um serviço separado.

![[assets/m10-pipeline-voice-live.png|900]]

*O Voice Live mantém o fluxo de áudio conversacional em tempo real, incluindo a ida e a volta entre usuário e agente.*

O agente pode usar um modelo generativo e instruções, enquanto o Voice Live cuida do fluxo de áudio. A experiência pode incluir áudio de resposta, interrupções, engajamento proativo e elementos visuais como avatares, conforme a configuração.

No Foundry, é possível explorar o Voice Live no Playground, selecionar um cenário, voz e modelo e testar a conversa com microfone e alto-falantes. O modo de voz de um agente do Foundry encapsula parte dessa configuração no próprio agente.

## Aplicativo Python e dependências

Para um aplicativo personalizado, o módulo apresenta o pacote `azure-ai-voicelive`. O SDK abre uma conexão em tempo real, transmite áudio e processa eventos de resposta e interrupção. Um aplicativo com dispositivos de áudio também precisa de dependências de áudio:

```powershell
python -m pip install "azure-ai-voicelive[aiohttp]" pyaudio python-dotenv azure-identity
```

O exemplo completo do Microsoft Learn cuida de conexão WebSocket, sessão, captura de áudio, reprodução e eventos. O fluxo de áudio requer microfone e alto-falantes disponíveis. Em vez de copiar um trecho parcial, use o exemplo completo do [início rápido oficial do Voice Live](https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/voice-live-quickstart).

## Quando escolher cada abordagem

- **STT ou TTS isolado:** use o SDK Azure Speech quando o aplicativo precisa apenas transcrever ou sintetizar áudio.
- **Conversa falada em tempo real:** use Voice Live quando o agente precisa ouvir, raciocinar e responder com áudio em uma única experiência.

## Pontos-chave para revisão AI-901

- Voice Live coordena fala de entrada, processamento do agente e fala de saída.
- O SDK dá suporte à conexão e ao streaming de áudio; não substitui microfone e alto-falantes do dispositivo.
- Uma conversa em tempo real precisa tratar eventos, respostas e interrupções.
- O Playground é útil para configurar e experimentar antes da integração.

## Fonte

- [Criando um agente com capacidade de fala — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-speech-azure/4-voice-live)
- [Início rápido do Voice Live — Microsoft Learn](https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/voice-live-quickstart)