As rotas do sistema podem tornar mais fácil para você colocar seu ambiente em funcionamento rapidamente. No entanto, há muitos cenários em que é recomendável controlar mais de perto o fluxo de tráfego em sua rede.

Você tem duas opções para implementar rotas personalizadas: criar uma rota definida pelo usuário ou usar um BGP (Border Gateway Protocol) para trocar rotas entre redes locais e do Azure.


### Rotas definidas pelo usuário
Você pode usar uma rota definida pelo usuário para substituir as rotas do sistema padrão para que o tráfego possa ser roteado por meio de firewalls ou de NVAs.

Ao criar rotas definidas pelo usuário, você pode especificar esses tipos de próximo salto:

- **Solução de virtualização**: Você pode especificar o endereço IP privado de uma Placa de Interface de Rede (NIC) anexada a uma máquina virtual para que o encaminhamento de IP possa ser habilitado. Ou você pode fornecer o endereço IP privado de um balanceador de carga interno.
- **Gateway de rede virtual**: use-o para indicar quando você quer que as rotas para um endereço específico sejam roteadas para um gateway de rede virtual. O gateway de rede virtual é especificado como um VPN para o tipo de próximo salto.
- **Rede virtual**: use esse tipo de próximo salto para substituir a rota do sistema padrão dentro de uma rede virtual.
- **Internet**: use para rotear o tráfego para um prefixo de endereço especificado que é roteado para a Internet.
- **Nenhum**: use para descartar o tráfego enviado para um prefixo de endereço especificado.


### Border Gateway Protocol
BGP é o protocolo de roteamento padrão que normalmente é usado para trocar informações de roteamento entre duas ou mais redes.
![[Pasted image 20250304104148.png]]

O BGP oferece estabilidade de rede porque os roteadores poderão alterar rapidamente as conexões para enviar pacotes se um caminho de conexão ficar inativo.


