**A definição do Azure Policy** descreve as condições de conformidade de recursos e a ação ou os efeitos que ocorrerão se essas condições forem atendidas. A política consiste em duas partes:

- Uma **condição** que compara um campo de propriedade de recurso ou um valor, acessado usando aliases, com um valor necessário.
- O **efeito** determina o que acontece quando a regra de política é avaliada para corresponder à condição. Para cada novo recurso, um recurso atualizado ou um recurso existente, os efeitos se comportam de maneira diferente.

## Estrutura das definições

```JSON
{
  "displayName": "Allowed locations",
  "description": "This policy enables you to restrict the locations your organization can specify when deploying resources. Use to enforce your geo-compliance requirements. Excludes resource groups, Microsoft.AzureActiveDirectory/b2cDirectories, and resources that use the 'global' region.",
  "policyType": "BuiltIn",
  "mode": "Indexed",
  "metadata": {
    "version": "1.0.0",
    "category": "General"
  },
  "parameters": {
    "listOfAllowedLocations": {
      "type": "Array",
      "metadata": {
        "description": "The list of locations that can be specified when deploying resources.",
        "strongType": "location",
        "displayName": "Allowed locations"
      }
    }
  },
    "policyRule": {
      "if": {
        "allOf": [
          {
            "field": "location",
            "notIn": "[parameters('listOfAllowedLocations')]"
          },
          {
            "field": "location",
            "notEquals": "global"
          },
          {
            "field": "type",
            "notEquals": "Microsoft.AzureActiveDirectory/b2cDirectories"
          }
        ]
      },
      "then": {
        "effect": "deny"
      }
    }
  }
```

| Elemento                                                      | Descrição                                                                                                                                                                                                                                                                                                           | Propriedades ou valores                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| displayName (cadeia de caracteres, máximo de 128 caracteres)_ | Usado para identificar a definição de política.                                                                                                                                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| description (cadeia de caracteres, máximo de 512 caracteres)_ | Fornece contexto para quando a definição é usada.                                                                                                                                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| policyType (cadeia de caracteres somente leitura)_            | Indica a origem da definição de política. Essa propriedade não pode ser definida, mas o SDK retorna três valores que são visíveis no portal.                                                                                                                                                                        | ● Built in: Fornecido e mantido pela Microsoft.  <br>● Custom: Definições personalizadas criadas pelo cliente.  <br>● Static: política de conformidade regulatória com propriedade da Microsoft.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| mode (cadeia de caracteres)_                                  | Configurado dependendo do destino da política: uma propriedade do Azure Resource Manager ou uma propriedade do Provedor de Recursos.                                                                                                                                                                                | ● Resource Manager Modes:  <br>    o On All: Avalia grupos de recursos, assinaturas e todos os tipos de recursos.  <br>   o Indexed: avalia grupos de recursos, assinaturas e todos os tipos de recursos.  <br>● Modos de provedor de recursos (limitado a políticas internas e totalmente compatível):  <br>   o Microsoft.Kubernetes.Data  <br>   o Microsoft.KeyVault.Data  <br>   o Microsoft.Network.Data  <br>● Modos de provedor de recursos (limitado a políticas internas e no modo de visualização):  <br>   o Microsoft.ManagedHSM.Data  <br>   o Microsoft.DataFactory.Data                                                              |
| _version (cadeia de caracteres, opcional)_                    | As definições de política internas podem hospedar várias versões com o mesmo definitionID. Se nenhum número de versão for especificado, todas as experiências mostrarão a versão mais recente da definição.                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| metadata (objeto, opcional, máximo de 1.024 caracteres)_      | Armazena informações sobre a definição de política.                                                                                                                                                                                                                                                                 | Propriedades comuns (para políticas internas):  <br>● _versão (cadeia de caracteres):_ rastreia detalhes sobre a versão do conteúdo de uma definição de política.  <br>● _categoria (cadeia de caracteres):_ determina em qual categoria no portal do Azure a definição de política é exibida.  <br>● _visualização (booleana):_ sinalizador verdadeiro ou falso que indica se a definição de política está em versão prévia.  <br>● _preterido (booleano):_ sinalizador verdadeiro ou falso que indica se a definição de política foi preterida.  <br>● _portalReview (cadeia de caracteres):_ determina se os parâmetros exigem revisão no portal. |
| parameters (objeto, opcional)_                                | Ajude a simplificar o gerenciamento de políticas reduzindo o número de definições de políticas. Ao incluir parâmetros em uma definição de política, você pode reutilizar essa política para diferentes cenários usando valores diferentes.                                                                          | Propriedades:  <br>● nome  <br>● tipo (String, Matriz, Objeto, Booleano, Inteiro, Flutuante, DateTime)  <br>● metadados (descrição, displayName, strongType, assignPermissions)  <br>● defaultValue  <br>● allowedValues  <br>● esquema                                                                                                                                                                                                                                                                                                                                                                                                              |
| _policyRule (objeto)_                                         | O efeito de uma política é definido na _policyRule_. A regra de política consiste nos blocos _if e then_.  <br>● No bloco _if_, você define uma ou mais condições que especificam quando a política se aplica.  <br>● No bloco _then_, você define o efeito que acontece quando as condições _if_ resultam em true. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |



## Operadores lógicos e condições (_blocos if_)

A primeira parte do _policyRule_ em uma definição do Azure Policy é o bloco _if_. Esse bloco define as condições para as quais a política avalia os recursos. Uma definição de política pode conter várias instruções condicionais. Dependendo de seus requisitos de avaliação, você pode ou não precisar que cada afirmação seja verdadeira e talvez precise apenas que algumas delas sejam verdadeiras.

### Operadores lógicos suportados no bloco _if_

Na condição _if_, você pode colocar diferentes operadores lógicos.

Expandir a tabela

| Operador | Tipo                                             | Descrição                                                                                           |
| -------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------- |
| _not_    | {condição ou operador}                           | A sintaxe _not_ inverte o resultado da condição.                                                    |
| _allOf_  | [{condição ou operador}, {condição ou operador}] | A sintaxe _allOf_ (como a lógica _e_ a operação) requer que todas as condições sejam verdadeiras.   |
| _anyOf_  | [{condição ou operador}, {condição ou operador}] | A sintaxe _anyOf_ (como a lógica _ou_ operação) requer que uma ou mais condições sejam verdadeiras. |

### Operações lógicas aninhadas

As operações lógicas são opcionais e podem ser aninhadas para criar cenários complexos.

O exemplo a seguir mostra uma operação _not_ aninhada em uma operação _allOf_:


```JSON
"if": {
    "allOf": [
      {
        "not": {
          "field": "tags",
          "containsKey": "application"
        }
      },
      {
        "field": "type",
        "equals": "Microsoft.Storage/storageAccounts"
      }
    ]
  },
```


### Condições

Propriedades como campos, valores ou contagens podem ser avaliadas dentro de uma condição.

Expandir a tabela

|            |                                                                                                                                                                               |                                                                                                                                 |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Fields** | As condições que avaliam se os valores das propriedades na carga da solicitação de recurso atendem a determinados critérios podem ser formadas usando uma expressão de campo. | Nome, fullName, tipo, tipo, localização, ID, identity.type, tags, tags['tagName'], aliases de propriedade                       |
| **Value**  | As condições que avaliam se um valor atende a determinados critérios podem ser formadas usando uma expressão de valor.                                                        |                                                                                                                                 |
| **Count**  | As condições que contam quantos membros de uma matriz atendem a determinados critérios podem ser formadas usando uma expressão de contagem.                                   | ● Contagem de campos, contagem  <br>de valores● A função current () retorna o valor do membro da matriz que está sendo avaliado |
|            |                                                                                                                                                                               |                                                                                                                                 |

|Evaluation criteria|Value type|
|---|---|
|_equals_|stringValue|
|_notEquals_|stringValue|
|_like_|stringValue|
|_notLike_|stringValue|
|_match_|stringValue|
|_notMatch_|stringValue|
|_matchInsensitively_|stringValue|
|_notMatchInsensitively_|stringValue|
|_contains_|stringValue|
|_notContains_|stringValue|
|_In_|["stringValue1", "stringValue2"]|
|_notIn_|["stringValue1", "stringValue2"]|
|_containsKey_|keyName|
|_notContainsKey_|keyName|
|_less_|dateValue|
|_less_|stringValue|
|_less_|intValue|
|_lessOrEquals_|dateValue|
|_lessOrEquals_|stringValue|
|_lessOrEquals_|intValue|
|_greater_|dateValue|
|_greater_|stringValue|
|_greater_|intValue|
|_greaterOrEquals_|dateValue|
|_greaterOrEquals_|stringValue|
|_greaterOrEquals_|intValue|
|_exists_|bool|

