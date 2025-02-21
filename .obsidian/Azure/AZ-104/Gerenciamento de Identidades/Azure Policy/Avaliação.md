Um benefício significativo do Azure Policy é o insight e os controles que ele fornece sobre os recursos em uma assinatura ou grupo de gerenciamento de assinaturas.

## Gatilhos de avaliação

As avaliações das políticas e iniciativas atribuídas acontecem como resultado de vários eventos:

- Uma política ou iniciativa é atribuída recentemente a um escopo
- Uma política ou iniciativa já atribuída a um escopo é atualizada
- Um recurso é implantado ou atualizado em um escopo com uma atribuição por meio do Azure Resource Manager, da API REST ou de um SDK com suporte
- Uma assinatura (tipo de recurso Microsoft.Resources/subscriptions) é criada ou movida em uma hierarquia de grupo de gerenciamento com uma definição de política atribuída que tem como destino o tipo de recurso de assinatura
- Uma isenção de política é criada, atualizada ou excluída
- Ciclo de avaliação de conformidade padrão
- O provedor de recursos de configuração do computador é atualizado com detalhes de conformidade por um recurso gerenciado
- Varredura por solicitação

## Calendário de avaliação
As verificações de conformidade por meio de políticas do Azure são disparadas por vários métodos:

- **Verificação completa automática** - Uma verificação de conformidade completa é acionada automaticamente a cada 24 horas.
- **Verificação manual para cenários Brownfield** – nos casos em que uma nova política é aplicada a recursos existentes (cenários Brownfield), você pode disparar manualmente uma verificação de conformidade executando _az policy state trigger-check_.

Quando você atribui uma nova política, pode ocorrer um atraso na entrada em vigor da política, que pode ser de até 30 minutos. O cache do Azure Resource Manager contém dados de sessão e pode levar algum tempo para que a política se propague na mesma sessão.


## Estados de conformidade de recursos
- **Não compatível**
- **Dócil**
- **Erro** (para erro de modelo ou avaliação)
- **Conflitante** (duas ou mais atribuições de política no mesmo escopo com regras contraditórias, como duas políticas anexando a mesma tag com valores diferentes)
- **Protected** (recurso coberto por uma atribuição com um efeito _denyAction_)
- **Isento Desconhecido** (estado padrão para definições com efeito _manual_)

A porcentagem de conformidade é determinada dividindo os recursos **Compatível**, **Isento** e **Desconhecido** pelo total de recursos.

## Modo de Aplicação
_enforcementMode_ é uma propriedade de uma atribuição de política que permite desativar a imposição de determinados efeitos de política. Esse modo permite que você teste o resultado da política em recursos existentes sem iniciar o efeito da política ou disparar entradas no [log de atividades do Azure](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/platform-logs-overview). O _enforcementMode_ pode ser alterado para Enabled depois que a política for completamente testada.

A tabela a seguir descreve os valores dessa propriedade.

Expandir a tabela

| Modo       | Valor JSON   | Tipo  | Corrigir manualmente | Entrada do registro de atividades | Descrição                                                                       |
| ---------- | ------------ | ----- | -------------------- | --------------------------------- | ------------------------------------------------------------------------------- |
| Habilitado | Default      | corda | Sim                  | Sim                               | O efeito da política é imposto durante a criação ou atualização do recurso.     |
| Desativado | DoNotEnforce | corda | Sim                  | Não                               | O efeito da política não é imposto durante a criação ou atualização do recurso. |
|            |              |       |                      |                                   |                                                                                 |

## Reagindo a alterações de estado da política

Os eventos do Azure Policy permitem que os aplicativos reajam às alterações de estado.

![[Pasted image 20250220160827.png]]
