### Sessões de Mensagem

- **Garantia FIFO**: As sessões de mensagem permitem a manipulação ordenada e exclusiva de sequências de mensagens relacionadas, garantindo a ordem FIFO (primeiro a entrar, primeiro a sair).
    
- **Armazenamento de Estado**: Permite armazenar o estado da sessão, possibilitando a movimentação segura das sessões entre manipuladores.
    

### Encaminhamento Automático

- **Encadeamento de Entidades**: Permite encadear uma fila ou assinatura a outra fila ou tópico dentro do mesmo namespace, movendo mensagens automaticamente de forma transacional.
    

### Fila de Mensagens Mortas (DLQ)

- **Mensagens Não Entregues**: Armazena mensagens que não podem ser entregues, que atingiram o tempo limite ou que foram explicitamente colocadas de lado pelo aplicativo receptor.
    
- **Ponto de Extremidade Especial**: Funciona como qualquer fila regular, permitindo a navegação e retirada de mensagens.
    

### Entrega Agendada

- **Processamento Atrasado**: Permite enviar mensagens para uma fila ou tópico com um horário definido para quando a mensagem ficará disponível para consumo. Mensagens agendadas também podem ser canceladas.
    

### Adiamento de Mensagens

- **Recuperação Posterior**: Permite que um cliente de fila ou assinatura adie a recuperação de uma mensagem recebida para um momento posterior, reativando-a explicitamente usando seu número de sequência.
    

### Transações

- **Agrupamento de Operações**: Permite agrupar operações contra várias entidades de mensagens dentro do escopo de uma única transação, garantindo a execução conjunta.
    

### Exclusão Automática por Inatividade

- **Exclusão de Entidades**: Especifica um intervalo de inatividade após o qual uma fila ou assinatura de tópico é automaticamente excluída.

