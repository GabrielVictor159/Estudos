Cada alerta ou notificação disponível no Azure Monitor é o produto de uma regra.

Não importa qual fonte de dados ou recurso de destino seja usado, a composição de uma regra de alerta permanece a mesma.

- **RECURSO**
    - O _recurso de destino_ da regra de alerta. É possível atribuir vários recursos de destino a uma só regra de alerta. O tipo de recurso define os tipos de sinais disponíveis.
- **CONDIÇÃO**
    - O _tipo de sinal_ usado para avaliar a regra. O tipo de sinal pode ser uma métrica, um log de atividades ou logs. Há outros, mas este módulo não os apresenta.
    - A _lógica de alerta_ aplicada aos dados que são fornecidos por meio do tipo de sinal. A estrutura da lógica de alerta é alterada dependendo do tipo de sinal.
- **AÇÕES**
    - A _ação_, como enviar um email, enviar uma mensagem SMS ou usar um webhook.
    - Um _grupo de ações_, que normalmente contém um conjunto exclusivo de destinatários para a ação.
- **DETALHES DO ALERTA**
    - O _nome do alerta_ e a _descrição do alerta_ que especificam a finalidade do alerta.
    - A _gravidade_ do alerta se os critérios ou o teste de lógica forem avaliados como `true`. Os cinco níveis de gravidade são:
        - **0**: Crítico
        - **1**: Erro
        - **2**: Aviso
        - **3**: Informativo
        - **4**: Detalhado

![[Pasted image 20250326215913.png]]


## Gerenciar regras de alerta

você pode especificar uma ou mais regras de alerta e habilitá-las ou desabilitá-las conforme necessário.

## Exibição de resumo do alerta
A página de alertas mostra um resumo de todos os alertas. Você pode aplicar filtros à exibição usando uma ou mais destas categorias: assinaturas, condição de alerta, gravidade ou intervalos de tempo.

![[Pasted image 20250326220435.png]]

### Condição de alerta

O sistema define a condição do alerta.

- Quando um alerta é acionado, a condição do monitor do alerta é definida como **Acionada**.
- Quando a condição subjacente que causou o alerta desaparecer, a condição do monitor será definida como **Resolvida**.

