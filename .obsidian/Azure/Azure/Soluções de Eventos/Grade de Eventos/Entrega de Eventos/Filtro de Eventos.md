Podemos aplicar filtros para limitar os eventos que são enviados.


## Filtro de tipo de Evento
Esse filtro filtra pelo tipo de evento, por padrão todos os tipos de eventos são enviados, mas podemos limitar usando uma matriz com os tipos ou determinar "All" para todos os tipos:

```JSON
"filter": {
  "includedEventTypes": [
    "Microsoft.Resources.ResourceWriteFailure",
    "Microsoft.Resources.ResourceWriteSuccess"
  ]
}
```

## Filtro de assunto
Podemos aplicar um filtro inicial usando a propriedade <strong> subjectBeginsWith </strong> ou podemos aplicar um filtro no final do subject usando a propriedade <strong>subjectEndsWith</strong>

## Filtro avançado
Podemos criar um filtro avançado para qualquer propriedade do schema, para isso precisamos definir a chave que é a propriedade do schema, o operador e os valores:

```JSON
"advancedFilters": [{
    "operatorType": "NumberIn",
    "key": "data.counter",
    "values": [
        5,
        1
    ]
}]
```


Podemos encontrar todos os operadores disponíveis na documentação => https://learn.microsoft.com/pt-br/azure/event-grid/event-filtering


