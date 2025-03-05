O tráfego de rede no Azure é roteado automaticamente entre sub-redes do Azure, redes virtuais e redes locais. As rotas do sistema controlam esse roteamento.

Não é possível criar ou excluir rotas do sistema, mas é possível substituir as rotas do sistema adicionando rotas personalizadas para controlar o fluxo de tráfego para o próximo salto.

Cada sub-rede tem as rotas do sistema padrão a seguir:

|Prefixo de endereço|Tipo do próximo salto|
|---|---|
|Exclusivo para a rede virtual|Rede virtual|
|0.0.0.0/0|Internet|
|10.0.0.0/8|Nenhum|
|172.16.0.0/12|Nenhum|
|192.168.0.0/16|Nenhum|
|100.64.0.0/10|Nenhum|

A coluna **Tipo do próximo salto** mostra o caminho de rede usado pelo tráfego enviado a cada prefixo de endereço. O caminho pode ser um dos seguintes tipos de salto:

- **Rede virtual**: Uma rota é criada no prefixo de endereço. O prefixo representa cada intervalo de endereços criado no nível de rede virtual. Se vários intervalos de endereços forem especificados, várias rotas serão criadas para cada intervalo de endereços.
- **Internet**: A rota do sistema padrão de 0.0.0.0/0 roteia qualquer intervalo de endereços para a Internet, a menos que você substitua a rota padrão do Azure por uma rota personalizada.
- **Nenhum**: O tráfego roteado para esse tipo do salto é removido e não é roteado fora da sub-rede. Por padrão, os seguintes prefixos de endereço IP IPv4 privados são criados: 10.0.0.0/8, 172.16.0.0/12 e 192.168.0.0/16. O prefixo 100.64.0.0/10 para um espaço de endereço compartilhado também é adicionado. Nenhum desses intervalos de endereços é roteável globalmente.

![[Pasted image 20250304101948.png]]


### Ponto de extremidade de serviço de rede virtual
Os pontos de extremidade de rede virtual estendem seu espaço de endereço privado no Azure, fornecendo uma conexão direta com os recursos do Azure.

À medida que você habilita os pontos de extremidade de serviço, o Azure cria rotas na tabela de rotas para direcionar esse tráfego.

## Seleção e prioridade de rotas
Se houver várias rotas com o mesmo prefixo de endereço, o Azure seleciona a rota com base em seu tipo, na seguinte ordem de prioridade:

1. Rotas definidas pelo usuário
2. Rotas BGP
3. Rotas do sistema


