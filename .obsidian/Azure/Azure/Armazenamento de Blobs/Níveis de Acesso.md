																										
Os dados armazenados no armazenamento de Blobs possuem diferentes níveis de camadas de acesso a dados:

1. **Camada de Acesso Frequente**:
    
    - **Descrição**: Ideal para dados que são acessados com frequência.
    - **Uso**: Aplicações de produção, dados de uso frequente e dados que requerem baixa latência.
    - **Custo**: Maior custo de armazenamento, mas menor custo de acesso.
    
2. **Camada de Acesso Esporádico**:
    - **Descrição**: Para dados que são acessados com menos frequência, mas ainda precisam estar disponíveis rapidamente quando necessário.
    - **Uso**: Dados de backup, recuperação de desastres e dados que são acessados esporadicamente.
    - **Custo**: Menor custo de armazenamento comparado à camada frequente, mas maior custo de acesso.
    - **Dias mínimos**: 30 Dias.
    
3. **Camada de Acesso Frio**:
    - **Descrição**: Para dados que são raramente acessados e podem tolerar maior latência de acesso.
    - **Uso**: Arquivamento de longo prazo, dados de conformidade e dados históricos.
    - **Custo**: Muito menor custo de armazenamento, mas maior custo de acesso.
    - **Dias mínimos:** 90 Dias.
    
4. **Camada de Arquivos**:
    - **Descrição**: Para dados que são raramente acessados e têm requisitos de retenção de longo prazo.
    - **Uso**: Arquivamento de longo prazo, dados de conformidade e dados que precisam ser mantidos por anos.
    - **Custo**: O menor custo de armazenamento, mas o maior custo de acesso e reidratação.
    - **Dias mínimos:** 180 Dias.


<h3>A camada de arquivos não disponibiliza os arquivos online</h3>

Podemos configurar a camada padrão nas configurações da conta de armazenamento e podemos definir manualmente qual camada o blob será adicionado quando vamos subir ele.

Podemos alterar a camada de um blob ja persistido através da configuração [Definir camada de blob](https://learn.microsoft.com/pt-br/rest/api/storageservices/set-blob-tier) ou podemos utilizar o processo de copiar o blob, nessa opção não corremos o risco de exclusão antecipada. Por isso é recomendado usar a operação de Definir camada de blob quando estamos movendo de uma camada de acesso frequente para a esporádica e o processo de copiar o blob quando estamos reidratando de uma camada de arquivos.


<h1>Gerenciamento de Ciclo de Vida</h1>
Você pode criar uma politica baseada em regras que gerencie as camadas dos blobs com o passar do tempo.
Uma política de gerenciamento do ciclo de vida é uma coleção de regras em um documento JSON.

```JSON
{
  "rules": [
    {
      "name": "rule1",
      "enabled": true,
      "type": "Lifecycle",
      "definition": {...}
    },
    {
      "name": "rule2",
      "type": "Lifecycle",
      "definition": {...}
    }
  ]
}
```

```JSON
{
  "rules": [
    {
      "enabled": true,
      "name": "sample-rule",
      "type": "Lifecycle",
      "definition": {
        "actions": {
          "version": {
            "delete": {
              "daysAfterCreationGreaterThan": 90
            }
          },
          "baseBlob": {
            "tierToCool": {
              "daysAfterModificationGreaterThan": 30
            },
            "tierToArchive": {
              "daysAfterModificationGreaterThan": 90,
              "daysAfterLastTierChangeGreaterThan": 7
            },
            "delete": {
              "daysAfterModificationGreaterThan": 2555
            }
          }
        },
        "filters": {
          "blobTypes": [
            "blockBlob"
          ],
          "prefixMatch": [
            "sample-container/blob1"
          ]
        }
      }
    }
  ]
}
```
<table>
  <thead>
    <tr>
      <th>Ação</th>
      <th>Versão atual</th>
      <th>Instantâneo</th>
      <th>Versões anteriores</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>tierToCool</td>
      <td>Suporte para <code>blockBlob</code></td>
      <td>Com suporte</td>
      <td>Com suporte</td>
    </tr>
    <tr>
      <td>tierToCold</td>
      <td>Suporte para <code>blockBlob</code></td>
      <td>Com suporte</td>
      <td>Com suporte</td>
    </tr>
    <tr>
      <td>enableAutoTierToHotFromCool1</td>
      <td>Suporte para <code>blockBlob</code></td>
      <td>Sem suporte</td>
      <td>Sem suporte</td>
    </tr>
    <tr>
      <td>tierToArchive4</td>
      <td>Suporte para <code>blockBlob</code></td>
      <td>Com suporte</td>
      <td>Com suporte</td>
    </tr>
    <tr>
      <td>delete2,3</td>
      <td>Com suporte para <code>blockBlob</code> e <code>appendBlob</code></td>
      <td>Com suporte</td>
      <td>Com suporte</td>
    </tr>
  </tbody>
</table>







