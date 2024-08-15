
<h1>Instalar Pacotes</h1>
```bash
dotnet add package Azure.Storage.Blobs
dotnet add package Azure.Identity
```

```csharp
using Azure.Identity;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Azure.Storage.Blobs.Specialized;
```

<h1>Criar Cliente</h1>
```csharp
public BlobServiceClient GetBlobServiceClient(string accountName)
{
    BlobServiceClient client = new(
        new Uri($"https://{accountName}.blob.core.windows.net"),
        new DefaultAzureCredential());

    return client;
}
```




