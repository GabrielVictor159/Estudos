O Gateway de Aplicativo inclui os seguintes componentes:
![[Pasted image 20250304171920.png]]

- **Endereço IP de front-end**: as solicitações do cliente são recebidas por meio de um endereço IP de front-end. O endereço de Ip pode ser publico ou privado.
- **Ouvintes**: o Gateway de Aplicativo usa um ou mais ouvintes para receber as solicitações de entrada. Cada ouvinte roteia solicitações para um pool de back-end de servidores, seguindo as regras de roteamento especificadas. Um ouvinte pode ser Básico ou Multissite. Um ouvinte _Básico_ só roteia uma solicitação com base no caminho na URL. Um ouvinte _Multissite_ também pode rotear as solicitações usando o elemento de nome de host da URL.
- **Regras de roteamento**: uma regra de roteamento associa um ouvinte aos pools de back-end.Uma regra de roteamento também tem um conjunto associado de configurações de HTTP. Essas configurações HTTP indicam se (e como) o tráfego é criptografado entre o Gateway de Aplicativo e os servidores de back-end.

## Balanceamento de carga no Gateway de Aplicativo
O Gateway de Aplicativo fará automaticamente o balanceamento de carga das solicitações enviadas para os servidores em cada pool de back-end usando um mecanismo de round robin. O balanceamento de carga funciona com o roteamento de OSI de Camada 7, deferentemente do azure Load Balancer que atua na Camada 4.

Você poderá configurar a adesão da sessão se precisar garantir que todas as solicitações de um cliente na mesma sessão sejam roteadas para o mesmo servidor em um pool de back-end.


## Firewall do aplicativo Web

O WAF (firewall do aplicativo Web) é um componente opcional que manipula as solicitações de entrada antes que elas cheguem ao ouvinte.

O firewall do aplicativo Web verifica cada solicitação para ver se há ameaças comuns, com base no OWASP (Open Web Application Security Project).

O OWASP define um conjunto de regras genéricas para detecção de ataques. Essas regras são conhecidas como CRS (Conjunto de regras principal).


## Pools de back-end
Um pool de back-end é uma coleção de servidores Web que pode ser composto por um conjunto fixo de máquinas virtuais, um conjunto de dimensionamento de máquina virtual, um aplicativo hospedado pelos Serviços de Aplicativo do Azure ou uma coleção de servidores locais.

Cada pool de back-end tem um balanceador de carga associado que distribui o trabalho pelo pool. Ao configurar o pool, você fornece o endereço IP ou o nome de cada servidor Web.

Se você estiver usando TLS/SSL, o pool de back-end terá uma configuração de HTTP que referencia um certificado usado para autenticar os servidores de back-end. O gateway criptografa novamente o tráfego usando esse certificado antes de enviá-lo para um dos servidores no pool de back-end.


## O roteamento do Gateway de Aplicativo
 Há dois métodos principais para rotear o tráfego dessa solicitação de cliente: roteamento baseado em caminho e roteamento de vários sites.

### Roteamento baseado em caminho
O roteamento baseado em caminho envia solicitações com diferentes caminhos de URL para diversos pools de servidores de back-end.
![[Pasted image 20250304181957.png]]

### Roteamento de vários sites
O roteamento de vários sites configura mais de um aplicativo Web na mesma instância do Gateway de Aplicativo. Em uma configuração com vários sites, você pode registrar vários nomes DNS (CNAMEs) para o endereço IP do gateway de aplicativo, especificando o nome de cada site.

![[Pasted image 20250304182046.png]]

O roteamento do Gateway de Aplicativo também inclui estes recursos:

- **Redirecionamento**. O redirecionamento pode ser usado em outro site ou de HTTP para HTTPS.
- **Reescrever cabeçalhos HTTP**. Os cabeçalhos HTTP permitem que o cliente e o servidor enviem informações de parâmetros com a solicitação ou a resposta.
- **Páginas de erro personalizadas**. O Gateway de Aplicativo permite que você crie páginas de erro personalizadas em vez de exibir páginas de erro padrão. 

## Investigações de integridade
As investigações de integridade determinam quais servidores estão disponíveis para executar o balanceamento de carga em um pool de back-end.

É enviado um request para o servidor, o servidor é integro quando responde com o código HTTP 200.

 Se você não configurar uma investigação de integridade, o Gateway de Aplicativo criará uma investigação padrão que aguarda 30 segundos antes de decidir que um servidor não está disponível.


## Dimensionamento automático
O Gateway de Aplicativo dá suporte ao dimensionamento automático e pode ser expandido ou reduzido de acordo com a mudança dos padrões da carga de tráfego.

