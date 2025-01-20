
<h1>Tipos de Logs</h1>
<table>
    <thead>
        <tr>
            <th>Digite</th>
            <th>Plataforma</th>
            <th>Location</th>
            <th>Descrição</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Registro em log do aplicativo</td>
            <td>Windows, Linux</td>
            <td>Sistema de arquivos do serviço de aplicativo e/ou blobs de armazenamento do Azure</td>
            <td>Registra as mensagens geradas pelo código do aplicativo. As mensagens serão geradas pela estrutura da Web que você escolher ou diretamente do código do aplicativo usando o modelo de registro em log padrão da sua linguagem de programação. Cada mensagem recebe uma das seguintes categorias: crítico, erro, aviso, informações, depuração e rastreamento.</td>
        </tr>
        <tr>
            <td>Log do servidor Web</td>
            <td>Windows</td>
            <td>Sistema de arquivos do serviço de aplicativo e/ou Armazenamento de blobs do Azure</td>
            <td>Dados de solicitação HTTP brutos no formato de arquivo de log estendido W3C. Cada mensagem de log inclui dados como o método HTTP, o URI de recurso, o IP do cliente, a porta do cliente, o agente do usuário, o código de resposta e assim por diante.</td>
        </tr>
        <tr>
            <td>Mensagens de erro detalhadas</td>
            <td>Windows</td>
            <td>Sistema de arquivos do serviço de aplicativo</td>
            <td>Cópias das páginas de erro .html que seriam enviadas ao navegador do cliente. Por motivos de segurança, as páginas de erro detalhadas não devem ser enviadas aos clientes em produção, mas o serviço de aplicativo pode salvar a página de erro cada vez que um erro de aplicativo ocorre com código HTTP 400 ou superior.</td>
        </tr>
        <tr>
            <td>De uma solicitação de rastreio com falha</td>
            <td>Windows</td>
            <td>Sistema de arquivos do serviço de aplicativo</td>
            <td>Informações detalhadas de rastreamento sobre solicitações com falha, incluindo um rastreamento dos componentes IIS usados para processar a solicitação e o tempo gasto em cada componente. Uma pasta é gerada para cada solicitação com falha, que contém o arquivo de log XML e a folha de estilos XSL usada para exibir o arquivo de log.</td>
        </tr>
        <tr>
            <td>Log de implantação</td>
            <td>Windows, Linux</td>
            <td>Sistema de arquivos do serviço de aplicativo</td>
            <td>Ajuda a determinar por que uma implantação falhou. O log de implantação acontece automaticamente e não há definições de configuração para o log de implantação.</td>
        </tr>
    </tbody>
</table>



Você também pode definir o nível de detalhes do log:

<table>
    <thead>
        <tr>
            <th>Nível</th>
            <th>Categorias incluídas</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Desabilitado</td>
            <td>Nenhum</td>
        </tr>
        <tr>
            <td>Erro</td>
            <td>Erro, Crítico</td>
        </tr>
        <tr>
            <td>Aviso</td>
            <td>Aviso, Erro, Crítico</td>
        </tr>
        <tr>
            <td>Informações</td>
            <td>Informações, Aviso, Erro, Crítico</td>
        </tr>
        <tr>
            <td>Verbose</td>
            <td>Rastreamento, Depuração, Informações, Aviso, Erro, Crítico (todas as categorias)</td>
        </tr>
    </tbody>
</table>


<h1>Armazenamento</h1>
Os logs podem ser armazenados em <strong>Sistemas de arquivo</strong> ou em <strong>Armazenamento de blobs</strong>.

<ul>
<li><strong>Sistemas de arquivo: </strong>Deve ser definido a cota em (MB) e o período de dias de retenção.</li>
<li><strong>Armazenamento de Blobs: </strong>Deve ser definido o período de dias de retenção.</li>
</ul>

<h1>Transmitir Logs</h1>
```shell
az webapp log tail --name appname --resource-group myResourceGroup
```
