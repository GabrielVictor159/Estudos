<h1>Provedores de autenticação</h1>
<table>
    <thead>
        <tr>
            <th>Provedor</th>
            <th>Ponto de extremidade de logon</th>
            <th>Diretrizes</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Plataforma de identidade da Microsoft</td>
            <td>/.auth/login/aad</td>
            <td>Logon da plataforma de identidade da Microsoft do Serviço de Aplicativo</td>
        </tr>
        <tr>
            <td>Facebook</td>
            <td>/.auth/login/facebook</td>
            <td>Logon do Facebook no Serviço de Aplicativo</td>
        </tr>
        <tr>
            <td>Google</td>
            <td>/.auth/login/google</td>
            <td>Logon do Google no Serviço de Aplicativo</td>
        </tr>
        <tr>
            <td>Twitter</td>
            <td>/.auth/login/twitter</td>
            <td>Logon do Twitter no Serviço de Aplicativo</td>
        </tr>
        <tr>
            <td>Qualquer provedor do OpenID Connect</td>
            <td>/.auth/login/&lt;providerName&gt;</td>
            <td>Logon do OpenID Connect no Serviço de Aplicativo</td>
        </tr>
        <tr>
            <td>GitHub</td>
            <td>/.auth/login/github</td>
            <td>Logon do GitHub no Serviço de Aplicativo</td>
        </tr>
    </tbody>
</table>

<h1>Fluxo de autenticação</h1>
<table>
    <thead>
        <tr>
            <th>Etapa</th>
            <th>Sem SDK do provedor</th>
            <th>Com SDK do provedor</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Conectar usuário</td>
            <td>Redireciona o cliente para /.auth/login/&lt;provider&gt;.</td>
            <td>O código do cliente conecta o usuário diretamente no SDK do provedor e recebe um token de autenticação. Para obter informações, consulte a documentação do provedor.</td>
        </tr>
        <tr>
            <td>Pós-autenticação</td>
            <td>Provedor redireciona o cliente para /.auth/login/&lt;provider&gt;/callback.</td>
            <td>O código do cliente envia o token do provedor para /.auth/login/&lt;provider&gt; para validação.</td>
        </tr>
        <tr>
            <td>Estabelecer sessão autenticada</td>
            <td>O Serviço de Aplicativo adiciona um cookie autenticado à resposta.</td>
            <td>O Serviço de Aplicativo retorna o próprio token de autenticação para o código do cliente.</td>
        </tr>
        <tr>
            <td>Atender conteúdo autenticado</td>
            <td>O cliente inclui o cookie de autenticação em solicitações subsequentes (manipuladas automaticamente pelo navegador).</td>
            <td>O código do cliente apresenta o token de autenticação no cabeçalho X-ZUMOAUTH (manipulado automaticamente pelos SDKs de cliente dos Aplicativos Móveis).</td>
        </tr>
    </tbody>
</table>

