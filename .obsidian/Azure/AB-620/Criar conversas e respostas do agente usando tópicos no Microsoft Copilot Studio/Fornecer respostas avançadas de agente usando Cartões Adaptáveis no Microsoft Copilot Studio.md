# Cartões Adaptáveis e respostas avançadas no Microsoft Copilot Studio

Como fazer um agente sair do texto puro: formatar mensagens, exibir dados estruturados em cartões, coletar entradas em formulário e garantir que tudo renderize no canal de destino.

![[cartoes-adaptaveis-fluxo.svg]]

---

## 1. Formatação de mensagens

O nó **Enviar uma mensagem** tem uma barra de ferramentas de formatação leve que controla como o texto aparece na conversa.

![Nó de mensagem no Copilot Studio](https://learn.microsoft.com/pt-br/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/media/message-node.png)

### 1.1 Texto

- **Negrito** e *itálico* → ênfase em termos-chave
- Listas numeradas e com marcadores → organizar informações relacionadas
- Quebras de linha → controlar espaçamento e legibilidade

> [!warning] A formatação renderiza de forma diferente entre canais
> Negrito e itálico funcionam de forma consistente no **Teams** e no **chat da Web**. Alguns canais **removem a formatação inteiramente**.

### 1.2 Variáveis — o ícone `{x}`

O controle **`{x}`** abre o seletor de variáveis. A variável escolhida é inserida na posição do cursor e resolvida para o valor de runtime quando o tópico executa.

| Escopo | Prefixo | Vive enquanto |
|---|---|---|
| Tópico | `Topic.` | O tópico está em execução |
| Global | `Global.` | Toda a sessão de conversa |
| Sistema | `System.` | Fornecido pela plataforma (ex.: `System.User.DisplayName`) |

**Exemplo:** na resposta sobre política de licença, inserir `System.User.DisplayName` para saudar o funcionário pelo nome, deixar os totais de direito em negrito e listar as condições da política com marcadores. O mesmo conteúdo que antes exigia ler um parágrafo passa a ser entendido de relance.

### 1.3 Imagens e vídeos

Adicionados pelo menu **Adicionar** do nó de mensagem.

| Mídia | Origem aceita |
|---|---|
| Imagem | URL hospedada publicamente |
| Vídeo | Link `.mp4` direto ou URL do YouTube |

Ambos aceitam um **título opcional** exibido ao lado da mídia. Imagens e vídeos aparecem como **cartões** dentro da mensagem.

Com mais de um cartão de mídia no mesmo nó, a exibição padrão é **carrossel** (um por vez, com setas). Para ver todos de uma vez, selecione um cartão e alterne para **Lista** pelo ícone na barra de menus do nó — útil quando o usuário precisa comparar as opções sem rolar uma a uma.

> [!danger] O agente não acessa arquivos internos ou autenticados
> A mídia precisa estar em URL publicamente acessível: SharePoint com compartilhamento de link anônimo habilitado, ou Armazenamento de Blobs do Azure com acesso de leitura público.

### 1.4 Variações de mensagem

Um agente que diz sempre a mesma frase soa mecânico para quem interage com frequência. As **variações** permitem definir várias formulações para um único nó — a cada execução o Copilot Studio escolhe **uma aleatoriamente**.

- Adicionadas pelo menu **Adicionar**; cada variação é uma caixa de texto separada.
- Cada variação suporta os mesmos recursos da mensagem primária: negrito, listas, inserção de variável e imagens.

**Exemplo de saudação:**

- "Olá! Como posso ajudar com suas perguntas de licença hoje?"
- "Oi, o que você gostaria de saber sobre sua licença?"
- "Bom vê-lo. Com o que posso ajudar hoje?"

> [!important] Variações mudam as palavras, nunca a informação
> Se uma variação menciona os prazos de envio, **todas** devem mencionar. Elas não podem introduzir diretrizes diferentes.

### 1.5 Respostas rápidas

Botões de sugestão tocáveis que aparecem abaixo da mensagem e fazem a conversa avançar quando selecionados. Reduzem erro de digitação e encurtam o caminho até a resolução.

**Exemplo:** na mensagem de abertura do agente de RH — `licença anual`, `licença médica`, `licença parental`, `enviar uma solicitação de licença`.

Uma resposta rápida do tipo padrão "Enviar uma mensagem" tem:

| Propriedade | Função |
|---|---|
| **Title** | Texto exibido no botão |
| **Text** | Mensagem enviada ao agente quando selecionada |
| **Tipo** | Ação executada |

Tipos de ação disponíveis: enviar mensagem ao agente, abrir uma URL, fazer uma chamada, enviar uma **mensagem oculta**.

**Resposta rápida × nó Pergunta:**

| | Respostas rápidas | Nó Pergunta |
|---|---|---|
| Natureza | Sugestão | Requisito |
| Usuário pode digitar livremente? | Sim, pode ignorar os botões | Não, precisa escolher ou inserir opção reconhecida |
| Conversa avança sem escolher? | Sim | Não, fica parada até resposta válida |
| Serve para | **Orientar** | **Restringir** |

> [!tip] Em superfícies móveis as respostas rápidas rendem muito
> Tocar num botão é mais rápido e menos propenso a erro do que digitar.

### 1.6 O limite da formatação simples

Markup, mídia, variações e respostas rápidas não organizam **conteúdo estruturado e rico em dados**. Mostrar um saldo de licença bem exige campos rotulados, direito total e dias restantes lado a lado — não uma frase que os descreve. É aí que entram os Cartões Adaptáveis.

---

## 2. Cartões Adaptáveis informativos

**Cartão Adaptável** é um formato de cartão aberto da Microsoft — suportado em Teams, Outlook, Power Apps e outras plataformas — em que o layout visual é definido em **JSON** e renderizado nativamente por qualquer host compatível. No Copilot Studio você monta o cartão num designer visual e, quando preciso, refina o JSON diretamente.

### 2.1 Os dois papéis do cartão dentro de um tópico

| Papel | Nó | Comportamento |
|---|---|---|
| **Informativo** | Enviar uma mensagem | Exibe conteúdo rico e a conversa continua automaticamente. **Nenhuma entrada é coletada.** |
| **Interativo** | Perguntar com Cartão Adaptável | Funciona como formulário (texto, listas suspensas, seletores de data). As entradas são mapeadas para variáveis de tópico. |

### 2.2 O designer

Caminho: tela de criação do tópico → selecionar o nó de mensagem → **Adicionar** → **Cartão Adaptável** → **Editar cartão adaptável**.

O designer é um editor de arrastar e soltar que gera JSON válido internamente — começar por ele evita erros de sintaxe. Tem três áreas:

1. **Visualização do cartão** — renderização ao vivo enquanto você monta
2. **Caixa de ferramentas de elementos** — onde você navega e escolhe elementos
3. **Painel de propriedades** — configura o elemento selecionado

Elementos são adicionados arrastando da caixa de ferramentas para a tela. Selecionar um elemento na visualização abre suas propriedades (Texto de um TextBlock, URL de uma Image, tamanho, peso, cor).

### 2.3 Elementos do cartão

**Layout — controlam a estrutura:**

- **Container** — agrupa elementos relacionados e aplica espaçamento ou estilo de plano de fundo compartilhado
- **ColumnSet** — divide o conteúdo em uma linha horizontal de colunas
- **Column** — contém uma parte de uma linha do ColumnSet

**Conteúdo — exibem dados:**

- **TextBlock** — texto com tamanho, peso e comportamento de quebra configuráveis
- **Image** — foto ou ícone a partir de uma URL

![Cartão Adaptável de resumo de saldo de licenças](https://learn.microsoft.com/pt-br/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/media/leave-balance-summary-card.png)

**Estrutura do cartão de saldo de licença:**

```text
Container                       ← agrupa tudo, padding consistente
├── Image (opcional)            ← ícone da categoria de licença
└── ColumnSet
    ├── Column 1 → TextBlock    ← tipo de licença + direito total
    └── Column 2 → TextBlock    ← saldo restante
```

> [!important] Limite cada cartão a três a cinco pontos de dados
> Um cartão que tenta mostrar tudo fica ilegível, principalmente no celular. No cartão de saldo: tipo de licença, direito total e saldo restante. Nada mais.

> [!tip] ColumnSet serve para dados comparáveis lado a lado
> Tipo de licença à esquerda, dias restantes à direita — alinhados e visíveis de relance, em vez de empilhados em parágrafos. O mesmo padrão vale para um agente de catálogo mostrando imagem, nome e preço de um produto no mesmo cartão.

### 2.4 Refinar pelo JSON

Selecionar **Editar JSON** abre a definição completa do cartão; **Salvar** volta para a visualização já atualizada. Se houver erro de sintaxe, o painel de visualização mostra um aviso — o problema aparece antes de o tópico rodar em um canal.

O JSON é para **ajustes manuais direcionados**, não para construir a estrutura do zero. Motivos comuns para editar:

| Propriedade | Efeito |
|---|---|
| `"wrap": true` (TextBlock) | Quebra texto longo em vez de truncar com reticências |
| `"spacing"` | Controla o espaçamento entre elementos |
| `"style": "emphasis"` (Container) | Plano de fundo sutil que agrupa visualmente conteúdo relacionado |
| `"minHeight"` (Container) | Mantém tamanhos consistentes entre cartões de um carrossel |

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [
    {
      "type": "Container",
      "style": "emphasis",
      "minHeight": "120px",
      "items": [
        {
          "type": "TextBlock",
          "text": "Saldo de licenças",
          "size": "Medium",
          "weight": "Bolder",
          "wrap": true
        },
        {
          "type": "ColumnSet",
          "spacing": "Medium",
          "columns": [
            {
              "type": "Column",
              "width": "stretch",
              "items": [
                { "type": "TextBlock", "text": "Licença anual", "wrap": true },
                { "type": "TextBlock", "text": "Direito total: 25 dias", "isSubtle": true, "wrap": true }
              ]
            },
            {
              "type": "Column",
              "width": "auto",
              "items": [
                { "type": "TextBlock", "text": "12 dias restantes", "weight": "Bolder", "wrap": true }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

O [Adaptive Cards Hub](https://adaptivecards.microsoft.com/) e seu [designer](https://adaptivecards.microsoft.com/designer) servem para redigir e visualizar o JSON fora do Copilot Studio antes de colar no tópico.

### 2.5 Dados dinâmicos com Power Fx

Texto codificado funciona para conteúdo fixo, como uma visão geral de política que nunca muda. Quando o conteúdo vem de uma ação de conector, uma requisição HTTP ou uma etapa anterior do tópico, o cartão precisa refletir os valores de runtime.

> [!success] Abordagem recomendada
> Calcule os valores em **variáveis de tópico anteriores** no fluxo e apenas **referencie a variável** nas propriedades de texto do cartão. Se precisar manipular o valor antes de exibir — formatar um número com rótulo de unidade, por exemplo — faça isso numa variável anterior, não em linha no cartão.

```json
{ "type": "TextBlock", "text": "=Topic.AnnualLeaveBalance & ' dias restantes'", "wrap": true }
```

No momento da renderização o Copilot Studio avalia a expressão e substitui o valor da variável antes de exibir o cartão.

### 2.6 Vários cartões: carrossel ou lista

| | Carrossel | Lista |
|---|---|---|
| Exibição | Um cartão por vez, navegação horizontal por setas | Todos empilhados verticalmente |
| Melhor quando | Cada cartão é um item distinto e o usuário age em um resultado por vez (ex.: catálogo de produtos) | O usuário precisa comparar tudo de uma vez, ou há só dois ou três cartões |

Para alternar: selecione qualquer Cartão Adaptável no nó de mensagem e use o alternador de layout na barra de menus do nó.

**Exemplo:** exibir os resumos de licença anual, médica e parental pede **lista** — o funcionário compara os três ao mesmo tempo rolando a tela, sem navegar cartão por cartão.

> [!warning] A renderização de carrossel varia por canal
> O Teams renderiza com navegação horizontal como esperado. Alguns canais empilham os cartões verticalmente independentemente da configuração de layout.

---

## 3. Cartões Adaptáveis interativos: coletar entradas

Percorrer quatro campos com quatro nós **Pergunta** adiciona quatro etapas à conversa. O nó **Perguntar com Cartão Adaptável** resolve os quatro numa única etapa: apresenta um cartão com elementos de entrada embutidos, e os valores vão direto para variáveis de tópico quando o usuário envia.

### 3.1 Qual nó usar

| | Nó Pergunta | Perguntar com Cartão Adaptável |
|---|---|---|
| Coleta | Um valor por vez | Vários valores relacionados de uma vez |
| Turnos de conversa | Um por valor (4 campos = 4 turnos) | Um turno para todos |
| Bom para | Texto curto, número, confirmação sim/não, ramificações simples | Formulários (solicitação de licença, ticket, cadastro) |

### 3.2 Os seis tipos de elemento de entrada

| Elemento | O que é | Retorno / observação |
|---|---|---|
| **Input.Text** | Campo de texto de linha única ou multilinha | Texto aberto |
| **Input.Number** | Campo numérico | Restrições opcionais de mínimo e máximo |
| **Input.Date** | Seletor de data | String no formato `YYYY-MM-DD` |
| **Input.Time** | Seletor de hora | String no formato `HH:MM` |
| **Input.Toggle** | Caixa de seleção | `true` / `false` — use para campos boolianos |
| **Input.ChoiceSet** | Lista suspensa ou botões de opção | Para conjunto predefinido de opções, em vez de texto livre |

![Cartão Adaptável de formulário de solicitação de licença](https://learn.microsoft.com/pt-br/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio/media/leave-request-form-card.png)

**Formulário de solicitação de licença:**

- `Input.ChoiceSet` → tipo de licença, com as opções Licença Anual, Licença Médica e Licença Parental
- `Input.Date` → data de início **[Obrigatório]**
- `Input.Date` → data de término **[Obrigatório]**
- `Input.Text` com **Multilinha** habilitado → motivo

Marcar um campo como **Obrigatório** no painel de propriedades impede o envio do formulário sem aquele valor.

### 3.3 O botão de envio

Todo formulário precisa de um **`Action.Submit`**. O Copilot Studio já adiciona um botão Enviar padrão, mas o rótulo deve ser personalizado pela propriedade **Título** — `Submit request` é mais específico e acionável do que o genérico `Submit`.

Ao clicar, todos os campos preenchidos são empacotados e enviados ao agente como **um único conteúdo**. O Copilot Studio mapeia cada `id` para sua variável de tópico correspondente e as disponibiliza para todos os nós seguintes.

### 3.4 Variáveis de saída

Cada elemento de entrada tem uma propriedade **ID**. Depois do envio, o Copilot Studio cria automaticamente uma variável de tópico baseada nesse `id`.

IDs padrão (`input1`, `input2`…) geram `Topic.input1`, `Topic.input2` — tecnicamente corretos, mas difíceis de usar nos nós seguintes. Prefira IDs descritivos em camelCase:

| ID no cartão | Variável gerada | Conteúdo |
|---|---|---|
| `leaveType` | `Topic.leaveType` | Tipo de licença selecionado |
| `startDate` | `Topic.startDate` | Data de início |
| `endDate` | `Topic.endDate` | Data de término |
| `leaveReason` | `Topic.leaveReason` | Justificativa do funcionário |

Essas variáveis podem ser usadas em um nó **Enviar uma mensagem** de confirmação — *"Sua solicitação de **Licença Anual** de **2027-01-11** a **2027-01-15** foi enviada."* — ou passadas direto para um fluxo de agente ou chamada de ferramenta que cria o registro no sistema de RH, sem análise manual nem transformação.

### 3.5 Cartões não enviados

Se o usuário fechar o cartão sem clicar em Enviar, as variáveis de saída ficam **vazias** — o Copilot Studio não gera valor nenhum de um cartão não submetido.

> [!danger] Sempre coloque um nó Condição logo depois
> Verifique se as variáveis obrigatórias contêm valores (no formulário de licença, no mínimo que o tipo de licença não esteja em branco). Se estiver vazia, direcione para uma ramificação de tratamento — por exemplo, uma mensagem oferecendo reiniciar o formulário — em vez de seguir para nós que esperam as variáveis preenchidas. Pular essa verificação causa erros difíceis de rastrear até o cartão descartado.

### 3.6 Cartões consecutivos

Quando o agente envia vários Cartões Adaptáveis na mesma conversa — cartões em sequência, novas tentativas, interrupções — o usuário pode clicar em Enviar num cartão antigo. Para o agente distinguir de qual cartão e ação veio a resposta, inclua um identificador exclusivo no `data` de cada envio e valide-o ao processar:

```json
{
  "type": "Action.Submit",
  "title": "Confirm",
  "data": {
    "actionSubmitId": "booking_confirm_card_v3_confirm"
  }
}
```

### 3.7 ChoiceSet preenchido dinamicamente

Quando as opções vêm de uma etapa anterior — uma requisição HTTP que recupera as categorias válidas em runtime, por exemplo — substitua a matriz codificada por uma expressão Power Fx:

```json
{
  "type": "Input.ChoiceSet",
  "id": "leaveType",
  "label": "Leave type",
  "choices": "=Topic.AvailableLeaveTypes"
}
```

> [!important] Formato exigido
> `Topic.AvailableLeaveTypes` precisa ser uma **tabela com as colunas `title` e `value`** — o formato que o Input.ChoiceSet espera.

Use dinâmico quando a lista realmente varia por usuário, região ou política. Para listas estáveis, opções codificadas são mais simples e menos propensas a erro de runtime.

---

## 4. Esquema e comportamento por canal

O cartão fica perfeito na visualização do designer, o teste no chat da Web confirma que renderiza, aí o mesmo agente abre no Microsoft Teams e o cartão **some** — vira texto sem formatação ou um espaço em branco. A causa é **incompatibilidade de versão de esquema**.

Os recursos disponíveis para Cartões Adaptáveis são descritos por esquemas versionados. Cada canal suporta uma versão máxima; elementos de uma versão mais nova não renderizam em canais que ainda não a implementam.

### 4.1 Versão máxima de esquema por canal

| Canal | Versão máxima |
|---|---|
| Microsoft Teams | **v1.5** |
| Live Chat (Omnicanal) | **v1.5** |
| Canal da Web | **v1.6** |

> [!warning] A falha é silenciosa
> Se o JSON referenciar recursos da v1.6 e o agente estiver no Teams ou no Live Chat, esses elementos falham sem aviso ou fazem o **cartão inteiro cair para texto simples**. O designer não alerta sobre a incompatibilidade em tempo de criação.

> [!note] Restrição extra do canal da Web
> O canal da Web **não dá suporte a `Action.Execute`**. Use `Action.Submit` para garantir compatibilidade.

### 4.2 Declarar a versão no JSON

A propriedade `version` fica no topo da definição, ao lado de `$schema`:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.5"
}
```

Cartões copiados do Adaptive Cards Hub ou de outra fonte externa devem ter o campo `version` conferido antes de serem inseridos no tópico — usar um cartão sem verificar a versão é uma das causas mais comuns de falha de renderização em produção.

### 4.3 Testar no canal real

- O **painel de teste** do Copilot Studio renderiza usando o mecanismo do **canal da Web (v1.6)**. É um proxy razoável para o canal da Web, mas não para Teams ou Live Chat.
- A **tela de criação** não renderiza cartões v1.6 — só o painel de teste renderiza.
- Um cartão que usa recursos da v1.6 pode parecer correto na janela de teste e falhar no Teams.
- Testar no Teams exige **publicar** o agente e disparar o tópico dentro do cliente do Teams. Comparar as duas saídas lado a lado revela as diferenças antes de o cartão chegar ao usuário.

### 4.4 Estratégia para agentes multicanal

| | **Opção 1 — projetar para v1.5** (recomendada) | **Opção 2 — detecção de canal com variantes** |
|---|---|---|
| Como | Usar apenas elementos da v1.5 em todos os cartões | Condições de nível de tópico roteiam cada canal para uma versão diferente do cartão |
| Ganho | Renderização consistente em Teams, Live Chat e Web, sem tratamento especial | Aproveita as melhorias de layout da v1.6 na Web |
| Custo | Abre mão do pequeno conjunto de melhorias da v1.6 | Duas definições de cartão para manter sincronizadas |

Se qualquer parte do público usa Teams ou Live Chat, projetar tudo para v1.5 elimina uma categoria inteira de bugs de renderização — é a abordagem mais comum em produção. A opção 2 só se justifica quando a diferença visual compensa a manutenção dobrada.

### 4.5 Respostas rápidas também dependem do canal

- Alguns canais **não suportam** respostas rápidas: os botões simplesmente não aparecem, embora a mensagem ainda seja entregue.
- Outros suportam, mas **limitam quantas exibem de uma vez**, ocultando silenciosamente o excedente.

> [!important] Nunca dependa das respostas rápidas como único caminho
> Usuários em canais sem suporte precisam de outra saída — por exemplo, um texto de mensagem claro pedindo que digitem a resposta.

---

## Pontos-chave

- Variáveis (`{x}`), mídia, variações e respostas rápidas enriquecem o texto, mas não organizam dados estruturados.
- Mídia exige URL pública; o agente não alcança servidores internos nem conteúdo autenticado.
- Resposta rápida **orienta**; nó Pergunta **restringe**.
- Cartão em nó de mensagem = informativo; nó Perguntar com Cartão Adaptável = interativo.
- Layout: Container, ColumnSet, Column. Conteúdo: TextBlock, Image. Três a cinco pontos de dados por cartão.
- Comece pelo designer; use o JSON só para ajustes (`wrap`, `spacing`, `style`, `minHeight`).
- Calcule valores em variáveis de tópico antes e referencie com `=Topic.X` no cartão.
- O `id` do input define a variável de saída (`Topic.<id>`) — use camelCase descritivo.
- Cartão fechado sem envio deixa variáveis vazias: sempre um nó Condição depois.
- Teams 1.5 · Live Chat 1.5 · Web 1.6. Web não suporta `Action.Execute`. Multicanal ⇒ projete para v1.5 e teste no canal real.

---

### Documentação

- [Enviar uma mensagem](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/authoring-send-message)
- [Uso de Cartões Adaptáveis no Copilot Studio](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/adaptive-cards-overview)
- [Perguntar com Cartão Adaptável](https://learn.microsoft.com/pt-br/microsoft-copilot-studio/authoring-ask-with-adaptive-card)
- [Adaptive Cards Hub](https://adaptivecards.microsoft.com/) · [Designer](https://adaptivecards.microsoft.com/designer)
- [Módulo original no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/deliver-rich-agent-responses-adaptive-cards-copilot-studio)
