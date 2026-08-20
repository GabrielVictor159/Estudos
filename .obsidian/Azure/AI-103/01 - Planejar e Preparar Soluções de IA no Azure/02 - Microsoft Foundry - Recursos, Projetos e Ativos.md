---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - arquitetura
modulo: 01
---

# Microsoft Foundry — Recursos, Projetos e Ativos

O **Microsoft Foundry** é a plataforma de desenvolvimento de IA no Azure. Ele fornece **organização de projetos**, **gerenciamento de recursos** e **capacidades dedicadas ao desenvolvimento de IA** — e é a **forma recomendada** de construir soluções de IA no Azure, com exceção das mais simples.

Existe em duas formas de acesso, sobre a mesma base:

| Forma de acesso | Para quê |
|---|---|
| **Portal do Microsoft Foundry** | Interface visual baseada na web: criar, implantar, testar, configurar |
| **SDK do Microsoft Foundry** | Criar e gerenciar os mesmos ativos por código, inclusive em CI/CD |

![[m01-arquitetura-foundry.png]]

---

## Recurso × Projeto — a distinção central

Esta é a distinção que mais aparece em questões de arquitetura.

| | **Recurso do Microsoft Foundry** | **Projeto do Microsoft Foundry** |
|---|---|---|
| O que é | Um recurso do Azure, dentro de uma assinatura e grupo de recursos | Um escopo de trabalho **filho** do recurso |
| Responsabilidade | Cobrança, segurança, hospedagem das ferramentas e agentes | Agrupar os ativos de **uma** solução |
| Cardinalidade | Um recurso pode conter **vários** projetos | Cada projeto pertence a **um único** recurso |
| Observação | — | Um dos projetos é designado **projeto padrão** |

**Consequência prática:** isolar duas soluções diferentes = dois projetos. Isolar cobrança, região ou fronteira de segurança = dois recursos.

---

## Os quatro tipos de ativo de um projeto

### Modelos

Implantações de LLMs baseadas no catálogo **Foundry Models**, que reúne modelos da **Microsoft**, da **OpenAI** e de **outros provedores**.

O acesso a um modelo implantado se dá por dois caminhos:

| Caminho | Quando usar |
|---|---|
| **Endpoint do projeto** | Com as APIs e SDKs específicos do Foundry |
| **Endpoint do Azure OpenAI** | Com as APIs e SDKs da OpenAI (sintaxe OpenAI) |

### Agentes

Configurações **nomeadas** de IA que encapsulam **um LLM + instruções + ferramentas**. Definem entidades de IA autônomas capazes de:

- automatizar tarefas;
- colaborar com usuários e **com outros agentes**.

São desenvolvidos e consumidos pelo **Microsoft Foundry Agent Service**, no endpoint do projeto.

### Ferramentas

Dão ao agente acesso a conhecimento e a ações. Duas categorias:

| Categoria | Exemplos |
|---|---|
| **Ferramentas internas** | Pesquisa na web, interpretador de código, análise de texto, reconhecimento e síntese de fala, tradução, compreensão de conteúdo |
| **Personalizadas / de terceiros** | Conectadas via **MCP** (*Model Context Protocol* / Protocolo de Contexto de Modelo) |

As ferramentas do Foundry são **hospedadas no próprio recurso Foundry** — você não provisiona a infraestrutura delas.

### Conhecimento

Agentes se conectam a repositórios de conhecimento **por meio de ferramentas**, para contextualizar (aterrar) os prompts com dados próprios.

O **Foundry IQ** simplifica isso: cria uma **conexão de conhecimento central baseada em MCP** que integra múltiplas fontes de conhecimento, em vez de o time cabear cada fonte individualmente.

---

## Como o aplicativo cliente se conecta

| Endpoint | Biblioteca típica | Serve para |
|---|---|---|
| **Endpoint do projeto** | SDK do Microsoft Foundry | Agentes, Foundry IQ, ativos do projeto |
| **Endpoint do Azure OpenAI** | SDK / API da OpenAI | Chat, embeddings — sintaxe OpenAI |
| **Endpoint da ferramenta** | SDK específico da ferramenta ou REST | Consumir uma Foundry Tool |

**Autenticação:** chave de API do projeto (mais simples) **ou** autenticação baseada em token do **Microsoft Entra ID** / identidade gerenciada (recomendada em produção).

---

## O que o portal entrega

O portal é o ponto de partida da maioria dos projetos de IA.

| Área do portal | O que você faz nela |
|---|---|
| **Modelos** | Localizar, **comparar**, implantar e testar modelos |
| **Agentes** | Criar e testar agentes |
| **Conexões MCP** | Criar conexões com ferramentas e com fontes de conhecimento do Foundry IQ |
| **Ferramentas Foundry** | Explorar e testar as ferramentas disponíveis |
| **Configuração** | Gerenciar a configuração do recurso e o acesso de usuários |
| **Endpoints e chaves** | Obter os dados que o aplicativo cliente precisa para se conectar |

![Captura de tela do portal do Foundry](https://learn.microsoft.com/pt-br/training/wwl-data-ai/prepare-azure-ai-development/media/foundry-portal.png)

---

## Automação com o SDK

O **SDK do Microsoft Foundry** permite fazer por código o que o portal faz pela interface:

- automatizar operações de projeto;
- criar e gerenciar ativos via script;
- executar ações automatizadas em **pipelines de CI/CD de DevOps**.

**Regra de bolso:** portal para explorar e prototipar; SDK para reproduzir o ambiente de forma repetível.

---

## Arquitetura nova × clássica (baseada em hub)

| | **Nova (recomendada)** | **Clássica (legada)** |
|---|---|---|
| Base | Projetos modernos, filhos de um recurso Foundry | Baseada em **hub** |
| Portal | Nova interface, ainda em transição | Interface anterior |
| Status | Padrão para projetos novos | Suporte limitado; ainda usada por soluções existentes |
| Ressalva | Algumas tarefas ainda não são suportadas no novo portal | — |

Se uma questão mencionar **hub**, ela está falando da arquitetura **clássica**. Documentação: [Microsoft Foundry (clássico)](https://learn.microsoft.com/pt-br/azure/foundry-classic/what-is-foundry?azure-portal=true).

---

## Tabela de decisão: usar o Foundry ou um recurso individual?

| Situação | Escolha |
|---|---|
| Praticamente qualquer solução de IA que não seja trivial | **Recurso do Microsoft Foundry com projeto** |
| Preciso organizar modelos, agentes e ferramentas no mesmo lugar | **Foundry** |
| Vou usar agentes ou conhecimento aterrado (Foundry IQ) | **Foundry** — o Agent Service depende do projeto |
| Preciso de gestão centralizada de acesso e de cobrança | **Foundry** |
| Vou reproduzir o ambiente por CI/CD | **Foundry + SDK** |
| Consumo pontual de **uma única** ferramenta, sem gestão centralizada | Recurso individual da ferramenta é aceitável |
| Protótipo descartável muito simples | Recurso individual é aceitável |

---

## Pontos que costumam confundir

**"Recurso" e "projeto" não são sinônimos.** Recurso = contêiner de cobrança/hospedagem no Azure. Projeto = escopo de trabalho onde vivem os ativos. Um recurso, vários projetos.

**Projeto padrão.** Ao criar o recurso, um projeto já nasce marcado como padrão — não é preciso criá-lo manualmente.

**Ferramenta não é agente.** A ferramenta é uma capacidade que o agente **usa**. O agente é a configuração que combina modelo, instruções e ferramentas.

**MCP é o mecanismo de conexão externa.** Sempre que o cenário falar em conectar uma ferramenta de terceiro ou uma fonte de conhecimento externa, o vocabulário esperado é **MCP** — e, para conhecimento agregado, **Foundry IQ**.

**Dois endpoints para o mesmo modelo.** O mesmo modelo implantado pode ser chamado pelo endpoint do projeto (SDK Foundry) ou pelo endpoint do Azure OpenAI (SDK OpenAI). A escolha é sobre **qual biblioteca o app já usa**, não sobre capacidade.

**Chave é o caminho simples, Entra ID é o caminho de produção.** Cenários que mencionam "sem armazenar segredos" ou "identidade gerenciada" apontam para token do Microsoft Entra ID.

---

## Aprofundar na documentação

- [Microsoft Foundry — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/prepare-azure-ai-development/4-azure-ai-foundry)
- [Visão geral do SDK do Microsoft Foundry](https://learn.microsoft.com/pt-br/azure/foundry/how-to/develop/sdk-overview?azure-portal=true)
- [Microsoft Foundry (clássico)](https://learn.microsoft.com/pt-br/azure/foundry-classic/what-is-foundry?azure-portal=true)
- Páginas relacionadas: [[03 - Foundry Tools - Capacidades Prontas de IA]] · [[04 - Ferramentas de Desenvolvimento e SDKs]]
