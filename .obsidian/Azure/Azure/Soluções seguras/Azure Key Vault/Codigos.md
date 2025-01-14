
## Adicionar e recuperar um segredo

```bash
az keyvault secret set --vault-name $myKeyVault --name "ExamplePassword" --value "hVFkk965BuUv"
```
```bash
az keyvault secret show --name "ExamplePassword" --vault-name $myKeyVault
```

### Adicionar chaves de acesso da conta de armazenamento a segredos do Key Vault

```bash
az keyvault set-policy --upn <email-address-of-user> --name vaultrotation-kv --secret-permissions set delete get list
```
