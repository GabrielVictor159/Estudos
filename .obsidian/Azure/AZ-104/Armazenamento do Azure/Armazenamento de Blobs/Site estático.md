
O Armazenamento de Blobs do Azure fornece a possibilidade de armazenamento de sites estáticos, para isso basta adicionar os arquivos estáticos no contêiner <b>$web</b>

Para habilitar a hospedagem do site estático, selecione o nome do arquivo padrão e, opcionalmente, forneça um caminho para uma página 404 personalizada.

<h1>Limitações</h1>
Não é possível usar cabeçalhos, AuthN e AuthZ para isso é necessário utilizar a CDN do Azure (Rede de Distribuição de Conteúdo do Azure).

Por padrão não é possível utilizar o HTTPS sem configurar a CDN do Azure (Rede de Distribuição de Conteúdo do Azure).

