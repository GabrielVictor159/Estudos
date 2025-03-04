O DNS do Azure é um serviço de hosting para domínios do Sistema de Nomes de Domínio (DNS) que fornece resolução de nomes usando a infraestrutura do Microsoft Azure.

## Como funciona o DNS?

Um servidor DNS executa uma das duas funções principais:

- Mantém um cache local de nomes de domínio acessados ou usados recentemente e seus respectivos endereços IP. Esse cache fornece uma resposta mais rápida a uma solicitação de pesquisa de domínio local. Se o servidor DNS não puder localizar o domínio solicitado, ele passará a solicitação para outro servidor DNS. Esse processo se repete para cada servidor DNS, até que seja encontrada uma correspondência ou o tempo limite de pesquisa seja atingido.
- Mantém o banco de dados de par chave-valor de endereços IP e qualquer host ou subdomínio sobre o qual o servidor DNS tenha autoridade. Essa função, muitas vezes, está associada ao email, à Web e a outros serviços de domínio da Internet.

### Tipos de registro DNS

As informações de configuração do servidor DNS são armazenadas em arquivo em uma zona do seu servidor DNS. Cada arquivo é chamado de um registro. Os seguintes tipos de registro são os mais comumente criados e usados:

- **A** é o registro do host e o tipo mais comum de registro DNS. Ele mapeia o nome do domínio ou do host para o endereço IP.
- **CNAME** é um registro de nome canônico usado para criar um alias de um nome de domínio para outro. Se você tivesse diferentes nomes de domínio que acessassem o mesmo site, você deveria usar o CNAME.
- **MX** é o registro de troca de email. Ele mapeia as solicitações de email para seu servidor de email, quer seja hospedado no local ou na nuvem.
- **TXT** é o registro de texto. Ele é usado para associar cadeias de caracteres de texto a um nome de domínio. O Azure e o Microsoft 365 usam registros TXT para verificar a propriedade do domínio.

### Conjuntos de registros
Um conjunto de registros permite que vários recursos sejam definidos em um só registro. Por exemplo, aqui está um registro A que tem um domínio com dois endereços IP:

```
www.wideworldimports.com.     3600    IN    A    127.0.0.1
www.wideworldimports.com.     3600    IN    A    127.0.0.2
```
os registros SOA e CNAME não podem conter conjuntos de registros.

## O que é o DNS do Azure?
O DNS do Azure age como o SOA para o domínio.
Você não pode usar o DNS do Azure para registrar um nome de domínio; você precisa registrá-lo usando um registrador de domínios de terceiros.


### Recursos de segurança

O DNS do Azure oferece os recursos de segurança a seguir:

- Controle de acesso baseado em função, que oferece um controle refinado sobre o acesso dos usuários aos recursos do Azure. Você pode monitorar seu uso e controlar os recursos e serviços aos quais ele tem acesso.
- Logs de atividades, que permitem que você controle as alterações a um recurso e identifique em que local ocorreram eventuais falhas.
- Bloqueio de recursos, que fornece um nível maior de controle para restringir ou remover o acesso a grupos de recursos, assinaturas ou quaisquer recursos do Azure.

### Domínios privado
O DNS do Azure permite criar zonas privadas. Essas zonas fornecem resolução de nomes para máquinas virtuais (VMs) dentro de uma rede virtual e entre redes virtuais sem a necessidade de criar uma solução DNS personalizada.

