# Tomar medidas a partir de conversas de agentes usando tópicos e ferramentas

Tópicos definem a **forma** da conversa — as perguntas feitas, as ramificações, as respostas. Mas um tópico não alcança um sistema externo por conta própria: não tem como consultar um banco de dados, atualizar um registro ou chamar um serviço. Essa capacidade vem das **ferramentas**. Ao adicionar uma ferramenta a um tópico, o agente ganha a habilidade de executar uma ação específica em um ponto definido do fluxo.

![[tres-caminhos-integracao.svg]]

> [!info] Cenário-fio condutor
> **Adatum Corporation** — varejista de médio porte cujo agente de atendimento responde bem a perguntas, mas precisa: verificar **status de pedido em tempo real** no Dynamics 365, disparar **fluxos de reembolso** para devoluções aprovadas, e chamar **APIs de rastreamento** de operadoras que não têm conector nativo do Power Platform. Cada necessidade corresponde a um dos três padrões de integração.

---

## 1. Tipos de ferramentas disponíveis

| Tipo | O que é |
|---|---|
| **Connectors** | Conexões predefinidas ou personalizadas do Power Platform com Microsoft 365, SharePoint, Dynamics 365 e milhares de serviços não Microsoft |
| **Fluxos de agente** | Workflows de várias etapas que combinam ações e retornam resultados estruturados |
| **Prompts** | Prompts de IA de única interação que referenciam fontes de conhecimento ou analisam dados |
| **APIs REST** *(versão prévia)* | Integrações definidas por uma especificação **OpenAPI**; cada endpoint e método é selecionado e configurado como ferramenta |
| **Protocolo de Contexto de Modelo (MCP)** | Conexões com servidores MCP que expõem ferramentas e recursos ao agente |
| **Uso do computador** *(versão prévia)* | Permite que o agente interaja com uma interface gráfica — aplicativos web e desktop |

---

## 2. Nível do agente × nível do tópico

**Onde** a ferramenta é adicionada determina **quando** ela executa.

| | Nível do agente | Nível do tópico |
|---|---|---|
| Onde se adiciona | Página **Ferramentas** do agente | Dentro de um nó, na tela de criação do tópico |
| Quem dispara | O **orquestrador de IA**, automaticamente, a qualquer momento, conforme o que o usuário diz | **Você**, em um momento preciso que define no fluxo |
| Use quando | A ação pode ser útil em qualquer ponto da conversa | A ação deve ocorrer numa etapa exata de um fluxo conhecido |

**Exemplo Adatum:** o tópico coleta primeiro o número do pedido; a pesquisa no Dataverse só executa **depois** dessa entrada ser confirmada e **somente** nesse tópico. Nível do tópico é a escolha certa.

---

## 3. Duas ferramentas que existem só no nível do tópico

Não aparecem na página **Ferramentas** do agente e **não podem ser invocadas pelo orquestrador**. Ambas são adicionadas por **Adicionar uma ferramenta** dentro de um tópico e servem a cenários de recuperação de conhecimento em que o agente precisa buscar conteúdo e **processar os resultados antes de responder**.

### Criar uma consulta de pesquisa

Reescreve a mensagem mais recente do usuário em uma consulta estruturada e enriquecida, incorporando histórico e contexto relevantes da conversa. Gera uma string de consulta otimizada que pode ser passada a um endpoint de pesquisa, a uma solicitação HTTP ou a qualquer lógica seguinte.

> [!example] Quando usar
> A entrada bruta não é precisa o suficiente para o sistema de busca. Um acompanhamento como *"e a licença médica?"* precisa virar uma consulta completa e sensível ao contexto antes de ir para uma API de busca do SharePoint ou base de conhecimento interna.

### Executar uma pesquisa personalizada

Executa a busca em um conjunto de fontes de conhecimento configuradas no próprio nó e retorna os **resultados brutos, não personalizados**, como variável de saída.

> [!example] Quando usar
> Você precisa de controle total sobre o que acontece com os resultados antes de o agente responder — filtrar registros confidenciais, aplicar lógica de negócio, ou alimentar um prompt de resumo personalizado.

> [!note] Diferença em relação ao nó de respostas generativas
> O nó de respostas generativas **recupera e resume em uma etapa**. O nó de pesquisa personalizada **separa recuperação de resposta**, criando um estágio intermediário de processamento.

As duas costumam ser usadas em sequência: **Criar consulta de pesquisa** gera a consulta → **Executar pesquisa personalizada** aplica essa consulta nas fontes configuradas → os resultados ficam em uma variável de tópico para condicionar, filtrar ou compor a resposta.

---

## 4. Padrão 1 — Ferramenta de conector

Para integrações de **ação única**: uma pesquisa direta, uma verificação de status, uma atualização de uma etapa.

### 4.1 Adicionar a ferramenta

1. Abra o tópico no Copilot Studio.
2. Na tela de criação, selecione **Adicionar nó** (**+**) no ponto em que a ferramenta deve executar.
3. Selecione **Adicionar uma ferramenta**.
4. No seletor, localize a ferramenta que se ajusta ao cenário — ou crie uma nova.

![Menu Adicionar ferramenta para um tópico no Copilot Studio](https://learn.microsoft.com/pt-br/training/modules/take-action-agent-topics-tools-flows-copilot-studio/media/add-a-tool.png)

**No cenário Adatum:** o tópico coleta o número do pedido e, logo depois, entra uma ferramenta de conector do **Microsoft Dataverse**. No seletor, escolhe-se **Connector**, busca-se o conector Dataverse e seleciona-se a ação que recupera um registro de pedido por ID.

**Predefinidos × personalizados:** conectores predefinidos (como o Dataverse) funcionam sem configuração extra assim que a conexão é criada. Conectores **personalizados** permitem definir a conexão com um serviço próprio via conectores do Power Platform, e são adicionados ao tópico pelos mesmos passos.

> [!important] Licenciamento
> O conector **Microsoft Dataverse é premium**. Usuários que disparam o conector sem um plano de Copilot Studio que inclua acesso a conector premium podem ver **erros em runtime**. Confirme os requisitos de licença antes de implantar.

### 4.2 Entradas e saídas

**Entradas** são os parâmetros que a ação exige. Na consulta de pedido do Dataverse, é o `Order ID` — mapeie para ele a variável que contém o número do pedido, por exemplo `Topic.OrderNumber`. Em runtime o agente passa o valor atual da variável para o conector.

**Saídas** são os valores retornados. A resposta do Dataverse pode incluir status do pedido, data de entrega estimada e informações da operadora.

> [!tip] Capture só o que o tópico usa
> Em vez de guardar tudo, armazene apenas os campos necessários, cada um em uma variável de nome claro — por exemplo `Topic.OrderStatus`. Nós posteriores referenciam essas variáveis para ramificar ou compor a resposta.

**Ramificação no cenário Adatum:** um nó de **condição** depois do conector verifica `Topic.OrderStatus`. Se indica atraso → encaminha para escalonamento. Se o pedido está em dia → confirma o status e encerra a conversa.

> [!note] Esse padrão é universal
> Identificar **entradas a enviar** e **saídas a capturar** vale igualmente para conector, fluxo de agente e endpoint de API REST.

### 4.3 Autenticação de ferramentas de conector

Conectores exigem credenciais para acessar serviços externos. A escolha depende de **quem deve acessar os dados** e de **como o agente é implantado**.

| | **Autenticação do usuário final** (padrão) | **Autenticação fornecida pelo criador** |
|---|---|---|
| Como funciona | Na primeira vez que a ferramenta dispara, o agente pede que o usuário faça login com as próprias credenciais no serviço integrado | Todos os usuários disparam o conector **como você, o criador** |
| Visibilidade dos dados | Cada usuário só vê o que sua conta pode acessar | Todos veem o que a conta do criador acessa |
| Use quando | Os dados devem respeitar permissões no nível do usuário — no Adatum, cada cliente vê só os próprios pedidos | A ferramenta acessa um recurso compartilhado que todos legitimamente precisam, ou exigir credencial individual cria atrito desnecessário |

**Para trocar:** página de configuração da ferramenta → **Detalhes adicionais** → **As credenciais a serem usadas** → `Maker-provided credentials`.

> [!important] Pré-requisito
> Antes de usar credenciais fornecidas pelo criador, o agente **precisa estar configurado com um canal autenticado**.

---

## 5. Padrão 2 — Fluxo de agente

Um fluxo de agente é a escolha certa quando a integração exige **várias etapas coordenadas**, **ramificação condicional** entre elas, ou lógica que precisa ser chamada de **mais de um tópico**.

Diferente de uma ferramenta de conector — que executa **uma ação** e devolve **um resultado** — o fluxo de agente executa um **workflow inteiro** e retorna uma resposta estruturada ao concluir.

### 5.1 Fluxo de agente × fluxo de nuvem

Fluxos de agente vivem **nativamente no Copilot Studio** e **não são a mesma coisa** que fluxos de nuvem do Power Automate.

| | Fluxo de agente | Fluxo de nuvem |
|---|---|---|
| Propósito | Projetado especificamente para uso com agentes | Cenários gerais de automação |
| Cobrança | Pelo consumo do **Copilot Studio** | Licenciado e gerenciado separadamente no **Power Automate** |
| Onde aparece | Página **Fluxos** do Copilot Studio | Portal do Power Automate |

### 5.2 Os cinco requisitos de um fluxo chamável

1. **Gatilho `When an agent calls the flow`** — torna o fluxo acessível a partir de um tópico ou do orquestrador do agente
2. **Ação `Respond to the agent`** — devolve valores ao tópico e **marca o limite síncrono**
3. **Resposta assíncrona desabilitada** — nas configurações da ação `Respond to the agent`, em **Rede**, a alternância de **resposta assíncrona** deve estar **Desativada**
4. **Parâmetros de entrada e saída declarados** explicitamente
5. **Ser um fluxo de solução**

> [!note] Atalho
> Ao criar o fluxo de agente **de dentro do Copilot Studio como uma nova ferramenta**, o gatilho e a ação de resposta obrigatórios já são adicionados automaticamente.

### 5.3 Chamar o fluxo de um tópico

1. Em **Tópicos**, abra o tópico.
2. Posicione o cursor no ponto em que o fluxo deve executar.
3. **Adicionar nó** (**+**) → **Adicionar uma ferramenta**.
4. No seletor, localize e selecione o fluxo de agente.
5. **Adicionar** — um nó **Ação** aparece na tela.

**Mapeamento no cenário de reembolso:**

```text
ENTRADAS
  OrderID        →  Topic.OrderNumber
  CustomerEmail  →  Topic.CustomerEmail

SAÍDAS
  Topic.RefundStatus      ←  success | failure
  Topic.ConfirmationCode  ←  código de confirmação
```

O tópico então age sobre o código de status retornado e o número de confirmação para encerrar a conversa.

> [!tip] Esquema mínimo
> Passe só as variáveis de que o tópico realmente precisa. Se o fluxo retornar campos extras que o tópico não usa, não os capture. Esquema de entrada e saída mínimo facilita a manutenção e **reduz a chance de incompatibilidade de tipo**.

### 5.4 O limite de 100 segundos

Fluxos de agente precisam concluir e enviar a resposta em **até 100 segundos**. O tópico **pausa no nó Ação** e aguarda. Se o fluxo não responder em tempo, a ação atinge o **timeout**.

> [!success] Padrão de divisão assíncrona (operações longas)
> 1. O fluxo **inicia** a operação em segundo plano
> 2. Retorna **imediatamente** um ID de tarefa ou referência de rastreamento
> 3. A ação `Respond to the agent` marca o **limite síncrono**
> 4. Ações colocadas **depois** dela executam de forma assíncrona — **até 30 dias**
> 5. O tópico recebe a resposta rapidamente e pode usar um **tópico de sondagem** separado para verificar o resultado depois
>
> A conversa segue em movimento sem obrigar o cliente a esperar em fila.

---

## 6. Padrão 3 — Nó Enviar Solicitação HTTP

Chamada **ad hoc** a uma API REST, criada diretamente na tela de criação. Adequada quando **não existe conector** e a integração é uma **única requisição autônoma** dentro de um tópico.

**Por que é a escolha certa no rastreamento da Adatum:** não existe conector do Power Platform para a API da operadora; a operadora **não publica especificação OpenAPI nem servidor MCP**, o que descarta as duas opções em versão prévia; o número de rastreamento do cliente entra na URL, montada dinamicamente com Power Fx; e a integração fica contida em um único tópico, sem necessidade de reuso.

> [!note] Alternativas em versão prévia
> O Copilot Studio também suporta ferramentas **MCP** e de **API REST** (ambas em versão prévia) como formas adicionais de chamar serviços externos de um tópico. MCP conecta o agente aos recursos de um servidor de Protocolo de Contexto de Modelo; ferramentas de API REST são configuradas a partir de uma especificação OpenAPI.

### 6.1 Adicionar e configurar

O nó `Send HTTP Request` fica na seção **Avançado** do menu **Adicionar nó**.

1. **Adicionar nó** (**+**) no ponto em que a chamada deve executar.
2. Aponte para **Avançado** → **Enviar solicitação HTTP**.
3. Em **URL**, informe o endpoint. URL estática → digite direto. URL dinâmica → use uma expressão **Power Fx**:

```powerfx
"https://api.carrier.example/tracking/" & Topic.TrackingNumber
```

4. Em **Método**, escolha entre `GET`, `POST`, `PATCH`, `PUT` e `DELETE`. A recuperação de status de remessa usa `GET`.

### 6.2 Cabeçalhos

Cabeçalhos passam metadados: tokens de autorização, tipo de conteúdo e o que mais a API exigir.

1. Em **Cabeçalhos e corpo**, selecione **Editar** → abre o painel **Propriedades da Solicitação HTTP**.
2. **Adicionar** → informe nome e valor do cabeçalho.
3. Repita para cada cabeçalho necessário.

> [!danger] Nunca coloque credenciais como texto literal
> Chaves de API, tokens de portador e afins **não** vão em campos de cabeçalho como string literal — qualquer criador com acesso à tela do tópico consegue vê-los. Armazene em **variáveis de ambiente** e referencie a variável no valor do cabeçalho. Isso mantém as credenciais fora da tela e gerenciáveis entre ambientes.

### 6.3 Corpo da requisição

Para `GET` o corpo normalmente fica vazio — o padrão **Sem Conteúdo** está correto. Para `POST`, `PATCH` e `PUT` você envia dados.

| Opção | Uso |
|---|---|
| **Sem Conteúdo** | Requisições `GET`; nada é enviado |
| **Conteúdo JSON** | Envia um objeto JSON; aceita JSON estático **ou fórmulas Power Fx** com variáveis de tópico dinâmicas |
| **Conteúdo bruto** | String arbitrária, quando a API espera formato não JSON |

> [!tip] Diagnóstico
> Se um `POST` ou `PATCH` é rejeitado silenciosamente pela API, **confira os cabeçalhos**. Falta de `Content-Type: application/json` é causa comum: a API recebe a requisição mas não consegue analisar o corpo porque não sabe o formato.

### 6.4 Esquema de resposta

Para o Copilot Studio expor os campos da resposta como variáveis utilizáveis, é preciso declarar a **forma** desses dados.

1. No nó, em **Tipo de dados resposta**, selecione **De Dados de Exemplo**.
2. Selecione **Obter esquema do JSON de exemplo**.
3. Cole uma resposta JSON de exemplo da documentação da API:

```json
{
  "trackingNumber": "1Z999AA10123456784",
  "status": "In transit",
  "estimatedDelivery": "2026-04-20",
  "lastLocation": "Chicago, IL"
}
```

4. **Confirmar** — o Copilot Studio gera um esquema de variável do Power Fx a partir do exemplo. Os campos passam a ter **suporte de IntelliSense** no editor Power Fx.
5. Em **Salvar resposta do usuário como**, atribua a resposta a uma variável, por exemplo `Topic.TrackingResponse`.

Para referenciar campos adiante, use **notação de ponto** do Power Fx:

```powerfx
Topic.TrackingResponse.status
Topic.TrackingResponse.estimatedDelivery
```

Capture apenas os campos que o tópico realmente usa — superfície de variáveis mínima facilita a manutenção.

### 6.5 Tratamento de erros

Requisições HTTP falham: a API pode estar indisponível, o número de rastreamento pode não existir no sistema da operadora, ou a resposta pode vir em formato inesperado. A configuração de erro decide se o cliente recebe uma mensagem útil ou se a conversa morre sem explicação.

| Modo | Comportamento |
|---|---|
| **Gerar um erro** *(padrão)* | Na falha, o agente dispara o tópico de sistema **On Error** e **interrompe o fluxo atual**. Aceitável em agentes internos/back-end; **não** em tópico voltado ao cliente |
| **Continuar no erro** | O tópico **continua executando** após o nó, tenha a requisição dado certo ou não |

**Como configurar:**

1. Em **Cabeçalhos e corpo**, selecione **Editar**.
2. Em **Tratamento de erros**, selecione **Continuar no erro**.
3. Atribua variáveis para capturar o **código de status HTTP** e o **corpo da resposta de erro** — por exemplo `Topic.StatusCode` e `Topic.ErrorResponse`.

Depois do nó, adicione uma **condição** que verifica `Topic.StatusCode`:

- **`200`** → sucesso: o tópico exibe o resultado do rastreamento
- **qualquer outro valor** → mensagem de fallback:
  > *"Não consigo obter o status do seu envio no momento. Tente novamente mais tarde ou entre em contato com nossa equipe de suporte."*

Isso mantém a conversa fluida, dá ao cliente um próximo passo claro e **evita expor detalhes técnicos do erro no chat**.

> [!note] Timeout da requisição
> O painel **Propriedades da Solicitação HTTP** tem uma configuração de **tempo limite** em milissegundos. O padrão é **30.000 ms (30 segundos)**. Se a API externa é conhecida por responder lentamente sob carga, aumente esse valor para evitar timeouts prematuros em períodos de alto tráfego.

---

## 7. Escolhendo entre os três

| | Ferramenta de conector | Fluxo de agente | Nó Enviar Solicitação HTTP |
|---|---|---|---|
| Escopo | Uma ação, um resultado | Workflow de várias etapas com ramificação | Uma chamada REST |
| Reutilização | Por ferramenta | **Chamável de vários tópicos** | Contido no tópico |
| Pré-requisito | Existir conector predefinido ou personalizado | Gatilho + `Respond to the agent` + fluxo de solução | Nenhum além do endpoint |
| Limite de tempo | — | **100 segundos** (síncrono) | **30.000 ms** padrão, ajustável |
| Credenciais | Autenticação do usuário final ou do criador | Herda a configuração do fluxo | Cabeçalhos com **variáveis de ambiente** |
| Tratamento de falha | Nó Condição sobre a saída | Agir sobre o status retornado | **Continuar no erro** + condição sobre `Topic.StatusCode` |

---

## Pontos-chave

- Tópico define a conversa; **ferramenta** é o que permite agir em sistema externo.
- Ferramenta no **nível do agente** → o orquestrador decide quando chamar. No **nível do tópico** → você decide o momento exato.
- **Criar consulta de pesquisa** e **Executar pesquisa personalizada** só existem no nível do tópico e separam recuperação de resposta.
- O padrão é sempre o mesmo: mapear **entradas** → executar → capturar **saídas** em `Topic.*` → **nó Condição** para a falha.
- Guarde só os campos que o tópico usa — esquema mínimo evita incompatibilidade de tipo e facilita manutenção.
- Dataverse é conector **premium**; credenciais do criador exigem **canal autenticado**.
- Fluxo de agente ≠ fluxo de nuvem: vive no Copilot Studio e é cobrado pelo consumo dele.
- Fluxo chamável precisa de `When an agent calls the flow` + `Respond to the agent` com **resposta assíncrona desativada**, e ser fluxo de solução.
- **100 segundos** é o teto síncrono do fluxo; o que vem depois de `Respond to the agent` roda assíncrono por até **30 dias**.
- No nó HTTP: URL dinâmica com Power Fx, credenciais em **variáveis de ambiente**, esquema **De Dados de Exemplo**, e **Continuar no erro** com verificação de `Topic.StatusCode = 200`.

---

### Documentação

- [Adicionar ferramentas a um agente personalizado](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/add-tools-custom-agent)
- [Usar conectores no Copilot Studio](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/advanced-connectors)
- [Fluxos de chamadas originados por tópicos](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/advanced-use-flow)
- [Criar um fluxo de agente como uma ferramenta](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/advanced-flow-create)
- [Usar o nó de solicitação HTTP](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/authoring-http-node)
- [Perguntas frequentes sobre fluxos de agentes](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/flows-faqs)
- [Configurar a segurança dos canais Web e Direct Line](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/configure-web-security)
- [Módulo original no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/take-action-agent-topics-tools-flows-copilot-studio/)
