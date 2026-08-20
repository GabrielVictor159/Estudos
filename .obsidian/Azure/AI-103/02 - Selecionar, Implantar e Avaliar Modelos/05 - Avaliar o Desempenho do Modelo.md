---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - avaliacao
modulo: 02
---

# Avaliar o Desempenho do Modelo

Avaliação é o que transforma "parece bom" em evidência. Sem ela não há como saber se uma mudança de prompt melhorou ou piorou a solução.

## Por que avaliar — os quatro motivos

| Motivo | O que garante |
|---|---|
| **Garantia de qualidade** | Identifica problemas e assegura respostas precisas e relevantes |
| **Satisfação do usuário** | Respostas úteis e apropriadas de forma consistente |
| **Melhoria contínua** | Análise dos resultados revela oportunidades de aprimoramento |
| **Conformidade e segurança** | Verifica políticas, evita conteúdo prejudicial e respeita a privacidade |

![[m02-avaliacao-abordagens.png]]

---

## Abordagens manuais

### 1. Teste interativo

Humanos exploram o comportamento qualitativo do modelo: inserem prompts diversos no playground e observam as respostas. Identifica **informações incorretas**, **tom inadequado** e **falha em seguir instruções**. Permite **teste lado a lado**, sincronizando instruções do sistema e prompts entre modelos.

### 2. Revisão estruturada

Conjunto fixo de casos de teste avaliados segundo critérios definidos:

| Critério | Pergunta que responde |
|---|---|
| **Relevância** | A resposta aborda a pergunta ou solicitação? |
| **Informatividade** | Fornece detalhes suficientes e informações úteis? |
| **Envolvimento** | A resposta é interessante e adequadamente conversacional? |
| **Precisão** | Os fatos e as afirmações estão corretos? |
| **Segurança** | Evita conteúdo prejudicial, tendencioso ou inadequado? |

Avaliadores usam **escalas de classificação de 1 a 5**; as classificações **agregadas** fornecem uma medida quantitativa da qualidade geral.

### 3. Estudos do usuário

Coleta de comentários de usuários **reais ou representativos**. É o que revela problemas do mundo real: frases confusas, contexto ausente, expectativas não atendidas.

---

## Avaliação automatizada

### Os três tipos de avaliação

| Tipo | O que faz |
|---|---|
| **Modelo** | Avalia um modelo implantado com os prompts que você especifica; o **sistema gera as saídas** |
| **Agente** | Avalia as respostas de um agente com prompts definidos por você |
| **Conjunto de dados** | Avalia **saídas já geradas** presentes em um conjunto de dados de teste |

### De onde vêm os dados

| Opção | Detalhe |
|---|---|
| **Upload de novo conjunto** | Arquivo **CSV** ou **JSONL** do armazenamento local |
| **Conjunto existente** | Seleção entre conjuntos previamente carregados |
| **Conjunto sintético gerado** | O sistema gera dados de exemplo: você especifica o recurso que vai gerar, define o número de linhas, fornece um prompt descrevendo os dados desejados e pode carregar arquivos para melhorar a relevância |

### Fluxo de execução

1. Configure as **métricas** desejadas.
2. Configure os **mapeamentos de campo** para os dados de avaliação.
3. Configure o **prompt do sistema** para o modelo.
4. Inicie o trabalho de avaliação — a execução é **assíncrona**.
5. O trabalho processa **cada linha** contra as métricas selecionadas.

**Resultados:** pontuações **agregadas** para as métricas escolhidas, mais o **detalhe de cada prompt de teste**.

![Captura de tela dos resultados da avaliação](https://learn.microsoft.com/pt-br/training/wwl-data-ai/model-catalog-evaluate/media/evaluate-model.png)

### Avaliação assistida por IA

Você especifica um **modelo GPT** para atuar como avaliador. Esse modelo analisa as respostas e atribui pontuações com base nos critérios selecionados — é o mecanismo por trás das métricas de qualidade de geração e de risco e segurança (ver [[06 - Métricas de Avaliação - Referência]]).

---

## Biblioteca do avaliador

Local: página **Evaluation** → guia **Biblioteca do avaliador**.

- Visualizar **avaliadores com curadoria da Microsoft** para qualidade, segurança e desempenho.
- Examinar detalhes de cada um: nome, descrição, parâmetros e arquivos associados.
- Examinar os **prompts de anotação**, para entender **como cada métrica é calculada**.
- Verificar definições e **níveis de gravidade** dos avaliadores de segurança.
- Gerenciar **avaliadores personalizados** para cenários específicos.
- **Gerenciamento de versão**: comparar, restaurar e colaborar.

---

## Iteração baseada em avaliação

![[m02-iteracao.png]]

### Quando as pontuações de qualidade estão abaixo do necessário

| Ação | Quando aplicar |
|---|---|
| **Engenharia de prompt** | Sempre primeiro — refinar instruções e mensagens do sistema é o ajuste mais barato |
| **Modelos diferentes** | Quando o teto do modelo atual foi atingido; volte ao placar de cenário |
| **Integração de RAG** | Quando o problema é **falta de informação**, não falta de capacidade |
| **Ajuste fino** | Quando o domínio é muito específico e o modelo suporta — o caminho mais caro |

### Quando as métricas de segurança mostram preocupações

| Ação | O que faz |
|---|---|
| **Filtros de conteúdo** | Implementar os serviços de **Segurança de Conteúdo de IA do Azure** |
| **Fortalecimento de prompt** | Adicionar instruções de segurança às mensagens do sistema |
| **Validação de saída** | Verificar as respostas **antes** de exibi-las ao usuário |

### Melhores práticas

- Estabeleça os **parâmetros de avaliação no início** do desenvolvimento, não no fim.
- Avalie **regularmente**, conforme as alterações são feitas.
- **Reexecute** as avaliações após cada modificação, para medir o impacto **objetivamente**.

---

## Tabela de decisão: situação → abordagem

| A situação é… | Use |
|---|---|
| "Quero sentir como o modelo responde ao nosso jargão" | Teste interativo no playground |
| "Preciso de um número comparável entre versões" | Avaliação automatizada |
| "Quero saber se o tom soa arrogante" | Revisão estruturada (critério Envolvimento) ou estudo do usuário |
| "Preciso avaliar 500 casos toda semana" | Avaliação automatizada com conjunto de dados |
| "Não tenho dados de teste ainda" | Conjunto de dados **sintético** gerado pelo sistema |
| "Já tenho as respostas geradas, quero só pontuá-las" | Avaliação do tipo **Conjunto de dados** |
| "Quero avaliar um agente, não um modelo cru" | Avaliação do tipo **Agente** |
| "Preciso entender como a métrica é calculada" | **Prompts de anotação** na Biblioteca do avaliador |
| "As respostas inventam fatos" | Métrica de **Fundamentação** → depois **RAG** |
| "O modelo cede a prompts maliciosos" | Métrica de **ataque indireto** → depois **filtros de conteúdo** |

---

## Pontos que costumam confundir

**Manual e automatizada não competem.** Automatizada dá escala e comparabilidade; manual pega o que métrica nenhuma captura. O padrão esperado é combinar: automatizado a cada mudança, manual nos marcos.

**"Modelo" × "Conjunto de dados" como tipo de avaliação.** No tipo **Modelo**, o sistema **gera** as saídas na hora. No tipo **Conjunto de dados**, as saídas **já existem** e só são pontuadas.

**A execução é assíncrona.** Avaliação não é chamada síncrona: é um **trabalho** que processa linha a linha.

**Conjunto sintético é recurso oficial.** Cenários que dizem "ainda não temos dados de teste" não são impedimento — o sistema gera o conjunto a partir de um prompt e de um número de linhas.

**Ordem das correções importa.** Prompt → outro modelo → RAG → ajuste fino é a ordem do mais barato para o mais caro. Cenários que pedem "a abordagem mais econômica" respondem prompt; os que dizem "o modelo não conhece nossos dados" respondem RAG.

**Alucinação é problema de fundamentação, e a cura é RAG.** Ajuste fino não resolve falta de informação — resolve falta de estilo ou de vocabulário de domínio.

---

## Aprofundar na documentação

- [Avaliar o desempenho do modelo — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/5-evaluate-performance)
- Páginas relacionadas: [[06 - Métricas de Avaliação - Referência]] · [[05 - IA Responsável - Princípios e Aplicação]]
