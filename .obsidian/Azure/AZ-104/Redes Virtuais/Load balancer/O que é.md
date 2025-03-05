O Azure Load Balancer é um serviço do Azure que permite distribuir igualmente o tráfego de rede de entrada entre um grupo de VMs do Azure ou entre instâncias de um Conjunto de Dimensionamento de Máquinas Virtuais. O Load Balancer oferece alta disponibilidade e desempenho de rede das seguintes maneiras:

- As regras de balanceamento de carga determinam como o tráfego é distribuído para instâncias que compõem o back-end.
- As investigações de integridade garantem que os recursos no back-end sejam íntegros e que o tráfego não seja direcionado para instâncias de back-end não íntegras.


Você pode implantar balanceadores de carga **públicos** e balanceadores de carga **internos** (ou _privados_) no Azure:

- Os _balanceadores de carga públicos_ são usados para balancear a carga do tráfego de Internet para suas VMs. Um balanceador de carga público mapeia o endereço IP público e o número da porta do tráfego de entrada para o endereço IP privado e o número da porta das VMs do pool de back-end.
- Um _balanceador de carga interno_ direciona o tráfego para recursos que estão dentro de uma rede virtual ou que usam uma VPN para acessar a infraestrutura do Azure. Os endereços IP de front-end e as redes virtuais do balanceador de carga interno nunca são expostos diretamente a um ponto de extremidade da Internet.
