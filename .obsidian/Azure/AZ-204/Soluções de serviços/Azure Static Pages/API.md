Os aplicativos estáticos do Azure fornecem integração para APIs com o Azure Functions.

As funções do Azure Function devem estar na pasta especificada em <strong>api_location</strong> 

```YML
app_location: 'angular-app' # App source code path
api_location: 'api' # Api source code path - optional
output_location: 'dist/angular-app' # Built app content directory - optional
```
Por padrão a configuração do projeto da api deve seguir as mesmas configurações do Azure Function separado então deve ter um <strong>function.json</strong> com a configuração do gatilho e o <strong>Host.json</strong> para configurações gerais do projeto.

function.json:

```JSON
{
  "bindings": [
    {
      "authLevel": "anonymous",
      "type": "httpTrigger",
      "direction": "in",
      "name": "req",
      "methods": ["get"],
      "route": "products"
    },
    {
      "type": "http",
      "direction": "out",
      "name": "res"
    }
  ]
}
```

host.json:
```JSON
{
  "Host": {
    "CORS": "http://localhost:4200"
  }
}
```


Vale lembrar que as rotas da API também podem ser configuradas através do arquivo <strong>staticwebapp.config.json</strong>


