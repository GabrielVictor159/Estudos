---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - fine-tuning
  - LoRA
  - otimização
modulo: 05
---

# Ajuste Fino (Fine-Tuning)

A engenharia de prompt orienta o comportamento, o RAG fundamenta com dados, mas às vezes o modelo **ainda não produz respostas com estilo, tom ou formato consistente**. Quando instruções detalhadas e exemplos few-shot não resolvem, é hora de **ajustar (fine-tune)** o modelo.

**Fine-tuning** é o processo de pegar um modelo pré-treinado e treiná-lo com um **conjunto de dados menor e específico**, ajustando seus pesos internos para que produza respostas consistentes com os padrões demonstrados.

---

## O que é LoRA

O ajuste fino no Azure usa **LoRA (Low-Rank Adaptation)** — uma técnica que aproxima as mudanças de peso com uma representação de classificação inferior:

| Aspecto | Sem LoRA | Com LoRA |
|---|---|---|
| O que é treinado | Todos os parâmetros do modelo | Apenas um **subconjunto** menor |
| Velocidade | Lento | Mais rápido |
| Custo computacional | Alto | Reduzido |
| Qualidade do resultado | Referência | Mantida |

> LoRA torna o ajuste fino **viável** sem retreinar bilhões de parâmetros.

---

## Quando ajustar

O ajuste fino é adequado quando a engenharia de prompt **sozinha não alcança a consistência necessária**:

| Cenário de uso | Por que ajustar |
|---|---|
| **Estilo e tom consistentes** | A organização tem voz de marca que o modelo precisa seguir em todas as interações |
| **Formatos de saída específicos** | Precisa de saída estruturada (ex.: JSON em schema definido) que few-shot não garante |
| **Reduzir comprimento do prompt** | Mensagens de sistema longas com muitos exemplos consomem tokens e aumentam latência — ajuste fino incorpora os padrões |
| **Destilação** | Transferir capacidades de modelo grande/caro para modelo menor/eficiente |
| **Aprimorar uso de ferramentas** | Melhorar precisão da seleção de ferramentas e geração de parâmetros no function calling |

> **Importante:** sempre avalie o **desempenho baseline** de um modelo padrão antes de ajustar. Sem baseline, não dá para saber se o ajuste fino melhorou ou degradou.

---

## Tipos de ajuste fino no Microsoft Foundry

| Técnica | Como funciona | Melhor para |
|---|---|---|
| **SFT (Supervised Fine-Tuning)** | Treina com pares rotulados de prompt → resposta | Tarefas com saídas claras e bem definidas |
| **RFT (Reinforcement Fine-Tuning)** | Otimiza via feedback iterativo com avaliador que recompensa melhores respostas | Tarefas complexas com múltiplas soluções; melhoria de raciocínio |
| **DPO (Direct Preference Optimization)** | Alinha com preferências humanas via pares de resposta preferida/não preferida | Alinhamento comportamental; computacionalmente mais leve que RL |

> Você pode **combinar técnicas**: primeiro SFT para personalizar, depois DPO para alinhar às preferências.

---

## Formato dos dados de treinamento

O ajuste fino exige um dataset em formato **JSONL** (JSON Lines). Para modelos de chat, cada exemplo é uma conversa:

```json
{"messages": [{"role": "system", "content": "You are a friendly travel advisor for Margie's Travel."}, {"role": "user", "content": "What's a good beach destination in Europe?"}, {"role": "assistant", "content": "For a beautiful European beach experience, consider the Algarve in southern Portugal! It offers stunning golden cliffs, warm waters, and charming coastal towns. The best time to visit is from May through September."}]}
{"messages": [{"role": "system", "content": "You are a friendly travel advisor for Margie's Travel."}, {"role": "user", "content": "I need a budget hotel in Tokyo."}, {"role": "assistant", "content": "Here are some great budget-friendly options in Tokyo:\n\n- **Sakura Hotel Jimbocho** - Central location, from $45/night\n- **Khaosan World Asakusa** - Near Senso-ji temple, from $35/night\n- **Imano Tokyo Ginza Hostel** - Modern design, from $40/night\n\nAll three options are close to public transit."}]}
```

### Checklist de preparação dos dados

- ☐ Mensagem de sistema **consistente** entre exemplos
- ☐ Exemplos de **alta qualidade** que cobrem o espectro de cenários
- ☐ **Centenas de exemplos** no mínimo (mais é melhor)
- ☐ Respostas do assistente refletem **exatamente** o estilo, formato e tom desejados
- ☐ **Não deixar mensagem do sistema em branco** — isso degrada a precisão

> Use a **mesma mensagem do sistema** durante o treinamento e durante a inferência com o modelo ajustado.

---

## Desafios e custos

| Desafio | Implicação |
|---|---|
| **Custos de treinamento** | Custo inicial + custo/hora para hospedar modelo personalizado |
| **Qualidade dos dados** | Dados ruins → sobreajuste (overfitting), subajuste ou viés |
| **Manutenção** | Retreinar quando dados mudam ou modelo base é atualizado |
| **Experimentação** | Testar hiperparâmetros: épocas, batch size, learning rate |
| **Desvio de modelo** | Especialização excessiva pode reduzir eficácia em tarefas gerais |

---

## Pontos que costumam confundir

**Ajuste fino ≠ RAG.** Ajuste fino muda os **pesos do modelo** para consistência de comportamento. RAG injeta **dados no prompt** para precisão factual. Eles resolvem problemas diferentes.

**Ajuste fino não adiciona conhecimento novo.** Se o modelo não sabe sobre seus hotéis, ajuste fino não ensina isso — use RAG. Ajuste fino ensina o modelo *como* responder, não *o que* saber.

**Comece pelo baseline.** Se você não mediu o desempenho do modelo padrão, não tem como saber se o ajuste fino melhorou ou piorou.

**LoRA, não treinamento completo.** O Azure usa LoRA — atualiza apenas um subconjunto de parâmetros, tornando o processo mais rápido e barato.

**JSONL é o formato.** Não JSON, não CSV — JSONL (JSON Lines), uma linha por exemplo.

**Mensagem de sistema no treinamento.** Incluir mensagem de sistema nos dados de treinamento é importante — omitir reduz precisão.

**Destilação é um caso de uso de ajuste fino.** Coletar saídas de modelo grande e usá-las para treinar modelo menor é uma aplicação legítima.

---

## Aprofundar na documentação

- [Ajustar um modelo para comportamento consistente — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/optimize-generative-ai-model-performance/4-fine-tune-model)
- Próxima página: [[04 - Comparar e Combinar Estratégias]]
- Página anterior: [[02 - RAG (Geração Aumentada de Recuperação)]]
