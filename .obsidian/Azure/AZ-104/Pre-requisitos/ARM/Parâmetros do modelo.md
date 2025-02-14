Parâmetros de modelo do ARM permitem personalizar a implantação fornecendo valores personalizados para um determinado ambiente.

Na seção `parameters` do modelo, especifique quais valores você pode inserir ao implantar os recursos. O limite de parâmetros em um modelo é 256.

```json
"parameters": {
  "<parameter-name>": {
    "type": "<type-of-parameter-value>",
    "defaultValue": "<default-value-of-parameter>",
    "allowedValues": [
      "<array-of-allowed-values>"
    ],
    "minValue": <minimum-value-for-int>,
    "maxValue": <maximum-value-for-int>,
    "minLength": <minimum-length-for-string-or-array>,
    "maxLength": <maximum-length-for-string-or-array-parameters>,
    "metadata": {
      "description": "<description-of-the-parameter>"
    }
  }
}
```

Tipos de parâmetros permitidos são:

- string
- secureString
- integers
- boolean
- object
- secureObject
- array

Para dados de usuários utilize **secureString** ou **secureOject** dessa forma esses valores não poderão ser lidos após a implantação.

Podemos passar os parametros via CLI tambem:
```bash
templateFile="azuredeploy.json"
az deployment group create --name testdeployment1 --template-file $templateFile --parameters storageAccountType=Standard_LRS
```

A sintaxe do uso de parâmetros é a seguinte [parameters('name of the parameter')].

```json
"resources": [
  {
    "type": "Microsoft.Storage/storageAccounts",
    "apiVersion": "2023-05-01",
    "name": "learntemplatestorage123",
    "location": "[resourceGroup().location]",
    "sku": {
      "name": "[parameters('storageAccountType')]"
    },
    "kind": "StorageV2",
    "properties": {
      "supportsHttpsTrafficOnly": true
    }
  }
]
```

