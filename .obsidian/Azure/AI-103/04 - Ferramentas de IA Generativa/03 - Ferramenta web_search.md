---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - web-search
  - bing
modulo: 04
---

# Ferramenta web_search

A ferramenta `web_search` permite que o modelo **acesse informações atuais da web** durante a geração de uma resposta. Em vez de depender apenas dos dados de treinamento (estáticos), o modelo emite consultas de pesquisa e produz respostas baseadas em conteúdo atualizado.

---

## Recursos principais

| Recurso | Significado |
|---|---|
| **Recuperação de informações ao vivo** | Obtém dados recentes não disponíveis nos dados de treinamento |
| **Respostas baseadas na fonte** | Constrói respostas a partir de conteúdo recuperado da web |
| **Redução do risco de alucinação** | Melhora a confiabilidade verificando fontes externas |
| **Geração automática de consulta** | O modelo decide quando e como pesquisar baseado na intenção do usuário |
| **Experiência transparente** | Pesquisa e geração de resposta ocorrem em um único fluxo |

---

## Casos de uso comuns

| Caso de uso | Exemplo |
|---|---|
| **Eventos atuais** | Resumir atualizações de um comunicado de tecnologia de última hora |
| **Pesquisa de mercado** | Comparar recursos ou preços recentes entre fornecedores |
| **Monitoramento de políticas** | Verificar se regulamentos ou diretrizes foram alterados |
| **Verificação de fatos** | Validar declarações contra fontes públicas respeitáveis |

---

## Exemplo com a API de Respostas

```python
from openai import OpenAI

client = OpenAI(
    base_url={openai_endpoint},
    api_key={auth_key_or_token}
)

# Usar web_search para informações atuais
response = client.responses.create(
    model={model_deployment},
    instructions="You are an AI assistant. Use web search when current information is required.",
    input="What are three major announcements from Microsoft Build this week?",
    tools=[{"type": "web_search"}]
)

print(response.output_text)
```

A saída variará com base nos resultados atuais da web, mas incluirá uma resposta concisa baseada em fontes recentes, com citações.

---

## Como funciona o fluxo

```
1. Você envia a solicitação → inclui web_search na lista de tools
2. O modelo avalia a pergunta → decide se dados atuais da web são necessários
3. A pesquisa é executada → o modelo emite uma ou mais consultas de busca
4. Resultados são revisados → páginas relevantes são selecionadas e resumidas
5. A resposta é gerada → o modelo combina as descobertas na resposta final
   (com citações de URL para rastreabilidade)
```

> O modelo decide **autonomamente** quando pesquisar. Se a pergunta pode ser respondida com o conhecimento de treinamento, ele não aciona a pesquisa.

---

## Práticas recomendadas

- **Faça perguntas claras sobre tempo** — inclua palavras como "mais recente", "atual" ou intervalos de datas quando necessário.
- **Defina expectativas para fontes** — solicite fontes respeitáveis ou oficiais quando a precisão for importante.
- **Solicite saídas concisas** — peça resumos curtos com pontos-chave para reduzir ruído.
- **Verifique fatos críticos** — para cenários de alto risco, valide independentemente declarações importantes.
- **Monitore uso e latência** — a recuperação na web pode aumentar o tempo de resposta e o uso de tokens.

---

## Limitações

- Resultados dependem do que está **disponível publicamente** e indexável no momento da consulta.
- A **qualidade da fonte pode variar** — a saída ainda pode exigir revisão humana.
- Conteúdo recuperado pode **mudar ao longo do tempo** — execuções repetidas podem produzir respostas diferentes.
- Alguns ambientes podem aplicar **restrições regionais, de política ou de rede** ao acesso à web.

---

## Tabela de decisão: preciso de… → uso web_search?

| Necessidade | web_search é a resposta? |
|---|---|
| Saber o que aconteceu hoje nas notícias | ✅ Sim — informação em tempo real |
| Comparar preços atuais de produtos | ✅ Sim — dados atualizados |
| Verificar se uma regulamentação mudou | ✅ Sim — monitoramento de políticas |
| Validar um fato contra fontes públicas | ✅ Sim — verificação de fatos |
| Fazer cálculos com dados de um CSV | ❌ Não — use `code_interpreter` |
| Responder sobre documento interno da empresa | ❌ Não — use `file_search` |
| Chamar API do seu sistema | ❌ Não — use `function` |

---

## Pontos que costumam confundir

**web_search ≠ file_search.** `web_search` busca na internet pública; `file_search` busca em documentos privados carregados no Vector Store. A pergunta clássica é: "de onde vem a informação?" — se é pública/atualizada, web_search; se é interna/privada, file_search.

**O modelo decide quando pesquisar.** Não é toda pergunta que aciona a pesquisa — só quando o modelo julga que precisa de dados atuais.

**Citações automáticas.** As respostas incluem URLs de origem automaticamente — isso é parte do sistema de grounding.

**Latência adicional.** A pesquisa web adiciona tempo à resposta. Em cenários sensíveis a latência, considere se web_search é realmente necessário.

**Não substitui revisão humana.** Apesar de reduzir alucinações, o conteúdo recuperado da web pode ter qualidade variável.

---

## Aprofundar na documentação

- [Usar a ferramenta web_search — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/use-generative-ai-tools/04-web-search)
- Próxima página: [[04 - Ferramenta file_search]]
- Página anterior: [[02 - Ferramenta code_interpreter]]
