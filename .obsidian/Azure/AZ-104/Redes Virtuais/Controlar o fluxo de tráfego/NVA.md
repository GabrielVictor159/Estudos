Uma NVA (solução de virtualização de rede) é uma solução de virtualização que consiste em várias camadas, tais como:

- Um firewall
- Um otimizador de WAN
- Controladores de entrega de aplicativo
- Roteadores
- Balanceadores de carga
- IDS/IPS
- Proxies

NVA (soluções de virtualização de rede) são máquinas virtuais que controlam o fluxo do tráfego de rede controlando o roteamento.
![[Pasted image 20250304110816.png]]

## Implantar a solução de virtualização de rede

Para criar a NVA, implante uma instância do Ubuntu LTS.
```bash
az vm create --resource-group "[sandbox resource group name]" --name nva --vnet-name vnet --subnet dmzsubnet --image Ubuntu2204 --admin-username azureuser --admin-password <password>
```
## Habilitar o encaminhamento de IP para o adaptador de rede do Azure

1. Execute o comando a seguir para obter a ID do adaptador de rede da NVA
```bash
NICID=$(az vm nic list --resource-group "[sandbox resource group name]" --vm-name nva --query "[].{id:id}" --output tsv)

echo $NICID
```

2. Execute o comando a seguir para obter o nome do adaptador de rede da NVA:
```bash
NICNAME=$(az vm nic show --resource-group "[sandbox resource group name]" --vm-name nva --nic $NICID --query "{name:name}" --output tsv)

echo $NICNAME
```

3. Execute o comando a seguir para habilitar o encaminhamento de IP para o adaptador de rede:
 ```bash
 az network nic update --name $NICNAME --resource-group "[sandbox resource group name]" --ip-forwarding true
```
