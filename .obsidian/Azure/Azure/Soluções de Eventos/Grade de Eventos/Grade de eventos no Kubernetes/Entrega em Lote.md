A Grade de Eventos no Kubernetes com o Azure Arc tem suporte para entregar mais de um evento em uma única solicitação de entrega. A entrega de eventos em lote é desativada por padrão e pode ser ativada usando a configuração de assinatura de evento.

## Política de entrega de eventos em lote

O comportamento de entrega de eventos em lote na Grade de Eventos no Kubernetes pode ser personalizado por assinatura de evento, ajustando as duas configurações a seguir:

- **Máximo de eventos por lote**
    
    Essa configuração define um limite superior para o número de eventos que podem ser adicionados a uma solicitação de entrega em lote.
    
- **Tamanho de lote preferencial em quilobytes**
    
    Esse item da configuração é usado para controlar ainda mais o número máximo de quilobytes que pode ser enviado por solicitação de entrega.
## Comportamento de entrega de eventos em lote

- **Tudo ou nada**
    
    A Grade de Eventos no Kubernetes opera com a semântica tudo ou nada. Ela não dá suporte ao sucesso parcial de uma entrega em lote. Os manipuladores de eventos devem ter o cuidado de solicitar apenas a quantidade de eventos por lote que puderem processar em 60 segundos.
    
- **Envio em lote otimista**
    
    As configurações de política de envio em lote não são limites estritos no comportamento do envio em lote e são respeitadas com base no melhor esforço. Em taxas de eventos baixas, geralmente você observará que o tamanho do lote é menor do que o máximo de eventos solicitados por lote.
    
- **A entrega em lotes é definida como OFF por padrão**
    
    Por padrão, a Grade de Eventos no Kubernetes adiciona apenas um evento a cada solicitação de entrega. A maneira de ativar a entrega de eventos em lote é definir qualquer uma das configurações mencionadas anteriormente no artigo no conteúdo de assinatura de evento.
    
- **Valores padrão**
    
    Não é necessário especificar as configurações (máximo de eventos por lote e tamanho de lote aproximado em quilobytes) ao criar uma assinatura de evento. Se apenas uma configuração for definida, a Grade de Eventos no Kubernetes usará valores padrão (configuráveis).

