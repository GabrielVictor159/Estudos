Atualmente, há quatro tipos de funções duráveis no Azure Functions: atividade, orquestrador, entidade e cliente.

## Funções de orquestrador
As funções do Orchestrator descrevem como as ações são executadas e a ordem na qual essas ações são executadas. As funções do Orchestrator descrevem a orquestração no código (C# ou JavaScript).

```C#
[FunctionName("E1_HelloSequence")]
public static async Task<List<string>> Run(
    [OrchestrationTrigger] IDurableOrchestrationContext context)
{
    var outputs = new List<string>();

    outputs.Add(await context.CallActivityAsync<string>("E1_SayHello", "Tokyo"));
    outputs.Add(await context.CallActivityAsync<string>("E1_SayHello", "Seattle"));
    outputs.Add(await context.CallActivityAsync<string>("E1_SayHello_DirectInput", "London"));

    // returns ["Hello Tokyo!", "Hello Seattle!", "Hello London!"]
    return outputs;
}
```


## Funções de atividade
Funções de atividade são a unidade básica de trabalho em uma função de orquestração durável. Funções de atividade são as funções e as tarefas que são orquestradas no processo.
```c#
[FunctionName("E1_SayHello")]
public static string SayHello([ActivityTrigger] IDurableActivityContext context)
{
    string name = context.GetInput<string>();
    return $"Hello {name}!";
}
```


## Funções de entidade
As funções de entidade definem operações para leitura e atualização de pequenas partes de estado. Geralmente nos referimos a essas entidades com estado como _entidades duráveis_.

```c#
    [FunctionName("EntityFunction")]
    public static Task RunEntityFunction([EntityTrigger] IDurableEntityContext ctx, ILogger log)
    {
        switch (ctx.OperationName.ToLowerInvariant())
        {
            case "add":
                ctx.SetState(ctx.GetState<int>() + ctx.GetInput<int>());
                break;
            case "reset":
                ctx.SetState(0);
                break;
            case "get":
                ctx.Return(ctx.GetState<int>());
                break;
        }
        return Task.CompletedTask;
    }
```


## Funções do cliente
Os gatilhos das outras funções funcionam reagindo a mensagens enfileiradas em um [hub de tarefas](https://learn.microsoft.com/pt-br/azure/azure-functions/durable/durable-functions-task-hubs). A principal maneira de fornecer essas mensagens é usando uma [associação de cliente de orquestrador](https://learn.microsoft.com/pt-br/azure/azure-functions/durable/durable-functions-bindings#orchestration-client) ou uma [associação de cliente de entidade](https://learn.microsoft.com/pt-br/azure/azure-functions/durable/durable-functions-bindings#entity-client) de dentro de uma _função de cliente.
```c#
public static class HttpStart
{
    [FunctionName("HttpStart")]
    public static async Task<HttpResponseMessage> Run(
        [HttpTrigger(AuthorizationLevel.Function, methods: "post", Route = "orchestrators/{functionName}")] HttpRequestMessage req,
        [DurableClient] IDurableClient starter,
        string functionName,
        ILogger log)
    {
        // Function input comes from the request content.
        object eventData = await req.Content.ReadAsAsync<object>();
        string instanceId = await starter.StartNewAsync(functionName, eventData);

        log.LogInformation($"Started orchestration with ID = '{instanceId}'.");

        return starter.CreateCheckStatusResponse(req, instanceId);
    }
}
``

`