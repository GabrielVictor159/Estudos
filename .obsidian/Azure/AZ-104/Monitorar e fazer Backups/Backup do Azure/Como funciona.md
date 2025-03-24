- **Camada de integração de carga de trabalho – Extensão de backup**: A integração com a carga de trabalho real, como VMs (máquinas virtuais) do Azure ou Blobs do Azure, ocorre nessa camada.
- **Plano de dados – Camadas de acesso**: Existem três camadas de acesso em que os backups podem ser armazenados:
    - Camada de instantâneo
    - Camada padrão
    - Camada de arquivo
- **Plano de dados – Disponibilidade e segurança**: Os dados de backup são replicados entre zonas ou regiões, com base na redundância especificada pelo usuário.
- **Plano de gerenciamento – cofre dos Serviços de Recuperação/Cofre de backup e Centro de backup**: O cofre conta com uma interface para o usuário interagir com o serviço de backup.

A explicação mais simples do Backup do Azure é que ele faz backup de dados, estado do computador e cargas de trabalho, em execução em computadores locais e instâncias de VM para a nuvem do Azure. O Backup do Azure armazena dados de backup em cofres dos Serviços de Recuperação e de Backup.

Um cofre é uma entidade de armazenamento online no Azure usada para armazenar dados como cópias de backup, pontos de recuperação e políticas de backup.

### Tipos de backup com suporte

O Backup do Azure é compatível com backups completos e backups incrementais. O backup inicial é um backup completo. O backup incremental é usado pelo DPM/MABS para usar o backup incremental para backups de disco e é usado em todos os backups do Azure.

Os backups incrementais se concentram apenas nos blocos de dados que foram alterados desde o backup anterior.

## Extensão de backup

No momento do backup (conforme definido pelo usuário na política de backup), a extensão de backup gera o backup, que pode ser:

- **Armazenamento**: Instantâneos ao usar uma VM do Azure ou os Arquivos do Azure.
    
- **Backup do fluxo**: Para bancos de dados como SQL ou HANA (High-performance Analytic Appliance) executados em VMs.
    

Os dados de backup eventualmente são transferidos para o armazenamento gerenciado do Backup do Azure no plano de dados usando NSG (Grupos de Segurança de Rede), Firewalls ou pontos de extremidade privados mais sofisticados.


## Camadas de acesso dos backups

Há três camadas de acesso onde os backups podem ser armazenados:

- **Camada de instantâneo**: O instantâneo é tirado e armazenado junto com o disco. Essa forma de armazenamento é conhecida como uma camada de instantâneo. Restaurar uma camada de instantâneo é mais rápido do que restaurar de um cofre. São retidos na assinatura do cliente em um grupo de recursos especificado.
- **Camada standard do cofre**:
