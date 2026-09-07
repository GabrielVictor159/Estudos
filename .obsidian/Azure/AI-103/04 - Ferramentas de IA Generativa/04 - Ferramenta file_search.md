---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - file-search
  - RAG
  - vector-store
modulo: 04
---

# Ferramenta file_search

A ferramenta `file_search` implementa um pipeline de **RAG (Retrieval-Augmented Generation) gerenciado** sobre documentos privados. O modelo pesquisa conteúdo nos seus arquivos carregados e retorna respostas fundamentadas com citações — sem que você precise implementar chunking, embeddings ou indexação vetorial.

---

## Recursos principais

| Recurso | Significado |
|---|---|
| **Respostas baseadas em documentos** | As respostas se fundamentam nos seus arquivos carregados |
| **Recuperação semântica** | Localiza passagens por significado, não apenas correspondência exata de palavras-chave |
| **Integração com Vector Store** | Pesquisa em uma ou mais coleções de documentos indexados |
| **Citações e transparência** | Inclui referências aos trechos correspondentes para rastreabilidade |
| **Relevância empresarial** | Usa conhecimento específico da organização nas respostas |

---

## Casos de uso comuns

| Caso de uso | Exemplo |
|---|---|
| **Q&A de políticas** | Responder perguntas de funcionários sobre políticas de RH em PDFs |
| **Assistentes de suporte** | Recuperar etapas de solução de problemas de guias internos |
| **Revisão legal** | Localizar cláusulas específicas em documentos de contrato |
| **Descoberta de conhecimento** | Resumir respostas de conjuntos de documentação técnica |

---

## O pipeline automático por trás do file_search

Quando você carrega arquivos e vincula a um Vector Store, o Azure AI automaticamente:

```
1. Parse → Extrai texto dos arquivos (PDF, DOCX, TXT, MD, HTML)
2. Chunk → Divide o texto em pedaços de tamanho ideal com sobreposição de tokens
3. Embed → Calcula embeddings vetoriais com modelos de embedding gerenciados
4. Store → Armazena os embeddings em um índice vetorial gerenciado
5. Search → Em runtime, a query do usuário é vetorizada e comparada por similaridade
6. Inject → Os chunks mais relevantes são injetados no contexto do modelo
```

> Você não precisa escrever código de chunking, embedding ou busca vetorial — tudo é gerenciado.

---

## Exemplo com a API de Respostas

```python
from openai import OpenAI

client = OpenAI(
    base_url={openai_endpoint},
    api_key={auth_key_or_token}
)

# Criar vector store e carregar arquivo
vector_store = client.vector_stores.create(name="policy-docs")
client.vector_stores.files.upload_and_poll(
    vector_store_id=vector_store.id,
    file=open("expenses_policy.pdf", "rb")
)

# Obter resposta usando file_search
response = client.responses.create(
    model=model_deployment,
    instructions="You are an AI assistant that provides information from HR policy documents.",
    input="What's the maximum amount I can claim for a taxi ride?",
    tools=[{
        "type": "file_search",
        "vector_store_ids": [vector_store.id]
    }],
    include=["file_search_call.results"]
)
print(response.output_text)
```

O modelo pesquisa o arquivo de política indexado e usa as passagens recuperadas para produzir uma resposta fundamentada.

---

## Como funciona o fluxo

```
1. Você prepara arquivos → carrega documentos em um Vector Store
2. Você envia a solicitação → inclui file_search com vector_store_ids
3. O modelo executa a recuperação → pesquisa chunks indexados por relevância semântica
4. Resultados são injetados → passagens correspondentes são fornecidas ao modelo
5. A resposta é gerada → o modelo responde usando o contexto do documento recuperado
   (com citações dos trechos de origem)
```

---

## Parâmetros-chave

| Parâmetro | O que faz |
|---|---|
| `vector_store_ids` | IDs dos Vector Stores a serem consultados |
| `include` | `["file_search_call.results"]` — inclui os resultados da busca na resposta para depuração |
| `purpose="agents"` | Finalidade do upload de arquivo (quando usando o SDK `azure-ai-projects`) |

---

## Práticas recomendadas

- **Use arquivos de alta qualidade** — documentos limpos e atuais melhoram a precisão da recuperação.
- **Escreva prompts focados** — perguntas específicas reduzem correspondências ambíguas.
- **Separe Vector Stores por domínio** — RH, jurídico, finanças em stores separados quando útil.
- **Inclua resultados de recuperação** — use `include=["file_search_call.results"]` durante o desenvolvimento para depuração.
- **Mantenha revisão humana** — para fluxos críticos, valide as respostas manualmente.

---

## Limitações

- Qualidade da resposta depende da **qualidade do documento**, cobertura e relevância dos chunks.
- Vector Stores de **domínios muito grandes ou mistos** podem retornar contexto menos focado.
- Arquivos atualizados podem exigir **reindexação** antes que o novo conteúdo seja pesquisável.
- Recuperação melhora a fundamentação, mas **não substitui revisão humana** para decisões sensíveis.

---

## Nota sobre escala empresarial

> Para agentes de escala empresarial que precisam acessar grandes volumes de dados em múltiplos armazenamentos, considere a solução de repositório de conhecimento do **Foundry IQ** com um agente do Microsoft Foundry, em vez de `file_search` sozinho.

---

## Tabela de decisão: preciso de… → uso file_search?

| Necessidade | file_search é a resposta? |
|---|---|
| Responder sobre políticas internas da empresa | ✅ Sim — RAG sobre documentos privados |
| Encontrar cláusula em contrato PDF | ✅ Sim — busca semântica |
| Resumir documentação técnica interna | ✅ Sim — passagens relevantes + síntese |
| Buscar dados de treinamento do modelo | ❌ Não — o modelo já sabe isso |
| Obter notícias de hoje | ❌ Não — use `web_search` |
| Calcular estatísticas de um CSV | ❌ Não — use `code_interpreter` |
| Chamar API externa | ❌ Não — use `function` |

---

## Pontos que costumam confundir

**file_search ≠ web_search.** `file_search` busca em documentos **privados** que você carregou; `web_search` busca na **internet pública**. Se a pergunta é "onde o dado mora?", a resposta define qual ferramenta usar.

**file_search ≠ code_interpreter com arquivo.** `code_interpreter` recebe arquivos para **processar/calcular** (ex.: gerar gráfico de um CSV). `file_search` recebe arquivos para **pesquisar semanticamente** (ex.: encontrar uma política em um PDF). O propósito define a ferramenta.

**RAG é automático aqui.** Diferente de implementar RAG manualmente com Azure AI Search + embeddings + código de chunking, `file_search` faz tudo isso por você.

**Vector Store precisa ser criado antes.** Primeiro você cria o vector store e carrega os arquivos; só depois usa `file_search` na chamada.

**Citações vêm automaticamente.** O `file_search` inclui referências aos arquivos de origem — diferente do `code_interpreter`, que não faz citação de documentos.

---

## Aprofundar na documentação

- [Usar a ferramenta file_search — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/05-file-search)
- Próxima página: [[05 - Ferramenta de Funções (Function Calling)]]
- Página anterior: [[03 - Ferramenta web_search]]
