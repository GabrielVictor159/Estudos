---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/azure-foundry
modulo: "07"
titulo: "Endpoints e Integração com Aplicativos"
nivel: iniciante
---


# Endpoints e Integração com Aplicativos



Um modelo ou projeto do Foundry é hospedado na nuvem e pode ser consumido por um aplicativo cliente por meio de um **endpoint de API**. O endpoint é o endereço de rede que recebe solicitações programáticas e devolve respostas; ele não é uma página Web para navegação humana.

## 1. Cliente, endpoint e servidor

- **Cliente:** aplicativo com que a pessoa interage; coleta a entrada, prepara a solicitação e apresenta o resultado.
- **Endpoint:** ponto de entrada para o serviço. Identifica onde o cliente deve enviar a solicitação.
- **Servidor/implantação:** recebe a solicitação, executa inferência no modelo e devolve a saída.

**Fluxo:** entrada do usuário → solicitação ao endpoint → inferência no modelo hospedado → resposta da API → apresentação ao usuário.

## 2. API REST e formato da solicitação

Uma API define as operações permitidas, os dados que devem ser enviados e o formato da resposta. Os endpoints do Foundry podem ser consumidos por interfaces REST sobre HTTP(S):

- cabeçalhos transportam informações como autenticação e tipo de conteúdo;
- o corpo da solicitação costuma carregar os dados da entrada em JSON;
- o serviço retorna uma resposta que pode conter texto ou outra saída do modelo.

O aplicativo precisa usar o endpoint e a implantação corretos, além do formato esperado pela API.

## 3. Autenticação

Endpoints protegidos exigem que a solicitação comprove que o aplicativo pode acessar o recurso. O módulo apresenta duas opções comuns:

- **Chave de API:** enviada conforme os requisitos do endpoint e guardada como segredo.
- **Microsoft Entra ID:** token obtido com credenciais ou identidade autorizada.

Não inclua chaves diretamente no código ou em repositórios. Para aplicações no Azure, o Key Vault e identidades gerenciadas são mecanismos para armazenar ou obter credenciais com mais segurança.

## 4. SDKs

Um **SDK** oferece bibliotecas para uma linguagem de programação e abstrai parte do trabalho com chamadas REST. Em vez de montar manualmente cada solicitação HTTP, o desenvolvedor usa métodos e tipos da biblioteca, mantendo a necessidade de configurar endpoint, autenticação, modelo e entrada corretamente.

| Opção | Característica |
|---|---|
| **REST diretamente** | Controle explícito sobre HTTP, cabeçalhos e corpo JSON |
| **SDK** | Camada de conveniência que cria chamadas REST para uma linguagem, como Python, JavaScript ou C# |

## Sequência de implementação

1. Obter o endpoint e identificar a implantação/modelo.
2. Escolher REST ou o SDK compatível.
3. Configurar autenticação segura.
4. Enviar uma entrada/prompt no formato esperado.
5. Interpretar e apresentar a resposta retornada.

![[assets/m07-endpoint-fluxo.svg|700]]

*REST e SDKs são formas de enviar uma solicitação autenticada ao endpoint e receber a resposta do modelo.*

## Pontos-chave para revisão AI-900/AI-901

- Endpoint é o ponto de entrada de API para código cliente.
- REST usa solicitações HTTP e dados estruturados, frequentemente JSON.
- A autenticação pode usar chave de API ou token do Microsoft Entra, de acordo com o endpoint.
- SDKs simplificam a chamada REST; eles não removem a necessidade de endpoint e autenticação.
- O aplicativo cliente coleta entradas e apresenta saídas; o modelo hospedado no serviço executa inferência.

## Fontes

- [Usando endpoints do Microsoft Foundry — Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-ai-in-azure/5-endpoints)
- [Guia de estudo do AI-901 — familiaridade com REST e SDKs](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901/)