A entrega de eventos da Grade de Eventos do Azure tenta entregar o evento pelo menos uma vez, se não for confirmado a entrega ou houver uma falha a grade de eventos seguira uma agenda de repetição.

Após a falha na entrega se o ponto de extremidade ainda existir o evento será armazenado como uma mensagem morta e caso o ponto de extremidade não exista mais o evento será eliminado.

## Agenda de repetição
Erros não cobertos:
<table border="1">
    <thead>
        <tr>
            <th>Tipo de Ponto de Extremidade</th>
            <th>Códigos do Erro</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Recursos do Azure</td>
            <td>400 Solicitação Inválida, 413 Entidade de Solicitação Muito Grande, 403 Proibido</td>
        </tr>
        <tr>
            <td>webhook</td>
            <td>400 Solicitação Inválida, 413 Entidade de Solicitação Muito Grande, 403 Proibido, 404 Não Localizado, 401 Não Autorizado</td>
        </tr>
    </tbody>
</table>

Se o erro for coberto pela agenda de repetição será feita uma nova tentativa após 30 segundos, se não for entrega será colocado em uma fila de repetição para novas tentativas.

À medida que um ponto de extremidade experimenta falhas na entrega, a Grade de Eventos começa a atrasar a entrega e a repetição de eventos para esse ponto de extremidade.


## Politica de Repetição
Você pode personalizar a política de repetição ao criar uma assinatura de evento usando as duas configurações a seguir. Um evento é descartado se qualquer um dos limites da política de repetição for atingido.

- **Número máximo de tentativas** – o valor precisa ser um número inteiro entre 1 e 30. O valor padrão é 30.
- **TTL (vida útil do evento)** - O valor precisa ser um número inteiro entre 1 e 1440. O valor padrão é 1440 minutos

O exemplo a seguir mostra como definir o número máximo de tentativas para 18 usando o CLI do Azure.

```bash
az eventgrid event-subscription create \
  -g gridResourceGroup \
  --topic-name <topic_name> \
  --name <event_subscription_name> \
  --endpoint <endpoint_URL> \
  --max-delivery-attempts 18
```

## Armazenamento de mensagens mortas
Por padrão a Grade de eventos não armazena as mensagens, porém podemos ativar essa opção precisamos associar uma **Conta de Armazenamento** para armazenar esses eventos em um **Blob Storage**.


