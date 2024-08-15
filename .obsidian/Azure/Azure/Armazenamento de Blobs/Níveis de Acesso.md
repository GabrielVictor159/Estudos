
Os dados armazenados no armazenamento de Blobs possuem diferentes níveis de camadas de acesso a dados:

1. **Camada de Acesso Frequente**:
    
    - **Descrição**: Ideal para dados que são acessados com frequência.
    - **Uso**: Aplicações de produção, dados de uso frequente e dados que requerem baixa latência.
    - **Custo**: Maior custo de armazenamento, mas menor custo de acesso.
    
1. **Camada de Acesso Esporádico**:
    - **Descrição**: Para dados que são acessados com menos frequência, mas ainda precisam estar disponíveis rapidamente quando necessário.
    - **Uso**: Dados de backup, recuperação de desastres e dados que são acessados esporadicamente.
    - **Custo**: Menor custo de armazenamento comparado à camada frequente, mas maior custo de acesso.
    - **Dias mínimos**: 30 Dias.
    
1. **Camada de Acesso Frio**:
    - **Descrição**: Para dados que são raramente acessados e podem tolerar maior latência de acesso.
    - **Uso**: Arquivamento de longo prazo, dados de conformidade e dados históricos.
    - **Custo**: Muito menor custo de armazenamento, mas maior custo de acesso.
    - **Dias mínimos:** 90 Dias.
    
1. **Camada de Arquivos**:
    - **Descrição**: Para dados que são raramente acessados e têm requisitos de retenção de longo prazo.
    - **Uso**: Arquivamento de longo prazo, dados de conformidade e dados que precisam ser mantidos por anos.
    - **Custo**: O menor custo de armazenamento, mas o maior custo de acesso e reidratação.
    - **Dias mínimos:** 180 Dias.


