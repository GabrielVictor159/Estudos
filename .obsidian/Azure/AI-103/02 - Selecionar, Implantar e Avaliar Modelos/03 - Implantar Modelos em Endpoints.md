---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - implantacao
modulo: 02
---

# Implantar Modelos em Endpoints

Escolher o modelo é metade da decisão; a outra metade é o **tipo de implantação**. Ele define **onde os dados são processados** (conformidade), **como você paga** (custo) e **que garantia de capacidade** você tem (desempenho).

![[m02-tipos-implantacao.png]]

---

## Os nove tipos de implantação

O conjunto se organiza por duas variáveis: **escopo geográfico** e **modelo de consumo**.

| Tipo                              | Escopo                            | Cobrança                                                 | Característica decisiva                                                             |
| --------------------------------- | --------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Padrão Global**                 | Qualquer região do Azure          | Por token                                                | **Cota mais alta**; melhor para cargas de trabalho gerais                           |
| **Provisionado Global**           | Qualquer região do Azure          | **PTU** (Unidades de Produtividade para Provisionamento) | Alta taxa de produtividade **previsível**                                           |
| **Batch Global**                  | Qualquer região do Azure          | Por token com **50% de desconto**                        | Trabalhos **assíncronos** de até **24 horas**                                       |
| **Zona de Dados Padrão**          | Dados permanecem na zona de dados | Por token                                                | Conformidade de zona de dados **UE / EUA**                                          |
| **Provisionado de Área de Dados** | Área de dados específica          | PTUs reservadas                                          | Desempenho previsível dentro da zona                                                |
| **Data Zone Batch**               | Zona de dados específica          | Lote                                                     | Trabalhos em lote assíncronos dentro da zona                                        |
| **Padrão Regional**               | **Região única**                  | Por token                                                | Residência de dados regional; cenários de **baixo volume**                          |
| **Provisionado Regional**         | Região única                      | PTUs reservadas                                          | Capacidade garantida em uma só região                                               |
| **Desenvolvedor**                 | Qualquer região do Azure          | Por token                                                | **Apenas para avaliação de modelo ajustado** (fine-tuned) — não é opção de produção |

### Como escolher em três perguntas

1. **Os dados podem sair de onde?** Sem restrição → Global. Restrição de bloco (UE/EUA) → Zona de Dados. Restrição de país/região → Regional.
2. **O trabalho é interativo ou pode esperar?** Pode esperar → **Batch** (50% mais barato, até 24 h). Interativo → Padrão ou Provisionado.
3. **A carga é previsível e alta?** Sim → **Provisionado** (PTU garante capacidade). Não → **Padrão** (paga o que usar).

---

## Fluxo de implantação no portal

![[m02-fluxo-implantacao.png]]

1. Na home page do Foundry, vá em **Descobrir → Modelos**.
2. Abra o **cartão do modelo** — é onde ficam benchmarks, endpoints suportados e recursos.
3. Selecione **Implantar**.
   - Modelos de **parceiros e da comunidade** exigem assinatura do **Azure Marketplace**: examine os termos e escolha **Concordar e Continuar**.
   - Modelos **vendidos diretamente pela Azure** (por exemplo, GPT-4o-mini) não passam por essa etapa.
4. Escolha entre **configurações padrão** (rápido, recomendado) ou **personalizadas**.
5. Ajuste os parâmetros:

| Parâmetro | Detalhe |
|---|---|
| **Nome da implantação** | Padrão: o nome do modelo. Vai no parâmetro `model` das requisições e é o que **roteia** a chamada. Personalizar permite **várias implantações do mesmo modelo** |
| **Tipo de implantação** | O portal **seleciona automaticamente** com base no modelo e no ambiente |
| **SKU de máquina virtual** | Somente para **computação gerenciada**; exige cota do Azure Machine Learning |
| **Contagem de instâncias** | Somente para computação gerenciada; distribui a carga e dá redundância |

![Captura de tela da implantação de modelo no portal do Foundry](https://learn.microsoft.com/pt-br/training/wwl-data-ai/model-catalog-evaluate/media/deploy-model.png)

---

## Gerenciar modelos implantados

Local: seção **Build → Modelos**. Para cada implantação você encontra:

- configuração e **status** da implantação;
- **URL do endpoint** para acesso de API;
- **chaves ou tokens** de autenticação;
- **métricas de monitoramento e uso**;
- opções para ajustar configurações ou **excluir** a implantação.

---

## Tabela de decisão: requisito → tipo de implantação

| O cenário exige… | Tipo |
|---|---|
| "Maior cota disponível, carga variada" | Padrão Global |
| "Latência estável em horário de pico, volume alto e previsível" | Provisionado Global |
| "Classificar 2 milhões de avaliações da noite para o dia, custo mínimo" | Batch Global |
| "Os dados não podem sair da União Europeia" | Zona de Dados (padrão, provisionado ou batch) |
| "Os dados precisam ficar em uma região específica" | Padrão Regional ou Provisionado Regional |
| "Baixo volume, com residência de dados regional" | Padrão Regional |
| "Testar um modelo que acabamos de ajustar" | Desenvolvedor |
| "Rodar o modelo em VM própria com várias instâncias" | Computação gerenciada (SKU de VM + contagem de instâncias) |

---

## Pontos que costumam confundir

**PTU significa capacidade reservada, não velocidade mágica.** Você paga por unidade de produtividade e, em troca, tem **previsibilidade**. Se o cenário fala em "carga imprevisível" ou "começar pequeno", a resposta é Padrão.

**Batch é assíncrono — não serve para chat.** Desconto de 50% e janela de até 24 horas só fazem sentido para processamento em lote.

**Zona de dados ≠ região.** Zona de dados é um bloco (UE, EUA). Região é uma região específica do Azure. Cenários que citam **um país** apontam para Regional; cenários que citam **um bloco regulatório** apontam para Zona de Dados.

**Desenvolvedor é armadilha.** Existe só para **avaliação de modelo ajustado**. Qualquer cenário com usuários reais a descarta.

**Nome da implantação é o identificador de roteamento.** Não é rótulo cosmético: é o valor que vai no parâmetro `model` da requisição. Duas implantações do mesmo modelo se distinguem por ele.

**O tipo de implantação é sugerido automaticamente.** No fluxo padrão, o portal escolhe; você só sobrescreve nas configurações personalizadas.

---

## Aprofundar na documentação

- [Implantar modelos em endpoints — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/model-catalog-evaluate/4-deploy-models)
- Páginas relacionadas: [[04 - Testar no Playground e Conectar o Aplicativo]] · [[02 - Microsoft Foundry - Recursos, Projetos e Ativos]]
