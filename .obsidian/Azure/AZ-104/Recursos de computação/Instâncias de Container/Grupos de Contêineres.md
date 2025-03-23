

Um grupo de contêineres é uma coleção de contêineres que são agendados no mesmo computador host. Os contêineres de um grupo de contêineres compartilham ciclo de vida, recursos, rede local e volumes de armazenamento.
![[Pasted image 20240817065431.png]]


<h1>Implantação</h1>
Estas são as duas maneiras comuns de implantar um grupo com vários contêineres: usando um [modelo do Resource Manager](https://learn.microsoft.com/pt-br/azure/container-instances/container-instances-multi-container-group) ou um [arquivo YAML](https://learn.microsoft.com/pt-br/azure/container-instances/container-instances-multi-container-yaml). O modelo do Resource Manager é recomendável para implantar recursos adicionais de serviço do Azure.

