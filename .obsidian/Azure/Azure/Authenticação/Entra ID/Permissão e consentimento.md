

<h1>Tipos de consentimentos</h1>
<ul>
<li><strong>Acesso Delegado:</strong> O Aplicativo atua em nome de um usuário conectado, exigindo permissão delegada</li>
<li><strong>Acesso Somente ao Aplicativo:</strong> O Aplicativo opera sem um usuário conectado, utilizando permissão de aplicativo.</li>
<li><strong>Consentimento:</strong> Usuários ou administradores autorizam o aplicativo a acessar recursos protegidos.</li>
<li><strong>Pre-autorização:</strong> Permite que proprietários de aplicativos concedam permissões sem solicitar consentimento dos usuários.</li>
</ul>


<h1>Acesso Delegado</h1>
 Permite que um aplicativo acesse recursos em nome do usuário conectado, ideal para cenários onde o usuário precisa interagir diretamente com os dados.
 
- **Quando Usar**: Útil para ações do usuário, como visualizar arquivos no OneDrive ou selecionar revisores em um aplicativo de negócios.
- **Princípio de Privilégios Mínimos**: Solicite apenas os escopos necessários para minimizar riscos de segurança.
- **Autorização Necessária**: Tanto o aplicativo quanto o usuário precisam estar autorizados para acessar os recursos desejados.

<h1>Acesso somente ao aplicativo</h1>
Permite que um aplicativo acesse recursos diretamente usando sua própria identidade, sem a necessidade de interação do usuário.

- **Configuração de permissões**: As permissões necessárias devem ser configuradas no registro do aplicativo e requerem consentimento do administrador.
- **Princípio de privilégios mínimos**: Solicite apenas as funções necessárias para limitar riscos de segurança.
- **Exemplo prático**: Um script do PowerShell envia emails automaticamente usando permissões configuradas no Microsoft Graph.

<h1></h1>