## 📌 1. O que é uma solicitação (prompt)

Um _prompt_ é a instrução fornecida a um modelo de IA generativa para orientar sua resposta. Ele define **o que o modelo deve fazer**, **como deve responder** e **qual contexto deve considerar**. Prompts bem formulados aumentam a precisão, a utilidade e a segurança das respostas.

## 📌 2. Tipos de prompts
![[Pasted image 20260517014535.png]]


### **🔹 Prompt de sistema**

Define o **comportamento base** do modelo. Ele estabelece regras, tom, estilo e limites. Exemplos de funções do prompt de sistema:

- definir que o modelo deve ser formal ou informal
    
- restringir temas
    
- orientar o estilo de escrita
    
- impor padrões de segurança
    

Ele funciona como a “configuração inicial” do modelo.

### **🔹 Prompt do usuário**

É a solicitação direta que o modelo deve atender. Contém o pedido específico, como:

- gerar um texto
    
- responder uma pergunta
    
- resumir um conteúdo
    
- criar um código
    
- analisar dados
    

O modelo combina o **prompt de sistema** + **prompt do usuário** para produzir a resposta final.

## 📌 3. Histórico de conversas (contexto)
![[Pasted image 20260517014730.png]]


Modelos generativos mantêm **memória contextual** dentro da sessão. Isso significa que cada nova solicitação inclui:

- o prompt atual
    
- prompts anteriores
    
- respostas anteriores
    

Esse encadeamento permite que o modelo:

- mantenha coerência
    
- lembre-se de instruções anteriores
    
- responda com base no contexto acumulado
    

É assim que conversas longas permanecem consistentes.

## 📌 4. RAG — Recuperação Aumentada de Geração

RAG é uma técnica que combina **busca de informações externas** com **geração de texto**.

O processo funciona assim:

1. O usuário faz uma pergunta.
    
2. O sistema busca documentos relevantes em bases internas ou externas.
    
3. O conteúdo recuperado é incorporado ao prompt.
    
4. O modelo gera uma resposta fundamentada nesses dados.
    

RAG é essencial para:

- fornecer respostas atualizadas
    
- usar dados privados da empresa
    
- reduzir alucinações
    
- garantir precisão factual
    

É uma das técnicas mais importantes em soluções corporativas de IA.

## 📌 5. Boas práticas para escrever prompts

A unidade apresenta diretrizes essenciais para melhorar a qualidade das respostas:

### ✔ Seja claro e específico

Evite ambiguidades. Quanto mais direto o pedido, melhor o resultado.

### ✔ Forneça contexto

Inclua:

- objetivo
    
- público-alvo
    
- formato desejado
    
- restrições
    

Contexto reduz interpretações erradas.

### ✔ Use exemplos

Modelos aprendem padrões. Mostrar um exemplo de saída desejada melhora a precisão.

### ✔ Peça estrutura

Indique o formato da resposta:

- lista
    
- tabela
    
- tópicos
    
- parágrafos
    
- estilo específico
    

### ✔ Divida tarefas complexas

Prompts longos podem ser divididos em etapas menores para maior controle.

# 🎯 **Essência para a certificação AI‑900**

- Prompts são a forma de **controlar e orientar** modelos generativos.
    
- Existem dois tipos principais: **sistema** e **usuário**.
    
- O histórico de conversas cria **contexto contínuo**.
    
- RAG combina **busca de dados** com **geração**, aumentando precisão.
    
- Prompts bem escritos são essenciais para obter respostas úteis e seguras.