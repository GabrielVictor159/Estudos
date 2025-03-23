O [recurso de Backup e Restauração](https://learn.microsoft.com/pt-br/azure/app-service/manage-backup) no Serviço de Aplicativo do Azure permite que você crie backups com facilidade, de modo manual ou agendado. Você pode configurar os backups para que sejam mantidos por um período específico ou indefinido.

- Para usar o recurso backup e Restauração, você precisa da camada Standard ou Premium do plano do Serviço de Aplicativo para o aplicativo ou site.

- Você precisa de um contêiner e de uma conta de armazenamento do Azure na mesma assinatura do aplicativo do qual você fará backup.

- O Serviço de Aplicativo do Azure pode fazer backup das seguintes informações no contêiner e na conta de armazenamento do Azure que você configurou para o aplicativo:
    
    - Configurações do aplicativo
    - Conteúdo do arquivo
    - Qualquer banco de dados conectado ao seu aplicativo (Banco de Dados SQL, Banco de Dados do Azure para MySQL, Banco de Dados do Azure para PostgreSQL, MySQL no aplicativo)

- Em sua conta de armazenamento, cada backup é composto por um arquivo Zip e um arquivo XML:
    
    - O arquivo Zip contém os dados de backup para o aplicativo ou site.
    - O arquivo XML contém um manifesto do conteúdo do arquivo Zip.

- Há suporte para backups parciais. Você pode especificar arquivos e pastas a serem excluídos de um backup.

- Backups podem reter até 10 GB de conteúdo do aplicativo e do banco de dados.


