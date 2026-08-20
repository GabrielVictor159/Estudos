---
tags:
  - AI-103
  - azure/ai
  - azure/foundry
  - desenvolvimento
modulo: 03
---

# Playground de Modelo e Geração de Código

O **Model playground** do portal do Foundry é um ambiente interativo para testar modelos **antes de escrever código**. Acesso: selecionar **Model playground** na navegação à esquerda do portal.

Ele não é uma demonstração à parte do desenvolvimento — é a primeira etapa dele, e termina entregando o código já configurado.

![[m03-playground-codigo.png]]

---

## O que dá para fazer no playground

- Enviar prompts para modelos implantados e ver as respostas **em tempo real**.
- Ajustar configurações como **temperatura** e **tokens máximos**.
- Adicionar **mensagens do sistema** para personalizar o comportamento do modelo.
- Experimentar **modelos e configurações diferentes**.

![Captura de tela do ambiente de testes do Modelo no portal Microsoft Foundry](https://learn.microsoft.com/pt-br/training/wwl-data-ai/foundry-sdk/media/foundry-playground.png)

### Configurações disponíveis

| Configuração | O que controla |
|---|---|
| **Temperatura** | Criatividade e aleatoriedade das respostas |
| **Tokens máximos** | Tamanho máximo da resposta |
| **Mensagens do sistema** | Comportamento do modelo — papel, tom, restrições |

---

## A guia Código

O botão **Código**, no painel de chat, gera exemplos de código prontos. Três escolhas definem o que sai:

| Escolha | Opções |
|---|---|
| **API** | API de Respostas ou ChatCompletions |
| **Idioma** | A linguagem de programação preferida |
| **SDK** | Qual SDK você quer ver no exemplo |

O exemplo gerado já vem **preenchido** com:

- o **endpoint do projeto**;
- o **nome da implantação** do modelo;
- as **configurações atuais** do playground (temperatura, tokens máximos e afins).

> Isso importa: o código não é um trecho genérico da documentação — ele reflete exatamente o que você acabou de testar.

---

## O ciclo de trabalho recomendado

1. **Explorar no playground** — testar prompts, ajustar as configurações e descobrir o que funciona.
2. **Gerar exemplos de código** — usar a guia **Código** para obter exemplos do SDK.
3. **Desenvolver o aplicativo** — pegar o código gerado e personalizá-lo.
4. **Iterar e refinar** — voltar ao playground para testar novas ideias e atualizar o código.

O ciclo é fechado: o playground continua útil depois que o aplicativo existe, como bancada de testes para mudanças de prompt e de parâmetro.

---

## Tabela de decisão: situação → ferramenta

| A situação é… | Use |
|---|---|
| "Quero ver se este modelo entende nosso domínio" | Playground, com prompts reais |
| "Preciso definir o papel do assistente" | Mensagem do sistema no playground |
| "As respostas estão variando demais" | Baixar a temperatura no playground |
| "As respostas estão longas demais" | Reduzir tokens máximos |
| "Preciso começar a codificar isto" | Guia **Código** |
| "Quero ver como ficaria em C# em vez de Python" | Guia **Código** → trocar o **Idioma** |
| "Quero comparar as duas APIs de chat" | Guia **Código** → trocar a **API** |
| "Mudei o prompt no app e quero validar rápido" | Voltar ao playground (etapa 4 do ciclo) |

---

## Pontos que costumam confundir

**Playground ≠ avaliação.** O playground é teste **interativo e qualitativo**. Medir desempenho de forma repetível e em escala é papel da avaliação automatizada — ver [[05 - Avaliar o Desempenho do Modelo]].

**A guia Código é a ponte oficial.** Em cenários do tipo "qual a forma mais rápida de obter um exemplo de integração já configurado", a resposta é a guia Código, não procurar na documentação do SDK.

**A escolha do SDK acontece ali.** O gerador pergunta qual SDK você quer ver — ou seja, a decisão entre SDK do Foundry e SDK da OpenAI já aparece nesse momento. Ver [[02 - Endpoints, SDKs e Autenticação]].

**Mensagem do sistema ≠ prompt.** A mensagem do sistema condiciona o comportamento antes de qualquer pergunta; o prompt é a pergunta. Na API de Respostas ela vira o parâmetro `instructions`; em ChatCompletions, o papel `system`.

---

## Aprofundar na documentação

- [Explore com o ambiente de testes do modelo — unidade do módulo](https://learn.microsoft.com/pt-br/training/modules/foundry-sdk/02-chat-playground)
- Próxima página: [[02 - Endpoints, SDKs e Autenticação]]
- Contexto relacionado: [[04 - Testar no Playground e Conectar o Aplicativo]]
