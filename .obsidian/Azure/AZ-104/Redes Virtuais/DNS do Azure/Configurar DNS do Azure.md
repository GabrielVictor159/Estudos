### Etapa 1: criar uma zona DNS no Azure
Para hospedar o nome de domínio com o DNS do Azure, primeiro você precisa criar uma zona DNS para esse domínio. Uma zona DNS contém todas as entradas DNS para o seu domínio.

![[Pasted image 20250302183240.png]]


### Etapa 2: obter seus servidores de nome DNS do Azure

você precisa obter os detalhes do servidor de nomes do registro de NS (Servidores de Nomes ). Você usará esses detalhes para atualizar as informações do seu registrador de domínios e apontar para a zona DNS do Azure.

![[Pasted image 20250302183815.png]]
### Etapa 3: atualizar a configuração do registrador de domínios
No aplicativo de gerenciamento do domínio, edite o registro de NS e altere os detalhes do NS para corresponder aos detalhes do seu servidor DNS do Azure.

### Etapa 4: verificar a delegação de serviços de nome de domínio
Para verificar o sucesso da delegação de domínio, consulte o registro SOA (Início de Autoridade). O registro SOA é criado automaticamente quando a zona DNS do Azure é configurada. Verifique o registro SOA usando uma ferramenta como nslookup.

O registro SOA representa seu domínio e se torna o ponto de referência quando outros servidores DNS estiverem pesquisando pelo seu domínio na Internet.

```bash
nslookup -type=SOA wideworldimports.com
```

### Etapa 5: definir suas configurações de DNS personalizadas
Após definir o DNS do Azure como o servidor de nomes através do processo de delegação de serviços você pode editar as configurações do domínio para apontar para o seu serviço.

## Configurar uma zona DNS privada
As zonas DNS privadas não são visíveis na Internet e não exigem que você use um registrador de domínios.

### Etapa 1: Criar uma zona DNS privada
Para criar a zona privada, você precisará inserir um grupo de recursos e o nome da zona.
![[Pasted image 20250302184655.png]]

### Etapa 2: identificar redes virtuais
Identifique as redes virtuais associadas às VMs que precisam de suporte para a resolução de nomes.
### Etapa 3: vincular sua rede virtual a uma zona DNS privada
Para vincular a zona DNS privado a uma rede virtual, você deverá criar um link de rede virtual. No portal do Azure, acesse a zona privada e selecione **Links de rede virtual**.
![[Pasted image 20250302184934.png]]

Selecione **Adicionar** para escolher a rede virtual que deseja vincular à zona privada
![[Pasted image 20250302185134.png]]
