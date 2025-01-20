O Cache do Azure para Redis utiliza a biblioteca [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis)

## Conexão
A conexão é feita através de HTTPS e tokens:
```HTTP
[cache-name].redis.cache.windows.net:6380,password=[password-here],ssl=True,abortConnect=False
```

- **ssl** - garante que a comunicação seja criptografada.
- **abortConnection** - permite a criação de uma conexão, mesmo se o servidor estiver indisponível no momento.

A criação da conexão é feita através do objeto StackExchange.Redis.ConnectionMultiplexer

```c#
using StackExchange.Redis;
...
var connectionString = "[cache-name].redis.cache.windows.net:6380,password=[password-here],ssl=True,abortConnect=False";
var redisConnection = ConnectionMultiplexer.Connect(connectionString);
```


## Banco de dados
O Banco de dados é obtido através da interface IDatabase:
```c#
IDatabase db = redisConnection.GetDatabase();
```

métodos da interface:

![[Pasted image 20250103230951.png]]


