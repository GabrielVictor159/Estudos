# Notas por tema para autoria e verificação

Atualização: 17/10/2026. Os IDs entre colchetes referem-se a `sources.json`. O objetivo é orientar a análise; para uma questão concreta, abrir as fontes e anotar as evidências específicas. Os contratos de código podem mudar.

## 1. `responsible-ai` — princípios e decisões

Base oficial: [blueprint], [rai]. Equidade envolve resultados e erros entre grupos e contextos; confiabilidade/segurança envolve comportamento consistente e consequências de falhas; privacidade/segurança envolve dados e acesso; inclusão trata necessidades e barreiras; transparência permite entender capacidades/limites; responsabilização exige responsáveis e governança. Essas são categorias de análise, não rótulos mutuamente exclusivos.

Para uma questão de princípio dominante, especificar qual problema deve ser resolvido primeiro. Casos com várias medidas corretas precisam pedir múltiplas respostas ou apresentar restrição discriminante. Bons distratores são medidas reais, porém destinadas a outro risco. Evitar a receita de que mais dados ou remoção de atributos sensíveis soluciona viés automaticamente; o cenário deve permitir identificar proxies, avaliação por subgrupo ou custos distintos de erros. Controles de moderação, autenticação e verificação de fatos têm funções diferentes.

Avaliar minimização/retensão de logs, revisão humana proporcional ao impacto, documentação de limitações e possibilidade de contestação como decisões do cenário, sem inferir requisitos legais. Identidade, autorização sobre o objeto e auditoria são camadas distintas. Em código, diferenciar ausência de valor, zero e falha; não inserir segredos ou dados reais.

## 2. `models` — componentes, seleção e fundamentos

Base curricular: [concept-path], [sdk], [blueprint]. Selecionar por modalidade, tarefa, qualidade observada, latência, custo e capacidade de contexto. Não presumir capacidade a partir do número de parâmetros ou do nome. Implantação é uma instância/configuração de atendimento; pesos, instruções e histórico têm ciclos de vida distintos. Temperature e top-p alteram amostragem quando suportados; não garantem verdade. Não tratar parâmetros opcionais como universais entre famílias de modelos.

**Tokens e embeddings.** Token é unidade do tokenizador, não necessariamente palavra/caractere. Preservar contagem por ocorrência e por chamada. Uma estimativa precisa explicitar tokenizador, entrada, saída, histórico e limites. Embeddings são representações vetoriais; semântica próxima não significa autorização nem equivalência factual. Dimensão e espaço precisam ser compatíveis entre indexação e consulta. Não comparar escores de serviços diferentes sem escala definida. Para cosseno, especificar norma não nula e normalização.

**Transformers e atenção** [transformer]. Q/K determinam compatibilidade; pesos normalizados combinam V. O fator de escala depende da dimensão das chaves. Máscara causal limita acesso a posições futuras; informação posicional representa ordem. Self-attention e cross-attention se distinguem pela origem de Q e K/V. Encoder, decoder e encoder-decoder atendem configurações diferentes; nem todo LLM usa o arranjo original completo. Probabilidade de próximo token não é probabilidade de veracidade. Questões numéricas devem fornecer matrizes/dimensões, regra de arredondamento e fórmula ou profundidade esperada.

**Aprofundamento complementar (`supporting`)**:

- CNN [conv]: filtros compartilhados capturam padrões locais; stride/padding/dilatação afetam saída. Para convolução 2D, declarar canais, grupos, bias e convenção espacial antes de calcular parâmetros ou dimensões. Pooling reduz/combina valores e não equivale a convolução treinável.
- RNN/LSTM/GRU [lstm], [gru]: estado sequencial e portas diferenciam famílias; LSTM tem estado de célula além do oculto, GRU usa atualização/reset. Bidirecionalidade pode consumir contexto futuro e precisa ser compatível com streaming. Não afirmar que qualquer família resolve dependências longas sem limitações.
- ViT [vit]: sequência de patches, projeções e atenção; calcular número de patches somente com regra de divisão e tokens extras explicitados.
- GAN [gan]: gerador/discriminador em treinamento adversarial; qualidade visual não mede cobertura da distribuição. VAE [vae]: codificação probabilística, reconstrução e regularização do latente; não confundir com cópia exata de entradas. Difusão [diffusion]: geração por processo aprendido de remoção de ruído, condicionado conforme o modelo; não universalizar número de passos ou arquitetura.
- MoE esparso [moe]: roteador seleciona subconjunto de especialistas; parâmetros totais e ativos por token são medidas diferentes. Ativação esparsa não implica redução proporcional de toda memória/latência.
- Quantização [quant]: precisão menor pode reduzir memória e custo, com restrições de hardware e impacto de qualidade; pesos não são toda a memória de inferência. Destilação [distill]: estudante aprende com sinais do professor. LoRA [lora]: atualizações de baixa ordem sobre pesos base congelados no método original; não é recuperação documental nem reescrita de todo o modelo.
- Treinamento/avaliação: separar features/rótulos, treino/validação/teste, vazamento de informação, desbalanceamento e mudanças de distribuição. Fornecer definições das métricas usadas. Accuracy, precisão e recall respondem a perguntas diferentes; limiar envolve tradeoff e custo de erros. Essas contas não devem ser apresentadas como distribuição oficial da prova.

## 3. `workloads` — escolher o resultado necessário

Base: [concept-path], [app-path], [language], [vision-chat], [analyzer]. Distinguir classificação de imagem, detecção com caixas, segmentação por pixels, OCR, interpretação multimodal e geração visual. Em texto, entidades não equivalem a tópicos; sentimentos não são fatos; resumo não é extração literal de campos. Em fala, transcrição, síntese, tradução e identificação de locutor são resultados diferentes. Agente combina modelo, instruções e ferramentas; um único prompt não garante autonomia operacional.

Para casos multimodais, especificar a saída: localizar prova em uma página, transcrever áudio fielmente, produzir resumo ou extrair estrutura têm requisitos distintos. Escolhas entre serviços podem ter mais de uma implementação válida; restringir necessidade, formato, evidência ou ambiente em vez de perguntar qual é o único serviço capaz. Confidence é sinal específico da tarefa, não certeza humana ou peso físico de objeto. Definir números e unidades em cálculos de áudio/imagem.

## 4. `generative-agents` — Foundry, RAG e ferramentas

Base: [sdk], [function-tools], [search-vector], [observability], [quotas]. Conhecer sequência de projeto, implantação, cliente, chamada e leitura do resultado. **Foundry novo e classic não devem ser misturados**: SDKs, rotas, objetos de agentes e ciclos de execução podem diferir. O overview consultado exemplifica `AIProjectClient` de `azure.ai.projects`, credencial de `azure.identity`, `get_openai_client()` e Responses; essa combinação não autoriza extrapolar contratos de outro SDK. Uma questão deve fixar superfície/versão ou fornecer interfaces simplificadas declaradas.

Prompts: instrução de sistema define comportamento; mensagem do usuário expressa tarefa; material recuperado é evidência não confiável como instrução. RAG prepara, indexa e recupera conteúdo para contexto, sem atualizar pesos. Chunking depende de estrutura, tamanho e sobreposição; índice precisa de atualização e controle de acesso. Busca vetorial usa representações; lexical preserva termos; híbrida combina sinais. Reranking ordena candidatos e não cria permissão de acesso.

Ferramentas: modelo pode solicitar chamada com argumentos; aplicação valida, autoriza, executa e devolve resultado associado à chamada. Preservar identificador de correlação, permitir apenas ferramentas conhecidas, tratar saídas como dados. JSON estruturalmente válido ainda pode conter unidades/valores não autorizados. Operações com efeitos exigem política de confirmação/idempotência, não repetição cega após timeout. Não confundir autenticação Azure, RBAC do recurso e autorização do usuário no objeto de negócio.

Operação: janela de contexto, limite por resposta e cota de tráfego são restrições diferentes. Reenvio de histórico pode alterar consumo; não assumir que armazenamento de conversa implica tokens gratuitos. Em 429 considerar limites/documentação de retry e concorrência; não resolver toda falha de autorização com backoff. Regras de preço, região e TPM/RPM devem ser consultadas ou dadas como hipóteses.

Avaliação: grounding verifica suporte na evidência; relevância verifica adequação à pergunta; recuperação, segurança, conclusão de tarefa e uso correto de ferramentas pedem métricas diferentes. Testar representatividade, regressões, casos adversariais, latência e custo. Citação existente pode apoiar afirmação errada: verificar conteúdo e acesso. Fluxos de memória/histórico devem explicitar isolamento entre usuários, retenção e limites de recursão.

## 5. `text-speech` — análise, transcrição e síntese

Base: [language], [speech-stt], [speech-tts], [ssml]. Keywords, NER, PII, sentimento/opinião e sumarização resolvem tarefas distintas. Extração seleciona trechos; abstração produz redação nova. Não confundir detecção de idioma com tradução. Preservar IDs de documentos em lotes e tratar erros por item antes de combinar resultados. Verificar retorno real do cliente: lista de objetos e dicionário JSON não são intercambiáveis.

No Speech SDK para Python, o exemplo consultado usa `SpeechConfig`, `speech_recognition_language`, `SpeechRecognizer`, `recognize_once_async().get()` e verificação de `ResultReason`. Não trocar `.get()` de Speech por `.result()` de pollers Azure por semelhança de nome. Reconhecimento único e contínuo atendem fluxos distintos. Eventos parciais podem mudar e não devem disparar efeitos finais sem política explícita.

Síntese transforma texto em áudio; SSML especifica apresentação quando suportado, não muda o conteúdo factual. Para membros SSML, voz, idioma e formatos, consultar referência específica antes de aprovar o código. Escapar conteúdo do usuário quando embutido em XML. Diarização distingue turnos de falantes sem por si comprovar identidade civil. WER usa substituições, deleções e inserções sobre palavras de referência; inserções podem fazê-la superar 100%. Definir métrica no enunciado se cobrada numericamente. Ruído, sotaque e domínio exigem avaliação representativa.

## 6. `vision` — interpretação e geração

Base: [vision-chat], [conv], [vit], [diffusion], [gan]. Fixar modalidade suportada e formato de conteúdo da API; aceitar imagens não implica gerar imagens. Os nomes de partes da mensagem e propriedades da imagem variam por endpoint. Conferir a referência da família escolhida e não colar payload de Chat Completions em Responses.

Questões de coordenadas precisam definir origem, eixo, unidades, redimensionamento, padding, crop e rotação. Inverter a transformação correta antes de marcar a imagem original. IoU usa interseção sobre união, com caixas na mesma referência. Confiança de detecção não informa propriedades físicas não observadas. Em data augmentation, transformar rótulos espaciais junto com imagem e preservar a semântica da tarefa.

Geração visual pode envolver prompt, parâmetros e políticas próprios. Semente não garante igualdade entre versões e ambientes; usar hipóteses explícitas de reprodutibilidade. Qualidade aparente, diversidade e aderência ao prompt são dimensões diferentes. Cálculos de patch, pooling e convolução são aprofundamento complementar, com fórmulas e convenções declaradas.

## 7. `extraction` — Content Understanding e evidências

Base: [analyzer], [cu-client], [app-path]. Analyzer define modalidade, conteúdo a extrair e estrutura. Bases consultadas: `prebuilt-document`, `prebuilt-image`, `prebuilt-audio`, `prebuilt-video`; personalização usa propriedades documentadas como `baseAnalyzerId` e `fieldSchema`. A referência consultada distingue API GA `2025-11-01` e recursos preview `2026-06-01-preview`; não combinar campos preview com versão GA.

Campos podem ser ausentes ou incertos; não converter ausência em zero. Preservar associação de linhas, tipos, moeda, localidade de datas, unidade e vínculo com origem. OCR não é interpretação de tabela; JSON válido não comprova significado correto. Páginas, spans, caixas ou timestamps permitem conferir evidências quando retornados/configurados. Confidence precisa ser interpretada por campo e configurações: não assumir disponibilidade universal nem aprovar documento inteiro por média.

Operações longas exigem seguir o mecanismo da API usada até estado terminal; resposta HTTP bem-sucedida de criação não prova análise concluída. Uma questão pode fornecer poller simplificado, mas deve declarar seu contrato. A existência de um ID de operação não é o resultado extraído. Definir estados de falha/cancelamento e localização de campos a partir de exemplo documentado compatível.

Áudio/vídeo: preservar offsets depois de cortes e distinguir transcrição, falantes, segmentos, imagens e resumo. Documentos com páginas repetidas/revisões exigem origem, versão e autorização antes de alimentar RAG. Validar campos críticos separadamente, encaminhar exceções e não inventar valores para satisfazer o schema.

## Checklist de uma evidência suficiente

Cada avaliador deve conseguir responder: qual objetivo é praticado; qual dado torna a solução única; qual fonte e contrato sustentam cada afirmação decisiva; por que cada distrator atrai alguém com uma confusão real; por que falha aqui; qual inferência torna a questão difícil; e o que poderia tornar outra opção correta. Se a última pergunta revelar premissa ausente, devolver ao revisor.
