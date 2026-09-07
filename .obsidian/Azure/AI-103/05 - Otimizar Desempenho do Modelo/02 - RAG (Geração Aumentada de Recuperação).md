---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - RAG
  - embeddings
  - azure-ai-search
  - otimização
modulo: 05
---

# RAG (Geração Aumentada de Recuperação)

A engenharia de prompt ajuda a orientar *como* o modelo responde, mas **não pode dar ao modelo conhecimento que ele não tem**. Os dados de treinamento têm uma data de corte e não incluem informações privadas da organização. Sem contexto relevante, o modelo pode gerar respostas que soam plausíveis mas são factualmente incorretas — é a **alucinação**.

**RAG** (Retrieval-Augmented Generation) resolve isso: recupera dados relevantes de uma fonte externa e os injeta no prompt antes da geração.

![[m05-rag-pipeline.jpg]]

---

## O problema do modelo sem fundamentação

| Cenário | Sem fundamentação | Com fundamentação (RAG) |
|---|---|---|
| "Quais hotéis vocês oferecem em Paris?" | Pode inventar nomes de hotéis fictícios | Responde com nomes, preços e disponibilidade reais do catálogo |
| "Qual é a política de reembolso?" | Resposta genérica baseada em dados de treinamento | Resposta precisa baseada no documento de política da empresa |

![[m05-sem-grounding.png]]
*Modelo sem fundamentação — resposta baseada apenas nos dados de treinamento.*

![[m05-com-grounding.png]]
*Modelo com fundamentação (grounding) — resposta baseada em dados reais fornecidos via RAG.*

---

## As três etapas do RAG

```
1. RECUPERAR (Retrieve)
   Pesquisar informações relevantes na fonte de dados
   usando a pergunta do usuário como consulta
                    ↓
2. AUMENTAR (Augment)
   Adicionar a informação recuperada como contexto ao prompt
   (tipicamente na mensagem de sistema)
                    ↓
3. GERAR (Generate)
   Enviar o prompt aumentado ao modelo para gerar
   uma resposta fundamentada nos dados reais
```

---

## Embeddings e pesquisa vetorial

### O que são embeddings

Uma **embedding** (inserção) é uma representação matemática do texto como um **vetor** — uma lista de números de ponto flutuante que captura o **significado semântico** de palavras, frases ou documentos.

Exemplo: estas frases usam palavras diferentes mas têm significados semelhantes:
- *"As crianças brincavam alegremente no parque."*
- *"Garotos corriam felizes pelo playground."*

Quando você cria embeddings para cada uma, seus vetores ficam **próximos no espaço multidimensional**, refletindo a similaridade semântica.

![[m05-vector-embeddings.jpg]]

### Similaridade cosseno

A **similaridade cosseno** mede a proximidade entre dois vetores calculando o ângulo entre eles:
- Valor próximo a **1** → vetores muito semelhantes
- Permite encontrar documentos relevantes mesmo quando as **palavras exatas não correspondem**

---

## Azure AI Search como componente de recuperação

O **Azure AI Search** fornece o componente de recuperação para soluções RAG no Microsoft Foundry.

![[m05-azure-ai-search-index.png]]

### Fluxo de configuração

1. **Adicione seus dados** — Blob Storage, Data Lake Storage Gen2, OneLake, ou upload direto
2. **Crie um índice** — usando um modelo de embedding para gerar representações vetoriais
3. **Consulte o índice** — a pergunta é convertida em embedding, busca conteúdo mais similar

### Técnicas de pesquisa suportadas

| Técnica | Como funciona | Melhor para |
|---|---|---|
| **Pesquisa de palavra-chave** | Corresponde termos exatos no índice | Consultas com termos técnicos específicos |
| **Pesquisa semântica** | Usa modelos semânticos para correspondência por significado | Consultas em linguagem natural |
| **Pesquisa de vetor** | Usa embeddings para localizar conteúdo semanticamente similar | Busca por similaridade de significado |
| **Pesquisa híbrida** | Combina palavra-chave + semântica + vetor | **Recomendada** para apps de IA generativa |

---

## Exemplo de implementação com SDK

```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

project = AIProjectClient(
    endpoint=os.environ["PROJECT_ENDPOINT"],
    credential=DefaultAzureCredential(),
)

client = project.get_openai_client()

response = client.responses.create(
    model="gpt-4o",
    input=[
        {"role": "system", "content": "You are a helpful travel advisor. "
         "Use the following hotel data to answer: " + retrieved_context},
        {"role": "user", "content": "Which hotels do you offer in Paris?"},
    ],
)

print(response.output_text)
```

O `retrieved_context` são os documentos retornados do índice Azure AI Search. Ao injetá-los na mensagem de sistema, a resposta é fundamentada nos dados reais.

---

## Quando usar RAG

| Cenário | RAG é a resposta? |
|---|---|
| O modelo precisa de **dados privados** da organização | ✅ Sim |
| Os dados **mudam com frequência** (preços, estoque, notícias) | ✅ Sim |
| A **precisão factual é crítica** | ✅ Sim |
| Os dados de treinamento do modelo têm **corte temporal** | ✅ Sim |
| O modelo precisa de tom consistente mas já tem o conhecimento | ❌ Não — use ajuste fino |
| O modelo precisa seguir um formato específico | ❌ Não — use engenharia de prompt ou ajuste fino |

---

## Nota sobre Foundry IQ

> Para agentes que precisam de conhecimento fundamentado **sem gerenciar infraestrutura de pesquisa própria**, considere o **Foundry IQ** — repositório de conhecimento gerenciado que simplifica o grounding para agentes de IA.

---

## Pontos que costumam confundir

**RAG não altera o modelo.** O modelo base permanece o mesmo — RAG apenas injeta contexto adicional no prompt a cada chamada. Diferente do ajuste fino, que muda os pesos do modelo.

**A qualidade do RAG depende do índice.** Se os dados estão mal chunkeados, desatualizados ou pouco relevantes, as respostas também serão ruins. "Garbage in, garbage out" se aplica.

**Pesquisa híbrida é a recomendação.** O material recomenda explicitamente pesquisa híbrida (keyword + semântica + vetor) para apps de IA generativa.

**RAG não resolve inconsistência de estilo.** Se o modelo responde com o formato errado, RAG não ajuda — o problema é comportamental, não informacional. Use ajuste fino.

**Embeddings capturam significado, não palavras.** Duas frases com palavras totalmente diferentes podem ter embeddings muito similares se o significado for parecido.

**Similaridade cosseno, não distância euclidiana.** O material especifica similaridade cosseno como a métrica para comparar vetores de embedding.

---

## Aprofundar na documentação

- [Fundamentar seu modelo com RAG — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/optimize-generative-ai-model-performance/3-retrieval-augmented-generation)
- Próxima página: [[03 - Ajuste Fino (Fine-Tuning)]]
- Página anterior: [[01 - Engenharia de Prompt]]
