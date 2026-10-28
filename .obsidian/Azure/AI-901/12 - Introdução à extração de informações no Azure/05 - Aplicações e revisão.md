---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - revisao
modulo: "12"
titulo: "Aplicações e revisão de extração de informações"
nivel: iniciante
---

# Aplicações e revisão de extração de informações

## Como escolher a abordagem

| Necessidade | Abordagem |
|---|---|
| Digitalizar texto de uma imagem | OCR |
| Obter campos de uma fatura | Analisador de faturas |
| Obter campos específicos do negócio | Analisador com esquema personalizado |
| Tornar uma chamada pesquisável | Análise de áudio com transcrição |
| Explorar conteúdo falado e visual | Análise de vídeo |

## Exemplo: aprovação de despesas

1. A pessoa envia a foto de um comprovante.
2. O analisador extrai os campos configurados.
3. A aplicação verifica campos obrigatórios e consistência dos valores.
4. As regras do negócio determinam o próximo passo.
5. O sistema salva os dados e o resultado da validação.

A extração fornece informações para a decisão. Aprovação, armazenamento e execução de ações pertencem à aplicação.

## Perguntas para revisão

1. **Qual é a diferença entre OCR e extração por esquema?** OCR reconhece texto; a extração organiza informações em campos com significado.
2. **O que um esquema define?** Campos, tipos e estrutura desejados.
3. **O que um analisador faz?** Aplica a configuração de processamento e extração ao conteúdo.
4. **Quando personalizar?** Quando os campos necessários não correspondem à saída de um analisador predefinido.
5. **A análise retorna imediatamente?** A solicitação inicia uma operação; é necessário acompanhar sua conclusão.
6. **Qual é o papel de `result()`?** Aguardar a conclusão com acompanhamento gerenciado pelo SDK.
7. **JSON significa armazenamento automático?** Não. A aplicação precisa persistir o resultado.
8. **Transcrever uma ligação equivale a extrair suas ações?** Não. As ações exigem interpretação e um esquema adequado.

## Para memorizar

> **OCR:** texto. **Esquema:** campos. **Analisador:** processamento. **JSON:** estrutura. **Aplicação:** validação e uso dos dados.
