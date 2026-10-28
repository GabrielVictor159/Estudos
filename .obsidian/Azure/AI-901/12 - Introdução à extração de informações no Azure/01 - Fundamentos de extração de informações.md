---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - ai/extracao
modulo: "12"
titulo: "Fundamentos de extração de informações"
nivel: iniciante
---

# Fundamentos de extração de informações

**Extrair informações** é identificar dados relevantes em um conteúdo e organizá-los para uso por sistemas. Uma fatura fotografada, uma ligação gravada ou uma reunião em vídeo podem conter informações úteis, mas exigem interpretação antes de preencher campos de uma aplicação.

## Tipos de entrada

| Conteúdo | Informações que podem ser extraídas |
|---|---|
| Documento ou imagem | Fornecedor, data, itens e total |
| Áudio | Transcrição, resumo e ações solicitadas |
| Vídeo | Informações visuais e faladas, acontecimentos e contexto temporal |

## Reconhecer texto e extrair significado

O **OCR** converte texto presente em imagens em texto digital. A extração por esquema associa informações aos campos esperados, considerando contexto e relações.

![[assets/m12-ocr-e-esquema.png|1000]]

Exemplo: reconhecer “Total R$ 150,00” permite obter os caracteres; mapear `Total` para um campo numérico permite comparar o valor com um limite de aprovação.

## Fluxo de processamento

1. Enviar o conteúdo para análise.
2. Aplicar o analisador e seu esquema.
3. Aguardar o processamento.
4. Consumir os dados estruturados na aplicação.

## Pontos-chave para revisão AI-901

- Extração estruturada vai além da leitura dos caracteres.
- Documentos e mídias podem alimentar processos empresariais.
- O resultado torna os dados utilizáveis por outros sistemas.
