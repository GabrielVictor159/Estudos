O Azure Load Balancer opera na camada de transporte do modelo OSI. Essa funcionalidade de Camada 4 permite o gerenciamento de tráfego com base em propriedades específicas do tráfego. Propriedades incluindo, endereço de origem e destino, tipo de protocolo TCP ou UDP e número da porta.

O Load Balancer tem vários elementos que funcionam juntos para garantir a alta disponibilidade e o desempenho de um aplicativo:

- IP de front-end
- Regras do balanceador de carga
- Pool de back-end
- Investigações de integridade
- Regras NAT de entrada
- Portas de alta disponibilidade
- Regras de saída

## IP de front-end
O endereço IP de front-end é o endereço que os clientes usam para se conectar ao seu aplicativo Web. Um endereço IP de front-end pode ser público ou privado. Os balanceadores de carga do Azure podem ter vários IPs de front-end.

![[Pasted image 20250304143313.png]]


## Regras do balanceador de carga
Uma regra do balanceador de carga define como o tráfego é distribuído para o pool de back-end. A regra mapeia determinada combinação de porta e IP de front-end para um conjunto de endereços IP de back-end e combinação de portas.

![[Pasted image 20250304143401.png]]
O tráfego é gerenciado usando um hash de cinco tuplas composto pelos seguintes elementos:

- **IP de origem**: o endereço IP do cliente solicitante.
- **Porta de origem**: a porta do cliente solicitante.
- **IP de destino**: o IP de destino da solicitação.
- **Porta de destino**: a porta de destino da solicitação.
- **Tipo de protocolo**: O tipo de protocolo especificado, TCP ou UDP.
- **Afinidade de sessão**: Garante que o mesmo nó de pool sempre manipule o tráfego de um cliente.

 Se você precisar gerenciar o tráfego com base em suas propriedades de Camada 7 (camada de aplicativo), precisará implantar uma solução como o Gateway de Aplicativo do Azure.


## Pool de back-end
O pool de back-end é um grupo de VMs ou instâncias em um conjunto de dimensionamento de máquinas virtuais que responde à solicitação de entrada.

## Investigações de integridade
Uma investigação de integridade é usada para determinar o status de integridade das instâncias no pool de back-end. Você pode definir o limite não íntegro para suas investigações de integridade.  Uma falha de investigação não afeta as conexões existentes.

O Load Balancer permite que você configure diferentes tipos de investigação de integridade para os pontos de extremidade: TCP, HTTP e HTTPS.

- **Investigação personalizada de TCP**: esta investigação depende do estabelecimento de uma sessão de TCP bem-sucedida em uma porta de investigação definida.
- **Investigação personalizada de HTTP ou HTTPS**: o balanceador de carga investiga regularmente seu ponto de extremidade (por padrão, a cada 15 segundos). A instância será íntegra se responder com um HTTP 200 dentro do período de tempo limite (padrão de 31 segundos). Qualquer status diferente de HTTP 200 faz com que a investigação falhe.

## Persistência de sessão
A persistência de sessão também é conhecida como afinidade de sessão, a persistência de sessão especifica como o tráfego de um cliente deve ser tratado. O comportamento padrão (Nenhum) é que qualquer VM íntegra pode lidar com solicitações sucessivas de um cliente.

Você pode configurar uma das seguintes opções de persistência de sessão:

- **Nenhum (padrão)**: especifica que qualquer VM íntegra pode lidar com a solicitação.
- **IP do cliente (2 tuplas)**: Especifica que a mesma instância de back-end pode lidar com solicitações sucessivas do mesmo endereço IP do cliente.
- **IP e protocolo do cliente (3 tuplas)**: Especifica que a mesma instância de back-end pode lidar com solicitações sucessivas da mesma combinação de protocolo e endereço IP do cliente.

## Portas de alta disponibilidade

Uma regra de balanceador de carga configurada com é `protocol - all and port - 0` chamada de _regra de porta de HA (alta disponibilidade)_. Essa regra permite que uma só regra faça o balanceamento de carga de todos os fluxos TCP e UDP recebidos em todas as portas de um balanceador de carga padrão interno.

## Regras NAT de entrada
As regras de balanceamento de carga podem ser usadas em combinação com regras NAT (Conversão de Endereços de Rede).

## Regras de saída
Uma regra de saída configura a SNAT (Conversão de Endereços de Rede de Origem) para todas as VMs ou instâncias identificadas pelo pool de back-end. Essa regra permite que as instâncias do back-end se comuniquem (saída) com a Internet ou com outros pontos de extremidade públicos.
