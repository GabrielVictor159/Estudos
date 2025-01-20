O Hub de eventos suporta schemas de mensagens no padrão Apache Avro ou JSON, dentre as ferramentas disponíveis temos o Registro de Esquema que é um centralizador de schemas de mensagens, com ele podemos diminuir a carga das mensagens eliminando a necessidade do produtor adicionar metadados comuns aos eventos deixando isso a cargo do Registro de Esquema:

![[Pasted image 20241217080632.png]]

Um namespace dos Hubs de Eventos pode hospedar grupos de esquema junto com os hubs de eventos (ou tópicos Kafka). É possível hospedar um registro de esquema e ter vários grupos de esquemas. Embora esteja hospedado nos Hubs de Eventos do Azure, o registro de esquema pode ser usado universalmente com todos os serviços de mensagem do Azure.

Os esquemas definem o contrato entre os produtores e os consumidores. Um esquema definido em um registro de esquema dos Hubs de Eventos ajuda a gerenciar o contrato fora dos dados de evento.


