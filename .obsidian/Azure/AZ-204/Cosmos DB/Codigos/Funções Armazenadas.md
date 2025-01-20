O Cosmos DB oferece a possibilidade de se armazenar funções JavaScript no banco.

```JavaScript
var helloWorldStoredProc = {
    id: "helloWorld",
    serverScript: function () {
        var context = getContext();
        var response = context.getResponse();

        response.setBody("Hello, World");
    }
}
```


<h1>Parâmetros de entrada em funções armazenadas</h1>
Podemos adicionar parâmetros de entrada nas funções, entretanto esse parâmetro de entrada sempre será uma cadeia de caracteres (string).
```JavaScript
function sample(arr) {
    if (typeof arr === "string") arr = JSON.parse(arr);

    arr.forEach(function(a) {
        // do something here
        console.log(a);
    });
}
```


<h1>Transações em Procedimentos Armazenados</h1>
![[Pasted image 20240701050740.png]]
