As VMs têm vários elementos que são necessários para fazer seu trabalho:

- A VM propriamente dita
- Discos para armazenamento
- Rede virtual
- Adaptador de rede para se comunicar na rede
- Um NSG (Grupo de Segurança de Rede) para proteger o tráfego de rede
- Um endereço IP (público, privado ou ambos)

O Azure criará todos esses recursos, se necessário, ou você poderá fornecer recursos existentes durante o processo de implantação.

## Tipos de cargas de trabalho
- **Uso geral**: Ideal para cargas de trabalho equilibradas em termos de CPU e memória, como servidores web ou pequenos bancos de dados.
- **Computação otimizada**: Focado em desempenho de CPU, perfeito para dispositivos de rede, servidores de aplicativos e outras tarefas que exigem alta capacidade de processamento.
- **Otimizado para memória**: Projetado para cargas de trabalho que demandam muita memória, como grandes bancos de dados ou análises em tempo real.
- **Otimizado para armazenamento**: Adequado para aplicações que precisam de alta taxa de transferência de dados e armazenamento em disco, como grandes sistemas de gerenciamento de dados.


## Rede
As VNETs (redes virtuais) são usadas no Azure para fornecer conectividade privada entre Máquinas Virtuais do Azure e outros serviços do Azure. As VMs e os serviços que fazem parte da mesma rede virtual podem se acessar mutuamente.

Você poderá criar uma ou mais sub-redes para a rede virtual. Você cria essas sub-redes para dividir a rede em seções mais gerenciáveis. Por exemplo, você pode atribuir 10.1.0.0 às VMs, 10.2.0.0 para serviços de back-end e 10.3.0.0 para VMs do SQL Server.

### Proteger a rede
Por padrão, não há limite de segurança entre sub-redes. No entanto, você pode configurar NSGs (Grupos de Segurança de Rede), que permitem controlar o fluxo de tráfego entre sub-redes e VMs.

### Nome da VM
O nome da VM é usado como o nome do computador, que está configurado como parte do sistema operacional. Você pode especificar um nome com até 64 caracteres em uma VM do Linux e 15 caracteres em uma VM do Windows.

## Local da VM
Ao criar e implantar uma máquina virtual, você precisará selecionar uma região para alocar os recursos.

## Tamanho da VM
O Azure oferece diferentes _tamanhos de VM_ com variações desses elementos em tamanhos diferentes.

O Azure permite que você altere o tamanho da VM quando o tamanho existente deixa de atender às suas necessidades. Você pode fazer upgrade ou downgrade da VM, desde que a configuração de hardware atual seja permitida no novo tamanho.

## Modelo de preço
Há dois tipos de custo separados para cada VM na assinatura: computação e armazenamento.

**Custos de computação**: as despesas de computação são precificadas por hora, mas cobradas por minuto.  Você não será cobrado pela capacidade de computação se parar e desalocar a VM.

As instâncias baseadas em Linux são mais baratas porque não há nenhum custo de licença de sistema operacional.

Existem duas camadas de serviço para os custos de computação:

| Opção                                        | Descrição                                                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Pago conforme o uso**                      | Com a opção **pagamento conforme o uso**, você paga pela capacidade de computação por segundo, sem compromisso de longo prazo nem pagamentos antecipados.                                                                                                                                                                                                                                                              |
| **Instâncias de Máquina Virtual Reservadas** | A opção de RI (Instâncias de Máquina Virtual Reservadas) é uma compra antecipada de uma máquina virtual por um ou três anos em uma região especificada. O compromisso é feito com antecedência e, em troca, você obtém uma economia de até 72% em comparação com o preço de pagamento conforme o uso. As **RIs** são flexíveis e podem ser trocadas ou devolvidas com facilidade para uma taxa de rescisão antecipada. |
**Custos de armazenamento**: você será cobrado separadamente pelo armazenamento usado pela VM.

### Armazenamento da VM
Todas as máquinas virtuais do Azure têm, pelo menos, dois VHDs (discos rígidos virtuais). O primeiro disco armazena o sistema operacional e o segundo é usado como armazenamento temporário. Você deve adicionar discos de dados adicionais para armazenar dados do aplicativo.

Há cinco tipos de disco, cada tipo destina-se a atender um cenário específico de cliente:

|                                               | Disco Ultra            | SSD Premium v2 | SSD Premium | SSD Standard | HDD Standard |
| --------------------------------------------- | ---------------------- | -------------- | ----------- | ------------ | ------------ |
| Tipo de disco                                 | SSD                    | SSD            | SSD         | SSD          | HDD          |
| Tamanho máximo do disco                       | 65.536 GiB (gibibytes) | 65.536 GiB     | 32.767 GiB  | 32.767 GiB   | 32.767 GiB   |
| Taxa de transferência máxima                  | 4\.000 MB/s            | 1\.200 MB/s    | 900 MB/s    | 750 MB/s     | 500 MB/s     |
| IOPS Máxima                                   | 160.000                | 80.000         | 20.000      | 6.000        | 2.000        |
| Utilizável como disco do sistema operacional? | No                     | No             | Sim         | Sim          | Sim          |


## Processo de criação

- Selecione a maquina virtual na criação de recursos:
![[Pasted image 20250322071041.png]]

. Você devera informar os parâmetros de configuração, na versão  basica temos esses:

|Configuração|Valor|
|---|---|
|**Detalhes do projeto**||
|Subscription|Assinatura do Concierge|
|Grupo de recursos|Selecione **[nome do grupo de recursos da área restrita]** na lista suspensa|
|**Detalhes da instância**||
|Nome da máquina virtual|Insira _test-ubuntu-cus-vm_|
|Região|Na lista suspensa, selecione uma localização geográfica próxima de você.|
|Opções de disponibilidade|Nenhuma redundância de infraestrutura necessária|
|Tipo de segurança|Standard|
|Imagem|Ubuntu Server 24.04 LTS - Gen2|
|Arquitetura de VMs;|x64|
|Executar com desconto de Spot do Azure|Desmarcado|
|Tamanho|Standard D2s V3|
|**Conta de administrador**||
|Tipo de autenticação|Chave pública SSH|
|Nome de Usuário|Insira um nome de usuário|
|Origem de chave pública SSH|Gerar um novo par de chaves|
|Nome do par de chaves|**test-ubuntu-cus-vm_key**|
|**Regras de porta de entrada**||
|Porta de entrada públicas|Permitir portas selecionadas|
|Selecione as portas de entrada|SSH (22)|

. Após criar o recurso na pagina **Visão geral** você poderá encontrar informações sobre a VM como o endereço de IP:

![[Pasted image 20250322071338.png]]

## Criando utilizando CLI

```bash
az vm create --resource-group TestResourceGroup --name test-wp1-eus-vm --image Ubuntu2204 --admin-username azureuser --generate-ssh-keys
```

## Criando utilizando o powershell

```shell
New-AzVm -ResourceGroupName "TestResourceGroup" -Name "test-wp1-eus-vm" -Location "East US" -Image Debian11 -VirtualNetworkName "test-wp1-eus-network" -SubnetName "default" -SecurityGroupName "test-wp1-eus-nsg" -PublicIpAddressName "test-wp1-eus-pubip" -GenerateSshKey -SshKeyName myPSKey
    -OpenPorts 22
```

## Criando utilizando o SDK no .NET

```c#
var azure = Azure
    .Configure()
    .WithLogLevel(HttpLoggingDelegatingHandler.Level.Basic)
    .Authenticate(credentials)
    .WithDefaultSubscription();
// ...
var vmName = "test-wp1-eus-vm";

azure.VirtualMachines.Define(vmName)
    .WithRegion(Region.USEast)
    .WithExistingResourceGroup("TestResourceGroup")
    .WithExistingPrimaryNetworkInterface(networkInterface)
    .WithLatestWindowsImage("MicrosoftWindowsServer", "WindowsServer", "2012-R2-Datacenter")
    .WithAdminUsername("jonc")
    .WithAdminPassword("aReallyGoodPasswordHere")
    .WithComputerName(vmName)
    .WithSize(VirtualMachineSizeTypes.StandardDS1)
    .Create();
```


## Desligamento automático
O desligamento automático é um recurso no Azure que permite desligar automaticamente suas VMs em um agendamento.
![[Pasted image 20250322071709.png]]
