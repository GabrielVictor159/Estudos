---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - desenvolvimento
modulo: 01
---

# Ferramentas de Desenvolvimento e SDKs

Montar o ambiente de um projeto de IA no Azure é uma sequência de quatro escolhas: **onde escrever o código**, **em qual linguagem**, **com qual biblioteca de acesso** e **contra qual endpoint**.

![[m01-ferramentas-sdks.png]]

---

## 1. Ambientes de desenvolvimento

| Ambiente | Perfil |
|---|---|
| **Microsoft Visual Studio** | IDE completa para aplicações .NET e desenvolvimento Windows |
| **Visual Studio Code** | Editor multiplataforma, com suporte a várias linguagens e bibliotecas de código aberto |
| **Portal do Microsoft Foundry** | Sem código: playgrounds para testar modelos e agentes antes de programar |

### Foundry Toolkit para Visual Studio Code

![Extensão do Foundry Toolkit para VS Code](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/vs-code.png)

Extensão que traz o projeto do Foundry para dentro do editor. O que ela permite:

- **Navegar e gerenciar os recursos do projeto** — modelos implantados, agentes, conexões e repositórios de vetores
- **Implantar modelos** a partir do catálogo de modelos
- **Testar modelos e agentes** em playgrounds integrados
- **Configurar agentes** declarativos e hospedados, por designer visual e por arquivos **YAML**
- **Gerar o código de integração** que conecta os agentes ao aplicativo

> Documentação: [Foundry Toolkit para Visual Studio Code](https://code.visualstudio.com/docs/intelligentapps/overview?azure-portal=true)

### GitHub e GitHub Copilot

![GitHub Copilot no VS Code](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/github-copilot.png)

O **GitHub** tem integração nativa tanto no Visual Studio quanto no VS Code. O **GitHub Copilot** atua como assistente de IA para aumentar a produtividade e a eficácia do desenvolvedor dentro desses dois ambientes.

> Documentação: [GitHub Copilot no VS Code](https://code.visualstudio.com/docs/copilot/overview?azure-portal=true)

---

## 2. Linguagens suportadas

**C#**, **Python**, **Node.js**, **TypeScript**, **Java** e outras. Onde não houver SDK, o acesso é por **REST API** — o que torna praticamente qualquer linguagem viável.

---

## 3. Bibliotecas de acesso (APIs e SDKs)

| Biblioteca | Serve para | Escolha quando |
|---|---|---|
| **SDK do Microsoft Foundry** | Conectar-se a projetos do Foundry e acessar ativos específicos do Foundry — **agentes** e repositórios de conhecimento do **Foundry IQ** | O app conversa com agentes ou precisa dos recursos do projeto; automação de projeto e CI/CD |
| **API da OpenAI (Azure OpenAI)** | Criar aplicações de chat sobre modelos do Foundry usando a **sintaxe da OpenAI** | O código já foi escrito para a OpenAI, ou a equipe conhece essa sintaxe |
| **SDKs das Foundry Tools** | Consumir os recursos das Foundry Tools na assinatura — bibliotecas **específicas por serviço**, em várias linguagens e frameworks | O app usa uma ferramenta pronta (Speech, Language, Translator, Document Intelligence…) |
| **REST APIs** | Equivalente HTTP de tudo acima, sem dependência de SDK | Não existe SDK para a pilha usada, ou a integração é leve |

**Documentação de referência:**

- [Visão geral do SDK do Microsoft Foundry](https://learn.microsoft.com/pt-br/azure/foundry/how-to/develop/sdk-overview?azure-portal=true)
- [API do Azure OpenAI](https://learn.microsoft.com/pt-br/azure/foundry/openai/latest?azure-portal=true)
- [Recursos de pacotes de SDK](https://learn.microsoft.com/pt-br/azure/ai-services/reference/sdk-package-resources?azure-portal=true)
- [Recursos de REST API](https://learn.microsoft.com/pt-br/azure/ai-services/reference/rest-api-resources?azure-portal=true)

---

## 4. Destino: o recurso do Microsoft Foundry

Todas as bibliotecas acima terminam no mesmo lugar — o **recurso do Microsoft Foundry**, que hospeda modelos implantados, agentes, ferramentas e conhecimento. A autenticação é por **chave do projeto** ou por **token do Microsoft Entra ID**. Detalhes de endpoint em [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]].

---

## Tabela de decisão: preciso de… → uso…

| Necessidade | Ferramenta / SDK |
|---|---|
| Testar rapidamente se um modelo atende, sem escrever código | Playground do **portal do Foundry** |
| Comparar dois modelos antes de implantar | Catálogo de modelos no **portal** |
| Implantar um modelo sem sair do editor | **Foundry Toolkit** para VS Code |
| Definir um agente em arquivo versionável | **Foundry Toolkit** — configuração em **YAML** |
| Chamar um agente a partir de uma API .NET | **SDK do Microsoft Foundry** (C#) |
| Migrar um app que já usa a biblioteca da OpenAI | **SDK da OpenAI** apontando para o endpoint do **Azure OpenAI** |
| Transcrever áudio em um serviço Python | **SDK do Azure Speech** |
| Recriar todo o ambiente em outra assinatura por pipeline | **SDK do Microsoft Foundry** em **CI/CD** |
| Integrar a partir de uma linguagem sem SDK oficial | **REST API** |

---

## Pontos que costumam confundir

**Toolkit ≠ SDK.** O **Foundry Toolkit** é uma extensão do VS Code (interface de desenvolvimento); o **SDK do Microsoft Foundry** é a biblioteca que o código do aplicativo usa em tempo de execução.

**SDK do Foundry × SDK da OpenAI.** Se o cenário fala em **agentes** ou **Foundry IQ**, é o SDK do Foundry. Se fala em **chat com sintaxe OpenAI** ou em reaproveitar código existente da OpenAI, é o SDK da OpenAI sobre o endpoint do Azure OpenAI.

**Ferramenta pronta tem SDK próprio.** Consumir Speech ou Document Intelligence não passa pelo SDK do Foundry — cada ferramenta tem sua biblioteca específica (e os pacotes ainda carregam os nomes antigos, ver [[03 - Foundry Tools - Capacidades Prontas de IA]]).

**REST sempre existe.** A ausência de SDK para uma linguagem nunca é motivo para descartar um serviço na prova; a resposta é a REST API.

**Portal para explorar, SDK para reproduzir.** Cenários que mencionam **DevOps**, **repetibilidade** ou **ambientes múltiplos** apontam para o SDK, nunca para o portal.

---

## Aprofundar na documentação

- [Ferramentas de desenvolvedor e SDKs — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/prepare-azure-ai-development/5-tools-and-sdks)
- Páginas relacionadas: [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]] · [[05 - IA Responsável - Princípios e Aplicação]]
