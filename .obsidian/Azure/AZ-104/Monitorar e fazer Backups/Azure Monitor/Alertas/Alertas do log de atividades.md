Os alertas de logs de atividades permitem que você seja notificado quando um evento específico ocorrer em algum recurso do Azure.

Um log de atividades também pode incluir alertas sobre a integridade do serviço do Azure.

Os _alertas de métrica_ são ideais para monitorar as violações de limite ou identificar as tendências. Os _alertas de pesquisa de logs_ permitem maior monitoramento analítico de dados históricos.

Os _alertas de log de atividades_ foram projetados para funcionar com os recursos do Azure.

É importante observar que os alertas de log de atividades só monitoram eventos na assinatura em que o alerta foi criado.

Há dois tipos de alertas de log de atividades:

- **Operações específicas**: se aplicam aos recursos em sua assinatura do Azure e geralmente têm um escopo com recursos específicos ou um grupo de recursos. Use esse tipo quando precisar receber um alerta que relate alterações em um aspecto de sua assinatura. Por exemplo, você pode receber um alerta caso uma VM seja excluída ou novas funções sejam atribuídas a um usuário.
- **Eventos de integridade do serviço**: inclua um aviso de incidentes e manutenção dos recursos de destino.

## Composição de um alerta de log de atividades
Assim como os alertas anteriores, os alertas de log de atividades têm seus próprios atributos:

- **Categoria**: administrativa, integridade do serviço, dimensionamento automático política ou recomendação
- **Escopo**: nível do recurso, nível do grupo de recursos ou nível da assinatura
- **Grupo de recursos**: onde a regra de alerta é salva
- **Tipo de recurso**: namespace do destino do alerta
- **Nome da operação**: nome da operação
- **Nível**: detalhado, informativo, aviso, erro ou crítico
- **Status**: iniciado, com falha ou bem-sucedido
- **Evento iniciado por**: Endereço de email ou identificador do Microsoft Entra (conhecido como "chamador") para o usuário

