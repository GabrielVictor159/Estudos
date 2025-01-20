<h1>Criar um contêiner</h1>
```c#
ContainerResponse simpleContainer = await database.CreateContainerIfNotExistsAsync( id: containerId, partitionKeyPath: partitionKey, throughput: 400);
```

<h1>Obter um contêiner por ID</h1>
```c#
Container container = database.GetContainer(containerId); ContainerProperties containerProperties = await container.ReadContainerAsync();
```

<h1>Excluir um contêiner</h1>
```c#
await database.GetContainer(containerId).DeleteContainerAsync();
```

