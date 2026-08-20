---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - servicos
modulo: 01
---

# Foundry Tools — Capacidades Prontas de IA

Nem toda solução de IA precisa de um modelo generativo. As **Foundry Tools** são capacidades de IA **prontas para uso** (*off-the-shelf*), acessadas por API, que resolvem tarefas comuns de forma **mais econômica e mais previsível** do que um LLM.

![[m01-foundry-tools.png]]

---

## Quando escolher ferramenta, modelo ou agente

![[m01-decisao-abordagem.png]]

O critério não é "o que é mais poderoso", e sim **o que é suficiente**. Um LLM consegue extrair a data de um recibo — mas se são milhares de recibos por dia, com layout conhecido, o Document Intelligence entrega o mesmo resultado com custo menor, latência estável e sem risco de alucinação.

---

## As cinco ferramentas

### Azure Language

![Ícone de Idioma do Azure](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/azure-language.png)

Modelos e APIs para **analisar linguagem natural** em texto.

| Capacidade | Uso típico |
|---|---|
| Extração de entidades | Identificar nomes, datas, produtos, valores em texto livre |
| Análise de sentimento | Medir satisfação em avaliações e tíquetes |
| Resumo de texto | Condensar documentos e conversas longas |
| Modelos de linguagem conversacional | Reconhecer **intenções** e entidades em falas de usuário |
| Respostas a perguntas (Q&A) | Base de conhecimento pergunta/resposta |

**Exemplo real:** roteamento de tíquetes de suporte por intenção e escalonamento automático quando o sentimento é negativo.

---

### Azure Speech

![Ícone de Fala do Azure](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/azure-speech.png)

APIs para converter entre **áudio e texto**.

| Capacidade | Uso típico |
|---|---|
| Fala para texto (STT) | Transcrição de ligações, ditado |
| Texto para fala (TTS) | Respostas faladas, leitura de conteúdo |
| Fala em tempo real | Legendas ao vivo, tradução simultânea |
| Suporte a apps conversacionais | Camada de voz de assistentes e agentes |

**Exemplo real:** URA que entende o pedido do cliente por voz, responde falando e transcreve tudo para auditoria.

---

### Azure Translator

![Ícone do Tradutor do Azure](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/azure-translator.png)

**Tradução de texto** entre múltiplos idiomas, com modelos de última geração.

**Exemplo real:** e-commerce que publica automaticamente descrições de produto em doze idiomas mantendo o glossário de marca.

---

### Azure Document Intelligence

![Ícone do Azure Document Intelligence](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/azure-document-intelligence.png)

**Extração de dados de documentos** com estrutura conhecida ou aprendida.

| Recurso | Detalhe |
|---|---|
| Modelos pré-configurados | Faturas, recibos, formulários comuns — funcionam sem treino |
| Modelos personalizados | Treinados com os documentos da própria organização |
| Saída | Campos, pares chave-valor e tabelas estruturadas |

**Exemplo real:** contas a pagar processando notas fiscais em PDF e lançando os campos direto no ERP.

---

### Azure Content Understanding

![Ícone de Compreensão de Conteúdo do Azure](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/azure-content-understanding.png)

**Análise multimodal** de conteúdo — o serviço abrangente quando a entrada não é de um único tipo.

| Entrada suportada | Exemplo |
|---|---|
| Formulários e documentos | Contratos digitalizados |
| Imagens | Fotos de vistoria |
| Vídeos | Gravações de inspeção |
| Fluxos de áudio | Reuniões, ligações |

**Exemplo real:** pipeline único de análise de sinistro que recebe o contrato em PDF, as fotos do veículo e o áudio da chamada de aviso.

---

## Tabela de decisão: cenário → ferramenta

| O cenário pede… | Ferramenta |
|---|---|
| Detectar o idioma de uma mensagem recebida | **Azure Language** (ou Translator para tradução em seguida) |
| Saber se um comentário é positivo ou negativo | **Azure Language** — análise de sentimento |
| Descobrir a intenção por trás de uma frase do usuário | **Azure Language** — linguagem conversacional |
| Responder perguntas frequentes a partir de uma base curada | **Azure Language** — Q&A |
| Gerar áudio a partir de um texto | **Azure Speech** — TTS |
| Transcrever uma reunião gravada | **Azure Speech** — STT |
| Traduzir um catálogo para vários idiomas | **Azure Translator** |
| Ler campos de uma fatura padronizada | **Azure Document Intelligence** — modelo pré-configurado |
| Ler um formulário interno com layout próprio | **Azure Document Intelligence** — modelo personalizado |
| Processar documento, imagem, vídeo e áudio no mesmo fluxo | **Azure Content Understanding** |
| Redigir uma resposta original ao cliente | Nenhuma delas — **modelo generativo** |

---

## Como as ferramentas são provisionadas e consumidas

**Provisionamento.** Cada ferramenta ainda pode ser criada como um **recurso do Azure separado**, mas a recomendação para projetos novos é consumi-las **por meio do recurso do Microsoft Foundry**, junto com os demais ativos.

**Conexão.** O cliente se conecta ao **endpoint específico da ferramenta** no recurso Foundry e autentica com:

- **chave de autenticação** do projeto, **ou**
- **autenticação baseada em token** (Microsoft Entra ID).

**Formas de acesso:** APIs específicas por ferramenta, SDKs específicos por ferramenta e — para algumas delas — interface do portal Foundry para configuração e teste.

---

## Nomenclatura histórica (cai em prova)

As Foundry Tools já foram chamadas de:

1. **Serviços Cognitivos do Azure** (*Azure Cognitive Services*) — nome mais antigo
2. **Serviços de IA do Azure** (*Azure AI services*) — nome intermediário
3. **Foundry Tools** — nome atual

Os nomes antigos **ainda aparecem** em pacotes de SDK, namespaces e endpoints REST. Uma questão que cite "Azure AI services" ou "Cognitive Services" está falando das mesmas capacidades descritas aqui.

---

## Pontos que costumam confundir

**Ferramenta pronta vence LLM em tarefa fixa.** Quando o cenário enfatiza **volume**, **custo**, **previsibilidade** ou **conformidade**, a resposta esperada é a ferramenta especializada.

**Document Intelligence × Content Understanding.** Document Intelligence é focado em **documentos**; Content Understanding é **multimodal** (documento + imagem + vídeo + áudio). Se o cenário lista tipos de mídia diferentes, é Content Understanding.

**Language cobre muita coisa.** Sentimento, entidades, resumo, intenções e Q&A estão todos sob o mesmo serviço — não são serviços separados.

**Ferramenta também vira ferramenta de agente.** As mesmas capacidades (análise de texto, fala, tradução, compreensão de conteúdo) aparecem como **ferramentas internas** que um agente pode invocar — ver [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]].

---

## Aprofundar na documentação

- [Ferramentas do Foundry — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/prepare-azure-ai-development/3-azure-ai-services)
- [Recursos de pacotes de SDK dos serviços de IA](https://learn.microsoft.com/pt-br/azure/ai-services/reference/sdk-package-resources?azure-portal=true)
- [Recursos de REST API dos serviços de IA](https://learn.microsoft.com/pt-br/azure/ai-services/reference/rest-api-resources?azure-portal=true)
- Páginas relacionadas: [[01 - Capacidades e Cargas de Trabalho de IA]] · [[04 - Ferramentas de Desenvolvimento e SDKs]]
