Os Arquivos do Azure oferecem dois protocolos do sistema de arquivos padrão do setor para montar compartilhamentos de arquivos do Azure: o protocolo SMB (Server Message Block) e o protocolo NFS (Sistema de Arquivos de Rede).

Não se pode utilizar os dois ao mesmo tempo.


## Camadas de serviço
Os Arquivos do Azure dão suporte a duas camadas de armazenamento: Premium e Standard.

|Camada de armazenamento|Descrição|
|---|---|
|Premium|Os compartilhamentos de arquivos Premium armazenam dados em SSDs (unidades de estado sólido) e estão disponíveis apenas no tipo de conta de armazenamento FileStorage. Eles fornecem alto desempenho consistente e baixa latência, e estão disponíveis na redundância LRS, sendo que a ZRS está disponível em algumas regiões. Não disponível em todas as regiões do Azure.|
|Standard|Os compartilhamentos de arquivos Standard armazenam dados em HDDs (unidades de disco rígido) e são implantados no tipo de conta de armazenamento GPv2 (versão de uso geral 2). Forneça desempenho para cargas de trabalho, como compartilhamentos de arquivos de uso geral e ambientes de desenvolvimento/teste. Os compartilhamentos de arquivos padrão estão disponíveis para LRS, ZRS, GRS e GZRS, em todas as regiões do Azure.|


## Autenticação
Existem três métodos principais de autenticação com suporte pelo Arquivos do Azure.

| Método de autenticação                            | Descrição                                                                                                                                                                                                                                                                                                                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Autenticação baseada em identidade sobre SMB      | Fornece a mesma experiência de logon único (SSO) ao acessar compartilhamentos de arquivos do Azure que ao acessar compartilhamentos de arquivos locais.                                                                                                                                                                                                                  |
| Chave de acesso                                   | Uma conta de armazenamento do Azure tem duas chaves de acesso que podem ser usadas ao fazer uma solicitação para a conta de armazenamento, incluindo os Arquivos do Azure. As chaves de acesso são estáticas e fornecem acesso de controle total aos Arquivos do Azure.                                                                                                  |
| Um token SAS (Assinatura de Acesso Compartilhado) | SAS é um Uniform Resource Identifier (URI) gerado dinamicamente com base na chave de acesso de armazenamento. O SAS fornece direitos de acesso restritos a uma conta de armazenamento do Azure. As restrições incluem permissões concedidas, hora de início e de término, endereços IP permitidos dos quais as solicitações podem ser enviadas e protocolos permitidos.  |


## Criar Compartilhamento de arquivos

- **Habilite a porta 445**: SMB se comunica pela porta 445, então é necessário habilitar ela no firewall.
- **Habilite a transferência segura**: A configuração ***Secure transfer required*** possibilita obrigar a autenticação no processo de acesso.


## Compartilhamento de arquivos no Windows
Podemos configurar uma unidade no Windows que mantem os arquivos nos arquivos do Azure através do processo de compartilhamento de arquivos SMB. Libere a porta 445, escolha o método de autenticação e o Portal do Azure fornecera um comando powershell que quando executado cria a unidade.

## Compartilhamento de arquivos no Linux
Os compartilhamentos de arquivo do Azure podem ser montados em distribuições do Linux usando o cliente de kernel CIFS. É possível montar arquivos sob demanda com o comando `mount` ou na inicialização (persistente) criando uma entrada em /etc/fstab.



