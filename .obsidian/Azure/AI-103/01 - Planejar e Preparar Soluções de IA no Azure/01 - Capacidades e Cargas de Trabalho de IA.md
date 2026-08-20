---
tags:
  - AI-103
  - azure/ai
  - conceitos
modulo: 01
---

# Capacidades e Cargas de Trabalho de IA

> **Definição de trabalho.** IA é o conjunto de capacidades de software que permitem a um aplicativo exibir comportamento semelhante ao humano. As soluções modernas são construídas sobre **modelos de aprendizado de máquina** que encapsulam relações semânticas extraídas de grandes volumes de dados — é isso que permite ao aplicativo **interpretar entradas em vários formatos**, **raciocinar sobre dados** e **gerar respostas e previsões apropriadas**.

Reconhecer a carga de trabalho é a primeira decisão de arquitetura: ela determina qual serviço do Azure entra na solução e, em consequência, o custo, a latência e a previsibilidade do resultado.

![[m01-capacidades-ia.png]]

---

## 1. IA Generativa e Agentes

![Diagrama de bolhas de fala e um robô](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/generative-ai.png)

**O que é.** Baseia-se em **LLMs** (*Large Language Models*) capazes de gerar respostas **originais** a prompts em linguagem natural — não apenas classificar ou recuperar conteúdo existente.

**Do que é feito um agente.** Um agente de IA combina três elementos:

| Elemento | Papel |
|---|---|
| **LLM** | O motor de raciocínio e geração |
| **Instruções** | Definem a responsabilidade e os limites da tarefa |
| **Ferramentas** | Dão ao agente acesso a conhecimento e a ações no mundo real |

**Onde aparece:** aplicativos de chat interativo, criação de conteúdo assistida, automação de tarefas, colaboração entre agentes.

**Exemplo real:** um copiloto interno de RH que responde dúvidas sobre política de férias, consulta o sistema de ponto e abre o chamado de solicitação — sem intervenção humana em cada passo.

---

## 2. Processamento de Linguagem Natural (NLP)

![Diagrama de um documento de texto](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/natural-language.png)

**O que é.** Área estabelecida — e **anterior** aos LLMs, que evoluíram dela. Usa **modelos estatísticos e semânticos** para entender linguagem em documentos, e-mails, mensagens de mídia social e outras fontes de texto.

**Por que ainda existe se o LLM faz tudo.** Muitas tarefas de NLP podem, sim, ser feitas por um LLM generativo. Mas há usos especializados — particularmente em **análise de texto** — que se beneficiam de técnicas estatísticas baseadas em **frequência de termos** e de **modelos específicos de tarefa**:

- Classificação de texto
- Análise de sentimento
- Resumo
- Extração de entidades

**Vantagem prática:** custo por chamada menor, resultado determinístico e latência estável em processamento de alto volume.

**Exemplo real:** triagem automática de 40 mil e-mails de suporte por mês, rotulando assunto e urgência — um LLM aqui seria mais caro e menos consistente.

---

## 3. Fala (Speech)

![Diagrama de um usuário com um headset](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/speech.png)

**O que é.** Capacidade de **reconhecer** e **sintetizar** fala, permitindo que aplicativos e agentes interajam por voz.

**O que os avanços recentes resolveram:**

- Interações de conversa complexas (não só comandos isolados)
- Ruído de plano de fundo
- Interrupções do usuário no meio da fala
- Múltiplos idiomas e sotaques

**Aplicações típicas:**

| Aplicação | Descrição |
|---|---|
| Soluções conversacionais | Assistentes e URAs que ouvem e respondem falando |
| Transcrição e análise | De fala ao vivo ou gravada |
| Tradução simultânea | Síntese de fala a partir de texto traduzido |
| Interfaces "ler em voz alta" | Acessibilidade e consumo de conteúdo sem tela |

**Exemplo real:** call center que transcreve as ligações em tempo real e alimenta a análise de sentimento do NLP na mesma esteira.

---

## 4. Visão Computacional

![Diagrama de um olho sendo escaneado](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/computer-vision.png)

**O que é.** Capacidade de aceitar, interpretar e processar **entrada visual**: imagens, vídeos e fluxos de câmera ao vivo.

**Evolução importante:** modelos generativos cada vez mais **multimodais** não apenas *processam* entrada visual — também **geram saída visual** na forma de imagens e vídeos. Isso apaga a fronteira antiga entre "visão computacional" e "IA generativa".

**Exemplo real (o do próprio módulo):** checkout automatizado em supermercado que identifica os produtos na cesta de compras, eliminando a leitura de código de barras e a digitação manual.

---

## 5. Extração de Informações

![Diagrama de um documento e uma lupa](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/information-extraction.png)

**O que é.** A carga de trabalho **combinatória**: junta várias tecnologias de IA para extrair informação estruturada de conteúdo que nasceu não estruturado.

| Tecnologia combinada | Contribuição |
|---|---|
| Modelos generativos | Raciocínio sobre linguagem e contexto |
| NLP | Compreensão de documentos |
| Visão computacional | Leitura de imagens e digitalizações |
| Fala | Análise de mídia gravada |

**Fontes suportadas:** documentos, formulários, imagens, gravações e outros tipos de conteúdo.

**Exemplo real (o do próprio módulo):** aplicativo de prestação de contas de despesas que extrai de cada recibo a **data da compra**, os **itens de linha individuais** e o **custo total**.

---

## Tabela de decisão: cenário → carga de trabalho

| Cenário descrito na questão | Carga de trabalho | Serviço típico no Azure |
|---|---|---|
| "Responder perguntas abertas dos clientes em linguagem natural" | IA generativa | Modelo do catálogo Foundry Models |
| "Executar uma sequência de ações consultando sistemas internos" | Agentes | Foundry Agent Service |
| "Classificar tíquetes por assunto e medir a satisfação" | NLP | Azure Language |
| "Transcrever reuniões e gerar legendas" | Fala | Azure Speech |
| "Publicar o catálogo em 12 idiomas" | NLP / tradução | Azure Translator |
| "Identificar peças defeituosas na esteira por câmera" | Visão computacional | Modelos de visão / Content Understanding |
| "Ler notas fiscais em PDF e lançar no ERP" | Extração de informações | Azure Document Intelligence |
| "Um só pipeline para contratos, fotos e áudios de vistoria" | Extração de informações (multimodal) | Azure Content Understanding |

---

## Pontos que costumam confundir

**LLM não substitui NLP em tudo.** A prova gosta de cenários de **alto volume e tarefa fixa** (classificar, extrair entidade, medir sentimento). Nesses casos a resposta esperada é o serviço especializado, não o modelo generativo — o argumento é **custo e previsibilidade**, não capacidade.

**Agente ≠ modelo.** Um modelo responde a um prompt. Um agente **decide o que fazer**, escolhe ferramentas e executa passos. Se o cenário fala em "autonomia", "executar tarefas" ou "usar ferramentas", a resposta é agente.

**Multimodal derruba fronteiras.** Um cenário que envolve imagem **não implica automaticamente** visão computacional clássica — modelos generativos multimodais também processam e geram imagem. Repare no que o cenário pede: rótulo/detecção (visão especializada) ou interpretação em linguagem natural (generativo multimodal).

**Extração de informações é combinação, não um serviço.** É uma *carga de trabalho* que costuma ser atendida por Document Intelligence ou Content Understanding, frequentemente somados a NLP e a um LLM.

---

## Aprofundar na documentação

- [O que é IA? — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/prepare-azure-ai-development/2-what-is-ai)
- Próxima página: [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]]
