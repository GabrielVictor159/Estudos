1. Primeiro precisamos criar uma tabela de roteamento
```bash
az network route-table create \ --name publictable \ --resource-group "[sandbox resource group name]" \ --disable-bgp-route-propagation false
```
2. Em seguida podemos criar as rotas personalizadas
```bash
az network route-table route create --route-table-name publictable --resource-group "[sandbox resource group name]" --name productionsubnet --address-prefix 10.0.1.0/24 --next-hop-type VirtualAppliance --next-hop-ip-address 10.0.2.4
```
3. Em seguida podemos criar as redes virtuais e as sub-redes

```bash
az network vnet create --name vnet --resource-group "[sandbox resource group name]" --address-prefixes 10.0.0.0/16 --subnet-name publicsubnet --subnet-prefixes 10.0.0.0/24
```

```bash
az network vnet subnet create --name privatesubnet --vnet-name vnet --resource-group "[sandbox resource group name]" --address-prefixes 10.0.1.0/24
```

4. Em seguidas podemos adicionar a tabela de rotas a sub-rede criada
```bash 
az network vnet subnet update --name publicsubnet --vnet-name vnet --resource-group "[sandbox resource group name]" --route-table publictable
```


