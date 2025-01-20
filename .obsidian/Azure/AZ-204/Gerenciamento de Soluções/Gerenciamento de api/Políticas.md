 As políticas são um conjunto de instruções executadas em sequência, no momento da solicitação ou da resposta de uma API dentro do Gateway da api.

## Configuração de políticas
A definição da política é um documento XML simples que descreve uma sequência de instruções de entrada e de saída.

A configuração é dividida em `inbound`, `backend`, `outbound` e `on-error`. A série de instruções de política especificadas é executada ordenadamente para uma solicitação e uma resposta.

```XML
<policies>
  <inbound>
    <!-- statements to be applied to the request go here -->
  </inbound>
  <backend>
    <!-- statements to be applied before the request is forwarded to 
         the backend service go here -->
  </backend>
  <outbound>
    <!-- statements to be applied to the response go here -->
  </outbound>
  <on-error>
    <!-- statements to be applied if there is an error condition go here -->
  </on-error>
</policies>
```



## Expressões de políticas
A expressão de política é:
- uma única instrução C# em `@(expression)` ou
- um bloco de códigos C# de várias instruções, em `@{expression}` que retorna um valor

```xml
<policies>
    <inbound>
        <base />
        <set-header name="x-request-context-data" exists-action="override">
            <value>@(context.User.Id)</value>
            <value>@(context.Deployment.Region)</value>
      </set-header>
    </inbound>
</policies>
```

``` xml
<policies>
  <inbound>
    <base />
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
    <choose>
      <when condition="@(context.Response.StatusCode == 200 && context.Product.Name.Equals("Starter"))">
        <!-- NOTE that we are not using preserveContent=true when deserializing response body stream into a JSON object since we don't intend to access it again. See details on /azure/api-management/api-management-transformation-policies#SetBody -->
        <set-body>
          @{
            var response = context.Response.Body.As<JObject>();
            foreach (var key in new [] {"minutely", "hourly", "daily", "flags"}) {
            response.Property (key).Remove ();
           }
          return response.ToString();
          }
    </set-body>
      </when>
    </choose>    
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
```


## Fluxo de controle
A política `choose` aplica instruções de política incluídas com base no resultado da avaliação de expressões booleanas, semelhante a uma if-then-else.
```xml
<choose>
    <when condition="Boolean expression | Boolean constant">
        <!— one or more policy statements to be applied if the above condition is true  -->
    </when>
    <when condition="Boolean expression | Boolean constant">
        <!— one or more policy statements to be applied if the above condition is true  -->
    </when>
    <otherwise>
        <!— one or more policy statements to be applied if none of the above conditions are true  -->
</otherwise>
</choose>
```


## Simultaneidade de limites
A política `limit-concurrency` impede que políticas fechadas sejam executadas por mais do que o número especificado de solicitações a qualquer momento.
```xml
<limit-concurrency key="expression" max-count="number">
        <!— nested policy statements -->
</limit-concurrency>
```


## Registrar no Hub de eventos
Envia mensagens no formato especificado para um hub de eventos definido por uma entidade Logger
```xml
<log-to-eventhub logger-id="id of the logger entity" partition-id="index of the partition where messages are sent" partition-key="value used for partition assignment">
  Expression returning a string to be logged
</log-to-eventhub>
```

## Resposta fictícia
O `mock-response`, como o nome indica, é usado para simular APIs e operações. Ele anula a execução normal de pipeline e retorna uma resposta fictícia ao chamador.
```xml
<mock-response status-code="code" content-type="media type"/>
```

## Repetir
A política `retry` executa suas políticas filho uma vez e tenta realizar sua execução novamente até `condition` da nova tentativa se tornar `false` ou `count` da nova tentativa ser esgotada.
```xml
<retry
    condition="boolean expression or literal"
    count="number of retry attempts"
    interval="retry interval in seconds"
    max-interval="maximum retry interval in seconds"
    delta="retry interval delta in seconds"
    first-fast-retry="boolean expression or literal">
        <!-- One or more child policies. No restrictions -->
</retry>
```


## Retornar resposta
A política `return-response` anula a execução do pipeline e retorna uma resposta padrão ou personalizada para o chamador. A resposta padrão é `200 OK` sem corpo.
```xml
<return-response response-variable-name="existing context variable">
  <set-header/>
  <set-body/>
  <set-status/>
</return-response>
```

