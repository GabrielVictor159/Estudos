Um conjunto de disponibilidade é um recurso lógico que você pode usar para garantir que um grupo de máquinas virtuais relacionadas sejam implantadas em conjunto.

Todas as máquinas virtuais em um conjunto de disponibilidade devem executar o mesmo conjunto de funcionalidades.

O Azure assegura que as máquinas virtuais colocadas em um conjunto de disponibilidade sejam executadas em vários servidores físicos, racks de computação, unidades de armazenamento e comutadores de rede.

Uma máquina virtual só pode ser adicionada a um conjunto de disponibilidade quando a máquina virtual é criada. Para alterar o conjunto de disponibilidade para uma máquina virtual, é necessário excluí-la e recriá-la.

O Load Balancer distribui o tráfego de entrada entre instâncias de trabalho de serviços definidas em seu conjunto de disponibilidade com balanceamento de carga.


## Domínios do conjunto de disponibilidade
_atualizar domínios_ e _domínios de falha_. Cada máquina virtual em um conjunto de disponibilidade é colocada em um domínio de atualização e em um domínio de falha.

#### Domínio de atualização
Um domínio de atualização é um grupo de nós que são atualizados juntos durante o processo de uma atualização de serviço (ou _distribuição_).

- Durante a manutenção planejada, apenas um domínio de atualização é reinicializado de cada vez.
- Por padrão, há cinco domínios de atualização (não configuráveis pelo usuário).
- Você pode configurar até 20 domínios de atualização.

#### Domínio de falha
Um domínio de falha é um grupo de nós que representam uma unidade física de falha.

Um domínio de falha define um grupo de máquinas virtuais que compartilham um conjunto comum de hardware (ou _comutadores_) que compartilham um ponto único de falha.

