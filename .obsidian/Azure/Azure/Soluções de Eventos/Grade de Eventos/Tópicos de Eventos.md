
- Representam eventos publicados por serviços do Azure, como Armazenamento do Azure e Hubs de Eventos do Azure.
    
- Podem ser criados automaticamente ou manualmente.
    
### Tópicos do Sistema como Recursos do Azure
Os tópicos do sistema são visíveis como recursos do Azure e oferecem várias funcionalidades importantes:

- **Visualização no Portal do Azure**: Você pode visualizar os tópicos do sistema diretamente no portal do Azure, facilitando o gerenciamento e a monitoração.
    
- **Exportação de Modelos**: É possível exportar modelos do Azure Resource Manager para tópicos do sistema e assinaturas de eventos, permitindo a automação e a replicação de configurações.
    
- **Configuração de Logs de Diagnóstico**: Você pode configurar logs de diagnóstico para monitorar e solucionar problemas relacionados aos tópicos do sistema.
    
- **Configuração de Alertas**: É possível configurar alertas para falhas de publicação e entrega de eventos, garantindo que você seja notificado rapidamente sobre qualquer problema.

### Ciclo de Vida dos Tópicos do Sistema

Os tópicos do sistema na Grade de Eventos do Azure podem ser criados de duas maneiras principais:

1. **Criação Automática**:
    
    - Quando você cria uma assinatura de evento em um recurso do Azure, um tópico do sistema é criado automaticamente com um nome no formato: `<Nome do recurso do Azure>-<GUID>`.
        
    - Esse tópico do sistema é automaticamente excluído quando a última assinatura de evento associada a ele é excluída.
        
2. **Criação Manual**:
    
    - Você pode criar manualmente um tópico do sistema para um recurso do Azure e, em seguida, criar uma assinatura de evento para esse tópico.
        
    - Ao usar esse método, você pode especificar um nome para o tópico do sistema.
        
    - O tópico do sistema não é excluído automaticamente quando a última assinatura de evento é excluída; você precisa excluí-lo manualmente.
    
### Local e Grupo de Recursos para um Tópico do Sistema

- Criados no mesmo local que a origem do evento do Azure.
    
- Para origens de eventos globais, são criados no local global.

## Tópicos Personalizados
A grade de eventos possibilita a criação de tópicos manuais criados por aplicativos ou terceiros, nesse cenário o editor decide quantos tópicos são necessários e cria tópicos personalizados para diferentes categorias de eventos.
