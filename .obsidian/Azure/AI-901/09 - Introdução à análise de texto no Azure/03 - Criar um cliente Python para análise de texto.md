---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/sdk
modulo: "09"
titulo: "Criar um cliente Python para análise de texto"
nivel: iniciante
---

# Criar um cliente Python para análise de texto

Um **aplicativo cliente** conecta-se a um modelo ou serviço, envia solicitações e recebe resultados. A API define o contrato de comunicação; um SDK oferece classes e métodos que simplificam a chamada no código.

## Duas opções de integração

| Opção | Uso no módulo | Característica |
|---|---|---|
| **API de Respostas com SDK OpenAI** | Chamar um modelo generativo implantado | Envia prompts e permite análise flexível; a saída depende do modelo e das instruções |
| **SDK Azure Language** | Chamar operações especializadas de linguagem | Métodos específicos, por exemplo detectar idioma ou reconhecer PII, com campos estruturados |

### Modelo generativo

O aplicativo configura endpoint, chave e nome da implantação, cria um cliente e envia uma solicitação pela API de Respostas. O resultado é interpretado pelo próprio aplicativo. Como a saída é gerada probabilisticamente, o texto ou a formatação podem variar entre chamadas.

### Azure Language

O SDK de Python apresentado no módulo usa o pacote **azure-ai-textanalytics** e um cliente **TextAnalyticsClient**. O código configura o endpoint e a credencial e então chama operações, por exemplo:

- **detect_language:** retorna idioma detectado, código ISO 639-1 e pontuação de confiança.
- **recognize_pii_entities:** identifica entidades pessoais e fornece categorias e texto redigido.

## Configuração e segurança

Endpoint, nome da implantação e credenciais são configurações do cliente. O exemplo do Learn carrega esses valores do ambiente, em vez de incorporá-los às chamadas. Mantenha chaves fora do código-fonte e do controle de versão; use armazenamento seguro de segredos e identidade conforme o ambiente.

## Sequência de implementação

1. Criar o recurso e projeto do Foundry.
2. Escolher e implantar o modelo ou acessar a ferramenta de linguagem.
3. Instalar o SDK compatível e configurar endpoint e credenciais.
4. Criar o cliente e chamar a operação ou API adequada.
5. Interpretar os campos retornados e integrá-los ao fluxo do aplicativo.

Para detalhes gerais de endpoint e REST, veja [[07 - Introdução à IA no Azure/05 - Endpoints e Integração com Aplicativos|a nota de endpoints do módulo 07]].

## Pontos-chave para revisão AI-900/AI-901

- API é o contrato; SDK é uma biblioteca cliente que facilita o uso da API.
- A API de Respostas é apropriada para análise flexível baseada em prompts.
- Azure Language SDK oferece métodos específicos e respostas estruturadas.
- O cliente precisa de endpoint e credencial; não grave chaves diretamente no código.

## Fonte

- [Criar um aplicativo cliente que analisa texto — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-text-analysis-azure/3-language-sdk)
