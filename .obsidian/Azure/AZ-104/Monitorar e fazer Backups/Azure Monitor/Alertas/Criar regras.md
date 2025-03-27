![[Pasted image 20250326222657.png]]

Na seção **Lógica de alerta**, insira (ou confirme) os seguintes valores para cada configuração.

| Configuração                 | Valor     |
| ---------------------------- | --------- |
| **Lógica de alerta**         |           |
| Limite                       | Estático  |
| Tipo de agregação            | Máximo    |
| Operador                     | Maior que |
| Valor limite                 | 90        |
| **Quando fazer a avaliação** |           |
| Verificar a cada             | 1 minuto  |
| Período de retrospectiva     | 1 minuto  |

![[Pasted image 20250326222728.png]]

![[Pasted image 20250326222811.png]]

## Usando CLI
```bash
az monitor metrics alert create -n "Cpu80PercentAlert" --resource-group "[sandbox resource group name]" --scopes $VMID --condition "max percentage CPU > 80" --description "Virtual machine is running at or greater than 80% CPU utilization" --evaluation-frequency 1m --window-size 1m --severity 3
```

## Visualizar Alertas
![[Pasted image 20250326222942.png]]
