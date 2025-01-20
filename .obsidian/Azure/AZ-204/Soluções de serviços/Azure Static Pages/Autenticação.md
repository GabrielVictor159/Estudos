Os aplicativos estáticos do Azure fornecem provedores de autenticação automáticos que ficam localizados na pasta <strong>/.auth</strong>.

<h1>Provedores</h1>
- Microsoft Entra ID
- GitHub
- Twitter

Exemplos de login:
<table>
    <thead>
        <tr>
            <th>Provedor de identidade</th>
            <th>Rota de logon</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Microsoft Entra ID</td>
            <td>/.auth/login/aad</td>
        </tr>
        <tr>
            <td>GitHub</td>
            <td>/.auth/login/github</td>
        </tr>
        <tr>
            <td>Twitter</td>
            <td>/.auth/login/twitter</td>
        </tr>
    </tbody>
</table>

Você pode linkar a pagina de login e fornecer um redirect com o parâmetro <strong>post_login_redirect_uri</strong>

```HTML
<a href="/.auth/login/github?post_login_redirect_uri=/products">Login</a>
```

<h1>Logout</h1>
```HTML
<a href="/.auth/logout?post_logout_redirect_uri=/home">Log out</a>
```

<h1>Obter informações do usuário</h1>
Se você enviar uma solicitação <strong>GET</strong> para <strong>/.auth/me</strong> ira obter um JSON com as informações do usuário ou null caso não esteja autenticado:
```JSON
{
  "identityProvider": "github",
  "userId": "d75b260a64504067bfc5b2905e3b8182",
  "userDetails": "github-user-example",
  "userRoles": [ "anonymous", "authenticated" ]
}
```

<h1>APIs</h1>
As APIs tem acesso a autenticação dos usuários através do Header <strong>x-ms-client-principal</strong> eles são enviados como JSON codificados em base64.


<h1>Restringir provedores de autenticação</h1>
Podemos fazer isso configurando o <strong>staticwebapp.config.json</strong>
```JSON
{
  "routes": [
    {
      "route": "/.auth/login/github",
      "statusCode": 404
    }
  ]
}
```

<h1>Proteger rotas</h1>
Por padrão todos as rotas possuem o nível <strong>Anonymous</strong> que permite a qualquer usuário não autenticado acessar, porém podemos configurar o nível <strong>authenticated</strong> obrigando os usuários a se autenticarem:
```JSON
{
  "routes": [
    {
      "route": "/profile",
      "allowedRoles": ["authenticated"]
    }
  ]
}
```

```JSON
{
  "routes": [
    {
      "route": "/profile",
      "methods": ["PUT", "POST", "DELETE"],
      "allowedRoles": ["authenticated"]
    }
  ]
}
```
```JSON
{
  "routes": [
    {
      "route": "/api/*",
      "allowedRoles": ["authenticated"]
    }
  ]
}
```
