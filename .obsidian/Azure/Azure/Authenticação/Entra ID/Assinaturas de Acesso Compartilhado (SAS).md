
É um URI assinado que aponta para recursos de armazenamento no Azure e inclui um token que autoriza o acesso.

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
Em um único URI, como `https://medicalrecords.blob.core.windows.net/patient-images/patient-116139-nq8z7f.jpg?sp=r&st=2020-01-20T11:42:32Z&se=2020-01-20T19:42:32Z&spr=https&sv=2019-02-02&sr=b&sig=SrW1HZ5Nb6MbRzTbXCaPm%2BJiSEn15tC91Y4umMPwVZs%3D`, você pode separar o URI do token SAS da seguinte maneira:

- **URI**: `https://medicalrecords.blob.core.windows.net/patient-images/patient-116139-nq8z7f.jpg?`
- **Token SAS:** `sp=r&st=2020-01-20T11:42:32Z&se=2020-01-20T19:42:32Z&spr=https&sv=2019-02-02&sr=b&sig=SrW1HZ5Nb6MbRzTbXCaPm%2BJiSEn15tC91Y4umMPwVZs%3D`

