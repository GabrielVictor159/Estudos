
O Azure dá suporte a seis maneiras diferentes de autenticar solicitações de redefinição.

Como administrador, você pode escolher os métodos a serem utilizados ao configurar o SSPR. Habilite dois ou mais desses métodos para que os usuários possam escolher os que podem utilizar facilmente. Os métodos são:

|Método de autenticação|Como registrar-se|Como autenticar-se para uma redefinição de senha|
|---|---|---|
|Notificação de aplicativo móvel|Instale o aplicativo Microsoft Authenticator no seu dispositivo móvel e, em seguida, registre-o na página de configuração da autenticação multifator.|O Azure envia ao aplicativo uma notificação que você pode verificar ou negar.|
|Código do aplicativo móvel|Este método também usa o aplicativo Authenticator e você o instala e registra da mesma maneira.|Insira o código do aplicativo.|
|Email|Forneça um endereço de email externo ao Azure e ao Microsoft 365.|O Azure envia para o endereço um código que você insere no assistente de redefinição.|
|Telefone celular|Forneça um número de telefone celular.|O Azure envia um código ao telefone por mensagem SMS, que você insere no assistente de redefinição. Você também pode optar por receber uma chamada automática.|
|Telefone comercial|Forneça um número que não seja de telefone celular.|Você recebe um telefonema automatizado nesse número e pressiona #.|
|Perguntas de segurança|Selecione perguntas como "Em que cidade sua mãe nasceu?" e salve suas respostas.|Responda às perguntas.|

**Você pode especificar o numero mínimo de autenticações**

### Contas associadas a funções de administrador

- Uma política de autenticação forte, com dois métodos, sempre é aplicada a contas com função de administrador, independentemente de sua configuração para outros usuários.
- O método de pergunta de segurança não está disponível para contas associadas a uma função de administrador.


## Configurar notificações

Os administradores podem escolher como os usuários são notificados sobre alterações de senha. Existem duas opções que você pode habilitar:

- **Notificar os usuários sobre as redefinições de senha**: o usuário que redefine a própria senha é notificado em seus endereços de email primário e secundário. Se a redefinição tiver sido feita por um usuário mal-intencionado, a notificação alertará o usuário, que poderá adotar medidas de mitigação.
- **Notificar todos os administradores quando outros administradores redefinirem as próprias senhas**: todos os administradores são notificados quando outro administrador redefine sua senha.
