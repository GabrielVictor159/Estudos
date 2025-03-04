As regras de segurança em grupos de segurança de rede permitem filtrar o tráfego de rede.


- O Azure cria as regras de segurança padrão em cada grupo de segurança de rede que você cria.
- Você pode adicionar mais regras de segurança a um grupo de segurança de rede especificando condições para uma das seguintes configurações:
    
    - **Nome**
    - **Prioridade**
    - **Porta**
    - **Protocolo** (qualquer, TCP, UDP)
    - **Origem** (qualquer, endereços IP, marca de serviço)
    - **Destino** (qualquer, endereços IP, rede virtual)
    - **Ação** (permitir ou negar)
    
- Cada regra de segurança recebe um valor de prioridade. Todas as regras de segurança de um grupo de segurança de rede são processadas em ordem de prioridade.
- Não é possível remover as regras de segurança padrão.

#### Regras de tráfego de entrada
O Azure define três regras de segurança de entrada padrão para o grupo de segurança de rede. Essas regras **negam todo o tráfego de entrada**, exceto o tráfego da rede virtual e dos Azure Load Balancers.

![[Pasted image 20250224160512.png]]

#### Regras de tráfego de saída
O Azure define três regras de segurança de saída padrão para o grupo de segurança de rede. As regras **só permitem o tráfego de saída** para a Internet e para a rede virtual.

![[Pasted image 20250224160642.png]]


## Criar regras do grupo de segurança de rede

Você precisa especificar algumas propriedades na hora da criação da regra

![[Pasted image 20250224161957.png]]
- **Origem**: identifica como a regra de segurança controla o tráfego **de entrada**. O valor especifica um intervalo de endereços IP de origem específico permitido ou negado. O filtro de origem pode ser qualquer recurso, um intervalo de endereços IP, um grupo de segurança de aplicativo ou uma marca padrão.
    
- **Destino**: identifica como a regra de segurança controla o tráfego **de saída**. O valor especifica um intervalo de endereços IP de destino específico permitido ou negado. O valor do filtro de destino é semelhante ao do filtro de origem. O valor pode ser qualquer recurso, um intervalo de endereços IP, um grupo de segurança de aplicativo ou uma marca padrão.
    
- **Serviço**: especifica o protocolo de destino e o intervalo de portas da regra de segurança. Você pode escolher um serviço predefinido, como RDP ou SSH, ou fornecer um intervalo de portas personalizado. Há um grande número de serviços que podem ser selecionados.
    
    ![Captura de tela que mostra as opções de regra de serviço de uma regra de segurança no portal do Azure.](https://learn.microsoft.com/pt-br/training/wwl-azure/configure-network-security-groups/media/security-services.png)
    
- **Prioridade**: atribui o valor da ordem de prioridade da regra de segurança. As regras são processadas de acordo com a ordem de prioridade de todas as regras de um grupo de segurança de rede, incluindo uma sub-rede e um adaptador de rede. Quanto menor o valor de prioridade, mais alta será a prioridade da regra.
    
    ![Captura de tela que mostra como definir o valor de prioridade de uma regra de segurança no portal do Azure.](https://learn.microsoft.com/pt-br/training/wwl-azure/configure-network-security-groups/media/security-priority.png)
