
## Filas
As mensagens são enviadas e recebidas a partir de **filas**. As filas armazenam mensagens até que o aplicativo de recebimento esteja disponível para recebê-las e processá-las., as mensagens podem com replicadas com redundância tripla se estiver ativo no namespace.

## Tópicos
Também é possível usar **tópicos** para enviar e receber mensagens. Embora uma fila seja frequentemente usada para comunicação ponto a ponto, os tópicos são úteis em cenários de publicação-assinatura.
![[Pasted image 20241230051828.png]]


## Namespaces
Um namespace é um contêiner para todos os tipos de componentes de mensagem (filas e tópicos). Um namespace pode ter uma ou mais filas e tópicos e geralmente serve como um contêiner de aplicativo.


## Sessões de mensagens
Sessões são uma forma de garantir o padrão FIFO (primeiro a entrar, primeiro a sair).


## Encaminhamento automático
O recurso **Encaminhamento automático** permite encadear uma fila ou assinatura a outra fila ou outro tópico que faça parte do mesmo namespace. Quando o encaminhamento automático está habilitado, o Barramento de Serviço remove automaticamente as mensagens colocadas na primeira fila ou assinatura (origem) e as coloca na segunda fila ou no segundo tópico (destino).

## Mensagens Mortas
As filas e as assinaturas de tópico do Barramento de Serviço fornecem uma subfila secundária chamada DLQ (fila de mensagens mortas).


## Entrega agendada
Você pode enviar mensagens para uma fila ou um tópico para processamento atrasado.

## Adiamento de mensagens
Quando um cliente de assinatura ou fila recebe uma mensagem que está disposto a processar, mas cujo processamento não é possível devido a circunstâncias especiais no aplicativo, a entidade pode adiar a recuperação da mensagem para um ponto posterior.


