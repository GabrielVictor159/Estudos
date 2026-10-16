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

## Exemplos de código Python

Os exemplos abaixo usam as duas abordagens do módulo: a API de Respostas para uma análise flexível e o SDK Azure Language para obter campos estruturados.

### Preparar o ambiente

Instale os pacotes em um ambiente virtual Python:

```powershell
python -m pip install openai python-dotenv azure-ai-textanalytics
```

Crie um arquivo `.env` na pasta dos scripts e preencha os valores do seu projeto e implantação:

```dotenv
AZURE_OPENAI_ENDPOINT=https://<recurso>.openai.azure.com/openai/v1/
MODEL_DEPLOYMENT_NAME=<nome-da-implantacao>
AZURE_OPENAI_API_KEY=<chave-do-projeto>
AZURE_LANGUAGE_ENDPOINT=https://<recurso>.cognitiveservices.azure.com/
AZURE_LANGUAGE_KEY=<chave-do-projeto>
```

O nome passado em `MODEL_DEPLOYMENT_NAME` é o nome da implantação no Foundry. Use a chave do projeto para autenticar as chamadas e mantenha o `.env` fora do controle de versão.

### 1. Análise flexível com a API de Respostas

Salve como `analise_generativa.py`:

```python
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    base_url=os.environ["AZURE_OPENAI_ENDPOINT"],
    api_key=os.environ["AZURE_OPENAI_API_KEY"],
)

response = client.responses.create(
    model=os.environ["MODEL_DEPLOYMENT_NAME"],
    input=(
        "Analise o comentário a seguir. Resuma a opinião do cliente em uma frase "
        "e classifique o sentimento como positivo, neutro ou negativo. "
        "Comentário: O atendimento foi rápido e resolveu meu problema."
    ),
)

print(response.output_text)
```

Execute com `python analise_generativa.py`. A resposta é texto gerado pelo modelo; o formato e as palavras podem variar entre chamadas.

### 2. Resultados estruturados com Azure Language

Salve como `analise_language.py`:

```python
import os
from dotenv import load_dotenv
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

load_dotenv()

client = TextAnalyticsClient(
    endpoint=os.environ["AZURE_LANGUAGE_ENDPOINT"],
    credential=AzureKeyCredential(os.environ["AZURE_LANGUAGE_KEY"]),
)

# Detecta o idioma e mostra o nome, o código ISO 639-1 e a confiança.
texto = "Olá! Estou estudando análise de texto no Azure."
idioma = client.detect_language([texto])[0]

if idioma.is_error:
    print("Falha ao detectar o idioma:", idioma.error.message)
else:
    print("Idioma:", idioma.primary_language.name)
    print("Código ISO:", idioma.primary_language.iso6391_name)
    print(f"Confiança: {idioma.primary_language.confidence_score:.2f}")

# Demonstra a detecção e redação de informações pessoais em um texto fictício.
texto_com_pii = (
    "Parker Doe can be reached at 555-555-5555 and lives at 10 Main Street."
)
resultado_pii = client.recognize_pii_entities([texto_com_pii], language="en")[0]

if resultado_pii.is_error:
    print("Falha ao reconhecer PII:", resultado_pii.error.message)
else:
    print("Texto redigido:", resultado_pii.redacted_text)
    print("Categorias encontradas:", ", ".join(
        str(entidade.category) for entidade in resultado_pii.entities
    ))

client.close()
```

Execute com `python analise_language.py`. O serviço retorna propriedades próprias para cada tarefa; em um aplicativo real, evite registrar o texto original ou valores pessoais nos logs.

### Como escolher

- Use a **API de Respostas** quando a análise puder ser expressa por instruções e você precisar de uma resposta flexível em linguagem natural.
- Use **Azure Language** quando a aplicação precisar de operações específicas, como idioma ou PII, e de propriedades estruturadas para tratar cada resultado.
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
- [Biblioteca Azure Text Analytics para Python — Microsoft Learn](https://learn.microsoft.com/en-us/python/api/overview/azure/ai-textanalytics-readme)
- [API de Respostas no Microsoft Foundry — Microsoft Learn](https://learn.microsoft.com/en-us/azure/foundry/openai/api-version-lifecycle)
