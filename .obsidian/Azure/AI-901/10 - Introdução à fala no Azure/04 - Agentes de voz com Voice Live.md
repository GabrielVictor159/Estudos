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

O pacote `azure-ai-voicelive` abre a conexão em tempo real e permite transmitir áudio e receber eventos. O exemplo usa **Python 3.11 ou superior**, SDK **1.3.0** e PyAudio para os dispositivos locais:

```powershell
python -m pip install "azure-ai-voicelive[aiohttp]==1.3.0" pyaudio python-dotenv
```

## Configuração

Crie `.env` na pasta do script:

```dotenv
VOICELIVE_ENDPOINT=https://<recurso>.services.ai.azure.com/
VOICELIVE_KEY=<chave-do-recurso>
VOICELIVE_MODEL=gpt-realtime
VOICELIVE_VOICE=alloy
```

Use o endpoint de um recurso com **Voice Live habilitado** e um modelo e voz disponíveis nesse recurso. `VOICELIVE_MODEL` identifica o modelo selecionado para a sessão Voice Live. O SDK estabelece a conexão WebSocket a partir do endpoint informado. Mantenha `.env` fora do controle de versão.

Microfone e saída de áudio precisam aceitar **PCM de 16 bits, mono, 24 kHz**. Prefira fones para que o áudio reproduzido não seja capturado como uma nova fala.

## Exemplo Python: conversar pelo microfone em tempo real

Salve como `agente_voice_live.py`:

```python
import asyncio
import base64
import os
import threading

import pyaudio
from dotenv import load_dotenv
from azure.core.credentials import AzureKeyCredential
from azure.ai.voicelive.aio import connect
from azure.ai.voicelive.models import RequestSession, ServerVad

load_dotenv()


class AudioLocal:
    def __init__(self, loop):
        self.loop = loop
        self.microfone = asyncio.Queue(maxsize=50)
        self.saida = bytearray()
        self.lock = threading.Lock()
        self.audio = pyaudio.PyAudio()
        self.stream = None

    def enfileirar_microfone(self, dados):
        # Evita acumular áudio indefinidamente se a rede ficar lenta.
        if not self.microfone.full():
            self.microfone.put_nowait(dados)

    def callback(self, entrada, frames, tempo, status):
        if entrada:
            self.loop.call_soon_threadsafe(self.enfileirar_microfone, entrada)
        quantidade = frames * 2  # Dois bytes por amostra PCM16 mono.
        with self.lock:
            dados = bytes(self.saida[:quantidade])
            del self.saida[:quantidade]
        return dados.ljust(quantidade, b"\x00"), pyaudio.paContinue

    def iniciar(self):
        if self.stream is None:
            self.stream = self.audio.open(
                format=pyaudio.paInt16,
                channels=1,
                rate=24000,
                input=True,
                output=True,
                frames_per_buffer=480,  # 20 ms de áudio por bloco.
                stream_callback=self.callback,
            )

    def reproduzir(self, dados):
        with self.lock:
            self.saida.extend(dados)

    def interromper(self):
        with self.lock:
            self.saida.clear()

    def fechar(self):
        if self.stream is not None:
            try:
                self.stream.stop_stream()
            finally:
                self.stream.close()
        self.audio.terminate()


async def enviar_microfone(conexao, audio):
    while True:
        dados = await audio.microfone.get()
        await conexao.input_audio_buffer.append(
            audio=base64.b64encode(dados).decode("ascii")
        )


async def main():
    audio = AudioLocal(asyncio.get_running_loop())
    resposta_atual = None
    interrompidas = set()

    try:
        async with connect(
            endpoint=os.environ["VOICELIVE_ENDPOINT"],
            credential=AzureKeyCredential(os.environ["VOICELIVE_KEY"]),
            model=os.environ["VOICELIVE_MODEL"],
            api_version="2026-07-15",
        ) as conexao:
            await conexao.session.update(session=RequestSession(
                modalities=["text", "audio"],
                instructions=(
                    "Você é um tutor de fundamentos de IA. "
                    "Responda em português do Brasil, de forma breve e clara."
                ),
                voice=os.environ["VOICELIVE_VOICE"],
                input_audio_format="pcm16",
                output_audio_format="pcm16",
                turn_detection=ServerVad(
                    threshold=0.5,
                    prefix_padding_ms=300,
                    silence_duration_ms=500,
                    create_response=True,
                    interrupt_response=True,
                ),
            ))

            # O grupo propaga falhas do envio e cancela as tarefas ao sair.
            async with asyncio.TaskGroup() as grupo:
                envio = grupo.create_task(enviar_microfone(conexao, audio))
                async for evento in conexao:
                    if evento.type == "session.updated":
                        audio.iniciar()
                        print("Pronto. Fale uma pergunta; Ctrl+C encerra.")

                    elif evento.type == "response.created":
                        resposta_atual = evento.response.id

                    elif evento.type == "input_audio_buffer.speech_started":
                        audio.interromper()
                        if resposta_atual:
                            interrompidas.add(resposta_atual)
                        print("Ouvindo...")

                    elif evento.type == "response.audio.delta":
                        if evento.response_id not in interrompidas:
                            # O SDK já entrega bytes de áudio decodificados.
                            audio.reproduzir(evento.delta)

                    elif evento.type == "response.audio_transcript.delta":
                        if evento.response_id not in interrompidas:
                            print(evento.delta, end="", flush=True)

                    elif evento.type == "response.done":
                        interrompidas.discard(evento.response.id)
                        if resposta_atual == evento.response.id:
                            resposta_atual = None
                        print()

                    elif evento.type == "error":
                        raise RuntimeError(evento.error.message)

                envio.cancel()
    finally:
        audio.fechar()


if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\nConversa encerrada.")
    except Exception as erro:
        raise SystemExit(f"Falha na conversa: {erro}") from erro
```

Execute com `python agente_voice_live.py` e pergunte, por exemplo: “Qual é a diferença entre reconhecimento e síntese de fala?”. Espere a resposta ou volte a falar para interromper. O script mantém a conversa até `Ctrl+C`; ele não grava arquivos de áudio.

### O que cada parte faz

| Parte | Função |
|---|---|
| `connect()` | Abre a sessão WebSocket com endpoint, credencial e modelo |
| `session.update()` | Configura instruções, voz, formatos e detecção de fala |
| `AudioLocal` | Captura o microfone e reproduz o áudio recebido |
| `input_audio_buffer.append()` | Envia blocos de áudio codificados em Base64 |
| `ServerVad` | Detecta os turnos e solicita respostas ao fim da fala |
| `response.audio.delta` | Entrega partes da resposta falada como bytes no SDK |
| `speech_started` | Limpa a reprodução pendente quando a pessoa volta a falar |
| `TaskGroup` e `finally` | Coordenam tarefas e liberam os dispositivos ao encerrar |

`create_response=True` permite ao serviço gerar a resposta após detectar o fim do turno, sem uma chamada manual a `response.create()`. `interrupt_response=True` permite interromper a geração; o código também limpa o áudio local pendente e ignora partes da resposta interrompida.

## Exemplo de personalização: mudar as instruções

Para transformar o tutor em um assistente de atendimento, substitua o valor de `instructions` na configuração da sessão:

```python
instructions=(
    "Você é um assistente de atendimento. Responda em português do Brasil. "
    "Faça uma pergunta por vez para entender o problema. "
    "Não invente status de pedidos nem afirme executar ações sem uma ferramenta."
)
```

As instruções mudam o comportamento conversacional. Consultar pedidos ou executar ações exige acrescentar as ferramentas e a lógica correspondentes à aplicação.

## Quando escolher cada abordagem

- **STT ou TTS isolado:** use o SDK Azure Speech quando o aplicativo precisa apenas transcrever ou sintetizar áudio.
- **Conversa falada em tempo real:** use Voice Live quando o agente precisa ouvir, raciocinar e responder com áudio em uma única experiência.

## Pontos-chave para revisão AI-901

- Voice Live coordena fala de entrada, processamento do agente e fala de saída.
- O SDK dá suporte à conexão e ao streaming de áudio; não substitui microfone e alto-falantes do dispositivo.
- Uma conversa em tempo real precisa tratar eventos, respostas e interrupções.
- O Playground é útil para configurar e experimentar antes da integração.

