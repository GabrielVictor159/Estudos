---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/modelos-generativos
modulo: "08"
titulo: "Catálogo e seleção de modelos"
nivel: iniciante
---
	
# Catálogo e seleção de modelos

O **catálogo de modelos do Microsoft Foundry** permite descobrir modelos generativos de diferentes provedores, filtrá-los por capacidade ou tarefa, compará-los e iniciar testes. As informações podem incluir capacidades, tarefas compatíveis, benchmarks, opções de personalização e documentação de uso responsável.

## Modelos fundamentais

Modelos fundamentais são modelos grandes e pré-treinados que oferecem capacidades gerais, como linguagem, raciocínio, código ou processamento multimodal. Eles podem ser usados diretamente ou personalizados quando essa opção estiver disponível.

Modelos menores podem atender tarefas simples com requisitos modestos. Tarefas complexas ou especializadas podem exigir outras capacidades. A escolha deve partir da tarefa e das restrições, não apenas do nome ou da popularidade do modelo.

## Critérios de seleção

| Critério | Pergunta |
|---|---|
| **Tarefa e modalidade** | Precisa de chat, resumo, código, embeddings ou entrada multimodal? |
| **Qualidade** | O resultado atende a exemplos representativos do cenário? |
| **Latência e escala** | Responde no tempo e no volume necessários? |
| **Custo e limites** | O consumo cabe no orçamento e na capacidade prevista? |
| **Segurança** | A documentação e os controles atendem ao uso pretendido? |
| **Integração** | A implantação pode ser chamada pelo aplicativo da forma necessária? |

Benchmarks ajudam a comparar modelos em condições padronizadas, mas não garantem o mesmo desempenho em cada aplicação. Teste prompts e dados representativos no Playground e compare qualidade, segurança, latência e custo. Para tarefas bem definidas, uma ferramenta pronta do Foundry pode ser mais adequada do que operar diretamente um modelo generativo.

## Implantação

Após a seleção, a implantação disponibiliza uma configuração do modelo para inferência por meio de um endpoint. Configurações podem incluir versão, tipo de implantação e capacidade ou limites de uso. Esses limites afetam o volume de solicitações e tokens que o serviço pode processar.

## Pontos-chave para revisão AI-900/AI-901

- O catálogo contém modelos próprios, de parceiros e da comunidade.
- Benchmarks ajudam a comparar; testes no cenário-alvo verificam a adequação prática.
- Escolha considerando capacidade, qualidade, custo, latência, escala, segurança e integração.
- Uma ferramenta pronta pode atender melhor a uma tarefa delimitada.
- Uma implantação torna o modelo acessível por API.

## Fonte

- [Modelos de IA generativa — módulo Microsoft Learn](https://learn.microsoft.com/pt-br/training/modules/get-started-with-generative-ai-and-agents/2-generative-ai-models)
