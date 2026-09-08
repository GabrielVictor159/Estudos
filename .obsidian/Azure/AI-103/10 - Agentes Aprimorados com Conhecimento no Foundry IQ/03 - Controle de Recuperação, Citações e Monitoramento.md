---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - foundry-iq
  - citacoes
  - engenharia-de-prompt
  - monitoramento
modulo: 10
---

# Controle de Recuperação, Citações e Monitoramento

Mesmo com um pipeline de indexação perfeito, o modelo de linguagem opera de forma probabilística. Sem instruções de sistema rigorosas, o agente pode:
1. Responder baseado em seu treinamento geral em vez da base de conhecimento;
2. Responder corretamente, mas sem citar as fontes;
3. Inventar dados quando a base não contiver a resposta (*alucinação*).

Por isso, as **instruções do agente atuam como um contrato mandatório de recuperação**.

---

## Os Três Pilares do Contrato de Instruções

```
                    CONTRATO DE INSTRUÇÕES DO AGENTE
                                   │
         ┌─────────────────────────┼─────────────────────────┐
         ▼                         ▼                         ▼
   1. QUANDO RECUPERAR       2. COMO CITAR             3. POLÍTICA DE INCERTEZA
  • Sempre buscar na base   • Formato sintático       • Mensagem padrão exata
  • Proibido responder do     obrigatório de fontes     caso a resposta não
    conhecimento prévio     • Rastreabilidade total     esteja na base (Fallback)
```

### Exemplo de Prompt de Instrução Robusto (Python SDK)

```python
retrieval_instructions = """You are a specialized HR Policy Assistant.
CRITICAL OPERATIONAL RULES:
1. You must ALWAYS search the knowledge base before answering any question.
2. You must NEVER answer from your own pre-trained knowledge or memory.
3. Every factual claim MUST include a citation in this exact format: 【doc_id:search_id†source_name】
4. UNCERTAINTY RULE: If the knowledge base does not contain the complete answer, respond ONLY with:
   "I do not have this information in the official documentation. Please contact the HR desk at hr@empresa.com."
   DO NOT guess, extrapolate, or provide speculative answers.
"""

agent = project_client.agents.create_version(
    agent_name="hr-policy-agent",
    definition=PromptAgentDefinition(
        model="gpt-4o-mini",
        instructions=retrieval_instructions,
        tools=[knowledge_tool]
    )
)
```

---

## Arquétipos de Instrução por Domínio de Negócio

| Arquétipo | Objetivo Principal | Diretriz Crítica de Instrução |
| :--- | :--- | :--- |
| **Suporte ao Cliente** | Precisão estrita e resolução rápida | Foco em dados oficiais; proibido adivinhar; conectar a um especialista se a dúvida não estiver coberta no manual. |
| **Pesquisa Interna** | Síntese abrangente de múltiplos documentos | Sintetizar dados entre diferentes fontes; indicar explicitamente o **grau de confiança** da síntese; sugerir tópicos relacionados. |
| **Conformidade / Regulatório** | Rastreabilidade e validade jurídica | Citar o documento específico, cláusula e artigo; incluir a **data de vigência** da norma; recusar interpretações jurídicas informais. |

---

## Testando a Recuperação Programaticamente no SDK

Para validar se o agente aciona a base e gera citações antes de ir para produção:

```python
# Obter cliente OpenAI exposto pelo AIProjectClient
openai_client = project_client.get_openai_client()

# Criar conversa de teste
conversation = openai_client.conversations.create()

# Submeter pergunta de validação
response = openai_client.responses.create(
    conversation=conversation.id,
    input="Quantos dias de férias remuneradas tenho direito após 1 ano?",
    extra_body={"agent": {"name": agent.name, "type": "agent_reference"}}
)

# Imprime o texto gerado (deve conter citações e fatos da base)
print(response.output_text)
```

---

## Os Quatro Pilares de Qualidade da Resposta

| Pilar | Critério de Avaliação |
| :--- | :--- |
| **Fundamentação (*Grounding*)** | As afirmações derivam 100% dos fragmentos recuperados da base, sem interpolações externas. |
| **Citação (*Citation*)** | Cada fato possui a referência verificável ao documento de origem e ID do fragmento. |
| **Relevância (*Relevance*)** | A resposta atende diretamente à intenção da pergunta do usuário sem desvios de assunto. |
| **Integridade (*Completeness*)** | As informações essenciais estão completas e não truncadas. |

---

## Métricas de Monitoramento em Produção

* **Frequência de Citação (*Citation Rate*):** Percentual de respostas que trazem fontes auditáveis. Se cair, indica desvio de conformidade nas instruções.
* **Frequência de Fallback (*Fallback Rate*):** Proporção de vezes em que o agente aciona a resposta padrão de "Não sei". Picos apontam **lacunas de documentação** na base de conhecimento da empresa.
* **Precisão da Recuperação (*Retrieval Precision*):** Se os fragmentos trazidos pelo Azure AI Search contêm as respostas para as perguntas reais dos usuários.

---

## Pontos que Costumam Confundir

> [!WARNING]
> **Por Que Especificar o Comportamento de Recuperação nas Instruções?** Questão frequente de exame: *"Por que é indispensável especificar instruções detalhadas de recuperação no agente?"* **Resposta:** Sem instruções explícitas, o LLM tende a responder a partir do seu treinamento geral prévio, fornecendo respostas não auditáveis ou com alucinações.

> [!NOTE]
> **Fallback é Comportamento Desejado:** Um agente corporativo responder "Não possuo essa informação em nossos manuais oficiais" é considerado **um sinal de sucesso do RAG**, e não uma falha, pois impede que o cliente receba orientações falsas.

---

## Aprofundar na Documentação

- [Configurar a recuperação com Foundry IQ no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/introduction-foundry-iq/5-configure-retrieval)
- Página anterior: [[02 - Fontes de Dados e Mecanismos de Busca]]
- Próxima página: [[04 - Questões de Exame Comentadas e Resumo Rápido]]
