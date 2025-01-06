Depois de implantar seu aplicativo Web ou site, você pode configurar testes recorrentes para monitorar a disponibilidade e a capacidade de resposta. O Application Insights envia solicitações da Web ao aplicativo em intervalos regulares de pontos no mundo todo.

Você pode criar até 100 testes de disponibilidade por recurso do Application Insights e há três tipos de testes de disponibilidade:

- **Teste padrão:** esse é um tipo de teste de disponibilidade que verifica a disponibilidade de um site enviando uma única solicitação, semelhante ao teste de ping de URL preterido.
- **Testes de TrackAvailability personalizado**: se você decidir criar um aplicativo personalizado para executar testes de disponibilidade, poderá usar o método [TrackAvailability()](https://learn.microsoft.com/pt-br/dotnet/api/microsoft.applicationinsights.telemetryclient.trackavailability) para enviar os resultados para o Application Insights.
- [Teste de ping de URL (clássico)](https://learn.microsoft.com/pt-br/azure/azure-monitor/app/monitor-web-app-availability): você pode criar esse teste por meio do portal para validar se um ponto de extremidade está respondendo e medir o desempenho associado a essa resposta.

