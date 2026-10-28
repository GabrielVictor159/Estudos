# AI-901 Lab

O banco de questões fica em `public/data/questions.json`. O build valida o contrato e incorpora o conteúdo ao HTML, sem fluxo de agentes ou registro obrigatório de aprovações.

Abra **index.html** diretamente no navegador. As **702 questões já acompanham a página** e funcionam offline. Não há servidor, instalação, importação de arquivos, painel de banco ou etapa de publicação para o usuário.

## Banco incluído

702 questões autorais em português, elaboradas com base nas trilhas e documentação pública Microsoft e alinhadas ao [guia AI-901](https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-901). Aprofundamentos de arquitetura usam também artigos originais e documentação dos projetos. Não são reproduções de provas reais. Cada questão tem gabarito, justificativa e referências. Na revisão editorial inicial, as 400 questões originais foram analisadas; IDs, temas e gabaritos foram preservados, com revisão de enunciados e alternativas. O terceiro lote amplia os cenários e as questões 301–400 são exclusivamente exercícios de código Python.

| Domínio e subtema | Questões |
| --- | ---: |
| Conceitos — IA responsável | 78 |
| Conceitos — Modelos e configurações | 131 |
| Conceitos — Cargas de trabalho | 89 |
| Foundry — Aplicações generativas e agentes | 135 |
| Foundry — Texto e fala | 93 |
| Foundry — Visão e geração de imagens | 90 |
| Foundry — Extração de informações | 86 |
| **Total** | **702** |

Interações: 190 de escolha única, 118 de múltiplas respostas, 99 de associação, 97 estudos de caso com contextos extensos e 198 questões de código Python com lacunas. As múltiplas respostas variam entre duas e três alternativas corretas, com a quantidade informada na tela. A dificuldade é editorial, sem calibração estatística com candidatos.

O [mapa de cobertura](docs/cobertura.md) relaciona os 14 módulos das duas trilhas, os conceitos e os IDs das questões. O segundo lote inclui tokens, embeddings, atenção/QKV, transformers, CNNs, RNNs, LSTM/GRU, ViTs, difusão, GAN/VAE, MoE, ResNet, quantização, destilação, fundamentos de ML e Foundry IQ. As questões novas diferenciam conteúdo da trilha e aprofundamento complementar por `coverageLevel`; isso não promete cobrança de cada arquitetura no exame nem abrange todos os modelos existentes.

O conteúdo privilegia interpretação de restrições, distinções entre capacidades, leitura de integrações Python e diagnóstico de falhas. As justificativas explicam o gabarito e as confusões dos distratores. Referências consultadas durante a elaboração em 17/10/2026; capacidades e contratos de SDK podem mudar.

## Uso

Escolha a quantidade, o tempo e a dificuldade e inicie o simulado. A configuração inicial é de 40 questões em 45 minutos; ambos são ajustes do simulador. É possível praticar todas as 702 questões em uma sessão, aumentando o tempo conforme necessário.

Há navegação por questão, marcação para revisão e retomada após recarregar. O tempo continua correndo ao sair. Ao concluir ou expirar o prazo, o resultado separa corretas, incorretas e sem resposta. A revisão oferece filtros, busca, seleção de tema e comparação direta entre sua resposta e o gabarito; é possível abrir a questão e navegar apenas pela seleção filtrada. O histórico das últimas 30 sessões fica neste navegador; pode ser exportado como JSON. Em `file://`, a persistência depende do navegador e do caminho do arquivo.

Não há página de administração ou publicação do banco. Um banco importado pela versão anterior não substitui mais o conteúdo distribuído com o HTML. Sessões existentes preservam uma cópia das questões com que foram iniciadas.

## Distribuição e correção

Blueprint vigente desde 15/04/2026:

- Conceitos e capacidades de IA: faixa oficial de 40–45%; referência local de 42,5%.
- Implementação com Microsoft Foundry: faixa oficial de 55–60%; referência local de 57,5%.

O motor usa maiores restos para distribuir questões inteiras: 40 questões resultam em 17/23, 100 em 43/57, 200 em 85/115 e 400 em 170/230. Subtemas não têm pesos individuais oficiais. O banco acompanha essas faixas, mas não impõe cotas por formato de interação ou por subtema em cada sessão.

O sorteio ocorre sem reposição, com alternativas embaralhadas. A associação preserva os itens de origem, embaralha os destinos e permite reutilizá-los. Quantidades incompatíveis com as faixas e filtros sem questões suficientes são recusados com uma explicação.

Cada questão vale um ponto por acerto integral; não há crédito parcial. A meta de 70% é uma convenção de estudo e não corresponde à nota escalonada nem à aprovação no exame Microsoft. Os formatos são recursos de prática; não há promessa de que todos apareçam no exame real.

## Manutenção do projeto

As questões continuam separadas do código da aplicação no arquivo **public/data/questions.json**. **public/data/exam.json** contém temas e pesos. O contrato está em **public/schemas/question-bank.schema.json**; o motor valida também IDs, domínio/tema, referências internas e cardinalidade dos gabaritos.

O script de geração lê os JSONs, valida o conteúdo e os incorpora como dados ao **index.html**, junto com os scripts e estilos. A distribuição entregue já está gerada: o usuário apenas abre o HTML, inclusive se copiar somente esse arquivo para outro computador. Não há leitura automática de arquivos externos via fetch, que seria restrita em páginas locais, nem perguntas escritas diretamente nos renderizadores.

Para futuras alterações nas fontes, o responsável pela manutenção regenera a distribuição com Node.js 22+:

```sh
npm run build
npm test
```

O projeto não possui dependências de execução. Há um servidor opcional por `npm run dev`, em `http://127.0.0.1:5173`, mas ele não é necessário para usar o simulador. As fontes visuais têm fallback do sistema.

Arquitetura: `src/engine.js` concentra validação, sorteio e correção; `src/storage.js` cuida da persistência de sessões; `src/app.js` contém a interface; `src/styles.css` contém o visual; `scripts/build.mjs` gera o HTML independente. O banco JSON é a fonte de verdade do conteúdo, e o build não altera o HTML se a validação falhar.

Os testes de motor incluem o banco real e verificam por hash a preservação dos IDs, temas, formatos e gabaritos das 400 questões durante a revisão editorial. A verificação opcional em navegador (`scripts/verify-browser.mjs`) usa Playwright e Microsoft Edge no ambiente de desenvolvimento e percorre o banco offline, conferindo renderização, correção, retomada e revisão. Essas ferramentas não são necessárias para abrir a aplicação.

Aplicação independente de estudo, sem vínculo com a Microsoft. Os gabaritos ficam no cliente e podem ser inspecionados; não há autenticação, backend ou sincronização entre dispositivos.

## Questões de código Python

As questões de código têm seletores diretamente nas lacunas do trecho. Cada uma pode exigir mais de uma escolha; só há acerto quando todas correspondem ao gabarito. As alternativas das lacunas também são embaralhadas. As escolhas são salvas com a sessão, e a revisão mostra o código completo correto e a justificativa. Os trechos são apresentados para leitura e não são executados pelo navegador.

O contrato JSON acrescenta o tipo `code`, o campo `code` com marcadores `{{a}}`, `{{b}}` etc. e uma lista `blanks`. Cada lacuna possui `id`, `label` e `options` com `id`/`text`; `answer` mapeia o ID da lacuna ao ID da alternativa correta. O motor valida alternativas, gabaritos e correspondência exata dos marcadores, e o esquema JSON documenta a estrutura.

Os exercícios cobrem tokens, embeddings, atenção, CNNs, RNNs, avaliação, isolamento de dados, autenticação, agentes e ferramentas, RAG, texto, fala, visão, OCR e extração estruturada. Contratos didáticos são explicitados nos enunciados; trechos de SDK identificam a biblioteca ou API quando necessário.

Para conferir a sintaxe de todos os gabaritos sem executar os exemplos nem chamar serviços Azure, use `python scripts/verify-python.py`.

## Revisão editorial e revisão de resultados

A revisão editorial de 17/10/2026 analisou as 400 questões e alterou 349. Os distratores passaram a explorar confusões próximas da tarefa: métricas diferentes, limites de contexto versus cota, modalidade versus operação, escopo de autorização, estrutura de dados, off-by-one, estado parcial e contratos de SDK. Alternativas de código foram reduzidas quando havia apenas duas ou três escolhas plausíveis. Não foram acrescentadas opções artificiais para atingir uma quantidade fixa. A dificuldade permanece editorial e não foi calibrada com candidatos.

O relatório `docs/editorial-review.json` registra os IDs revisados, campos alterados e comparação de extensão. Entre as 167 questões de resposta única ou estudo de caso, a correta era a única mais longa em 107; após a revisão são 17. Essa comparação é um indicador editorial, não uma medida de dificuldade ou ausência de todas as pistas.

A lista de revisão permite mostrar erros e pendentes, apenas incorretas, sem resposta, corretas, marcadas ou todas. Também há busca por número, ID e enunciado e filtro por tema. As respostas são comparadas na própria lista; a justificativa pode ser expandida. Ao abrir uma questão, alternativas corretas e escolhas erradas recebem marcação textual e cor. Associações e lacunas mostram cada escolha junto do gabarito; códigos errados exibem o trecho correto expandido. Anterior/próxima e o mapa respeitam a seleção da revisão.

Uma tentativa incompleta é classificada como incorreta; uma questão sem nenhuma escolha fica em sem resposta. Os gabaritos aparecem após a conclusão. Consultar uma sessão do histórico não substitui o simulado ativo. As sessões já salvas mantêm a redação com que foram iniciadas; novos simulados usam o banco revisado.

A QA opcional `scripts/verify-review-ui.mjs` verifica esses fluxos offline, inclusive histórico, teclado/foco da busca e celular.


O material de estudo está em `docs/knowledge/`. Os registros editoriais históricos e as candidatas não incorporadas foram preservados em `docs/editorial-history/`, apenas para consulta; não controlam o build nem iniciam processos.


## Adição de 100 questões: AI901-403 a AI901-502

Criadas e revisadas diretamente, sem agentes de geração. São 20 questões por formato e cobertura dos sete temas. A distribuição de 42 conceitos e 58 Foundry compensa a composição anterior, deixando o banco completo com 213/289 questões, conforme o arredondamento dos pesos 42,5%/57,5%. As 402 anteriores foram preservadas integralmente.

A revisão está em `docs/questions-403-502-review.json`. Os 20 novos códigos didáticos foram verificados em todas as combinações das lacunas: 132 combinações e 399 execuções locais sobre casos de referência, com apenas o gabarito aprovado em cada exercício. Isso não comprova todas as entradas possíveis nem executa serviços Azure. Para repetir: `python scripts/verify-batch-code.py`.


## Adição de 200 questões: AI901-503 a AI901-702

Criação e revisão direta, sem agentes. São 40 questões de cada formato: simples, múltiplas respostas, associação, caso longo e Python com seletores. Os 40 casos incluem 14 cenários compartilhados, com perguntas distintas sobre decisões e etapas do mesmo contexto. As 502 questões anteriores foram preservadas integralmente.

O lote acrescenta 85 questões de conceitos e 115 de Foundry. O banco chega a 298/404, permitindo uma sessão com todas as 702 perguntas segundo o arredondamento dos pesos. O relatório está em `docs/questions-503-702-review.json`. Os 40 novos códigos foram verificados em 138 combinações e 351 execuções locais, com apenas o gabarito aprovado nos casos definidos. Não houve chamadas a serviços Azure. Para repetir: `python scripts/verify-batch-code.py --fixtures tests/fixtures/code-503-702.json`.

## Correção de escopo: exercícios de cálculo

Após a solicitação do usuário, 69 questões foram substituídas por avaliação conceitual ou decisões de aplicação, incluindo 46 trechos Python. Foram retiradas cobranças de cálculo de IoU, WER, métricas de classificação, convoluções, atenção, memória e tokens, além de implementações matemáticas e exercícios de transformação geométrica. Os conceitos relevantes continuam presentes, sem exigir contas. A quantidade de 702 questões, IDs, temas, formatos e identificadores dos gabaritos foram preservados.

`docs/arithmetic-scope-correction.json` registra a redação anterior e o hash da versão corrigida de cada questão. Os testes de preservação histórica reconstituem a versão anterior somente para comparar os hashes dos lotes, mantendo a validação do banco atual. Os relatórios dos lotes acima descrevem o estado anterior a esta correção. Os novos códigos têm casos próprios em `tests/fixtures/code-scope-correction.json`; execute `python scripts/verify-batch-code.py --fixtures tests/fixtures/code-scope-correction.json`.

O HTML incorpora o banco atualizado no build. Sessões já salvas preservam sua própria cópia das questões; inicie um novo simulado para usar a redação corrigida.

## Versão publicada

O simulador está público em https://ai901-lab-simulador.lofty-fairy-5584.chatgpt.site, hospedado pelo plugin Sites. A publicação serve somente o HTML estático com o banco incorporado; as respostas e o histórico ficam no navegador de cada visitante.

A distribuição está em `sites/ai901-lab/dist/index.html`. O build principal atualiza essa cópia junto com o HTML offline. Para republicar, reutilize o `project_id` de `sites/ai901-lab/.openai/hosting.json` e publique uma nova versão do mesmo site pelo fluxo do plugin. Não é necessário publicar o banco separadamente. Os endereços web e `file://` mantêm históricos independentes.

Durante o simulado, **Pausar tempo** congela o cronômetro; **Retomar tempo** reinicia a contagem com o saldo preservado. A pausa é salva e continua ao sair, fechar ou recarregar a página. Respostas e navegação permanecem disponíveis durante a pausa. Sem pausar, o tempo continua correndo fora da página. Sessões anteriores à funcionalidade também podem ser pausadas; o tempo já esgotado não pode ser recuperado.

A correção registrada em `docs/lora-scope-correction.json` substituiu AI901-225, 422, 425, 546 e 559, retirando LoRA do banco e cobrando capacidades de modelos, configuração e avaliação de implantações. O banco mantém 702 questões. Isso não representa uma auditoria completa dos demais conteúdos complementares. Sessões já iniciadas mantêm o texto antigo; um novo simulado usa as substituições.
