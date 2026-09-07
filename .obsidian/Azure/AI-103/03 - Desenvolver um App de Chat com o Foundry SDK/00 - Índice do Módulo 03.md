---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - sdk
  - moc
modulo: 03
titulo: Desenvolver um aplicativo de chat de IA generativo com o Microsoft Foundry
nivel: iniciante
---

# Desenvolver um App de Chat com o Foundry SDK

Nota de entrada do módulo. Aqui o assunto deixa de ser "qual serviço" e passa a ser **como o código conversa com o modelo**: qual endpoint chamar, qual biblioteca instalar, como autenticar, qual API de chat usar e como manter o contexto entre as rodadas da conversa.

![[m03-fluxo-modulo.png]]

> **Aviso do próprio material:** alguns recursos do Microsoft Foundry estão em versão prévia, então nomes de pacote, formatos de endpoint e parâmetros podem mudar. O que se cobra é o **padrão de arquitetura**, não a assinatura exata de cada função.

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Playground de Modelo e Geração de Código]] | Testar antes de programar e sair do teste com o código pronto |
| 2 | [[02 - Endpoints, SDKs e Autenticação]] | Qual endpoint, qual biblioteca, qual credencial |
| 3 | [[03 - API de Respostas]] | A API recomendada: chamada, parâmetros, estado, streaming e async |
| 4 | [[04 - API de ChatCompletions]] | O padrão estabelecido: papéis de mensagem e histórico manual |
| 5 | [[05 - Respostas x ChatCompletions - Comparação e Decisão]] | Quando usar cada uma, com o código lado a lado |

---

## Mapa mental do módulo em uma frase

> Explore no **playground**, gere o código pela guia **Código**, conecte-se por um dos **dois endpoints** (projeto ou Azure OpenAI) usando um dos **dois SDKs** (Foundry ou OpenAI), autentique de preferência com **Microsoft Entra ID**, e gere respostas com a **API de Respostas** (com estado, recomendada) ou com a **API de ChatCompletions** (sem estado, estabelecida).

---

## Tabela de decisão rápida

| Se o cenário pede… | A resposta é |
|---|---|
| Testar um modelo sem escrever código | **Model playground** no portal |
| Um ponto de partida de código já configurado | Guia **Código** do playground |
| Acessar agentes, avaliações de nuvem ou metadados do projeto | **Endpoint do projeto** + **SDK do Foundry** |
| Reaproveitar código já escrito para a OpenAI | **Endpoint do Azure OpenAI** + **SDK da OpenAI** |
| Rastreamento e observabilidade | **SDK do Microsoft Foundry** |
| Portabilidade entre OpenAI e Azure OpenAI | **SDK da OpenAI** |
| Autenticar sem armazenar segredos | **Microsoft Entra ID** (`DefaultAzureCredential`) |
| Protótipo local rápido | **Chave de API** |
| Trocar de ambiente sem tocar no código | **Variáveis de ambiente** |
| Fixar a versão da API | Cliente **`AzureOpenAI`** com `api_version` |
| Conversa multi-turno sem gerenciar histórico | **API de Respostas** + `previous_response_id` |
| Escolher quais mensagens entram no contexto | **Encadeamento manual** com `input=conversation_history` |
| Manter compatibilidade com código existente | **ChatCompletions** com a lista `messages` |
| Exibir a resposta enquanto ela é gerada | `stream=True` |
| Recuperar uma resposta gerada antes | `responses.retrieve(response_id)` |
| Definir o comportamento do assistente | `instructions` (Respostas) ou papel `system` (ChatCompletions) |

---

## Objetivos de aprendizagem cobertos

- [x] Descrever o processo de criação de um aplicativo de chat de IA generativo com o Microsoft Foundry
- [x] Usar o playground de chat para explorar modelos e gerar exemplos de código
- [x] Escolher um endpoint, um método de autenticação e um SDK de cliente
- [x] Usar a API de Respostas para gerar respostas de IA em aplicativos
- [x] Usar a API de ChatCompletions para gerar respostas de IA em aplicativos

---

## Pré-requisitos assumidos pelo módulo

- Familiaridade com serviços do Azure e com o portal do Azure
- Familiaridade com conceitos e casos de uso de IA generativa
- Experiência com Python ou outra linguagem de programação

---

## Prática recomendada

- [Exercício: Criar um aplicativo de chat de IA generativo](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/06-exercise)

O que vale exercitar, porque vira questão de "como faço X":

1. Gerar o mesmo exemplo na guia **Código** trocando a **API** e depois o **SDK** — e comparar as diferenças.
2. Rodar um loop de chat com `previous_response_id` e observar o modelo lembrar da rodada anterior.
3. Refazer o mesmo loop com ChatCompletions, montando a lista `messages` na mão.
4. Trocar chave de API por `DefaultAzureCredential` e confirmar que o código funciona sem segredo.
5. Ligar `stream=True` e tratar os eventos `response.output_text.delta` e `response.completed`.

---

## Aprofundar na documentação

- [Módulo completo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/)
- Módulo anterior: [[00 - Índice do Módulo 02]]
- Próximo módulo: [[00 - Índice do Módulo 04]]
