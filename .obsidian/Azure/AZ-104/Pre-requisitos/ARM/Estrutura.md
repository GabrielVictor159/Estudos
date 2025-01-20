

## Infraestrutura como Código
A infraestrutura como código permite é um conceito que permite que você gerencie a infraestrutura dos serviços utilizando códigos, no caso do Azure podemos utilizar JSON ARM ou YAML.


## Sintaxe Declarativa
O modelo usa uma _sintaxe declarativa_. A sintaxe declarativa é uma forma de criar a estrutura e os elementos que descrevem a aparência dos recursos sem descrever o fluxo de controle.


## Estrutura do ARM

|Elemento|Descrição|
|---|---|
|**schema**|uma seção obrigatória que define a localização do arquivo de esquema JSON que descreve a estrutura de dados JSON. O número de versão usada depende do escopo da implantação e do editor de JSON.|
|**contentVersion**|uma seção obrigatória que define a versão do modelo (como 1.0.0.0). É possível usar esse valor para documentar alterações significativas no modelo a fim de garantir a implantação do modelo correto.|
|**apiProfile**|seção opcional que define uma coleção de versões de API para tipos de recursos. É possível usar esse valor para evitar a especificação de versões de API para cada recurso no modelo.|
|**parameters**|uma seção opcional em que você define valores que são fornecidos durante a implantação. Você pode fornecer esses valores em um arquivo de parâmetro, por parâmetros de linha de comando ou no portal do Azure.|
|**variáveis**|uma seção opcional em que você define os valores que são usados para simplificar as expressões de linguagem do modelo.|
|**funções**|uma seção opcional em que é possível definir as [funções definidas pelo usuário](https://learn.microsoft.com/pt-br/azure/azure-resource-manager/templates/template-user-defined-functions) disponíveis no modelo. As funções definidas pelo usuário podem simplificar o modelo quando expressões complicadas forem usadas repetidamente nele.|
|**recursos**|uma seção obrigatória que define os itens reais que você deseja implantar ou atualizar em um grupo de recursos ou em uma assinatura.|
|**output**|Uma seção opcional em que você especifica os valores retornados no final da implantação.|

## Implantação

É possível implantar um modelo do ARM no Azure usando uma das seguintes maneiras:

- Implantar um modelo local
- Implantar um modelo vinculado
- Implantar em um pipeline de implantação contínua

implantação usando CLI:
```bash
templateFile="{provide-the-path-to-the-template-file}"
az deployment group create --name blanktemplate --resource-group myResourceGroup --template-file $templateFile
```


## Exemplos:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "parameters": {},
  "functions": [],
  "variables": {},
  "resources": [],
  "outputs": {}
}
```


```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.1",
  "apiProfile": "",
  "parameters": {},
  "variables": {},
  "functions": [],
  "resources": [
    {
      "type": "Microsoft.Storage/storageAccounts",
      "apiVersion": "2023-05-01",
      "name": "learntemplatestorage123",
      "location": "westus",
      "sku": {
        "name": "Standard_LRS"
      },
      "kind": "StorageV2",
      "properties": {
        "supportsHttpsTrafficOnly": true
      }
    }
  ],
  "outputs": {}
}
```

