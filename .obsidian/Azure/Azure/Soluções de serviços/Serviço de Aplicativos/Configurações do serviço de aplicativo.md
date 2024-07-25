

<h1>Configurações do aplicativo</h1>
Essa configuração é para adicionarmos variáveis de ambiente na aplicação, quando em .net ele injeta as variáveis no AppSettings e quando em container envia as variáveis via --env.
![Navegando até Variáveis de ambiente > Configurações de aplicativo](https://learn.microsoft.com/pt-br/training/wwl-azure/configure-web-app-settings/media/configure-app-settings.png)

Pode ser edita em massa:
```JSON
[
  {
    "name": "<key-1>",
    "value": "<value-1>",
    "slotSetting": false
  },
  {
    "name": "<key-2>",
    "value": "<value-2>",
    "slotSetting": false
  },
  ...
]
```

A segunda aba da configuração do aplicativo serve para configurar as <strong>connectionString</strong>.
```JSON
[
  {
    "name": "name-1",
    "value": "conn-string-1",
    "type": "SQLServer",
    "slotSetting": false
  },
  {
    "name": "name-2",
    "value": "conn-string-2",
    "type": "PostgreSQL",
    "slotSetting": false
  },
  ...
]
```

Podemos injetar variáveis via CLI:

```powershell
az webapp config appsettings set --resource-group <group-name> --name <app-name> --settings key1=value1 key2=value2
```

<h1>Configurações gerais</h1>
Essa configuração permite configurar as configurações gerais da aplicação.
![Captura de tela da navegação para as definições Configurar > Geral.](https://learn.microsoft.com/pt-br/training/wwl-azure/configure-web-app-settings/media/configure-general-settings.png)



<h1>Configurações de mapeamento</h1>
Permite gerenciar rotas no diretório da aplicação.
![[Pasted image 20240724035211.png]]


<h1>Configurar Certificado de Segurança</h1>
<table>
    <thead>
        <tr>
            <th>Opção</th>
            <th>Descrição</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Para criar um certificado gerenciado gratuito do Serviço de Aplicativo:</td>
            <td>Um certificado privado sem custo e fácil de usar se você precisar proteger seu domínio personalizado no Serviço de Aplicativo.</td>
        </tr>
        <tr>
            <td>Comprar um certificado do Serviço de Aplicativo</td>
            <td>Um certificado privado gerenciado pelo Azure. Ele combina a simplicidade do gerenciamento automatizado de certificado e a flexibilidade das opções de renovação e exportação.</td>
        </tr>
        <tr>
            <td>Importar um certificado do Key Vault</td>
            <td>Útil se você usa o Azure Key Vault para gerenciar seus certificados.</td>
        </tr>
        <tr>
            <td>Carregar um certificado privado</td>
            <td>Se você já tiver um certificado privado de um provedor de terceiros, poderá carregá-lo.</td>
        </tr>
        <tr>
            <td>Carregar um certificado público</td>
            <td>Os certificados públicos não são usados para proteger domínios personalizados, mas você pode carregá-los em seu código se precisar que eles acessem recursos remotos.</td>
        </tr>
    </tbody>
</table>

<h4>Para ativar o certificado a aplicação deve ser Basic, Standart, Premium ou Isolada</h4>

![[Pasted image 20240724035935.png]]

