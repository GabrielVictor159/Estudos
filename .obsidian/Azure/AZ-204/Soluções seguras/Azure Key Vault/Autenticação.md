Existem três maneiras de se autenticar.

**Identidades gerenciadas para recursos do Azure**: ao implantar um aplicativo em uma máquina virtual no Azure, você pode atribuir uma identidade a sua máquina virtual que tem acesso ao Key Vault.

**Entidade de serviço e certificado:** você pode usar uma entidade de serviço e um certificado associado que tem acesso ao Key Vault, para isso é necessario que o serviço esteja no mesmo locatário no Entra ID.

**Entidade de serviço e segredo:** embora seja possível, nós não recomendamos usar uma entidade de serviço e um segredo para autenticar-se ao Key Vault.



## Criptografia em Trânsito
O Azure Key Vault utiliza criptografia TLS na comunicação entre o serviço e o Key Vault.


