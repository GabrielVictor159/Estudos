
As assinaturas permitem a configuração de cabeçalhos HTTP personalizados, podemos configurar ate 10 cabeçalhos por assinatura e cada cabeçalho só pode ter até 4 KB.


## Cabeçalhos estáticos
Podemos definir os cabeçalhos estáticos na seguinte pagina do portal do Azure, podemos configurar a visualização como secret e a visualização dependera de funções RBAC.

![[Pasted image 20241214223202.png]]


## Cabeçalhos dinâmicos

Podemos definir um cabeçalho através de uma propriedade do evento dês de que essa propriedade seja uma cadeia de caracteres, um número ou um booleano.

![[Pasted image 20241214223554.png]]


## CLI

```shell
az eventgrid event-subscription create -n es1 --source-resource-id /subscriptions/{SubID}/resourceGroups/{RG}/providers/Microsoft.EventGrid/topics/topic1
    --endpoint-type storagequeue --endpoint /subscriptions/{SubID}/resourceGroups/TestRG/providers/Microsoft.Storage/storageAccounts/sa1/queueservices/default/queues/q1 --enable-advanced-filtering-on-arrays true
    --delivery-attribute-mapping staticproperty1 static somestaticvalue2 true 
    --delivery-attribute-mapping staticproperty2 static somestaticvalue3 false 
    --delivery-attribute-mapping dynamicproperty1 dynamic data.key1
```
