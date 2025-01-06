Um gateway de API fica entre clientes e serviços. Ele atua como um proxy reverso, encaminhando as solicitações de clientes para serviços. Ele também pode executar várias tarefas detalhadas.

## Gerenciado e auto-hospedado

O Gerenciamento de API oferece gateways gerenciados e auto-hospedados:

- **Gerenciado**: o gateway gerenciado é o componente de gateway padrão implantado no Azure para cada instância do Gerenciamento de API em cada camada de serviço. Com o gateway gerenciado, todo o tráfego de API flui pelo Azure, independentemente do local em que os back-ends que implementam as APIs estão hospedados.
    
- **Auto-hospedado**: o gateway auto-hospedado é uma versão opcional e em contêiner do gateway gerenciado padrão. Ele é útil para cenários híbridos e de várias nuvens em que há um requisito para executar os gateways do Azure nos mesmos ambientes em que os back-ends da API estão hospedados. O gateway auto-hospedado permite que os clientes com infraestrutura de TI híbrida gerenciem APIs hospedadas localmente e entre nuvens de um único serviço de Gerenciamento de API do Azure.
-