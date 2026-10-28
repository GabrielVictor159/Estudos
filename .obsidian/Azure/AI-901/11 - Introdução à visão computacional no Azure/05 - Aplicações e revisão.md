---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - revisao
modulo: "11"
titulo: "Aplicações e revisão de visão computacional"
nivel: iniciante
---

# Aplicações e revisão de visão computacional

## Como escolher a capacidade

| Necessidade | Entrada | Saída | Capacidade |
|---|---|---|---|
| Explicar uma foto | Imagem e pergunta | Descrição textual | Análise multimodal |
| Interpretar um gráfico | Imagem e instrução | Explicação textual | Análise multimodal |
| Criar uma ilustração | Descrição | Imagem | Geração de imagens |
| Alterar uma composição | Imagem e instruções | Imagem modificada | Edição de imagens |
| Criar uma animação curta | Descrição ou imagem de referência | Vídeo | Geração de vídeo |

## Exemplo: assistente de produtos

Um aplicativo pode combinar capacidades em etapas:

1. Receber a fotografia de um produto e uma pergunta.
2. Usar um modelo com visão para explicar as características visíveis.
3. Usar um modelo de imagem para criar uma composição promocional.
4. Usar um modelo de vídeo para produzir um clipe.
5. Acompanhar o trabalho de vídeo e disponibilizar o arquivo após a conclusão.

Cada etapa exige uma capacidade própria. Aceitar imagens como entrada não significa que o modelo também consiga gerar imagens ou vídeos.

## Conceitos de integração

- **Playground:** interface para testar entradas, prompts e resultados.
- **API:** contrato usado pelo aplicativo para enviar solicitações ao serviço.
- **SDK:** biblioteca que facilita essas chamadas no código.
- **Endpoint:** endereço do serviço.
- **Credencial:** autentica a aplicação.
- **Nome da implantação:** identifica o modelo implantado que atenderá à solicitação.
- **Base64:** representa bytes como texto para transporte; precisa ser decodificado para recuperar um arquivo binário.

## Perguntas para revisão

1. **O que torna um modelo multimodal?** Trabalhar com mais de um tipo de dado, como texto e imagem.
2. **Qual é a diferença entre analisar e gerar uma imagem?** Analisar produz uma interpretação; gerar produz conteúdo visual.
3. **Por que combinar texto e imagem no prompt?** A imagem fornece o conteúdo; o texto define o que se deseja saber ou fazer.
4. **Qual valor vai em `model` nas chamadas ao Azure OpenAI?** O nome da implantação que atenderá à solicitação.
5. **Uma resposta Base64 já é um arquivo PNG salvo?** Não. O aplicativo precisa decodificar os dados e salvar os bytes no formato retornado.
6. **Por que acompanhar a geração de vídeo por um identificador?** O processamento leva tempo; o identificador permite consultar o trabalho até a conclusão ou falha.
7. **Quando baixar o vídeo?** Depois que o status indicar `completed`. Se indicar `failed`, a aplicação deve tratar a falha.

## Para memorizar

> **Análise:** imagem → interpretação. **Geração de imagens:** instrução → imagem. **Geração de vídeo:** instrução → trabalho assíncrono → vídeo.