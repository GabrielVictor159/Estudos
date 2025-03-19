Uma SAS (Assinatura de Acesso Compartilhado) é um URI (Identificador de Recurso Uniforme) que concede direitos de acesso restrito a recursos do Armazenamento do Azure.

Você pode fornecer uma SAS para clientes que não devem ter acesso à sua chave de conta de armazenamento. Ao distribuir um URI de SAS para esses clientes, você concede a eles acesso a um recurso por um período especificado.

## Configurar uma assinatura de acesso compartilhado
![[Pasted image 20250319024534.png]]
- **Método de assinatura**: escolha o método de assinatura: chave de conta ou chave de delegação do usuário.
- **Chave de assinatura**: selecione a chave de assinatura na sua lista de chaves.
- **Permissões**: selecione as permissões concedidas pela SAS, como leitura ou gravação.
- **Data/hora de início e expiração**: especifique o intervalo de tempo no qual a SAS é válida. Defina a hora de início e de expiração.
- **Endereços IP permitidos**: (opcional) você pode identificar um endereço IP ou um intervalo de endereços IP dos quais o Armazenamento do Azure aceita a SAS.
- **Protocolos permitidos**: (opcional) selecione o protocolo no qual o Armazenamento do Azure aceita a SAS.


<h1>Tipos de SAS</h1>
1. **SAS de Delegação de Usuário**:
    
    - **Proteção**: Utiliza as credenciais do Microsoft Entra.
    - **Aplicação**: Exclusiva para o armazenamento de blobs.
    - **Segurança**: Oferece um nível elevado de segurança, pois as permissões são especificadas para a SAS e protegidas pelas credenciais do Microsoft Entra.
2. **SAS de Serviço**:
    
    - **Proteção**: Utiliza a chave da conta de armazenamento.
    - **Aplicação**: Pode ser usada para delegar acesso a um recurso específico em um dos serviços de armazenamento do Azure, como blobs, filas, tabelas ou arquivos.
    - **Flexibilidade**: Permite delegar acesso a um único serviço de armazenamento.
3. **SAS de Conta**:
    
    - **Proteção**: Também utiliza a chave da conta de armazenamento.
    - **Aplicação**: Permite delegar acesso a recursos em um ou mais serviços de armazenamento.
    - **Versatilidade**: Além das operações permitidas por uma SAS de serviço, também permite operações de nível de serviço e operações de leitura, gravação e exclusão que não são permitidas com uma SAS de serviço.

<h1>Como funciona</h1>
```
https://myaccount.blob.core.windows.net/?restype=service&comp=properties&sv=2015-04-05&ss=bf&st=2015-04-29T22%3A18%3A26Z&se=2015-04-30T02%3A23%3A26Z&sr=b&sp=rw&sip=168.1.5.60-168.1.5.70&spr=https&sig=F%6GRVAZ5Cdj2Pw4tgU7IlSTkWgn7bUkkAg8P6HESXwmf%4B
```

| Parâmetro                    | Exemplo                                                                                            | Descrição                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **URI de recurso**           | `https://myaccount.`**`blob`**`.core.windows.net/` `?restype=`**`service`** `&amp;comp=properties` | Define o ponto de extremidade de Armazenamento do Azure e outros parâmetros. Este exemplo define um ponto de extremidade para o Armazenamento de Blobs e indica que a SAS se aplica a operações de nível de serviço. Quando o URI é usado com `GET`, as propriedades de Armazenamento são recuperadas. Quando o URI é usado com `SET`, as propriedades de Armazenamento são configuradas. |
| **Versão de armazenamento**  | **`sv`**`=2015-04-05`                                                                              | No Armazenamento do Azure da versão 12-02-2012 e posterior, este parâmetro indica a versão a ser usada. Este exemplo indica que a versão 2015-04-05 (5 de abril de 2015) deve ser usada.                                                                                                                                                                                                  |
| **Serviço de armazenamento** | **`ss`**`=bf`                                                                                      | Especifica o Armazenamento do Azure ao qual a SAS se aplica. Este exemplo indica que a SAS se aplica ao Armazenamento de Blobs e Arquivos do Azure.                                                                                                                                                                                                                                       |
| **Hora de início**           | **`st`**`=2015-04-29T22%3A18%3A26Z`                                                                | (Opcional) Especifica a hora de início da SAS no horário UTC. Este exemplo define a hora de início como 29 de abril de 2015 22:18:26 UTC. Se você quiser que a SAS seja imediatamente válida, omita a hora de início.                                                                                                                                                                     |
| **Hora de expiração**        | **`se`**`=2015-04-30T02%3A23%3A26Z`                                                                | Especifica a hora de expiração para a SAS no horário UTC. Este exemplo define a hora de expiração como 30 de abril de 2015 02:23:26 UTC.                                                                                                                                                                                                                                                  |
| **Recurso**                  | **`sr`**`=b`                                                                                       | Especifica quais recursos podem ser acessados por meio da SAS. Este exemplo mostra que o recurso acessível está no Armazenamento de Blobs.                                                                                                                                                                                                                                                |
| **Permissões**               | **`sp`**`=rw`                                                                                      | Lista as permissões a serem concedidas. Este exemplo concede acesso a operações de leitura e gravação.                                                                                                                                                                                                                                                                                    |
| **Intervalo de IP**          | **`sip`**`=168.1.5.60-168.1.5.70`                                                                  | Especifica o intervalo de endereços IP do qual uma solicitação será aceita. Este exemplo define o intervalo de endereços IP 168.1.5.60 a 168.1.5.70.                                                                                                                                                                                                                                      |
| **Protocolo**                | **`spr`**`=https`                                                                                  | Especifica os protocolos dos quais o Armazenamento do Azure aceita a SAS. Este exemplo indica que somente solicitações usando HTTPS são aceitas.                                                                                                                                                                                                                                          |
| **Signature**                | **`sig`**`=F%6GRVAZ5Cdj2Pw4tgU7Il` `STkWgn7bUkkAg8P6HESXwmf%4B`                                    | Ele especifica que o acesso ao recurso é autenticado usando uma assinatura Hash-based Message Authentication Code (HMAC). A assinatura é computada com uma chave usando o algoritmo SHA256 e codificada usando a codificação Base64.                                                                                                                                                      |

