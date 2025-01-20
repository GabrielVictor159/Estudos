O recurso de exclusão reversível do Key Vault permite a recuperação dos cofres excluídos e dos objetos do cofre de chaves excluídos (por exemplo, chaves, segredos, certificados);

Para isso é necessário ativar a exclusão reversível, quando ativa os recursos excluídos podem ser recuperados até 90 dias por padrão.

Ao criar um cofre de chaves, a exclusão reversível é ativada por padrão. Quando a exclusão reversível está habilitada em um cofre de chaves, ela não pode ser desabilitada.

O intervalo de política de retenção só pode ser configurado durante a criação do cofre de chaves e não pode ser alterado posteriormente. Você pode definir entre 7 e 90 dias.


para listar os objetos excluidos podemos usar o comando:
```bash
az keyvault key list-deleted
```

