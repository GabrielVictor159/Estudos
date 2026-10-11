---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/azure-foundry
modulo: "07"
titulo: "Desenvolver Aplicativos de IA no Azure"
nivel: iniciante
---


# Desenvolver Aplicativos de IA no Azure

Um aplicativo de IA confiável depende de mais do que um modelo. O Azure oferece recursos para **rede, identidade, segurança, hospedagem, dimensionamento, armazenamento e capacidades de IA**, que podem ser combinados conforme o cenário.

## 1. Rede, identidade e segurança

- **Microsoft Entra ID** fornece identidade para usuários e serviços.
- **RBAC** (*Role-Based Access Control*, controle de acesso baseado em função) limita o que cada identidade pode fazer em recursos, implantações e dados.
- **Rede e isolamento** ajudam a controlar a conectividade entre clientes, serviços e recursos.
- **Azure Key Vault** armazena segredos, como chaves de API, senhas e cadeias de conexão.

O aplicativo precisa autenticar-se ao chamar um endpoint. Uma chave de API é um tipo de segredo; identidades e tokens do Microsoft Entra são outra forma de autenticação, conforme a configuração do serviço. Segredos devem ser obtidos de forma segura e não gravados no código-fonte ou no Git.

## 2. Hospedagem e dimensionamento

Um **host** fornece o ambiente computacional no qual o aplicativo executa. A escolha depende do tipo de aplicação e de sua operação:

| Serviço/capacidade | Uso apresentado no módulo |
|---|---|
| **Azure App Service** | Hospedar aplicações Web, APIs e tarefas em segundo plano |
| **Azure Kubernetes Service (AKS)** | Orquestrar aplicações empacotadas em contêineres |
| **Máquinas virtuais** | Oferecer computação, memória e rede para aplicações que precisam de um ambiente de VM |

**Dimensionar** significa ajustar a capacidade computacional ao volume de trabalho:

- **Horizontal (scale out/in):** adicionar ou remover instâncias do aplicativo.
- **Vertical (scale up/down):** aumentar ou reduzir recursos, como CPU e memória, de uma instância.

O dimensionamento pode ser manual ou automatizado com base em métricas, como CPU ou quantidade de solicitações.

## 3. Armazenamento de dados

Um aplicativo pode manter diferentes tipos de dados, cada um com uma finalidade:

- dados usados para treinar modelos;
- entradas recebidas durante a inferência;
- saídas produzidas pelo modelo;
- estado ou histórico necessário para a continuidade do aplicativo;
- configuração, logs e telemetria;
- informações de identidade, segurança e acesso.

O módulo cita **Azure SQL Database**, **Azure Cosmos DB** e **Azure Database for PostgreSQL** como exemplos de serviços de armazenamento. A escolha depende dos requisitos de dados, disponibilidade, distribuição e escala.

## 4. Capacidades de IA

O Microsoft Foundry oferece recursos para trabalhar com modelos, agentes e ferramentas. Serviços especializados, como fala, visão e linguagem, também podem ser integrados conforme a tarefa.

## Visão integrada

**Aplicativo cliente → rede e identidade → endpoint do recurso de IA → inferência → resposta.** O aplicativo pode consultar armazenamento, registrar telemetria e aplicar lógica de negócio antes de apresentar o resultado.

![[assets/m07-arquitetura-aplicativo.svg]]

*O aplicativo combina hospedagem, conectividade, identidade, recursos de IA, dados e telemetria.*

## Pontos-chave para revisão AI-900/AI-901

- Segurança e conectividade fazem parte da arquitetura de um aplicativo de IA.
- **Entra ID/RBAC** controlam identidade e permissões; **Key Vault** guarda segredos.
- **App Service** atende aplicações Web e APIs; **AKS** orquestra contêineres.
- Escala horizontal adiciona instâncias; escala vertical aumenta recursos de uma instância.
- Dados de treinamento, inferência, estado, configuração e telemetria têm papéis distintos.

## Fonte

[Desenvolvendo aplicativos de IA no Azure — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-ai-in-azure/3-develop-ai-apps)