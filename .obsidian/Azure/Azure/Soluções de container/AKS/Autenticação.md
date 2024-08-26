
Os Aplicativos de Contêiner do Azure fornecem recursos internos de autenticação e autorização para proteger o aplicativo de contêiner habilitado para entrada externa com código mínimo ou sem código.

![[Pasted image 20240825182316.png]]

O middleware de plataforma lida com várias coisas para seu aplicativo:

- Autentica usuários e clientes com os provedores de identidade especificados
- Gerencia a sessão autenticada
- Injeta informações de identidade em cabeçalhos da solicitação
## Fluxo de autenticação

O fluxo de autenticação é o mesmo para todos os provedores, mas difere dependendo se você deseja entrar com o SDK do provedor:

- **Sem o SDK do provedor** (fluxo direcionado pelo servidor ou fluxo de servidor): o aplicativo delega a entrada federada aos Aplicativos de Contêiner. A delegação é normalmente o caso de aplicativos de navegador, que apresentam a página de entrada do provedor ao usuário.
    
- **Com o SDK do provedor** (fluxo direcionado pelo cliente ou fluxo de cliente): o aplicativo conecta os usuários ao provedor manualmente e, em seguida, envia o token de autenticação aos Aplicativos de Contêiner para validação. Essa abordagem é típica para aplicativos sem navegador que não apresentam a página de entrada do provedor ao usuário. Um exemplo é um aplicativo móvel nativo que conecta usuários usando o SDK do provedor.
