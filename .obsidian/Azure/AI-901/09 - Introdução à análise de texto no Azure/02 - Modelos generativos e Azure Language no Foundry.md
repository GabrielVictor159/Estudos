---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/analise-de-texto
modulo: "09"
titulo: "Modelos generativos e Azure Language no Foundry"
nivel: iniciante
---

# Modelos generativos e Azure Language no Foundry

No Microsoft Foundry, a análise de texto pode usar um **modelo generativo de uso geral** ou recursos específicos do **Azure Language in Foundry Tools**. As abordagens se complementam, mas têm características diferentes.

## Comparação

| Aspecto | Modelo generativo | Azure Language |
|---|---|---|
| **Como é usado** | Instruções em linguagem natural e prompts | Operações de linguagem específicas |
| **Flexibilidade** | Pode combinar tarefas e adaptar formato conforme o prompt | Foco em tarefas predefinidas |
| **Saída** | Texto e estrutura orientados pelo prompt; pode variar | Resultado estruturado para a operação |
| **Exemplos** | Resumir, traduzir, responder perguntas e classificar com categorias próprias | Detectar idioma, detectar/redigir PII e analisar entidades ou sentimento |
| **Indicado quando** | A tarefa é aberta ou exige interpretação flexível | Automação exige resultado consistente para uma tarefa conhecida |

Um modelo generativo pode executar tarefas como extração de frases-chave, reconhecimento de entidades, sentimento, resumo e tradução. A forma da resposta depende do prompt; ser explícito sobre formato e critérios ajuda a orientar a saída.

Azure Language oferece analisadores especializados para operações como **detecção de idioma** e **detecção de informações de identificação pessoal (PII)**. A detecção de idioma retorna idioma e código, além de uma pontuação de confiança. A detecção de PII identifica categorias de dados sensíveis e pode retornar uma versão redigida.

## Como escolher

- Prefira o **modelo generativo** quando a tarefa for aberta, combinada ou depender de instruções e interpretação flexíveis.
- Prefira **Azure Language** quando precisar da saída estruturada de uma operação específica e previsível.
- Teste com exemplos representativos. Modelos generativos podem variar a resposta entre chamadas; recursos especializados são úteis quando consistência e campos definidos importam.
- A mesma aplicação pode combinar as abordagens: o modelo interpreta e redige; uma ferramenta especializada retorna dados de linguagem estruturados.

Para fundamentos de modelo, implantação e API, consulte também [[08 - Introdução à IA generativa e aos agentes no Azure/02 - Catálogo e seleção de modelos|a nota sobre seleção de modelos no módulo 08]].

## Pontos-chave para revisão AI-900/AI-901

- Modelos generativos são flexíveis e orientados por prompts.
- Azure Language oferece recursos especializados para tarefas definidas.
- A API de Respostas pode gerar saídas que variam; o SDK Azure Language fornece resultados específicos da operação.
- O critério principal é o requisito de saída: flexibilidade versus estrutura e consistência.

## Fonte

- [Entender a análise de texto no Foundry — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-text-analysis-azure/2-azure-language)
