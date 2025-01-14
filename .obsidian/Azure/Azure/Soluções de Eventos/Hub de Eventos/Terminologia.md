

## Namespaces
Equivalente aos tópicos do kafka, é um contêiner para os hubs de eventos, fornece pontos de extremidades e outras funcionalidades de gerenciamento.
![[Pasted image 20241228185615.png]]


## Partições
Os Eventos enviados são organizados em partições de forma que um novo evento é adicionado ao final de uma partição, o numero de partições é definido na criação dos hubs de eventos e deve ser de 1 ate o numero máximo definido pela camada de serviço, a quantidade de partições não altera o preço pago.
![[Pasted image 20241228185911.png]]


## Mapeamento de eventos para partições
Podemos mapear os eventos de entrada para uma partição especifica utilizando uma chave de partição, caso não seja especificado uma chave o Hub de Eventos direcionara o evento de forma aleatória.
O Editor de eventos não conhece a partição de destino apenas a chave de partição.


## Editores de eventos
Um editor de eventos é qualquer entidade que envie dados para um hub de eventos, eles podem enviar através de HTTPS, AMQP 1.0 ou protocolo Kafka, para obter acesso é necessário obter um token JWT via Entra ID ou utilizar uma SAS.


## Retenção de eventos
O Hub de eventos possui uma politica de retenção de eventos configurável, o Hub de eventos mantêm os eventos por um período de tempo configurável que se aplica a todas as partições.
Podemos manter eventos além do período de retenção ativando o [recurso de Captura dos Hubs de eventos](https://learn.microsoft.com/pt-br/azure/event-hubs/event-hubs-capture-overview)


## Capturar
É possível adicionar a captura de eventos para enviar os eventos para uma conta do armazenamento de blobs ou um Azure data lake Storage. Para isso é necessário configurar essa captura através do Portal do Azure.
![[Pasted image 20241228200135.png]]

Os eventos tem essa estrutura Avro após a captura:
![[Pasted image 20241228200155.png]]


## Consumidores
Qualquer entidade que lê dados de evento de um hub de eventos é um consumidor de eventos, podem utilizar o protocolo AMQP ou Apache Kafka.


## Grupo de Consumidores
Um grupo de consumidores é um agrupamento lógico de consumidores que leem dados de um hub de eventos ou tópico do Kafka. Permite que vários aplicativos de consumo leiam os mesmos dados de streaming em um hub de eventos de forma independente e em seu próprio ritmo com seus deslocamentos.

A uri de consumo do grupo de consumidores fica assim:

```http
//<my namespace>.servicebus.windows.net/<event hub name>/<Consumer Group #1>
```

## Deslocamento de fluxo
O deslocamento do fluxo diz respeito ao index no item no fluxo, é possível especificar um deslocamento inicial na hora de ler os eventos:
![[Pasted image 20241230012826.png]]


## Grupo de aplicativos
Um grupo de aplicativos é uma coleção de um ou mais aplicativos cliente que interagem com o plano de dados dos Hubs de Eventos. Cada grupo de aplicativos poderá ter como escopo um único namespace de Hubs de Eventos ou hubs de eventos (entidade) dentro de um namespace e deverá usar uma condição de identificação exclusiva como, por exemplo, o contexto de segurança – SAS (Assinaturas de Acesso Compartilhado) ou ID do aplicativo do Microsoft Entra – do aplicativo cliente.

![[Pasted image 20241230014641.png]]


