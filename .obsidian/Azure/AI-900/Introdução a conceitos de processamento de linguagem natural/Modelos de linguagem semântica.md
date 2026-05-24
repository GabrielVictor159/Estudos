**Modelos semânticos** representam tokens de linguagem como **vetores densos (embeddings)** que codificam significado. Essa representação vetorial permite que relações semânticas entre palavras sejam tratadas com operações matemáticas e medidas de similaridade, formando a base de técnicas modernas de NLP e IA generativa.

#### Representação vetorial e embeddings

- **Embeddings** são vetores multidimensionais onde cada dimensão captura aspectos semânticos aprendidos durante o treinamento.
    
- Tokens semanticamente próximos (por exemplo, _dog_ e _cat_) têm vetores com orientações semelhantes no espaço vetorial; tokens semanticamente distantes (por exemplo, _dog_ e _tree_) ficam longe.
    
- Essas representações substituem abordagens puramente estatísticas, permitindo comparações semânticas mais robustas.
    

#### Similaridade e operações vetoriais

- **Similaridade de cosseno** é a métrica comum para comparar vetores:cosine(A,B)=A⋅B/∥A∥∥B∥. Valores próximos de 1 indicam alta similaridade.
    
- **Operações aritméticas** (adição/subtração) sobre vetores capturam transformações semânticas — por exemplo, _dog + young ≈ puppy_ — e permitem resolver analogias por combinação vetorial. Na prática, busca‑se o token cujo embedding é mais próximo do vetor resultante.
    

#### Aplicações práticas em análise de texto

- **Resumo extrativo**: codificar frases como vetores e selecionar as mais centrais ao documento para formar um resumo.
    
- **Extração de palavras‑chave**: identificar termos cujos embeddings são mais próximos da representação global do documento.
    
- **Reconhecimento de entidade nomeada (NER)**: ajustar modelos semânticos para agrupar e classificar tokens que representam pessoas, organizações, locais etc.
    
- **Classificação de texto**: agregar embeddings de documento (por exemplo, média dos embeddings de palavras) e usar classificadores ou protótipos de classe para rotular tópicos ou sentimentos.
    

#### Observações práticas e limitações

- **Aritmética vetorial raramente produz correspondências exatas**; normalmente busca‑se o vetor mais próximo no vocabulário.
    
- **Qualidade dos embeddings** depende do corpus e do método de treinamento; embeddings contextualizados (que consideram o contexto do token) tendem a ser mais poderosos que embeddings estáticos.
    
- **Uso combinado**: embeddings podem ser usados junto com TF‑IDF, grafos (TextRank) ou modelos supervisionados para melhorar resultados em tarefas específicas.
    

#### Síntese para revisão AI‑900

- **Essência**: transformar texto em vetores permite medir semântica, comparar significado e aplicar operações matemáticas para raciocínio analógico e tarefas de NLP.
    
- **Ferramentas-chave**: embeddings, similaridade de cosseno, operações vetoriais, agregação de embeddings para documentos.
    
- **Principais usos**: resumo, extração de palavras‑chave, NER e classificação.