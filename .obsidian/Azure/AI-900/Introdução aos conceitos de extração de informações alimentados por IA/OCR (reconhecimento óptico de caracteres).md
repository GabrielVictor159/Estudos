**OCR** converte automaticamente texto visual em imagens — de documentos digitalizados, fotos, PDFs ou capturas de tela — em **texto editável e pesquisável**, permitindo extração automatizada de faturas, recibos, formulários e anotações.

#### Pipeline do OCR — estágios e o que cada um faz
![[Pasted image 20260525070931.png]]


- **Aquisição e entrada de imagem** Captura a imagem fonte (foto de smartphone, scanner, frame de vídeo, PDF renderizado). A qualidade dessa entrada impacta diretamente a precisão subsequente.
    
- **Pré‑processamento e aprimoramento** Remove ruído, ajusta contraste, corrige inclinação e otimiza resolução. Técnicas incluem filtros clássicos (gaussiano, mediano), transformações geométricas, interpolação e modelos de super‑resolução ou redes neurais para limpeza.
    
- **Detecção de regiões de texto** Identifica áreas que contêm texto e agrupa caracteres em palavras, linhas e blocos; usa análise de layout, segmentação semântica (U‑Net, Mask R‑CNN), detectores baseados em transformadores e heurísticas espaciais para ordem de leitura e classificação de regiões (cabeçalho, tabela, corpo).
    
- **Reconhecimento e classificação de caracteres** Núcleo do OCR: extrai características de cada símbolo e classifica caracteres usando desde métodos clássicos (HMM, SVM) até CNNs, ResNet, LSTM e transformadores; incorpora modelos de linguagem, dicionários e mecanismos de atenção para correção contextual e pontuação de confiança.
    
- **Geração de saída e pós‑processamento** Reagrupa caracteres em palavras e parágrafos, preserva formato e layout (coordenadas, quebras), aplica validações ortográficas/gramaticais e normalizações; usa modelos de layout multimodal (LayoutLM) para manter estrutura e indexação espacial para consultas.
    

#### Técnicas e termos importantes explicados

- **Redução de ruído**: filtros clássicos e modelos ML que removem manchas e artefatos.
    
- **Correção de inclinação**: Hough, projeções e CNNs que estimam ângulo de rotação.
    
- **Super resolução**: GANs e redes residuais para melhorar texto de baixa resolução.
    
- **Análise de layout**: separa texto de imagens/tabelas e determina ordem de leitura; pode usar grafos e transformadores.
    
- **Modelos de linguagem para correção**: N‑gram, LSTM e transformadores (BERT/GPT) para validar e corrigir sequências de texto.
    
- **Pontuação de confiança**: probabilidades por caractere/palavra que orientam revisão humana ou regras de fallback.
    

#### Considerações práticas para projetos e para a prova AI‑900

- **Qualidade da imagem é crítica**: invista em captura e pré‑processamento para reduzir erros.
    
- **Escolha de técnica conforme o documento**: formulários estruturados podem usar regras e layout; documentos complexos exigem modelos multimodais e segmentação.
    
- **Validação e pós‑processamento**: normalização de datas/valores, dicionários de domínio e modelos de linguagem aumentam precisão em cenários financeiros, legais e médicos.
    
- **Metadados úteis**: coordenadas de texto, ordem de leitura e scores de confiança para auditoria e workflows de revisão humana.
    

### Resumo rápido para revisão AI‑900

- **Definição**: OCR transforma imagens com texto em texto editável.
    
- **Pipeline**: aquisição → pré‑processamento → detecção de regiões → reconhecimento de caracteres → saída/pós‑processamento.
    
- **Pontos-chave**: qualidade da imagem, técnicas de pré‑processamento, uso de CNNs/transformers para reconhecimento, modelos de linguagem para correção e importância de scores de confiança.