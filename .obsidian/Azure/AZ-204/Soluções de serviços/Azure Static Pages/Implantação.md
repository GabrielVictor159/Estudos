Você pode criar implantações automáticas através do Github Actions ou Azure Pipelines.

Para implantar você precisa especificar caminhos para que o aplicativo seja compilado e implantado:

<table>
    <thead>
        <tr>
            <th>Localização</th>
            <th>Exemplo de localização</th>
            <th>Descrição</th>
            <th>Obrigatório</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Localização do aplicativo</td>
            <td>/</td>
            <td>A localização do código-fonte do aplicativo Web</td>
            <td>Sim</td>
        </tr>
        <tr>
            <td>Localização de saída do build do aplicativo</td>
            <td>dist</td>
            <td>A localização da saída de build do aplicativo, em relação à localização do aplicativo</td>
            <td>Não</td>
        </tr>
        <tr>
            <td>Localização da API</td>
            <td>api</td>
            <td>A localização do código-fonte da API</td>
            <td>Não</td>
        </tr>
    </tbody>
</table>



<h1>Rotas</h1>
Ao implantar o aplicativo você ira ver o erro 404 ao atualizar a pagina por que precisamos definir uma rota de <strong>fallback</strong>, uma rota de fallback é toda e qualquer rota não correspondente ao servidor, <strong>as rotas personalizadas podem ser definidas no arquivo opcional staticwebapp.config.json localizado na pasta de saída do build</strong>:
```JSON
{
  "navigationFallback": {
    "rewrite": "index.html",
    "exclude": ["/images/*.{png,jpg,gif,ico}", "/*.{css,scss,js}"]
  }
}
```

