
## Métrica

As métricas são medidas quantitativas que mostram instantâneos do desempenho do aplicativo ou do recurso. Normalmente, as métricas são valores numéricos que você pode medir ao longo do tempo.

Uma lista de métricas específicas de recursos está disponível automaticamente para cada tipo de recurso em sua assinatura do Azure.

Você pode usar o Metrics Explorer do Azure Monitor para analisar interativamente os dados no banco de dados de métricas.

![[Pasted image 20250326015209.png]]

O Azure Monitor pode coletar vários tipos de métricas, incluindo:

- **Métricas da plataforma Azure**: Uma lista de métricas específicas de recursos está disponível automaticamente para cada tipo de recurso do Azure.
- **Métricas personalizadas**: Você pode enviar métricas personalizadas para o Azure Monitor por meio do Agente do Azure Monitor, outros agentes e extensões ou diretamente para a API REST do Azure Monitor.
- **Métricas do Prometheus**: O serviço gerenciado do Azure Monitor para Prometheus coleta métricas do AKS (Serviço de Kubernetes do Azure) ou de outros clusters do Kubernetes.

## Logs
Os logs são registros textuais de eventos, ações e mensagens que ocorrem em um recurso ou aplicativo.

Os logs de Azure Monitor são um recurso do Azure Monitor que coleta e organiza dados de log e de desempenho de recursos monitorados. Para coletar e analisar todos os seus dados, configure um workspace comum chamado workspace do Log Analytics. Você configura seus recursos para enviar seus dados para esse workspace.

