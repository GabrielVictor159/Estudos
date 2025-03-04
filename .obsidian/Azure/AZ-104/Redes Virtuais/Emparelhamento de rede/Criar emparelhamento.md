- **Pré-requisitos**: Certifique-se de que sua conta do Azure tenha permissões adequadas, como a função de "Network Contributor". Você precisará de duas redes virtuais, sendo uma delas chamada de "rede remota".
    
- **Portal do Azure**:
    
    - Acesse a seção de redes virtuais no Portal do Azure.
        
    - Configure o emparelhamento inicial na rede local e, em seguida, na rede remota.
        
    - Verifique se o status muda de _Iniciado_ para _Conectado_.
        
- **Azure PowerShell**:
    
    - Use o comando `New-AzVirtualNetworkPeering` para criar o emparelhamento entre as duas redes virtuais.
        
    - Certifique-se de especificar as configurações adequadas, como o nome das redes virtuais, as IDs e as permissões.
        
- **Azure CLI**:
    
    - Execute o comando `az network vnet peering create` para criar o emparelhamento.
        
    - Similar ao PowerShell, você precisa especificar os parâmetros necessários, como os nomes das redes virtuais e regiões.
        
- **Status de Conexão**: Verifique o status do emparelhamento. Ele deve mudar de "Iniciado" para "Conectado" para que a comunicação entre as redes seja bem-sucedida.
