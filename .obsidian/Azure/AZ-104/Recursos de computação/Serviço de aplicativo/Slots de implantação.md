### Disponível apenas no plano Standard para cima
O Slot de implantação é uma maneira de criar ambientes de desenvolvimento no app service.

<h1>Tipos de troca de slots</h1>
<ul>
<li><strong>Troca manual: </strong>Essa troca ocorre com o usuário navegando até a página Slot de Implantação selecionando Trocar, em seguida o usuário especifica o Slot de Origem e o Slot de Destino o usuário deve especificar também as Alterações de Origem e as Alterações de Destino</li>
<li><strong>Troca com visualização: </strong>Essa troca ocorre em várias etapas com o usuário verificando as alterações e seguindo para as próximas fazes.</li>
<li><strong>Troca automática: </strong>Essa troca ocorre de forma automática quando você faz um push no Slot de Origem, essa troca é otimizada para cenários do Azure DevOps Services.</li>
</ul>
<h1>Roteamento de Trafego entre Slots</h1>
<ul>
<li><strong>Roteamento automático: </strong>É possível configurar uma porcentagem de tráfego aleatório que será redirecionado para o Slot de origem, após isso o usuário redirecionado terá a sua sessão inteiramente no ambiente de Origem.</li>
<li><strong>Roteamento Manual: </strong>É possível pelo código do usuário aceitar ou tornar opção a aceitação do ambiente de origem.</li>
</ul>
