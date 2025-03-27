Os alertas de pesquisa de logs usam dados de logs para avaliar a lógica de regra e, se necessário, disparar um alerta.

Por natureza, os dados de log são históricos e, portanto, o uso é mais concentrado na análise e nas tendências.

## Composição das regras de pesquisa de logs

Cada alerta de pesquisa de logs tem uma regra de pesquisa associada à seguinte composição:

- **Consulta de log**: Consulta que é executada sempre que a regra de alerta é acionada.
- **Período:** O intervalo de tempo da consulta.
- **Frequência**: informa a frequência de execução da consulta.
- **Limite**: Ponto de gatilho para que um alerta seja criado.

Os resultados da pesquisa de logs são de dois tipos: _número de registros_ ou _medição métrica_.
### Número de registros
Esse tipo de pesquisa de logs retorna um único alerta quando o número de registros em um resultado da pesquisa atinge ou excede o valor do número de registros (limite).
### Medida de métrica
Ao contrário dos logs de pesquisa de número de registros, os logs de medida de métrica exigem a definição de critérios adicionais:

- **Função de agregação**: O cálculo a ser feito em relação aos dados do resultado. Como exemplo, a contagem ou média. O resultado da função é chamado de **AggregatedValue**.
- **Campo Grupo**: Indica como o resultado deve ser agrupado. Esse critério é usado com o valor agregado. Por exemplo, você pode especificar que deseja obter a média agrupada por computador.
- **Intervalo**: o intervalo de tempo pelo qual os dados são agregados. Por exemplo, se você especificar 10 minutos, um registro de alerta será criado para cada bloco agregado de 10 minutos.
- **Limite**: um ponto definido por um valor agregado e pelo número total de violações.




