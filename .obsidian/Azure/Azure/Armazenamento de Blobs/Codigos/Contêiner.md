
<h1>Criar um Contêiner</h1>

<h4>CLI</h4>
``` bash
#!/bin/bash
storageAccount="<storage-account>"
containerName="demo-container-1"
containerPrefix="demo-container-"

# Approach 1: Create a container
az storage container create --name $containerName --account-name $storageAccount --auth-mode login

# Approach 2: Create containers with a loop
for value in {2..5}
do
    az storage container create --name $containerPrefix$value --account-name $storageAccount --auth-mode login
done

# Approach 3: Create containers by splitting multiple values
containerList="${containerPrefix}6 ${containerPrefix}7 ${containerPrefix}8"
for container in $containerList
do
    az storage container create --name $container --account-name $storageAccount --auth-mode login
done
```

<h4>PowerShell</h4>
``` PowerShell
# Create variables
 $containerName  = "individual-container"
 $prefixName     = "loop"

# Approach 1: Create a container
 New-AzStorageContainer -Name $containerName -Context $ctx

# Approach 2: Create containers with a PowerShell loop
 for ($i = 1; $i -le 3; $i++) { 
     New-AzStorageContainer -Name (-join($prefixName, $i)) -Context $ctx
    }

# Approach 3: Create containers using the PowerShell Split method
 "$($prefixName)4 $($prefixName)5 $($prefixName)6".split() | New-AzStorageContainer -Context $ctx
```


<h4>.NET</h4>
```csharp
//-------------------------------------------------
// Create a container
//-------------------------------------------------
private static async Task<BlobContainerClient> CreateSampleContainerAsync(BlobServiceClient blobServiceClient)
{
    // Name the sample container based on new GUID to ensure uniqueness.
    // The container name must be lowercase.
    string containerName = "container-" + Guid.NewGuid();

    try
    {
        // Create the container
        BlobContainerClient container = await blobServiceClient.CreateBlobContainerAsync(containerName);

        if (await container.ExistsAsync())
        {
            Console.WriteLine("Created container {0}", container.Name);
            return container;
        }
    }
    catch (RequestFailedException e)
    {
        Console.WriteLine("HTTP error code {0}: {1}",
                            e.Status, e.ErrorCode);
        Console.WriteLine(e.Message);
    }

    return null;
}
```



<h1>Listar Contêineres</h1>

<h4>CLI</h4>
``` bash
#!/bin/bash
storageAccount="<storage-account>"
containerPrefix="demo-container-"
containerName="demo-container-1"
numResults="3"

# Approach 1: List maximum containers
az storage container list --account-name $storageAccount --auth-mode login

# Approach 2: List a defined number of named containers
az storage container list --prefix $containerPrefix --num-results $numResults --account-name $storageAccount --auth-mode login

# Approach 3: List an individual container
az storage container list --prefix $containerPrefix --query "[?name=='$containerName']" --account-name $storageAccount --auth-mode login
```

<h4>PowerShell</h4>
```PowerShell
# Create variables
 $containerName  = "individual-container"
 $prefixName     = "loop-"

# Approach 1: Retrieve an individual container
 Get-AzStorageContainer -Name $containerName -Context $ctx
 Write-Host

# Approach 2: Retrieve a list of containers
 Get-AzStorageContainer -Prefix $prefixName -Context $ctx
```

<h4>.NET</h4>
```csharp
async static Task ListContainers(BlobServiceClient blobServiceClient, 
                                string prefix, 
                                int? segmentSize)
{
    try
    {
        // Call the listing operation and enumerate the result segment.
        var resultSegment = 
            blobServiceClient.GetBlobContainersAsync(BlobContainerTraits.Metadata, prefix, default)
            .AsPages(default, segmentSize);

        await foreach (Azure.Page<BlobContainerItem> containerPage in resultSegment)
        {
            foreach (BlobContainerItem containerItem in containerPage.Values)
            {
                Console.WriteLine("Container name: {0}", containerItem.Name);
            }

            Console.WriteLine();
        }
    }
    catch (RequestFailedException e)
    {
        Console.WriteLine(e.Message);
        Console.ReadLine();
        throw;
    }
}
```



<h1>Excluir Contêiner</h1>

<h4>CLI</h4>
```bash
#!/bin/bash
storageAccount="<storage-account>"
containerName="demo-container-1"
containerPrefix="demo-container-"

# Delete a single named container
az storage container delete --name $containerName --account-name $storageAccount --auth-mode login

# Delete containers by iterating a loop
list=$(az storage container list --query "[].name" --prefix $containerPrefix --account-name $storageAccount --auth-mode login --output tsv)
for row in $list
do
    tmpName=$(echo $row | sed -e 's/\r//g')
    az storage container delete --name $tmpName --account-name $storageAccount --auth-mode login
done
```

<h4>PowerShell</h4>
```PowerShell
# Create variables
 $accountName    = "<storage-account>"
 $containerName  = "individual-container"
 $prefixName     = "loop-"

# Delete a single named container
 Remove-AzStorageContainer -Name $containerName -Context $ctx

# Iterate a loop, deleting containers
 for ($i = 1; $i -le 2; $i++) { 
     Remove-AzStorageContainer -Name (-join($containerPrefix, $i)) -Context $ctx
    }

# Retrieve container list, delete using a pipeline
 Get-AzStorageContainer -Prefix $prefixName -Context $ctx | Remove-AzStorageContainer
```

<h4>.NET</h4>
```csharp
//-------------------------------------------------
// Delete a container
//-------------------------------------------------
private static async Task DeleteSampleContainerAsync(BlobServiceClient blobServiceClient, string containerName)
{
    BlobContainerClient container = blobServiceClient.GetBlobContainerClient(containerName);

    try
    {
        // Delete the specified container and handle the exception.
        await container.DeleteAsync();
    }
    catch (RequestFailedException e)
    {
        Console.WriteLine("HTTP error code {0}: {1}",
                            e.Status, e.ErrorCode);
        Console.WriteLine(e.Message);
        Console.ReadLine();
    }
}
```

