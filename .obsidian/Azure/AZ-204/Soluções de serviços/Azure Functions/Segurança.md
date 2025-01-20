O Azure function possui suporte de autenticação do Microsoft Entra ID.

![[Pasted image 20240812022328.png]]
As funções possuem 3 níveis de autenticação:
<ul>
<li><strong>Anônimo: </strong>Qualquer cliente pode acionar a função.</li>
<li><strong>Função: </strong>O cliente deve fornecer uma chave de função para invocar a função, essa chave é gerada pelo Azure function através de solicitação e é especifica de uma unica função.</li>
<li><strong>Admin: </strong>O cliente deve fornecer a chave mestra para invocar a função, essa chave fornece acesso administrativo a todas as funções da aplicação.</li>
</ul>
```csharp
[FunctionName("ExampleFunction")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
    ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");
    return new OkObjectResult("Hello, Anonymous");
}

[FunctionName("ExampleFunction")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
    ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");
    return new OkObjectResult("Hello, Function");
}

[FunctionName("ExampleFunction")]
public static async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
    ILogger log)
{
    log.LogInformation("C# HTTP trigger function processed a request.");
    return new OkObjectResult("Hello, Function");
}

```

