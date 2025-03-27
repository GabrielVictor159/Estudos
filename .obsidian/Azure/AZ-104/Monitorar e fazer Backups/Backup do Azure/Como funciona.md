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

- **Camada de instantâneo**:
    
    - Backup inicial realizado com instantâneo armazenado junto ao disco.
        
    - Restauração rápida, pois elimina a espera para copiar o instantâneo do cofre.
        
    - Instantâneos ficam localmente disponíveis na assinatura do cliente para restauração eficiente.
        
- **Camada standard do cofre**:
    
    - Backup online armazenado em cofres gerenciados pela Microsoft.
        
    - Proporciona uma camada adicional de proteção com armazenamento isolado.
        
    - Garante a disponibilidade de dados mesmo em caso de exclusão ou comprometimento da fonte de backup.
        
- **Camada de armazenamento de arquivos**:
    
    - Projetada para retenção de longo prazo (LTR), de acordo com regras de conformidade organizacional.
        
    - Usada para dados antigos raramente acessados, principalmente para fins de conformidade.

Todas as camadas oferecem RTO (objetivos de tempo de recuperação) diferentes e são cobradas de maneira distinta.

O Backup do Azure usa os cofres dos Serviços de Recuperação e os cofres de Backup para orquestrar e gerenciar os backups.

O cofre conta com uma interface para o usuário interagir com o serviço de backup.

As políticas de Backup do Azure em cada cofre definem quando os backups devem ser acionados e por quanto tempo eles precisam ser mantidos.

Você pode usar um único cofre ou vários cofres para organizar e gerenciar o backup

 Se as cargas de trabalho forem distribuídas entre várias assinaturas, você poderá criar vários cofres com um ou mais cofres por assinatura.

![[Pasted image 20250326000921.png]]

## Instantâneos

Um instantâneo é um backup pontual de todos os discos na VM. Para VMs do Azure, o Backup do Azure usa extensões diferentes para cada sistema operacional de suporte:

Dependendo de como o instantâneo é tirado e do que ele inclui, é possível obter diferentes níveis de consistência:

- **Consistente com o aplicativo**
    - O instantâneo captura a VM como um todo. Ele usa gravadores VSS para capturar o conteúdo da memória do computador e das operações de E/S pendentes.
    - Para computadores Linux, você precisa escrever pré ou pós-scripts personalizados por aplicativo para capturar o estado do aplicativo.
    - É possível obter consistência completa para a VM e todos os aplicativos em execução.
- **Consistente com o sistema de arquivos**
    - Se o VSS falhar no Windows ou os pré e pós-scripts falharem no Linux, o Backup do Azure ainda criará um instantâneo consistente com o sistema de arquivos.
    - Durante uma recuperação, não há problemas de dados corrompidos no computador. Mas os aplicativos instalados precisam fazer sua própria limpeza durante a inicialização para se tornarem consistentes.
- **Consistente com falhas**
    - Esse nível de consistência normalmente ocorrerá se a VM for desligada no momento do backup.
    - Não há captura de nenhuma operação de E/S ou de conteúdo de memória durante esse tipo de backup. Esse método não garante consistência de dados para o sistema operacional ou aplicativo.


## Restaurar uma máquina virtual criptografada

O Backup do Azure dá suporte ao backup e à restauração de computadores criptografados por meio do Azure Disk Encryption. O Disk Encryption trabalha com o Azure Key Vault para gerenciar os segredos relevantes associados ao disco criptografado.

- O Backup do Azure dá suporte somente à criptografia de chave autônoma. No momento, não há suporte para nenhuma chave que faça parte de um certificado.
- Não há suporte para restaurações no nível do arquivo ou da pasta com VMs criptografadas
- A opção **Substituir VM existente** não está disponível para VMs criptografadas.

## Tipos de restauração

- **Criar uma nova VM**:
    - Cria rapidamente uma VM básica na mesma região do VM de origem a partir de um ponto de restauração.
        
- **Restaurar disco**:
    - Restaura um disco da VM que pode ser usado para criar ou personalizar uma nova VM.
    - Alternativamente, o disco pode ser anexado a uma VM existente.
        
- **Substituir existente**:
    - Restaura um disco e substitui o disco de uma VM atual, mantendo a VM existente.
    - Não pode ser usado se a VM original foi excluída.
        
- **Região cruzada (região secundária)**:
    - Permite restaurar VMs ou discos na região secundária emparelhada.
    - Disponível para "Criar uma nova VM" e "Restaurar discos".
        
- **Restauração de assinatura cruzada**:
    - Restaurar máquinas virtuais ou discos em uma assinatura diferente dentro do mesmo locatário.
    - Suporta Identidades Gerenciadas do Sistema (MSI), mas não camadas de instantâneo.
        
- **Restauração entre zonas**:
    - Restaura VMs ou discos entre diferentes zonas disponíveis.
    - Requer VMs gerenciadas e pode restaurar de armazenamento com redundância de zona (ZRS).
    - Não suporta pontos de instantâneo ou VMs criptografadas.
        
- **Backup seletivo de disco**:
    - Permite backup/restauração de discos específicos da VM, útil para reduzir custos ou gerenciar dados críticos.

