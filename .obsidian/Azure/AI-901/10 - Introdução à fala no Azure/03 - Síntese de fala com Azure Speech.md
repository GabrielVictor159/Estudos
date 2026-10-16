---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/fala
  - ai/sdk
modulo: "10"
titulo: "Síntese de fala com Azure Speech"
nivel: iniciante
---

# Síntese de fala com Azure Speech

**Síntese de fala**, ou **TTS (text-to-speech)**, converte texto escrito em áudio falado. A aplicação fornece o texto e escolhe uma voz; o Azure Speech gera o áudio para reprodução imediata ou gravação.

## Como a síntese é configurada

Em termos gerais, o sistema divide o texto em unidades, associa sons e prosódia e sintetiza o áudio. A voz escolhida, o idioma e parâmetros como velocidade, tom e volume influenciam a saída.

O Azure Speech oferece vozes predefinidas, incluindo vozes neurais, e permite configurar a reprodução em alto-falantes ou a gravação em arquivo. A voz `pt-BR-FranciscaNeural` é uma opção padrão para português do Brasil; as vozes disponíveis podem variar por região e recurso.

## Exemplo Python: sintetizar texto em arquivo WAV

O exemplo usa o mesmo SDK instalado na nota [[02 - Reconhecimento de fala com Azure Speech]]. Salve como `sintetizar_fala.py`:

```python
import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv

load_dotenv()

speech_config = speechsdk.SpeechConfig(
    subscription=os.environ["SPEECH_KEY"],
    endpoint=os.environ["ENDPOINT"],
)
speech_config.speech_synthesis_voice_name = "pt-BR-FranciscaNeural"

audio_config = speechsdk.audio.AudioOutputConfig(filename="resposta.wav")
synthesizer = speechsdk.SpeechSynthesizer(
    speech_config=speech_config,
    audio_config=audio_config,
)

texto = "Olá! Esta é uma resposta falada pelo Azure Speech."
result = synthesizer.speak_text_async(texto).get()

if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
    print("Áudio salvo em resposta.wav")
else:
    print("Síntese não concluída:", result.reason)
```

Execute com `python sintetizar_fala.py`. Para reproduzir em vez de salvar, use `speechsdk.audio.AudioOutputConfig(use_default_speaker=True)`.

## Pontos-chave para revisão AI-901

- TTS recebe texto e configuração de voz e devolve áudio.
- Voz neural, idioma e parâmetros de fala afetam a experiência de escuta.
- O aplicativo pode reproduzir ou salvar o resultado; não confunda isso com armazenamento permanente automático no Azure.

## Fonte

- [Síntese de fala — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-speech-azure/3-speech-synthesis)
- [Suporte de idioma e vozes — Azure Speech](https://learn.microsoft.com/pt-br/azure/ai-services/speech-service/language-support?tabs=tts)