O controle de acesso baseado em função do Azure (Azure RBAC) é um sistema de autorização interno ao Azure Resource Manager que fornece gerenciamento de acesso refinado para recursos no Azure. Com o RBAC do Azure, você pode conceder o acesso exato de que os usuários precisam para realizar os trabalhos deles.

O Microsoft Entra ID e o RBAC do Azure (controle de acesso baseado em função do Azure) trabalham juntos.

## Assinaturas do Azure

Primeiro, lembre-se de que cada assinatura do Azure está associada a um só diretório do Microsoft Entra. Usuários, grupos e aplicativos nesse diretório podem gerenciar recursos na assinatura do Azure.

Você pode conceder acesso ao atribuir a função do Azure apropriada a usuários, grupos e aplicativos em determinado escopo. O escopo de uma atribuição de função pode ser um grupo de gerenciamento, uma assinatura, um grupo de recursos ou um único recurso.Uma função atribuída a um escopo pai também concede acesso aos escopos filho contidos nele.


![[Pasted image 20250220172819.png]]


## O que posso fazer com o RBAC do Azure?

Com o RBAC do Azure, você permite acesso aos recursos do Azure que você controla.


## RBAC do Azure no portal do Azure

Em várias áreas no portal do Azure, você verá um painel chamada **Controle de acesso (IAM)**, também conhecido como _gerenciamento de identidades e acesso_. Nesse painel, você pode ver quem tem acesso a essa área e a função. Usando esse mesmo painel, você pode conceder ou remover o acesso.

![[Pasted image 20250220172928.png]]

### 1. Entidade de segurança (quem)

Uma _entidade de segurança_ é apenas um nome especial para um usuário, um grupo ou um aplicativo ao qual você deseja permitir acesso.

![[Pasted image 20250220173009.png]]
### 2. Definição de função (o que pode ser feito)

Uma _definição de função_ é uma coleção de permissões. Às vezes, é chamada apenas de função. Uma definição de função lista as permissões que a função pode executar, como ler, escrever e excluir.

![[Pasted image 20250220173040.png]]

O Azure inclui várias funções internas que você pode usar. Esta é uma lista das quatro funções internas fundamentais:

- **Proprietário**: tem acesso total a todos os recursos, incluindo o direito de delegar acesso a outras pessoas
- **Colaborador**: pode criar e gerenciar todos os tipos de recursos do Azure, mas não pode conceder acesso a outras pessoas
- **Leitor**: pode exibir os recursos existentes do Azure
- **Administrador de Acesso do Usuário**: permite que você gerencie o acesso do usuário aos recursos do Azure

### 3. Escopo (onde)

_Escopo_ é o nível em que o acesso se aplica. Isso será útil se você desejar tornar alguém um Colaborador do Site, mas apenas para um grupo de recursos.

![[Pasted image 20250220173143.png]]

### Atribuição de função

Uma _atribuição de função_ é o processo de associar uma função a uma entidade de segurança em um escopo específico com a finalidade de conceder acesso.

![[Pasted image 20250220173214.png]]
