O armazenamento de blobs é um serviço de armazenamento do Azure que armazena qualquer tipo de arquivo no formato de blob e disponibiliza ele via HTTP.

![[Pasted image 20240814045754.png]]

<h1>Conta de armazenamento</h1>
Uma conta de armazenamento é um namespace para gerenciar serviços de dados e faz parte da URL para acessar esses serviços:
```
http://mystorageaccount.blob.core.windows.net
```

<h1>Contêiner</h1>
Um Contêiner é a camada acima dos dados e serve para organiza-los como se fosse um diretório  <h4>O nome do contêiner deve seguir o padrão de url pois será usado no DNS</h4>
```
 https://myaccount.blob.core.windows.net/mycontainer
```

<h1>Blobs</h1>
Os Blobs são os seus dados e também devem ter um nome de valido para uma url.
```
https://myaccount.blob.core.windows.net/mycontainer/myblob
```

