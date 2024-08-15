
<h1>Criar Blobs</h1>
<h4>CLI</h4>
```bash
#!/bin/bash
storageAccount="<storage-account>"
containerName="demo-container"
lastModified=$(date +%Y:%m:%d -d "7 days ago")

path="C:\\temp\\"
filename="demo-file.txt"
imageFiles="*.png"
file="$path$filename"

#Upload a single named file
az storage blob upload --file $file --container-name $containerName --account-name $storageAccount --auth-mode login

#Upload multiple image files recursively
az storage blob upload-batch --destination $containerName --source $path --pattern *.png --account-name $storageAccount --auth-mode login --if-modified-since $lastModified
```

<h4>PowerShell</h4>
```PowerShell
#Set variables
$path          = "C:\temp\" 
$containerName = "mycontainer"
$filename      = "demo-file.txt"
$imageFiles    = $path + "*.png"
$file          = $path + $filename

#Upload a single named file
Set-AzStorageBlobContent -File $file -Container $containerName -Context $ctx

#Upload multiple image files recursively
 Get-ChildItem -Path $imageFiles -Recurse | Set-AzStorageBlobContent -Container $containerName -Context $ctx
```

<h4>.NET</h4>
```csharp
public static async Task UploadFromFileAsync(
    BlobContainerClient containerClient,
    string localFilePath)
{
    string fileName = Path.GetFileName(localFilePath);
    BlobClient blobClient = containerClient.GetBlobClient(fileName);

    await blobClient.UploadAsync(localFilePath, true);
}
```


<h1>Listar Blobs</h1>
<h4>CLI</h4>
```bash
#!/bin/bash
storageAccount="<storage-account>"
containerName="<container-name>"
blobPrefix="<prefix-string>"
numResults=5

#Approach 1: List all blobs in a container by name.

az storage blob list --account-name $storageAccount --container $containerName --query "[].name" --auth-mode login --output tsv

#Approach 2: Use the --prefix parameter to list blobs starting with specified prefix.

az storage blob list --account-name $storageAccount --container $containerName --prefix $blobPrefix --query "[].name" --auth-mode login --output tsv

#Approach 3: Use the continuation token to return the complete set of results.

get_blobs() {
    if [ -z "$nextMarker" ]; then
        az storage blob list --container-name $containerName --num-results $numResults --account-name $storageAccount --show-next-marker --only-show-errors --auth-mode login
    else
        az storage blob list --container-name $containerName --num-results $numResults --marker $nextMarker --account-name $storageAccount --show-next-marker --only-show-errors --auth-mode login
    fi
}
 
total=0
nextMarker=""
while true; do
    blobs=$(get_blobs $containerName $numResults $storageAccount $nextMarker) 
    nextMarker=""
    blobsLength=$(echo $blobs | jq length)
    
    if [ $blobsLength -le 0 ]; then
        break
    fi
    
    blobIndex=0
    while read blob; do
        if [ $blobIndex -eq $(($blobsLength-1)) ]; 
        then
            nextMarker="$(echo $blob | jq -r .nextMarker)"
        else
            blobName=$(echo $blob | jq .name)
            echo "blobname: $blobName"
        fi
        ((blobIndex++))
    done <<<$(echo $blobs | jq -c '.[]')
 
    total=$(($total+$blobsLength-1))
    echo "Processed $total blobs so far"
    # echo "nextMarker: $nextMarker"
    if [ "${nextMarker}" = "null" ]; then
        echo -e "\nAccountName: $storageAccount, ContainerName: $containerName "
        echo "Processed $total blobs in total."
        break
    fi
done
```

<h4>PowerShell</h4>
```PowerShell
#Set variables
$namedContainer  = "named-container"
$demoContainer   = "mycontainer"
$containerPrefix = "demo"

$maxCount = 1000
$total     = 0
$token     = $Null

#Approach 1: List all blobs in a named container
Get-AzStorageBlob -Container $namedContainer -Context $ctx

#Approach 2: Use a wildcard to list blobs in all containers
Get-AzStorageContainer -MaxCount 5 -Context $ctx | Get-AzStorageBlob -Blob "*louis*.jpg"

#Approach 3: List batches of blobs using MaxCount and ContinuationToken parameters
Do
{
     #Retrieve blobs using the MaxCount parameter
     $blobs = Get-AzStorageBlob -Container $demoContainer -MaxCount $maxCount -ContinuationToken $token -Context $ctx
     $blobCount = 1
     
     #Loop through the batch
     Foreach ($blob in $blobs)
     {
         #To-do: Perform some work on individual blobs here

#Display progress bar
         $percent = $($blobCount/$maxCount*100)
         Write-Progress -Activity "Processing blobs" -Status "$percent% Complete" -PercentComplete $percent
         $blobCount++
     }

#Update $total
     $total += $blobs.Count
      
     #Exit if all blobs processed
     If($blobs.Length -le 0) { Break; }
      
     #Set continuation token to retrieve the next batch
     $token = $blobs[$blobs.Count -1].ContinuationToken
 }
 While ($null -ne $token)
 Write-Host "`n`n   AccountName: $($ctx.StorageAccountName), ContainerName: $demoContainer `n"
 Write-Host "Processed $total blobs in $namedContainer."
```

<h4>.NET</h4>
```csharp
private static async Task ListBlobsFlatListing(BlobContainerClient blobContainerClient, 
                                               int? segmentSize)
{
    try
    {
        // Call the listing operation and return pages of the specified size.
        var resultSegment = blobContainerClient.GetBlobsAsync()
            .AsPages(default, segmentSize);

        // Enumerate the blobs returned for each page.
        await foreach (Page<BlobItem> blobPage in resultSegment)
        {
            foreach (BlobItem blobItem in blobPage.Values)
            {
                Console.WriteLine("Blob name: {0}", blobItem.Name);
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


<h1>Baixar Blobs</h1>

<h4>CLI</h4>
```bash
#!/bin/bash
#Set variables
storageAccount="<storage-account>"
containerName="demo-container"

destinationPath="C:\\temp\\downloads\\"
destinationFilename="downloadedBlob.txt"
file="$destinationPath$destinationFilename"
sourceBlobName="demo-file.txt"

#Download a single named blob

az storage blob download --container $containerName --file $file --name $sourceBlobName --account-name $storageAccount --auth-mode login

#Download multiple blobs using a pattern value

az storage blob download-batch --destination $destinationPath --source $containerName --pattern images/*.png --account-name $storageAccount --auth-mode login

#Use a loop to download matching blobs in a list of containers

containerList=$( az storage container list --query "[].name" --num-results 5 --account-name $storageAccount --auth-mode login --output tsv 
)
for row in $containerList
do
    tmpName=$(echo $row | sed -e 's/\r//g')
    echo $tmpName
   
    az storage blob download-batch --destination $destinationPath --source $tmpName --pattern *louis*.* --account-name $storageAccount --auth-mode login
done
```

<h4>PowerShell</h4>
```PowerShell
#Set variables
$containerName = "mycontainer"
$path          = "C:\temp\downloads\"
$blobName      = "demo-file.txt"
$fileList      = "*.png"
$pipelineList  = "louis*"
$maxCount      = 10

#Download a single named blob
Get-AzStorageBlobContent -Container $containerName -Blob $blobName -Destination $path -Context $ctx

#Download multiple blobs using the pipeline
Get-AzStorageBlob -Container $containerName -Blob $fileList -Context $ctx | Get-AzStorageBlobContent

#Use wildcard to download blobs from all containers
Get-AzStorageContainer -MaxCount $maxCount -Context $ctx | Get-AzStorageBlob -Blob "louis*" | Get-AzStorageBlobContent
```

<h4>.NET</h4>
```csharp
public static async Task DownloadBlobWithTransferOptionsAsync(
    BlobClient blobClient,
    string localFilePath)
{
    FileStream fileStream = File.OpenWrite(localFilePath);

    var transferOptions = new StorageTransferOptions
    {
        // Set the maximum number of parallel transfer workers
        MaximumConcurrency = 2,

        // Set the initial transfer length to 8 MiB
        InitialTransferSize = 8 * 1024 * 1024,

        // Set the maximum length of a transfer to 4 MiB
        MaximumTransferSize = 4 * 1024 * 1024
    };

    BlobDownloadToOptions downloadOptions = new BlobDownloadToOptions()
    {
        TransferOptions = transferOptions
    };

    await blobClient.DownloadToAsync(fileStream, downloadOptions);

    fileStream.Close();
}
```


<h1>Excluir Blobs</h1>
<h4>CLI</h4>
```bash
#!/bin/bash
storageAccount="<storage-account>"
containerName="demo-container"

blobName="demo-file.txt"
blobPrefix="sinatra-"

#Delete a single, named blob
az storage blob delete --container-name $containerName --name $blobName --account-name $storageAccount --auth-mode login

#Iterate a blob list, deleting blobs whose names end with even numbers

## Get list of containers
blobList=$(az storage blob list --query "[].name" --prefix $blobPrefix --container-name $containerName --account-name $storageAccount --auth-mode login --output tsv)

## Delete all blobs with the format *bennett-x* except *bennett-2.*
for row in $blobList
do
    #Get the blob's number
    tmpBlob=$(echo $row | sed -e 's/\r//g') 
    tmpName=$(echo ${row%.*} | sed -e 's/\r//g')

if [ `expr ${tmpName: ${#blobPrefix}} % 2` == 0 ]
    then
        
        echo "Deleting $tmpBlob"
        az storage blob delete --container-name $containerName --name $tmpBlob --account-name $storageAccount --auth-mode login

fi
done

#Delete multiple blobs using delete-batch
az storage blob delete-batch --source $containerName --pattern bennett-[!2].* --account-name $storageAccount --auth-mode login
```

<h4>PowerShell</h4>
```PowerShell
#Create variables
$containerName  = "mycontainer"
$blobName       = "demo-file.txt"
$prefixName     = "file"

#Delete a single, named blob
Remove-AzStorageBlob -Blob $blobName -Container $containerName -Context $ctx

#Iterate a loop, deleting blobs
for ($i = 1; $i -le 3; $i++) { 
    Remove-AzStorageBlob -Blob (-join($prefixName, $i, ".txt")) -Container $containerName -Context $ctx
}

#Retrieve blob list, delete using a pipeline
Get-AzStorageBlob -Prefix $prefixName -Container $containerName -Context $ctx | Remove-AzStorageBlob
```

<h4>.NET</h4>
```csharp
public static async Task DeleteBlobAsync(BlobClient blob)
{
    await blob.DeleteAsync();
}
```
