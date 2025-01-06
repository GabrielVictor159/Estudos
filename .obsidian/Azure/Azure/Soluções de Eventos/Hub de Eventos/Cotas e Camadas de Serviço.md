
## Limites comuns para todas as camadas

Os limites a seguir são comuns em todas as camadas.

|Limite|Observações|Valor|
|---|---|---|
|Tamanho do nome de um hub de eventos|-|256 caracteres|
|Tamanho de um nome de grupo de consumidores|O protocolo Kafka não requer a criação de um grupo de consumidores.|Kafka: 256 caracteres<br><br>AMQP: 50 caracteres|
|Número de destinatários sem época por grupo de consumidores|-|5|
|Número de regras de autorização por namespace|As solicitações subsequentes de criação de regra de autorização são rejeitadas.|12|
|Número de chamadas para o método GetRuntimeInformation|-|50 por segundo|
|Número de VNets (redes virtuais)|-|128|
|Número de regras de configuração de IP|-|128|
|Comprimento máximo de um nome de grupo de esquemas||50|
|Comprimento máximo de um nome de esquema||100|
|Tamanho em bytes por esquema||1 MB|
|Número de propriedades por grupo de esquemas||1024|
|Tamanho em bytes por chave de propriedade de grupo de esquemas||256|
|Tamanho em bytes por valor da propriedade de grupo de esquemas||1024|


## Camadas básica vs. padrão vs. premium vs. dedicada

A tabela a seguir mostra limites diferentes para as camadas de serviço Básico, Standard, Premium e Dedicado.

|Limite|Basic|Standard|Premium|Dedicado|
|---|---|---|---|---|
|Tamanho máximo de publicação do Hubs de Eventos|256 KB|1 MB|1 MB|1 MB|
|Número de grupos de consumidores por hub de eventos|1|20|100|1.000  <br>Sem limite por CU|
|Número de grupos de consumidores do Kafka por namespace|NA|1.000|1.000|1.000|
|Número de conexões agenciadas por namespace|100|5\.000|10.000 por PU  <br>  <br>Por exemplo, se o namespace for atribuído a 3 PUs, o limite será 30.000.|100.000 por CU|
|Período de retenção máximo dos dados do evento|1 dia|7 dias|90 dias|90 dias|
|Armazenamento de eventos para retenção|84 GB por TU|84 GB por TU|1 TB por PU|10 TB por CU|
|Máximo de TUs, PUs ou CUs|40 TUs|40 TUs|16 PUs|20 CUs|
|O número de partições por hub de eventos|32|32|100 por hub de eventos, mas há um limite de 200 por PU no nível do namespace.  <br>  <br>Por exemplo, se um namespace for atribuído a 2 PUs, o limite para o número total de partições em todos os hubs de eventos no namespace será 2 * 200 = 400.|1.024 por hub de eventos  <br>2.000 por CU|
|Número de namespaces por assinatura|1.000|1.000|1.000|1.000 (50 por CU)|
|Número de hubs de eventos por namespace|10|10|100 por PU|1.000|
|Capture|N/D|Pagamento por hora|Incluso|Incluso|
|Tamanho do hub de eventos compactado|N/D|1 GB por partição|250 GB por partição|250 GB por partição|
|Tamanho do registro de esquema (namespace) em megabytes|N/D|25|100|1\.024|
|Número de grupos de esquema em um Registro ou namespace de esquema|N/D|1: excluindo o grupo padrão|100  <br>1 MB por esquema|1.000  <br>1 MB por esquema|
|Número de versões de esquema em todos os grupos de esquema|N/D|25|1,000|10.000|
|Taxa de transferência por unidade|Entrada: 1 MB/s ou 1000 eventos por segundo  <br>Saída: 2 MB/s ou 4.096 eventos por segundo|Entrada: 1 MB/s ou 1.000 eventos por segundo  <br>Saída: 2 MB/s ou 4.096 eventos por segundo|Sem limite por PU *|Sem limite por CU *|


## Lista de recursos disponiveis

|Recurso|Basic|Standard|Premium|Dedicado|
|---|---|---|---|---|
|Locação|Multilocatário|Multilocatário|Multilocatário com isolamento de recursos|Locatário único exclusivo|
|Link privado|N/D|Sim|Sim|Yes|
|Chave gerenciada pelo cliente  <br>(bring your own key)|N/D|N/D|Sim|Sim|
|Capturar|N/D|Preço definido separadamente|Incluso|Incluso|
|Expansão da partição Dinâmica|N/D|N/D|Sim|Sim|
|Eventos de entrada|Pagamento por milhão de eventos|Pagamento por milhão de eventos|Incluso|Incluso|
|Logs de auditoria de runtime|N/D|N/D|Sim|Yes|
|Availability zone|Sim|Sim|Sim|Yes|
|Desastre geográfico|N/D|Sim|Sim|Yes|
|Firewall de IP|N/D|Sim|Sim|Sim|


<h3>As camadas Standart, Premium e Dedicado oferecem suporte a zonas de disponibilidade, a Basic não oferece</h3>

## Características da Camada Premium
A camada Premium foi desenvolvida para cenários de streaming de ponta que exigem um desempenho elástico e superior.

Os Hubs de eventos na camada Premium replicam os eventos em 3 réplicas que são distribuídas entre zonas de disponibilidade.

A taxa de transferência não é definida como nas camadas Standart e Basic  e sim elásticas a depender do esforço exigido no Hub de eventos.

Oferece capacidade isolada de computação e memória para obter latência mais previsível e reduzir o risco de impacto vizinho, utilizando um modelo de cluster nos Multilocatário tendo assim um ambiente Multilocatário gerenciado.

Os Clusters da camada Premium são cobrados por PUs que correspondem a um compartilhamento de recursos isolados (CPU, memória e armazenamento) na infraestrutura subjacente. 


## Características da Camada Dedicada
A camada dedicada de Hubs de Eventos oferece vários benefícios para os clientes que precisam executar cargas de trabalho críticas em capacidade de nível empresarial.

Clusters dedicados podem transmitir eventos na escala de gigabytes por segundo ou milhões de eventos por segundo.

Os clusters dedicados dos Hubs de Eventos operam em uma arquitetura de locatário único.

Os clusters dedicados são provisionados e cobrados por CUs (unidades de capacidade), que é uma quantidade <strong>pré-alocada</strong> de recursos de CPU e memória.



