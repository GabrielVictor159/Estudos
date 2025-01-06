
O Azure dá suporte a dois tipos de mecanismo de fila: **filas do Armazenamento** e **filas do Barramento de Serviço**.

As **filas de Armazenamento** fazem parte da infraestrutura do [Armazenamento do Azure](https://azure.microsoft.com/services/storage/). Elas permitem armazenar uma grande quantidade de mensagens.  Você acessa as mensagens em qualquer lugar do mundo por meio de chamadas autenticadas usando HTTP ou HTTPS. Uma mensagem da fila pode ter até 64 KB. Uma fila pode conter milhões de mensagens, até o limite da capacidade total de uma conta de armazenamento.

### Considerar usar filas de Armazenamento

Como arquiteto/desenvolvedor de soluções, **você deve considerar o uso das filas do Armazenamento** quando:

- Seu aplicativo precisar armazenar mais de 80 GB de mensagens em uma fila.
- Seu aplicativo desejar acompanhar o progresso do processamento de uma mensagem na fila. Isso será útil caso haja falha no processamento de trabalho de uma mensagem. Outro trabalho poderá usar essas informações para prosseguir do ponto em que o trabalho anterior parou.
- Você precisar de logs do servidor de todas as transações executadas em suas filas.