---
tags:
  - AI-103
  - azure/ai
  - moc
modulo: 01
titulo: Planejar e preparar-se para desenvolver soluções de IA no Azure
nivel: iniciante
---

# Planejar e Preparar Soluções de IA no Azure

Nota de entrada do módulo. Reúne as decisões que antecedem qualquer linha de código em um projeto de IA no Azure: **qual capacidade de IA o cenário exige**, **qual abordagem custa menos para resolvê-lo**, **como o Azure organiza esses ativos** e **o que o time precisa garantir em termos de IA responsável**.

![[m01-fluxo-preparacao.png]]

---

## Páginas deste módulo

| # | Página | O que resolve |
|---|--------|---------------|
| 1 | [[01 - Capacidades e Cargas de Trabalho de IA]] | As cinco cargas de trabalho de IA e como reconhecer cada uma em um cenário |
| 2 | [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]] | Como o Azure organiza modelos, agentes, ferramentas e conhecimento |
| 3 | [[03 - Foundry Tools - Capacidades Prontas de IA]] | Os serviços prontos (Language, Speech, Translator, Document Intelligence, Content Understanding) e quando preferi-los a um LLM |
| 4 | [[04 - Ferramentas de Desenvolvimento e SDKs]] | IDEs, extensões, linguagens, SDKs e REST — o que usar para conectar o app |
| 5 | [[05 - IA Responsável - Princípios e Aplicação]] | Os seis princípios da Microsoft e como eles aparecem em questões de cenário |

---

## Mapa mental do módulo em uma frase

> Uma **carga de trabalho de IA** (geração, NLP, fala, visão ou extração) é atendida por um **modelo generativo**, uma **Foundry Tool** ou um **agente**; todos vivem dentro de um **projeto** hospedado em um **recurso do Microsoft Foundry**; o app fala com eles por um **endpoint** usando um **SDK**; e tudo isso é governado pelos **seis princípios de IA responsável**.

---

## Tabela de decisão rápida

| Se o cenário pede… | A resposta é |
|---|---|
| Tarefa padronizada e repetitiva (traduzir, transcrever, extrair campos, medir sentimento) | Uma **Foundry Tool** específica — mais barata e previsível |
| Gerar texto original, resumir com estilo, interpretar pedidos ambíguos | Um **modelo generativo** do catálogo **Foundry Models** |
| Executar tarefas com autonomia, consultar dados internos e chamar sistemas | Um **agente** no **Foundry Agent Service** |
| Organizar modelos, agentes e ferramentas de uma solução | Um **projeto** dentro de um **recurso do Microsoft Foundry** |
| Testar e comparar modelos sem escrever código | O **portal do Microsoft Foundry** (playgrounds) |
| Automatizar a criação de ativos em pipeline de CI/CD | O **SDK do Microsoft Foundry** |
| Chamar um modelo com sintaxe já conhecida da OpenAI | O **endpoint do Azure OpenAI** com o **SDK da OpenAI** |
| Justificar por que um modelo negou um pedido | Princípio de **Transparência** (ver [[05 - IA Responsável - Princípios e Aplicação]]) |

---

## Objetivos de aprendizagem cobertos

- [x] Identificar recursos comuns de IA que podem ser implementados em aplicativos
- [x] Descrever o Microsoft Foundry e as considerações para usá-lo
- [x] Descrever as Foundry Tools e as considerações para usá-las
- [x] Identificar as ferramentas de desenvolvedor e os SDKs apropriados para um projeto de IA
- [x] Descrever as considerações de IA responsável

---

## Prática recomendada

O módulo inclui um laboratório de ~30 minutos para explorar o portal na prática (requer assinatura do Azure — a [conta gratuita](https://azure.microsoft.com/pricing/purchase-options/azure-account) cobre os créditos iniciais).

- [Exercício: Preparar-se para um projeto de desenvolvimento de IA](https://go.microsoft.com/fwlink/?linkid=2353647&azure-portal=true)

O que vale exercitar no portal, porque cai como questão de "onde faço X":

1. Criar um recurso do Microsoft Foundry e observar que o **projeto padrão** nasce junto.
2. Abrir o **catálogo de modelos**, filtrar e comparar dois modelos.
3. Implantar um modelo e testá-lo no **playground**.
4. Localizar **endpoint e chaves** do projeto na tela de configuração.
5. Ver onde ficam **agentes**, **conexões MCP** e **ferramentas**.

---

## Aprofundar na documentação

- [Módulo completo no Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/prepare-azure-ai-development/)
- [Visão geral do SDK do Microsoft Foundry](https://learn.microsoft.com/pt-br/azure/foundry/how-to/develop/sdk-overview?azure-portal=true)
- [Microsoft Foundry (clássico) — arquitetura baseada em hub](https://learn.microsoft.com/pt-br/azure/foundry-classic/what-is-foundry?azure-portal=true)
- [IA responsável na Microsoft](https://microsoft.com/ai/responsible-ai)

---

Próximo módulo: [[AI-103/02 - Selecionar, Implantar e Avaliar Modelos/00 - Índice do Módulo 02]]
