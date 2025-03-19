No portal do Azure, você configura a criptografia do Armazenamento do Azure especificando o tipo de criptografia.

![[Pasted image 20250319025201.png]]
- **Criptografia da infraestrutura**. [Criptografia da infraestrutura](https://learn.microsoft.com/pt-br/azure/storage/common/infrastructure-encryption-enable) pode ser habilitada para toda a conta de armazenamento ou para um escopo de criptografia dentro de uma conta. Quando a criptografia da infraestrutura é habilitada para uma conta de armazenamento ou um escopo de criptografia, os dados são criptografados duas vezes: uma vez no nível do serviço e outra no nível da infraestrutura, com dois algoritmos de criptografia diferentes e duas chaves diferentes.

- **Chaves gerenciadas pela plataforma**. As chaves de criptografia gerenciadas pela plataforma (PMKs) são chaves de criptografia geradas, armazenadas e gerenciadas inteiramente pelo Azure.

- **Chaves gerenciadas pelo cliente**. Chaves gerenciadas pelo cliente (CMK), por outro lado, são chaves lidas, criadas, excluídas, atualizadas e/ou administradas por um ou mais clientes. As chaves armazenadas em um cofre de chaves de propriedade do cliente ou um HSM (módulo de segurança de hardware) são CMKs.
