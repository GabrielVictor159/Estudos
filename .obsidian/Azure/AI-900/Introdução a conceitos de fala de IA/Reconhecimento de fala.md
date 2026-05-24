**Reconhecimento de fala** (speech‑to‑text) converte áudio falado em texto escrito por meio de um pipeline em estágios: **captura de áudio → pré‑processamento / extração de recursos → modelagem acústica → modelagem de linguagem → decodificação → pós‑processamento**. Cada estágio transforma a representação do sinal até produzir a transcrição final, e problemas de qualidade geralmente podem ser rastreados a um desses estágios.

#### 1. Captura de áudio e considerações práticas

- **Amostragem**: áudio é digitalizado em amostras por segundo; aplicações de fala normalmente usam **8 kHz a 16 kHz** (16 kHz é comum para equilíbrio entre qualidade e custo computacional).
    
- **Qualidade**: ruído de fundo, microfone, distância do falante e taxa de amostragem impactam diretamente a precisão; filtros básicos são aplicados para remover zumbidos e cliques antes da extração de recursos.
    

#### 2. Pré‑processamento e extração de recursos (MFCC)

- **Objetivo**: transformar a forma de onda em uma representação compacta que realce características relevantes da fala.
    
- **MFCC (Mel‑Frequency Cepstral Coefficients)**: técnica padrão que imita a percepção humana do som. Passos principais:
    
    - dividir o áudio em **quadros de 20–30 ms**;
        
    - aplicar transformada de Fourier para obter espectro por quadro;
        
    - mapear frequências na **escala Mel**;
        
    - extrair um conjunto reduzido de coeficientes (tipicamente **~13 coeficientes**) por quadro;
        
    - resultado: sequência de vetores (um por quadro) que alimenta a modelagem acústica.
        

#### 3. Modelagem acústica (de recursos a fonemas)

- **Função**: aprender a relação entre vetores de recurso (MFCCs) e **fonemas** — as menores unidades sonoras que distinguem palavras.
    
- **Arquiteturas modernas**: **Transformers** substituem modelos recorrentes por processamento paralelo, atenção e previsões contextualizadas sobre quadros adjacentes.
    
- **Saída**: para cada quadro, o modelo produz uma **distribuição de probabilidade** sobre fonemas (ex.: quadro 42 → 80% /æ/, 15% /ɛ/, 5% outros).
    
- **Observação**: fonemas são específicos do idioma; modelos treinados para um idioma não generalizam fonemas de outro sem retreinamento.
    

#### 4. Modelagem de linguagem e desambiguação

- **Papel**: aplicar conhecimento de vocabulário, gramática e padrões de sequência para resolver ambiguidades acústicas (por exemplo, homofonia ou confusões de fonema).
    
- **Técnicas**: modelos estatísticos ou neurais que estimam probabilidades de sequências de palavras; **adaptação de domínio** (treinar em terminologia médica, legal etc.) melhora precisão em cenários especializados.
    

#### 5. Decodificação e seleção da hipótese

- **Decodificação por busca de feixe (beam search)**: mantém um conjunto (feixe) de hipóteses parciais de transcrição e expande apenas as mais prováveis a cada passo, equilibrando precisão e latência.
    
- **Trade‑offs**: feixes mais largos aumentam precisão mas também custo computacional e latência; aplicações em tempo real limitam largura do feixe para reduzir atraso.
    

#### 6. Pós‑processamento e metadados

- **Tarefas comuns**: capitalização, restauração de pontuação, formatação de números, normalização inversa (ex.: “três da tarde” → “15:00”), filtragem de palavrões.
    
- **Metadados úteis**: carimbos de tempo por palavra e **pontuações de confiança** permitem destacar trechos de baixa confiança para revisão humana ou acionar fluxos de fallback em aplicações críticas (ex.: transcrição médica).
    

#### 7. Integração prática e diagnóstico

- **Como os estágios se relacionam**: captura → MFCC → acústica → linguagem → decodificação → pós‑processamento; falhas de precisão normalmente apontam para um estágio específico (ex.: áudio ruim → captura; vocabulário especializado ausente → modelagem de linguagem).
    
- **Recomendações operacionais**: garantir boa qualidade de áudio, escolher taxa de amostragem adequada, adaptar modelos ao domínio quando necessário, ajustar largura do feixe para balancear latência/precisão e usar pontuações de confiança para revisão humana.
    

#### Pontos-chave para a prova AI‑900

- Entender o **pipeline** do reconhecimento de fala e o papel de cada estágio.
    
- Saber o que são **MFCCs**, por que se usam quadros de 20–30 ms e por que ~13 coeficientes são comuns.
    
- Reconhecer que **transformers** são a arquitetura atual para modelagem acústica e que **modelos de linguagem** resolvem ambiguidades.
    
- Conhecer **beam search**, trade‑offs de latência/precisão e a utilidade de **confiança** e timestamps na produção.