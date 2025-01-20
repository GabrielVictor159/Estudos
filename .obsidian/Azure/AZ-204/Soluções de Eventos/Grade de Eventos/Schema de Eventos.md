Um evento é armazenado em uma matriz que pode ter vários eventos e tem um limite de 1MB, os eventos são enviados em pacotes de 64kb.

## Schema
```JSON
[
  {
    "topic": string,
    "subject": string,
    "id": string,
    "eventType": string,
    "eventTime": string,
    "data":{
      object-unique-to-each-publisher
    },
    "dataVersion": string,
    "metadataVersion": string
  }
]
```


<table border="1">
    <thead>
        <tr>
            <th>Propriedade</th>
            <th>Type</th>
            <th>Obrigatória</th>
            <th>Descrição</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>topic</td>
            <td>string</td>
            <td>Não</td>
            <td>Se não estiver incluído, a Grade de Eventos o carimbará no evento. Se estiver incluído, precisará corresponder exatamente à ID do Azure Resource Manager no tópico da Grade de Eventos. Caminho de recurso completo para a origem do evento. Este campo não é gravável. Grade de Eventos fornece esse valor.</td>
        </tr>
        <tr>
            <td>subject</td>
            <td>string</td>
            <td>Sim</td>
            <td>Caminho definido pelo publicador para o assunto do evento.</td>
        </tr>
        <tr>
            <td>eventType</td>
            <td>string</td>
            <td>Sim</td>
            <td>Um dos tipos de evento registrados para a origem do evento.</td>
        </tr>
        <tr>
            <td>eventTime</td>
            <td>string</td>
            <td>Sim</td>
            <td>A hora em que o evento é gerado com base na hora UTC do provedor.</td>
        </tr>
        <tr>
            <td>id</td>
            <td>cadeia de caracteres</td>
            <td>Sim</td>
            <td>Identificador exclusivo do evento.</td>
        </tr>
        <tr>
            <td>data</td>
            <td>objeto</td>
            <td>Não</td>
            <td>Dados do evento específicos ao provedor de recursos.</td>
        </tr>
        <tr>
            <td>dataVersion</td>
            <td>string</td>
            <td>Não</td>
            <td>Se não estiver incluído, será carimbado com um valor vazio. A versão do esquema do objeto de dados. O publicador define a versão do esquema.</td>
        </tr>
        <tr>
            <td>metadataVersion</td>
            <td>string</td>
            <td>Não</td>
            <td>Se não estiver incluído, a Grade de Eventos será carimbada no evento. Se incluído, deve corresponder exatamente ao Esquema da Grade de Eventos metadataVersion (atualmente, apenas 1). A versão do esquema dos metadados do evento. Grade de Eventos define o esquema de propriedades de nível superior. A Grade de Eventos fornece esse valor.</td>
        </tr>
    </tbody>
</table>

## Esquema de eventos de nuvem
A grade de eventos também da suporte a outro tipo de Schema de eventos que é o CloudEvents v1.0 esse padrão é HTTP e utiliza o blob storage.

```JSON
{
    "specversion": "1.0",
    "type": "Microsoft.Storage.BlobCreated",  
    "source": "/subscriptions/{subscription-id}/resourceGroups/{resource-group}/providers/Microsoft.Storage/storageAccounts/{storage-account}",
    "id": "9aeb0fdf-c01e-0131-0922-9eb54906e209",
    "time": "2019-11-18T15:13:39.4589254Z",
    "subject": "blobServices/default/containers/{storage-container}/blobs/{new-file}",
    "dataschema": "#",
    "data": {
        "api": "PutBlockList",
        "clientRequestId": "4c5dd7fb-2c48-4a27-bb30-5361b5de920a",
        "requestId": "9aeb0fdf-c01e-0131-0922-9eb549000000",
        "eTag": "0x8D76C39E4407333",
        "contentType": "image/png",
        "contentLength": 30699,
        "blobType": "BlockBlob",
        "url": "https://gridtesting.blob.core.windows.net/testcontainer/{new-file}",
        "sequencer": "000000000000000000000000000099240000000000c41c18",
        "storageDiagnostics": {
            "batchId": "681fe319-3006-00a8-0022-9e7cde000000"
        }
    }
}
```
