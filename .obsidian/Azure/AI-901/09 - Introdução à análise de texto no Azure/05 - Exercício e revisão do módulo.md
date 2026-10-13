---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/pratica
modulo: "09"
titulo: "Exercício e revisão do módulo"
nivel: iniciante
---

# Exercício e revisão do módulo

O exercício oficial propõe usar um modelo generativo no portal do Foundry para tarefas comuns de NLP e explorar recursos do Azure Language nas ferramentas do Foundry.

## Sequência de prática

1. Experimente um modelo generativo com tarefas de texto, como análise de sentimento, extração de entidades ou resumo.
2. Especifique no prompt que tipo de resultado espera e compare respostas para diferentes instruções.
3. Explore as operações de Azure Language no portal, incluindo detecção de idioma e PII.
4. Compare a resposta livre do modelo com a saída estruturada da ferramenta especializada.
5. Pense como expor uma operação de linguagem ao agente usando o servidor MCP.

## Perguntas de revisão

- O que diferencia NLP de análise de texto?
- Quando escolher um modelo generativo em vez do Azure Language?
- O que o SDK Azure Language retorna para detecção de idioma?
- Como funciona a redação de PII?
- Qual o papel do objeto cliente no SDK?
- Como o agente se conecta ao servidor MCP e usa uma ferramenta?

## Respostas para conferir

- NLP reúne técnicas para processar e interpretar linguagem; análise de texto extrai informação útil de texto escrito.
- Modelo generativo atende tarefas flexíveis por prompt; Azure Language atende operações específicas que pedem resultados estruturados.
- A detecção de idioma fornece o idioma, código ISO e confiança.
- Detecção de PII identifica dados pessoais e pode fornecer o texto redigido.
- O objeto cliente configura a comunicação do aplicativo com o serviço.
- O agente atua como cliente MCP; o servidor MCP expõe e executa ferramentas.

## Checklist

- [ ] Sei diferenciar modelo generativo de Azure Language.
- [ ] Sei identificar tarefas de sentimento, frases-chave, entidades, idioma e PII.
- [ ] Sei diferenciar API, SDK e objeto cliente.
- [ ] Sei explicar cliente MCP e servidor MCP.
- [ ] Sei escolher a abordagem de acordo com o formato e a consistência da saída necessária.

## Fonte

- [Exercício — Introdução à análise de texto no Microsoft Foundry](https://learn.microsoft.com/pt-br/training/modules/get-started-text-analysis-azure/5-exercise)
