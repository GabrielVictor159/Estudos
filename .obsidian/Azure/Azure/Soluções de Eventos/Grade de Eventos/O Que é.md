A Grade de Eventos do Azure é um agente de eventos sem servidor que você pode usar para integrar aplicativos usando evento.

![[Pasted image 20240826064547.png]]

## Conceitos da Grade de Eventos do Azure

Há cinco conceitos na Grade de Eventos do Azure que você precisa entender antes de começar:

- **Eventos**: o que aconteceu.
- **Origens do evento** - Onde o evento ocorreu.
- **Tópicos**: o ponto de extremidade onde os publicadores enviam eventos, existem os **tópicos do sistema** que são tópicos padrões criados automaticamente pelo publicar e podem ser assinados, e existem os ***tópicos personalizados*** que são criados pelo publicar.
- **Assinaturas de evento**: o ponto de extremidade ou o mecanismo interno para encaminhar eventos, às vezes, para mais de um manipulador. As assinaturas também são usadas por manipuladores para filtrar de forma inteligente os eventos de entrada.
- **Manipuladores de eventos**: o aplicativo ou serviço que reage ao evento.



