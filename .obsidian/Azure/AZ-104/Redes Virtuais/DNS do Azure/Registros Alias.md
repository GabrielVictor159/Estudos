## O que é um domínio apex?
O domínio apex representa o nível mais alto do seu domínio. Em nosso caso, é o wideworldimports.com. O domínio apex às vezes também é chamado de _apex da zona_ ou _apex raiz_ O símbolo **@** geralmente representa o domínio apex em seus registros de zona DNS.

## O que são registros de alias?
Os registros de alias do Azure habilitam um domínio apex de zona a fazer referência a outros recursos do Azure da zona DNS. Você não precisa criar políticas de redirecionamento complexas.

O registro de alias do Azure pode apontar para os seguintes recursos do Azure:

- Um perfil do Gerenciador de Tráfego
- Pontos de extremidade da Rede de Distribuição de Conteúdo do Azure
- Um recurso de IP público
- Um perfil de Front Door

Registros de alias fornecem acompanhamento do ciclo de vida dos recursos de destino, garantindo que as alterações em qualquer recurso de destino sejam aplicadas automaticamente à zona DNS.

O conjunto de registros de alias é compatível com os seguintes tipos de registro zona DNS:

- **A**: o registro de mapeamento de nome de domínio do IPv4.
- **AAAA**: o registro de mapeamento de nome de domínio do IPv6.
- **CNAME**: o alias do seu domínio, que é vinculado ao registro A.
