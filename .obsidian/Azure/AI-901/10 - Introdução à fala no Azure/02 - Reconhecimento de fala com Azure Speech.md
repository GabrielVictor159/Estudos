---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/fala
  - ai/sdk
modulo: "10"
titulo: "Reconhecimento de fala com Azure Speech"
nivel: iniciante
---

# Reconhecimento de fala com Azure Speech

**Reconhecimento de fala**, ou **STT (speech-to-text)**, converte áudio falado em texto. O texto resultante pode servir como legenda, transcrição, anotação ditada ou entrada para um agente.

## Como o reconhecimento interpreta o áudio

De forma simplificada, o reconhecimento usa:

1. Um **modelo acústico** para representar os sons da fala como fonemas.
2. Um **modelo de linguagem** para mapear os fonemas a palavras prováveis.
3. Uma saída em texto que o aplicativo pode exibir ou encaminhar para outra etapa.

## Entrada e modos de processamento

Azure Speech pode receber áudio de um **microfone**, de um **arquivo** ou de um fluxo de áudio.

- **Tempo real:** acompanha a fala conforme ela ocorre; útil para conversas, apresentações e legendas ao vivo.
- **Em lote:** processa gravações armazenadas de forma assíncrona; o trabalho pode levar alguns minutos e não há garantia de início imediato.

No Playground do Speech no Foundry, é possível enviar um arquivo ou gravar a própria voz para experimentar o reconhecimento antes de escrever código.

## Exemplo Python: transcrever uma fala pelo microfone

Instale o SDK e o carregador de `.env`:

```powershell
python -m pip install azure-cognitiveservices-speech python-dotenv
```

Crie `.env` com o endpoint e a chave do recurso Foundry/Speech. Não inclua esse arquivo no controle de versão:

```dotenv
ENDPOINT=https://<recurso>.cognitiveservices.azure.com/
SPEECH_KEY=<chave-do-recurso>
```

Salve como `reconhecer_fala.py`:

```python
import os
import azure.cognitiveservices.speech as speechsdk
from dotenv import load_dotenv

load_dotenv()

speech_config = speechsdk.SpeechConfig(
    subscription=os.environ["SPEECH_KEY"],
    endpoint=os.environ["ENDPOINT"],
)
speech_config.speech_recognition_language = "pt-BR"

audio_config = speechsdk.audio.AudioConfig(use_default_microphone=True)
recognizer = speechsdk.SpeechRecognizer(
    speech_config=speech_config,
    audio_config=audio_config,
)

print("Fale uma frase após o início do reconhecimento.")
result = recognizer.recognize_once()

if result.reason == speechsdk.ResultReason.RecognizedSpeech:
    print("Transcrição:", result.text)
elif result.reason == speechsdk.ResultReason.NoMatch:
    print("Nenhuma fala reconhecida.")
else:
    print("Reconhecimento não concluído:", result.reason)
```

Execute com `python reconhecer_fala.py`. `recognize_once()` é apropriado para uma fala curta; cenários contínuos podem usar eventos de reconhecimento parcial e final.

## Pontos-chave para revisão AI-901

- STT transforma a entrada de áudio em texto; o SDK permite incorporar isso ao aplicativo.
- Microfone e arquivo são fontes possíveis de áudio.
- O processamento em lote é assíncrono; não deve ser tratado como resposta imediata.
- O Playground permite experimentar, enquanto o SDK integra o recurso ao código.

## Fonte

- [Reconhecimento de fala — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-speech-azure/2-speech-recognition)