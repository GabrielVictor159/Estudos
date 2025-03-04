
Você pode atribuir endereços IP aos recursos do Azure para se comunicar com outros recursos do Azure, a rede local e a Internet. Há dois tipos de endereços IP do Azure: _público_ e _privado_.

Os **endereços IP privados** permitem a comunicação em uma rede virtual do Azure e na rede local.

Os **endereços IP públicos** permitem que o recurso se comunique com a Internet.

Os endereços IP podem ser atribuídos de maneira estática ou dinâmica.


## Criar o endereçamento IP público

Você pode criar um endereço IP público para o recurso no portal do Azure.
![[Pasted image 20250223143105.png]]

- **Versão do IP**: selecione para criar um endereço **IPv4**, **IPv6** ou **Ambos**.
    
- **SKU**: selecione o SKU do endereço IP público, incluindo **Básico** ou **Standard**. O valor precisa corresponder ao SKU do Azure Load Balancer com o qual o endereço é usado.
    
- **Nome**: insira um nome para identificar o endereço IP. O nome deve ser exclusivo no grupo de recursos selecionado.
    
- **Atribuição de endereço IP**: identifique o tipo de atribuição de endereço IP a ser usado.

	- **Dinâmico** endereços dinâmicos são atribuídos depois que um endereço IP público é associado a um recurso do Azure e é iniciado pela primeira vez. Endereços dinâmicos poderão mudar se um recurso, como uma máquina virtual, for parado (desalocado) e, em seguida, reiniciado por meio do Azure.
	- Endereços **estáticos** são atribuídos quando um endereço IP público é criado. Os endereços estáticos não são liberados até que um recurso de endereço IP público seja excluído.

# Associar endereços IP públicos

A tabela a seguir resume como você pode associar endereços IP públicos a diferentes tipos de recursos.

| Recurso               | Associação de endereço IP público    | Endereço IP dinâmico | Endereço IP estático |
| --------------------- | ------------------------------------ | -------------------- | -------------------- |
| Máquina virtual       | NIC                                  | Sim                  | Sim                  |
| Balanceador de carga  | Configuração de front-end            | Sim                  | Sim                  |
| gateway de VPN        | Configuração de IP do gateway de VPN | Sim                  | Sim *****            |
| Gateway de Aplicativo | Configuração de front-end            | Sim                  | Sim *****            |

Os endereços IP estáticos estão disponíveis somente em determinados SKUs.


#### SKUs de endereço IP público

A tabela a seguir resume as diferenças entre os tipos de SKU de endereços IP públicos.

|Recurso|SKU Básico|SKU Standard|
|---|---|---|
|Atribuição de IP|Estático ou dinâmico|Estático|
|Segurança|Aberto por padrão|Seguros por padrão e fechados para o tráfego de entrada|
|Recursos|Adaptadores de rede, gateways de VPN, gateways de aplicativo e balanceadores de carga para a Internet|Adaptadores de rede ou balanceadores de carga padrão públicos|
|Redundância|Sem redundância de zona|Com redundância de zona por padrão|

# Alocar ou atribuir endereços IP privados

A tabela a seguir resume como você pode associar endereços IP privados a diferentes tipos de recursos.

| Recurso                      | Associação de endereço IP privado | Endereço IP dinâmico | Endereço IP estático |
| ---------------------------- | --------------------------------- | -------------------- | -------------------- |
| Máquina virtual              | NIC                               | Sim                  | Sim                  |
| Balanceador de carga interno | Configuração de front-end         | Sim                  | Sim                  |
| Gateway de Aplicativo        | Configuração de front-end         | Sim                  | Sim                  |

A atribuição pode ser **dinâmica** ou **estática**

