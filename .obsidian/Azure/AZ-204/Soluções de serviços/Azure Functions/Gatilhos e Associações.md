
<h1>Gatilhos</h1>
Os gatilhos fazem com que as funções sejam executadas, e uma função deve ter apenas um gatilho.


<li><strong>Gatilho HTTP: </strong>Cria uma função que é executada com requisições HTTP:
</li>

```csharp
[FunctionName("HttpTriggerCSharp")]
public static async Task<HttpResponseMessage> Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequestMessage req, 
    ILogger log)
{
    // Seu código aqui
}
```


<li><strong>Gatilho de Fila: </strong> Cria uma função que é executada quando um novo item é adicionado na fila: </li>
```csharp
[FunctionName("QueueTriggerCSharp")]      
public static void Run(
    [QueueTrigger("myqueue-items", Connection = "AzureWebJobsStorage")]string myQueueItem, 
    ILogger log)
{
    log.LogInformation($"C# Queue trigger function processed: {myQueueItem}");
}

```

<li><strong>Gatilho de Timer: </strong>Cria uma função que é executada com um gatilho de tempo: </li>
```csharp
[FunctionName("TimerTriggerCSharp")]      
public static void Run([TimerTrigger("0 */5 * * * *")]TimerInfo myTimer, ILogger log)
{
    log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
}

```

<li><strong>Gatilho do Event Grid: </strong>Cria uma função que é executada em resposta a um evento da grade de eventos do azure: </li>
```csharp
[FunctionName("EventGridTriggerCSharp")]
public static void Run([EventGridTrigger]EventGridEvent eventGridEvent, ILogger log)
{
    log.LogInformation(eventGridEvent.Data.ToString());
}

```

<li><strong>Gatilho de Blob storage: </strong>Cria uma função que é executada quando um blob é criado ou atualizado no Azure storage:</li>
```csharp
[FunctionName("BlobTriggerCSharp")] 
public static void Run([BlobTrigger("samples-workitems/{name}", Connection = "AzureWebJobsStorage")] Stream myBlob, string name, ILogger log)
{
    log.LogInformation($"C# Blob trigger function Processed blob\n Name:{name} \n Size: {myBlob.Length} Bytes");
}
```

<li><strong>Gatilho do Service Bus: </strong>Cria uma função que é executada quando uma nova mensagem é adicionada a fila do Service Bus:</li>
```csharp
[FunctionName("ServiceBusQueueTriggerCSharp")]                    
public static void Run([ServiceBusTrigger("myqueue", Connection = "ServiceBusConnection")]string myQueueItem, ILogger log)
{
    log.LogInformation($"C# ServiceBus queue trigger function processed message: {myQueueItem}");
}
```

<li><strong>Gatilho do EventHub: </strong> Cria uma função que é executada quando um evento é adicionado no Hub de Eventos.</li>
```csharp
[FunctionName("EventHubTriggerCSharp")] 
public static void Run([EventHubTrigger("samples-workitems", Connection = "EventHubConnectionAppSetting")] string myEventHubMessage, ILogger log)
{
    log.LogInformation($"C# Event Hub trigger function processed a message: {myEventHubMessage}");
}

```


Vale lembrar que toda e qualquer função deve ter um arquivo function.json associada a ela, onde são definidos os gatilhos e associações da função, entretanto caso não exista ele é criado automaticamente ao publicar o projeto, exemplo de codigo:
```JSON
{
  "bindings": [
    {
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": [
        "get",
        "post"
      ]
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    },
    {
      "type": "queue",
      "direction": "out",
      "name": "outQueueItem",
      "queueName": "outqueue",
      "connection": "AzureWebJobsStorage"
    }
  ]
}
```


<h1>Associações</h1>
As Associações são ligações extras que uma função pode ter, elas podem ter o caráter de in para dados de entrada e out para dados de saída, as associações facilitam a criação de funções uma vez que o desenvolvedor não precisa gerenciar as credenciais associadas a elas:
```csharp
[FunctionName("ResizeImage")]
public static void Run(
    [BlobTrigger("sample-images/{filename}")] Stream image,
    [Blob("sample-images-sm/{filename}", FileAccess.Write)] Stream imageSmall,
    string filename,
    ILogger log)
{
    log.LogInformation($"Blob trigger processing: {filename}");
    // ...
}
```
```JSON
{
  "bindings": [
    {
      "name": "myQueueItem",
      "type": "queueTrigger",
      "queueName": "myqueue-items",
      "connection": "MyStorageConnection",
    },
    {
      "name": "myInputBlob",
      "type": "blob",
      "path": "samples-workitems/{queueTrigger}",
      "direction": "in",
      "connection": "MyStorageConnection"
    }
  ]
}
```
