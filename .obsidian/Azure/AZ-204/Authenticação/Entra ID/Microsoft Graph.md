O Microsoft Graph é o gateway para dados e inteligência em Microsoft 365.
![[Pasted image 20240722031926.png]]


- **API do Microsoft Graph**: Oferece um único ponto de extremidade (https://graph.microsoft.com) que pode ser acessado via APIs REST ou SDKs, gerenciando identidade, acesso, conformidade e segurança.
    
- **Conectores do Microsoft Graph**: Entregam dados externos à nuvem da Microsoft para aprimorar experiências do Microsoft 365, como o Microsoft Search, com conectores para fontes como Box, Google Drive, Jira e Salesforce.
    
- **Conexão de Dados**: Ferramentas para otimizar a entrega segura e escalonável de dados do Microsoft Graph para armazenamentos de dados do Azure, servindo como fontes para ferramentas de desenvolvimento do Azure.

<h1>Consultar utilizando REST</h1>
``` python
{HTTP method} https://graph.microsoft.com/{version}/{resource}?{query-parameters}
```

<h1>Consultar usando SDKs</h1>
<h4>Criar um cliente:</h4>
```c#
var scopes = new[] { "User.Read" };

// Multi-tenant apps can use "common",
// single-tenant apps must use the tenant ID from the Azure portal
var tenantId = "common";

// Value from app registration
var clientId = "YOUR_CLIENT_ID";

// using Azure.Identity;
var options = new TokenCredentialOptions
{
    AuthorityHost = AzureAuthorityHosts.AzurePublicCloud
};

// Callback function that receives the user prompt
// Prompt contains the generated device code that you must
// enter during the auth process in the browser
Func<DeviceCodeInfo, CancellationToken, Task> callback = (code, cancellation) => {
    Console.WriteLine(code.Message);
    return Task.FromResult(0);
};

// /dotnet/api/azure.identity.devicecodecredential
var deviceCodeCredential = new DeviceCodeCredential(
    callback, tenantId, clientId, options);

var graphClient = new GraphServiceClient(deviceCodeCredential, scopes);
```

<h4>Recuperar uma lista de entidades</h4>
```c#
// GET https://graph.microsoft.com/v1.0/me/messages?$select=subject,sender&$filter=<some condition>&orderBy=receivedDateTime

var messages = await graphClient.Me.Messages
    .Request()
    .Select(m => new {
        m.Subject,
        m.Sender
    })
    .Filter("<filter condition>")
    .OrderBy("receivedDateTime")
    .GetAsync();
```

<h4>Criar uma entidade</h4>
```c#
// POST https://graph.microsoft.com/v1.0/me/calendars

var calendar = new Calendar
{
    Name = "Volunteer"
};

var newCalendar = await graphClient.Me.Calendars
    .Request()
    .AddAsync(calendar);
```
<h4>Excluir uma entidade</h4>
```c#
// DELETE https://graph.microsoft.com/v1.0/me/messages/{message-id}

string messageId = "AQMkAGUy...";
var message = await graphClient.Me.Messages[messageId]
    .Request()
    .DeleteAsync();
```


