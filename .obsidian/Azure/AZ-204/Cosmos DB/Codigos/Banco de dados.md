<h1>Criar Banco de dados</h1>
```c#
DatabaseResponse databaseResponse = await client.CreateDatabaseIfNotExistsAsync(databaseId, 10000);
```

<h1>Ler um banco de dados pela ID</h1>
```c#
DatabaseResponse readResponse = await database.ReadAsync();
```

<h1>Excluir um banco de dados</h1>
```c#
await database.DeleteAsync();
```

