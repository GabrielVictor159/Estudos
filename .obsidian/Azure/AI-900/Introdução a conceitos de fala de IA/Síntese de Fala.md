**Síntese de fala (TTS)** converte texto escrito em áudio falado por meio de um pipeline em estágios que transforma texto bruto em uma forma de onda natural e inteligível.

### Pipeline principal e estágios

1. **Normalização de texto** — padroniza entradas expandindo abreviações, números, datas e símbolos para formas faladas, e resolve homógrafos pelo contexto. Domínios distintos exigem regras específicas de normalização.
    
2. **Análise linguística e G2P** — segmenta texto em palavras e sílabas, consulta léxicos e aplica modelos grapheme‑to‑phoneme para mapear grafemas em fonemas, usando modelos neurais para lidar com palavras desconhecidas e variações regionais.
    
3. **Geração de prosódia** — prevê contornos de tom, duração, intensidade, pausas e padrões de estresse que definem ritmo e entonação; modelos Transformer são usados para prever esses alvos prosódicos com base em sintaxe, semântica, contexto do discurso e identidade do locutor.
    
4. **Síntese de forma de onda** — um modelo acústico converte fonemas e metas prosódicas em mel‑espectrogramas; um **vocoder neural** (ex.: WaveNet, WaveGlow, HiFi‑GAN) transforma esses espectrogramas em formas de onda de alta fidelidade. Pós‑processamento ajusta filtragem e normalização.
    

### Prosódia em detalhe

**Prosódia** determina naturalidade: contornos de tom sinalizam perguntas ou ênfases; duração e pausas criam ritmo; intensidade destaca informações importantes. Modelos aprendem padrões prosódicos a partir de grandes corpora de fala alinhada a transcrições, e fatores como sintaxe, semântica, estilo e emoção influenciam as previsões. Uma prosódia inadequada gera fala robótica mesmo com fonemas corretos.

### Vocoders e qualidade de áudio

Vocoderes neurais geram áudio com **alta fidelidade**, capturam sutilezas vocais (respiração, timbre) e podem operar em tempo real em hardware moderno. Eles permitem adaptar vozes, idiomas e estilos, e representam o “inverso” do reconhecimento de fala: convertem representações acústicas em amostras de áudio.

### Fluxo de trabalho exemplificado e desempenho

Um exemplo prático: normalização expande números e abreviações; G2P produz fonemas; prosódia define tom/duração; síntese gera a forma de onda — todo o processo costuma ser concluído em menos de um segundo em hardware atual. Para aplicações interativas, otimizações de latência e escolha de modelos são críticas.

### Considerações operacionais e recomendações

- **Domínio e estilo**: adapte normalização e modelos de prosódia ao domínio (médico, financeiro, etc.).
    
- **Naturalidade vs latência**: modelos mais complexos melhoram naturalidade; trade‑offs de latência devem ser avaliados para cenários em tempo real.
    
- **Pós‑processamento**: equalização, normalização e efeitos melhoram qualidade final e conformidade com requisitos de saída.
    

### Principais pontos para revisão AI‑900

- **Quatro estágios**: normalização → análise linguística/G2P → prosódia → síntese/vocoder.
    
- **Prosódia é central** para naturalidade; Transformers são usados para prever contornos prosódicos.
    
- **Vocoderes neurais** (WaveNet, HiFi‑GAN, etc.) entregam alta fidelidade e viabilidade em tempo real.