---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/azure-foundry
modulo: "07"
titulo: "Microsoft Foundry para IA"
nivel: iniciante
---


# Microsoft Foundry para IA

O **Microsoft Foundry** é uma plataforma como serviço (PaaS) para criar, implantar e gerenciar aplicativos e agentes de IA no Azure. Ele reúne modelos, ferramentas e recursos de desenvolvimento em projetos, apoiados por infraestrutura e controles de segurança do Azure.

## 1. O que a plataforma reúne

| Capacidade | Para que serve |
|---|---|
| **Modelos** | Escolher modelos disponíveis no catálogo, implantá-los e testá-los |
| **Agentes** | Usar modelos, instruções e ferramentas para raciocinar sobre entradas e executar tarefas |
| **Ferramentas** | Acrescentar capacidades como fala, visão, linguagem e integração com outros serviços |
| **Conhecimento** | Conectar fontes de dados para fornecer contexto a modelos ou agentes |
| **Avaliação e monitoramento** | Verificar resultados e acompanhar a operação dos ativos de IA |

O **Foundry IQ** é apresentado como uma camada de conhecimento que pode conectar fontes de dados e fornecer informações fundamentadas a agentes, respeitando permissões configuradas.

## 2. Recurso e projeto

- Um **recurso do Foundry** é um recurso do Azure que fornece a plataforma e os serviços necessários para soluções de IA.
- Um **projeto do Foundry** é o espaço de trabalho dentro do recurso em que uma solução organiza seus ativos, como agentes, arquivos, conjuntos de dados, índices e conexões.
- Um recurso pode conter vários projetos, por exemplo, para separar casos de uso.

**Regra de leitura:** recurso é a base de plataforma no Azure; projeto é o espaço de trabalho para organizar uma solução.

![[assets/m07-organizacao-foundry.svg]]

*O recurso contém projetos; cada projeto reúne os ativos de uma solução.*

## 3. Portal e fluxo de desenvolvimento

O portal Web do Foundry permite explorar modelos e ferramentas, criar projetos, testar modelos e gerenciar ativos. Um fluxo inicial de trabalho é:

1. Criar ou abrir um projeto do Foundry.
2. Selecionar um modelo no catálogo e implantá-lo.
3. Usar o playground para enviar prompts e observar as respostas.
4. Conectar o modelo ou outros ativos ao aplicativo cliente.

O SDK permite executar ações programaticamente, integrar ativos ao código e automatizar fluxos de desenvolvimento.

## Pontos-chave para revisão AI-900/AI-901

- Foundry é uma plataforma para desenvolver e operar soluções de IA; não é apenas um modelo.
- O projeto organiza os ativos usados pela solução; o recurso do Azure fornece a plataforma que hospeda os projetos.
- O playground serve para experimentar prompts e testar modelos antes de integrá-los ao aplicativo.
- Agentes podem usar ferramentas e fontes de conhecimento além da geração direta de texto.

## Fontes

- [Microsoft Foundry para IA — Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-ai-in-azure/4-microsoft-foundry)
- [Guia de estudo AI-901 — habilidades de implementação com Microsoft Foundry](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901/)