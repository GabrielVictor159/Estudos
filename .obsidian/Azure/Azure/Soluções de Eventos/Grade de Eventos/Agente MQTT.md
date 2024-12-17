
### Visão Geral do Agente MQTT

O agente MQTT da Grade de Eventos do Azure permite que clientes MQTT se comuniquem entre si e com serviços do Azure, suportando soluções de IoT (Internet das Coisas). Ele facilita a ingestão de telemetria, controle de clientes e transmissão de alertas, além de integrar dados de clientes MQTT com serviços do Azure e webhooks.

### Principais Funcionalidades

- **Ingestão de Telemetria**: Utiliza um padrão de mensagem muitos-para-um, descarregando a carga de gerenciar muitas conexões de dispositivos para a Grade de Eventos.
    
- **Controle de Clientes**: Usa o padrão de mensagem de solicitação-resposta (um-para-um), permitindo que qualquer cliente se comunique com outro sem restrições.
    
- **Transmissão de Alertas**: Utiliza o padrão de mensagem um-para-muitos, replicando uma mensagem para todos os clientes interessados.
    
- **Integração de Dados**: Roteia mensagens MQTT para serviços do Azure e webhooks através da funcionalidade de entrega push HTTP, permitindo a criação de pipelines de dados.
    

### Protocolos Suportados

- **MQTT v3.1.1 e v5**: Suporte a mensagens sobre MQTT e MQTT sobre WebSockets, com recursos como Last Will and Testament (LWT), propriedades de usuário, padrão de solicitação-resposta, intervalo de expiração de mensagem, e mais.


