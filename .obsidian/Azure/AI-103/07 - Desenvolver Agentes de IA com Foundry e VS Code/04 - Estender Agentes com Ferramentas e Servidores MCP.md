---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - ferramentas
  - mcp
  - code-interpreter
  - file-search
  - bing
modulo: 07
---

# Estender Agentes com Ferramentas e Servidores MCP

As **ferramentas** transformam um modelo de linguagem estático em um agente capaz de interagir com o ecossistema digital. No Microsoft Foundry Agent Service, as ferramentas são integradas nativamente e acionadas por **chamada automática de ferramentas (*Automatic Tool Calling*)**, sem que a aplicação cliente precise gerenciar o ciclo de execução intermediário.

![[vs-code-tools.png]]

---

## O Ciclo de Vida da Invocação Automática de Ferramentas

Ao contrário de abordagens clássicas de Chat Completions, onde o aplicativo cliente recebia o pedido de função e precisava executá-la manualmente na máquina local, o Foundry Agent Service gerencia todo o fluxo:

```
 1. Mensagem do Usuário
         │
         ▼
 2. Modelo Avalia o Contexto ─────────> Se NÃO precisa de ferramenta ───────┐
         │                                                                   │
         ▼ (Se precisa de ferramenta)                                       │
 3. Agente Emite Chamada com Argumentos                                     │
         │                                                                   │
         ▼                                                                   │
 4. Serviço Executa a Ferramenta no Backend Seguro (Sandbox / API / Busca)  │
         │                                                                   │
         ▼                                                                   │
 5. Resultado Bruto Retornado ao Contexto do Agente                         │
         │                                                                   │
         ▼                                                                   │
 6. Agente Sintetiza a Resposta Final em Linguagem Natural <────────────────┘
         │
         ▼
 7. Resposta Entregue ao Usuário com Citações e Dados Reais
```

---

## Principais Ferramentas Nativas Internas

| Ferramenta | Identificador no YAML | O que Faz | Cenário de Uso Típico |
| :--- | :--- | :--- | :--- |
| **Interpretador de Código** (*Code Interpreter*) | `code_interpreter` | Executa código Python em sandbox seguro em nuvem | Cálculos matemáticos exatos, estatísticas, manipulação de planilhas CSV e plotagem de gráficos dinâmicos. |
| **Pesquisa de Arquivo** (*File Search*) | `file_search` | Implementa RAG gerenciado acoplado a Repositórios de Vetores (*Vector Stores*) | Consultas semânticas a documentos PDF, Word ou Markdown internos sem gerenciar infraestrutura de busca. |
| **Pesquisa na Web do Bing** (*Bing Grounding*) | `bing_grounding` | Conecta o agente aos índices em tempo real do buscador Bing | Responder sobre eventos do dia, verificar fatos e recuperar preços atuais com links automáticos de citação. |
| **Azure AI Search** | `azure_ai_search` | Conecta a um índice empresarial existente no serviço Azure AI Search | RAG corporativo em escala com pesquisa híbrida (palavra-chave + semântica + vetor) e filtros de segurança. |
| **Ferramentas OpenAPI** | `openapi` | Conecta a APIs REST corporativas a partir de um arquivo OpenAPI 3.0 | Consultar status de pedidos no ERP, abrir chamados em ITSM ou emitir comandos via endpoints REST. |

---

## Catálogo de Ferramentas Adicionais no Microsoft Foundry

O catálogo de ferramentas continua expandindo para cenários de automação avançada:

| Ferramenta | Função Operacional |
| :--- | :--- |
| **Automação do Navegador** (*Browser Automation*) | Permite ao agente navegar na web, preencher formulários e extrair dados dinâmicos renderizados por JavaScript. |
| **Uso de Computadores** (*Computer Use*) | Permite ao agente interagir diretamente com sistemas operacionais e janelas de aplicativos desktop. |
| **Geração de Imagens** | Criação sintética de recursos visuais via modelos de difusão integrados (DALL-E). |
| **SharePoint** | Acesso seguro e direto a bibliotecas de documentos corporativos e sites do Microsoft 365. |
| **Microsoft Fabric** | Conexão com dados de análise unificada e agentes de dados no Microsoft Fabric. |
| **Pesquisa Profunda** (*Deep Search*) | Varreduras analíticas em múltiplas fontes com síntese e correlação cruzada de informações. |
| **Agente a Agente** (*Agent to Agent*) | Delegação autônoma de subtarefas para outros agentes especializados cadastrados. |

---

## Servidores MCP (Model Context Protocol)

O **Model Context Protocol (MCP)** é um protocolo aberto e padronizado da indústria que unifica a forma como agentes de IA se conectam a fontes de contexto, repositórios de dados e ferramentas externas.

Em vez de criar conectores customizados proprietários para cada ferramenta, o MCP estabelece uma interface cliente-servidor padrão.

### Tipos de Servidores MCP no Foundry

```
                               Tipos de Servidores MCP
                                         │
         ┌───────────────────────────────┼───────────────────────────────┐
         │                               │                               │
  1. MCPs REMOTOS                 2. MCPs LOCAIS                  3. MCPs PERSONALIZADOS
  (Nuvem / Produção)              (Desenvolvimento Local)         (In-house / Sob Medida)
  - Acessíveis via HTTPS/SSE      - Executam na máquina do dev    - Criados pela empresa
  - Hospedados corporativamente   - Ideal para testes no VS Code  - APIs legadas e regras
```

- **Remotos (*Remote MCP*):** Hospedados na nuvem ou em servidores de rede, acessíveis via endpoints seguros HTTPS/SSE. É a escolha padrão para agentes implantados em produção.
- **Locais (*Local MCP*):** Executam localmente na estação de trabalho do desenvolvedor (via subprocesso ou stdio). Ideais para prototipagem rápida e depuração dentro do VS Code.
- **Personalizados (*Custom MCP*):** Desenvolvidos internamente pela equipe para encapsular regras de negócio proprietárias ou dados de bancos legados sob o padrão MCP.

### Benefícios do MCP
- **Reutilização Universal:** O mesmo servidor MCP pode atender a múltiplos agentes de diferentes tipos ou frameworks.
- **Isolamento de Segurança:** Ferramentas MCP rodam em seus próprios processos/ambientes, protegendo o runtime do agente.
- **Padrão Aberto:** Independência de fornecedor (*vendor lock-in*).

---

## Exemplo de Agente com Múltiplas Ferramentas em YAML

O exemplo a seguir configura um assistente analítico com `code_interpreter`, `bing_grounding` e `file_search`:

```yaml
# yaml-language-server: $schema=https://aka.ms/ai-foundry-vsc/agent/1.0.0
version: 1.0.0
name: enterprise-analyst
description: Assists financial analysts with data calculations, web research, and policy retrieval
model:
  id: 'gpt-4o'
  options:
    temperature: 0.2
    top_p: 1.0
instructions: |
  You are an expert enterprise financial analyst assistant.

  Tool usage guidelines:
  - Use Code Interpreter whenever exact mathematical formulas, statistical calculations, or charts are needed.
  - Use Bing Grounding for the latest financial news, stock market updates, and recent regulations.
  - Use File Search to answer questions about company bylaws and internal accounting manuals.
  - Always cite sources when retrieving external or document data.
tools:
  - type: code_interpreter
  - type: bing_grounding
    bing_grounding:
      connection_id: "bing-connection-eastus"
  - type: file_search
    file_search:
      vector_store_ids:
        - "vs-accounting-manuals-2026"
```

---

## Pontos que Costumam Confundir

> [!NOTE]
> **Code Interpreter ≠ File Search:** O `code_interpreter` recebe arquivos para **processar via código Python** (ex.: plotar gráfico de dispersão a partir de um `.csv`). O `file_search` recebe arquivos para **pesquisa semântica de conteúdo** (ex.: encontrar uma cláusula em um contrato `.pdf`). O propósito define a ferramenta.

> [!IMPORTANT]
> **Connection ID em Ferramentas Externas:** Ferramentas como `bing_grounding` e `azure_ai_search` requerem a propriedade `connection_id` apontando para o recurso configurado na seção *Conexões* do projeto Foundry.

> [!TIP]
> **Orquestração Automática pelo Modelo:** Você não programa chamadas imperativas como `if query contains 'notícia' then call bing`. O modelo decide autonomamente quando acionar cada ferramenta com base na mensagem do usuário e na descrição da ferramenta.

---

## Aprofundar na Documentação

- [Estender os recursos do agente com ferramentas no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/7-extend-agent-capabilities)
- Página anterior: [[03 - Configuração e Estrutura YAML de Agentes]]
- Próxima página: [[05 - Testar, Implantar, Publicar e Integrar Agentes]]
