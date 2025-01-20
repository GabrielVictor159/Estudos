
A Rede de Distribuição de Conteúdo do Azure fornece tipos globais e personalizados de regras de cache.

- Regras globais de cache: você pode definir uma regra global de cache para cada ponto de extremidade em seu perfil, o que afeta todas as solicitações para o ponto de extremidade. A regra de cache global substitui todos os cabeçalhos de diretiva de cache HTTP, se configurado.
    
- Regras de cache personalizadas: você pode definir uma ou mais regras de cache personalizadas para cada ponto de extremidade em seu perfil. As regras de cache personalizadas correspondem a caminhos e extensões de arquivo específicos, são processadas em ordem e substituem a regra de cache global, se definida.

## Cache de Vida Util

A TTL (vida útil) é determinada pelo cabeçalho `Cache-Control` na resposta HTTP do servidor de origem.

Se você não definir uma TTL em um arquivo, a CDN do Azure definirá um valor padrão. No entanto, esse padrão poderá ser substituído se você configurou regras de cache no Azure. Os valores de TTL padrão são os seguintes:

- Otimizações generalizadas de distribuição na Web: sete dias
- Otimizações de arquivo grande: um dia
- Otimizações de streaming de mídia: um ano



## Limpeza de conteúdo
Podemos limpar o conteúdo presente no CDN usando umas dessas técnicas:

- Em um ponto de extremidade por ponto de extremidade ou em todos os pontos de extremidade simultaneamente, caso deseje atualizar tudo na CDN ao mesmo tempo.
- Especifique um arquivo, incluindo o caminho para ele ou todos os ativos no ponto de extremidade marcando a caixa de seleção **Limpar Tudo** no portal do Azure.
- Com base em caracteres curinga (*) ou usando a raiz (/).

A CLI do Azure fornece um verbo de limpeza especial que cancelará a publicação de ativos em cache de um ponto de extremidade.

```bash
az cdn endpoint purge \
    --content-paths '/css/*' '/js/app.js' \
    --name ContosoEndpoint \
    --profile-name DemoProfile \
    --resource-group ExampleGroup
```

Você também pode pré-carregar ativos em um ponto de extremidade.

```bash
az cdn endpoint load \
    --content-paths '/img/*' '/js/module.js' \
    --name ContosoEndpoint \
    --profile-name DemoProfile \
    --resource-group ExampleGroup
```


## Bloqueio geográfico
Podemos bloquear conteúdos específicos do site em regiões geográficas, a camada standart permite apenas o bloqueio inteiro do site.

