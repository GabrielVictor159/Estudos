**Extração de campo** transforma a saída do OCR (texto, posições, scores) em **campos de dados rotulados** prontos para sistemas de negócio (ex.: fornecedor, data, total de fatura). A posição do texto no documento é tão importante quanto o conteúdo para determinar o significado.

#### Pipeline resumido (etapas principais)

1. **Ingestão da saída do OCR** — recebe texto bruto, coordenadas das caixas, ordem de leitura, metadados e scores de confiança.
    
2. **Detecção de campo / identificação de candidatos** — encontra valores potenciais usando abordagens baseadas em regras (layouts, âncoras, regex), modelos de ML (transformers, GNNs, modelos seq2seq) ou LLMs com prompts e few‑shot.
    
3. **Mapeamento e associação** — emparelha rótulos e valores por proximidade espacial, ordem de leitura, relações geométricas e técnicas linguísticas (NER, análise sintática).
    
4. **Normalização e padronização** — converte formatos (datas, moedas, unidades), resolve ambiguidade e aplica regras de formatação consistentes.
    
5. **Integração com sistemas de negócio** — mapeia campos ao esquema alvo (banco de dados, APIs, filas), aplica transformações e regras de negócio antes da ingestão.
    

#### Abordagens para detecção de campo e quando usar cada uma

- **Baseada em regras / templates**: alta precisão para documentos padronizados; rápida e explicável, mas frágil a variações de layout.
    
- **Machine learning supervisionado / multimodal**: usa exemplos rotulados para aprender padrões textuais, visuais e posicionais; transformers e GNNs são eficazes para layouts variados.
    
- **IA generativa / LLMs**: extração por prompt, few‑shot e raciocínio guiado; útil para esquemas personalizados e quando há poucos exemplos rotulados.
    

#### Tratamento de tabelas e conteúdo estruturado

- **Detecção de tabelas**: identificar células, cabeçalhos e hierarquias usando CNNs, detectores de objetos ou grafos.
    
- **Mapeamento de células**: associar linhas/colunas ao esquema, detectar cabeçalhos e lidar com tabelas aninhadas e subtotais.
    

#### Pontuação, validação e garantia de qualidade

- **Scores de confiança**: combinar confiança do OCR com métricas de correspondência de padrão.
    
- **Validações contextuais**: checar consistência entre campos (ex.: somatório de itens vs total), formatos esperados e limites numéricos.
    
- **Relatórios**: métricas por campo e por documento, categorização de erros para triagem humana.
    

#### Normalização e padronização de valores

- **Datas**: detectar formatos variados e converter para padrão ISO.
    
- **Monetário**: reconhecer símbolos, normalizar separadores decimais e converter moedas/unidades quando necessário.
    
- **Texto**: normalizar caixa, codificação e expandir abreviações.
    

#### Integração e operacionalização

- **Mapeamento de esquema**: renomear campos, converter tipos e aplicar lógica condicional para compatibilizar com sistemas downstream.
    
- **Fluxos de ingestão**: exportar via APIs, filas ou cargas diretas em banco; incluir metadados (coordenadas, confiança) para auditoria.
    

#### Considerações práticas e riscos

- **Qualidade da entrada**: imagens com ruído, baixa resolução ou OCR fraco degradam toda a cadeia.
    
- **Adaptação ao domínio**: treinar/ajustar modelos com exemplos do domínio (financeiro, saúde, legal) melhora precisão.
    
- **Privacidade e conformidade**: projetar armazenamento e processamento conforme regras setoriais.
    
- **Viés e cobertura**: modelos treinados em corpora limitados podem falhar em layouts ou idiomas não representados.
    

### Resumo rápido para revisão AI‑900

- **Objetivo**: transformar saída do OCR em campos estruturados e confiáveis.
    
- **Pipeline**: ingestão → detecção de candidatos → mapeamento/associação → normalização → integração.
    
- **Técnicas**: regras/templates, ML multimodal (transformers, GNNs), LLMs para extração por prompt; tabelas exigem detecção de células e mapeamento linha/coluna.
    
- **Qualidade**: usar scores de confiança, validações entre campos e relatórios de erro; priorizar boa captura e adaptação de domínio.