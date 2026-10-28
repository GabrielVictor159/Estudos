---
tags:
  - AI-900
  - AI-901
  - azure/ai
  - moc
modulo: "12"
titulo: "Introdução à extração de informações no Azure"
nivel: iniciante
---

# Extração de informações no Azure

O **Azure Content Understanding** transforma documentos, imagens, áudio e vídeo em informações estruturadas. Um **analisador** define o processamento; um **esquema** define os campos que a aplicação precisa receber.

## Mapa visual

![[assets/m12-visao-geral-extracao.png|1000]]

*Os campos da imagem representam exemplos de saídas de diferentes análises; cada analisador retorna a estrutura correspondente à sua configuração.*

## Temas

| # | Página | Conteúdo |
|---|---|---|
| 1 | [[01 - Fundamentos de extração de informações]] | Conteúdo não estruturado, OCR e significado |
| 2 | [[02 - Esquemas e analisadores]] | Campos, tipos, analisadores predefinidos e personalizados |
| 3 | [[03 - Extração de informações de documentos]] | Faturas, configuração do SDK e exemplos Python |
| 4 | [[04 - Extração de informações de áudio e vídeo]] | Transcrição, contexto temporal e exemplo Python |
| 5 | [[12 - Introdução à extração de informações no Azure/05 - Aplicações e revisão|05 - Aplicações e revisão]] | Escolha de recursos e perguntas de revisão |

## Mapa mental em uma frase

> O conteúdo fornece os dados; o esquema define o que extrair; o analisador produz a estrutura que a aplicação consegue utilizar.

## Revisão rápida

- **OCR:** reconhece texto em imagens.
- **Esquema:** organiza a informação desejada em campos e tipos.
- **Analisador:** aplica a configuração de análise ao conteúdo.
- **Operação assíncrona:** exige aguardar a conclusão; o SDK pode cuidar das consultas.
- **Resultado estruturado:** facilita armazenamento, pesquisa e automação.
