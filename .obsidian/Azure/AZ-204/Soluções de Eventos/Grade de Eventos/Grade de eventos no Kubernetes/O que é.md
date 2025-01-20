A grade de eventos no Kubernetes usando o Azure Arc é uma solução da grade de eventos para seu Cluster Kubernetes seja local ou em nuvem.


## Estrutura

![[Pasted image 20241216224505.png]]

- Um **tópico** é um tipo de canal de entrada que expõe um ponto de extremidade ao qual os publicadores enviam eventos para a Grade de Eventos.
- Uma **assinatura de evento** é um recurso que contém definições de configuração para filtrar e rotear eventos para um destino no qual os eventos são entregues.
- Um **evento** é o anúncio da alteração de estado.
- Um **manipulador de eventos** é um aplicativo ou serviço que recebe os eventos e reage ou processa os eventos de alguma maneira. Às vezes, também nos referimos a manipuladores de eventos como **assinantes de eventos**. No diagrama, os manipuladores de eventos são a API implantada em um cluster do Kubernetes (K8s) e o serviço Barramento de Serviço do Azure.
