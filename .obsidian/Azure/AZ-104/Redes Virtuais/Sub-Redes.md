As sub-redes são uma forma de implementar divisões lógicas na rede virtual. A rede pode ser segmentada em sub-redes para aprimorar a segurança, aumentar o desempenho e facilitar o gerenciamento.

- Cada sub-rede contém um intervalo de endereços IP que se encaixam no espaço de endereço da rede virtual.
    
- O intervalo de endereços de uma sub-rede precisa ser exclusivo no espaço de endereço da rede virtual.
    
- O intervalo de uma sub-rede não pode se sobrepor a outros intervalos de endereço IP de sub-rede na mesma rede virtual.
    
- O espaço de endereços IP de uma sub-rede precisa ser especificado usando a notação CIDR.
    
- Você pode segmentar uma rede virtual em uma ou mais sub-redes no portal do Azure. As características sobre os endereços IP das sub-redes estão listadas.

![[Pasted image 20250223134957.png]]


#### Endereços reservados

Para cada sub-rede, o Azure reserva cinco endereços IP. Os quatro primeiros endereços e o último endereço são reservados.

Vamos examinar os endereços reservados no intervalo de endereços IP `192.168.1.0/24`.

Expandir a tabela

|Endereço reservado|Motivo|
|---|---|
|`192.168.1.0`|Esse valor identifica o endereço da rede virtual.|
|`192.168.1.1`|O Azure configura esse endereço como o gateway padrão.|
|`192.168.1.2` _e_ `192.168.1.3`|O Azure mapeia esses endereços IP do DNS do Azure para o espaço de rede virtual.|
|`192.168.1.255`|Esse valor fornece o endereço de difusão da rede virtual.|

