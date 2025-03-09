O Observador de Rede fica disponível automaticamente quando você cria uma rede virtual em uma região do Azure na sua assinatura.

![[Pasted image 20250308215311.png]]


## Ferramenta Topologia do Observador de Rede
Todos os recursos retornados em uma topologia têm as seguintes propriedades:

- **Nome**: o nome do recurso.
- **ID**: o URI do recurso.
- **Local**: a região do Azure em que o recurso está.
- **Associações**: uma lista de associações com o objeto referenciado. Cada associação tem as seguintes propriedades:
    - **AssociationType**: faz referência à relação entre o objeto filho e o pai. Os valores válidos são `Contains` e `Associated`.
    - **Nome**: o nome do recurso referenciado.
    - **ResourceId**: o URI do recurso referenciado na associação.

## Ferramenta Monitor da Conexão
Para usar o Monitor da Conexão para monitoramento, você precisa instalar agentes de monitoramento nos hosts que são monitorados. O Monitor da Conexão usa arquivos executáveis leves para executar verificações de conectividade, se um host está localizado em uma rede virtual do Azure ou em uma rede local.
![[Pasted image 20250308215504.png]]

## Verificação de fluxo de IP
A ferramenta de verificação de fluxo IP usa um mecanismo de verificação baseado em parâmetros de pacote de 5 tuplas para detectar se os pacotes de entrada ou saída são permitidos ou negados de uma VM.
## Próximo salto
O próximo salto também retorna a tabela de rotas associada ao próximo salto. Se a rota for especificada como sendo definida pelo usuário, ela será retornada. Caso contrário, o próximo salto retornará `System Route`.

## Regras de segurança ativas
Os grupos de segurança de rede (NSGs) filtram pacotes com base em seus endereços IP de origem e destino e números de porta.

## Captura de pacotes
A captura de pacotes pode ser acionada por meio do portal, do PowerShell, do CLI do Azure ou da API REST. O Observador de Rede permite configurar filtros para a sessão de captura para garantir a captura do tráfego que deseja monitorar.

Os dados capturados são armazenados no disco local ou em um blob de armazenamento.

## Solução de problemas na conexão

Se a conexão for bem-sucedida, serão exibidas informações sobre a comunicação, incluindo:

- A latência em milissegundos.
- O número de pacotes de investigação enviados.
- O número de saltos na rota completa até o destino.

Se a conexão não for bem-sucedida, a ferramenta exibirá detalhes sobre a falha. Você pode observar os seguintes tipos de falha:

- **CPU**: a conexão falhou devido à alta utilização da CPU.
- **Memory**: a conexão falhou devido à alta utilização de memória.
- **GuestFirewall**: um firewall fora do Azure bloqueou a conexão.
- **DNSResolution**: não foi possível resolver o endereço IP de destino.
- **NetworkSecurityRule**: um NSG bloqueou a conexão.
- **UserDefinedRoute**: há uma rota de usuário incorreta em uma tabela de roteamento.

## Solução de problemas de VPN
O recurso pode ser chamado por meio do portal, do PowerShell, do CLI do Azure ou da API REST. Quando chamado, o Observador de Rede diagnostica a integridade do gateway ou da conexão e retorna os resultados apropriados.

A lista a seguir descreve os valores que são retornados chamando a API de solução de problemas de VPN:

- **startTime**: a hora em que a solução de problemas foi iniciada.
- **endTime**: a hora em que a solução de problemas foi encerrada.
- **code**: esse valor será `UnHealthy` se houver uma falha de diagnóstico.
- **resultados**: uma coleção de resultados retornados na conexão ou no gateway de rede virtual.
    - **id**: o tipo de falha.
    - **summary**: um resumo da falha.
    - **detailed**: uma descrição detalhada da falha.
    - **recommendedActions**: uma coleção de ações recomendadas a serem tomadas.
    - **actionText**: texto que descreve a ação a ser tomada.
    - **actionUri**: o URI para a documentação que descreve a ação a ser tomada.
    - **actionUriText**: uma breve descrição do texto da ação.
