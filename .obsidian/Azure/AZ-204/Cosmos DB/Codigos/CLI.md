
```shell
az login

az group create --location <myLocation> --name az204-cosmos-rg

az cosmosdb create --name <myCosmosDBacct> --resource-group az204-cosmos-rg

# Retrieve the primary key
az cosmosdb keys list --name <myCosmosDBacct> --resource-group az204-cosmos-rg
```

