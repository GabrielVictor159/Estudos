# Cobertura do banco AI-901

Verificação em 17/10/2026. O primeiro lote cobria os domínios e capacidades gerais, mas não aprofundava várias unidades conceituais dos materiais de estudo. O segundo lote acrescenta exatamente 100 questões, com IDs **AI901-101 a AI901-200**, mantendo as 100 anteriores inalteradas naquela edição; a revisão editorial posterior inclui todo o banco.

O banco tem **400 questões**: 170 de conceitos e 230 de implementação. Esse total permite o sorteio de uma sessão com todo o banco respeitando a referência de 42,5%/57,5%. As cotas oficiais continuam sendo faixas por domínio; não há pesos oficiais individuais atribuídos a arquiteturas, módulos ou formatos.

## Fontes de escopo

- [Guia oficial da AI-901](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901): objetivos e percentuais de avaliação.
- [AI concepts for developers and technology professionals](https://learn.microsoft.com/en-us/training/paths/ai-concepts/): sete módulos conceituais.
- [Get started with AI applications and agents on Azure](https://learn.microsoft.com/en-us/training/paths/get-started-ai-apps-agents/): sete módulos de implementação.

O guia de habilidades é mais resumido que as trilhas. Um conceito presente em material complementar não deve ser apresentado como um item explicitamente garantido no exame. Também não é possível prometer, com 400 questões ou qualquer lote finito, cobertura de todos os modelos existentes ou de todas as perguntas futuras da prova.

## Módulos das duas trilhas

Os IDs abaixo são exemplos verificáveis de cobertura. Nos intervalos, o prefixo é sempre `AI901-`. As questões antigas também contribuem para os objetivos; não foram reescritas nem receberam novos marcadores.

| Módulo | Conteúdos trabalhados | Exemplos de IDs |
| --- | --- | --- |
| Introduction to AI concepts | Cargas de trabalho, responsabilidade, limites, avaliação e impacto | 001–014, 101–104, 135–142 |
| Introduction to generative AI and agents | Tokens, vetores, atenção, posição, máscara causal, encoder/decoder, geração, prompts e agentes | 105–116, 132–133, 143–165 |
| Introduction to natural language processing concepts | Tokenização, contagens, TF-IDF, bag-of-words, ordem, embeddings e representações contextualizadas | 105–108, 135–137, 166–167, 175, 177 |
| Introduction to AI speech concepts | Captura, características acústicas, modelo de linguagem, decodificação, fonemas, prosódia e vocoder | 139–140, 168, 172–176, 178 |
| Introduction to computer vision concepts | Pixels, canais, filtros, CNNs, pooling, ViT, patches, multimodalidade e geração | 117, 120–121, 138, 179–190 |
| Introduction to AI-powered information extraction concepts | OCR, layout, tabelas, campos, tipos e evidência multimodal | 034, 043, 191–200 |
| Introduction to retrieval-augmented generation concepts | Preparação, chunks, sobreposição, vetorização, recuperação, fundamentação e avaliação | 142, 145–149, 152, 200 |
| Get started with AI in Azure | Recursos, projeto, autenticação, CLI, endpoints, implantação, cotas e limites | 044, 048, 055, 064, 143, 153, 158, 161 |
| Get started with generative AI and agents in Azure | Escolha de modelo, cliente Python, contexto, streaming, saídas estruturadas, ferramentas e avaliação | 044–064, 144, 154–165 |
| Get started with text analysis in Azure | Análise com SDK, resultados em lote, entidades, opiniões, erros e métricas | 065–066, 071, 074, 078, 166–167, 175, 177 |
| Get started with speech in Azure | Entrada de áudio, reconhecimento e síntese, idioma, resultados parciais, SSML e avaliação | 067–073, 075–077, 168–174, 178 |
| Get started with computer vision in Azure | Entrada visual, operações e modalidades, leitura, geração de imagem/vídeo e validação | 079–088, 179–190 |
| Get started with AI-powered information extraction in Azure | Analyzers, esquema, documentos/imagens/áudio/vídeo, operações assíncronas e validação | 089–100, 191–200 |
| Get started with Microsoft Foundry IQ | Bases de conhecimento, fontes, recuperação agentic, citações, conexão a agentes e acesso | 150–151, 164, 200 |

## Aprofundamento dos conceitos solicitados

| Conceito ou família | Questões novas |
| --- | --- |
| Tokens, IDs, tokenizador, contexto e orçamento | 105–106, 114, 132, 143–144, 154–156, 165 |
| Embeddings, dimensão, contexto, cosseno e compatibilidade | 106–108, 145–146, 165, 175, 199–200 |
| Atenção, Q/K/V, múltiplas cabeças, posição e causalidade | 102, 109–113, 133, 184 |
| Arquiteturas encoder, decoder e encoder-decoder | 113, 116, 133 |
| Treinamento, inferência, pesos, gradientes e ativações | 115–116, 130–131 |
| CNNs, filtros, canais, pooling e stride | 117, 179–181, 190 |
| RNN, estado oculto, LSTM e GRU | 118–119, 133 |
| ViT, patches e estrutura espacial | 120, 183–184, 190 |
| Difusão e geração condicionada de imagem/vídeo | 121–122, 186 |
| GAN e VAE | 122–123, 188 |
| Conexões residuais e ResNet | 182 |
| MoE e roteamento esparso | 124 |
| Quantização, destilação e modelos menores | 125–126, 162 |
| Tipos de ML, generalização, sobreajuste e vazamento | 127–129, 134, 137, 163 |
| NLP estatístico, TF-IDF, negação e semântica | 135–137, 166–167, 175, 177 |
| Fonemas, MFCC, espectrograma, prosódia, vocoder e WER | 139–140, 168, 172–174, 176, 178 |
| Classificação, detecção, segmentação, IoU e contraste imagem/texto | 138, 185, 187, 189–190 |
| RAG, chunks, busca híbrida, reranking e Foundry IQ | 142, 145–152, 160, 164, 200 |
| Extração, layout, campos tipados e evidência | 191–200 |

## Identificação de escopo e procedência

Cada questão nova possui:

- `conceptTags`: conceitos efetivamente trabalhados na questão.
- `coverageLevel: "curriculum"`: conteúdo ligado às trilhas, seus conceitos e sua aplicação.
- `coverageLevel: "supporting"`: aprofundamento complementar ou pré-requisito, sem afirmar que essa especificidade está enumerada no guia da prova.
- `references`: fontes pertinentes ao enunciado e à justificativa.

Há 82 questões novas com a primeira classificação e 18 de aprofundamento. Detalhes de RNN/LSTM/GRU, GAN/VAE, MoE, ResNet, quantização e destilação usam também material Microsoft complementar, documentação do projeto ou artigos dos próprios autores. Essa distinção indica o escopo editorial; não estima a probabilidade de cobrança.

## Preservação e verificação

Antes da revisão editorial solicitada em 17/10/2026, o SHA-256 dos objetos das primeiras 100 questões era:

`4f001c3dfd9034e202779cd6e4df5e961de956f6678b8dd8b4dacad098817888`

Esse hash é histórico: a revisão atual altera alternativas e enunciados também das questões antigas. O teste atual preserva IDs, temas, formatos e gabaritos das 400 questões por um hash estrutural. Outros testes conferem o total, os IDs, os conceitos, os gabaritos, a estrutura e sorteios de 40, 100, 200, 300 e 400 questões. Eles validam contratos e funcionamento; a correção conceitual foi revisada com as fontes, e a dificuldade continua sendo editorial, sem calibração estatística com candidatos.

As 400 questões são incorporadas automaticamente ao HTML gerado. Não há importação manual nem página de publicação de banco.

## Ampliação para 400 questões e exercícios Python

As questões 001–200 foram preservadas na ampliação original e passaram a integrar a revisão editorial de todo o banco. As questões 201–264 acrescentam cenários, métricas, arquiteturas, diagnóstico e integração. As questões 265–300 introduzem 36 exercícios de código em texto/fala, visão e extração. O lote 301–400 acrescenta outras 100 questões exclusivamente de código, distribuídas pelos sete temas.

| Tema | Novas questões de código |
| --- | --- |
| IA responsável | 301–310 |
| Modelos e configurações | 311–332 |
| Cargas de trabalho | 333–342 |
| Aplicações generativas e agentes | 343–367 |
| Texto e fala | 265–276, 368–378 |
| Visão e geração de imagens | 277–288, 379–389 |
| Extração de informações | 289–300, 390–400 |

O banco passa a ter 170 questões de conceitos e 230 de implementação com Foundry, preservando a referência de 42,5%/57,5%. Cada sessão mantém o sorteio por domínio; não há cota fixa de formatos ou subtemas. Há 136 exercícios Python com seletores, incluindo lacunas múltiplas, correção integral, fontes e visualização do gabarito completo. A sintaxe de todos os gabaritos é conferida por AST, sem executar chamadas externas.

Os exercícios conceituais avançados continuam classificados como aprofundamento por `coverageLevel: supporting`. Isso não estabelece peso oficial para arquiteturas individuais nem promete correspondência com questões reais de exame.

## Revisão editorial do banco completo

Em 17/10/2026, as 400 questões foram analisadas e 349 receberam alterações. Os enunciados e alternativas foram revistos para reduzir pistas lexicais, comparar alternativas plausíveis da mesma tarefa e equilibrar a extensão. Também foram ajustadas ambiguidades sobre arquitetura, flexibilidade regional, estruturas de saída e regras de execução. Identificadores e gabaritos foram mantidos.

O relatório [editorial-review.json](editorial-review.json) registra a decisão por questão e os campos alterados. Não há promessa de calibração psicométrica de dificuldade. Os testes de estrutura, preservação dos gabaritos e sintaxe dos 136 gabaritos Python continuam ativos. Sessões salvas preservam a cópia original das questões; o banco revisado alimenta novas sessões.


## Adição 403–502: criação e revisão direta

100 questões, sendo 20 de cada formato. IA responsável: 15; modelos: 14; cargas: 13; aplicações generativas/agentes: 15; texto/fala: 14; visão: 15; extração: 14. O banco completo chega a 502 questões, com 213 de conceitos e 289 de Foundry. A questão 434 é de visão, pela tarefa de segmentação de instâncias.

Novos cenários incluem prevalência e precisão por grupo, recursos de contestação, inclusão, softmax estável, tokenização e compatibilidade, causalidade temporal, GAN/VAE/difusão/MoE, LoRA/quantização/destilação, RRF, idempotência, estado de transcrição, WER, SSML, geometria de caixas, ViT e contratos de extração. Os aprofundamentos mantêm a distinção supporting/curriculum.

O relatório `questions-403-502-review.json` registra a distribuição e a revisão direta. Casos longos têm ao menos 150 palavras. Referências por questão permanecem no JSON distribuído. As 402 questões anteriores não foram alteradas.


## Adição 503–702

200 questões criadas e revisadas diretamente. Cada formato recebe 40 itens. IA responsável: 28; modelos: 29; cargas: 28; aplicações generativas/agentes: 30; texto/fala: 29; visão: 29; extração: 27. São 85 novas questões de conceitos e 115 de Foundry. O conjunto completo tem 702 questões e preserva os 502 objetos anteriores.

Os 40 estudos de caso incluem 14 cenários, com perguntas diferentes sobre etapas e decisões do mesmo problema. Os códigos usam contratos didáticos explícitos e casos locais sem serviços externos. Temas incluem calibração, proxies, inferência entre relatórios, limites de execução, compatibilidade de embeddings, treinamento e validação, quantização, MoE, perdas mascaradas, fala, SSML, geometria, máscaras, tabelas mescladas e evolução de esquemas. O relatório `questions-503-702-review.json` registra distribuição e revisão.
