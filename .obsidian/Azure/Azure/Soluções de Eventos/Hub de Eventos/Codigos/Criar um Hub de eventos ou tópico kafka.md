
## Criar um grupo de recursos

Crie um grupo de recursos

```bash
rgName="contosorg$RANDOM"
region="eastus"
az group create --name $rgName --location $region
```

## Criar um namespace dos Hubs de Eventos
Crie um namespace do Hub de eventos
``` bash
# Create an Event Hubs namespace. Specify a name for the Event Hubs namespace.
namespaceName="contosoehubns$RANDOM"
az eventhubs namespace create --name $namespaceName --resource-group $rgName -l $region
```


## Criar um Hub de Evento

Execute o comando a seguir para criar um hub de eventos. Atualize o nome do hub de eventos, se desejar.

```bash
# Create an event hub. Specify a name for the event hub. 
eventhubName="contosoehub$RANDOM"
az eventhubs eventhub create --name $eventhubName --resource-group $rgName --namespace-name $namespaceName
```
