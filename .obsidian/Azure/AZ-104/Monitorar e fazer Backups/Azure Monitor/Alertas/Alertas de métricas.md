No Azure Monitor, você pode usar alertas de métrica para efetuar o monitoramento regular de limites dos recursos do Azure. O Azure Monitor executa as condições de gatilhos de alertas de métrica em intervalos regulares. Quando a avaliação é verdadeira, o Azure Monitor envia uma notificação.

Você deve definir o tipo de análise estatística a ser usado com alertas de métrica estáticos ou dinâmicos.

### Usar alertas de métrica de limite estático
Os alertas de métrica estáticos baseiam-se em condições e limites estáticos simples definidos. Com as métricas estáticas, você especifica o limite usado para disparar o alerta ou a notificação.

### Usar alertas de métrica de limite dinâmico
Os alertas de métrica dinâmicos usam as ferramentas de aprendizagem de máquina fornecidas pelo Azure para melhorar automaticamente a precisão dos limites definidos pela regra inicial.

Não há limite rígido nas métricas dinâmicas. No entanto, você precisa definir mais dois parâmetros:

- O _período de retrocesso_ define quantos períodos anteriores precisam ser avaliados. Por exemplo, se você definir o período de retrocesso como três, no exemplo usado aqui, o intervalo de dados avaliado será de 30 minutos (três conjuntos de 10 minutos).
    
- O _número de violações_ expressa quantas vezes a condição de lógica precisa se desviar do comportamento esperado antes que a regra de alerta dispare uma notificação. Neste exemplo, se você definir o número de violações como dois, o alerta só será disparado após dois desvios do limite calculado

