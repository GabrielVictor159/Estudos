Os grupos de segurança de rede são uma maneira de limitar o tráfego de rede para recursos em uma rede virtual. Os grupos de segurança de rede contém uma lista de regras de segurança que permitem ou negam o tráfego de rede de entrada ou de saída.

- Um grupo de segurança de rede contém uma lista de regras de segurança que permitem ou negam o tráfego de rede de entrada ou de saída.
    
- Um grupo de segurança de rede pode ser associado a uma sub-rede ou a um adaptador de rede.
    
- Um grupo de segurança de rede pode ser associado várias vezes.
    
- Você cria um grupo de segurança de rede e define regras de segurança no portal do Azure.

#### Grupos de segurança de rede e sub-redes

Você pode atribuir grupos de segurança de rede a uma sub-rede e criar uma sub-rede filtrada protegida (também conhecida como zona desmilitarizada ou _DMZ_). Uma DMZ atua como um buffer entre recursos na rede virtual e na Internet.

- Use o grupo de segurança de rede para restringir o fluxo de tráfego a todos os computadores que residem na sub-rede.
    
- Cada sub-rede pode ter no máximo um grupo de segurança de rede associado.
    

#### Grupos de segurança de rede e adaptadores de rede

Você pode atribuir grupos de segurança de rede a um adaptador de rede.

- Defina regras de grupo de segurança de rede para controlar todo o tráfego que flui por meio de um adaptador de rede.
    
- Cada adaptador de rede que existe em uma sub-rede pode ter um grupo de segurança de rede associado ou nenhum.

