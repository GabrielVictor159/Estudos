O Armazenamento de Blobs Fornece 3 tipos de blobs: <h4>Blobs de Blocos, Blobs de Acréscimo, Blobs de páginas</h4>


<h1>Blobs de Blocos</h1>
Os blobs de blocos são compostos por blocos,  são otimizados para carregar grandes quantidades de dados e cada um dos Blobs é identificado por uma ID de bloco.


<h1>Blobs de Acréscimo</h1>
Um blob de acréscimo é composto por blocos e é otimizado para operações de acréscimo. Quando você modifica um blob de acréscimo, os blocos são adicionados somente ao final do blob por meio da operação [Acrescentar Bloco](https://learn.microsoft.com/pt-br/rest/api/storageservices/append-block) . Não há suporte para atualização ou exclusão de blocos existentes. Ao contrário de um blob de blocos, um blob de acréscimo não expõe suas IDs de bloco.

<h1>Blobs de Páginas</h1>
Blobs de página são uma coleção de páginas de 512 bytes otimizadas para leitura aleatória e operações de gravação. Os discos de máquina virtual do Azure são apoiados por blobs de páginas.

