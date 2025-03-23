Os Conjuntos de Dimensionamento de Máquinas Virtuais do Microsoft Azure são um recurso de computação do Azure que você pode usar para implantar e gerenciar um conjunto de VMs **idênticas**.

Os Conjuntos de Dimensionamento de Máquinas Virtuais aumentam automaticamente o número de instâncias de máquina virtual à medida que a demanda do aplicativo aumenta e reduzem o número de instâncias de computador à medida que a demanda diminui.

Os Conjuntos de Dimensionamento de Máquinas Virtuais dão suporte ao uso do Azure Load Balancer para a distribuição básica do tráfego de camada 4 e ao Gateway de Aplicativo do Azure para a distribuição do tráfego de camada 7 mais avançada e terminação TLS/SSL.
## VM Template
Os Conjuntos de Dimensionamento utilizam de um template pre-definido de uma VM para escalonar.

## Modos de gerenciamento
Existem dois modos de gerenciamento: 

![[Pasted image 20250323010112.png]]


- **Orquestração uniforme**: é otimizada para orquestração com grandes cargas de trabalho sem estado em que as VMs são idênticas,.
- Orquestração flexível: oferece orquestração com diferentes tipos de VMs e a possibilidade de alterar o tamanho das VMs sem reimplantar o conjunto de dimensionamento

## Regras de dimensionamento
Podemos implementar regras de dimensionamento baseadas em métricas e definição de limites, seguindo o mesmo padrão do Serviço de aplicativo do Azure:

![[Pasted image 20250323010927.png]]


## Upgrades automáticos 
Podemos implementar as funcionalidade de upgrade automático através dos conjuntos de dimensionamento. 

Existem 3 tipos de upgrades:

- **Automático**: As atualizações são feitas automaticamente em ordem aleatória.
- **Manual**: As atualizações são feitas manualmente.
- **Rolando**: As atualizações são feitas automaticamente mas seguindo a ordem das VMs.

