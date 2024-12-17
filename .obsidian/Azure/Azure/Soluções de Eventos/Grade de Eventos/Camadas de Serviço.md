### Camada Padrão da Grade de Eventos

- **Funcionalidades**:
    
    - Suporte à comunicação bidirecional usando MQTT v3.1.1 e v5.0.
        
    - Publicação de eventos no formato CloudEvents usando HTTP.
        
    - Entrega de eventos por pull usando HTTP.
        
    - Envio de eventos por push para Hubs de Eventos usando AMQP.
        
- **Uso Ideal**:
    
    - Publicar e consumir mensagens MQTT.
        
    - Criar soluções para disparar ações com base em eventos de aplicativo personalizados no formato JSON CloudEvents.
        
    - Aplicativos com padrões de consumo flexíveis, como entrega de pull HTTP para vários consumidores ou entrega por push para Hubs de Eventos.
        
    - Necessidade de taxas de comunicação HTTP maiores que 5 MB/s para entrada e saída.
        
    - Retenção de eventos CloudEvents de até 7 dias.
        

### Camada Básica da Grade de Eventos

- **Funcionalidades**:
    
    - Suporte à entrega push usando tópicos personalizados, tópicos do sistema, tópicos de parceiros e domínios.
        
- **Uso Ideal**:
    
    - Criar soluções para disparar ações com base em eventos de aplicativos personalizados, eventos do sistema do Azure e eventos de parceiros.
        
    - Publicar eventos em milhares de tópicos ao mesmo tempo.
        
    - Sem necessidade de taxas maiores que 5 MB/s para entrada ou saída.
        
    - Retenção de eventos de até 1 dia.
        

### Comparação entre Camadas Básica e Padrão

- **Taxas de Entrada e Saída**:
    
    - Camada Padrão: Até 40 MB/s (entrada) e 80 MB/s (saída).
        
    - Camada Básica: Até 5 MB/s (entrada e saída).
        
- **Retenção de Mensagens**:
    
    - Camada Padrão: Até 7 dias.
        
    - Camada Básica: Até 1 dia.
        
- **Suporte a MQTT**:
    
    - Camada Padrão: Sim.
        
    - Camada Básica: Não.
        
- **Entrega por Pull**:
    
    - Camada Padrão: Sim.
        
    - Camada Básica: Não.
        
- **Entrega por Push**:
    
    - Ambas as camadas suportam entrega por push para Webhooks, Hubs de Eventos e serviços do Azure.