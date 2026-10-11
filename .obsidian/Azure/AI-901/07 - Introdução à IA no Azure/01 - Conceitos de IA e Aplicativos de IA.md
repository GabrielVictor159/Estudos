---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/azure-foundry
modulo: "07"
titulo: "Conceitos de IA e Aplicativos de IA"
nivel: iniciante
---


# Conceitos de IA e Aplicativos de IA

**Inteligência artificial (IA)** é a área que cria sistemas capazes de executar tarefas que normalmente exigem capacidades humanas, como percepção, raciocínio, resolução de problemas e compreensão da linguagem. Um **aplicativo de IA** usa modelos e outras técnicas de IA para processar entradas e produzir previsões, conteúdo ou decisões.

## 1. Modelos de aprendizado de máquina

Muitos aplicativos de IA são alimentados por **modelos de aprendizado de máquina (ML)**. Um modelo é um sistema matemático treinado com dados para reconhecer padrões e produzir saídas.

| Etapa | O que acontece |
|---|---|
| **Treinamento** | O modelo analisa exemplos e ajusta seus parâmetros para aprender padrões nos dados. |
| **Inferência** | O modelo aplica o que aprendeu a uma nova entrada e produz uma saída, como uma previsão, classificação ou resposta. |
| **Retreinamento/ajuste fino** | O modelo pode ser treinado novamente ou ajustado para melhorar ou adaptar seu comportamento. |

![[assets/m07-treinamento-inferencia.svg]]

*O treinamento prepara o modelo; a inferência aplica o modelo treinado a novas entradas.*

**Distinção importante:** durante a inferência, o modelo usa o que aprendeu; uma chamada comum ao aplicativo não significa que ele esteja aprendendo ou alterando seus parâmetros.

## 2. Componentes de um aplicativo de IA

O modelo é o mecanismo que interpreta a entrada, mas não constitui sozinho o aplicativo. Uma solução completa também pode precisar de:

- interface para receber entradas e mostrar resultados;
- lógica do aplicativo para preparar solicitações e processar respostas;
- armazenamento de dados e estado da aplicação;
- hospedagem e recursos de computação;
- rede, identidade, autenticação e controles de acesso;
- monitoramento, logs e telemetria.

Entradas podem incluir texto, voz ou imagens. Saídas podem incluir texto, imagens, áudio, previsões ou decisões, conforme a tarefa e as capacidades do modelo.

## 3. Exemplos de aplicativos de IA

- **Saúde:** analisar imagens médicas para auxiliar profissionais a identificar sinais de doença.
- **Finanças:** monitorar transações e identificar padrões possivelmente fraudulentos.
- **Varejo:** recomendar produtos com base em preferências e comportamento.
- **Manufatura:** analisar dados de equipamentos para prever falhas.
- **Educação:** adaptar explicações e atividades ao ritmo do estudante.

Em cada cenário, a IA auxilia uma tarefa específica. A aplicação ainda precisa receber dados, chamar os recursos corretos e apresentar o resultado de forma útil.

## Pontos-chave para revisão AI-900/AI-901

- **Modelo de ML** aprende padrões durante o treinamento.
- **Inferência** é o uso do modelo treinado para processar novas entradas.
- Um aplicativo de IA inclui mais componentes do que o modelo: dados, lógica, hospedagem, rede, segurança e interface também importam.
- Modelos podem gerar conteúdo, previsões ou classificações, dependendo de sua capacidade e do caso de uso.

## Fonte

[Introdução — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-ai-in-azure/1-introduction)