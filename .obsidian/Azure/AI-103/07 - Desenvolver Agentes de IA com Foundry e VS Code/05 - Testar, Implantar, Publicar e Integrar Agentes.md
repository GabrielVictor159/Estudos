---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - deployment
  - publicacao
  - api-de-respostas
  - rbac
  - entra-id
  - questoes-exame
modulo: 07
---

# Testar, Implantar, Publicar e Integrar Agentes

Após configurar as instruções e anexar ferramentas ao seu agente, o ciclo de vida avança para as etapas de **validação, implantação, publicação e integração**. Entender a distinção exata entre *implantar no projeto* e *publicar em um endpoint* é um dos tópicos mais cobrados no exame.

![[m07-implantar-vs-publicar.jpg]]

---

## Estratégias de Teste nos Playgrounds

Antes de qualquer promoção para ambientes de produção, o agente deve ser submetido a testes estruturados nos playgrounds (remoto no Azure ou simulado localmente no VS Code):

| Estratégia de Teste | Objetivo | Exemplo Prático |
| :--- | :--- | :--- |
| **Caminho Feliz (*Happy Path*)** | Validar se o agente responde conforme o esperado sob entradas típicas e claras. | Solicitar o agendamento de uma consulta em data e especialidade válidas. |
| **Casos-Limite (*Edge Cases*)** | Testar resiliência com entradas ambíguas, dados incompletos ou formatos inesperados. | Usuário informa apenas "quero marcar médico amanhã", sem especialidade nem horário. |
| **Teste de Limite (*Boundary Testing*)** | Verificar se as regras de recusa e os filtros éticos bloqueiam solicitações fora de escopo. | Usuário solicita: "Me dê a receita de um coquetel" ou "Acesse os exames do paciente X". |
| **Persistência Multi-Turn** | Avaliar se o agente mantém o contexto e referências de mensagens anteriores na sessão. | Turno 1: "Quero remarcar a consulta de terça". Turno 2: "Qual era o médico mesmo?". |
| **Invocação de Ferramentas** | Validar se as ferramentas certas são chamadas com os parâmetros corretos e se os retornos são bem sintetizados. | Perguntar uma operação matemática complexa e inspecionar se o Code Interpreter foi disparado. |

---

## Implantar no Projeto (*Deploy*) vs. Publicar em Endpoint (*Publish*)

Essa é a distinção arquitetural central do Microsoft Foundry:

```
                               Ciclo de Promoção
                                       │
         ┌─────────────────────────────┴─────────────────────────────┐
         ▼                                                           ▼
1. IMPLANTAR NO PROJETO (Deploy)                           2. PUBLICAR EM ENDPOINT (Publish)
   - Escopo: Workspace do Projeto Foundry                     - Escopo: Recurso Azure Independente
   - Objetivo: Testes internos e colaboração                  - Objetivo: Produção para apps clientes
   - Sem URL pública de API dedicada                          - Cria: Aplicativo do Agente (Agent App)
   - Execução restrita ao portal e playgrounds                - Gera: Endpoint REST estável (/responses)
                                                              - Exige: Autenticação Entra ID dedicada
```

### 1. Implantar no Projeto (*Deploy to Project*)
- Grava as alterações de configuração (instruções, modelo, ferramentas) dentro do repositório do projeto Foundry.
- Permite que outros desenvolvedores da equipe vejam e testem o agente no *Agent Playground*.
- **Não** expõe um endpoint de produção consumível por aplicações externas.

### 2. Publicar em Ponto de Extremidade (*Publish to Endpoint*)
- Promove o agente a um recurso Azure gerenciado independente chamado **Aplicativo de Agente (*Agent Application*)**.
- Cria uma **Implantação (*Deployment*)** ativa com controles operacionais de ciclo de vida (iniciar, parar, pausar).
- Gera uma URL estável baseada no protocolo padrão da **API de Respostas da OpenAI (*Responses API*)**.

---

## O Endpoint da API de Respostas

O endpoint gerado para o Aplicativo de Agente segue a estrutura padronizada da nuvem:

```text
https://<foundry-resource-name>.services.ai.azure.com/api/projects/<project-name>/applications/<app-name>/protocols/openai/responses?api-version=2025-11-15-preview
```

### Autenticação e Identidade: A Armadilha de Prova!

> [!CAUTION]
> **Chaves de API NÃO São Suportadas:** Os endpoints de Aplicativo de Agente **não aceitam chaves de API estáticas (*API Keys*)**! A autenticação é exclusivamente baseada em tokens de acesso OAuth 2.0 do **Microsoft Entra ID** (`Authorization: Bearer <token>`).

Para invocar o endpoint, a identidade que faz a chamada (usuário ou entidade de serviço) deve possuir a atribuição de controle de acesso (RBAC):
- **Função RBAC Obrigatória:** `Usuário da IA do Azure` (*Azure AI User*) no escopo do projeto ou recurso.

> [!IMPORTANT]
> **Alerta Crítico de RBAC na Publicação:** Ao publicar um Aplicativo de Agente, o Azure provisiona uma **nova Identidade Gerenciada no Entra ID** específica para a aplicação, independente da identidade do projeto Foundry. As permissões de acesso a recursos secundários (como *Azure AI Search*, *Blob Storage* ou *Key Vault*) **NÃO são herdadas automaticamente**! É mandatório reatribuir os papéis de RBAC necessários diretamente à nova identidade do Aplicativo de Agente, sob pena de receber erros `403 Forbidden` na execução de ferramentas em produção.

---

## Invocação Programática via CLI e cURL

### 1. Obter Token Bearer via Azure CLI
```azurecli
az account get-access-token --resource https://ai.azure.com
```

### 2. Executar Chamada HTTP REST ao Agente Publicado
```bash
curl -X POST \
  "https://meu-foundry.services.ai.azure.com/api/projects/projeto-saude/applications/app-agente-saude/protocols/openai/responses?api-version=2025-11-15-preview" \
  -H "Authorization: Bearer eyJ0eXAiOiJKV1QiLC..." \
  -H "Content-Type: application/json" \
  -d '{
    "input": "Preciso agendar uma consulta para clínica médica na próxima quinta-feira."
  }'
```

---

## Atualizações e Roteamento de Versões

Quando uma nova versão de um agente é publicada no mesmo Aplicativo de Agente:
- O serviço executa uma substituição gradual com **roteamento automático de 100% do tráfego** para a nova versão.
- A URL do endpoint permanece rigorosamente a mesma, evitando quebras em aplicações clientes web ou mobile já em produção.

---

## Considerações de Produção

- **Natureza Stateless da Responses API em Endpoints:** Os endpoints de Aplicativos de Agente operam de forma stateless (sem estado permanente mantido pelo servidor entre sessões desconexas). Em integrações cliente-servidor customizadas, o histórico de turnos anteriores da conversa deve ser mantido pelo aplicativo cliente e enviado na lista de contexto quando aplicável.
- **Monitoramento e Observabilidade:** O tráfego do agente pode ser canalizado diretamente para o **Azure Monitor** e **Application Insights**, viabilizando dashboards de latência, contagem de tokens consumidos e taxas de falha em ferramentas.

---

## Questões de Avaliação Comentadas (Padrão de Exame)

### Questão 1
**Qual é o principal benefício de usar o Microsoft Foundry Agent Service em comparação com a criação de agentes com APIs de modelo tradicionais?**
- A) Ele fornece acesso a modelos de IA mais avançados não disponíveis em outros locais.
- B) Ele não requer nenhuma assinatura ativa do Azure.
- **C) Ele gerencia a invocação de ferramentas, o gerenciamento de estado e a infraestrutura de backend automaticamente.** *(Correta)*
- D) Ele só funciona se utilizado através do portal web do Azure.

> **Justificativa:** O Foundry Agent Service é uma plataforma gerenciada que orquestra todo o ciclo de vida do agente. Em vez de exigir que o desenvolvedor execute localmente as ferramentas e mantenha tabelas de banco de dados para o estado do chat, o serviço cuida disso nativamente.

---

### Questão 2
**Como o Serviço do Microsoft Foundry Agent lida com o estado da conversação?**
- A) Exigindo que os desenvolvedores gravem manualmente o histórico em um banco externo a cada turno.
- B) Utilizando conexões WebRTC proprietárias.
- **C) Por meio da API de Respostas (Responses API), que gerencia nativamente o contexto conversacional.** *(Correta)*
- D) Salvando arquivos temporários no sistema de arquivos local do usuário.

> **Justificativa:** A Responses API encapsula e gerencia o contexto de conversação e os metadados de execução, provendo uma interface coesa e segura.

---

### Questão 3
**Qual das alternativas a seguir representa uma violação das práticas de segurança recomendadas para agentes de IA?**
- A) Configurar controles de acesso baseados em função (RBAC).
- B) Implementar camadas de filtragem de prompt na entrada e saída de dados.
- C) Manter registros detalhados de auditoria e rastreamento de chamadas.
- **D) Conceder ao agente permissões irrestritas de acesso a todos os repositórios corporativos.** *(Correta - por ser a prática insegura)*

> **Justificativa:** Agentes autônomos devem operar sob o princípio do menor privilégio (*Least Privilege*). Conceder acesso irrestrito expõe a corporação a vazamento massivo de dados em caso de ataques de injeção de prompt.

---

### Questão 4
**O que ocorre quando o agente determina que precisa de uma ferramenta para responder a uma solicitação do usuário?**
- A) O agente interrompe o fluxo e solicita permissão textual ao usuário final.
- B) O processamento é abortado e é lançado um erro de runtime.
- **C) O agente invoca a ferramenta automaticamente, processa o retorno no backend e incorpora os dados na sua resposta.** *(Correta)*
- D) O agente enfileira a requisição para análise manual por um operador humano.

> **Justificativa:** No modelo do Foundry Agent Service, o ciclo de *Tool Calling* é autônomo e gerenciado pela plataforma, garantindo respostas fundamentadas e imediatas.

---

## Pontos que Costumam Confundir

> [!NOTE]
> **Deploy ≠ Publish:** Lembre-se: `Deploy` salva no projeto para a equipe; `Publish` cria o recurso de produção `Agent Application` acessível via endpoint REST.

> [!WARNING]
> **Tokens de Acesso Expiram:** Ao testar com `az account get-access-token`, o token JWT Bearer possui tempo de vida limitado (geralmente 60 a 90 minutos). Em aplicações de produção, use a biblioteca `DefaultAzureCredential` do SDK do Azure Identity para renovação transparente de tokens.

---

## Aprofundar na Documentação

- [Testar, implantar e integrar agentes no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/develop-ai-agents-azure-vs-code/8-test-deploy-integrate)
- Voltar ao [[00 - Índice do Módulo 07]]
- Página anterior: [[04 - Estender Agentes com Ferramentas e Servidores MCP]]
