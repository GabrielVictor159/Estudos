O uso de Máquinas Virtuais de Spot do Azure permite aproveitar a capacidade não usada com uma economia de custos significativa. A qualquer momento que o Azure precisar da capacidade de volta, a infraestrutura do Azure removerá as Máquinas Virtuais de Spot do Azure.

Ela pode ser desalocada também quando o preço chegar ao limite especificado pelo administrador.

As maquinas virtuais spot são uma ótima escolha para cenários que requerem alto processamento mas que não precisam estarem ativas o tempo todo apenas quando tivermos cargas de trabalho.

## Política de remoção
Você pode especificar duas politicas: desalocar (padrão) ou excluir.

A política _Deslocar_ move a VM para o estado de parado desalocada, permitindo que você reimplante-a posteriormente. As VMs deslocadas afetarão sua cota e você será cobrado pelos custos de armazenamento dos discos subjacentes.

Se quiser que a VM seja excluída quando removida, defina a política de remoção como _excluir_. As VMs removidas são excluídas junto com os respectivos discos subjacentes e, portanto, você não continuará sendo cobrado pelo armazenamento.

